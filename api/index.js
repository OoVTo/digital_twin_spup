require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = global.fetch || require('node-fetch');
const { Index } = require('@upstash/vector');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Initialize Upstash Vector client (if configured)
let upstashIndex = null;
if (process.env.UPSTASH_VECTOR_REST_URL && process.env.UPSTASH_VECTOR_REST_TOKEN) {
  upstashIndex = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });
  console.log('✅ Upstash Vector Database connected');
}

function localAnswer(message){
  const resume = require(path.join(__dirname, '..', 'data.js')).resumeData;
  const s = message.toLowerCase();
  if (/(birth|born|birthplace|birth date|birthday)/.test(s)) return `Jacinto was born on ${resume.personal.birthDate} in ${resume.personal.birthplace}! 🎂`;
  if (/(email|e-mail|contact)/.test(s)) return `You can reach Jacinto at ${resume.personal.email}. He's also based in ${resume.personal.address}.`;
  if (/(degree|studying|education|capstone)/.test(s)) return `Jacinto is pursuing a ${resume.education.degree} at ${resume.education.school} (${resume.education.years}). His capstone project is all about "${resume.education.capstone}" - pretty cool stuff! 🚀`;
  if (/list certifications/.test(s)) return `Check out all of Jacinto's certifications:\n\n${resume.certifications.map((c, i) => `${i + 1}. ${c}`).join('\n')}`;
  if (/list events/.test(s)) return `Jacinto has been to some amazing events and conferences:\n\n${resume.events.map(e=>`📍 ${e.title} — ${e.date}`).join('\n')}`;
  return null;
}

function getTextFromId(id) {
  const resume = require(path.join(__dirname, '..', 'data.js')).resumeData;
  const [category, key] = id.split('_');
  
  if (category === 'personal') {
    const value = Object.entries(resume.personal).find(([k]) => k.toLowerCase() === key)?.[1];
    if (value) return `Personal: ${key} - ${value}`;
  }
  if (category === 'education') {
    const value = Object.entries(resume.education).find(([k]) => k.toLowerCase() === key)?.[1];
    if (value) {
      if (typeof value === 'object') {
        return `Education: ${key} - ${value.school || ''} (${value.years || ''})`;
      }
      return `Education: ${key} - ${value}`;
    }
  }
  if (category === 'cert') {
    const index = parseInt(key);
    if (resume.certifications[index]) return `Certification: ${resume.certifications[index]}`;
  }
  if (category === 'event') {
    const index = parseInt(key);
    if (resume.events[index]) return `Event: ${resume.events[index].title} at ${resume.events[index].venue} on ${resume.events[index].date}`;
  }
  if (category === 'affiliation') {
    const index = parseInt(key);
    if (resume.affiliations[index]) return `Affiliation: ${resume.affiliations[index]}`;
  }
  return null;
}

app.post('/api/search', async (req, res) => {
  const { query } = req.body || {};
  if (!query) return res.status(400).json({ error: 'missing query' });

  const results = [];

  if (upstashIndex) {
    try {
      const upstashResults = await upstashIndex.query(
        {
          data: query,
          topK: 5,
          includeMetadata: true
        }
      );

      upstashResults.forEach(result => {
        const text = getTextFromId(result.id);
        results.push({
          id: result.id,
          score: result.score,
          text: text || 'Resume data',
          category: result.metadata?.category
        });
      });
    } catch (error) {
      console.error('Upstash search error:', error.message);
    }
  }

  if (results.length === 0) {
    const resume = require(path.join(__dirname, '..', 'data.js')).resumeData;
    const q = query.toLowerCase();
    const localResults = [];

    if (/(cert|qualification|credential)/.test(q)) {
      resume.certifications.slice(0, 5).forEach((cert, i) => {
        localResults.push({
          id: `cert_${i}`,
          score: 0.95,
          text: cert,
          category: 'certifications'
        });
      });
    }

    if (/(event|conference|workshop|seminar)/.test(q)) {
      resume.events.slice(0, 5).forEach((evt, i) => {
        localResults.push({
          id: `event_${i}`,
          score: 0.90,
          text: `${evt.title} at ${evt.venue}`,
          category: 'events'
        });
      });
    }

    if (/(education|degree|school|university)/.test(q)) {
      localResults.push({
        id: 'education_degree',
        score: 0.92,
        text: `${resume.education.degree} at ${resume.education.school}`,
        category: 'education'
      });
    }

    if (/(affiliation|member|organization|group)/.test(q)) {
      resume.affiliations.slice(0, 3).forEach((aff, i) => {
        localResults.push({
          id: `affiliation_${i}`,
          score: 0.88,
          text: aff,
          category: 'affiliations'
        });
      });
    }

    if (localResults.length === 0) {
      Object.entries(resume.personal).forEach(([key, val]) => {
        if (val && val.toLowerCase().includes(q)) {
          localResults.push({
            id: `personal_${key}`,
            score: 0.80,
            text: `${key}: ${val}`,
            category: 'personal'
          });
        }
      });
    }

    results.push(...localResults);
  }

  return res.json({
    query,
    results: results.slice(0, 5),
    total: results.length,
    source: results.length > 0 && results[0].score > 0.9 ? 'upstash' : 'local'
  });
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'missing message' });

  let resumeContext = '';

  if (upstashIndex) {
    try {
      const searchResults = await upstashIndex.query(
        {
          data: message,
          topK: 10,
          includeMetadata: true
        }
      );

      if (searchResults && searchResults.length > 0) {
        const contextItems = searchResults
          .map(r => getTextFromId(r.id))
          .filter(t => t)
          .slice(0, 8);
        
        if (contextItems.length > 0) {
          resumeContext = `\n\nRelevant resume information:\n${contextItems.map((item, i) => `• ${item}`).join('\n')}`;
        }
      }
    } catch (err) {
      console.warn('⚠️ Upstash search error:', err.message);
    }
  }

  const systemPrompt = `You are a friendly and knowledgeable personal AI assistant for Jacinto Gabriel A. Tong. 

You know Jacinto well! He's an Information Technology student from St. Paul University Philippines with a passion for technology, innovation, and AI. He's actively involved in various tech communities and has participated in numerous events and hackathons. He's creative, driven, and continuously learning.

When answering questions:
- Speak as if you know Jacinto personally. Use a warm, friendly, and conversational tone
- Be enthusiastic about his achievements and projects
- Share details about his education, certifications, events, and affiliations with pride
- Add personality and genuine warmth to your responses - make them feel conversational, not robotic
- Use the provided resume context to give accurate, specific answers
- If Jacinto's been to an event or earned a certificate, share it with enthusiasm!
- If you don't have information, politely say "I don't have those details about Jacinto, but I'd be happy to help with what I do know!"
- Keep responses friendly and engaging while being concise${resumeContext}`;

  // Try GROQ API first (preferred)
  if (process.env.GROQ_API_KEY) {
    try {
      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });
      const j = await resp.json();
      if (j?.error) {
        console.error('GROQ error:', j.error.message);
      } else {
        const reply = j?.choices?.[0]?.message?.content || JSON.stringify(j);
        return res.json({ reply });
      }
    } catch (err) {
      console.error('GROQ error:', err.message);
    }
  }

  // Fallback: Try OPENAI_API_KEY
  if (process.env.OPENAI_API_KEY) {
    try {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 500
        })
      });
      const j = await resp.json();
      const reply = j?.choices?.[0]?.message?.content || JSON.stringify(j);
      return res.json({ reply });
    } catch (err) {
      console.error('OpenAI error', err.message);
    }
  }

  // Fallback: Local answer
  const local = localAnswer(message);
  if (local) return res.json({ reply: local });

  return res.json({ reply: "Set GROQ_API_KEY for AI responses, or ask a question about Jacinto!" });
});

// Vercel serverless function handler
module.exports = app;
