/**
 * Blog search functionality using exact substring matching.
 * Searches title, description, and tags with case-insensitive matching.
 * Scores results by match location: title > tags > description.
 */

import Fuse from 'fuse.js';

export interface SearchablePost {
  id: string;
  slug: string;
  lang: string;
  title: string;
  description: string;
  tags: string[];
  pubDate: string;
  heroImage?: string;
}

export interface SearchResult {
  item: SearchablePost;
  score: number;
  matches?: ReadonlyArray<{
    key: string;
    value?: string;
    indices: ReadonlyArray<readonly [number, number]>;
  }>;
}

/**
 * Create a search index (wraps posts in a Fuse instance for API compatibility).
 * The actual search uses exact substring matching, not Fuse.js fuzzy matching.
 */
export function createSearchIndex(
  posts: SearchablePost[]
): Fuse<SearchablePost> {
  return new Fuse(posts, { keys: ['title'] });
}

/**
 * Search posts using exact case-insensitive substring matching.
 * A post matches if the query appears in its title, description, or any tag.
 * Results are scored by match location: title (0.0) > tags (0.1) > description (0.2).
 */
export function searchPosts(
  fuse: Fuse<SearchablePost>,
  query: string,
  limit = 100
): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const q = query.trim().toLowerCase();

  // Access the underlying posts from the Fuse instance
  const posts = (fuse as unknown as { _docs: SearchablePost[] })._docs;

  const results: SearchResult[] = [];

  for (const post of posts) {
    const titleMatch = post.title.toLowerCase().includes(q);
    const descMatch = post.description.toLowerCase().includes(q);
    const tagsMatch = post.tags.some((tag) => tag.toLowerCase().includes(q));

    if (titleMatch || descMatch || tagsMatch) {
      // Score: lower is better (title match = best, then tags, then description)
      const score = titleMatch ? 0.0 : tagsMatch ? 0.1 : 0.2;
      results.push({ item: post, score });
    }
  }

  // Sort by score (best first), then by date (newest first)
  results.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return (
      new Date(b.item.pubDate).getTime() - new Date(a.item.pubDate).getTime()
    );
  });

  return results.slice(0, limit);
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

/**
 * Highlight occurrences of a query string in text using case-insensitive matching.
 */
export function highlightMatches(text: string, query: string): string {
  if (!query || query.trim().length < 2) {
    return escapeHtml(text);
  }

  const trimmed = query.trim();
  const escapedQuery = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  if (parts.length === 1) {
    return escapeHtml(text);
  }

  const lowerQuery = trimmed.toLowerCase();
  return parts
    .map((part) =>
      part.toLowerCase() === lowerQuery
        ? `<mark class="bg-yellow-200 dark:bg-yellow-700 px-0.5 rounded">${escapeHtml(part)}</mark>`
        : escapeHtml(part)
    )
    .join('');
}

/**
 * Get highlighted text for a specific field from search result
 */
export function getHighlightedField(
  _result: SearchResult,
  _fieldName: string,
  originalValue: string,
  query: string
): string {
  if (query) {
    return highlightMatches(originalValue, query);
  }
  return escapeHtml(originalValue);
}
