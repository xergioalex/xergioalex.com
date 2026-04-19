import { type CollectionEntry, getCollection } from 'astro:content';
import { BLOG_PAGE_SIZE, SITE_TIMEZONE } from './constances';
import type { BlogParamsType, BlogPostsResultType, SeriesInfo } from './types';

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

  series?: string;
  seriesOrder?: number;
  seriesCurrent?: number;
  seriesTotal?: number;
  seriesTitle?: string;
}

/** Minimal post schema for timeline card rendering — leaner than SearchIndexEntry. */
export interface TimelineCardEntry {
  slug: string;
  lang: string;
  title: string;
  description: string;
  pubDate: string;
  /** All post tags (primary + subtopic combined). Callers derive topics client-side via topicTagNames. */
  tags: string[];
  heroImage?: string;

  seriesSlug?: string;
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
 * Branches that deploy to the public production site. Override with the
 * PRODUCTION_BRANCHES env var (comma-separated) if the deployment topology
 * changes. `master` is included as a safe default for forks.
 */
const PRODUCTION_BRANCHES: readonly string[] = (
  process.env.PRODUCTION_BRANCHES ?? 'main,master'
)
  .split(',')
  .map((b) => b.trim())
  .filter(Boolean);

/**
 * Check if a post is marked as a draft. Drafts are visible in the dev server
 * and on Cloudflare Pages preview branches, but hidden from the production
 * build. Mark a post with `draft: true` in its frontmatter.
 */
export function isDraftPost(post: CollectionEntry<'blog'>): boolean {
  return post.data.draft === true;
}

/**
 * True when the current build should hide draft posts.
 *
 * Drafts are shown in the dev server and on any Cloudflare Pages preview
 * branch (so reviewers can read work-in-progress before it ships), and
 * hidden on production branches and in local production builds. Set
 * `SHOW_DRAFTS=true` to force drafts into any build.
 */
export function shouldHideDrafts(): boolean {
  if (import.meta.env.DEV) return false;
  if (process.env.SHOW_DRAFTS === 'true') return false;
  const cfBranch = process.env.CF_PAGES_BRANCH;
  if (cfBranch) return PRODUCTION_BRANCHES.includes(cfBranch);
  // No Cloudflare branch info (local `npm run build`): treat as production.
  return true;
}

/**
 * Unified visibility predicate used by every blog-listing consumer. Keeps
 * the filter rules (demo / scheduled / draft) in one place so listings,
 * tag pages, series pages, search, RSS, sitemap, and agent Markdown
 * endpoints stay in sync.
 */
export function isPostVisibleInProduction(
  post: CollectionEntry<'blog'>
): boolean {
  if (isDemoPost(post)) return false;
  if (!import.meta.env.DEV && isScheduledPost(post)) return false;
  if (isDraftPost(post) && shouldHideDrafts()) return false;
  return true;
}

/**
 * Check if a post is scheduled for the future (pubDate date > today's date).
 * Uses SITE_TIMEZONE (America/Bogota) so scheduling is consistent regardless
 * of where the build runs (Cloudflare, local, etc.). A post dated "March 4"
 * is scheduled until it's March 4 in Colombia.
 * Scheduled posts are excluded from production builds but visible in dev mode.
 */
export function isScheduledPost(post: CollectionEntry<'blog'>): boolean {
  const now = new Date();
  const todayInTz = now.toLocaleDateString('en-CA', {
    timeZone: SITE_TIMEZONE,
  });
  // pubDate is a calendar date (e.g. "2026-03-04"), not a UTC moment.
  // Astro parses it as midnight UTC, so converting to a timezone shifts it
  // back a day. Extract the original date string directly from the ISO format.
  const pubDateStr = post.data.pubDate.toISOString().slice(0, 10);
  return pubDateStr > todayInTz;
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
  const visiblePosts = allPosts.filter(isPostVisibleInProduction);
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

/**
 * Build a full timeline index for a specific tag and language.
 * Returns ALL matching posts as TimelineCardEntry[] (no pagination) — callers paginate client-side.
 * Reuses getBlogPosts for consistent filtering, sorting, and series enrichment.
 */
export async function getTimelineIndex(
  tag: string,
  lang: string
): Promise<TimelineCardEntry[]> {
  // pageSize: 9999 ensures all matching posts are returned (no actual pagination)
  const { postsResult } = await getBlogPosts({ lang, tag, pageSize: 9999 });

  return postsResult.map((post) => {
    const enriched = post as CollectionEntry<'blog'> & {
      seriesCurrent?: number;
      seriesTotal?: number;
      seriesTitle?: string;
    };
    return {
      slug: getPostSlug(post.id),
      lang: getPostLanguage(post.id),
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate.toISOString(),
      tags: post.data.tags ?? [],
      heroImage: post.data.heroImage,
      seriesSlug: post.data.series,
      seriesCurrent: enriched.seriesCurrent,
      seriesTotal: enriched.seriesTotal,
      seriesTitle: enriched.seriesTitle,
    };
  });
}

/**
 * Build a full timeline index for a specific series and language.
 * Returns ALL matching posts as TimelineCardEntry[] sorted by seriesOrder ascending (chapter order).
 * Callers paginate client-side.
 */
export async function getSeriesTimelineIndex(
  seriesSlug: string,
  lang: string
): Promise<TimelineCardEntry[]> {
  const allPosts = await getCollection('blog');
  const seriesTitleBySlug = await getSeriesTitleMap();

  const filteredPosts = allPosts.filter(
    (post) =>
      post.id.startsWith(`${lang}/`) &&
      post.data.series === seriesSlug &&
      isPostVisibleInProduction(post)
  );

  const seriesPositionById = getSeriesPositionById(filteredPosts);

  // Sort by seriesOrder ascending (chapter 1 first, then 2, 3...)
  const sorted = [...filteredPosts].sort((a, b) => {
    const orderA = a.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
  });

  return sorted.map((post) => {
    const position = seriesPositionById.get(post.id);
    return {
      slug: getPostSlug(post.id),
      lang: getPostLanguage(post.id),
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate.toISOString(),
      tags: post.data.tags ?? [],
      heroImage: post.data.heroImage,
      seriesSlug: post.data.series,
      seriesCurrent: position?.current,
      seriesTotal: position?.total,
      seriesTitle: seriesTitleBySlug.get(seriesSlug),
    };
  });
}

export async function getBlogPosts(
  params: BlogParamsType
): Promise<BlogPostsResultType> {
  const allPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  const tagsResult: CollectionEntry<'tags'>[] = await getCollection('tags');

  // Filter by language first (based on folder structure: en/, es/)
  const lang = params.lang || 'en';
  const langPosts = allPosts.filter(
    (post) => post.id.startsWith(`${lang}/`) && isPostVisibleInProduction(post)
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

  // Enrich posts with series position for BlogCard
  const enrichedPosts = posts.map((post) => ({
    ...post,
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
        isPostVisibleInProduction(post)
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
        isPostVisibleInProduction(post)
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
