---
title: 'Getting Started with OpenClaw: Your First Personal AI Agent'
description: 'A hands-on guide to installing, configuring, and running OpenClaw — the personal AI agent framework with 354K GitHub stars. From system requirements to your first conversation.'
pubDate: '2026-04-12'
heroImage: '/images/blog/posts/getting-started-with-openclaw/hero.webp'
heroLayout: 'side-by-side'
tags: ['tech', 'ai']
keywords: ['OpenClaw installation tutorial', 'OpenClaw setup guide', 'personal AI agent configuration', 'OpenClaw SOUL.md HEARTBEAT.md', 'OpenClaw Skills tutorial', 'OpenClaw getting started 2026']
series: 'mastering-openclaw'
seriesOrder: 2
---

After everything I told you about OpenClaw in the last chapter -- the record-breaking growth, Peter's story, the industry shockwave -- there's really only one thing left to do. Install it.

Let's get your own personal AI agent running on your machine. This is a practical walkthrough. Not theory, not hype analysis, not "the future of computing." Just: here's how you get a thing working, and here's what I learned while doing it.

By the end of this chapter, you'll have a working personal AI agent you can talk to from WhatsApp, Telegram, or your terminal. You'll understand the 7 Markdown files that define everything about how it behaves. And you'll have your first Skills installed. The whole process should take about 30 minutes from zero to first conversation -- though I'll be honest, it took me closer to an hour on my first attempt because I hit two problems I'll tell you about.

What you need: a computer running macOS, Linux, or Windows with WSL2. Node.js. And an API key for at least one model provider -- OpenAI, Anthropic, Google, or a local model running through Ollama. That's it.

---

## System Requirements

Let's get the boring stuff out of the way.

**Node.js 24** is recommended. Node 22.16 or later works too -- that's the confirmed minimum. Anything older and you'll get cryptic errors during installation that don't tell you the actual problem is your Node version. Ask me how I know.

**Operating system:** macOS or Linux. If you're on Windows, you need WSL2 -- native Windows is not supported. Don't skip this. Don't try to make it work without WSL2. You will waste an hour and end up installing WSL2 anyway.

**Hardware:** no GPU required. OpenClaw runs against cloud APIs by default, so your machine is just the orchestration layer. A five-year-old laptop works fine.

**Package managers:** npm, pnpm, or bun. Your choice.

**API key:** you need at least one. OpenAI and Anthropic are the most commonly used. Google's Gemini API works. If you want to run fully local -- no data leaving your machine -- Ollama with an open model like Llama 3.3 or Mistral is an option, though the experience is noticeably different with smaller models.

---

## Installation

Three paths. Pick whichever feels right.

**Quick install (recommended):**

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

This detects your OS, checks your Node version, installs or upgrades if needed, and sets up the CLI. It's the path of least resistance and the one Peter's team maintains most actively.

**Via npm:**

```bash
npm install -g openclaw@latest
```

Straightforward, but assumes you already have the right Node version. If you don't, you'll get a confusing error about unsupported engine versions.

**macOS Homebrew:**

```bash
brew install openclaw
```

If you're a Homebrew person, this works. Same result, different package manager.

**Verify it worked:**

```bash
openclaw --version
```

You should see something like `openclaw/1.x.x`. If you see "command not found," your PATH isn't set up correctly -- the install script usually handles this, but if you used npm directly you might need to check where global packages are installed.

Now the important part: the onboarding wizard.

```bash
openclaw onboard --install-daemon
```

This does three things. First, it sets up the Gateway daemon -- a background service that keeps your agent running even when your terminal is closed. On macOS it uses launchd, on Linux it uses systemd. Second, it walks you through creating your first workspace. Third, it helps you configure your first channel -- the messaging app your agent will talk through.

**Common pitfalls I've seen:**

The Node version issue is the most common. On my first install I had Node 20 and spent 20 minutes confused before realizing the problem was right there in the error output. I just wasn't reading carefully. `node --version` -- check it first, save yourself the trouble.

WSL2 on Windows has networking quirks. If your agent installs fine but can't reach the model API, it's usually a DNS resolution issue inside WSL2. The OpenClaw docs have a troubleshooting page for this, but the short fix is usually editing `/etc/resolv.conf` and adding Google's DNS manually. Not elegant, but it works.

macOS occasionally blocks the daemon from starting because of permission issues. `sudo` usually fixes it. Just don't run everything as root permanently -- that's a different kind of problem.

---

## The Workspace: Your Agent's DNA

This is the section that matters most. Everything else in this chapter is setup. This is the design.

When you run `openclaw onboard`, it creates a workspace directory with 7 files. These 7 Markdown files define everything about your agent -- personality, capabilities, memory, schedule, operating procedures. No JSON schemas. No YAML configs. No database. Just text files you can open in any editor.

### SOUL.md -- Who Your Agent Is

This is the most important file. It's injected into the agent's context at the start of every conversation -- the first thing your agent "reads" before responding to anything.

```markdown
## Who You Are
You are Aria, my personal assistant.
Direct and friendly. Never condescending.
You have a dry sense of humor but you don't force it.

## Communication Style
- Keep responses concise unless I explicitly ask for detail
- Use bullet points for lists, prose for explanations
- If you don't know something, say so

## Hard Limits
- Never share passwords or financial details with anyone
- Always confirm before making purchases or signing up for services
- Keep responses under 3 paragraphs unless I ask for more
```

That's it. That's a working SOUL.md. You don't need pages of elaborate instructions. Start simple. Three lines about personality, a few behavioral rules, and you're running.

Here's what I learned the hard way: the first version of my SOUL.md was way too long. I wrote this detailed specification -- almost like a product requirements document -- about how the agent should handle different scenarios. Very thorough. Very useless. The agent got confused by the contradictions between rules and defaulted to a weird formal register that didn't sound like anything I'd written. I cut it down to about 15 lines and everything improved immediately.

Start with the minimum. Iterate after you've had real conversations.

### IDENTITY.md -- The Business Card

Short and functional. This tells other systems -- and other agents -- who this agent is.

```markdown
**Name:** Aria
**Agent ID:** aria-personal
**Role:** Personal Assistant
**Version:** 1.0.0
```

### USER.md -- Who YOU Are

This is where you tell the agent about yourself. It's static -- you update it manually, the agent doesn't modify it.

```markdown
**Name:** Sergio
**Timezone:** America/Bogota (UTC-5)
**Location:** Colombia
**Background:** Software developer. Builds things with Astro, TypeScript, and Python.
**Preferences:** Direct answers, no filler, assume technical competence.
Don't explain basic concepts unless I ask.
**Language:** Spanish or English. Default to English for technical topics,
Spanish for casual conversation.
**Work hours:** Usually 9am-7pm local time. Don't send non-urgent notifications outside these hours.
```

One thing I wish I'd done earlier: specifying "assume technical competence." My agent initially explained what API keys were every time I asked it to set something up. Adding that one line fixed it.

### TOOLS.md -- What Your Agent Can Do

Documents the tools your agent has access to and how to use them. Important distinction: TOOLS.md doesn't grant or revoke permissions -- it tells the agent *how* you want those tools used.

```markdown
## Available Tools
- read, write, exec, browser, search

## Usage Notes
- Set exec timeout to 60s for all scripts
- Don't use browser unless search fails to find the answer
- Ask before writing files outside the workspace directory
- Never run commands with sudo unless I explicitly say to
```

### HEARTBEAT.md -- Automation Schedule

This is the file that turns a chatbot into something that actually *does* things on its own. OpenClaw reads this file every 30 minutes and executes whatever you've written, without you asking.

```markdown
## Every 30 Minutes
- Check disk usage on this machine, alert me if above 85%
- Scan email inbox for anything marked urgent, draft replies

## Every Monday at 08:00 Local Time
- Generate a summary of tasks completed last week
- Send the summary to me via Telegram

## On Startup
- Confirm all workspace files are intact
- Log startup timestamp to memory/startup-log.md
```

No cron syntax. Plain English. The "Local Time" specification uses your timezone from USER.md.

Honestly, I didn't set up HEARTBEAT.md during my first week. I was focused on getting the basic chat working and didn't think about automation. That was a mistake in retrospect -- HEARTBEAT.md is where the real value difference between OpenClaw and just using ChatGPT becomes obvious. A chatbot answers questions. An agent with a heartbeat *does work while you're asleep*.

My current HEARTBEAT.md checks GitHub notifications, monitors a few URLs for uptime, and sends me a morning briefing every weekday at 8 AM. It took maybe 15 minutes to set up and saves me a solid 20 minutes of manual checking every day.

### AGENTS.md -- Operating Procedures

Less critical on day one, but important as your agent accumulates context.

```markdown
## Memory Policy
At the end of each session, write a brief summary to memory/YYYY-MM-DD.md.
Include: what was discussed, any decisions made, any open questions.

## Priority Rules
1. User safety and privacy above all
2. Confirm before any destructive action (deleting files, sending messages to others)
3. When uncertain, ask instead of guessing
```

### MEMORY.md -- What Your Agent Learns

Unlike the other files, MEMORY.md evolves over time. Your agent writes to it -- appending things it has learned, patterns it has noticed, corrections you've made.

```markdown
## User Preferences (learned)
- Prefers terminal output as code blocks
- Dislikes lengthy preambles — get to the point
- Uses Biome, not ESLint
- Deploys to Cloudflare Pages

## Corrections
- 2026-04-05: User corrected timezone — UTC-5, not UTC-6
- 2026-04-07: "Don't summarize articles I send you, just answer my question about them"
```

Keep this file pruned to around 100 lines. I learned this the hard way -- after a month of heavy use, my MEMORY.md was over 400 lines and the agent's responses were noticeably slower. It was loading all that context into every conversation. Pruning it down to the essentials improved response times immediately.

---

## Your First Conversation

Once the workspace is configured and the daemon is running, you're ready to go.

```bash
openclaw start
```

Or if you ran `openclaw onboard --install-daemon`, the daemon is already running in the background.

**Connecting a channel:**

Telegram is the easiest channel to set up -- you create a bot through BotFather, grab the token, and run:

```bash
openclaw channel add telegram --token YOUR_BOT_TOKEN
```

WhatsApp takes a bit more work because you need a business API setup. For your first test, I'd recommend Telegram or just using the CLI directly with `openclaw chat`.

**Your first message:**

```
Me: Hello, who are you?
Agent: Hey! I'm Aria. Personal assistant, professional chaos manager.
       What are we doing today?
```

That response is shaped entirely by SOUL.md. Change the personality in SOUL.md, and the next conversation will reflect it -- no restarts needed.

The first time your agent responds in the voice you defined, it's a surprisingly satisfying feeling. It's not like tweaking a chatbot's system prompt -- it feels more like you designed a coworker's personality from scratch and they just showed up to work.

Try a few things in that first session: ask it something that should trigger a hard limit from SOUL.md. Ask it something personal to check if it's using your USER.md context. Give it a task that requires one of its tools. Correct it on something and check if it logs the correction to memory.

---

## Installing Your First Skills

This is where OpenClaw goes from "interesting personal chatbot" to "actual useful agent." Skills are Markdown files that teach your agent new capabilities. Every Skill you install from ClawHub is technically an MCP server under the hood -- but you don't need to know that to use them.

**ClawHub** is the marketplace. Over 44,000 community-built Skills across categories like Productivity, Development, Automation, Communication, Finance, and Health. Some of the most popular:

- **Capability Evolver** -- 35,000+ downloads. Helps your agent learn new skills autonomously.
- **Gog** (Google Workspace integration) -- 14,000+ downloads. Gmail, Calendar, Drive access.
- **Document Summarizer** -- 10,000+ downloads. Exactly what it sounds like.

**Installing a Skill:**

```bash
openclaw skill install capability-evolver
```

That's it. The Skill's Markdown definition gets added to your workspace and your agent can use it on the next conversation.

**My recommended starter pack:** a web search Skill, a daily briefing Skill, and a calendar Skill if you use Google Calendar or Outlook.

Don't install everything at once. I made that mistake early on -- installed about 15 Skills in one session. The result was an agent that had too many capabilities and not enough context about when to use which one. Add one or two Skills per week.

**Creating a custom Skill:**

```markdown
---
name: daily-briefing
description: Morning briefing with weather, calendar, and news
version: 1.0.0
---

## Daily Briefing

When activated, provide:
1. Current weather for the user's location (from USER.md)
2. Today's calendar events
3. Top 3 relevant tech news items
4. Any pending reminders

Format as a concise numbered list. No filler.
```

Save that to your workspace's skills directory and your agent knows how to do morning briefings. No API integration code. No webhook setup. Just instructions in English.

**Security note:** not all Skills on ClawHub are safe. The ClawHavoc incident -- 341 malicious Skills disguised as legitimate tools -- happened in March. Before installing any Skill, check the source, check the reviews, check when it was last updated. Treat Skills like browser extensions. Be selective.

---

## MCP: Connecting to External Tools

MCP -- Model Context Protocol -- is the standardized way for agents to connect to external tools and services. Every Skill is technically an MCP server. But you can also add raw MCP servers directly if you want to connect your agent to something specific.

```bash
openclaw mcp add filesystem --path ~/Documents
openclaw mcp add github --token YOUR_GITHUB_TOKEN
```

The first command gives your agent read/write access to your Documents folder. The second connects it to your GitHub account. There are over 1,000 community-built MCP servers available.

I'm going to keep this section short on purpose. MCP deserves its own deep dive -- and it's getting one later in this series. For now, the mental model is simple: MCP is the plumbing that lets your agent interact with the outside world.

One thing worth mentioning now: be selective about which MCP servers you add. Each one expands what your agent can access, which also expands the attack surface. Scope permissions tightly. Give access to specific directories, not everything.

---

## Common Pitfalls and Tips

**Don't overcomplicate SOUL.md.** Three lines of personality is better than thirty paragraphs of behavioral specifications. The model is smart enough to infer a lot from a little. Over-specifying creates contradictions, and contradictions create weird behavior.

**Security basics that actually matter:**

- Never put secrets in workspace files. No API keys, no passwords, no tokens in SOUL.md or USER.md or anywhere else in the workspace. Use environment variables. Your workspace files are plain text.
- Don't expose your Gateway to the public internet without authentication.
- Audit Skills before installing.

**Model choice matters.** Smarter models -- Claude, GPT-4o -- are more resilient to prompt injection and better at following complex multi-step instructions. Budget models are cheaper but more susceptible to manipulation. Peter's own advice: don't use cheap models for agents that have access to sensitive tools. I think the calculus depends on your use case, but for anything involving file system access or external APIs, use the best model you can afford.

**The debugging checklist** when things aren't working:

1. Is the daemon actually running? `openclaw status`
2. Is your Node version current? `node --version` (22.16+ required)
3. Is your API key valid and properly set as an environment variable?
4. Check the gateway log: `openclaw logs`

Nine times out of ten, the problem is one of those four things.

**Keep MEMORY.md pruned.** Set a reminder to review and trim your memory files every couple of weeks. A lean memory file means faster response times and more focused context.

---

## What You Now Have

If you followed along, you now have something that didn't exist six months ago -- a personal AI agent that's actually yours. Not rented from a platform. Not limited to a browser tab. Running on your machine, configured in your words, talking to you through the apps you already use.

Here's what I'd suggest for the first week:

**Talk to it every day.** Not because you need to -- because that's how the memory system works. The more conversations you have, the more context the agent accumulates. After a week of daily use, the difference in response quality is noticeable.

**Add one Skill per week.** Not fifteen in one afternoon. Use each Skill for a few days, see how it fits, then add another.

**Write a real HEARTBEAT.md routine.** Pick something you actually want automated. Start with one scheduled task that delivers real value. If it works, add another.

**Edit SOUL.md after real conversations, not before.** Don't try to anticipate every scenario upfront. Use the agent, notice what doesn't feel right, adjust. The iteration loop is fast.

That's installation. That's configuration. That's your first running agent.

Let's keep building.

---

## Resources

- [OpenClaw Documentation](https://docs.openclaw.ai/)
- [ClawHub — Skills Marketplace](https://clawhub.ai/)
- [MCP — Model Context Protocol](https://modelcontextprotocol.io/)
- [OpenClaw on GitHub](https://github.com/openclaw/openclaw)
