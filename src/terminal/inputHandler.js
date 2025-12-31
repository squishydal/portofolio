import { runCommand } from "../commands/handlers.js";
import { applyCompletion } from "../commands/autocomplete.js";
import { storage, STORAGE_KEYS } from "../utils/storage.js";

export function setupInputHandler(term, utils, state) {
  const { writeln, prompt, resetInputDisplay } = utils;

  function acceptInput() {
    const line = state.inputBuffer;
    if (line.trim()) {
      state.history.push(line);
      // Persist history
      storage.set(STORAGE_KEYS.HISTORY, state.history.slice(-100)); // Keep last 100
    }
    state.historyPos = -1;
    state.inputBuffer = "";
    state.cursorPos = 0;
    runCommand(line, utils, state);
    prompt(state.cwd);
  }

  // Mobile support - tap to focus
  const container = document.getElementById("terminal");
  if (container) {
    container.addEventListener("click", () => {
      term.focus();
    });

    container.addEventListener("touchstart", () => {
      term.focus();
    });
  }

  term.onKey((e) => {
    const ev = e.domEvent;
    const key = e.key;

    if (ev.key === "Enter") {
      acceptInput();
      return;
    }

    if (ev.key === "Backspace") {
      if (state.cursorPos > 0) {
        state.inputBuffer =
          state.inputBuffer.slice(0, state.cursorPos - 1) +
          state.inputBuffer.slice(state.cursorPos);
        state.cursorPos--;
        resetInputDisplay(state.cwd, state.inputBuffer);
        // Move cursor to correct position
        const moveCursorBack = state.inputBuffer.length - state.cursorPos;
        for (let i = 0; i < moveCursorBack; i++) {
          term.write("\x1b[D"); // Move cursor left
        }
      }
      return;
    }

    if (ev.key === "Tab") {
      ev.preventDefault();
      const result = applyCompletion(state.inputBuffer);
      if (!result) return;
      if (Array.isArray(result)) {
        writeln("");
        result.forEach((r) => writeln(r));
        resetInputDisplay(state.cwd, state.inputBuffer);
        // Move cursor to correct position
        const moveCursorBack = state.inputBuffer.length - state.cursorPos;
        for (let i = 0; i < moveCursorBack; i++) {
          term.write("\x1b[D");
        }
      } else {
        state.inputBuffer = result;
        state.cursorPos = result.length;
        resetInputDisplay(state.cwd, state.inputBuffer);
      }
      return;
    }

    // Arrow Left - Move cursor left
    if (ev.key === "ArrowLeft") {
      ev.preventDefault();
      if (state.cursorPos > 0) {
        state.cursorPos--;
        term.write("\x1b[D"); // Move cursor left
      }
      return;
    }

    // Arrow Right - Move cursor right
    if (ev.key === "ArrowRight") {
      ev.preventDefault();
      if (state.cursorPos < state.inputBuffer.length) {
        state.cursorPos++;
        term.write("\x1b[C"); // Move cursor right
      }
      return;
    }

    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      if (state.history.length === 0) return;
      if (state.historyPos === -1) state.historyPos = state.history.length - 1;
      else state.historyPos = Math.max(0, state.historyPos - 1);
      state.inputBuffer = state.history[state.historyPos];
      state.cursorPos = state.inputBuffer.length;
      resetInputDisplay(state.cwd, state.inputBuffer);
      return;
    }

    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      if (state.history.length === 0) return;
      if (state.historyPos === -1) return;
      state.historyPos = Math.min(
        state.history.length - 1,
        state.historyPos + 1,
      );
      if (state.historyPos === state.history.length - 1) {
        state.inputBuffer = state.history[state.historyPos];
      } else if (state.historyPos >= 0) {
        state.inputBuffer = state.history[state.historyPos];
      } else {
        state.inputBuffer = "";
      }
      state.cursorPos = state.inputBuffer.length;
      resetInputDisplay(state.cwd, state.inputBuffer);
      return;
    }

    if (ev.ctrlKey && ev.key === "c") {
      state.inputBuffer = "";
      state.cursorPos = 0;
      writeln("^C");
      prompt(state.cwd);
      return;
    }

    // Ctrl+L to clear (alternative to clear command)
    if (ev.ctrlKey && ev.key === "l") {
      ev.preventDefault();
      utils.clearScreen();
      prompt(state.cwd);
      return;
    }

    // Ctrl+A - Move to beginning of line
    if (ev.ctrlKey && ev.key === "a") {
      ev.preventDefault();
      const moveBack = state.cursorPos;
      for (let i = 0; i < moveBack; i++) {
        term.write("\x1b[D");
      }
      state.cursorPos = 0;
      return;
    }

    // Ctrl+E - Move to end of line
    if (ev.ctrlKey && ev.key === "e") {
      ev.preventDefault();
      const moveForward = state.inputBuffer.length - state.cursorPos;
      for (let i = 0; i < moveForward; i++) {
        term.write("\x1b[C");
      }
      state.cursorPos = state.inputBuffer.length;
      return;
    }

    // Delete key
    if (ev.key === "Delete") {
      if (state.cursorPos < state.inputBuffer.length) {
        state.inputBuffer =
          state.inputBuffer.slice(0, state.cursorPos) +
          state.inputBuffer.slice(state.cursorPos + 1);
        resetInputDisplay(state.cwd, state.inputBuffer);
        // Move cursor to correct position
        const moveCursorBack = state.inputBuffer.length - state.cursorPos;
        for (let i = 0; i < moveCursorBack; i++) {
          term.write("\x1b[D");
        }
      }
      return;
    }

    // Home key
    if (ev.key === "Home") {
      ev.preventDefault();
      const moveBack = state.cursorPos;
      for (let i = 0; i < moveBack; i++) {
        term.write("\x1b[D");
      }
      state.cursorPos = 0;
      return;
    }

    // End key
    if (ev.key === "End") {
      ev.preventDefault();
      const moveForward = state.inputBuffer.length - state.cursorPos;
      for (let i = 0; i < moveForward; i++) {
        term.write("\x1b[C");
      }
      state.cursorPos = state.inputBuffer.length;
      return;
    }

    // Printable characters
    if (!ev.ctrlKey && !ev.metaKey && !ev.altKey && key.length === 1) {
      // Insert character at cursor position
      state.inputBuffer =
        state.inputBuffer.slice(0, state.cursorPos) +
        key +
        state.inputBuffer.slice(state.cursorPos);
      state.cursorPos++;

      // Redraw from cursor position
      const restOfLine = state.inputBuffer.slice(state.cursorPos - 1);
      term.write(restOfLine);

      // Move cursor back to correct position
      const moveBack = restOfLine.length - 1;
      for (let i = 0; i < moveBack; i++) {
        term.write("\x1b[D");
      }
    }
  });
}
