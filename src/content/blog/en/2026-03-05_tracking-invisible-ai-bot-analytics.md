---
title: "Tracking the Invisible: How I Built AI Bot Analytics with Zero JavaScript"
description: "Implementing AI bot analytics with a single Cloudflare Pages middleware file. No JavaScript, no tracking scripts, no infrastructure changes. Just one file at the edge and twelve patterns that changed what I could see."
pubDate: "2026-03-05"
heroImage: "/images/blog/posts/tracking-invisible-ai-bot-analytics/hero.png"
heroLayout: "side-by-side"
tags: ["tech", "portfolio", "web-development", "ai"]
series: "building-xergioalex"
seriesOrder: 7
---

This site runs on Cloudflare Pages. One of the things that comes with the platform is a `functions/` directory — drop a TypeScript file in there, and Cloudflare auto-detects it and deploys it as edge middleware. Every request passes through it. Zero infrastructure to manage.

I had a specific use for that. This is what I built.

---

## The Blind Spot

The analytics stack for this site is something I'm proud of. Umami for privacy-first event tracking. Cloudflare Web Analytics at the edge. Both free. Both fast. Both running without cookie banners or bloated scripts.

What I didn't notice — or didn't think through carefully enough — was who couldn't be counted.

Both of those tools work the same way. A JavaScript snippet runs in the visitor's browser. The snippet fires events. The events hit an API. The numbers go up on a dashboard. That chain only works if there's a browser. If there's a visitor who actually executes JavaScript.

By 2025, some of the most important visitors to a content site are not that kind of visitor.

---

## The Problem With Crawlers

AI crawlers — GPTBot, ClaudeBot, PerplexityBot, the others — don't browse the web the way humans do. They send HTTP requests. They read HTML. They leave. No browser. No JavaScript execution. No event firing.

This means every time GPTBot crawls a page to train a language model, I see nothing. The page is served. The crawler reads it. My analytics register zero. From the dashboard's perspective, the visit never happened.

The irony was sharp. This site had gone out of its way to invite those crawlers. I had written a `robots.txt` that explicitly named all twelve of them with `Allow: /`. I had created `llms.txt` and `llms-full.txt` files — machine-readable summaries of the site's content and contact information, specifically for LLM consumption. I had added structured data to help AI systems understand what the site was about.

I'd built a welcome mat. I had no idea if anyone was walking through.

And it's not just AI bots. RSS readers, search engine crawlers, monitoring tools — the entire non-browser ecosystem is invisible to client-side analytics. I'd assumed "analytics" meant "JavaScript analytics" and never questioned it. That assumption was wrong.

---

## The Solution Looked Like One File

The `functions/` directory is documented in the Cloudflare Pages docs: put a TypeScript file there, and Cloudflare auto-detects it and deploys it as edge middleware. Every request passes through it before being served.

For most static sites, this is unnecessary. The whole appeal of a static site is that you don't need server-side logic. That's still true for 99.9% of what this site does.

But middleware runs on every request regardless. And what I needed was exactly that — something that could inspect the request, look at the User-Agent header, and decide what to do before the static content got served.

The solution was 122 lines. One file. No `wrangler.toml`. No new dependencies. No changes to the Astro build pipeline. Just a TypeScript file in `functions/` and a Cloudflare deployment that auto-detected it.

---

## Walking Through the Code

Here's `functions/_middleware.ts` in full, with explanation of each part.

### The Type Definitions

```typescript
interface Env {
  PUBLIC_UMAMI_WEBSITE_ID?: string;
}

interface EventContext {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
}
```

Cloudflare Pages Functions run in a Worker environment. The `EventContext` interface defines what the middleware receives: the incoming request, the environment (where I read secrets), a `next()` function to pass the request downstream, and `waitUntil()` for non-blocking async work.

I defined these interfaces inline rather than installing `@cloudflare/workers-types`. One dependency avoided, zero tradeoffs — the types I need are narrow and stable.

### The Bot List

```typescript
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
```

Twelve patterns. These are the same twelve bots listed in `robots.txt` with explicit `Allow: /` rules. Not a coincidence — the welcome mat and the doorbell use the same list.

Each entry has a regex pattern and a clean name. The names show up in analytics events, so I wanted them readable. "GPTBot" is more useful in a dashboard than the raw User-Agent string.

### The Detection Function

```typescript
function detectAiBot(userAgent: string): string | null {
  for (const { pattern, name } of AI_BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }
  return null;
}
```

Linear scan through the pattern list. First match wins. Returns the bot's name if found, null if not.

Simple. The list is twelve items. A trie or more sophisticated matching would be premature optimization for something that runs on `null` results 99.9%+ of the time.

### The Request Handler

```typescript
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
```

This is the core. Every request hits this function. The fast path is the first three lines: read the User-Agent, check for bot patterns, return `context.next()` immediately if there's no match. For human visitors, the overhead is one header read and twelve regex tests — microseconds, not milliseconds.

If a bot is detected, two things happen: a console log (for real-time visibility in the Cloudflare dashboard) and a `context.waitUntil()` call to Umami.

Then `context.next()` returns the actual page. The bot gets its response.

### The Umami Payload

```typescript
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
```

Umami's server-side API accepts a JSON payload with a `type` and a `payload`. The event name is `ai_bot_visit` — the same name defined in the site's analytics catalog. The custom `data` object attaches the bot name and path, which means I can filter by bot in the Umami dashboard.

### The Tracking Call

```typescript
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
```

A `fetch` to Umami's API. The whole function is wrapped in a try/catch with an empty catch block. If Umami is down, if the request times out, if the payload is malformed — the site serves normally and no one knows analytics failed. That's the right behavior for instrumentation.

---

## Why These Specific Design Decisions

### Regex Instead of a Library

There's no npm package for AI bot detection here. I considered it briefly, looked at the options, and decided the overhead wasn't worth it — both in bundle size and in dependency maintenance. Twelve regex patterns do the job. The patterns come from the official documentation for each bot (OpenAI, Anthropic, Google, etc.), and they're stable enough that a regex approach will outlast any library that wraps them.

The tradeoff: when a new AI bot appears and I want to track it, I update the array and the `robots.txt` file. Two places. Manual, but obvious. If I used a library, I'd be waiting for a release cycle instead of making a two-line change.

### `waitUntil()` Instead of `await`

This one matters. If I had written:

```typescript
await sendToUmami(websiteId, botName, context.request);
return context.next();
```

Then every bot visit would block waiting for the Umami API call to resolve before returning a response. For a bot that doesn't care about latency, this is pointless. For edge performance, it's actively bad.

`context.waitUntil()` registers a promise to be resolved after the response is sent. The bot gets its response immediately. The Umami call runs in the background. The visitor's experience — even the bot's experience — is unchanged.

This is a pattern from Service Workers and Cloudflare Workers: do the minimum required before responding, defer everything else. Analytics are definitionally "everything else."

### The Same Umami Instance

I track AI bots to the same Umami website as human visitors — not a separate project. The events are tagged `ai_bot_visit` and carry `data.bot` so I can filter and segment. But the data lives in the same place.

The alternative was a separate Umami site just for bots. I thought about it for about thirty seconds and decided it was over-engineering. I want to see bot traffic alongside human traffic — same dashboard, same timeline, same context. A bot visiting the blog the same week as a traffic spike from a shared article is interesting. In separate dashboards, that correlation is harder to spot.

The environment variable `PUBLIC_UMAMI_WEBSITE_ID` is already set in the Cloudflare dashboard — the middleware reads it from `context.env`. I didn't add a new secret or a new environment variable. The infrastructure was already there. That's one of the things I like about Cloudflare Pages as a platform: the pieces fit together in ways you don't have to wire up yourself.

---

## The Debugging I Did That I Shouldn't Have Had To

I want to be honest about one thing: the first version didn't work. Not because of the middleware logic — because of a TypeScript error I introduced trying to be too clever.

My original `buildUmamiPayload` function accepted a `userAgent` parameter to include in the payload. After I wrote it, I decided the bot name was more useful than the raw User-Agent string and removed the usage from the payload body. But I forgot to remove the parameter from the function signature. `astro check` flagged it: declared but never read. One-line fix. Twenty minutes of confused debugging because I'd been staring at the wrong section of the code.

The lesson: when a build check fails after a small change, the error is almost always in the small change. I wasted time looking at the middleware logic when the problem was a function signature one screen up.

---

## What I Can See Now That I Couldn't Before

The Cloudflare dashboard has a real-time log viewer. Within the first hour of deploying the middleware, I saw `[AI Bot] GPTBot → /blog/building-xergioalex-website/ (GET)` scroll past.

That's a real OpenAI crawler, reading one of my blog posts. I have no idea which model training run it fed into, or whether the content ended up in any fine-tuning dataset. But I can see it happened. That's the thing. Before this, it was invisible. Now it's logged.

In Umami, `ai_bot_visit` events show up in the custom events section with the bot name attached. I can filter by `bot = ClaudeBot`, see what pages Anthropic's crawler has visited, and compare that to the page view distribution from human readers. I can track whether bot traffic correlates with publishing new posts. I can see which sections of the site get crawled most.

None of this was possible with client-side analytics. All of it is possible with 122 lines and one file.

---

## Maintaining It Going Forward

The list will need updates. AI crawlers are proliferating. There were five or six when I first put together the `robots.txt` allow list. There are twelve now. By the time you read this, there will probably be more.

My current process: when I see an unfamiliar bot User-Agent in the Cloudflare logs that looks like an AI crawler, I add it. Two changes — one to `AI_BOT_PATTERNS` in the middleware, one to `robots.txt`. Both files are in the same repository. The change is a one-line addition to each.

I'm not monitoring for new bots actively. I'll catch them when they show up in logs as untracked traffic that a search shows is an AI crawler. Not perfect, but good enough for what this is: instrumentation for a personal site, not a production system.

The only thing I'd do differently if I were building this for something bigger: read bot detection patterns from a KV store instead of hardcoding them in the middleware. That way, adding a new bot pattern is a dashboard update rather than a deploy. Something to know about before you need it.

---

## The Bigger Picture

This chapter is, at its surface, about one small middleware file. But I keep coming back to what it represents.

The site was already built for AI — structured data, `llms.txt`, explicit allow rules. But "built for AI" meant "made content discoverable." It said nothing about whether AI systems were actually discovering it. The analytics blind spot wasn't a mistake I made. It was a gap in what the tools could see.

Closing that gap didn't require a new product or a paid service. It required one edge function and the observation that a JavaScript snippet can't run in a crawler that doesn't execute JavaScript. Once that's obvious, the solution follows.

There's something interesting in who does the most crawling and where they go. My hypothesis going in was that blog posts would dominate — long-form text is exactly what language model training scrapes for. I also expected the homepage and `llms.txt` to get traffic from crawlers that are doing a quick surface-level inventory before diving deeper. Whether that's actually what happens is what the data will eventually show.

I think that's worth saying directly: most of the invisible things in web infrastructure aren't invisible because they're complicated to measure. They're invisible because the tools we've been using since 2005 were designed for browsers, and we've been assuming everything worth measuring has a browser attached.

More of it doesn't. That's not changing.

Let's keep building.

---

## Resources

- [Cloudflare Pages Functions Documentation](https://developers.cloudflare.com/pages/functions/)
- [Umami Server-Side API](https://umami.is/docs/api/sending-stats)
- [Cloudflare Pages Functions — Middleware](https://developers.cloudflare.com/pages/functions/middleware/)
- [OpenAI Robots.txt Specification](https://platform.openai.com/docs/bots)
- [Cloudflare Real-Time Logs](https://developers.cloudflare.com/logs/about/)
