<script>
import { createEventDispatcher } from 'svelte';

export let searchQuery;
export let isSearching;
export let resultsCount;

const dispatch = createEventDispatcher();

function handleInput(e) {
  dispatch('search', e.target.value);
}
</script>

<div class="mb-10">
  <input
    bind:value={searchQuery}
    type="text"
    placeholder="Buscar artículos..."
    class="w-full md:w-1/2 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    on:input={handleInput}
  />
  
  {#if isSearching}
    <div class="mt-2 text-sm text-gray-600">
      {resultsCount} resultado{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}
    </div>
  {/if}
</div> 