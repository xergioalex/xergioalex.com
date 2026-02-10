import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

/**
 * Extract slug without language prefix
 * e.g., "en/first-post" -> "first-post"
 */
function getSlugFromId(id: string): string {
  if (id.startsWith('en/') || id.startsWith('es/')) {
    return id.substring(3);
  }
  return id;
}

/**
 * Extract language from post id
 * e.g., "en/first-post" -> "en"
 */
function getLangFromId(id: string): string {
  if (id.startsWith('es/')) return 'es';
  return 'en';
}

export const GET: APIRoute = async () => {
  try {
    const allPosts = await getCollection('blog');

    // Create a lightweight search index with language info
    const searchIndex = allPosts.map((post) => ({
      id: post.id,
      slug: getSlugFromId(post.id),
      lang: getLangFromId(post.id),
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
