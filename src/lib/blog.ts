import { type CollectionEntry, getCollection } from 'astro:content';
import { BLOG_PAGE_SIZE } from './constances';
import type { BlogParamsType, BlogPostsResultType } from './types';

/**
 * Get the slug from a post ID (removes language prefix)
 * e.g., "en/first-post" -> "first-post"
 */
export function getPostSlug(postId: string): string {
  const parts = postId.split('/');
  return parts.length > 1 ? parts.slice(1).join('/') : postId;
}

/**
 * Get the language from a post ID
 * e.g., "en/first-post" -> "en"
 */
export function getPostLanguage(postId: string): string {
  const parts = postId.split('/');
  return parts.length > 1 ? parts[0] : 'en';
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

  // Ordenar por fecha de publicación (más reciente primero)
  posts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  // Calcular totalPages basándose en los posts filtrados
  const totalPages = Math.ceil(
    posts.length / (params.pageSize ?? BLOG_PAGE_SIZE)
  );

  // Aplicar paginación
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
