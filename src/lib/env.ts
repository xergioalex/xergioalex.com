/**
 * Whether preview features should be shown: draft/scheduled/demo badges,
 * "Show all posts" link, and hidden content in blog listings.
 *
 * True when:
 * - Local dev (import.meta.env.DEV)
 * - Cloudflare Pages preview branch (CF_PAGES_BRANCH is not main/master/production)
 *
 * False in production (main branch on Cloudflare Pages).
 */
export function isPreviewFeaturesEnabled(): boolean {
  return (
    import.meta.env.DEV === true || import.meta.env.PREVIEW_FEATURES === 'true'
  );
}
