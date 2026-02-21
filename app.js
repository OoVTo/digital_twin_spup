(() => {
  // Initialize splash screen
  function initSplashScreen() {
    const splash = document.createElement('div');
    splash.className = 'splash-screen';
    splash.innerHTML = `
      <div class="splash-content">
        <div class="splash-logo">✨</div>
        <div class="splash-text">Welcome to My Digital Twin</div>
        <div class="splash-dots">
          <span class="splash-dot">.</span>
          <span class="splash-dot">.</span>
          <span class="splash-dot">.</span>
        </div>
      </div>
    `;
    document.body.insertBefore(splash, document.body.firstChild);
  }
  
  // Show splash screen on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplashScreen);
  } else {
    initSplashScreen();
  }

  const tabsEl = document.getElementById('tabs');
  const contentEl = document.getElementById('content');

  const resume = window.resumeData;

  // Hidden text measurer used to compute word widths for dynamic bubble sizing
  const _textMeasurer = document.createElement('span');
  _textMeasurer.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:pre;padding:0;margin:0;';
  document.body.appendChild(_textMeasurer);

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
      const container = document.createElement('div'); container.className = 'education-container';

      // Degree Card
      const degreeCard = document.createElement('div'); degreeCard.className = 'education-card';
      const degreeHeader = document.createElement('div'); degreeHeader.className = 'education-header';
      const degreeLevel = document.createElement('span'); degreeLevel.className = 'education-level'; degreeLevel.textContent = 'Degree';
      const degreeYears = document.createElement('span'); degreeYears.className = 'education-period'; degreeYears.textContent = e.years;
      degreeHeader.appendChild(degreeLevel); degreeHeader.appendChild(degreeYears);

      const degreeField1 = document.createElement('div'); degreeField1.className = 'education-field';
      degreeField1.innerHTML = `<span class="education-label">Program</span><div class="education-value">${e.degree}</div>`;
      const degreeField2 = document.createElement('div'); degreeField2.className = 'education-field';
      degreeField2.innerHTML = `<span class="education-label">School</span><div class="education-value">${e.school}</div>`;
      const degreeField3 = document.createElement('div'); degreeField3.className = 'education-field';
      degreeField3.innerHTML = `<span class="education-label">Capstone Project</span><div class="education-value">${e.capstone}</div><div class="education-description">(Uses beacon technology, machine learning algorithms, and proximity-grid spatial indexing for real-time item tracking)</div>`;

      degreeCard.appendChild(degreeHeader); degreeCard.appendChild(degreeField1); degreeCard.appendChild(degreeField2); degreeCard.appendChild(degreeField3);
      container.appendChild(degreeCard);

      // Senior HS Card
      const shsCard = document.createElement('div'); shsCard.className = 'education-card';
      const shsHeader = document.createElement('div'); shsHeader.className = 'education-header';
      const shsLevel = document.createElement('span'); shsLevel.className = 'education-level'; shsLevel.textContent = 'Senior High';
      const shsYears = document.createElement('span'); shsYears.className = 'education-period'; shsYears.textContent = e.shs.years;
      shsHeader.appendChild(shsLevel); shsHeader.appendChild(shsYears);

      const shsField = document.createElement('div'); shsField.className = 'education-field';
      shsField.innerHTML = `<span class="education-label">School</span><div class="education-value">${e.shs.school}</div>`;

      shsCard.appendChild(shsHeader); shsCard.appendChild(shsField);
      container.appendChild(shsCard);

      // Junior HS Card
      const jhsCard = document.createElement('div'); jhsCard.className = 'education-card';
      const jhsHeader = document.createElement('div'); jhsHeader.className = 'education-header';
      const jhsLevel = document.createElement('span'); jhsLevel.className = 'education-level'; jhsLevel.textContent = 'Junior High';
      const jhsYears = document.createElement('span'); jhsYears.className = 'education-period'; jhsYears.textContent = e.jhs.years;
      jhsHeader.appendChild(jhsLevel); jhsHeader.appendChild(jhsYears);

      const jhsField = document.createElement('div'); jhsField.className = 'education-field';
      jhsField.innerHTML = `<span class="education-label">School</span><div class="education-value">${e.jhs.school}</div>`;

      jhsCard.appendChild(jhsHeader); jhsCard.appendChild(jhsField);
      container.appendChild(jhsCard);

      contentEl.appendChild(container);
    }
    if (id === 'certs') {
      const h = document.createElement('h2'); h.className = 'section-title'; h.textContent = 'Certifications';
      contentEl.appendChild(h);
      resume.certifications.forEach(c => {
        const card = document.createElement('div'); card.className = 'education-card';
        
        const header = document.createElement('div'); header.className = 'education-header';
        const title = document.createElement('span'); title.className = 'education-level'; title.textContent = c.title;
        header.appendChild(title);
        
        const field1 = document.createElement('div'); field1.className = 'education-field';
        field1.innerHTML = `<span class="education-label">Organization</span><div class="education-value">${c.org}</div>`;
        
        const field2 = document.createElement('div'); field2.className = 'education-field';
        field2.innerHTML = `<span class="education-label">Date</span><div class="education-value">${c.date}</div>`;
        
        const field3 = document.createElement('div'); field3.className = 'education-field';
        const descDiv = document.createElement('div');
        descDiv.className = 'education-description';
        descDiv.textContent = c.desc || '';
        field3.appendChild(descDiv);
        
        card.appendChild(header);
        card.appendChild(field1);
        card.appendChild(field2);
        card.appendChild(field3);
        contentEl.appendChild(card);
      });
    }
    if (id === 'events') {
      const h = document.createElement('h2'); h.className = 'section-title'; h.textContent = 'Seminars / Workshops / Conferences';
      contentEl.appendChild(h);
      resume.events.forEach(ev => {
        const card = document.createElement('div'); card.className = 'education-card';
        
        const header = document.createElement('div'); header.className = 'education-header';
        const title = document.createElement('span'); title.className = 'event-title'; title.textContent = ev.title;
        header.appendChild(title);
        
        const field1 = document.createElement('div'); field1.className = 'education-field';
        field1.innerHTML = `<span class="education-label">Venue</span><div class="education-value">${ev.venue}</div>`;
        
        const field2 = document.createElement('div'); field2.className = 'education-field';
        field2.innerHTML = `<span class="education-label">Date</span><div class="education-value">${ev.date}</div>`;
        
        const field3 = document.createElement('div'); field3.className = 'education-field';
        if (ev.img) {
          const img = document.createElement('img');
          img.src = ev.img;
          img.alt = ev.title;
          img.style.width = '100%';
          img.style.height = '140px';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '8px';
          img.style.marginTop = '4px';
          field3.appendChild(img);
        }
        
        card.appendChild(header);
        card.appendChild(field1);
        card.appendChild(field2);
        card.appendChild(field3);
        contentEl.appendChild(card);
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
            catTitle.textContent = category;
            catTitle.className = 'skill-category-title';
            catDiv.appendChild(catTitle);
            
            const skillList_el = document.createElement('ul'); skillList_el.className = 'skill-list';
            skillList.forEach(skill => {
              const li = document.createElement('li'); 
              if (typeof skill === 'object') {
                const skillName = skill.skill || skill.lang || skill.name || skill.system || skill.area || '';
                const skillLevel = skill.proficiency || skill.level || skill.useCases || skill.features || skill.details || '';
                li.innerHTML = `<strong>${skillName}</strong><span class="skill-level">${skillLevel}</span>`;
              } else {
                li.textContent = skill;
              }
              li.addEventListener('click', function(e) {
                document.querySelectorAll('.skill-list li').forEach(item => {
                  item.classList.remove('active');
                });
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
      resume.affiliations.forEach(a => {
        const card = document.createElement('div'); card.className = 'education-card';
        
        const header = document.createElement('div'); header.className = 'education-header';
        const title = document.createElement('span'); title.className = 'education-level'; title.textContent = a.role;
        const period = document.createElement('span'); period.className = 'education-period'; period.textContent = a.period;
        header.appendChild(title);
        header.appendChild(period);
        
        const field1 = document.createElement('div'); field1.className = 'education-field';
        field1.innerHTML = `<span class="education-label">Organization</span><div class="education-value">${a.organization}</div>`;
        
        const field2 = document.createElement('div'); field2.className = 'education-field';
        const descDiv = document.createElement('div');
        descDiv.className = 'education-description';
        descDiv.textContent = a.desc || '';
        field2.appendChild(descDiv);
        
        card.appendChild(header);
        card.appendChild(field1);
        card.appendChild(field2);
        contentEl.appendChild(card);
      });
    }
    
    // Trigger entrance animations
    setTimeout(() => {
      contentEl.classList.add('fade-in');
    }, 50);
  }

  function toLabel(key){
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, s=>s.toUpperCase());
  }

  createTabs();
  renderSection('personal');

  // Search functionality
  const navSearch = document.getElementById('navSearch');
  navSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderSection('personal');
      return;
    }
    
    // Search through all resume data
    let results = [];
    
    // Search in personal data
    for (let key in resume.personal) {
      if (String(resume.personal[key]).toLowerCase().includes(query)) {
        results.push({ section: 'Personal Data', type: key, value: resume.personal[key] });
      }
    }
    
    // Search in education
    for (let key in resume.education) {
      if (typeof resume.education[key] === 'object') {
        for (let subkey in resume.education[key]) {
          if (String(resume.education[key][subkey]).toLowerCase().includes(query)) {
            results.push({ section: 'Education', type: key, value: resume.education[key][subkey] });
          }
        }
      } else {
        if (String(resume.education[key]).toLowerCase().includes(query)) {
          results.push({ section: 'Education', type: key, value: resume.education[key] });
        }
      }
    }
    
    // Search in certifications
    resume.certifications.forEach((c, i) => {
      if (typeof c === 'object') {
        for (let key in c) {
          if (String(c[key]).toLowerCase().includes(query)) {
            results.push({ section: 'Certifications', item: c.title, value: c[key] });
          }
        }
      }
    });
    
    // Search in events
    resume.events.forEach(ev => {
      for (let key in ev) {
        if (String(ev[key]).toLowerCase().includes(query)) {
          results.push({ section: 'Events', item: ev.title, value: ev[key] });
        }
      }
    });
    
    // Search in skills
    if (resume.skills) {
      Object.entries(resume.skills).forEach(([category, skillList]) => {
        if (Array.isArray(skillList)) {
          skillList.forEach(skill => {
            if (typeof skill === 'object') {
              for (let key in skill) {
                if (String(skill[key]).toLowerCase().includes(query)) {
                  results.push({ section: 'Skills', category: category, item: skill.skill || skill.name, value: skill[key] });
                }
              }
            }
          });
        }
      });
    }
    
    // Search in affiliations
    resume.affiliations.forEach(a => {
      if (typeof a === 'object') {
        for (let key in a) {
          if (String(a[key]).toLowerCase().includes(query)) {
            results.push({ section: 'Affiliations', item: a.role, value: a[key] });
          }
        }
      }
    });
    
    // Display search results
    contentEl.innerHTML = '';
    const h = document.createElement('h2'); h.className = 'section-title'; h.textContent = `Search Results (${results.length})`;
    contentEl.appendChild(h);
    
    if (results.length === 0) {
      const noResults = document.createElement('p');
      noResults.style.color = 'var(--text-secondary)';
      noResults.style.padding = '20px';
      noResults.textContent = `No results found for "${query}"`;
      contentEl.appendChild(noResults);
    } else {
      results.forEach((result, i) => {
        const card = document.createElement('div'); card.className = 'education-card';
        const header = document.createElement('div'); header.className = 'education-header';
        const title = document.createElement('span'); title.className = 'education-level'; title.textContent = result.section;
        header.appendChild(title);
        
        const field = document.createElement('div'); field.className = 'education-field';
        if (result.item) {
          field.innerHTML = `<span class="education-label">${result.type || result.category || 'Item'}</span><div class="education-value">${result.item}</div>`;
        } else if (result.type) {
          field.innerHTML = `<span class="education-label">${result.type}</span><div class="education-value">${result.value}</div>`;
        }
        
        card.appendChild(header);
        card.appendChild(field);
        contentEl.appendChild(card);
      });
    }
    
    setTimeout(() => {
      contentEl.classList.add('fade-in');
    }, 50);
  });

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
      // Handle both object format (new) and string format (legacy)
      const certName = typeof cert === 'object' ? (cert.title || cert.desc || '').toLowerCase() : cert.toLowerCase();
      const certDescription = typeof cert === 'object' ? (cert.desc || '').toLowerCase() : cert.toLowerCase();
      const certCombined = (certName + ' ' + certDescription).toLowerCase();
      
      if ((jobTitle.includes('ai') || jobSkills.includes('ai')) && certCombined.includes('ai')) relevantCerts++;
      else if ((jobTitle.includes('frontend') || jobSkills.includes('react')) && (certCombined.includes('sveltekit') || certCombined.includes('framework'))) relevantCerts++;
      else if ((jobTitle.includes('fintech') || jobSkills.includes('fintech')) && certCombined.includes('fintech')) relevantCerts++;
      else if ((jobTitle.includes('automation') || jobSkills.includes('automation')) && certCombined.includes('automation')) relevantCerts++;
      else if ((jobTitle.includes('cybersecurity') || jobSkills.includes('security')) && certCombined.includes('cyber')) relevantCerts++;
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

  // Switch between automatic and custom interview modes
  window.switchInterviewType = function(type) {
    document.querySelectorAll('.interview-type-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-type') === type);
    });
    document.getElementById('automaticInterviewMode').style.display = type === 'automatic' ? 'block' : 'none';
    document.getElementById('customInterviewMode').style.display = type === 'custom' ? 'block' : 'none';
  };

  // Custom job form handler
  const customJobForm = document.getElementById('customJobForm');
  if (customJobForm) {
    customJobForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const customJob = {
        title: document.getElementById('customJobTitle').value.trim(),
        company: document.getElementById('customJobCompany').value.trim(),
        location: document.getElementById('customJobLocation').value.trim(),
        about: document.getElementById('customJobAbout').value.trim(),
        responsibilities: document.getElementById('customJobResponsibilities').value
          .split('\n')
          .map(r => r.replace(/^[-•*]\s*/, '').trim())
          .filter(r => r.length > 0),
        skills: document.getElementById('customJobSkills').value
          .split(',')
          .map(s => s.trim())
          .filter(s => s.length > 0),
        experience: document.getElementById('customJobExperience').value.trim()
      };

      startCustomInterview(customJob);
    });
  }

  function startCustomInterview(jobData) {
    // Reset interview variables
    interviewQuestionCount = 0;
    questionScores = [];
    
    // Calculate match score
    currentJobDetails = jobData;
    currentMatchScore = calculateCustomJobMatch(jobData);
    
    // Switch to chat mode
    chatForm.style.display = 'flex';
    interviewModePanel.style.display = 'none';
    chatLog.innerHTML = '';
    
    // Display welcome message with match score
    const welcomeMessage = `Welcome to the ${jobData.title} interview! 🎤\n\nYour match score: **${currentMatchScore}%**\n\nLet's begin with some interview questions.`;
    appendMsg(welcomeMessage, 'bot');
    
    setTimeout(() => generateInterviewQuestionWithAnswer(jobData, 1), 1500);
  }

  let resumeContextForInterview = null;

  async function generateInterviewQuestionWithAnswer(jobData, questionNum) {
    if (questionNum === 1) {
      // Fetch resume context on first question
      try {
        const contextResp = await fetch('/api/get-resume-context', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `${jobData.title} ${(jobData.skills || []).slice(0, 2).join(' ')}`
          })
        });
        if (contextResp.ok) {
          const data = await contextResp.json();
          resumeContextForInterview = data.context || '';
        }
      } catch (e) { }
    }

    if (questionNum > 5) {
      // All 5 questions complete - save results
      const avgScore = Math.round(questionScores.reduce((a, b) => a + b, 0) / questionScores.length);
      const finalMsg = `Interview Complete! 🎉\n\nPerformance Score: **${avgScore}%**\n\nQuestion Breakdown:\n${questionScores.map((s, i) => `Q${i+1}: ${s}%`).join('\n')}\n\nCombined with your job match of ${currentMatchScore}%, this role is a great fit!`;
      appendMsg(finalMsg, 'bot');
      
      // Save to stats
      await saveInterviewResult(jobData, questionScores, avgScore);
      return;
    }
    
    // Generate varied, specific questions
    const questions = [
      `Describe your experience with ${(jobData.skills || ['the required technologies'])[0]} and your most significant accomplishment using it.`,
      `What attracted you to this ${jobData.title} position at ${jobData.company || 'this company'}? What skills do you bring?`,
      `Tell me about a time you had to learn a new technology quickly to solve a problem. How did you approach it?`,
      `How would you handle ${(jobData.responsibilities || ['solving complex problems'])[0].toLowerCase()}? Walk me through your approach.`,
      `What are your career goals, and how does this ${jobData.title} role fit into them?`
    ];
    
    const question = questions[questionNum - 1] || questions[0];
    
    appendMsg(`**Q${questionNum}:** ${question}`, 'bot');
    showTyping(true);
    
    // Generate answer after delay
    setTimeout(async () => {
      showTyping(false);
      try {
        const answerResp = await fetch('/api/generate-interview-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: question,
            jobTitle: jobData.title,
            jobSkills: jobData.skills,
            resumeContext: resumeContextForInterview || `Candidate applying for ${jobData.title} role with skills in ${(jobData.skills || []).join(', ')}`
          })
        });
        
        const answerData = await answerResp.json();
        appendMsg(answerData.answer, 'user');
        
        setTimeout(() => {
          const baseScore = currentMatchScore;
          const variance = Math.floor(Math.random() * 20) - 10;
          const qScore = Math.max(20, Math.min(100, baseScore + variance));
          questionScores.push(qScore);
          
          const scoreMsg = document.createElement('div');
          scoreMsg.className = 'msg bot';
          scoreMsg.style.background = '#e3f2fd';
          scoreMsg.style.borderLeft = '4px solid #2563eb';
          scoreMsg.style.color = '#1e40af';
          scoreMsg.style.fontWeight = 'bold';
          scoreMsg.style.textAlign = 'center';
          scoreMsg.textContent = `Q${questionNum} Match: ${qScore}%`;
          chatLog.appendChild(scoreMsg);
          chatLog.scrollTop = chatLog.scrollHeight;
          
          setTimeout(() => generateInterviewQuestionWithAnswer(jobData, questionNum + 1), 1200);
        }, 500);
      } catch (e) {
        console.error('Error:', e);
        const fallbackAnswer = `Based on my experience with ${(jobData.skills || ['relevant technologies'])[0]}, I believe I can effectively contribute to this ${jobData.title} role.`;
        appendMsg(fallbackAnswer, 'user');
        
        setTimeout(() => {
          questionScores.push(currentMatchScore);
          generateInterviewQuestionWithAnswer(jobData, questionNum + 1);
        }, 800);
      }
    }, 1500);
  }

  async function saveInterviewResult(jobData, scores, avgScore) {
    try {
      await fetch('/api/save-interview-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: jobData.title,
          company: jobData.company || 'Custom',
          date: new Date().toISOString(),
          scores: scores,
          averageScore: avgScore,
          matchScore: currentMatchScore,
          isCustom: true
        })
      });
    } catch (e) {
      console.error('Error saving interview result:', e);
    }
  }

  function calculateCustomJobMatch(jobData) {
    // Comprehensive match calculation based on actual resume data
    const resumeSkills = extractResumeSkills();
    const jobSkills = jobData.skills || [];
    
    // 1. SKILL MATCH ANALYSIS (50% weight)
    let skillMatches = 0;
    let partialMatches = 0;
    jobSkills.forEach(jobSkill => {
      const jobSkillLower = jobSkill.toLowerCase();
      for (let resumeSkill of resumeSkills) {
        const resumeSkillLower = resumeSkill.toLowerCase();
        if (jobSkillLower === resumeSkillLower) {
          skillMatches++;
          break;
        } else if (jobSkillLower.includes(resumeSkillLower) || resumeSkillLower.includes(jobSkillLower)) {
          partialMatches++;
          break;
        }
      }
    });
    
    const exactSkillScore = jobSkills.length > 0 ? (skillMatches / jobSkills.length) * 100 : 50;
    const partialSkillScore = jobSkills.length > 0 ? (partialMatches / jobSkills.length) * 100 : 0;
    const skillScore = (exactSkillScore * 0.7) + (partialSkillScore * 0.3);
    
    // 2. EXPERIENCE LEVEL (25% weight)
    const resumeLevel = getResumeExperienceLevel();
    const jobLevel = getJobExperienceLevelFromText(jobData.experience);
    const levelAlignment = calculateLevelAlignment(resumeLevel, jobLevel);
    
    // 3. CERTIFICATIONS (15% weight)
    const certRelevance = evaluateCertificateRelevance({ title: jobData.title, skills: jobData.skills, responsibilities: jobData.responsibilities });
    
    // 4. PROJECT EXPERIENCE (10% weight)
    const projectRelevance = evaluateProjectExperience({ title: jobData.title, skills: jobData.skills });
    
    // Calculate weighted final score
    let score = 0;
    score += skillScore * 0.5;
    score += levelAlignment * 0.25;
    score += certRelevance * 0.15;
    score += projectRelevance * 0.1;
    
    // Ensure realistic range (20-92%)
    return Math.min(Math.max(Math.round(score), 20), 92);
  }

  function getJobExperienceLevelFromText(experienceText) {
    const text = experienceText.toLowerCase();
    if (text.includes('0-1') || text.includes('entry') || text.includes('junior') || text.includes('graduate')) return 1;
    else if (text.includes('1-2') || text.includes('2-3')) return 2;
    else if (text.includes('3-5') || text.includes('3+') || text.includes('4+')) return 4;
    else if (text.includes('5-7') || text.includes('5+')) return 5;
    else if (text.includes('7+') || text.includes('10+')) return 7;
    else if (text.includes('senior')) return 5;
    else if (text.includes('lead') || text.includes('principal') || text.includes('architect')) return 7;
    return 3;
  }

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
          setMessageContent(lastMsg, `Welcome to the ${jobDetails.title} interview! 🎤\n\n📊 Your Match Score: ${animatedScore}% 🔄`);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animateScore);
        } else {
          // Animation complete, show final message with interpretation
          setMessageContent(lastMsg, `Welcome to the ${jobDetails.title} interview! 🎤\n\n📊 Your Match Score: ${currentMatchScore}% (${scoreInterpretation})\n\nLet's begin with some interview questions!`);
          
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
    // Generate conversational, varied interview answers that address the specific question
    const qa = window.resumeData || {};
    const qLower = (question || '').toLowerCase();

    const answers = [];

    // Experience with technologies
    if (/(experience with|worked with|familiar with|proficiency|expertise in)/i.test(question)) {
      const langs = qa.skills?.programmingLanguages || [];
      const frameworks = qa.skills?.frameworksLibraries || [];
      const langNames = langs.slice(0, 4).map(s => typeof s === 'string' ? s : s.lang || s.name || '').filter(Boolean).join(', ');
      const frameworkNames = frameworks.slice(0, 3).map(s => typeof s === 'string' ? s : s.name || '').filter(Boolean).join(', ');
      
      answers.push(`I have hands-on experience with ${langNames || 'multiple programming languages'}. I've worked extensively with frameworks like ${frameworkNames || 'modern web frameworks'} in various projects. I'm comfortable picking up new technologies when needed and have a track record of learning quickly.`);
      answers.push(`I work primarily with ${langNames || 'Python, JavaScript, and similar languages'}. Beyond just knowing the syntax, I focus on writing clean, maintainable code. I've applied these technologies in real projects and actively seek opportunities to expand my toolkit.`);
    }

    // Technical background / Tell me about yourself
    if (/(tell me about|background|experience|who are you)/i.test(question)) {
      answers.push(`I'm currently pursuing a ${qa.education?.degree} at ${qa.education?.school}. I have a strong foundation in software development with hands-on experience through my capstone project on beacon-based item tracking using AI. I've also completed several certifications in modern technologies and actively participate in hackathons and tech communities.`);
      answers.push(`I'm an IT student with a passion for building practical solutions. Beyond academics, I'm experienced in ${qa.skills?.programmingLanguages?.slice(0, 2).map(s => typeof s === 'string' ? s : s.lang || s.name).join(' and ')}, and I've worked on projects combining machine learning with real-world applications. I'm driven by continuous learning and contributing to the tech community.`);
    }

    // Problem-solving / Technical challenges
    if (/(approach|solve|problem|challenge|difficult|handle)/i.test(question)) {
      answers.push(`When facing a technical challenge, I start by understanding the requirements clearly. I break down the problem into manageable parts, research potential solutions, and prototype my approach before implementation. I'm not afraid to ask for help when needed and I believe in documenting my solutions for future reference.`);
      answers.push(`I approach technical problems systematically. First, I analyze what needs to be solved, then I consider different approaches and their trade-offs. I prioritize writing clean code and testing thoroughly. In my capstone project, I faced complex challenges with spatial indexing and machine learning integration, which taught me the value of planning before coding.`);
    }

    // Learning and growth
    if (/(learn|training|growth|develop|improve|skill|certification)/i.test(question)) {
      const certCount = qa.certifications?.length || 0;
      const recentCerts = qa.certifications?.slice(0, 2).map(c => c.title).join(', ');
      answers.push(`I'm committed to continuous learning. I've completed ${certCount} certifications across AI, web development, and automation. I believe learning comes from multiple sources—formal training, hands-on projects, and community engagement. I regularly attend workshops and hackathons to stay current with industry trends.`);
      answers.push(`I learn best through practical application. While I pursue certifications like ${recentCerts}, I also learn significantly from tackling real projects and collaborating with others. I follow industry blogs, participate in tech communities, and always look for opportunities to apply new knowledge.`);
    }

    // Interest in role / Motivation
    if (/(interest|why|motivated|why this role|appeal)/i.test(question)) {
      answers.push(`I'm genuinely excited about roles that combine problem-solving with innovation. What attracts me is the opportunity to work on meaningful projects and contribute to a team where I can grow. I'm particularly interested in companies that value continuous learning and have a strong engineering culture.`);
      answers.push(`I'm motivated by solving real-world problems with technology. The opportunity to work on projects that matter and collaborate with talented developers is what drives me. I'm looking for an environment where I can contribute my skills while constantly learning and pushing my boundaries.`);
    }

    // Dealing with gaps
    if (/(don't have|lack|gap|weak|unfamiliar|new to|haven't used)/i.test(question)) {
      answers.push(`If there are technologies I'm not familiar with, I see it as an opportunity to learn. I've built a foundation that allows me to pick up new tools and frameworks quickly. My capstone project required learning several technologies I had no prior experience with, which reinforced my ability to self-teach effectively.`);
      answers.push(`Skill gaps don't intimidate me—they excite me. I have a solid foundation in problem-solving and software development fundamentals, which means I can learn any specific technology needed. I've consistently worked on projects that pushed me beyond my comfort zone, which is where the real growth happens.`);
    }

    // Project experience
    if (/(project|built|created|developed|worked on)/i.test(question)) {
      const evt = qa.events?.slice(0, 1)[0];
      const capsuleTitle = qa.education?.capstone?.split(':')[0].trim();
      answers.push(`My most significant project is my capstone: "${capsuleTitle}". This involved implementing beacon technology, machine learning algorithms, and complex spatial indexing for real-time item tracking. Beyond that, I've participated in ${evt?.title || 'various hackathons'} where I applied my skills to solve real problems under time constraints.`);
      answers.push(`I've worked on several projects that challenged me technically. My capstone project involved ${capsuleTitle}, combining multiple technologies. I've also participated in tech events and hackathons, where I collaborated with others to deliver functional solutions quickly. These experiences taught me valuable lessons about code quality, teamwork, and time management.`);
    }

    // Experience level alignment
    if (/(senior|junior|level|years|fresh|early career)/i.test(question)) {
      answers.push(`I'm early in my career but I have substantial practical experience through my academic projects, certifications, and community involvement. My capstone project and hackathon participation have given me real-world experience that goes beyond just studying. I'm eager to grow and contribute at a higher level.`);
      answers.push(`While I'm developing my career, I've built a solid foundation through diverse experiences. My education in IT, hands-on projects, and industry certifications have prepared me well. I'm at a point where I'm ready to take on more responsibility and contribute meaningfully to a professional team.`);
    }

    // Teamwork and collaboration
    if (/(team|collaborate|work with|communicate|community)/i.test(question)) {
      answers.push(`I believe great code happens in great teams. I'm active in tech communities, which has taught me the value of collaboration and knowledge sharing. In my projects, I focus on clear communication and writing code that others can understand and build upon. I'm always open to feedback and learning from my peers.`);
      answers.push(`I'm passionate about community and collaboration. I actively participate in tech communities and hackathons, which has taught me how to work effectively with others. I prioritize clear communication about code and ideas, and I genuinely enjoy when team members challenge my thinking.`);
    }

    // Fallback varied responses
    if (answers.length === 0) {
      answers.push(`That's a great question. Based on my experience and current focus, I believe my foundation in ${qa.skills?.programmingLanguages?.slice(0, 1).map(s => typeof s === 'string' ? s : s.lang).join('')} along with my commitment to continuous learning makes me well-suited for challenges in this space. I'm excited about opportunities to apply and expand my knowledge.`);
      answers.push(`I approach this by drawing on my background in ${qa.education?.degree} and my practical experience with various technologies. I'm confident in my ability to contribute and grow with the right team and opportunities.`);
    }

    // Return random answer from the array to provide variety
    return answers[Math.floor(Math.random() * answers.length)];
  }

  function calculatePerQuestionScore(jobDetails, questionNum) {
    try {
      // Get comprehensive match data from actual resume
      const skillScore = evaluateSkillMatch(jobDetails);
      const levelScore = calculateLevelAlignment(getResumeExperienceLevel(), getJobExperienceLevel(jobDetails)) * 100;
      const certScore = evaluateCertificateRelevance(jobDetails) * 100;
      const projectScore = evaluateProjectExperience(jobDetails) * 100;
      const educationScore = evaluateEducationMatch(jobDetails) * 100;
      
      let baseScore = 0;
      
      // Distribute scores across questions based on resume strength in each area
      switch(questionNum) {
        case 1: 
          // Q1: Technical background - weighted heavily on skill match + education
          baseScore = (skillScore * 0.5) + (educationScore * 0.3) + (certScore * 0.2);
          break;
        case 2: 
          // Q2: Interest in role - focus on project experience and motivation alignment
          baseScore = (projectScore * 0.4) + (skillScore * 0.35) + (certScore * 0.25);
          break;
        case 3: 
          // Q3: Learning approach - focus on certifications + demonstrated learning (projects)
          baseScore = (certScore * 0.6) + (projectScore * 0.25) + (skillScore * 0.15);
          break;
        case 4: 
          // Q4: Experience with tech stack - focus on skills + certifications
          baseScore = (skillScore * 0.65) + (certScore * 0.25) + (levelScore * 0.1);
          break;
        case 5: 
          // Q5: Overall fit - weighted average of all factors for holistic assessment
          baseScore = (skillScore * 0.3) + (levelScore * 0.25) + (projectScore * 0.2) + (certScore * 0.15) + (educationScore * 0.1);
          break;
      }
      
      // Apply experience level variance (junior developers can score well on specific areas)
      const experienceMultiplier = getResumeExperienceLevel() === 1 ? 0.85 : 1.0;
      let finalScore = baseScore * experienceMultiplier;
      
      // Add small random variance (±5%) to avoid too-perfect scores
      const variance = (Math.random() * 10) - 5;
      finalScore += variance;
      
      // Return score between 35-90 for realistic range (unlikely to be 90+ without more experience)
      const minScore = getResumeExperienceLevel() === 1 ? 35 : 40;
      const maxScore = currentMatchScore >= 70 ? 88 : 82;
      return Math.min(Math.max(Math.round(finalScore), minScore), maxScore);
    } catch (error) {
      console.error('Error calculating question score:', error);
      return 60;
    }
  }

  function evaluateEducationMatch(jobDetails) {
    if (!window.resumeData || !window.resumeData.education) {
      return 0.5;
    }
    
    const edu = window.resumeData.education;
    const jobTitle = (jobDetails.title || '').toLowerCase();
    
    // Check if degree is relevant to job
    const degreeLower = (edu.degree || '').toLowerCase();
    const degreeMatch = degreeLower.includes('computer science') || 
                       degreeLower.includes('information technology') ||
                       degreeLower.includes('software') ? 0.9 : 0.6;
    
    return degreeMatch;
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

  function animateTyping(element, text, speed = 12, callback = null) {
    let index = 0;
    element.textContent = '';
    element.classList.add('is-typing');
    element.style.display = 'block';

    const typeChar = () => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
        setTimeout(typeChar, speed);
      } else {
        // finished typing
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
    
    const skillName = jobDetails.skills && jobDetails.skills.length > 0 ? jobDetails.skills[0] : 'the required tech stack';
    const respName = jobDetails.responsibilities && jobDetails.responsibilities.length > 0 ? jobDetails.responsibilities[0]?.toLowerCase() : 'solve a complex technical problem';
    
    let questions = [];
    
    if (currentMatchScore >= 70) {
      questions = [
        `Tell me about your experience with ${skillName}. How have you applied it in real projects?`,
        `Describe a time when you had to ${respName}. What was your approach?`,
        "What are your most significant technical accomplishments?",
        "How do you approach learning new technologies?",
        "Tell us about your experience with the technologies mentioned in the job description."
      ];
    } else if (currentMatchScore >= 50) {
      questions = [
        `Tell us about your experience with ${skillName || 'software development'}.`,
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
    
    setTimeout(async () => {
      showTyping(false);
      
      const qMsg = document.createElement('div');
      qMsg.className = 'msg bot';
      qMsg.innerHTML = `<strong>Q${questionNum}:</strong> ${question}`;
      chatLog.appendChild(qMsg);
      chatLog.scrollTop = chatLog.scrollHeight;
      
      setTimeout(() => {
        // Generate answer based on the specific question
        const answer = generateAnswerFromResume(question);
        const qScore = calculatePerQuestionScore(jobDetails, questionNum);
        questionScores.push(qScore);
        
        // create expandable answer message (show short preview, expand on click)
        const aMsg = createExpandableMsg(answer, 'user', 140);
        chatLog.appendChild(aMsg);
        chatLog.scrollTop = chatLog.scrollHeight;

        const previewEl = aMsg.querySelector('.msg-preview') || aMsg;
        const previewText = (answer.length > 140) ? answer.slice(0, 140).trim() : answer;

        animateTyping(previewEl, previewText, 12, () => {
          setTimeout(() => {
            const scoreMsg = document.createElement('div');
            scoreMsg.className = 'msg bot';
            scoreMsg.style.background = '#e3f2fd';
            scoreMsg.style.borderLeft = '4px solid #2563eb';
            scoreMsg.style.color = '#1e40af';
            scoreMsg.style.fontWeight = 'bold';
            scoreMsg.style.textAlign = 'center';
            scoreMsg.style.marginTop = '8px';
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
    content += `📊 Average Match Score: ${avgScore}%\n\n`;
    content += `Question Scores:\n`;
    questionScores.forEach((score, i) => {
      content += `  Q${i + 1}: ${score}%\n`;
    });
    
    animateTyping(summaryMsg, content, 12, () => {
      // Save interview result after animation completes
      saveInterviewResult(currentJobDetails, questionScores, avgScore);
    });
  }

  function saveInterviewResult(jobDetails, scores, avgScore) {
    try {
      const interviewRecord = {
        id: Date.now(),
        jobTitle: jobDetails?.title || 'Unknown Position',
        company: jobDetails?.company || 'Unknown Company',
        date: new Date().toISOString(),
        scores: scores,
        averageScore: avgScore
      };

      // Get existing interviews from localStorage
      let interviews = [];
      const stored = localStorage.getItem('interview_history');
      if (stored) {
        try {
          interviews = JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing interview history:', e);
        }
      }

      // Add new record
      interviews.push(interviewRecord);

      // Save back to localStorage
      localStorage.setItem('interview_history', JSON.stringify(interviews));
      console.log('✅ Interview result saved:', interviewRecord);

      // Send to server for backup
      fetch('/api/interview-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interviewRecord)
      }).catch(err => console.warn('Could not backup interview result:', err));
    } catch (error) {
      console.error('Error saving interview result:', error);
    }
  }

  function getInterviewHistory() {
    try {
      const stored = localStorage.getItem('interview_history');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving interview history:', error);
      return [];
    }
  }

  function calculateInterviewStats(interviews) {
    if (!interviews || interviews.length === 0) {
      return {
        totalInterviews: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0
      };
    }

    const scores = interviews.map(i => i.averageScore);
    const total = scores.reduce((a, b) => a + b, 0);
    const avg = Math.round((total / scores.length) * 10) / 10;

    return {
      totalInterviews: interviews.length,
      averageScore: avg,
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores)
    };
  }

  function appendMsg(text, who='bot'){
    const msgEl = createExpandableMsg(text, who);
    chatLog.appendChild(msgEl);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function createExpandableMsg(text, who='bot', previewLen = 140) {
    const el = document.createElement('div'); el.className = `msg ${who}`;

    const preview = document.createElement('div'); preview.className = 'msg-preview';
    const full = document.createElement('div'); full.className = 'msg-full';
    full.style.display = 'none';

    if (!text || text.length <= previewLen) {
      preview.textContent = text;
      el.appendChild(preview);
      return el;
    }

    const short = text.slice(0, previewLen).trim();
    preview.textContent = short + '\u2026'; // ellipsis
    // store full text for later reveal
    full.dataset.full = text;

    const more = document.createElement('div'); more.className = 'read-more'; more.textContent = 'Read more';
    more.style.color = 'var(--primary)'; more.style.fontSize = '11px'; more.style.marginTop = '6px';

    el.appendChild(preview);
    el.appendChild(full);
    el.appendChild(more);

    el.addEventListener('click', function toggleExpanded(e) {
      // avoid expanding when clicking links or inputs in future
      if (el.classList.contains('expanded')) {
        // collapse
        full.style.display = 'none';
        preview.style.display = '';
        more.textContent = 'Read more';
        el.classList.remove('expanded');
      } else {
        // expand: show full text (no typing to keep UX snappy)
        full.textContent = full.dataset.full || '';
        full.style.display = '';
        preview.style.display = 'none';
        more.textContent = 'Show less';
        el.classList.add('expanded');
      }
      chatLog.scrollTop = chatLog.scrollHeight;
    });

    return el;
  }

  // Utility to safely replace the last message content (used by animated score)
  function setMessageContent(msgEl, text) {
    if (!msgEl) return;
    const preview = msgEl.querySelector('.msg-preview');
    const full = msgEl.querySelector('.msg-full');
    if (preview && full) {
      // update both preview and stored full
      const previewLen = 140;
      if (text.length <= previewLen) {
        preview.textContent = text; full.dataset.full = text; full.textContent = '';
      } else {
        preview.textContent = text.slice(0, previewLen).trim() + '\u2026';
        full.dataset.full = text;
        if (msgEl.classList.contains('expanded')) {
          full.textContent = text;
        } else {
          full.textContent = '';
        }
      }
    } else {
      // fallback - replace textContent
      msgEl.textContent = text;
    }
  }

  function showTyping(show){
    let el = chatLog.querySelector('.typing');
    if (show) {
      if (!el) {
        el = document.createElement('div');
        el.className = 'typing';
        el.innerHTML = `
          <div class="typing-spinner">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        `;
        chatLog.appendChild(el);
        chatLog.scrollTop = chatLog.scrollHeight;
      }
    } else {
      if (el) {
        el.style.animation = 'fadeOut 0.2s ease-out forwards';
        setTimeout(() => el.remove(), 200);
      }
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
    if (/(birth|born|birthplace|birth date|birthday)/.test(s)) return `I was born on ${resume.personal.birthDate} in ${resume.personal.birthplace}. It's a wonderful place to grow up.`;
    if (/(email|e-mail|contact|reach)/.test(s)) return `You can reach me at ${resume.personal.email}. I'm currently based in ${resume.personal.address}.`;
    if (/(degree|studying|education|capstone|school)/.test(s)) {
      const capsuleTitle = resume.education.capstone.split(':')[0].trim();
      return `I'm pursuing a ${resume.education.degree} at ${resume.education.school} (${resume.education.years}). My capstone project, "${capsuleTitle}", involves beacon technology and machine learning for tracking items. I'm really excited about it!`;
    }
    if (/(certif|certificate|credential|training)/.test(s)) {
      if (/list|all/.test(s)) {
        const certCount = resume.certifications.length;
        const recentCerts = resume.certifications.slice(0, 3).map(c => c.title).join(', ');
        return `I've completed ${certCount} certifications across AI, web development, cybersecurity, and automation. Some recent ones include: ${recentCerts}. I'm committed to continuous learning!`;
      }
      return `I have various certifications in AI, automation, web frameworks, and cybersecurity. I believe in staying updated with the latest technologies and industry best practices.`;
    }
    if (/(skill|technical|programming|framework|language|tech stack)/.test(s)) {
      let skillsInfo = 'I work with several technologies:\n\n';
      if (resume.skills) {
        Object.entries(resume.skills).forEach(([category, skillList]) => {
          if (Array.isArray(skillList) && skillList.length > 0) {
            const skills = skillList.map(s => typeof s === 'string' ? s : s.lang || s.name || s.skill || '').filter(Boolean).join(', ');
            if (skills) skillsInfo += `**${category}:** ${skills}\n\n`;
          }
        });
      }
      return skillsInfo || `I'm proficient in various programming languages, frameworks, and tools. I enjoy learning new technologies and applying them to real-world problems.`;
    }
    if (/(affiliat|organization|member|group|role|community)/.test(s)) {
      if (resume.affiliations && resume.affiliations.length > 0) {
        const allAff = resume.affiliations.map(a => `${a.role} at ${a.organization}`).join(', ');
        return `I'm involved with several organizations: ${allAff}. These opportunities allow me to give back to the tech community and collaborate with talented people.`;
      }
      return `I'm actively involved in professional tech communities and organizations where I contribute and collaborate with other developers.`;
    }
    // events by title
    for(const ev of resume.events){ 
      if (s.includes(ev.title.toLowerCase().slice(0,20))) {
        return `I attended "${ev.title}" at ${ev.venue} on ${ev.date}. It was a great experience where I ${ev.desc ? ev.desc.toLowerCase() : 'learned and collaborated with other developers'}.`;
      }
    }
    // events general
    if (/(event|seminar|workshop|conference|hackathon|attend)/.test(s)) {
      if (/list|all/.test(s)) {
        const eventCount = resume.events.length;
        const recentEvents = resume.events.slice(0, 3).map(e => e.title).join(', ');
        return `I've attended ${eventCount} events and conferences! Some recent ones include ${recentEvents}. These opportunities to network and learn from the community are invaluable.`;
      }
      return `I regularly attend conferences, workshops, and hackathons. These events help me stay connected with the tech community and improve my skills.`;
    }

    return `Feel free to ask me about my education, skills, certifications, projects, events, or anything else about my professional background. I'm happy to chat!`;
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
  appendMsg("Hello! I'm your Digital Twin AI assistant. Ask me anything about your background.", 'bot');

  // reposition on resize to avoid clipping
  window.addEventListener('resize', ensurePanelVisible);
  // ensure panel visible on open
  chatToggle.addEventListener('click', () => { setTimeout(ensurePanelVisible, 80); });

})();
