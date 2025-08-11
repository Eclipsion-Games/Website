import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        team: resolve(__dirname, 'pages/team/index.html'),
        lore: resolve(__dirname, 'pages/lore-and-fate/index.html'),
        toolkit: resolve(__dirname, 'pages/toolkit/index.html'),
        merch: resolve(__dirname, 'pages/merch/index.html'),
        contact: resolve(__dirname, 'pages/contact/index.html'),
        imprint: resolve(__dirname, 'pages/legal/imprint/index.html'),
        impressum: resolve(__dirname, 'pages/legal/impressum/index.html'),
        privacy: resolve(__dirname, 'pages/legal/privacy-policy/index.html'),
        cookies: resolve(__dirname, 'pages/legal/cookie-settings/index.html')
      }
    }
  }
});
