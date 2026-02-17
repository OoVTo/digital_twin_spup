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

  chatToggle.addEventListener('click', () => { chatPanel.classList.toggle('hidden'); });
  closeChat.addEventListener('click', () => { chatPanel.classList.add('hidden'); });

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
    // try server-side AI first
    const serverResp = await queryServer(val);
    showTyping(false);
    chatInput.disabled = false;
    if(serverResp){ appendMsg(serverResp, 'bot'); return; }
    // fallback to local responder
    const resp = answerQuery(val);
    appendMsg(resp, 'bot');
  });

  // reposition on resize to avoid clipping
  window.addEventListener('resize', ensurePanelVisible);
  // ensure panel visible on open
  chatToggle.addEventListener('click', () => { setTimeout(ensurePanelVisible, 80); });

})();
