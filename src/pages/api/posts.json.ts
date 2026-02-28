import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import {
  getPostLanguage,
  getPostSlug,
  getPostStatus,
  isDemoPost,
  isPostVisibleInProduction,
} from '@/lib/blog';
import { isPreviewFeaturesEnabled } from '@/lib/env';

export const GET: APIRoute = async () => {
  try {
    const allPosts = await getCollection('blog');

    // Create a lightweight search index with language info
    // In production (main branch), only include published posts
    const includeHidden = isPreviewFeaturesEnabled();
    const searchIndex = allPosts
      .filter((post) => {
        if (!includeHidden) return isPostVisibleInProduction(post);
        return true;
      })
      .map((post) => ({
        id: post.id,
        slug: getPostSlug(post.id),
        lang: getPostLanguage(post.id),
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate.toISOString(),
        tags: post.data.tags || [],
        heroImage: post.data.heroImage,
        status: getPostStatus(post),
        isDemo: isDemoPost(post),
        draft: post.data.draft || false,
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
