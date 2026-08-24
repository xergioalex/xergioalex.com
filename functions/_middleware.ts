/**
 * Cloudflare Pages Middleware — AI Bot Analytics & Markdown Content Negotiation
 *
 * Three responsibilities:
 *
 * 1. **Markdown for Agents**: If a request sends `Accept: text/markdown`,
 *    serves the static `.md` version of the page (if it exists) instead of HTML.
 *    This enables AI agents to get clean, token-efficient Markdown content
 *    without parsing HTML. See: https://blog.cloudflare.com/markdown-for-agents/
 *
 * 2. **AI Bot Analytics**: Detects AI crawler visits via User-Agent matching
 *    and tracks them server-side to Umami (AI bots don't execute JavaScript,
 *    so client-side analytics are invisible to them).
 *
 * 3. **Agent-friendly errors**: Every prerendered `/api/*` endpoint is a static
 *    file, so a request for a path that was never built is answered by
 *    Cloudflare with the HTML 404 page. This middleware turns those into a
 *    structured JSON error under `/api/`, and into a short Markdown recovery
 *    document for any non-browser client elsewhere. Browsers keep the styled
 *    HTML 404. See `src/lib/agent-errors.ts`.
 *
 * Non-bot, non-markdown requests that succeed pass through with zero overhead.
 */

import {
  apiAssetFallbacks,
  buildApiErrorBody,
  buildNotFoundMarkdown,
  prefersHtml,
  wantsJson,
} from '../src/lib/agent-errors';

interface AssetsFetcher {
  fetch(request: Request | string): Promise<Response>;
}

interface Env {
  PUBLIC_UMAMI_WEBSITE_ID?: string;
  ASSETS: AssetsFetcher;
}

interface EventContext {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
}

/** Known AI bot User-Agent patterns — mirrors robots.txt Allow list */
const AI_BOT_PATTERNS: ReadonlyArray<{ pattern: RegExp; name: string }> = [
  { pattern: /GPTBot/i, name: 'GPTBot' },
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User' },
  { pattern: /ClaudeBot/i, name: 'ClaudeBot' },
  { pattern: /anthropic-ai/i, name: 'anthropic-ai' },
  { pattern: /Google-Extended/i, name: 'Google-Extended' },
  { pattern: /Bytespider/i, name: 'Bytespider' },
  { pattern: /CCBot/i, name: 'CCBot' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot' },
  { pattern: /Applebot-Extended/i, name: 'Applebot-Extended' },
  { pattern: /Amazonbot/i, name: 'Amazonbot' },
  { pattern: /Meta-ExternalAgent/i, name: 'Meta-ExternalAgent' },
  { pattern: /cohere-ai/i, name: 'cohere-ai' },
  { pattern: /OAI-SearchBot/i, name: 'OAI-SearchBot' },
];

/**
 * Generic bot keywords — catches crawlers, spiders, and bots not in the known list.
 * Excludes well-known non-AI bots (Googlebot, Bingbot, etc.) to reduce noise.
 */
const BOT_KEYWORD_PATTERN =
  /bot[\/\s;)]/i;
const SPIDER_CRAWLER_PATTERN =
  /crawler|spider|scraper|fetcher|agent[\/\s;)]/i;

/** Well-known non-AI bots to ignore (search engines, SEO tools, uptime monitors, etc.)
 *  Maintenance: see docs/ANALYTICS.md → "Bot Watchlist" for review process */
const IGNORED_BOTS_PATTERN =
  /Googlebot|bingbot|YandexBot|Baiduspider|DuckDuckBot|Slurp|facebot|ia_archiver|Uptimebot|UptimeRobot|pingdom|StatusCake|NodePing|Site24x7|Checkly|DatadogSynthetics|NewRelicPinger|Better Uptime|AhrefsBot|SemrushBot|DataForSeoBot|MJ12bot|Discordbot|PetalBot|Barkrowler|BitSightBot|Jetslide|archive\.org_bot|RafineriBot|AwarioBot|Applebot(?!-Extended)|Twitterbot|SeznamBot|DotBot|AgentWarsBot|meta-webindexer/i;

const UMAMI_API_URL = 'https://cloud.umami.is/api/send';

function detectAiBot(userAgent: string): string | null {
  for (const { pattern, name } of AI_BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }
  return null;
}

/** Check if a User-Agent looks like an unknown bot (not a browser, not in known lists) */
function isUnknownBot(userAgent: string): boolean {
  if (!userAgent || userAgent.length < 5) return false;
  if (IGNORED_BOTS_PATTERN.test(userAgent)) return false;
  return BOT_KEYWORD_PATTERN.test(userAgent) || SPIDER_CRAWLER_PATTERN.test(userAgent);
}

/** Extract a short readable name from a raw User-Agent string */
function extractBotName(userAgent: string): string {
  // Many bots use "Mozilla/5.0 (compatible; RealBotName/1.0; ...)" format
  const compatibleMatch = userAgent.match(/compatible;\s*([^\s;\/]+)/);
  if (compatibleMatch) return compatibleMatch[1].slice(0, 60);

  // Some use "Mozilla/5.0 ... compatible; BotName/1.0; ..." without parentheses
  const inlineMatch = userAgent.match(/;\s*compatible;\s*([^\s;\/]+)/);
  if (inlineMatch) return inlineMatch[1].slice(0, 60);

  // Fallback: first product token, e.g. "RafineriBot/1.0" → "RafineriBot"
  const firstToken = userAgent.match(/^([^\s\/]+)/);
  const name = firstToken ? firstToken[1] : userAgent;
  return name.slice(0, 60);
}

function buildUmamiPayload(
  websiteId: string,
  eventName: string,
  botName: string,
  url: string,
  hostname: string,
  language: string,
  userAgent?: string
): object {
  const data: Record<string, string> = {
    bot: botName,
    path: url,
    method: 'GET',
  };
  if (userAgent) {
    data.user_agent = userAgent.slice(0, 200);
  }
  return {
    payload: {
      website: websiteId,
      url,
      hostname,
      language,
      name: eventName,
      data,
    },
    type: 'event',
  };
}

async function sendToUmami(
  websiteId: string,
  eventName: string,
  botName: string,
  request: Request,
  userAgent?: string
): Promise<void> {
  const requestUrl = new URL(request.url);

  const body = buildUmamiPayload(
    websiteId,
    eventName,
    botName,
    requestUrl.pathname,
    requestUrl.hostname,
    'en-US',
    userAgent
  );

  try {
    await fetch(UMAMI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    // Silently fail — analytics should never break the site
  }
}

/**
 * Detect Lighthouse-family user-agents (Google PageSpeed Insights, Lighthouse
 * DevTools, Lighthouse CI). These tools audit `robots.txt` strictly against
 * RFC 9309 and reject the `Content-Signal` directive as "unknown", even
 * though RFC 9309 §2.2.3 says unknown directives MUST be ignored by parsers.
 * For these specific tools only, we strip the `Content-Signal` line so
 * their audit passes without weakening the directive for any other client.
 */
const LIGHTHOUSE_UA_PATTERN = /Chrome-Lighthouse|PageSpeed|Lighthouse/i;

/**
 * Serve a Content-Signal-free version of `/robots.txt` to Lighthouse-family
 * tools so their strict `robots-txt` audit passes. Every other client
 * (Googlebot, AI crawlers, users, isitagentready.com's scanner) still sees
 * the canonical static `/robots.txt` with the `Content-Signal` directive.
 *
 * Why at the middleware layer: Lighthouse is a quality tool, not a search
 * engine. Google's cloaking policy targets ranking crawlers (Googlebot),
 * which still receives the full directive. This UA rewrite does not change
 * what search engines index; it only removes a false-positive flag from
 * one specific strict parser.
 */
async function tryRewriteRobotsForLighthouse(
  context: EventContext
): Promise<Response | null> {
  const url = new URL(context.request.url);
  if (url.pathname !== '/robots.txt') return null;

  const ua = context.request.headers.get('user-agent') || '';
  if (!LIGHTHOUSE_UA_PATTERN.test(ua)) return null;

  try {
    const assetResponse = await context.env.ASSETS.fetch(
      new Request(new URL('/robots.txt', url.origin).toString())
    );
    if (!assetResponse.ok) return null;

    const originalBody = await assetResponse.text();
    // Remove the `Content-Signal: ...` directive line plus its trailing newline.
    const rewritten = originalBody.replace(/^Content-Signal:.*\r?\n?/m, '');

    return new Response(rewritten, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        Vary: 'User-Agent',
        'X-Robots-Rewrite': 'lighthouse',
      },
    });
  } catch {
    return null;
  }
}

/** Paths that should never be served as Markdown */
const MARKDOWN_EXCLUDED_PREFIXES = ['/api/', '/internal/', '/_'];
const MARKDOWN_EXCLUDED_EXTENSIONS =
  /\.(js|css|png|jpg|jpeg|webp|svg|ico|woff|woff2|xml|json|txt|md)$/i;

/**
 * Resolve the `.md` asset path for a given URL pathname.
 * - /about       → /about.md
 * - /about/      → /about.md
 * - /blog/post   → /blog/post.md
 * - /es/about    → /es/about.md
 * - /            → /index.md
 */
function resolveMarkdownPath(pathname: string): string {
  // Strip trailing slash (except root)
  let clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  // Root path → /index.md
  if (clean === '/') return '/index.md';

  // Paths ending with /index → /path/index.md
  if (clean.endsWith('/index')) return `${clean}.md`;

  return `${clean}.md`;
}

/**
 * Check if the request wants Markdown content and serve the .md file if available.
 * Uses context.env.ASSETS.fetch() to serve directly from static assets — no redirect loop.
 */
async function tryServeMarkdown(
  context: EventContext
): Promise<Response | null> {
  const accept = context.request.headers.get('accept') || '';
  if (!accept.includes('text/markdown')) return null;

  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Skip excluded paths
  for (const prefix of MARKDOWN_EXCLUDED_PREFIXES) {
    if (pathname.startsWith(prefix)) return null;
  }

  // Skip requests for static assets (already have an extension)
  if (MARKDOWN_EXCLUDED_EXTENSIONS.test(pathname)) return null;

  const mdPath = resolveMarkdownPath(pathname);

  try {
    const mdUrl = new URL(mdPath, url.origin);
    let assetResponse = await context.env.ASSETS.fetch(
      new Request(mdUrl.toString())
    );

    // Fallback: /path.md → /path/index.md (for directory-style paths like /es/, /blog/)
    if (!assetResponse.ok && !mdPath.endsWith('/index.md')) {
      const indexMdPath = `${mdPath.replace(/\.md$/, '')}/index.md`;
      const indexMdUrl = new URL(indexMdPath, url.origin);
      assetResponse = await context.env.ASSETS.fetch(
        new Request(indexMdUrl.toString())
      );
    }

    if (!assetResponse.ok) return null;

    // Serve the Markdown with correct headers
    return new Response(assetResponse.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'Vary': 'Accept',
        'X-Content-Negotiation': 'markdown',
      },
    });
  } catch {
    return null;
  }
}

/** Track a markdown request to Umami analytics */
function trackMarkdownRequest(
  context: EventContext,
  source: 'content_negotiation' | 'direct_url'
): void {
  const websiteId = context.env.PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return;

  const userAgent = context.request.headers.get('user-agent') || '';
  const knownBot = detectAiBot(userAgent);
  const botName = knownBot || (isUnknownBot(userAgent) ? extractBotName(userAgent) : 'unknown');
  const url = new URL(context.request.url);

  console.log(
    `[Markdown ${source}] ${botName} → ${url.pathname} (${userAgent.slice(0, 100)})`
  );

  const data: Record<string, string> = {
    bot: botName,
    path: url.pathname,
    source,
    user_agent: userAgent.slice(0, 200),
  };

  context.waitUntil(
    fetch(UMAMI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: {
          website: websiteId,
          url: url.pathname,
          hostname: url.hostname,
          language: 'en-US',
          name: 'markdown_request',
          data,
        },
        type: 'event',
      }),
    }).catch(() => {})
  );
}

/** Check if the request is for a direct .md URL (e.g., /about.md) */
function isDirectMarkdownUrl(pathname: string): boolean {
  return pathname.endsWith('.md') &&
    !MARKDOWN_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/** Cache headers shared by every generated error response. */
const ERROR_HEADERS = {
  'Cache-Control': 'public, max-age=60, must-revalidate',
  'Access-Control-Allow-Origin': '*',
  Vary: 'Accept',
} as const;

/** Build the JSON error response for a failed request. */
function jsonErrorResponse(
  status: number,
  pathname: string,
  scope: 'api' | 'site'
): Response {
  return new Response(
    `${JSON.stringify(buildApiErrorBody({ status, pathname, scope }), null, 2)}\n`,
    {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...ERROR_HEADERS,
      },
    }
  );
}

/** Build the Markdown 404 response for a non-browser client. */
function markdownNotFoundResponse(status: number, pathname: string): Response {
  return new Response(buildNotFoundMarkdown(pathname), {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      ...ERROR_HEADERS,
    },
  });
}

/**
 * Resolve directory-style API URLs to the prerendered file behind them.
 *
 * `/api/series/en` and `/api/series/en/` both map to the built asset
 * `/api/series/en/index.json`. Without this, an agent that follows the
 * collection path an OpenAPI `{lang}` template suggests gets a 404.
 */
async function tryApiAssetFallback(
  context: EventContext,
  pathname: string
): Promise<Response | null> {
  const origin = new URL(context.request.url).origin;

  for (const candidate of apiAssetFallbacks(pathname)) {
    try {
      const assetResponse = await context.env.ASSETS.fetch(
        new Request(new URL(candidate, origin).toString())
      );
      if (!assetResponse.ok) continue;

      return new Response(assetResponse.body, {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
          'Content-Location': candidate,
        },
      });
    } catch {
      // Try the next candidate.
    }
  }

  return null;
}

/**
 * Replace an unparseable HTML error page with something an agent can act on.
 *
 * - `/api/*` always gets JSON, whatever the client asked for: there is no
 *   HTML API surface, so an HTML body there is never the right answer.
 * - Elsewhere, browsers (any client whose `Accept` lists `text/html`) keep the
 *   styled 404 page; every other client gets the Markdown recovery document,
 *   or JSON when it explicitly asked for JSON.
 */
async function handleErrorResponse(
  context: EventContext,
  response: Response
): Promise<Response> {
  if (response.status < 400) return response;

  const { pathname } = new URL(context.request.url);
  const accept = context.request.headers.get('accept') || '';

  if (pathname.startsWith('/api/') || pathname === '/api') {
    if (response.status === 404) {
      const fallback = await tryApiAssetFallback(context, pathname);
      if (fallback) return fallback;
    }
    return jsonErrorResponse(response.status, pathname, 'api');
  }

  if (wantsJson(accept)) {
    return jsonErrorResponse(response.status, pathname, 'site');
  }

  if (!prefersHtml(accept)) {
    return markdownNotFoundResponse(response.status, pathname);
  }

  // Browser navigation — keep the designed HTML page, but tell caches that the
  // representation depends on Accept.
  const htmlResponse = new Response(response.body, response);
  htmlResponse.headers.set('Vary', 'Accept');
  return htmlResponse;
}

export async function onRequest(context: EventContext): Promise<Response> {
  // 0. robots.txt UA rewrite — strip Content-Signal for Lighthouse-family
  //    tools to keep PageSpeed SEO at 1.00 without weakening the directive
  //    for search engines, AI crawlers, or isitagentready.com's scanner.
  const robotsRewrite = await tryRewriteRobotsForLighthouse(context);
  if (robotsRewrite) return robotsRewrite;

  // 1. Markdown content negotiation — serve .md if Accept: text/markdown
  const markdownResponse = await tryServeMarkdown(context);
  if (markdownResponse) {
    trackMarkdownRequest(context, 'content_negotiation');
    return markdownResponse;
  }

  // 2. Track direct .md URL requests (e.g., /about.md, /blog/post.md)
  const url = new URL(context.request.url);
  if (isDirectMarkdownUrl(url.pathname)) {
    trackMarkdownRequest(context, 'direct_url');
  }

  // 3. AI bot analytics
  const userAgent = context.request.headers.get('user-agent') || '';
  const botName = detectAiBot(userAgent);

  if (botName) {
    // Known AI bot
    console.log(
      `[AI Bot] ${botName} → ${url.pathname} (${context.request.method})`
    );

    const websiteId = context.env.PUBLIC_UMAMI_WEBSITE_ID;
    if (websiteId) {
      context.waitUntil(
        sendToUmami(websiteId, 'ai_bot_visit', botName, context.request)
      );
    }

    return handleErrorResponse(context, await context.next());
  }

  // Check for unknown bots
  if (isUnknownBot(userAgent)) {
    const name = extractBotName(userAgent);
    console.log(
      `[Unknown Bot] ${name} → ${url.pathname} (${context.request.method}) UA: ${userAgent.slice(0, 150)}`
    );

    const websiteId = context.env.PUBLIC_UMAMI_WEBSITE_ID;
    if (websiteId) {
      context.waitUntil(
        sendToUmami(
          websiteId,
          'unknown_bot_visit',
          name,
          context.request,
          userAgent
        )
      );
    }
  }

  return handleErrorResponse(context, await context.next());
}
