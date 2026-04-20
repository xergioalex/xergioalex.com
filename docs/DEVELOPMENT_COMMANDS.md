# Development Commands

Complete reference for all npm scripts and CLI commands available in XergioAleX.com.

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build with type check |
| `npm run biome:check` | Check code quality |
| `npm run biome:fix` | Auto-fix code issues |
| `npm run astro:check` | TypeScript type checking |
| `npm run md:check` | Verify every HTML page has a matching `.md` for agents |
| `npm run md:check:strict` | Same as above; exits `1` on missing (for CI) |

## Development

### Start Dev Server

```bash
npm run dev
```

- Starts Astro development server at `http://localhost:4444`
- Hot Module Replacement (HMR) enabled
- Accessible on local network (host: true)

### Preview Production Build

```bash
npm run astro:preview
```

- Previews the production build locally
- Useful for testing before deployment

## Build Commands

### Production Build

```bash
npm run build
```

- Runs TypeScript checking (`astro check`)
- Builds static site to `dist/` folder
- Optimizes assets (CSS, JS, images)

### Production Build (Cloudflare Pages)

```bash
npm run build
```

This command:
1. Runs `prebuild` (generates WebP variants via `images:webp`)
2. Runs TypeScript checking (`astro check`)
3. Builds to `dist/` directory

**Output structure:**
```
dist/
├── index.html
├── about/index.html
├── blog/
│   └── ...
├── _astro/
│   ├── *.css
│   └── *.js
└── images/
```

## Code Quality

### Biome (Linting & Formatting)

**Check for issues:**
```bash
npm run biome:check
```

**Auto-fix issues:**
```bash
npm run biome:fix
```

**Fix with unsafe transformations:**
```bash
npm run biome:fix:unsafe
```

Biome handles both linting and formatting. It replaces ESLint and Prettier.

### TypeScript Checking

```bash
npm run astro:check
```

- Runs Astro's TypeScript checker
- Validates `.astro`, `.ts`, `.tsx` files
- Reports type errors

### Markdown-for-Agents Parity Check

```bash
npm run md:check          # Report missing .md files
npm run md:check:strict   # Same, but exits 1 on missing (for CI)
```

- Scans `dist/` for every `index.html` and checks it has a matching `.md` counterpart
- Catches agent-markdown coverage gaps before deployment (`MARKDOWN_FOR_AGENTS.md` endpoints)
- Requires `npm run build` to run first (operates on the build output)
- Excludes: `/internal/*`, `/api/*`, `/.well-known/*`, `/_astro/*`, `/images/*`, `/404`, `/rss.xml`, pagination, tag listings, and redirect pages
- When missing files appear, the report lists them by language (EN / ES)
- Script lives at `scripts/check-md-parity.mjs`

## Package Management

### Check for Updates

```bash
npm run ncu:check
```

- Uses `npm-check-updates` to list available updates
- Shows current vs latest versions

### Upgrade All Packages

```bash
npm run ncu:upgrade
```

- Updates all dependencies in `package.json`
- Run `npm install` after to apply changes

### Install Dependencies

```bash
npm install
```

## Lighthouse

### Run Lighthouse Audit

```bash
npm run lighthouse
```

- Runs Lighthouse CI against the built `dist/` folder
- Requires a prior `npm run build` (the `dist/` directory must exist)
- Requires Chrome installed locally
- Tests pages defined in `lighthouserc.cjs`: `/`, `/about/`, `/blog/`, `/es/`
- Asserts performance budgets: Performance >= 95, Accessibility = 100, Best Practices >= 95, SEO >= 95

## Release

### Create Release

```bash
npm run release
```

- Bumps patch version
- Creates commit with release message
- Format: `[🤖 Sergio Alexander Florez Galeano] New release to v{version} launched 🚀`

## Astro CLI

The Astro CLI is available via `npm run astro`:

```bash
# General help
npm run astro -- --help

# Add integration
npm run astro -- add svelte

# Sync content collections
npm run astro -- sync
```

### Common Astro Commands

| Command | Description |
|---------|-------------|
| `astro dev` | Start dev server |
| `astro build` | Build for production |
| `astro preview` | Preview build |
| `astro check` | Type checking |
| `astro sync` | Sync content collections |
| `astro add` | Add integrations |

## Workflow Examples

### Daily Development

```bash
# Start working
npm run dev

# Before committing
npm run biome:check
npm run astro:check
```

### Before Pull Request

```bash
# Full validation
npm run biome:check && npm run astro:check && npm run build
```

### Deploy (Cloudflare Pages)

Cloudflare Pages deploys automatically on push to `main`. No manual deploy step needed. Ensure `npm run build` succeeds locally before pushing.

### Update Dependencies

```bash
# Check what's available
npm run ncu:check

# Upgrade packages
npm run ncu:upgrade

# Install updated packages
npm install

# Verify everything works
npm run build
```

## Environment Variables

Astro uses `.env` files for environment variables:

```bash
# .env (local development)
PUBLIC_SITE_URL=http://localhost:4444

# .env.production (production)
PUBLIC_SITE_URL=https://xergioalex.com
```

**Access in code:**
```typescript
// Client-side (must use PUBLIC_ prefix)
const url = import.meta.env.PUBLIC_SITE_URL;

// Server-side only
const secret = import.meta.env.SECRET_KEY;
```

## Troubleshooting

### Clear Cache

```bash
# Remove Astro cache
rm -rf .astro

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### Reset Build

```bash
# Remove build output
rm -rf dist

# Rebuild
npm run build
```

### Port Already in Use

```bash
# Kill process on port 4444
lsof -ti:4444 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Devcontainer (Cursor / VS Code)

When using the devcontainer, the host port is mapped to **4444** (not 4444) to avoid conflict with macOS AirPlay Receiver. Access the dev server at `http://localhost:4444`.

## Scripts Reference

Full `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "prebuild": "node scripts/generate-webp-homepage.mjs && node scripts/generate-webp-blog-shared.mjs && node scripts/generate-webp-blog-posts.mjs",
    "astro": "astro",
    "astro:check": "astro check",
    "astro:preview": "astro preview",
    "biome:check": "biome check",
    "biome:fix": "biome check --write",
    "biome:fix:unsafe": "biome check --write --unsafe",
    "ncu:check": "ncu",
    "ncu:upgrade": "ncu -u",
    "test": "echo 'Running tests...'",
    "release": "npm version patch -m \"[🤖 Sergio Alexander Florez Galeano] New release to v%s launched 🚀\""
  }
}
```

## Testing (Future)

Testing is not yet configured. When implemented:

```bash
# Unit tests (Vitest)
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Watch mode
npm run test:watch
```
