import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://site.xergioalex.com',
  integrations: [mdx(), sitemap(), svelte()],
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
