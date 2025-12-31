export const themes = {
  crt: {
    name: 'CRT (Default)',
    background: '#120a1f',
    foreground: '#d8b4fe',
    cursor: '#f5e0dc',
    selection: '#6b4d9e',
    cursorAccent: '#d8b4fe',
    bodyBg: '#0c0615',
    appBg: '#1e1e2e',
    effects: {
      scanlines: true,
      glow: true,
      vignette: true
    }
  },
  
  matrix: {
    name: 'Matrix',
    background: '#000000',
    foreground: '#00ff00',
    cursor: '#00ff00',
    selection: '#003300',
    cursorAccent: '#00ff00',
    bodyBg: '#000000',
    appBg: '#0a0a0a',
    effects: {
      scanlines: false,
      glow: true,
      vignette: false
    }
  },
  
  hacker: {
    name: 'Hacker',
    background: '#0d1117',
    foreground: '#00ff41',
    cursor: '#ff0000',
    selection: '#1f2937',
    cursorAccent: '#00ff41',
    bodyBg: '#000000',
    appBg: '#0d1117',
    effects: {
      scanlines: true,
      glow: true,
      vignette: true
    }
  },
  
  light: {
    name: 'Light',
    background: '#ffffff',
    foreground: '#1a1a1a',
    cursor: '#007acc',
    selection: '#add6ff',
    cursorAccent: '#1a1a1a',
    bodyBg: '#f5f5f5',
    appBg: '#fafafa',
    effects: {
      scanlines: false,
      glow: false,
      vignette: false
    }
  },
  
  dracula: {
    name: 'Dracula',
    background: '#282a36',
    foreground: '#f8f8f2',
    cursor: '#ff79c6',
    selection: '#44475a',
    cursorAccent: '#f8f8f2',
    bodyBg: '#1e1f29',
    appBg: '#282a36',
    effects: {
      scanlines: false,
      glow: true,
      vignette: false
    }
  },
  
  nord: {
    name: 'Nord',
    background: '#2e3440',
    foreground: '#d8dee9',
    cursor: '#88c0d0',
    selection: '#434c5e',
    cursorAccent: '#d8dee9',
    bodyBg: '#242933',
    appBg: '#2e3440',
    effects: {
      scanlines: false,
      glow: false,
      vignette: false
    }
  }
};

export function applyTheme(terminal, themeName) {
  const theme = themes[themeName] || themes.crt;
  
  // Apply terminal theme
  terminal.options.theme = {
    background: theme.background,
    foreground: theme.foreground,
    cursor: theme.cursor,
    selection: theme.selection,
    cursorAccent: theme.cursorAccent
  };
  
  // Apply body and app background
  document.body.style.background = theme.bodyBg;
  const app = document.getElementById('app');
  if (app) {
    app.style.background = theme.appBg;
  }
  
  // Apply visual effects
  const container = document.getElementById('app');
  if (container) {
    container.classList.remove('crt-effects', 'glow-effects', 'vignette-effects');
    
    if (theme.effects.scanlines) {
      container.classList.add('crt-effects');
    }
    if (theme.effects.glow) {
      container.classList.add('glow-effects');
    }
    if (theme.effects.vignette) {
      container.classList.add('vignette-effects');
    }
  }
  
  return theme.name;
}

export function listThemes() {
  return Object.entries(themes).map(([key, theme]) => ({
    key,
    name: theme.name
  }));
}
