/**
 * Cloudflare Pages Middleware — AI Bot Analytics
 *
 * Detects AI crawler visits via User-Agent matching and tracks them
 * server-side to Umami (AI bots don't execute JavaScript, so client-side
 * analytics are invisible to them).
 *
 * Two event types:
 * - ai_bot_visit:     Known AI bots (from the explicit list)
 * - unknown_bot_visit: User-Agents that look like bots but aren't in the list
 *
 * Non-bot requests pass through with zero overhead.
 */

interface Env {
  PUBLIC_UMAMI_WEBSITE_ID?: string;
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
];

/**
 * Generic bot keywords — catches crawlers, spiders, and bots not in the known list.
 * Excludes well-known non-AI bots (Googlebot, Bingbot, etc.) to reduce noise.
 */
const BOT_KEYWORD_PATTERN =
  /bot[\/\s;)]/i;
const SPIDER_CRAWLER_PATTERN =
  /crawler|spider|scraper|fetcher|agent[\/\s;)]/i;

/** Well-known non-AI bots to ignore (search engines, uptime monitors, etc.) */
const IGNORED_BOTS_PATTERN =
  /Googlebot|bingbot|YandexBot|Baiduspider|DuckDuckBot|Slurp|facebot|ia_archiver|Uptimebot|UptimeRobot|pingdom|StatusCake|NodePing|Site24x7|Checkly|DatadogSynthetics|NewRelicPinger|Better Uptime/i;

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
  // Try to grab the first product token, e.g. "DeepSeekBot/1.0" → "DeepSeekBot"
  const match = userAgent.match(/^([^\s\/]+)/);
  const name = match ? match[1] : userAgent;
  // Cap length to keep Umami data clean
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

export async function onRequest(context: EventContext): Promise<Response> {
  const userAgent = context.request.headers.get('user-agent') || '';
  const botName = detectAiBot(userAgent);

  if (botName) {
    // Known AI bot
    const url = new URL(context.request.url);
    console.log(
      `[AI Bot] ${botName} → ${url.pathname} (${context.request.method})`
    );

    const websiteId = context.env.PUBLIC_UMAMI_WEBSITE_ID;
    if (websiteId) {
      context.waitUntil(
        sendToUmami(websiteId, 'ai_bot_visit', botName, context.request)
      );
    }

    return context.next();
  }

  // Check for unknown bots
  if (isUnknownBot(userAgent)) {
    const name = extractBotName(userAgent);
    const url = new URL(context.request.url);
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

  return context.next();
}
