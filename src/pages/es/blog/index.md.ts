import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

import { getPostSlug, isDemoPost, isScheduledPost } from '@/lib/blog';
import { serializeBlogIndexToMarkdown } from '@/lib/markdown-for-agents';

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('blog');
  const posts = allPosts
    .filter((post) => {
      if (!post.id.startsWith('es/')) return false;
      if (isDemoPost(post)) return false;
      if (isScheduledPost(post)) return false;
      return true;
    })
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const entries = posts.map((post) => ({
    title: post.data.title,
    slug: getPostSlug(post.id),
    description: post.data.description,
    pubDate: post.data.pubDate,
    tags: post.data.tags,
  }));

  const markdown = serializeBlogIndexToMarkdown(entries, {
    lang: 'es',
    title: 'Blog de XergioAleX',
    description:
      'Blog técnico sobre ingeniería de software, DevOps, IA, trading y emprendimiento.',
  });

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
