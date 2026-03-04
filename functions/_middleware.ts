/**
 * Cloudflare Pages Middleware — AI Bot Analytics
 *
 * Detects AI crawler visits via User-Agent matching and tracks them
 * server-side to Umami (AI bots don't execute JavaScript, so client-side
 * analytics are invisible to them).
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

/** AI bot User-Agent patterns — mirrors robots.txt Allow list */
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

const UMAMI_API_URL = 'https://cloud.umami.is/api/send';

function detectAiBot(userAgent: string): string | null {
  for (const { pattern, name } of AI_BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }
  return null;
}

function buildUmamiPayload(
  websiteId: string,
  botName: string,
  url: string,
  hostname: string,
  language: string
): object {
  return {
    payload: {
      website: websiteId,
      url,
      hostname,
      language,
      name: 'ai_bot_visit',
      data: {
        bot: botName,
        path: url,
        method: 'GET',
      },
    },
    type: 'event',
  };
}

async function sendToUmami(
  websiteId: string,
  botName: string,
  request: Request
): Promise<void> {
  const requestUrl = new URL(request.url);

  const body = buildUmamiPayload(
    websiteId,
    botName,
    requestUrl.pathname,
    requestUrl.hostname,
    'en-US'
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

  // Non-bot requests: pass through immediately with zero overhead
  if (!botName) {
    return context.next();
  }

  // Bot detected: log to console (visible in CF dashboard real-time logs)
  const url = new URL(context.request.url);
  console.log(
    `[AI Bot] ${botName} → ${url.pathname} (${context.request.method})`
  );

  // Track to Umami via server-side API (non-blocking)
  const websiteId = context.env.PUBLIC_UMAMI_WEBSITE_ID;
  if (websiteId) {
    context.waitUntil(sendToUmami(websiteId, botName, context.request));
  }

  return context.next();
}
