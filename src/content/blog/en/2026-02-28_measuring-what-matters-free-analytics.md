---
title: "Measuring What Matters: How I Set Up Free Analytics Without Sacrificing Performance"
description: "The third chapter of building XergioAleX.com — implementing a complete analytics stack using only free tools, without losing the Lighthouse 100 scores or adding cookie banners. A practical guide to privacy-first, performance-preserving web analytics."
pubDate: "2026-02-28"
heroImage: "/images/blog/posts/measuring-what-matters-free-analytics/hero.png"
heroLayout: "side-by-side"
tags: ["tech", "portfolio", "web-development"]
---

In the [first post](/blog/building-xergioalex-website/), I told the story of building this site — from a one-page landing with a photo and five social links to a full personal platform with Astro, Svelte, bilingual content, and an AI-ready architecture. In the [second post](/blog/lighthouse-perfect-scores/), I went deep on achieving perfect Lighthouse scores — 100/100/100/100 across Performance, Accessibility, Best Practices, and SEO, on both mobile and desktop.

Now the site was built. It was fast. It was accessible. It was indexed.

But I had no idea if anyone was reading it.

---

## Flying Blind

There is something strange about publishing content into the void. You write a post, you deploy it, and then... nothing. No feedback loop. No signal. You can check the Cloudflare dashboard and see that yes, the site is being served, but you do not know which pages people visit, which posts they actually read, where they come from, or whether they scroll past the first paragraph.

This is the problem I set out to solve. Not just "add analytics" — but build a measurement system that answers real questions about content and user behavior, without compromising the things I had spent weeks perfecting.

The constraints were clear:

1. **Every tool must be free.** This is a personal site, not a SaaS product. I am not paying $30/month for heatmaps.
2. **Lighthouse scores must stay at 100.** I did not spend weeks optimizing performance and accessibility to throw it away on a bloated tracking script.
3. **No cookie consent banners.** I want visitors to read my content, not dismiss popups. Privacy should be the default, not a toggle.

---

## The Google Analytics Question

Let me address this directly, because it is the first thing everyone asks: "Why not just use Google Analytics?"

Google Analytics 4 is free — in the monetary sense. But the real cost is measured in kilobytes, cookies, and complexity.

**The script is ~70KB.** For context, the entire Atkinson Hyperlegible font that this site uses weighs about 15KB. GA4's tracking script is nearly five times heavier than a custom font. On a site targeting Lighthouse 100, that is not a rounding error — it is a direct threat to your Performance score. The script adds 50-150ms of Total Blocking Time on the main thread.

**It sets cookies.** GA4 places `_ga` and `_ga_*` first-party cookies on every visitor's browser. Under GDPR, these constitute personal data. Which means you need a cookie consent banner. Which means more JavaScript, a UI element that causes layout shifts, and a degraded experience for every first-time visitor.

**The workarounds add complexity.** You can use Partytown to offload GA4 to a web worker and keep the main thread clean. But Partytown has compatibility issues with Astro's View Transitions, adds build complexity, and does not solve the cookie problem.

Here is the honest assessment: everything GA4 provides — pageviews, sessions, referrers, demographics, real-time data — can be covered by lighter, cookieless alternatives. The only things GA4 uniquely offers are advanced audience segmentation and conversion funnels, which a personal blog does not need.

So I made the decision: no GA4. Not because it is bad — it is an incredibly powerful platform — but because the trade-offs do not make sense for this specific site.

---

## The Stack I Chose

Instead of one monolithic analytics tool, I assembled a stack of specialized free tools. Each one is best-in-class at what it does, and together they cover every angle of measurement I need.

### Cloudflare Web Analytics — The Freebie

This one was almost too easy. Since the site is deployed on [Cloudflare Pages](https://pages.cloudflare.com), I already had access to Cloudflare Web Analytics. It is included for free with every Cloudflare account.

What makes it special is that it requires **zero code changes**. Cloudflare injects a tiny beacon (~1KB) at the edge — it never touches your source code, your build pipeline, or your HTML. You enable it in the dashboard with a single click.

It provides:
- Page views, visits, and unique visitors
- Top pages by traffic
- Referral sources
- Visitor countries, browsers, and device types
- **Real User Monitoring (RUM)** with Core Web Vitals: LCP, INP, CLS, FCP, TTFB

That last point is crucial. Lighthouse gives you lab scores — measurements taken under controlled conditions. Cloudflare gives you **field data** — what real users actually experience. You might score 100 on Lighthouse but have a slow LCP for users in South America on mobile. Only RUM data reveals that.

No cookies. No consent banner. No performance impact. It was activated before I wrote a single line of analytics code.

### Umami — The GA4 Replacement

[Umami](https://umami.is) is an open-source, privacy-first analytics tool. The cloud version has a free tier that supports up to 1 million events per month — more than enough for any personal site.

What drew me to Umami was the combination of features and philosophy:

- **Cookieless by design.** No cookies, no fingerprinting, no personal data collection. GDPR compliant out of the box.
- **~2KB script.** Compare that to GA4's ~70KB. The script loads with `defer` and has zero impact on page rendering.
- **Clean dashboard.** Top pages, referrers, UTM campaign tracking, custom events, bounce rate, time on page — presented in a fast, clutter-free interface.
- **Custom events.** I can track specific interactions — external link clicks, language switches, blog post engagement — by calling a simple `trackEvent()` function.

The integration was straightforward. One `<script>` tag in `BaseHead.astro`, conditionally rendered only when the `PUBLIC_UMAMI_WEBSITE_ID` environment variable is set:

```astro
{ANALYTICS.umami.websiteId && (
  <script
    defer
    src={ANALYTICS.umami.scriptUrl}
    data-website-id={ANALYTICS.umami.websiteId}
  />
)}
```

If the environment variable is not configured — like in local development — the script simply does not render. Zero overhead.

### Microsoft Clarity — The Eye-Opener

This is the tool that surprised me the most. [Microsoft Clarity](https://clarity.microsoft.com) is completely free — no traffic limits, no premium tier, no catch. And what it provides is something no traffic analytics tool can: **you can watch real people use your site.**

Clarity records user sessions and generates heatmaps. Click heatmaps show where people click. Scroll heatmaps show how far they scroll. Session recordings let you watch an anonymized replay of an actual visit.

For a blog, this is transformative. I can see:
- **Do readers actually finish my posts?** Scroll heatmaps reveal the exact point where most visitors stop scrolling. If 80% of readers bail after the second paragraph, that is a signal to improve the opening.
- **Where do they click?** Are people clicking on the tags? The internal links? The social buttons?
- **What frustrates them?** Clarity detects "rage clicks" — rapid repeated clicks on an element that is not responding. Dead click detection finds elements that look clickable but are not.

The script is ~10KB and loads asynchronously. It uses an IIFE pattern that initializes without blocking the page:

```astro
{ANALYTICS.clarity.projectId && (
  <script is:inline define:vars={{ clarityId: ANALYTICS.clarity.projectId }}>
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script",clarityId);
  </script>
)}
```

Same conditional pattern: no environment variable, no script.

### Google Search Console + Bing Webmaster Tools — The SEO Layer

These two are not analytics scripts — they are dashboard-only tools that require verification via a `<meta>` tag. Zero performance impact.

**Google Search Console** answers the question every content creator cares about: "What are people searching for to find my site?" It shows which queries generate impressions, which ones get clicks, and the average position for each. For a blog, this is gold. You can see which posts rank for which terms, which are trending up, and which have high impressions but low click-through (meaning the title and description need work).

**Bing Webmaster Tools** provides similar search data, but with a unique addition: the **AI Performance report**. Launched in 2026, it shows how often your content is cited in Microsoft Copilot and AI-generated summaries in Bing. As AI-driven search becomes more prevalent, this is one of the only tools that gives visibility into how generative engines use your content.

Both verification tags are conditionally rendered:

```astro
{ANALYTICS.verification.google && (
  <meta name="google-site-verification" content={ANALYTICS.verification.google} />
)}
{ANALYTICS.verification.bing && (
  <meta name="msvalidate.01" content={ANALYTICS.verification.bing} />
)}
```

### Lighthouse CI — The Automated Guardian

The final piece is not about measuring visitors — it is about protecting everything I built. [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) is a GitHub Actions workflow that runs Lighthouse audits automatically on every pull request.

It builds the site, tests key pages against performance budgets, and fails the PR if any score drops below the threshold. The budgets are set to match the site's current standards:

- Performance: >= 95
- Accessibility: = 100
- Best Practices: >= 95
- SEO: >= 95

The thresholds are slightly below 100 to account for CI environment variance (Lighthouse scores can fluctuate by 2-3 points between runs), while still catching any real regression. If I accidentally add a render-blocking script, an image without dimensions, or break an ARIA pattern, Lighthouse CI will flag it before the code reaches production.

---

## The Performance Test

The question I kept asking myself throughout this process: **did adding all these analytics break my Lighthouse 100 scores?**

The total overhead of all analytics scripts is approximately **12KB loaded asynchronously**:
- Umami: ~2KB (defer)
- Clarity: ~10KB (async IIFE)
- Verification meta tags: negligible

For comparison, a single blog post hero image weighs 50-200KB. The analytics scripts are lighter than a small JPEG.

More importantly, all scripts use `defer` or `async` loading, which means they do not block the page render. They do not affect Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), or Total Blocking Time (TBT) — the three metrics that drive Lighthouse's Performance score.

The answer: **no, the scores held at 100.** The site deploys with the same perfect scores it had before analytics were added. The key was choosing the right tools from the start — lightweight, async scripts instead of a single heavy tracker.

---

## What I Can Measure Now

With this stack in place, I have answers to questions I could not answer before:

| Question | Tool |
|----------|------|
| How many people visit the site? | Cloudflare + Umami |
| Which blog posts get the most traffic? | Umami (Top Pages) |
| Where do visitors come from? | Umami (Referrers) |
| What do people search to find the site? | Google Search Console |
| Do readers actually finish blog posts? | Clarity (scroll heatmaps) |
| Where do visitors click? | Clarity (click heatmaps) |
| Is the site fast for real users? | Cloudflare (Core Web Vitals) |
| Will a code change break performance? | Lighthouse CI (automatic on PRs) |
| Is content cited in AI tools? | Bing Webmaster (AI Performance) |

That is comprehensive coverage — traffic, behavior, search, performance, and AI visibility — with zero dollars spent and zero privacy debt incurred.

---

## The Architecture Decision: Conditional Everything

One design decision worth highlighting: every analytics integration is **conditional**. The scripts and meta tags only render when their corresponding environment variables are set.

In practice, this means:
- **Local development** has zero analytics overhead. No tracking scripts, no external requests.
- **Production** loads only the tools you have configured. Set one variable, get one tool. Set all of them, get the full stack.
- **New environments** work immediately without any analytics — nothing breaks if the variables are not configured.

This was implemented through a centralized `ANALYTICS` configuration object in `src/lib/constances.ts` that reads from `import.meta.env`:

```typescript
export const ANALYTICS = {
  umami: {
    websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '',
    scriptUrl: import.meta.env.PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js',
  },
  clarity: {
    projectId: import.meta.env.PUBLIC_CLARITY_PROJECT_ID || '',
  },
  verification: {
    google: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    bing: import.meta.env.PUBLIC_BING_SITE_VERIFICATION || '',
  },
} as const;
```

All variables use Astro's `PUBLIC_` prefix convention, which makes them available at build time for client-side rendering. The `as const` assertion gives TypeScript full type inference over the configuration.

---

## Looking Back

This was the third chapter of building XergioAleX.com:

1. **Building the platform** — architecture, technology choices, the journey from one page to a full site.
2. **Perfecting the scores** — the meticulous work of achieving Lighthouse 100 across all categories.
3. **Measuring the impact** — adding a complete analytics stack without undoing any of that work.

Each chapter built on the previous one. The architecture decisions from chapter one (Astro, static generation, islands) made chapter two possible. The performance work from chapter two set the constraint for chapter three: whatever analytics I added could not compromise what I had already achieved.

The result is a site that is fast, accessible, measurable, and private — all at the same time. No trade-offs, no compromises, no monthly bills.

If there is one takeaway from this whole journey, it is this: you do not have to choose between understanding your users and respecting them. The right tools, configured thoughtfully, give you both.

---

## Resources

- [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/) — Edge-injected RUM with Core Web Vitals
- [Umami Analytics](https://umami.is) — Open-source, cookieless traffic analytics
- [Microsoft Clarity](https://clarity.microsoft.com) — Free heatmaps and session recordings
- [Google Search Console](https://search.google.com/search-console) — Search performance and indexation
- [Bing Webmaster Tools](https://www.bing.com/webmasters) — Search + AI citation tracking
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) — Automated performance audits in CI
- [Building XergioAleX.com](/blog/building-xergioalex-website/) — First post in this series
- [The Road to 100: Lighthouse Perfect Scores](/blog/lighthouse-perfect-scores/) — Second post in this series
