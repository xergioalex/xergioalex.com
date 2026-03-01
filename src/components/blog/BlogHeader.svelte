<script>
import { getUrlPrefix } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

export let currentTag;
export let currentTopic = '';
export let tagsResult;
export let topicsResult = [];
export let totalPosts = 0;
export let currentPagePosts = 0;
export let currentPage = 1;
export let totalPages = 1;
export let lang = 'en';

$: t = getTranslations(lang);
$: basePrefix = getUrlPrefix(lang);

// Translations for header content
$: headerTitle = currentTopic
  ? t.postsWithTopic(t.topicNames[currentTopic] || currentTopic)
  : currentTag
    ? t.postsTagged(t.tagNames[currentTag] || currentTag)
    : t.blogDescription;
$: headerSubtitle = currentTopic
  ? t.topicDescriptions[currentTopic] || ''
  : currentTag
    ? t.tagDescriptions[currentTag] || t.blogDescription
    : t.blogDescription;
$: showingText = t.showingArticles(currentPagePosts, totalPosts);
$: availableText = t.articlesAvailable(totalPosts);
</script>

<h1 class="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
  {headerTitle}
</h1>
<p class="mb-5 max-w-3xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
  {headerSubtitle}
</p>

<!-- Post counter -->
<div class="mb-4 text-gray-600 dark:text-gray-300">
  {#if totalPages > 1}
    <p class="text-sm">
      {showingText}
      <span class="text-gray-600 dark:text-gray-300">({t.pageOf(currentPage, totalPages)})</span>
    </p>
  {:else}
    <p class="text-sm">
      {availableText}
    </p>
  {/if}
</div>

<div class="mb-10 flex flex-wrap gap-2">
  <!-- Link to all articles -->
  <a
    href={`${basePrefix}/blog/`}
    class={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
      !currentTag
        ? "bg-blue-500 text-white shadow-sm"
        : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
    }`}
  >
    {t.allPosts}
  </a>

  <!-- Individual tags -->
  {#each tagsResult as tag}
    <a
      href={`${basePrefix}/blog/tag/${tag}/`}
      class={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        currentTag === tag
          ? "bg-blue-500 text-white shadow-sm"
          : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
      }`}
    >
      #{t.tagNames[tag] || tag}
    </a>
  {/each}
</div>

{#if topicsResult && topicsResult.length > 0}
  <div class="mb-10 flex flex-wrap gap-1.5">
    {#each topicsResult as topic}
      <a
        href={`${basePrefix}/blog/topic/${topic}/`}
        class={`rounded-full px-2.5 py-0.5 text-xs transition-colors ${
          currentTopic === topic
            ? "border border-gray-800 bg-gray-800 text-white dark:border-gray-200 dark:bg-gray-200 dark:text-gray-900"
            : "border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400 dark:hover:text-gray-100"
        }`}
      >
        {t.topicNames[topic] || topic}
      </a>
    {/each}
  </div>
{/if} 