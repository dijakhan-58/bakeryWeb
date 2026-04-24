/* ===========================
   La Fournée — script.js
   =========================== */

// ——— PRELOADER ———
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('done');
  }, 1900);
});




// ——— HEADER SCROLL EFFECT ———
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ——— MOBILE NAV ———
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ——— SCROLL REVEAL ———
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same parent
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) {
          setTimeout(() => sib.classList.add('visible'), idx * 80);
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ——— COUNTER ANIMATION ———
function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const ease = 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ——— ACTIVE NAV LINK on scroll ———
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// ——— NEWSLETTER SUBSCRIBE ———
function handleSubscribe(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const input = e.target.querySelector('input');
  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#c9a96e';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
}

// ——— SMOOTH ANCHOR SCROLL (fallback) ———
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});