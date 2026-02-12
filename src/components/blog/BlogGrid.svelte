<script>
import { getTranslations } from '@/lib/translations';
import BlogCard from './BlogCard.svelte';
import BlogPagination from './BlogPagination.svelte';

export let posts;
export const showPagination = false;
export const currentPage = 1;
export const totalPages = 1;
export const currentTag = undefined;
export let lang = 'en';
export let isDev = false;
export let isPreviewMode = false;

$: t = getTranslations(lang);
</script>

{#if posts && posts.length > 0}
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each posts as post}
      <BlogCard {post} {lang} {isDev} {isPreviewMode} />
    {/each}
  </div>
{:else}
  <div class="rounded-xl border border-dashed border-gray-300 py-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
    {t.noPostsAvailable}
  </div>
{/if}

{#if showPagination}
  <BlogPagination {currentPage} {totalPages} {lang} />
{/if} 