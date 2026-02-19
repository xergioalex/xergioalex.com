import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
// @ts-check
import { defineConfig } from 'astro/config';

import excludeInternal from './src/integrations/exclude-internal';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://www.xergioalex.com',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/internal/') && !page.endsWith('/internal'),
    }),
    svelte(),
    excludeInternal(),
  ],
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      // Enable preview features (draft/scheduled/demo badges, "Show all posts") on Cloudflare Pages
      // preview branches. Production branch (main) does NOT get these features.
      'import.meta.env.PREVIEW_FEATURES': JSON.stringify(
        process.env.CF_PAGES_BRANCH
          ? !['main', 'master', 'production'].includes(process.env.CF_PAGES_BRANCH)
          : false
      ),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      force: false,
      holdUntilCrawlEnd: false,
    },
    server: {
      hmr: {
        overlay: true,
      },
    },
  },
});
