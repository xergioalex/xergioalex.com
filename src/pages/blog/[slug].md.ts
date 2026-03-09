import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

import { getPostSlug, isDemoPost, isScheduledPost } from '@/lib/blog';
import { serializePostToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getCollection('blog');
  const posts = allPosts.filter((post) => {
    if (!post.id.startsWith('en/')) return false;
    if (isDemoPost(post)) return false;
    if (isScheduledPost(post)) return false;
    return true;
  });
  return posts.map((post) => ({
    params: { slug: getPostSlug(post.id) },
    props: { post },
  }));
};

export const GET: APIRoute = ({ props }) => {
  const { post } = props;
  const slug = getPostSlug(post.id);
  const markdown = serializePostToAgentMarkdown(post, { slug, lang: 'en' });

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
