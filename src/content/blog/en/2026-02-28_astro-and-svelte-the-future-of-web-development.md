---
title: "Astro and Svelte: Why I Believe They're the Future of Web Development"
description: "Why Astro and Svelte represent a return to web development simplicity — backed by data from State of JS 2025, performance benchmarks, and real-world experience building this very website."
pubDate: "2026-02-28"
heroImage: "/images/blog/posts/astro-and-svelte-the-future-of-web-development/hero.webp"
heroLayout: "banner"
tags: ["portfolio", "tech"]
---

I remember when building a website was simple. You opened a text editor, wrote an HTML file, linked a CSS stylesheet, maybe dropped in a script tag for interactivity, and opened it in the browser. It worked. No bundlers, no transpilers, no dependency hell, no 47-step configuration before you could render "Hello World."

That simplicity wasn't a limitation — it was the web's greatest feature. The barrier to entry was low. The feedback loop was instant. You wrote code, you saw results.

Then the industry decided that wasn't enough.

---

## The Over-Engineering Problem

Somewhere along the way, building for the web became unnecessarily complex. We started needing build pipelines to ship a landing page. Creating a component in React — arguably the most popular framework — requires importing the library, defining a function, managing state with hooks, handling effects, dealing with dependency arrays, and finally returning JSX that compiles to virtual DOM operations. All of this for what might be a simple card that displays a title and an image.

Here's what a basic interactive counter looks like in React:

```jsx
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

It's not terrible. But it's a lot of ceremony for something this simple. `useState`, `useEffect`, dependency arrays, the function-as-a-component pattern, JSX compilation. And this is the *simplest* example. Add data fetching, error handling, context providers, and you're looking at pages of boilerplate before you've written any actual business logic.

The irony? Most websites are fundamentally **content sites** — blogs, portfolios, documentation, marketing pages, landing pages. They're mostly static. A wall of text with some images, maybe a contact form or a search bar. And yet we ship a full JavaScript runtime — hundreds of kilobytes of framework code — to display content that hasn't changed since the last build.

This is the over-engineering tax we pay every day. And it doesn't have to be this way.

---

## Astro: Back to the Origins

[Astro](https://astro.build) changed everything for me. When I first discovered it, the feeling was immediate: *this is what web development should have always been*.

An Astro component looks like this:

```astro
---
const title = "Hello World";
const posts = await fetch('/api/posts').then(r => r.json());
---

<section>
  <h1>{title}</h1>
  <ul>
    {posts.map(post => (
      <li><a href={post.url}>{post.title}</a></li>
    ))}
  </ul>
</section>

<style>
  section { max-width: 800px; margin: 0 auto; }
</style>
```

Look at that. It's HTML with superpowers. The frontmatter (between the `---` fences) runs at **build time** — it fetches data, imports components, processes anything you need. The template below is essentially HTML with expressions. The styles are scoped. No virtual DOM. No runtime. No `useEffect`. No dependency arrays. No client-side hydration by default.

The output? **Pure static HTML.** Zero JavaScript sent to the browser unless you explicitly ask for it.

This is what I mean by "back to the origins." Astro brings back the simplicity of writing an HTML file with a script tag, but with modern developer experience — TypeScript support, component architecture, build-time data fetching, and optimized output. The best of both worlds.

### The Philosophy: Ship Less, Deliver More

Astro is built on a radical premise: **your website probably doesn't need JavaScript**. Not all of it, anyway. Most pages are content. Content doesn't need a runtime. It needs HTML.

When you *do* need interactivity — a search bar, a navigation menu, a theme toggle — Astro uses an **Islands Architecture**. Instead of hydrating the entire page (like Next.js or Gatsby), you hydrate individual components:

```astro
---
import Header from '@/components/layout/Header.svelte';
import BlogSearch from '@/components/blog/StaticBlogSearch.svelte';
---

<!-- Hydrate immediately — navigation needs to work right away -->
<Header client:load lang="en" />

<!-- Hydrate when visible — search isn't needed until scrolled to -->
<BlogSearch client:visible posts={posts} />

<!-- Everything else? Zero JavaScript. Pure HTML. -->
<article>
  <h1>{post.title}</h1>
  <p>{post.content}</p>
</article>
```

You control exactly **when** and **how** each interactive piece loads:

- `client:load` — Hydrate immediately (critical UI)
- `client:visible` — Hydrate when scrolled into view (lazy)
- `client:idle` — Hydrate when the browser is idle (deferred)

A page with 95% static content and one search component? Only the search component ships JavaScript. Everything else is zero-cost HTML. This is granular control that React-based frameworks simply don't offer. In Next.js, even a fully static page bundles the React runtime — about **85KB** of JavaScript before you've written a single line of your own code.

---

## Svelte: The Perfect Companion

If Astro is the foundation, [Svelte](https://svelte.dev) is its ideal partner. And I don't say this lightly — I've worked with React, Vue, and Angular across different projects and stages of my career. Svelte is different. It feels like the framework that should have existed from the start.

Svelte's tagline is *"Web development for the rest of us"* — and it means it. Here's that same counter in Svelte:

```svelte
<script>
  let count = $state(0);
  let title = $derived(`Count: ${count}`);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<p>Count: {count}</p>
<button onclick={() => count++}>
  Increment
</button>
```

Compare this to the React version above. No `useState`. No `useEffect`. No dependency arrays. No import statements for framework utilities. You declare state with `$state()`, derived values with `$derived()`, and the compiler figures out what depends on what. It generates the minimal DOM update code at **build time** — no virtual DOM diffing at runtime.

The result is code that reads almost like vanilla HTML with reactive sprinkles. It's closer to the mental model of how the web actually works: you have markup, you have state, state changes update the markup. No layers of abstraction in between.

### Svelte 5 Runes: Reactivity Done Right

Svelte 5 introduced **Runes** — a signal-based reactivity system that's both more powerful and more explicit than previous versions. The key primitives are beautifully simple:

- **`$state()`** — Declare reactive state
- **`$derived()`** — Compute values from other reactive values
- **`$effect()`** — Run side effects when dependencies change
- **`$props()`** — Receive component props with destructuring

Here's a real example from a search component — the kind of thing that would be a mess of hooks in React:

```svelte
<script>
  let { posts, lang } = $props();
  let query = $state('');
  let currentPage = $state(1);

  let filtered = $derived(
    query.length > 2
      ? posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : posts
  );

  let paginated = $derived(
    filtered.slice((currentPage - 1) * 12, currentPage * 12)
  );

  let totalPages = $derived(Math.ceil(filtered.length / 12));
</script>

<input bind:value={query} placeholder="Search posts..." />

{#each paginated as post}
  <article>
    <h3>{post.title}</h3>
    <p>{post.description}</p>
  </article>
{/each}

<span>Page {currentPage} of {totalPages}</span>
```

No `useMemo`. No `useCallback`. No dependency arrays you have to keep in sync manually. No stale closure bugs. The compiler tracks what depends on what and generates the minimal update code. When `query` changes, `filtered` recomputes, which causes `paginated` and `totalPages` to update, and only the affected DOM nodes change. It's reactive, efficient, and readable.

In React, this same logic would require `useState` for the query, `useMemo` for the filtered and paginated lists (with manual dependency arrays), `useCallback` for the filter function, and careful attention to avoid unnecessary re-renders. The Svelte version is half the code with zero performance gotchas.

### Compiled, Not Runtime

Svelte's core innovation is that it's a **compiler**, not a library. While React ships a runtime (~40KB minified + gzipped) that handles virtual DOM diffing, reconciliation, and state management in the browser, Svelte does all that work at **build time**. The output is vanilla JavaScript that makes surgical DOM updates — no intermediate representation, no diffing algorithm, no garbage collection overhead.

For an Astro site that already ships zero JavaScript by default, this matters enormously. When you *do* need an interactive island, Svelte ensures that island is as small as possible. Svelte components compile to an average of **30-40% less JavaScript** than equivalent React components. The interactive layer of my own website — 15 Svelte components including search, navigation, lightbox, timelines, and more — compiles down to a fraction of what a single React runtime would weigh.

### Why Astro + Svelte Feel Made for Each Other

This is where the magic happens. Astro and Svelte share a fundamental philosophy: **do the work at build time, not at runtime**.

- Astro renders pages to static HTML at build time. Zero JavaScript by default.
- Svelte compiles components to minimal JavaScript at build time. No runtime framework overhead.

When you combine them, the result is a site where the static parts ship zero JavaScript and the interactive parts ship the absolute minimum. No React runtime. No virtual DOM. No hydration of content that was never interactive in the first place.

The syntax feels natural too. Astro components use a frontmatter + template pattern. Svelte components use a script + template pattern. Moving between them feels seamless — the mental model is consistent. You write what looks like HTML, with the logic where it belongs.

Here's an example from my own website. The blog search is a Svelte component inside an Astro page:

```astro
---
// Astro: runs at build time
import StaticBlogSearch from '@/components/blog/StaticBlogSearch.svelte';
import { getBlogPosts } from '@/lib/blog';

const posts = await getBlogPosts('en');
---

<!-- Svelte component hydrated only when visible -->
<StaticBlogSearch client:visible posts={posts} lang="en" />
```

The data fetching happens at build time in Astro. The interactive search UI happens at runtime in Svelte. Each framework does what it does best. No overlap, no waste.

Compare this to a React-based approach where you'd need `useEffect` to fetch data on mount, `useState` to store it, a loading state, an error state, and you'd ship the entire React runtime just to display a search box. The Astro + Svelte approach is simpler **and** faster.

---

## The Data Speaks

This is where my personal opinions meet industry reality. I love Astro and Svelte — but am I just a fanboy, or is the community actually moving in this direction?

The data says I'm not alone.

### State of JavaScript 2025

The [State of JS 2025 survey](https://2025.stateofjs.com/en-US) tells a compelling story. In the meta-frameworks category (where Astro properly competes), the results are striking:

- **Astro is #1 in Satisfaction** — with a commanding **39-point lead** over Next.js
- **Next.js satisfaction dropped** from 68% to 55% year-over-year
- **Svelte 5 topped Developer Experience** ratings among front-end frameworks
- **Svelte maintains an 88% retention rate** — among the highest for any framework

The survey commentary puts it directly: *"The main battle has moved to the realm of meta-frameworks, with Astro making a serious attempt at Next.js's crown."*

And another quote that caught my attention: *"One look at the Awareness chart shows how dangerous of a competitor Astro really is."*

This wasn't a niche survey. This is the State of JavaScript — one of the largest developer surveys in the ecosystem.

### State of JavaScript 2024 (The Year Before)

The [2024 edition](https://2024.stateofjs.com/en-US/libraries/front-end-frameworks/) was equally telling:

- Astro ranked **#1 in Interest, #1 in Retention, and #1 in Positivity** in meta-frameworks
- Astro's usage rose from 4th to **2nd place**, trailing only Next.js

Two consecutive years of dominance across every sentiment metric. That's not a fluke — it's a trend.

### Rising Stars of JavaScript 2025

[JavaScript Rising Stars 2025](https://risingstars.js.org/2025/en) tracks GitHub star growth as a proxy for developer interest:

| Project | Category | Stars Added | Rank |
|---------|----------|:-----------:|:----:|
| Astro | Overall | +7,200 | #5 |
| Astro | Static Sites | — | #3 |
| Svelte | Front-end Frameworks | +4,600 | #3 |

The Rising Stars commentary: Astro *"keeps shining as a versatile framework to build content-heavy applications with a great developer experience and a focus on performance."*

### Stack Overflow Developer Survey 2025

The [Stack Overflow 2025 survey](https://survey.stackoverflow.co/2025/) (49,000+ respondents across 177 countries) adds another dimension:

- **Svelte: 53.7% admired** — developers who use it love it
- **Astro: growing faster among learners** (7.7%) than professionals (4.3%) — indicating a strong growth trajectory as new developers adopt it

When a framework has higher adoption among people learning to code, it signals that the future is moving in its direction. Those learners become tomorrow's professionals.

### The Aggregate Picture

| Metric | Value | Source |
|--------|-------|--------|
| Astro satisfaction lead over Next.js | **39 points** | State of JS 2025 |
| Svelte retention rate | **88%** | State of JS 2025 |
| Astro NPM downloads growth | **360K → 900K+/week** (2.5x) | Astro Year in Review |
| Astro GitHub stars | **55,200+** | GitHub |
| Astro GitHub YoY growth | **78%** | GitHub Octoverse 2025 |
| Astro releases in 2025 | **113** | Astro Year in Review |
| Astro users who'd keep using it | **87%** | Developer surveys |
| Svelte admiration rate | **53.7%** | Stack Overflow 2025 |

These aren't marginal differences. Astro's satisfaction lead is **39 points**. Its download growth is **2.5x in a single year**. Svelte's retention is **88%**. These are frameworks that developers actively choose and then keep choosing.

---

## Performance That Proves the Philosophy

Philosophy is nice. Data is better. But performance benchmarks are where Astro and Svelte truly shine — because their architectural decisions translate directly into measurable results.

### The JavaScript Diet

Astro ships **90% less JavaScript** than Next.js for equivalent static content:

| Metric | Astro | Next.js |
|--------|:-----:|:-------:|
| Homepage JS bundle (gzipped) | **~8 KB** | **~85 KB** |
| JS reduction | — | 90% more |
| React runtime included | No | Yes |
| Virtual DOM shipped | No | Yes |

In a real-world comparison, a Next.js site bundled **180 KB** of JavaScript for the same content that Astro delivered with just **18 KB**. That's not optimization — that's a fundamentally different architecture.

### Lighthouse Scores

Astro sites consistently achieve **Lighthouse Performance scores of 98-100**. Not with careful optimization — by default. Because when you ship zero JavaScript, there's nothing to slow down the page.

Real-world migrations tell the story:

- WordPress to Astro: Lighthouse scores jumping from **the 70s to 96+**
- LCP (Largest Contentful Paint) improvements from **3.2s to 1.6s**
- **60%** of Astro sites achieve "Good" Core Web Vitals scores, compared to **38%** for WordPress and Gatsby

On my own site, [xergioalex.com](https://xergioalex.com), the Lighthouse performance score consistently hits the high 90s. The entire blog — 70+ posts in two languages, with search, pagination, tag filtering, and interactive lightboxes — loads instantly. The pages that are pure content (which is most of them) ship literally zero JavaScript.

### Why This Matters

Performance isn't a vanity metric. It directly impacts:

- **User experience** — Pages that load in under 2 seconds feel instant. Pages that take 5+ seconds feel broken.
- **SEO** — Google's Core Web Vitals are a ranking factor. Faster sites rank higher.
- **Accessibility** — Users on slow connections or old devices benefit most from less JavaScript.
- **Cost** — Less JavaScript means less bandwidth, less CPU usage, lower hosting costs.

When Astro and Svelte deliver these results **by default** — without spending weeks on performance optimization — that's a genuine architectural advantage.

---

## The Cloudflare Acquisition: A $40B+ Bet on Astro

In January 2026, something happened that validated everything I'd been feeling about Astro. [Cloudflare acquired The Astro Technology Company](https://astro.build/blog/joining-cloudflare/).

Let that sink in. A company with a market cap exceeding **$40 billion** — one of the most important infrastructure companies on the internet — decided that Astro was so important to the future of the web that they acquired the team behind it.

Cloudflare CEO Matthew Prince put it clearly: *"By acquiring this talented team and committing to one of the most impactful frameworks when it comes to speed and performance, we're going to ensure Astro continues to be the best web framework for content-driven websites, not only as it is today but for years to come."*

What makes this acquisition remarkable:

- **Astro remains MIT-licensed, open-source, and platform-agnostic.** You can still deploy Astro anywhere — Vercel, Netlify, AWS, or your own server. This isn't vendor lock-in.
- **The team can now focus entirely on framework development** instead of building a commercial business around it.
- **Financial backing from the ecosystem** — Webflow ($150K), Cloudflare ($150K), Mux ($5K/month), plus Netlify, Wix, and Sentry contributing to the Astro Ecosystem Fund.

Fred Schott, Astro's founder, noted that Cloudflare and Astro share the same vision: *"Content remains at the center"* of the web's future. Cloudflare approaches it from the infrastructure side; Astro works from the framework side.

This isn't a startup experiment anymore. This is institutional validation that content-first, performance-first web development is the direction the industry is heading.

---

## Enterprise Adoption

It's not just surveys and acquisitions. Astro is being used in production by some of the world's largest companies:

- **Microsoft** — Built their [Fluent 2 Design System](https://fluent2.microsoft.design/) documentation with Astro, building new pages in half the time
- **Google** — Uses Astro for content-driven properties
- **Firebase** — Migrated their blog from Blogger to Astro, reducing publishing time from hours to minutes and build time by 75%
- **Trivago, Visa, NBC News, Unilever** — All using Astro in production

These aren't small companies experimenting with a new toy. These are organizations with millions of users, where performance, reliability, and developer productivity directly impact the bottom line.

And the adoption is accelerating. **18% of surveyed developers** now use Astro, and **87% of Astro users** plan to keep using it — the highest retention intent among all SSGs surveyed. When the vast majority of people who try a tool decide to keep using it, that tells you something about the quality of the experience.

---

## My Experience: This Site Is the Proof

I didn't just read about Astro and Svelte — I built my entire personal platform with them. [XergioAleX.com](https://xergioalex.com) is living proof that this stack works.

The site has:

- **70+ blog posts** in two languages (English and Spanish)
- **Full bilingual architecture** — every page, every UI string, every blog post exists in both languages
- **Client-side search** powered by Fuse.js, lazy-loaded with `requestIdleCallback`
- **15 interactive Svelte components** — navigation, search, lightbox, timelines, and more
- **Dark mode** with system detection and localStorage persistence
- **RSS feeds, sitemap, SEO optimization** — all built-in with Astro

The development experience has been genuinely enjoyable. I've written about it in detail in [Building XergioAleX.com](/blog/building-xergioalex-website/) and presented the Astro philosophy in [Astro in Action](/blog/astro-in-action/). The short version: building with Astro + Svelte feels like the early web with modern superpowers. I write components that look like HTML. I get TypeScript safety. I get blazing-fast builds. And the output is the leanest, fastest site I've ever shipped.

The entire interactive layer — 15 Svelte components covering search, navigation, lightbox, timelines, mobile menu — compiles down to a fraction of what a single React runtime would weigh. And those components only load when they're needed, thanks to Astro's islands architecture.

### The Tech Stack That Powers It

For the curious, here's exactly what's running under the hood:

| Layer | Technology | Role |
|-------|-----------|------|
| Framework | Astro 5.x | Static site generation, routing, Content Collections |
| Interactive UI | Svelte 5.x | Search, navigation, lightbox, timelines |
| Styling | Tailwind CSS 4.x | Utility-first CSS with dark mode support |
| Content | Markdown/MDX | Blog posts with frontmatter validation |
| Type Safety | TypeScript 5.x | Type-safe development across the entire pipeline |
| Linting | Biome | Fast linter and formatter (replaces ESLint + Prettier) |
| Deployment | Cloudflare Pages | Global CDN, edge caching, zero cold starts |
| Search | Fuse.js | Client-side fuzzy search, lazy-loaded |

Each choice reinforces the philosophy: the **simplest** tool that does the job well. Biome instead of ESLint + Prettier (one tool instead of two). Tailwind instead of CSS-in-JS (no runtime overhead). Cloudflare Pages instead of a server (static files on a CDN). Everything is chosen to minimize complexity and maximize performance.

---

## Being Honest: When to Choose Something Else

I want to be clear about something: **Astro is not the right tool for every project**. And acknowledging this is what separates genuine advocacy from blind hype.

Astro excels at:

- **Content sites** — Blogs, portfolios, documentation, marketing pages
- **Mostly-static sites** — Where interactivity is the exception, not the rule
- **Performance-critical sites** — Where every kilobyte of JavaScript matters
- **SEO-heavy sites** — Where server-rendered HTML is essential

Astro is **not** the best choice for:

- **Highly interactive SPAs** — Apps like Figma, Notion, or Google Docs where the entire page is interactive
- **Real-time dashboards** — Where WebSocket connections and constant state updates dominate
- **Complex state management apps** — Where Redux-level state orchestration is needed across hundreds of components

For those use cases, React (or Svelte with SvelteKit) is still the better fit. React's ecosystem is enormous — thousands of libraries, battle-tested patterns, a huge talent pool. If you're building a complex SaaS application with dozens of interactive screens, React's maturity is hard to beat.

But here's the thing: **most websites aren't Figma**. Most websites are content. They're blogs, landing pages, documentation, portfolios, e-commerce catalogs, corporate sites. For those — which represent the vast majority of what gets built on the web — Astro and Svelte are not just competitive. They're superior.

---

## The Bigger Picture: A Return to Simplicity

What excites me most about Astro and Svelte isn't just the technical merits. It's what they represent: a movement back toward simplicity in web development.

The New Stack captured this perfectly in their 2024 analysis: *"A return to simpler ways of building a website or web application, partly as a reaction against the increasing complexity of JavaScript frameworks — especially React-based frameworks."*

The State of JS 2025 survey observed something I find remarkable: *"Something we haven't seen in a decade: stagnation in frameworks, but an explosion in workflow. Developers aren't switching tools because they're bored — they are settling down because the tools finally work."*

The framework wars aren't ending because developers gave up. They're ending because frameworks like Astro and Svelte solved the right problems in the right way. When a tool simply works — when it's simple to use, fast by default, and doesn't fight you — developers stop looking for alternatives.

A [TSH.io survey of 6,000 developers](https://tsh.io/blog/javascript-frameworks-frontend-development) confirmed the trend: a *"further shift away from complexity"* in 2025, with Astro and Svelte *"gaining popularity as more developers looked for solutions beyond the React ecosystem."*

Astro reached a **25% adoption rate** despite being relatively new. That's not incremental growth — that's a paradigm shift. And GitHub Octoverse 2025 identified Astro as the **fastest-growing** framework with **78% year-over-year growth**.

---

## Where I Think This Is All Going

I'll be straightforward: I believe Astro and Svelte represent the future of web development. Or at least, the future I want to see — and the data suggests I'm not alone in wanting it.

Here's my prediction:

1. **Astro will become the default choice for content websites** within the next 2-3 years, just as WordPress became the default two decades ago — but with vastly better performance and developer experience.

2. **Svelte will continue growing as the preferred UI framework** for developers who value simplicity and performance. Its 88% retention rate and consistent top rankings in developer satisfaction aren't accidental — they reflect genuinely good design.

3. **The "ship less JavaScript" philosophy will become mainstream.** Not because it's trendy, but because performance requirements (Core Web Vitals, mobile-first indexing, global audiences on varying connection speeds) make it necessary.

4. **The Cloudflare acquisition accelerates everything.** With institutional backing, Astro can now iterate faster, reach more developers, and invest in the ecosystem in ways an independent startup couldn't.

Will React disappear? No. React has a massive ecosystem, deep enterprise adoption, and millions of developers. It will remain important for complex interactive applications. But the era of React being the default for *everything* — including static content sites where it was never the right tool — is ending.

The web started simple. HTML files, CSS styles, a sprinkle of JavaScript when needed. Astro and Svelte bring us back to that simplicity — with modern tooling, type safety, and performance that the early web could never have imagined.

---

## Try It Yourself

If anything in this post resonated, here's my suggestion: build something small with Astro and Svelte. A personal blog. A portfolio. A documentation site. You'll feel the difference immediately — the simplicity of writing components that look like HTML, the speed of a site that ships zero JavaScript by default, the joy of a development experience that doesn't fight you.

The community is growing fast. The tools are mature. The ecosystem is backed by a company that powers a significant portion of the internet. There has never been a better time to start.

Here are some resources to get started:

- [Astro Documentation](https://docs.astro.build/) — Start here. The docs are excellent.
- [Svelte Documentation](https://svelte.dev/) — The interactive tutorial is genuinely one of the best in the industry.
- [State of JS 2025](https://2025.stateofjs.com/en-US) — See the full survey data for yourself.
- [Rising Stars 2025](https://risingstars.js.org/2025/en) — GitHub star trends across the JS ecosystem.
- [Astro Year in Review 2025](https://astro.build/blog/year-in-review-2025/) — The full growth story from the team.
- [Cloudflare Acquires Astro](https://astro.build/blog/joining-cloudflare/) — What the acquisition means for the future.

And if you want to see what a real Astro + Svelte site looks like in production, you're looking at it right now. This site — [xergioalex.com](https://xergioalex.com) — is built entirely with this stack. Check out [Building XergioAleX.com](/blog/building-xergioalex-website/) for the complete story, or [Astro in Action](/blog/astro-in-action/) for the talk that started my Astro journey.

Let's keep building — but simpler, faster, and closer to the web's original promise.
