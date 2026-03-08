/**
 * GICNOVA REBUILD — main.js
 * GSAP animations + scroll-reveal + interactions
 * Requires: GSAP 3 + ScrollTrigger (loaded via CDN in HTML)
 */

'use strict';

/* ================================================================
   UTILITY: wait for GSAP to be ready
   ================================================================ */
function onGSAPReady(callback) {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

/* ================================================================
   MAIN INIT
   ================================================================ */
onGSAPReady(() => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  initNavBehaviour();
  initHeroAnimations();
  initScrollReveal();
  initLogoTicker();
  initPricingToggle();
  initFAQAccordion();
  initNavMobile();
  initParallax();
  initCounters();
});

/* ================================================================
   1. NAVIGATION BEHAVIOUR
   - Adds frosted-glass class on scroll
   - Handles active link highlighting
   ================================================================ */
function initNavBehaviour() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Scroll-triggered frosted background
  ScrollTrigger.create({
    start: 'top -80px',
    onEnter: () => nav.classList.add('nav--scrolled'),
    onLeaveBack: () => nav.classList.remove('nav--scrolled'),
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburger = document.getElementById('navHamburger');
      if (mobileMenu && !mobileMenu.hidden) {
        closeMobileMenu(mobileMenu, hamburger);
      }

      const navHeight = nav.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  ScrollTrigger.create({
    onUpdate() {
      const scrollY = window.scrollY + nav.offsetHeight + 40;
      let activeId = '';

      sections.forEach(section => {
        if (section.offsetTop <= scrollY) {
          activeId = section.id;
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('nav__link--active', href === activeId);
      });
    }
  });

  // Initial nav entrance
  gsap.from(nav, {
    y: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });
}

/* ================================================================
   2. HERO ANIMATIONS (page load)
   ================================================================ */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Staggered hero entrance
  tl.from('.hero__badge', {
    y: 24,
    opacity: 0,
    duration: 0.6,
    delay: 0.3,
  })
  .from('.hero__heading', {
    y: 32,
    opacity: 0,
    duration: 0.8,
  }, '-=0.3')
  .from('.hero__subheadline', {
    y: 24,
    opacity: 0,
    duration: 0.7,
  }, '-=0.5')
  .from('.hero__cta', {
    y: 20,
    opacity: 0,
    duration: 0.6,
  }, '-=0.4')
  .from('.hero__trust', {
    y: 16,
    opacity: 0,
    duration: 0.5,
  }, '-=0.3')
  .from('.hero__visual', {
    y: 40,
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: 'power3.out',
  }, 0.4)
  .from('.float-card', {
    scale: 0.85,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.4)',
  }, '-=0.4');

  // Hero background orb parallax on scroll
  gsap.to('.hero__orb--1', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  gsap.to('.hero__orb--2', {
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    },
  });
}

/* ================================================================
   3. SCROLL-REVEAL ANIMATIONS
   Reads data-animate and data-delay attributes
   ================================================================ */
function initScrollReveal() {
  // Generic data-animate elements (not already handled by hero)
  document.querySelectorAll('[data-animate]').forEach(el => {
    // Skip hero elements (already animated above)
    if (el.closest('.hero')) return;

    const animType = el.dataset.animate;
    const delay = parseFloat(el.dataset.delay || 0);

    const fromVars = buildFromVars(animType);

    gsap.from(el, {
      ...fromVars,
      delay,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}

function buildFromVars(type) {
  const map = {
    'fade-up':       { y: 40, opacity: 0 },
    'fade-down':     { y: -30, opacity: 0 },
    'fade-left':     { x: -50, opacity: 0 },
    'fade-right':    { x: 50, opacity: 0 },
    'fade-up-scale': { y: 40, opacity: 0, scale: 0.95 },
    'scale-up':      { scale: 0.92, opacity: 0 },
  };
  return map[type] || { opacity: 0, y: 20 };
}

/* ================================================================
   4. LOGO TICKER
   CSS animation handles the marquee, JS just pauses on hover
   ================================================================ */
function initLogoTicker() {
  const track = document.querySelector('.logo-strip__logos');
  if (!track) return;

  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

/* ================================================================
   5. PRICING TOGGLE (Monthly / Annual)
   ================================================================ */
function initPricingToggle() {
  const monthlyBtn = document.getElementById('toggleMonthly');
  const annualBtn  = document.getElementById('toggleAnnual');
  const amounts    = document.querySelectorAll('.pricing-card__amount');

  if (!monthlyBtn || !annualBtn) return;

  function setMode(mode) {
    const isAnnual = mode === 'annual';

    // Update buttons
    monthlyBtn.classList.toggle('pricing__toggle-btn--active', !isAnnual);
    annualBtn.classList.toggle('pricing__toggle-btn--active', isAnnual);
    monthlyBtn.setAttribute('aria-pressed', String(!isAnnual));
    annualBtn.setAttribute('aria-pressed', String(isAnnual));

    // Animate price change
    gsap.to(amounts, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete() {
        amounts.forEach(el => {
          el.textContent = isAnnual
            ? el.dataset.annual
            : el.dataset.monthly;
        });
        gsap.to(amounts, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
      },
    });
  }

  monthlyBtn.addEventListener('click', () => setMode('monthly'));
  annualBtn.addEventListener('click', () => setMode('annual'));
}

/* ================================================================
   6. FAQ ACCORDION
   ================================================================ */
function initFAQAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-item__trigger');
    const body    = item.querySelector('.faq-item__body');
    const inner   = body?.querySelector('p');

    if (!trigger || !body || !inner) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        // Close
        gsap.to(body, {
          height: 0,
          duration: 0.35,
          ease: 'power3.inOut',
          onComplete: () => {
            body.hidden = true;
            body.style.height = '';
          },
        });
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        // Open: first, un-hide to measure
        body.hidden = false;
        const targetHeight = inner.offsetHeight + 24; // include padding-bottom

        gsap.fromTo(body,
          { height: 0 },
          {
            height: targetHeight,
            duration: 0.4,
            ease: 'power3.out',
            onComplete: () => {
              body.style.height = 'auto';
            },
          }
        );
        trigger.setAttribute('aria-expanded', 'true');

        // Close all other open items
        items.forEach(otherItem => {
          if (otherItem === item) return;
          const otherTrigger = otherItem.querySelector('.faq-item__trigger');
          const otherBody    = otherItem.querySelector('.faq-item__body');
          if (otherTrigger.getAttribute('aria-expanded') === 'true') {
            gsap.to(otherBody, {
              height: 0,
              duration: 0.3,
              ease: 'power3.in',
              onComplete: () => {
                otherBody.hidden = true;
                otherBody.style.height = '';
              },
            });
            otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  });
}

/* ================================================================
   7. MOBILE NAVIGATION
   ================================================================ */
function initNavMobile() {
  const hamburger  = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu(mobileMenu, hamburger);
    } else {
      openMobileMenu(mobileMenu, hamburger);
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      if (hamburger.classList.contains('is-open')) {
        closeMobileMenu(mobileMenu, hamburger);
      }
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
      closeMobileMenu(mobileMenu, hamburger);
      hamburger.focus();
    }
  });
}

function openMobileMenu(menu, btn) {
  menu.hidden = false;
  btn.classList.add('is-open');
  btn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu(menu, btn) {
  menu.hidden = true;
  btn.classList.remove('is-open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* ================================================================
   8. PARALLAX (subtle phone mockup movement on scroll)
   ================================================================ */
function initParallax() {
  // Only on desktop (avoid jank on mobile)
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  gsap.to('.phone-mockup', {
    y: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  // CTA banner orb gentle movement
  gsap.to('.cta-banner__orb', {
    scale: 1.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '.cta-banner',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
    },
  });
}

/* ================================================================
   9. ANIMATED COUNTERS (for stats section)
   ================================================================ */
function initCounters() {
  const stats = document.querySelectorAll('.stat__number');

  stats.forEach(stat => {
    // Extract numeric value
    const fullText = stat.textContent.trim();
    const suffix   = stat.querySelector('.stat__plus')?.textContent || '';
    const numText  = fullText.replace(suffix, '').trim();
    const target   = parseFloat(numText.replace(/[^0-9.]/g, ''));
    const isDecimal= numText.includes('.');
    const prefix   = numText.match(/[^0-9.]+/)?.[0] || '';

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 90%',
      once: true,
      onEnter() {
        gsap.fromTo(
          { val: 0 },
          { val: target, duration: 2, ease: 'power2.out' },
          {
            onUpdate() {
              const v = this.targets()[0].val;
              const displayed = isDecimal ? v.toFixed(1) : Math.round(v);
              // Reconstruct with original formatting (e.g. "2M")
              let formatted;
              if (numText.includes('M')) {
                formatted = (v / 1).toFixed(0) + 'M';
              } else if (numText.includes(',')) {
                formatted = Math.round(v).toLocaleString();
              } else {
                formatted = String(displayed);
              }
              stat.innerHTML = formatted + `<span class="stat__plus">${suffix}</span>`;
            },
          }
        );
      },
    });
  });
}

/* ================================================================
   10. BUTTON HOVER — magnetic effect (subtle)
   ================================================================ */
document.querySelectorAll('.btn--primary, .btn--store').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: dx * 0.12,
      y: dy * 0.12,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
  });
});

/* ================================================================
   11. FEATURE CARD GLOW on hover
   ================================================================ */
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

/* ================================================================
   12. TESTIMONIAL CARDS — horizontal scroll on mobile
   ================================================================ */
function initTestimonialScroll() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) return;

  const grid = document.querySelector('.testimonials__grid');
  if (!grid) return;

  // Convert to horizontal scroll on mobile
  grid.style.display = 'flex';
  grid.style.overflowX = 'auto';
  grid.style.scrollSnapType = 'x mandatory';
  grid.style.gap = '16px';
  grid.style.paddingBottom = '16px';

  grid.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.flexShrink = '0';
    card.style.width = 'calc(85vw)';
    card.style.scrollSnapAlign = 'start';
  });
}

initTestimonialScroll();

/* ================================================================
   13. PAGE LOAD PROGRESS indicator
   ================================================================ */
(function initProgressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; width: 0; z-index: 9999;
    background: linear-gradient(90deg, #a855f7, #ec4899);
    transition: width 0.3s ease;
    pointer-events: none;
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = `${pct}%`;
  });
})();

/* ================================================================
   14. RESPONSIVE BREAKPOINT WATCHER
   Refresh ScrollTrigger on resize
   ================================================================ */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});
