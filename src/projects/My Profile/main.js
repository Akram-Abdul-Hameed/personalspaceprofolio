let lastScrollTop = 0;
const header = document.getElementById("header");
const menuItems = document.querySelectorAll(".menu-item");
let isScrollingByClick = false;
let scrollTimer;

// Handle scroll detection
const backToTopBtn = document.getElementById("back-to-top");
let ticking = false;

window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Header Scroll Effect
      if (currentScroll > 50) {
        if (!header.classList.contains("scrolled")) {
          header.classList.add("scrolled");
        }
      } else {
        if (header.classList.contains("scrolled")) {
          header.classList.remove("scrolled");
        }
      }

      const homeSection = document.getElementById("home");
      if (backToTopBtn && homeSection) {
        const threshold = homeSection.offsetHeight / 2;
        if (currentScroll > threshold) {
          backToTopBtn.classList.add("show");
        } else {
          backToTopBtn.classList.remove("show");
        }
      }

      ticking = false;
    });

    ticking = true;
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

menuItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    isScrollingByClick = true;
    clearTimeout(scrollTimer);

    menuItems.forEach((i) => i.classList.remove("active"));

    this.classList.add("active");

    const href = this.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", href);
      }
    }

    scrollTimer = setTimeout(() => {
      isScrollingByClick = false;
    }, 1000);
  });
});

const typingElement = document.getElementById("typing-text");
const roles = [
  "Web Developer",
  "UI Engineer",
  "Web Interface Engineer",
  "Digital Interface Developer",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80;
const deletingSpeed = 40;
const pauseTime = 1500;
let animationTimeout;

function typeAnimation() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingElement.textContent = currentRole.substring(0, charIndex);

  if (!isDeleting && charIndex === currentRole.length) {
    animationTimeout = setTimeout(() => {
      isDeleting = true;
      typeAnimation();
    }, pauseTime);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    animationTimeout = setTimeout(typeAnimation, 500);
  } else {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    animationTimeout = setTimeout(typeAnimation, speed);
  }
}

window.addEventListener("load", typeAnimation);

const skillsData = [
    {
        id: 'html',
        name: 'HTML',
        percent: 95,
        color: 'linear-gradient(90deg,#ff7a18,#ffb347)',
        description: 'Building the skeleton of the web with semantic and accessible markup is my top priority, ensuring a solid foundation for any project.',
        strengths: ['Semantic Markup', 'Accessibility (WCAG)', 'HTML5 APIs', 'Forms & Validation']
    },
    {
        id: 'css',
        name: 'CSS',
        percent: 92,
        color: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
        description: 'I create visually appealing and responsive layouts using modern CSS techniques like Flexbox and Grid, with a strong focus on maintainable stylesheets.',
        strengths: ['Flexbox & Grid', 'Responsive Design', 'CSS Animations', 'Sass/SCSS']
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        percent: 88,
        color: 'linear-gradient(90deg,#f7df1e,#ffd54a)',
        description: 'I bring websites to life with interactive features, leveraging ES6+ syntax and modern practices for efficient and readable code.',
        strengths: ['DOM Manipulation', 'ES6+ Syntax', 'Asynchronous JS', 'API Integration']
    },
    {
        id: 'jquery',
        name: 'jQuery',
        percent: 80,
        color: 'linear-gradient(90deg,#00a8ff,#60c0ff)',
        description: 'While I focus on modern vanilla JS, I am proficient with jQuery for maintaining legacy projects or when rapid DOM manipulation is needed.',
        strengths: ['DOM Traversal', 'Event Handling', 'AJAX', 'Plugin Usage']
    },
    {
        id: 'react',
        name: 'React',
        percent: 84,
        color: 'linear-gradient(90deg,#61dafb,#66e0ff)',
        description: 'I build dynamic, component-based user interfaces with React, managing application state effectively for scalable and performant web apps.',
        strengths: ['Component Architecture', 'Hooks', 'State Management (Context)', 'React Router']
    },
    {
        id: 'bootstrap',
        name: 'Bootstrap',
        percent: 86,
        color: 'linear-gradient(90deg,#563d7c,#7952b3)',
        description: 'I rapidly prototype and build responsive layouts using the Bootstrap framework, customizing its components to fit project requirements.',
        strengths: ['Grid System', 'Utility Classes', 'Component Customization', 'Responsive Layouts']
    }
];

function initializeNewSkills() {
    const container = document.querySelector('.skills-list-container');
    const modal = document.getElementById('skill-modal');
    const closeModalBtn = document.querySelector('.skill-modal-close');
    if (!container || !modal || !closeModalBtn) return;

    container.innerHTML = skillsData.map(skill => `
        <div class="skill-item" data-skill-id="${skill.id}">
            <div class="skill-item-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percent">${skill.percent}%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="--c: ${skill.color}" data-percent="${skill.percent}"></div>
            </div>
        </div>
    `).join('');

    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.progress-bar');
                setTimeout(() => { bar.style.width = bar.dataset.percent + '%'; }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => skillObserver.observe(item));

    container.addEventListener('click', (e) => {
        const skillItem = e.target.closest('.skill-item');
        if (!skillItem) return;
        const skill = skillsData.find(s => s.id === skillItem.dataset.skillId);
        if (!skill) return;

        document.getElementById('skill-modal-title').textContent = skill.name;
        document.getElementById('skill-modal-desc').textContent = skill.description;
        const iconEl = document.getElementById('skill-modal-icon');
        iconEl.style.background = skill.color;
        iconEl.textContent = skill.name.substring(0, 2);
        document.getElementById('skill-modal-strengths').innerHTML = skill.strengths.map(s => `<li>${s}</li>`).join('');
        modal.classList.add('visible');
    });

    const closeModal = () => modal.classList.remove('visible');
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeNewSkills();
});

const sections = [
  { id: "home", triggerClass: "animate-in" },
  { id: "about", triggerClass: "animate-in" },
  { id: "skills", triggerClass: "animate-in" },
  { id: "projects", triggerClass: "animate-in" },
  { id: "contact", triggerClass: "animate-in" },
];

sections.forEach((section) => {
  const element = document.getElementById(section.id);
  if (!element) return;

  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(section.triggerClass);
          if (section.id === "about") {
            const aboutCard = document.querySelector(".about-card");
            const aboutVisual = document.querySelector(".about-visual");
            if (aboutCard) aboutCard.classList.add(section.triggerClass);
            if (aboutVisual) aboutVisual.classList.add(section.triggerClass);
          }
          sectionObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sectionObs.observe(element);
});

const track = document.querySelector(".projects-track");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

if (track && nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: 340, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -340, behavior: "smooth" });
  });
}

const spySections = document.querySelectorAll("section");
const spyNavItems = document.querySelectorAll(".menu-item");
let lastActiveSection = "";
let sectionOffsets = [];

function updateSectionOffsets() {
  sectionOffsets = Array.from(spySections).map((section) => ({
    id: section.getAttribute("id"),
    top: section.offsetTop,
  }));
}
updateSectionOffsets();
window.addEventListener("resize", updateSectionOffsets);

window.addEventListener("scroll", () => {
  if (isScrollingByClick) return;

  let current = "";
  const scrollY = window.scrollY;

  sectionOffsets.forEach((section) => {
    if (scrollY >= section.top - 150) {
      current = section.id;
    }
  });

  if (lastActiveSection !== current) {
    lastActiveSection = current;
    spyNavItems.forEach((li) => {
      li.classList.remove("active");
      if (li.getAttribute("href") === `#${current}`) {
        li.classList.add("active");
      }
    });
  }
});

const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
const body = document.body;

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

if (themeToggleBtns.length > 0) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  });
}

const cursorDot = document.querySelector(".cursor-dot");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let hoveredEl = null;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const speed = 0.15;

  let targetX = mouseX;
  let targetY = mouseY;

  if (hoveredEl) {
    const rect = hoveredEl.getBoundingClientRect();
    targetX = rect.left + rect.width / 2;
    targetY = rect.top + rect.height / 2;
  }

  cursorX += (targetX - cursorX) * speed;
  cursorY += (targetY - cursorY) * speed;

  if (cursorDot) {
    cursorDot.style.left = `${cursorX}px`;
    cursorDot.style.top = `${cursorY}px`;
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

const interactiveSelectors =
  "a, button, input, textarea, .control-btn, .menu-item, .skill-card, .project-card";
const interactiveEls = document.querySelectorAll(interactiveSelectors);

interactiveEls.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    hoveredEl = el;
    cursorDot.classList.add("hovered");

    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);

    cursorDot.style.width = `${rect.width}px`;
    cursorDot.style.height = `${rect.height}px`;
    cursorDot.style.borderRadius = style.borderRadius;

    if (header.classList.contains("scrolled") && header.contains(el)) {
      cursorDot.classList.add("on-header");
    }
  });

  el.addEventListener("mouseleave", () => {
    hoveredEl = null;
    cursorDot.classList.remove("hovered");
    cursorDot.classList.remove("on-header");

    cursorDot.style.width = "12px";
    cursorDot.style.height = "12px";
    cursorDot.style.borderRadius = "50%";
  });
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".header-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".menu-item").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );
}
