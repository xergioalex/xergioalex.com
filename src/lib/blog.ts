import { type CollectionEntry, getCollection } from 'astro:content';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { BLOG_PAGE_SIZE } from './constances';
import type { BlogParamsType, BlogPostsResultType } from './types';

function heroWebpExists(heroImage: string | undefined): boolean {
  if (!heroImage || !/\.(png|jpe?g)$/i.test(heroImage)) return false;
  const publicDir = join(process.cwd(), 'public');
  const webpPath = join(
    publicDir,
    heroImage.replace(/^\//, '').replace(/\.(png|jpe?g)$/i, '.webp')
  );
  return existsSync(webpPath);
}

const WORDS_PER_MINUTE = 200;

/**
 * Get the slug from a post ID (removes language prefix, _demo/ prefix, and date prefix).
 * e.g., "en/2022-07-08_first-post" -> "first-post"
 * e.g., "es/2020-12-31_personal-branding-xergioalex" -> "personal-branding-xergioalex"
 * e.g., "en/_demo/2025-01-01_demo-hero-banner" -> "demo-hero-banner"
 * e.g., "en/first-post" -> "first-post" (backwards compatible)
 */
export function getPostSlug(postId: string): string {
  const parts = postId.split('/');
  // Get the last segment (filename) — handles both "en/file" and "en/_demo/file"
  const filename = parts[parts.length - 1];
  // Strip date prefix (YYYY-MM-DD_) if present
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
 * Check if a post is a demo post (stored in _demo/ folder).
 * Demo posts are excluded from listings and only accessible via direct URL in dev mode.
 */
export function isDemoPost(post: CollectionEntry<'blog'>): boolean {
  return post.id.includes('/_demo/');
}

/**
 * Build a lookup map of tag name -> tier from the tags collection.
 * Cached per call to avoid repeated collection queries within the same build.
 */
let _tagTierCache: Map<string, string> | null = null;
let _hierarchyValidated = false;

/**
 * Validate tag hierarchy integrity at build time.
 * Logs warnings for: orphaned parents, primary tags with parent, non-primary parents.
 * Runs once per build — does NOT throw (warnings only).
 */
async function validateTagHierarchy(): Promise<void> {
  if (_hierarchyValidated) return;
  _hierarchyValidated = true;

  const allTags = await getCollection('tags');
  const tagNames = new Set(allTags.map((t) => t.data.name));

  for (const tag of allTags) {
    if (tag.data.parent && !tagNames.has(tag.data.parent)) {
      console.warn(
        `[tag-validation] Tag "${tag.data.name}" has parent "${tag.data.parent}" which does not exist`
      );
    }
    if (tag.data.tier === 'primary' && tag.data.parent) {
      console.warn(
        `[tag-validation] Primary tag "${tag.data.name}" should not have a parent`
      );
    }
    if (tag.data.parent) {
      const parentTag = allTags.find((t) => t.data.name === tag.data.parent);
      if (parentTag && parentTag.data.tier !== 'primary') {
        console.warn(
          `[tag-validation] Tag "${tag.data.name}" has parent "${tag.data.parent}" which is not a primary tag`
        );
      }
    }
  }
}

async function getTagTierMap(): Promise<Map<string, string>> {
  if (_tagTierCache) return _tagTierCache;
  const allTags = await getCollection('tags');
  _tagTierCache = new Map(allTags.map((tag) => [tag.data.name, tag.data.tier]));
  await validateTagHierarchy();
  return _tagTierCache;
}

/**
 * Get the tier of a tag by name. Returns 'primary' if tag is not found in the collection.
 */
export async function getTagTier(
  tagName: string
): Promise<'primary' | 'secondary' | 'subtopic'> {
  const tierMap = await getTagTierMap();
  return (
    (tierMap.get(tagName) as 'primary' | 'secondary' | 'subtopic') || 'primary'
  );
}

/**
 * Split a post's tags into primary and secondary groups using the tags collection.
 */
export async function groupPostTags(
  tags: string[]
): Promise<{ primaryTags: string[]; topicTags: string[] }> {
  const tierMap = await getTagTierMap();
  const primaryTags: string[] = [];
  const topicTags: string[] = [];
  for (const tag of tags) {
    const tier = tierMap.get(tag) || 'primary';
    if (tier === 'secondary' || tier === 'subtopic') {
      topicTags.push(tag);
    } else {
      primaryTags.push(tag);
    }
  }
  return { primaryTags, topicTags };
}

export async function getBlogPosts(
  params: BlogParamsType
): Promise<BlogPostsResultType> {
  const allPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  const tagsResult: CollectionEntry<'tags'>[] = await getCollection('tags');

  // Filter by language first (based on folder structure: en/, es/)
  const lang = params.lang || 'en';
  let posts: CollectionEntry<'blog'>[] = allPosts.filter(
    (post) => post.id.startsWith(`${lang}/`) && !isDemoPost(post)
  );

  // Get all unique tags that are actually used in visible posts for this language
  const usedTags = Array.from(
    new Set(posts.flatMap((post) => post.data.tags ?? []))
  );

  // Filter tagsResult to only include tags that are used in posts
  const filteredTags = tagsResult.filter((tag) =>
    usedTags.includes(tag.data.name)
  );

  // Filter by tag if specified (works for both primary and secondary tags)
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

  // Enrich posts with heroWebpExists for BlogCard (avoids picture/WebP when WebP doesn't exist)
  const enrichedPosts = posts.map((post) => ({
    ...post,
    heroWebpExists: heroWebpExists(post.data.heroImage),
  }));

  // Count total posts for this language (before pagination, excluding demo posts)
  const langPosts = allPosts.filter(
    (post) => post.id.startsWith(`${lang}/`) && !isDemoPost(post)
  );

  const result: BlogPostsResultType = {
    tagsResult: filteredTags,
    postsResult: enrichedPosts,
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
 * Find related posts based on shared tags (primary weighted 2x, secondary 1x), with latest-post fallback.
 */
export async function getRelatedPosts(
  params: RelatedPostsParams
): Promise<CollectionEntry<'blog'>[]> {
  const { currentPostId, tags, lang, limit = 3 } = params;
  const allPosts = await getCollection('blog');
  const tierMap = await getTagTierMap();

  const candidates = allPosts
    .filter(
      (post) =>
        post.id.startsWith(`${lang}/`) &&
        post.id !== currentPostId &&
        !isDemoPost(post)
    )
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  if (!tags || tags.length === 0) {
    return candidates.slice(0, limit);
  }

  const scoredPosts = candidates
    .map((post) => {
      const postTags = post.data.tags ?? [];
      let score = 0;
      for (const tag of postTags) {
        if (tags.includes(tag)) {
          const tier = tierMap.get(tag) || 'primary';
          // Primary tag match = 2 points, secondary/subtopic = 1 point
          score += tier === 'primary' ? 2 : 1;
        }
      }
      return { post, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
    });

  const related = scoredPosts
    .filter((item) => item.score > 0)
    .slice(0, limit)
    .map((item) => item.post);

  if (related.length === limit) {
    return related;
  }

  const alreadyIncluded = new Set(related.map((post) => post.id));
  const fallback = candidates.filter((post) => !alreadyIncluded.has(post.id));

  return [...related, ...fallback].slice(0, limit);
}
