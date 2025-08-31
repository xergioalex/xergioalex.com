import type { CollectionEntry } from 'astro:content';

export type BlogParamsType = {
  lang?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
};

export type BlogPostsResultType = {
  allTags: CollectionEntry<'tags'>[];
  postsResult: CollectionEntry<'blog'>[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
};
