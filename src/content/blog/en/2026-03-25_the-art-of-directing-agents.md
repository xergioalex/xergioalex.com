---
title: "The Hidden Job of the AI Era: The Art of Directing Agents"
description: "The biggest difference between mediocre and great results with AI agents isn't the model — it's the human ability to frame problems and direct with precision."
pubDate: "2026-03-25"
heroImage: "/images/blog/posts/the-art-of-directing-agents/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai", "personal"]
keywords: ["art of directing agents", "better instructions AI agents", "delegating to coding agents", "how to work with AI agents", "AI agent direction vs prompting", "same model different results AI", "framing work for AI agents"]
series: "working-with-agents"
seriesOrder: 2
---

In the last few months, I've noticed something that I now think is one of the most important truths about working with AI agents:

Give two people the same model, the same agent, the same codebase, and the same setup, and the results can still be abysmally different.

Not slightly different.

Abysmally different.

One person gets something clean, coherent, surprisingly solid, and close to production-ready. The other gets something vague, brittle, overcomplicated, or just subtly wrong in all the ways that matter.

The model didn't change.
The agent didn't change.
The setup didn't change.

What changed was the human directing the work.

And I think that's the part a lot of people still don't fully see.

We spend so much time talking about models. Which one is smarter. Which one is better at coding. Which one has better benchmarks. Which one has the longer context window. Which one is worth paying for.

All of that matters.

But in practice, I keep seeing something else: the quality of the result often depends less on the model than on the quality of the direction behind it.

That's why I've been rethinking what the hidden job of the AI era really is.

At first, I thought a big part of it was reviewing machine work. And yes, review still matters. A lot. But the more I work with agents every day, the more convinced I am that the hidden job starts earlier than review.

Much earlier.

It starts before the output exists.

It starts when you frame the problem. When you define the task. When you decide what matters. When you set the boundaries. When you provide the right context. When you make the work clear enough that the agent can actually do it well.

In other words, the hidden job is not just reviewing machine work.

It is directing agents.

And the better I get at this, the more I feel that this is one of the real arts of modern engineering.

---

## The Output Starts Earlier Than Most People Think

When people evaluate AI, they usually look at the visible part.

The code.
The UI.
The diff.
The test suite.
The final answer.

And then they ask: was it good or bad?

That makes sense. It's the part we can see.

But the quality of the result usually starts much earlier than that.

It starts in how the work was framed.

What is the real problem? What are we actually trying to solve? What part of the system matters here? What constraints are non-negotiable? What should absolutely not be touched? Are we optimizing for speed, maintainability, simplicity, low risk, or just momentum? What edge cases matter enough to call out in advance? What would a good result actually look like?

These are not side details around the task.

They are the task.

That's one of the biggest shifts I've felt in this new way of working.

Before, a lot of this thinking happened during implementation. You started coding, hit ambiguity, figured things out on the way, made tradeoffs in motion, adjusted as you went.

Now a lot of that has moved upstream.

Because when execution becomes this fast, ambiguity becomes expensive.

A human developer will often slow down naturally when a request is underspecified. An agent usually won't. It will keep moving. It will fill in the blanks. It will make assumptions. It will choose a direction. And sometimes it will do all of that with enough confidence that the result looks good until you realize it solved the wrong problem.

That is why I keep coming back to the same idea:

**The result starts long before the output.**

It starts in the direction.

---

## This Is Not Really About Prompting

A lot of people still call this prompting.

I get it. That's the word we had. But honestly, the more I work this way, the less useful that word feels.

Because what I'm doing most of the time does not feel like "prompting."

It feels like designing work.

It feels like taking something fuzzy and turning it into something delegable.

It feels like deciding what context matters, what constraints matter, what should remain stable, what quality bar we're aiming for, and where the agent is likely to go wrong if I leave too much open.

A good instruction is not just better phrasing.

It's not a trick. It's not a formula — and it's definitely not some magic incantation you whisper to the model.

A good instruction is usually a compressed form of structured thinking.

It contains, explicitly or implicitly:
- what problem needs to be solved
- what context matters
- what constraints must be preserved
- what should not be changed
- what kind of output is useful
- what quality bar is expected
- what tradeoffs to avoid
- what to validate before considering the work done
- when the agent should stop and ask instead of guessing

Anthropic's own [prompt engineering guidance](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) covers most of these — specifying context, constraints, and success criteria. It's good documentation. But the label "prompting" still makes it sound like a writing exercise, when in practice it's closer to a systems design exercise.

That is not a prompt trick.

That is judgment.

And I think that distinction matters a lot, because when people reduce this to prompting, they make the work sound much lighter than it really is.

The leverage is not in writing a prettier request.

The leverage is in understanding the work deeply enough to define it well.

Good delegation is not asking for work.

It is defining work clearly enough that it can be executed correctly.

---

## The Gap Between People Didn't Disappear

There's a very seductive story in the air right now.

It goes something like this: now that AI can code, everyone is closer to operating at the same level. The tools are getting so strong that expertise matters less. Access is flattening the playing field.

There is something real in that. The floor has absolutely risen.

People who could not build before can now build. People who used to be blocked by implementation can now move. Designers, PMs, founders, marketers, operators — I've seen all of them get much closer to execution because agents close part of the gap.

That part is real, and honestly, it's one of the most exciting things happening right now.

But I don't think it means the gap between people disappeared.

I think it moved.

It moved upstream.

It moved into the quality of direction.

A junior and an expert can sit in front of the same exact setup and still get radically different outcomes, because they are not really doing the same thing. They are not just "using AI." They are framing, scoping, constraining, and directing the work at very different levels.

Interestingly, [METR's early-2025 AI developer productivity study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) found that experienced developers were sometimes 19% *slower* when given AI tools — a counterintuitive result that actually supports this point. Access to the tool alone doesn't close the gap. The skill to direct it is what matters, and that skill doesn't come free with the subscription.

The more experienced person is usually better at:
- seeing the real problem behind the task
- anticipating ambiguity before the agent hits it
- preserving architectural intent
- setting clearer boundaries
- spotting where risk lives
- defining better acceptance criteria
- separating what matters from what is noise
- knowing when a task is ready to delegate and when it still isn't

That difference matters enormously.

I've seen tasks where the distance between a weak instruction and a strong one was not 10% better or worse.

It was the difference between:
- "this kind of works"
- and "this is solid enough to build on"

The same model can look mediocre in one person's hands and remarkable in another's.

Not because the model changed.

Because the direction changed.

---

## The Better Builder Is Often the Better Director

This is one of the biggest mindset shifts I've had.

For a long time, a lot of technical strength showed up most visibly in implementation. You could see it in how someone coded, debugged, structured a component, handled complexity, or cleaned up a messy system.

That still matters. I'm not pretending it doesn't.

But as more of the execution gets delegated, another layer of skill becomes much more visible: the ability to direct the work well.

And the more I work with agents, the more convinced I am that the better builder is often the better director.

Not because they know more syntax.

Not because they type faster.

But because they understand systems better. They see tradeoffs earlier. They know what good looks like. They know what should remain stable. They know where not to improvise. They know how to turn a fuzzy request into a task the machine can actually execute well.

That doesn't feel like a secondary skill to me.

It feels like a new expression of engineering judgment.

And I think we are still underestimating how big that shift is.

Because once execution gets cheaper, the thing that separates people is no longer just who can implement.

It is increasingly who can direct.

---

## Agents Amplify Clarity — and Confusion Too

One of the reasons this matters so much is that agents are real amplifiers.

A well-directed agent can feel almost unfair.

It moves fast. It stays coherent. It handles complexity better than you expected. It gives you leverage that, honestly, still feels surreal some days.

But a poorly directed agent can also move fast.

That's the problem.

It can move fast in the wrong direction. It can confidently overbuild. It can solve the wrong problem cleanly. It can make assumptions you never wanted it to make. It can generate something polished on top of a bad understanding of the task.

And when that happens, people often blame the model.

Sometimes that blame is fair. Models still fail in very real ways. But I also think a lot of what looks like model failure is actually direction failure.

The task was vague.
The context was incomplete.
The boundaries were weak.
The success criteria were unclear.
The agent was forced to guess too much.

A lot of bad output is just badly framed work arriving quickly.

That's why I've started thinking of agents less as pure productivity multipliers and more as **judgment multipliers**.

They multiply the upside of clarity.

And they multiply the cost of confusion too.

---

## Review Still Matters — But It's Downstream

To be clear, I still think review is a huge part of working with agents.

You still need to check what changed. You still need to validate whether the implementation really solves the right problem. You still need to catch hidden risks, awkward abstractions, fragile logic, and work that technically functions but doesn't actually belong in the system.

That doesn't go away.

But I no longer think review is the center of the hidden job.

I think it's downstream from it.

A lot of painful review work is just the cost of weak direction showing up later.

If the task was framed badly, the review gets heavier. Now you're not only evaluating quality. You're cleaning up ambiguity that should have been resolved earlier. You're correcting assumptions the agent should not have had to make. You're dragging the work back toward the real objective after it drifted.

That's a very different kind of review.

A well-directed task usually leads to sharper review. More focused review. Higher-leverage review.

You're checking fit, coherence, risk, and quality.

A poorly directed task leads to rescue work.

And that difference is one of the clearest signs that the real leverage starts earlier than most people think.

---

## Why Some People Get So Much More Out of AI

This is also why I'm careful when someone tells me they tried an agent, got mediocre results, spent too much time cleaning things up, and walked away thinking the whole thing was overhyped. I don't dismiss that experience. It's real, and it happens to people who are technically sharp and trying seriously. But when I ask a few questions — what did you ask it to do, how did you frame it, what context did you give it — the answer is almost always the same: the task wasn't defined well enough. Not wrong intentions. Just a gap in direction.

That experience is real.

But I've also learned that "using AI" is an incredibly broad phrase. Two people can say they're using coding agents and still be doing completely different things.

The [Stack Overflow 2025 Developer Survey](https://survey.stackoverflow.co/2025/ai) shows exactly this: while 84% of developers use or plan to use AI tools, reported productivity gains vary wildly. Some developers report saving hours per day. Others report minimal impact or even frustration. Same tools. Different results.

One is chatting with a model and hoping for useful output.

The other is directing a system of delegated work with context, boundaries, standards, and intentionality.

Of course those two experiences will feel different.

That's why I don't think the long-term advantage will belong only to the people who have access to the best models.

I think it will belong to the people who learn how to direct them well.

The people who learn how to:
- frame problems clearly
- define delegable tasks
- provide enough context without drowning the system in noise
- set boundaries
- sequence work properly
- and review efficiently because the work was well-directed from the beginning

That is not a minor skill.

I think it is becoming one of the highest-leverage skills in modern software work.

---

## The Hidden Job

The hidden job of the AI era is not just reviewing what agents produce.

It is knowing how to direct them.

It is taking a messy problem and shaping it into something that can be delegated well. It is deciding what matters, what doesn't, what should be constrained, and what should remain flexible. It is knowing what context the agent needs, what quality should look like, where the risks are, and when the task is actually ready to hand off.

That is the part I think many people still miss.

The real leverage is not just access to agents.

It is the ability to direct them well.

And the more I work this way, the more convinced I am that this is one of the defining shifts of the AI era: not just that machines can now execute more of the work, but that human value is moving upstream into framing, judgment, delegation, and direction.

That is the hidden job.

And I think we are only beginning to understand how much it matters.

Let's keep building.

---

## Resources

- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Covers context, constraints, and success criteria design for working with Claude
- [METR: Early 2025 AI Dev Productivity Study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — The counterintuitive finding that experienced devs were 19% slower with AI tools
- [Stack Overflow Developer Survey 2025: AI](https://survey.stackoverflow.co/2025/ai) — 84% adoption but wildly varying reported impact — same tools, different results
- [METR: AI Task Time Horizons](https://metr.org/time-horizons/) — The "new Moore's Law" tracking how AI agent capabilities double every few months
