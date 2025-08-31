import { type CollectionEntry, getCollection } from 'astro:content';
import { BLOG_PAGE_SIZE } from './constances';
import type { BlogParamsType, BlogPostsResultType } from './types';

export async function getBlogPosts(
  params: BlogParamsType
): Promise<BlogPostsResultType> {
  let allPosts: CollectionEntry<'blog'>[] = await getCollection('blog');
  let allTags: CollectionEntry<'tags'>[] = await getCollection('tags');
  let posts: CollectionEntry<'blog'>[] = allPosts;

  // Primero filtrar por tag si se especifica
  if (params.tag) {
    posts = posts.filter((post) =>
      post.data.tags?.includes(params.tag as string)
    );
    console.log(
      `Filtrado por tag "${params.tag}": ${posts.length} posts encontrados`
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
    console.log(
      `Página ${params.page}: posts ${startIndex} a ${endIndex} (${posts.length} posts)`
    );
  } else {
    posts = posts.slice(0, params.pageSize ?? BLOG_PAGE_SIZE);
    console.log(`Primera página: ${posts.length} posts`);
  }

  let result: BlogPostsResultType = {
    allTags: allTags,
    postsResult: posts,
    currentPage: params.page ?? 1,
    pageSize: params.pageSize ?? BLOG_PAGE_SIZE,
    totalPages: totalPages,
  };

  console.log(
    `Resultado: ${posts.length} posts en página ${result.currentPage} de ${totalPages} páginas`
  );
  return result;
}
