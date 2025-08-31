<script>
export let currentTag;
export let tagsResult;
</script>

<h1 class="text-4xl font-extrabold mb-6">
  {
    currentTag
      ? `Artículos con tag: ${currentTag}`
      : "Artículos, Tutoriales & Historias"
  }
</h1>

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