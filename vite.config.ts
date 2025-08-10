import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        team: resolve(__dirname, 'team/index.html'),
        lore: resolve(__dirname, 'lore-and-fate/index.html'),
        toolkit: resolve(__dirname, 'toolkit/index.html'),
        merch: resolve(__dirname, 'merch/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        imprint: resolve(__dirname, 'legal/imprint/index.html'),
        impressum: resolve(__dirname, 'legal/impressum/index.html'),
        privacy: resolve(__dirname, 'legal/privacy-policy/index.html'),
        cookies: resolve(__dirname, 'legal/cookie-settings/index.html')
      }
    }
  }
});
