module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        // Base pages (same as lighthouserc.cjs)
        '/',
        '/about/',
        '/blog/',
        '/es/',
        // Blog listing ES (i18n parity)
        '/es/blog/',
        // Timeline pages (infinite scroll + Svelte islands)
        '/portfolio/',
        '/trading/',
        '/entrepreneur/',
        // Series pages
        '/blog/series/',
        '/blog/series/building-xergioalex/',
        // Blog post (individual article with reading progress)
        '/blog/why-i-ditched-eslint-prettier-for-biome/',
        // Tag filtered listing
        '/blog/tag/tech/',
        // Form page
        '/contact/',
        // CV page
        '/cv/',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
