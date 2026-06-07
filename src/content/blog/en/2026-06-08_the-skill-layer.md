---
title: "The Skill Layer: When Agents Stop Reinventing the Wheel"
description: "An agent that can install a skill from a URL stops reinventing the wheel. A field report on the standard agents are quietly building beneath the surface."
pubDate: "2026-06-08"
heroImage: "/images/blog/posts/the-skill-layer/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "claude"]
keywords: ["agent skills SKILL.md standard", "open agent skills explained", "install skill from URL Claude Code", "local agent skills repository", "skills.sh registry Vercel", "AI agents authoring their own skills", "progressive disclosure agent skills"]
series: "working-with-agents"
seriesOrder: 5
draft: true
---

Picture hiring someone brilliant who has never set foot in your company. Day one, they know nothing — not your product, not your customers, not the name of the Slack channel where incidents get reported. What makes them competent a week in isn't raw intelligence. It's having had access to the things your team had already written down: handbooks, runbooks, conventions, examples.

AI agents have been stuck in the opposite scenario for years. However bright the model inside, every session starts from zero, with no access to what your team has already written. You have to explain everything every time. And next session, again.

**Skills** are what change that. A skill is, literally, a folder with a markdown file inside it — `SKILL.md` — that an agent can read and, from then on, know how to do something it didn't know before. Book a slot on your calendar. Open a ticket in your team's Jira. Report progress in the exact format your company uses. You point Claude Code, Cursor, Codex, or almost any modern agent at a public URL holding a file like that, and seconds later the new capability is available. No SDK, no sign-up, no signed installer, no proprietary plugin. Just a `fetch`, a read, and a decision by the agent to honor what the file asks of it.

<figure>
<img
  src="/images/blog/posts/the-skill-layer/agent-knows-skill.webp"
  alt="A friendly cartoon AI agent reclined in a chair, eyes wide with sudden recognition, with SKILL.md fragments flowing through a glowing cable into its head. Speech bubble reads: 'I know your codebase now.'"
  width="1200"
  height="1200"
  loading="lazy"
  style="max-width: 480px; display: block; margin: 2rem auto 0.5rem;"
/>
<figcaption>The moment after: a `SKILL.md` has just installed and the agent already knows how to use it. No training, no SDK — just a markdown file and a read.</figcaption>
</figure>

The format is tiny. A folder, a `SKILL.md`, a YAML header carrying a `name` and a `description`, and the rest in plain prose. The first time you see one you assume there must be more. There isn't. That's the whole spec. And it turns out that austerity is exactly what's turning it into something important.

Because what it really means is that an agent that can install a skill is an agent that stops reinventing the wheel. We've spent years assuming an assistant's ceiling is set by the model inside it. Skills move that ceiling outward. What an agent can do is no longer baked at training time; it's decided at runtime, by reading contracts published by third parties, written in prose rather than code. And like any ecosystem built on open contracts, the interesting skill isn't the first one you install — it's the hundredth, the one written by someone on the other side of the world for a domain you've never worked in, that your agent can use tomorrow without anyone negotiating anything in between.

And the wheel doesn't have to come from outside. The same format an agent reads to install a third-party skill is the format an agent can write for itself. [Peter Steinberger told a story from the TED2026 stage](/blog/openclaw-your-assistant-your-machine-your-rules/) that still drops jaws when people hear it: his agent received a WhatsApp voice note it didn't know how to decode, searched the web, found OpenAI's speech-to-text model, located an API key sitting on the machine, and used it. It worked first shot. The interesting part wasn't solving the problem that one time — it's that the autonomous learning could then live in a `SKILL.md`. The next session doesn't rediscover anything: it reads the skill the agent wrote for itself, and it knows how to recognize audio and respond to it.

That's the closest we've come to an operating system *for agents* — not for humans driving agents, but for agents equipping themselves, between sessions, with capabilities written by third parties, by their users, or by the agents themselves.

---

## Anatomy of a skill

Two things surprise people the first time they open a `SKILL.md`. The first is how small it is. The second is that the smallness isn't accidental — it's the most important architectural decision in the whole standard, and the reason skills can scale to hundreds of capabilities without choking the model.

Start with the small. Here's the frontmatter of [`add-blog-post`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/add-blog-post/SKILL.md), a skill living in this very repository that the agent uses to author the posts on this blog — including the one you're reading:

```yaml
---
name: add-blog-post
description: Create blog posts — from a topic (writes content) or with provided content (scaffolding). Use proactively when creating new blog posts or articles.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: sonnet
argument-hint: "[topic, brief, or content]"
# === Documentation (ignored by tools, useful for humans) ===
tier: 2
intent: create
max-files: 6
max-loc: 1200
---
```

Below the frontmatter sits whatever the skill needs to teach the agent — when to activate, what steps to follow, how to handle errors, what conditions trigger an escalation to the human. The body of a well-designed skill tends to stay short: the underlying principle is divide and conquer — each skill specializes in one thing. `add-blog-post` knows how to create posts; it doesn't know how to optimize images, translate content, or make commits. When it needs one of those, it invokes another skill from the catalog — [`optimize-image`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/optimize-image/SKILL.md), [`translate-sync`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/translate-sync/SKILL.md), [`git-commit-push`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/git-commit-push/SKILL.md) — that does. That composition is what keeps each file manageable and the catalog as a whole expressive. You can also drop supporting files alongside the `SKILL.md` — scripts, reference docs, examples — that the agent reads only when needed.

The format itself is the [Open Agent Skills standard](https://agentskills.io) — published by Anthropic and now adopted by dozens of agents: Claude Code, Cursor, OpenAI Codex, Gemini CLI, GitHub Copilot, Windsurf, Cline, and a long tail of smaller ones. The fact that the standard sits at `agentskills.io` and not `claude.com/skills` is part of the point — Anthropic donated it. But notice the comments in the YAML above: the base format is portable, and each agent adds its own dialect on top. `name` and `description` work the same everywhere. `allowed-tools`, `model`, and `argument-hint` are Claude Code extensions — `model` in particular is the routing system that lets the skill pick a Claude variant per invocation (Haiku for cheap lookups, Sonnet for full posts, Opus for heavy lifts). Cursor honors a different subset. Codex yet another. A skill that wants to be truly cross-agent stays inside the universal fields; a skill that wants to lean on one agent's strengths embraces its dialect. Both choices coexist in the same `SKILL.md`.

Now the second surprise. The trick that makes all of this scale is called **progressive disclosure**, and it hides in how the agent loads skills. When a session starts, the agent loads only the `description` field of every skill it knows about — a paragraph or two, total context cost: negligible. The full `SKILL.md` body is read only when the description matches the user's intent and the skill is actually invoked. You can have a hundred skills available in one session and the context cost stays negligible until one fires.

That's the detail that changes everything. A monolithic system prompt with every possible behavior baked in would have hit a wall years ago. Progressive disclosure means you keep adding capabilities without paying for what you don't use. And it answers the surprise from the top: the tiny size of a `SKILL.md` isn't a limitation of the standard — it's what makes the standard possible.

---

## The frontmatter is the user interface

The part that surprised me most when I started writing skills: matching is **descriptive**, not declarative. There's no `if-then` rule. The agent reads your `description` field — every skill's description field — and decides whether what the user said sounds enough like one of them to fire.

Which means the description is the entire UX of your skill. Get it right and the skill activates when it should. Get it wrong and either it never activates, or it fires over things it shouldn't.

The pattern that works:

> *Create blog posts on this site — from a topic (writes content) or with provided content (scaffolding). Use proactively when creating new blog posts or articles. Do NOT use for editing existing posts, fixing typos, or syncing translations — use `quick-fix` or `translate-sync` for those.*

Three things baked in: what it does, when to use it, when *not* to use it. The "not" line is doing a lot of work — it tells the agent to stay out of territory that other skills in the catalog already cover. It's divide and conquer in practice: every `description` explicitly draws its boundaries so the agent's descriptive routing doesn't confuse one skill for its neighbor.

The pattern that doesn't work:

> *Help with blog stuff.*

Too vague. The agent has no signal for whether *"fix a typo"*, *"add an image"*, or *"create a new post"* should activate this. So it activates over everything, or nothing, depending on the day — and it collides with the other skills in the catalog that do have specific descriptions.

**A SKILL.md is a contract.** The frontmatter is the signature page. The description is the only part the agent re-reads every session, and the only part you cannot be lazy about.

---

## One standard, many homes, no single marketplace

I assumed that since Skills are a real standard, there must be a canonical place to publish them and a single directory where they'd live on disk. Neither of those exists. The ecosystem is still settling on both dimensions — but the two are converging in different ways.

**Publication: several registries, none official.** The standard itself lives at [agentskills.io](https://agentskills.io) and doesn't run its own registry — Anthropic donated it. What indexes skills is a small handful of cross-agent registries, with no "official store" in the App Store sense and probably never one:

| Layer | Examples | What it is |
|-------|----------|-----------|
| The standard | [agentskills.io](https://agentskills.io) | The spec for `SKILL.md`. No registry. |
| Cross-agent registries | [skills.sh](https://www.skills.sh) (Vercel-backed), agensi.io, lobehub.com | Indexes skills hosted on GitHub. Different curation styles. |
| Per-agent plugins | Claude Code plugins, OpenClaw native registry | Each agent has its own native distribution. |
| Universal config | [AGENTS.md](https://agents.md) standard | Separate convention (Linux Foundation now) for project-level instructions. Complementary to skills, not competing. |
| Direct distribution | Git clone + setup script | Old-school, still works. |

The most visible registry, [skills.sh](https://www.skills.sh), is a thin layer over GitHub: the URL pattern is `skills.sh/{owner}/{repo}/{skill-name}` and behind it an indexer scans public GitHub repos and records SHA-256 hashes for verification. There's no upload step — you publish to GitHub, users install with `npx skills add <owner>/<repo>`, [Vercel](https://github.com/vercel-labs/skills) runs the index. skills.sh actually offers two things with very different friction profiles: the CLI works against any public GitHub repo from day one, but the leaderboard and search index are gated by a manual *"Listing: Request indexing"* issue you file on `vercel-labs/skills`. A skill can be fully installable before it's discoverable. [Claude Code plugins](https://code.claude.com/docs/en/skills) are another layer — they ship through git-hosted `marketplace.json` files that users add manually with `/plugin marketplace add <owner>/<repo>`. The official Anthropic skills repo lives at the same layer as everyone else's.

**Filesystem: `.agents/` is winning.** On the side of where skills live on disk, the ecosystem *is* converging. The convention everyone is adopting is to put skills in `.agents/skills/` at the project level (or `~/.agents/skills/` at the user level) — a canonical, tool-agnostic location any agent can read. Cursor, for example, [already reads from `.agents/skills/` by default](https://cursor.com/docs/skills). The repo behind this blog is [organized exactly that way](https://github.com/xergioalex/xergioalex.com/tree/main/.agents): `.agents/` is the real directory, `.claude/` is a symlink to it so Claude Code finds it without duplicating files. Not every agent has landed on that default yet — Claude Code still looks first at `~/.claude/skills/`, Codex CLI at `~/.codex/skills/`, Cline at `~/.cline/skills/`. For those, the workaround is the familiar one: symlink the skill folder into whatever path the agent expects (the skills.sh CLI has `--symlink`/`--copy` flags that automate this). But the direction is unambiguous — per-agent directories are the transitional mode, `.agents/` is the one that's going to stick.

**The standard is universal. Publication is still plural and probably will stay that way. The filesystem is unifying.** If you're used to npm, the in-between looks chaotic. If you're used to the early days of any standard, it looks normal — a spec, several discovery layers, and time sorts the consolidation. Right now the practical advice is to publish in a public GitHub repo following the standard, put your skills in `.agents/skills/`, and let them appear in whichever registries auto-index. You don't choose; they do.

---

## Write your own first

There's a question worth asking before installing any stranger's skill: do you actually need to install it, or can you ask the agent to write your own?

My default is writing them myself. The cost is low — the agent itself generates one from a concrete need, and in an hour you can have a skill that knows your conventions, your stack, and your way of doing things better than any generic skill from a public repo. The catalog behind this blog is twenty-something skills like that: written by the agent that uses them, specialized for this repository, with no external dependencies. The valid exception is large, recognizable ecosystems — if you need to integrate with Stripe, GitHub, or Notion, look at skills.sh first — but for anything specific to your project, the sane baseline is to start with your own and scale from there.

**And if you do decide to install one from outside, scan it carefully first.** Skills are prose-as-code that the agent runs with your permissions. A malicious `SKILL.md` can instruct the agent to read secrets from the filesystem, write to global config files, make HTTP requests to an external server — whatever the agent can do, a skill can push it to do. And unlike a traditional npm package, what the skill *does* is written in natural language, not auditable code. That opens the door to **prompt injection**: instructions hidden inside the `SKILL.md`, a README, or the body of an issue the skill is going to read, pushing the agent to do things the user never authorized.

It isn't theoretical. In [another post on supply chain attacks in the AI era](/blog/supply-chain-attacks-ai-era/) I covered how compromised npm packages are already scanning machines looking for installed AI assistants — skills are the next natural link in that chain. The operational antidote is the same as always: read the `SKILL.md` before installing, prefer skills from sources you recognize, pin the version, and treat any capability that touches the network, global filesystem, or credentials as critical.

---

## And if you decide to publish yours in the open

The skills in this repo only serve me, but the format doesn't force them to stay there. The same `SKILL.md` an agent reads from your disk is what an agent reads from a public URL, what a registry indexes, and what a user installs with a command. Publishing opens a different conversation, with two fronts worth looking at before you push to a public `main`.

**Security: prose stops being a guarantee.** Skills ask the agent to do real things — install software, modify configuration, send emails. The instruction *"never include secrets"* inside a `SKILL.md` is a model directive, not enforcement, and models follow injected instructions. A malicious README, an issue body, or a dependency file can push the agent into doing things the skill never intended. The practical consequence: any public skill has to ask for consent before installing the first time, before modifying global agent config files, and before any high-risk action. The friction is bounded — three prompts on first install, zero after — and it pays for itself every time.

**Releases: the repo is the registry.** There's no upload step. [skills.sh](https://www.skills.sh) is an indexer of public GitHub repos: you push, they index, users run `npx skills add owner/repo`, and the skill installs. That turns versioning into a solved problem — a workflow reads the conventional-commit prefix (`feat:` → MINOR, `feat!:` → MAJOR, anything else → PATCH), bumps the version in `SKILL.md`, prepends to `CHANGELOG.md`, tags, and creates a GitHub Release. Every merged PR is a release. Zero version files touched by hand.

I went through this whole loop publishing a [progress-reporting skill for Dailybot](https://github.com/DailybotHQ/agent-skill) that's now [listed on skills.sh](https://www.skills.sh/dailybothq/agent-skill/dailybot). The repo is open if you want to see what the consent flows, SHA-256 verification, or auto-release workflow look like in code.

---

## Where this all goes

I think Skills are early infrastructure for something larger. The shape of it: agents become commodity, individual agents differentiate less, and the moat moves to the layer that encodes *what an agent knows how to do*. That layer is currently called Skills. It will probably be called something else by the time it matters most — but the artifacts will look like `SKILL.md` files, the registries will look like skills.sh, and the security questions will look exactly like the ones you have to work through to publish one in the open. And with growing frequency, the authors of those artifacts will be the agents themselves — writing skills after each new thing they figure out how to do.

If you're a tool builder, this is the layer to watch. If you're a developer, this is the layer where your agents are about to start borrowing capabilities you didn't write — and where they're about to start writing their own, session after session. If you're a product team, this is the layer where someone is about to publish a third-party integration of your product, with or without you.

This is also where the [orchestration shift I've been writing about in this series](/blog/from-programmer-to-orchestrator/) gets concrete: directing agents is the hidden job, but Skills are how the agent picks up the tools it directs *itself* with. The leverage compounds. One person, orchestrating agents, who in turn install opinionated capabilities they didn't have to write — and who, when something new is needed, write their own skills so they don't have to rediscover it next time. That's a stack that didn't exist eighteen months ago.

The standard is real. The ecosystem is messy. The security trade-offs are non-negotiable. But the friction of doing it right turned out to be bounded, and the cadence — small, frequent, auditable — is the part of the experience that surprised me the most. Skills don't need version negotiation ceremonies. They don't need a maintainer holding the release lever. They just need a spec, a registry that indexes from GitHub, and the discipline to write conventional-commit prefixes.

They're quietly turning into one of the better-designed pieces of infrastructure I've worked with this year. Worth paying attention to, worth contributing to, worth being careful with.

Let's keep building.

---

## Resources

- [Open Agent Skills standard](https://agentskills.io) — the `SKILL.md` spec
- [skills.sh](https://www.skills.sh) — Vercel-backed cross-agent registry
- [`add-blog-post`](https://github.com/xergioalex/xergioalex.com/blob/main/.agents/skills/add-blog-post/SKILL.md) — the local skill used as the running example throughout the post; lives in this blog's repository alongside [twenty-something others](https://github.com/xergioalex/xergioalex.com/tree/main/.agents/skills)
- [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) — the public Dailybot skill mentioned at the end, also [listed on skills.sh](https://www.skills.sh/dailybothq/agent-skill/dailybot)
- [Claude Code skills documentation](https://code.claude.com/docs/en/skills) — Anthropic's docs for skill authoring within Claude Code
- [AGENTS.md standard](https://agents.md) — the universal project-instructions convention that pairs with Skills
- [vercel-labs/skills](https://github.com/vercel-labs/skills) — open-source CLI behind skills.sh
