import { describe, expect, it } from 'vitest';

import { API_VERSION_PREFIX, stripApiV1Prefix } from '@/lib/api-versioning';

describe('stripApiV1Prefix', () => {
  it('maps versioned aliases to their canonical /api path', () => {
    expect(stripApiV1Prefix('/api/v1/posts.json')).toBe('/api/posts.json');
    expect(stripApiV1Prefix('/api/v1/posts-en.json')).toBe(
      '/api/posts-en.json'
    );
    expect(stripApiV1Prefix('/api/v1/series/en/index.json')).toBe(
      '/api/series/en/index.json'
    );
    expect(stripApiV1Prefix('/api/v1/series/en/trading-journey.json')).toBe(
      '/api/series/en/trading-journey.json'
    );
  });

  it('keeps the directory-form convenience working', () => {
    expect(stripApiV1Prefix('/api/v1/series/en')).toBe('/api/series/en');
    expect(stripApiV1Prefix('/api/v1')).toBe('/api');
    expect(stripApiV1Prefix('/api/v1/')).toBe('/api');
  });

  it('returns null for unversioned and non-v1 paths', () => {
    expect(stripApiV1Prefix('/api/posts.json')).toBeNull();
    expect(stripApiV1Prefix('/api/index.json')).toBeNull();
    expect(stripApiV1Prefix('/api/v2/posts.json')).toBeNull();
    expect(stripApiV1Prefix('/blog/some-post/')).toBeNull();
    expect(stripApiV1Prefix('/mcp')).toBeNull();
    expect(stripApiV1Prefix('/')).toBeNull();
  });

  it('exposes the prefix it strips', () => {
    expect(API_VERSION_PREFIX).toBe('/api/v1');
  });
});
