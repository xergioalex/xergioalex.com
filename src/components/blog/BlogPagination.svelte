<script>
import { getTranslations } from '@/lib/translations';

export let currentPage = 1;
export let totalPages = 1;
export let isSearchMode = false;
export let onPageChange = null;
export let currentTag = null;
export let lang = 'en';

$: t = getTranslations(lang);
$: basePrefix = lang === 'es' ? '/es' : '';

function handlePageChange(page) {
  if (isSearchMode && onPageChange) {
    onPageChange(page);
  }
}

function getPageUrl(page) {
  if (currentTag) {
    // Tag view
    if (page === 1) {
      return `${basePrefix}/blog/tag/${currentTag}/`;
    } else {
      return `${basePrefix}/blog/tag/${currentTag}/page/${page}/`;
    }
  } else {
    // General blog view
    if (page === 1) {
      return `${basePrefix}/blog/`;
    } else {
      return `${basePrefix}/blog/page/${page}/`;
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
            {t.previous}
          </button>
        {:else}
          <a
            href={getPageUrl(currentPage - 1)}
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {t.previous}
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
            {t.next}
          </button>
        {:else}
          <a
            href={getPageUrl(currentPage + 1)}
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {t.next}
          </a>
        {/if}
      {/if}
    </nav>
  </div>
{/if} 