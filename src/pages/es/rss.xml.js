import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { getPostSlug, isPostVisibleInProduction } from '@/lib/blog';

export async function GET(context) {
  const allPosts = await getCollection('blog');
  const posts = allPosts.filter(
    (post) => post.id.startsWith('es/') && isPostVisibleInProduction(post)
  );
  return rss({
    title: 'XergioAleX',
    description: 'Sitio web personal y blog de Sergio Alexander Florez Galeano',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/es/blog/${getPostSlug(post.id)}/`,
      categories: post.data.tags || [],
    })),
  });
}
