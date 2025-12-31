import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export function createTerminal(container) {
  const term = new Terminal({
    convertEol: true,
    allowProposedApi: true,
    cursorBlink: true,
    cursorStyle: 'block',
    fontFamily: "'Courier New', monospace, ui-monospace",
    theme: {
      background: '#120a1f',
      foreground: '#d8b4fe',
      cursor: '#f5e0dc',
    }
  });

  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(container);
  fitAddon.fit();

  window.addEventListener('resize', () => fitAddon.fit());

  return { term, fitAddon };
}

export function setupTerminalUtils(term) {
  return {
    term, // Expose terminal for theme changes
    prompt: (cwd) => term.write('\r\n' + cwd + '$ '),
    writeln: (text = '') => term.writeln(text),
    write: (text = '') => term.write(text),
    clearScreen: () => term.reset(),
    resetInputDisplay: (cwd, inputBuffer) => {
      term.write('\x1b[2K\r');
      term.write(cwd + '$ ' + inputBuffer);
    }
  };
}
