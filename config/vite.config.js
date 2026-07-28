import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// rutas base
const srcDir = fileURLToPath(new URL('../src', import.meta.url));

export default defineConfig({
  root: srcDir,

  // servidor de desarrollo
  server: {
    port: 5173,
  },

  // build
  build: {
    outDir: '../dist-vite',
  },
});
