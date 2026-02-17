# Architecture & Technical Agents
## Digital Twin Resume Platform

---

## Tech Stack

### Frontend
- **HTML5** — Semantic markup, accessible DOM structure
- **CSS3** — Grid, Flexbox, animations (@keyframes), custom properties (variables)
- **JavaScript (ES6+)** — Vanilla JS (no frameworks) for minimal bundle size
- **Google Fonts** — Inter typeface for typography
- **SVG Icons** — Inline SVGs for tab navigation (person, graduation, star, calendar, people)

### Backend
- **Node.js 16+** — Runtime environment
- **Express.js 4.x** — Lightweight server and middleware
- **Dotenv** — Environment variable management
- **Node-fetch** — HTTP client for OpenAI and external API calls

### External APIs & Services
- **OpenAI Chat API (gpt-3.5-turbo)** — Optional AI responses (requires OPENAI_API_KEY)
- **Upstash Vector Database** — Semantic search and embeddings storage (requires UPSTASH_VECTOR_REST_URL, UPSTASH_VECTOR_REST_TOKEN)
- **GROQ API** — Alternative AI provider for faster inference (requires GROQ_API_KEY)
- **Picsum.photos** — Placeholder event images (seeded by event index)

### Deployment
- **Git** — Version control
- **GitHub** — Remote repository
- **Local HTTP** — Development via `npm start` on localhost:3000
- **MCP Server** — Separate Node.js server on port 4000 for semantic search operations

### Development Tools
- **npm** — Package manager
- **Node.js** — Local development environment
- **VS Code** — Recommended IDE with MCP configuration support
- **Model Context Protocol (MCP)** — Integration for AI assistant capabilities

---

## Architecture & Conventions

### Directory Structure
```
digital_twin_resume/
├── index.html                    # Main HTML (single-page with chat panel)
├── interview_simulator.html      # Standalone interview simulation page
├── styles.css                    # All CSS (responsive at 880px, 768px breakpoints)
├── app.js                        # Frontend logic (tabs, chat, interview mode, animations)
├── data.js                       # Resume data object (structured with objects for certs/events)
├── server.js                     # Express server (static serving, /api/chat endpoint)
├── embeddings.js                 # Semantic search pipeline (Upstash Vector integration)
├── package.json                  # Dependencies & npm scripts
├── package-lock.json             # Lock file for reproducible installs
├── .env.example                  # Template for environment variables
├── .gitignore                    # Excludes node_modules/, .env files
├── README.md                     # Setup and usage instructions
├── agents.md                     # This file (architecture & conventions)
├── docs/
│   ├── prd.md                    # Product Requirements Document
│   ├── design.md                 # Design specifications
│   └── implementation-plan.md    # Implementation roadmap
├── jobs/                         # Job position files (markdown format)
│   ├── 01_junior_software_developer_linkedin.md
│   ├── 02_full_stack_developer_indeed.md
│   ├── 03_frontend_engineer_seek.md
│   ├── 04_devops_engineer_linkedin.md
│   └── 05_qa_test_engineer_seek.md
├── src/mcp-server/              # MCP Server implementation
│   ├── server.js                # MCP server with semantic search endpoints
│   └── ingest.js                # Data ingestion pipeline
├── scripts/
│   └── capture_mcp_evidence.ps1 # PowerShell script for testing MCP responses
├── evidence/                     # Evidence and testing files
│   ├── view_mcp_evidence.html   # Browser-based evidence viewer
│   └── mcp_response_*.json      # Captured MCP query responses
└── public/
    └── assets/
        └── images/
            └── TONG, GAB.png    # Profile picture (96x96px)
```

### Code Architecture

#### Frontend Layer (app.js & index.html)
**Responsibility:** Render UI, handle user interaction, manage interview/Q&A modes, communicate with backend

**Key Functions:**
- `createTabs()` — Generate tab buttons with SVG icons
- `renderSection(id)` — Conditional rendering based on selected tab
- `startInterview()` — Load job details and initiate interview mode with match score calculation
- `generateInterviewQuestion()` — Generate role-specific interview question
- `generateAnswerFromResume()` — Create contextual answer based on question domain
- `appendMsg()` — Add message to chat log
- `queryServer()` — Fetch `/api/chat` for server-based responses
- `answerQuery()` — Local keyword-based fallback responder
- `calculateMatchScore()` — Compute skill alignment percentage (35-90% range)

**Interview Mode Features:**
- **Job-Specific Questions:** 8 specialized generators for different roles (AI Engineer, Frontend Engineer, Full Stack, DevOps, QA, Security, Senior Developer, Junior Developer)
- **Contextual Answers:** Responses pull from resume data (Beaconet capstone, certifications, events, skills)
- **Match Scoring:** Component-based weighting (skills 50%, experience level 25%, certifications 15%, projects 10%)
- **Question Routing:** Smart answer generation based on question keywords (ML, frontend, API, infrastructure, testing, security, learning, general)

**UI Modes:**
- **Q&A Mode:** Ask questions about professional background; displays chat interface
- **Interview Mode:** Simulated technical interview with 5 role-specific questions and scoring

#### Interview Simulator Layer (interview_simulator.html)
**Responsibility:** Provide standalone interview assessment experience with visual feedback

**Key Features:**
- Job selection sidebar with 5 positions from `jobs/` directory
- Dynamic question generation matching job role and requirements
- Visual match score display (% with color coding: green 70+, orange 50-70, red <50)
- Skill match breakdown showing matched vs. development areas
- Technical assessment guidelines for candidate preparation

**Code Structure:**
- `regenerateQuestions()` — Loads job file and generates questions via role-specific generators
- `startInterview()` — Initializes interview panel with loading state
- `getJobSpecificQuestions()` — Routes to appropriate question generator based on job title

#### Data Layer (data.js)
**Responsibility:** Centralized, immutable resume data with structured objects

**Structure:**
```javascript
window.resumeData = {
  personal: { 
    name, birthDate, birthplace, gender, citizenship, religion, address, email 
  },
  education: { 
    degree, school, years, capstone, shs: { school, years }, jhs: { school, years }
  },
  certifications: [
    { title, org, date, desc }, // Objects with details (18 items)
    ...
  ],
  events: [
    { title, venue, date, desc, img }, // Objects with descriptions (20+ items)
    ...
  ],
  affiliations: ["Role 1", "Role 2", ...], // 5 items
  skills: {
    programmingLanguages: [...],
    frameworksLibraries: [...],
    technicalAreas: [...],
    technicalITSkills: [...],
    databases: [...]
  }
}
```

**Conventions:**
- Dates in "YYYY" or "Month DD, YYYY" format
- Certifications now stored as objects: `{ title, org, date, desc }`
- Events now store descriptions for semantic search
- Image URLs use picsum.photos with seeded indices
- Skills organized by category for better matching

#### Backend Layer (server.js)
**Responsibility:** Serve static files, proxy API requests, manage interview logic, provide chat responses

**Endpoints:**
- `GET /` — Serve index.html
- `GET /interview_simulator.html` — Serve interview simulator
- `GET /evidence/view_mcp_evidence.html` — Serve MCP evidence viewer
- `GET *` — Serve static files (CSS, JS, images, job files)
- `POST /api/chat` — Accept user message, return contextual response

**Chat Logic:**
```javascript
POST /api/chat {
  if (request.mode === 'interview') {
    return generateInterviewQuestion(jobDetails);
  } else {
    if (OPENAI_API_KEY) {
      return fetch OpenAI with context about resume;
    } else {
      return localAnswer(message); // Keyword-based matching
    }
  }
}
```

**Conventions:**
- Listens on port 3000 (or process.env.PORT)
- Async/await for all API calls
- JSON responses always include top-level message/reply
- Errors return graceful fallback responses

#### Semantic Search Layer (embeddings.js & src/mcp-server/server.js)
**Responsibility:** Index resume data and provide semantic search capabilities

**MCP Server Endpoints:**
- `POST /mcp/ingest` — Upsert all resume sections to Upstash Vector database
- `POST /mcp/query` — Semantic search with natural language queries and LLM RAG response

**Features:**
- **Vector Embeddings:** Convert resume sections to embeddings via Upstash
- **Semantic Matching:** Find relevant resume content based on query meaning, not just keywords
- **RAG Integration:** Optional LLM-powered response generation based on matched resume sections
- **Metadata Tracking:** Maps vector IDs back to resume sections (personal, education, certifications, events, affiliations)

**Data Mapping:**
- `personal_*` — Personal info fields (name, birthdate, etc.)
- `education_*` — Education sections (degree, school, capstone, SHS, JHS)
- `cert_N` — Certification index N
- `event_N` — Event index N
- `affiliation_N` — Affiliation index N

### Personality & Tone

**Current Profile:** Professional
- Formal, business-appropriate language
- Removed casual phrases and emojis
- Assessment-focused terminology ("Technical Assessment" vs "Interview")
- Professional mode button labels ("Q&A", "Interview")

### UI/UX Conventions

#### Color Scheme (CSS Variables)
```css
--accent: #667eea          /* Primary purple/blue */
--accent-light: #764ba2    /* Secondary purple */
--success: #4CAF50         /* Green for matches */
--warning: #FF9800         /* Orange for partial matches */
--danger: #f44336          /* Red for gaps */
--bg: #f5f5f5              /* Light gray background */
--card: #ffffff            /* White card background */
--text: #333               /* Dark text */
--muted: #666              /* Muted text */
```

#### Responsive Breakpoints
- **Desktop:** 1400px+ (sidebar + content grid layout)
- **Tablet:** 880px–1399px (stacked layout, more compact)
- **Mobile:** <768px (full-width, interview panel can expand to fullscreen)

#### Component Classes
- `.job-item` — Position selector in interview sidebar
- `.interview-panel` — Main interview question display
- `.question-card` — Individual question with assessment areas
- `.match-score` — Colored percentage display (gradient background)
- `.chat-panel` — Fixed chat interface in bottom-right corner
- `.msg` — Chat message wrapper (variants: `.msg.user`, `.msg.bot`)

#### Interview Scoring Logic
- **Component Weights:** Skills (50%), Experience Level (25%), Certifications (15%), Projects (10%)
- **Score Range:** 35% (minimum) to 90% (maximum)
- **Interpretation:**
  - 85%+: "Excellent Match - Strong Candidate"
  - 70-84%: "Good Match - Well Qualified"
  - 55-69%: "Moderate Match - Good Foundation"
  - 40-54%: "Fair Match - Growth Opportunity"
  - <40%: "Entry Level Match - Stretch Role"

### Answer Generation System

#### Question Domain Routing
The system detects question type using regex patterns and routes to specialized answer generators:

- **AI/ML Questions:** Keywords trigger `generateAIAnswers()` — responses about ML models, feature engineering, ethics, current trends, production deployment
- **Frontend Questions:** Keywords trigger `generateFrontendAnswers()` — responses about frameworks (React, SvelteKit), responsive design, state management, performance, testing
- **Full Stack Questions:** Keywords trigger `generateFullStackAnswers()` — responses about architecture decisions, API design, database optimization, deployment
- **DevOps Questions:** Keywords trigger `generateDevOpsAnswers()` — responses about Docker, Kubernetes, CI/CD, monitoring, infrastructure
- **QA Questions:** Keywords trigger `generateQAAnswers()` — responses about test automation, bug analysis, API testing, collaboration
- **Security Questions:** Keywords trigger `generateSecurityAnswers()` — responses about penetration testing, secure coding, encryption, compliance
- **Learning Questions:** Keywords trigger `generateLearningAnswers()` — responses about certifications, continuous learning, adaptation
- **Generic Fallback:** `generateGenericAnswer()` — default for unclassified questions

#### Answer Specificity
Each answer generator has 4-5 question-specific branches that reference actual resume data:
- Mentions "Beaconet capstone" for AI/ML contexts
- References "SvelteKit training" for frontend contexts
- Cites specific certifications ("IBM SkillsBuild", "Responsible Technology")
- Details actual events and hackathons
- Includes real skill sets from data.js

### Naming Conventions

**JavaScript:**
- camelCase for variables, functions: `renderSection()`, `matchScore`, `isActive`
- CONSTANT_CASE for static values: `MAX_MSG_LENGTH`
- Prefix boolean variables: `isOpen`, `hasError`

**CSS:**
- kebab-case classes: `.interview-panel`, `.match-score`, `.question-card`
- BEM-inspired variants: `.msg.user`, `.msg.bot`
- Custom properties: `--accent`, `--success`, `--text`

**Data:**
- Structured objects for rich data (certifications, events)
- Descriptive field names: `title`, `org`, `date`, `desc`
- Snake_case for ID mapping in vector database: `personal_*`, `cert_*`, `event_*`

### Error Handling & Defaults

**Frontend:**
- Network errors in `queryServer()` fall back to `answerQuery()`
- Missing job files display "Loading..." with error handling
- Vector search failures fall back to keyword matching
- Missing environment variables log warnings but allow app to function

**Backend:**
- Missing OPENAI_API_KEY logs warning; local logic still works
- Vector database connection failures don't crash server
- Malformed requests return 400 status with error description

### Security Conventions

**Environment Variables:**
- OPENAI_API_KEY, GROQ_API_KEY, UPSTASH credentials in .env only
- .env excluded from git (.gitignore)
- .env.example provided as reference template

**Input Validation:**
- Chat messages trimmed and length-checked
- No eval() or dangerous string operations
- Vector search queries passed safely to external service

---

## References to Requirements & Documentation

- **[docs/prd.md](docs/prd.md)** — Functional & non-functional requirements, acceptance criteria
- **[docs/design.md](docs/design.md)** — Visual design specifications
- **[docs/implementation-plan.md](docs/implementation-plan.md)** — Feature roadmap
- **[README.md](README.md)** — Quick start and setup instructions

---

## Future Enhancements (Out of Scope)

- [ ] Real-time collaboration with multiple candidates
- [ ] PDF export of interview results
- [ ] Analytics dashboard (privacy-respecting)
- [ ] Integration with applicant tracking systems (ATS)
- [ ] Video interview simulation with transcription
- [ ] A/B testing of interview question difficulty
- [ ] Customizable scoring rubric per role
- [ ] Candidate performance benchmarking against role standards

#### Component Classes
- `.personal-card` — Profile card with avatar + grid fields (2 columns on desktop, 1 on mobile)
- `.event-card` — Event with image, title, venue, date
- `.cert-item` — Certificate list item
- `.chat-panel` — Fixed positioned message container
- `.chat-toggle` — Fixed button to open/close panel
- `.msg` — Message wrapper
- `.msg.user`, `.msg.bot` — Message variants
- `.typing` — Typing indicator animation

#### Animation Conventions
- `@keyframes floatEmoji` — Background emoji float; 12–20s cycle, infinite
- `@keyframes floaty` — Avatar lift; 6s cycle, infinite
- `@keyframes blink` — Typing indicator; 600ms cycle, infinite
- `@keyframes contentFade` — Tab content fade-in; 300ms
- Transitions: 0.3s ease for hover states; 0.15s for quick feedback

### Naming Conventions

**JavaScript:**
- camelCase for variables, functions: `renderSection()`, `chatPanel`, `isActive`
- CONSTANT_CASE for static values: `MAX_MSG_LENGTH`, `AVATAR_SIZE`
- Prefix boolean variables with `is`, `has`: `isOpen`, `hasError`

**CSS:**
- kebab-case classes: `.chat-panel`, `.event-card`, `.personal-card`
- BEM-inspired for variants: `.msg.user`, `.msg.bot` (not `.msg--user`, simpler)
- Custom properties (variables): `--accent`, `--bg`, `--text`

**HTML:**
- Semantic tags: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`
- data-* attributes for tab IDs: `data-tab="personal"` (if needed; currently className used)
- aria-* for accessibility: `aria-hidden="true"` on decorative emojis

### Error Handling & Defaults

**Frontend:**
- Network error in queryServer() → catchblock returns null → falls back to answerQuery()
- Chat input validation → trim whitespace; prevent empty sends
- Image load errors → show alt text or placeholder

**Backend:**
- Missing .env file → dotenv.config() silently continues; process.env.OPENAI_API_KEY is undefined
- OpenAI API error → catch block logs error, returns local response
- 500 errors → JSON response with error message

### Testing Conventions

**Manual Testing Checklist:**
- [ ] All tabs render on first load
- [ ] Chat panel opens/closes without layout shift
- [ ] Profile image loads correctly
- [ ] Keyword queries return expected responses
- [ ] Mobile view stacks properly at <768px
- [ ] CSS animations play smoothly (60fps target)
- [ ] Links to docs/prd.md and agents.md are working
- [ ] Server starts with `npm start` and listens on 3000

### Security Conventions

**Environment Variables:**
- All API keys (OPENAI_API_KEY, GROQ_API_KEY) stored in .env only
- .env is excluded in .gitignore
- .env.example provided as template with empty values
- No hardcoded URLs or secrets in code

**Input Validation:**
- User chat messages trimmed and length-checked (< 2000 chars recommended)
- No eval() or innerHTML injection from external sources
- OpenAI API calls include temperature 0.7 max for reliability

**CORS & Origin:**
- localhost:3000 only for development
- No automatic CORS headers (restricts to same origin)
- Production would require explicit CORS configuration

---

## References to Requirements

This document references the **Product Requirements Document (PRD)** located at:
- **[docs/prd.md](../docs/prd.md)**

The PRD details:
- **Functional Requirements (FR1–FR6):** Tabs, personal data, events, chatbot, keyword matching, API integration
- **Non-Functional Requirements (NFR1–NFR6):** Performance, accessibility, security, browser support, responsiveness, maintainability
- **Acceptance Criteria (AC1–AC8):** Testing checkpoints for final delivery

**How This Document Relates:**
- **agents.md** (this file) outlines *how* requirements are implemented (tech stack, architecture, conventions)
- **prd.md** states *what* should be built (features, constraints, acceptance criteria)
- **README.md** provides *quick start* instructions for setup and usage

### Key Features Mapped to Architecture

| Requirement | Tech Stack | Architecture |
|-------------|-----------|--------------|
| Tabbed interface (FR1) | HTML + CSS Grid + JS | createTabs() + renderSection() |
| Personal data display (FR2) | HTML + CSS Grid + data.js | .personal-card class + 2-col grid |
| Event images (FR3) | CSS + picsum.photos URLs | .event-card class + Flexbox |
| Chatbot panel (FR4) | HTML + CSS fixed + JS | .chat-panel + ensurePanelVisible() |
| Keyword responder (FR5) | JS regex + local fallback | answerQuery() + localAnswer() |
| API integration (FR6) | Express + Node-fetch | /api/chat endpoint + OpenAI proxy |

---

## Deployment & DevOps

### Local Setup
```bash
npm install         # Install dependencies
cp .env.example .env # Copy env template (optional, can run without it)
npm start           # Start server at http://localhost:3000
```

### Production Deployment
- Ensure OPENAI_API_KEY is set in production environment variables (not committed)
- Use HTTPS in production (HTTP only for localhost)
- Consider CDN for static assets if scale requires
- Monitor /api/chat endpoint for rate limits and errors

### CI/CD (Optional)
- Lint: `npm run lint` (if added to package.json)
- Test: `npm test` (if jest/tests added)
- Deploy on push to main: GitHub Actions suggested

---

## Future Enhancements (Out of Scope)

- [ ] Database integration for dynamic resume updates
- [ ] User authentication & multi-user support
- [ ] Dark mode toggle
- [ ] PDF export functionality
- [ ] Semantic search (GROQ/RAG integration)
- [ ] Real-time collaboration
- [ ] Analytics dashboard (privacy-respecting)

