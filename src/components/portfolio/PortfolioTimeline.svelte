<script lang="ts">
import { getUrlPrefix } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

interface PostData {
  id: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    heroImage?: string;
    tags?: string[];
  };
}

export let posts: PostData[] = [];
export let lang: string = 'en';

$: t = getTranslations(lang);
$: prefix = getUrlPrefix(lang);

function getPostSlug(postId: string): string {
  const parts = postId.split('/');
  const filename = parts.length > 1 ? parts.slice(1).join('/') : postId;
  // Strip date prefix (YYYY-MM-DD.) if present
  return filename.replace(/^\d{4}-\d{2}-\d{2}_/, '');
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString(t.dateLocale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatYear(date: Date): string {
  return new Date(date).getFullYear().toString();
}

function formatYearMonth(date: Date): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}`;
}

function getMonthName(date: Date): string {
  return new Date(date).toLocaleDateString(t.dateLocale, { month: 'long' });
}
</script>

{#if posts.length === 0}
  <div class="text-center py-16">
    <p class="text-gray-600 dark:text-gray-300 text-lg">{t.portfolioPage.emptyState}</p>
  </div>
{:else}
  <div class="relative py-8">
    <!-- Center line (desktop) / Left line (mobile) -->
    <div class="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

    {#each posts as post, index}
      {@const slug = getPostSlug(post.id)}
      {@const isLeft = index % 2 === 0}
      {@const year = formatYear(post.data.pubDate)}
      {@const showYear = index === 0 || formatYear(posts[index - 1].data.pubDate) !== year}
      {@const yearMonth = formatYearMonth(post.data.pubDate)}
      {@const showMonth = index === 0 || formatYearMonth(posts[index - 1].data.pubDate) !== yearMonth}

      <!-- Year marker -->
      {#if showYear}
        <div class="relative flex items-center h-8 mb-6 mt-4">
          <div class="absolute left-10 md:left-1/2 md:-translate-x-1/2 z-10">
            <span class="inline-block px-4 py-1.5 bg-secondary text-white text-sm font-bold rounded-full shadow-md">
              {year}
            </span>
          </div>
        </div>
      {/if}

      <!-- Month marker -->
      {#if showMonth}
        <div class="relative flex items-center h-6 mb-6 mt-4">
          <div class="absolute left-10 md:left-1/2 md:-translate-x-1/2 z-10">
            <span class="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full capitalize translate-y-1">
              {getMonthName(post.data.pubDate)}
            </span>
          </div>
        </div>
      {/if}

      <!-- Timeline item -->
      <div class="relative flex items-start mb-12 group">
        <!-- Date node on the line -->
        <div class="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 mt-6">
          <div class="w-4 h-4 bg-secondary rounded-full border-4 border-white dark:border-gray-900 shadow-sm group-hover:scale-125 transition-transform duration-200"></div>
        </div>

        <!-- Mobile: always right of the line -->
        <!-- Desktop: alternating left/right -->
        <div class={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
          <article
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-secondary/30 dark:hover:border-secondary/30 hover:-translate-y-1"
          >
            {#if post.data.heroImage}
              <a href={`${prefix}/blog/${slug}/`} class="block">
                <img
                  src={post.data.heroImage}
                  alt={post.data.title}
                  class="w-full h-44 object-cover"
                  loading="lazy"
                />
              </a>
            {/if}
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary transition-colors">
                <a href={`${prefix}/blog/${slug}/`} class="hover:text-secondary transition-colors">
                  {post.data.title}
                </a>
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                {post.data.description}
              </p>
              <div class="flex flex-wrap items-center gap-2">
                <time class="text-xs text-gray-600 dark:text-gray-300">
                  {formatDate(post.data.pubDate)}
                </time>
                {#if post.data.tags && post.data.tags.length > 0}
                  {#each post.data.tags as tag}
                    <a
                      href={`${prefix}/blog/tag/${tag}/`}
                      class="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      #{t.tagNames[tag] || tag}
                    </a>
                  {/each}
                {/if}
              </div>
            </div>
          </article>
        </div>
      </div>
    {/each}
  </div>
{/if}

