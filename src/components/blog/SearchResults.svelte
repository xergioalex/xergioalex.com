<script>
import { getTranslations } from '@/lib/translations';
import BlogCard from './BlogCard.svelte';

export let filteredPosts = [];
export let searchQuery;
export let lang = 'en';
export let searchResultsWithMatches = [];

$: t = getTranslations(lang);
</script>

{#if filteredPosts && filteredPosts.length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredPosts as post, index}
      <BlogCard {post} {lang} searchResult={searchResultsWithMatches[index]} />
    {/each}
  </div>
{:else}
  <div class="text-center py-12">
    <p class="text-gray-500 dark:text-gray-400 text-lg">
      {t.noResults(searchQuery)}
    </p>
  </div>
{/if} 