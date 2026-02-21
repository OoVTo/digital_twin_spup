# Presentation Outline — Digital Twin Resume (Week 6 Demo)

Duration: 8 minutes (recommended)

---

## Slide 1 — Title & Hook (30s)
- Title: "Digital Twin Resume — Jacinto Gabriel A. Tong"
- One-line hook: interactive resume + AI assistant replaces static PDF
- What you'll demo: tabbed resume, AI chat, interview simulator, analytics

## Slide 2 — Problem & Value (45s)
- Problem: static resumes are hard to query and personalize for jobs
- Value proposition: searchable, conversational, first-person digital twin
- Key users: candidates, recruiters, educators

## Slide 3 — Core Features (60s)
- Tabbed resume sections (Personal, Education, Certifications, Events, Affiliations)
- AI Assistant: local keyword responder + optional API proxy (/api/chat)
- Interview simulator: job-match score, question flow, per-question scoring
- Analytics: interview history and /stats overview

## Slide 4 — Live Demo Plan (3m)
- 1) Show tab navigation (click through Personal, Education, Certifications)
- 2) Open Chat panel: ask 2 quick questions (degree, list events) — show fast local reply
- 3) Switch to Interview mode: select or enter a job, run 1 mock question and show score
- 4) Navigate to Stats (if available): show saved interview record and aggregated metrics

Notes for demo: keep questions short, demonstrate local fallback when OPENAI_API_KEY is unset.

## Slide 5 — Architecture & Data (45s)
- Frontend: single-page vanilla JS (`index.html`, `app.js`) rendering `data.js`
- Backend: Express server (`server.js`) with `/api/chat` and optional LLM integration
- Semantic search: optional Upstash Vector index for richer context
- Environment: keys in `.env` (not committed); `.env.example` provided

## Slide 6 — Acceptance Criteria Checklist (30s)
- Tabs render correctly; avatar and personal grid visible
- Chat responds to keyword queries; `/api/chat` returns `{ reply }`
- Events render (descriptions shown in this build)
- Server runs with `npm start` at `http://localhost:3000`

## Slide 7 — Technical Challenges & Solutions (30s)
- Challenge: chat latency → Solution: fast local responder + short API timeouts
- Challenge: preserving on-screen data during UI updates → Solution: DOM updates scoped to content areas
- Security: API keys in `.env` and `.gitignore`

## Slide 8 — Demo Script / Speaker Notes (30s)
- “Hi — I’ll show the interactive resume, the chat assistant answering my education, then a quick mock interview and saved stats.”
- Keep transitions deliberate: point to the section header, then to chat panel, then to interview controls.

## Slide 9 — Next Steps & Roadmap (20s)
- Improve RAG with Upstash + dense retrieval
- Add export / authenticated profiles and multi-user support
- Add richer scoring rubric and persisting interviews to a DB

## Slide 10 — Q&A (30s)
- Invite 1–3 focused questions: architecture, privacy, or demo reproducibility

---

Appendix: Quick run commands for graders

```bash
npm install
npm start          # open http://localhost:3000
```

Files to inspect: `docs/prd.md`, `app.js`, `data.js`, `server.js`

---
Prepared by: demo script derived from project PRD and implementation notes.
