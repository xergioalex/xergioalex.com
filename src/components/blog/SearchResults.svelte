<script>
import BlogCard from './BlogCard.svelte';

export let filteredPosts = [];
export let searchQuery;
</script>

{#if filteredPosts && filteredPosts.length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredPosts as post}
      <BlogCard {post} />
    {/each}
  </div>
{:else}
  <div class="text-center py-12">
    <p class="text-gray-500 dark:text-gray-400 text-lg">
      No se encontraron artículos que coincidan con "{searchQuery}"
    </p>
  </div>
{/if} 