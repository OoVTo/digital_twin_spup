/* ================================================
   DIGITAL TWIN RESUME - APP LOGIC
   ================================================ */

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');
const chatPanel = document.getElementById('chatPanel');
const chatOverlay = document.getElementById('chatOverlay');
const aiChatBtn = document.getElementById('aiChatBtn');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const submitChat = document.getElementById('submitChat');
const chatBody = document.getElementById('chatBody');
const exploreBtn = document.getElementById('exploreBtn');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeNav();
    populateContent();
    initializeChat();
    setupEventListeners();
});

// ================================================
// NAVIGATION & TAB SWITCHING
// ================================================

function initializeNav() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-tab') === tabId) {
            link.classList.add('active');
        }
    });

    // Update content
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTab = document.getElementById(`${tabId}-tab`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================================================
// CONTENT POPULATION
// ================================================

function populateContent() {
    const data = window.resumeData;

    // Education
    const educationContent = document.getElementById('education-content');
    if (educationContent) {
        educationContent.innerHTML = `
            <div class="card card-large">
                <div class="card-icon">🎓</div>
                <h3>Primary Education</h3>
                <div class="profile-details">
                    <div class="detail-row">
                        <span class="label">Degree</span>
                        <span class="value">${data.education.degree}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">School</span>
                        <span class="value">${data.education.school}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Years</span>
                        <span class="value">${data.education.years}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Capstone</span>
                        <span class="value">${data.education.capstone || 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div class="card card-large">
                <div class="card-icon">📚</div>
                <h3>Secondary Education</h3>
                <div class="profile-details">
                    <div class="detail-row">
                        <span class="label">Senior High School</span>
                        <span class="value">${data.education.SHS || 'N/A'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Junior High School</span>
                        <span class="value">${data.education.JHS || 'N/A'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Certifications
    const certificationsContent = document.getElementById('certifications-content');
    if (certificationsContent && data.certifications) {
        certificationsContent.innerHTML = data.certifications.map((cert, idx) => `
            <div class="cert-item">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🏆</div>
                <h4>${cert}</h4>
                <p>Professional certification and achievement</p>
            </div>
        `).join('');
    }

    // Events
    const eventsContent = document.getElementById('events-content');
    if (eventsContent && data.events) {
        eventsContent.innerHTML = data.events.map((event, idx) => {
            const imgUrl = `https://picsum.photos/400/300?random=${idx + 1000}`;
            return `
                <div class="event-card">
                    <div class="event-image">
                        <img src="${imgUrl}" alt="${event.title}" onerror="this.parentElement.style.background='linear-gradient(135deg, #6366f1, #ec4899)'; this.style.display='none';">
                    </div>
                    <div class="event-content">
                        <h4>${event.title}</h4>
                        <p>📍 ${event.venue}</p>
                        <p class="event-date">📅 ${event.date}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Affiliations
    const affiliationsContent = document.getElementById('affiliations-content');
    if (affiliationsContent && data.affiliations) {
        affiliationsContent.innerHTML = data.affiliations.map((affiliation, idx) => `
            <div class="card">
                <div class="card-icon">🤝</div>
                <h3>${affiliation}</h3>
                <p style="color: var(--text-secondary); margin-top: 0.5rem;">Active member and contributor</p>
            </div>
        `).join('');
    }

    // Update stats
    const certCount = document.getElementById('certCount');
    const eventCount = document.getElementById('eventCount');
    if (certCount) certCount.textContent = data.certifications.length;
    if (eventCount) eventCount.textContent = data.events.length;
}

// ================================================
// CHAT FUNCTIONALITY
// ================================================

function initializeChat() {
    aiChatBtn.addEventListener('click', openChat);
    closeChat.addEventListener('click', closePanel);
    chatOverlay.addEventListener('click', closePanel);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitMessage();
        }
    });
    submitChat.addEventListener('click', submitMessage);
    exploreBtn.addEventListener('click', () => switchTab('experience'));
}

function openChat() {
    chatPanel.classList.add('active');
    chatOverlay.classList.add('active');
    chatInput.focus();
}

function closePanel() {
    chatPanel.classList.remove('active');
    chatOverlay.classList.remove('active');
}

function submitMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate response delay
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(message);
        addChatMessage(response, 'bot');
    }, 800);
}

function addChatMessage(text, sender) {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${sender}`;
    messageEl.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
    chatBody.appendChild(messageEl);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message bot';
    messageEl.id = 'typing-indicator';
    messageEl.innerHTML = `<div class="chat-bubble">
        <span style="animation: blink 1.4s infinite;">●</span>
        <span style="animation: blink 1.4s infinite; animation-delay: 0.2s;">●</span>
        <span style="animation: blink 1.4s infinite; animation-delay: 0.4s;">●</span>
    </div>`;
    chatBody.appendChild(messageEl);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

function generateResponse(message) {
    const data = window.resumeData;
    const lowerMessage = message.toLowerCase();

    // Response patterns
    if (lowerMessage.includes('name') || lowerMessage.includes('who are you')) {
        return `Hello! I'm Jacinto Gabriel A. Tong, a BS IT student at St. Paul University Philippines.`;
    }

    if (lowerMessage.includes('education') || lowerMessage.includes('school')) {
        return `I'm pursuing a Bachelor of Science in Information Technology at St. Paul University Philippines (2021-2025).`;
    }

    if (lowerMessage.includes('certification') || lowerMessage.includes('certified')) {
        return `I have earned ${data.certifications.length} professional certifications across cloud, security, development, and infrastructure domains!`;
    }

    if (lowerMessage.includes('experience') || lowerMessage.includes('event') || lowerMessage.includes('attended')) {
        return `I've attended ${data.events.length} professional events, conferences, and workshops to stay updated with industry trends.`;
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
        return `I'm skilled in various technologies including cloud platforms (AWS, GCP, Azure), containerization (Docker, Kubernetes), and modern development frameworks.`;
    }

    if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
        return `I'm based in Tuguegarao City, Cagayan, Philippines.`;
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
        return `You can reach me at jacintotong@spup.edu.ph or connect via the contact information in my profile.`;
    }

    if (lowerMessage.includes('affiliation') || lowerMessage.includes('member') || lowerMessage.includes('organization')) {
        const aff = data.affiliations.slice(0, 2).join(', ');
        return `I'm actively involved in several organizations including ${aff} and more. I believe in community contribution!`;
    }

    if (lowerMessage.includes('project') || lowerMessage.includes('capstone') || lowerMessage.includes('build')) {
        return `I develop projects using modern technologies and best practices. ${data.education.capstone ? 'My capstone project is: ' + data.education.capstone : 'Always working on interesting challenges!'}`;
    }

    if (lowerMessage.includes('career') || lowerMessage.includes('opportunity') || lowerMessage.includes('job')) {
        return `I'm open to exciting opportunities in software development, cloud engineering, and DevOps! Feel free to connect if you have an interesting role.`;
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return `Hey there! 👋 Welcome to my Digital Twin Resume. Feel free to ask me anything about my education, skills, experience, or how we can work together!`;
    }

    if (lowerMessage.includes('what')) {
        return `I can tell you about my education, certifications, events I've attended, skills, experience, and how to get in touch. What would you like to know?`;
    }

    // Default fallback
    return `That's a great question! You can explore different sections (Education, Certifications, Events, Experience) to learn more about me. What else would you like to know?`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ================================================
// EVENT LISTENERS
// ================================================

function setupEventListeners() {
    // Handle responsive nav
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
        });
    }

    // Smooth scroll links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Add custom animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 20%, 50%, 80%, 100% { opacity: 1; }
        40% { opacity: 0.3; }
        60% { opacity: 0.3; }
    }
`;
document.head.appendChild(style);

// Log initialization
console.log('🚀 Digital Twin Resume initialized');
console.log('📊 Resume Data:', window.resumeData);
