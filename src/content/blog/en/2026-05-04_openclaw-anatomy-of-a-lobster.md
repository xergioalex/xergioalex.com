---
title: 'Anatomy of a Lobster: How OpenClaw Actually Works'
description: "Inside OpenClaw: the Gateway, the PI agent, the seven workspace files, skills, MCP servers, heartbeat, and the sandbox layer -- the full anatomy."
draft: true
pubDate: '2026-05-04'
heroImage: '/images/blog/posts/openclaw-anatomy-of-a-lobster/hero.webp'
heroLayout: 'side-by-side'
tags: ['tech', 'ai']
keywords: ['OpenClaw architecture', 'OpenClaw PI agent', 'OpenClaw workspace files', 'OpenClaw Gateway 18789', 'OpenClaw MCP servers', 'SOUL.md AGENTS.md HEARTBEAT.md MEMORY.md', 'OpenClaw skills ClawHub', 'OpenClaw sandboxing permissions']
series: 'mastering-openclaw'
seriesOrder: 2
---

Peter Steinberger was in Marrakesh. He was walking around a city he didn't know, his hands full, and he did what everyone on WhatsApp does when their hands are full: he held down the button and sent a voice note to his agent.

There was a problem. He hadn't built voice into the agent yet. He stood there, watching his phone, expecting silence -- and the agent replied. With an actual answer. To what he had asked. He typed back: *how did you do that?*

The agent explained. It had received an audio file, noticed it didn't know how to decode it, searched the web for what its options were, found that OpenAI had a speech-to-text model, located an OpenAI API key sitting on the machine, and tried it. It worked first shot. Nine seconds end to end. Peter's line from the TED stage: *"I'm not kidding you, the mad lad figured it out on its own."*

That's the story I keep coming back to. It's the moment where OpenClaw stops being software you configured and starts being something that configures itself a little more every day. And the only way to feel why that's a big deal is to look inside the thing -- to know what part of OpenClaw saw the audio file, what part decided to search the web, what part loaded the API key, what part actually made the call. That's what this chapter is.

If you missed the [origin story -- Peter, the burnout, the triple rebrand, why this thing exists at all](/blog/openclaw-your-assistant-your-machine-your-rules) -- start there. This one assumes none of it. We're popping the hood.

---

## Why anatomy

I keep finding myself reaching for body metaphors when I try to explain OpenClaw, so let's just start there.

Most software gets explained with boxes and arrows. Bodies are friendlier. A lobster has a carapace, a nervous system, internal organs, two claws, a heartbeat that runs whether or not it's hunting, and a shell it has to molt out of when it outgrows it. So does OpenClaw. The metaphor isn't perfect -- no metaphor is -- but it's good enough to hang the rest of this chapter on. By the end you should be able to point at any part of OpenClaw and tell me which part of the lobster it's playing.

Box-and-arrow diagrams are the worst way to teach this kind of system to a normal human. So we're going with the lobster. Sorry to the engineers who would have preferred UML.

---

## The carapace: OpenClaw on your machine

Look at this first. Everything else in this post is a tour of what's inside it.

<!-- DIAGRAM 1 HERE: diagram-architecture-overview.webp — "OpenClaw on your machine": laptop with Gateway (containing PI agent) inside, arrows out to channels, LLM, workspace folder, dashboard. -->

OpenClaw runs as a single long-running process per host -- the Gateway -- and that Gateway is the carapace. It owns the channel connections, the sessions, the routing, the embedded agent, and the HTTP server that the dashboard runs on. One Gateway, one host, one trust boundary. OpenClaw is explicitly *not* multi-tenant -- the docs say it plainly: ["one user/trust boundary per gateway"](https://docs.openclaw.ai/gateway/security). Whoever can write to `~/.openclaw/` is the user, full stop.

By default the Gateway binds to `127.0.0.1:18789`. You start it once via `openclaw onboard --install-daemon` and from then on it runs as `openclaw gateway --port 18789`. After that, every channel adapter, the dashboard, every CLI invocation, every scheduled task -- they all talk to that one process. If the process dies, the body dies with it. Which is why most people just leave it running.

Inside the Gateway lives the PI agent. The thing I want to make absolutely clear, because I got this wrong the first time I read about it: PI is *not* a separate process. It's not a subprocess the Gateway spawns and pipes to. It's an embedded SDK -- a library the Gateway imports and calls directly via [`createAgentSession()`](https://github.com/openclaw/openclaw/blob/main/docs/pi.md). The Gateway and the PI agent share memory, share state, share the same process. From the operating system's point of view, OpenClaw is one thing.

That detail matters because it explains why the system feels so cohesive. There's no IPC, no JSON-RPC dance between two processes -- just function calls. The Gateway hands the agent a session, the agent runs, the Gateway streams results back to whichever channel asked. It's the cleanest architecture decision in the whole project, and I don't think it gets enough credit.

So: the carapace is one process, on your machine, that owns everything. Hold that picture. The rest is what's inside it.

---

## The nervous system: the PI agent

A lobster doesn't have a brain in the way you and I do. What it has is a ring of nerve clusters around its esophagus -- ganglia -- that handle decisions. OpenClaw is uncomfortably close to that. The PI agent is a ring of decision-making wrapped around the message loop, and it doesn't think between turns. It only thinks when something arrives.

<!-- DIAGRAM 2 HERE: diagram-message-flow.webp — 7-stage horizontal flow: User message → Channel ingress → Normalize/dedupe/access control → Session resolution → Context assembly → Model + tool loop → Reply + persistence, with a return arrow looping back. -->

When a message lands, here's what happens, in order:

1. **Channel ingress.** The right adapter for the channel pulls the event off the network -- WhatsApp through Baileys, Telegram through grammY, Slack and Discord and the rest each through their own client -- and turns it into something OpenClaw can read.
2. **Normalize, dedupe, access control.** The Gateway normalizes the message into its internal shape, checks it isn't a duplicate, and runs the DM/group policy: pairing, allowlist, open. For groups it can require an explicit @mention before the agent will respond.
3. **Session resolution and routing.** The Gateway runs a deterministic binding hierarchy -- peer match → parent peer → guild+roles → guild → team → account → channel → default -- to figure out which agent and which session this message belongs to. There can be more than one agent per Gateway. They have separate workspaces, separate auth, separate session stores.
4. **Context assembly.** The PI agent loads the workspace files we'll get to in a minute -- SOUL, AGENTS, USER, today and yesterday's memory logs, MEMORY.md if this is a main session, plus the eligible skills snapshot. Empty files are skipped. Big files get trimmed and truncated with a marker so the prompt stays lean.
5. **Model + tool loop.** PI streams to whichever model you've configured. As tool calls come back, they pass through the policy filter, the sandbox, and the schema normalizer before they actually run. Then the result goes back to the model, and the loop continues until the model is done.
6. **Reply + persistence.** Streamed chunks flow back through the channel adapter. The conversation gets written to `~/.openclaw/agents/<agentId>/sessions/`. Any new memory or workspace edits land on disk.

That's it. Six steps, plus a return arrow back to you. Don't try to memorize the order -- even Peter probably has to look it up. The shape is what matters: the agent doesn't run in the background. It runs because something asked it to. Voice notes, scheduled ticks, button clicks in the dashboard -- all of them reduce to "a message arrived, run the loop."

---

## The antennae: how it senses the world

The Gateway answers the question, *where does input come from?* And the answer is: from anywhere you already type. Or speak.

OpenClaw ships adapters for north of twenty channels at this point: WhatsApp, Telegram, Slack, Discord, Signal, iMessage, plus a [WebChat surface](https://docs.openclaw.ai/concepts/architecture) and the dashboard. Most adapters are off by default until you authenticate them -- which, if you've ever set up a Telegram bot, you'll find unsurprisingly fiddly. WhatsApp has its own quirks because Meta does not love that any of this exists.

The dashboard is the second entry point. It's officially called the "Control UI" in the docs, and "dashboard" everywhere else, including in the `getting-started` page itself. I'm going to call it the dashboard because that's what I call it and that's what you'll call it. It's a single-page app built with Vite and Lit, served by the Gateway on the same port (`127.0.0.1:18789` by default), and it talks back to the Gateway over a typed WebSocket. Authentication happens during the WebSocket handshake -- token, password, Tailscale identity, or trusted-proxy headers. You can chat with your agent there, watch the live tool calls as they happen, edit the workspace files in a Markdown editor, schedule things, manage channels and skills.

The thing the dashboard taught me is that channels are the loud entry point but they're not the whole story. A lot of what an agent does, especially during heartbeat ticks, never goes to a channel at all -- it shows up only in the dashboard log, like a thought you weren't told about. That's a feature. You wouldn't want a ping every time the agent runs a routine self-check. But it does mean: if you've never opened the dashboard, you've only seen half of what your agent does.

---

## The seven organs: the workspace files

OpenClaw's mind lives in seven Markdown files. Yes -- Markdown. No YAML schemas, no JSON config, no DSL with its own syntax to learn. Plain text that describes how your agent should behave.

Quick honest aside before I start naming files: there are technically more files in the workspace than seven. There's `BOOT.md` for one-time startup hooks on Gateway restart. There's `BOOTSTRAP.md` for the first-run ritual that gets deleted after it runs. There are daily memory logs in `memory/YYYY-MM-DD.md`. There's `skills/` and `canvas/`. The seven I'm about to walk through are the agent's *mind* -- everything else is plumbing or history. That distinction is what Chapter 1 was getting at. I just want to be clear it's a distinction, not a literal count.

<!-- DIAGRAM 3 HERE: diagram-seven-organs.webp — vertical stack of the seven workspace files (SOUL, IDENTITY, USER, TOOLS, HEARTBEAT, AGENTS, MEMORY) with what each injects and when, flowing into a "Context window" block. -->

Workspace lives at `~/.openclaw/workspace` by default (or `~/.openclaw/workspace-<profile>` if you set `OPENCLAW_PROFILE`). Here's what each file does.

**SOUL.md** -- Persona, tone, boundaries. The voice of the agent. Loaded at the start of every session. Peter has said in interviews that this part of the design was [inspired by Anthropic's constitutional AI work](https://lexfridman.com/peter-steinberger-transcript/) -- a small set of principles that shapes everything the model does without having to repeat itself. The first time I edited SOUL.md, I changed two lines and the agent felt like a different person. Same model, same memory, same skills -- different soul. That was the moment I realized this file is load-bearing.

**IDENTITY.md** -- Name, vibe, emoji. Set during the bootstrap ritual on first run. Distinct from SOUL.md in a way that took me a beat to internalize: SOUL is *how I behave*. IDENTITY is *what I'm called*. Two separate concerns, two separate files.

**USER.md** -- Who you are. Timezone, work context, communication preferences, things the agent should know about you. Loaded every session. It's the file I revise the most, because every time I change jobs or move countries the agent needs the update.

**TOOLS.md** -- Notes about your local tools and conventions. Important caveat the docs are very clear about: this file is *reference*, not control. It does not decide which tools the agent has -- that lives in `openclaw.json` and the policy filter. TOOLS.md is for telling the agent things like "we use ripgrep, not grep" or "always run prettier before committing." Misnamed, historically.

**HEARTBEAT.md** -- An optional checklist the agent works through on its own schedule, every 30 minutes by default (or every hour if you're authenticated to Anthropic via OAuth). It's read only on heartbeat runs. It supports a simple bullet list or a structured `tasks:` block with named items and intervals. There's a small piece of behavior worth knowing about: [if HEARTBEAT.md exists but is effectively empty](https://docs.openclaw.ai/gateway/heartbeat) -- only blank lines and headers -- OpenClaw skips the run entirely and logs `reason=empty-heartbeat-file`. It's a kindness. You don't get charged for nothing. (I called this "cron in plain English" in Chapter 1, and it mostly is -- close enough to land the idea -- but inside OpenClaw, heartbeat and cron are actually two different primitives. We'll come back to that in the metabolism section.)

**AGENTS.md** -- Operating instructions. Rules, priorities, escalation paths. This is the file that's quietly become an industry standard. Codex, Cursor, Antigravity all read AGENTS.md when they're in your project. OpenClaw reads it at the start of every session. It's the closest thing OpenClaw has to a "system prompt", and the fact that it's the same filename other tools have converged on is not an accident.

**MEMORY.md** -- Curated long-term memory. Things that matter across weeks and months. This is the one that surprised me: MEMORY.md only loads in your *main, private session* -- not in shared or group chats. The reasoning is sensible (you don't want your private memory leaking into a Slack thread with your team), but it took me a while to notice why my agent suddenly forgot things in a Discord server. The day-to-day stuff lives in a separate place: `memory/YYYY-MM-DD.md`, one file per day, automatically read for "today and yesterday" before each session.

Seven files. Plain text. That's the mind.

---

## The claws: built-in tools, skills, and MCP

OK, that's enough about the brain. Let's talk about the hands.

If the seven files are what the agent thinks with, the claws are what it actually does. And there are three families of them. They feel different, they live in different places, but from the model's point of view they all look the same: a tool call.

<!-- DIAGRAM 4 HERE: diagram-three-families.webp — three columns (Built-in tools | Skills | MCP servers) all funneling down into a single "Tool calls" lane. -->

**Built-in tools.** These ship with OpenClaw. The repo's README lists them: [browser, canvas, nodes, cron, sessions, and channel actions](https://github.com/openclaw/openclaw) for Discord/Slack/etc. Plus messaging, the gateway tool, and the read/write/edit/bash trio that Pi already has and OpenClaw replaces with sandbox-aware versions. They're the ones you don't have to install. They're already there.

**Skills.** A skill is a directory with a `SKILL.md` file in it -- YAML frontmatter (`name`, `description`), Markdown body with instructions. That's a skill. No code, unless the skill itself wants to call something. The agent reads it when it decides the skill is relevant. Skills can come from six places, and the [precedence order](https://docs.openclaw.ai/skills) matters because workspace skills win over everything else by name:

1. `<workspace>/skills`
2. `<workspace>/.agents/skills`
3. `~/.agents/skills`
4. `~/.openclaw/skills`
5. Bundled skills (shipped with install)
6. `skills.load.extraDirs` (lowest)

The community skill registry lives at [ClawHub](https://clawhub.ai/) -- you install a skill with `openclaw skills install <slug>` and update them all with `openclaw skills update --all`. The skills doc itself is unusually direct about security: *"Treat third-party skills as untrusted code. Read them before enabling."* Worth taking seriously, given what happened with [ClawHavoc](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html). Chapter 1 covered that. I won't rehash it.

**MCP servers.** This is the part the docs almost hide and the part I think will matter most a year from now. OpenClaw speaks the [Model Context Protocol](https://docs.openclaw.ai/cli/mcp) in two directions.

Outbound -- *OpenClaw connects to MCP servers* -- you register a server with `openclaw mcp set <name> <json>` and OpenClaw will manage it for you. Three transports are supported: `stdio` (a local child process), `SSE/HTTP` (a remote server with optional auth headers), and `streamable-HTTP` (bidirectional remote streaming). A real example from the docs:

```bash
openclaw mcp set context7 '{"command":"uvx","args":["context7-mcp"]}'
openclaw mcp set docs    '{"url":"https://mcp.example.com"}'
```

After that, the embedded PI exposes those servers' tools in the standard `coding` and `messaging` profiles. From the model's point of view they're just tools. Session-scoped MCP runtimes get reaped after they go idle, so you're not paying for processes you're not using.

Inbound -- *OpenClaw becomes an MCP server* -- run `openclaw mcp serve` and you get a stdio MCP server that bridges your Gateway conversations to MCP clients like Claude Code. Which is wild, when you sit with it. Your personal agent becomes a tool another agent can use.

The reason all three families end up shaped the same is that, by the time the model sees them, they're just tool definitions. Same envelope. Same policy filter. Same sandbox. The three-families framing is the cleanest way to think about agent capabilities, period. Everything else is implementation detail.

---

## Metabolism: the heartbeat and the memory underneath it

A lobster's metabolism runs whether or not it's hunting. OpenClaw's metabolism is the heartbeat loop and the memory layer underneath it.

<!-- DIAGRAM 5 HERE: diagram-heartbeat-memory.webp — circular loop of 5 stages (heartbeat tick → read HEARTBEAT.md → agent turn → write daily log → optionally update MEMORY.md → back to tick), with a Time arrow on the side. -->

Heartbeat is the agent waking up periodically to do a check on its own. By default every 30 minutes, or every hour if you're on Anthropic OAuth. You can set it per-agent through `agents.defaults.heartbeat.every`, restrict it to business hours via `activeHours`, or turn it off entirely with `0m`. The crucial thing the [heartbeat doc](https://docs.openclaw.ai/gateway/heartbeat) is loud about: *"Heartbeat is a scheduled main-session turn -- it does not create background task records."* Heartbeat is not cron. They share a vibe, but inside the system they're separate primitives. Heartbeat = the agent has a turn. Cron (the OpenClaw tool) = a record of a background task gets created. Subtle, but it's the difference between "the agent checks in on its own" and "the agent has a queue of jobs."

Memory underneath the heartbeat has two layers. The daily log is a Markdown file per day -- `memory/2026-05-04.md`, `memory/2026-05-03.md`, and so on. The default AGENTS.md template tells the agent to read "today and yesterday" before processing requests, so two days of context are always cheap. The curated long-term layer is MEMORY.md, only loaded in main private sessions, which is where things you want the agent to actually *remember* go.

Sessions, credentials, and auth profiles live separately under `~/.openclaw/agents/<agentId>/sessions/`. That separation is the trick that makes multi-agent work without anyone leaking into anyone else.

I'm honestly not sure 30 minutes is the right cadence for everyone. For me it's too much in a normal day and not enough at the times I actually need a check-in. I expect the defaults to keep moving as the project learns what people use it for.

---

## Molting: how it grows safely

Lobsters don't grow gradually. They outgrow their shell, walk out of it backwards, and wait for the new one to harden. OpenClaw's security story has the same shape. The first version was wild -- give it your machine, watch it work. The version we have now is what the second shell looks like.

By default in your *main* session, tools run on the host. That's the "wild" feeling Chapter 1 talks about. In any other session, sandboxing kicks in. The default `non-main` mode runs non-main sessions inside a Docker container; SSH and OpenShell are also available. You can switch the mode to `off` if you want the wild feeling back, or to `all` if you want even your main session sandboxed. Workspace access is configurable too: `none`, `ro` mounted at `/agent`, or `rw` mounted at `/workspace`.

The list of things the [sandbox blocks by default](https://docs.openclaw.ai/gateway/sandboxing) reads like a "the right people thought about this" list: `docker.sock`, `/etc`, `/proc`, `/sys`, `/dev`, plus the credential directories `~/.ssh` and `~/.aws`. Three exec security levels: `deny`, `full` (no per-command approval -- the trusted-operator default), and `ask=always` (per-command approval, useful when you don't fully trust the agent or the skill).

After ClawHavoc, the project also blocked specific tools by default for non-owner senders: `cron`, `gateway`, `sessions_spawn`, `sessions_send`. If someone messages your agent who isn't you, those tools won't run for them no matter what the agent decides. That's the molt.

If Chapter 1 made the early days sound chaotic, this is what *less chaotic* actually looks like in code. It is still not multi-tenant, and it does not pretend to be. It assumes one trust boundary per Gateway, prefers one Gateway per OS user, and tells you so on the security page. I think that's the right call. Trying to retrofit multi-tenancy onto a personal-AI-agent runtime would have killed the project. Saying *no, this is yours, run it where you trust it* is the only honest answer.

---

## What this means for you

Why does any of this matter outside curiosity?

Because once you understand the body, you can edit it. SOUL.md tweaks take two minutes. A new skill is a Markdown file. An MCP server is one CLI command. Most users will never write a new built-in tool -- they don't need to. The architecture is set up so that *configuration* is the surface most people touch. That's the gift. The agent's behavior bends to whoever can write a bullet list, which is most of us.

I've been running OpenClaw for a few months now and the only thing I changed first was SOUL.md, twice. Then I added two skills from ClawHub and wrote one of my own. Then I wired in a context7 MCP server because I got tired of pasting docs. I haven't touched the sandbox. I haven't customized the heartbeat. I run the dashboard maybe once a week. Most of the body, I leave alone. That's the point.

The architecture's gift is that it survives most of its early users not knowing what they're doing.

Let's keep building.

---

## Resources

- [OpenClaw](https://openclaw.ai/) -- Official site
- [OpenClaw documentation](https://docs.openclaw.ai/) -- Concepts, gateway, skills, CLI reference
- [Architecture overview](https://docs.openclaw.ai/concepts/architecture) -- Gateway, sessions, routing
- [Agent runtime](https://docs.openclaw.ai/concepts/agent) -- The PI agent and context assembly
- [Workspace files reference](https://github.com/openclaw/openclaw/blob/main/docs/concepts/agent-workspace.md) -- The full list, not just the seven
- [Heartbeat](https://docs.openclaw.ai/gateway/heartbeat) -- Periodic agent turns and HEARTBEAT.md
- [Sandboxing](https://docs.openclaw.ai/gateway/sandboxing) -- Modes, blocked sources, security levels
- [Security model](https://docs.openclaw.ai/gateway/security) -- One trust boundary per Gateway
- [Skills](https://docs.openclaw.ai/skills) -- Format, precedence, ClawHub
- [MCP CLI reference](https://docs.openclaw.ai/cli/mcp) -- `openclaw mcp serve` and `openclaw mcp set/list/show/unset`
- [ClawHub](https://clawhub.ai/) -- Community skill registry
- [PI agent SDK](https://github.com/openclaw/openclaw/blob/main/docs/pi.md) -- `createAgentSession()` and the tool wiring pipeline
- [Peter Steinberger at TED2026](https://www.ted.com/talks/peter_steinberger_how_i_created_openclaw_the_breakthrough_ai_agent) -- The Marrakesh voice-note story, end to end
- [Lex Fridman Podcast #491](https://lexfridman.com/peter-steinberger-transcript/) -- Long-form interview, including the constitutional-AI inspiration for SOUL.md
