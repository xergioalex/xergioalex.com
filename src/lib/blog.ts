import { getCollection, type CollectionEntry } from "astro:content";
import type { BlogParamsType, BlogPostsResultType } from "./types";
import { BLOG_PAGE_SIZE } from "./constances";

export async function getBlogPosts(params: BlogParamsType): Promise<BlogPostsResultType> {
  let allPosts: CollectionEntry<"blog">[] = await getCollection("blog");
  let posts: CollectionEntry<"blog">[] = allPosts;
  if (params.tag) {
    posts = posts.filter((post) => post.data.tags?.includes(params.tag as string));
  }
  if (params.page) {
    posts = posts.slice((params.page - 1) * (params.pageSize ?? BLOG_PAGE_SIZE), params.page * (params.pageSize ?? BLOG_PAGE_SIZE));
  } else {
    posts = posts.slice(0, params.pageSize ?? BLOG_PAGE_SIZE);
  }
  posts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  let result: BlogPostsResultType = {
    allPosts: allPosts,
    postsResult: posts,
    currentPage: params.page ?? 1,
    pageSize: params.pageSize ?? BLOG_PAGE_SIZE,
    totalPages: Math.ceil(allPosts.length / (params.pageSize ?? BLOG_PAGE_SIZE)),
  };
  // console.log(result);
  return result;
}