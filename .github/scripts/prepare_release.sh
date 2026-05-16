#!/bin/bash
# Bumps the patch version, then commits and tags explicitly.
# Replaces the legacy `npm version patch` flow so the git side effects are
# visible and reversible, and so the release works under pnpm.
set -euo pipefail

if ! git diff --quiet HEAD -- .; then
  echo "Tracked files have uncommitted changes. Refusing to prepare a release."
  git status --short --untracked-files=no
  exit 1
fi

corepack pnpm version patch --no-git-tag-version

VERSION=$(node -p "require('./package.json').version")
TAG="v${VERSION}"
RELEASE_MESSAGE="[🤖 Sergio Alexander Florez Galeano] New release to ${TAG} launched 🚀"

git add package.json
if [[ -f "pnpm-lock.yaml" ]]; then
  git add pnpm-lock.yaml
fi

if git diff --cached --quiet; then
  echo "No release metadata changes staged."
  exit 1
fi

git commit -m "${RELEASE_MESSAGE}"
git tag -a "${TAG}" -m "${TAG}"
