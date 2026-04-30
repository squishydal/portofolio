/* ============================================================
   theme.js — dark / light mode toggle
   Reads from localStorage on load, persists choice on toggle.
   Handles both the desktop pill (#themeToggle) and the mobile
   one (#themeToggleMobile) that appears next to the hamburger.
   ============================================================ */

const html          = document.documentElement;
const desktopToggle = document.getElementById('themeToggle');
const mobileToggle  = document.getElementById('themeToggleMobile');

// ── Restore saved preference on page load ────────────────────
if (localStorage.getItem('theme') === 'dark') {
  html.setAttribute('data-theme', 'dark');
}

// ── Core toggle function ─────────────────────────────────────
function toggleTheme() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next   = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

desktopToggle.addEventListener('click', toggleTheme);
mobileToggle.addEventListener('click',  toggleTheme);

// ── Show/hide the mobile toggle based on viewport width ──────
// The desktop toggle is hidden via CSS (.nav-links display:none),
// so we need a JS toggle to surface it next to the hamburger.
function syncMobileToggleVisibility() {
  const isMobile = window.innerWidth <= 768;
  mobileToggle.style.display = isMobile ? 'block' : 'none';
}

syncMobileToggleVisibility();
window.addEventListener('resize', syncMobileToggleVisibility);
