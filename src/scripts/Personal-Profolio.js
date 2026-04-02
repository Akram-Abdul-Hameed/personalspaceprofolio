// NAVBAR
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

// MOBILE NAV
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// Trusted Logos
const logos = document.querySelectorAll(".t-icon");

logos.forEach((l) => {
  l.addEventListener("mouseenter", () => {
    logos.forEach((g) => (g.innerHTML = ""));
    l.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2.5" class="custom-check">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>`;
  });
});

// FEATURE TABS
const tabs = document.querySelectorAll(".feature-tab");
const panels = document.querySelectorAll(".feature-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    panels.forEach((p) => {
      p.classList.remove("active");
      if (p.dataset.panel === target) {
        p.classList.add("active");
      }
    });
  });
});

// PRICING TOGGLE
const pricingToggle = document.getElementById("pricingToggle");
const monthlyLabel = document.getElementById("monthlyLabel");
const annualLabel = document.getElementById("annualLabel");
const priceValues = document.querySelectorAll(".pricing-value");
const pricePeriods = document.querySelectorAll(
  ".pricing-period[data-annual-total]",
);
let isAnnual = false;

pricingToggle.addEventListener("click", () => {
  isAnnual = !isAnnual;
  pricingToggle.classList.toggle("annual", isAnnual);
  monthlyLabel.classList.toggle("active", !isAnnual);
  annualLabel.classList.toggle("active", isAnnual);

  priceValues.forEach((el) => {
    const newVal = el.dataset[isAnnual ? "annual" : "monthly"];
    // Skip animation for FREE label
    if (newVal === "FREE") return;

    el.classList.add("changing");
    setTimeout(() => {
      el.textContent = newVal;
      el.classList.remove("changing");
    }, 180);
  });

  pricePeriods.forEach((el) => {
    if (isAnnual) {
      const total = el.dataset.annualTotal;
      el.innerHTML = `Up to <span class="period-yearly"> ${total} </span>`;
    } else {
      el.innerHTML = el.dataset.monthly;
    }
  });
});

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const prefix = el.dataset.prefix || "";
  const decimals = parseInt(el.dataset.decimal) || 0;
  const useComma = el.dataset.comma === "true";
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    let val = eased * target;
    val = decimals > 0 ? val.toFixed(decimals) : Math.round(val);
    if (useComma) val = Number(val).toLocaleString();
    el.textContent = prefix + val + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// SCROLL REVEAL
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll(
            ".fade-up:not(.visible)",
          );
          const idx = Array.from(siblings).indexOf(entry.target);
          setTimeout(
            () => entry.target.classList.add("visible"),
            Math.max(0, idx) * 100,
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -30px 0px" },
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  document
    .querySelectorAll(".stat-number[data-target]")
    .forEach((el) => counterObserver.observe(el));

  // PROJECT SLIDER NAV
  const slider = document.getElementById("projectSlider");
  const prevBtn = document.getElementById("prevProj");
  const nextBtn = document.getElementById("nextProj");

  if (slider && prevBtn && nextBtn) {
    const scrollAmount = 510; // Card width (480) + Gap (30)
    
    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
} else {
  document
    .querySelectorAll(".fade-up")
    .forEach((el) => el.classList.add("visible"));
  document.querySelectorAll(".stat-number[data-target]").forEach((el) => {
    const t = parseFloat(el.dataset.target);
    const s = el.dataset.suffix || "";
    const p = el.dataset.prefix || "";
    const d = parseInt(el.dataset.decimal) || 0;
    let v = d > 0 ? t.toFixed(d) : t;
    if (el.dataset.comma === "true") v = Number(v).toLocaleString();
    el.textContent = p + v + s;
  });
}
