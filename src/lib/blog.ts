import { type CollectionEntry, getCollection } from 'astro:content';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { BLOG_PAGE_SIZE } from './constances';
import type { BlogParamsType, BlogPostsResultType, SeriesInfo } from './types';

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

export interface SearchIndexEntry {
  id: string;
  slug: string;
  lang: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  topics: string[];
  heroImage?: string;
  heroWebpExists: boolean;
  series?: string;
  seriesOrder?: number;
  seriesCurrent?: number;
  seriesTotal?: number;
  seriesTitle?: string;
}

interface SeriesPosition {
  current: number;
  total: number;
}

let _seriesTitleCache: Map<string, string> | null = null;

async function getSeriesTitleMap(): Promise<Map<string, string>> {
  if (_seriesTitleCache) return _seriesTitleCache;
  const allSeries = await getCollection('series');
  _seriesTitleCache = new Map(
    allSeries.map((seriesEntry) => [
      seriesEntry.data.name,
      seriesEntry.data.title,
    ])
  );
  return _seriesTitleCache;
}

function getSeriesPositionById(
  posts: CollectionEntry<'blog'>[]
): Map<string, SeriesPosition> {
  const seriesGroups = new Map<string, CollectionEntry<'blog'>[]>();

  for (const post of posts) {
    if (!post.data.series) continue;
    const lang = getPostLanguage(post.id);
    const key = `${lang}:${post.data.series}`;
    const group = seriesGroups.get(key);
    if (group) {
      group.push(post);
    } else {
      seriesGroups.set(key, [post]);
    }
  }

  const positions = new Map<string, SeriesPosition>();

  for (const [, groupPosts] of seriesGroups) {
    const ordered = [...groupPosts].sort((a, b) => {
      const orderA = a.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
    });

    const total = ordered.length;
    for (const [index, post] of ordered.entries()) {
      positions.set(post.id, { current: index + 1, total });
    }
  }

  return positions;
}

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

/**
 * Build the search index for client-side blog search.
 * Same structure as /api/posts.json — used to inline the index at build time
 * so search works without a runtime fetch (fixes 404 on some deployments).
 */
let _searchIndexCache: Promise<SearchIndexEntry[]> | null = null;

async function buildSearchIndex(): Promise<SearchIndexEntry[]> {
  const allPosts = await getCollection('blog');
  const visiblePosts = allPosts.filter((post) => !isDemoPost(post));
  const seriesPositionById = getSeriesPositionById(visiblePosts);
  const seriesTitleBySlug = await getSeriesTitleMap();

  return Promise.all(
    visiblePosts.map(async (post) => {
      const allTags = post.data.tags || [];
      const { primaryTags, topicTags } = await groupPostTags(allTags);
      const seriesPosition = seriesPositionById.get(post.id);
      const seriesSlug = post.data.series;
      return {
        id: post.id,
        slug: getPostSlug(post.id),
        lang: getPostLanguage(post.id),
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate.toISOString(),
        tags: primaryTags,
        topics: topicTags,
        heroImage: post.data.heroImage,
        heroWebpExists: heroWebpExists(post.data.heroImage),
        series: seriesSlug,
        seriesOrder: post.data.seriesOrder,
        seriesCurrent: seriesPosition?.current,
        seriesTotal: seriesPosition?.total,
        seriesTitle: seriesSlug ? seriesTitleBySlug.get(seriesSlug) : undefined,
      };
    })
  );
}

export async function getSearchIndex(): Promise<SearchIndexEntry[]> {
  if (!_searchIndexCache) {
    _searchIndexCache = buildSearchIndex();
  }
  return _searchIndexCache;
}

export async function getSearchIndexByLanguage(
  lang: string
): Promise<SearchIndexEntry[]> {
  const searchIndex = await getSearchIndex();
  return searchIndex.filter((post) => post.lang === lang);
}

export async function getBlogPosts(
  params: BlogParamsType
): Promise<BlogPostsResultType> {
  const allPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  const tagsResult: CollectionEntry<'tags'>[] = await getCollection('tags');

  // Filter by language first (based on folder structure: en/, es/)
  const lang = params.lang || 'en';
  const langPosts = allPosts.filter(
    (post) => post.id.startsWith(`${lang}/`) && !isDemoPost(post)
  );
  const seriesPositionById = getSeriesPositionById(langPosts);
  const seriesTitleBySlug = await getSeriesTitleMap();
  let posts: CollectionEntry<'blog'>[] = [...langPosts];

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
    seriesCurrent: seriesPositionById.get(post.id)?.current,
    seriesTotal: seriesPositionById.get(post.id)?.total,
    seriesTitle: post.data.series
      ? seriesTitleBySlug.get(post.data.series)
      : undefined,
  }));

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

/**
 * Get series navigation info for a post that belongs to a series.
 * Returns series metadata, all posts in order, and prev/next navigation.
 */
export async function getSeriesNavigation(
  seriesSlug: string,
  currentPostId: string,
  lang: string
): Promise<SeriesInfo | null> {
  const allSeries = await getCollection('series');
  const seriesEntry = allSeries.find((s) => s.data.name === seriesSlug);
  if (!seriesEntry) return null;

  const allPosts = await getCollection('blog');
  const seriesPosts = allPosts
    .filter(
      (post) =>
        post.id.startsWith(`${lang}/`) &&
        post.data.series === seriesSlug &&
        post.data.seriesOrder != null &&
        !isDemoPost(post)
    )
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));

  const currentIndex = seriesPosts.findIndex(
    (post) => post.id === currentPostId
  );
  if (currentIndex === -1) return null;

  return {
    name: seriesEntry.data.name,
    title: seriesEntry.data.title,
    description: seriesEntry.data.description,
    posts: seriesPosts.map((post) => ({
      post,
      seriesOrder: post.data.seriesOrder ?? 0,
    })),
    currentIndex,
    previousPost: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
    nextPost:
      currentIndex < seriesPosts.length - 1
        ? seriesPosts[currentIndex + 1]
        : null,
  };
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
