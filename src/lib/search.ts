/**
 * Advanced search functionality using Fuse.js
 * Provides fuzzy matching and relevance scoring for blog posts
 */

import Fuse, { type IFuseOptions } from 'fuse.js';

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

// Fuse.js configuration optimized for blog search
const fuseOptions: IFuseOptions<SearchablePost> = {
  // Keys to search with weights (higher = more important)
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.3 },
  ],
  // Include score for relevance sorting
  includeScore: true,
  // Include match info for highlighting
  includeMatches: true,
  // Fuzzy matching threshold (0 = exact, 1 = match anything)
  // 0.4 is a good balance between finding relevant results and avoiding noise
  threshold: 0.4,
  // Distance for fuzzy matching
  distance: 100,
  // Minimum characters before searching
  minMatchCharLength: 2,
  // Ignore location of match in string
  ignoreLocation: true,
};

/**
 * Create a Fuse search instance from posts
 */
export function createSearchIndex(
  posts: SearchablePost[]
): Fuse<SearchablePost> {
  return new Fuse(posts, fuseOptions);
}

/**
 * Search posts using Fuse.js
 * @param fuse - Fuse instance
 * @param query - Search query
 * @param limit - Maximum results to return
 * @returns Array of search results with scores
 */
export function searchPosts(
  fuse: Fuse<SearchablePost>,
  query: string,
  limit = 100
): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const results = fuse.search(query.trim(), { limit });

  return results.map((result) => ({
    item: result.item,
    score: result.score ?? 1,
    matches: result.matches as SearchResult['matches'],
  }));
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
 * Highlight matched text in a string
 * @param text - Original text
 * @param indices - Match indices from Fuse.js
 * @returns HTML string with highlighted matches
 */
export function highlightMatches(
  text: string,
  indices: ReadonlyArray<readonly [number, number]>
): string {
  if (!indices || indices.length === 0) {
    return escapeHtml(text);
  }

  let result = '';
  let lastIndex = 0;

  // Sort indices by start position
  const sortedIndices = [...indices].sort((a, b) => a[0] - b[0]);

  for (const [start, end] of sortedIndices) {
    // Add text before match
    result += escapeHtml(text.slice(lastIndex, start));
    // Add highlighted match
    result += `<mark class="bg-yellow-200 dark:bg-yellow-700 px-0.5 rounded">${escapeHtml(text.slice(start, end + 1))}</mark>`;
    lastIndex = end + 1;
  }

  // Add remaining text
  result += escapeHtml(text.slice(lastIndex));

  return result;
}

/**
 * Get highlighted text for a specific field from search result
 */
export function getHighlightedField(
  result: SearchResult,
  fieldName: string,
  originalValue: string
): string {
  const match = result.matches?.find((m) => m.key === fieldName);
  if (match?.indices) {
    return highlightMatches(originalValue, match.indices);
  }
  return escapeHtml(originalValue);
}
