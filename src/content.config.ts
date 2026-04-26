import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ''),
  }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroLayout: z
      .enum(['banner', 'side-by-side', 'minimal', 'none'])
      .default('banner')
      .optional(),
    // Unified tags array — tag tier is defined in the tags collection (tier: primary | secondary | subtopic)
    tags: z.array(z.string()).optional(),
    // SEO keywords — specific search phrases (distinct from categorical tags)
    keywords: z.array(z.string()).optional(),
    // Series support — references a series slug from the series collection
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    /**
     * Mark a post as a work-in-progress draft. Drafts are visible in the dev
     * server and on Cloudflare Pages preview branches, but excluded from the
     * production build so they never reach the live site.
     */
    draft: z.boolean().default(false).optional(),
  }),
});

const tags = defineCollection({
  loader: glob({ base: './src/content/tags', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    tier: z.enum(['primary', 'secondary', 'subtopic']).default('primary'),
    parent: z.string().optional(),
    order: z.number().default(0),
  }),
});

const series = defineCollection({
  loader: glob({ base: './src/content/series', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(0),
    heroImage: z.string().optional(),
    heroImageEs: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

const slideBaseSchema = z.object({
  title: z.string().max(100),
  description: z.string().min(130).max(160),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).max(5).optional(),
  draft: z.boolean().default(false),
  eventName: z.string().optional(),
  eventDate: z.coerce.date().optional(),
  eventUrl: z.url().optional(),
  relatedPost: z.string().optional(),
});

const internalSlideSchema = slideBaseSchema.extend({
  type: z.literal('internal'),
  theme: z.enum(['dark', 'light']).default('dark'),
  transition: z
    .enum(['none', 'fade', 'slide', 'convex', 'concave', 'zoom'])
    .default('slide'),
  syntaxHighlight: z.boolean().default(true),
  math: z.boolean().default(false),
});

const externalLinkSlideSchema = slideBaseSchema.extend({
  type: z.literal('external-link'),
  externalUrl: z.url(),
  provider: z.string().optional(),
});

const externalEmbedSlideSchema = slideBaseSchema.extend({
  type: z.literal('external-embed'),
  externalUrl: z.url(),
  embedUrl: z.url(),
  provider: z.string().optional(),
  aspectRatio: z.enum(['16:9', '4:3', '1:1']).default('16:9'),
});

const slideSchema = z.discriminatedUnion('type', [
  internalSlideSchema,
  externalLinkSlideSchema,
  externalEmbedSlideSchema,
]);

const slides = defineCollection({
  loader: glob({
    base: './src/content/slides',
    // Exclude `_*` files and any path under `_layouts/` — author-only snippets, never decks.
    pattern: ['**/*.{md,mdx}', '!**/_*/**', '!**/_*.{md,mdx}'],
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ''),
  }),
  schema: slideSchema,
});

const pages = defineCollection({
  // Markdown source files for agent-friendly .md endpoints (non-blog pages)
  loader: glob({
    base: './src/content/pages',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/i, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

export const collections = { blog, tags, series, slides, pages };
