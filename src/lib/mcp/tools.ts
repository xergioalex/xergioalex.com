/**
 * Tools exposed by the XergioAleX.com MCP server (`/mcp`).
 *
 * Every tool is a thin, typed read over the site's prerendered JSON API —
 * the MCP layer holds no data of its own. At request time the Pages Function
 * resolves each tool to the same static asset a plain HTTP client would
 * fetch (`ASSETS.fetch`), so the two surfaces can never drift apart.
 */

/** Resolves a site-relative asset path (e.g. `/api/index.json`) to JSON. */
export type AssetFetcher = (path: string) => Promise<unknown | null>;

export interface McpTool {
  name: string;
  title: string;
  description: string;
  /** JSON Schema (draft 2020-12) for the tool's arguments. */
  inputSchema: Record<string, unknown>;
}

const LANGUAGE_SCHEMA = {
  type: 'string',
  enum: ['en', 'es'],
  description:
    'Content language. Defaults to "en". Spanish content lives under /es/.',
  default: 'en',
} as const;

export const MCP_TOOLS: McpTool[] = [
  {
    name: 'search_blog_posts',
    title: 'Search blog posts',
    description:
      'Full-text search over every published post on xergioalex.com, matching title, description and tags. Returns the 10 best matches with slug, title, description, publication date, tags and URL.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Case-insensitive search term.',
          minLength: 1,
        },
        lang: LANGUAGE_SCHEMA,
      },
      required: ['query'],
    },
  },
  {
    name: 'list_series',
    title: 'List blog series',
    description:
      'Every blog series with at least one published chapter, newest activity first, with chapter counts and hero images.',
    inputSchema: {
      type: 'object',
      properties: { lang: LANGUAGE_SCHEMA },
    },
  },
  {
    name: 'get_series',
    title: 'Get one blog series',
    description:
      'Every chapter of one series in reading order. Series slugs are always English; enumerate valid values with list_series.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          pattern: '^[a-z0-9-]+$',
          description: 'Series slug, e.g. "trading-journey".',
        },
        lang: LANGUAGE_SCHEMA,
      },
      required: ['slug'],
    },
  },
  {
    name: 'get_posts_by_tag',
    title: 'Get posts by tag',
    description:
      'Every published post carrying one tag, newest first. Common tags: tech, trading, dailybot, talks, portfolio, entrepreneur, personal.',
    inputSchema: {
      type: 'object',
      properties: {
        tag: {
          type: 'string',
          pattern: '^[a-z0-9-]+$',
          description: 'Tag name, e.g. "tech".',
        },
        lang: LANGUAGE_SCHEMA,
      },
      required: ['tag'],
    },
  },
  {
    name: 'list_slide_decks',
    title: 'List slide decks',
    description:
      'Every published tech-talk slide deck in one language, newest first — hosted Reveal.js decks, embeds and external links alike.',
    inputSchema: {
      type: 'object',
      properties: { lang: LANGUAGE_SCHEMA },
    },
  },
  {
    name: 'get_api_index',
    title: 'Get the API index',
    description:
      'The self-describing JSON API index of xergioalex.com: every REST endpoint with fully-resolved URLs, the versioning policy and links to the OpenAPI spec. Use this when the six tools here are not enough.',
    inputSchema: { type: 'object', properties: {} },
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function langOf(args: Record<string, unknown>): 'en' | 'es' {
  return args.lang === 'es' ? 'es' : 'en';
}

interface PostIndexEntryLike {
  title?: string;
  description?: string;
  tags?: string[];
  slug?: string;
  lang?: string;
  pubDate?: string;
}

function postUrl(lang: 'en' | 'es', slug: unknown): string {
  return `https://xergioalex.com${lang === 'es' ? '/es' : ''}/blog/${String(slug)}/`;
}

export interface ToolResult {
  /** Machine-readable payload, mirrored as `structuredContent`. */
  structuredContent: unknown;
  /** Human/LLM-readable one-screen summary. */
  text: string;
}

/** Execute one tool call. Throws on invalid arguments or fetch failures. */
export async function executeMcpTool(
  name: string,
  args: Record<string, unknown>,
  fetchAsset: AssetFetcher
): Promise<ToolResult> {
  switch (name) {
    case 'search_blog_posts': {
      const query = String(args.query ?? '')
        .toLowerCase()
        .trim();
      if (!query) throw new Error('query must be a non-empty string');
      const lang = langOf(args);
      const index = (await fetchAsset(`/api/posts-${lang}.json`)) as
        | PostIndexEntryLike[]
        | null;
      if (!Array.isArray(index)) throw new Error('post index unavailable');

      const matches = index
        .filter((post) =>
          [post.title, post.description, ...(post.tags ?? [])]
            .filter(Boolean)
            .some((field) => String(field).toLowerCase().includes(query))
        )
        .slice(0, 10)
        .map((post) => ({
          slug: post.slug,
          title: post.title,
          description: post.description,
          pubDate: post.pubDate,
          tags: post.tags ?? [],
          url: postUrl(post.lang === 'es' ? 'es' : 'en', post.slug),
        }));

      return {
        structuredContent: {
          query: args.query,
          lang,
          total: matches.length,
          results: matches,
        },
        text:
          matches.length === 0
            ? `No posts on xergioalex.com match "${String(args.query)}".`
            : `${matches.length} post(s) matching "${String(args.query)}":\n` +
              matches
                .map((m) => `- ${m.title} (${m.pubDate}) ${m.url}`)
                .join('\n'),
      };
    }

    case 'list_series': {
      const lang = langOf(args);
      const listing = await fetchAsset(`/api/series/${lang}/index.json`);
      if (!isRecord(listing)) throw new Error('series index unavailable');
      const series = Array.isArray(listing.series) ? listing.series : [];
      return {
        structuredContent: listing,
        text:
          `${series.length} series on xergioalex.com (${lang}):\n` +
          series
            .map(
              (s) =>
                `- ${(s as Record<string, unknown>).slug}: ${(s as Record<string, unknown>).title} (${(s as Record<string, unknown>).postCount} chapters)`
            )
            .join('\n'),
      };
    }

    case 'get_series': {
      const slug = String(args.slug ?? '').trim();
      if (!/^[a-z0-9-]+$/.test(slug)) {
        throw new Error('slug must match ^[a-z0-9-]+$');
      }
      const lang = langOf(args);
      const detail = await fetchAsset(`/api/series/${lang}/${slug}.json`);
      if (!isRecord(detail) || detail.status === 404) {
        throw new Error(
          `No series "${slug}" in ${lang}. Call list_series for valid slugs.`
        );
      }
      const posts = Array.isArray(detail.posts) ? detail.posts : [];
      return {
        structuredContent: detail,
        text:
          `Series "${slug}" (${lang}), ${posts.length} chapter(s):\n` +
          posts
            .map(
              (p) =>
                `- ${(p as Record<string, unknown>).title} → ${postUrl(lang, (p as Record<string, unknown>).slug)}`
            )
            .join('\n'),
      };
    }

    case 'get_posts_by_tag': {
      const tag = String(args.tag ?? '').trim();
      if (!/^[a-z0-9-]+$/.test(tag)) {
        throw new Error('tag must match ^[a-z0-9-]+$');
      }
      const lang = langOf(args);
      const timeline = await fetchAsset(`/api/timeline/${lang}/${tag}.json`);
      if (!isRecord(timeline)) {
        throw new Error(
          `No timeline for tag "${tag}" in ${lang}. Try tech, trading, dailybot, talks, portfolio, entrepreneur or personal.`
        );
      }
      const posts = Array.isArray(timeline.posts) ? timeline.posts : [];
      return {
        structuredContent: timeline,
        text:
          `${posts.length} post(s) tagged "${tag}" (${lang}):\n` +
          posts
            .map(
              (p) =>
                `- ${(p as Record<string, unknown>).title} → ${postUrl(lang, (p as Record<string, unknown>).slug)}`
            )
            .join('\n'),
      };
    }

    case 'list_slide_decks': {
      const lang = langOf(args);
      const decks = await fetchAsset(`/api/slides-timeline/${lang}.json`);
      if (!isRecord(decks)) throw new Error('slides timeline unavailable');
      const list = Array.isArray(decks.decks) ? decks.decks : [];
      return {
        structuredContent: decks,
        text:
          `${list.length} slide deck(s) (${lang}):\n` +
          list
            .map(
              (d) =>
                `- ${(d as Record<string, unknown>).title} (${(d as Record<string, unknown>).type})`
            )
            .join('\n'),
      };
    }

    case 'get_api_index': {
      const index = await fetchAsset('/api/index.json');
      if (!isRecord(index)) throw new Error('API index unavailable');
      const endpoints = Array.isArray(index.endpoints) ? index.endpoints : [];
      return {
        structuredContent: index,
        text: `XergioAleX.com public API v${String(index.version ?? '?')} — ${endpoints.length} operations. Full index in structuredContent; OpenAPI spec at https://xergioalex.com/openapi.json.`,
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
