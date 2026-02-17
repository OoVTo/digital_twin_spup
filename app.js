(() => {
  const tabsEl = document.getElementById('tabs');
  const contentEl = document.getElementById('content');

  const resume = window.resumeData;

  const sections = [
    { id: 'personal', title: 'Personal Data' },
    { id: 'education', title: 'Educational Background' },
    { id: 'certs', title: 'Certifications' },
    { id: 'events', title: 'Seminars / Workshops / Conferences' },
    { id: 'skills', title: 'Skills' },
    { id: 'affiliations', title: 'Affiliations' }
  ];

  function createTabs() {
    sections.forEach((s, i) => {
      const btn = document.createElement('button');
      const icon = svgIcon(s.id);
      btn.innerHTML = `<span class="icon">${icon}</span><span class="label">${s.title}</span>`;
      btn.dataset.section = s.id;
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSection(s.id);
      });
      tabsEl.appendChild(btn);
    });
  }

  function svgIcon(id){
    // simple single-color SVGs (use currentColor)
    switch(id){
      case 'personal': return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/></svg>`;
      case 'education': return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2 1 7l11 5 9-4.09V17h2V7L12 2z"/></svg>`;
      case 'certs': return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3 6 6 .5-4.5 4 1 6L12 16l-5.5 3.5 1-6L3 8.5 9 8 12 2z"/></svg>`;
      case 'events': return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM5 9h14v10H5V9z"/></svg>`;
      case 'skills': return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
      case 'affiliations': return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 2h-2.47c-.45.34-.98.62-1.58.8L12 22l-2.95-5.18c-.6-.18-1.13-.46-1.58-.8H5c0 2.21 3.58 4 7 4s7-1.79 7-4z"/></svg>`;
      default: return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/></svg>`;
    }
  }

  function renderSection(id) {
    contentEl.innerHTML = '';
    contentEl.classList.remove('fade-in');
    if (id === 'personal') {
      const h = document.createElement('h2'); h.className = 'section-title'; h.textContent = 'Personal Data';
      contentEl.appendChild(h);

      const card = document.createElement('div'); card.className = 'personal-card';
      const avatar = document.createElement('div'); avatar.className = 'avatar-lg';
      const img = document.createElement('img'); img.src = 'public/assets/images/TONG, GAB.png'; img.alt = 'avatar';
      avatar.appendChild(img);

      const main = document.createElement('div'); main.className = 'personal-main';
      const name = document.createElement('h2'); name.textContent = resume.personal.name || 'Name';
      const role = document.createElement('div'); role.className = 'role'; role.textContent = resume.education.degree + ' — ' + resume.education.school;

      const contactsWrap = document.createElement('div'); contactsWrap.className = 'personal-grid';
      const fields = [
        ['Birth Date', resume.personal.birthDate],
        ['Birthplace', resume.personal.birthplace],
        ['Gender', resume.personal.gender],
        ['Citizenship', resume.personal.citizenship],
        ['Religion', resume.personal.religion],
        ['Address', resume.personal.address],
        ['Email', resume.personal.email]
      ];
      fields.forEach(([label, val]) => {
        const f = document.createElement('div'); f.className = 'p-field';
        f.innerHTML = `<div class="p-label">${label}</div><div class="p-value">${val}</div>`;
        contactsWrap.appendChild(f);
      });

      main.appendChild(name); main.appendChild(role); main.appendChild(contactsWrap);
      card.appendChild(avatar); card.appendChild(main);
      contentEl.appendChild(card);
    }
    if (id === 'education') {
      const h = document.createElement('h2'); h.className = 'section-title'; h.textContent = 'Educational Background';
      contentEl.appendChild(h);
      const e = resume.education;
      const d = document.createElement('div'); d.className = 'field';
      d.innerHTML = `<strong>Degree:</strong> ${e.degree}<br/><strong>School:</strong> ${e.school} (${e.years})<br/><strong>Capstone:</strong> ${e.capstone}`;
      contentEl.appendChild(d);
      const shs = document.createElement('div'); shs.className='field'; shs.innerHTML = `<strong>Senior High:</strong> ${e.shs.school} (${e.shs.years})`; contentEl.appendChild(shs);
      const jhs = document.createElement('div'); jhs.className='field'; jhs.innerHTML = `<strong>Junior High:</strong> ${e.jhs.school} (${e.jhs.years})`; contentEl.appendChild(jhs);
    }
    if (id === 'certs') {
      const h = document.createElement('h2'); h.className = 'section-title'; h.textContent = 'Certifications';
      contentEl.appendChild(h);
      const ul = document.createElement('ul'); ul.className='cert-list';
      resume.certifications.forEach(c => { const li = document.createElement('li'); li.textContent = c; ul.appendChild(li); });
      contentEl.appendChild(ul);
    }
    if (id === 'events') {
      const h = document.createElement('h2'); h.className = 'section-title'; h.textContent = 'Seminars / Workshops / Conferences';
      contentEl.appendChild(h);
      resume.events.forEach(ev => {
        const wrap = document.createElement('div'); wrap.className = 'event';
        const img = document.createElement('img'); img.src = ev.img; img.alt = ev.title;
        const meta = document.createElement('div'); meta.className = 'meta';
        meta.innerHTML = `<strong>${ev.title}</strong><div>${ev.venue}</div><div>${ev.date}</div>`;
        wrap.appendChild(img); wrap.appendChild(meta);
        contentEl.appendChild(wrap);
        // reveal animation
        setTimeout(()=>wrap.classList.add('visible'), 60);
      });
    }
    if (id === 'skills') {
      const h = document.createElement('h2'); h.className = 'section-title'; h.textContent = 'Skills';
      contentEl.appendChild(h);
      
      if (resume.skills) {
        Object.entries(resume.skills).forEach(([category, skillList]) => {
          if (Array.isArray(skillList) && skillList.length > 0) {
            const catDiv = document.createElement('div'); catDiv.className = 'skill-category';
            const catTitle = document.createElement('h3'); 
            catTitle.textContent = category.replace(/([A-Z])/g, ' $1').replace(/^./, s=>s.toUpperCase()).trim();
            catTitle.className = 'skill-category-title';
            catDiv.appendChild(catTitle);
            
            const skillList_el = document.createElement('ul'); skillList_el.className = 'skill-list';
            skillList.forEach(skill => {
              const li = document.createElement('li'); 
              li.textContent = skill;
              li.addEventListener('click', function(e) {
                // Remove active class from all skill items
                document.querySelectorAll('.skill-list li').forEach(item => {
                  item.classList.remove('active');
                });
                // Add active class to clicked item
                this.classList.add('active');
              });
              skillList_el.appendChild(li);
            });
            catDiv.appendChild(skillList_el);
            contentEl.appendChild(catDiv);
          }
        });
      }
    }
    if (id === 'affiliations') {
      const h = document.createElement('h2'); h.className = 'section-title'; h.textContent = 'Affiliations';
      contentEl.appendChild(h);
      const ul = document.createElement('ul'); ul.className='aff-list';
      resume.affiliations.forEach(a => { const li = document.createElement('li'); li.textContent = a; ul.appendChild(li); });
      contentEl.appendChild(ul);
    }
  }

  function toLabel(key){
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, s=>s.toUpperCase());
  }

  createTabs();
  renderSection('personal');

  // Chat functionality (simple keyword-based responder over resume data)
  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const closeChat = document.getElementById('closeChat');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatLog = document.getElementById('chatLog');
  const modeQABtn = document.getElementById('modeQA');
  const modeInterviewBtn = document.getElementById('modeInterview');
  const interviewModePanel = document.getElementById('interviewModePanel');
  const jobSelect = document.getElementById('jobSelect');
  const startInterviewBtn = document.getElementById('startInterviewBtn');

  let currentMode = 'qa'; // 'qa' or 'interview'
  let currentInterviewJob = null;
  let currentMatchScore = null;
  let interviewQuestionCount = 0;
  let questionScores = [];
  let currentJobDetails = null;

  // Match calculation functions (from interview_simulator.html)
  function calculateMatchScore(jobDetails) {
    try {
      // Calculate individual component scores (all on 0-100 scale)
      const skillScore = evaluateSkillMatch(jobDetails);
      const levelScore = evaluateExperienceLevelAlignment(jobDetails);
      const certScore = evaluateCertificateRelevance(jobDetails) * 100; // Convert 0-1 to 0-100
      const projectScore = evaluateProjectExperience(jobDetails) * 100; // Convert 0-1 to 0-100
      const educationScore = evaluateEducationRelevance(jobDetails);
      
      // Calculate average of all scores
      const averageScore = (skillScore + levelScore + certScore + projectScore + educationScore) / 5;
      
      // Clamp between 15 and 92
      return Math.min(Math.max(Math.round(averageScore), 15), 92);
    } catch (error) {
      console.error('Error calculating match score:', error);
      return 65; // Fallback score
    }
  }

  function parseJobSkills(jobDetails) {
    const skillsSet = new Set();
    if (jobDetails.skills && Array.isArray(jobDetails.skills)) {
      jobDetails.skills.forEach(skill => skillsSet.add(skill.trim()));
    }
    if (jobDetails.responsibilities && Array.isArray(jobDetails.responsibilities)) {
      jobDetails.responsibilities.forEach(resp => {
        const keywords = extractTechKeywords(resp);
        keywords.forEach(kw => skillsSet.add(kw));
      });
    }
    return Array.from(skillsSet);
  }

  function extractTechKeywords(text) {
    const keywords = [];
    const techTerms = ['python', 'javascript', 'java', 'c#', 'html', 'css', 'react', 'node.js', 'express', 'django', 'flask', 'rest api', 'sql', 'mongodb', 'git', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins', 'testing', 'agile', 'scrum', 'typescript', 'angular', 'vue', 'bootstrap', 'tailwind', 'php', 'kotlin', 'ai', 'machine learning', 'automation', 'devops', 'linux', 'windows'];
    const textLower = text.toLowerCase();
    techTerms.forEach(term => { if (textLower.includes(term)) keywords.push(term); });
    return keywords;
  }

  function extractResumeSkills() {
    const skills = [];
    if (window.resumeData && window.resumeData.skills) {
      // Extract from new detailed structure
      if (window.resumeData.skills.programmingLanguages && Array.isArray(window.resumeData.skills.programmingLanguages)) {
        window.resumeData.skills.programmingLanguages.forEach(skill => {
          if (typeof skill === 'object' && skill.lang) {
            skills.push(skill.lang);
          } else if (typeof skill === 'string') {
            skills.push(skill);
          }
        });
      }
      if (window.resumeData.skills.frameworksLibraries && Array.isArray(window.resumeData.skills.frameworksLibraries)) {
        window.resumeData.skills.frameworksLibraries.forEach(skill => {
          if (typeof skill === 'object' && skill.name) {
            skills.push(skill.name);
          } else if (typeof skill === 'string') {
            skills.push(skill);
          }
        });
      }
      if (window.resumeData.skills.technicalITSkills && Array.isArray(window.resumeData.skills.technicalITSkills)) {
        window.resumeData.skills.technicalITSkills.forEach(skill => {
          if (typeof skill === 'object' && skill.skill) {
            skills.push(skill.skill);
          } else if (typeof skill === 'string') {
            skills.push(skill);
          }
        });
      }
    }
    return skills.length > 0 ? skills : ['Python', 'JavaScript', 'React', 'Node.js', 'Problem-solving', 'Communication'];
  }

  function getResumeExperienceLevel() {
    // Student with capstone project and internships - estimate as 1-2 years
    return 2;
  }

  function getJobExperienceLevel(jobDetails) {
    const experienceText = (jobDetails.experience || []).join(' ').toLowerCase();
    const titleLower = (jobDetails.title || '').toLowerCase();
    
    // Check title first
    if (titleLower.includes('principal') || titleLower.includes('architect')) return 8;
    if (titleLower.includes('lead') || titleLower.includes('staff')) return 6;
    if (titleLower.includes('senior')) return 5;
    if (titleLower.includes('mid-level') || titleLower.includes('mid level')) return 3;
    if (titleLower.includes('junior') || titleLower.includes('entry') || titleLower.includes('graduate')) return 1;
    
    // Check experience text
    if (experienceText.includes('10+') || experienceText.includes('10+ years')) return 8;
    if (experienceText.includes('7+') || experienceText.includes('7-10')) return 6;
    if (experienceText.includes('5+') || experienceText.includes('5-7')) return 5;
    if (experienceText.includes('3-5') || experienceText.includes('3 to 5')) return 4;
    if (experienceText.includes('2-3') || experienceText.includes('2 to 3')) return 3;
    if (experienceText.includes('1-2') || experienceText.includes('0-1') || experienceText.includes('entry')) return 1;
    
    // Default to mid-level
    return 3;
  }

  function evaluateExperienceLevelAlignment(jobDetails) {
    const resumeLevel = getResumeExperienceLevel();
    const jobLevel = getJobExperienceLevel(jobDetails);
    const difference = Math.abs(resumeLevel - jobLevel);
    
    // Return 0-100 score based on alignment
    if (difference === 0) return 100;        // Perfect match
    else if (difference === 1) return 85;    // Very close
    else if (difference === 2) return 70;    // Close enough
    else if (difference === 3) return 55;    // Moderate gap
    else if (difference >= 4 && resumeLevel < jobLevel) return 40; // Underqualified
    else if (difference >= 4) return 65;     // Overqualified (still good)
    return 50;
  }

  function evaluateCertificateRelevance(jobDetails) {
    const jobTitle = (jobDetails.title || '').toLowerCase();
    const jobSkills = (jobDetails.skills || []).map(s => s.toLowerCase());
    return evaluateCertificateRelevanceDetailed(jobDetails, jobTitle, jobSkills);
  }

  function evaluateProjectExperience(jobDetails) {
    const jobTitle = (jobDetails.title || '').toLowerCase();
    const jobSkills = (jobDetails.skills || []).map(s => s.toLowerCase());
    return evaluateProjectExperienceDetailed(jobDetails, jobTitle, jobSkills);
  }

  function evaluateEducationRelevance(jobDetails) {
    if (!window.resumeData || !window.resumeData.education) return 60; // Base score on 0-100 scale
    
    const jobTitle = (jobDetails.title || '').toLowerCase();
    const jobSkills = (jobDetails.skills || []).map(s => s.toLowerCase()).join(' ');
    const jobFullDescription = (jobTitle + ' ' + jobSkills).toLowerCase();
    
    let educationScore = 50; // Base score
    
    // Computer Science or related degree
    const degree = (window.resumeData.education.degree || '').toLowerCase();
    if (degree.includes('computer') || degree.includes('information') || degree.includes('engineering') || degree.includes('technology')) {
      educationScore += 20;
    }
    
    // Capstone project relevance
    const capstone = (window.resumeData.education.capstone || '').toLowerCase();
    const relevantCapstoneKeywords = ['ai', 'machine learning', 'automation', 'system', 'application', 'platform', 'framework', 'database', 'api', 'cloud'];
    const hasRelevantCapstone = relevantCapstoneKeywords.some(kw => capstone.includes(kw) && jobFullDescription.includes(kw));
    if (hasRelevantCapstone) {
      educationScore += 15;
    } else if (capstone.length > 0) {\n      educationScore += 5; // Some credit for having a capstone\n    }\n    \n    return Math.min(educationScore, 100);\n  }\n\n  chatToggle.addEventListener('click', () => { chatPanel.classList.toggle('hidden'); });
  closeChat.addEventListener('click', () => { chatPanel.classList.add('hidden'); });

  // Mode switching
  function switchMode(mode) {
    currentMode = mode;
    // Update button states
    if (mode === 'qa') {
      modeQABtn.classList.add('active');
      modeInterviewBtn.classList.remove('active');
      chatForm.style.display = 'flex';
      interviewModePanel.style.display = 'none';
      chatLog.innerHTML = ''; // Clear chat log
      appendMsg("Hello! I'm your resume AI assistant. Ask me anything about your background.", 'bot');
    } else if (mode === 'interview') {
      modeQABtn.classList.remove('active');
      modeInterviewBtn.classList.add('active');
      chatForm.style.display = 'none';
      interviewModePanel.style.display = 'block';
      chatLog.innerHTML = ''; // Clear chat log
      appendMsg("Interview Practice Mode initiated. Select a position from the list to begin the assessment.", 'bot');
    }
  }

  modeQABtn.addEventListener('click', () => switchMode('qa'));
  modeInterviewBtn.addEventListener('click', () => switchMode('interview'));

  // Interview mode handler
  startInterviewBtn.addEventListener('click', async () => {
    const selectedJob = jobSelect.value;
    if (!selectedJob) {
      appendMsg("Please select a job position first.", 'bot');
      return;
    }
    
    currentInterviewJob = selectedJob;
    
    // Reset interview tracking variables
    interviewQuestionCount = 0;
    questionScores = [];
    currentJobDetails = null;
    
    // Load and parse job file
    try {
      const response = await fetch(selectedJob);
      const jobContent = await response.text();
      const jobDetails = parseJobMarkdown(jobContent);
      currentJobDetails = jobDetails;
      
      // Calculate match score
      currentMatchScore = calculateMatchScore(jobDetails);
      
      // Switch to chat mode
      chatForm.style.display = 'flex';
      interviewModePanel.style.display = 'none';
      chatLog.innerHTML = '';
      
      // Display welcome message
      const welcomeMessage = `Interview initiated for position: ${jobDetails.title}\n\nProceeding with technical assessment.`;
      appendMsg(welcomeMessage, 'bot');
      
      // Start the auto-flow interview with question 1
      setTimeout(() => {
        generateInterviewQuestion(jobDetails, 1);
      }, 1000);
    } catch (error) {
      appendMsg("System error: Unable to load position details. Please try again.", 'bot');
      console.error("Error:", error);
    }
  });

  function parseJobMarkdown(content) {
    const lines = content.split('\n');
    const parsed = {
      title: '',
      company: '',
      location: '',
      type: '',
      responsibilities: [],
      skills: [],
      experience: [],
      salary: ''
    };

    let currentSection = null;

    for (let line of lines) {
      line = line.trim();
      if (line.startsWith('# ')) {
        parsed.title = line.replace(/^# /, '').trim();
      } else if (line.startsWith('## Company')) {
        currentSection = 'company';
      } else if (line.startsWith('## Key Responsibilities')) {
        currentSection = 'responsibilities';
      } else if (line.startsWith('## Required Skills')) {
        currentSection = 'skills';
      } else if (line.startsWith('## Experience')) {
        currentSection = 'experience';
      } else if (line.startsWith('- ')) {
        const item = line.replace(/^- /, '').trim();
        if (currentSection === 'responsibilities') {
          parsed.responsibilities.push(item);
        } else if (currentSection === 'skills') {
          parsed.skills.push(item);
        } else if (currentSection === 'experience') {
          parsed.experience.push(item);
        }
      } else if (currentSection === 'company' && line && !line.startsWith('**') && parsed.company === '') {
        parsed.company = line;
      }
    }

    return parsed;
  }

  function generateAnswerFromResume(question) {
    try {
      const qa = window.resumeData;
      const qLower = question.toLowerCase();
      
      // Route to job-specific answer generators based on question content
      if (/(machine learning|ml|training|model|data|preprocessing)/.test(qLower)) {
        return generateAIAnswers(qa, question);
      }
      if (/(api|rest|design|frontend|component|react|svelte|framework)/.test(qLower)) {
        return generateFrontendAnswers(qa, question);
      }
      if (/(full.?stack|architecture|deploy|database|postgres|mongodb)/.test(qLower)) {
        return generateFullStackAnswers(qa, question);
      }
      if (/(docker|kubernetes|ci.?cd|pipeline|devops|container|infrastructure)/.test(qLower)) {
        return generateDevOpsAnswers(qa, question);
      }
      if (/(test|automation|bug|qa|coverage|quality)/.test(qLower)) {
        return generateQAAnswers(qa, question);
      }
      if (/(security|encryption|compliance|gdpr|cybersecurity|vulnerability)/.test(qLower)) {
        return generateSecurityAnswers(qa, question);
      }
      if (/(maintain|refactor|technical debt|code quality|clean|architecture|mentor)/.test(qLower)) {
        return generateLeadershipAnswers(qa, question);
      }
      if (/(learn|growth|new technology|approach|recent)/.test(qLower)) {
        return generateLearningAnswers(qa, question);
      }
      
      return generateGenericAnswer(qa, question);
    } catch (error) {
      console.error('Error generating answer:', error);
      return 'I focus on applying my technical skills to solve real-world problems while maintaining code quality and collaborating effectively with teams.';
    }
  }

  function generateAIAnswers(qa, question) {
    const qLower = question.toLowerCase();
    
    if (/(model.*production|production.*issue|monitoring|performance|deploy)/.test(qLower)) {
      return `In my Beaconet capstone project, I built machine learning models using neural network algorithms for proximity detection. I implemented comprehensive monitoring through logging frameworks and performance metrics. When models underperform, I follow a systematic approach: first, I analyze training data quality and feature distributions to detect data drift. Then I check model metrics against baseline performance. I've learned that retraining frequency, validation strategies, and A/B testing are critical for production reliability. I also maintain model versioning and fallback mechanisms to ensure system stability.`;
    }
    
    if (/(feature|evaluation|metric|cross.?validation)/.test(qLower)) {
      return `For feature engineering, I start by understanding the business context and data characteristics. In my capstone, I engineered spatial proximity features using beacon technology and grid-based indexing. I evaluate models using multiple metrics depending on the use case: for decision support systems, I focus on precision and recall; for ranking systems, I use NDCG. I validate approaches through cross-validation and train-test splits. I completed the "AI Fundamentals with IBM SkillsBuild" certification which covered these exact methodologies - supervised and unsupervised learning approaches that inform my evaluation strategy.`;
    }
    
    if (/(ethical|bias|fairness|responsible)/.test(qLower)) {
      return `Building ethical AI is central to my approach. I completed the "Responsible Technology: Ethics in IT Systems" certification which deeply covered bias detection, fairness mitigation, and privacy compliance. In practice, this means: first, I audit training data for demographic representation issues. Second, I test models across different demographic groups for performance parity. Third, I implement fairness constraints if needed. For my capstone's decision support system, I documented all limitations and assumptions transparently. I also stay current with GDPR and local regulations regarding data privacy and model accountability.`;
    }
    
    if (/(framework|recent|trends|stay.*current)/.test(qLower)) {
      return `I stay current through multiple channels. I've completed "Introduction to Modern AI" which covered LLMs, GPT architectures, and prompt engineering in production. I regularly attend tech talks like "AI in the Loop: Navigating Tech Careers in a New Era" and read about emerging frameworks. Right now, I'm exploring transformer architectures beyond traditional supervised learning. I also practice through hands-on projects - my recent work with n8n automation shows how I apply new ML concepts to business process optimization. I find that building small projects with new tools is the best way to truly understand them.`;
    }
    
    if (/(experience.*model|build|project|hands.?on)/.test(qLower)) {
      return `I have substantial hands-on experience building complete ML pipelines. My Beaconet capstone was a full machine learning project: I preprocessed beacon sensor data, trained proximity detection models using Python, and implemented decision support logic. The complete workflow included data cleaning (handling missing values, normalization), feature engineering (spatial indexing), model selection (comparing algorithms), hyperparameter tuning, and evaluation on held-out test sets. I used scikit-learn and TensorFlow for implementation. This project taught me the entire ML lifecycle from problem definition to production considerations.`;
    }
    
    return `I've built machine learning systems through my capstone project, Beaconet, which implements AI-driven proximity detection with decision support components. I have certifications in AI Fundamentals and Modern AI covering supervised/unsupervised learning, neural networks, and practical production applications. I approach ML holistically: understanding data requirements, selecting appropriate algorithms, validating thoroughly, and deploying responsibly. I'm particularly focused on ethical AI practices after completing my Responsible Technology certification, ensuring our systems are fair, transparent, and compliant with regulations.`;
  }

  function generateFrontendAnswers(qa, question) {
    const qLower = question.toLowerCase();
    
    if (/(framework|react|svelte|component|lifecycle)/.test(qLower)) {
      return `I have strong experience with modern frontend frameworks. I completed "SvelteKit - A Framework for Startups" training which covers reactive components, server-side rendering, and file-based routing. I also have hands-on React experience building component-based UIs with hooks and state management patterns. In practice, I design components to be reusable and maintainable, using composition over inheritance. I leverage framework-specific features like React hooks or Svelte's reactive declarations to manage component state cleanly. In my personal projects, I've built complex components with proper lifecycle handling, async data loading, and error boundaries.`;
    }
    
    if (/(responsive|design|mobile|breakpoint|accessibility)/.test(qLower)) {
      return `Responsive design is fundamental to my development philosophy. I use CSS Grid and Flexbox for flexible layouts that adapt across devices. I implement mobile-first design, starting with small screens and progressively enhancing for larger ones. I've tested approaches at multiple breakpoints (mobile 320px, tablet 768px, desktop 1024px+). I also prioritize accessibility - semantic HTML, ARIA labels, keyboard navigation, and color contrast that meets WCAG 2.1 standards. This isn't just compliance; it ensures my applications work for everyone. I've built several projects that pass accessibility audits while maintaining beautiful designs.`;
    }
    
    if (/(state|management|redux|context|api)/.test(qLower)) {
      return `For state management, I choose the approach based on application complexity. For simple applications, I use local component state. As complexity grows, I implement prop drilling patterns or use Context API. For larger applications requiring complex state logic, I'd implement Redux or Zustand. I also have strong REST API integration experience - making fetch calls, handling async operations with async/await, managing request states (loading, error, success), and caching strategies. In my projects, I've integrated with various APIs, handled authentication tokens securely, and implemented optimistic updates for better UX.`;
    }
    
    if (/(performance|optimization|loading|render|bundle)/.test(qLower)) {
      return `Performance optimization is crucial for user experience. I implement several techniques: code splitting and lazy loading to reduce initial bundle size, image optimization using modern formats and responsive images, memoization to prevent unnecessary re-renders, and pagination or virtual scrolling for large datasets. I use browser dev tools to identify bottlenecks through performance profiling. I also optimize perceived performance through skeleton loaders, progressive enhancement, and strategic preloading. I haven't done production-scale optimization yet, but my coursework and personal projects have given me solid understanding of these patterns.`;
    }
    
    if (/(test|jest|testing)/.test(qLower)) {
      return `I approach frontend testing with Jest for unit tests and RTL (React Testing Library) for component tests. I write tests that verify behavior from the user's perspective rather than implementation details. For example, I test that clicking a button produces the expected result, not that a specific state change occurred. I aim for meaningful test coverage - testing critical user paths, error states, and edge cases rather than chasing 100% line coverage. I also appreciate how testing drives better design: forces me to write testable, decoupled components.`;
    }
    
    return `I have practical frontend development experience with modern frameworks like React and SvelteKit. I focus on building responsive, accessible user interfaces that work seamlessly across devices. I'm proficient in CSS Grid and Flexbox, implement performance optimizations like code splitting and lazy loading, and write maintainable component code. I test my work with Jest and ensure WCAG accessibility standards. My approach combines good design principles with technical excellence.`;
  }

  function generateFullStackAnswers(qa, question) {
    const qLower = question.toLowerCase();
    
    if (/(architecture|design|decision|framework|svelte|next)/.test(qLower)) {
      return `For full-stack architecture, I start by understanding requirements and constraints. I completed SvelteKit training specifically because it's a modern full-stack framework handling both frontend and backend intelligently. My architectural approach considers: frontend needs (responsiveness, performance), backend requirements (scalability, reliability), and integration points (APIs, data flow). I make technology choices based on team expertise, project requirements, and maintenance considerations. I've learned that choosing a cohesive stack (like Node.js + React, or SvelteKit for everything) reduces mental overhead and context switching.`;
    }
    
    if (/(api|rest|design|endpoint|http)/.test(qLower)) {
      return `For API design, I follow RESTful principles. I structure endpoints around resources (/users, /posts), use appropriate HTTP methods (GET for retrieval, POST for creation, PUT for updates, DELETE for removal), and return meaningful status codes. I version APIs for backward compatibility. I document thoroughly using OpenAPI/Swagger. Request/response shapes are consistent and predictable. I implement proper error handling with descriptive error messages. For authentication, I use industry standards like JWT tokens. I've also worked with streaming and pagination for large datasets. Good API design makes frontend integration straightforward and enables multiple clients.`;
    }
    
    if (/(database|postgres|mongo|sql|schema|query|optimization)/.test(qLower)) {
      return `I have experience with both relational and document databases. With PostgreSQL and MySQL, I design normalized schemas, write efficient queries using proper indexes, use JOINs for relational data, and understand transaction ACID properties. With MongoDB, I design by query patterns, leverage document flexibility, and use aggregation pipelines for complex operations. My approach: understand access patterns first, then design schema accordingly. I optimize through indexing, query analysis, and occasional denormalization when it significantly improves performance. I also consider backup/recovery strategies and maintain data integrity constraints.`;
    }
    
    if (/(deploy|production|ci.*cd|github.*actions|environment)/.test(qLower)) {
      return `For deployment, I believe in automation through CI/CD pipelines. Using GitHub Actions, I set up workflows that: automatically run tests on every push, build the application if tests pass, deploy to staging for validation, and then promote to production. I manage environment variables separately for dev/staging/production, use Docker for consistent environments, and implement health checks. I also think about monitoring post-deployment - error tracking, performance metrics, and logs. I haven't done large-scale production deployment yet, but my coursework has covered these patterns thoroughly.`;
    }
    
    if (/(svelte|next|modern|framework)/.test(qLower)) {
      return `I just completed SvelteKit training and I'm excited about it as a modern full-stack framework. Unlike traditional separated frontend/backend, SvelteKit handles both intelligently: you write endpoints as simple files, fetch them cleanly from components, and get automatic progressive enhancement. Server-side rendering eliminates client-side blank states. File-based routing reduces boilerplate. Reactive declarations make state management intuitive. It's productive for startups because you're not juggling separate codebases. I value frameworks that reduce cognitive load while maintaining capability.`;
    }
    
    return `I approach full-stack development by selecting appropriate technologies for each layer. I'm trained in SvelteKit for modern full-stack applications, have REST API design experience, and understand both relational and document databases. I design scalable systems with proper separation of concerns, implement robust error handling, and automate deployment through CI/CD. My philosophy is choosing tools that work well together and maintaining consistency across the stack.`;
  }

  function generateDevOpsAnswers(qa, question) {
    const qLower = question.toLowerCase();
    
    if (/(docker|container|orchestration|kubernetes)/.test(qLower)) {
      return `I understand containerization through Docker - building images that package applications with all dependencies, enabling consistency across environments. Images are built from Dockerfiles defining the environment, and containers run these images in isolation. For orchestration at scale, Kubernetes manages multiple containers across machines - handling deployment, scaling, and networking automatically. I haven't done production Kubernetes yet, but I understand the concepts: pods (smallest deployable unit), services (networking), deployments (manage replicas), and persistent volumes for state.`;
    }
    
    if (/(ci.*cd|pipeline|github.*actions|automat)/.test(qLower)) {
      return `CI/CD automation is essential for reliable deployments. Using GitHub Actions, I create workflows with triggers (on push, on PR). Stages typically include: test (run unit/integration tests), build (compile/bundle), and deploy (push to staging/production). Each stage must pass before proceeding. This catches issues early and ensures only validated code reaches production. I also implement notifications when pipelines fail. The goal is making deployment fast, reliable, and repeatable - removing manual, error-prone steps.`;
    }
    
    if (/(monitoring|logging|observability|metrics|issue)/.test(qLower)) {
      return `Observability is how you understand what's happening in production. I think of three pillars: logs (event records), metrics (quantitative measurements over time), and traces (request flows). I've configured logging frameworks to capture important events without overwhelming storage. For metrics, I'd monitor application health (error rates, latency), system resources (CPU, memory), and business metrics (user signups, transactions). I use tools like dashboards to visualize trends and alerts to notify when thresholds are exceeded. Good observability enables rapid issue diagnosis.`;
    }
    
    if (/(security|access|secrets|deployment)/.test(qLower)) {
      return `Security in DevOps means multiple layers. I've completed cybersecurity training covering network security, encryption protocols, and secure coding. In deployment contexts, this means: storing secrets (API keys, passwords) securely using environment-specific vaults, not in code. Implementing access controls so only authorized teams can deploy. Using HTTPS for all communications. Scanning dependencies for vulnerabilities. Keeping infrastructure updated with security patches. And logging security events for audit trails. DevOps security isn't an afterthought - it's baked into the entire deployment process.`;
    }
    
    if (/(infrastructure|code|iac|terraform)/.test(qLower)) {
      return `Infrastructure as Code means defining infrastructure in code rather than manual configuration. Tools like Terraform let you declare desired infrastructure state, then apply changes consistently. Benefits include: reproducibility (spin up identical environments), version control (track infrastructure changes), rapid scaling (code-based provisioning), and disaster recovery (rebuild from code). I understand the concept deeply even though I'm still gaining hands-on Terraform experience. The paradigm shift is thinking of infrastructure like application code - declarative, tested, versioned.`;
    }
    
    return `I understand DevOps as automating and monitoring the entire software lifecycle. I'm familiar with containerization (Docker), CI/CD pipelines (GitHub Actions), and infrastructure automation concepts. I've completed relevant training in cybersecurity and system design. My approach emphasizes automation to reduce manual errors, comprehensive monitoring for visibility, and security throughout the deployment pipeline.`;
  }

  function generateQAAnswers(qa, question) {
    const qLower = question.toLowerCase();
    
    if (/(automation|strategy|testing|approach)/.test(qLower)) {
      return `My testing strategy prioritizes automation and meaningful coverage over coverage percentages. I use Jest for unit testing individual functions and components in isolation. I write integration tests for feature workflows crossing multiple components. End-to-end testing (Selenium/Cypress) validates complete user journeys in real browsers. The pyramid model guides my mix: many small unit tests (fast, specific), fewer integration tests, and just enough E2E tests for critical paths. This approach catches issues early while maintaining reasonable test execution speed.`;
    }
    
    if (/(bug|finding|document|issue|report)/.test(qLower)) {
      return `When finding bugs, I'm methodical. First, I reproduce consistently and understand the exact conditions triggering the issue - what steps did I take? Did it happen once or repeatedly? What environment? Then I document clearly: expected behavior, actual behavior, reproduction steps, environment details. I create isolated test cases that fail, making debugging easier. For complex bugs, I use debuggers to step through code at breakpoints, examine variable states. This systematic approach often reveals root cause quickly. I also learn from bugs - was this preventable by better tests or typing?`;
    }
    
    if (/(api|testing|tool|postman|rest)/.test(qLower)) {
      return `API testing is crucial for backend quality. Postman is my go-to tool for REST API testing - I create test suites validating endpoints, status codes, response payloads. I test happy paths (status 200 with correct data) and error cases (4xx/5xx with appropriate errors). I validate response schemas, ensure consistent error formats, and test edge cases like boundary values. I also automate these tests in CI/CD pipelines. This catches API regressions before they reach production.`;
    }
    
    if (/(collaborate|developer|quality|culture|code review)/.test(qLower)) {
      return `QA isn't separate from development - it's shared responsibility. I collaborate with developers to understand features before implementation, suggesting testable design. I provide early feedback on architectures that are hard to test. After implementation, I conduct thorough testing but also understand that some issues escape to production despite best efforts. Good QA culture means developers write their own unit tests, we have dedicated acceptance tests for stories, and we're all committed to quality. I practice test-driven development when appropriate - writing tests first drives better design.`;
    }
    
    if (/(coverage|suite|good|metrics)/.test(qLower)) {
      return `Good test suites are maintainable, not just comprehensive. I focus on testing behavior and user paths rather than implementation details. Tests should fail for real reasons, not because of refactoring. Good metrics are: how many critical functionality paths are tested? How quickly do tests execute? Can developers understand what each test validates? Coverage percentage is less important - I'd rather have 60% meaningful coverage than 100% coverage of trivial assertions. The goal is confidence that the system works, not checking boxes.`;
    }
    
    return `I approach QA by automating test execution, testing across the pyramid (unit, integration, E2E), and maintaining close collaboration with developers. I focus on meaningful test coverage that validates actual user scenarios and catches regressions early. Good QA is about building quality into the process, not just verifying after the fact.`;
  }

  function generateSecurityAnswers(qa, question) {
    const qLower = question.toLowerCase();
    
    if (/(assessment|testing|penetration|methodology)/.test(qLower)) {
      return `Security assessments follow a structured methodology. I approach this like: first, reconnaissance - understanding the system architecture, technologies, and potential attack surface. Then vulnerability scanning - automated tools and manual exploration for common vulnerabilities (injection flaws, authentication weaknesses). Penetration testing simulates actual attacks to confirm vulnerabilities are exploitable. Finally, reporting findings with severity, impact, and remediation steps. I completed cybersecurity training covering OWASP Top 10, threat modeling, and common vulnerabilities. The goal is helping teams understand and fix security issues before attackers exploit them.`;
    }
    
    if (/(coding|vulnerability|sql.*injection|xss|csrf|flaws)/.test(qLower)) {
      return `Secure coding prevents vulnerabilities from being introduced. Common issues include: SQL injection (sanitize database inputs), XSS (escape HTML output), CSRF (validate request origins), authentication flaws (strong passwords, secure session handling). My approach: use parameterized queries, framework-provided escaping, validate all inputs, don't store sensitive data in code. I've completed training in secure coding practices and understand GDPR implications. Many vulnerabilities stem from developers not understanding security - I'd work to educate teams, provide secure patterns, and conduct security-focused code reviews.`;
    }
    
    if (/(encryption|key|data.*protection|storage)/.test(qLower)) {
      return `Data protection involves encryption at multiple levels. In transit, HTTPS (TLS) encrypts communication between client and server - preventing interception. At rest, sensitive data (passwords, tokens, PII) should be encrypted using strong algorithms (AES-256). Key management is critical - secure generation, rotation, storage in access-limited vaults, never hardcoding. For passwords specifically, use strong hashing algorithms (bcrypt, scrypt) with salts. Cryptography is complex - I prefer using proven libraries rather than rolling my own. I completed cybersecurity training specifically covering encryption protocols and secure storage practices.`;
    }
    
    if (/(threat|vulnerability|recent|stay.*current|informed)/.test(qLower)) {
      return `Staying informed about threats is essential. I follow security communities, monitor CVE databases for vulnerabilities affecting technologies we use, and read security blogs. Recently, I've tracked vulnerabilities in popular frameworks and dependencies - understanding exploitation mechanics helps prioritize patching. I completed "IT Cybersecurity Roadshow" which engaged with current threat landscape. I also understand responsible disclosure - if I find a vulnerability, the ethical approach is to report privately to vendors before public disclosure.`;
    }
    
    if (/(compliance|gdpr|standards|requirement|audit)/.test(qLower)) {
      return `Compliance requirements like GDPR demand: understanding what personal data you collect and why, obtaining consent, implementing privacy by design, and having processes for data access/deletion requests. Security controls must be auditable - can you prove you're protecting data appropriately? I completed "Responsible Technology: Ethics in IT Systems" certification which covered privacy regulations, bias mitigation, and compliance approaches. My philosophy is building security controls because they're right, not just for compliance - though compliance requirements help drive that.`;
    }
    
    return `I approach security as multi-layered defense. I'm trained in common vulnerabilities (OWASP Top 10), secure coding practices, encryption, and compliance frameworks like GDPR. I focus on fixing security issues early through threat modeling, secure design, and code review. I stay current with emerging threats and best practices. Security isn't an afterthought - it's fundamental to responsible development.`;
  }

  function generateLeadershipAnswers(qa, question) {
    const qLower = question.toLowerCase();
    
    if (/(architecture|design|decision|technology|choice|justify)/.test(qLower)) {
      return `Architectural decisions should balance multiple concerns. I evaluate: does this solve the current problem? Is it maintainable long-term? What's the learning curve? Can it scale? What are failure modes? I involve the team in decisions - others see issues I miss. I also consider technical debt implications - optimizing too early creates debt, waiting too long creates risk. In my capstone, I designed Beaconet's architecture to separate concerns: data ingestion layer, processing layer, decision support layer. This enables independent evolution and testing.`;
    }
    
    if (/(mentor|junior|code.*review|knowledge|sharing)/.test(qLower)) {
      return `Mentoring is about growth, not dictation. I approach code reviews looking for improvement opportunities while respecting autonomy. I try to explain the "why" behind feedback - what principle or pattern does this relate to? I celebrate good code and learning from mistakes. I also seek feedback myself - I'm not the authority, I'm learning too. Through my JPCS Director role for special projects, I've organized tech talks and workshops, trying to create spaces where people grow together. Effective mentoring builds confidence and capability in others.`;
    }
    
    if (/(challenge|overcome|learning|improvement|problem)/.test(qLower)) {
      return `The biggest challenge in my capstone was implementing decision support with multiple weighted factors - ensuring logic was understandable, maintainable, and produced correct results. I overcame this by: creating clear abstractions for decision rules, writing extensive tests validating the logic, documenting the weighting rationale, and iterating based on feedback. This challenged me technically (complex algorithms) and taught me that clear documentation is as important as clever implementation. The most valuable learning is often from difficult problems.`;
    }
    
    if (/(debt|refactor|feature|balance|priority)/.test(qLower)) {
      return `Technical debt is like financial debt - sometimes borrowing is smart (ship fast to validate), but paying interest is expensive (slower future development). My approach: track debt explicitly, understand the cost (developer velocity hit), and prioritize. I don't refactor for perfection - I refactor when it unblocks progress or reduces future burden. I balance shipping features (business value, team morale) with paying down debt (long-term velocity, predictability). This usually means: feature, feature, technical work, repeat. Total refactor sprints risk irrelevance.`;
    }
    
    if (/(philosophy|code.*quality|practice|standard|team)/.test(qLower)) {
      return `Clean code is an investment in future developers - your teammates and future you. Principles like SOLID (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion) create flexibility and reduce bugs. DRY (Don't Repeat Yourself) prevents inconsistency. Meaningful names make code self-documenting. I establish standards by example, code review, and discussion - not dictation. When everyone understands why clean code matters, they own quality rather than complying reluctantly.`;
    }
    
    return `I believe in principle-driven architecture that balances current needs with long-term maintainability. I approach technical decisions collaboratively, involving the team in reasoning. I mentor through explanation and example, celebrate learning, and share knowledge openly. I manage technical debt strategically, understanding that some debt is valuable but it has a cost. My philosophy centers on sustainable development practices.`;
  }

  function generateLearningAnswers(qa, question) {
    const qLower = question.toLowerCase();
    
    if (/(sveltekit|n8n|python|recent|certificate|training)/.test(qLower)) {
      const certList = qa.certifications ? qa.certifications.slice(0, 3).map(c => `${typeof c === 'object' ? c.title : c}`).join(', ') : 'various courses';
      return `I pursue learning systematically. Recently, I completed SvelteKit training because full-stack development is increasingly important - learning this framework taught me how modern tooling simplifies complexity. I also completed n8n for AI-powered automation, showing how to build intelligent workflows without extensive coding. Before that, Python fundamentals deepened my programming foundation. My approach: identify a relevant skill gap, find structured learning (formal course beats random tutorials), implement immediately with a project, then teach others to solidify understanding.`;
    }
    
    if (/(approach|strategy|resources|project|hands.*on)/.test(qLower)) {
      const recentEvent = qa.events ? qa.events[0] : null;
      return `My learning approach combines multiple channels. I take formal courses (IBM SkillsBuild, Coursera) for structured foundations. I attend workshops like "${recentEvent ? recentEvent.title : 'industry events'}" for exposure to new ideas. I read documentation and blogs for specific techniques. Most importantly, I build projects immediately - theory without practice doesn't stick. I also contribute to open source and participate in hackathons like the HacKada challenge, which force me to apply learning under pressure. I find that teaching others (like my Hour of Code sessions) solidifies my understanding dramatically.`;
    }
    
    if (/(new.*technology|framework|adapt|quick.*learn|growth)/.test(qLower)) {
      return `New technologies are exciting and intimidating. My adaptation strategy: understand the core concepts first (what problem does this solve?), find small tutorials/examples to see it in action, then build something real with it. I accept I won't be expert immediately - it's okay to reference documentation frequently at first. I ask for help from more experienced teammates. I also learn from failures - when something doesn't work, debugging teaches more than success. The confidence to learn new technologies comes from past success doing exactly this.`;
    }
    
    if (/(commitment|continuous|mindset)/.test(qLower)) {
      return `My commitment to learning is genuine. Technology evolves rapidly - staying relevant requires continuous growth. I've completed 18+ certifications this year across AI, security, automation, and frameworks. But certifications alone don't mean growth - it's applying learning to projects, making mistakes, recovering, and improving. I'm genuinely excited about mastering my craft, not just checking boxes. I believe if I stop learning, I stagnate. This drive comes from passion for building great things.`;
    }
    
    return `I approach learning systematically: identify skill gaps, pursue structured training, implement immediately with projects, and teach others to solidify understanding. I draw from multiple sources - certifications, workshops, documentation, and hands-on projects. My philosophy is continuous growth - the pace of technology change requires ongoing learning, and I'm genuinely excited about deepening my expertise.`;
  }

  function generateGenericAnswer(qa, question) {
    const qLower = question.toLowerCase();
    
    if (/(experience|background|yourself)/.test(qLower)) {
      const degree = qa.education ? qa.education.degree : 'Computer Science';
      const school = qa.education ? qa.education.school : 'university';
      return `I'm a ${degree} student at ${school} with hands-on experience across multiple domains. My capstone project, Beaconet, uses AI and spatial indexing for lost item tracking. I've completed extensive certifications in AI, automation, and security. I'm actively involved in professional organizations (JPCS Director for Special Projects) and community education (Hour of Code sessions). I'm passionate about building technology that solves real problems.`;
    }
    
    if (/(interest|role|align|motivation|goal)/.test(qLower)) {
      return `I'm interested in this role because it aligns with my technical strengths and career trajectory. I've invested significantly in relevant skills through certifications and projects. I'm excited about the opportunity to contribute meaningfully to your team while continuing to grow. I believe this position offers the technical challenges and collaborative environment where I can excel and make impact.`;
    }
    
    if (/(skill|ability|strength)/.test(qLower)) {
      return `My key strengths are: strong technical foundation across multiple domains (AI, web development, infrastructure), ability to learn new technologies quickly as demonstrated through recent certifications, hands-on project experience from capstone and hackathons, and genuine passion for collaborative problem-solving. I also bring perspective from my involvement in professional communities and teaching programming to others.`;
    }
    
    if (/(challenge|problem|approach|solve)/.test(qLower)) {
      return `My problem-solving approach is systematic: first understand the problem deeply (what are we actually solving?), explore options and their tradeoffs, validate assumptions, implement incrementally with testing, and iterate based on feedback. I'm not afraid to ask questions when I'm unclear. I also collaborate - often the best insights come from diverse perspectives. Challenging problems are where I learn most, so I embrace them rather than avoiding them.`;
    }
    
    return `I bring a combination of technical depth from my computer science studies, breadth from diverse certifications and projects, and genuine passion for impactful technology. I learn quickly, collaborate effectively, and approach problems systematically. I'm excited about contributing to your team.`;
  }

  function calculatePerQuestionScore(jobDetails, questionNum) {
    try {
      const qa = window.resumeData;
      const jobTitle = (jobDetails.title || '').toLowerCase();
      const jobSkills = (jobDetails.skills || []).map(s => s.toLowerCase());
      
      // Calculate component scores with higher precision
      const skillScore = evaluateSkillMatchAccuracy(jobDetails, jobTitle, jobSkills);
      const levelScore = calculateLevelAlignment(getResumeExperienceLevel(), getJobExperienceLevel(jobDetails));
      const certScore = evaluateCertificateRelevanceDetailed(jobDetails, jobTitle, jobSkills);
      const projectScore = evaluateProjectExperienceDetailed(jobDetails, jobTitle, jobSkills);
      
      let finalScore = 0;
      
      // Distribute scores across questions based on resume strengths
      switch(questionNum) {
        case 1: 
          // Q1: Technical experience - weighted by skills and projects
          finalScore = (skillScore * 0.6) + (projectScore * 0.4);
          break;
        case 2: 
          // Q2: Problem-solving - weighted by projects and level
          finalScore = (projectScore * 0.5) + (levelScore * 0.3) + (certScore * 0.2);
          break;
        case 3: 
          // Q3: Technical accomplishments - weighted by certs and skills
          finalScore = (certScore * 0.5) + (skillScore * 0.35) + (projectScore * 0.15);
          break;
        case 4: 
          // Q4: Learning approach - weighted by certs and level
          finalScore = (certScore * 0.6) + (levelScore * 0.3) + (skillScore * 0.1);
          break;
        case 5: 
          // Q5: Tech stack knowledge - weighted by skills and overall fit
          finalScore = (skillScore * 0.5) + (certScore * 0.3) + (levelScore * 0.2);
          break;
      }
      
      return Math.min(Math.max(Math.round(finalScore), 35), 90);
    } catch (error) {
      console.error('Error calculating question score:', error);
      return 65;
    }
  }

  function evaluateSkillMatchAccuracy(jobDetails, jobTitle, jobSkills) {
    const resumeSkills = extractResumeSkillsDetailed();
    let matchedSkills = [];
    
    jobSkills.forEach(jobSkill => {
      const matchedSkill = resumeSkills.find(rs => {
        const rsLower = rs.toLowerCase();
        const jsLower = jobSkill.toLowerCase();
        return rsLower === jsLower || rsLower.includes(jsLower) || jsLower.includes(rsLower);
      });
      if (matchedSkill) matchedSkills.push(matchedSkill);
    });
    
    const baseSkillScore = jobSkills.length > 0 ? (matchedSkills.length / jobSkills.length) * 100 : 50;
    
    // Bonus for strategic skill matches (AI, automation, web dev, cybersecurity)
    let strategicBonus = 0;
    const strategicAreas = ['ai', 'automation', 'react', 'node', 'python', 'cybersecurity', 'devops'];
    strategicAreas.forEach(area => {
      if (jobTitle.includes(area) && resumeSkills.some(s => s.toLowerCase().includes(area))) {
        strategicBonus += 5;
      }
    });
    
    return Math.min(baseSkillScore + strategicBonus, 100);
  }

  function extractResumeSkillsDetailed() {
    const skills = [];
    const qa = window.resumeData;
    
    if (qa.skills) {
      if (qa.skills.programmingLanguages && Array.isArray(qa.skills.programmingLanguages)) {
        qa.skills.programmingLanguages.forEach(skill => {
          if (typeof skill === 'object' && skill.lang) {
            skills.push(skill.lang);
            if (skill.proficiency === 'Advanced') {
              skills.push(`${skill.lang}-expert`); // Mark advanced skills
            }
          }
        });
      }
      if (qa.skills.frameworksLibraries && Array.isArray(qa.skills.frameworksLibraries)) {
        qa.skills.frameworksLibraries.forEach(skill => {
          if (typeof skill === 'object' && skill.name) {
            skills.push(skill.name);
          }
        });
      }
      if (qa.skills.technicalAreas && Array.isArray(qa.skills.technicalAreas)) {
        qa.skills.technicalAreas.forEach(skill => {
          if (typeof skill === 'object' && skill.area) {
            skills.push(skill.area);
            if (skill.level === 'Advanced') {
              skills.push(`${skill.area}-expert`);
            }
          }
        });
      }
      if (qa.skills.technicalITSkills && Array.isArray(qa.skills.technicalITSkills)) {
        qa.skills.technicalITSkills.forEach(skill => {
          if (typeof skill === 'object' && skill.skill) {
            skills.push(skill.skill);
            if (skill.proficiency === 'Advanced') {
              skills.push(`${skill.skill}-expert`);
            }
          }
        });
      }
    }
    
    return skills.length > 0 ? skills : ['Python', 'JavaScript', 'React', 'Node.js', 'Problem-solving'];
  }

  function evaluateCertificateRelevanceDetailed(jobDetails, jobTitle, jobSkills) {
    const qa = window.resumeData;
    if (!qa.certifications || !qa.certifications.length) return 0.5;
    
    let relevanceScore = 0;
    const jobSkillsLower = jobSkills.map(s => s.toLowerCase());
    
    qa.certifications.forEach(cert => {
      const certName = (typeof cert === 'object' ? cert.title : cert).toLowerCase();
      const certDesc = (typeof cert === 'object' ? cert.desc : '').toLowerCase();
      const certCombined = `${certName} ${certDesc}`;
      
      // Direct skill match certifications
      jobSkillsLower.forEach(skill => {
        if (certCombined.includes(skill)) {
          relevanceScore += 8;
        }
      });
      
      // Job title specific certifications
      if ((jobTitle.includes('ai') || jobTitle.includes('machine')) && certCombined.includes('ai')) {
        relevanceScore += 10;
      }
      if ((jobTitle.includes('frontend') || jobTitle.includes('full stack')) && (certCombined.includes('react') || certCombined.includes('sveltekit'))) {
        relevanceScore += 10;
      }
      if (jobTitle.includes('devops') && (certCombined.includes('docker') || certCombined.includes('ci') || certCombined.includes('automation'))) {
        relevanceScore += 10;
      }
      if (jobTitle.includes('security') && certCombined.includes('cyber')) {
        relevanceScore += 10;
      }
      if (jobTitle.includes('qa') && certCombined.includes('testing')) {
        relevanceScore += 10;
      }
      
      // General professional development
      if (certCombined.includes('leadership') || certCombined.includes('career')) {
        relevanceScore += 3;
      }
    });
    
    // Normalize score (max 100%)
    return Math.min((relevanceScore / qa.certifications.length) * 2, 100);
  }

  function evaluateProjectExperienceDetailed(jobDetails, jobTitle, jobSkills) {
    const qa = window.resumeData;
    if (!qa.events || !qa.events.length) return 0.5;
    
    let projectScore = 0;
    const jobSkillsLower = jobSkills.map(s => s.toLowerCase());
    const totalEvents = qa.events.length;
    
    qa.events.forEach(event => {
      const eventTitle = event.title.toLowerCase();
      const eventDesc = (event.desc || '').toLowerCase();
      const eventCombined = `${eventTitle} ${eventDesc}`;
      
      // Hackathon events = high project experience
      if (eventTitle.includes('hackathon')) {
        projectScore += 15;
        
        // Check for job-specific hackathons
        if (eventTitle.includes('ai') && jobTitle.includes('ai')) projectScore += 10;
        if (eventTitle.includes('fintech') && jobTitle.includes('fintech')) projectScore += 10;
        if (eventTitle.includes('automation') && jobTitle.includes('automation')) projectScore += 10;
      }
      
      // Skill-specific workshops
      jobSkillsLower.forEach(skill => {
        const cleanSkill = skill.split('-')[0].toLowerCase(); // Remove '-expert' suffix
        if (eventCombined.includes(cleanSkill)) {
          projectScore += 8;
        }
      });
      
      // Job-specific events
      if ((jobTitle.includes('ai') || jobTitle.includes('machine')) && eventCombined.includes('ai')) {
        projectScore += 10;
      }
      if ((jobTitle.includes('security') || jobTitle.includes('cyber')) && eventCombined.includes('cyber')) {
        projectScore += 10;
      }
      if ((jobTitle.includes('automation') || jobTitle.includes('devops')) && eventCombined.includes('automation')) {
        projectScore += 10;
      }
      if ((jobTitle.includes('frontend') || jobTitle.includes('frontend engineer')) && eventCombined.includes('framework')) {
        projectScore += 10;
      }
      
      // Leadership/speaking experience
      if (eventTitle.includes('hour of code')) projectScore += 5;
    });
    
    // Normalize score (max 100%)
    return Math.min((projectScore / totalEvents) * 1.5, 100);
  }

  function evaluateSkillMatch(jobDetails) {
    const resumeSkills = extractResumeSkillsDetailed();
    const jobSkillsList = parseJobSkills(jobDetails);
    
    if (jobSkillsList.length === 0) return 50; // Default if no skills found
    
    let exactMatches = 0;
    let partialMatches = 0;
    
    for (let jobSkill of jobSkillsList) {
      const jobSkillLower = jobSkill.toLowerCase();
      for (let resumeSkill of resumeSkills) {
        const resumeSkillLower = resumeSkill.toLowerCase();
        
        // Exact match
        if (jobSkillLower === resumeSkillLower) {
          exactMatches++;
          break;
        }
        // Partial match (one includes the other)
        else if (jobSkillLower.includes(resumeSkillLower) || resumeSkillLower.includes(jobSkillLower)) {
          partialMatches += 0.6; // 60% credit for partial match
          break;
        }
      }
    }
    
    const baseScore = jobSkillsList.length > 0 ? (skillMatches / jobSkillsList.length) * 100 : 50;
    
    // Add strategic bonus for advanced technical areas
    let bonus = 0;
    const strengthAreas = ['ai', 'machine learning', 'automation', 'react', 'node.js', 'python', 'cybersecurity', 'devops', 'full-stack'];
    const jobSkillsLower = (jobDetails.skills || []).map(s => s.toLowerCase()).join(' ');
    const jobTitleLower = (jobDetails.title || '').toLowerCase();
    
    strengthAreas.forEach(area => {
      if ((jobSkillsLower.includes(area) || jobTitleLower.includes(area)) && resumeSkills.some(s => s.toLowerCase().includes(area))) {
        bonus += 3;
      }
    });
    
    return Math.min(baseScore + bonus, 100);
  }

  function animateTyping(element, text, speed = 20, callback = null) {
    let index = 0;
    element.textContent = '';
    element.classList.add('is-typing');
    
    const typeChar = () => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
        setTimeout(typeChar, speed);
      } else {
        element.classList.remove('is-typing');
        if (callback) callback();
      }
    };
    typeChar();
  }

  function generateInterviewQuestion(jobDetails, questionNum = 1) {
    if (!jobDetails) {
      appendMsg("Error: Unable to load job details. Please refresh and try again.", 'bot');
      return;
    }
    
    if (questionNum > 5) {
      showTyping(false);
      displayInterviewSummary();
      return;
    }
    
    showTyping(true);
    
    // Get job-specific questions
    const questions = getJobSpecificQuestions(jobDetails);
    const question = questions[questionNum - 1];
    
    setTimeout(() => {
      showTyping(false);
      
      const qMsg = document.createElement('div');
      qMsg.className = 'msg bot';
      qMsg.innerHTML = `<strong>Q${questionNum}:</strong> ${question.question}`;
      chatLog.appendChild(qMsg);
      chatLog.scrollTop = chatLog.scrollHeight;
      
      setTimeout(() => {
        const answer = generateAnswerFromResume(question.question);
        const qScore = calculatePerQuestionScore(jobDetails, questionNum);
        questionScores.push(qScore);
        
        const aMsg = document.createElement('div');
        aMsg.className = 'msg user answer-msg';
        chatLog.appendChild(aMsg);
        chatLog.scrollTop = chatLog.scrollHeight;
        
        animateTyping(aMsg, answer, 15, () => {
          setTimeout(() => {
            const scoreMsg = document.createElement('div');
            scoreMsg.className = 'msg bot score-msg';
            chatLog.appendChild(scoreMsg);
            
            // Animate score counter
            let displayScore = 0;
            const scoreInterval = setInterval(() => {
              displayScore += Math.ceil(qScore / 12);
              if (displayScore >= qScore) {
                displayScore = qScore;
                clearInterval(scoreInterval);
              }
              scoreMsg.textContent = `Q${questionNum} Match: ${displayScore}%`;
              chatLog.scrollTop = chatLog.scrollHeight;
            }, 50);
            
            setTimeout(() => {
              generateInterviewQuestion(jobDetails, questionNum + 1);
            }, 1500);
          }, 300);
        });
      }, 800);
    }, 800);
  }

  function getJobSpecificQuestions(jobDetails) {
    const skills = jobDetails.skills || [];
    const responsibilities = jobDetails.responsibilities || [];
    const title = (jobDetails.title || '').toLowerCase();
    
    // Determine job category and return job-specific questions
    if (title.includes('ai') || title.includes('machine')) {
      return generateAIEngineerQuestions(jobDetails, skills, responsibilities);
    } else if (title.includes('senior') && (title.includes('software') || title.includes('developer'))) {
      return generateSeniorDeveloperQuestions(jobDetails, skills, responsibilities);
    } else if (title.includes('junior') || title.includes('entry')) {
      return generateJuniorDeveloperQuestions(jobDetails, skills, responsibilities);
    } else if (title.includes('frontend')) {
      return generateFrontendEngineerQuestions(jobDetails, skills, responsibilities);
    } else if (title.includes('full stack') || title.includes('full-stack')) {
      return generateFullStackDeveloperQuestions(jobDetails, skills, responsibilities);
    } else if (title.includes('devops')) {
      return generateDevOpsEngineerQuestions(jobDetails, skills, responsibilities);
    } else if (title.includes('qa') || title.includes('test')) {
      return generateQAEngineerQuestions(jobDetails, skills, responsibilities);
    } else if (title.includes('security') || title.includes('cyber')) {
      return generateSecurityEngineerQuestions(jobDetails, skills, responsibilities);
    } else {
      return generateGenericDeveloperQuestions(jobDetails, skills, responsibilities);
    }
  }

  function generateAIEngineerQuestions(jobDetails, skills, responsibilities) {
    const primarySkill = skills[0] || 'machine learning';
    const resp = responsibilities[0] || 'develop AI solutions';
    
    return [
      {
        question: `Describe your experience building and training machine learning models. What frameworks have you used, and can you walk through a complete project from data preprocessing to model deployment?`,
        assessment: `Depth of ML knowledge, understanding of ML lifecycle, and practical implementation experience`,
        tip: `Reference your Beaconet capstone project that uses AI algorithms. Discuss data handling, model selection, and performance metrics you've used.`
      },
      {
        question: `How do you approach feature engineering and model evaluation? What metrics do you prioritize based on different use cases?`,
        assessment: `Understanding of ML fundamentals, data analysis skills, and domain-specific thinking`,
        tip: `Discuss your proximity-grid approach from your capstone. Mention specific techniques like normalization, cross-validation, or confusion matrices you've implemented.`
      },
      {
        question: `Tell us about a time when your ML model didn't perform as expected in production. How did you identify and fix the issue?`,
        assessment: `Problem-solving in real-world scenarios, debugging skills, and technical depth`,
        tip: `Describe how you'd approach model monitoring, drift detection, and retraining. This shows production-ready thinking.`
      },
      {
        question: `How do you stay current with rapid advancements in AI and machine learning? What recent papers, techniques, or frameworks have caught your attention?`,
        assessment: `Continuous learning mindset and awareness of industry trends`,
        tip: `Reference your recent AI certifications (AI Fundamentals with IBM, Introduction to Modern AI), and mention LLMs, GPT architectures, or specific use cases you're exploring.`
      },
      {
        question: `Describe your approach to building ethical AI systems. How do you address bias, fairness, and responsible AI practices?`,
        assessment: `Understanding of AI ethics, bias mitigation, and responsible innovation`,
        tip: `Reference your "Responsible Technology: Ethics in IT Systems" certification that covers bias mitigation and ethical considerations.`
      }
    ];
  }

  function generateFrontendEngineerQuestions(jobDetails, skills, responsibilities) {
    const primarySkill = skills[0] || 'React';
    
    return [
      {
        question: `Walk me through your experience with ${primarySkill} or similar frontend frameworks. Can you describe a complex component you've built and your design decisions?`,
        assessment: `Frontend framework expertise, component architecture, and state management understanding`,
        tip: `Reference your SvelteKit training and React experience. Discuss component lifecycle, hooks, or reactive components. Mention your full-stack web development skills.`
      },
      {
        question: `How do you approach responsive design and ensuring your applications work seamlessly across different devices and browsers?`,
        assessment: `Understanding of responsive design, testing, and user experience`,
        tip: `Mention CSS Grid, Flexbox, media queries, and accessibility (WCAG 2.1). Share experience with mobile-first approach from your web development practice.`
      },
      {
        question: `Tell us about your experience with API integration and state management. How do you handle complex application state?`,
        assessment: `Backend integration, state management patterns, and REST API knowledge`,
        tip: `Discuss your REST API design skills, experience with Redux/Context API. Mention your Node.js backend experience for full context.`
      },
      {
        question: `How do you optimize frontend performance? Can you describe specific techniques you've used to improve load times or rendering performance?`,
        assessment: `Web performance optimization skills and understanding of browser internals`,
        tip: `Reference techniques like code splitting, lazy loading, image optimization, memoization. This aligns with your web development practices.`
      },
      {
        question: `Describe your approach to testing frontend applications. What tools and methodologies do you prefer?`,
        assessment: `Testing knowledge, quality assurance mindset, and development best practices`,
        tip: `Mention Jest for unit testing, discuss how you ensure UI reliability. Reference your testing and QA experience.`
      }
    ];
  }

  function generateFullStackDeveloperQuestions(jobDetails, skills, responsibilities) {
    return [
      {
        question: `Describe a full-stack project you've built from scratch. Walk me through your architectural decisions for both frontend and backend.`,
        assessment: `Full-stack architecture knowledge, system design, and project ownership`,
        tip: `Reference your SvelteKit full-stack training and your capstone project. Discuss how frontend and backend communicate through APIs.`
      },
      {
        question: `How do you design APIs to be consumed by frontend applications? What principles do you follow for RESTful design?`,
        assessment: `Backend design, API patterns, and integration thinking`,
        tip: `Discuss REST API design principles from your technical IT skills. Mention HTTP methods, status codes, documentation, and versioning strategies.`
      },
      {
        question: `Tell us about database design and optimization. How do you choose between different database types, and how do you optimize queries?`,
        assessment: `Database modeling, performance optimization, and data architecture`,
        tip: `Reference your PostgreSQL, MySQL, and MongoDB experience. Discuss when to use relational vs document databases, indexing, and query optimization.`
      },
      {
        question: `How do you approach deploying a full-stack application to production? What steps do you take to ensure reliability and scalability?`,
        assessment: `DevOps mindset, deployment knowledge, and production readiness`,
        tip: `Mention CI/CD pipelines, GitHub Actions, environment management, monitoring, and error handling strategies.`
      },
      {
        question: `Describe your experience with modern full-stack frameworks like SvelteKit, Next.js, or similar. What advantages did you find?`,
        assessment: `Knowledge of modern development practices, framework selection, and productivity`,
        tip: `Reference your SvelteKit training. Discuss server-side rendering, file-based routing, and full-stack benefits you appreciate.`
      }
    ];
  }

  function generateDevOpsEngineerQuestions(jobDetails, skills, responsibilities) {
    return [
      {
        question: `Describe your experience with containerization and orchestration platforms like Docker and Kubernetes. Can you walk through a deployment scenario?`,
        assessment: `Container expertise, orchestration knowledge, and infrastructure experience`,
        tip: `Reference your Docker knowledge. Discuss container isolation, image building, networking, and orchestration concepts.`
      },
      {
        question: `Tell us about your CI/CD pipeline experience. How have you set up automated testing and deployment workflows?`,
        assessment: `Automation expertise, pipeline design, and deployment practices`,
        tip: `Mention GitHub Actions experience. Discuss stages like build, test, deploy. Reference your CI/CD pipeline skills.`
      },
      {
        question: `How do you approach infrastructure as code? What tools have you used, and what are the benefits you've seen?`,
        assessment: `Infrastructure thinking, code-based configuration, and automation mindset`,
        tip: `Discuss configuration management, reproducibility, and version control for infrastructure.`
      },
      {
        question: `Describe your experience with monitoring and logging in production environments. How do you identify and respond to issues?`,
        assessment: `Production operations knowledge, troubleshooting skills, and observability`,
        tip: `Reference your debugging and troubleshooting skills. Discuss log aggregation, metrics, and incident response.`
      },
      {
        question: `How do you balance security and operational efficiency? What security practices have you implemented in your infrastructure?`,
        assessment: `Security mindset, operational best practices, and risk management`,
        tip: `Reference your cybersecurity training. Discuss network security, access control, and secure deployment practices.`
      }
    ];
  }

  function generateQAEngineerQuestions(jobDetails, skills, responsibilities) {
    return [
      {
        question: `Describe your test automation strategy. What types of testing do you prioritize and why?`,
        assessment: `QA methodology, automation skills, and testing mindset`,
        tip: `Discuss unit, integration, and end-to-end testing. Reference tools like Jest, Selenium, Postman.`
      },
      {
        question: `How do you approach finding and documenting bugs? Can you describe a complex bug you identified and how it was resolved?`,
        assessment: `Bug analysis, documentation, and communication skills`,
        tip: `Show methodical approach: reproduction steps, expected vs actual behavior. Reference your debugging skills.`
      },
      {
        question: `Tell us about your experience with API testing. What tools have you used and what aspects do you focus on?`,
        assessment: `API testing expertise, tools proficiency, and technical depth`,
        tip: `Mention Postman, REST Assured. Discuss testing response codes, payload validation, and edge cases.`
      },
      {
        question: `How do you collaborate with developers to improve code quality? Do you practice any test-driven development?`,
        assessment: `Teamwork, development collaboration, and quality culture`,
        tip: `Reference your testing experience, TDD methodology, code review participation.`
      },
      {
        question: `Describe how you evaluate test coverage. What makes a good test suite in your opinion?`,
        assessment: `Quality thinking, coverage understanding, and test efficiency`,
        tip: `Discuss meaningful coverage metrics, maintainability, reliability, and how tests support CI/CD flows.`
      }
    ];
  }

  function generateSecurityEngineerQuestions(jobDetails, skills, responsibilities) {
    return [
      {
        question: `Describe your experience with security assessments and penetration testing. Can you walk through your methodology?`,
        assessment: `Security testing knowledge, vulnerability identification, and methodical approach`,
        tip: `Reference your cybersecurity training and penetration testing basics. Discuss OWASP top 10 and threat modeling.`
      },
      {
        question: `How do you approach secure coding practices? What are the most common security vulnerabilities you've seen developers introduce?`,
        assessment: `Secure development knowledge, code review skills, and developer education`,
        tip: `Mention SQL injection, XSS, CSRF, authentication flaws. Reference your secure coding knowledge.`
      },
      {
        question: `Tell us about your experience with encryption and key management. How do you approach data protection?`,
        assessment: `Cryptography knowledge, data protection thinking, and compliance awareness`,
        tip: `Discuss encryption protocols, key rotation, and secure storage practices.`
      },
      {
        question: `How do you stay informed about security threats and vulnerabilities? Can you describe a recent vulnerability that impacted your work?`,
        assessment: `Security awareness, continuous learning, and threat intelligence`,
        tip: `Reference security communities, CVE databases, and responsible disclosure practices.`
      },
      {
        question: `Describe your approach to security compliance (e.g., GDPR, security standards). How do you ensure systems meet compliance requirements?`,
        assessment: `Compliance knowledge, governance thinking, and regulatory awareness`,
        tip: `Reference your Responsible Technology training. Discuss GDPR, data privacy, and compliance documentation.`
      }
    ];
  }

  function generateSeniorDeveloperQuestions(jobDetails, skills, responsibilities) {
    return [
      {
        question: `Describe your approach to system architecture and design. How do you make technology choices and justify architectural decisions?`,
        assessment: `System design expertise, decision-making ability, and technical leadership`,
        tip: `Reference design patterns, scalability considerations, and trade-offs in your architecture thinking.`
      },
      {
        question: `Tell us about your experience mentoring junior developers. How do you approach code reviews and knowledge sharing?`,
        assessment: `Leadership, mentoring skills, and knowledge transfer`,
        tip: `Reference your leadership skills and project direction. Discuss how you balance guidance with autonomy.`
      },
      {
        question: `Describe a technical challenge you've overcome that resulted in significant learning or improvement. How did you approach it?`,
        assessment: `Problem-solving at scale, technical depth, and growth mindset`,
        tip: `Reference complex projects from your capstone or hackathons with architectural improvements.`
      },
      {
        question: `How do you approach technical debt? When do you prioritize refactoring versus shipping new features?`,
        assessment: `Strategic thinking, long-term vision, and pragmatism`,
        tip: `Show balance between rapid delivery and code quality through maintainability focus.`
      },
      {
        question: `Tell us about your philosophy on clean code and best practices. How do you ensure code quality in your team?`,
        assessment: `Code quality standards, leadership through example, and development practices`,
        tip: `Reference SOLID principles and DRY principles. Discuss how you establish and maintain standards.`
      }
    ];
  }

  function generateJuniorDeveloperQuestions(jobDetails, skills, responsibilities) {
    const primarySkill = skills[0] || 'the required tech stack';
    
    return [
      {
        question: `Tell us about your learning journey with ${primarySkill}. What resources have helped you most, and what projects have you built?`,
        assessment: `Learning ability, self-motivation, and hands-on experience`,
        tip: `Reference your certifications, workshops, and practical projects. Show enthusiasm for continuous learning.`
      },
      {
        question: `Describe the most challenging project you've worked on. What did you struggle with, and how did you overcome it?`,
        assessment: `Problem-solving, resilience, and growth mindset`,
        tip: `Reference your capstone, hackathon projects. Focus on what you learned rather than perfection.`
      },
      {
        question: `How do you approach learning new technologies and frameworks? Can you give an example from your recent experience?`,
        assessment: `Learning strategy, adaptability, and technical curiosity`,
        tip: `Reference your recent SvelteKit, n8n, or Python certifications. Show systematic learning approach.`
      },
      {
        question: `Tell us about your experience working with version control and collaborating with other developers.`,
        assessment: `Git proficiency, teamwork, and code collaboration basics`,
        tip: `Reference GitHub experience, pull requests, code reviews, and your JPCS involvement.`
      },
      {
        question: `What excites you most about software development, and how does this role align with your career goals?`,
        assessment: `Motivation, alignment, and long-term thinking`,
        tip: `Reference your capstone passion, hackathon enthusiasm, and genuine interest in growth.`
      }
    ];
  }

  function generateGenericDeveloperQuestions(jobDetails, skills, responsibilities) {
    const primarySkill = skills[0] || 'the required tech stack';
    const resp = responsibilities[0] || 'develop software solutions';
    
    return [
      {
        question: `Tell us about your experience with ${primarySkill || 'software development'}. How have you applied it in your projects or work?`,
        assessment: `Technical expertise and practical application`,
        tip: `Reference specific projects where you've used these technologies. Show depth of knowledge.`
      },
      {
        question: `Describe a time when you had to ${resp}. What was your approach and what was the outcome?`,
        assessment: `Problem-solving methodology and technical decision-making`,
        tip: `Use STAR method (Situation, Task, Action, Result). Reference your capstone or hackathons.`
      },
      {
        question: `How do you ensure code quality and maintainability in your projects?`,
        assessment: `Development best practices and professional standards`,
        tip: `Reference SOLID principles, clean code, testing, and documentation practices.`
      },
      {
        question: `Tell us about your experience collaborating with teams or in agile environments.`,
        assessment: `Teamwork, communication, and agile understanding`,
        tip: `Reference your Agile knowledge, JPCS leadership, and workshop participation.`
      },
      {
        question: `What are your professional goals, and how does this position align with them?`,
        assessment: `Motivation, career thinking, and alignment with role`,
        tip: `Reference growth through certifications, events, and projects showing genuine enthusiasm.`
      }
    ];
  }

  function displayInterviewSummary() {
    const avgScore = Math.round(questionScores.reduce((a, b) => a + b, 0) / questionScores.length);
    
    const summaryMsg = document.createElement('div');
    summaryMsg.className = 'msg bot summary-msg';
    chatLog.appendChild(summaryMsg);
    chatLog.scrollTop = chatLog.scrollHeight;
    
    let content = `Assessment Complete\n\n`;
    content += `Average Match Score: ${avgScore}%\n`;
    content += `Initial Match Score: ${currentMatchScore}%\n\n`;
    content += `Question Scores:\n`;
    questionScores.forEach((score, i) => {
      content += `  Q${i + 1}: ${score}%\n`;
    });
    
    animateTyping(summaryMsg, content, 15);
  }

  function appendMsg(text, who='bot'){
    const d = document.createElement('div'); d.className = `msg ${who}`; d.textContent = text; chatLog.appendChild(d); chatLog.scrollTop = chatLog.scrollHeight;
  }

  function showTyping(show){
    let el = chatLog.querySelector('.typing');
    if (show) {
      if (!el) {
        el = document.createElement('div'); el.className = 'typing'; el.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span><span>Thinking…</span>';
        chatLog.appendChild(el);
        chatLog.scrollTop = chatLog.scrollHeight;
      }
    } else {
      if (el) el.remove();
    }
  }

  function ensurePanelVisible(){
    // Position the panel above the chat toggle when possible.
    requestAnimationFrame(()=>{
      const pad = 12; // minimal padding from edges
      const toggleRect = chatToggle.getBoundingClientRect();
      const panelRect = chatPanel.getBoundingClientRect();
      const availableAbove = toggleRect.top - pad; // space above toggle
      const availableBelow = window.innerHeight - (toggleRect.bottom) - pad; // space below toggle

      // prefer to place panel above the toggle (so messages sit above the icon)
      if (panelRect.height <= availableAbove) {
        // set bottom so panel's bottom aligns slightly above toggle top
        const bottom = window.innerHeight - toggleRect.top + 8; // small gap
        chatPanel.style.top = 'auto';
        chatPanel.style.bottom = `${bottom}px`;
      } else if (panelRect.height <= availableBelow) {
        // if it fits below, place below
        const top = toggleRect.bottom + 8;
        chatPanel.style.bottom = 'auto';
        chatPanel.style.top = `${top}px`;
      } else {
        // otherwise anchor to top with padding
        chatPanel.style.bottom = 'auto';
        chatPanel.style.top = `${pad}px`;
        // reduce max-height to fit if necessary
        chatPanel.style.maxHeight = `calc(100vh - ${pad * 2}px)`;
      }

      // keep horizontal alignment near the toggle (respect any right offset)
      const rightOffset = Math.max(8, window.innerWidth - toggleRect.right + 8);
      chatPanel.style.right = `${rightOffset}px`;
    });
  }

  function answerQuery(q){
    const s = q.toLowerCase();
    // personal
    if (/(birth|born|birthplace|birth date|birthday)/.test(s)) return `Birth Date: ${resume.personal.birthDate}; Birthplace: ${resume.personal.birthplace}`;
    if (/(email|e-mail|contact)/.test(s)) return `Email: ${resume.personal.email}; Address: ${resume.personal.address}`;
    if (/(degree|studying|education|capstone)/.test(s)) return `Degree: ${resume.education.degree} at ${resume.education.school} (${resume.education.years}). Capstone: ${resume.education.capstone}`;
    if (/(certif|certificate)/.test(s)) return `There are ${resume.certifications.length} certifications. Ask "list certifications" to see them.`;
    if (/list certifications/.test(s)) return resume.certifications.join('\n');
    if (/(skill|technical|programming|framework|language)/.test(s)) {
      let skillsInfo = 'Here are my skills:\n\n';
      if (resume.skills) {
        Object.entries(resume.skills).forEach(([category, skillList]) => {
          if (Array.isArray(skillList) && skillList.length > 0) {
            const catName = category.replace(/([A-Z])/g, ' $1').replace(/^./, c=>c.toUpperCase()).trim();
            skillsInfo += `${catName}: ${skillList.join(', ')}\n`;
          }
        });
      }
      return skillsInfo;
    }
    if (/(affiliat|organization|member)/.test(s)) return resume.affiliations.join('\n');
    // events by title
    for(const ev of resume.events){ if (s.includes(ev.title.toLowerCase().slice(0,20))) return `${ev.title} — ${ev.venue} (${ev.date})`; }
    // events general
    if (/(event|seminar|workshop|conference)/.test(s)) {
      return `I can list events or show details. Ask e.g. "list events" or "show event SITE Film Festival 2025".`;
    }
    if (/list events/.test(s)) return resume.events.map(e=>`${e.title} — ${e.date}`).join('\n');

    return "I can answer questions about personal data, education, certifications, events, skills, and affiliations. Try: \"What's my degree?\" or \"List events\".";
  }

  async function queryServer(message){
    try{
      const res = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message})});
      if(!res.ok) throw new Error('server');
      const j = await res.json();
      return j.reply || j.result || JSON.stringify(j);
    }catch(e){
      return null;
    }
  }

  chatForm.addEventListener('submit', async (ev) => {
    ev.preventDefault(); const val = chatInput.value.trim(); if (!val) return;
    appendMsg(val, 'user');
    chatInput.value = '';
    chatInput.disabled = true;
    showTyping(true);
    ensurePanelVisible();

    // Determine response based on mode
    if (currentMode === 'interview') {
      // Interview mode: provide match-aware feedback and ask next question
      setTimeout(() => {
        showTyping(false);
        chatInput.disabled = false;
        
        let feedbackMessages = [];
        
        // Tailor feedback based on match score
        if (currentMatchScore >= 70) {
          feedbackMessages = [
            "Response noted. Proceeding to next assessment area:",
            "Acknowledged. Continuing with technical evaluation:",
            "Recorded. Moving to the next domain:",
            "Assessment recorded. Proceeding:"
          ];
        } else if (currentMatchScore >= 50) {
          feedbackMessages = [
            "Response received. Next question:",
            "Noted. Proceeding to the following area:",
            "Acknowledged. Moving forward:",
            "Assessment recorded. Next question:"
          ];
        } else {
          feedbackMessages = [
            "Response noted. Continuing assessment:",
            "Acknowledged. Proceeding to next area:",
            "Response recorded. Moving to next topic:",
            "Continuing evaluation:"
          ];
        }
        
        const feedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
        appendMsg(feedback, 'bot');
        generateInterviewQuestion(currentInterviewJob);
      }, 800);
    } else {
      // Q&A mode: normal response
      const serverResp = await queryServer(val);
      showTyping(false);
      chatInput.disabled = false;
      if(serverResp){ appendMsg(serverResp, 'bot'); return; }
      const resp = answerQuery(val);
      appendMsg(resp, 'bot');
    }
  });

  // Populate job selector with company names
  async function populateJobSelector() {
    const jobs = [
      'jobs/01_junior_software_developer_linkedin.md',
      'jobs/02_full_stack_developer_indeed.md',
      'jobs/03_frontend_engineer_seek.md',
      'jobs/04_devops_engineer_linkedin.md',
      'jobs/05_qa_test_engineer_seek.md'
    ];

    for (const jobPath of jobs) {
      try {
        const response = await fetch(jobPath);
        const jobContent = await response.text();
        const jobDetails = parseJobMarkdown(jobContent);
        
        // Create option with title and company
        const option = document.createElement('option');
        option.value = jobPath;
        option.textContent = `${jobDetails.title} - ${jobDetails.company}`;
        jobSelect.appendChild(option);
      } catch (error) {
        console.error(`Error loading ${jobPath}:`, error);
      }
    }
  }

  // Populate job selector on load
  populateJobSelector();

  // Initialize with default Q&A mode
  appendMsg("Welcome to the Interview Assistant. Please provide your inquiries regarding your professional background.", 'bot');

  // reposition on resize to avoid clipping
  window.addEventListener('resize', ensurePanelVisible);
  // ensure panel visible on open
  chatToggle.addEventListener('click', () => { setTimeout(ensurePanelVisible, 80); });

})();
