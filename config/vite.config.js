// config/vite.config.js
//
// Configuracion de Vite para la demo comparativa ISW-521. El contraste
// deliberado con config/webpack.config.js es el punto central de la
// demo: Vite resuelve por convencion (servidor de dev, manejo nativo de
// HTML, HMR) casi todo lo que en Webpack hubo que declarar a mano, asi
// que este archivo es una fraccion del tamaño del otro.

import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// "root" se resuelve relativo al directorio de trabajo del proceso, no
// relativo a este archivo, asi que una ruta relativa simple ("../src") se
// rompe si el comando "vite" se invoca desde otro lugar. Se reconstruye la
// ruta absoluta a partir de import.meta.url, igual que en
// config/webpack.config.js con __dirname, para que el build funcione sin
// importar desde donde se ejecute npm.
const srcDir = fileURLToPath(new URL('../src', import.meta.url));

export default defineConfig({
  // index.html y main.js viven en src/, no en la raiz del repo, asi que le
  // decimos a Vite que use esa carpeta como raiz del proyecto. A partir de
  // aqui Vite ya sabe servir el HTML y resolver "/main.js" sin necesidad de
  // un plugin (a diferencia de HtmlWebpackPlugin en Webpack).
  root: srcDir,

  server: {
    // Puerto por defecto de Vite. Se deja explicito (en vez de omitirlo)
    // para que en la demo quede claro, al leer ambos archivos, que 5173 y
    // 5000 son puertos distintos y ambos servidores pueden correr a la vez.
    port: 5173,
  },

  build: {
    // outDir se resuelve relativo a "root" (src). Un solo "../" alcanza
    // para volver a la raiz del repo, quedando "dist-vite" como hermano de
    // "dist-webpack" (que Webpack ubica en la raiz del repo desde su
    // propia config). Ver nota en la respuesta sobre por qué no es
    // "../../dist-vite".
    outDir: '../dist-vite',
  },
});
