<script>
import { onMount } from 'svelte';
import { BLOG_PAGE_SIZE } from '@/lib/constances';
import { createSearchIndex, searchPosts } from '@/lib/search';
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
export let isDev = false;

// Client-side preview mode detection (Astro static mode can't read query params server-side)
let isPreviewMode = false;

// Performance: Debounce timing (reduced for snappier feel)
const DEBOUNCE_MS = 200;

// Get translations based on language
$: t = getTranslations(lang);

// Server always sends only published posts (includeHidden: false), so no client-side filter needed
$: visiblePosts = postsResult;

// Extract tag names from CollectionEntry objects
$: displayTags = tagsResult.map((tag) => tag.data.name);

let searchQuery = '';
let searchResults = [];
let searchResultsWithMatches = [];
let isSearching = false;
let isLoading = false;
let isLoadingIndex = false;
let loadError = false;
let searchIndex = [];
let fuseIndex = null;
let indexLoaded = false;
let searchPagination = {
  currentPage: 1,
  totalPages: 1,
  totalPosts: 0,
};

// Performance: Search result cache (bounded to prevent memory leaks)
let searchCache = new Map();
const MAX_CACHE_SIZE = 50;

function getCacheKey(query, tag) {
  return `${query || ''}-${tag || ''}`;
}

function clearCache() {
  searchCache.clear();
}

// Debounce timer
let searchTimeout;

// Load search index
async function loadSearchIndex() {
  if (isLoadingIndex || indexLoaded) return;

  isLoadingIndex = true;
  loadError = false;
  try {
    const response = await fetch('/api/posts.json');
    if (response.ok) {
      const allPosts = await response.json();
      const langPosts = allPosts.filter((post) => post.lang === lang);
      // In dev without preview mode, only index published (non-demo) posts
      searchIndex = isPreviewMode
        ? langPosts
        : langPosts.filter(
            (post) =>
              (!post.status || post.status === 'published') && !post.isDemo
          );
      fuseIndex = createSearchIndex(searchIndex);
      indexLoaded = true;
      clearCache();
    } else {
      loadError = true;
    }
  } catch (error) {
    loadError = true;
  } finally {
    isLoadingIndex = false;
  }
}

// Retry loading search index
function retryLoadIndex() {
  indexLoaded = false;
  loadSearchIndex();
}

// Ensure index is loaded (lazy loading)
async function ensureIndexLoaded() {
  if (indexLoaded) return;
  await loadSearchIndex();
}

function performSearch(query, page = 1) {
  if (!query.trim()) {
    isSearching = false;
    searchResults = [];
    searchResultsWithMatches = [];
    return;
  }

  if (!fuseIndex || !searchIndex || searchIndex.length === 0) {
    isLoading = false;
    return;
  }

  isLoading = true;
  isSearching = true;

  // Check cache first (for pagination)
  const cacheKey = getCacheKey(query, currentTag);
  const cached = searchCache.get(cacheKey);

  // Use cached full results if available
  let filteredResults;
  if (cached) {
    filteredResults = cached;
  } else {
    // Use Fuse.js for fuzzy search
    const fuseResults = searchPosts(fuseIndex, query);

    // Filter by tag if specified
    filteredResults = currentTag
      ? fuseResults.filter((result) => result.item.tags.includes(currentTag))
      : fuseResults;

    // Cache results (with size limit)
    if (searchCache.size >= MAX_CACHE_SIZE) {
      const firstKey = searchCache.keys().next().value;
      searchCache.delete(firstKey);
    }
    searchCache.set(cacheKey, filteredResults);
  }

  // Calculate pagination
  const limit = BLOG_PAGE_SIZE;
  const totalPosts = filteredResults.length;
  const pagesCount = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  // Extract post items and store matches for highlighting
  searchResults = paginatedResults.map((r) => r.item);
  searchResultsWithMatches = paginatedResults;

  searchPagination = {
    currentPage: page,
    totalPages: pagesCount,
    totalPosts,
    hasNextPage: page < pagesCount,
    hasPrevPage: page > 1,
  };

  isLoading = false;
}

function handleSearch(query) {
  searchQuery = query;

  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Show searching state immediately for better UX
  if (query.length >= 2) {
    isSearching = true;
  }

  searchTimeout = setTimeout(async () => {
    if (!indexLoaded) {
      await ensureIndexLoaded();
    }
    performSearch(query, 1);
  }, DEBOUNCE_MS);
}

// Handle search input focus - preload index
function handleSearchFocus() {
  ensureIndexLoaded();
}

// Detect preview mode and lazy load index on mount
onMount(() => {
  if (typeof window !== 'undefined') {
    // Detect preview mode from URL query params (client-side only, since Astro static mode
    // cannot read query params server-side)
    if (isDev) {
      const params = new URLSearchParams(window.location.search);
      isPreviewMode = params.get('preview') === 'all';
    }

    // Lazy load search index using requestIdleCallback
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => ensureIndexLoaded());
    } else {
      setTimeout(() => ensureIndexLoaded(), 1000);
    }
  }
});
</script>

<div class="main-container py-12 sm:py-16 lg:py-24">
  {#if isDev}
    <div class="mb-4 flex items-center gap-2 text-sm">
      {#if isPreviewMode}
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700 font-medium">
          {t.previewMode}
        </span>
        <a href="?" class="text-indigo-600 hover:underline dark:text-indigo-400">
          {t.showPublishedOnly}
        </a>
      {:else}
        <a href="?preview=all" class="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
          {t.showAllPosts}
        </a>
      {/if}
    </div>
  {/if}

  <BlogHeader
    {currentTag}
    tagsResult={displayTags}
    totalPosts={isSearching ? searchPagination.totalPosts : (currentTag ? visiblePosts.length : totalPostsAvailable)}
    currentPagePosts={isSearching ? searchResults.length : visiblePosts.length}
    currentPage={isSearching ? searchPagination.currentPage : currentPage}
    totalPages={isSearching ? searchPagination.totalPages : totalPages}
    {lang}
    {isPreviewMode}
  />
  
  <BlogSearchInput 
    bind:searchQuery
    {isSearching}
    resultsCount={searchPagination.totalPosts}
    on:search={(e) => handleSearch(e.detail)}
    on:focus={handleSearchFocus}
    {lang}
  />

  {#if loadError}
    <!-- Error state -->
    <div 
      class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4"
      role="alert"
    >
      <p>{t.loadError}</p>
      <button 
        class="underline mt-2 hover:no-underline"
        on:click={retryLoadIndex}
      >
        {t.retry}
      </button>
    </div>
  {:else if isLoadingIndex}
    <!-- Skeleton loading state -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _}
        <div class="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="bg-gray-200 dark:bg-gray-700 h-48"></div>
          <div class="p-6">
            <div class="bg-gray-200 dark:bg-gray-700 h-6 rounded w-3/4 mb-3"></div>
            <div class="bg-gray-200 dark:bg-gray-700 h-4 rounded w-full mb-2"></div>
            <div class="bg-gray-200 dark:bg-gray-700 h-4 rounded w-2/3"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else if isLoading}
    <div class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-500">{t.searching}</p>
    </div>
  {:else if isSearching}
    <SearchResults filteredPosts={searchResults} {searchQuery} {lang} searchResultsWithMatches={searchResultsWithMatches} {isDev} {isPreviewMode} />
    {#if searchPagination.totalPages > 1}
      <BlogPagination
        currentPage={searchPagination.currentPage}
        totalPages={searchPagination.totalPages}
        isSearchMode={true}
        onPageChange={(page) => performSearch(searchQuery, page)}
        {currentTag}
        {lang}
        {isPreviewMode}
      />
    {/if}
  {:else}
    <BlogGrid
      posts={visiblePosts}
      showPagination={totalPages > 1}
      {currentPage}
      {totalPages}
      {currentTag}
      {lang}
      {isDev}
      {isPreviewMode}
    />
    
    {#if totalPages > 1}
      <BlogPagination
        {currentPage}
        {totalPages}
        {currentTag}
        {lang}
        {isPreviewMode}
      />
    {/if}
  {/if}
</div>
