// ── Theme Toggle (in-memory state) ──
const themeToggle = document.getElementById('themeToggle');
let currentTheme = 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);
themeToggle?.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
});
function updateThemeIcon(t) {
  if (!themeToggle) return;
  themeToggle.innerHTML = t === 'dark'
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// ── Sticky Header ──
const siteHeader = document.getElementById('siteHeader');
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  siteHeader?.classList.toggle('scrolled', window.scrollY > 20);
  btt?.classList.toggle('visible', window.scrollY > 400);
});

// ── Mobile Nav ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav?.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', mobileNav?.classList.contains('open'));
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  hamburger?.classList.remove('open');
}));

// ── Scroll Animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Back to Top ──
btt?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── FAQ ──
function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => toggleFaq(q));
});

// ── Booking Multi-step ──
let currentStep = 1;
function goToStep(n) {
  document.querySelectorAll('.booking-step').forEach((s,i) => s.classList.toggle('active', i+1 === n));
  document.querySelectorAll('.progress-step').forEach((s,i) => {
    s.classList.remove('active','completed');
    if (i+1 === n) s.classList.add('active');
    if (i+1 < n) s.classList.add('completed');
  });
  currentStep = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function selectServiceOption(el) {
  document.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}
function selectTimeSlot(el) {
  if (el.classList.contains('unavailable')) return;
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

// ── Admin Login ──
function adminLogin() {
  const pw = document.getElementById('adminPassword')?.value;
  const errEl = document.getElementById('loginError');
  if (pw === 'admin123') {
    document.getElementById('adminLoginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'grid';
    if (errEl) errEl.style.display = 'none';
  } else {
    if (errEl) { errEl.style.display = 'block'; errEl.textContent = 'Incorrect password. Please try again.'; }
  }
}
function adminLogout() {
  document.getElementById('adminLoginSection').style.display = 'flex';
  document.getElementById('dashboardSection').style.display = 'none';
  const pw = document.getElementById('adminPassword');
  if (pw) pw.value = '';
}
document.getElementById('adminLoginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  adminLogin();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ── Gallery Lightbox ──
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  if (lb && lbImg) { lbImg.src = src; lb.classList.add('open'); }
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
}

// ── Gallery Filter ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
