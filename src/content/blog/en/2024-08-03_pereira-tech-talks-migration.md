---
title: "Migrating Pereira Tech Talks: From Ghost to Astro"
description: "The story behind migrating pereiratechtalks.com — from a Dockerized Ghost setup with monthly costs to a static Astro site deployed for free on GitHub Pages. Ten years of lessons condensed into two weeks of code."
pubDate: "2024-08-03"
heroImage: "/images/blog/posts/pereira-tech-talks-migration/hero.png"
heroLayout: "banner"
tags: ["portfolio", "tech"]
---

Two days ago I gave the talk [Astro in Action](/blog/astro-in-action/) in Pereira. The flagship project of that evening — the live demo I showed in front of the audience — was the complete migration of [pereiratechtalks.com](https://www.pereiratechtalks.com/) to Astro. But a 45-minute talk isn't enough to tell the full story. This is the deep dive.

---

## The beginning: Ghost in 2014

[Pereira Tech Talks](https://www.pereiratechtalks.com/) was born in 2014 — a local tech community in Pereira, Colombia. From day one it needed a website. And the natural choice at the time was **Ghost**.

Ghost was a good option. Open source, built on Node.js, clean editor, designed specifically for blogging. It was the antidote to WordPress — no endless plugins, no bloated codebase. Just write, publish, share.

<img src="/images/blog/posts/pereira-tech-talks-migration/ghost-cms.png" alt="Ghost CMS — independent technology for modern publishing" width="1200" height="675" loading="lazy" />

We set it up and it worked well for years. The community grew. Events filled up. Blog posts kept coming. Everything ran on Digital Ocean — initially $5/month, then $8.43 with backups enabled. Small, manageable, ours.

---

## The Docker architecture

To keep everything organized, we built a Docker architecture with four containers: **MySQL** as the database, **Ghost** as the CMS, **Nginx** as a reverse proxy, and **Certbot** for SSL certificates. Each piece in place, orchestrated with Docker Compose.

<img src="/images/blog/posts/pereira-tech-talks-migration/docker-architecture.png" alt="Docker architecture for pereiratechtalks.com — MySQL, Ghost, Nginx, and Certbot containers" width="1200" height="675" loading="lazy" />

The repository is at [github.com/pereira-tech-talks/ghostDocker](https://github.com/pereira-tech-talks/ghostDocker). It worked. It was stable. It was what we needed at the time.

But over time, the cost stopped being just money.

---

## The real pain: maintenance

Ghost updates constantly. A new version every few weeks. And every major update brought MySQL migrations that — when they went well — were automatic. When they went wrong, they were an entire afternoon reviewing logs, running migration scripts by hand, and hoping the data arrived intact on the other side.

There were stretches where the site went months without updating because nobody had time for the ritual. Months piled up. Versions too. And the longer it went without updating, the harder the process became when it finally had to happen.

The problem wasn't Ghost. Ghost is a good tool. The problem was the model: a stateful server, with a database, with dependencies that kept evolving. For a community site that nobody tends to full-time, that model has a hidden cost — one that charges you in time and stress.

The $8.43/month wasn't the problem. Maintenance was the problem.

---

## The requirements for a replacement

Before evaluating any alternative, I wrote the list. Non-negotiable:

- **Lightweight** — No stateful servers
- **Static** — Pure HTML, no database
- **Community blog support** — Contributions via pull requests
- **Landing page** — Community presentation
- **Easy to maintain** — Any community member can contribute
- **Easy to deploy** — No migration rituals
- **Free** — Or as close to free as possible

The last one was what mattered most in the long run: if the site depended on a budget, it depended on someone paying. An open source community shouldn't have that single point of failure.

---

## Evaluating options: Hugo first

The first alternative I considered was [Hugo](https://gohugo.io/). I already knew it well — I had built [rocka.co](https://rocka.co) with Hugo and it had served me well. Fast, static, no runtime dependencies.

I found the [Hinode](https://gethinode.com/) theme — clean, well-documented, built with community projects in mind. I set up a base in the [pereiratechtalks.com](https://github.com/pereira-tech-talks/pereiratechtalks.com) repository, adjusted some colors, started structuring the content.

And there it stayed. For months.

Hugo had the right foundations but something didn't flow. The contribution cycle for community posts felt more tedious than it should. I also looked at **Medium** as an alternative — ready-made platform, zero maintenance. But Medium is paid for private publications and isn't open source enough for a community project where people want to own their content. Ruled out.

The Hugo folder kept waiting.

---

## Discovering Astro

I started hearing about Astro and Svelte. At first with skepticism — the JavaScript ecosystem has a history of "the new framework that will change everything." But I kept seeing mentions, real case studies, serious teams adopting it.

I decided to try it. I read the documentation. I built small demo sites. I experimented with the islands architecture, with Content Collections, with the zero-JavaScript-by-default approach.

I was convinced quickly. Astro wasn't just another framework — it was a different philosophy about how to build for the web. Svelte fit perfectly as the interactive layer: compiled, lightweight, no runtime.

When I started planning the **Astro in Action** talk, the decision was natural: the demo would be the real Pereira Tech Talks migration. Not a toy project — the community's actual site, in production.

---

## The migration: two weeks, one developer

I set myself the goal of having the site ready before the talk. Two weeks. One developer — me.

The result: [v2.pereiratechtalks.com](https://v2.pereiratechtalks.com/) — complete static site, blog with Content Collections, community landing page, deployed on **GitHub Pages** with **GitHub Actions**. Every push to `main` triggers the build and deployment. No server. No database. No migration rituals.

Blog posts are written in Markdown and published via pull request — the natural workflow for an open source community. Any member can contribute using the same flow they'd use to contribute to any other open source project.

---

## The numbers: Lighthouse before and after

One thing that surprised me was that Ghost didn't have bad numbers. A well-configured Ghost installation with Nginx and caching has decent performance:

<img src="/images/blog/posts/pereira-tech-talks-migration/lighthouse-ghost.png" alt="Lighthouse scores for the Ghost version — Performance 90, Accessibility 91, Best Practices 100, SEO 100" width="1200" height="400" loading="lazy" />

Performance 90, Accessibility 91, Best Practices 100, SEO 100. Nothing to be ashamed of.

But Astro reached different numbers with almost no effort:

<img src="/images/blog/posts/pereira-tech-talks-migration/lighthouse-astro.png" alt="Lighthouse scores for the Astro version — Performance 99, Accessibility 96, Best Practices 100, SEO 100" width="1200" height="400" loading="lazy" />

Performance 99, Accessibility 96, Best Practices 100, SEO 100. The difference between 90 and 99 in performance might sound small on paper — but in real load speed, in Core Web Vitals, in user experience on slow connections, those 9 points are significant.

And most importantly: those numbers come from static HTML on a CDN. Not from a well-tuned server. Not from hours of optimization. They come from Astro's default model.

---

## The result: from $8.43 to $0

| Before | After |
|--------|-------|
| Ghost + Docker + Digital Ocean | Astro + GitHub Pages |
| $8.43/month | $0/month |
| Manual MySQL updates | `git push` |
| Single maintainer | Open source contributions |
| Stateful server | Static HTML on CDN |
| Manual deployment process | Automated GitHub Actions |

Ten years of Pereira Tech Talks history — talks, events, community posts — now live in Markdown files in a public repository. Anyone can fork it. Anyone can contribute. Nobody depends on someone remembering to pay the server bill.

If you have posts you want to add to the community blog, the flow is simple: fork, write your post in Markdown, open a pull request. The repository is at [github.com/pereira-tech-talks/pereiratechtalks.com](https://github.com/pereira-tech-talks/pereiratechtalks.com).

---

## Do I recommend Astro?

Without reservations. It became my default framework for any static or content-focused web project. It's not just a better tool — it changed how I think about building for the web.

The question I ask myself now before any new project isn't "what framework do I use?" but "how much of this actually needs to be dynamic?" The answer is almost always: less than I thought. And for that static part, Astro is unbeatable.

The site is live. The community is still active. And for the first time in ten years, there's no monthly bill waiting.

Let's keep building.

---

## Resources

- [v2.pereiratechtalks.com](https://v2.pereiratechtalks.com/) — The migrated site
- [github.com/pereira-tech-talks/pereiratechtalks.com](https://github.com/pereira-tech-talks/pereiratechtalks.com) — The Astro site repository
- [github.com/pereira-tech-talks/ghostDocker](https://github.com/pereira-tech-talks/ghostDocker) — The original Docker architecture
- [Astro in Action Slides](https://slides.com/xergioalex/astro-in-action) — The talk where I presented this migration
- [Astro Documentation](https://docs.astro.build/) — To get started with Astro
