<script>
import { createEventDispatcher } from 'svelte';
import { getTranslations } from '@/lib/translations';

export let searchQuery;
export let isSearching;
export let resultsCount;
export let lang = 'en';

$: t = getTranslations(lang);

const dispatch = createEventDispatcher();

function handleInput(e) {
  dispatch('search', e.target.value);
}

function handleFocus() {
  dispatch('focus');
}

function handleKeyDown(e) {
  // Escape clears search
  if (e.key === 'Escape') {
    searchQuery = '';
    dispatch('search', '');
  }
}
</script>

<div class="mb-10">
  <div class="flex w-full max-w-2xl items-center gap-2">
    <input
      bind:value={searchQuery}
      type="search"
      placeholder={t.searchPlaceholder}
      aria-label={t.searchPlaceholder}
      aria-describedby={isSearching ? 'search-results-count' : undefined}
      class="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      on:input={handleInput}
      on:focus={handleFocus}
      on:keydown={handleKeyDown}
    />
    {#if searchQuery}
      <button
        type="button"
        class="rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        on:click={() => {
          searchQuery = '';
          dispatch('search', '');
        }}
      >
        {t.clearSearch}
      </button>
    {/if}
  </div>
  <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">{t.searchHint}</p>
  
  {#if isSearching}
    <div id="search-results-count" class="mt-2 text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
      {t.resultsFound(resultsCount)}
    </div>
  {/if}
</div> 