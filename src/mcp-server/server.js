require('dotenv').config();
const express = require('express');
const { Index } = require('@upstash/vector');
const fetch = global.fetch || require('node-fetch');
const path = require('path');

const app = express();
const port = process.env.MCP_PORT || 4000;

app.use(express.json());

// Simple CORS for browser-based evidence viewer
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Initialize Upstash Vector client (if configured)
let upstashIndex = null;
if (process.env.UPSTASH_VECTOR_REST_URL && process.env.UPSTASH_VECTOR_REST_TOKEN) {
  upstashIndex = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });
  console.log('✅ Upstash Vector connected (MCP server)');
} else {
  console.log('⚠️ UPSTASH_VECTOR_REST_URL / TOKEN not set — ingest/query will fail without it');
}

// Reuse helper to map ids back to resume text
function getTextFromId(id) {
  const resume = require(path.join(__dirname, '..', '..', 'data.js')).resumeData;
  const [category, key] = id.split('_');
  if (category === 'personal') return `Personal: ${key} - ${resume.personal[key]}`;
  if (category === 'education') {
    const val = resume.education[key];
    if (!val) return null;
    if (typeof val === 'object') return `Education: ${key} - ${val.school} (${val.years})`;
    return `Education: ${key} - ${val}`;
  }
  if (category === 'cert') return `Certification: ${resume.certifications[Number(key)]}`;
  if (category === 'event') {
    const e = resume.events[Number(key)];
    return e ? `Event: ${e.title} — ${e.venue} on ${e.date}` : null;
  }
  if (category === 'affiliation') return `Affiliation: ${resume.affiliations[Number(key)]}`;
  return null;
}

// POST /mcp/ingest -> call existing embeddings pipeline (embeddings.js)
app.post('/mcp/ingest', async (req, res) => {
  try {
    const embeddings = require(path.join(__dirname, '..', '..', 'embeddings.js'));
    if (typeof embeddings.upsertAllSections !== 'function') {
      return res.status(500).json({ error: 'embeddings.upsertAllSections not available' });
    }
    await embeddings.upsertAllSections();
    return res.json({ ok: true, message: 'Ingest completed' });
  } catch (err) {
    console.error('Ingest error', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// POST /mcp/query -> semantic search + optional RAG via OpenAI
app.post('/mcp/query', async (req, res) => {
  const { query, k = 5 } = req.body || {};
  if (!query) return res.status(400).json({ error: 'missing query' });

  let matches = [];

  if (upstashIndex) {
    try {
      const upstashResults = await upstashIndex.query({ data: query, topK: k, includeMetadata: true });
      matches = upstashResults.map(r => ({ id: r.id, score: r.score, text: getTextFromId(r.id) || r.metadata?.text || '' }));
    } catch (err) {
      console.warn('Upstash query failed:', err.message);
    }
  }

  // Fallback to local keyword search if no matches
  if (matches.length === 0) {
    const resume = require(path.join(__dirname, '..', '..', 'data.js')).resumeData;
    // simple heuristics copied from main server
    const q = query.toLowerCase();
    if (/(degree|education|school)/.test(q)) {
      matches.push({ id: 'education_degree', score: 0.9, text: `${resume.education.degree} at ${resume.education.school}` });
    }
    if (/(event|conference|workshop|seminar)/.test(q)) {
      resume.events.slice(0, k).forEach((e, i) => matches.push({ id: `event_${i}`, score: 0.85 - i * 0.01, text: `${e.title} — ${e.date}` }));
    }
    if (/(cert|certification)/.test(q)) {
      resume.certifications.slice(0, k).forEach((c, i) => matches.push({ id: `cert_${i}`, score: 0.82 - i * 0.01, text: c }));
    }
  }

  // Build a short RAG prompt and optionally call OpenAI to synthesize an answer
  const contextText = matches.map(m => `- ${m.text}`).join('\n');
  let ragReply = null;
  // Prefer GROQ (if available) for chat completions; fall back to OpenAI only if GROQ not set
  if (process.env.GROQ_API_KEY) {
    try {
      const system = `You are an assistant that answers questions about Tashanda using the provided resume context.`;
      const prompt = `${system}\n\nContext:\n${contextText}\n\nQuestion: ${query}`;
      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }], max_tokens: 300 })
      });
      const j = await resp.json();
      ragReply = j?.choices?.[0]?.message?.content || null;
    } catch (err) {
      console.warn('GROQ call failed:', err.message);
    }
  } else if (process.env.OPENAI_API_KEY) {
    try {
      const system = `You are an assistant that answers questions about Tashanda using the provided resume context.`;
      const prompt = `${system}\n\nContext:\n${contextText}\n\nQuestion: ${query}`;
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: prompt }], max_tokens: 300 })
      });
      const j = await resp.json();
      ragReply = j?.choices?.[0]?.message?.content || null;
    } catch (err) {
      console.warn('OpenAI call failed:', err.message);
    }
  }

  return res.json({ query, matches, reply: ragReply });
});

app.listen(port, () => console.log(`MCP server listening on http://localhost:${port}`));
