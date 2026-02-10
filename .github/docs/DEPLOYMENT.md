# GitHub Pages Deployment Guide

How the site is built and deployed to GitHub Pages.

---

## Architecture

```
PR merged to main
       │
       ▼
release_and_publish.yml
       │
       ▼
┌──────────────────────────────────┐
│ build_and_deploy job             │
│                                  │
│ 1. Checkout main                 │
│ 2. npm install                   │
│ 3. npm run build:ghpages         │
│    └→ Astro builds to docs/      │
│ 4. git checkout -B ghpages       │
│ 5. git push --force to ghpages   │
└──────────────────────────────────┘
       │
       ▼
GitHub Pages serves from
ghpages branch / docs/ folder
```

## Deployment Strategy: Force-Push

The deployment uses a **conflict-free force-push strategy**:

1. The workflow checks out `main` at the merged PR commit
2. Builds the static site with `npm run build:ghpages` (output: `docs/`)
3. Creates or resets a local `ghpages` branch from `main` HEAD using `git checkout -B ghpages`
4. Stages all files (main code + built `docs/`) with `git add -A`
5. Commits with message: `Build: Update static files for GitHub Pages`
6. Force-pushes to `origin/ghpages`, completely replacing the remote branch

### Why Force-Push?

The `ghpages` branch is a **build-output branch** — its only purpose is to hold the compiled `docs/` folder for GitHub Pages to serve. It has no unique code or history worth preserving.

**Previous approach (broken):** The workflow previously used `git pull origin ghpages --rebase`, which attempted to merge `main` and `ghpages` history. Since these branches always diverge (ghpages has old source code + old builds), this produced 40+ merge conflicts after every significant code change, especially package upgrades.

**Current approach (reliable):** Force-push overwrites the remote `ghpages` entirely. No merge, no rebase, no conflicts — ever.

## Key Files

| File | Purpose |
|------|---------|
| `.github/workflows/release_and_publish.yml` | Deployment workflow (job: `build_and_deploy`) |
| `astro.config.mjs` | Astro build configuration |
| `package.json` → `build:ghpages` | Build script for GitHub Pages output |
| `docs/` (on ghpages) | Built static site served by GitHub Pages |

## GitHub Pages Configuration

| Setting | Value |
|---------|-------|
| **Source** | Deploy from a branch |
| **Branch** | `ghpages` |
| **Folder** | `/docs` |

## Environment Secrets

The `build_and_deploy` job runs in the `live` environment with these secrets:

| Secret | Injected As | Purpose |
|--------|-------------|---------|
| `SENTRY_DSN` | `env.SENTRY_DSN` | Sentry error tracking |
| `SENTRY_PROJECT` | `env.SENTRY_PROJECT` | Sentry project ID |
| `SENTRY_AUTH_TOKEN` | `env.SENTRY_AUTH_TOKEN` | Sentry authentication |
| `PUBLIC_GOOGLE_MAPS_API_KEY` | `env.PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps |
| `PUBLIC_GA_TRACKING_ID` | `env.PUBLIC_GA_TRACKING_ID` | Google Analytics |
| `PUBLIC_MIXPANEL_TOKEN` | `env.PUBLIC_MIXPANEL_TOKEN` | Mixpanel analytics |
| `AUTOMATION_GITHUB_TOKEN` | Git push auth | Force-push to ghpages |

Secrets prefixed with `PUBLIC_` are embedded in the client-side JavaScript during build. This is expected for analytics and mapping services.

## Troubleshooting

### Deployment fails at "Deploy to ghpages branch"

**Possible cause:** `AUTOMATION_GITHUB_TOKEN` lacks force-push permissions.

**Fix:** Ensure the token has `contents: write` permission and the `ghpages` branch has no branch protection rules that block force-push.

### Build fails at "Build static files"

**Possible cause:** Astro build error (missing dependency, TypeScript error, etc.)

**Fix:** Run `npm run build:ghpages` locally to reproduce and fix the issue. The workflow only deploys if the build succeeds and `docs/` exists.

### Site not updating after deployment

**Possible causes:**
1. GitHub Pages caching — wait a few minutes or check the GitHub Pages deployment status
2. Browser caching — hard refresh (Ctrl+Shift+R)
3. Check the `ghpages` branch on GitHub to verify it was updated

### npm install fails with EJSONPARSE

**This should no longer happen** with the force-push strategy. If it does, check:
1. `package.json` on the PR branch for syntax errors
2. `package-lock.json` for corruption

This error previously occurred when the old rebase strategy left git conflict markers (`<<<<<<< HEAD`) in `package.json`.

## FAQ

**Q: Does force-pushing to ghpages lose deployment history?**
A: Yes, by design. Each deployment replaces the entire `ghpages` branch. The deployment history is not valuable — the actual code history is on `main`, and each build is fully reproducible.

**Q: Can I deploy manually?**
A: The deployment is triggered by merging a PR to `main`. To manually trigger, you would need to push to `ghpages` directly, which is not recommended. Instead, merge a PR to trigger the workflow.

**Q: What if two PRs merge at the same time?**
A: The workflow's concurrency setting (`cancel-in-progress: true`) ensures only one deployment runs. The latest merge will be deployed.

**Q: The `docs/` folder doesn't exist on `main` — is that correct?**
A: Yes. `docs/` is only generated during the build step and exists on the `ghpages` branch. It is not tracked on `main` or `dev`.
