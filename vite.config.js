import { defineConfig } from 'vite';

export default defineConfig({
  base: '/terminal-resume/', // Change this to your repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
