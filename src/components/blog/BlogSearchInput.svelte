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
  <input
    bind:value={searchQuery}
    type="search"
    placeholder={t.searchPlaceholder}
    aria-label={t.searchPlaceholder}
    aria-describedby={isSearching ? 'search-results-count' : undefined}
    class="w-full md:w-1/2 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-800 dark:text-white"
    on:input={handleInput}
    on:focus={handleFocus}
    on:keydown={handleKeyDown}
  />
  
  {#if isSearching}
    <div id="search-results-count" class="mt-2 text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
      {t.resultsFound(resultsCount)}
    </div>
  {/if}
</div> 