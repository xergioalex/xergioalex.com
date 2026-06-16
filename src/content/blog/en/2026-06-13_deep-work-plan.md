---
title: "Deep Work Plan: Give Your Agent a Plan and a Harness"
description: "An agent nailed the first hour and drifted by the third. The fix wasn't a smarter model — it was a durable plan the repository itself could hold the work to."
pubDate: "2026-06-13"
heroImage: "/images/blog/posts/deep-work-plan/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "claude"]
keywords: ["Deep Work Plan methodology", "spec-driven development for AI agents", "harness engineering for coding agents", "long-horizon agent work", "repository as agent harness", "tool-agnostic spec-driven development", "resumable agent plans state.json"]
series: "working-with-agents"
seriesOrder: 8
draft: true
---

This series has been building one layer at a time. First, the capabilities an agent installs to do a job — [the skill layer](/blog/the-skill-layer/), where an agent reads a `SKILL.md` and suddenly knows how to do something it couldn't before. Then the system around the model that checks its work and turns each mistake into a permanent fix — [the harness layer](/blog/the-harness-layer/), the scaffolding that decides when a skill runs and whether the result is good enough to keep. Skill by skill, scar by scar, this blog's repository got good at agent work.

And then I watched a well-equipped agent drift anyway.

It was a multi-part job on this very blog — a content migration across a few dozen files. The skills were there. The harness was there: the hooks, the guides it read before acting, the sensors that catch what a change breaks. For the first hour it was a pleasure to watch — clean edits, the right files, it even caught an accent I'd missed in a Spanish string. Somewhere around the third hour of that afternoon it had quietly gone sideways. Not crashed — drifted. It re-solved a thing it had already solved, talked itself into a refactor I never asked for, and lost the thread of which files it had actually finished. The context window had filled with its own chatter, the early decisions had scrolled off the top, and the agent was reasoning from a version of the task that no longer matched the one I gave it.

The intelligence was fine. The intelligence was never the issue — that was the whole lesson of the harness chapter, and here it was in front of me again. What this agent had was a harness. What it didn't have was anything that harness could hold the work *to*: a control system regulating toward nothing. It had no place to stand. It needed a plan.

---

## The thing a harness points at

Here's the honest version of where I'd gotten stuck. The repository was, by the standards of this series, well-tuned — skills installed, guides the agent read before it acted, sensors that caught what it broke after. And it still went sideways on anything that took more than an hour, because nothing in the harness was the *target*. The build can tell you a change is broken. It can't tell you the change was the wrong change. The linter is happy whether or not the agent did the job you actually asked for.

A thermostat is the cleanest way I know to say it. The harness is the thermostat — the control system that keeps measuring and correcting. But a thermostat with no temperature set on it just hums. The thing you're missing isn't a better thermostat. It's a number on the dial.

The number on the dial is the plan. Not a vague intention in a chat message that scrolls away — a written specification the agent reads at the start of every task and is held against at the end of every task. What *correct* means, stated up front: the goal, the constraints, the acceptance criteria, the validation gates that have to pass before a task counts as done. Once that exists, the harness has something to do. It stops being a pile of checks and becomes a machine for proving, over and over, that the agent's work still lands inside the lines you drew.

This is the part I'd underrated for months. I think I underrated it because it sounds boring. "Write down what you want before the agent starts" is not a sentence that makes anyone lean in. But the gap between an agent that drifts at hour three and one that runs unattended for an afternoon turned out to live almost entirely in that boring sentence.

---

## What spec-driven development actually buys you

The proper name for the boring sentence is **spec-driven development**. The plan, or the spec, is the durable source of truth — and the agent executes against it rather than against whatever it can still remember from the conversation.

The word *durable* is carrying the weight. A chat context is the opposite of durable: it's a sliding window, it fills up, the early decisions fall off the back, and when the agent compacts or resets, the task it thinks it's doing has quietly diverged from the task you gave it. That's not a bug in any one model. It's the shape of the medium. A spec on disk doesn't slide. The agent re-reads it at the top of task four exactly as it read it at the top of task one. Drift has nowhere to accumulate, because the source of truth isn't in the part of the system that erodes.

And spec-driven development gives you the second thing chat can't: a definition of done that a machine can check. This is where it stops being a TODO list. Each task carries its own acceptance criteria and its own validation gates — the commands that have to come back green before the task is allowed to close. On this blog that gate is concrete: `pnpm run build`, an accent grep over the Spanish, an audit that reads the whole post against a checklist before it's allowed near publication. The agent doesn't get to *feel* finished. It has to pass. "Done" becomes a contract, not a vibe — which is exactly the difference between work you can verify and work you have to re-read line by line because you don't trust it.

The loop, written out, is almost embarrassingly plain. You write a plan. The plan breaks into atomic tasks, small enough that one of them fits comfortably inside a single context window. Each task names its acceptance criteria and its gates. The agent does one task, the gates run, the task closes or it doesn't. Then the next. Plan, task, gate, completion — that's the whole shape, and that shape *is* spec-driven development. There's nothing exotic in it. The discipline is in refusing to skip any of it when you're in a hurry.

---

## The repository is the harness — and now it has a plan

The reason this clicks into the series instead of sitting beside it is the part I keep coming back to: the plan doesn't live in a tool. It lives in the repository.

That's the move. The whole series has been edging toward the idea that the repository itself becomes the harness — the context, the guides, the sensors, the skills, all of it installed into the repo as files any agent can read. Spec-driven development is what finally gives that harness a target. The plan is a set of files on disk: a goal, a numbered list of tasks, the acceptance criteria, and — the part that surprised me with how much it mattered — the *state*. The checkboxes that say which tasks are finished. A `state.json` that holds where the run is, what gate passed last, what it's blocked on if it's blocked. The plan isn't just a description of the work. It's the live position of the work, on disk, where a context reset can't touch it.

That last part is what makes a run resumable. The afternoon migration that drifted on me wasn't recoverable, because the agent's understanding of where it was lived only in a context window that was busy evaporating. When the position lives in files instead, you can close the laptop. The agent — or a different agent, or the same agent three resets later — opens the plan, reads which tasks are checked, reads the state, and picks up exactly where the last one stopped. Long-horizon work stops requiring an unbroken chat session, because the session was never where the truth lived.

I've been calling the methodology that packages all of this **Deep Work Plan**. The name is the point: a plan deep enough to run agents against for hours, structured enough that they can't quietly wander off it. It's not a product I'm selling and it's not named after anyone — it's the thing I kept rebuilding by hand on every repo, the same scaffolding scratched out from nothing each time, until I got tired enough of retyping it to write it down properly as a spec. Plan, atomic tasks, gates, completion, resumable state. The spec-driven loop, installed into the repository as files.

Writing it down is where it stopped being a personal habit and turned into a methodology. Once the shape was on paper I could make it proportional — a one-line fix doesn't need the ceremony of a database migration — so a plan now comes in tiers: a micro plan for the small stuff, a deep one for the work that actually has to survive hours and resets. The state got more honest too: not just checkboxes but a `manifest.json` and a `state.json` that record which gate passed last and what the run is blocked on, so a fresh agent can reconstruct exactly where the previous one stood. None of it was a flash of insight. It was the slow accretion of watching the same thing break the same way and finally deciding to fix it once.

Two pillars hold it up, and naming them is the cleanest way I've found to say what the methodology is. One is the harness — the context, the guardrails, the state — all of it repo-native, the thing this series has been building by hand chapter after chapter. The other is the spec-driven plan that finally gives that harness a number to hold to. Deep Work Plan is how you stop assembling both by hand and install them at once: a plan *and* a harness, dropped into a repo as files.

---

## Why it isn't a tool

The obvious objection, and the right one to raise, is that this already exists. Spec-driven development isn't a phrase I coined — there are real tools built around the same idea: GitHub's Spec Kit, Amazon's Kiro, Tessl. If you've used one, a lot of what I just described will sound familiar, and that's fair.

The difference is where the spec lives. Those are tools — you adopt the tool, you work the way the tool works, and your spec is shaped by that tool's surface. Deep Work Plan is the other thing: it lives in the repository as plain files any agent can read. There's no runtime to adopt, no vendor to bet on, no per-tool reimplementation when you switch agents. The plan is markdown and a little JSON sitting in `.dwp/`. Claude Code can run it. Codex can run it. Cursor can run it. Next year's agent that nobody has shipped yet can run it, because it's just files, and reading files is the one thing every agent already knows how to do.

That's the whole argument for repo-native over tool-bound, and I'll be honest that I didn't appreciate it until I had the same plan format outlive an agent I'd stopped using. The methodology survived the tool. A spec inside a tool is a bet that the tool sticks around. A spec inside the repository is a bet that the *repository* sticks around — which is a bet I'm already making, since it's where the code is.

---

## Dogfooded, three repos deep

I'm wary of methodologies that only work in the slides. So the honest test is whether I actually run this on the things I ship, and I do — this blog among them. Almost every change to this repository now starts as a Deep Work Plan: a plan file, atomic tasks, gates that have to pass, state on disk. The post you're reading was written under one. When I say the loop survives a context reset, it's because I've watched it survive one on work I cared about, not because the diagram says it should.

It's not just my side projects, either. The same methodology runs in production at Dailybot — in fact it grew out of the engineering there, where the by-hand version got rebuilt enough times across enough repos that standardizing it stopped being optional. A team uses it to keep long-horizon agent work from drifting at a scale I don't operate at solo, and there's [a longer account of how a team runs this across hundreds of pages](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) if you want the company-scale version of the same story. The methodology documents and ships from a repository that uses it on itself, which is about as much dogfooding as I know how to do. The proof and the artifact are the same repos.

If you want to try it, the whole thing is open and MIT-licensed. The methodology, the readable spec, and the kit live at [deepworkplan.com](https://deepworkplan.com); there's a one-step adoption endpoint at [deepworkplan.com/init](https://deepworkplan.com/init) that points an agent at your repo and gets it set up; and it's packaged as an installable skill at [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — a router and a handful of sub-skills that map straight onto the loop: create, execute, refine, resume, status, verify. It drops into the `.agents/skills/` layout the same way every other skill does. Install it, point an agent at your repo, generate a plan, run it.

---

## What changed for me

The shift, looking back, was small and total at the same time. I stopped trying to get better at correcting the agent mid-run, and started writing down — before it starts — what done means and where the lines are. The correcting didn't go away. It moved earlier, into the plan, where it's a sentence I write once instead of an interruption I have to keep making.

The afternoon that drifted on me was the last one that drifted on me for that reason. Not because the model got smarter — it's the same model. Because the work finally had a place to stand that the context couldn't erode out from under it. The harness had a target. The plan was the target. And the repository was holding both.

Let's keep building.

---

## Resources

- [Deep Work Plan](https://deepworkplan.com) — the methodology, the readable spec, and the kit
- [deepworkplan.com/init](https://deepworkplan.com/init) — one-step adoption endpoint that sets up your repo
- [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — Deep Work Plan packaged as an installable agent skill
- [How a team runs long-horizon agent work in production](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) — the company-scale account of the same methodology
- [GitHub Spec Kit](https://github.com/github/spec-kit) — tool-bound spec-driven development, for contrast with the repo-native approach
