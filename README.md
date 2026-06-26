<div align="center">

# XergioAleX.com

**Personal website & blog** · CTO at DailyBot (YC S21) · Builder of digital products

[![Code Check](https://github.com/xergioalex/xergioalex.com/actions/workflows/code_check.yml/badge.svg)](https://github.com/xergioalex/xergioalex.com/actions/workflows/code_check.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-6.x-FF5D01?logo=astro)](https://astro.build)

[🌐 Live Site](https://xergioalex.com) · [📖 Architecture](./docs/ARCHITECTURE.md) · [📋 Product Spec](./docs/PRODUCT_SPEC.md)

</div>

---

## ✨ Overview.

A modern, fast, and fully bilingual personal website built with [Astro](https://astro.build). It serves as a professional portfolio, blog platform, and personal brand presence — showcasing experience, projects, and thought leadership.

<p align="center">
  <img src="assets/homepageHero.png" alt="XergioAleX.com Homepage — Personal website for Sergio Alexander Florez" width="800" />
</p>

### Highlights

| Feature | Description |
| :------ | :---------- |
| 🌐 **Bilingual** | Full English & Spanish with route parity |
| 🌙 **Dark mode** | System-aware theme toggle with persistence |
| ⚡ **Performance-first** | Static site, minimal JS, optimized assets, 99+ PageSpeed |
| 🔍 **SEO-ready** | Sitemap, RSS, Open Graph, structured data, AEO-aware Markdown endpoints |
| 📝 **Content Collections** | Typed blog posts (MDX), series, multi-author, tag taxonomy |
| 🎤 **Slide decks** | Reveal.js-powered tech talks with internal / external-embed / external-link modes |
| 🤖 **Agent-friendly** | Shared `.agents/` home for skills, commands, and agent definitions across Claude Code, Codex, Cursor, Gemini |

---

## 🛠 Tech Stack

| Layer | Technology |
| :---- | :--------- |
| Framework | [Astro](https://astro.build) 6.x |
| UI | [Svelte](https://svelte.dev) 5.x |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4.x |
| Language | [TypeScript](https://www.typescriptlang.org) 5.x |
| Linting | [Biome](https://biomejs.dev) 2.x |
| Testing | [Vitest](https://vitest.dev) 4.x + Testing Library |
| Slides | [Reveal.js](https://revealjs.com) 6.x |
| Content | Markdown, MDX |
| Edge | Cloudflare Pages Functions (bot analytics middleware) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |

---

## 🚀 Quick Start

> Requires **Node.js 24+** (CI runs on 24.15.0). The package manager is
> **pnpm**, pinned via Corepack in `package.json#packageManager`. Enable it
> once with `corepack enable`; the dev container does this automatically.

```bash
corepack enable
pnpm install
pnpm run dev
```

Visit **http://localhost:4444** to preview.

---

## 📜 Commands

| Command | Description |
| :------ | :---------- |
| `pnpm run dev` | Start dev server at `localhost:4444` |
| `pnpm run build` | Production build with type check |
| `pnpm run astro:preview` | Preview production build locally |
| `pnpm run biome:check` | Lint and format check |
| `pnpm run biome:fix` | Auto-fix lint and format issues |
| `pnpm run astro:check` | TypeScript type checking |
| `pnpm run test` | Run unit tests (Vitest) |
| `pnpm run test:watch` | Vitest in watch mode |
| `pnpm run test:coverage` | Tests with coverage report |
| `pnpm run images:optimize` | Convert staged images to WebP |
| `pnpm run md:check` | Verify HTML / Markdown agent-endpoint parity |
| `pnpm run search:budgets` | Check search index performance budgets |
| `pnpm run lighthouse` | Run Lighthouse CI audit |
| `pnpm run ncu:check` | Check for dependency updates |
| `pnpm run release` | Bump version and create release commit |

---

## 📁 Project Structure

```
├── public/             # Static assets (images, fonts, icons, robots.txt)
├── src/
│   ├── components/     # Astro & Svelte components
│   ├── content/        # Content Collections
│   │   ├── authors/    # Multi-author definitions (.yaml)
│   │   ├── blog/       # Blog posts by language (en/, es/)
│   │   ├── pages/      # Agent-friendly Markdown endpoints
│   │   ├── series/     # Blog series definitions
│   │   ├── slides/     # Slide decks by language (en/, es/)
│   │   └── tags/       # Tag taxonomy with tiers
│   ├── layouts/        # MainLayout, InternalLayout, SlideLayout, ...
│   ├── lib/            # Utilities, types, translations
│   ├── pages/          # File-based routing (EN root, ES in /es/)
│   ├── middleware.ts   # Route allowlist & rewrites
│   └── styles/         # Global CSS (Tailwind 4)
├── functions/          # Cloudflare Pages Functions (edge middleware)
├── tests/              # Vitest unit & integration tests
├── scripts/            # Build utilities (image optimization, parity checks)
├── docs/               # Project documentation
├── .agents/            # Cross-agent skills, commands, agent definitions
├── .claude → .agents   # Backward-compat symlink for Claude Code
├── assets/             # README and documentation assets
└── astro.config.mjs
```

---

## 📚 Documentation

| Document | Description |
| :------- | :---------- |
| [Product Spec](./docs/PRODUCT_SPEC.md) | Vision, features, and content strategy |
| [Architecture](./docs/ARCHITECTURE.md) | Technical implementation and patterns |
| [Development Commands](./docs/DEVELOPMENT_COMMANDS.md) | Build scripts and workflows |
| [Standards](./docs/STANDARDS.md) | Coding conventions |
| [Blog Posts](./docs/features/BLOG_POSTS.md) | Blog content structure and workflows |
| [Authors](./docs/features/AUTHORS.md) | Multi-author support and schema |
| [Slides](./docs/features/SLIDES.md) | Tech-talk decks (Reveal.js + embeds) |
| [Writing Voice](./docs/WRITING_VOICE_GUIDE.md) | Anti-AI-slop voice and tone guide |
| [I18N Guide](./docs/I18N_GUIDE.md) | Multilingual content and translations |
| [Testing](./docs/TESTING_GUIDE.md) | Vitest setup and test conventions |
| [Performance](./docs/PERFORMANCE.md) | Astro SSG optimization and budgets |
| [Accessibility](./docs/ACCESSIBILITY.md) | WCAG AA standards and patterns |
| [SEO](./docs/SEO.md) | Meta, structured data, multilingual, AEO |
| [Security](./docs/SECURITY.md) | Security best practices |
| [AI Agent Onboarding](./docs/AI_AGENT_ONBOARDING.md) | Setup for AI coding assistants |
| [Skills & Agents Catalog](./.agents/docs/skills_agents_catalog.md) | Available skills and agents |

---

## 🚢 Deployment

Deployed to **Cloudflare Pages** on every push to `main`:

1. Cloudflare triggers a build
2. Runs `pnpm run build` (WebP generation + Astro build)
3. Serves the `dist/` folder from its global CDN

Live at **[xergioalex.com](https://xergioalex.com)**.

---

## 📄 License

[MIT](LICENSE) — Sergio Alexander Florez Galeano

### Third-Party Assets

- **Icons:** [Heroicons](https://heroicons.com), [Simple Icons](https://simpleicons.org)

---

<div align="center">
  <sub>Built with Astro · Hosted on Cloudflare Pages</sub>
</div>
