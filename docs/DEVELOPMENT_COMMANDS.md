# Development Commands

Complete reference for all npm scripts and CLI commands available in XergioAleX.com.

## Quick Reference

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Production build with type check |
| `pnpm run biome:check` | Check code quality |
| `pnpm run biome:fix` | Auto-fix code issues |
| `pnpm run astro:check` | TypeScript type checking |
| `pnpm run md:check` | Verify every HTML page has a matching `.md` for agents |
| `pnpm run md:check:strict` | Same as above; exits `1` on missing (for CI) |
| `pnpm run generate:openapi` | Regenerate `public/openapi.json` (also runs in `prebuild`) |
| `pnpm run generate:agent-skills-index` | Regenerate the agent-skills discovery index (also runs in `prebuild`) |
| `pnpm run test` | Run unit tests (Vitest) |
| `pnpm run test:e2e` | Run end-to-end tests (Playwright) |
| `pnpm run images:optimize` | Convert staged images to WebP |
| `pnpm run images:optimize:slides` | Convert staged slide images to WebP |
| `pnpm run search:budgets` | Check search index performance budgets |
| `pnpm run lighthouse` | Run the Lighthouse CI audit |

## Development

### Start Dev Server

```bash
pnpm run dev
```

- Starts Astro development server at `http://localhost:4444`
- Hot Module Replacement (HMR) enabled
- Accessible on local network (host: true)

### Preview Production Build

```bash
pnpm run astro:preview
```

- Previews the production build locally
- Useful for testing before deployment

## Build Commands

### Production Build

```bash
pnpm run build
```

- Runs the `prebuild` generators: the agent-skills discovery index and `public/openapi.json`
- Runs TypeScript checking (`astro check`)
- Builds static site to `dist/` folder
- Optimizes assets (CSS, JS, images)

> **Generated files — never edit by hand:** `public/openapi.json`
> (`scripts/build-openapi.mjs`) and `public/.well-known/agent-skills/index.json`
> (`scripts/generate-agent-skills-index.mjs`). Both are rewritten on every build,
> so a manual edit is silently discarded.

### Production Build (Cloudflare Pages)

```bash
pnpm run build
```

This command:
1. Runs `prebuild` (generates the agent skills index via `generate-agent-skills-index.mjs`)
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
pnpm run biome:check
```

**Auto-fix issues:**
```bash
pnpm run biome:fix
```

**Fix with unsafe transformations:**
```bash
pnpm run biome:fix:unsafe
```

Biome handles both linting and formatting. It replaces ESLint and Prettier.

### TypeScript Checking

```bash
pnpm run astro:check
```

- Runs Astro's TypeScript checker
- Validates `.astro`, `.ts`, `.tsx` files
- Reports type errors

### Markdown-for-Agents Parity Check

```bash
pnpm run md:check          # Report missing .md files
pnpm run md:check:strict   # Same, but exits 1 on missing (for CI)
```

- Scans `dist/` for every `index.html` and checks it has a matching `.md` counterpart
- Catches agent-markdown coverage gaps before deployment (`MARKDOWN_FOR_AGENTS.md` endpoints)
- Requires `pnpm run build` to run first (operates on the build output)
- Excludes: `/internal/*`, `/api/*`, `/.well-known/*`, `/_astro/*`, `/images/*`, `/404`, `/rss.xml`, pagination, tag listings, and redirect pages
- When missing files appear, the report lists them by language (EN / ES)
- Script lives at `scripts/check-md-parity.mjs`

## Package Management

### Check for Updates

```bash
pnpm run ncu:check
```

- Uses `npm-check-updates` to list available updates
- Shows current vs latest versions

### Upgrade All Packages

```bash
pnpm run ncu:upgrade
```

- Updates all dependencies in `package.json`
- Run `pnpm install` after to apply changes

### Install Dependencies

```bash
pnpm install
```

## Lighthouse

### Run Lighthouse Audit

```bash
pnpm run lighthouse
```

- Runs Lighthouse CI against the built `dist/` folder
- Requires a prior `pnpm run build` (the `dist/` directory must exist)
- Requires Chrome installed locally
- Tests pages defined in `lighthouserc.cjs`: `/`, `/about/`, `/blog/`, `/es/`
- Asserts performance budgets: Performance >= 95, Accessibility = 100, Best Practices >= 95, SEO >= 95

### Run the Full Audit

```bash
pnpm run lighthouse:full
```

- Same pipeline, but uses `lighthouserc.full.cjs` — the extended page set (14 URLs) and uploads the report for release audits

## Release

### Create Release

```bash
pnpm run release
```

- Bumps patch version
- Creates commit with release message
- Format: `[🤖 Sergio Alexander Florez Galeano] New release to v{version} launched 🚀`

## Astro CLI

The Astro CLI is available via `pnpm run astro`:

```bash
# General help
pnpm run astro -- --help

# Add integration
pnpm run astro -- add svelte

# Sync content collections
pnpm run astro -- sync
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
pnpm run dev

# Before committing
pnpm run biome:check
pnpm run astro:check
```

### Before Pull Request

```bash
# Full validation
pnpm run biome:check && pnpm run astro:check && pnpm run build
```

### Deploy (Cloudflare Pages)

Cloudflare Pages deploys automatically on push to `main`. No manual deploy step needed. Ensure `pnpm run build` succeeds locally before pushing.

### Update Dependencies

```bash
# Check what's available
pnpm run ncu:check

# Upgrade packages
pnpm run ncu:upgrade

# Install updated packages
pnpm install

# Verify everything works
pnpm run build
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
pnpm install
```

### Reset Build

```bash
# Remove build output
rm -rf dist

# Rebuild
pnpm run build
```

### Port Already in Use

```bash
# Kill process on port 4444
lsof -ti:4444 | xargs kill -9

# Or use different port
pnpm run dev -- --port 3000
```

### Devcontainer (Cursor / VS Code)

When using the devcontainer, the host port is mapped to **4444**. Access the dev server at `http://localhost:4444`.

## Dev Containers Without an Editor (`dev.sh`)

`dev.sh` at the repository root starts the same containers the Dev Containers
plugin starts, detached, from a plain terminal. Opening the project in Cursor or
VS Code keeps working exactly as before — the two paths coexist.

```bash
bash dev.sh setup     # one-time: env files, networks, .devcontainer/
bash dev.sh build     # build the image
bash dev.sh up        # start the runServices, detached
bash dev.sh shell     # login shell as `node` in /app
```

`.devcontainer/devcontainer.json` is the single source of truth. `runServices`
decides what starts — add a service there and `dev.sh up` starts it with no
other edit. `remoteUser`, `workspaceFolder`, `mounts` and `containerEnv` are
read from the same file.

| Verb | Description |
| :--- | :---------- |
| `setup` | Create `.env` files (mode `0600`), external networks, `.devcontainer/` from `.devcontainer_example/`, and set `"shutdownAction": "none"` |
| `up [service...]` | Start the `runServices`, detached. A second `up` is a no-op |
| `down [service...]` | Stop and remove this repository's services (named volumes are kept) |
| `stop` / `start` / `restart` | Lifecycle for the same set |
| `ps` | What is running |
| `logs [service...]` | Follow logs |
| `shell [service]` | Login shell as `remoteUser`, in `workspaceFolder` |
| `exec <service> <cmd>` | Run one command in a service |
| `build [service...]` | Build images |
| `config` | Resolved configuration — writes nothing, starts nothing |
| `doctor` | Environment diagnosis — writes nothing, starts nothing |

Flags: `--recreate` (with `up`, to apply compose changes to existing
containers) and `--project <name>` (override the compose project).

**`setup` sets `"shutdownAction": "none"`.** The plugin's default is to stop the
containers when the editor window closes, which is the opposite of what a
terminal user wants. The key is additive, so the plugin path is unaffected — it
just stops tearing the stack down. Use `dev.sh down` to stop it deliberately.

**`config` and `doctor` are read-only.** They are what you run when something is
wrong, so they never create a file, a network, or a container.

`doctor` also reports whether `docker/local/xergioalexcom/.env` is readable by
other accounts on the machine (it holds API keys), and which compose files the
running container was created from — the fastest way to see whether the terminal
path and the editor path agree.

### SSH access for Herdr

The container runs `sshd` so Herdr (and anything else driving it over SSH) can
reach it as a machine. Host port **22029** maps to container port 22; the host's
`~/.ssh/config` needs a matching entry:

```
Host xergioalex-com
  HostName 127.0.0.1
  Port 22029
  User node
  StrictHostKeyChecking accept-new
```

`authorized_keys` is built at container start from the host keys mounted
read-only at `~/.ssh_host`, so no key material is ever baked into the image.

Three things this setup gets right, each of which is a trap:

**Host keys live in the `ssh_host_keys` volume, generated once at first start.**
Not `ssh-keygen -A` in the Dockerfile — that writes the host *private* key into
an image layer and mints a fresh identity on every rebuild. Not `ssh-keygen -A`
at entrypoint into `/etc/ssh` either — that path is not persisted, so the
identity changes on every recreate and every client that pinned the old key
refuses to connect until `known_hosts` is cleared by hand. Verify with
`ssh-keyscan -p 22029 127.0.0.1` before and after `dev.sh up --recreate`: the
fingerprint must not change.

**`sshd` gives every session a clean environment.** Nothing compose passed
through `env_file` or `environment` survives it, while `docker exec` inherits it
— which is why a command works in the editor terminal and fails in an SSH or
Herdr pane with "API key is not set" though the key is plainly set in the
container. `entrypoint.sh` materialises the live environment into
`~/.container_env`, opened `0600` from the first byte because it holds
`ZAI_CODING_API_KEY`, `XAI_API_KEY` and `AZURE_OPENAI_API_KEY`.

**Login and non-login shells need separate wiring.** Herdr uses a login shell
(`shell_mode = "login"` in its `config.toml`), which reads `/etc/profile.d` and
`~/.profile`. But `ssh host <command>` — and `herdr --machine <label> <command>`
— is neither login nor interactive: it reads no profile at all, and bails out of
`~/.bashrc` at Debian's `case $- in *i*) ;; *) return;; esac` guard on line 5.
The entrypoint therefore **prepends** its PATH and environment preamble above
that guard. Anything appended to `~/.bashrc` is dead code for exactly the case
that needs it most.

Verify the way the real caller does, with a clean environment rather than
`docker exec`, which hands you an inherited one and makes a broken setup look
correct:

```bash
ssh xergioalex-com 'command -v opencode; echo "$ZAI_CODING_API_KEY" | head -c4'
ssh xergioalex-com 'bash -lc "command -v codex"'
```

#### Herdr terminals open in `/app`

`[terminal] new_cwd = "/app"` in the container's `~/.config/herdr/config.toml`,
written by `entrypoint.sh` and persisted in the `herdr_data` volume. Without it
new terminals open in `/home/node` rather than the workspace.

The key is **`new_cwd`**. `working_directory` reads like the obvious name and is
silently ignored — `herdr config check` reports `unknown config key
terminal.working_directory`. The real field list comes from the binary's
`TerminalConfig` struct: `default_shell`, `shell_mode`, `new_cwd`.

**Validate this file with `herdr config check`, never with `grep`.** An invalid
`config.toml` is not partially applied — herdr discards it wholesale and runs on
defaults, reporting `; using defaults`. A grep that finds the line proves the
line is in the file, not that herdr ever read it. The entrypoint runs that check
on every start and prints a warning if the file was rejected.

Workspaces created *before* the setting keep their original cwd; only new ones
pick it up. Close and reopen a workspace to move it.

### Build troubleshooting (hard-won)

Three things make this image slow or impossible to build on some networks. All
three are fixed in the Dockerfile; this records why, so nobody reverts them.

**The apt mirror.** `deb.debian.org` resolves to an edge that serves some
networks at ~55 KB/s, which turned the Chromium install into a 50-minute step
that looked frozen (BuildKit shows one line per `RUN`, so the ~250-package
download appears as a single stalled row). `cdn-aws.deb.debian.org` serves the
identical archives at 12-18 MB/s — measured 45x faster end to end. The
`ARG APT_MIRROR` rewrites **both** the main and the `debian-security` URIs;
Chromium ships from security, so a mirror carrying only main (like
`ftp.us.debian.org`) leaves the two largest packages on the slow path.
Override per build: `docker compose build --build-arg APT_MIRROR=deb.debian.org`.

**Herdr's installer timeout.** It caps its binary download at
`--max-time 120`, with no environment variable to override it. At ~50 KB/s the
24 MB binary needs about eight minutes, so all four retries die at two and the
build **fails outright** — retrying never helps. The Dockerfile pipes the
installer through `sed 's/--max-time 120/--max-time 1800/'`, which lifts only
that cap and leaves the SHA-256 verification intact.

**`/etc/profile` overwrites `PATH`.** Debian sets
`PATH="/usr/local/bin:/usr/bin:/bin:..."` for non-root users, discarding this
image's `ENV PATH`. `docker exec` keeps the ENV and sees every CLI; a **login
shell** — the editor terminal, `dev.sh shell`, anything run as `bash -l` —
silently loses `opencode`, `grok`, `codex`, `cline`, `pi` and `chelper`, while
`node` and `claude` keep working, which is what makes it so confusing to
diagnose. `/etc/profile.d/01-container-tool-paths.sh` re-appends those
directories (appends, never prepends, so `00-container-node-first.sh` keeps
`/usr/local/bin` in front and the image's own node still beats an IDE-bundled
one).

Diagnosing a slow build: `docker builder du` does **not** show progress during a
`RUN` step — the download goes to the layer under construction, not the cache,
so the total sits still while everything is fine. Measure the VM's interface
counters instead, or just check whether the log file's mtime is advancing.

### Things `dev.sh` deliberately does not do

- **It never passes `--remove-orphans`.** The compose file also declares
  `playwright-mcp` and `e2e`, which are not in `runServices`. With that flag,
  starting the dev container alone would delete a `playwright-mcp` container
  someone is using. Compose prints a warning recommending the flag; here that
  warning is an instruction to destroy containers you asked for.
- **It never lets compose default the project name to the directory.** The
  project is resolved from `--project`, then `COMPOSE_PROJECT_NAME`, then
  `docker/local/.env`, then the top-level `name:` in the compose file
  (`xergioalexlocal`), and it refuses to run if none of those answer. Falling
  back to the directory name would build a second, parallel set of containers
  next to the real ones and fight them over port 4444.
- **It never uses `docker compose down`,** which acts on the whole project.
  `dev.sh down` removes only the services this repository declares.

## Scripts Reference

Full `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "prebuild": "node scripts/generate-agent-skills-index.mjs",
    "astro": "astro",
    "astro:check": "astro check",
    "astro:preview": "astro preview",
    "biome:check": "biome check",
    "biome:fix": "biome check --write",
    "biome:fix:unsafe": "biome check --write --unsafe",
    "ncu:check": "ncu",
    "ncu:upgrade": "ncu -u",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "images:optimize": "node scripts/optimize-images.mjs",
    "md:check": "node scripts/check-md-parity.mjs",
    "md:check:strict": "node scripts/check-md-parity.mjs --strict",
    "search:budgets": "node scripts/check-search-performance-budgets.mjs",
    "lighthouse": "lhci autorun",
    "release": "bash .github/scripts/prepare_release.sh"
  }
}
```

## Testing

```bash
# Unit tests (Vitest)
pnpm run test

# E2E tests (Playwright)
pnpm run test:e2e

# E2E test runner UI (interactive)
pnpm run test:e2e:ui

# Open the last Playwright HTML report
pnpm run test:e2e:report

# Watch mode
pnpm run test:watch

# Coverage report
pnpm run test:coverage
```

See [Testing Guide](TESTING_GUIDE.md) for conventions and coverage targets.
