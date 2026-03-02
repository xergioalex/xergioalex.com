# Analytics Guide

This guide documents the analytics stack, monitoring strategy, and best practices for XergioAleX.com.

## Overview

The site uses a **free, privacy-first, performance-preserving** analytics stack. All tools are completely free, most are cookieless (no consent banner needed), and the total script overhead is ~12KB loaded asynchronously — preserving the site's Lighthouse 100 scores.

**Core principles:**
- **Free tools only** — no paid plans required
- **Privacy-first** — cookieless where possible, no GDPR consent banner needed
- **Performance-preserving** — Lighthouse 100 scores in all categories must be maintained
- **Comprehensive coverage** — traffic, behavior, SEO, performance, and content analytics

## Analytics Stack

### Tier 1: Traffic & Performance (Zero-Code)

These tools require no code changes — only dashboard configuration.

#### Cloudflare Web Analytics

| Aspect | Detail |
|--------|--------|
| **What it measures** | Page views, visits, top pages, referrers, countries, browsers, Core Web Vitals (LCP, INP, CLS, FCP, TTFB) |
| **Cost** | Free (included with Cloudflare Pages) |
| **Script size** | ~1KB beacon (edge-injected, no code needed) |
| **Cookies** | None |
| **Consent banner** | Not needed |
| **Data retention** | 6 months |
| **Dashboard** | Cloudflare Dashboard → Pages → Project → Web Analytics |

**Setup (step-by-step):**
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to your Pages project (Workers & Pages → your project)
3. Go to **Speed** → **Web Analytics** (or Settings → Web Analytics depending on dashboard version)
4. Click **Enable** — the beacon is automatically injected at the edge
5. No code changes needed — analytics start collecting immediately on next deployment

**Unique value:** Real User Monitoring (RUM) with Core Web Vitals from actual visitors, filterable by URL, browser, OS, and country. This is real-world performance data that lab tools cannot replicate.

**What's tracked automatically:**
- Page views and unique visits
- Top pages by views
- Top referrers
- Visitor countries, browsers, device types
- Core Web Vitals: LCP, INP, CLS, FCP, TTFB (real user data)

**Limitations:** No custom events, no session-level analysis, 6-month data retention, no export/API access.

**Alternative (manual beacon script):** If deploying outside Cloudflare Pages, you can add the beacon script manually to `BaseHead.astro`. This is typically unnecessary when using CF Pages, since the edge injection handles it automatically.

#### Google Search Console

| Aspect | Detail |
|--------|--------|
| **What it measures** | Search queries, impressions, clicks, CTR, average position, index coverage, Core Web Vitals (field data), rich results |
| **Cost** | Free |
| **Script size** | None (verification via meta tag) |
| **Cookies** | None on visitors |
| **Consent banner** | Not needed |
| **Data retention** | 16 months |
| **Dashboard** | [search.google.com/search-console](https://search.google.com/search-console) |

**Setup:** Verify ownership via meta tag in `BaseHead.astro` (env var: `PUBLIC_GOOGLE_SITE_VERIFICATION`). Submit sitemap at `/sitemap-index.xml`.

**Unique value:** The most direct signal for blog content performance in organic search. Shows which queries drive traffic to which specific blog posts, trending content, and indexation issues.

#### Bing Webmaster Tools

| Aspect | Detail |
|--------|--------|
| **What it measures** | Search queries, clicks, impressions, position, backlinks, AI Performance (Copilot citation tracking) |
| **Cost** | Free |
| **Script size** | None (verification via meta tag) |
| **Cookies** | None on visitors |
| **Consent banner** | Not needed |
| **Dashboard** | [bing.com/webmasters](https://www.bing.com/webmasters) |

**Setup:** Import from Google Search Console for automatic verification. Alternatively, verify via meta tag (env var: `PUBLIC_BING_SITE_VERIFICATION`).

**Unique value:** The AI Performance report shows how often content is cited in Microsoft Copilot and AI-generated summaries — the first public Generative Engine Optimization (GEO) tooling available.

### Tier 2: Detailed Analytics (Lightweight Scripts)

These tools add small tracking scripts to `BaseHead.astro`. Scripts load conditionally — only when environment variables are configured.

#### Umami Analytics

| Aspect | Detail |
|--------|--------|
| **What it measures** | Page views, sessions, bounce rate, time on page, referrers, UTM campaigns, top pages, custom events |
| **Cost** | Free (Cloud tier: up to 1M events/month) |
| **Script size** | ~2KB |
| **Cookies** | None (cookieless by design) |
| **Consent banner** | Not needed |
| **Data retention** | ~6 months (Cloud free tier) |
| **Dashboard** | [cloud.umami.is](https://cloud.umami.is) |
| **Env variable** | `PUBLIC_UMAMI_WEBSITE_ID` |

**Setup:** Register at [umami.is](https://umami.is), create a website, copy the Website ID. Set `PUBLIC_UMAMI_WEBSITE_ID` in environment variables.

**Unique value:** Privacy-first GA4 alternative with a clean, fast dashboard. Top Pages view directly shows which blog content gets the most traction. Custom events track specific interactions (external link clicks, language switches).

**Why Umami over GA4:** ~2KB vs ~70KB script, no cookies, no consent banner needed, GDPR compliant by default. Covers the same traffic analytics use cases without the privacy and performance debt.

#### Microsoft Clarity

| Aspect | Detail |
|--------|--------|
| **What it measures** | Click heatmaps, scroll heatmaps, session recordings, rage clicks, dead clicks, AI-powered behavioral summaries |
| **Cost** | Free (unlimited traffic, no limits) |
| **Script size** | ~10KB (async) |
| **Cookies** | Anonymized behavioral data |
| **Consent banner** | Not required (anonymized, no PII) |
| **Data retention** | 30 days (recordings), 13 months (heatmaps) |
| **Dashboard** | [clarity.microsoft.com](https://clarity.microsoft.com) |
| **Env variable** | `PUBLIC_CLARITY_PROJECT_ID` |

**Setup:** Register at [clarity.microsoft.com](https://clarity.microsoft.com), create a project, copy the Project ID. Set `PUBLIC_CLARITY_PROJECT_ID` in environment variables.

**Unique value:** See exactly how visitors interact with blog posts — scroll heatmaps reveal whether readers finish articles, click heatmaps show engagement patterns, and session recordings let you watch real user journeys. Rage click detection identifies frustrating UX issues.

**Why Clarity over Hotjar:** Completely free with no traffic limits (Hotjar starts at $32/month for session recordings).

### Tier 3: Automated Performance Monitoring

#### Lighthouse CI (Local + GitHub Actions)

| Aspect | Detail |
|--------|--------|
| **What it measures** | Performance, Accessibility, Best Practices, SEO scores per page |
| **Cost** | Free (GitHub Actions + local CLI) |
| **Script size** | None (runs in CI/locally, not on the site) |
| **Runs on** | Every pull request to `main` and `dev` branches, and locally via `npm run lighthouse` |
| **Config** | `lighthouserc.cjs` at project root |

**Setup:** Integrated into the Code Check workflow (`.github/workflows/code_check.yml`). Also available locally via `npm run lighthouse` (requires Chrome). Tests the built `dist/` folder against performance budgets.

**Budgets:**
- Performance: >= 95
- Accessibility: = 100
- Best Practices: >= 95
- SEO: >= 95

**Unique value:** Automated safety net that prevents performance and accessibility regressions. The site currently scores Lighthouse 100 in all categories — this CI check ensures that remains true over time.

## Coverage Matrix

| Question | Answered By |
|----------|-------------|
| How much traffic does the site get? | Cloudflare Web Analytics + Umami |
| Which blog posts have the most traction? | Umami (Top Pages) |
| Where does traffic come from? | Umami (Referrers) + Cloudflare |
| What do people search on Google to find the site? | Google Search Console |
| Is the content cited in AI tools (Copilot)? | Bing Webmaster Tools (AI Performance) |
| Do readers finish blog posts? | Microsoft Clarity (scroll heatmaps) |
| Where do users click on pages? | Microsoft Clarity (click heatmaps) |
| What frustrates users? | Microsoft Clarity (rage clicks + session recordings) |
| Is the site fast for real users? | Cloudflare Web Analytics (Core Web Vitals RUM) |
| Are Lighthouse scores maintained? | Lighthouse CI (automated on every PR) |
| Are all pages indexed by search engines? | Google Search Console + Bing Webmaster Tools |
| Is SEO metadata correct? | Lighthouse CI (SEO audit) |

## Why NOT Google Analytics 4

GA4 was evaluated and intentionally excluded:

| Issue | Impact |
|-------|--------|
| **Script size** | ~70KB (gtag.js) — 35x heavier than Umami (~2KB) |
| **Cookies** | Sets `_ga` and `_ga_*` first-party cookies |
| **GDPR compliance** | Requires a cookie consent banner for EU visitors |
| **Performance** | Adds ~50-150ms Total Blocking Time, risks dropping Lighthouse below 100 |
| **Consent banner** | Additional JS + potential layout shift from the banner itself |
| **Partytown workaround** | Moves script to web worker but adds build complexity and has issues with Astro View Transitions |

**Bottom line:** Everything GA4 provides is already covered by Umami + Cloudflare Web Analytics + Clarity, without the privacy debt, performance cost, or consent banner complexity.

## Environment Variables

All analytics-related environment variables:

| Variable | Tool | Required | Description |
|----------|------|----------|-------------|
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami | Optional | Website ID from Umami Cloud dashboard |
| `PUBLIC_UMAMI_SCRIPT_URL` | Umami | Optional | Script URL (defaults to `https://cloud.umami.is/script.js`) |
| `PUBLIC_CLARITY_PROJECT_ID` | Clarity | Optional | Project ID from Clarity dashboard |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | GSC | Optional | Verification code from Google Search Console |
| `PUBLIC_BING_SITE_VERIFICATION` | Bing | Optional | Verification code from Bing Webmaster Tools |

**All variables are optional.** If not set, the corresponding scripts/meta tags simply don't render. The site works perfectly without any analytics configured.

**Where to set them:**
- **Local development:** `.env.local` file (gitignored)
- **Production (Cloudflare Pages):** Settings > Environment Variables in the CF dashboard

## Dashboard Quick Access

| Tool | URL | Login |
|------|-----|-------|
| Cloudflare Web Analytics | `dash.cloudflare.com` → Pages → Project → Web Analytics | Cloudflare account |
| Umami | [cloud.umami.is](https://cloud.umami.is) | Umami account |
| Microsoft Clarity | [clarity.microsoft.com](https://clarity.microsoft.com) | Microsoft account |
| Google Search Console | [search.google.com/search-console](https://search.google.com/search-console) | Google account |
| Bing Webmaster Tools | [bing.com/webmasters](https://www.bing.com/webmasters) | Microsoft account |
| Lighthouse CI | GitHub PR checks | GitHub account |

## Setup Checklist

### Initial Setup (One-Time)

- [ ] Enable Cloudflare Web Analytics in CF Pages dashboard
- [ ] Register at [umami.is](https://umami.is) and create a website
- [ ] Register at [clarity.microsoft.com](https://clarity.microsoft.com) and create a project
- [ ] Verify site in [Google Search Console](https://search.google.com/search-console)
- [ ] Import GSC data into [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Submit sitemap (`/sitemap-index.xml`) in GSC and Bing
- [ ] Set all `PUBLIC_*` environment variables in Cloudflare Pages dashboard

### Verification

- [ ] Confirm Umami is receiving data (check dashboard after a few page views)
- [ ] Confirm Clarity is recording sessions (check dashboard after ~24 hours)
- [ ] Confirm GSC shows the site as verified and sitemap as submitted
- [ ] Confirm Lighthouse CI runs on PRs (create a test PR)

## Monitoring Routine

### Weekly (~5 minutes)

1. **Umami** → Top Pages: which blog posts are getting traction?
2. **Umami** → Referrers: where is traffic coming from?
3. **Clarity** → Scroll heatmaps: are readers finishing your latest posts?
4. **Clarity** → Rage clicks: is anything frustrating users?

### Monthly (~10 minutes)

1. **Google Search Console** → Performance: which queries are growing/declining?
2. **Google Search Console** → Coverage: are all pages indexed?
3. **Bing Webmaster** → AI Performance: is content being cited in Copilot?
4. **Cloudflare** → Core Web Vitals: are any pages slow for real users?
5. **Umami** → Compare month-over-month traffic trends

### On Every PR (Automatic)

- **Lighthouse CI** runs automatically — check PR status for pass/fail

## Resources

- [Cloudflare Web Analytics Documentation](https://developers.cloudflare.com/web-analytics/)
- [Umami Documentation](https://umami.is/docs)
- [Microsoft Clarity Documentation](https://learn.microsoft.com/en-us/clarity/)
- [Google Search Console Help](https://support.google.com/webmasters/)
- [Bing Webmaster Tools Help](https://www.bing.com/webmasters/help)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
