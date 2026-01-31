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
</script>

<div class="mb-10">
  <input
    bind:value={searchQuery}
    type="text"
    placeholder={t.searchPlaceholder}
    class="w-full md:w-1/2 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    on:input={handleInput}
  />
  
  {#if isSearching}
    <div class="mt-2 text-sm text-gray-600">
      {t.resultsFound(resultsCount)}
    </div>
  {/if}
</div> 