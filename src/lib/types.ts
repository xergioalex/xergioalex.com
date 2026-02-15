import type { CollectionEntry } from 'astro:content';

/** Post content status derived from draft field and pubDate */
export type PostStatus =
  | 'published'
  | 'scheduled'
  | 'draft'
  | 'draft+scheduled';

export type BlogParamsType = {
  lang?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
  includeHidden?: boolean;
};

export type BlogPostsResultType = {
  tagsResult: CollectionEntry<'tags'>[];
  postsResult: CollectionEntry<'blog'>[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalPostsAvailable: number;
};
