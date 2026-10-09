---
title: "Make Something Agents Want"
description: "April made agents a customer class. Five months of receipts later the counterparty is real, the payment rails split, and the question outlived its category."
pubDate: "2026-10-05"
heroImage: "/images/blog/posts/make-something-agents-want/hero.webp"
heroLayout: "side-by-side"
tags: ["tech", "personal", "ai-agents", "cloudflare"]
keywords: ["make something agents want", "agents as customers Cloudflare", "YC software for agents", "AI agents first class users", "building software for AI agents", "Cloudflare Stripe agents protocol", "agent economy 2026"]
series: "working-with-agents"
seriesOrder: 9
draft: true
---

Something shifted in how the tech industry talks about AI agents, and you can see it concentrated in two declarations made days apart.

**April 27, 2026.** Y Combinator's account publishes a new category in its [Request for Startups](https://www.ycombinator.com/rfs) focused on *Software for Agents,* authored by [Aaron Epstein](https://www.ycombinator.com/people/aaron-epstein), a General Partner at the firm. The kicker reads: *"So if you're Making Something Agents Want, we'd love to hear from you."* As [a YC alum](/blog/how-we-got-into-y-combinator/), the original phrase — *Make something people want* — has been in my head for years. Seeing one word swapped in that exact sentence is the kind of thing you notice on the second reading. The kind of misspelling that's deliberate.

<figure>
  <img src="/images/blog/posts/make-something-agents-want/figure-yc-tweet.webp"
       alt="Screenshot of Aaron Epstein's Y Combinator post from April 27, 2026, titled 'Software for Agents,' arguing that the next trillion internet users will be AI agents."
       width="960"
       height="1058"
       loading="lazy" />
  <figcaption>Y Combinator, April 27, 2026 — Aaron Epstein opens the "Software for Agents" RFS. — <a href="https://x.com/ycombinator/status/2048834309994565832">Original post</a>.</figcaption>
</figure>

**April 28, 2026.** Cloudflare's account drops a line that struck many as wildly bold: *"Starting today, agents can now be Cloudflare customers."* Not "agents can use Cloudflare." Customers. The word doing the work in that sentence is the noun. And said that flatly — no hedging, no asterisks — it lands differently than it would have if anyone had tried to soften it.

<figure>
  <img src="/images/blog/posts/make-something-agents-want/figure-cloudflare-tweet.webp"
       alt="Screenshot of Cloudflare's April 28, 2026 tweet announcing that agents can create Cloudflare accounts, start paid subscriptions, register domains, and receive API tokens to deploy code."
       width="960"
       height="908"
       loading="lazy" />
  <figcaption>Cloudflare, April 28, 2026 — the first major infrastructure vendor to say it out loud. — <a href="https://x.com/Cloudflare/status/2049545195914498139">Original post</a>.</figcaption>
</figure>

Two declarations. Forty-eight hours apart. Either one would have been the lead story of its week. Together they marked a hinge. YC, the institution that has shaped startup methodology for two decades, telling founders to design for an audience that doesn't click. Cloudflare, one of the largest CDN and edge providers on the open web, declaring that audience can hold the contract.

That was the spring. Five months of receipts have piled up since, enough to test whether the hinge actually turned. It did — though not in the direction anyone expected. Including me.

The internet noticed. And the internet, being the internet, also got a few things slightly wrong.

---

## Before going further, one clarification

There were two readings of these events that spread fast and need to be corrected before the rest of the post makes sense. There's also a third mistake, subtler than either, that the first draft of this post made too.

**Reading one: "YC changed its motto."** It didn't. [yc.com](https://www.ycombinator.com/) says "Make something people want" at the bottom of the page. The new line (*"Making Something Agents Want"*) is an RFS closer. A campaign echo. Aaron Epstein wrote it as the kicker for a wishlist of startups he wants to see, deliberately inverting the canonical motto to make a point. That's a thesis-level signal. It's just not a rebrand. It's YC saying *the methodology applies — but the audience just expanded.*

**Reading two: "Cloudflare did this alone."** It didn't. The [Cloudflare blog post](https://blog.cloudflare.com/agents-stripe-projects/) makes it clear within three paragraphs that this is a co-launch, in Cloudflare's own words: *"a new protocol that we've co-designed with Stripe as part of the launch of Stripe Projects."* Stripe's side of the week shipped a day earlier at [Sessions 2026](https://stripe.com/blog/everything-we-announced-at-sessions-2026), where the payments stack went on stage: Shared Payment Tokens, an agent wallet inside Link, and a new open spec called the Machine Payments Protocol, co-authored by Stripe and a payments startup called Tempo.

**The third mistake is the one I made.** Somewhere in the wave of coverage, Cloudflare's unnamed protocol and Stripe's MPP collapsed into a single story: Cloudflare and Stripe "launched MPP together." I repeated that version almost word for word in the first draft of this post. It's wrong in a way that matters. Cloudflare's post never uses the term MPP; its protocol has three named parts (Discovery, Authorization, Payment) and no brand of its own. The MPP is the Stripe-and-Tempo spec, and by September its core payment-authorization layer was being renewed as an [individual draft at the IETF](https://datatracker.ietf.org/doc/draft-ryan-httpauth-payment/). Even PlanetScale, which the launch post name-drops, turns out to be an earlier integration (Postgres databases provisioned from inside Cloudflare), not a passenger on the new rail.

So the accurate framing is: Cloudflare and Stripe co-designed a protocol that lets an agent prove who its human is, get billed without ever touching the human's card number, and end up holding a fresh cloud account in its own session. Stripe spent the same week publishing the payments spec it co-authors. Two moves, one direction.

All of it matters for the rest of the post, because the smaller, more accurate version of the story is the more interesting one — and because the difference between those two protocols turned out to be the story of the summer.

---

## What happens when the customer isn't you

[The agent economy](/blog/the-agent-economy/) post I wrote in March tracked how agents got money: Stripe SPTs, Visa Intelligent Commerce, Mastercard, Ramp Agent Cards, Coinbase agentic wallets, x402. The framing was *agents as economic actors.* That story was about whether agents could pay.

This is a different story. This one is about whether agents can be the **counterparty.** Not the consumer at the till, but the name on the contract. Not the wallet being charged, but the account being billed.

Look at what Cloudflare unbundled. Five things that every legitimate customer has, taken apart and rebuilt for a non-human party:

| Primitive | What it used to mean | What it means for agents |
|-----------|---------------------|-------------------|
| Account | A person fills a signup form | An agent gets provisioned via OAuth flow, with Stripe attesting to the human behind it |
| Identity | A login, an email, an MFA device | A signed delegation chain — *who* you're acting on behalf of, with what limits |
| Billing | A credit card you charge | A Shared Payment Token scoped by seller, amount and time, with spend the human approves |
| Contract | Terms of Service a human accepts | An on-protocol scope agreement the deploying party signs |
| Support | Docs, chat, escalation paths | Machine-readable error responses, `.well-known/` endpoints, API contracts agents can parse |

None of those primitives is new on its own. OAuth is from 2010. Virtual cards have been around for years. The interesting part is that they're being **composed for a counterparty that isn't human** — and the composition is what's new.

I keep coming back to one quote from the Cloudflare post: *"Similar to how the OAuth standard made it possible to delegate access to your account to other platforms, the protocol uses OAuth and extends further into payments and account creation, doing so in a way that treats agents as a first-class concern."*

First-class concern. That's the phrase to sit with. For 20 years, agents (bots, scripts, crawlers) were second-class. They got rate-limited. They got CAPTCHA'd. They got banned from buying tickets on Ticketmaster. The signup form was a moat, not a feature. Now the signup form is being rebuilt so the bot can use it intentionally.

That was the theory, anyway. What the theory needed was a counterparty that actually shows up.

---

## What Paul Graham actually said

The phrase "Make something people want" comes from an essay Paul Graham published in April 2008 called ["Be Good"](https://paulgraham.com/good.html). The relevant line is the second paragraph:

> *"About a month after we started Y Combinator we came up with the phrase that became our motto: 'Make something people want.' We've learned a lot since then, but if I were choosing now that's still the one I'd pick."*

YC was three years old when PG wrote that. The phrase has outlasted three economic cycles. It's outlasted the iPhone's first decade, the rise and fall of crypto twice, the entire SaaS era. The reason it's outlasted everything is that it's almost impossible to argue with. *Want* is a measurable thing. Wanting is the only thing the market rewards.

Honestly, I think of that sentence every time I look at a new product idea. Including this site you're reading. Including DailyBot.

Inverting the noun isn't trivial. Agents don't *want* the way humans want. They don't have boredom, status anxiety, a circle of friends to impress. What they have is goals, given to them by a human, and a context window, and the patience of a process. If the YC line means anything, it means: build the thing that makes that loop faster. Build the thing the agent picks because picking it gets the human's goal closer.

That's a narrower definition of *want* than PG's original. It's also a falsifiable one. Either the agent picks your API or it doesn't.

Five months later, the falsifiable version of the thesis has receipts. So let's look at them.

---

## Five months of receipts

Start with the number that stopped me cold. In June, [Stripe reported](https://stripe.com/blog/stripe-projects-adds-new-agents-providers-developer-controls) that agent traffic to its documentation "now makes up nearly 40% of docs traffic" after growing more than 10x in 2025, and that 70% of CLI requests for API resources come from agents. Seven in ten API-resource requests through their CLI are not a person typing. Stripe Projects, the provisioning surface behind the April launch, grew to 49 providers by mid-June, with coding agents like Warp, Factory's Droids and Nous Research's Hermes consuming it natively. The same update added per-provider spend caps and named environments where agents default to development. Controls like those only make sense when the customer base really is non-human.

But the part nobody predicted is where the counterparty showed up first: at the API, as a micropayer. The x402 protocol — the stablecoin-over-HTTP rail [the agent economy chapter](/blog/the-agent-economy/) tracked when it was crossing 50 million cumulative transactions — was clocking [75.41 million transactions and $24.24 million in a trailing 30 days](https://x402.org) by late August. Run the division: the average ticket is about 32 cents. Inference. Web search. PDF conversion. Ceramic.ai's founder Anna Patterson, whose search API sells to agents through Cloudflare's gateway, [put the shape of it in one line](https://blog.cloudflare.com/monetization-gateway-beta/): *"Search is one of the first things every agent needs, so it should be one of the first things an agent can buy."*

The consumer side is real but younger. In late September, [Stripe said](https://stripe.com/blog/helping-personal-agents-shop-more-intelligently-and-reliably-with-link) agentic purchases through Link's agent wallet grew 38x in a month, with Meta's Muse, Grok Bot and Instinct plugging in. Thirty-eight times off a small base (the honest reading of that number), but the direction is not subtle.

The second thing the summer did was split the payment rails, along almost exactly the seam the [agent economy chapter](/blog/the-agent-economy/) drew between fiat and crypto. Stripe pushed its spec: the [MPP repository](https://github.com/tempoxyz/mpp-specs) spent the summer landing subscription intents and payment methods across chains from Solana to XRPL, and the core draft [moved toward the IETF](https://datatracker.ietf.org/doc/draft-ryan-httpauth-payment/). Cloudflare went the other way. In July it announced the [Monetization Gateway](https://blog.cloudflare.com/monetization-gateway/), a paywall for agents settling in stablecoins over x402, built with a coalition of more than 25 companies through the x402 Foundation, the Linux Foundation home the Coinbase-born protocol received that same month. By the [September 30 closed beta](https://blog.cloudflare.com/monetization-gateway-beta/), sellers could put a price on "anything that passes through us" — per request, per query, per token — with Cloudflare itself as the first customer, selling pay-per-inference through its own AI Gateway.

And buried in that beta post is the sentence that reorganizes this whole story. Thousands of sellers joined the waitlist, and the most common thing they asked for was to **"charge agents, not humans."** Read that back against April. In April, the question was whether an agent could be a customer. By October, the louder question, asked from the other side of the counter, was whether the web could bill the agent. Same protocol plumbing, inverted incentive.

The traffic numbers explain the urgency. Cloudflare measured [AI-agent requests up 1,700% year over year](https://blog.cloudflare.com/agentic-web) and reported that in 2026, for the first time, more than half of Internet traffic wasn't human. Human traffic in heavily crawled categories (retail, software, IT, finance) declined as much as 40% in under a year. When most of your readers are programs, "who pays for the fetch" stops being a hypothetical.

One detail keeps the split from becoming a war story: the x402 Foundation's own roster includes Cloudflare *and* Stripe, along with AWS and Vercel. The companies are hedging across both rails. The ideological version of this story — fiat versus crypto, incumbent versus insurgent — keeps failing to survive contact with the shipping calendar.

---

## Who pays for the mistakes

I don't want to write a hype piece. The framing has problems, and the skeptics are right to push on them.

The cleanest critique I've found is from [Cooley LLP](https://www.cooley.com/news/insight/2026/2026-03-26-ai-agents-and-consumer-law-what-businesses-need-to-know), a law firm whose AI-and-consumer-law team published a piece in March making one point with unusual clarity: *"The fact that it is an AI agent, rather than a human, performing these functions does not diminish the business's obligations under consumer protection law."* Translation: calling the agent a "customer" doesn't move liability anywhere new. If your agent buys the wrong domain, signs up for the wrong plan, or breaches consumer rules at scale, the company that deployed the agent is on the hook.

And agents do break at scale. They don't make one mistake. They make ten thousand. The Cooley team flagged a guidance update from the UK's Competition and Markets Authority (CMA), dated March 9, 2026, that already codifies this: scale doesn't excuse, it aggravates.

Then there's the abuse vector. The [top comment](https://news.ycombinator.com/item?id=48031684) on the Hacker News thread about Cloudflare's launch is a single sentence: *"Perfect for spammers, scammers and domain squatters, who can now automate their activities even more."* One line and it lands, because the same plumbing that lets a legitimate agent spin up a deploy in seconds lets a hostile one spin up thousands in the same window. Cloudflare profits from selling the rails *and* from selling the abuse defenses on top of those rails. That's not new. But it does scale.

I don't have a clean answer to either critique. I think the Cooley framing is correct: liability stays with the deploying party, and the new infrastructure makes it cheaper to be liable for a lot of things at once. The right response is probably tighter agent scopes, hard spend caps, audit trails everyone in the loop can read, and a much stricter posture on what an unattended agent is allowed to do.

What changed since April is that nobody is waiting for the law to force any of this. Link's agent wallet runs on spending approvals. Stripe's Sessions keynote previewed guardrails: agent identities, scope rules, approval flows. By June, Stripe Projects had per-provider caps and environments where agents default to development. The infrastructure is being built careful, one layer ahead of the liability question.

The regulators, for their part, mostly held the spring line. The CMA guidance stayed operative and unsuperseded through the summer, and the UK's answer to "who is liable" has not moved: the deployer. The one binding change came from Brussels. On August 2, the transparency article of the [EU AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) became enforceable: AI interactions must be disclosed, synthetic content marked. That's a disclosure floor under agentic commerce, not a liability regime. Who eats a bad agent purchase, and through which chargeback lane, remained an open negotiation at the card networks.

And here's the finding that surprised me most. I went looking for the first agent-shopping disaster — the runaway cart, the fraud wave, the chargeback war — and found none. The year's actual rogue-agent stories were security incidents, not shopping sprees. What the data shows instead is a trust gap. Visa's [Trust Index for agentic commerce](https://investor.visa.com/news/news-details/2026/New-Visa-Research-Finds-Consumer-Trust-is-Accelerating-the-Path-to-Agentic-Commerce/default.aspx), published in September, found 72% of consumers have used an AI assistant, but only 23% trust generative AI to handle payment transactions on their behalf. The same respondents named Visa the most trusted brand for AI-powered payments, at 61%. The rails work. The receipts exist. The bottleneck is whether humans trust the thing holding the receipt.

---

## Why it won't come from incumbents: a correction

Aaron Epstein's tweet ends with a sentence that I keep underlining: *"...that won't come from incumbents."*

I believed the April version of that argument. The October version needs a correction, and the correction is more interesting than the original.

The incumbents (Salesforce, SAP, Workday, Oracle, the seat-priced enterprise stack) have three drags that compound. Their UI is built around dropdowns and dashboards optimized for humans clicking. Their pricing is per-seat, which falls apart the moment the seat is an agent that runs 10,000 actions per day for one human. Their brand equity is built on training, certifications, conferences full of humans in branded lanyards. Rebuilding any one of those three for an agent-first audience is an architectural change. Rebuilding all three is a different company.

It's not impossible. Microsoft has been retrofitting Copilot into Office at speed. Stripe has shown that an old-line payments company can publish a new protocol in months. But the friction is real, and the friction is asymmetric. A newcomer doesn't have legacy UI to deprecate. A newcomer doesn't have tens of thousands of enterprise contracts to migrate off per-seat pricing. A newcomer can just ship the API-first version and call it the product.

Then the summer happened, and the drags turned out to be negotiable — at least for the companies that could reprice. Salesforce, the first name on my own list, moved hardest: in June it [announced](https://www.salesforce.com/news/stories/agentforce-help-agent-announcement/) Agentforce's Help Agent with pay-per-resolution pricing (you pay when the issue is resolved, not when the seat is occupied) and reported the agent resolving 70% of the 4.3 million inquiries that hit its own help site. SAP [put Anthropic's Claude](https://news.sap.com/2026/05/sap-anthropic-to-bring-claude-sap-business-ai-platform) to work inside the Joule agents that run its HR and supply-chain surface. Workday [shipped](https://newsroom.workday.com/2026-06-02-Workday-Launches-New-Tools-for-Developers-to-Build,-Connect,-and-Verify-AI-Agents-For-HR,-Finance,-and-IT) a Developer Agent and an Agent Passport to verify every agent operating in a tenant. Microsoft kept expanding [Copilot Checkout](https://about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents) through merchant networks. The seat didn't hold. The incumbents priced around it.

The cleanest version of the redrawn line comes from Cloudflare — an incumbent by any measure of network share — in its August Agents Week manifesto, ["The Agentic Internet"](https://blog.cloudflare.com/the-agentic-internet): *"Seat-based models do not work when the user is a program."*

So the dividing line isn't incumbent versus startup. It's whether your value can be exposed as something an agent calls, and priced by what the call does: a resolution, a request, a query, a token. Salesforce can sell a resolution. SAP can sell an API call into ERP. What doesn't repackage is the deeper stack: software whose value *is* the dashboard, the certification programs, the multi-year contracts priced per human. Those drags are real. They're just not the ones I pointed at in April.

[The Next Web's read](https://thenextweb.com/news/yc-summer-2026-rfs-hard-tech-pivot) on the YC RFS made the same point in a sentence I keep coming back to: *"Software is now the substrate, not the moat. The models are commoditising. The infrastructure is scaling."* If software is the substrate, the moat moves up the stack: to the agent-shaped interface and to whoever lands the protocol first. Cloudflare's manifesto gives that territory four names — the agent-facing web has to be *readable, discoverable, callable,* and *payable* — which is as good a map of where the new companies show up as anything YC published.

The post I wrote in April on [Cloudflare's Agents Week](/blog/cloudflare-agents-week-2026/) tracked the full Cloudflare infrastructure push — sandboxes, browsers, mail, identity. What's different this time isn't the *infrastructure.* The infrastructure was already there. What's different is the *relationship.* The infrastructure comes backed by the proposition that the agent holds the account, not just uses it.

---

## What I'm changing in my own work

Specifics, not abstractions. Here's what I've actually changed since these two posts went up.

**On this site.** Earlier in 2026 I shipped [Markdown for Agents](/blog/aeo-markdown-for-agents/) — every HTML page on xergioalex.com has a matching `.md` endpoint. The week it shipped I ran [isitagentready.com](https://isitagentready.com/) against the site. Got a 33/100: content was the only category at full marks; everything else (discoverability, bot access control, the `.well-known/` family) was the work that remained. Since then the scorecard itself has grown to 21 checks across five categories, including a commerce category that didn't exist in the spring, which scores x402 and MPP readiness. The goalposts moved. So did the field: Cloudflare's [Radar scan](https://blog.cloudflare.com/agent-readiness) of roughly 200,000 top domains found 78% with a robots.txt but only 4% with content signals, and fewer than 15 sites publishing MCP server cards. Almost nobody is agent-ready. My 33 sits somewhere near the web's median, which is either comforting or alarming depending on the hour. I'm still working through the list, and I'll write it up when I cross 80 — against the new scorecard, not the old one.

**On the agent stack I use for client work.** I run a small set of private MCP servers — for repository search, for client document retrieval, for a couple of internal data pipelines. After the Cloudflare announcement I went back through them and added two things I'd been deferring: stricter scopes per consumer (so a coding agent literally cannot call the billing tool) and hard daily spend caps tied to the agent identity. Both took an afternoon. Both should have been there from the start. Cooley's piece pushed me.

**On DailyBot.** I won't write the long version here — that's a separate post, and not mine alone to write — but the conversation inside the team about agent-first interfaces has changed shape since these two announcements. We were already a YC S21 company building for human + agent collaboration. The question has narrowed: what does the *agent's* experience of our product feel like, and which surfaces should expose that experience as the default?

I think a lot of teams are having a version of this conversation. I think most of them are calibrating it as a feature roadmap question when it's closer to a positioning question.

The simpler way I'd put it: a year ago, the question was *can my product work with agents.* This year it's *would a working agent choose my product.*

---

## Closing

*Make something people want* didn't get retired. It got generalized. PG's sentence was written when "users" meant humans clicking. Twenty years later it means something fuzzier: partly humans, partly the agents acting for them, increasingly the agents acting on their own goals inside scopes humans set. The methodology applies. The audience expanded.

The category did retire, though. The [Fall 2026 RFS](https://www.ycombinator.com/rfs) dropped "Software for Agents" after a single cycle. Thirteen categories, none of them this one. Aaron Epstein's name sits on a different essay, "Multiplayer AI." One of the new categories is the mirror image: "Proving You're Human." The thesis didn't die; it dissolved into everything else. A question that outlives the category that asked for it was never a category question.

If you're building, the question Aaron Epstein wrote into the RFS is the one to sit with. Not as a slogan. As a forcing function. *Would a working agent pick this?* If the answer is "yes, eventually, after we redesign the UI," the answer is no. The agent is already deciding. The redesign is the work.

Let's keep building.

---

## Resources

- [Cloudflare — agents can create Cloudflare accounts, buy domains, and deploy](https://blog.cloudflare.com/agents-stripe-projects/) — the launch post, co-authored by Sid Chatterjee and Brendan Irvine-Broque, with the architecture of the Stripe-co-designed protocol.
- [Cloudflare tweet announcing the launch](https://x.com/Cloudflare/status/2049545195914498139) — the line that opened the framing.
- [Stripe — Everything we announced at Sessions 2026](https://stripe.com/blog/everything-we-announced-at-sessions-2026) — Stripe Projects, Shared Payment Tokens, and the Machine Payments Protocol from the Stripe side.
- [Stripe — Stripe Projects adds new providers and agent controls](https://stripe.com/blog/stripe-projects-adds-new-agents-providers-developer-controls) — the June update: 49 providers, 40% of docs traffic, 70% of CLI requests.
- [Stripe — Link for personal agents](https://stripe.com/blog/helping-personal-agents-shop-more-intelligently-and-reliably-with-link) — the September Link numbers: 38x monthly growth, Muse, Grok Bot, Instinct.
- [Machine Payments Protocol spec repository](https://github.com/tempoxyz/mpp-specs) — the Stripe-and-Tempo payment spec in active development.
- [Cloudflare — Monetization Gateway](https://blog.cloudflare.com/monetization-gateway/) — the July announcement: x402 settlement, 25-company coalition.
- [Cloudflare — Monetization Gateway beta](https://blog.cloudflare.com/monetization-gateway-beta/) — the September 30 beta: pricing at the edge, "charge agents, not humans."
- [Cloudflare — The agentic web](https://blog.cloudflare.com/agentic-web) — Birthday Week: 1,700% agent growth, half of traffic non-human, Pay Per Use.
- [Cloudflare — The Agentic Internet](https://blog.cloudflare.com/the-agentic-internet) — the Agents Week manifesto: readable, discoverable, callable, payable.
- [Cloudflare — Agent Readiness](https://blog.cloudflare.com/agent-readiness) — the Radar scan of how much of the web agents can use.
- [x402](https://x402.org) — the protocol dashboard: live transaction and volume counts.
- [Y Combinator — Fall 2026 Requests for Startups](https://www.ycombinator.com/rfs) — the fall 2026 edition; "Software for Agents" is gone.
- [Y Combinator tweet — Aaron Epstein](https://x.com/ycombinator/status/2048834309994565832) — the post that opened the framing.
- [Aaron Epstein at Y Combinator](https://www.ycombinator.com/people/aaron-epstein) — author profile.
- [Paul Graham — "Be Good"](https://paulgraham.com/good.html) — the canonical written source for "Make something people want."
- [Salesforce — Agentforce Help Agent announcement](https://www.salesforce.com/news/stories/agentforce-help-agent-announcement/) — pay-per-resolution pricing and the 70%-of-4.3M number.
- [SAP — Claude on the SAP Business AI platform](https://news.sap.com/2026/05/sap-anthropic-to-bring-claude-sap-business-ai-platform) — an incumbent putting a frontier model under its agents.
- [Workday — tools to build, connect and verify AI agents](https://newsroom.workday.com/2026-06-02-Workday-Launches-New-Tools-for-Developers-to-Build,-Connect,-and-Verify-AI-Agents-For-HR,-Finance,-and-IT) — Developer Agent and Agent Passport.
- [Microsoft — Copilot Checkout and brand agents](https://about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents) — checkout inside the assistant.
- [Cooley LLP — AI Agents and Consumer Law](https://www.cooley.com/news/insight/2026/2026-03-26-ai-agents-and-consumer-law-what-businesses-need-to-know) — the consumer-protection critique of the agents-as-customers framing.
- [EU AI Act — the regulatory framework](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) — the transparency article, enforceable since August 2.
- [Visa — Trust Index for agentic commerce](https://investor.visa.com/news/news-details/2026/New-Visa-Research-Finds-Consumer-Trust-is-Accelerating-the-Path-to-Agentic-Commerce/default.aspx) — 72% have used an AI assistant, 23% trust it with payments.
- [InfoQ — Cloudflare and Stripe ship agent commerce](https://www.infoq.com/news/2026/05/cloudflare-stripe-agent-commerce/) — Steef-Jan Wiggers on the production-grade implementation and its open risks.
- [TechCrunch — Stripe Link for AI agents](https://techcrunch.com/2026/04/30/stripe-link-digital-wallet-ai-agents-shopping/) — Sarah Perez on the consumer side of the same architecture.
- [The Next Web — YC Summer 2026 RFS hard-tech pivot](https://thenextweb.com/news/yc-summer-2026-rfs-hard-tech-pivot) — Cristian Dina on what the new RFS signals about defensibility.
- [Hacker News thread on the Cloudflare announcement](https://news.ycombinator.com/item?id=48031684) — including the spam/automation critique.
