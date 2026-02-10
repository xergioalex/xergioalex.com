# GitHub Actions CI/CD Pipeline

This directory contains the CI/CD automation for the **xergioalex.com** repository.

## Directory Structure

```
.github/
├── README.md                 # This file - pipeline overview
├── docs/                     # Detailed workflow documentation
│   ├── WORKFLOWS.md          # Complete workflow reference
│   └── DEPLOYMENT.md         # GitHub Pages deployment guide
├── scripts/                  # Helper bash scripts used by workflows
│   ├── get_packages_upgrades.sh    # Package update detection
│   └── get_github_release_log.sh   # Release notes generation
└── workflows/                # GitHub Actions workflow files
    ├── code_check.yml                              # Code quality checks
    ├── pull_request_check.yml                      # PR size and content validation
    ├── check_packages_versions.yml                 # Weekly package update detection
    ├── check_and_merge_packages_upgrades_pr.yml    # Auto-merge clean package updates
    └── release_and_publish.yml                     # Build, deploy, and release
```

## Pipeline Overview

### PR Lifecycle

When a **pull request is opened** to `main`:

1. **code_check.yml** — Runs Astro type checking, Biome linting, and tests
2. **pull_request_check.yml** — Calculates PR size, applies labels (XS → XXL), validates title/body

When a **PR is merged** to `main`:

3. **release_and_publish.yml** — Builds the site, deploys to GitHub Pages, bumps version, creates a GitHub release

### Automated Package Updates (Weekly)

Every Tuesday:

1. **15:00 UTC** — `check_packages_versions.yml` runs `ncu:upgrade`, creates a PR with updates
2. **20:00 UTC** — `check_and_merge_packages_upgrades_pr.yml` auto-merges the PR if CI passes

The merge then triggers `release_and_publish.yml` for automatic deployment.

### Pipeline Flow Diagram

```
  PR opened/updated to main
         │
         ├──────────────────┐
         ▼                  ▼
  ┌──────────────┐   ┌──────────────────┐
  │ code_check   │   │ pull_request_    │
  │ • astro:check│   │ check            │
  │ • biome:check│   │ • Size label     │
  │ • test       │   │ • Title/Body     │
  └──────┬───────┘   └────────┬─────────┘
         └────────┬───────────┘
                  ▼
          PR merged to main
                  │
                  ▼
  ┌──────────────────────────────────┐
  │ release_and_publish              │
  │ 1. Check PR size label           │
  │ 2. Build & deploy to ghpages     │
  │ 3. Create GitHub release         │
  │ 4. Cleanup caches                │
  └──────────────────────────────────┘
                  │
                  ▼
  GitHub Pages live at ghpages branch
```

## Quick Reference

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `code_check.yml` | PR to main | Lint, type check, test |
| `pull_request_check.yml` | PR to main | Size label, title/body validation |
| `check_packages_versions.yml` | Tuesdays 15:00 UTC | Detect package updates |
| `check_and_merge_packages_upgrades_pr.yml` | Tuesdays 20:00 UTC | Auto-merge clean update PRs |
| `release_and_publish.yml` | PR merged to main | Build, deploy, release |

## Secrets Required

| Secret | Used In | Purpose |
|--------|---------|---------|
| `AUTOMATION_GITHUB_TOKEN` | All except code_check | Git push, PR management, releases |
| `SENTRY_DSN` | release_and_publish | Error tracking (build-time) |
| `SENTRY_PROJECT` | release_and_publish | Sentry project ID |
| `SENTRY_AUTH_TOKEN` | release_and_publish | Sentry authentication |
| `PUBLIC_GOOGLE_MAPS_API_KEY` | release_and_publish | Google Maps (public, build-time) |
| `PUBLIC_GA_TRACKING_ID` | release_and_publish | Google Analytics (public, build-time) |
| `PUBLIC_MIXPANEL_TOKEN` | release_and_publish | Mixpanel analytics (public, build-time) |

## Deployment Strategy

The site deploys to **GitHub Pages** from the `ghpages` branch using a **conflict-free force-push strategy**:

1. Checkout `main` at the merged commit
2. Build the static site (`npm run build:ghpages` → `docs/`)
3. Create/reset `ghpages` branch from `main` (`git checkout -B ghpages`)
4. Force-push to overwrite remote `ghpages` completely

This ensures deployments **never fail due to merge conflicts**, because there is no merge or rebase operation. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for details.

## Detailed Documentation

- **[docs/WORKFLOWS.md](docs/WORKFLOWS.md)** — Complete reference for each workflow (triggers, jobs, steps, secrets)
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** — GitHub Pages deployment strategy, troubleshooting, and architecture decisions
