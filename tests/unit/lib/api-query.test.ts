import { describe, expect, it } from 'vitest';

import {
  LIMIT_MAX,
  LIMIT_MIN,
  POSTS_INDEX_PATHS,
  parseLimitParam,
} from '@/lib/api-query';

describe('parseLimitParam', () => {
  it('returns undefined when the parameter is absent', () => {
    expect(parseLimitParam(null)).toBeUndefined();
    expect(parseLimitParam('')).toBeUndefined();
  });

  it('accepts integers between 1 and 500', () => {
    expect(parseLimitParam('1')).toBe(1);
    expect(parseLimitParam('5')).toBe(5);
    expect(parseLimitParam(String(LIMIT_MAX))).toBe(500);
  });

  it('rejects out-of-range and non-integer values with null', () => {
    expect(parseLimitParam('0')).toBeNull();
    expect(parseLimitParam('501')).toBeNull();
    expect(parseLimitParam('-3')).toBeNull();
    expect(parseLimitParam('abc')).toBeNull();
    expect(parseLimitParam('2.5')).toBeNull();
  });

  it('documents the endpoints the parameter applies to', () => {
    expect(POSTS_INDEX_PATHS.has('/api/posts.json')).toBe(true);
    expect(POSTS_INDEX_PATHS.has('/api/posts-en.json')).toBe(true);
    expect(POSTS_INDEX_PATHS.has('/api/posts-es.json')).toBe(true);
    expect(POSTS_INDEX_PATHS.has('/api/series/en/index.json')).toBe(false);
    expect(LIMIT_MIN).toBe(1);
    expect(LIMIT_MAX).toBe(500);
  });
});
