#!/usr/bin/env node
/**
 * Generate `public/openapi.json`.
 *
 * The spec is built from a script rather than hand-edited so the shared pieces
 * — the error model, the `lang` parameter, the language enum — are written
 * once and every operation is guaranteed to declare them. Every operation
 * carries an `operationId` and a typed response schema, which is what makes
 * the spec usable for LLM function calling.
 *
 * Run: `node scripts/build-openapi.mjs` or via `pnpm run generate:openapi`.
 * The prebuild step runs it, so the committed file always matches this source.
 */

import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '..', 'public', 'openapi.json');

const ORIGIN = 'https://xergioalex.com';
const API_VERSION = '1.0.0';

const LANG_PARAM = {
  name: 'lang',
  in: 'path',
  required: true,
  description:
    'Content language. English lives at the root, Spanish under /es/.',
  schema: { type: 'string', enum: ['en', 'es'] },
  example: 'en',
};

/** 404 / 500 responses, attached to every operation. */
const errorResponses = {
  404: { $ref: '#/components/responses/NotFound' },
  500: { $ref: '#/components/responses/InternalError' },
};

function jsonResponse(description, schemaRef, example) {
  return {
    description,
    content: {
      'application/json': {
        schema: { $ref: schemaRef },
        ...(example ? { examples: { default: { value: example } } } : {}),
      },
    },
  };
}

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'XergioAleX.com Public API',
    version: API_VERSION,
    summary:
      'Read-only JSON endpoints for the blog, series, tag timelines and slide decks of xergioalex.com.',
    description: [
      'The public API of **XergioAleX.com**, the personal site and technical blog of Sergio Alexander Florez Galeano (XergioAleX), CTO & Co-founder at DailyBot.',
      '',
      '`xergioalex.com` is a static site on Cloudflare Pages: every endpoint below is a prerendered JSON file served from the CDN.',
      '',
      '## Authentication',
      '',
      'None. Every endpoint is public, anonymous and read-only — no API key, no signup, no OAuth flow. Sending credentials has no effect. See <' +
        ORIGIN +
        '/auth.md>.',
      '',
      '## Methods and rate limits',
      '',
      '`GET` and `HEAD` only. There is no application-level rate limit; the endpoints are static assets behind Cloudflare, which applies its own network-level abuse protection. Responses are cacheable for one hour (`Cache-Control: public, max-age=3600`) and CORS is open (`Access-Control-Allow-Origin: *`).',
      '',
      '## Versioning',
      '',
      'The API follows semantic versioning, currently `' + API_VERSION + '`.',
      'Additive changes — new endpoints, new optional fields — ship without notice and without a version bump in the path.',
      'A breaking change (a removed or retyped field, a removed endpoint) ships under a new path prefix `/api/v2/...`, and the current unprefixed paths keep working for at least six months after that.',
      'Poll `' +
        ORIGIN +
        '/api/index.json` to read the version and policy at runtime.',
      '',
      '## Errors',
      '',
      'Failed requests return `application/json` with RFC 9457 problem-details members (`type`, `title`, `status`, `detail`, `instance`) plus a nested `error` object carrying a stable `code`, a human `message`, a recovery `hint` and a `documentation_url`. HTML is never returned under `/api/`.',
    ].join('\n'),
    contact: {
      name: 'Sergio Alexander Florez Galeano (XergioAleX)',
      url: `${ORIGIN}/contact`,
      email: 'xergioalex@gmail.com',
    },
    license: {
      name: 'CC BY 4.0',
      url: 'https://creativecommons.org/licenses/by/4.0/',
    },
  },
  externalDocs: {
    description:
      'XergioAleX.com developer portal — quickstart, endpoints, agent surface',
    url: `${ORIGIN}/developers`,
  },
  servers: [{ url: ORIGIN, description: 'Production' }],
  security: [],
  tags: [
    {
      name: 'discovery',
      description: 'Entry points that enumerate the API surface.',
    },
    {
      name: 'posts',
      description: 'Blog post indexes used by on-site search and by agents.',
    },
    {
      name: 'series',
      description: 'Multi-part blog series and their ordered chapters.',
    },
    {
      name: 'timelines',
      description: 'Tag-filtered post timelines and the slide-deck timeline.',
    },
  ],
  paths: {
    '/api/index.json': {
      get: {
        operationId: 'getApiIndex',
        tags: ['discovery'],
        summary: 'List every API endpoint',
        description:
          'Entry point for agents: lists every endpoint with fully-resolved URLs (not {lang} templates), plus the versioning policy, the auth model and links to the OpenAPI spec, llms.txt and the agent discovery documents.',
        responses: {
          200: jsonResponse('The API index.', '#/components/schemas/ApiIndex'),
          ...errorResponses,
        },
      },
    },
    '/api/posts.json': {
      get: {
        operationId: 'listPosts',
        tags: ['posts'],
        summary: 'Blog post index, all languages',
        description:
          'The combined blog search index across every language. Use the per-language variants when you only need one language — they are roughly half the size.',
        responses: {
          200: jsonResponse(
            'Every published post in every language.',
            '#/components/schemas/PostIndex'
          ),
          ...errorResponses,
        },
      },
    },
    '/api/posts-en.json': {
      get: {
        operationId: 'listPostsInEnglish',
        tags: ['posts'],
        summary: 'Blog post index, English only',
        description: 'The blog search index filtered to English posts.',
        responses: {
          200: jsonResponse(
            'Every published English post.',
            '#/components/schemas/PostIndex'
          ),
          ...errorResponses,
        },
      },
    },
    '/api/posts-es.json': {
      get: {
        operationId: 'listPostsInSpanish',
        tags: ['posts'],
        summary: 'Blog post index, Spanish only',
        description: 'The blog search index filtered to Spanish posts.',
        responses: {
          200: jsonResponse(
            'Every published Spanish post.',
            '#/components/schemas/PostIndex'
          ),
          ...errorResponses,
        },
      },
    },
    '/api/series/{lang}/index.json': {
      get: {
        operationId: 'listSeries',
        tags: ['series'],
        summary: 'List blog series',
        description:
          'Every blog series that has at least one published post in the requested language, newest activity first.',
        parameters: [LANG_PARAM],
        responses: {
          200: jsonResponse(
            'The series listing for one language.',
            '#/components/schemas/SeriesListing'
          ),
          ...errorResponses,
        },
      },
    },
    '/api/series/{lang}/{slug}.json': {
      get: {
        operationId: 'getSeries',
        tags: ['series'],
        summary: 'Get one blog series',
        description:
          'Every chapter of one series in reading order. Series slugs are always English on both languages; read them from listSeries.',
        parameters: [
          LANG_PARAM,
          {
            name: 'slug',
            in: 'path',
            required: true,
            description:
              'Series slug, always in English (e.g. "trading-journey"). Enumerate valid values with listSeries or getApiIndex.',
            schema: { type: 'string', pattern: '^[a-z0-9-]+$' },
            example: 'trading-journey',
          },
        ],
        responses: {
          200: jsonResponse(
            'The ordered chapters of one series.',
            '#/components/schemas/SeriesDetail'
          ),
          ...errorResponses,
        },
      },
    },
    '/api/timeline/{lang}/{tag}.json': {
      get: {
        operationId: 'getTimelineByTag',
        tags: ['timelines'],
        summary: 'Get the post timeline for one tag',
        description:
          'Every published post carrying one tag, newest first. Powers the infinite-scroll timelines on /trading, /entrepreneur and the other tag pages.',
        parameters: [
          LANG_PARAM,
          {
            name: 'tag',
            in: 'path',
            required: true,
            description:
              'Tag name (e.g. "tech", "trading", "dailybot"). Enumerate valid values with getApiIndex.',
            schema: { type: 'string', pattern: '^[a-z0-9-]+$' },
            example: 'tech',
          },
        ],
        responses: {
          200: jsonResponse(
            'The posts carrying this tag.',
            '#/components/schemas/TagTimeline'
          ),
          ...errorResponses,
        },
      },
    },
    '/api/slides-timeline/{lang}.json': {
      get: {
        operationId: 'getSlidesTimeline',
        tags: ['timelines'],
        summary: 'Get the slide-deck timeline',
        description:
          'Every published slide deck in one language, newest first — internal Reveal.js decks, embedded decks and external links alike.',
        parameters: [LANG_PARAM],
        responses: {
          200: jsonResponse(
            'The slide decks for one language.',
            '#/components/schemas/SlidesTimeline'
          ),
          ...errorResponses,
        },
      },
    },
  },
  components: {
    responses: {
      NotFound: {
        description:
          'No resource exists at that path. The body names the endpoint index so an agent can recover.',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
            examples: {
              default: {
                value: {
                  type: `${ORIGIN}/developers#errors`,
                  title: 'Not Found',
                  status: 404,
                  detail:
                    'No API resource exists at /api/series/fr/index.json.',
                  instance: '/api/series/fr/index.json',
                  error: {
                    code: 'resource_not_found',
                    message:
                      'No API resource exists at /api/series/fr/index.json.',
                    hint: `Fetch ${ORIGIN}/api/index.json for the list of available endpoints, or ${ORIGIN}/openapi.json for the full OpenAPI description. Endpoint paths always end in ".json".`,
                    documentation_url: `${ORIGIN}/developers`,
                  },
                },
              },
            },
          },
        },
      },
      InternalError: {
        description: 'The request could not be completed.',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
    schemas: {
      Error: {
        type: 'object',
        title: 'Error',
        description:
          'RFC 9457 problem details, extended with an agent-oriented `error` object. Returned by every endpoint for any 4xx or 5xx response.',
        required: ['type', 'title', 'status', 'detail', 'instance', 'error'],
        properties: {
          type: {
            type: 'string',
            format: 'uri',
            description: 'URL documenting this class of error.',
          },
          title: {
            type: 'string',
            description: 'Short summary of the error type.',
            examples: ['Not Found'],
          },
          status: {
            type: 'integer',
            description: 'HTTP status code, repeated in the body.',
            examples: [404],
          },
          detail: {
            type: 'string',
            description: 'Explanation specific to this occurrence.',
          },
          instance: {
            type: 'string',
            description: 'Path that produced the error.',
          },
          error: {
            type: 'object',
            required: ['code', 'message', 'hint', 'documentation_url'],
            properties: {
              code: {
                type: 'string',
                description: 'Stable machine-readable error code.',
                enum: [
                  'resource_not_found',
                  'method_not_allowed',
                  'gone',
                  'internal_error',
                ],
              },
              message: {
                type: 'string',
                description: 'Human-readable message.',
              },
              hint: {
                type: 'string',
                description: 'One sentence on how to recover.',
              },
              documentation_url: {
                type: 'string',
                format: 'uri',
                description: 'Where the error model is documented.',
              },
            },
          },
        },
      },
      Language: {
        type: 'string',
        enum: ['en', 'es'],
        description: 'Content language.',
      },
      PostIndexEntry: {
        type: 'object',
        title: 'PostIndexEntry',
        description: 'One blog post as it appears in the search index.',
        required: [
          'id',
          'slug',
          'lang',
          'title',
          'description',
          'pubDate',
          'tags',
          'topics',
          'subtopics',
          'heroImage',
        ],
        properties: {
          id: {
            type: 'string',
            description: 'Collection id, "<lang>/<YYYY-MM-DD>_<slug>".',
            examples: ['en/2026-08-23_pereira-colombia-earthquake-2026'],
          },
          slug: {
            type: 'string',
            description:
              'URL slug without the date prefix. Always English, on both languages.',
          },
          lang: { $ref: '#/components/schemas/Language' },
          title: { type: 'string' },
          description: { type: 'string' },
          pubDate: {
            type: 'string',
            format: 'date-time',
            description: 'Publication date, ISO 8601 in UTC.',
          },
          tags: { type: 'array', items: { type: 'string' } },
          topics: {
            type: 'array',
            items: { type: 'string' },
            description:
              'Secondary and subtopic tags resolved from the taxonomy.',
          },
          subtopics: {
            type: 'array',
            items: { type: 'string' },
            description: 'Subtopic-tier tags only.',
          },
          heroImage: {
            type: ['string', 'null'],
            description: 'Absolute path to the hero image, or null.',
          },
          series: {
            type: 'string',
            description: 'Series slug, when the post belongs to a series.',
          },
          seriesOrder: {
            type: 'integer',
            description: 'Position within the series.',
          },
          seriesCurrent: {
            type: 'integer',
            description: 'Chapter number, 1-based.',
          },
          seriesTotal: {
            type: 'integer',
            description: 'Chapters in the series.',
          },
          seriesTitle: {
            type: 'string',
            description: 'Localized series title.',
          },
        },
      },
      PostIndex: {
        type: 'array',
        title: 'PostIndex',
        description: 'Blog search index, newest first.',
        items: { $ref: '#/components/schemas/PostIndexEntry' },
      },
      TimelinePost: {
        type: 'object',
        title: 'TimelinePost',
        description: 'One post as it appears in a series or tag timeline.',
        required: [
          'slug',
          'lang',
          'title',
          'description',
          'pubDate',
          'tags',
          'heroImage',
          'isDraft',
        ],
        properties: {
          slug: { type: 'string' },
          lang: { $ref: '#/components/schemas/Language' },
          title: { type: 'string' },
          description: { type: 'string' },
          pubDate: { type: 'string', format: 'date-time' },
          tags: { type: 'array', items: { type: 'string' } },
          heroImage: { type: ['string', 'null'] },
          isDraft: {
            type: 'boolean',
            description:
              'True only in development builds; always false in production.',
          },
          seriesSlug: { type: 'string' },
          seriesCurrent: { type: 'integer' },
          seriesTotal: { type: 'integer' },
          seriesTitle: { type: 'string' },
        },
      },
      SeriesListingEntry: {
        type: 'object',
        title: 'SeriesListingEntry',
        required: [
          'slug',
          'title',
          'description',
          'order',
          'postCount',
          'heroImage',
          'firstPostHero',
          'lastPostDate',
        ],
        properties: {
          slug: {
            type: 'string',
            description: 'Series slug, always English.',
            examples: ['trading-journey'],
          },
          title: { type: 'string' },
          description: { type: 'string' },
          order: { type: 'integer', description: 'Manual sort order.' },
          postCount: {
            type: 'integer',
            description: 'Published chapters in this language.',
          },
          heroImage: { type: ['string', 'null'] },
          firstPostHero: {
            type: ['string', 'null'],
            description: 'Hero image of the first chapter, used as a fallback.',
          },
          lastPostDate: {
            type: 'string',
            format: 'date-time',
            description: 'Publication date of the most recent chapter.',
          },
        },
      },
      SeriesListing: {
        type: 'object',
        title: 'SeriesListing',
        required: ['lang', 'total', 'series'],
        properties: {
          lang: { $ref: '#/components/schemas/Language' },
          total: { type: 'integer' },
          series: {
            type: 'array',
            items: { $ref: '#/components/schemas/SeriesListingEntry' },
          },
        },
      },
      SeriesDetail: {
        type: 'object',
        title: 'SeriesDetail',
        required: ['series', 'lang', 'total', 'posts'],
        properties: {
          series: { type: 'string', description: 'Series slug.' },
          lang: { $ref: '#/components/schemas/Language' },
          total: { type: 'integer' },
          posts: {
            type: 'array',
            description: 'Chapters in reading order.',
            items: { $ref: '#/components/schemas/TimelinePost' },
          },
        },
      },
      TagTimeline: {
        type: 'object',
        title: 'TagTimeline',
        required: ['tag', 'lang', 'total', 'posts'],
        properties: {
          tag: { type: 'string' },
          lang: { $ref: '#/components/schemas/Language' },
          total: { type: 'integer' },
          posts: {
            type: 'array',
            description: 'Posts carrying the tag, newest first.',
            items: { $ref: '#/components/schemas/TimelinePost' },
          },
        },
      },
      SlideDeck: {
        type: 'object',
        title: 'SlideDeck',
        required: [
          'slug',
          'lang',
          'title',
          'description',
          'pubDate',
          'heroImage',
          'type',
          'isDraft',
        ],
        properties: {
          slug: { type: 'string' },
          lang: { $ref: '#/components/schemas/Language' },
          title: { type: 'string' },
          description: { type: 'string' },
          pubDate: { type: 'string', format: 'date-time' },
          heroImage: { type: ['string', 'null'] },
          type: {
            type: 'string',
            enum: ['internal', 'external-embed', 'external-link'],
            description:
              'internal = Reveal.js deck hosted here; external-embed = iframe; external-link = stub info page.',
          },
          isDraft: { type: 'boolean' },
          eventName: {
            type: 'string',
            description: 'Event the deck was presented at.',
          },
          eventDate: { type: 'string', description: 'Event date.' },
          externalUrl: {
            type: 'string',
            format: 'uri',
            description: 'Source deck URL, for external types.',
          },
          provider: {
            type: 'string',
            description: 'External provider (e.g. "speakerdeck", "youtube").',
          },
        },
      },
      SlidesTimeline: {
        type: 'object',
        title: 'SlidesTimeline',
        required: ['lang', 'total', 'decks'],
        properties: {
          lang: { $ref: '#/components/schemas/Language' },
          total: { type: 'integer' },
          decks: {
            type: 'array',
            items: { $ref: '#/components/schemas/SlideDeck' },
          },
        },
      },
      ApiIndex: {
        type: 'object',
        title: 'ApiIndex',
        description:
          'The self-describing endpoint index served at /api/index.json.',
        required: [
          'name',
          'description',
          'version',
          'versioning',
          'authentication',
          'methods',
          'error_format',
          'links',
          'total',
          'endpoints',
        ],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          version: { type: 'string', examples: [API_VERSION] },
          versioning: {
            type: 'object',
            required: ['policy', 'current', 'documentation_url'],
            properties: {
              policy: { type: 'string' },
              current: { type: 'string' },
              documentation_url: { type: 'string', format: 'uri' },
            },
          },
          authentication: {
            type: 'object',
            required: [
              'required',
              'scheme',
              'description',
              'documentation_url',
            ],
            properties: {
              required: { type: 'boolean', examples: [false] },
              scheme: { type: 'string', examples: ['none'] },
              description: { type: 'string' },
              documentation_url: { type: 'string', format: 'uri' },
            },
          },
          methods: { type: 'array', items: { type: 'string' } },
          error_format: {
            type: 'object',
            required: ['media_type', 'description', 'documentation_url'],
            properties: {
              media_type: { type: 'string' },
              description: { type: 'string' },
              documentation_url: { type: 'string', format: 'uri' },
            },
          },
          links: {
            type: 'object',
            description: 'Absolute URLs to every machine-readable document.',
            additionalProperties: { type: 'string', format: 'uri' },
          },
          total: { type: 'integer' },
          endpoints: {
            type: 'array',
            items: {
              type: 'object',
              required: ['operationId', 'description', 'pathTemplate', 'urls'],
              properties: {
                operationId: {
                  type: 'string',
                  description: 'Matches the operationId in openapi.json.',
                },
                description: { type: 'string' },
                pathTemplate: { type: 'string' },
                urls: {
                  type: 'array',
                  items: { type: 'string', format: 'uri' },
                  description: 'Every URL this template currently resolves to.',
                },
              },
            },
          },
        },
      },
    },
  },
};

await writeFile(OUT_PATH, `${JSON.stringify(spec, null, 2)}\n`, 'utf8');

const operations = Object.values(spec.paths).flatMap((item) =>
  Object.values(item)
);
console.log(
  `[openapi] Wrote ${operations.length} operations (${operations.filter((op) => op.operationId).length} with operationId) to ${OUT_PATH}`
);
