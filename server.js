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
  if (/(birth|born|birthplace|birth date|birthday)/.test(s)) return `Birth Date: ${resume.personal.birthDate}; Birthplace: ${resume.personal.birthplace}`;
  if (/(email|e-mail|contact)/.test(s)) return `Email: ${resume.personal.email}; Address: ${resume.personal.address}`;
  if (/(degree|studying|education|capstone)/.test(s)) return `Degree: ${resume.education.degree} at ${resume.education.school} (${resume.education.years}). Capstone: ${resume.education.capstone}`;
  if (/list certifications/.test(s)) return resume.certifications.join('\n');
  if (/list events/.test(s)) return resume.events.map(e=>`${e.title} — ${e.date}`).join('\n');
  return null;
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
      const { generateSparseVector } = require('./embeddings.js');
      const sparseVector = generateSparseVector(query);
      
      // Convert dense array to sparse format {indices: [], values: []}
      const indices = [];
      const values = [];
      sparseVector.forEach((val, idx) => {
        if (val > 0) {
          indices.push(idx);
          values.push(val);
        }
      });

      const queryVector = {
        indices: indices.length > 0 ? indices : [0],
        values: values.length > 0 ? values : [0.1]
      };

      // Query Upstash Vector with top 5 results
      const upstashResults = await upstashIndex.query(
        queryVector,
        { topK: 5, includeMetadata: true }
      );

      upstashResults.forEach(result => {
        results.push({
          id: result.id,
          score: result.score,
          text: result.metadata?.textPreview || result.metadata?.text || 'Resume data',
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

  // If OPENAI_API_KEY present, forward to OpenAI chat completion
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
          messages: [{ role: 'system', content: 'You are a helpful assistant for resume questions.' }, { role: 'user', content: message }],
          max_tokens: 500
        })
      });
      const j = await resp.json();
      const reply = j?.choices?.[0]?.message?.content || JSON.stringify(j);
      return res.json({ reply });
    } catch (err) {
      console.error('OpenAI error', err);
    }
  }

  // Try local answer
  const local = localAnswer(message);
  if (local) return res.json({ reply: local });

  return res.json({ reply: "No AI key configured. Set OPENAI_API_KEY to enable real AI responses, or ask simple resume queries." });
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
