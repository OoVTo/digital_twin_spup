const resumeData = {
  personal: {
    name: "Jacinto Gabriel A. Tong",
    birthDate: "November 25, 2004",
    birthplace: "Tuguegarao City, Cagayan",
    gender: "Male",
    citizenship: "Filipino",
    religion: "Roman Catholic",
    address: "Tuguegarao City, Cagayan",
    email: "jacintotong@spup.edu.ph"
  },
  education: {
    degree: "Bachelor of Science in Information Technology",
    school: "St. Paul University Philippines",
    years: "2023 - Present",
    capstone: "Beaconet: Proximity Grid for Lost Item Tracking with AI Application and Decision Support (Uses beacon technology, machine learning algorithms, and proximity-grid spatial indexing for real-time item tracking)",
    shs: { school: "St. Paul University Philippines", years: "2021 - 2023" },
    jhs: { school: "St. Paul University Philippines", years: "2017 - 2021" }
  },
  certifications: [
    { title: "AI Fundamentals with IBM SkillsBuild", org: "IBM", date: "2025", desc: "Core AI/ML concepts including supervised/unsupervised learning, neural networks, and practical applications in business intelligence" },
    { title: "Introduction to Modern AI", org: "Professional AI Community", date: "2025", desc: "Comprehensive overview of LLMs, GPT architectures, prompt engineering, and implementing AI solutions in production environments" },
    { title: "SvelteKit - A Framework for Startups", org: "Tech Community", date: "2025", desc: "Modern full-stack framework combining server-side rendering, routing, and state management for scalable web applications" },
    { title: "n8n for Beginners: Build your First AI-Powered Automation", org: "n8n Community", date: "2025", desc: "Low-code workflow automation, API integration, and building intelligent automation pipelines without extensive coding" },
    { title: "Beyond the Colon: Introduction to Python's Core Fundamentals", org: "IT Community", date: "2025", desc: "Python syntax, data structures (lists, dicts, tuples), OOP principles, and functional programming paradigms" },
    { title: "IT Cybersecurity Roadshow", org: "SPUP IT Department", date: "2025", desc: "Network security, penetration testing basics, encryption protocols, and security vulnerability assessment methodologies" },
    { title: "Responsible Technology: Ethics in IT Systems", org: "Professional Standards Board", date: "2025", desc: "Ethical considerations in AI development, bias mitigation, data privacy compliance (GDPR, local regulations), and responsible innovation" },
    { title: "AI in the Loop: Navigating Tech Careers in a New Era", org: "Tech Career Development", date: "2025", desc: "Career navigation in AI-driven industry, skill development roadmaps, emerging roles in AI/ML, and workforce transformation" },
    { title: "AI Hygiene: Team Norms That Stop Workslop Before It Starts", org: "Tech Excellence Community", date: "2025", desc: "Best practices for sustainable AI development, preventing technical debt in ML projects, and team collaboration standards" },
    { title: "How to Think like a Startup with AI-Native Workflows", org: "Startup Innovation Hub", date: "2025", desc: "Rapid prototyping with AI, lean methodology integration, MVP development with AI tools, and business model innovation" },
    { title: "Fearless Forecasts: The Future of Marketing", org: "Marketing Innovation Lab", date: "2025", desc: "AI in marketing analytics, predictive modeling, customer behavior forecasting, and data-driven marketing strategy" },
    { title: "KadaKareer x Home Credit HacKada AI in UX for Fintech Hackathon", org: "Home Credit & KadaKareer", date: "2025", desc: "Participated in competitive hackathon focusing on AI-enhanced UX design for financial technology applications and user-centric AI integration" },
    { title: "Certificate of Recognition - SPUP Paskuhan 2025 PaulInnovate", org: "SPUP", date: "2025", desc: "Recognition for innovative project contributions and technical excellence in university innovation initiatives" },
    { title: "Elevating Teaching with the New Updates of GabAI, Your AI Teaching Assistant", org: "Education Technology", date: "2025", desc: "AI applications in education, LLM integration for learning support, and pedagogical approaches to AI-assisted instruction" },
    { title: "Automating Like a Storyteller: Designing System in Arcs", org: "Systems Design Community", date: "2025", desc: "System architecture design patterns, automation workflow design, and narrative-driven API development approaches" },
    { title: "Certificate of Academic Excellence - President's List", org: "SPUP", date: "2024-2025", desc: "Consistent academic excellence with 1.25 average GWA across all semesters" },
    { title: "CITE Cybersecurity Certification", org: "National IT Council", date: "2023", desc: "Cybersecurity fundamentals, threat analysis, and defensive security practices" },
    { title: "Hour of Code Sessions", org: "Code.org", date: "2025", desc: "Community educator for programming fundamentals and CS accessibility initiatives" }
  ],
  events: [
    { 
      title: "KadaKareer x Home Credit HacKada AI in UX for Fintech Hackathon", 
      venue: "Online via Zoom", 
      date: "November 26-December 11, 2025", 
      desc: "16-day competitive hackathon focused on designing AI-powered UX solutions for fintech platforms. Worked on machine learning model integration, user interface design, and API connectivity for financial applications.",
      img: "https://picsum.photos/seed/kadakareer/600/400" 
    },
    { 
      title: "Fearless Forecasts: The Future of Marketing", 
      venue: "Online via Zoom", 
      date: "November 27, 2025", 
      desc: "Explored predictive analytics, AI-driven market forecasting, and machine learning applications in marketing strategy and customer analysis.",
      img: "https://picsum.photos/seed/fearless/600/400" 
    },
    { 
      title: "How to Think like a Startup with AI-Native Workflows", 
      venue: "Online via Zoom", 
      date: "November 13, 2025", 
      desc: "Learned rapid iteration with AI tools, leveraging LLMs for rapid MVP development, and integrating AI into early-stage product development lifecycle.",
      img: "https://picsum.photos/seed/startupai/600/400" 
    },
    { 
      title: "SvelteKit - A Framework for Startups", 
      venue: "Online via Google Meet", 
      date: "November 12, 2025", 
      desc: "Hands-on training in SvelteKit for building full-stack web applications with reactive components, API integration, and efficient build pipelines.",
      img: "https://picsum.photos/seed/svelte/600/400" 
    },
    { 
      title: "n8n for Beginners: Build your First AI-Powered Automation", 
      venue: "Online via Zoom", 
      date: "November 6, 2025", 
      desc: "Low-code workflow automation platform training, creating AI-powered automation pipelines, and integrating multiple APIs for business process automation.",
      img: "https://picsum.photos/seed/n8n/600/400" 
    },
    { 
      title: "AI Hygiene: Team Norms That Stop Workslop Before It Starts", 
      venue: "Online via Zoom", 
      date: "October 29, 2025", 
      desc: "Best practices for maintaining code quality in AI projects, preventing technical debt accumulation, and establishing sustainable development workflows.",
      img: "https://picsum.photos/seed/hygiene/600/400" 
    },
    { 
      title: "Hour of Code Session", 
      venue: "Online via YouTube Live", 
      date: "October 29, 2025", 
      desc: "Conducted session introducing programming basics and computational thinking to beginners and students.",
      img: "https://picsum.photos/seed/hourcode1/600/400" 
    },
    { 
      title: "AI in the Loop: Navigating Tech Careers in a New Era", 
      venue: "Online via Zoom", 
      date: "October 27, 2025", 
      desc: "Career pathway exploration in AI industry, emerging job roles, skill requirements for AI-driven companies, and professional development strategies.",
      img: "https://picsum.photos/seed/ailoop/600/400" 
    },
    { 
      title: "Beyond the Colon: Introduction to Python's Core Fundamentals", 
      venue: "Online via MS Teams", 
      date: "October 26, 2025", 
      desc: "Deep dive into Python core concepts including data structures, control flow, functions, and object-oriented programming fundamentals.",
      img: "https://picsum.photos/seed/pythonfund/600/400" 
    },
    { 
      title: "IT Cybersecurity Roadshow", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "October 25, 2025", 
      desc: "Comprehensive workshop on network security, threat mitigation, vulnerability assessment, and cybersecurity best practices for enterprise systems.",
      img: "https://picsum.photos/seed/cyber/600/400" 
    },
    { 
      title: "Elevating Teaching with the New Updates of GabAI, Your AI Teaching Assistant", 
      venue: "Online via Facebook Live", 
      date: "October 18, 2025", 
      desc: "Learned how AI teaching assistants enhance education delivery, personalized learning paths through AI, and integrating LLMs in educational institutions.",
      img: "https://picsum.photos/seed/gabai/600/400" 
    },
    { 
      title: "Automating Like a Storyteller: Designing System in Arcs", 
      venue: "Online via Zoom", 
      date: "October 16, 2025", 
      desc: "System architecture design patterns, narrative-driven API design, and creating automation workflows with clear user journey arcs.",
      img: "https://picsum.photos/seed/story/600/400" 
    },
    { 
      title: "Responsible Technology: Ethics in IT Systems", 
      venue: "Online via MS Teams", 
      date: "October 15, 2025", 
      desc: "Ethics in AI development, bias detection and mitigation in ML models, data privacy and GDPR compliance, and responsible innovation principles.",
      img: "https://picsum.photos/seed/ethics/600/400" 
    },
    { 
      title: "Hour of Code Session", 
      venue: "Online via YouTube Live", 
      date: "October 14, 2025", 
      desc: "Community programming education session focusing on accessibility and practical coding fundamentals.",
      img: "https://picsum.photos/seed/hourcode2/600/400" 
    },
    { 
      title: "ITE CONVENTION 2025", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "March 26-28, 2025", 
      desc: "Annual IT professionals conference featuring keynotes on emerging technologies, AI/ML trends, cloud computing, and cybersecurity developments.",
      img: "https://picsum.photos/seed/ite2025/600/400" 
    },
    { 
      title: "The Art of Filmmaking Workshop 2025", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "April 21, 2025", 
      desc: "Professional filmmaking techniques including cinematography, audio production, editing, and narrative storytelling for digital media.",
      img: "https://picsum.photos/seed/film/600/400" 
    },
    { 
      title: "SITE Film Festival 2025", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "June 19, 2025", 
      desc: "Participated in film festival showcasing student productions and technical filmmaking achievements.",
      img: "https://picsum.photos/seed/site/600/400" 
    },
    { 
      title: "iDeaTech Challenge 2024 - Online Learning Sessions & Pitching Competition", 
      venue: "Online (Sessions) / Isabela Convention Center (Finals)", 
      date: "September 25 - October 16, 2024", 
      desc: "6-week ideation and innovation challenge with hands-on training in business development, pitching, and problem-solving. Developed innovative tech solutions and presented to industry judges.",
      img: "https://picsum.photos/seed/ideatech/600/400" 
    },
    { 
      title: "ITE CONVENTION 2024", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "April 17-19, 2024", 
      desc: "IT industry conference with sessions on latest technologies, professional development, and networking with IT professionals.",
      img: "https://picsum.photos/seed/ite2024/600/400" 
    },
    { 
      title: "Cyber Summit 2023", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "May 24-26, 2023", 
      desc: "Cybersecurity-focused conference covering threat landscape, defense mechanisms, and incident response strategies.",
      img: "https://picsum.photos/seed/cybersummit/600/400" 
    }
  ],
  affiliations: [
    { 
      role: "The Browser - Editor-in-Chief", 
      organization: "SPUP Student Publications", 
      period: "2025-2026",
      desc: "Lead editorial and content strategy for university publication covering technology, innovation, and campus affairs"
    },
    { 
      role: "JPCS - Member", 
      organization: "Junior Philippine Computer Society", 
      period: "2025-2026",
      desc: "Active member in Philippines' premier IT professional organization, attending networking events and technical workshops"
    },
    { 
      role: "JPCS-SPUP - Director for Special Projects", 
      organization: "Junior Philippine Computer Society - SPUP Chapter", 
      period: "2024-2025",
      desc: "Led special projects including hackathons, tech talks, and innovation competitions for student IT community"
    },
    { 
      role: "President's List", 
      organization: "St. Paul University Philippines", 
      period: "Consistent (2023-Present)",
      desc: "Consistent academic recognition maintaining 1.25 average GWA across all semesters"
    }
  ],
  skills: {
    "Technical Areas": [
      { area: "Artificial Intelligence & Machine Learning", level: "Intermediate", examples: "LLM implementation, model training, prompt engineering, AI workflow automation" },
      { area: "Full-Stack Web Development", level: "Advanced", examples: "React, Node.js, SvelteKit, REST API design, responsive design" },
      { area: "Database Management", level: "Advanced", examples: "SQL query optimization, MongoDB aggregations, database design patterns" },
      { area: "IoT and Embedded Systems", level: "Intermediate", examples: "Arduino sensors, Raspberry Pi configuration, BLE beacon technology" },
      { area: "Cybersecurity", level: "Intermediate", examples: "Network security, penetration testing basics, encryption protocols, secure coding" },
      { area: "DevOps & CI/CD", level: "Intermediate", examples: "GitHub Actions, deployment pipelines, container orchestration basics" },
      { area: "Project Consulting & Management", level: "Advanced", examples: "Agile/Scrum methodologies, stakeholder management, technical documentation" },
      { area: "Software Architecture", level: "Intermediate", examples: "Design patterns, microservices architecture, system scalability" },
      { area: "Technical Writing & Documentation", level: "Advanced", examples: "API documentation, technical blogs, requirement specifications" },
      { area: "Digital Filmmaking & Media Production", level: "Intermediate", examples: "Video editing, cinematography, audio production, visual storytelling" }
    ],
    "Programming Languages": [
      { lang: "Python", proficiency: "Advanced", useCases: "Data analysis, AI/ML, automation, web scraping" },
      { lang: "JavaScript/TypeScript", proficiency: "Advanced", useCases: "Frontend development, full-stack web applications, automation" },
      { lang: "C#", proficiency: "Intermediate", useCases: "Desktop applications, game development, backend services" },
      { lang: "Java", proficiency: "Intermediate", useCases: "Enterprise applications, Android development" },
      { lang: "HTML5 & CSS3", proficiency: "Advanced", useCases: "Semantic markup, responsive design, accessibility" },
      { lang: "PHP", proficiency: "Beginner", useCases: "Backend web scripting, API development" },
      { lang: "SQL", proficiency: "Advanced", useCases: "Database queries, data manipulation, optimization" },
      { lang: "Kotlin", proficiency: "Beginner", useCases: "Mobile application development" },
      { lang: "XML & JSON", proficiency: "Advanced", useCases: "Data serialization, API communication" }
    ],
    "Frameworks & Libraries": [
      { name: "React", category: "Frontend", details: "Component-based architecture, hooks, state management with Redux/Context API" },
      { name: "Node.js & Express", category: "Backend", details: "RESTful API development, middleware configuration, async/await patterns" },
      { name: "SvelteKit", category: "Full-Stack", details: "Server-side rendering, reactive components, file-based routing" },
      { name: "Django", category: "Backend", details: "ORM usage, authentication, templating engine" },
      { name: "Flask", category: "Backend", details: "Lightweight microframework, blueprint organization, request handling" },
      { name: "Bootstrap 5", category: "Frontend", details: "Responsive grid system, component library, utility classes" },
      { name: "Tailwind CSS", category: "Frontend", details: "Utility-first approach, custom components, performance optimization" },
      { name: "Webpack & Vite", category: "Build Tools", details: "Module bundling, code splitting, hot module replacement" }
    ],
    "Databases": [
      { system: "PostgreSQL", proficiency: "Advanced", features: "Complex queries, ACID compliance, jsonb support" },
      { system: "MySQL", proficiency: "Advanced", features: "Relational queries, indexing, replication" },
      { system: "MongoDB", proficiency: "Intermediate", features: "Document storage, aggregation pipeline, flexible schema" },
      { system: "SQLite", proficiency: "Intermediate", features: "Lightweight deployment, mobile databases" },
      { system: "Redis", proficiency: "Beginner", features: "Caching, session management, pub/sub messaging" }
    ],
    "Technical IT Skills": [
      { skill: "Git & GitHub", proficiency: "Advanced", details: "Version control, branching strategies, pull requests, collaborative development" },
      { skill: "REST API Design", proficiency: "Advanced", details: "RESTful principles, HTTP methods, status codes, API documentation" },
      { skill: "Object-Oriented Programming", proficiency: "Advanced", details: "Encapsulation, inheritance, polymorphism, SOLID principles" },
      { skill: "Software Design Patterns", proficiency: "Intermediate", details: "MVC, Singleton, Factory, Observer, Strategy patterns" },
      { skill: "Clean Code Principles", proficiency: "Advanced", details: "Naming conventions, DRY principle, code readability, refactoring" },
      { skill: "Data Structures & Algorithms", proficiency: "Intermediate", details: "Arrays, linked lists, trees, sorting, searching, complexity analysis" },
      { skill: "System Design", proficiency: "Intermediate", details: "Scalability, microservices, load balancing, caching strategies" },
      { skill: "Debugging & Troubleshooting", proficiency: "Advanced", details: "Breakpoint debugging, log analysis, performance profiling" },
      { skill: "Automated Testing", proficiency: "Intermediate", details: "Unit testing (Jest, Pytest), integration testing, TDD methodology" },
      { skill: "CI/CD Pipelines", proficiency: "Intermediate", details: "GitHub Actions, automated testing, deployment automation" },
      { skill: "Agile & Scrum", proficiency: "Advanced", details: "Sprint planning, user stories, daily standups, retrospectives" },
      { skill: "Linux/Unix", proficiency: "Intermediate", details: "Command line, shell scripting, server management, file permissions" },
      { skill: "Windows Server", proficiency: "Beginner", details: "Active Directory, server administration basics" },
      { skill: "Networking", proficiency: "Intermediate", details: "TCP/IP, DNS, VPNs, network security fundamentals" }
    ],
    "Soft Skills": [
      { skill: "Problem-Solving", description: "Analytical approach to technical challenges, creative solution design" },
      { skill: "Communication", description: "Technical documentation, presentation skills, cross-team collaboration" },
      { skill: "Teamwork & Collaboration", description: "Pair programming, code reviews, open feedback acceptance" },
      { skill: "Leadership", description: "Project direction, mentoring junior developers, decision-making" },
      { skill: "Time Management", description: "Sprint estimation, prioritization, deadline adherence" },
      { skill: "Critical Thinking", description: "Root cause analysis, design evaluation, trade-off assessment" },
      { skill: "Adaptability", description: "Learning new technologies quickly, pivoting strategies based on feedback" }
    ]
  }
};

// Browser compatibility: assign to window
if (typeof window !== 'undefined') {
  window.resumeData = resumeData;
}

// Node.js compatibility: export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { resumeData };
}
