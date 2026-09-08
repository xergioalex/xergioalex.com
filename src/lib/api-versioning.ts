/**
 * URL versioning for the public JSON API.
 *
 * The canonical endpoints live at `/api/...`. The current major version is
 * also addressable under `/api/v1/...` — same responses, same schemas — so an
 * agent that wants to pin a version in its base URL can. When a breaking
 * change ever ships, it goes to `/api/v2/...` and `/api/v1/` keeps serving
 * the previous shapes (see the versioning policy in `openapi.json`).
 */

/** Paths that carry this prefix are versioned aliases of /api/* routes. */
export const API_VERSION_PREFIX = '/api/v1';

/**
 * Map a request path to its canonical /api/* path.
 * Returns null when the path is not a /api/v1 alias.
 *
 *   /api/v1                       → /api            (→ /api/index.json)
 *   /api/v1/                      → /api
 *   /api/v1/posts.json            → /api/posts.json
 *   /api/v1/series/en             → /api/series/en  (directory form)
 *   /api/posts.json               → null
 *   /api/v2/posts.json            → null (only v1 is aliased)
 */
export function stripApiV1Prefix(pathname: string): string | null {
  if (
    pathname === API_VERSION_PREFIX ||
    pathname === `${API_VERSION_PREFIX}/`
  ) {
    return '/api';
  }
  const match = pathname.match(/^\/api\/v1\/(.+)$/);
  return match ? `/api/${match[1]}` : null;
}
