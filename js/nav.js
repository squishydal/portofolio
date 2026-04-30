/* ============================================================
   nav.js — hamburger / mobile menu
   Toggles the .open class on both the button and the menu div.
   Closes the menu when the user taps outside it.
   ============================================================ */

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// ── Open / close on hamburger click ─────────────────────────
hamburger.addEventListener('click', (e) => {
  // Stop the event reaching the document listener below
  e.stopPropagation();

  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
});

// ── Close when tapping anywhere outside the menu ────────────
document.addEventListener('click', (e) => {
  const clickedOutside =
    !hamburger.contains(e.target) &&
    !mobileMenu.contains(e.target);

  if (clickedOutside) {
    closeMobileMenu();
  }
});

// ── Exported helper — called by inline onclick links ────────
// e.g. <a href="#about" onclick="closeMobileMenu()">About</a>
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
}
