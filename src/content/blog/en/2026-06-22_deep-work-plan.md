---
title: "Deep Work Plan: Give Your Agent a Plan and a Harness"
description: "An agent nailed the first hour and drifted by the third. The fix wasn't a smarter model — it was a durable plan the repository itself could hold the work to."
pubDate: "2026-06-22"
heroImage: "/images/blog/posts/deep-work-plan/hero-en.webp"
heroLayout: "side-by-side"
tags: ["tech", "portfolio", "ai-agents", "claude"]
keywords: ["Deep Work Plan methodology", "spec-driven development for AI agents", "harness engineering for coding agents", "long-horizon agent work", "repository as agent harness", "tool-agnostic spec-driven development", "resumable agent plans on disk"]
series: "working-with-agents"
seriesOrder: 8
draft: false
---

This series has been building one layer at a time. It started with the mindset: [the art of directing agents](/blog/the-art-of-directing-agents/), where spec-driven development stopped being a trick and became the job — telling the agent what to build and what it's measured against, not how to type it. Then the capabilities an agent installs to do that work — [the skill layer](/blog/the-skill-layer/), where an agent reads a `SKILL.md` and suddenly knows how to do something it couldn't before. Then the system around the model that checks its work and turns each mistake into a permanent fix — [the harness layer](/blog/the-harness-layer/), the scaffolding that decides when a skill runs and whether the result is good enough to keep. Skill by skill, scar by scar, this blog's repository got good at agent work.

And then I watched a well-equipped agent drift anyway.

It was a multi-part job on this very blog — a content migration across a few dozen files. The skills were there. The harness was there: the hooks, the guides it read before acting, the sensors that catch what a change breaks. For the first hour it was a pleasure to watch — clean edits, the right files, it even caught an accent I'd missed in a Spanish string. Somewhere around the third hour of that afternoon it had quietly gone sideways. Not crashed — drifted. It re-solved a thing it had already solved, talked itself into a refactor I never asked for, and lost the thread of which files it had actually finished. The context window had filled with its own chatter, the early decisions had scrolled off the top, and the agent was reasoning from a version of the task that no longer matched the one I gave it.

The intelligence was fine. The intelligence was never the issue — that was the whole lesson of the harness chapter, and here it was in front of me again. What this agent had was a harness. What it didn't have was anything that harness could hold the work *to*: a control system regulating toward nothing. It had no place to stand. It needed a plan.

That was the turn for me. The fix was never going to be a cleverer prompt or a wait for a smarter model — the models matter, but what they work inside matters more, and the drift was a structural problem to engineer around, not a prompting one to out-clever. A well-equipped agent, it turns out, isn't the one with the smartest model. It's the one standing on a plan it can't quietly wander off — and giving an agent that is what the rest of this is about.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-plan-no-drift.webp"
       alt="Engraving-style illustration: the loop of a Deep Work Plan arranged in a circle — plan, atomic tasks, validation gates, completion, and resumable state — under the title 'A plan agents can't drift from.'"
       width="1600"
       height="960"
       loading="lazy" />
  <figcaption>The whole loop: plan → atomic tasks → validation gates → completion → resumable state. Spec-driven development, written into the repository as files.</figcaption>
</figure>

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

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-done-is-a-contract.webp"
       alt="Engraving-style illustration of a wax seal stamping 'Acceptance Criteria Met', under the title 'Done is a contract, not a vibe', with the checklist: tests pass, types check, acceptance criteria met, or the task stays open."
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>Each task names its acceptance criteria and the checks that must pass. The agent doesn't get to feel finished — it has to pass, or the task stays open.</figcaption>
</figure>

The loop, written out, is almost embarrassingly plain. You write a plan. The plan breaks into atomic tasks, small enough that one of them fits comfortably inside a single context window. Each task names its acceptance criteria and its gates. The agent does one task, the gates run, the task closes or it doesn't. Then the next. Plan, task, gate, completion — that's the whole shape, and that shape *is* spec-driven development. There's nothing exotic in it. The discipline is in refusing to skip any of it when you're in a hurry.

---

## The repository is the harness — and now it has a plan

The reason this clicks into the series instead of sitting beside it is the part I keep coming back to: the plan doesn't live in a tool. It lives in the repository.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-repository-is-the-harness.webp"
       alt="Engraving-style illustration of a chest labeled 'REPOSITORY' with five tags hanging off it — SPEC, TASKS, CHECKS, STATE, and TOOLS — under the title 'The repository is the harness.'"
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>Context, tools, guardrails, and state — as plain files any agent can read. A durable spec on disk, validation gates over vibes, and the whole thing survives a context reset.</figcaption>
</figure>

That's the move. The whole series has been edging toward the idea that the repository itself becomes the harness — the context, the guides, the sensors, the skills, all of it installed into the repo as files any agent can read. Spec-driven development is what finally gives that harness a target. The plan is a set of files on disk, all under a `.dwp/plans/PLAN_<slug>/` directory: a `README.md` with the goal and the task table, one file per task (`<n>.task_<slug>.md`), and — the part that surprised me with how much it mattered — the *state*. It doesn't live in one magic slot: each task carries its own progress marker (`[ ]` not started, `[~]` in progress, `[x]` done, `[!]` blocked) and a `PROGRESS.md` that only ever grows, a timestamped record of what was done in each task and what drifted. The plan isn't just a description of the work. It's the live position of the work, on disk, where a context reset can't touch it.

That last part is what makes a run resumable. The afternoon migration that drifted on me wasn't recoverable, because the agent's understanding of where it was lived only in a context window that was busy evaporating. When the position lives in files instead, you can close the laptop. The agent — or a different agent, or the same agent three resets later — opens the plan, reads which tasks are checked, reads the state, and picks up exactly where the last one stopped. Long-horizon work stops requiring an unbroken chat session, because the session was never where the truth lived.

I've been calling the methodology that packages all of this **Deep Work Plan**. The name comes from deep work — focused, sustained effort on something cognitively demanding — only for an agent: a plan deep enough to run for hours, structured enough that it can't quietly wander off it. An agent without a plan is like someone who never blocks time on a calendar, never writes anything down, and context-switches on every interruption; the plan gives it the equivalent of a blocked calendar and a written brief. It's not a product I'm selling and it's not named after anyone — it's the thing I kept rebuilding by hand on every repo, the same scaffolding scratched out from nothing each time, until I got tired enough of retyping it to write it down properly as a spec. Plan, atomic tasks, gates, completion, resumable state. The spec-driven loop, installed into the repository as files.

Writing it down is where it stopped being a personal habit and turned into a methodology. Once the shape was on paper I could make it proportional — a one-line fix doesn't need the ceremony of a database migration — so a plan now comes in tiers: a micro plan for the small stuff, a deep one for the work that actually has to survive hours and resets. The state got more honest too: not just the checkboxes in the `README.md` but a `PROGRESS.md` that records, with a timestamp, what happened in each task and where it drifted or why it blocked, so a fresh agent can reconstruct exactly where the previous one stood. None of it was a flash of insight. It was the slow accretion of watching the same thing break the same way and finally deciding to fix it once.

Two pillars hold it up, and naming them is the cleanest way I've found to say what the methodology is. One is the harness — the context, the guardrails, the state — all of it repo-native, the thing this series has been building by hand chapter after chapter. The other is the spec-driven plan that finally gives that harness a number to hold to. Deep Work Plan is how you stop assembling both by hand and install them at once: a plan *and* a harness, dropped into a repo as files.

---

## What that buys the agent, day to day

It's worth spelling out what the plan actually does once it's running, because that's where it stops being a fancy TODO list — and the sharpest questions I got when I put it in front of other people landed exactly here. So let me answer them the way I did then.

The gates run themselves. A validation gate isn't a note to me; it's a command the agent runs and has to see come back clean before it's allowed to close a task. When it doesn't, the agent marks the task *blocked* and stops — loudly, in a file — instead of burying the failure somewhere in a transcript I'd have to go fishing through. My sign-off only bookends the run: I approve the plan before it starts and read the diff when it ends. The middle, the part that used to be me hovering, belongs to the gates now.

The plan describes behavior, not edits, which is what keeps it from going stale. The acceptance criteria name outcomes, not line numbers — so I can change the code between runs and the plan still holds. The gates just re-run against whatever the repo is now and fail loud if reality has drifted from the spec. A plan pinned to specific edits would rot the first time I touched a file by hand; one pinned to behavior survives me.

And when a task is simply wrong — badly sequenced, or it turned out to mean something I hadn't seen — the agent doesn't improvise around it. It marks it blocked and stops, and because the state lives apart from the task list, I can rewrite the open part of the plan without losing the part that already passed. Refinement only ever touches what hasn't run yet.

The part I didn't design for, and ended up liking most: every run leaves the repository a little more agent-ready than it found it. A task that changes behavior updates the docs and extends the tests inside its own gate. And the methodology makes it mandatory: every plan closes with three fixed tasks — a **Security Review** that audits everything the plan touched, a **Skills & Agents Discovery** that captures whatever reusable pieces surfaced along the way, and an **Executive Report** that summarizes what was delivered. The harness doesn't just hold the work — it compounds. Which is the whole series folding back on itself: skill, harness, plan, each run making the next one cheaper.

Put the pieces together and look at what actually ends up in the agent's hands: capability (the skills), a system that corrects it on its own (the harness), and a verifiable target it can't quietly wander off (the plan). That combination is what makes autonomy *reliable*, not merely possible. You can leave a run going without hovering because every "done" is backed by a gate that passed, every position lives on disk and survives a reset, and every drift stops loudly in a file instead of hiding in a transcript. It isn't that the agent got smarter — it's that the work finally has guardrails. And that's exactly the floor you need before you can let an agent work on its own for hours: **autonomous work you can actually trust**.

---

## Why it isn't a tool

The obvious objection, and the right one to raise, is that this already exists. Spec-driven development isn't a phrase I coined — there are real tools built around the same idea: GitHub's Spec Kit, Amazon's Kiro, Tessl. If you've used one, a lot of what I just described will sound familiar, and that's fair.

The difference is where the spec lives. Those are tools — you adopt the tool, you work the way the tool works, and your spec is shaped by that tool's surface. Deep Work Plan is the other thing: it lives in the repository as plain files any agent can read. There's no runtime to adopt, no vendor to bet on, no per-tool reimplementation when you switch agents. The plan, the tasks, and the log are all plain markdown sitting in `.dwp/`. Claude Code can run it. Codex can run it. Cursor can run it. Next year's agent that nobody has shipped yet can run it, because it's just files, and reading files is the one thing every agent already knows how to do.

That's the whole argument for repo-native over tool-bound, and I'll be honest that I didn't appreciate it until I had the same plan format outlive an agent I'd stopped using. The methodology survived the tool. A spec inside a tool is a bet that the tool sticks around. A spec inside the repository is a bet that the *repository* sticks around — which is a bet I'm already making, since it's where the code is.

---

## Dogfooded, three repos deep

I'm wary of methodologies that only work in the slides. So the honest test is whether I actually run this on the things I ship, and I do — this blog among them. Almost every change to this repository now starts as a Deep Work Plan: a plan file, atomic tasks, gates that have to pass, state on disk. The post you're reading was written under one. When I say the loop survives a context reset, it's because I've watched it survive one on work I cared about, not because the diagram says it should.

It's not just my side projects, either. The same methodology runs in production at DailyBot — in fact it grew out of the engineering there, where the by-hand version got rebuilt enough times across enough repos that standardizing it stopped being optional. A team uses it to keep long-horizon agent work from drifting at a scale I don't operate at solo, and there's [a longer account of how a team runs this across hundreds of pages](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) if you want the company-scale version of the same story. The methodology documents and ships from a repository that uses it on itself, which is about as much dogfooding as I know how to do. The proof and the artifact are the same repos.

If you want to try it, the whole thing is open and MIT-licensed. The methodology, the readable spec, and the kit live at [deepworkplan.com](https://deepworkplan.com); there's a one-step adoption endpoint at [deepworkplan.com/init](https://deepworkplan.com/init) that points an agent at your repo and gets it set up; and it's packaged as an installable skill at [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — a router and a handful of sub-skills that map straight onto the loop: create, execute, refine, resume, status, verify. It drops into the `.agents/skills/` layout the same way every other skill does. Install it, point an agent at your repo, generate a plan, run it.

---

## What changed for me

The shift, looking back, was small and total at the same time. I stopped trying to get better at correcting the agent mid-run, and started writing down — before it starts — what done means and where the lines are. The correcting didn't go away. It moved earlier, into the plan, where it's a sentence I write once instead of an interruption I have to keep making.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-humans-steer.webp"
       alt="Engraving-style illustration of a ship's captain at the wheel pointing the course while the crew executes, under the title 'Humans steer. Agents execute.'"
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>You decide what done means and where the lines are; the plan carries your intent and the agents do the hours. The plan is the contract between them.</figcaption>
</figure>

There's a catch in that, and it's the most honest thing I can say about the method: a thin plan fails just as quietly as drift used to. A vague spec gets executed faithfully — the gates go green, the build passes, and what comes back is exactly what I wrote down, which is the whole problem when what I wrote down wasn't thought through. The agent doesn't wander anymore; I aim it wrong instead. None of the scaffolding fixes that. Writing the plan well — naming the real problem instead of the symptom, drawing the lines the work gets checked against, guessing where the agent will guess so I can close the gap before it starts — is the part that stays mine, and it turned out to be the hard part. The methodology doesn't replace that judgment. It makes it the thing the whole run depends on.

The afternoon that drifted on me was the last one that drifted on me for that reason. Not because the model got smarter — it's the same model. Because the work finally had a place to stand that the context couldn't erode out from under it. The harness had a target. The plan was the target. And the repository was holding both.

Let's keep building.

---

## Resources

- [Deep Work Plan](https://deepworkplan.com) — the methodology, the readable spec, and the kit
- [deepworkplan.com/init](https://deepworkplan.com/init) — one-step adoption endpoint that sets up your repo
- [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — Deep Work Plan packaged as an installable agent skill
- [How a team runs long-horizon agent work in production](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) — the company-scale account of the same methodology
- [GitHub Spec Kit](https://github.com/github/spec-kit) — tool-bound spec-driven development, for contrast with the repo-native approach
