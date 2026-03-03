---
title: "The Best Way to Deploy Your Astro Site for Free"
description: "After years deploying static sites on GitHub Pages, I evaluated every free option and landed on Cloudflare Pages. Here's what I learned, what surprised me, and why the platform keeps getting better."
pubDate: "2026-03-04"
heroImage: "/images/blog/posts/best-way-deploy-astro-site-free/hero.png"
heroLayout: "side-by-side"
tags: ["tech", "portfolio", "web-development"]
series: "building-xergioalex"
seriesOrder: 6
---

Every site has to live somewhere. For a while I didn't think much about where — I had GitHub Pages, it worked, and that was enough. But when the requirements grew — more pages, two languages, image processing at build time, a full blog with search — I realized the deployment platform deserved the same deliberate choice as the framework.

---

## The GitHub Pages Years

I have been deploying static sites to GitHub Pages for a long time. I'd used it for community sites, side projects, documentation — the typical static site use cases. Connect the repo, write a GitHub Actions workflow, push to `gh-pages`. It always worked.

So when I started building this site on Astro, GitHub Pages was the obvious first instinct. I already had the workflow templates. I already knew the gotchas. It felt like the path of least resistance.

But I stopped and looked around first. Not because GitHub Pages had failed me — it hadn't. But because this site had more moving parts than anything I'd deployed there before. I wanted to choose deliberately rather than default into what I already knew.

---

## Evaluating the Options

I had one hard requirement: **free**. This is a personal site. I am not paying a monthly hosting bill for a static blog. Beyond that, I wanted good developer experience, preview deployments per branch, easy DNS setup, and — ideally — extras that would be useful later without locking me into a paid tier.

**GitHub Pages** is what I knew. Connect the repo, run `astro build` in a GitHub Actions workflow, push the `dist/` folder to the `gh-pages` branch. It works. The free tier covers static sites well — no bandwidth charges, no server management. But the friction points accumulated when I listed them out. No preview deployments per branch — every PR required merging to see the result live. DNS with a custom domain meant configuring CNAMEs with an external provider, then waiting for propagation, then hoping everything lined up. The build pipeline is entirely on you — you write the YAML, you manage caching, you debug runner failures. And GitHub Pages has a legacy bias toward Jekyll that shows up in small ways: the `.nojekyll` file, the branch-based deploy model, the assumption that your static site generator is a second-class citizen.

None of those were dealbreakers alone. Together, they felt like friction I was accepting out of habit rather than preference.

**Netlify** had strong developer experience and a free tier that includes most of what you'd need. But I'd heard enough stories about billing surprises — deploy your site, traffic spikes for a day, suddenly you've burned through 100GB of bandwidth and the invoice is waiting. The free tier has a ceiling, and the cliff on the other side is steep. Maybe fine for a personal site that never goes viral, but I didn't want to think about it.

**Vercel** is excellent for Next.js. At the time I was evaluating, Astro wasn't quite first-class there. The experience was supported, not native. I also didn't need serverless functions yet — I was building a static blog, not a backend. Paying for Next.js-optimized infrastructure to host Astro felt like buying a truck to move a bicycle.

Then I looked at **Cloudflare Pages**. The free tier numbers stopped me mid-scroll: unlimited bandwidth. 500 builds per month. Unlimited preview deployments. No bandwidth cliff. No billing surprises. And you're already on the Cloudflare network — 300+ data centers globally, DDoS protection included, Web Application Firewall at the edge. On top of that: built-in analytics at the edge, Workers for server-side logic, and a growing ecosystem of storage and database primitives — KV, R2, D1 — all with free tiers.

I had been looking for free hosting. What I found was a free platform.

I stopped looking.

---

## Landing on Cloudflare Pages

The first deployment was almost anticlimactic. I connected the GitHub repo in the Cloudflare dashboard, and Cloudflare auto-detected the Astro framework. It populated the build command (`astro build`), set the output directory (`dist`), and asked me to confirm the Node.js version. That was essentially it. The first build ran in about forty seconds and the site was live on a `pages.dev` subdomain.

No deployment workflow to write. No secrets to manage. No YAML files defining stages and environments. Compared to the GitHub Actions workflows I'd written before — installing dependencies, running the build, configuring the `gh-pages` branch, managing deploy keys — this was a non-event.

The DNS setup was equally direct. I pointed my domain's nameservers to Cloudflare, went to the dashboard, added `xergioalex.com` as a custom domain on the Pages project, and SSL was auto-generated. No Let's Encrypt renewal scripts. No CNAME juggling with an external provider. No "wait 48 hours and see if it resolves." The whole thing was done in under an hour, including DNS propagation — faster than I expected.

Honestly, it felt like what GitHub Pages should have evolved into. The same simplicity at the surface, but with a real platform behind it.

---

## Then Cloudflare Acquired Astro

In 2025, Cloudflare acquired the Astro company. I had been on Cloudflare Pages for months before that happened — purely because of the free tier and the deployment experience. The acquisition wasn't something I planned around.

But it made everything tighter almost immediately.

Build times improved. The Astro framework detection became more precise. The pipeline felt like it was built specifically for Astro, not just configured to support it. Where before I had a good experience, after the acquisition I had a native one. The difference is subtle but real — like the difference between a plugin that works and a feature that belongs there.

I had made a bet without knowing it was a bet. Cloudflare Pages because of the free tier. Astro as the framework. And then the platform bought the framework. I don't think I could have planned this if I tried.

Looking back, the acquisition validated something beyond the choice of hosting provider. It told me that the combination of static-first sites on edge infrastructure was where the industry was heading. Cloudflare didn't acquire Astro to add another logo to the dashboard — they acquired it because Astro's architecture aligned with how Cloudflare thinks about the web: as much as possible at the edge, as little as possible on the origin. That's the same bet this entire site is built on.

---

## What You Get for Free

Let me walk through each feature concretely, because the list on the Cloudflare marketing page does not tell you what it actually feels like to use.

### Push-to-Deploy

Every push to `main` triggers a build. No workflow file needed — Cloudflare handles it. The site uses a release workflow with GitHub Actions for versioning and commit tagging, but the deployment itself is 100% Cloudflare's responsibility. I do not maintain a deployment pipeline. I push code and the site updates.

My previous projects needed 40-line GitHub Actions workflows just to deploy. Here, that workflow does not exist. That is not nothing.

### Preview Deployments per Branch

Every pull request gets a unique preview URL — something like `https://abc123.xergioalex-com.pages.dev`. Before merging, I can test the exact build on a real URL, served through the real CDN, with the real environment variables. Not a local dev server. The actual site.

This changed how I work. Before, my review process was: run `npm run dev`, verify locally, merge, hope the build was fine. Now it is: open the PR preview, verify in the actual deployed environment, merge. The "merge and hope" step is gone.

### DNS and SSL Built-In

When your domain's nameservers point to Cloudflare, DNS management moves into the same dashboard as everything else. No external DNS provider. No separate SSL certificate setup. No renewal scripts. `xergioalex.com` resolves, HTTPS works, and I have not touched the DNS configuration since the initial setup.

This sounds like a small thing. After years of managing Let's Encrypt certificates and external DNS records, it is not a small thing.

### Analytics Included

Cloudflare Web Analytics is auto-injected at the edge. No script to add to the codebase. No environment variable. No code changes. On GitHub Pages, analytics requires adding a tracking script manually. On Cloudflare Pages, it just comes with the platform.

### Environment Variables

Set in the dashboard, available at build time, with separate values for preview vs production. The Umami analytics website ID is configured once in the Cloudflare dashboard — different for preview deployments, different for production. No `.env` files to manage in CI. No secrets in the repository. No "did I remember to update the variable for the new environment" problem.

### Build Configuration

One-time setup in the dashboard: build command (`astro check && astro build`), output directory (`dist`), Node.js version. No `wrangler.toml` needed for a static site. The configuration lives with the project in the dashboard, version-controlled implicitly through the connection to the GitHub repo.

### The Cloudflare Network

This is less of a feature and more of a consequence. The site is served from 300+ Cloudflare data centers globally. A reader in São Paulo gets the page from a nearby edge node, not from a single origin server in Virginia. DDoS protection is on by default. The Web Application Firewall is available. For a personal blog, most of this runs silently in the background — but it means the site has the same infrastructure as much larger properties.

### Workers and Edge Functions

The `functions/` directory in the repository is auto-detected and deployed as Cloudflare Pages Functions — edge middleware that runs on every request without any server infrastructure to manage. This is what makes server-side logic possible on what is otherwise a static site.

The deployment platform I chose because of the free tier turned out to have a programmable edge runtime built into the static hosting. That unlocked things I hadn't anticipated when I chose Cloudflare Pages — like server-side analytics for visitors that don't run JavaScript.

### The Free Tier in Full

Here is what the free tier actually includes: unlimited sites, unlimited bandwidth, 500 builds per month, unlimited preview deployments. Beyond static hosting: Workers, KV storage, R2 object storage, D1 SQLite database — all with generous free tiers. You can start with a static blog and grow into a full platform without switching providers. The pricing cliff that made me nervous about Netlify does not exist here, at least not for the scale of a personal site.

---

## What Is Not Perfect

I want to be honest about the friction, because the Cloudflare Pages experience is not entirely smooth.

Build times can be slow. My site builds in about eight seconds locally — `astro check`, image processing, static generation for 60+ pages in two languages. On Cloudflare's build system, the same process takes closer to forty seconds. That's a 5x difference. It is not a dealbreaker — the build runs in the background after a push, and I'm not sitting there watching the progress bar. But if you're used to Vercel's build speed, you will notice it.

The first time I set up DNS propagation, I spent about an hour debugging what turned out to be nothing. The Cloudflare dashboard showed everything configured correctly — custom domain added, SSL certificate issuing. But the domain wasn't resolving. I checked the DNS records three times. I looked up troubleshooting guides. I opened a support thread. The answer: DNS propagation takes time, even on Cloudflare. The dashboard had not lied to me. I just had to wait. Lesson: DNS propagation is still DNS propagation, no matter whose network it's on.

Also: Cloudflare Pages Functions are great for middleware, but they're not the same as full Cloudflare Workers. The API surface is smaller — no Durable Objects, no Queues, no advanced primitives. If you need those features, you need a separate Workers project, not a Pages Functions deployment. For a blog, the middleware capability is enough and then some. But knowing the boundary matters before you design around it.

If you're looking for free hosting for a static Astro site and you want more than just file serving — preview deployments, DNS management, edge functions, analytics — Cloudflare Pages is the best option I've found. Not perfect, but the friction is low and the ceiling is high.

Let's keep building.

---

## Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Deploy an Astro site to Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Cloudflare Pages Free Tier](https://www.cloudflare.com/developer-platform/products/pages/)
- [Cloudflare acquires Astro](https://blog.cloudflare.com/cloudflare-acquires-astro/)
