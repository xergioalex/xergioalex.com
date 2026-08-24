import { getCollection } from 'astro:content';

import type { APIRoute } from 'astro';

import {
  API_INDEX_URL,
  DEVELOPER_PORTAL_URL,
  OPENAPI_URL,
  SITE_ORIGIN,
} from '@/lib/agent-errors';
import { type ApiOperationId, pathTemplateFor } from '@/lib/api-endpoints';
import { getSeriesTimelineIndex, isPostVisibleInProduction } from '@/lib/blog';
import type { Language } from '@/lib/i18n';

/**
 * `/api/index.json` — the entry point an agent lands on when it guesses `/api`
 * or follows the `hint` in an error response.
 *
 * It lists every endpoint with its real, fully-resolved URLs (not `{lang}`
 * templates), so an agent can enumerate the surface without reading OpenAPI or
 * guessing which `{tag}` values exist.
 */

interface EndpointDescriptor {
  operationId: ApiOperationId;
  description: string;
  /** URL template, matching the paths in `public/openapi.json`. */
  pathTemplate: string;
  /** Every URL this template currently resolves to. */
  urls: string[];
}

const LANGUAGES: Language[] = ['en', 'es'];

async function collectSeriesSlugs(): Promise<Record<Language, string[]>> {
  const allSeries = await getCollection('series');
  const byLang = { en: [] as string[], es: [] as string[] };

  for (const lang of LANGUAGES) {
    for (const series of allSeries) {
      const posts = await getSeriesTimelineIndex(series.id, lang);
      if (posts.length > 0) byLang[lang].push(series.id);
    }
    byLang[lang].sort();
  }

  return byLang;
}

async function collectTimelineTags(): Promise<Record<Language, string[]>> {
  const allPosts = await getCollection('blog');
  const byLang = { en: new Set<string>(), es: new Set<string>() };

  for (const post of allPosts) {
    if (!isPostVisibleInProduction(post)) continue;
    const lang: Language = post.id.startsWith('en/') ? 'en' : 'es';
    for (const tag of post.data.tags ?? []) {
      byLang[lang].add(tag);
    }
  }

  return {
    en: Array.from(byLang.en).sort(),
    es: Array.from(byLang.es).sort(),
  };
}

export const GET: APIRoute = async () => {
  const seriesSlugs = await collectSeriesSlugs();
  const timelineTags = await collectTimelineTags();

  const endpoints: EndpointDescriptor[] = [
    {
      operationId: 'getApiIndex',
      description:
        'This document: every endpoint the public API exposes, with fully-resolved URLs.',
      pathTemplate: pathTemplateFor('getApiIndex'),
      urls: [API_INDEX_URL],
    },
    {
      operationId: 'listPosts',
      description:
        'Combined blog search index across every language — slug, title, description, pubDate, url, lang, tags.',
      pathTemplate: pathTemplateFor('listPosts'),
      urls: [`${SITE_ORIGIN}/api/posts.json`],
    },
    {
      operationId: 'listPostsInEnglish',
      description:
        'Blog search index, English posts only. Prefer this over /api/posts.json when you only need one language.',
      pathTemplate: pathTemplateFor('listPostsInEnglish'),
      urls: [`${SITE_ORIGIN}/api/posts-en.json`],
    },
    {
      operationId: 'listPostsInSpanish',
      description:
        'Blog search index, Spanish posts only. Prefer this over /api/posts.json when you only need one language.',
      pathTemplate: pathTemplateFor('listPostsInSpanish'),
      urls: [`${SITE_ORIGIN}/api/posts-es.json`],
    },
    {
      operationId: 'listSeries',
      description:
        'Every blog series in one language, with post counts and hero images.',
      pathTemplate: pathTemplateFor('listSeries'),
      urls: LANGUAGES.map(
        (lang) => `${SITE_ORIGIN}/api/series/${lang}/index.json`
      ),
    },
    {
      operationId: 'getSeries',
      description:
        'Every post in one series, ordered by seriesOrder, in one language.',
      pathTemplate: pathTemplateFor('getSeries'),
      urls: LANGUAGES.flatMap((lang) =>
        seriesSlugs[lang].map(
          (slug) => `${SITE_ORIGIN}/api/series/${lang}/${slug}.json`
        )
      ),
    },
    {
      operationId: 'getTimelineByTag',
      description:
        'Every post carrying one tag, newest first, in one language. Powers the infinite-scroll timelines.',
      pathTemplate: pathTemplateFor('getTimelineByTag'),
      urls: LANGUAGES.flatMap((lang) =>
        timelineTags[lang].map(
          (tag) => `${SITE_ORIGIN}/api/timeline/${lang}/${tag}.json`
        )
      ),
    },
    {
      operationId: 'getSlidesTimeline',
      description: 'Every published slide deck in one language, newest first.',
      pathTemplate: pathTemplateFor('getSlidesTimeline'),
      urls: LANGUAGES.map(
        (lang) => `${SITE_ORIGIN}/api/slides-timeline/${lang}.json`
      ),
    },
  ];

  const body = {
    name: 'XergioAleX.com public API',
    description:
      'Read-only JSON endpoints exposed by xergioalex.com (a static content site) for agents and developers. No API key, no signup, no rate limit: every endpoint is a cached static file served from Cloudflare CDN.',
    version: '1.0.0',
    versioning: {
      policy:
        'Additive changes (new fields, new endpoints) ship without notice. A breaking change ships as a new path prefix (/api/v2/...) and the current paths keep working for at least 6 months.',
      current: '1.0.0',
      documentation_url: `${DEVELOPER_PORTAL_URL}#versioning`,
    },
    authentication: {
      required: false,
      scheme: 'none',
      description:
        'All endpoints are public, anonymous and read-only. Sending credentials has no effect.',
      documentation_url: `${SITE_ORIGIN}/auth.md`,
    },
    methods: ['GET', 'HEAD'],
    error_format: {
      media_type: 'application/json',
      description:
        'Failed requests return RFC 9457 problem details plus a nested error object with code, message, hint and documentation_url.',
      documentation_url: `${DEVELOPER_PORTAL_URL}#errors`,
    },
    links: {
      openapi: OPENAPI_URL,
      developer_portal: DEVELOPER_PORTAL_URL,
      llms_txt: `${SITE_ORIGIN}/llms.txt`,
      ai_catalog: `${SITE_ORIGIN}/.well-known/ai-catalog.json`,
      mcp_server_card: `${SITE_ORIGIN}/.well-known/mcp/server-card.json`,
      agent_skills: `${SITE_ORIGIN}/.well-known/agent-skills/index.json`,
      auth: `${SITE_ORIGIN}/auth.md`,
    },
    total: endpoints.length,
    endpoints,
  };

  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
