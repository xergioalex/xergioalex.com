import { type CollectionEntry, getCollection } from 'astro:content';
import { BLOG_PAGE_SIZE } from './constances';
import type { BlogParamsType, BlogPostsResultType, PostStatus } from './types';

const WORDS_PER_MINUTE = 200;

/**
 * Get the slug from a post ID (removes language prefix and date prefix).
 * e.g., "en/2022-07-08_first-post" -> "first-post"
 * e.g., "es/2020-12-31_personal-branding-xergioalex" -> "personal-branding-xergioalex"
 * e.g., "en/first-post" -> "first-post" (backwards compatible)
 */
export function getPostSlug(postId: string): string {
  const parts = postId.split('/');
  const filename = parts.length > 1 ? parts.slice(1).join('/') : postId;
  // Strip date prefix (YYYY-MM-DD.) if present
  return filename.replace(/^\d{4}-\d{2}-\d{2}_/, '');
}

/**
 * Get the language from a post ID
 * e.g., "en/first-post" -> "en"
 */
export function getPostLanguage(postId: string): string {
  const parts = postId.split('/');
  return parts.length > 1 ? parts[0] : 'en';
}

/**
 * Remove markdown syntax and normalize content for word counting.
 */
function normalizeContentForWordCount(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/[#>*_~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Count words in markdown/MDX content.
 */
export function getWordCount(content: string): number {
  const normalized = normalizeContentForWordCount(content);
  return normalized.length > 0 ? normalized.split(' ').length : 0;
}

/**
 * Estimate reading time in minutes from markdown/MDX content.
 */
export function getReadingTimeFromContent(content: string): number {
  const wordCount = getWordCount(content);
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

/**
 * Determine the display status of a blog post.
 * - Demo: post path contains '/_demo/'
 * - Draft + Scheduled: draft=true AND pubDate is in the future
 * - Draft: draft=true AND pubDate is in the past/present
 * - Scheduled: draft=false AND pubDate is in the future
 * - Published: draft=false AND pubDate is in the past/present
 */
export function getPostStatus(post: CollectionEntry<'blog'>): PostStatus {
  if (post.id.includes('/_demo/')) return 'demo';

  const isDraft = post.data.draft === true;
  const isScheduled = post.data.pubDate.valueOf() > Date.now();

  if (isDraft && isScheduled) return 'draft+scheduled';
  if (isDraft) return 'draft';
  if (isScheduled) return 'scheduled';
  return 'published';
}

/**
 * Check if a post should be visible in production builds.
 * Only posts with status 'published' are visible in production.
 */
export function isPostVisibleInProduction(
  post: CollectionEntry<'blog'>
): boolean {
  return getPostStatus(post) === 'published';
}

export async function getBlogPosts(
  params: BlogParamsType
): Promise<BlogPostsResultType> {
  const allPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  const tagsResult: CollectionEntry<'tags'>[] = await getCollection('tags');

  // Filter by language first (based on folder structure: en/, es/)
  const lang = params.lang || 'en';
  let posts: CollectionEntry<'blog'>[] = allPosts.filter((post) =>
    post.id.startsWith(`${lang}/`)
  );

  // Get all unique tags that are actually used in posts for this language
  const usedTags = Array.from(
    new Set(posts.flatMap((post) => post.data.tags ?? []))
  );

  // Filter tagsResult to only include tags that are used in posts
  const filteredTags = tagsResult.filter((tag) =>
    usedTags.includes(tag.data.name)
  );

  // Filter by tag if specified
  if (params.tag) {
    posts = posts.filter((post) =>
      post.data.tags?.includes(params.tag as string)
    );
  }

  // Sort by publication date (newest first)
  posts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  // Calculate total pages based on filtered posts
  const totalPages = Math.ceil(
    posts.length / (params.pageSize ?? BLOG_PAGE_SIZE)
  );

  // Apply pagination
  if (params.page) {
    const startIndex = (params.page - 1) * (params.pageSize ?? BLOG_PAGE_SIZE);
    const endIndex = params.page * (params.pageSize ?? BLOG_PAGE_SIZE);
    posts = posts.slice(startIndex, endIndex);
  } else {
    posts = posts.slice(0, params.pageSize ?? BLOG_PAGE_SIZE);
  }

  // Count total posts for this language (before pagination)
  const langPosts = allPosts.filter((post) => post.id.startsWith(`${lang}/`));

  const result: BlogPostsResultType = {
    tagsResult: filteredTags,
    postsResult: posts,
    currentPage: params.page ?? 1,
    pageSize: params.pageSize ?? BLOG_PAGE_SIZE,
    totalPages: totalPages,
    totalPostsAvailable: langPosts.length,
  };
  return result;
}

interface RelatedPostsParams {
  currentPostId: string;
  tags: string[];
  lang: string;
  limit?: number;
}

/**
 * Find related posts based on shared tags, with latest-post fallback.
 */
export async function getRelatedPosts(
  params: RelatedPostsParams
): Promise<CollectionEntry<'blog'>[]> {
  const { currentPostId, tags, lang, limit = 3 } = params;
  const allPosts = await getCollection('blog');

  const candidates = allPosts
    .filter(
      (post) => post.id.startsWith(`${lang}/`) && post.id !== currentPostId
    )
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  if (!tags || tags.length === 0) {
    return candidates.slice(0, limit);
  }

  const scoredPosts = candidates
    .map((post) => {
      const postTags = post.data.tags ?? [];
      const sharedTagCount = postTags.filter((tag) =>
        tags.includes(tag)
      ).length;
      return { post, sharedTagCount };
    })
    .sort((a, b) => {
      if (b.sharedTagCount !== a.sharedTagCount) {
        return b.sharedTagCount - a.sharedTagCount;
      }
      return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
    });

  const related = scoredPosts
    .filter((item) => item.sharedTagCount > 0)
    .slice(0, limit)
    .map((item) => item.post);

  if (related.length === limit) {
    return related;
  }

  const alreadyIncluded = new Set(related.map((post) => post.id));
  const fallback = candidates.filter((post) => !alreadyIncluded.has(post.id));

  return [...related, ...fallback].slice(0, limit);
}
