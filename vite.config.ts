import { defineConfig } from 'vite';
import { resolve, join, relative } from 'path';
import { readdirSync } from 'fs';

function getHtmlEntries() {
  const entries: Record<string, string> = {
    home: resolve(__dirname, 'index.html')
  };
  const pagesRoot = join(__dirname, 'pages');

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name === 'index.html') {
        const segments = relative(pagesRoot, fullPath).split('/');
        const key = segments[segments.length - 2];
        entries[key] = fullPath;
      }
    }
  }

  walk(pagesRoot);
  return entries;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: getHtmlEntries()
    }
  }
});
