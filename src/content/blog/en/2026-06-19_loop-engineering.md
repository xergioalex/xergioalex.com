---
title: "Loop Engineering: It Was Automation All Along"
description: "Everyone's saying we should write loops, not prompts. Strip away the novelty and it's automation — with one new thing sitting inside the loop's body."
pubDate: "2026-06-19"
heroImage: "/images/blog/posts/loop-engineering/hero.webp"
heroLayout: "banner"
tags: ["tech", "ai-agents", "claude"]
keywords: ["loop engineering", "agentic loops", "autonomous agents", "scheduled AI agents", "spec-driven development", "AI automation workflow", "self-executing roadmap", "Claude Code loops"]
series: "working-with-agents"
seriesOrder: 9
draft: true
---

For a few days my whole timeline said the same thing: stop prompting, start writing loops. Peter Steinberger ([@steipete](https://x.com/steipete/status/2063697162748260627)) put it most bluntly — you shouldn't be hand-prompting your coding agents anymore; you should be designing the loops that prompt them. The post did the numbers, hundreds of thousands of views, and then the replies turned into the kind of polite-ish brawl that only happens when a phrase hits a nerve.

Then the receipts showed up. Boris Cherny, who leads Claude Code at Anthropic, had said something close to it [on stage](https://workos.com/blog/boris-cherny-claude-code-acquired-interview-takeaways) a few days earlier: *"I don't prompt Claude anymore. I have loops that are running. They're the ones that are prompting Claude and figuring out what to do. My job is to write loops."* He's [described his actual setup](https://www.platformer.news/boris-cherny-interview-ai-jobs/), too — a Claude Code loop he moved into a routine that fires roughly every half hour, chewing through user feedback on its own. He says he hasn't hand-written a line of code in months. Addy Osmani gave the thing a name in [a post](https://addyosmani.com/blog/loop-engineering/) the same week and a clean definition: loop engineering is *"replacing yourself as the person who prompts the agent. You design the system that does it instead."*

So that's the moment. A slogan, a quotable engineer, a name, and a week of everyone arguing about whether it's the future or a rebrand.

Here's my honest reaction: I felt seen and slightly annoyed at the same time. Because this is the thing I've been circling for a year without a tidy word for it. The whole point of [going from writing code to directing agents](/blog/from-programmer-to-orchestrator/) was always heading here. I just hadn't called it anything.

---

## It's automation. Say it plainly.

Let me take the air out of it first, because the hype deserves it.

A loop is not new. We have been writing systems that wake up, check a goal, do work, and check again for as long as we've had servers. Kubernetes calls them control loops, and the official docs literally explain them with a thermostat: read the temperature, compare it to the target, act, repeat. Every CI job on a cron, every autoscaler, every "if it drifts, pull it back" piece of infrastructure is the same shape. Control theory had this nailed before most of us were born.

So when someone says loop engineering is "just automation," they're not wrong. They're half-right in a way that's worth sitting with. The loop is old. The scheduler is old. Waking up on a trigger and reconciling against a desired state — old.

What changed is one slot. In the classic loop, the thing in the middle that decides what to do is dumb and deterministic: if temp < target, turn on heat. In an agentic loop, that slot holds a model. Simon Willison's compact definition — an agent is an LLM using tools in a loop, a phrasing Anthropic adopted — is the whole story in nine words. The body of the loop now contains something that can read a failing test, form a hypothesis, edit three files, and try again. As one writer put it, the thing that changes between a thermostat and an agent isn't the loop. It's what's in the loop's body.

That's the part I keep coming back to. The novelty isn't the loop. It's that we can finally put judgment where the `if` statement used to be. Calling the whole thing brand-new oversells it; calling it nothing but a rebrand misses the one slot that actually moved.

---

## Why this is exactly where the series was going

If you've been reading along, this won't feel like a swerve.

The arc has been one layer at a time. First [the skill layer](/blog/the-skill-layer/) — the capabilities an agent installs so it stops reinventing the same procedure. Then [the harness layer](/blog/the-harness-layer/) — the system around the model that checks the work and turns each mistake into a permanent fix. Then [the deep work plan](/blog/deep-work-plan/) — the durable spec the harness holds the work to, so a long job doesn't drift into something I never asked for.

Stack those and look at what you've got: an agent that knows how to do the job, a system that catches it when it's wrong, and a written target it can't quietly wander off. There's only one move left. Run it on a trigger. Take your hand off the keyboard.

That's the loop. It's not a new layer so much as the moment you let the existing layers run without you sitting there pressing enter. Skill plus harness plus plan was always pointed at unattended execution; loop engineering is just the verb for finally doing it.

I'll admit I underrated how much of the difficulty lives *before* the loop. You can't safely loop an agent that has no plan and no way to check itself — you just get a faster way to make a mess. The reason the loop feels possible now isn't a smarter model. It's that the boring scaffolding underneath it finally exists.

---

## What I'd actually been building

The reason this landed for me personally is that I'd been sketching the same idea for a while, in less flattering language. I called it "making the company run itself a little more each month."

The vision, and I want to be clear it's a vision and not a finished system: a product that improves while I sleep. A roadmap on a board that doesn't just sit there as a list of intentions — an agent picks the top item, reads the plan, does the work, opens the change, and leaves it for me to look at in the morning. A task created in Linear that fires an agent to attempt it before a human even assigns it. The team's backlog as an input to a loop rather than a queue of things I have to personally start.

Some of that is real today and some of it isn't, and I'd rather be honest about the seam. The pieces that ship in the products — a Claude Code routine on a schedule, file-system hooks like Kiro's that run a prompt when a file is saved — those work. People are running them. The further-out version, where a whole roadmap executes itself and the company gets measurably more autonomous every quarter, is still mostly a thing I believe rather than a thing I can point at in production. I haven't seen a credible, shipping example of a self-completing roadmap. I'm building toward it; I'm not claiming I'm there.

What makes me think it's reachable is precisely that it's not magic. It's automation. I know how to build automation. I've wired up cron jobs and webhooks and event handlers for years. The new part — the model in the controller slot — is the part the vendors are commoditizing fastest. The rest is plumbing I already understand.

---

## The loop is easy. The thing that makes it safe is not.

Here's where I want to push back on my own enthusiasm.

A loop that runs is trivial. `while true`, call the agent, sleep, repeat. You can write that in an afternoon. The hard part is everything that keeps the loop from confidently doing the wrong thing forever.

A loop without a way to check itself isn't autonomy, it's a faster mistake. The agent will report success on a task it didn't finish — the "premature completion" failure, where the loop declares victory and moves on while the actual goal sits untouched. A vendor in the verification business framed it sharply: a loop without a verification node is indistinguishable from ordinary automation. They meant it as a knock. I think it's the most useful thing in the whole discourse, even if it cuts against the hype.

So the real work of loop engineering, the part that isn't a slogan, is the unglamorous stuff:

- **Feedback the loop can trust.** Types, linters, tests — deterministic signals that tell the agent it's wrong without a human in the chair. This is why the [deep work plan's](/blog/deep-work-plan/) validation gates matter more than the loop itself.
- **Halt conditions.** Max iterations. No-progress detection. A token and dollar ceiling, because an agent in a loop spends real money and a stuck one spends it fast. The first time you leave a loop running overnight without a budget cap, you learn this in the worst way.
- **A plan it's held against.** The loop reconciles toward something. If that something is fuzzy, the loop optimizes toward fuzz.

None of that is exciting. All of it is the difference between "my product improves while I sleep" and "I woke up to forty commits I have to throw away."

---

## Where I've landed

I think the word is good, actually. Not because the idea is new — I've argued the opposite for most of this post — but because naming a thing makes people build it on purpose instead of by accident. "Loop engineering" tells you the loop is the artifact. You design it, you version it, you put guardrails on it, the same way you'd design any other system that runs without you watching.

For me it reframes the goal of this whole series. I started out learning to direct agents one task at a time. The honest endpoint was never "direct them faster." It was "build the loop that directs them, and get out of the chair." That's uncomfortable to say out loud — it's literally automating the job I just spent a year learning. But that's the direction, and pretending otherwise would be the marketing voice I try to keep out of these posts.

The loop is just automation. I've made peace with that. The interesting question was never whether it's new. It's what you're brave enough to put in the loop's body, and how good your brakes are.

Let's keep building.

---

## Resources

- [Loop Engineering — Addy Osmani](https://addyosmani.com/blog/loop-engineering/) — the post that named and defined the practice.
- [Peter Steinberger (@steipete) on X](https://x.com/steipete/status/2063697162748260627) — the "design loops that prompt your agents" thread.
- [Boris Cherny interview — Platformer](https://www.platformer.news/boris-cherny-interview-ai-jobs/) — the Claude Code routine that runs every ~30 minutes.
- [Loop Engineering — The New Stack](https://thenewstack.io/loop-engineering/) — how it went from informal pattern to named practice.
- ["LLMs using tools in a loop" — Simon Willison](https://simonwillison.net/2025/Sep/18/agents/) — the compact agent definition.
- [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Harness design for long-running agents — Anthropic](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Agent Hooks — Kiro](https://kiro.dev/docs/hooks/) — event-driven automation that runs a prompt on a file event.
- [Controllers / control loops — Kubernetes docs](https://kubernetes.io/docs/concepts/architecture/controller/) — the thermostat pattern that predates all of this.
- [Loop engineering without verification is just automation — Sonar](https://www.sonarsource.com/blog/loop-engineering-without-verification-is-just-automation/) — the skeptical counterpoint on why verification is the load-bearing part.
