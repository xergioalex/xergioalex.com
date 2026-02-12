<script lang="ts">
import { getTranslations } from '@/lib/translations';

export let status: string = 'published';
export let lang: string = 'en';
export let pubDate: Date | string | undefined = undefined;
export let size: 'sm' | 'md' | 'lg' = 'sm';
export let isDemo: boolean = false;

$: t = getTranslations(lang);

const statusStyles = {
  draft:
    'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700',
  scheduled:
    'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  demo: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

$: formattedPubDate =
  pubDate && status.includes('scheduled')
    ? new Date(pubDate).toLocaleDateString(t.dateLocale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

$: showContentStatus = status !== 'published';
</script>

{#if isDemo || showContentStatus}
  <span class="inline-flex items-center gap-1">
    {#if isDemo}
      <span
        class="border rounded-md font-medium {sizeClasses[size]} {statusStyles.demo}"
      >
        {t.postStatus.demo}
      </span>
    {/if}
    {#if status === 'draft' || status === 'draft+scheduled'}
      <span
        class="border rounded-md font-medium {sizeClasses[size]} {statusStyles.draft}"
      >
        {t.postStatus.draft}
      </span>
    {/if}
    {#if status === 'scheduled' || status === 'draft+scheduled'}
      <span
        class="border rounded-md font-medium {sizeClasses[size]} {statusStyles.scheduled}"
      >
        {t.postStatus.scheduled}
        {#if formattedPubDate && size !== 'sm'}
          <span class="opacity-75">· {formattedPubDate}</span>
        {/if}
      </span>
    {/if}
  </span>
{/if}
