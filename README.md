# XergioAleX.com

<p align="center">
  <img src="assets/homepageHero.png" alt="XergioAleX.com Homepage — Personal website for Sergio Alexander Florez" width="800" />
</p>

<p align="center">
  <strong>Personal website & blog for Sergio Alexander Florez</strong><br />
  CTO at DailyBot (YC S21) · Builder of 20+ products · Community founder
</p>

<p align="center">
  <a href="https://xergioalex.com">🌐 Live Site</a> ·
  <a href="https://github.com/xergioalex/xergioalex.com">GitHub</a> ·
  <a href="./docs/ARCHITECTURE.md">Architecture</a> ·
  <a href="./docs/PRODUCT_SPEC.md">Product Spec</a>
</p>

---

## About

A modern, fast, and fully bilingual personal website built with [Astro](https://astro.build). It serves as a professional portfolio, blog platform, and personal brand presence — showcasing experience, projects, and thought leadership.

**Key highlights:**

- **Bilingual** — English and Spanish with full route parity
- **Dark mode** — System-aware theme toggle with persistence
- **Performance-first** — Static site generation, minimal JS, optimized assets
- **SEO-ready** — Sitemap, RSS feed, Open Graph, semantic HTML
- **Content Collections** — Typed blog posts with MDX support

## Tech Stack

| Layer | Technology |
| :---- | :--------- |
| Framework | [Astro](https://astro.build) 5.x |
| UI | [Svelte](https://svelte.dev) 5.x |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4.x |
| Content | Markdown, MDX |
| Hosting | GitHub Pages |

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321) to preview.

## Commands

| Command | Description |
| :------ | :---------- |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Production build with type check |
| `npm run build:ghpages` | Build for GitHub Pages (outputs to `docs/`) |
| `npm run astro:preview` | Preview production build locally |
| `npm run biome:check` | Lint and format check |
| `npm run biome:fix` | Auto-fix lint and format issues |
| `npm run astro:check` | TypeScript type checking |

## Project Structure

```
├── public/           # Static assets (images, fonts, icons)
├── src/
│   ├── components/   # Astro & Svelte components
│   ├── content/      # Blog posts (Content Collections)
│   ├── layouts/      # Page layouts
│   ├── lib/          # Utilities, types, translations
│   ├── pages/        # File-based routing
│   └── styles/       # Global CSS
├── docs/             # Project documentation
├── assets/           # README and documentation assets
└── astro.config.mjs
```

## Documentation

| Document | Description |
| :------- | :---------- |
| [Product Spec](./docs/PRODUCT_SPEC.md) | Vision, features, and content strategy |
| [Architecture](./docs/ARCHITECTURE.md) | Technical implementation and patterns |
| [Development Commands](./docs/DEVELOPMENT_COMMANDS.md) | Build scripts and workflows |
| [Standards](./docs/STANDARDS.md) | Coding conventions |
| [Security](./docs/SECURITY.md) | Security best practices |

## Deployment

The site is deployed to [GitHub Pages](https://pages.github.com) via the `docs/` directory:

```bash
npm run build:ghpages
```

Then commit and push the `docs/` folder. Live at [xergioalex.com](https://xergioalex.com).

## License

[MIT](LICENSE) — Sergio Alexander Florez Galeano

### Third-Party Assets

- **Icons:** [Heroicons](https://heroicons.com), [Simple Icons](https://simpleicons.org)

---

<p align="center">
  <sub>Built with Astro · Hosted on GitHub Pages</sub>
</p>
