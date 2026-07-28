import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// rutas base
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// modo
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default {
  mode,

  // entrada
  entry: path.resolve(__dirname, '../src/main.js'),

  // salida
  output: {
    path: path.resolve(__dirname, '../dist-webpack'),
    filename: '[name].[contenthash].js',
    clean: true,
  },

  // servidor de desarrollo
  devServer: {
    hot: true,
    static: path.resolve(__dirname, '../src'),
    port: 5000,
  },

  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ],
};
