/**
 * Query parameters the edge middleware honors on the public JSON API.
 *
 * The endpoints are prerendered static files; the middleware applies these
 * parameters at request time over the cached asset, so they are real,
 * documented behavior — never decorative.
 */

/** Posts index endpoints that support ?limit=. */
export const POSTS_INDEX_PATHS = new Set([
  '/api/posts.json',
  '/api/posts-en.json',
  '/api/posts-es.json',
]);

export const LIMIT_MIN = 1;
export const LIMIT_MAX = 500;

/**
 * Parse a ?limit= value.
 * - undefined when the parameter is absent (serve the full index)
 * - an integer 1-500 when valid
 * - null when present but invalid (answer 400)
 */
export function parseLimitParam(raw: string | null): number | null | undefined {
  if (raw === null || raw === '') return undefined;
  // Digits only — parseInt would happily truncate "2.5" to 2.
  if (!/^\d+$/.test(raw)) return null;
  const parsed = Number.parseInt(raw, 10);
  if (parsed < LIMIT_MIN || parsed > LIMIT_MAX) {
    return null;
  }
  return parsed;
}
