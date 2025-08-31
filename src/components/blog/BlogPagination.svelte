<script>
export let currentPage = 1;
export let totalPages = 1;
export let isSearchMode = false;
export let onPageChange = null;

function handlePageChange(page) {
  if (isSearchMode && onPageChange) {
    onPageChange(page);
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
            href={currentPage === 2 ? '/blog/' : `/blog/page/${currentPage - 1}/`}
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
            href={page === 1 ? '/blog/' : `/blog/page/${page}/`}
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
            href={`/blog/page/${currentPage + 1}/`}
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Siguiente
          </a>
        {/if}
      {/if}
    </nav>
  </div>
{/if} 