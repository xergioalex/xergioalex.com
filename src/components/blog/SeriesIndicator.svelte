<script lang="ts">
import { onMount } from 'svelte';
import { getTranslations } from '@/lib/translations';

export let lang: string = 'en';
export let currentChapter: number;
export let totalChapters: number;
export let seriesTitle: string;

$: t = getTranslations(lang);
$: buttonText = t.seriesChapterOf(currentChapter, totalChapters);
$: progressPercent = Math.round((currentChapter / totalChapters) * 100);

let visible = false;

function scrollToSeries() {
  const el = document.getElementById('series-navigation');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

onMount(() => {
  const el = document.getElementById('series-navigation');
  if (!el) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = !entry.isIntersecting && entry.boundingClientRect.top > 0;
    },
    { threshold: 0 }
  );

  observer.observe(el);

  return () => observer.disconnect();
});
</script>

{#if visible}
  <button
    on:click={scrollToSeries}
    class="series-indicator fixed bottom-20 right-4 sm:right-6 z-40 flex items-center gap-3 rounded-full bg-white/95 pl-1.5 pr-4 py-1.5 text-sm font-medium shadow-lg ring-1 ring-blue-200 backdrop-blur-sm hover:shadow-xl dark:bg-gray-800/95 dark:ring-blue-700 transition-all duration-200 hover:-translate-y-0.5"
    aria-label="{buttonText} — {seriesTitle}"
  >
    <!-- Chapter progress ring -->
    <span class="relative flex h-8 w-8 shrink-0 items-center justify-center">
      <svg class="h-8 w-8 -rotate-90" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="none" stroke-width="2.5"
          class="stroke-blue-100 dark:stroke-blue-900" />
        <circle cx="16" cy="16" r="13" fill="none" stroke-width="2.5"
          stroke-dasharray="{81.68}"
          stroke-dashoffset="{81.68 - (81.68 * progressPercent / 100)}"
          stroke-linecap="round"
          class="stroke-blue-600 dark:stroke-blue-400" />
      </svg>
      <span class="absolute text-[10px] font-bold text-blue-700 dark:text-blue-300">
        {currentChapter}/{totalChapters}
      </span>
    </span>
    <!-- Label -->
    <span class="flex flex-col items-start leading-tight">
      <span class="text-xs text-gray-900 dark:text-white">{buttonText}</span>
      <span class="text-[10px] text-gray-600 dark:text-gray-300">{t.seriesToC} &darr;</span>
    </span>
  </button>
{/if}

<style>
  .series-indicator {
    animation: slideInRight 0.3s ease-out;
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(1rem);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
