/* ============================================================
   ama.js — Ask Me Anything modal + Q&A feed
   ============================================================

   HOW IT WORKS
   ─────────────
   openAMA()   — shows the modal (called by buttons in the HTML)
   closeAMA()  — hides the modal and resets form fields
   sendAMA()   — POSTs the question to the backend API
   loadQA()    — GETs answered questions and renders them
   renderQA()  — builds the HTML cards from the API data

   TO CONNECT YOUR BACKEND
   ────────────────────────
   Replace the BACKEND_URL value below with your Render (or any
   other host) deployment URL, e.g.:
     const BACKEND_URL = 'https://tora-ama.onrender.com';
   ============================================================ */


// ── Config ───────────────────────────────────────────────────

// ⚠️  Replace this with your real backend URL before deploying
const BACKEND_URL = 'https://YOUR-RENDER-APP.onrender.com';


// ── Modal: open ──────────────────────────────────────────────

function openAMA() {
  const modal   = document.getElementById('amaModal');
  const sendBtn = document.getElementById('sendBtn');
  const errEl   = document.getElementById('amaError');
  const okEl    = document.getElementById('amaSuccess');

  modal.classList.add('active');

  // Reset state from any previous submission attempt
  errEl.style.display   = 'none';
  okEl.style.display    = 'none';
  sendBtn.disabled      = false;
  sendBtn.textContent   = 'Send question →';

  // Small delay so the animation plays before focus moves
  setTimeout(() => document.getElementById('amaName').focus(), 100);
}


// ── Modal: close ─────────────────────────────────────────────

function closeAMA() {
  document.getElementById('amaModal').classList.remove('active');
  document.getElementById('amaText').value  = '';
  document.getElementById('amaName').value  = '';
  document.getElementById('charCount').textContent = '0';
}


// ── Modal: send question to backend ──────────────────────────

async function sendAMA() {
  const question = document.getElementById('amaText').value.trim();
  const askedBy  = document.getElementById('amaName').value.trim();
  const errEl    = document.getElementById('amaError');
  const okEl     = document.getElementById('amaSuccess');
  const btn      = document.getElementById('sendBtn');

  // Clear previous error
  errEl.style.display = 'none';

  // Basic validation
  if (!question || question.length < 3) {
    errEl.textContent   = 'Please write a question (at least 3 characters).';
    errEl.style.display = 'block';
    return;
  }

  // Disable button while request is in-flight
  btn.disabled    = true;
  btn.textContent = 'Sending...';

  try {
    const res = await fetch(`${BACKEND_URL}/api/questions`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ question, askedBy }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to send');

    // Success — show confirmation, then close modal
    okEl.style.display  = 'block';
    btn.textContent     = 'Sent! ✓';
    setTimeout(() => closeAMA(), 1800);

  } catch (err) {
    // Show the error message in the modal
    errEl.textContent   = err.message || 'Something went wrong, try again.';
    errEl.style.display = 'block';
    btn.disabled        = false;
    btn.textContent     = 'Send question →';
  }
}


// ── Character counter ─────────────────────────────────────────

document.getElementById('amaText').addEventListener('input', function () {
  document.getElementById('charCount').textContent = this.value.length;
});


// ── Keyboard shortcuts ────────────────────────────────────────

// Ctrl/Cmd + Enter submits from the textarea
document.getElementById('amaText').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) sendAMA();
});

// Escape closes the modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAMA();
});

// Click outside the modal card to close
document.getElementById('amaModal').addEventListener('click', function (e) {
  if (e.target === this) closeAMA();
});


// ── Q&A feed: load from backend ──────────────────────────────

async function loadQA() {
  try {
    const res  = await fetch(`${BACKEND_URL}/api/questions`);
    const data = await res.json();
    renderQA(data);
  } catch {
    // Backend not connected yet — the skeleton placeholders stay visible
  }
}


// ── Q&A feed: render answered questions ──────────────────────

function renderQA(questions) {
  const grid = document.getElementById('qaGrid');

  if (!questions || questions.length === 0) {
    grid.innerHTML = `
      <div class="qa-empty">
        No questions answered yet — be the first to ask!
      </div>
    `;
    return;
  }

  grid.innerHTML = questions.map((q) => `
    <div class="qa-card">
      <div class="qa-asker">
        Asked by <strong>${escapeHtml(q.askedBy || 'Anonymous')}</strong>
      </div>
      <div class="qa-question">${escapeHtml(q.question)}</div>
      <div class="qa-divider"></div>
      <div>
        <div class="qa-answer-label">Tora's answer</div>
        <div class="qa-answer">${escapeHtml(q.answer)}</div>
      </div>
      <div class="qa-date">${formatDate(q.answeredAt)}</div>
    </div>
  `).join('');
}


// ── Helpers ───────────────────────────────────────────────────

// Prevent XSS when inserting user-submitted text into the DOM
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;');
}

// "14 May 2026"
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  });
}


// ── Kick off ──────────────────────────────────────────────────
loadQA();
