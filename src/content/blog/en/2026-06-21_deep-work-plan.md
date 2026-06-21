---
title: "Deep Work Plan: Give Your Agent a Plan and a Harness"
description: "An agent nailed the first hour and drifted by the third. The fix wasn't a smarter model — it was a durable plan the repository itself could hold the work to."
pubDate: "2026-06-21"
heroImage: "/images/blog/posts/deep-work-plan/hero-en.webp"
heroLayout: "side-by-side"
tags: ["tech", "portfolio", "ai-agents", "claude"]
keywords: ["Deep Work Plan methodology", "spec-driven development for AI agents", "harness engineering for coding agents", "long-horizon agent work", "repository as agent harness", "tool-agnostic spec-driven development", "resumable agent plans on disk"]
series: "working-with-agents"
seriesOrder: 8
draft: false
---

I want to hand an agent a real piece of work — a migration, a feature, a run of changes that takes hours — and walk away from the keyboard knowing that when I come back it'll be done right. Not babysitting it. Not correcting it every twenty minutes. Autonomous work I can actually trust. That's the goal of this chapter, and of the whole methodology I'm about to lay out.

The short answer — the one it took me a year to understand — is that the trust doesn't come from a smarter model. It comes from giving the agent two things: a plan it can't quietly drift from, and a harness that holds it to that plan — both installed in the repository, as files any agent can read. I packaged them into a structured, open-source methodology for working with agents that I named **Deep Work Plan** ([https://deepworkplan.com](https://deepworkplan.com)). The rest of this chapter is what that means and why each piece has to be there.

<figure>
  <img src="/images/blog/posts/deep-work-plan/logo-dwp-en.webp"
       alt="Deep Work Plan logo: the DWP monogram next to the name 'Deep Work Plan' and the line 'Methodology · Spec · Kit', with an engraving-style oil lamp illustration."
       width="1066"
       height="250"
       loading="lazy" />
  <figcaption><a href="https://deepworkplan.com">Deep Work Plan</a>: an open spec-driven development methodology.</figcaption>
</figure>

I got there the hard way — watching a frontier agent, well-equipped and running the best reasoning money can buy, drift anyway. It's a pattern that shows up in any long-running job: past a certain point, the agent starts to lose the horizon of the task. There's a limit to how much context it can hold, and when it hits that limit it tends to summarize what it has to keep going — and the devil is in the details, exactly the ones that fall away when context gets compressed. From there it reasons from a version of the task that no longer matches the original: it redoes work that was already done, talks itself into a refactor no one asked for, loses the thread of what it actually finished. It doesn't crash. It drifts.

The intelligence was never the issue — that was the whole lesson of [the harness engineering chapter](/blog/the-harness-layer/). What I learned this time was the other side of that lesson: the same agent, on the same model, produces results an order of magnitude apart depending on what you equip it with. This one had a harness, but a harness with no target to hold the work to is a control system regulating toward nothing. Add a plan — a place to stand, a target it can't quietly slip out of — and the same agent that drifted at hour three closes out serious work in a single run, without you constantly supervising it. A good harness and a plan don't add up: they multiply.

That shift in focus reordered everything. If the jump doesn't come from the model, you won't win it with a cleverer prompt or by waiting for the next, smarter version — the models matter, but what they work inside matters more. The drift was never a prompting problem you fix by talking prettier; it was structural, the kind you solve with engineering. And that reframes what a *well-equipped* agent even is: not the one running the smartest model, but the one standing on a harness that holds it and a plan it can't quietly wander off — and giving an agent that is what the rest of this is about.

---

## The harness turns a simple instruction into a complete plan

Almost always, the quality of what an agent produces is the quality of what you asked for. A vague instruction gives a vague result; a good one — the one that names the files to touch, the services and libraries to use, the constraints to respect, the context the agent doesn't arrive with — gives a result that actually holds up. If you want a task done as well as it can be, you usually have to explain it at that level of detail, and dictating all that detail by hand, every time, is exactly the work that doesn't scale.

A well-equipped repository changes the equation. The harness is this series' thermostat — the control system that measures and corrects — but a thermostat with no temperature set on it just hums: it needs a number on the dial. The interesting part is where that number comes from. When the skills, the agents, the documentation, and the specs already live in the repo, the agent doesn't arrive blank: it arrives knowing how the project is built, what conventions to follow, and what tools it has on hand. With that, a one-line instruction is enough for it to understand what actually needs doing — not because it guesses, but because the context you used to have to dictate is already written into the repository.

And that unlocks the part that matters: the agent itself can set the number on the dial. From a high-level goal it derives the detailed specification — the sharpened goal, the constraints, the acceptance criteria, the validation gates that have to pass before a task counts as done — and leaves it written for you to review before it starts. You set the direction; the harness gives the agent what it needs to turn that direction into a plan that can be executed and verified. And that plan doesn't sit still: it runs as a loop the agent walks around, lap after lap — plan, atomic tasks, validation gates, completion, resumable state — and the harness stops being a pile of checks and becomes the machine that, on every lap, proves the work still lands inside the lines that got drawn.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-plan-no-drift-en.webp"
       alt="Engraving-style illustration: the loop of a Deep Work Plan arranged in a circle — plan, atomic tasks, validation gates, completion, and resumable state — under the title 'A plan agents can't drift from.'"
       width="1600"
       height="960"
       loading="lazy" />
  <figcaption>The plan runs as a loop — plan → atomic tasks → validation gates → completion → resumable state — and the harness keeps the agent inside it, lap after lap.</figcaption>
</figure>

This is the part a lot of people underrate, and I think it's because it sounds boring: the gap between an agent that drifts at hour three and one that runs unattended for an afternoon doesn't live in the model — it lives in whether there's a written plan to return to. And putting that plan in writing, before the agent starts, is a practice with a name of its own.

---

## What spec-driven development actually buys you

It moves one thing, and everything else follows from it: the source of truth stops being an ephemeral conversation and becomes a structured plan held on disk. The agent executes against that spec, not against whatever it can still remember from the chat. It's a small change that buys you two things a chat can't.

The first is stability. We've already seen how context erodes as it compresses: it fills up, drops the early decisions, and the task the agent thinks it's doing ends up diverging from the one you gave it. A file on disk doesn't move. The agent reads it at the top of task four exactly as it did at task one, so drift has nowhere to accumulate: the truth lives outside the part of the system that wears down.

The second is a definition of done a machine can check — a way to prove whether the agent actually completed the task, instead of taking its word for it. This is where it stops being a TODO list. Each task carries its own acceptance criteria and its own validation gates — the commands that have to come back green before the task is allowed to close. The agent doesn't get to *feel* finished. It has to pass. "Done" becomes a contract, not a vibe — which is exactly the difference between work you can verify and work you have to re-read line by line because you don't trust it.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-done-is-a-contract-en.webp"
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
  <img src="/images/blog/posts/deep-work-plan/figure-repository-is-the-harness-en.webp"
       alt="Engraving-style illustration of a chest labeled 'REPOSITORY' with five tags hanging off it — SPEC, TASKS, CHECKS, STATE, and TOOLS — under the title 'The repository is the harness.'"
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>Context, tools, guardrails, and state — as plain files any agent can read. A durable spec on disk, validation gates over vibes, and the whole thing survives a context reset.</figcaption>
</figure>

That's the move, and it's where this series has been edging layer by layer. It started with the mindset — [the art of directing agents](/blog/the-art-of-directing-agents/), where spec-driven development stopped being a trick and became the job: telling the agent what to build and what it's measured against, not how to type it. Then [the skill layer](/blog/the-skill-layer/) — the capabilities an agent installs to do that work, reading a `SKILL.md` and suddenly knowing something it couldn't before. Then [the harness layer](/blog/the-harness-layer/) — the system around the model that checks its work and turns each mistake into a permanent fix. Skill by skill, scar by scar, this blog's repository got good at agent work: the context, the guides, the sensors, and the skills, all installed into the repo as files any agent can read. Spec-driven development is what finally gives that harness a target. The plan is a set of files on disk, all under a `.dwp/plans/PLAN_<slug>/` directory: a `README.md` with the goal and the task table, one file per task (`<n>.task_<slug>.md`), and — the part that surprised me with how much it mattered — the *state*. It doesn't live in one magic slot: each task carries its own progress marker (`[ ]` not started, `[~]` in progress, `[x]` done, `[!]` blocked) and a `PROGRESS.md` that only ever grows, a timestamped record of what was done in each task and what drifted. The plan isn't just a description of the work. It's the live position of the work, on disk, where a context reset can't touch it.

That last part is what makes a run resumable. The one that drifted on me wasn't recoverable, because the agent's understanding of where it was lived only in a context window that was busy evaporating. When the position lives in files instead, you can close the laptop. The agent — or a different agent, or the same agent three resets later — opens the plan, reads which tasks are checked, reads the state, and picks up exactly where the last one stopped. Long-horizon work stops requiring an unbroken chat session, because the session was never where the truth lived.

The name — **Deep Work Plan** — comes from deep work: focused, sustained effort on something cognitively demanding, only for an agent. A plan deep enough to run for hours, structured enough that it can't quietly wander off it. An agent without a plan is like someone who never blocks time on a calendar, never writes anything down, and context-switches on every interruption; the plan gives it the equivalent of a blocked calendar and a written brief. It's not a product I'm selling and it's not named after anyone — it's the thing I kept rebuilding by hand on every repo, the same scaffolding scratched out from nothing each time, until I got tired enough of retyping it to write it down properly as a spec. Plan, atomic tasks, gates, completion, resumable state. The spec-driven loop, installed into the repository as files.

Writing it down is where it stopped being a personal habit and turned into a methodology. Once the shape was on paper I could make it proportional — a one-line fix doesn't need the ceremony of a database migration — so a plan now comes in tiers: a micro plan for the small stuff, a deep one for the work that actually has to survive hours and resets. The state got more honest too: not just the checkboxes in the `README.md` but a `PROGRESS.md` that records, with a timestamp, what happened in each task and where it drifted or why it blocked, so a fresh agent can reconstruct exactly where the previous one stood. None of it was a flash of insight. It was the slow accretion of watching the same thing break the same way and finally deciding to fix it once.

Two pillars hold it up, and naming them is the cleanest way I've found to say what the methodology is. One is the harness — the context, the guardrails, the state — all of it repo-native, the thing this series has been building by hand chapter after chapter. The other is the spec-driven plan that finally gives that harness a number to hold to. **Deep Work Plan** is how you stop assembling both by hand and install them at once: a plan *and* a harness, dropped into a repo as files.

---

## What that buys the agent, day to day

It's worth spelling out what the plan actually does once it's running — it's where it stops being a fancy TODO list, and where the sharpest questions I got when I put it in front of other people landed. Let me answer them.

The gates run themselves. A validation gate isn't a note to me; it's a command the agent runs and has to see come back clean before it's allowed to close a task. When it doesn't, the agent marks the task *blocked* and stops — loudly, in a file — instead of burying the failure somewhere in a transcript I'd have to go fishing through. My sign-off only bookends the run: I approve the plan before it starts and read the diff when it ends. The middle, the part that used to be me hovering, belongs to the gates now.

The plan describes behavior, not edits, which is what keeps it from going stale: the acceptance criteria name outcomes, not line numbers, so I can change the code between runs and the gates just re-run against whatever the repo is now. And when a task is simply wrong — badly sequenced, or it turned out to mean something I hadn't seen — the agent blocks it instead of improvising around it; because the state lives apart from the task list, I can rewrite the open part of the plan without losing the part that already passed.

The part I didn't design for, and ended up liking most: every run leaves the repository a little more agent-ready than it found it. A task that changes behavior updates the docs and extends the tests inside its own gate. And the methodology makes it mandatory: every plan closes with three fixed tasks — a **Security Review** that audits everything the plan touched, a **Skills & Agents Discovery** that captures whatever reusable pieces surfaced along the way, and an **Executive Report** that summarizes what was delivered. The harness doesn't just hold the work — it compounds. Which is the whole series folding back on itself: skill, harness, plan, each run making the next one cheaper.

Put the pieces together and look at what actually ends up in the agent's hands: capability (the skills), a system that corrects it on its own (the harness), and a verifiable target it can't quietly wander off (the plan). That combination is what makes autonomy *reliable*, not merely possible. You can leave a run going without hovering because every "done" is backed by a gate that passed, every position lives on disk and survives a reset, and every drift stops loudly in a file instead of hiding in a transcript. It isn't that the agent got smarter — it's that the work finally has guardrails. And that's exactly the floor you need before you can let an agent work on its own for hours: **autonomous work you can actually trust**.

---

## Why it isn't a tool

The obvious objection, and the right one to raise, is that this already exists. Spec-driven development isn't a phrase I coined — there are real tools built around the same idea: [GitHub's Spec Kit](https://github.com/github/spec-kit), [Amazon's Kiro](https://kiro.dev), [Tessl](https://tessl.io). If you've used one, a lot of what I just described will sound familiar, and that's fair.

The difference is where the spec lives. Those are tools — you adopt the tool, you work the way the tool works, and your spec is shaped by that tool's surface. **Deep Work Plan** is the other thing: it lives in the repository as plain files any agent can read. There's no runtime to adopt, no vendor to bet on, no per-tool reimplementation when you switch agents. The plan, the tasks, and the log are all plain markdown sitting in `.dwp/`. Claude Code can run it. Codex can run it. Cursor can run it. Next year's agent that nobody has shipped yet can run it, because it's just files, and reading files is the thing every agent does best.

That's the whole argument for repo-native over tool-bound, and I'll be honest that I didn't appreciate it until I had the same plan format outlive an agent I'd stopped using. The methodology survived the tool. A spec inside a tool is a bet that the tool sticks around. A spec inside the repository is a bet that the *repository* sticks around — which is a bet I'm already making, since it's where the code is.

---

## Dogfooded, dozens of repos deep

I'm wary of methodologies that only work in the slides, so the only proof I trust is dogfooding: running the thing on the real work I ship, not just recommending it. And I do — this blog among them. Almost every change to this repository now starts as a **Deep Work Plan**: a plan file, atomic tasks, gates that have to pass, state on disk. The post you're reading was written under one. When I say the loop survives a context reset, it's because I've watched it survive one on work I cared about, not because the diagram says it should.

And it's not just my side projects: I've run it on both my personal and my professional work. The same methodology runs in production at DailyBot — in fact it grew out of the engineering there, where the by-hand version got rebuilt enough times across enough repos that standardizing it stopped being optional. A team uses it to keep long-horizon agent work from drifting at a scale I don't operate at solo, and there's [a longer account of how my team at DailyBot runs this across hundreds of pages](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) if you want the company-scale version of the same story. The methodology documents and ships from a repository that uses it on itself — the most honest dogfooding I know: if the thing broke, it would break in its own house first. The proof and the artifact are the same repos.

If you want to try it, the whole thing is open and MIT-licensed. The methodology, the readable spec, and the kit live at [deepworkplan.com](https://deepworkplan.com); there's a one-step adoption endpoint at [deepworkplan.com/init](https://deepworkplan.com/init) that points an agent at your repo and gets it set up; and it's packaged as an installable skill at [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — a router and a handful of sub-skills that map straight onto the loop: create, execute, refine, resume, status, verify. It drops into the `.agents/skills/` layout the same way every other skill does. Install it, point an agent at your repo, generate a plan, run it.

---

## What changed for me

The shift, looking back, was small and total at the same time. I stopped trying to get better at correcting the agent mid-run and started writing down — before it starts — what done means and where the lines are. That reorganized the work into a clean division of labor: I steer — the intent, the acceptance criteria, the review — and the agent executes, task by task. The correcting didn't go away; it moved earlier, into the plan, where it's a sentence I write once instead of an interruption I have to keep making.

<figure>
  <img src="/images/blog/posts/deep-work-plan/figure-humans-steer-en.webp"
       alt="Engraving-style illustration of a ship's captain at the wheel pointing the course while the crew executes, under the title 'Humans steer. Agents execute.'"
       width="1600"
       height="957"
       loading="lazy" />
  <figcaption>You decide what done means and where the lines are; the plan carries your intent and the agents do the hours. The plan is the contract between them.</figcaption>
</figure>

There's a catch in that, and it's the most honest thing I can say about the method: a thin plan fails just as quietly as drift used to. A vague spec gets executed faithfully — the gates go green, the build passes, and what comes back is exactly what I wrote down, which is the whole problem when what I wrote down wasn't thought through. The agent doesn't wander anymore; I aim it wrong instead. None of the scaffolding fixes that. Writing the plan well — naming the real problem instead of the symptom, drawing the lines the work gets checked against, guessing where the agent will guess so I can close the gap before it starts — is the part that stays mine, and it turned out to be the hard part. The methodology doesn't replace that judgment. It makes it the thing the whole run depends on.

That was the last time an agent drifted on me for that reason. Not because the model got smarter — it's the same model — but because the work finally had a place to stand that the context couldn't erode out from under it. The harness had a target. The plan was the target. And the repository was holding both.

But the bigger change isn't in the agent — it's in me. My job stopped being to type the solution and became to direct it: to name the goal precisely, set the targets, and communicate the intent well enough that it gets executed without me hovering. That, I think, is the defining skill of this era: communication. The same thing that always sat at the center of good human relationships is now indispensable in the relationship between a human and an agent. Whoever can say clearly what they want to build — and why — will go much further than whoever can only build.

Let's keep building — and, above all, keep getting better at saying what we want built.

---

## Resources

- [Deep Work Plan](https://deepworkplan.com) — the methodology, the readable spec, and the kit
- [deepworkplan.com/init](https://deepworkplan.com/init) — one-step adoption endpoint that sets up your repo
- [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) — Deep Work Plan packaged as an installable agent skill
- [How a team runs long-horizon agent work in production](https://www.dailybot.com/blog/how-we-run-long-horizon-agent-work/) — the company-scale account of the same methodology
- [GitHub Spec Kit](https://github.com/github/spec-kit) — tool-bound spec-driven development, for contrast with the repo-native approach
