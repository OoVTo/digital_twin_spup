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
    capstone: "Beaconet: Proximity Grid for Lost Item Tracking with AI Application and Decision Support",
    shs: { school: "St. Paul University Philippines", years: "2021 - 2023" },
    jhs: { school: "St. Paul University Philippines", years: "2017 - 2021" }
  },
  certifications: [
    "Certificate of Recognition, SPUP Paskuhan 2025 PaulInnovate",
    "Certificate of Recognition, SPUP Paskuhan 2025 Essay Writing",
    "Certificate of Academic Excellence, President’s List",
    "Certificate of Completion, KadaKareer x Home Credit HacKada AI in UX for Fintech Hackathon",
    "Certificate of Attendance, Fearless Forecasts: The Future of Marketing",
    "Certificate of Attendance, How to Think like a Startup with AI-Native Workflows",
    "Certificate of Completion, AI Fundamentals with IBM SkillsBuild",
    "Certificate of Participation, SvelteKit - A Framework for Startups",
    "Certificate of Attendance, n8n for Beginners: Build your First AI-Powered Automation",
    "Certificate of Attendance, AI Hygiene: Team Norms That Stop Workslop Before It Starts",
    "Certificate of Participation, Hour of Code Session (October 29)",
    "Certificate of Attendance, AI in the Loop: Navigating Tech Careers in a New Era",
    "Certificate of Participation, Beyond the Colon: Introduction to Python’s Core Fundamentals",
    "Certificate of Completion, Introduction to Modern AI",
    "Certificate of Participation, IT Cybersecurity Roadshow",
    "Certificate of Participant, Elevating Teaching with the New Updates of GabAI, Your AI Teaching Assistant",
    "Certificate of Attendance, Automating Like a Storyteller: Designing System in Arcs",
    "Certificate of Participation, Responsible Technology: Ethics in IT Systems",
    "Certificate of Participation, Hour of Code Session (October 14)",
    "Certificate of Participation, ITE CONVENTION 2025",
    "Certificate of Recognition, SPUP Paskuhan 2024 PaulInnovate",
    "Certificate of Recognition, SPUP Paskuhan 2024 Story Writing",
    "Certificate of Recognition, IDEATECH CHALLENGE 2024 PITCHING COMPETITION",
    "Certificate of Participation, UNLEASH Hacks Philippines 2024",
    "Certificate of Recognition, SITE Film Festival 2025",
    "Certificate of Participation, SITE Film Festival 2025",
    "Certificate of Recognition, The Art of Filmmaking Workshop of 2025",
    "Certificate of Participation, The Art of Filmmaking Workshop 2025",
    "Certificate of Participation, ITE CONVENTION 2024",
    "Certificate of Recognition, SPUP Paskuhan 2023 PaulInnovate",
    "Certificate of Recognition, SPUP Paskuhan 2023 Impromptu Speaking",
    "Certificate of Participation, CYBER SUMMIT 2023"
  ],
  events: [
    { title: "KadaKareer x Home Credit HacKada AI in UX for Fintech Hackathon", venue: "Online via Zoom", date: "November 26-December 11, 2025", img: "https://picsum.photos/seed/kadakareer/600/400" },
    { title: "Fearless Forecasts: The Future of Marketing", venue: "Online via Zoom", date: "November 27, 2025", img: "https://picsum.photos/seed/fearless/600/400" },
    { title: "How to Think like a Startup with AI-Native Workflows", venue: "Online via Zoom", date: "November 13, 2025", img: "https://picsum.photos/seed/startupai/600/400" },
    { title: "SvelteKit - A Framework for Startups", venue: "Online via Google Meet", date: "November 12, 2025", img: "https://picsum.photos/seed/svelte/600/400" },
    { title: "n8n for Beginners: Build your First AI-Powered Automation", venue: "Online via Zoom", date: "November 6, 2025", img: "https://picsum.photos/seed/n8n/600/400" },
    { title: "AI Hygiene: Team Norms That Stop Workslop Before It Starts", venue: "Online via Zoom", date: "October 29, 2025", img: "https://picsum.photos/seed/hygiene/600/400" },
    { title: "Hour of Code Session", venue: "Online via YouTube Live", date: "October 29, 2025", img: "https://picsum.photos/seed/hourcode1/600/400" },
    { title: "AI in the Loop: Navigating Tech Careers in a New Era", venue: "Online via Zoom", date: "October 27, 2025", img: "https://picsum.photos/seed/ailoop/600/400" },
    { title: "Beyond the Colon: Introduction to Python’s Core Fundamentals", venue: "Online via MS Teams", date: "October 26, 2025", img: "https://picsum.photos/seed/pythonfund/600/400" },
    { title: "IT Cybersecurity Roadshow", venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", date: "October 25, 2025", img: "https://picsum.photos/seed/cyber/600/400" },
    { title: "Elevating Teaching with the New Updates of GabAI, Your AI Teaching Assistant", venue: "Online via Facebook Live", date: "October 18, 2025", img: "https://picsum.photos/seed/gabai/600/400" },
    { title: "Automating Like a Storyteller: Designing System in Arcs", venue: "Online via Zoom", date: "October 16, 2025", img: "https://picsum.photos/seed/story/600/400" },
    { title: "Responsible Technology: Ethics in IT Systems", venue: "Online via MS Teams", date: "October 15, 2025", img: "https://picsum.photos/seed/ethics/600/400" },
    { title: "Hour of Code Session", venue: "Online via YouTube Live", date: "October 14, 2025", img: "https://picsum.photos/seed/hourcode2/600/400" },
    { title: "SITE Film Festival 2025", venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", date: "June 19, 2025", img: "https://picsum.photos/seed/site/600/400" },
    { title: "The Art of Filmmaking Workshop 2025", venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", date: "April 21, 2025", img: "https://picsum.photos/seed/film/600/400" },
    { title: "ITE CONVENTION 2025", venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", date: "March 26-28, 2025", img: "https://picsum.photos/seed/ite2025/600/400" },
    { title: "iDeaTech Challenge 2024 Pitching Competition", venue: "Isabela Convention Center, Cauayan City, Isabela", date: "October 16, 2024", img: "https://picsum.photos/seed/ideatech/600/400" },
    { title: "iDeaTech Challenge 2024 Online Learning Sessions", venue: "Online via Zoom", date: "September 25-October 11, 2024", img: "https://picsum.photos/seed/ideatech2/600/400" },
    { title: "ITE CONVENTION 2024", venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", date: "April 17-19, 2024", img: "https://picsum.photos/seed/ite2024/600/400" },
    { title: "Cyber Summit 2023", venue: "St. Paul University Philippines, Tuguegarao City, Cagayan", date: "May 24-26, 2023", img: "https://picsum.photos/seed/cybersummit/600/400" }
  ],
  affiliations: [
    "The Browser Editor-in-Chief 2025-2026",
    "JPCS Member 2025-2026",
    "JPCS-SPUP Member 2025-2026",
    "JPCS-SPUP Director for Special Projects 2024-2025",
    "Consistent President’s Lister"
  ]
};

// Browser compatibility: assign to window
if (typeof window !== 'undefined') {
  window.resumeData = resumeData;
}

// Node.js compatibility: export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { resumeData };
}