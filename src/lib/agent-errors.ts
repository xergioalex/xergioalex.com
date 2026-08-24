/**
 * Agent-friendly error payloads for the public API and for 404s.
 *
 * Why this module exists: xergioalex.com is a static site on Cloudflare Pages,
 * so every `src/pages/api/*` route is prerendered at build time and its
 * try/catch never runs at request time. A request for a path that was never
 * built is answered by Cloudflare with the static HTML 404 page — which an
 * agent cannot parse. The Pages Function in `functions/_middleware.ts` uses
 * the helpers below to answer those requests with structured JSON (under
 * `/api/`) or Markdown (everywhere else) instead.
 *
 * The JSON body carries RFC 9457 (Problem Details) members *and* a nested
 * `error` object with `code` / `message` / `hint` / `documentation_url`, so
 * both problem-details clients and plain "read `error.message`" agents work
 * without special-casing. The same shape is published as the `Error` schema
 * in `public/openapi.json` — keep the two in sync.
 */

export const SITE_ORIGIN = 'https://xergioalex.com';
export const DEVELOPER_PORTAL_URL = `${SITE_ORIGIN}/developers`;
export const API_INDEX_URL = `${SITE_ORIGIN}/api/index.json`;
export const OPENAPI_URL = `${SITE_ORIGIN}/openapi.json`;
export const SITEMAP_URL = `${SITE_ORIGIN}/sitemap-index.xml`;
export const LLMS_TXT_URL = `${SITE_ORIGIN}/llms.txt`;

/** Machine-readable error codes. Stable identifiers — never renamed. */
export type AgentErrorCode =
  | 'resource_not_found'
  | 'method_not_allowed'
  | 'gone'
  | 'internal_error';

export interface AgentErrorBody {
  /** RFC 9457 problem type — a URL that documents this class of error. */
  type: string;
  /** RFC 9457 short, human-readable summary of the problem type. */
  title: string;
  /** RFC 9457 HTTP status code, repeated in the body for convenience. */
  status: number;
  /** RFC 9457 human-readable explanation specific to this occurrence. */
  detail: string;
  /** RFC 9457 URI reference identifying the specific occurrence. */
  instance: string;
  /** Agent-oriented view of the same error. */
  error: {
    code: AgentErrorCode;
    message: string;
    /** What to do next to recover, in one sentence. */
    hint: string;
    documentation_url: string;
  };
}

const TITLES: Record<AgentErrorCode, string> = {
  resource_not_found: 'Not Found',
  method_not_allowed: 'Method Not Allowed',
  gone: 'Gone',
  internal_error: 'Internal Server Error',
};

/** Map an HTTP status to the error code this site reports for it. */
export function errorCodeForStatus(status: number): AgentErrorCode {
  if (status === 405) return 'method_not_allowed';
  if (status === 410) return 'gone';
  if (status >= 500) return 'internal_error';
  return 'resource_not_found';
}

/**
 * Which surface the failed request was aimed at. An agent that asked for JSON
 * on a content URL needs page-recovery links, not the endpoint index — telling
 * it "no API resource exists at /nope" would send it down the wrong path.
 */
export type ErrorScope = 'api' | 'site';

export interface BuildApiErrorOptions {
  status: number;
  pathname: string;
  /** Defaults to `'api'`, the surface the JSON error model was written for. */
  scope?: ErrorScope;
  /** Overrides the message derived from the status. */
  message?: string;
  /** Overrides the recovery hint derived from the status. */
  hint?: string;
}

/**
 * Build the canonical JSON error body for a failed request.
 * Mirrors the `Error` schema in `public/openapi.json`.
 */
export function buildApiErrorBody({
  status,
  pathname,
  scope = 'api',
  message,
  hint,
}: BuildApiErrorOptions): AgentErrorBody {
  const code = errorCodeForStatus(status);
  const subject = scope === 'api' ? 'API resource' : 'page';

  const defaultMessage =
    code === 'resource_not_found'
      ? `No ${subject} exists at ${pathname}.`
      : code === 'method_not_allowed'
        ? `The HTTP method used is not allowed on ${pathname}. This site is read-only and accepts GET and HEAD only.`
        : code === 'gone'
          ? `The ${subject} at ${pathname} has been removed permanently.`
          : `The request for ${pathname} could not be completed.`;

  const notFoundHint =
    scope === 'api'
      ? `Fetch ${API_INDEX_URL} for the list of available endpoints, or ${OPENAPI_URL} for the full OpenAPI description. Endpoint paths always end in ".json".`
      : `Fetch ${SITEMAP_URL} for every published URL, or ${LLMS_TXT_URL} for a curated map of the site. Request this URL with "Accept: text/markdown" to get the same recovery list as Markdown.`;

  const defaultHint =
    code === 'resource_not_found'
      ? notFoundHint
      : code === 'method_not_allowed'
        ? 'Retry the same URL with GET.'
        : code === 'gone'
          ? notFoundHint
          : `Retry in a few seconds. If it keeps failing, report it via ${DEVELOPER_PORTAL_URL}.`;

  const resolvedMessage = message ?? defaultMessage;

  return {
    type: `${DEVELOPER_PORTAL_URL}#errors`,
    title: TITLES[code],
    status,
    detail: resolvedMessage,
    instance: pathname,
    error: {
      code,
      message: resolvedMessage,
      hint: hint ?? defaultHint,
      documentation_url: DEVELOPER_PORTAL_URL,
    },
  };
}

/**
 * Candidate static assets to try before declaring an `/api/*` path missing.
 *
 * The endpoints are prerendered files, so `/api/series/en` has no asset of its
 * own even though `/api/series/en/index.json` does. Resolving these two
 * suffixes keeps the directory-style URLs an agent naturally guesses working.
 * Returns an empty list for paths that already name a file.
 */
export function apiAssetFallbacks(pathname: string): string[] {
  if (pathname.includes('.')) return [];
  const trimmed = pathname.replace(/\/+$/, '');
  if (trimmed === '' || trimmed === '/api') return ['/api/index.json'];
  return [`${trimmed}/index.json`, `${trimmed}.json`];
}

/** True when the client asked for JSON rather than a web page. */
export function wantsJson(accept: string): boolean {
  return /\bapplication\/(problem\+)?json\b/i.test(accept);
}

/** True when the client asked for Markdown. */
export function wantsMarkdown(accept: string): boolean {
  return /\btext\/markdown\b/i.test(accept);
}

/**
 * True when the request looks like a browser navigation.
 *
 * Browsers always list `text/html` in `Accept`; agents, CLIs and crawlers
 * send `*\/*`, `application/json` or `text/markdown`. Anything that is not a
 * browser gets the Markdown 404 so it can recover without parsing HTML.
 */
export function prefersHtml(accept: string): boolean {
  return /\btext\/html\b/i.test(accept);
}

/** Language of a path, used to answer 404s in the language that was browsed. */
export function languageForPath(pathname: string): 'en' | 'es' {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en';
}

/**
 * A short Markdown 404 body: what happened, then where to look next.
 *
 * Kept deliberately small — an agent that hits a dead link needs the recovery
 * links, not a sitemap dump.
 */
export function buildNotFoundMarkdown(pathname: string): string {
  const lang = languageForPath(pathname);
  const prefix = lang === 'es' ? '/es' : '';

  if (lang === 'es') {
    return `# 404 — Página no encontrada

No existe ningún recurso en \`${pathname}\` en xergioalex.com.

## Dónde buscar

- [Inicio](${SITE_ORIGIN}${prefix}/)
- [Blog](${SITE_ORIGIN}${prefix}/blog/) — artículos técnicos y personales
- [Series del blog](${SITE_ORIGIN}${prefix}/blog/series/)
- [Tech Talks](${SITE_ORIGIN}${prefix}/tech-talks/)
- [Portal de desarrolladores](${SITE_ORIGIN}${prefix}/developers/) — API, MCP y recursos para agentes

## Índices legibles por máquina

- [llms.txt](${LLMS_TXT_URL}) — mapa del sitio para modelos de lenguaje
- [Sitemap](${SITEMAP_URL}) — todas las URLs publicadas
- [Índice de la API](${API_INDEX_URL}) — todos los endpoints JSON
- [Especificación OpenAPI](${OPENAPI_URL})

Cualquier URL acepta el header \`Accept: text/markdown\` para recibir Markdown en lugar de HTML.
`;
  }

  return `# 404 — Page Not Found

There is no resource at \`${pathname}\` on xergioalex.com.

## Where to look next

- [Home](${SITE_ORIGIN}/)
- [Blog](${SITE_ORIGIN}/blog/) — technical and personal writing
- [Blog series](${SITE_ORIGIN}/blog/series/)
- [Tech talks](${SITE_ORIGIN}/tech-talks/)
- [Developer portal](${DEVELOPER_PORTAL_URL}) — API, MCP and agent resources

## Machine-readable indexes

- [llms.txt](${LLMS_TXT_URL}) — site map for language models
- [Sitemap](${SITEMAP_URL}) — every published URL
- [API index](${API_INDEX_URL}) — every JSON endpoint
- [OpenAPI specification](${OPENAPI_URL})

Any URL accepts the \`Accept: text/markdown\` header to receive Markdown instead of HTML.
`;
}
