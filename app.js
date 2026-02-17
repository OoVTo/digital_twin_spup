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
    const resumeSkills = extractResumeSkills();
    const jobSkillsList = parseJobSkills(jobDetails);
    let skillMatches = 0;
    
    for (let jobSkill of jobSkillsList) {
      const jobSkillLower = jobSkill.toLowerCase();
      for (let resumeSkill of resumeSkills) {
        const resumeSkillLower = resumeSkill.toLowerCase();
        if (jobSkillLower === resumeSkillLower || 
            jobSkillLower.includes(resumeSkillLower) || 
            resumeSkillLower.includes(jobSkillLower)) {
          skillMatches++;
          break;
        }
      }
    }

    let score = 0;
    const skillScore = jobSkillsList.length > 0 ? (skillMatches / jobSkillsList.length) * 100 : 50;
    score += skillScore * 0.5;

    const resumeLevel = getResumeExperienceLevel();
    const jobLevel = getJobExperienceLevel(jobDetails);
    const levelAlignment = calculateLevelAlignment(resumeLevel, jobLevel);
    score += levelAlignment * 0.25;

    const certRelevance = evaluateCertificateRelevance(jobDetails);
    score += certRelevance * 0.15;

    const projectRelevance = evaluateProjectExperience(jobDetails);
    score += projectRelevance * 0.1;

    return Math.min(Math.max(Math.round(score), 15), 92);
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

  function getResumeExperienceLevel() { return 1; }

  function getJobExperienceLevel(jobDetails) {
    const experienceText = (jobDetails.experience || []).join(' ').toLowerCase();
    const titleLower = (jobDetails.title || '').toLowerCase();
    if (titleLower.includes('junior') || titleLower.includes('entry')) return 1;
    else if (titleLower.includes('mid') || titleLower.includes('senior')) return 5;
    else if (titleLower.includes('lead') || titleLower.includes('principal')) return 7;
    if (experienceText.includes('0-1') || experienceText.includes('entry')) return 1;
    else if (experienceText.includes('1-2') || experienceText.includes('2-3')) return 2;
    else if (experienceText.includes('3-5') || experienceText.includes('3+') || experienceText.includes('4+')) return 4;
    else if (experienceText.includes('5+') || experienceText.includes('5-7')) return 5;
    else if (experienceText.includes('7+') || experienceText.includes('10+')) return 7;
    return 3;
  }

  function calculateLevelAlignment(resumeLevel, jobLevel) {
    const difference = Math.abs(resumeLevel - jobLevel);
    if (difference === 0) return 100;
    else if (difference === 1) return 80;
    else if (difference === 2) return 60;
    else if (difference >= 3 && resumeLevel < jobLevel) return 40;
    else if (difference >= 3 && resumeLevel > jobLevel) return 70;
    return 50;
  }

  function evaluateCertificateRelevance(jobDetails) {
    if (!window.resumeData || !window.resumeData.certifications) return 0.5;
    const jobTitle = (jobDetails.title || '').toLowerCase();
    const jobSkills = (jobDetails.skills || []).map(s => s.toLowerCase()).join(' ');
    let relevantCerts = 0;
    window.resumeData.certifications.forEach(cert => {
      const certLower = cert.toLowerCase();
      if ((jobTitle.includes('ai') || jobSkills.includes('ai')) && certLower.includes('ai')) relevantCerts++;
      else if ((jobTitle.includes('frontend') || jobSkills.includes('react')) && (certLower.includes('sveltekit') || certLower.includes('framework'))) relevantCerts++;
      else if ((jobTitle.includes('fintech') || jobSkills.includes('fintech')) && certLower.includes('fintech')) relevantCerts++;
      else if ((jobTitle.includes('automation') || jobSkills.includes('automation')) && certLower.includes('automation')) relevantCerts++;
      else if ((jobTitle.includes('cybersecurity') || jobSkills.includes('security')) && certLower.includes('cyber')) relevantCerts++;
    });
    const totalCerts = window.resumeData.certifications.length || 32;
    return Math.min(0.5 + (relevantCerts / totalCerts) * 0.5, 1);
  }

  function evaluateProjectExperience(jobDetails) {
    if (!window.resumeData || !window.resumeData.events) return 0.5;
    const jobTitle = (jobDetails.title || '').toLowerCase();
    const jobSkills = (jobDetails.skills || []).map(s => s.toLowerCase()).join(' ');
    let relevantEvents = 0;
    window.resumeData.events.forEach(event => {
      const eventLower = event.title.toLowerCase();
      if (eventLower.includes('hackathon')) relevantEvents++;
      else if ((jobTitle.includes('ai') || jobSkills.includes('ai')) && eventLower.includes('ai')) relevantEvents++;
      else if ((jobTitle.includes('automation') || jobSkills.includes('automation')) && eventLower.includes('automation')) relevantEvents++;
      else if ((jobTitle.includes('frontend') || jobSkills.includes('react')) && eventLower.includes('framework')) relevantEvents++;
      else if ((jobTitle.includes('fintech') || jobSkills.includes('fintech')) && eventLower.includes('fintech')) relevantEvents++;
    });
    const totalEvents = window.resumeData.events.length || 21;
    return Math.min(0.5 + (relevantEvents / totalEvents) * 0.5, 1);
  }

  chatToggle.addEventListener('click', () => { chatPanel.classList.toggle('hidden'); });
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
      appendMsg("Welcome to Interview Practice Mode! Select a job position and I'll conduct a mock interview.", 'bot');
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
      const welcomeMessage = `Welcome to the ${jobDetails.title} interview! 🎤\n\nCalculating your match score...`;
      appendMsg(welcomeMessage, 'bot');
      
      // Animate match score display over 2 seconds
      const scoreColor = currentMatchScore >= 70 ? '#4CAF50' : currentMatchScore >= 50 ? '#FF9800' : '#f44336';
      const scoreInterpretation = currentMatchScore >= 85 ? "Excellent Match - Strong Candidate" :
                                  currentMatchScore >= 70 ? "Good Match - Well Qualified" :
                                  currentMatchScore >= 55 ? "Moderate Match - Good Foundation" :
                                  currentMatchScore >= 40 ? "Fair Match - Growth Opportunity" :
                                  "Entry Level Match - Stretch Role";
      
      // Animate score from 0 to final score
      const startTime = Date.now();
      const duration = 2000; // 2 seconds
      
      const animateScore = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const animatedScore = Math.floor(currentMatchScore * progress);
        
        // Update the last message with animated score
        const lastMsg = chatLog.lastChild;
        if (lastMsg) {
          lastMsg.textContent = `Welcome to the ${jobDetails.title} interview! 🎤\n\n📊 Your Match Score: ${animatedScore}% 🔄`;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animateScore);
        } else {
          // Animation complete, show final message with interpretation
          lastMsg.textContent = `Welcome to the ${jobDetails.title} interview! 🎤\n\n📊 Your Match Score: ${currentMatchScore}% (${scoreInterpretation})\n\nLet's begin with some interview questions!`;
          
          // Start the auto-flow interview with question 1
          setTimeout(() => {
            generateInterviewQuestion(jobDetails, 1);
          }, 1000);
        }
      };
      
      requestAnimationFrame(animateScore);
    } catch (error) {
      appendMsg("Error loading job details. Please try again.", 'bot');
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
    const qa = window.resumeData;
    const qLower = question.toLowerCase();
    
    // Helper to get specific certifications details
    const getCertByKeyword = (keyword) => {
      if (!qa.certifications) return 'various technical certifications';
      const matching = qa.certifications.find(c => c.desc && c.desc.toLowerCase().includes(keyword.toLowerCase()));
      return matching ? `${matching.title} (${matching.desc})` : `certifications in ${keyword}`;
    };
    
    // Helper to get specific event details
    const getRecentEvent = () => {
      if (qa.events && qa.events.length > 0) {
        const evt = qa.events[0];
        return `${evt.title} where I ${evt.desc}`;
      }
      return 'various industry events';
    };
    
    // Helper to format skills with proficiency
    const getSkillsSummary = () => {
      if (!qa.skills || !qa.skills.programmingLanguages) return 'multiple technologies';
      const advanced = qa.skills.programmingLanguages.filter(l => l.proficiency === 'Advanced');
      return advanced.map(l => `${l.lang} (${l.useCases})`).slice(0, 3).join(', ');
    };
    
    const answers = {
      experience: [
        `I've gained practical experience through my ${qa.education.degree} at ${qa.education.school}. My capstone project, "${qa.education.capstone}", involved implementing AI-driven solutions with spatial indexing systems. I've participated in multiple tech events including ${qa.events[0]?.title}, which provided hands-on exposure to modern development practices. I've undertaken ${getCertByKeyword('AI')} to strengthen my expertise.`,
      ],
      technical: [
        `I'm proficient in multiple technologies including ${getSkillsSummary()}. My capstone project "${qa.education.capstone}" required building systems with machine learning and decision support components. I've completed ${getCertByKeyword('modern web')} and gained practical experience through events like ${qa.events[1]?.title}. I focus on writing clean, scalable code following design patterns and SOLID principles.`,
      ],
      learning: [
        `I'm deeply committed to continuous learning. I've undertaken ${getCertByKeyword('AI')} and ${getCertByKeyword('Cybersecurity')} to broaden my technical foundation. I actively participate in events like ${getRecentEvent()}. My approach is systematic: I study fundamentals, work through hands-on projects, engage with community best practices, and implement what I learn immediately. This has allowed me to master diverse tech stacks rapidly.`,
      ],
      motivation: [
        `I'm genuinely excited about this role because it aligns with my passion for building impactful technology. I've invested significantly in my growth - completing certifications in ${getCertByKeyword('AI')} and ${getCertByKeyword('Automation')}. I've led projects like my capstone on ${qa.education.capstone.split(':')[0]}, participated in competitive hackathons, and consistently maintained the President's List. I'm eager to contribute meaningfully while continuing to advance my expertise in modern development practices.`,
      ],
      teamwork: [
        `I believe collaboration is key to success. Through my role as ${qa.affiliations[0]?.role} in ${qa.affiliations[0]?.organization}, I've developed strong team leadership and communication skills. I've worked with diverse teams on projects ranging from ${qa.events[2]?.title} to my capstone leveraging IoT and AI. I'm comfortable in pair programming sessions, conducting code reviews, and supporting teammates. I'm also open to feedback and actively seek opportunities to help others grow.`,
      ]
    };
    
    let answerType = 'experience';
    if (/(technical|technology|programming|framework|language|code)/.test(qLower)) answerType = 'technical';
    if (/(learn|training|skill|new|approach|growth|development)/.test(qLower)) answerType = 'learning';
    if (/(interest|motivation|excit|passion|why|interested)/.test(qLower)) answerType = 'motivation';
    if (/(team|collaborate|work|difficult|conflict|people)/.test(qLower)) answerType = 'teamwork';
    
    return answers[answerType][0];
  }

  function calculatePerQuestionScore(jobDetails, questionNum) {
    const qa = window.resumeData;
    
    // Distribute the overall match score across 5 questions
    // Each question focuses on different aspects
    const skillScore = evaluateSkillMatch(jobDetails) * 0.5;
    const levelScore = calculateLevelAlignment(getResumeExperienceLevel(), getJobExperienceLevel(jobDetails)) * 0.25;
    const certScore = evaluateCertificateRelevance(jobDetails) * 0.15;
    const projectScore = evaluateProjectExperience(jobDetails) * 0.1;
    
    let baseScore = 0;
    
    // Distribute scores across questions
    switch(questionNum) {
      case 1: baseScore = skillScore * 1.2; break;
      case 2: baseScore = (skillScore * 0.8) + (projectScore * 1.0); break;
      case 3: baseScore = (certScore * 1.5) + (projectScore * 0.5); break;
      case 4: baseScore = (certScore * 1.0) + (skillScore * 0.5); break;
      case 5: baseScore = (levelScore * 1.5) + (certScore * 0.5); break;
    }
    
    return Math.min(Math.max(Math.round(baseScore), 40), 88);
  }

  function evaluateSkillMatch(jobDetails) {
    const resumeSkills = extractResumeSkills();
    const jobSkillsList = parseJobSkills(jobDetails);
    let skillMatches = 0;
    
    for (let jobSkill of jobSkillsList) {
      const jobSkillLower = jobSkill.toLowerCase();
      for (let resumeSkill of resumeSkills) {
        const resumeSkillLower = resumeSkill.toLowerCase();
        if (jobSkillLower === resumeSkillLower || jobSkillLower.includes(resumeSkillLower) || resumeSkillLower.includes(jobSkillLower)) {
          skillMatches++;
          break;
        }
      }
    }
    
    return jobSkillsList.length > 0 ? (skillMatches / jobSkillsList.length) * 100 : 50;
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
    if (questionNum > 5) {
      showTyping(false);
      displayInterviewSummary();
      return;
    }
    
    showTyping(true);
    
    let questions = [];
    
    if (currentMatchScore >= 70) {
      questions = [
        `Tell me about your experience with ${jobDetails.skills[0] || 'the required tech stack'}. How have you applied it in real projects?`,
        `Describe a time when you had to ${jobDetails.responsibilities[0]?.toLowerCase() || 'solve a complex technical problem'}. What was your approach?`,
        "What are your most significant technical accomplishments?",
        "How do you approach learning new technologies?",
        "Tell us about your experience with the technologies mentioned in the job description."
      ];
    } else if (currentMatchScore >= 50) {
      questions = [
        `Tell us about your experience with ${jobDetails.skills[0] || 'software development'}.`,
        "What interests you about this role?",
        "How would you approach learning the skills you don't yet have?",
        `Describe a project where you had to learn something new.`,
        "What can you tell us about our technology stack?"
      ];
    } else {
      questions = [
        "Tell us about yourself and your tech background.",
        "What interests you in transitioning to this role?",
        "What are you willing to learn to succeed in this position?",
        "Describe your approach to solving technical problems.",
        "Why do you think you'd be a good fit despite the experience gap?"
      ];
    }
    
    const question = questions[questionNum - 1];
    
    setTimeout(() => {
      showTyping(false);
      
      const qMsg = document.createElement('div');
      qMsg.className = 'msg bot';
      qMsg.innerHTML = `<strong>Q${questionNum}:</strong> ${question}`;
      chatLog.appendChild(qMsg);
      chatLog.scrollTop = chatLog.scrollHeight;
      
      setTimeout(() => {
        const answer = generateAnswerFromResume(question);
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

  function displayInterviewSummary() {
    const avgScore = Math.round(questionScores.reduce((a, b) => a + b, 0) / questionScores.length);
    
    const summaryMsg = document.createElement('div');
    summaryMsg.className = 'msg bot summary-msg';
    chatLog.appendChild(summaryMsg);
    chatLog.scrollTop = chatLog.scrollHeight;
    
    let content = `✨ Interview Complete! ✨\n\n`;
    content += `📊 Average Match Score: ${avgScore}%\n`;
    content += `Initial Match Score: ${currentMatchScore}%\n\n`;
    content += `Individual Scores:\n`;
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
            "Excellent technical insight! Let's explore another area:",
            "That demonstrates strong expertise. Here's my next question:",
            "Great articulation of that concept. Moving on:",
            "I appreciate the depth of your knowledge. Let's continue:"
          ];
        } else if (currentMatchScore >= 50) {
          feedbackMessages = [
            "Good answer! Here's another question to explore:",
            "I see your perspective. Let me ask about:",
            "That's solid. Let's dig deeper into:",
            "Thanks for that response. Next question:"
          ];
        } else {
          feedbackMessages = [
            "I appreciate your willingness to learn. Let's explore further:",
            "Good starting point. Here's another area we should cover:",
            "That's helpful context. Moving to the next topic:",
            "Let's continue building your understanding:"
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
  appendMsg("Hello! I'm your resume AI assistant. Ask me anything about your background.", 'bot');

  // reposition on resize to avoid clipping
  window.addEventListener('resize', ensurePanelVisible);
  // ensure panel visible on open
  chatToggle.addEventListener('click', () => { setTimeout(ensurePanelVisible, 80); });

})();
