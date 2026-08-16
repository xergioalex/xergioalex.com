import { describe, expect, it } from 'vitest';

import {
  buildMarkdownAccessLine,
  serializeBlogIndexToMarkdown,
  serializePageToAgentMarkdown,
  serializePostToAgentMarkdown,
  serializeSeriesIndexToMarkdown,
  serializeSeriesListingToMarkdown,
  serializeSlideDeckToMarkdown,
  serializeSlidesIndexToMarkdown,
} from '@/lib/markdown-for-agents';

/** The one canonical EN access line — pinned so it can never drift. */
const EN_ACCESS_LINE =
  'Markdown: send header `Accept: text/markdown` on any URL to receive Markdown instead of HTML.';
const ES_ACCESS_LINE =
  'Markdown: envía el header `Accept: text/markdown` en cualquier URL para recibir Markdown en lugar de HTML.';

// ─── Mock Data ─────────────────────────────────────────

const mockPost = {
  id: 'en/2024-03-15_my-awesome-post',
  data: {
    title: 'My Awesome Post',
    description: 'A test post about Astro and Markdown.',
    pubDate: new Date('2024-03-15'),
    updatedDate: new Date('2024-04-01'),
    tags: ['tech', 'astro'],
  },
  body: '## Introduction\n\nThis is a test post.\n\n```js\nconsole.log("hello");\n```\n',
};

const mockPostNoOptionals = {
  id: 'en/2024-05-01_minimal-post',
  data: {
    title: 'Minimal Post',
    description: 'A post with no optional fields.',
    pubDate: new Date('2024-05-01'),
  },
  body: 'Just some text.',
};

const mockPostEmptyBody = {
  id: 'es/2024-06-01_empty-body',
  data: {
    title: 'Empty Body Post',
    description: 'This post has no body content.',
    pubDate: new Date('2024-06-01'),
    tags: ['personal'],
  },
  body: undefined,
};

const mockPage = {
  id: 'en/about',
  data: {
    title: 'About Me — XergioAleX',
    description: 'Technology Enthusiast and Lifelong Learner.',
    lastUpdated: new Date('2026-03-09'),
  },
  body: '## Who I Am\n\nI am Sergio Florez, a software engineer.',
};

const mockPageNoLastUpdated = {
  id: 'es/contact',
  data: {
    title: 'Contacto — XergioAleX',
    description: 'Conectemos y construyamos algo juntos.',
  },
  body: '## Ponte en Contacto\n\nSiempre abierto a conversaciones.',
};

// ─── serializePostToAgentMarkdown ──────────────────────

describe('serializePostToAgentMarkdown', () => {
  it('should produce correct output with all fields', () => {
    const result = serializePostToAgentMarkdown(mockPost as any, {
      slug: 'my-awesome-post',
      lang: 'en',
    });

    expect(result).toContain('# My Awesome Post');
    expect(result).toContain('> A test post about Astro and Markdown.');
    expect(result).toContain('Published: 2024-03-15');
    expect(result).toContain('Updated: 2024-04-01');
    expect(result).toContain('Language: en');
    expect(result).toContain(
      'Canonical: https://xergioalex.com/blog/my-awesome-post'
    );
    expect(result).toContain('Tags: tech, astro');
    expect(result).toContain('---');
    expect(result).toContain('## Introduction');
    expect(result).toContain('```js');
    expect(result).toContain('console.log("hello");');
  });

  it('should format date as YYYY-MM-DD', () => {
    const result = serializePostToAgentMarkdown(mockPost as any, {
      slug: 'my-awesome-post',
      lang: 'en',
    });

    expect(result).toMatch(/Published: \d{4}-\d{2}-\d{2}/);
    expect(result).toMatch(/Updated: \d{4}-\d{2}-\d{2}/);
  });

  it('should omit updatedDate and tags when not present', () => {
    const result = serializePostToAgentMarkdown(mockPostNoOptionals as any, {
      slug: 'minimal-post',
      lang: 'en',
    });

    expect(result).not.toContain('Updated:');
    expect(result).not.toContain('Tags:');
    expect(result).toContain('Published: 2024-05-01');
  });

  it('should handle ES language with correct canonical URL', () => {
    const result = serializePostToAgentMarkdown(mockPostEmptyBody as any, {
      slug: 'empty-body',
      lang: 'es',
    });

    expect(result).toContain('Language: es');
    expect(result).toContain(
      'Canonical: https://xergioalex.com/es/blog/empty-body'
    );
  });

  it('should handle empty/undefined body gracefully', () => {
    const result = serializePostToAgentMarkdown(mockPostEmptyBody as any, {
      slug: 'empty-body',
      lang: 'es',
    });

    expect(result).toContain('---');
    expect(result).toContain('# Empty Body Post');
    // Should not crash, should end cleanly
    expect(result.endsWith('\n')).toBe(true);
  });

  it('should preserve code blocks in body', () => {
    const result = serializePostToAgentMarkdown(mockPost as any, {
      slug: 'my-awesome-post',
      lang: 'en',
    });

    expect(result).toContain('```js\nconsole.log("hello");\n```');
  });

  it('should end with a trailing newline', () => {
    const result = serializePostToAgentMarkdown(mockPost as any, {
      slug: 'my-awesome-post',
      lang: 'en',
    });

    expect(result.endsWith('\n')).toBe(true);
  });
});

// ─── serializeBlogIndexToMarkdown ──────────────────────

describe('serializeBlogIndexToMarkdown', () => {
  const entries = [
    {
      title: 'First Post',
      slug: 'first-post',
      description: 'The first post.',
      pubDate: new Date('2024-06-01'),
      tags: ['tech'],
    },
    {
      title: 'Second Post',
      slug: 'second-post',
      description: 'The second post.',
      pubDate: new Date('2024-05-15'),
    },
  ];

  it('should produce correct index structure', () => {
    const result = serializeBlogIndexToMarkdown(entries, {
      lang: 'en',
      title: 'XergioAleX Blog',
      description: 'A technical blog.',
    });

    expect(result).toContain('# XergioAleX Blog');
    expect(result).toContain('> A technical blog.');
    expect(result).toContain('Language: en');
    expect(result).toContain('Canonical: https://xergioalex.com/blog');
    expect(result).toContain('Total posts: 2');
    expect(result).toContain('## Posts');
  });

  it('should include post links with .md URLs', () => {
    const result = serializeBlogIndexToMarkdown(entries, {
      lang: 'en',
      title: 'Blog',
      description: 'Test.',
    });

    expect(result).toContain('[First Post](/blog/first-post.md)');
    expect(result).toContain('[Second Post](/blog/second-post.md)');
  });

  it('should use ES prefix for Spanish index', () => {
    const result = serializeBlogIndexToMarkdown(entries, {
      lang: 'es',
      title: 'Blog de XergioAleX',
      description: 'Blog técnico.',
    });

    expect(result).toContain('Language: es');
    expect(result).toContain('Canonical: https://xergioalex.com/es/blog');
    expect(result).toContain('/es/blog/first-post.md');
  });

  it('should handle empty entries list', () => {
    const result = serializeBlogIndexToMarkdown([], {
      lang: 'en',
      title: 'Empty Blog',
      description: 'No posts yet.',
    });

    expect(result).toContain('Total posts: 0');
    expect(result).toContain('## Posts');
  });
});

// ─── serializePageToAgentMarkdown ──────────────────────

describe('serializePageToAgentMarkdown', () => {
  it('should produce correct output with all fields', () => {
    const result = serializePageToAgentMarkdown(mockPage as any, {
      slug: 'about',
      lang: 'en',
    });

    expect(result).toContain('# About Me — XergioAleX');
    expect(result).toContain('> Technology Enthusiast and Lifelong Learner.');
    expect(result).toContain('Language: en');
    expect(result).toContain('Canonical: https://xergioalex.com/about');
    expect(result).toContain('Last Updated: 2026-03-09');
    expect(result).toContain('## Who I Am');
  });

  it('should handle index slug with correct canonical URL', () => {
    const indexPage = {
      ...mockPage,
      id: 'en/index',
      data: { ...mockPage.data, title: 'Home' },
    };
    const result = serializePageToAgentMarkdown(indexPage as any, {
      slug: 'index',
      lang: 'en',
    });

    expect(result).toContain('Canonical: https://xergioalex.com');
    // Should not be https://xergioalex.com/index
    expect(result).not.toContain('/index');
  });

  it('should handle ES language', () => {
    const result = serializePageToAgentMarkdown(mockPageNoLastUpdated as any, {
      slug: 'contact',
      lang: 'es',
    });

    expect(result).toContain('Language: es');
    expect(result).toContain('Canonical: https://xergioalex.com/es/contact');
    expect(result).not.toContain('Last Updated:');
  });

  it('should omit lastUpdated when not present', () => {
    const result = serializePageToAgentMarkdown(mockPageNoLastUpdated as any, {
      slug: 'contact',
      lang: 'es',
    });

    expect(result).not.toContain('Last Updated:');
  });
});

// ─── buildMarkdownAccessLine ───────────────────────────

describe('buildMarkdownAccessLine', () => {
  it('should return the canonical EN line', () => {
    expect(buildMarkdownAccessLine('en')).toBe(EN_ACCESS_LINE);
  });

  it('should return the localized ES line with diacritics', () => {
    const line = buildMarkdownAccessLine('es');

    expect(line).toBe(ES_ACCESS_LINE);
    expect(line).toContain('envía');
    expect(line).toContain('en lugar de HTML');
  });

  it('should keep the header name and media type literal in every language', () => {
    for (const lang of ['en', 'es']) {
      expect(buildMarkdownAccessLine(lang)).toContain(
        '`Accept: text/markdown`'
      );
    }
  });

  it('should fall back to English for unknown languages', () => {
    expect(buildMarkdownAccessLine('pt')).toBe(EN_ACCESS_LINE);
    expect(buildMarkdownAccessLine('')).toBe(EN_ACCESS_LINE);
  });

  it('should document negotiation only, never the .md suffix path', () => {
    expect(buildMarkdownAccessLine('en')).not.toContain('append `.md`');
    expect(buildMarkdownAccessLine('es')).not.toContain('.md');
  });
});

// ─── Markdown access line across all serializers ───────

describe('markdown access line placement', () => {
  const mockDeck = {
    id: 'en/2024-08-01_my-deck',
    data: {
      type: 'native',
      title: 'My Deck',
      description: 'A test deck.',
      pubDate: new Date('2024-08-01'),
      eventName: 'PyCon',
    },
    body: '## Slide One\n\nHello.',
  };

  /** Every serializer family, invoked with minimal valid input. */
  const serializers: Array<[string, (lang: string) => string]> = [
    [
      'serializePostToAgentMarkdown',
      (lang) =>
        serializePostToAgentMarkdown(mockPost as any, {
          slug: 'my-awesome-post',
          lang,
        }),
    ],
    [
      'serializeBlogIndexToMarkdown',
      (lang) =>
        serializeBlogIndexToMarkdown([], {
          lang,
          title: 'Blog',
          description: 'Test.',
        }),
    ],
    [
      'serializeSeriesIndexToMarkdown',
      (lang) =>
        serializeSeriesIndexToMarkdown([], {
          slug: 'my-series',
          seriesTitle: 'My Series',
          seriesDescription: 'Test series.',
          lang,
        }),
    ],
    [
      'serializeSeriesListingToMarkdown',
      (lang) =>
        serializeSeriesListingToMarkdown([], {
          lang,
          title: 'Series',
          description: 'All series.',
        }),
    ],
    [
      'serializePageToAgentMarkdown',
      (lang) =>
        serializePageToAgentMarkdown(mockPage as any, { slug: 'about', lang }),
    ],
    [
      'serializeSlideDeckToMarkdown',
      (lang) =>
        serializeSlideDeckToMarkdown(mockDeck as any, {
          slug: 'my-deck',
          lang,
        }),
    ],
    [
      'serializeSlidesIndexToMarkdown',
      (lang) =>
        serializeSlidesIndexToMarkdown([], {
          lang,
          title: 'Slides',
          description: 'All decks.',
        }),
    ],
  ];

  for (const [name, serialize] of serializers) {
    describe(name, () => {
      it('should include the exact EN access line', () => {
        expect(serialize('en')).toContain(EN_ACCESS_LINE);
      });

      it('should include the localized ES access line', () => {
        expect(serialize('es')).toContain(ES_ACCESS_LINE);
      });

      it('should place the access line immediately after Canonical:', () => {
        const lines = serialize('en').split('\n');
        const canonicalIndex = lines.findIndex((l) =>
          l.startsWith('Canonical:')
        );

        expect(canonicalIndex).toBeGreaterThan(-1);
        expect(lines[canonicalIndex + 1]).toBe(EN_ACCESS_LINE);
      });

      it('should emit the access line exactly once', () => {
        const occurrences = serialize('en')
          .split('\n')
          .filter((l) => l.startsWith('Markdown: '));

        expect(occurrences).toHaveLength(1);
      });
    });
  }
});

// ─── Slides serializers ────────────────────────────────

describe('serializeSlideDeckToMarkdown', () => {
  const mockNativeDeck = {
    id: 'en/2024-08-01_my-deck',
    data: {
      type: 'native',
      title: 'My Deck',
      description: 'A test deck.',
      pubDate: new Date('2024-08-01'),
      updatedDate: new Date('2024-09-01'),
      eventName: 'PyCon',
      eventDate: new Date('2024-08-05'),
      eventUrl: 'https://pycon.org',
      relatedPost: 'my-awesome-post',
    },
    body: '## Slide One\n\nHello.',
  };

  const mockExternalDeck = {
    id: 'es/2024-10-01_external-deck',
    data: {
      type: 'external',
      title: 'Charla Externa',
      description: 'Una presentación alojada fuera del sitio.',
      pubDate: new Date('2024-10-01'),
      externalUrl: 'https://slides.com/deck',
      provider: 'Slides.com',
    },
    body: undefined,
  };

  it('should produce correct output with all fields', () => {
    const result = serializeSlideDeckToMarkdown(mockNativeDeck as any, {
      slug: 'my-deck',
      lang: 'en',
    });

    expect(result).toContain('# My Deck');
    expect(result).toContain('> A test deck.');
    expect(result).toContain('Language: en');
    expect(result).toContain(
      'Canonical: https://xergioalex.com/slides/my-deck'
    );
    expect(result).toContain('Type: native');
    expect(result).toContain('Published: 2024-08-01');
    expect(result).toContain('Updated: 2024-09-01');
    expect(result).toContain('Event: PyCon (2024-08-05) — https://pycon.org');
    expect(result).toContain(
      'Related post: https://xergioalex.com/blog/my-awesome-post'
    );
    expect(result).toContain('## Content');
    expect(result).toContain('## Slide One');
  });

  it('should render external deck fields and ES canonical URL', () => {
    const result = serializeSlideDeckToMarkdown(mockExternalDeck as any, {
      slug: 'external-deck',
      lang: 'es',
    });

    expect(result).toContain(
      'Canonical: https://xergioalex.com/es/slides/external-deck'
    );
    expect(result).toContain('Type: external');
    expect(result).toContain('## Presentación Externa');
    expect(result).toContain('- **URL:** https://slides.com/deck');
    expect(result).toContain('- **Proveedor:** Slides.com');
    expect(result).not.toContain('## Contenido');
  });

  it('should end with a trailing newline', () => {
    const result = serializeSlideDeckToMarkdown(mockNativeDeck as any, {
      slug: 'my-deck',
      lang: 'en',
    });

    expect(result.endsWith('\n')).toBe(true);
  });
});

describe('serializeSlidesIndexToMarkdown', () => {
  const entries = [
    {
      title: 'First Deck',
      slug: 'first-deck',
      description: 'The first deck.',
      type: 'native',
      pubDate: new Date('2024-08-01'),
      eventName: 'PyCon',
    },
    {
      title: 'Second Deck',
      slug: 'second-deck',
      description: 'The second deck.',
      type: 'external',
      pubDate: new Date('2024-09-01'),
    },
  ];

  it('should produce correct index structure with .md links', () => {
    const result = serializeSlidesIndexToMarkdown(entries, {
      lang: 'en',
      title: 'Slides — Presentation Decks',
      description: 'A collection of decks.',
    });

    expect(result).toContain('# Slides — Presentation Decks');
    expect(result).toContain('Canonical: https://xergioalex.com/slides');
    expect(result).toContain('Total decks: 2');
    expect(result).toContain(
      '[First Deck](/slides/first-deck.md) — The first deck. (native, 2024-08-01, PyCon)'
    );
    expect(result).toContain(
      '[Second Deck](/slides/second-deck.md) — The second deck. (external, 2024-09-01)'
    );
  });

  it('should use ES prefix for Spanish index', () => {
    const result = serializeSlidesIndexToMarkdown(entries, {
      lang: 'es',
      title: 'Diapositivas',
      description: 'Colección de presentaciones.',
    });

    expect(result).toContain('Canonical: https://xergioalex.com/es/slides');
    expect(result).toContain('## Presentaciones');
    expect(result).toContain('/es/slides/first-deck.md');
  });

  it('should handle empty entries list', () => {
    const result = serializeSlidesIndexToMarkdown([], {
      lang: 'en',
      title: 'Slides',
      description: 'No decks yet.',
    });

    expect(result).toContain('Total decks: 0');
  });
});
