<script>
import { getTranslations } from '@/lib/translations';

export let currentTag;
export let tagsResult;
export let totalPosts = 0;
export let currentPagePosts = 0;
export let currentPage = 1;
export let totalPages = 1;
export let lang = 'en';

$: t = getTranslations(lang);
$: basePrefix = lang === 'es' ? '/es' : '';

// Translations for header content
$: headerTitle = currentTag ? t.postsTagged(currentTag) : t.blogDescription;
$: showingText =
  lang === 'es'
    ? `Mostrando ${currentPagePosts} de ${totalPosts} artículos`
    : `Showing ${currentPagePosts} of ${totalPosts} articles`;
$: availableText =
  lang === 'es'
    ? `${totalPosts} artículo${totalPosts !== 1 ? 's' : ''} disponible${totalPosts !== 1 ? 's' : ''}`
    : `${totalPosts} article${totalPosts !== 1 ? 's' : ''} available`;
</script>

<h1 class="text-4xl font-extrabold mb-6">
  {headerTitle}
</h1>

<!-- Post counter -->
<div class="mb-4 text-gray-600 dark:text-gray-400">
  {#if totalPages > 1}
    <p class="text-sm">
      {showingText}
      <span class="text-gray-500">({t.pageOf(currentPage, totalPages)})</span>
    </p>
  {:else}
    <p class="text-sm">
      {availableText}
    </p>
  {/if}
</div>

<div class="mb-8 flex flex-wrap gap-2">
  <!-- Link to all articles -->
  <a
    href={`${basePrefix}/blog/`}
    class={`text-xs px-2 py-0.5 rounded font-semibold ${
      !currentTag
        ? "bg-blue-500 text-white"
        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
    }`}
  >
    {t.allPosts}
  </a>

  <!-- Individual tags -->
  {#each tagsResult as tag}
    <a
      href={`${basePrefix}/blog/tag/${tag}/`}
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