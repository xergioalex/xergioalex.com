---
title: 'Building Software in an Emergency'
description: 'Nine things I learned shipping aid software after the Colombia earthquake: expiring data, PII, an unauthenticated public API, and what I would do differently.'
pubDate: '2026-08-31'
tags: ['tech', 'civic-tech', 'ai-agents', 'mcp', 'web-development']
keywords: ['building software during a disaster', 'unauthenticated public API tradeoffs', 'idempotency source externalId', 'MCP server emergency response', 'PII missing persons privacy', 'offline first emergency app', 'data freshness timestamps API']
series: 'colombia-earthquake-2026'
seriesOrder: 4
draft: true
---

This is the article I've rewritten the most, because the honest version keeps being less flattering than the first draft.

The easy version goes: developers responded fast, AI let us build whole applications in hours, isn't that remarkable. All of that is true and I've said some of it already. But if the only thing I take away from this is that we were fast, I've learned nothing worth writing down.

So here are nine things, in the order I actually ran into them, including the ones I'm still not comfortable with.

---

## 1. Data expires, and pretending otherwise is the failure mode

Everything operational in this emergency had a shelf life measured in hours. A collection center stops receiving. A shelter fills. A hospital reopens. A road clears. A building that was safe yesterday got a 4.8 aftershock overnight.

The instinct when you're shipping fast is to render the data cleanly and move on. The correct move is uglier: **show the timestamp, always, even when it embarrasses you.** "Updated 6 hours ago" is more useful than a beautiful card that implies freshness it doesn't have.

[Unidos por Pereira](https://unidosporpereira.com/) and [Pereira Ayuda](https://pereiraayuda.com/) got this right from day one. I noticed it before I copied it, which is its own small lesson.

The corollary is harder: if you can't refresh a dataset, say so, or take it down. A stale directory that looks live sends somebody across a city, in a week with no fuel and restricted vehicle circulation, to a door that's closed.

---

## 2. Ship fast versus don't cause harm

This is the real tension and it doesn't resolve cleanly.

The list of things a developer should not do in an emergency turned out to be much more specific than I expected:

- **Don't scrape personal data.** Missing-person listings are public in a specific context for a specific purpose. Copying them into your own database because "it'll help matching" creates a permanent record nobody consented to.
- **Don't publish private phone numbers**, even when someone posted theirs in a WhatsApp group. A group of 400 is not the public internet.
- **Don't promise what you can't sustain.** If your app implies somebody is going to show up, somebody has to actually show up.
- **Don't invent trust rankings.** No "verified NGOs" list, no badges, no star ratings on relief organizations. You don't have the standing and the police are already dealing with [people impersonating relief organizations and government officials](https://www.elcolombiano.com/colombia/terremoto-alerta-por-estafadores-policia-suplantacion-director-sanidad-damnificados-EG39953869).
- **Don't add a CTA to a channel you haven't checked today.**

The best counterexample in this whole ecosystem is [Encontrados.co](https://encontrados.co/), which I keep coming back to. Rescue workers photograph someone in their care, the system matches against missing-person reports, and **the photo is deleted after the match**. The most valuable data in the system is also the data that most needs to stop existing. They built the delete step in from the start, in a week, under pressure. That's the bar.

---

## 3. The unauthenticated public API — the decision I'm least sure about

Corag documented a **public API with no authentication** during the emergency. Anyone can read the needs base and anyone can write to it. The reasoning was straightforward: friction is the enemy when other teams are trying to integrate at 2 a.m., and an API key process nobody staffs is the same as no API at all.

I think it was the right call for the first weeks. I also think it's the decision I'd defend least well in a calm room, and I want to write down the actual trade-off instead of the marketing version.

**What you get:** a base anyone can actually build on. Bots, dashboards, other PWAs and aggregators can read and write without asking permission or waiting on anybody. That's how you get [AquíAyuda](https://www.aquiayuda.com/) pulling from four sources.

**What you're exposed to:** spam, data poisoning, and someone flooding the map with fake needs to make a specific neighborhood look neglected. Nothing structurally stops that. The mitigations are all downstream — corroboration, human review, rate limiting — and downstream mitigations are the ones you build after something goes wrong.

**What I'd do differently, in cold blood:** keep reads open, put a cheap write path behind something. Not a key-request form — something automatic, like a per-source token you can self-issue and that gets revoked when a source misbehaves. Keep the zero-friction property, keep an audit trail. I didn't push for that in week one because week one was not the week for it, and I'm honestly not sure whether that was good judgment or a rationalization.

---

## 4. Idempotency is the difference between integrating and duplicating

This one I *am* sure about, and it's the least glamorous item on the list.

When five different clients can write the same need into the same base, you will get the same need five times unless the API refuses. Corag's public API is idempotent by design: a write carries a `source` and an `externalId`, and the same pair always resolves to the same record.

That's it. That's the whole mechanism. And it's the difference between a shared base and a landfill.

Without it, every integration makes the data worse. With it, an aggregator can re-sync every ten minutes without fear, and a team that goes offline for a day can replay everything they missed. If you're building anything that other people will write to, this is the first thing to get right and it costs almost nothing on day one. It costs a migration and a deduplication script on day thirty.

---

## 5. MCP, or: what happens when the client isn't a person

Corag also exposes a remote MCP server, with tools along the lines of *list emergencies*, *publish a request*, *publish an offer*.

If you haven't run into MCP yet: it's a protocol that lets an AI agent discover and call tools — roughly what an OpenAPI spec does for a developer, except the consumer is a model rather than a person writing integration code.

Why this matters in an emergency is not the buzzword. It's that the set of people who could usefully query the needs base is much larger than the set of people who can write an HTTP client. A volunteer coordinator with an agent can ask "what's needed in Dosquebradas right now" and get a real answer from the live base, without anybody building them a dashboard. A neighborhood WhatsApp bot can publish a request without a developer wiring it up.

I'll be honest that this is the piece where I'm most likely to be wrong about the impact. It's the newest and least proven thing on this list. But of everything we shipped, it's the one that made me think the shape of civic software is actually changing, and not just the speed of it.

---

## 6. Verification by corroboration, with a human closing it

I covered [Gravitas](https://mapa.gravitasworld.com/) in the previous article, but the pattern belongs here too because it's the reusable part.

Their rule, [as Juan Camilo Garzón described it to El Colombiano](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222): five people reporting the same collection center raises confidence far more than one report that looks unusual or unsupported. AI narrows, an administrator confirms, then it hits the map.

The thing I want to underline is the direction of the loop. The model is not the decider. The model is the filter that makes human review tractable when 850 reports arrive and you have four people.

Anybody who builds citizen reporting eventually arrives at some version of this, usually after publishing something false. They got there in 42 hours.

---

## 7. Design for a network that isn't there

**More than 3,400 mobile base stations out of service.** 46.1% of stations reviewed across seven departments. That's from MinTIC, and it's the constraint that should have shaped everything and mostly didn't.

If your app assumes a live connection, it doesn't work on the day it matters. What that implies, concretely: small payloads, aggressive caching, a usable read-only offline state, no blocking on third-party scripts, and — this is the part engineers resist — an answer to "how does this information reach someone with no signal at all?"

The honest answer for most of these tools, including the ones I worked on, is *it doesn't*. It reaches someone with signal who then walks over and tells them. Which is fine, as long as you design knowing that's the last hop, and don't build as if the phone in the shelter is the endpoint.

---

## 8. Don't rebuild the collection-center map

The strongest urge in the first 48 hours is to build the whole thing yourself, because integrating with someone else's half-finished project feels slower than starting clean.

It isn't, and the arithmetic isn't close. Four teams building four collection-center maps produce four incomplete datasets and four sets of confused users. One team building a map and three teams reading its API produce one dataset that gets better every hour.

The check I'd apply now, before writing a line: *does this already exist, and if so, does it have a way for me to read it?* If yes to both, build the thing on top. If yes to the first and no to the second, message the team — most of them will hand you a JSON endpoint if you ask, because they're not competing with you, they're exhausted.

---

## 9. What AI actually did, and what it didn't

The thing everybody wants to talk about is that whole applications got built in hours. That happened. [Gravitas was rebuilt in 42 hours](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222) by a studio that had been working on rural tourism. Twenty-plus tools exist that didn't exist three weeks ago. Some of that speed is unambiguously new, and I don't think anyone who lived through this week is going to be talked out of it.

Here's what I keep next to that.

Nobody can demonstrate that any of this saved a life. Not Corag, not any of the others. The missing-person count [dropped from 379 to 143](https://www.eltiempo.com/colombia/otras-ciudades/balance-oficial-de-la-ungrd-tras-terremoto-de-magnitud-7-4-en-colombia-273-fallecidos-3-824-heridos-y-377-desaparecidos-3578196) between August 13 and 15 — hundreds of people found — and I would love to claim a slice of that. I can't. The cross-referencing that produced it happened across hospitals, shelters, official registries, family networks and, somewhere in the mix, software. Untangling the contribution isn't possible and pretending otherwise would be exactly the behavior this series argues against.

What AI clearly did was collapse the distance between *someone has an idea for a tool* and *the tool exists*. That's real and it's enormous. What it didn't do is decide what to build, decide what's true, or take responsibility for a wrong answer. Those three stayed entirely with us, and the week made me think they're going to keep staying with us longer than the current conversation assumes.

---

## Resources

- [Corag developer documentation](https://corag.app/developers)
- [Corag public OpenAPI spec](https://ayuda.corag.app/api/public/openapi.json)
- [Corag MCP server](https://ayuda.corag.app/mcp)
- [Pereira Responde API docs](https://pereiraresponde.co/api/docs)
- [El Colombiano — how Gravitas verifies citizen reports](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222)
- [MinTIC contingency plan for communications](https://laopinion.co/colombia/mintic-activa-plan-de-contingencia-para-garantizar-las-comunicaciones-tras-terremoto)

---

The uncomfortable summary is that the hard parts of this were never technical. Shipping was easy. Deciding what deserved to exist, what deserved to be deleted, and what we had no right to claim — that's where all the actual work was.

Let's keep building. Carefully.
