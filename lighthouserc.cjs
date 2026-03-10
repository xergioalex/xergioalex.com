module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['/', '/about/', '/blog/', '/es/'],
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
      assertMatrix: [
        {
          matchingUrlPattern: '.*/blog/$',
          assertions: {
            'categories:performance': ['error', { minScore: 0.8 }],
          },
        },
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
