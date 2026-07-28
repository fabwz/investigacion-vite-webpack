// config/webpack.config.js
//
// Configuracion de Webpack para la demo comparativa ISW-521.
// El objetivo de este archivo es exponer, de forma explicita, todo lo que
// Webpack necesita que le digamos a mano y que Vite resuelve por convencion
// (entry, output, servidor de dev, e incluso el manejo del HTML). Cada
// bloque comentado corresponde a una responsabilidad que se contrastara
// linea por linea contra config/vite.config.js en la presentacion.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Como el proyecto usa ESM ("type": "module" en package.json), no existen
// las variables globales __filename/__dirname de CommonJS. Hay que
// reconstruirlas a partir de import.meta.url para poder armar rutas
// absolutas mas abajo (Webpack los exige, a diferencia de Vite que resuelve
// rutas relativas al archivo de config automaticamente).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Webpack no sabe nada del entorno donde corre (dev vs prod) a menos que se
// lo indiquemos explicitamente. Vite, en cambio, ya trae ese concepto
// integrado (vite vs vite build). Permitimos configurarlo por variable de
// entorno para poder alternar "development"/"production" sin tocar este
// archivo, y usamos 'development' como valor por defecto para la demo.
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default {
  mode,

  // Punto de entrada de la aplicacion: el archivo desde el que Webpack
  // empieza a construir el grafo de dependencias. Vite no necesita esto
  // declarado aqui porque lo infiere de index.html; Webpack si lo exige de
  // forma explicita.
  entry: path.resolve(__dirname, '../src/main.js'),

  output: {
    // Carpeta de salida del build de produccion. Se usa un nombre distinto
    // ("dist-webpack") para no pisar el build de Vite ("dist") cuando se
    // corren ambas herramientas sobre el mismo repo durante la demo.
    path: path.resolve(__dirname, '../dist-webpack'),

    // contenthash cambia cada vez que cambia el contenido del bundle, lo
    // que permite cachear el archivo en el navegador de forma agresiva sin
    // riesgo de servir una version vieja tras un deploy (cache busting).
    filename: '[name].[contenthash].js',

    // Limpia la carpeta de salida antes de cada build para evitar que se
    // acumulen bundles viejos con hashes distintos.
    clean: true,
  },

  // Configuracion del servidor de desarrollo. Webpack necesita este bloque
  // completo a mano; Vite trae un servidor de dev listo para usar sin
  // configuracion adicional.
  devServer: {
    // Habilita Hot Module Replacement para que los cambios se apliquen sin
    // recargar la pagina completa (equivalente a lo que Vite hace por
    // defecto).
    hot: true,

    // Webpack no sirve HTML de forma nativa: necesita que le digamos desde
    // donde servir archivos estaticos (aqui, la carpeta src, donde vive
    // index.html y cualquier otro asset publico).
    static: path.resolve(__dirname, '../src'),

    // Puerto fijo y distinto al de Vite (5173 por defecto) para poder
    // levantar ambos servidores al mismo tiempo durante la comparacion en
    // vivo.
    port: 5000,
  },

  // Webpack no entiende HTML por si solo: solo sabe procesar JS (y lo que
  // los loaders le agreguen). HtmlWebpackPlugin es el que genera/inyecta el
  // <script> del bundle dentro de una copia de src/index.html, tanto en dev
  // como en el build final. Vite sirve index.html de forma nativa sin
  // necesidad de este plugin.
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ],
};
