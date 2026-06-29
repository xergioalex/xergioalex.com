import EventEmitter from 'node:events';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

EventEmitter.defaultMaxListeners = 20;
import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
// @ts-check
import { defineConfig } from 'astro/config';

import excludeInternal from './src/integrations/exclude-internal';
import {
  satteriExternalLinks,
  satteriTableResponsive,
} from './src/lib/satteri-plugins';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: 'https://xergioalex.com',
  build: {
    inlineStylesheets: 'always',
  },
  // Astro 7 ships Sätteri (the Rust Markdown/MDX compiler) as the default and
  // only compiler. It does not run remark/rehype plugins, so our former
  // rehype plugins are ported to Sätteri HAST plugins. `@astrojs/mdx` inherits
  // this processor automatically, so `.md` and `.mdx` share the same pipeline.
  markdown: {
    processor: satteri({
      hastPlugins: [satteriExternalLinks(), satteriTableResponsive()],
    }),
  },
  integrations: [
    mdx(),
    sitemap({
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('/internal/') && !page.endsWith('/internal'),
    }),
    svelte(),
    excludeInternal(),
  ],
  server: {
    host: true,
    port: 4444,
  },
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
            (warning.exporter?.includes('svelte/') || warning.exporter?.includes('@astrojs/internal-helpers'))) {
            return;
          }
          defaultHandler(warning);
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/svelte/')) {
              return 'svelte';
            }
          },
        },
      },
    },
    plugins: [tailwindcss()],
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
      port: 4444,
      watch: {
        ignored: ['**/.lighthouseci/**'],
      },
    },
  },
});
