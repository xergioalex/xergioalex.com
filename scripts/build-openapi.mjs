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
const RATE_LIMIT_QUOTA = 300;
const RATE_LIMIT_WINDOW_SECONDS = 60;

const LANG_PARAM = {
  name: 'lang',
  in: 'path',
  required: true,
  description:
    'Content language. English lives at the root, Spanish under /es/.',
  schema: { type: 'string', enum: ['en', 'es'] },
  example: 'en',
};

/**
 * ?limit= on the posts indexes — implemented by the edge middleware over the
 * prerendered array, so the newest N posts can be fetched without downloading
 * the whole index.
 */
const LIMIT_PARAM = {
  name: 'limit',
  in: 'query',
  required: false,
  description:
    'Return at most the N newest posts (1-500). The full index size is reported in the X-Total-Count header. Applies to /api/v1/ URLs too.',
  schema: { type: 'integer', minimum: 1, maximum: 500 },
  example: 5,
};

/**
 * Response headers every operation declares, formalizing the rate-limit and
 * deprecation conventions agents can rely on (see `info.description`).
 */
const STANDARD_RESPONSE_HEADERS = {
  'X-API-Version': { $ref: '#/components/headers/XApiVersion' },
  'RateLimit-Policy': { $ref: '#/components/headers/RateLimitPolicy' },
  RateLimit: { $ref: '#/components/headers/RateLimit' },
  'RateLimit-Limit': { $ref: '#/components/headers/RateLimitLimit' },
  'RateLimit-Remaining': { $ref: '#/components/headers/RateLimitRemaining' },
  'RateLimit-Reset': { $ref: '#/components/headers/RateLimitReset' },
  Deprecation: { $ref: '#/components/headers/Deprecation' },
  Sunset: { $ref: '#/components/headers/Sunset' },
};

/** Headers the sliced posts responses add on top of the standard set. */
const POSTS_HEADERS = {
  ...STANDARD_RESPONSE_HEADERS,
  'X-Total-Count': { $ref: '#/components/headers/XTotalCount' },
};

/**
 * Error responses, attached inline to every operation.
 *
 * The Error schema is referenced directly here rather than through
 * `components.responses` indirection: not every OpenAPI consumer resolves
 * response-level `$ref`s, and an error model a scanner cannot see on the
 * operation is a model it treats as missing.
 */
function inlineErrorResponse(description, example, extraHeaders = {}) {
  return {
    description,
    headers: { ...STANDARD_RESPONSE_HEADERS, ...extraHeaders },
    content: {
      'application/problem+json': {
        schema: { $ref: '#/components/schemas/Error' },
        ...(example ? { examples: { default: { value: example } } } : {}),
      },
      'application/json': {
        schema: { $ref: '#/components/schemas/Error' },
      },
    },
  };
}

const notFoundExample = {
  type: `${ORIGIN}/developers#errors`,
  title: 'Not Found',
  status: 404,
  detail: 'No API resource exists at /api/series/fr/index.json.',
  instance: '/api/series/fr/index.json',
  error: {
    code: 'resource_not_found',
    message: 'No API resource exists at /api/series/fr/index.json.',
    hint: `Fetch ${ORIGIN}/api/index.json for the list of available endpoints, or ${ORIGIN}/openapi.json for the full OpenAPI description. Endpoint paths always end in ".json".`,
    documentation_url: `${ORIGIN}/developers`,
  },
};

const tooManyRequestsExample = {
  type: `${ORIGIN}/developers#rate-limits`,
  title: 'Too Many Requests',
  status: 429,
  detail: `Too many requests to /api/posts.json. The limit is published in the RateLimit-Policy response header; retry after the Retry-After delay.`,
  instance: '/api/posts.json',
  error: {
    code: 'rate_limited',
    message: `Too many requests to /api/posts.json. The limit is published in the RateLimit-Policy response header; retry after the Retry-After delay.`,
    hint: `Wait the number of seconds in the Retry-After header, then retry. The quota and window are in the RateLimit-Policy header; see ${ORIGIN}/developers#rate-limits.`,
    documentation_url: `${ORIGIN}/developers`,
  },
};

/** 400 for invalid query parameters, on operations that accept them. */
const badRequestResponse = inlineErrorResponse(
  'A query parameter is invalid.',
  {
    type: `${ORIGIN}/developers#endpoints`,
    title: 'Bad Request',
    status: 400,
    detail: 'Invalid limit "0": it must be an integer between 1 and 500.',
    instance: '/api/posts-en.json?limit=0',
    error: {
      code: 'invalid_request',
      message: 'Invalid limit "0": it must be an integer between 1 and 500.',
      hint: 'Retry without limit, or with limit between 1 and 500, e.g. /api/posts-en.json?limit=5.',
      documentation_url: `${ORIGIN}/developers`,
    },
  }
);

/** 404 / 429 / 500 responses, attached inline to every operation. */
const errorResponses = {
  404: inlineErrorResponse(
    'No resource exists at that path. The body names the endpoint index so an agent can recover.',
    notFoundExample
  ),
  429: inlineErrorResponse(
    `More than ${RATE_LIMIT_QUOTA} requests per ${RATE_LIMIT_WINDOW_SECONDS} seconds from one client IP. Retry after the Retry-After delay.`,
    tooManyRequestsExample,
    { 'Retry-After': { $ref: '#/components/headers/RetryAfter' } }
  ),
  500: inlineErrorResponse('The request could not be completed.', null),
};

function jsonResponse(description, schemaRef, example, headers) {
  return {
    description,
    headers: headers ?? STANDARD_RESPONSE_HEADERS,
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
  // Machine-readable versioning strategy, mirroring the prose in
  // info.description. A structured declaration next to `info.version` is
  // where tooling looks first.
  'x-versioning': {
    strategy: ['url-prefix', 'response-header'],
    current: API_VERSION,
    url_prefixes: {
      '': `${ORIGIN}/api/`,
      v1: `${ORIGIN}/api/v1/`,
    },
    version_header: 'X-API-Version',
    deprecation: {
      headers: ['Deprecation', 'Sunset'],
      specification: ['RFC 9745', 'RFC 8594'],
      notice:
        'At least six months of overlap before a prefixed path stops serving.',
      next_breaking_prefix: '/api/v2/',
    },
  },
  info: {
    title: 'XergioAleX.com Public API',
    version: API_VERSION,
    summary:
      'Read-only JSON endpoints for the blog, series, tag timelines and slide decks of xergioalex.com.',
    description: [
      'The public API of **XergioAleX.com**, the personal site and technical blog of Sergio Alexander Florez Galeano (XergioAleX), CTO & Co-founder at DailyBot.',
      '',
      '`xergioalex.com` is a static site on Cloudflare Pages: every endpoint below is a prerendered JSON file served from the CDN, fronted by an edge middleware.',
      '',
      '## Authentication',
      '',
      'None. Every endpoint is public, anonymous and read-only — no API key, no signup, no OAuth flow. Sending credentials has no effect. See <' +
        ORIGIN +
        '/auth.md>.',
      '',
      '## Methods and rate limits',
      '',
      `\`GET\` and \`HEAD\` only. Requests are rate limited per client IP: ${RATE_LIMIT_QUOTA} requests per sliding ${RATE_LIMIT_WINDOW_SECONDS}-second window, best-effort enforced at the edge (Cloudflare may run several middleware isolates, so the effective ceiling can be a small multiple of the quota).`,
      '',
      'Every response carries the quota in the RateLimit header fields of `draft-ietf-httpapi-ratelimit-headers` — `RateLimit-Policy` and `RateLimit` — plus the `RateLimit-Limit` / `RateLimit-Remaining` / `RateLimit-Reset` aliases from earlier drafts of the same specification. Exceeding the quota returns `429 Too Many Requests` with `Retry-After` (RFC 6585); honor `Retry-After` and retry. Responses are cacheable for one hour (`Cache-Control: public, max-age=3600`) and CORS is open (`Access-Control-Allow-Origin: *`).',
      '',
      '## Versioning and deprecation',
      '',
      `The API follows semantic versioning, currently \`${API_VERSION}\`. The strategy is both URL- and header-based: every response carries the version in the \`X-API-Version\` header, and the current major version is addressable under \`/api/v1/...\` — \`https://' +
        ORIGIN +
        '/api/v1/posts.json\` serves exactly what \`/api/posts.json\` serves.`,
      '',
      'Additive changes — new endpoints, new optional fields — ship without notice and without a version bump in the path.',
      '',
      'A breaking change (a removed or retyped field, a removed endpoint) ships under a new path prefix `/api/v2/...`, and the current unprefixed paths keep working for at least six months after that. During that deprecation window every response from an affected endpoint carries `Deprecation` (RFC 9745, the date the deprecation started) and `Sunset` (RFC 8594, the date the endpoint stops working). Poll `' +
        ORIGIN +
        '/api/index.json` to read the version and policy at runtime.',
      '',
      '## Errors',
      '',
      'Failed requests return RFC 9457 problem details — `application/problem+json` with `type`, `title`, `status`, `detail`, `instance` — plus a nested `error` object carrying a stable `code`, a human `message`, a recovery `hint` and a `documentation_url`. `429` responses follow the same model. HTML is never returned under `/api/`.',
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
          200: jsonResponse('The API index.', '#/components/schemas/ApiIndex', {
            name: 'XergioAleX.com public API',
            version: API_VERSION,
            total: 8,
            links: { openapi: `${ORIGIN}/openapi.json` },
            endpoints: [
              {
                operationId: 'listPosts',
                description:
                  'Combined blog search index across every language.',
                pathTemplate: '/api/posts.json',
                urls: [`${ORIGIN}/api/posts.json`],
              },
            ],
          }),
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
        parameters: [LIMIT_PARAM],
        responses: {
          200: jsonResponse(
            'Every published post in every language.',
            '#/components/schemas/PostIndex',
            [
              {
                id: 'en/2026-08-20_aeo-score-100-on-isitagentready',
                slug: 'aeo-score-100-on-isitagentready',
                lang: 'en',
                title:
                  'What It Actually Takes to Score 100 on isitagentready.com',
                description: 'A field guide to agent readiness.',
                pubDate: '2026-08-20T12:00:00.000Z',
                tags: ['tech'],
                topics: ['aeo'],
                subtopics: [],
                heroImage:
                  '/images/blog/posts/aeo-score-100-on-isitagentready/hero.webp',
              },
            ],
            POSTS_HEADERS
          ),
          400: badRequestResponse,
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
        parameters: [LIMIT_PARAM],
        responses: {
          200: jsonResponse(
            'Every published English post.',
            '#/components/schemas/PostIndex',
            [
              {
                id: 'en/2026-08-20_aeo-score-100-on-isitagentready',
                slug: 'aeo-score-100-on-isitagentready',
                lang: 'en',
                title:
                  'What It Actually Takes to Score 100 on isitagentready.com',
                description: 'A field guide to agent readiness.',
                pubDate: '2026-08-20T12:00:00.000Z',
                tags: ['tech'],
                topics: ['aeo'],
                subtopics: [],
                heroImage: null,
              },
            ],
            POSTS_HEADERS
          ),
          400: badRequestResponse,
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
        parameters: [LIMIT_PARAM],
        responses: {
          200: jsonResponse(
            'Every published Spanish post.',
            '#/components/schemas/PostIndex',
            [
              {
                id: 'es/2026-08-20_aeo-score-100-on-isitagentready',
                slug: 'aeo-score-100-on-isitagentready',
                lang: 'es',
                title:
                  'Lo que de verdad hace falta para lograr 100 en isitagentready.com',
                description:
                  'Una guía de campo sobre preparación para agentes.',
                pubDate: '2026-08-20T12:00:00.000Z',
                tags: ['tech'],
                topics: ['aeo'],
                subtopics: [],
                heroImage: null,
              },
            ],
            POSTS_HEADERS
          ),
          400: badRequestResponse,
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
            '#/components/schemas/SeriesListing',
            {
              lang: 'en',
              total: 1,
              series: [
                {
                  slug: 'trading-journey',
                  title: 'Trading Journey',
                  description: 'From manual to algorithmic trading.',
                  order: 1,
                  postCount: 3,
                  heroImage: null,
                  firstPostHero: null,
                  lastPostDate: '2026-02-10T12:00:00.000Z',
                },
              ],
            }
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
            '#/components/schemas/SeriesDetail',
            {
              series: 'trading-journey',
              lang: 'en',
              total: 1,
              posts: [
                {
                  slug: 'my-trading-journey-from-futures-to-forex',
                  lang: 'en',
                  title: 'My Trading Journey: From Futures to Forex',
                  description: 'Where the journey started.',
                  pubDate: '2025-11-02T12:00:00.000Z',
                  tags: ['trading'],
                  heroImage: null,
                  isDraft: false,
                },
              ],
            }
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
            '#/components/schemas/TagTimeline',
            {
              tag: 'tech',
              lang: 'en',
              total: 1,
              posts: [
                {
                  slug: 'aeo-score-100-on-isitagentready',
                  lang: 'en',
                  title:
                    'What It Actually Takes to Score 100 on isitagentready.com',
                  description: 'A field guide to agent readiness.',
                  pubDate: '2026-08-20T12:00:00.000Z',
                  tags: ['tech', 'aeo'],
                  heroImage: null,
                  isDraft: false,
                },
              ],
            }
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
            '#/components/schemas/SlidesTimeline',
            {
              lang: 'en',
              total: 1,
              decks: [
                {
                  slug: 'supercharging-dev-productivity-with-ai',
                  lang: 'en',
                  title: 'Supercharging Developer Productivity with AI',
                  description: 'A talk on AI-assisted development.',
                  pubDate: '2025-08-13T17:30:00.000Z',
                  heroImage: null,
                  type: 'external-embed',
                  isDraft: false,
                },
              ],
            }
          ),
          ...errorResponses,
        },
      },
    },
  },
  components: {
    headers: {
      XApiVersion: {
        description: `Semantic version of the API, currently ${API_VERSION}.`,
        schema: { type: 'string', example: API_VERSION },
      },
      RateLimitPolicy: {
        description:
          'Quota policy (draft-ietf-httpapi-ratelimit-headers-11): a quoted policy name with q = quota and w = window in seconds.',
        schema: {
          type: 'string',
          example: `"edge";q=${RATE_LIMIT_QUOTA};w=${RATE_LIMIT_WINDOW_SECONDS}`,
        },
      },
      RateLimit: {
        description:
          'Quota status for this request: r = remaining requests, t = effective window in seconds.',
        schema: {
          type: 'string',
          example: `"edge";r=${RATE_LIMIT_QUOTA - 1};t=${RATE_LIMIT_WINDOW_SECONDS}`,
        },
      },
      RateLimitLimit: {
        description:
          'Requests allowed per window (alias from earlier drafts of the rate-limit specification).',
        schema: { type: 'integer', example: RATE_LIMIT_QUOTA },
      },
      RateLimitRemaining: {
        description: 'Requests still allowed in this window.',
        schema: { type: 'integer', example: RATE_LIMIT_QUOTA - 1 },
      },
      RateLimitReset: {
        description: 'Seconds until the window resets.',
        schema: { type: 'integer', example: RATE_LIMIT_WINDOW_SECONDS },
      },
      XTotalCount: {
        description:
          'Full size of the posts index when ?limit= sliced the response.',
        schema: { type: 'integer', example: 194 },
      },
      RetryAfter: {
        description:
          'Seconds to wait before retrying (RFC 6585). Present on 429 responses.',
        schema: { type: 'integer', example: RATE_LIMIT_WINDOW_SECONDS },
      },
      Deprecation: {
        description:
          'RFC 9745. Present only once the operation is deprecated: the date the deprecation began. Consumers should treat any 410/Gone as final.',
        schema: {
          type: 'string',
          example: 'Mon, 01 Jun 2026 00:00:00 GMT',
        },
      },
      Sunset: {
        description:
          'RFC 8594. Present only on deprecated operations: the date the operation stops working. Current operations carry no Sunset header.',
        schema: {
          type: 'string',
          example: 'Sun, 01 Nov 2026 00:00:00 GMT',
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
                  'invalid_request',
                  'resource_not_found',
                  'method_not_allowed',
                  'gone',
                  'rate_limited',
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
          'rate_limit',
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
            required: [
              'policy',
              'current',
              'version_header',
              'url_prefixes',
              'deprecation_headers',
              'documentation_url',
            ],
            properties: {
              policy: { type: 'string' },
              current: { type: 'string' },
              version_header: {
                type: 'string',
                description: 'Response header carrying the API version.',
                examples: ['X-API-Version'],
              },
              url_prefixes: {
                type: 'array',
                items: { type: 'string', format: 'uri' },
                description:
                  'Every URL prefix the current version answers on: unversioned and /api/v1/.',
              },
              deprecation_headers: {
                type: 'array',
                items: { type: 'string' },
                description:
                  'Headers a deprecated endpoint answers with during the overlap window.',
              },
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
          rate_limit: {
            type: 'object',
            description:
              'The quota enforced at the edge and how it is signalled.',
            required: [
              'quota',
              'window_seconds',
              'enforcement',
              'headers',
              'throttle_response',
              'documentation_url',
            ],
            properties: {
              quota: {
                type: 'integer',
                description: 'Requests allowed per window per client IP.',
                examples: [RATE_LIMIT_QUOTA],
              },
              window_seconds: {
                type: 'integer',
                description: 'Sliding window length, in seconds.',
                examples: [RATE_LIMIT_WINDOW_SECONDS],
              },
              enforcement: {
                type: 'string',
                description:
                  'How the quota is enforced. "best-effort-edge" means per middleware isolate.',
                examples: ['best-effort-edge'],
              },
              headers: {
                type: 'array',
                items: { type: 'string' },
                description:
                  'Every response carries these; a 429 also carries Retry-After.',
              },
              throttle_response: {
                type: 'object',
                properties: {
                  status: { type: 'integer', examples: [429] },
                  content_type: {
                    type: 'string',
                    examples: ['application/problem+json'],
                  },
                  retry_after: { type: 'string' },
                },
              },
              documentation_url: { type: 'string', format: 'uri' },
            },
          },
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
