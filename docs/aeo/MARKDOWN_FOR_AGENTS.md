# Markdown for Agents

Native Markdown delivery layer for AI agents. Every page and blog post on the site has a `.md` endpoint serving clean, agent-friendly Markdown from the original source content.

## Architecture

```
Source .md → [Astro build] → HTML page (humans)
Source .md → [Astro build] → .md endpoint (agents)
```

Both outputs come from the same source. No HTML→Markdown conversion in the path.

## Why Native Markdown Over HTML→MD Conversion

Cloudflare offers [Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/) — edge HTML→Markdown conversion when clients request `Accept: text/markdown`. However, since this site's content already exists as Markdown, serving the original source is superior:

- **Source fidelity** — original formatting, code blocks, and links preserved exactly as authored
- **Token efficiency** — no HTML tag residue from conversion; cleaner for AI consumption
- **No edge dependency** — works on any hosting platform, not just Cloudflare
- **Deterministic** — output is predictable and consistent across builds
- **Cacheable** — static files served directly, no runtime processing

## Endpoints

### Blog Posts

| Pattern | Example |
|---------|---------|
| `/blog/{slug}.md` (EN) | `/blog/building-xergioalex-website.md` |
| `/es/blog/{slug}.md` (ES) | `/es/blog/building-xergioalex-website.md` |

Source: `post.body` from Astro content collection (raw Markdown without frontmatter).

### Blog Index

| Pattern | Description |
|---------|-------------|
| `/blog/index.md` (EN) | Lists all EN posts with `.md` links |
| `/es/blog/index.md` (ES) | Lists all ES posts with `.md` links |

### Pages

| Pattern | Example |
|---------|---------|
| `/{page}.md` (EN) | `/about.md`, `/cv.md`, `/dailybot.md` |
| `/es/{page}.md` (ES) | `/es/about.md`, `/es/cv.md` |

Source: `src/content/pages/{en,es}/` content collection.

## Response Format

```markdown
# Post Title

> Description text

Published: 2026-03-09
Updated: 2026-03-10
Language: en
Canonical: https://xergioalex.com/blog/post-slug
Tags: tag1, tag2

---

[original markdown body]
```

- H1 title — universally expected by agents
- Blockquote description — visually distinct
- Simple key-value metadata — easy to parse
- Canonical URL — always points to the HTML version
- Separator before body — clear content boundary
- No footer, nav, or UI chrome

## Technical Implementation

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/markdown-for-agents.ts` | Serialization helpers |
| `src/pages/blog/[slug].md.ts` | EN blog post endpoint |
| `src/pages/es/blog/[slug].md.ts` | ES blog post endpoint |
| `src/pages/blog/index.md.ts` | EN blog index |
| `src/pages/es/blog/index.md.ts` | ES blog index |
| `src/pages/[page].md.ts` | EN page endpoint |
| `src/pages/es/[page].md.ts` | ES page endpoint |
| `src/content/pages/{en,es}/` | Page Markdown source files |
| `src/content.config.ts` | Pages collection schema |
| `tests/unit/lib/markdown-for-agents.test.ts` | Unit tests |

### Serialization Functions

- `serializePostToAgentMarkdown(post, { slug, lang })` — blog posts
- `serializeBlogIndexToMarkdown(entries, { lang, title, description })` — blog index
- `serializePageToAgentMarkdown(page, { slug, lang })` — non-blog pages

### Content Collections

- **Blog posts**: Existing `blog` collection. `post.body` provides raw Markdown.
- **Pages**: New `pages` collection in `src/content/pages/`. Each page has EN and ES versions.

## Scalability

- **New blog post** → Automatically gets a `.md` endpoint (no code changes)
- **New page** → Add a `.md` file to `src/content/pages/{en,es}/` and a `.md` endpoint is generated
- **Content updates** → Reflected on next build automatically

## Performance Impact

**Zero.** The `.md` endpoints are separate static files generated at build time. They do not add any JavaScript, runtime processing, or SSR overhead. HTML pages and their PageSpeed/Lighthouse scores are completely unaffected.

## Future: Cloudflare Edge Content Negotiation

The architecture supports adding Cloudflare Workers/Rules to detect `Accept: text/markdown` and rewrite to `.md` endpoints:

```
If Accept contains "text/markdown"
AND path matches a blog/page route:
  Rewrite to /{path}.md
```

This is decoupled from the Astro implementation and can be added independently without any code changes.

## Maintenance

- **No ongoing maintenance for blog posts** — endpoints auto-generated from content
- **Update page Markdown when page content changes** — edit files in `src/content/pages/`
- **Discovery files** — `llms.txt` and `llms-full.txt` reference the endpoints
- **Tests** — `npm run test` covers serialization correctness
