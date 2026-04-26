/* ── NAVIGATION ─────────────────────────────────────── */
(function () {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  // Sticky scroll effect
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 16);
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const open = hamburger.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* ── ACCORDION ──────────────────────────────────────── */
(function () {
  const items = document.querySelectorAll('.acc-item');
  if (!items.length) return;

  items.forEach(function (item) {
    const header = item.querySelector('.acc-header');
    if (!header) return;
    header.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(function (i) { i.classList.remove('open'); });
      // Open this one if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ── SCROLL FADE-IN ──────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(function (el) { io.observe(el); });
})();

/* ── LEGAL SECTIONS ─────────────────────────────────── */
function toggleLegal(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const isOpen = section.classList.contains('open');
  // Close all
  document.querySelectorAll('.legal-section').forEach(function (s) {
    s.classList.remove('open');
  });
  // Open if was closed, scroll to it
  if (!isOpen) {
    section.classList.add('open');
    setTimeout(function () {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

/* ── SMOOTH ANCHOR SCROLL ───────────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
