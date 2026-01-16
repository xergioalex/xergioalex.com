<script>
export let currentTag;
export let tagsResult;
export let totalPosts = 0;
export let currentPagePosts = 0;
export let currentPage = 1;
export let totalPages = 1;
</script>

<h1 class="text-4xl font-extrabold mb-6">
  {
    currentTag
      ? `Artículos con tag: ${currentTag}`
      : "Artículos, Tutoriales & Historias"
  }
</h1>

<!-- Contador de posts -->
<div class="mb-4 text-gray-600 dark:text-gray-400">
  {#if totalPages > 1}
    <p class="text-sm">
      Mostrando {currentPagePosts} de {totalPosts} artículos 
      <span class="text-gray-500">(página {currentPage} de {totalPages})</span>
    </p>
  {:else}
    <p class="text-sm">
      {totalPosts} artículo{totalPosts !== 1 ? 's' : ''} disponible{totalPosts !== 1 ? 's' : ''}
    </p>
  {/if}
</div>

<div class="mb-8 flex flex-wrap gap-2">
  <!-- Enlace para volver a todos los artículos -->
  <a
    href="/blog/"
    class={`text-xs px-2 py-0.5 rounded font-semibold ${
      !currentTag
        ? "bg-blue-500 text-white"
        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
    }`}
  >
    Todos los artículos
  </a>

  <!-- Tags individuales -->
  {#each tagsResult as tag}
    <a
      href={`/blog/tag/${tag}/`}
      class={`text-xs px-2 py-0.5 rounded font-semibold ${
        currentTag === tag
          ? "bg-blue-500 text-white"
          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
      }`}
    >
      #{tag}
    </a>
  {/each}
</div> 