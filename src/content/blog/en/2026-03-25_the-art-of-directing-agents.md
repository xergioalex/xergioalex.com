---
title: "The Hidden Job of the AI Era: The Art of Directing Agents"
description: "AI agents aren't productivity multipliers — they're judgment multipliers. Why direction matters more than the model, and what that means for engineering."
pubDate: "2026-03-25"
heroImage: "/images/blog/posts/the-art-of-directing-agents/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "ai", "personal"]
keywords: ["art of directing agents", "better instructions AI agents", "delegating to coding agents", "how to work with AI agents", "AI agent direction vs prompting", "same model different results AI", "framing work for AI agents"]
series: "working-with-agents"
seriesOrder: 2
---

In the last few months, I've noticed something that I now think is one of the most important truths about working with AI agents: give two people the same model, the same agent, the same codebase, and the same setup, and the results can still be abysmally different. Not slightly different — abysmally different. One person gets something clean, coherent, surprisingly solid, and close to production-ready. The other gets something vague, brittle, overcomplicated, or just subtly wrong in all the ways that matter. The model didn't change. The agent didn't change. The setup didn't change. What changed was the human directing the work.

And I think that's the part a lot of people still don't see. We spend so much time talking about models — which one is smarter, which one is better at coding, which one has better benchmarks, which one has the longer context window, which one is worth paying for. All of that matters. But in practice, I keep seeing something else: the quality of the result often depends less on the model than on the quality of the direction behind it.

That's why I've been rethinking what the hidden job of the AI era really is. At first, I thought a big part of it was reviewing machine work. And yes, review still matters. A lot. But the more I work with agents every day, the more convinced I am that the hidden job starts earlier than review. Much earlier. It starts before the output exists.

It starts when you frame the problem. When you define the task. When you decide what matters. When you set the boundaries. When you provide the right context. When you make the work clear enough that the agent can actually do it well. The hidden job is not just reviewing machine work — it is directing agents. And the better I get at this, the more I feel that this is one of the real arts of modern engineering.

---

## The Output Starts Earlier Than Most People Think

When people evaluate AI, they usually look at the visible part — the code, the UI, the diff, the test suite, the final answer — and then they ask: was it good or bad? That makes sense. It's the part we can see. But the quality of the result usually starts much earlier than that. It starts in how the work was framed.

What is the real problem? What are we actually trying to solve? What part of the system matters here? What constraints are non-negotiable? What should absolutely not be touched? Are we optimizing for speed, maintainability, simplicity, low risk, or just momentum? These are not side details around the task. They are the task.

That's one of the biggest shifts I've felt in this new way of working. Before, a lot of this thinking happened during implementation. You started coding, hit ambiguity, figured things out on the way, made tradeoffs in motion, adjusted as you went. Now a lot of that has moved upstream. Because when execution becomes this fast, ambiguity becomes expensive.

A human developer will often slow down naturally when a request is underspecified. An agent usually won't. It will keep moving, fill in the blanks, make assumptions, choose a direction. And sometimes it will do all of that with enough confidence that the result looks good until you realize it solved the wrong problem. I learned this the hard way a few weeks ago — I sent an agent to refactor an authentication flow with what I thought were clear instructions. Two hours later, it had rebuilt the entire module from scratch. Clean code, good patterns, well-tested. But it had changed the token storage strategy in a way that broke compatibility with our mobile clients. The code was objectively good. The direction was not. I spent the rest of the afternoon undoing work that never should have happened — not because the agent failed, but because I didn't constrain the problem well enough.

That is why I keep coming back to the same idea: **the result starts long before the output.** It starts in the direction.

---

## This Is Not Really About Prompting

A lot of people still call this prompting. I get it — that's the word we had. But honestly, the more I work this way, the less useful that word feels. Because what I'm doing most of the time does not feel like "prompting." It feels like designing work. It feels like taking something fuzzy and turning it into something delegable. It feels like deciding what context matters, what constraints matter, what should remain stable, what quality bar we're aiming for, and where the agent is likely to go wrong if I leave too much open.

Andrej Karpathy put it better than I could in a recent interview on No Priors: *"Code's not even the right verb anymore, right? But I have to express my will to my agents for 16 hours a day."* That line stuck with me. Express my will. Not "prompt." Not "chat." Express my will. That's what it actually feels like.

<iframe width="100%" style="aspect-ratio:16/9" loading="lazy" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/kwSVtQ7dziU?autoplay=1><img src=/images/blog/posts/the-art-of-directing-agents/karpathy-no-priors.webp alt='Andrej Karpathy on Code Agents, AutoResearch, and the Loopy Era of AI — No Priors interview'><span>&#x25BA;</span></a>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Andrej Karpathy on Code Agents, AutoResearch, and the Loopy Era of AI — No Priors interview"></iframe>

A good instruction is not just better phrasing. It's not a trick, and it's not a formula. A good instruction is usually a compressed form of structured thinking — what problem needs to be solved, what context matters, what constraints must be preserved, what should not be changed, what quality bar is expected, and when the agent should stop and ask instead of guessing. Anthropic's own [prompt engineering guidance](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) covers most of these dimensions — specifying context, constraints, and success criteria. But the label "prompting" still makes it sound like a writing exercise, when in practice it's closer to a systems design exercise.

That distinction matters, because when people reduce this to prompting, they make the work sound much lighter than it really is. The leverage is not in writing a prettier request. The leverage is in understanding the work deeply enough to define it well. Good delegation is not asking for work — it is defining work clearly enough that it can be executed correctly.

---

## The Gap Moved Upstream

There's a very seductive story in the air right now. It goes something like this: now that AI can code, everyone is closer to operating at the same level. The tools are getting so strong that expertise matters less. Access is flattening the playing field.

There is something real in that. The floor has absolutely risen. People who could not build before can now build. People who used to be blocked by implementation can now move. Designers, PMs, founders, marketers, operators — I've seen all of them get much closer to execution because agents close part of the gap. That part is real, and honestly, it's one of the most exciting things happening right now.

But I don't think it means the gap between people disappeared. I think it moved. It moved upstream, into the quality of direction.

A junior and an expert can sit in front of the same exact setup and still get radically different outcomes, because they are not really doing the same thing. They are not just "using AI." They are framing, scoping, constraining, and directing the work at very different levels. [METR's early-2025 AI developer productivity study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) found that experienced developers were sometimes 19% *slower* when given AI tools — a counterintuitive result that I know seems to contradict what I described in the [previous chapter](/blog/from-programmer-to-orchestrator/). I think they're measuring different things. That study tracked specific bounded tasks with clear acceptance criteria. The kind of open-ended orchestration work I described — spinning up parallel agents, architecting systems, making judgment calls — is a different game. But the finding stuck with me because it suggests that access to the tool alone doesn't produce the productivity gains. The directing skill matters as much as the tool.

Karpathy said something in the same interview that crystallized this for me: *"Everything feels like it's a skill issue. It's not that the capability is not there."* When the agent delivers something bad, the reflex is to blame the model. Sometimes that blame is fair. But more often than I'd like to admit, the problem was mine — the task was vague, the constraints were weak, or I left too much open for the agent to guess. The more experienced person is usually better at seeing the real problem behind the task, anticipating ambiguity before the agent hits it, preserving architectural intent, and knowing when a task is ready to delegate and when it still isn't.

I've seen tasks where the distance between a weak instruction and a strong one was not 10% better or worse — it was the difference between "this kind of works" and "this is solid enough to build on." The same model can look mediocre in one person's hands and remarkable in another's. Not because the model changed. Because the direction changed.

---

## Judgment Multipliers

One of the reasons this matters so much is that agents are real amplifiers. A well-directed agent can feel almost unfair. It moves fast. It stays coherent. It handles complexity better than you expected. It gives you leverage that, honestly, still feels surreal some days.

But a poorly directed agent can also move fast — and that's the problem. It can move fast in the wrong direction. It can confidently overbuild. It can solve the wrong problem cleanly. It can make assumptions you never wanted it to make. It can generate something polished on top of a bad understanding of the task. And when that happens, people often blame the model. Sometimes fairly. But a lot of what looks like model failure is actually direction failure — the task was vague, the context was incomplete, the boundaries were weak, and the agent was forced to guess too much. A lot of bad output is just badly framed work arriving quickly.

That's why I've started thinking of agents less as productivity multipliers and more as **judgment multipliers**. They multiply the upside of clarity. And they multiply the cost of confusion in equal measure. A well-directed task leads to sharper results, sharper review, higher-leverage work. A poorly directed task leads to rescue work — cleaning up ambiguity that should have been resolved earlier, correcting assumptions the agent should not have had to make, dragging the work back toward the real objective after it drifted.

The difference between these two experiences is one of the clearest signs that the real leverage starts earlier than most people think. It starts in the direction.

---

## Why Some People Get So Much More Out of AI

This is also why I'm careful when someone tells me they tried an agent, got mediocre results, spent too much time cleaning things up, and walked away thinking the whole thing was overhyped. I don't dismiss that experience. It's real, and it happens to people who are technically sharp and trying seriously. But when I ask a few questions — what did you ask it to do, how did you frame it, what context did you give it — the answer is almost always the same: the task wasn't defined well enough. Not wrong intentions. Just a gap in direction.

I've also learned that "using AI" is an incredibly broad phrase. Two people can say they're using coding agents and still be doing completely different things. The [Stack Overflow 2025 Developer Survey](https://survey.stackoverflow.co/2025/ai) shows exactly this: while 84% of developers use or plan to use AI tools, reported productivity gains vary wildly. Some developers report saving hours per day. Others report minimal impact or even frustration. Same tools. Different results.

One person is chatting with a model and hoping for useful output. The other is directing a system of delegated work with context, boundaries, standards, and intentionality. Of course those two experiences will feel different. That's why I don't think the long-term advantage will belong only to the people who have access to the best models. I think it will belong to the people who learn how to direct them well — the people who learn to frame problems clearly, define delegable tasks, provide enough context without drowning the system in noise, and review efficiently because the work was well-directed from the beginning.

---

## The Hidden Job

The hidden job of the AI era is not just reviewing what agents produce. It is knowing how to direct them — taking a messy problem and shaping it into something that can be delegated well. It is deciding what matters, what doesn't, what should be constrained, and what should remain flexible. It is knowing what context the agent needs, what quality should look like, where the risks are, and when the task is actually ready to hand off.

And the more I work this way, the more convinced I am that this is one of the defining shifts of the AI era. Not just that machines can now execute more of the work, but that human value is moving upstream into framing, judgment, delegation, and direction. Karpathy's *"express my will"* keeps echoing in my head. That's the job now. Not typing code. Not reviewing diffs. Expressing your will clearly enough that the machine can act on it — and having the judgment to know whether what came back is actually what you wanted.

That is the hidden job. And agents don't just make it possible — they make it unavoidable. Because the better the agents get, the more your judgment is the bottleneck, not your typing speed.

Let's keep building.

---

## Resources

- [Andrej Karpathy on Code Agents, AutoResearch, and the Loopy Era of AI](https://www.youtube.com/watch?v=kwSVtQ7dziU) — The No Priors interview where Karpathy describes "expressing his will" to agents and why everything feels like a skill issue
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Covers context, constraints, and success criteria design for working with Claude
- [METR: Early 2025 AI Dev Productivity Study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — The counterintuitive finding that experienced devs were 19% slower with AI tools
- [Stack Overflow Developer Survey 2025: AI](https://survey.stackoverflow.co/2025/ai) — 84% adoption but wildly varying reported impact — same tools, different results
- [METR: AI Task Time Horizons](https://metr.org/time-horizons/) — The "new Moore's Law" tracking how AI agent capabilities double every few months
