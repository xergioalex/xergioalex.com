<script>
import BlogGrid from './BlogGrid.svelte';
import BlogHeader from './BlogHeader.svelte';
import BlogSearchInput from './BlogSearchInput.svelte';
import SearchResults from './SearchResults.svelte';

export let allPosts;
export let postsResult;
export let currentTag;
export let totalPages;
export let currentPage;

let searchQuery = '';
let filteredPosts = [];
let isSearching = false;

function filterArticles(query) {
  searchQuery = query;
  isSearching = query.trim().length > 0;

  if (!isSearching) {
    filteredPosts = [];
    return;
  }

  const searchTerm = query.toLowerCase();
  filteredPosts = allPosts.filter((post) => {
    const title = post.data.title.toLowerCase();
    const description = post.data.description.toLowerCase();
    const tags = post.data.tags?.join(' ').toLowerCase() || '';

    return (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      tags.includes(searchTerm)
    );
  });
}

// Get all unique tags from all posts
$: allTags = Array.from(
  new Set(allPosts.flatMap((post) => post.data.tags ?? []))
);
</script>

<div class="main-container py-24">
  <BlogHeader {currentTag} {allTags} />
  
  <BlogSearchInput 
    bind:searchQuery
    {isSearching}
    resultsCount={filteredPosts.length}
    on:search={(e) => filterArticles(e.detail)}
  />

  {#if isSearching}
    <SearchResults {filteredPosts} {searchQuery} />
  {:else}
    <BlogGrid 
      posts={postsResult}
      showPagination={totalPages > 1}
      {currentPage}
      {totalPages}
      {currentTag}
    />
  {/if}
</div> 