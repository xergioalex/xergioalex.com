<script lang="ts">
import type { CollectionEntry } from 'astro:content';
import { getHighlightedField } from '@/lib/search';
import { getTranslations } from '@/lib/translations';

export let post: CollectionEntry<'blog'>;
export let lang: string = 'en';
export let searchResult:
  | { item: any; score: number; matches?: any[] }
  | undefined = undefined;

$: t = getTranslations(lang);

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
    <img 
      src={postData.heroImage} 
      alt={postData.title}
      class="w-full h-48 object-cover"
    />
  {/if}
  <div class="p-6">
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
              href={`${lang === 'es' ? '/es' : ''}/blog/tag/${tag}/`}
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