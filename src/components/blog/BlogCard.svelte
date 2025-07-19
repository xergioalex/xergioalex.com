<script lang="ts">
import type { CollectionEntry } from 'astro:content';

export let post: CollectionEntry<'blog'>;
</script>

<article class="article-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
  {#if post.data.heroImage}
    <img 
      src={post.data.heroImage} 
      alt={post.data.title}
      class="w-full h-48 object-cover"
    />
  {/if}
  <div class="p-6">
    <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
      <a href={`/blog/${post.id}/`} class="hover:text-blue-600 dark:hover:text-blue-400">
        {post.data.title}
      </a>
    </h2>
    <p class="text-gray-600 dark:text-gray-300 mb-4">
      {post.data.description}
    </p>
    <div class="flex justify-between items-center">
      <time class="text-sm text-gray-500 dark:text-gray-400">
        {post.data.pubDate.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </time>
                    {#if post.data.tags && post.data.tags.length > 0}
                <div class="flex gap-1">
                  {#each post.data.tags as tag}
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