import { type CollectionEntry, getCollection } from 'astro:content';
import { BLOG_PAGE_SIZE } from './constances';
import type { BlogParamsType, BlogPostsResultType } from './types';

export async function getBlogPosts(
  params: BlogParamsType
): Promise<BlogPostsResultType> {
  const allPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  const allTags: CollectionEntry<'tags'>[] = await getCollection('tags');
  let posts: CollectionEntry<'blog'>[] = allPosts;

  // Primero filtrar por tag si se especifica
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

  const result: BlogPostsResultType = {
    allTags: allTags,
    postsResult: posts,
    currentPage: params.page ?? 1,
    pageSize: params.pageSize ?? BLOG_PAGE_SIZE,
    totalPages: totalPages,
  };
  return result;
}
