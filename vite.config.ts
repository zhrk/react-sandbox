/* eslint-disable import/no-extraneous-dependencies */

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  build: { outDir: 'build' },
  server: { open: true, port: 3000, host: true },
  css: { devSourcemap: true, postcss: { plugins: [autoprefixer()] } },
  plugins: [
    react(),
    checker({ typescript: true, overlay: { panelStyle: 'max-height: none; height: 100%;' } }),
    svgrPlugin({ svgrOptions: { ref: true } }),
  ],
});
