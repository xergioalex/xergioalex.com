---
title: "The Harness Layer: Why the Model Is the Smallest Part"
description: "Harness engineering is the new way to steer AI agents — the system around the model that checks its work and stops it repeating the same mistake."
pubDate: "2026-06-22"
heroImage: "/images/blog/posts/the-harness-layer/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai-agents", "claude"]
keywords: ["harness engineering", "agent harness", "Agent = Model + Harness", "Mitchell Hashimoto harness engineering", "AI coding agents reliability", "Guides and Sensors harness", "spec-driven development harness"]
series: "working-with-agents"
seriesOrder: 7
draft: true
---

A while back I wrote that orchestrating agents had quietly produced a stack that didn't exist eighteen months ago. I want to start this one *inside* that stack — specifically, inside the repository this very post was written in.

There's a rule in it that says Spanish text has to carry its accents and its ñ: *función*, not *funcion*; *parámetro*, not *parametro*. Obvious, except an agent doesn't find it obvious at all. The first few times I had an agent draft Spanish, it shipped flat vowels — no tildes, no ñ — and I caught them by reading. The third time it happened I stopped correcting the text and corrected the system instead: I added a command that greps the Spanish files for the usual missing-accent suspects and fails if it finds any. Now an agent can forget the rule all it wants. The mistake can't reach the published post, because something between the agent and `main` is checking for it.

That small move — *the agent made a mistake, so I engineered the mistake out of existence* — turns out to have a name now. People are calling it **harness engineering**, and over the last few months it's gone from a phrase one person used in a blog post to the thing a lot of us realize we've been doing without a word for it.

---

## Agent = Model + Harness

The cleanest way I've seen it put comes from LangChain's Vivek Trivedy, in a piece called [*The Anatomy of an Agent Harness*](https://langchain-blog.ghost.io/the-anatomy-of-an-agent-harness/): **"Agent = Model + Harness."** The model is the intelligence. The harness is everything else — and "everything else" is doing more work than it sounds. His definition is worth quoting exactly: *"A harness is every piece of code, configuration, and execution logic that isn't the model itself."*

System prompts. The tools the agent can call. The skills it can read. The orchestration that decides when to spawn a sub-agent or hand off. The hooks that run a linter before a change is accepted. All of that is harness. The model sits in the middle of it like an engine sits inside a car — essential, and also not the part that keeps you on the road.

What makes the framing land isn't the diagram, it's the evidence. LangChain reported that they *"improved our coding agent Top 30 to Top 5 on Terminal Bench 2.0 by only changing the harness."* Same model. They didn't fine-tune anything, didn't wait for a smarter release. They rebuilt the scaffolding around a fixed model and jumped twenty-five places on a benchmark. If you've spent the last two years assuming progress comes from the next model drop, that result rearranges something.

It rearranges it in a direction I find a little funny, because the conclusion is almost insulting to the model: in a production agent, the model turns out to be the smallest part. Most of what determines whether the thing is useful lives outside it.

"Changing the harness" sounds vague until you list what's actually on the table. You can rewrite the system prompt so the agent reasons in a different order. You can hand it a sharper set of tools, or take away the ones it keeps misusing. You can change how the repository is laid out so the agent finds the right file instead of inventing one. You can add a hook that runs the test suite after every edit and refuses to accept changes that break it. You can split a job into smaller pieces so the agent never holds more in its head than it can keep straight. None of those touch the model. All of them change what the agent does. That menu — long, mundane, entirely in your control — is the surface harness engineering works on.

And one of the components Trivedy lists, right alongside tools and orchestration, is *skills*. That's the bridge from [the piece on skills in this series](/blog/the-skill-layer/). A skill teaches an agent a capability it didn't have. The harness is the larger system that decides when that capability runs, whether the agent was allowed to run it, and whether the result is good enough to keep. Skills are a component *inside* the harness. The harness is the frame the skills hang on.

---

## Why the word showed up in 2026

The term comes from [Mitchell Hashimoto](https://mitchellh.com/writing/my-ai-adoption-journey) — the person behind Terraform and a lot of HashiCorp — who named it in February 2026 in an essay about his own slow, stubborn adoption of AI. One of the steps he describes is *"engineer the harness,"* and his definition is the whole idea compressed into a sentence: *"anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again."*

That's it. That's the discipline. Not a framework, not a product — a habit. Every mistake becomes a permanent fix, so the same mistake can't come back. My accent-checking grep is that sentence made literal.

I want to be precise about what Hashimoto did and didn't invent, because the credit matters and it's easy to overstate. He named the *practice*. The thing itself — a scaffold wrapped around a model — was already in use and already being called a harness; Anthropic, for one, was [describing the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk) as "a general-purpose agent harness" in 2025. So this isn't a new invention with a launch date. It's an old activity that finally got a name, and the name stuck because a lot of people needed it at once.

The reason they needed it at once is the more interesting part. For two years the bottleneck was the model: it wasn't good enough, so you waited for the next one. Sometime in the last stretch that stopped being true. The models got good enough that the limiting factor moved. The question stopped being *can it write the code* and became *can I trust it to write the code, repeatedly, without me babysitting every line*. That second question isn't a model problem. It's an engineering problem about the environment you put the model in — and engineering problems get disciplines, and disciplines get names.

---

## Guides and sensors

The most useful breakdown of *how* a harness actually works comes from [Martin Fowler's write-up](https://martinfowler.com/articles/harness-engineering.html), which splits it into two halves. There are **guides** — controls that act *before* the agent does something, to steer it away from the bad move in the first place. And there are **sensors** — controls that act *after*, to catch what went wrong and feed it back so the agent can correct itself. Feedforward and feedback. Steer ahead, check behind.

<figure>
<img
  src="/images/blog/posts/the-harness-layer/control-loop.webp"
  alt="A control loop drawn around an agent: Guides feed in before it acts, Sensors feed back after, looping around."
  width="1200"
  height="1200"
  loading="lazy"
  style="max-width: 480px; display: block; margin: 2rem auto 0.5rem;"
/>
<figcaption>A harness has two halves: guides that steer the agent before it acts, and sensors that catch what it gets wrong after.</figcaption>
</figure>

Fowler also draws a line I keep coming back to, between two kinds of check. Some are **computational** — deterministic and fast, the kind a machine settles with a yes or no: a test passes or fails, a type checks or doesn't, a linter is happy or it isn't. Others are **inferential** — semantic and slower, where you ask another model to judge whether a piece of writing is in the right voice or a change is actually safe. You want the computational checks doing as much as they can, because they're cheap and they never get tired; you save the inferential ones for the judgments a regex can't make.

Map that onto the repo I started with and it stops being abstract. The guides are the things I wrote down so the agent reads them before it acts: the project's `CLAUDE.md` with its mandatory rules, the skills that encode how to do a specific job, the plan that forces an agent to take one task at a time instead of sprinting through ten. The sensors are everything that runs after: the build, the type check, the linter, the accent grep, the audit that reads the whole post against a checklist before it's allowed near publication. None of it makes the agent smarter. All of it makes the agent's mistakes cheaper to catch and impossible to ship.

---

## Humans steer, agents execute

If you want to see how far this goes when someone pushes it all the way, the clearest report I've read is [OpenAI's, written by Ryan Lopopolo](https://openai.com/index/harness-engineering/). His thesis is four words: **"Humans steer. Agents execute."**

The numbers behind it are the part that made me sit up. One internal beta product, built over five months, with — this is the claim, stated plainly — zero manually-written lines of code. *"Every line of code,"* he writes, *"application logic, tests, CI configuration, documentation, observability, and internal tooling, has been written by Codex."* A team that started at three engineers and grew to seven shipped around 1,500 pull requests, roughly 3.5 per engineer per day, adding up to about a million lines. Their own estimate is that it took something like a tenth of the time writing it by hand would have.

I hold numbers like that loosely — it's one team, one internal product, their own estimate, and a company with an obvious interest in the result. But even discounted heavily, the shape is the point. When humans stop writing the code, the thing they spend their time on instead is the harness: the repository organized so an agent can navigate it, the invariants enforced centrally so an agent can't quietly break the architecture, the merge gates kept light so progress doesn't stall. Lopopolo's framing is that the discipline shows up in the scaffolding rather than in the code. The job didn't disappear. It moved up a layer.

That's the same move, just at the far end of the dial. My accent grep and OpenAI's million agent-written lines are the same instinct at different scales: don't get better at correcting the agent, get better at building the system that makes correcting it unnecessary.

---

## Specs are the rules the harness enforces

There's a sibling idea showing up in the same conversations — **spec-driven development** — and it's easy to mistake it for a competing trend. It isn't. It's the other half of the same thing. [Loiane Groner puts the relationship well](https://loiane.com/2026/04/harness-engineering-missing-layer-specs-driven-ai-development/): *"specs define the target state; the harness defines the control system."* Or, even more bluntly: *"Specs-driven development is what makes harness engineering practical. Without it, there is nothing concrete for the harness to enforce."*

A harness with no spec is a thermostat with no temperature set on it — a control system regulating toward nothing. The spec is what you write down so the harness has a target to hold the work against. You say what *correct* means — the goals, the contracts, the acceptance criteria — and the harness's job becomes proving, over and over, that the agent's output still lands inside those lines. Spec says where; harness keeps you there.

This is also why the whole thing fits together as a series rather than a pile of buzzwords. Directing agents is the human role I started this series describing. Skills are the capabilities the agent picks up. Specs are how you write down what you want. And the harness is the machine that makes all of it reliable enough to actually lean on.

---

## I'd been building one without naming it

Here's the part I find almost embarrassing in hindsight. I didn't read about harness engineering and decide to do it. I read about it and recognized it — I'd been building a harness for over a year, one annoyance at a time, and didn't have the word.

This blog has a folder of skills the agents use, a `CLAUDE.md` full of rules I got tired of repeating, and a set of deep work plans that march an agent through a job one checkpoint at a time. It has a publication audit that reads a draft against a long checklist before anything ships. It has the accent grep, a check that every page has a matching plain-Markdown version for other agents to read, and a voice guide with a list of words that get an automatic rewrite. None of that was planned as a system. Each piece is a scar — the residue of some specific time an agent did something I didn't want, and I decided once was enough.

This very post went through it. It was written under a plan that wouldn't let the agent jump ahead: research first, then verify every quoted figure against its primary source, then lock the structure, then write, then translate, then audit. The numbers from OpenAI I just quoted exist in a fact-check file with their source URLs next to them, one row per claim, marked verified or softened or dropped.

That step earned its place. While researching this post, two tidy-sounding claims didn't survive it. One was a statistic — that something like 70% of an agent's performance lives outside the model — which reads great and traces back to nobody; it got cut. The other was a clean sentence saying spec-driven development is "a layer inside harness engineering," which I almost kept until the check made me open the source, where the author actually said something more careful: specs and harnesses are *neighbors*, one defining the target and the other enforcing it. Both of those are exactly the kind of confident, plausible, slightly-wrong thing an agent will hand you with a straight face. The harness is the reason they're in a footnote of corrections instead of in the text you're reading. Hashimoto's sentence, lived: *engineer a solution such that the agent never makes that mistake again.*

Even the memory the agents keep across sessions is a harness. When I correct something — "no voseo in Spanish," "don't invent details" — it doesn't stay a one-off note. It becomes a written rule the next session reads before it starts. The correction stops being something I have to remember to give and becomes something the system gives on my behalf.

---

The reason any of this matters is that it changes where your attention goes. Once the model isn't the bottleneck, getting more out of your agents stops being about chasing the next release and starts being about the system you build around the one you already have. That's a kind of work most of us already know how to do — it's just engineering, the unglamorous discipline of making a thing reliable — pointed at a new target.

And it doesn't aim to push the human out. Fowler has a line about this that I think is exactly right: a good harness *"should not necessarily aim to fully eliminate human input, but to direct it to where our input is most important."* That's the honest version of the promise. Not no judgment — judgment spent where it counts, instead of leaking out one missing accent at a time.

Let's keep building.

---

## Resources

- [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey) — Mitchell Hashimoto's essay where "harness engineering" gets its name
- [The Anatomy of an Agent Harness](https://langchain-blog.ghost.io/the-anatomy-of-an-agent-harness/) — Vivek Trivedy (LangChain) on `Agent = Model + Harness` and the Terminal Bench result
- [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) — Ryan Lopopolo's field report from OpenAI
- [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html) — Martin Fowler on guides, sensors, and computational vs inferential checks
- [Harness Engineering: the missing layer in specs-driven AI development](https://loiane.com/2026/04/harness-engineering-missing-layer-specs-driven-ai-development/) — Loiane Groner on how specs and harnesses fit together
- [This blog's skills and plans](https://github.com/xergioalex/xergioalex.com/tree/main/.agents) — the harness used as the running example throughout the post
