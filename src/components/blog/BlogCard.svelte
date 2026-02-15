<script lang="ts">
import type { CollectionEntry } from 'astro:content';
import { getHighlightedField } from '@/lib/search';
import { getTranslations } from '@/lib/translations';
import PostStatusBadge from './PostStatusBadge.svelte';

export let post: CollectionEntry<'blog'>;
export let lang: string = 'en';
export let searchResult:
  | { item: any; score: number; matches?: any[] }
  | undefined = undefined;
export let isDev: boolean = false;
export let isPreviewMode: boolean = false;

$: t = getTranslations(lang);
$: querySuffix = isPreviewMode ? '?preview=all' : '';

// Helper function to get post slug without language prefix or date prefix
// e.g., "en/2022-07-08_first-post" -> "first-post"
function getPostSlug(): string {
  const id = post.id || post.slug || '';
  // Remove language prefix if present (en/, es/)
  let slug = id;
  if (slug.startsWith('en/') || slug.startsWith('es/')) {
    slug = slug.substring(3);
  }
  // Remove date prefix (YYYY-MM-DD.) if present
  slug = slug.replace(/^\d{4}-\d{2}-\d{2}_/, '');
  return slug;
}

// Helper function to get post data regardless of structure
function getPostData() {
  // If post has data property (CollectionEntry structure)
  if (post.data) {
    return {
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      tags: post.data.tags || [],
      heroImage: post.data.heroImage,
    };
  }
  // If post is flat structure (search index)
  return {
    title: post.title,
    description: post.description,
    pubDate: new Date(post.pubDate),
    tags: post.tags || [],
    heroImage: post.heroImage,
  };
}

// Compute post status client-side from post data
function computeStatus(postObj) {
  // Check search index status field first (flat structure from API)
  if (postObj.status && postObj.status !== 'published') return postObj.status;
  // Compute from CollectionEntry data
  const draft = postObj.data?.draft === true || postObj.draft === true;
  const pubDate = postObj.data?.pubDate || postObj.pubDate;
  const pubTime =
    pubDate instanceof Date ? pubDate.valueOf() : new Date(pubDate).valueOf();
  const scheduled = pubTime > Date.now();
  if (draft && scheduled) return 'draft+scheduled';
  if (draft) return 'draft';
  if (scheduled) return 'scheduled';
  return 'published';
}

// Compute demo status from post id/path
function checkIsDemo(postObj) {
  const id = postObj.id || '';
  return id.includes('/_demo/') || id.includes('_demo/');
}

$: effectiveStatus = computeStatus(post);
$: isDemo = checkIsDemo(post);

$: postData = getPostData();
$: postSlug = getPostSlug();

// Get highlighted title and description if search result is available
$: displayTitle = searchResult
  ? getHighlightedField(searchResult, 'title', postData.title)
  : postData.title;
$: displayDescription = searchResult
  ? getHighlightedField(searchResult, 'description', postData.description)
  : postData.description;
</script>

<article class="article-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
  {#if postData.heroImage}
    <div class="relative">
      <img
        src={postData.heroImage}
        alt={postData.title}
        class="w-full h-48 object-cover"
      />
      {#if isDev && (effectiveStatus !== 'published' || isDemo)}
        <div class="absolute top-2 right-2">
          <PostStatusBadge status={effectiveStatus} {lang} pubDate={postData.pubDate} size="sm" {isDemo} />
        </div>
      {/if}
    </div>
  {/if}
  <div class="p-6">
    {#if isDev && (effectiveStatus !== 'published' || isDemo) && !postData.heroImage}
      <div class="mb-2">
        <PostStatusBadge status={effectiveStatus} {lang} pubDate={postData.pubDate} size="sm" {isDemo} />
      </div>
    {/if}
    <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
      <a href={`${lang === 'es' ? '/es' : ''}/blog/${postSlug}/`} class="hover:text-blue-600 dark:hover:text-blue-400">
        {@html displayTitle}
      </a>
    </h2>
    <p class="text-gray-600 dark:text-gray-300 mb-4">
      {@html displayDescription}
    </p>
    <div class="flex flex-wrap justify-between items-center gap-2">
      <time class="text-sm text-gray-500 dark:text-gray-400">
        {postData.pubDate.toLocaleDateString(t.dateLocale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </time>
      {#if postData.tags && postData.tags.length > 0}
        <div class="flex gap-1">
          {#each postData.tags as tag}
            <a 
              href={`${lang === 'es' ? '/es' : ''}/blog/tag/${tag}/${querySuffix}`}
              class="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              #{t.tagNames[tag] || tag}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</article> 