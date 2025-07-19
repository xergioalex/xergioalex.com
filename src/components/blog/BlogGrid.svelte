<script>
  import BlogCard from './BlogCard.svelte';
  import BlogPagination from './BlogPagination.svelte';
  
  export let posts;
  export let showPagination = false;
  export let currentPage = 1;
  export let totalPages = 1;
  export let currentTag = undefined;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each posts as post}
    <BlogCard {post} />
  {/each}
</div>

{#if showPagination}
  <BlogPagination {currentPage} {totalPages} />
{/if} 