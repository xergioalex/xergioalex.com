<script lang="ts">
import { onDestroy, onMount, tick } from 'svelte';
import { EVENTS, trackEvent } from '@/lib/analytics';
import type { TimelineCardEntry } from '@/lib/blog';
import { SITE_TIMEZONE } from '@/lib/constances';
import { getUrlPrefix, type Language } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

export let initialPosts: TimelineCardEntry[] = [];
export let totalCount: number = 0;
export let apiEndpoint: string;
export let lang: Language = 'en';
export let seriesTitle: string = '';
export let seriesDescription: string = '';
export let pageSize: number = 30;
export let emptyStateMessage: string = '';
export let topicTagNames: string[] = [];

$: t = getTranslations(lang);
$: prefix = getUrlPrefix(lang);

let renderedPosts: TimelineCardEntry[] = [...initialPosts];
let allPosts: TimelineCardEntry[] | null = null;
let loading = false;
let fetchError = false;
$: allLoaded = renderedPosts.length >= totalCount;

let sentinel: HTMLElement;
let observer: IntersectionObserver | null = null;

onMount(() => {
  if (allLoaded) return;
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loading && !allLoaded) {
        loadMore();
      }
    },
    { rootMargin: '200px' }
  );
  if (sentinel) observer.observe(sentinel);
});

onDestroy(() => {
  observer?.disconnect();
});

async function loadMore() {
  if (loading || allLoaded) return;
  loading = true;
  fetchError = false;
  try {
    if (!allPosts) {
      const res = await fetch(apiEndpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      allPosts = data.posts as TimelineCardEntry[];
    }
    const nextBatch = allPosts.slice(
      renderedPosts.length,
      renderedPosts.length + pageSize
    );
    renderedPosts = [...renderedPosts, ...nextBatch];
  } catch {
    fetchError = true;
  } finally {
    loading = false;
    await tick();
    reobserveSentinel();
  }
}

function reobserveSentinel(): void {
  if (!observer || !sentinel || allLoaded) return;
  observer.unobserve(sentinel);
  observer.observe(sentinel);
}

function isPostScheduled(pubDate: string): boolean {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return false;
  const todayInTz = new Date().toLocaleDateString('en-CA', {
    timeZone: SITE_TIMEZONE,
  });
  return pubDate.slice(0, 10) > todayInTz;
}

function formatDate(pubDate: string): string {
  return new Date(pubDate).toLocaleDateString(t.dateLocale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
</script>

{#if renderedPosts.length === 0 && !loading}
  <div class="text-center py-16">
    <p class="text-gray-600 dark:text-gray-300 text-lg">
      {emptyStateMessage || t.seriesPage.emptyState}
    </p>
  </div>
{:else}
  <!-- Series header -->
  <div class="max-w-7xl mx-auto mb-10 text-center">
    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
      {seriesTitle}
    </h1>
    {#if seriesDescription}
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
        {seriesDescription}
      </p>
    {/if}
    <div class="flex items-center justify-center gap-3">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-sm font-medium">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {totalCount} {t.seriesPage.chapters}
      </span>
      <!-- Progress bar -->
      <div class="flex items-center gap-2" aria-label={t.seriesPage.progress(renderedPosts.length, totalCount)}>
        <div class="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-500"
            style="width: {Math.round((renderedPosts.length / totalCount) * 100)}%"
          ></div>
        </div>
        <span class="text-xs text-gray-600 dark:text-gray-300">
          {t.seriesPage.progress(renderedPosts.length, totalCount)}
        </span>
      </div>
    </div>
  </div>

  <!-- Chapters list -->
  <div class="max-w-3xl mx-auto space-y-5">
    {#each renderedPosts as post, index}
      {@const chapterNum = post.seriesCurrent ?? index + 1}

      <article class="group flex gap-4 md:gap-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:-translate-y-0.5">

        <!-- Chapter number -->
        <div class="flex-shrink-0 w-16 md:w-20 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-900/10 border-r border-gray-100 dark:border-gray-700">
          <span class="text-xs font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider">
            {t.seriesPage.chapter}
          </span>
          <span class="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-200 mt-0.5">
            {chapterNum}
          </span>
        </div>

        <!-- Content -->
        <div class="flex-1 py-4 pr-4 md:py-5 md:pr-6 min-w-0">
          <div class="flex items-start gap-4">
            <div class="flex-1 min-w-0">
              <h2 class="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <!-- svelte-ignore a11y-click-events-have-key-events a11y-interactive-supports-focus -->
                <a
                  href={`${prefix}/blog/${post.slug}/`}
                  class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  on:click={() => trackEvent(EVENTS.TIMELINE_CLICK, { page: 'series', slug: post.slug })}
                >
                  {post.title}
                </a>
              </h2>

              <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {post.description}
              </p>

              <div class="flex flex-wrap items-center gap-2">
                <time class="text-xs text-gray-600 dark:text-gray-300">
                  {formatDate(post.pubDate)}
                </time>

                {#if isPostScheduled(post.pubDate)}
                  <span class="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    {t.scheduledBadge}
                  </span>
                {/if}

                {#if post.tags && post.tags.length > 0}
                  {#each post.tags.filter((tag) => !topicTagNames.includes(tag)) as tag}
                    <a
                      href={`${prefix}/blog/tag/${tag}/`}
                      class="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      #{t.tagNames[tag] || tag}
                    </a>
                  {/each}
                  {#each post.tags.filter((tag) => topicTagNames.includes(tag)) as topic}
                    <a
                      href={`${prefix}/blog/tag/${topic}/`}
                      class="text-xs px-2 py-0.5 rounded border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400 dark:hover:text-gray-100 transition-colors"
                    >
                      {t.tagNames[topic] || topic}
                    </a>
                  {/each}
                {/if}
              </div>
            </div>

            <!-- Hero thumbnail (desktop only) -->
            {#if post.heroImage}
              <a href={`${prefix}/blog/${post.slug}/`} class="hidden md:block flex-shrink-0">
                {#if post.heroWebpExists && post.heroImage.match(/\.(png|jpe?g)$/i)}
                  <picture>
                    <source srcset={post.heroImage.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      class="w-28 h-20 object-cover rounded-lg"
                      loading="lazy"
                      width="112"
                      height="80"
                    />
                  </picture>
                {:else}
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    class="w-28 h-20 object-cover rounded-lg"
                    loading="lazy"
                    width="112"
                    height="80"
                  />
                {/if}
              </a>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>

  <!-- Sentinel for IntersectionObserver -->
  {#if !allLoaded}
    <div bind:this={sentinel} aria-hidden="true" class="h-1 w-full"></div>
  {/if}

  <!-- Loading spinner -->
  {#if loading}
    <div role="status" class="flex justify-center py-8">
      <span class="sr-only">
        {lang === 'es' ? 'Cargando más capítulos…' : 'Loading more chapters…'}
      </span>
      <div
        aria-hidden="true"
        class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  {/if}

  <!-- Error state -->
  {#if fetchError}
    <div role="alert" class="text-center py-8">
      <p class="text-gray-600 dark:text-gray-300 mb-3">
        {lang === 'es' ? 'Error al cargar más capítulos.' : 'Failed to load more chapters.'}
      </p>
      <button
        on:click={loadMore}
        class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {t.retry}
      </button>
    </div>
  {/if}

  <!-- Series complete end cap -->
  {#if allLoaded && renderedPosts.length > 0}
    <div class="flex flex-col items-center gap-4 pt-8 pb-6">
      <div class="w-12 h-12 rounded-full bg-green-500 shadow-lg shadow-green-500/25 flex items-center justify-center ring-4 ring-green-500/10 dark:ring-green-500/20">
        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div class="bg-white dark:bg-gray-800 px-8 py-4 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 text-center">
        <p class="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {lang === 'es' ? 'Serie completa' : 'Series complete'}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {totalCount} {t.seriesPage.chapters}
        </p>
      </div>
    </div>
  {/if}
{/if}
