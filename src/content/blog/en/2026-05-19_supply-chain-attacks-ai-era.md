---
title: "Supply chain attacks in the AI era: the state of open source in 2026"
description: "In 18 months, npm, PyPI, RubyGems, Maven and Crates have all shipped malware. AI is accelerating both sides of the playbook. A tour of what's happening, with the defensive baseline at the end."
pubDate: 2026-05-19T10:00:00Z
tags: ["tech", "devops", "ai", "javascript"]
keywords: ["supply chain attack 2026", "npm pnpm minimumReleaseAge", "Shai-Hulud worm", "tj-actions changed-files CVE-2025-30066", "slopsquatting", "axios npm compromise 2026", "Bitwarden CLI malicious 2026.4.0", "TanStack npm postmortem", "PyPI Trusted Publishing", "open source security 2026"]
heroImage: "/images/blog/posts/supply-chain-attacks-ai-era/hero.webp"
heroLayout: banner
draft: true
---

Eight days ago, [42 npm packages under `@tanstack/*` were compromised](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem) inside a six-minute window. Three weeks before that, [Bitwarden's CLI on npm](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/) was hijacked for ninety minutes — and the payload specifically probed for installed AI coding assistants. Last month: [axios](https://socket.dev/blog/axios-npm-package-compromised), a package with over 100 million weekly downloads. Last quarter: [the YOLO library on PyPI](https://www.reversinglabs.com/blog/compromised-ultralytics-pypi-package-delivers-crypto-coinminer). Last September: [the first true self-replicating worm in npm's history](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised), infecting hundreds of packages in days.

If you ship software in 2026, the public registries you depend on are under coordinated attack. The volume is not the new thing — malicious packages have always existed. The new thing is that AI is accelerating both sides of the playbook. Attackers more than defenders, for now.

This post is a tour of the state of the art. What's happening, who's being hit, how AI is reshaping the playbook on both sides, and at the end the defensive baseline I just shipped on this site as one worked example. Almost every citation links to a primary source — vendor postmortems, security-firm research, CISA advisories. None of this is speculation.

---

## The wave is not just npm

The headlines are mostly about npm because it's the registry with the biggest blast radius — a single popular package can have hundreds of millions of weekly downloads. But the same playbook has been running on every major public registry.

### npm — the headline incidents

**Shai-Hulud (September 2025).** The first true self-replicating worm in npm history. [Aikido researcher Charlie Eriksen and StepSecurity surfaced it](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised) on September 14–15. The index case was `@ctrl/tinycolor@4.1.1`. Once a maintainer ran `npm install` on a compromised version, the worm ran [TruffleHog](https://github.com/trufflesecurity/trufflehog) inside their machine, harvested any AWS keys, GitHub PATs, and npm tokens it could find, then used the stolen npm token to auto-publish itself into up to twenty other packages owned by the same maintainer. [CISA issued an alert](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem) on September 23. The package count grew through late September from "180+" to "500+" depending on the cut-off date. A [second wave hit two months later](https://unit42.paloaltonetworks.com/npm-supply-chain-attack/), branded "Sha1-Hulud: The Second Coming" in the attacker's own exfil descriptions, and this one carried a destructive fallback that would `rm -rf` the victim's home directory if it couldn't exfiltrate cleanly.

**The real axios hijack (March 2026).** Not a typosquat — the actual `axios` package on npm, with [over 100 million weekly downloads and 174,000 dependents](https://thehackernews.com/2026/03/axios-supply-chain-attack-pushes-cross.html). On March 31, the maintainer `jasonsaayman` published `axios@1.14.1` and `axios@0.30.4` within 39 minutes of each other — and any project on a `^1.x` or `^0.x` caret would pull them on the next install. The malicious versions depended on a pre-staged typosquat called `plain-crypto-js` that downloaded and executed a cross-platform RAT on install. [Socket's postmortem](https://socket.dev/blog/axios-npm-package-compromised) is worth reading in full. The root cause was a long-lived npm token coexisting with Trusted Publishing — exactly the kind of legacy credential most maintainers still have lying around.

**Bitwarden CLI (April 2026).** `@bitwarden/cli@2026.4.0` was live for about ninety minutes on April 22. [SecurityWeek](https://www.securityweek.com/bitwarden-npm-package-hit-in-supply-chain-attack/) covered the disclosure; Palo Alto's [analysis of the payload](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/) is the part I keep thinking about. The initial access wasn't a compromised maintainer — it was a [compromised GitHub Action inside Bitwarden's own CI/CD pipeline](https://www.endorlabs.com/learn/shai-hulud-the-third-coming----inside-the-bitwarden-cli-2026-4-0-supply-chain-attack), injected at the npm packaging step. The payload, once it was on a developer's machine, probed for installed AI coding assistants and tried to inject persistent hooks into them. End-user vaults were not touched ([Bitwarden's statement](https://community.bitwarden.com/t/bitwarden-statement-on-checkmarx-supply-chain-incident/96127)). But the targeting tells you exactly where the attackers think the next big leverage point is.

**TanStack (May 11, 2026).** Eight days ago at the time I'm writing this. The [TanStack postmortem](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem) walks through three chained GitHub Actions vulnerabilities: a `pull_request_target` workflow that ran fork-controlled code, a poisoned pnpm cache that survived across unrelated PR merges, and a binary that read `/proc/*/cmdline` to find the Runner.Worker process and extract the OIDC token out of its memory. The token went straight to npm publish. Detection took 20–26 minutes after the first malicious publish; the 84 versions were deprecated within an hour and 43 minutes. Fast response. Still very bad.

### PyPI — same playbook, fewer headlines

**ultralytics (December 2024).** The YOLO library, around 60 million PyPI downloads. Versions `8.3.41`, `8.3.42`, `8.3.45`, and `8.3.46` shipped a cryptominer. [ReversingLabs traced the root cause](https://www.reversinglabs.com/blog/compromised-ultralytics-pypi-package-delivers-crypto-coinminer) to a GitHub Actions script-injection vulnerability in `ultralytics/actions` that let a malicious PR tamper with the build *after* code review, plus a stolen PyPI token reused two days later. It's the same TTP template you'll see again in 2025: post-review CI tampering via a pre-merge workflow.

**JarkaStealer (disclosed November 2024).** [Kaspersky found packages](https://www.kaspersky.com/blog/jarkastealer-in-pypi-packages/52640/) posing as ChatGPT and Claude wrappers — `gptplus`, `claudeai-eng` — which had been live for over a year. ~1,700 downloads, 30+ countries. The lure is the AI tooling category itself; if you're a developer racing to add an LLM to your project, you're a less careful installer than usual.

**The DPRK-aligned wave.** [Sonatype blocked 234 malicious npm and PyPI packages](https://thehackernews.com/2026/02/lazarus-campaign-plants-malicious.html) tied to North Korea's Lazarus Group between January and July 2025, distributed via LinkedIn fake-recruiter lures targeting Web3 developers. Cross-ecosystem, state-aligned, persistent.

### RubyGems, Crates, Maven, Docker Hub

**RubyGems** got hit twice that are worth naming. [Fastlane-Telegram proxy gems in May 2025](https://socket.dev/blog/malicious-ruby-gems-exfiltrate-telegram-tokens-and-messages-following-vietnam-ban) — published days after Vietnam's nationwide Telegram block, impersonating legitimate Fastlane plugins and exfiltrating bot tokens. And a [60-gem South Korean campaign across 2023–2025](https://thehackernews.com/2026/05/poisoned-ruby-gems-and-go-modules.html) impersonating Instagram, X, TikTok and WordPress automation, totaling around 275,000 downloads. The gems even delivered the advertised functionality — they just also stole your credentials. This month (May 2026) [Ruby Central suspended new account signups](https://thehackernews.com/2026/05/rubygems-suspends-new-signups-after.html) after hundreds of malicious packages were uploaded in a short window.

**Crates.io** is the calmest of the big registries, but not empty. [`faster_log` and `async_println`](https://blog.rust-lang.org/2025/09/24/crates.io-malicious-crates-fasterlog-and-asyncprintln/) (May–September 2025) were typosquats of `fast_log` that scanned project files for Solana and Ethereum private keys at runtime. About 8,400 combined downloads before crates.io disabled the accounts.

**Maven Central** got pulled into Shai-Hulud's wake. [The second-wave worm reached Maven on November 25, 2025](https://thehackernews.com/2025/11/shai-hulud-v2-campaign-spreads-from-npm.html) via mirrored PostHog artifacts. Maven Central purged the compromised mirrors that night.

**Docker Hub.** [The Checkmarx `checkmarx/kics` repository was hijacked](https://www.cxodigitalpulse.com/malicious-docker-images-and-vs-code-extensions-compromise-checkmarx-supply-chain/) in 2024 — legitimate tags `v2.1.20` and `alpine` replaced with credential-exfiltrating versions. And as of August 2025, [BleepingComputer documented 35+ Linux images on Docker Hub still shipping the XZ backdoor (CVE-2024-3094)](https://www.bleepingcomputer.com/news/security/docker-hub-still-hosts-dozens-of-linux-images-with-the-xz-backdoor/), more than a year after disclosure, with some used as base images for other published images.

### GitHub Actions itself

The marketplace got compromised twice in the same week of March 2025, and the second one is the one that mattered.

[`reviewdog/action-setup@v1`](https://www.wiz.io/blog/new-github-action-supply-chain-attack-reviewdog-action-setup) was tampered with on March 11, 18:42–20:31 UTC. The action dumped the Runner.Worker process memory — meaning GitHub Actions secrets — straight into workflow logs. CISA added it to the [Known Exploited Vulnerabilities catalog](https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction) on March 24. About 1,500 repos were affected directly. Investigators believe this was the entry vector for the larger attack four days later: [`tj-actions/changed-files`, CVE-2025-30066](https://github.com/advisories/GHSA-mrrh-fwg8-r2c3). Every published tag of `tj-actions/changed-files` — all of them up through v45.0.7 — was retroactively re-pointed to a malicious commit between March 12 and March 15. The payload was a Python script that read runner memory and printed secrets to the workflow log as a double-base64 blob. On public repositories with public logs, those secrets were world-readable. The action was used by [over 23,000 repositories](https://thehackernews.com/2025/03/github-action-compromise-puts-cicd.html) — though [Wiz observed only "dozens"](https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066) actually leaking on public logs, so the "23,000" number is exposure, not breach. Still the largest single-action compromise yet.

You can see the pattern. The registry-level attack and the CI-level attack are converging. Maintainer credentials get stolen; CI runners get co-opted; the payload runs on developer machines and inside CI; the loot is more credentials.

---

## Where AI is actually accelerating this

I want to be careful here because half of what gets written about "AI in supply chain attacks" is breathless and undersourced. Three things are verified and concrete.

### Slopsquatting

The first is on the supply side. In a [USENIX Security 2025 paper](https://www.usenix.org/system/files/conference/usenixsecurity25/sec25cycle1-prepub-742-spracklen.pdf) (preprinted as [arXiv:2406.10279](https://arxiv.org/abs/2406.10279)), Spracklen et al. evaluated 16 LLMs on 576,000 generated code samples in Python and JavaScript. The headline numbers: commercial models hallucinate non-existent package names in about 5.2% of suggestions, open-source models in about 21.7%. Across the test set, the authors recorded 205,474 unique hallucinated package names. Those names are not random typos — they're plausible, semantically coherent, and they tend to *repeat* across queries.

[Seth Larson of the Python Software Foundation coined the term **slopsquatting**](https://en.wikipedia.org/wiki/Slopsquatting) in April 2025 for the obvious next step: an attacker watches what packages LLMs hallucinate, registers those names on the real registry, and waits for a developer to paste an LLM suggestion into their terminal. Bar Lanyado at Lasso Security [proved this works in 2023](https://www.aikido.dev/blog/slopsquatting-ai-package-hallucination-attacks) by registering a Python package called `huggingface-cli` — a name LLMs kept hallucinating — and watching it pull 30,000+ downloads in three months. Alibaba's own README pasted in the install command.

So the attacker no longer needs to know what name to typosquat. The LLM tells them.

### AI-targeted payloads

The second is on the payload side. The Bitwarden CLI compromise is the cleanest example: [the malicious code specifically looked for Claude and Cursor installations](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/) and tried to inject persistent prompt hooks into them. The thinking is obvious — if you can poison the AI coding assistant of a developer, every line of code that developer writes for the next several months is suspect.

In April 2026, Socket disclosed [SANDWORM_MODE](https://socket.dev/blog/sandworm-mode-npm-worm-ai-toolchain-poisoning), a Shai-Hulud-family npm worm that calls a local Ollama instance to *polymorphically re-obfuscate itself between victims* — variable renaming, control-flow rewriting, decoy code insertion. Signature-based detection has a hard time with code that changes every hop. The same worm harvests API keys for nine LLM providers — OpenAI, Anthropic, Google, Groq, Together, Fireworks, Replicate, Mistral, Cohere — because in 2026, an LLM API key is as valuable as an AWS key.

### What I'm *not* claiming

I have not seen a primary-source report that quantifies "X% of phishing emails in the 2025 npm campaigns were LLM-written." That's an industry-consensus claim, supported by general phishing research, but I don't have a number for npm specifically. Same for AI-generated typosquats at scale — Spracklen et al. proves the *supply* side; the demand-side measurement isn't published yet.

Honestly, I don't think the verified pieces need an exaggerated version. Slopsquatting plus AI-targeted payloads plus polymorphic worms plus stolen LLM keys is already a coherent system. The attacker uses AI to find names, AI to obfuscate code, AI tooling on the victim machine to expand the blast radius, and stolen AI credentials to fund the next round. Five years ago none of those vectors existed.

---

## The defensive baseline

Most of the registry-side fixes — Trusted Publishing, mandatory 2FA, Sigstore attestations — happen on the *publish* side and don't affect what shows up in your `node_modules` next Tuesday. The install-side baseline is on us. None of what follows is heroic, and most of it is one-line changes. The hard part is doing all of them, not just one. I just shipped this exact stack on this site in [PR #131](https://github.com/xergioalex/xergioalex.com/pull/131); the snippets below are taken from that diff verbatim.

### Pin the package manager via Corepack

```json
{
  "packageManager": "pnpm@11.1.2"
}
```

[Corepack](https://nodejs.org/api/corepack.html) is the Node-shipped shim manager. It reads `"packageManager"` from `package.json` and provisions exactly that version. Every machine — laptop, CI runner, Docker image — gets the same pnpm. No `npm install -g pnpm` anywhere, because globally installing the tool you're trying to pin defeats the pinning.

### Enforce a publish-to-install delay

This is the one that started the whole migration. [pnpm 10.16](https://pnpm.io/blog/releases/10.16) (released September 2025) added a setting called `minimumReleaseAge`:

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 10080  # 7 days, in minutes
```

It refuses to install package versions younger than the specified age. Most of the compromised packages above were live for under two hours before being yanked. A seven-day delay means *the only way I install a compromised version is if it survives seven days without anyone noticing it*. That's a much higher bar than zero days. Since [pnpm 11](https://pnpm.io/blog/releases/11.0), the default is already 24 hours; I bumped mine to a week because I'm not on a hotfix-sensitive product.

There is an escape hatch — `minimumReleaseAgeExclude` lets you bypass the delay for packages where you do want hotfixes (your own org's packages, for instance). I don't have any exclusions right now. npm itself does not have an equivalent feature today.

### Allow-list build scripts

Since pnpm 10, postinstall scripts are blocked by default. You explicitly allow the packages that legitimately need them:

```yaml
# pnpm-workspace.yaml
allowBuilds:
  esbuild: true
  sharp: true
  "@biomejs/biome": true
  "@parcel/watcher": true
  unrs-resolver: true
```

That's the short allow-list this site needs. Five entries, all known and audited. Everything else — and "everything else" includes any newly-compromised package that ships a malicious `postinstall` — gets denied silently. Shai-Hulud, axios, Bitwarden CLI, and TanStack all relied on `postinstall` or `preinstall` execution. This setting alone neuters most of them.

### Replace `npm` inside the dev container

This is the one I'm most paranoid about. AI coding assistants and stale scripts will run `npm install` from muscle memory regardless of what's in `package.json`. So inside my dev container the binary `npm` is no longer npm:

```dockerfile
RUN rm -f /usr/local/bin/npm && \
    printf '#!/bin/bash\necho "[npm→pnpm] Redirecting \"npm $*\" to pnpm." >&2\nexec corepack pnpm "$@"\n' \
    > /usr/local/bin/npm && \
    chmod +x /usr/local/bin/npm
```

If anything inside the container runs `npm install`, it prints a redirect warning and routes through pnpm — which means it hits the `minimumReleaseAge` filter, the lockfile, and the `allowBuilds` rules. I do not trust myself, my AI assistants, or any tutorial I'll ever paste into this terminal to remember to type `pnpm`.

### Make CI hostile to legacy npm shortcuts

In GitHub Actions, the old workflow used `npm install` plus a `--no-save` install of platform-specific native binaries to work around npm's broken optional-deps resolution. That `--no-save` step bypassed the lockfile entirely — exactly the kind of "we'll fix it in CI" hack that lets compromised native binaries land in production without showing up in code review. The new workflow is one line:

```yaml
- run: corepack pnpm install --frozen-lockfile
```

`--frozen-lockfile` fails the build if `package.json` and `pnpm-lock.yaml` disagree. The CI cache is keyed on the pnpm store path (`corepack pnpm store path`) and `pnpm-lock.yaml`, not on `node_modules`.

### Decouple version bumps from git side effects

`npm version patch -m "..."` couples three things — bump, commit, tag — and runs them in an order that doesn't play well with workspace projects or CI release scripts. The replacement splits them:

```bash
corepack pnpm version patch --no-git-tag-version
git add package.json pnpm-lock.yaml
git commit -m "release v${VERSION}"
git tag -a "v${VERSION}" -m "v${VERSION}"
```

Small thing, but the implicit git commits from `npm version` were the kind of background magic that makes a release script hard to debug after a partial failure. Better to do each step explicitly.

---

## What this baseline doesn't fix

A few gaps worth naming, in plain terms:

- **Sigstore attestations on my own publishes.** This site doesn't publish to npm, so it doesn't apply. But for any package I ship, [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) plus [provenance attestations](https://docs.npmjs.com/generating-provenance-statements/) is the answer — keyless, OIDC-backed, queryable. The axios maintainer had Trusted Publishing set up alongside a legacy long-lived token; the legacy token is what got compromised. Migrate fully or don't migrate.
- **SBOM generation in CI.** I haven't wired this up. For a personal site it's marginal; for anything you ship to other people it's not.
- **OpenSSF Scorecard in CI.** Same — useful for libraries, marginal for a static-site repo.
- **Pinning every GitHub Action to a SHA, not a tag.** I'm still using `actions/checkout@v4` instead of `actions/checkout@<sha>`. The tj-actions/changed-files attack was tag retargeting — every tag was rewritten to point at the malicious commit. SHA pinning prevents that. I'll do this next.

I also want to flag what *won't* help. Auditing your `node_modules` after install is not a defense — by then the postinstall has already run. Running `npm audit` is not a defense against this class of attack — it reports known CVEs in published versions, not "this version was published 14 minutes ago and we don't know yet." The defense is at install time, not after install.

---

## What you can do this week

If you only have one afternoon, the highest-leverage moves are:

1. Pin your package manager via Corepack (`"packageManager"` in `package.json`).
2. If you're on pnpm 10.16 or later, add `minimumReleaseAge` to `pnpm-workspace.yaml`. Even 24 hours is dramatically better than zero.
3. Audit your GitHub Actions for `pull_request_target` workflows running fork-controlled code. This was the TanStack root cause. If you have one, either remove it or scope its permissions to read-only.
4. Migrate any package you publish from long-lived registry tokens to OIDC Trusted Publishing — on [npm](https://docs.npmjs.com/trusted-publishers/), [PyPI](https://blog.pypi.org/posts/2024-11-14-pypi-now-supports-digital-attestations/), or [RubyGems](https://rubycentral.org/news/ruby-centrals-oss-changelog-march-2025/). They all support it now.
5. Pin third-party GitHub Actions to a commit SHA, not a tag. Yes, it's uglier. The uglier version doesn't get retargeted out from under you.

None of these protect you from a determined adversary who knows you specifically. They raise the cost of an opportunistic worm finding *you* in particular by enough that it goes after a different developer. That's all you're aiming for. Open source security is mostly about making yourself a less convenient target than the median.

The ecosystem isn't going to fix this for us. Registries are doing real work — PyPI 2FA is mandatory, npm provenance is GA, RubyGems and crates.io are on Sigstore — but the install-side responsibility is on the people who build software. That's us.

Let's keep building. Carefully.

---

## Resources

- [pnpm 10.16 release notes — `minimumReleaseAge`](https://pnpm.io/blog/releases/10.16)
- [Corepack documentation (Node.js)](https://nodejs.org/api/corepack.html)
- [npm Trusted Publishers](https://docs.npmjs.com/trusted-publishers/) and [provenance docs](https://docs.npmjs.com/generating-provenance-statements/)
- [PyPI digital attestations](https://blog.pypi.org/posts/2024-11-14-pypi-now-supports-digital-attestations/)
- [OpenSSF Scorecard](https://scorecard.dev/)
- [Spracklen et al., "We Have a Package for You!" — package hallucinations in LLMs (USENIX Security 2025)](https://www.usenix.org/system/files/conference/usenixsecurity25/sec25cycle1-prepub-742-spracklen.pdf)
- [TanStack postmortem](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem)
- [Socket axios compromise writeup](https://socket.dev/blog/axios-npm-package-compromised)
- [StepSecurity Shai-Hulud analysis](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised)
- [Wiz analysis of tj-actions/changed-files (CVE-2025-30066)](https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066)
