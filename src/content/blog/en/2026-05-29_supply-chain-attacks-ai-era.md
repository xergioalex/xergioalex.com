---
title: "Supply chain attacks in the AI era: the state of open source in 2026"
description: "Public package registries have shipped malware over and over this past year. What's happening, why AI changed the game, and how to lock down the install side."
pubDate: 2026-05-29T10:00:00Z
tags: ["tech", "devops", "ai", "javascript"]
keywords: ["supply chain attack 2026", "npm pnpm minimumReleaseAge", "Shai-Hulud worm", "tj-actions changed-files CVE-2025-30066", "slopsquatting", "axios npm compromise 2026", "Bitwarden CLI malicious 2026.4.0", "TanStack npm postmortem", "PyPI Trusted Publishing", "open source security 2026"]
heroImage: "/images/blog/posts/supply-chain-attacks-ai-era/hero.webp"
heroLayout: banner
draft: true
---

Modern software runs on third-party dependencies. Every time a developer builds or ships an application, their package manager automatically resolves dozens — sometimes hundreds — of dependencies from public registries; and that step is increasingly run by an AI agent acting on their behalf. There are millions of packages in those registries. And over the past year, several of the most popular have been hijacked to ship malicious code.

The track record from the past year speaks for itself. In September 2025, npm saw [its first self-replicating worm](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised): code that, once installed on a developer's machine, harvested their credentials and republished itself into other packages owned by the same person — infecting hundreds within days. In March, [axios](https://socket.dev/blog/axios-npm-package-compromised) — a library used by thousands of companies, with over 100 million weekly downloads — shipped two malicious versions inside a 39-minute window. In April, [Bitwarden's command-line tool](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/) was under attacker control for ninety minutes, and the first thing the malware did once it landed on a machine was scan for installed AI coding assistants. Then May: [42 packages in the `@tanstack/*` organization](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem) compromised in a six-minute window, and eight days later [hundreds more under `@antv/*`](https://www.microsoft.com/en-us/security/blog/2026/05/20/mini-shai-hulud-compromised-antv-npm-packages-enable-ci-cd-credential-theft/) in a twenty-two-minute one.

If you ship software in 2026, the repositories you depend on are under coordinated attack. Malicious packages have always existed — what's new is the speed, the scale, and AI breaking into both sides of the game. On the attacker side, AI is being used to invent plausible-sounding package names, to re-obfuscate the malicious code between victims, and to target the developer's own AI coding assistants. On the victim side, those same assistants are running `npm install` for us with less and less human review. A poisoned agent writes poisoned code for months.

What follows is a map of what's happening, who's getting hit, and how AI is rewriting the playbook — with a concrete defensive baseline at the end, the same one I just landed on this site, for developers who want to close the gap. Almost every citation links to a primary source: vendor postmortems, security-firm research, CISA advisories. None of this is speculation.

---

## The wave is not just npm

The headlines are mostly about npm because it's the registry with the biggest blast radius — a single popular package can have hundreds of millions of weekly downloads. But the same playbook has been running on every major public registry.

In its [State of the Software Supply Chain 2026](https://www.sonatype.com/state-of-the-software-supply-chain/introduction), Sonatype counted over 454,000 new malicious packages in 2025 alone — up 75% year over year. From the same report: developers accept 39% of AI-suggested code without review. Those two numbers, read together, explain why today's attacks feel different from the ones five years ago.

### npm — the headline incidents

**Shai-Hulud (September 2025).** The first self-replicating worm in npm history — and the event that defined the rest of the year. A computer *worm* is code that copies itself from one victim to another; in this case, once a developer installed the compromised version of the `@ctrl/tinycolor` package, the code scanned their machine for credentials — Amazon Web Services keys, GitHub access, the npm publish token that lets the package owner ship new versions — and used that last token to infect up to twenty more packages owned by the same person. [CISA issued an alert](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem) on September 23. By the end of the month the infected-package count had climbed from around 180 to over 500. [A second wave hit two months later](https://unit42.paloaltonetworks.com/npm-supply-chain-attack/), this time with a destructive fallback: if the code couldn't exfiltrate credentials cleanly, it wiped the user's home directory. [StepSecurity has the most detailed technical analysis](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised).

**Axios (March 2026).** The thing to underline: it wasn't a fake package with a similar name. It was the real `axios` package, one of the most-used libraries in the Node.js ecosystem (over 100 million weekly downloads, 174,000 dependent projects). On March 31, someone with access to the maintainer's account published two malicious versions 39 minutes apart. Any project configured to auto-update to the latest minor version of axios — npm's default behavior — pulled the malware on its next install. The code downloaded and ran a remote-access program on the machine, giving the attacker control of every unsuspecting developer's box. [Socket's postmortem](https://socket.dev/blog/axios-npm-package-compromised) unpacks it well. Root cause: an old maintainer credential still active alongside the new secure authentication setup. A single forgotten setting.

**Bitwarden CLI (April 2026).** Bitwarden is a password manager; its command-line tool ships via npm. It was compromised for about ninety minutes on April 22. The interesting part wasn't *how* the attackers got in — initial access came [through a piece of Bitwarden's own automated packaging pipeline](https://www.endorlabs.com/learn/shai-hulud-the-third-coming----inside-the-bitwarden-cli-2026-4-0-supply-chain-attack), not the maintainer's account — but what the code did once installed. [Palo Alto's analysis](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/) describes the part that keeps coming back to me: the first thing it looked for on the developer's machine was installations of Claude Code and Cursor — two of the most popular AI coding assistants — and tried to modify their configuration to inject persistent instructions. End-user Bitwarden vaults were not touched ([official statement](https://community.bitwarden.com/t/bitwarden-statement-on-checkmarx-supply-chain-incident/96127)). But what the attack targeted tells you exactly where attackers think the next big leverage point lives.

**TanStack (May 11, 2026).** TanStack is a popular collection of libraries in the React world. The [official postmortem](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem) walks through three chained vulnerabilities in the automated system the team uses to publish new versions: someone leveraged that chain to extract the credential the pipeline uses to publish to npm, and used it to ship 84 malicious versions across 42 packages. Detection took 20–26 minutes; all of them were deprecated within an hour and 43 minutes. Fast response. Still very bad. [OpenAI published its own postmortem](https://openai.com/index/our-response-to-the-tanstack-npm-supply-chain-attack/) confirming two corporate devices were impacted, and responded by rolling out a specific defense (`minimumReleaseAge`, covered later in this post) across all of its internal pipelines. It's the first documented adoption at an organization of that size.

**AntV (May 19, 2026).** Eight days after TanStack, another massive wave. The account of a maintainer of data-visualization packages published [637 malicious versions across 317 packages in a 22-minute window](https://www.microsoft.com/en-us/security/blog/2026/05/20/mini-shai-hulud-compromised-antv-npm-packages-enable-ci-cd-credential-theft/), including some with real traffic (`size-sensor`, `echarts-for-react`, `timeago.js` — several million weekly downloads each). [Microsoft Security attributed the attack to TeamPCP](https://threats.wiz.io/all-actors/teampcp), the same group behind recent Shai-Hulud variants. The code stole credentials from password managers, cloud access, and infrastructure permissions. But the important thing here is the scale: 637 versions in 22 minutes isn't published by hand. The attackers automated the supply side. The defenders — review, alert, deprecate — are still human.

### PyPI — same playbook, fewer headlines

**Microsoft `durabletask` (May 2026).** Yes: an official Microsoft package on the public Python repository. About 417,000 monthly downloads. [Two versions published minutes apart](https://www.wiz.io/blog/durabletask-teampcp-supply-chain-attack) shipped a module called `roulette.py` with two destructive modes: one checked the system's regional settings and only activated on machines configured for Iranian or Israeli locales; the other was a "Russian roulette" with a 1-in-6 chance of wiping the disk. It's the first documented case of an official Microsoft package on the Python ecosystem shipping destructive code. The important shift: the damage isn't limited to credential theft anymore. It includes sabotage.

**Lazarus Group (2025).** Sonatype [blocked 234 malicious packages](https://thehackernews.com/2026/02/lazarus-campaign-plants-malicious.html) attributed to the North Korean Lazarus group in the first half of 2025, distributed through a LinkedIn campaign where a supposed recruiter asked crypto developers to "take a look at this code." This is not a single actor, it's a state-coordinated operation, sustained over time, and it crosses ecosystems (npm and PyPI at the same time).

### Beyond npm and PyPI

The same pattern has replicated across other ecosystems (Ruby, Rust, Java, Docker), with less volume and fewer headlines. The milestone worth naming is from May 2026: [Ruby Central — the team that maintains the Ruby package repository — temporarily suspended new account signups](https://thehackernews.com/2026/05/rubygems-suspends-new-signups-after.html) after hundreds of malicious packages were uploaded in a short window. They re-enabled signups a few days later, this time behind a WAF (a firewall that filters suspicious web traffic) and tighter limits on account creation. It's the first time a major repository has temporarily closed its front door to slow an active attack. Something that would have been unthinkable two years ago.

The pattern is clear across all of the above: the registry-level attack and the publishing-pipeline-level attack are converging. Developer credentials get stolen, pipelines get leveraged, the malicious code runs both on personal machines and inside companies' internal systems — and the loot, ironically, is more credentials to keep expanding.

---

## Where AI is actually accelerating this

I want to be careful here because half of what gets written about "AI in supply chain attacks" is breathless and undersourced. What follows is verified and backed by concrete evidence.

### Slopsquatting

Two terms first. **Typosquatting** is when an attacker registers a package with a name nearly identical to a legitimate one (`requets` instead of `requests`, `loadsh` instead of `lodash`) hoping someone installs it by mistyping. It's been around forever.

**Slopsquatting** is the same thing, but built on a newer observation: AI models invent package names that don't exist. In an [academic study](https://www.usenix.org/system/files/conference/usenixsecurity25/sec25cycle1-prepub-742-spracklen.pdf) on 576,000 code snippets generated by 16 different models, commercial models invented non-existent packages in roughly 5% of suggestions; open-source models, in 22%. Those names aren't random — they're plausible, they sound real, and the models tend to *repeat the same invented names* across different conversations. Predictable things are exploitable things.

[Seth Larson at the Python Software Foundation coined the term **slopsquatting**](https://en.wikipedia.org/wiki/Slopsquatting) in April 2025 to describe the next step: an attacker watches what packages AI models hallucinate, registers those fake names on the real repository, and waits. When a developer (or, increasingly, an AI agent acting on their behalf) pastes the suggestion and runs the install command, the malware arrives on its own. A Lasso Security researcher [proved this works back in 2023](https://www.aikido.dev/blog/slopsquatting-ai-package-hallucination-attacks): he registered a Python package with a name LLMs kept inventing, and it racked up 30,000+ downloads in three months. Alibaba's own README ended up copy-pasting the install command.

The attacker no longer has to guess what someone will mistype. The model tells them.

### When the attack targets the AI assistant itself

The second axis is on the malicious code side. The Bitwarden CLI compromise is one of the cleanest examples: [the code specifically went after Claude and Cursor installations](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/) and tried to modify their configuration to inject persistent instructions. The thinking is obvious: if you can poison a developer's AI copilot, every line of code that person writes for the next several months is suspect. The bug isn't in what the dev typed; it's in what the model dictated.

The same pattern repeated with [the Nx Console VS Code extension hijack in May 2026](https://thehackernews.com/2026/05/compromised-nx-console-18950-targeted.html) — around 2.2 million installations. The malicious code specifically targeted the folder where Claude Code stores its configuration and its Anthropic access keys. Alongside that: 1Password vault data, GitHub access, npm publish tokens, AWS credentials. The extension was active for 11 to 18 minutes. As collateral damage of the same incident, [GitHub confirmed unauthorized access to its own internal repositories](https://thehackernews.com/2026/05/github-internal-repositories-breached.html) during the same window — attackers claimed to have exfiltrated around 4,000.

In April 2026, Socket disclosed [SANDWORM_MODE](https://socket.dev/blog/sandworm-mode-npm-worm-ai-toolchain-poisoning) — another Shai-Hulud-family worm that does something new. Each time it infects a machine, it uses a locally-running AI model (Ollama, a tool that lets you run models without sending anything to the cloud) to *rewrite its own code* — rename variables, change structure, add filler — before propagating to the next victim. Every copy looks different. Defenses that look for "this exact piece of code is bad" struggle when the code changes every hop. And the same worm steals access keys for nine AI providers — OpenAI, Anthropic, Google, and others — because in 2026, an AI key on the black market is worth as much as an AWS key.

And in May 2026, Socket exposed the [TrapDoor](https://socket.dev/blog/trapdoor-crypto-stealer-npm-pypi-crates) campaign — over 380 malicious versions distributed simultaneously across the Node.js, Python and Rust repositories. The second stage of the attack does something I hadn't seen before: it drops files called `.cursorrules` and `CLAUDE.md` on the computer — the files where developers store the rules and context their AI assistants should use. But those files use invisible characters from the Unicode standard: the developer opens them and only sees their own rules, while the AI assistant reads hostile hidden instructions. The next function the copilot generates may carry a backdoor the machine's owner never asked for. It's the natural evolution of slopsquatting: if the first generation poisoned the package name, this one poisons the prompt your agent is reading.

### What I'm *not* claiming

I have not seen a primary-source report that quantifies something like *"X% of phishing emails targeting npm developers in 2025 were AI-written."* That's an industry-consensus claim, supported by general research on phishing and language models, but I don't have a specific number to cite. Same for AI-generated typosquats at scale — the academic study I cited proves the supply side (the models hallucinate); the demand-side measurement (how many developers actually fall for it) isn't published yet.

Honestly, I don't think the verified pieces need an exaggerated version. Slopsquatting + code targeting AI assistants + worms that rewrite themselves with local AI + AI keys stolen and resold — that's already a coherent system. The attacker uses AI to find names, AI to obfuscate code, AI tooling on the victim machine to expand the attack, and stolen AI keys to fund the next round. Five years ago none of those vectors existed. Today they're the foundation of several of the most active campaigns.

---

## The defensive baseline

From here the post gets more technical — it dives into specific tool configuration. If you're not a developer, the important takeaway is that **these attacks are preventable** with small, well-documented changes. If you have a technical team, send them this link.

For the developers still reading: most of the registry-side fixes — secure authentication, mandatory 2FA, cryptographic signing on every published package — happen on the publisher side and don't affect what shows up in your `node_modules` next Tuesday. The install-side baseline is on us. None of what follows is heroic, and most of it is one-line changes. The hard part is doing all of them, not just one. I just shipped this exact stack on this site in [PR #131](https://github.com/xergioalex/xergioalex.com/pull/131); the snippets below are taken from that diff verbatim.

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

If anything inside the container runs `npm install`, it prints a redirect warning and routes through pnpm — which means it hits the `minimumReleaseAge` filter, the lockfile, and the `allowBuilds` rules. I do not trust myself, my AI assistants, or any tutorial I'll ever paste into this terminal — none of them will reliably remember to type `pnpm`.

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
- **Pinning every GitHub Action to a SHA, not a tag.** I'm still using `actions/checkout@v4` instead of `actions/checkout@<sha>`. There's a documented attack technique that rewrites the tags of an action to point at a malicious commit; pinning directly to a commit's immutable hash prevents that. I'll do this next.

I also want to flag what *won't* help. Auditing your `node_modules` after install is not a defense — by then the postinstall has already run. Running `npm audit` is not a defense against this class of attack — it reports known CVEs in published versions, not "this version was published 14 minutes ago and we don't know yet." The defense is at install time, not after install.

---

## What you can do this week

If you only have one afternoon, the highest-leverage moves are:

1. Pin your package manager via Corepack (`"packageManager"` in `package.json`).
2. If you're on pnpm 10.16 or later, add `minimumReleaseAge` to `pnpm-workspace.yaml`. Even 24 hours is dramatically better than zero.
3. Audit your automated pipelines. Any step that runs code from a fork before human review is a risk — that kind of setup was the foundation of the TanStack incident. If you have one, either remove it or scope its permissions to read-only.
4. Migrate any package you publish from long-lived registry tokens to OIDC Trusted Publishing — on [npm](https://docs.npmjs.com/trusted-publishers/), [PyPI](https://blog.pypi.org/posts/2024-11-14-pypi-now-supports-digital-attestations/), or [RubyGems](https://rubycentral.org/news/ruby-centrals-oss-changelog-march-2025/). They all support it now.
5. Pin third-party GitHub Actions to a commit SHA, not a tag. Yes, it's uglier. The uglier version doesn't get retargeted out from under you.

None of these protect you from a determined adversary who knows you specifically. What they do is raise the cost of an opportunistic worm finding *you* in particular by enough that it goes after a different developer. That's all you're aiming for. Open source security is mostly about making yourself a less convenient target than the median.

The ecosystem isn't going to fix this for us. Registries are doing real work — PyPI 2FA is mandatory, npm provenance is GA, RubyGems and crates.io are on Sigstore — but the install-side responsibility is on the people who build software. That's us.

Let's keep building. Carefully.

---

## Resources

- [pnpm 10.16 release notes — `minimumReleaseAge`](https://pnpm.io/blog/releases/10.16)
- [Corepack documentation (Node.js)](https://nodejs.org/api/corepack.html)
- [npm Trusted Publishers](https://docs.npmjs.com/trusted-publishers/) and [provenance docs](https://docs.npmjs.com/generating-provenance-statements/)
- [PyPI digital attestations](https://blog.pypi.org/posts/2024-11-14-pypi-now-supports-digital-attestations/)
- [OpenSSF Scorecard](https://scorecard.dev/)
- [Sonatype State of the Software Supply Chain 2026](https://www.sonatype.com/state-of-the-software-supply-chain/introduction)
- [Spracklen et al., "We Have a Package for You!" — package hallucinations in LLMs (USENIX Security 2025)](https://www.usenix.org/system/files/conference/usenixsecurity25/sec25cycle1-prepub-742-spracklen.pdf)
- [TanStack postmortem](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem)
- [OpenAI's postmortem on the TanStack incident](https://openai.com/index/our-response-to-the-tanstack-npm-supply-chain-attack/)
- [Socket axios compromise writeup](https://socket.dev/blog/axios-npm-package-compromised)
- [StepSecurity Shai-Hulud analysis](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised)
- [Microsoft Security Blog — AntV compromise analysis](https://www.microsoft.com/en-us/security/blog/2026/05/20/mini-shai-hulud-compromised-antv-npm-packages-enable-ci-cd-credential-theft/)
- [TeamPCP (UNC6780) actor profile — Wiz](https://threats.wiz.io/all-actors/teampcp)
- [TrapDoor campaign (`.cursorrules` / `CLAUDE.md` poisoning) — Socket](https://socket.dev/blog/trapdoor-crypto-stealer-npm-pypi-crates)
- [Wiz analysis of tj-actions/changed-files (CVE-2025-30066)](https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066)
