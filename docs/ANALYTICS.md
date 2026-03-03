# Analytics Guide

This guide documents the analytics stack, monitoring strategy, and best practices for XergioAleX.com.

## Overview

The site uses a **free, privacy-first, performance-preserving** analytics stack. All tools are completely free, most are cookieless (no consent banner needed), and the total script overhead is minimal and loaded asynchronously — preserving the site's Lighthouse 100 scores.

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
| **Script size** | None (DNS TXT verification, no script or meta tag required) |
| **Cookies** | None on visitors |
| **Consent banner** | Not needed |
| **Data retention** | 16 months |
| **Dashboard** | [search.google.com/search-console](https://search.google.com/search-console) |

**Setup:** Verify ownership via Domain property DNS TXT in Search Console. Submit sitemap at `/sitemap-index.xml`.

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

## Custom Event Tracking

Umami custom events are used to track specific user interactions beyond page views. Events are implemented using two approaches depending on the component type.

### Implementation Approaches

| Approach | Used In | How It Works |
|----------|---------|-------------|
| `data-umami-event` HTML attributes | Astro components (`.astro`) | Zero JS overhead — Umami script reads attributes at click time |
| `trackEvent()` programmatic calls | Svelte components (`.svelte`) | Calls `window.umami.track()` inside event handlers |

**Utility file:** `src/lib/analytics.ts` exports the `EVENTS` constant catalog, `trackEvent()`, and helper functions (`trackScrollDepth`, `trackSearch`, `setupOutboundTracking`).

### Event Naming Convention

- All event names use `snake_case`
- Names are descriptive: `{noun}_{verb}` or `{context}_{action}` (e.g., `nav_click`, `contact_form_submit`)
- All event names are defined in the `EVENTS` constant in `src/lib/analytics.ts` — never use raw strings

### Privacy Policy

- **No PII is ever tracked** — no emails, names, phone numbers, or message content
- Contact form tracks validation failure field names (e.g., `{ fields: "name,email" }`) but never field values
- Newsletter form tracks the subscribe event but not the email address
- Umami is cookieless and GDPR-compliant by default

### Event Catalog

| Event | Description | Data Payload | Source Component(s) |
|-------|-------------|-------------|---------------------|
| `nav_click` | Navigation link click | `{ item, source }` | Header.svelte, MobileMenu.svelte |
| `language_switch` | Language toggle | `{ from, to }` | Header.svelte, MobileMenu.svelte |
| `mobile_menu_toggle` | Hamburger menu open/close | `{ action }` | Header.svelte |
| `theme_toggle` | Dark/light mode switch | `{ theme }` | ThemeToggle.astro |
| `blog_search` | Blog search query | `{ query, results }` | StaticBlogSearch.svelte |
| `tag_filter` | Tag/topic filter click | `{ tag }` | BlogHeader.svelte |
| `blog_card_click` | Blog post card click | `{ slug }` | BlogCard.svelte |
| `pagination_click` | Blog pagination | `{ page }` | BlogPagination.svelte |
| `share_click` | Social share button | `{ platform }` | ShareButtons.astro |
| `copy_link` | Copy link button | — | CopyLinkButton.svelte |
| `series_nav` | Series navigation | `{ action }` | SeriesNavigation.astro |
| `series_indicator_click` | Series indicator scroll | — | SeriesIndicator.svelte |
| `lightbox_open` | Image lightbox opened | — | BlogImageLightbox.svelte |
| `contact_form_submit` | Contact form submitted | `{ reason }` | ContactForm.svelte |
| `contact_form_error` | Form validation failure | `{ fields }` | ContactForm.svelte |
| `newsletter_subscribe` | Newsletter signup | — | NewsletterForm.svelte |
| `social_click` | Footer social link | `{ platform }` | Footer.astro |
| `outbound_click` | External link click | `{ url }` | MainLayout.astro (delegated) |
| `scroll_depth` | Scroll milestone | `{ depth }` | BlogPostPage.astro |
| `scroll_to_timeline` | Scroll-to-timeline button | — | ScrollToTimeline.svelte |
| `timeline_click` | Timeline card title click | `{ page, slug }` | PortfolioTimeline, DailyBotTimeline, EntrepreneurTimeline, TechTalksTimeline, TradingTimeline |

### How to Verify Events

1. Run `npm run dev` and open the site in a browser
2. Open DevTools → **Network** tab
3. Filter requests by `api/send` (Umami's event endpoint)
4. Perform an interaction (e.g., click a nav link)
5. Verify a POST request appears with the event name in the payload
6. Check the [Umami Cloud dashboard](https://cloud.umami.is) → Events tab for real-time data

**Manual test matrix:**

| Event | How to Trigger | Expected Data |
|-------|---------------|---------------|
| `nav_click` | Click any nav link in header | `item: "blog"`, `source: "desktop"` |
| `language_switch` | Click EN/ES toggle | `from: "en"`, `to: "es"` |
| `theme_toggle` | Click sun/moon button | `theme: "dark"` or `"light"` |
| `blog_search` | Type 2+ chars in blog search | `query: "astro"`, `results: 3` |
| `tag_filter` | Click a tag on the blog page | `tag: "tech"` |
| `blog_card_click` | Click a blog post title | `slug: "astro-in-action"` |
| `share_click` | Click a share button on a post | `platform: "twitter"` |
| `contact_form_submit` | Submit the contact form | `reason: "project"` |
| `social_click` | Click GitHub/LinkedIn in footer | `platform: "github"` |
| `scroll_depth` | Scroll to bottom of a blog post | `depth: "100"` |
| `timeline_click` | Click a post title in any timeline | `page: "portfolio"`, `slug: "..."` |

### How to Add New Events

1. Add the event name to the `EVENTS` constant in `src/lib/analytics.ts`
2. Choose the implementation approach:
   - **Astro component:** Add `data-umami-event="event_name"` and optional `data-umami-event-*` attributes
   - **Svelte component:** Import `{ EVENTS, trackEvent }` and call `trackEvent(EVENTS.NEW_EVENT, { key: value })`
3. Update this event catalog table
4. Test via DevTools Network tab
5. Verify in Umami dashboard

## Coverage Matrix

| Question | Answered By |
|----------|-------------|
| How much traffic does the site get? | Cloudflare Web Analytics + Umami |
| Which blog posts have the most traction? | Umami (Top Pages) |
| Where does traffic come from? | Umami (Referrers) + Cloudflare |
| What do people search on Google to find the site? | Google Search Console |
| Is the content cited in AI tools (Copilot)? | Bing Webmaster Tools (AI Performance) |
| Do readers finish blog posts? | Umami events + content metrics (time on page, bounce rate) |
| Where do users click on pages? | Umami custom click events |
| What frustrates users? | Funnel drop-off + custom UX events |
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

**Bottom line:** Everything GA4 provides is already covered by Umami + Cloudflare Web Analytics + search console tooling, without the privacy debt, performance cost, or consent banner complexity.

## Environment Variables

All analytics-related environment variables:

| Variable | Tool | Required | Description |
|----------|------|----------|-------------|
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami | Optional | Website ID from Umami Cloud dashboard |
| `PUBLIC_BING_SITE_VERIFICATION` | Bing | Optional | Verification code from Bing Webmaster Tools |

**All variables are optional.** If not set, the corresponding scripts/meta tags simply don't render. The site works perfectly without any analytics configured.

> Note: Google Search Console is part of the analytics stack, but verification is DNS-based (Domain property TXT), so no `PUBLIC_GOOGLE_SITE_VERIFICATION` variable is used.

**Where to set them:**
- **Local development:** `.env.local` file (gitignored)
- **Production (Cloudflare Pages):** Settings > Environment Variables in the CF dashboard

## Dashboard Quick Access

| Tool | URL | Login |
|------|-----|-------|
| Cloudflare Web Analytics | `dash.cloudflare.com` → Pages → Project → Web Analytics | Cloudflare account |
| Umami | [cloud.umami.is](https://cloud.umami.is) | Umami account |
| Google Search Console | [search.google.com/search-console](https://search.google.com/search-console) | Google account |
| Bing Webmaster Tools | [bing.com/webmasters](https://www.bing.com/webmasters) | Microsoft account |
| Lighthouse CI | GitHub PR checks | GitHub account |

## Setup Checklist

### Initial Setup (One-Time)

- [ ] Enable Cloudflare Web Analytics in CF Pages dashboard
- [ ] Register at [umami.is](https://umami.is) and create a website
- [ ] Verify site in [Google Search Console](https://search.google.com/search-console)
- [ ] Import GSC data into [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Submit sitemap (`/sitemap-index.xml`) in GSC and Bing
- [ ] Set all `PUBLIC_*` environment variables in Cloudflare Pages dashboard

### Verification

- [ ] Confirm Umami is receiving data (check dashboard after a few page views)
- [ ] Confirm GSC shows the site as verified and sitemap as submitted
- [ ] Confirm Lighthouse CI runs on PRs (create a test PR)

## Monitoring Routine

### Weekly (~5 minutes)

1. **Umami** → Top Pages: which blog posts are getting traction?
2. **Umami** → Referrers: where is traffic coming from?
3. **Umami** → Event breakdown: are key CTAs getting clicks?
4. **Cloudflare** → Core Web Vitals trends: any real-user regressions?

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
- [Google Search Console Help](https://support.google.com/webmasters/)
- [Bing Webmaster Tools Help](https://www.bing.com/webmasters/help)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
