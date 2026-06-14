---
title: "The Plan Layer: When the Repository Becomes the Harness"
description: "An agent nailed the first hour and drifted by the third. The fix wasn't a smarter model — it was a durable plan the repository itself could hold the work to."
pubDate: "2026-06-13"
heroImage: "/images/blog/posts/the-plan-layer/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "claude"]
keywords: ["spec-driven development for AI agents", "long-horizon agent work", "Deep Work Plan methodology", "repository as agent harness", "tool-agnostic spec-driven development", "agent acceptance criteria validation gates", "resumable agent plans state.json"]
series: "working-with-agents"
seriesOrder: 8
draft: false
---

The agent started strong. I gave it a multi-part job on this very blog — a content migration that touched a few dozen files — and for the first hour it was a pleasure to watch. Clean edits. Right files. It even caught an accent I'd missed in a Spanish string. Then I went to make coffee.

When I came back, it was still working. That was the problem.

Somewhere around the third hour it had quietly gone sideways. Not crashed — drifted. It had re-solved a thing it already solved, talked itself into a refactor I never asked for, and lost the thread of which files it had actually finished. The context window had filled with its own chatter, the early decisions had scrolled off the top, and the agent was now reasoning from a version of the task that no longer matched the one I gave it. The intelligence was fine. The intelligence was never the issue. What it didn't have was a place to stand.

I've been circling this problem for a while in this series. The capabilities an agent installs to do a job — [the skill layer](/blog/the-skill-layer/). The system around the model that checks its work and turns each mistake into a permanent fix — [the harness layer](/blog/the-harness-layer/). Both of those are real and both of them help. But that afternoon made something obvious that I'd been stepping around: a harness with nothing to hold the work *to* is a control system regulating toward nothing. The agent had a harness. What it didn't have was a spec it couldn't drift from. It needed a plan.

---

## The thing a harness points at

Here's the honest version of where I'd gotten stuck. I had skills. I had guides the agent read before it acted and sensors that caught what it broke after. The repository was, by the standards of this series, well-tuned. And the agent still went sideways on anything that took more than an hour, because nothing in the harness was the *target*. The build can tell you a change is broken. It can't tell you the change was the wrong change. The linter is happy whether or not the agent did the job you actually asked for.

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

I've been calling the methodology that packages all of this **Deep Work Plan**. The name is the point: a plan deep enough to run agents against for hours, structured enough that they can't quietly wander off it. It's not a product I'm selling and it's not named after anyone — it's the methodology I kept rebuilding by hand on every repo until I finally wrote it down properly. Plan, atomic tasks, gates, completion, resumable state. The spec-driven loop, installed into the repository as files.

---

## Why it isn't a tool

The obvious objection, and the right one to raise, is that this already exists. Spec-driven development isn't a phrase I coined — there are real tools built around the same idea: GitHub's Spec Kit, Amazon's Kiro, Tessl. If you've used one, a lot of what I just described will sound familiar, and that's fair.

The difference is where the spec lives. Those are tools — you adopt the tool, you work the way the tool works, and your spec is shaped by that tool's surface. Deep Work Plan is the other thing: it lives in the repository as plain files any agent can read. There's no runtime to adopt, no vendor to bet on, no per-tool reimplementation when you switch agents. The plan is markdown and a little JSON sitting in `.dwp/`. Claude Code can run it. Codex can run it. Cursor can run it. Next year's agent that nobody has shipped yet can run it, because it's just files, and reading files is the one thing every agent already knows how to do.

That's the whole argument for repo-native over tool-bound, and I'll be honest that I didn't appreciate it until I had the same plan format outlive an agent I'd stopped using. The methodology survived the tool. A spec inside a tool is a bet that the tool sticks around. A spec inside the repository is a bet that the *repository* sticks around — which is a bet I'm already making, since it's where the code is.

---

## Dogfooded, three repos deep

I'm wary of methodologies that only work in the slides. So the honest test is whether I actually run this on the things I ship, and I do — this blog among them. Almost every change to this repository now starts as a Deep Work Plan: a plan file, atomic tasks, gates that have to pass, state on disk. The post you're reading was written under one. When I say the loop survives a context reset, it's because I've watched it survive one on work I cared about, not because the diagram says it should.

It's not just my side projects, either. The same methodology runs in production at Dailybot, where a team uses it to keep long-horizon agent work from drifting at a scale I don't operate at solo — there's [a longer account of how a team runs this across hundreds of pages](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) if you want the company-scale version of the same story. And the methodology documents and ships from a repository that uses it on itself, which is about as much dogfooding as I know how to do. The proof and the artifact are the same repos.

If you want to try it, the whole thing is open. The methodology, the readable spec, and the kit live at [deepworkplan.com](https://deepworkplan.com); there's a one-step adoption endpoint at [deepworkplan.com/init](https://deepworkplan.com/init) that points an agent at your repo and gets it set up; and it's packaged as an installable skill at [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill), so it drops into the `.agents/skills/` layout the same way every other skill does. Install it, point an agent at your repo, generate a plan, run it.

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
