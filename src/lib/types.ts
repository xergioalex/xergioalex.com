import type { CollectionEntry } from 'astro:content';

export type BlogParamsType = {
  lang?: string;
  tag?: string;
  topic?: string;
  page?: number;
  pageSize?: number;
};

export type BlogPostsResultType = {
  tagsResult: CollectionEntry<'tags'>[];
  topicsResult: string[];
  postsResult: CollectionEntry<'blog'>[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalPostsAvailable: number;
};
