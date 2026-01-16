<script>
export let currentPage = 1;
export let totalPages = 1;
export let isSearchMode = false;
export let onPageChange = null;
export let currentTag = null;

function handlePageChange(page) {
  if (isSearchMode && onPageChange) {
    onPageChange(page);
  }
}

function getPageUrl(page) {
  console.log(`🔗 getPageUrl(${page}) called with currentTag:`, currentTag);

  if (currentTag) {
    // Si estamos en una vista de tag
    if (page === 1) {
      const url = `/blog/tag/${currentTag}/`;
      console.log(`  Tag view, page ${page}: ${url}`);
      return url;
    } else {
      const url = `/blog/tag/${currentTag}/page/${page}/`;
      console.log(`  Tag view, page ${page}: ${url}`);
      return url;
    }
  } else {
    // Si estamos en la vista general del blog
    if (page === 1) {
      const url = '/blog/';
      console.log(`  General view, page ${page}: ${url}`);
      return url;
    } else {
      const url = `/blog/page/${page}/`;
      console.log(`  General view, page ${page}: ${url}`);
      return url;
    }
  }
}
</script>

{#if totalPages > 1}
  <div class="mt-12 flex justify-center">
    <nav class="flex items-center space-x-2">
      {#if currentPage > 1}
        {#if isSearchMode}
          <button
            on:click={() => handlePageChange(currentPage - 1)}
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Anterior
          </button>
        {:else}
          <a
            href={getPageUrl(currentPage - 1)}
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Anterior
          </a>
        {/if}
      {/if}

      {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
        {#if isSearchMode}
          <button
            on:click={() => handlePageChange(page)}
            class={`px-3 py-2 text-sm font-medium rounded-md ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        {:else}
          <a
            href={getPageUrl(page)}
            class={`px-3 py-2 text-sm font-medium rounded-md ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </a>
        {/if}
      {/each}

      {#if currentPage < totalPages}
        {#if isSearchMode}
          <button
            on:click={() => handlePageChange(currentPage + 1)}
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Siguiente
          </button>
        {:else}
          <a
            href={getPageUrl(currentPage + 1)}
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Siguiente
          </a>
        {/if}
      {/if}
    </nav>
  </div>
{/if} 