// LocalStorage utilities for persistence

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Storage clear error:', e);
      return false;
    }
  }
};

// Specific storage keys
export const STORAGE_KEYS = {
  HISTORY: 'terminal_history',
  THEME: 'terminal_theme',
  VISITED: 'terminal_visited',
  STATS: 'terminal_stats'
};

// Track user statistics
export function trackCommand(command) {
  const stats = storage.get(STORAGE_KEYS.STATS, {});
  stats[command] = (stats[command] || 0) + 1;
  storage.set(STORAGE_KEYS.STATS, stats);
}

export function getStats() {
  return storage.get(STORAGE_KEYS.STATS, {});
}
