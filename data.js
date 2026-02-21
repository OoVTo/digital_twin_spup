const resumeData = {
  personal: {
    name: "Tashanda Chealsy A. Antonio",
    birthDate: "August 7, 2005",
    birthplace: "Tuguegarao City, Cagayan",
    gender: "Female",
    citizenship: "Filipino",
    religion: "Roman Catholic",
    address: "Tuguegarao City, Cagayan",
    email: "tashandaantonio@spup.edu.ph"
  },
  education: {
    degree: "Bachelor of Science in Information Technology",
    school: "St. Paul University Philippines",
    years: "2023 - Present",
    capstone: "Dynamic Door Security using IoT Application",
    shs: { school: "St. Paul University Philippines", years: "2021 - 2023" },
    jhs: { school: "St. Catherine's Academy of Gattaran, Inc.", years: "2017 - 2021" }
  },
  certifications: [
    { title: "Certificate of Recognition, Pelikulang Panlipunan Film Festival 2026", org: "St. Paul University Philippines", date: "January 17, 2026", desc: "Recognized for outstanding participation in the Pelikulang Panlipunan Film Festival 2026." },
    { title: "Certificate of Attendance, JPCS Leadership Transformation Workshop & NBO Election AY 2025-2026", org: "Junior Philippine Computer Society (JPCS)", date: "December 9, 2025", desc: "Attendance certificate for the JPCS Leadership Transformation Workshop and NBO Election for the academic year 2025-2026." },
    { title: "Certificate of Academic Excellence, Second Semester, AY 2025-2026", org: "St. Paul University Philippines", date: "January 2026", desc: "Awarded for outstanding academic performance in the second semester of the academic year 2025-2026." },
    { title: "Certificate of Attendance, PCS Monthly Membership Meeting and Techtalks 2025", org: "Philippine Computer Society", date: "October 23, 2025", desc: "Attendance certificate for the monthly membership meeting and tech talks organized by the Philippine Computer Society." },
    { title: "Certificate of Attendance, PCS Monthly Membership Meeting and Techtalks 2025", org: "Philippine Computer Society", date: "November 27, 2025", desc: "Attendance certificate for the monthly membership meeting and tech talks organized by the Philippine Computer Society." },
    { title: "Certificate of Membership, Philippine Computer Society", org: "Philippine Computer Society", date: "January 15, 2026", desc: "Membership certificate for the Philippine Computer Society for the academic year 2025-2026." },
    { title: "Certificate of Membership, JPCS-SPUP Chapter 2026", org: "Junior Philippine Computer Society (JPCS)", date: "January 15, 2026", desc: "Membership certificate for the JPCS-SPUP Chapter for the academic year 2025-2026." },
    { title: "Certificate of Recognition, SPUP Paskuhan 2025 PaulInnovate", org: "St. Paul University Philippines", date: "December 2025", desc: "Recognized for outstanding participation in the PaulInnovate event during SPUP Paskuhan 2025." },
    { title: "Certificate of Attendance, AI Hygiene: Team Norms That Stop Workslop Before It Starts 2025", org: "Eskwelabs", date: "October 29, 2025", desc: "A workshop on AI hygiene and team norms to prevent workslop." },
    { title: "Certificate of Recognition, IT Cybersecurity Roadshow 2025", org: "St. Paul University Philippines", date: "October 25, 2025", desc: "Recognized for helping organize the event." },
    { title: "Certificate of Participation, IT Cybersecurity Roadshow 2025", org: "St. Paul University Philippines", date: "October 25, 2025", desc: "A roadshow event focused on raising awareness and promoting best practices in IT cybersecurity for students and faculty." },
    { title: "Certificate of Participation, The Art of Filmmaking Workshop 2025", org: "St. Paul University Philippines", date: "April 21, 2025", desc: "A workshop that taught students the fundamentals of filmmaking and storytelling." },
    { title: "Certificate of Participation, SITE Film Festival 2025", org: "St. Paul University Philippines", date: "June 19, 2025", desc: "An annual film festival organized by the St. Paul University Philippines to showcase student filmmaking skills and promote storytelling." },
    { title: "Certificate of Participation, ITE CONVENTION 2025", org: "St. Paul University Philippines", date: "March 26-28, 2025", desc: "An annual convention for Information Technology students and professionals to share knowledge and network." }
  ],
  events: [
    { 
      title: "Pelikulang Panlipunan Film Festival 2026", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "January 17, 2026", 
      desc: "A film festival that showcases the film making skills of students in St. Paul University Philippines, with a focus on social issues and community stories.",
      img: "://picsum.photos/httpsseed/pelpan/600/400"
    },
    { 
      title: "JPCS Leadership Transformation Workshop & NBO Election AY 2025-2026", 
      venue: "Online via Zoom", 
      date: "December 9, 2025", 
      desc: "A workshop organized by the Junior Philippine Computer Society (JPCS) to train and prepare student leaders for their roles in the upcoming academic year, including the election of new officers.",
      img: "://picsum.photos/httpsseed/jpcs/600/400"
    },
    { 
      title: "PCS Monthly Membership Meeting and Techtalks 2025", 
      venue: "Online via Zoom", 
      date: "November 27, 2025", 
      desc: "Monthly meeting and tech talks organized by the Philippine Computer Society (PCS) for members to stay updated on industry trends and network with fellow professionals.",
      img: "://picsum.photos/httpsseed/pcs/600/400"
    },
    { 
      title: "AI Hygiene: Team Norms That Stop Workslop Before It Starts 2025", 
      venue: "Online via Zoom", 
      date: "October 29, 2025", 
      desc: "A workshop focused on establishing healthy team norms and preventing AI-generated content issues in collaborative work environments.",
      img: "://picsum.photos/httpsseed/aihygiene/600/400"
    },
    { 
      title: "IT Cyber Security Roadshow 2025", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "October 25, 2025", 
      desc: "A roadshow event focused on raising awareness and promoting best practices in IT cybersecurity for students and faculty.",
      img: "://picsum.photos/httpsseed/itcybersecurity/600/400"
    },
    { 
      title: "PCS Monthly Membership Meeting and Techtalks 2025", 
      venue: "Online via Zoom", 
      date: "October 23, 2025", 
      desc: "Monthly meeting and tech talks organized by the Philippine Computer Society (PCS) for members to stay updated on industry trends and network with fellow professionals.",
      img: "://picsum.photos/httpsseed/pcs/600/400"
    },
    { 
      title: "SITE Film Festival 2025", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "June 19, 2025", 
      desc: "An annual film festival organized by the School of Information Technology (SITE) showcasing student films and creative works.",
      img: "://picsum.photos/httpsseed/sitefilmfestival/600/400"
    },
    { 
      title: "The Art of Filmmaking Workshop", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "April 21, 2025", 
      desc: "A hands-on workshop teaching students the fundamentals of filmmaking including storytelling, cinematography, and editing techniques.",
      img: "://picsum.photos/httpsseed/theartoffilmmaking/600/400"
    },
    { 
      title: "ITE CONVENTION 2025", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "March 26-28, 2025", 
      desc: "An annual convention for Information Technology students and professionals to share knowledge and network.",
      img: "://picsum.photos/httpsseed/iteconvention/600/400"
    },
    { 
      title: "ITE CONVENTION 2024", 
      venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", 
      date: "April 17-19, 2024", 
      desc: "An annual convention for Information Technology students and professionals to share knowledge and network.",
      img: "://picsum.photos/httpsseed/iteconvention2024/600/400"
    },
  ],
  affiliations: [
    { 
      role: "The Browser - Managing Editor", 
      organization: "SPUP Student Publications", 
      period: "2025-2026",
      desc: "Oversaw editorial content, coordinated with writers and designers, and ensured timely publication of the university's student newspaper"
    },
    { 
      role: "JPCS - Member", 
      organization: "Junior Philippine Computer Society", 
      period: "2025-2026",
      desc: "Active member in Philippines' premier IT professional organization, attending networking events and technical workshops"
    },
    { 
      role: "JPCS-SPUP Director for Membership", 
      organization: "Junior Philippine Computer Society - SPUP Chapter", 
      period: "2025-2026",
      desc: "Led membership recruitment and engagement initiatives, organized events to foster community among IT students at SPUP"
    },
    { 
      role: "Philippine Computer Society Member", 
      organization: "Philippine Computer Society", 
      period: "2025-2026",
      desc: "Joined the national organization for IT professionals, participating in conferences and contributing to discussions on industry trends and best practices"
    }
  ],
  skills: {
    "Technical Areas": [
      { area: "Artificial Intelligence", level: "Intermediate", examples: "LLM implementation, model training, prompt engineering, AI workflow automation" },
      { area: "Database Management", level: "Advanced", examples: "SQL query optimization, MongoDB aggregations, database design patterns" },
      { area: "Cybersecurity", level: "Beginner", examples: "Network security, penetration testing basics, encryption protocols, secure coding" },
      { area: "Software Architecture", level: "Beginner", examples: "Design patterns, microservices architecture, system scalability" },
      { area: "Technical Writing & Documentation", level: "Beginner", examples: "API documentation, technical blogs, requirement specifications" },
      { area: "Digital Filmmaking & Media Production", level: "Intermediate", examples: "Video editing, cinematography, audio production, visual storytelling" }
    ],
    "Programming Languages": [
      { lang: "Python", proficiency: "Advanced", useCases: "Data analysis, AI/ML, automation, web scraping" },
      { lang: "JavaScript/TypeScript", proficiency: "Intermediate", useCases: "Frontend development, full-stack web applications, automation" },
      { lang: "Java", proficiency: "Intermediate", useCases: "Enterprise applications, Android development" },
      { lang: "HTML5 & CSS3", proficiency: "Advanced", useCases: "Semantic markup, responsive design, accessibility" },
      { lang: "PHP", proficiency: "Intermediate", useCases: "Backend web scripting, API development" },
      { lang: "SQL", proficiency: "Intermediate", useCases: "Database queries, data manipulation, optimization" },
      { lang: "XML & JSON", proficiency: "Beginner", useCases: "Data serialization, API communication" }
    ],
    "Frameworks & Libraries": [
      { name: "React", category: "Frontend", details: "Component-based architecture, hooks, state management with Redux/Context API" },
      { name: "Node.js & Express", category: "Backend", details: "RESTful API development, middleware configuration, async/await patterns" },
      { name: "Bootstrap 5", category: "Frontend", details: "Responsive grid system, component library, utility classes" },
      { name: "Tailwind CSS", category: "Frontend", details: "Utility-first approach, custom components, performance optimization" }
    ],
    "Databases": [
      { system: "MySQL", proficiency: "Advanced", features: "Relational queries, indexing, replication" },
      { system: "SQLite", proficiency: "Intermediate", features: "Lightweight deployment, mobile databases" },
      { system: "Redis", proficiency: "Beginner", features: "Caching, session management, pub/sub messaging" }
    ],
    "Technical IT Skills": [
      { skill: "Git & GitHub", proficiency: "Intermediate", details: "Version control, branching strategies, pull requests, collaborative development" },
      { skill: "REST API Design", proficiency: "Intermediate", details: "RESTful principles, HTTP methods, status codes, API documentation" },
      { skill: "Object-Oriented Programming", proficiency: "Intermediate", details: "Encapsulation, inheritance, polymorphism, SOLID principles" },
      { skill: "Software Design Patterns", proficiency: "Intermediate", details: "MVC, Singleton, Factory, Observer, Strategy patterns" },
      { skill: "Clean Code Principles", proficiency: "Intermediate", details: "Naming conventions, DRY principle, code readability, refactoring" },
      { skill: "Data Structures & Algorithms", proficiency: "Intermediate", details: "Arrays, linked lists, trees, sorting, searching, complexity analysis" },
      { skill: "System Design", proficiency: "Intermediate", details: "Scalability, microservices, load balancing, caching strategies" },
      { skill: "Debugging & Troubleshooting", proficiency: "Intermediate", details: "Breakpoint debugging, log analysis, performance profiling" },
      { skill: "Automated Testing", proficiency: "Intermediate", details: "Unit testing (Jest, Pytest), integration testing, TDD methodology" },
      { skill: "Linux/Unix", proficiency: "Beginner", details: "Command line, shell scripting, server management, file permissions" },
      { skill: "Windows Server", proficiency: "Beginner", details: "Active Directory, server administration basics" }
    ],
    "Soft Skills": [
      { skill: "Problem-Solving", description: "Analytical approach to technical challenges, creative solution design" },
      { skill: "Communication", description: "Technical documentation, presentation skills, cross-team collaboration" },
      { skill: "Collaboration", description: "Pair programming, code reviews, open feedback acceptance" },
      { skill: "Leadership", description: "Project direction, mentoring junior developers, decision-making" },
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
