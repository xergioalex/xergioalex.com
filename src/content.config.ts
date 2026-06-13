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
    // Optional reference to a paired slide deck (slug, no date prefix). Used by
    // the blog post page to render a floating "Open slides" indicator. The
    // slide collection has the inverse field (`relatedPost`) so the link is
    // bidirectional; either side can be the source of truth.
    relatedSlide: z.string().optional(),
    // Author slug — must match a file in `src/content/authors/`.
    author: z.string().default('sergio-florez'),
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
  draft: z.boolean().default(false),
  eventName: z.string().optional(),
  eventDate: z.coerce.date().optional(),
  eventUrl: z.url().optional(),
  relatedPost: z.string().optional(),
});

const nativeSlideSchema = slideBaseSchema.extend({
  type: z.literal('native'),
  theme: z.enum(['dark', 'light']).default('dark'),
  transition: z
    .enum(['none', 'fade', 'slide', 'convex', 'concave', 'zoom'])
    .default('slide'),
  syntaxHighlight: z.boolean().default(true),
  math: z.boolean().default(false),
});

const externalSlideSchema = slideBaseSchema.extend({
  type: z.literal('external'),
  externalUrl: z.url(),
  provider: z.string().optional(),
});

const slideSchema = z.discriminatedUnion('type', [
  nativeSlideSchema,
  externalSlideSchema,
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

const authors = defineCollection({
  loader: glob({ base: './src/content/authors', pattern: '**/*.yaml' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    avatar: z.string(),
    role: z.object({
      en: z.string(),
      es: z.string(),
    }),
    bio: z.object({
      en: z.string(),
      es: z.string(),
    }),
    social: z
      .object({
        x: z.string().optional(),
        linkedin: z.string().optional(),
        github: z.string().optional(),
        instagram: z.string().optional(),
        website: z.string().optional(),
        sponsor: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog, tags, series, slides, pages, authors };
