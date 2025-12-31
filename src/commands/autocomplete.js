import { COMMANDS, splitArgs } from './handlers.js';
import { fileSystem, projects } from '../config/resume.js';
import { listThemes } from '../utils/themes.js';

export function getCompletions(partialLine) {
  const parts = splitArgs(partialLine);
  
  if (parts.length === 0) {
    return COMMANDS.slice();
  }
  
  if (partialLine.endsWith(' ')) {
    return [];
  }
  
  const last = parts.pop();
  const first = parts[0] ?? '';

  if (parts.length === 0) {
    return COMMANDS.filter(c => c.startsWith(last));
  }

  // Autocomplete for cat command
  if (first === 'cat') {
    return Object.keys(fileSystem).filter(f => f.startsWith(last));
  }

  // Autocomplete for projects command
  if (first === 'projects') {
    return Object.keys(projects).filter(p => p.startsWith(last));
  }

  // Autocomplete for theme command
  if (first === 'theme') {
    const themes = listThemes().map(t => t.key);
    return ['list', ...themes].filter(t => t.startsWith(last));
  }

  // Autocomplete for download command
  if (first === 'download') {
    return ['pdf', 'txt'].filter(f => f.startsWith(last));
  }

  return [];
}

export function applyCompletion(currentLine) {
  const parts = splitArgs(currentLine);
  const comps = getCompletions(currentLine);
  
  if (!comps || comps.length === 0) return null;
  
  if (comps.length === 1) {
    const tokens = currentLine.match(/(?:[^\s"]+|"[^"]*"|'[^']*')+/g) || [];
    const prefix = tokens.slice(0, -1).join(' ');
    return (prefix ? prefix + ' ' : '') + comps[0];
  }
  
  return comps;
}
