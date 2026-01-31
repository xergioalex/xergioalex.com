<script>
import BlogCard from './BlogCard.svelte';
import BlogPagination from './BlogPagination.svelte';

export let posts;
export const showPagination = false;
export const currentPage = 1;
export const totalPages = 1;
export const currentTag = undefined;
export let lang = 'en';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each posts as post}
    <BlogCard {post} {lang} />
  {/each}
</div>

{#if showPagination}
  <BlogPagination {currentPage} {totalPages} {lang} />
{/if} 