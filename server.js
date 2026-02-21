require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = global.fetch || require('node-fetch');
const { Index } = require('@upstash/vector');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize Upstash Vector client (if configured)
let upstashIndex = null;
if (process.env.UPSTASH_VECTOR_REST_URL && process.env.UPSTASH_VECTOR_REST_TOKEN) {
  upstashIndex = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });
  console.log('✅ Upstash Vector Database connected');
}

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function localAnswer(message){
  const resume = require('./data.js').resumeData;
  const s = message.toLowerCase();
  if (/(birth|born|birthplace|birth date|birthday)/.test(s)) return `Tashanda was born on ${resume.personal.birthDate} in ${resume.personal.birthplace}! 🎂`;
  if (/(email|e-mail|contact)/.test(s)) return `You can reach Tashanda at ${resume.personal.email}. She's also based in ${resume.personal.address}.`;
  if (/(degree|studying|education|capstone)/.test(s)) return `Tashanda is pursuing a ${resume.education.degree} at ${resume.education.school} (${resume.education.years}). Her capstone project is all about "${resume.education.capstone}" - pretty cool stuff! 🚀`;
  if (/list certifications/.test(s)) {
    const validCerts = resume.certifications.filter(c => c.title && c.title.trim());
    if (validCerts.length === 0) return `Tashanda doesn't have any certifications currently listed.`;
    return `Here are Tashanda's certifications:\n\n${validCerts.map((c, i) => `${i + 1}. ${c.title}${c.org ? ` (${c.org})` : ''}${c.date ? ` - ${c.date}` : ''}`).join('\n')}`;
  }
  if (/list events/.test(s)) return `Tashanda has been to some amazing events and conferences:\n\n${resume.events.map(e=>`📍 ${e.title} — ${e.date}`).join('\n')}`;
  return null;
}

/**
 * Helper function to get text from ID (reconstruct from data.js)
 */
function getTextFromId(id) {
  const resume = require('./data.js').resumeData;
  const [category, key] = id.split('_');
  
  if (category === 'personal') {
    const value = Object.entries(resume.personal).find(([k]) => k.toLowerCase() === key)?.[1];
    if (value) return `Personal: ${key} - ${value}`;
  }
  if (category === 'education') {
    const value = Object.entries(resume.education).find(([k]) => k.toLowerCase() === key)?.[1];
    if (value) {
      // Handle nested objects (shs, jhs)
      if (typeof value === 'object') {
        return `Education: ${key} - ${value.school || ''} (${value.years || ''})`;
      }
      return `Education: ${key} - ${value}`;
    }
  }
  if (category === 'cert') {
    const index = parseInt(key);
    const cert = resume.certifications[index];
    if (cert && cert.title && cert.title.trim()) {
      return `Certification: ${cert.title}${cert.org ? ` from ${cert.org}` : ''}${cert.date ? ` (${cert.date})` : ''}`;
    }
    return null;
  }
  if (category === 'event') {
    const index = parseInt(key);
    if (resume.events[index]) return `Event: ${resume.events[index].title} at ${resume.events[index].venue} on ${resume.events[index].date}`;
  }
  if (category === 'affiliation') {
    const index = parseInt(key);
    const aff = resume.affiliations[index];
    if (aff) {
      const roleText = typeof aff === 'object' ? `${aff.role} at ${aff.organization}` : aff;
      return `Affiliation: ${roleText}`;
    }
    return null;
  }
  if (category === 'skill') {
    // Parse skill_Category_Index format or skill_Index format
    const parts = id.split('_');
    if (parts.length >= 3) {
      const skillCategory = parts.slice(1, -1).join(' ');
      const skillIndex = parseInt(parts[parts.length - 1]);
      
      if (resume.skills && resume.skills[skillCategory]) {
        const skills = resume.skills[skillCategory];
        if (Array.isArray(skills) && skills[skillIndex]) {
          const skill = skills[skillIndex];
          let skillText = '';
          if (typeof skill === 'object') {
            const name = skill.area || skill.lang || skill.name || skill.skill || '';
            const details = [skill.level, skill.proficiency, skill.details, skill.useCases, skill.examples, skill.description]
              .filter(d => d)
              .join('; ');
            skillText = `${name}${details ? ` (${details})` : ''}`;
          } else {
            skillText = skill;
          }
          return `Skill: ${skillText}`;
        }
      }
    }
    return null;
  }
  if (category === 'skills') {
    // Handle category-level skills summary
    const skillCategory = id.replace('skills_', '');
    if (resume.skills && resume.skills[skillCategory]) {
      const skills = resume.skills[skillCategory];
      if (Array.isArray(skills)) {
        const skillNames = skills.map(s => {
          if (typeof s === 'object') {
            return s.area || s.lang || s.name || s.skill || '';
          }
          return s;
        }).filter(n => n);
        return `Skills - ${skillCategory}: ${skillNames.join(', ')}`;
      }
    }
    return null;
  }
}

/**
 * Semantic search via Upstash Vector + local fallback
 */
app.post('/api/search', async (req, res) => {
  const { query } = req.body || {};
  if (!query) return res.status(400).json({ error: 'missing query' });

  const results = [];

  // If Upstash is configured, attempt semantic search
  if (upstashIndex) {
    try {
      // Query Upstash Vector using the data string (Upstash handles embedding)
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
      // Fall through to local search
    }
  }

  // Fallback: local keyword-based search
  if (results.length === 0) {
    const resume = require('./data.js').resumeData;
    const q = query.toLowerCase();
    const localResults = [];

    // Simple keyword matching across resume
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

    // If no category matches, do generic text search
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

  // Search Upstash database for relevant resume information
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

  // Fallback: if no context from Upstash, build comprehensive context from resume data
  if (!resumeContext) {
    const contextItems = [];
    
    // Add personal info
    contextItems.push(`Name: ${resume.personal.name}`);
    contextItems.push(`Education: ${resume.education.degree} at ${resume.education.school} (${resume.education.years})`);
    contextItems.push(`Capstone: ${resume.education.capstone}`);
    
    // Add certifications (only non-empty ones)
    const validCerts = resume.certifications.filter(c => c.title && c.title.trim());
    if (validCerts.length > 0) {
      validCerts.slice(0, 5).forEach(c => {
        contextItems.push(`Certification: ${c.title}${c.org ? ` from ${c.org}` : ''}${c.date ? ` (${c.date})` : ''}`);
      });
    } else {
      contextItems.push(`Certifications: None currently listed`);
    }
    
    // Add events
    if (resume.events.length > 0) {
      resume.events.slice(0, 3).forEach(e => {
        contextItems.push(`Event: ${e.title} on ${e.date}`);
      });
    }
    
    // Add affiliations
    if (resume.affiliations.length > 0) {
      resume.affiliations.forEach(a => {
        const roleText = typeof a === 'object' ? `${a.role} at ${a.organization}` : a;
        contextItems.push(`Affiliation: ${roleText}`);
      });
    }
    
    // Add skills (ALL of them, properly formatted)
    if (resume.skills) {
      Object.entries(resume.skills).forEach(([category, skillList]) => {
        if (Array.isArray(skillList)) {
          skillList.forEach(skill => {
            let skillName = '';
            let skillDetails = '';
            if (typeof skill === 'object') {
              skillName = skill.area || skill.lang || skill.name || skill.skill || '';
              skillDetails = [skill.level, skill.proficiency, skill.details, skill.useCases, skill.examples, skill.description]
                .filter(d => d)
                .join('; ');
            } else {
              skillName = skill;
            }
            if (skillName) {
              contextItems.push(`Skill: ${skillName}${skillDetails ? ` (${skillDetails})` : ''}`);
            }
          });
        }
      });
    }
    
    resumeContext = `\n\nFull Resume Information:\n${contextItems.map((item) => `• ${item}`).join('\n')}`;
  }

  const systemPrompt = `You are a friendly, conversational AI assistant representing Tashanda Chealsy A. Antonio. Your role is to help people learn about Tashanda's background, skills, education, certifications, and experiences.

**IMPORTANT - Data Accuracy:**
- Only share information that appears in the resume context below
- Don't make up or invent skills, certifications, or achievements
- If something isn't covered in the resume, be honest about it

**Tone & Style:**
- Be warm, friendly, and conversational - like talking to someone who knows Tashanda well
- Share information naturally, not as a database listing
- Use casual language when appropriate (e.g., "Tashanda is passionate about..." instead of "According to the resume...")
- When asked about something not in the resume, acknowledge what areas ARE covered and offer to discuss those instead

**Examples of good responses:**
- Instead of: "I don't have that information about Tashanda."
  Use: "That's not something I have details about, but I'd love to tell you about her experience in [related area]!"
- Instead of: "According to the resume context provided, Tashanda Chealsy A. Antonio has the following certifications:"
  Use: "Tashanda has earned some great certifications! Here are the ones I know about:"
- Instead of: "Certification: Certificate of Attendance, JPCS..."
  Use: "She attended the JPCS Leadership Workshop in December 2025 and got a Certificate of Attendance"

**RESUME CONTEXT - Use this to answer questions:**
${resumeContext}`;

  // Try Ollama first (local, no API key needed)
  try {
    const resp = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        stream: false,
        temperature: 0.4
      })
    });
    if (resp.ok) {
      const j = await resp.json();
      const reply = j?.message?.content || 'No response from Ollama';
      return res.json({ reply });
    }
  } catch (err) {
    console.warn('⚠️ Ollama not available:', err.message);
  }

  // Fallback: Try GROQ API with current model
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
          temperature: 0.4
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

  // Fallback: Try OPENAI_API_KEY if GROQ fails
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
          max_tokens: 500,
          temperature: 0.4
        })
      });
      const j = await resp.json();
      const reply = j?.choices?.[0]?.message?.content || JSON.stringify(j);
      return res.json({ reply });
    } catch (err) {
      console.error('OpenAI error', err.message);
    }
  }

  // Try local answer
  const local = localAnswer(message);
  if (local) return res.json({ reply: local });

  return res.json({ reply: "Start Ollama (ollama serve) to enable local AI, or set OPENAI_API_KEY/GROQ_API_KEY for cloud APIs." });
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));