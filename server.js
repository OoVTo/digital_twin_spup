require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const fetch = global.fetch || require('node-fetch');
const { Index } = require('@upstash/vector');
const app = express();
const port = process.env.PORT || 3000;

// Path for storing interview results
const interviewHistoryFile = path.join(__dirname, '_interview_history.json');

function loadInterviewHistory() {
  try {
    if (fs.existsSync(interviewHistoryFile)) {
      const data = fs.readFileSync(interviewHistoryFile, 'utf8');
      return JSON.parse(data) || [];
    }
  } catch (error) {
    console.error('Error loading interview history:', error.message);
  }
  return [];
}

function saveInterviewHistory(interviews) {
  try {
    fs.writeFileSync(interviewHistoryFile, JSON.stringify(interviews, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving interview history:', error.message);
  }
}

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
  if (/(birth|born|birthplace|birth date|birthday)/.test(s)) return `Jacinto was born on ${resume.personal.birthDate} in ${resume.personal.birthplace}! 🎂`;
  if (/(email|e-mail|contact)/.test(s)) return `You can reach Jacinto at ${resume.personal.email}. He's also based in ${resume.personal.address}.`;
  if (/(degree|studying|education|capstone)/.test(s)) return `Jacinto is pursuing a ${resume.education.degree} at ${resume.education.school} (${resume.education.years}). His capstone project is all about "${resume.education.capstone}" - pretty cool stuff! 🚀`;
  if (/list certifications/.test(s)) return `Check out all of Jacinto's certifications:\n\n${resume.certifications.map((c, i) => `${i + 1}. ${c}`).join('\n')}`;
  if (/list events/.test(s)) return `Jacinto has been to some amazing events and conferences:\n\n${resume.events.map(e=>`📍 ${e.title} — ${e.date}`).join('\n')}`;
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

/**
 * First-person, conversational response generator based on resume data
 * Sounds natural and human-like while remaining professional
 */
function smartResumeResponder(message) {
  const resume = require('./data.js').resumeData;
  const q = message.toLowerCase();

  // Check specific patterns for quick matches
  if (/(birth|born|birthday|age|when were you born)/.test(q)) {
    return `I was born on ${resume.personal.birthDate} in ${resume.personal.birthplace}. It's a beautiful city in Cagayan.`;
  }
  
  if (/(email|contact|reach|how can i contact|how to reach)/.test(q)) {
    return `You can reach me at ${resume.personal.email}. I'm currently based in ${resume.personal.address}, Philippines.`;
  }
  
  if (/(degree|education|school|studying|what are you studying|background|field)/.test(q)) {
    const capstoneTitle = resume.education.capstone.split(':')[0].trim();
    return `I'm pursuing a ${resume.education.degree} at ${resume.education.school}. Right now, I'm working on my capstone project called "${capstoneTitle}", which involves beacon technology and machine learning for item tracking. It's been an exciting journey combining different technologies I've learned.`;
  }
  
  if (/(list certifications|all certifications|certifications you have)/.test(q)) {
    const certs = resume.certifications.slice(0, 5).map(c => c.title).join(', ');
    return `I've completed quite a few certifications focusing on AI, web development, and cybersecurity. Some of my recent ones include ${certs}, and several others. I'm always looking to expand my knowledge in emerging technologies like AI and automation.`;
  }
  
  if (/(certif|training|credential|qualification|what certifications)/.test(q)) {
    const cert = resume.certifications[0];
    return `One of my recent certifications is "${cert.title}" from ${cert.org} in ${cert.date}. The course covered ${cert.desc}. I find it valuable to continuously learn and stay updated with industry standards.`;
  }
  
  if (/(event|conference|seminar|workshop|hackathon|what events|attended)/.test(q)) {
    if (/list|all|show/.test(q)) {
      const eventList = resume.events.slice(0, 3).map(e => e.title).join(', ');
      return `I've attended quite a few events and conferences. Some notable ones include ${eventList}, and others. I really value these opportunities to network, learn from industry experts, and apply my skills in real-world challenges like hackathons.`;
    }
    const evt = resume.events[0];
    return `I recently attended "${evt.title}" at ${evt.venue} in ${evt.date}. It was a great opportunity to ${evt.desc ? evt.desc.toLowerCase() : 'collaborate and learn with other developers'}. These kinds of events really help me grow both technically and professionally.`;
  }
  
  if (/(skill|technical|programming|language|framework|technology|what can you code|what languages)/.test(q)) {
    const langs = resume.skills?.programmingLanguages || [];
    const frameworks = resume.skills?.frameworksLibraries || [];
    const tech = resume.skills?.technicalITSkills || [];
    
    const langNames = langs.slice(0, 4).map(s => typeof s === 'string' ? s : s.lang || s.name || '').filter(Boolean).join(', ');
    const frameworkNames = frameworks.slice(0, 3).map(s => typeof s === 'string' ? s : s.name || '').filter(Boolean).join(', ');
    const techNames = tech.slice(0, 2).map(s => typeof s === 'string' ? s : s.skill || s.name || '').filter(Boolean).join(', ');
    
    return `I work with several programming languages including ${langNames || 'Python, JavaScript, and others'}. I'm experienced with frameworks like ${frameworkNames || 'React, Node.js, and more'}. I also have expertise in ${techNames || 'web development, system design, and problem-solving'}. I enjoy learning new technologies and applying them to solve real-world problems.`;
  }
  
  if (/(affiliation|member|organization|group|role|team|community|where do you work)/.test(q)) {
    if (resume.affiliations && resume.affiliations.length > 0) {
      const allAff = resume.affiliations.map(a => `${a.role} at ${a.organization}`).join(', ');
      return `I'm involved with several organizations and communities. Currently, I serve as ${allAff}. These roles allow me to contribute to the tech community and collaborate with talented individuals on meaningful projects.`;
    }
    return `I'm actively involved in professional tech communities and organizations where I collaborate with other developers and contribute to various initiatives. These connections have been invaluable to my growth.`;
  }
  
  if (/(experience|background|tell me about yourself|who are you)/.test(q)) {
    return `I'm an IT student at ${resume.education.school} passionate about technology, innovation, and artificial intelligence. I'm actively involved in tech communities, regularly attend hackathons and conferences, and have worked on several projects including my capstone project on beacon-based item tracking with AI. I believe in continuous learning and staying updated with emerging technologies.`;
  }
  
  if (/(motivation|interest|why|passionate)/.test(q)) {
    return `I'm motivated by solving real-world problems with technology. I enjoy the intersection of creativity and technical problem-solving, whether it's building applications, working with AI, or contributing to the developer community. The tech industry evolves so fast, and I'm genuinely excited to be part of that journey.`;
  }

  // Default helpful response
  return `Feel free to ask me about my education, technical skills, certifications, projects I've worked on, events I've attended, or anything else about my professional background. I'm happy to discuss!`;
}

app.post('/api/chat', async (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'missing message' });

  // Try fast local resume-based response FIRST (instant, no API wait)
  const fastLocalResponse = smartResumeResponder(message);
  if (fastLocalResponse) {
    return res.json({ reply: fastLocalResponse });
  }

  let resumeContext = '';

  // Search Upstash database for relevant resume information (if available)
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
          resumeContext = `\n\nDetailedd background: ${contextItems.slice(0, 3).join('; ')}`;
        }
      }
    } catch (err) {
      console.warn('⚠️ Upstash search error:', err.message);
    }
  }

  const systemPrompt = `You are Jacinto Gabriel A. Tong. You are speaking about yourself in first person.

About me:
- I'm an IT student at St. Paul University Philippines pursuing a Bachelor of Science in Information Technology
- My capstone project: "Beaconet" - using beacon technology, machine learning, and spatial indexing for real-time item tracking
- I'm passionate about AI, automation, and solving real-world problems with technology
- I actively participate in tech communities, hackathons, and conferences
- I have certifications in AI Fundamentals (IBM), SvelteKit, cybersecurity, n8n automation, and others
- I'm driven by continuous learning and staying updated with emerging technologies

How I communicate:
- Always speak in first person - use "I", "me", "my"
- Be conversational and natural, like talking to someone directly
- Show genuine enthusiasm about my projects and achievements
- Be professional but warm and approachable
- Don't just list facts - weave them into natural conversation
- When discussing my background, explain the context and why it matters to me
- Keep responses thoughtful and engaging, not overly long
- Let my passion for technology and learning come through
- If asked something I don't have details about, admit it naturally

Tone: Professional, enthusiastic, authentic, and conversational${resumeContext}`;

  // Only try external APIs if configured (with 5-second timeout)

  // Only try external APIs if configured (with 5-second timeout)
  const apiTimeout = 5000; // 5 seconds max per API

  // Try GROQ API if available
  if (process.env.GROQ_API_KEY) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), apiTimeout);

      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
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

      clearTimeout(timeoutId);

      const j = await resp.json();
      if (j?.choices?.[0]?.message?.content) {
        const reply = j.choices[0].message.content;
        return res.json({ reply });
      }
    } catch (err) {
      console.warn('⚠️ GROQ timeout or error:', err.message);
    }
  }

  // Try OpenAI if GROQ isn't available or failed
  if (process.env.OPENAI_API_KEY) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), apiTimeout);

      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
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
          temperature: 0.7
        })
      });

      clearTimeout(timeoutId);

      const j = await resp.json();
      if (j?.choices?.[0]?.message?.content) {
        const reply = j.choices[0].message.content;
        return res.json({ reply });
      }
    } catch (err) {
      console.warn('⚠️ OpenAI timeout or error:', err.message);
    }
  }

  // Fallback: local keyword-based answer
  const local = localAnswer(message);
  if (local) return res.json({ reply: local });

  return res.json({ reply: "I couldn't generate a response. Try asking about Jacinto's education, skills, certifications, or events." });
});

// Serve stats page
app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, 'stats.html'));
});

// API endpoint to get interview statistics
app.get('/api/stats', (req, res) => {
  const interviews = loadInterviewHistory();

  if (interviews.length === 0) {
    return res.json({
      interviews: [],
      stats: {
        totalInterviews: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0
      },
      scoreDistribution: {}
    });
  }

  // Calculate statistics
  const scores = interviews.map(i => i.averageScore);
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const avgScore = Math.round((totalScore / scores.length) * 10) / 10;
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);

  // Calculate score distribution (5 ranges: 0-20, 21-40, 41-60, 61-80, 81-100)
  const distribution = {
    '0-20%': 0,
    '21-40%': 0,
    '41-60%': 0,
    '61-80%': 0,
    '81-100%': 0
  };

  scores.forEach(score => {
    if (score <= 20) distribution['0-20%']++;
    else if (score <= 40) distribution['21-40%']++;
    else if (score <= 60) distribution['41-60%']++;
    else if (score <= 80) distribution['61-80%']++;
    else distribution['81-100%']++;
  });

  // Sort interviews by score (highest to lowest) for rankings
  const sortedInterviews = [...interviews].sort((a, b) => b.averageScore - a.averageScore);

  res.json({
    interviews: sortedInterviews,
    stats: {
      totalInterviews: interviews.length,
      averageScore: avgScore,
      highestScore,
      lowestScore
    },
    scoreDistribution: distribution
  });
});

// API endpoint to save interview result
app.post('/api/interview-result', (req, res) => {
  const { jobTitle, company, scores, averageScore, date } = req.body;
  
  if (!jobTitle || !scores || averageScore === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const interviews = loadInterviewHistory();
    
    const newRecord = {
      id: Date.now(),
      jobTitle,
      company: company || 'Unknown Company',
      date: date || new Date().toISOString(),
      scores,
      averageScore
    };
    
    interviews.push(newRecord);
    saveInterviewHistory(interviews);

    res.json({ 
      success: true,
      message: 'Interview result recorded',
      record: newRecord
    });
  } catch (error) {
    console.error('Error saving interview result:', error);
    res.status(500).json({ error: 'Failed to save interview result' });
  }
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
