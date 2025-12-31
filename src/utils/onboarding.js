import { storage, STORAGE_KEYS } from "./storage.js";

export function isFirstVisit() {
  return !storage.get(STORAGE_KEYS.VISITED, false);
}

export function markAsVisited() {
  storage.set(STORAGE_KEYS.VISITED, true);
}

export function getWelcomeMessage() {
  return [
    "",
    "Welcome! This is an interactive terminal resume.",
    "",
    "Quick start:",
    '   - Type "help" to see all available commands',
    '   - Try "about", "skills", or "projects" to learn more',
    "   - Use Tab for autocomplete, arrow keys for history",
    '   - Type "theme" to change the visual style',
    "",
    "Pro tips:",
    '   - Try "neofetch" for a nerdy system info display',
    '   - Download my resume with "download pdf"',
    "   - There are hidden easter eggs...",
    "",
    "Mobile users: Tap the screen to show keyboard",
    "",
  ];
}

export function getRandomTip() {
  const tips = [
    "Tip: Use Tab to autocomplete commands and filenames",
    "Tip: Press up/down arrows to navigate command history",
    'Tip: Type "theme list" to see all available themes',
    'Tip: Try "fortune" for random developer wisdom',
    'Tip: Use "download pdf" to get my resume offline',
    'Tip: "cat readme.md" has useful information',
    "Tip: There are easter eggs hidden in commands...",
    'Tip: Type "history" to see your command history',
    "Tip: Use Ctrl+C to cancel current input",
    "Tip: Use arrow keys to move cursor left/right",
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

export function shouldShowTip(commandCount) {
  // Show tip every 5 commands after the first 3
  return commandCount > 3 && commandCount % 5 === 0;
}
