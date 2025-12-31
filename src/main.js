import { createTerminal, setupTerminalUtils } from "./terminal/setup.js";
import { setupInputHandler } from "./terminal/inputHandler.js";
import { asciiArt } from "./config/resume.js";
import { storage, STORAGE_KEYS } from "./utils/storage.js";
import { applyTheme } from "./utils/themes.js";
import {
  isFirstVisit,
  markAsVisited,
  getWelcomeMessage,
} from "./utils/onboarding.js";
import "./style.css";

async function typeText(term, text, delay = 20) {
  for (const char of text) {
    term.write(char);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

async function init() {
  const container = document.getElementById("terminal");
  const { term } = createTerminal(container);
  const utils = setupTerminalUtils(term);

  // Load saved theme
  const savedTheme = storage.get(STORAGE_KEYS.THEME, "crt");
  applyTheme(term, savedTheme);

  // Load command history
  const savedHistory = storage.get(STORAGE_KEYS.HISTORY, []);

  const state = {
    cwd: "~",
    inputBuffer: "",
    cursorPos: 0,
    history: savedHistory,
    historyPos: -1,
    startTime: Math.floor(Date.now() / 1000),
  };

  setupInputHandler(term, utils, state);

  // Display banner with typing animation
  const firstVisit = isFirstVisit();

  if (firstVisit) {
    // Slower typing for first-time visitors
    for (const line of asciiArt.split("\n")) {
      await typeText(term, line + "\r\n", 15);
    }
    utils.writeln("");

    // Display welcome message
    const welcomeLines = getWelcomeMessage();
    for (const line of welcomeLines) {
      utils.writeln(line);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    markAsVisited();
  } else {
    // Fast display for returning visitors
    asciiArt.split("\n").forEach((l) => utils.writeln(l));
    utils.writeln("");
    utils.writeln("Welcome back!");
    utils.writeln("");
    utils.writeln('Type "help" to see available commands.');

    // Show a random tip
    const tips = [
      'Try "neofetch" for a cool system display',
      'Download my resume with "download pdf"',
      'Change themes with "theme matrix"',
      'Check out my projects with "projects"',
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    utils.writeln("Tip: " + randomTip);
  }

  utils.prompt(state.cwd);
  term.focus();

  // Add announcement for screen readers
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", "polite");
  announcement.className = "sr-only";
  announcement.textContent =
    "Terminal resume loaded. Type help for available commands.";
  document.body.appendChild(announcement);
}

// Add loading state
const style = document.createElement("style");
style.textContent = `
  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #d8b4fe;
    font-family: monospace;
    font-size: 18px;
    z-index: 1000;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }
`;
document.head.appendChild(style);

// Show loading message
const loading = document.createElement("div");
loading.className = "loading";
loading.textContent = "Initializing terminal...";
document.body.appendChild(loading);

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loading.remove();
    init();
  });
} else {
  loading.remove();
  init();
}

// Service worker for offline support (optional enhancement)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Silently fail if SW not available
    });
  });
}
