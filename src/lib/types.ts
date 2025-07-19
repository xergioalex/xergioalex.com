import type { CollectionEntry } from 'astro:content';

export type BlogParamsType = {
  lang?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
};

export type BlogPostsResultType = {
  allPosts: CollectionEntry<'blog'>[];
  postsResult: CollectionEntry<'blog'>[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
};
