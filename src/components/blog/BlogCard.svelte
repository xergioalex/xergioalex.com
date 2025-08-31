<script lang="ts">
import type { CollectionEntry } from 'astro:content';

export let post: CollectionEntry<'blog'>;

// Helper function to get post data regardless of structure
function getPostData() {
  // If post has data property (CollectionEntry structure)
  if (post.data) {
    return {
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      tags: post.data.tags || [],
      heroImage: post.data.heroImage,
    };
  }
  // If post is flat structure (search index)
  return {
    title: post.title,
    description: post.description,
    pubDate: new Date(post.pubDate),
    tags: post.tags || [],
    heroImage: post.heroImage,
  };
}

$: postData = getPostData();
</script>

<article class="article-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
  {#if postData.heroImage}
    <img 
      src={postData.heroImage} 
      alt={postData.title}
      class="w-full h-48 object-cover"
    />
  {/if}
  <div class="p-6">
    <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
      <a href={`/blog/${post.id || post.slug}/`} class="hover:text-blue-600 dark:hover:text-blue-400">
        {postData.title}
      </a>
    </h2>
    <p class="text-gray-600 dark:text-gray-300 mb-4">
      {postData.description}
    </p>
    <div class="flex justify-between items-center">
      <time class="text-sm text-gray-500 dark:text-gray-400">
        {postData.pubDate.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </time>
      {#if postData.tags && postData.tags.length > 0}
        <div class="flex gap-1">
          {#each postData.tags as tag}
            <a 
              href={`/blog/tag/${tag}/`}
              class="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              #{tag}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</article> 