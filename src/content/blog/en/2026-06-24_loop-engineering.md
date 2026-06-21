---
title: "Loop Engineering: Automation in the Age of AI"
description: "Everyone's saying we should write loops, not prompts. Strip away the novelty and it's automation — with one new thing sitting inside the loop's body."
pubDate: "2026-06-24"
heroImage: "/images/blog/posts/loop-engineering/hero-en.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "claude"]
keywords: ["loop engineering", "agentic loops", "autonomous agents", "scheduled AI agents", "spec-driven development", "AI automation workflow", "self-executing roadmap", "Claude Code loops"]
series: "working-with-agents"
seriesOrder: 9
draft: false
---

Stop hand-prompting your coding agents. Design the loops that prompt them for you. Peter Steinberger ([@steipete](https://x.com/steipete/status/2063697162748260627)) summed it up in a single line — and the phrase spread fast: hundreds of thousands of views and a polite-ish brawl in the replies, the kind that only shows up when something hits a nerve. The argument is simple and uncomfortable at once: your job is no longer to write the perfect prompt, it's to build the system that writes it for you.

<figure>
  <img src="/images/blog/posts/loop-engineering/figure-steipete-tweet.webp"
       alt="Screenshot of Peter Steinberger's June 7, 2026 post: 'Here's your monthly reminder that you shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents.'"
       width="960"
       height="437"
       loading="lazy" />
  <figcaption>Peter Steinberger, June 7, 2026 — the turn in one line: stop prompting the agent, start designing the loop it runs inside. — <a href="https://x.com/steipete/status/2063697162748260627">Original post</a>.</figcaption>
</figure>

Then the receipts showed up. Boris Cherny, who leads Claude Code at Anthropic, had said something close to it [on stage](https://workos.com/blog/boris-cherny-claude-code-acquired-interview-takeaways) a few days earlier: *"I don't prompt Claude anymore. I have loops that are running. They're the ones that are prompting Claude and figuring out what to do. My job is to write loops."* He's [described his actual setup](https://www.platformer.news/boris-cherny-interview-ai-jobs/), too — a Claude Code loop he moved into a routine that fires roughly every half hour, chewing through user feedback on its own. He says he hasn't hand-written a line of code in months. Addy Osmani gave the thing a name in [a post](https://addyosmani.com/blog/loop-engineering/) the same week and a clean definition: loop engineering is *"replacing yourself as the person who prompts the agent. You design the system that does it instead."*

<figure>
<div class="youtube-facade relative aspect-video w-full overflow-hidden rounded-xl my-6 bg-black" data-video-id="RkQQ7WEor7w" data-title="Boris Cherny: Claude Code & the Future of Engineering | Acquired Unplugged presented by WorkOS">
  <img src="https://i.ytimg.com/vi/RkQQ7WEor7w/hqdefault.jpg" alt="Boris Cherny: Claude Code & the Future of Engineering — Acquired Unplugged interview presented by WorkOS" class="absolute inset-0 h-full w-full object-cover" loading="lazy" width="480" height="360" />
  <button type="button" aria-label="Play video: Boris Cherny on Claude Code & the Future of Engineering" class="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center border-0 bg-black/10 transition-colors hover:bg-black/30 focus-visible:bg-black/30 focus-visible:outline-none">
    <svg viewBox="0 0 68 48" class="h-12 w-12 drop-shadow-lg md:h-16 md:w-16" aria-hidden="true">
      <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00"/>
      <path d="M45 24L27 14v20z" fill="#fff"/>
    </svg>
  </button>
</div>
<figcaption>Boris Cherny on Claude Code and the future of engineering — <a href="https://www.youtube.com/watch?v=RkQQ7WEor7w">Acquired Unplugged</a>, presented by WorkOS.</figcaption>
</figure>

So that's the moment. A slogan, a quotable engineer, a name, and a week of everyone arguing about whether it's the future or a rebrand.

My honest reaction, once it clicked what they were actually talking about, was less epiphany than déjà vu: this is plain old automation, the same kind I've been wiring up for years — except now the thing that kicks off and steers the loop is an agent's reasoning. And it still landed, because it's exactly where the whole road was heading: from [going from writing code to directing agents](/blog/from-programmer-to-orchestrator/) to [turning that direction into a craft of its own](/blog/the-art-of-directing-agents/) — I just hadn't given it a name.

---

## It's automation. Say it plainly.

Let me take the air out of it first, because the hype deserves it.

A loop is not new. We have been writing systems that wake up, check a goal, do work, and check again for as long as we've had servers. Kubernetes calls them control loops, and the official docs literally explain them with a thermostat: read the temperature, compare it to the target, act, repeat. Every CI job on a cron, every autoscaler, every "if it drifts, pull it back" piece of infrastructure is the same shape. Control theory had this nailed before most of us were born.

So when someone says loop engineering is "just automation" — a workflow as old as time, fired by a scheduled trigger — they're not wrong. They're half-right in a way that's worth sitting with. The loop is old. The scheduler is old. Waking up on a trigger and reconciling against a desired state — old.

What changed is one slot. In the classic loop, the thing in the middle that decides what to do is dumb and deterministic: if temp < target, turn on heat. In an agentic loop, that slot holds a model. [Simon Willison](https://simonwillison.net/) — co-creator of Django and one of the most-read writers on LLMs — has a compact definition: an agent is an LLM using tools in a loop, a phrasing Anthropic adopted. That's the whole story in nine words. The body of the loop now contains something that can read a failing test, form a hypothesis, edit three files, and try again. And that's the point: the thing that changes between a thermostat and an agent isn't the loop. It's what's in the loop's body.

<figure>
  <img src="/images/blog/posts/loop-engineering/figure-loop-anatomy-en.webp"
       alt="Diagram of the anatomy of an agentic loop: a trigger starts the cycle; an agent (an LLM using tools, the slot that changed) reads the goal or spec, does the work, and passes through a verification node with types, linters, and tests; on fail it loops back to the agent; on pass it opens the change for review. The whole cycle is wrapped by halt conditions: max iterations, no-progress detection, and a token and budget ceiling."
       width="1600"
       height="900"
       loading="lazy" />
  <figcaption>Anatomy of an agentic loop: the only new thing is the model in the controller slot; what makes it safe is verification and halt conditions.</figcaption>
</figure>

That's the part I keep coming back to. The novelty isn't the loop. It's that we can finally put judgment where the `if` statement used to be. Selling it as something brand-new inflates it; waving it off as a rebrand ignores the one slot that genuinely changed places.

---

## Every chapter was pointing at this loop

If you've been following my [*Working with Agents*](/blog/series/working-with-agents/) series as it's unfolded, the loop isn't a new idea — it's the conclusion every chapter has been pushing toward.

The arc has been one layer at a time. The base was [the art of directing agents](/blog/the-art-of-directing-agents/), where spec-driven development stopped being a trick and became the job: writing the spec instead of typing the code. On top of that, [the skill layer](/blog/the-skill-layer/) — the capabilities an agent installs so it stops reinventing the same procedure. Then [the harness layer](/blog/the-harness-layer/) — the system around the model that checks the work and turns each mistake into a permanent fix. Then [the deep work plan](/blog/deep-work-plan/) — the durable spec the harness holds the work to, so a long job doesn't drift into something I never asked for.

Stack those and look at what you've got: an agent that knows how to do the job, a system that catches it when it's wrong, and a written target it can't quietly wander off. There's only one move left. Run it on a trigger. Take your hand off the keyboard.

That's the loop. It's not a new layer so much as the moment you let the existing layers run without you sitting there pressing enter. Skill plus harness plus plan was always pointed at unattended execution; loop engineering is just the verb for finally doing it.

I'll admit I underrated how much of the difficulty lives *before* the loop. You can't safely loop an agent that has no plan and no way to check itself — you just get a faster way to make a mess. The reason the loop feels possible now isn't a smarter model. It's that the boring scaffolding underneath it finally exists.

---

## Automating the company, a little more each month

This resonated closely because I'd been sketching the same idea for a while — just in less flattering language. I called it "making the company run itself a little more each month."

The vision: a product that improves while I sleep. Picture a lead agent you've instructed with your own judgment — the same judgment you use to decide what to do and in what order. That agent is the one that kicks off the loop: it scans the Kanban board and creates new tasks from the roadmap, from support tickets, from user and team feedback, from the pending backlog, or simply because its judgment says something is worth doing. Once a task exists, other agents fire, complete it, and leave it ready for review and integration. The team's backlog stops being a queue of things I have to personally start and becomes the input to a loop.

<figure>
  <img src="/images/blog/posts/loop-engineering/figure-self-running-roadmap-en.webp"
       alt="Diagram of the self-running roadmap: a lead agent, instructed with your judgment, takes signals from the roadmap, support tickets, user and team feedback, and the backlog; it creates tasks on a Kanban board; worker agents research, plan, and ship them as pull requests ready for review and integration; you review and approve, and the merged work feeds the next cycle."
       width="1600"
       height="900"
       loading="lazy" />
  <figcaption>The vision: a lead agent instructed with your judgment creates the tasks, worker agents complete them and leave them ready for review. You approve; the loop feeds itself.</figcaption>
</figure>

In my case, some of that is real today and some of it isn't, and I'd rather be honest about the seam. The pieces that ship in the products — a Claude Code routine on a schedule, file-system hooks like Kiro's that run a prompt when a file is saved — those work; people are running them. I've built a few basic loops myself that automate projects, and they hold up. The further-out version, where a whole roadmap executes itself and the company gets more autonomous every quarter, is for me still more of a goal than something I can point at in production. But me not being there yet doesn't mean nobody is: there are companies already running this loop at full scale.

The starkest is Block — Jack Dorsey's company behind Square and Cash App — which built an internal system called Builderbot to coordinate agents across its entire codebase. Engineers tag it in Slack and the system researches, plans, and ships: it picks up the ticket, creates the branch, writes the code, opens the pull request, and iterates on feedback, without ever touching customer data or payment information. The numbers they [made public](https://block.xyz/inside/block-rolls-out-builderbot-a-new-suite-of-ai-native-tools-that-changes-the-way-we-ship) are the whole argument: 200,000 operations a day, 1,500 pull requests merged per week, 15% of all production code changes across the company. What used to take months now takes days.

<figure>
  <img src="/images/blog/posts/loop-engineering/figure-block-builderbot.webp"
       alt="Screenshot of Block's announcement of Builderbot: an internal AI system that coordinates agents across its entire codebase, with 200,000 operations a day, 1,500 pull requests merged per week, and 15% of all production code changes."
       width="532"
       height="687"
       loading="lazy" />
  <figcaption>Block introduces Builderbot — agents coordinated across its entire codebase, already responsible for 15% of production code changes. — <a href="https://x.com/blocks/status/2067284573482815979">Original post</a>.</figcaption>
</figure>

That isn't a weekend vision anymore. It's an agentic loop in production, inside a public company, moving a measurable share of the engineering work.

And it's not just Block, or just engineering work: capital is already betting on the extreme version of this. Y Combinator launched [Thomas](https://www.ycombinator.com/launches/QwO-thomas-the-first-yc-backed-ai-founder), billed as *"the first YC-backed AI founder"* — not a copilot you hire, but an autonomous entity that starts companies to make money on its own. And YC itself has spent a while [openly calling](https://www.ycombinator.com/rfs), in its requests for startups, for tiny teams — solo founders included — capable of building multi-billion-dollar companies by optimizing for a single metric: revenue per employee. [Aaron Epstein](https://www.ycombinator.com/people/aaron-epstein), a General Partner at YC and co-founder of Creative Market, framed it as the first ten-person, hundred-billion-dollar company. A company that runs itself on agents has gone from a quirk to an investment thesis.

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

## What you're brave enough to put in the loop

I think the word is good, actually. Not because the idea is new — I've argued the opposite for most of this post — but because naming a thing makes people build it on purpose instead of by accident. "Loop engineering" tells you the loop is the artifact. You design it, you version it, you put guardrails on it, the same way you'd design any other system that runs without you watching.

For me it reframes the goal of this whole series. I started out learning to direct agents one task at a time. The honest endpoint was never "direct them faster." It was "build the loop that directs them, and get out of the chair." That's uncomfortable to say out loud — it's literally automating the job I just spent a year learning. But that's the direction, and pretending otherwise would be the marketing voice I try to keep out of these posts.

The loop is just automation. I've made peace with that. The interesting question was never whether it's new — it's what you're brave enough to put in its body, and how good your brakes are.

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
- [Thomas — Y Combinator](https://www.ycombinator.com/launches/QwO-thomas-the-first-yc-backed-ai-founder) — "the first YC-backed AI founder," an autonomous entity that starts companies to make money.
- [Requests for Startups — Y Combinator](https://www.ycombinator.com/rfs) — the thesis of tiny teams and solo founders building huge companies by optimizing for revenue per employee.
- [Builderbot — Block](https://block.xyz/inside/block-rolls-out-builderbot-a-new-suite-of-ai-native-tools-that-changes-the-way-we-ship) — agents coordinated across Block's entire codebase: 1,500 pull requests a week, 15% of production code changes.
