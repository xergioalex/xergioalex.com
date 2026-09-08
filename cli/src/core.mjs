/**
 * Core logic of the xergioalex CLI — pure, dependency-free, Node ≥ 18.
 *
 * The CLI is a thin reader over the public JSON API of xergioalex.com
 * (https://xergioalex.com/developers): posts, series, tag timelines and the
 * API index. Everything here is pure so it is unit-testable; the bin wrapper
 * owns argument parsing, fetching and stdout.
 */

export const ORIGIN = 'https://xergioalex.com';
export const CLI_VERSION = '1.0.0';

/** Resolve the API URL for a command and its options. */
export function apiUrl(command, options = {}) {
  const lang = options.lang === 'es' ? 'es' : 'en';
  switch (command.kind) {
    case 'posts':
      return `${ORIGIN}/api/posts-${options.lang === 'all' ? 'en' : lang}.json`;
    case 'posts-all':
      return `${ORIGIN}/api/posts.json`;
    case 'search':
      return `${ORIGIN}/api/posts-${lang}.json`;
    case 'series':
      return command.slug
        ? `${ORIGIN}/api/series/${lang}/${command.slug}.json`
        : `${ORIGIN}/api/series/${lang}/index.json`;
    case 'tag':
      return `${ORIGIN}/api/timeline/${lang}/${command.tag}.json`;
    case 'talks':
      return `${ORIGIN}/api/slides-timeline/${lang}.json`;
    case 'api':
      return `${ORIGIN}/api/index.json`;
    default:
      throw new Error(`Unknown command kind: ${command.kind}`);
  }
}

/** Page URL for a post slug (slugs are language-neutral, paths are not). */
export function postUrl(slug, lang = 'en') {
  return `${ORIGIN}${lang === 'es' ? '/es' : ''}/blog/${slug}/`;
}

/** Case-insensitive match of a query against title, description and tags. */
export function matchesQuery(post, query) {
  const needle = String(query).toLowerCase();
  return [post.title, post.description, ...(post.tags ?? [])]
    .filter(Boolean)
    .some((field) => String(field).toLowerCase().includes(needle));
}

/** Slice + map a posts index into the compact shape the CLI prints. */
export function preparePosts(posts, { limit } = {}) {
  const sliced =
    Number.isInteger(limit) && limit > 0 ? posts.slice(0, limit) : posts;
  return sliced.map((post) => ({
    slug: post.slug,
    title: post.title,
    pubDate: post.pubDate,
    tags: post.tags ?? [],
    url: postUrl(post.slug, post.lang),
  }));
}

/** One line per item — the default, human-readable output. */
export function formatPostLine(post) {
  const tags = post.tags.length > 0 ? `  [${post.tags.join(', ')}]` : '';
  return `${post.pubDate?.slice(0, 10) ?? '????-??-??'}  ${post.title}${tags}\n           ${post.url}`;
}

export function formatSeriesLine(series) {
  return `${String(series.postCount).padStart(2)} ch  ${series.title}  (${series.slug})`;
}

export function formatDeckLine(deck) {
  return `${deck.pubDate?.slice(0, 10) ?? '????-??-??'}  ${deck.title}  [${deck.type}]`;
}

/** Validate a CLI language option. Returns 'en' by default. */
export function normalizeLang(value) {
  if (value === undefined || value === null || value === '') return 'en';
  if (value === 'en' || value === 'es' || value === 'all') return value;
  throw new Error(`--lang must be "en", "es" or "all" (got "${value}")`);
}

/** Validate --limit: an integer between 1 and 500. */
export function normalizeLimit(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const limit = Number.parseInt(value, 10);
  if (!Number.isInteger(limit) || limit < 1 || limit > 500) {
    throw new Error(`--limit must be an integer between 1 and 500 (got "${value}")`);
  }
  return limit;
}

export const USAGE = `xergioalex — read xergioalex.com from the terminal

Usage:
  xergioalex posts [--lang en|es|all] [--limit N]   Latest posts (default: en)
  xergioalex search <query> [--lang en|es] [--limit N]
                                                    Search titles, descriptions, tags
  xergioalex post <slug> [--lang en|es]             One post by slug (metadata + URL)
  xergioalex series [--lang en|es]                  List blog series
  xergioalex series <slug> [--lang en|es]           Chapters of one series
  xergioalex tag <name> [--lang en|es]              Posts carrying a tag
  xergioalex talks [--lang en|es]                   Slide decks timeline
  xergioalex api                                   The JSON API index
  xergioalex help                                  This help

Options:
  --json       Print the raw JSON payload instead of text
  --lang       Content language: en (default), es; "all" for posts
  --limit      At most N items (1-500)
  --version    Print the CLI version

The API is public and read-only: no key, no login.
Docs: https://xergioalex.com/developers · API: https://xergioalex.com/api/index.json`;
