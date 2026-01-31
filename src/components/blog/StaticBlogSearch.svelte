<script>
import { onMount } from 'svelte';
import { BLOG_PAGE_SIZE } from '@/lib/constances';
import { getTranslations } from '@/lib/translations';
import BlogGrid from './BlogGrid.svelte';
import BlogHeader from './BlogHeader.svelte';
import BlogPagination from './BlogPagination.svelte';
import BlogSearchInput from './BlogSearchInput.svelte';
import SearchResults from './SearchResults.svelte';

export let postsResult;
export let currentTag;
export let totalPages;
export let currentPage;
export let tagsResult = [];
export let totalPostsAvailable = 0;
export let lang = 'en';

// Get translations based on language
$: t = getTranslations(lang);

// Extract tag names from CollectionEntry objects for display
$: displayTags = tagsResult.map((tag) => tag.data.name);

let searchQuery = '';
let searchResults = [];
let isSearching = false;
let isLoading = false;
let isLoadingIndex = false;
let searchIndex = [];
let searchPagination = {
  currentPage: 1,
  totalPages: 1,
  totalPosts: 0,
};

// Debounce function to avoid too many searches
let searchTimeout;

// Load search index on component mount
async function loadSearchIndex() {
  if (isLoadingIndex) return; // Prevent multiple simultaneous loads

  isLoadingIndex = true;
  try {
    const response = await fetch('/api/posts.json');
    if (response.ok) {
      searchIndex = await response.json();
    } else {
      console.error('❌ Failed to load search index:', response.status);
    }
  } catch (error) {
    console.error('❌ Failed to load search index:', error);
  } finally {
    isLoadingIndex = false;
  }
}

function performSearch(query, page = 1) {
  if (!query.trim()) {
    isSearching = false;
    searchResults = [];
    return;
  }

  // Check if search index is loaded
  if (!searchIndex || searchIndex.length === 0) {
    console.warn('Search index not loaded yet');
    isLoading = false;
    return;
  }

  isLoading = true;
  isSearching = true;

  // Simulate async search for better UX
  setTimeout(() => {
    const searchTerm = query.toLowerCase();

    // Filter posts based on language, search query and tag
    const filteredPosts = searchIndex.filter((post) => {
      // Filter by language first
      const matchesLang = post.lang === lang;

      const title = post.title.toLowerCase();
      const description = post.description.toLowerCase();
      const tags = post.tags.join(' ').toLowerCase();

      const matchesSearch =
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        tags.includes(searchTerm);

      const matchesTag = !currentTag || post.tags.includes(currentTag);

      return matchesLang && matchesSearch && matchesTag;
    });

    // Sort by publication date (newest first)
    filteredPosts.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    // Calculate pagination
    const limit = BLOG_PAGE_SIZE;
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    searchResults = paginatedPosts;
    searchPagination = {
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    console.log('🔍 Search pagination updated:', {
      currentPage: page,
      totalPages,
      totalPosts,
      resultsShown: paginatedPosts.length,
    });

    isLoading = false;
  }, 100);
}

function handleSearch(query) {
  searchQuery = query;

  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Debounce search
  searchTimeout = setTimeout(() => {
    // If search index is not loaded yet, try to load it first
    if (!searchIndex || searchIndex.length === 0) {
      loadSearchIndex().then(() => {
        performSearch(query, 1);
      });
    } else {
      performSearch(query, 1);
    }
  }, 300);
}

// Load search index when component mounts
onMount(() => {
  loadSearchIndex();
});

// tagsResult now comes from props, containing all available tags
</script>

<div class="main-container py-24">
  <BlogHeader 
    {currentTag} 
    tagsResult={displayTags}
    totalPosts={isSearching ? searchPagination.totalPosts : (currentTag ? postsResult.length : totalPostsAvailable)}
    currentPagePosts={isSearching ? searchResults.length : postsResult.length}
    currentPage={isSearching ? searchPagination.currentPage : currentPage}
    totalPages={isSearching ? searchPagination.totalPages : totalPages}
    {lang}
  />
  
  <BlogSearchInput 
    bind:searchQuery
    {isSearching}
    resultsCount={searchPagination.totalPosts}
    on:search={(e) => handleSearch(e.detail)}
    {lang}
  />

  {#if isLoadingIndex}
    <div class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-500">{t.loadingIndex}</p>
    </div>
  {:else if isLoading}
    <div class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-500">{t.searching}</p>
    </div>
  {:else if isSearching}
    <SearchResults filteredPosts={searchResults} {searchQuery} {lang} />
    {#if searchPagination.totalPages > 1}
      <BlogPagination 
        currentPage={searchPagination.currentPage} 
        totalPages={searchPagination.totalPages} 
        isSearchMode={true}
        onPageChange={(page) => performSearch(searchQuery, page)}
        {currentTag}
        {lang}
      />
    {/if}
  {:else}
    <BlogGrid 
      posts={postsResult}
      showPagination={totalPages > 1}
      {currentPage}
      {totalPages}
      {currentTag}
      {lang}
    />
    
    {#if totalPages > 1}
      <BlogPagination 
        {currentPage}
        {totalPages}
        {currentTag}
        {lang}
      />
    {/if}
  {/if}
</div> 