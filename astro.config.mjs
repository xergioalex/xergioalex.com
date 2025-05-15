import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.xergioalex.com',
  base: '/',
  trailingSlash: 'never',
    integrations: [
      tailwind(),
      svelte({
        experimental: {
          prebundleSvelteLibraries: true
        }
      })
    ],

  server: {
    host: true,
  },

  build: {
    assets: 'assets',
    assetsPrefix: '/',
  },

  // Configuración para manejar archivos estáticos
  vite: {
    publicDir: 'public',
    build: {
      assetsDir: 'assets'
    },
    optimizeDeps: {
      exclude: ['@astrojs/svelte']
    }
  }
});