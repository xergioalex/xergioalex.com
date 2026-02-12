<script>
import { getTranslations } from '@/lib/translations';
import BlogCard from './BlogCard.svelte';

export let filteredPosts = [];
export let searchQuery;
export let lang = 'en';
export let searchResultsWithMatches = [];
export let isDev = false;

$: t = getTranslations(lang);
$: basePrefix = lang === 'es' ? '/es' : '';
</script>

{#if filteredPosts && filteredPosts.length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredPosts as post, index}
      <BlogCard {post} {lang} {isDev} searchResult={searchResultsWithMatches[index]} />
    {/each}
  </div>
{:else}
  <div class="text-center py-12">
    <p class="text-gray-500 dark:text-gray-400 text-lg">
      {t.noResults(searchQuery)}
    </p>
    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      {t.noResultsSuggestion}
    </p>
    <a
      href={`${basePrefix}/blog/`}
      class="mt-4 inline-flex rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
    >
      {t.allPosts}
    </a>
  </div>
{/if} 