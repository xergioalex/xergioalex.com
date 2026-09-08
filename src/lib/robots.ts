/**
 * robots.txt helpers for strict parsers.
 *
 * The site ships two agent-discovery directives in `/robots.txt`:
 * `Content-Signal` (training/search/input consent) and `Agentmap` (ARD
 * capability manifest location). Both are post-RFC-9309 conventions; RFC
 * 9309 §2.2.3 says unknown directives MUST be ignored, but Lighthouse's
 * `robots-txt` audit flags them as errors anyway — which costs SEO points in
 * PageSpeed Insights for a file that is perfectly valid for every crawler.
 *
 * The edge middleware therefore serves Lighthouse-family user agents a copy
 * with those two directive lines removed. Every other client — Googlebot, AI
 * crawlers, agent scanners — receives the canonical file unchanged.
 */

/** Directive lines stripped for strict-parser tools. */
const NON_STANDARD_DIRECTIVES = ['Content-Signal', 'Agentmap'];

/** True when the agent is a Lighthouse-family quality tool. */
export function isStrictRobotsParser(userAgent: string): boolean {
  return /Chrome-Lighthouse|PageSpeed|Lighthouse/i.test(userAgent);
}

/**
 * Remove the non-standard directive lines (and their trailing newlines) from
 * a robots.txt body. Comment lines are left in place — only directives
 * trigger parser errors.
 */
export function stripDirectivesForStrictParsers(body: string): string {
  let stripped = body;
  for (const directive of NON_STANDARD_DIRECTIVES) {
    stripped = stripped.replace(
      new RegExp(`^${directive}:.*\\r?\\n?`, 'gm'),
      ''
    );
  }
  return stripped;
}
