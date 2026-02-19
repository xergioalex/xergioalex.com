import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { getPostLanguage, getPostSlug, isDemoPost } from '@/lib/blog';

export const GET: APIRoute = async () => {
  try {
    const allPosts = await getCollection('blog');

    // Create a lightweight search index with language info
    // Filter out demo posts (they are dev-only reference posts)
    const searchIndex = allPosts
      .filter((post) => !isDemoPost(post))
      .map((post) => ({
        id: post.id,
        slug: getPostSlug(post.id),
        lang: getPostLanguage(post.id),
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate.toISOString(),
        tags: post.data.tags || [],
        heroImage: post.data.heroImage,
      }));

    return new Response(JSON.stringify(searchIndex), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Search index error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
