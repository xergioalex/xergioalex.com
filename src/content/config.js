import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    date: z.string(),
    link: z.string().optional(),
  }),
});

export const collections = {
  postsEs: postsCollection,
  postsEn: postsCollection,
};
