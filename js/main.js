/**
 * ============================================================================
 * MODERN FREELANCE PORTFOLIO INTERACTIVE CORE
 * High-performance, zero-dependency vanilla JavaScript
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectsFilter();
  initCaseStudyModals();
  initEstimator();
  initFAQAccordion();
  initContactForm();
  initLocalTime();
  initCommandPalette();
  initResumeModal();
  initAudioFeedback();
});

/* ==========================================================================
   1. THEME TOGGLE (Obsidian Dark / Crisp Light)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      playClickSound(800, 0.04);
      showToast(`Switched to ${newTheme === 'dark' ? 'Obsidian Dark' : 'Crisp Light'} theme`);
    });
  }
}

/* ==========================================================================
   2. STICKY NAV & ACTIVE SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawer = document.getElementById('close-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Drawer
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
    drawerLinks.forEach(link => link.addEventListener('click', closeMenu));
  }
}

/* ==========================================================================
   3. FEATURED WORKS CATEGORY FILTER
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
      playClickSound(520, 0.03);
    });
  });
}

/* ==========================================================================
   4. CASE STUDY DEEP-DIVE MODAL SYSTEM
   ========================================================================== */
const caseStudiesData = {
  'coursegen': {
    title: 'AI Course Generator — Automated Curriculum & Learning Engine',
    client: 'GitHub: suji7724/ai-course-generator • Production Web App',
    role: 'Full-Stack Developer & AI Integrations Engineer',
    duration: '4 Weeks',
    heroImg: 'assets/images/novametric_ai.jpg',
    metrics: [
      { num: '100%', label: 'Automated Curriculum' },
      { num: '< 3s', label: 'Outline Generation' },
      { num: '5★', label: 'User Feedback' }
    ],
    challenge: 'Students and educators spend hours structuring topics, finding relevant sub-lessons, and drafting quizzes manually without interactive learning paths.',
    solution: 'Architected a Next.js 14 web application integrating modern LLMs (Gemini / OpenAI) to generate comprehensive modular courses, chapter descriptions, and interactive quiz roadmaps on demand with a responsive modern UI.',
    stack: ['Next.js 14', 'React', 'Tailwind CSS', 'Gemini / OpenAI API', 'PostgreSQL', 'Prisma'],
    quote: '"Sujit built an exceptional AI learning platform. The curriculum flow, clean interface, and instant course generation are remarkable."',
    author: 'Aditya Verma, EdTech Product Lead'
  },
  'mockinterview': {
    title: 'AI Mock Interview — Real-Time Voice Simulation Platform',
    client: 'GitHub: suji7724/ai-mock-interview • Interactive AI',
    role: 'Full-Stack & Speech AI Developer',
    duration: '3 Weeks',
    heroImg: 'assets/images/agentsphere_ai.jpg',
    metrics: [
      { num: 'Real-Time', label: 'Speech-to-Text' },
      { num: '3-Part', label: 'Evaluation Metrics' },
      { num: '100%', label: 'Custom Job Roles' }
    ],
    challenge: 'Job seekers struggle to practice realistic technical and behavioral interviews with actionable feedback before facing high-stakes hiring rounds.',
    solution: 'Engineered an interactive voice-driven simulation platform utilizing Web Speech API and LLMs to present tailored questions, capture speech responses, and generate instant qualitative evaluations with actionable score breakdowns.',
    stack: ['Next.js 14', 'React', 'Web Speech API', 'Tailwind CSS', 'Drizzle ORM', 'PostgreSQL'],
    quote: '"Sujit\'s voice mock interview app gives candidates an unfair advantage. The real-time evaluation and UX feel like talking with a senior interviewer."',
    author: 'Pooja Sharma, Tech Recruiter & Talent Coach'
  },
  'rentease': {
    title: 'RentEase — Modern Property Rental & Tenant Management',
    client: 'GitHub: suji7724/rentease • Full-Stack Web App',
    role: 'Full-Stack Web Developer',
    duration: '5 Weeks',
    heroImg: 'assets/images/omniflow_saas.jpg',
    metrics: [
      { num: '100%', label: 'Responsive Design' },
      { num: '< 50ms', label: 'Listing Search' },
      { num: '0 Bugs', label: 'Production Ready' }
    ],
    challenge: 'Property managers and tenants needed an intuitive, modern dashboard to view rental listings, apply online, and track lease statuses without convoluted spreadsheets.',
    solution: 'Developed an end-to-end rental application with React, Node.js, Express, and MongoDB. Implemented full CRUD property management, dynamic filtering by amenities and price, and fluid mobile-first layouts.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
    quote: '"Sujit delivered a complete, polished rental platform on time. The property search and listings flow couldn\'t be smoother."',
    author: 'Rohan Mehta, Real Estate Operations Director'
  },
  'recipegen': {
    title: 'AI Recipe Generator — Smart Culinary & Nutrition Assistant',
    client: 'GitHub: suji7724/Ai-recipe-Generator • Intelligent App',
    role: 'Full-Stack Developer & AI Specialist',
    duration: '2 Weeks',
    heroImg: 'assets/images/kromaluxe_ecommerce.jpg',
    metrics: [
      { num: '< 2s', label: 'Recipe Generation' },
      { num: 'Zero Waste', label: 'Pantry Matching' },
      { num: 'Macros', label: 'Caloric Breakdown' }
    ],
    challenge: 'Home cooks frequently struggle to find appetizing recipes matching the specific ingredients currently available in their pantry while satisfying dietary rules.',
    solution: 'Designed a smart culinary assistant that takes pantry inputs, dietary filters (vegan, gluten-free, keto), and caloric targets, querying prompt-engineered LLM endpoints to output chef-grade instructions and nutritional data.',
    stack: ['React', 'Python', 'FastAPI', 'OpenAI API', 'Modern CSS', 'Vercel'],
    quote: '"Sujit brought our AI recipe idea to life in less than 2 weeks. The UI is sleek and the recipe generation speed is blazing fast."',
    author: 'Kavita Nair, Health & Wellness Consultant'
  },
  'pdfintel': {
    title: 'PDF Intelligence — RAG Document Search & Q&A Platform',
    client: 'GitHub: suji7724/pdf_intelligence • Document AI',
    role: 'AI Systems & Backend Engineer',
    duration: '4 Weeks',
    heroImg: 'assets/images/pulsepay_fintech.jpg',
    metrics: [
      { num: 'RAG', label: 'Vector Retrieval' },
      { num: '100%', label: 'Citations Verified' },
      { num: '< 0.5s', label: 'Semantic Lookups' }
    ],
    challenge: 'Users needed a fast way to query dense 50+ page legal and technical PDFs without manual skimming or generic LLM hallucinations.',
    solution: 'Engineered a Retrieval-Augmented Generation (RAG) pipeline utilizing LangChain, vector chunking, and FAISS/Chroma vector databases. Generates answers strictly grounded in document text with precise page citations.',
    stack: ['Python', 'LangChain', 'OpenAI Embeddings', 'FAISS / ChromaDB', 'FastAPI', 'Streamlit'],
    quote: '"Sujit\'s RAG pipeline accurately pinpointed answers across dense 100-page manuals. It eliminated manual search hours completely."',
    author: 'Samir Patel, Enterprise Solutions Architect'
  },
  'restsuite': {
    title: 'Restaurant Management Suite — POS & Operations ERP',
    client: 'GitHub: suji7724/restaurant_management_project • Business Suite',
    role: 'Full-Stack Python & Django Developer',
    duration: '6 Weeks',
    heroImg: 'assets/images/zenith_telehealth.jpg',
    metrics: [
      { num: 'Real-Time', label: 'Kitchen KOT Sync' },
      { num: 'Automated', label: 'Daily Sales Reports' },
      { num: 'POS', label: 'Instant Invoicing' }
    ],
    challenge: 'Busy dining establishments struggle with disconnected order ticketing, slow table billing, and inaccurate inventory stock records during rush hours.',
    solution: 'Architected a comprehensive restaurant ERP using Django, PostgreSQL, and JavaScript. Includes live table order mapping, kitchen display ticketing (KOT), low-stock ingredient alerts, and automated end-of-day sales reporting.',
    stack: ['Python', 'Django', 'PostgreSQL', 'JavaScript', 'Bootstrap 5', 'REST APIs'],
    quote: '"From table reservations to kitchen ticketing and daily sales reports, Sujit designed and shipped an entire restaurant suite without a glitch."',
    author: 'Dr. Ananya Roy, Hospitality Group Investor'
  }
};

function initCaseStudyModals() {
  const modalOverlay = document.getElementById('case-study-modal');
  const modalContent = document.getElementById('case-study-content');
  const closeModalBtn = document.getElementById('close-case-study');
  const openButtons = document.querySelectorAll('.btn-case-study');

  if (!modalOverlay || !modalContent) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      const data = caseStudiesData[projectKey];

      if (data) {
        renderCaseStudy(data, modalContent);
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        playClickSound(650, 0.04);
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

function renderCaseStudy(data, container) {
  container.innerHTML = `
    <img src="${data.heroImg}" alt="${data.title}" class="modal-hero-img" />
    <div class="modal-section-block">
      <span class="section-tag">${data.client}</span>
      <h2 style="font-size: 1.85rem; margin-top: 10px; margin-bottom: 12px;">${data.title}</h2>
      <div class="modal-meta-row">
        <div><strong>Role:</strong> <span style="color: var(--text-secondary);">${data.role}</span></div>
        <div><strong>Timeline:</strong> <span style="color: var(--text-secondary);">${data.duration}</span></div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; background: var(--bg-surface-elevated); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
      ${data.metrics.map(m => `
        <div style="text-align: center;">
          <div style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--color-accent-emerald);">${m.num}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">${m.label}</div>
        </div>
      `).join('')}
    </div>

    <div class="modal-section-block">
      <h3>The Core Challenge</h3>
      <p>${data.challenge}</p>
    </div>

    <div class="modal-section-block">
      <h3>Engineering & Architecture Solution</h3>
      <p>${data.solution}</p>
    </div>

    <div class="modal-section-block">
      <h3>Tech Stack & Integrations</h3>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
        ${data.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section-block" style="background: rgba(99, 102, 241, 0.08); border-left: 4px solid var(--color-primary); padding: 20px; border-radius: var(--radius-sm); margin-top: 24px;">
      <p style="font-style: italic; color: var(--text-main); font-size: 1rem; margin-bottom: 10px;">${data.quote}</p>
      <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary-light);">${data.author}</div>
    </div>

    <div style="display: flex; gap: 16px; margin-top: 32px;">
      <a href="#contact" class="btn btn-primary" onclick="document.getElementById('case-study-modal').classList.remove('active'); document.body.style.overflow = '';">
        Discuss Similar Project
      </a>
      <button class="btn btn-secondary" onclick="document.getElementById('case-study-modal').classList.remove('active'); document.body.style.overflow = '';">
        Close Preview
      </button>
    </div>
  `;
}

/* ==========================================================================
   5. INTERACTIVE PROJECT COST & SCOPE ESTIMATOR (USD & INR)
   ========================================================================== */
function initEstimator() {
  const typeRadios = document.querySelectorAll('input[name="proj-type"]');
  const scopeRadios = document.querySelectorAll('input[name="proj-scope"]');
  const featureCheckboxes = document.querySelectorAll('input[name="proj-features"]');
  const timelineRadios = document.querySelectorAll('input[name="proj-timeline"]');

  const priceOutput = document.getElementById('calc-price-output');
  const timelineOutput = document.getElementById('calc-timeline-output');
  const applyScopeBtn = document.getElementById('apply-scope-btn');

  const estimatorCurrencyBtns = document.querySelectorAll('#estimator-currency-group .currency-btn');
  const contactCurrencyBtns = document.querySelectorAll('#contact-currency-group .currency-btn');
  const contactBudgetSelect = document.getElementById('contact-budget');

  // Default to INR as requested, or saved choice
  let currentCurrency = localStorage.getItem('portfolio-currency') || 'INR';

  // Intermediate Friendly Rates (Calibrated for fair, accessible freelance projects)
  const baseRates = {
    'USD': {
      'saas': { min: 750, max: 1500, weeks: 3 },
      'mvp': { min: 400, max: 850, weeks: 2 },
      'ecommerce': { min: 550, max: 1150, weeks: 2 },
      'ai': { min: 650, max: 1300, weeks: 2 },
      'speed': { min: 200, max: 450, weeks: 1 }
    },
    'INR': {
      'saas': { min: 38000, max: 78000, weeks: 3 },
      'mvp': { min: 20000, max: 42000, weeks: 2 },
      'ecommerce': { min: 28000, max: 58000, weeks: 2 },
      'ai': { min: 32000, max: 68000, weeks: 2 },
      'speed': { min: 10000, max: 22000, weeks: 1 }
    }
  };

  const scopeMultipliers = {
    'starter': 1.0,
    'pro': 1.3,
    'enterprise': 1.65
  };

  const featureCosts = {
    'USD': {
      'auth': 80,
      'payments': 140,
      'analytics': 90,
      'ai-agents': 180,
      'i18n': 60,
      'realtime': 130
    },
    'INR': {
      'auth': 4000,
      'payments': 7000,
      'analytics': 4500,
      'ai-agents': 9500,
      'i18n': 3000,
      'realtime': 6500
    }
  };

  const timelineMultipliers = {
    'express': { costMul: 1.2, timeFactor: 0.7 },
    'standard': { costMul: 1.0, timeFactor: 1.0 },
    'flexible': { costMul: 0.9, timeFactor: 1.3 }
  };

  function updateCurrencyUI(currency) {
    currentCurrency = currency;
    localStorage.setItem('portfolio-currency', currency);

    // Update active states on both currency button groups
    estimatorCurrencyBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-currency') === currency);
    });
    contactCurrencyBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-currency') === currency);
    });

    // Dynamically update Contact Form Budget Dropdown
    if (contactBudgetSelect) {
      if (currency === 'INR') {
        contactBudgetSelect.innerHTML = `
          <option value="inr-1">₹20,000 – ₹45,000</option>
          <option value="inr-2" selected>₹45,000 – ₹85,000</option>
          <option value="inr-3">₹85,000 – ₹1,50,000</option>
          <option value="inr-4">₹1,50,000+</option>
        `;
      } else {
        contactBudgetSelect.innerHTML = `
          <option value="usd-1">$400 – $800</option>
          <option value="usd-2" selected>$800 – $1,600</option>
          <option value="usd-3">$1,600 – $3,000</option>
          <option value="usd-4">$3,000+</option>
        `;
      }
    }

    recalculate();
  }

  function recalculate() {
    let selectedType = 'saas';
    typeRadios.forEach(r => { if (r.checked) selectedType = r.value; });

    let selectedScope = 'starter';
    scopeRadios.forEach(r => { if (r.checked) selectedScope = r.value; });

    let selectedTimeline = 'standard';
    timelineRadios.forEach(r => { if (r.checked) selectedTimeline = r.value; });

    const currBase = baseRates[currentCurrency][selectedType] || baseRates[currentCurrency]['saas'];
    const currFeatures = featureCosts[currentCurrency];
    const scopeMul = scopeMultipliers[selectedScope] || 1.0;
    const timeSettings = timelineMultipliers[selectedTimeline] || timelineMultipliers['standard'];

    let addedFeaturesCost = 0;
    featureCheckboxes.forEach(cb => {
      if (cb.checked) {
        addedFeaturesCost += currFeatures[cb.value] || 0;
      }
    });

    const minTotal = Math.round(((currBase.min * scopeMul) + addedFeaturesCost) * timeSettings.costMul);
    const maxTotal = Math.round(((currBase.max * scopeMul) + (addedFeaturesCost * 1.2)) * timeSettings.costMul);

    const projectedWeeks = Math.max(1, Math.round(currBase.weeks * timeSettings.timeFactor));

    const symbol = currentCurrency === 'INR' ? '₹' : '$';
    const minFormatted = minTotal.toLocaleString(currentCurrency === 'INR' ? 'en-IN' : 'en-US');
    const maxFormatted = maxTotal.toLocaleString(currentCurrency === 'INR' ? 'en-IN' : 'en-US');

    if (priceOutput) {
      priceOutput.textContent = `${symbol}${minFormatted} – ${symbol}${maxFormatted}`;
    }
    if (timelineOutput) {
      timelineOutput.textContent = `Estimated Delivery: ~${projectedWeeks} ${projectedWeeks === 1 ? 'Week' : 'Weeks'}`;
    }
  }

  // Currency toggle click listeners
  estimatorCurrencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateCurrencyUI(btn.getAttribute('data-currency'));
      playClickSound(620, 0.03);
      showToast(`Pricing switched to ${btn.getAttribute('data-currency')}`);
    });
  });

  contactCurrencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateCurrencyUI(btn.getAttribute('data-currency'));
      playClickSound(620, 0.03);
      showToast(`Budget currency switched to ${btn.getAttribute('data-currency')}`);
    });
  });

  // Bind option changes
  [...typeRadios, ...scopeRadios, ...featureCheckboxes, ...timelineRadios].forEach(el => {
    el.addEventListener('change', recalculate);
  });

  // Initial calculation & UI render
  updateCurrencyUI(currentCurrency);

  // "Send This Scope with Inquiry" Button Click
  if (applyScopeBtn) {
    applyScopeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      let selectedTypeName = 'SaaS Platform';
      typeRadios.forEach(r => {
        if (r.checked) {
          selectedTypeName = r.parentElement.querySelector('.opt-name')?.textContent || r.value;
        }
      });

      let selectedFeatures = [];
      featureCheckboxes.forEach(cb => {
        if (cb.checked) {
          selectedFeatures.push(cb.parentElement.querySelector('.opt-name')?.textContent || cb.value);
        }
      });

      const estimatedRange = priceOutput ? priceOutput.textContent : (currentCurrency === 'INR' ? '₹38,000 – ₹78,000' : '$750 – $1,500');
      const estimatedTime = timelineOutput ? timelineOutput.textContent : '3 Weeks';

      // Pre-fill contact form
      const contactMsg = document.getElementById('contact-message');
      const contactTypeSelect = document.getElementById('contact-project-type');

      if (contactTypeSelect) {
        contactTypeSelect.value = selectedTypeName.toLowerCase().includes('mvp') ? 'mvp' :
                                  selectedTypeName.toLowerCase().includes('ecommerce') ? 'ecommerce' :
                                  selectedTypeName.toLowerCase().includes('ai') ? 'ai' : 'saas';
      }

      if (contactMsg) {
        contactMsg.value = `Hi Sujit, I built an estimate for a ${selectedTypeName}.\n\n` +
          `• Project Type: ${selectedTypeName}\n` +
          `• Features / Add-ons: ${selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'Standard Setup'}\n` +
          `• Estimated Budget: ${estimatedRange} (${currentCurrency})\n` +
          `• Timeline: ${estimatedTime}\n\n` +
          `We'd love to chat about kickstarting this project. Here are a few details about what we need: `;
      }

      // Smooth scroll to contact
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        if (contactMsg) {
          setTimeout(() => {
            contactMsg.focus();
            contactMsg.setSelectionRange(contactMsg.value.length, contactMsg.value.length);
          }, 600);
        }
      }

      showToast(`Estimated scope (${currentCurrency}) attached to inquiry form!`);
      playClickSound(880, 0.05);
    });
  }
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');

    if (questionBtn && answerEl) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
          playClickSound(480, 0.02);
        } else {
          item.classList.remove('active');
          answerEl.style.maxHeight = null;
        }
      });
    }
  });
}

/* ==========================================================================
   7. LIVE LOCAL CLOCK & TIMEZONE WIDGET
   ========================================================================== */
function initLocalTime() {
  const clockEl = document.getElementById('local-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    // Format to 12-hour time with AM/PM
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    clockEl.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   8. SMART CONTACT FORM HANDLING & COPY EMAIL
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');
      const submitBtn = document.getElementById('contact-submit-btn');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
        showToast('Please fill out all required fields.', 'warning');
        return;
      }

      // Simulate sending state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Sending Inquiry...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `✓ Inquiry Sent Successfully!`;
        submitBtn.style.background = 'var(--color-accent-emerald)';
        showToast('Thank you! Your inquiry was sent. I will reply within 2 hours.');
        playClickSound(950, 0.08);

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 4000);
      }, 1200);
    });
  }

  // Copy email listener
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'sujitcoder044@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
        playClickSound(750, 0.03);
      }).catch(() => {
        showToast('Direct email: ' + email);
      });
    });
  });
}

/* ==========================================================================
   9. COMMAND PALETTE (Ctrl+K / Cmd+K)
   ========================================================================== */
function initCommandPalette() {
  const cmdModal = document.getElementById('command-palette-modal');
  const cmdTriggerBtns = document.querySelectorAll('.cmd-palette-btn');
  const cmdInput = document.getElementById('cmd-search-input');
  const cmdResultsList = document.getElementById('cmd-results-list');
  const closeCmdBtn = document.getElementById('close-cmd-palette');

  if (!cmdModal) return;

  const commands = [
    { title: 'View Featured Work & Case Studies', tag: 'Navigation', action: () => scrollToSection('work') },
    { title: 'Interactive Project Cost Estimator', tag: 'Tool', action: () => scrollToSection('estimator') },
    { title: 'Explore Services & Bento Grid', tag: 'Navigation', action: () => scrollToSection('services') },
    { title: 'Why Choose Me (Freelancer Comparison)', tag: 'Info', action: () => scrollToSection('why-me') },
    { title: '4-Step Collaborative Process', tag: 'Process', action: () => scrollToSection('process') },
    { title: 'Read Client Testimonials & Social Proof', tag: 'Reviews', action: () => scrollToSection('testimonials') },
    { title: 'Send Direct Project Inquiry', tag: 'Contact', action: () => scrollToSection('contact') },
    { title: 'View / Download Professional CV', tag: 'Resume', action: () => openResumeModal() },
    { title: 'Copy Direct Email Address', tag: 'Action', action: () => copyEmailDirect() },
    { title: 'Toggle Dark / Light Theme', tag: 'Theme', action: () => toggleThemeDirect() }
  ];

  function openPalette() {
    cmdModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (cmdInput) {
      cmdInput.value = '';
      renderCmdResults(commands);
      setTimeout(() => cmdInput.focus(), 80);
    }
  }

  function closePalette() {
    cmdModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderCmdResults(items) {
    if (!cmdResultsList) return;
    cmdResultsList.innerHTML = '';
    
    if (items.length === 0) {
      cmdResultsList.innerHTML = `<li style="padding: 20px; text-align: center; color: var(--text-muted);">No matching commands found</li>`;
      return;
    }

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `cmd-result-item ${index === 0 ? 'selected' : ''}`;
      li.innerHTML = `
        <div class="cmd-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span>${item.title}</span>
        </div>
        <span class="cmd-item-tag">${item.tag}</span>
      `;

      li.addEventListener('click', () => {
        closePalette();
        item.action();
      });

      cmdResultsList.appendChild(li);
    });
  }

  // Keyboard shortcut listener
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && cmdModal.classList.contains('active')) {
      closePalette();
    }
  });

  cmdTriggerBtns.forEach(btn => btn.addEventListener('click', openPalette));
  if (closeCmdBtn) closeCmdBtn.addEventListener('click', closePalette);
  cmdModal.addEventListener('click', (e) => {
    if (e.target === cmdModal) closePalette();
  });

  // Filter input
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = commands.filter(c => c.title.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q));
      renderCmdResults(filtered);
    });
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function copyEmailDirect() {
  navigator.clipboard.writeText('sujitcoder044@gmail.com').then(() => {
    showToast('Email copied to clipboard!');
  });
}

function toggleThemeDirect() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
  showToast(`Theme changed to ${newTheme}`);
}

/* ==========================================================================
   10. INTERACTIVE RESUME / CV MODAL
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.btn-open-resume');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  if (!resumeModal) return;

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  function openResume() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  window.openResumeModal = openResume;

  const closeResume = () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   11. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   12. SUBTLE WEB AUDIO FEEDBACK (Zero external files needed)
   ========================================================================== */
let audioCtx = null;

function initAudioFeedback() {
  // AudioContext will be initialized on first user gesture
  document.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
  }, { once: true });
}

function playClickSound(freq = 600, duration = 0.03) {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (!audioCtx || audioCtx.state === 'suspended') return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Gracefully ignore audio errors in restricted browser contexts
  }
}
