import { describe, expect, it } from 'vitest';

import {
  apiUrl,
  formatPostLine,
  matchesQuery,
  normalizeLang,
  normalizeLimit,
  postUrl,
  preparePosts,
  USAGE,
} from '../../../cli/src/core.mjs';

describe('apiUrl', () => {
  it('maps every command to its public API endpoint', () => {
    expect(apiUrl({ kind: 'posts' }, { lang: 'en' })).toBe(
      'https://xergioalex.com/api/posts-en.json'
    );
    expect(apiUrl({ kind: 'posts' }, { lang: 'es' })).toBe(
      'https://xergioalex.com/api/posts-es.json'
    );
    expect(apiUrl({ kind: 'posts-all' })).toBe(
      'https://xergioalex.com/api/posts.json'
    );
    expect(apiUrl({ kind: 'search' }, { lang: 'es' })).toBe(
      'https://xergioalex.com/api/posts-es.json'
    );
    expect(apiUrl({ kind: 'series' }, { lang: 'en' })).toBe(
      'https://xergioalex.com/api/series/en/index.json'
    );
    expect(
      apiUrl({ kind: 'series', slug: 'trading-journey' }, { lang: 'es' })
    ).toBe('https://xergioalex.com/api/series/es/trading-journey.json');
    expect(apiUrl({ kind: 'tag', tag: 'tech' }, { lang: 'en' })).toBe(
      'https://xergioalex.com/api/timeline/en/tech.json'
    );
    expect(apiUrl({ kind: 'talks' }, { lang: 'es' })).toBe(
      'https://xergioalex.com/api/slides-timeline/es.json'
    );
    expect(apiUrl({ kind: 'api' })).toBe(
      'https://xergioalex.com/api/index.json'
    );
  });

  it('rejects unknown command kinds', () => {
    expect(() => apiUrl({ kind: 'nope' })).toThrow(/Unknown command kind/);
  });
});

describe('postUrl', () => {
  it('keeps English at the root and Spanish under /es/', () => {
    expect(postUrl('some-post')).toBe('https://xergioalex.com/blog/some-post/');
    expect(postUrl('some-post', 'es')).toBe(
      'https://xergioalex.com/es/blog/some-post/'
    );
  });
});

describe('matchesQuery', () => {
  const post = {
    title: 'What It Takes to Score 100',
    description: 'Agent readiness field guide',
    tags: ['tech', 'aeo'],
  };

  it('matches title, description and tags case-insensitively', () => {
    expect(matchesQuery(post, 'score')).toBe(true);
    expect(matchesQuery(post, 'AGENT')).toBe(true);
    expect(matchesQuery(post, 'AEO')).toBe(true);
  });

  it('does not match absent text', () => {
    expect(matchesQuery(post, 'blockchain')).toBe(false);
  });
});

describe('preparePosts', () => {
  const posts = Array.from({ length: 10 }, (_, i) => ({
    slug: `post-${i}`,
    lang: 'en',
    title: `Post ${i}`,
    description: 'd',
    pubDate: `2026-01-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`,
    tags: ['tech'],
  }));

  it('maps entries to the compact CLI shape with URLs', () => {
    const prepared = preparePosts(posts);
    expect(prepared[0]).toEqual({
      slug: 'post-0',
      title: 'Post 0',
      pubDate: '2026-01-01T00:00:00.000Z',
      tags: ['tech'],
      url: 'https://xergioalex.com/blog/post-0/',
    });
  });

  it('honors --limit', () => {
    expect(preparePosts(posts, { limit: 3 })).toHaveLength(3);
    expect(preparePosts(posts, {})).toHaveLength(10);
  });

  it('uses the /es/ prefix for Spanish entries', () => {
    const prepared = preparePosts([{ ...posts[0], lang: 'es' }]);
    expect(prepared[0].url).toBe('https://xergioalex.com/es/blog/post-0/');
  });
});

describe('formatPostLine', () => {
  it('renders date, title, tags and URL on two lines', () => {
    const line = formatPostLine({
      pubDate: '2026-08-20T12:00:00.000Z',
      title: 'A post',
      tags: ['tech'],
      url: 'https://xergioalex.com/blog/a-post/',
    });
    expect(line).toContain('2026-08-20  A post  [tech]');
    expect(line).toContain('https://xergioalex.com/blog/a-post/');
  });
});

describe('option validation', () => {
  it('defaults the language to en', () => {
    expect(normalizeLang(undefined)).toBe('en');
    expect(normalizeLang('es')).toBe('es');
    expect(normalizeLang('all')).toBe('all');
    expect(() => normalizeLang('fr')).toThrow(/--lang/);
  });

  it('validates --limit as an integer between 1 and 500', () => {
    expect(normalizeLimit(undefined)).toBeUndefined();
    expect(normalizeLimit('10')).toBe(10);
    expect(() => normalizeLimit('0')).toThrow(/--limit/);
    expect(() => normalizeLimit('501')).toThrow(/--limit/);
    expect(() => normalizeLimit('abc')).toThrow(/--limit/);
  });
});

describe('usage text', () => {
  it('documents every command and the public API', () => {
    expect(USAGE).toContain('xergioalex posts');
    expect(USAGE).toContain('xergioalex search');
    expect(USAGE).toContain('xergioalex series');
    expect(USAGE).toContain('xergioalex tag');
    expect(USAGE).toContain('xergioalex talks');
    expect(USAGE).toContain('xergioalex api');
    expect(USAGE).toContain('--json');
    expect(USAGE).toContain('no key, no login');
  });
});
