---
title: 'Building Software in an Emergency'
description: 'Within days there were more than twenty citizen aid tools. Why there were so many, what I learned building one of them, and what still keeps me up.'
pubDate: '2026-08-24'
tags: ['tech', 'civic-tech', 'colombia', 'ai-agents', 'mcp', 'web-development']
keywords: ['Colombia earthquake aid apps', 'civic tech emergency response', 'why so many emergency apps', 'building software in a disaster', 'public API without authentication', 'idempotency source externalId', 'MCP server for emergencies', 'missing persons data privacy', 'data freshness timestamps API', 'Cabuya interoperability protocol']
series: 'colombia-earthquake-2026'
seriesOrder: 2
draft: true
---

On the first night, the information problem looked like this.

A WhatsApp group with four hundred people. Someone posts that a supply point on Avenida 30 de Agosto needs water. Forty people forward it. Two hours later that place is full and has stopped taking donations, but the message is already in nine other groups and will keep circulating for two more days. In the same thread there's a voice note saying a bridge is about to fail. Nobody knows who recorded it. Everybody forwards it.

Meanwhile a woman is trying to find out whether the shelter closest to her mother is still taking people, and the most recent thing she can find is a screenshot of a list with no date on it.

That wasn't a failure of goodwill. There was goodwill to spare.

---

## What failed wasn't the goodwill

In the previous chapter I wrote that nearly half the region's cell network went down: **3,403 base stations out of service**, 46.1% of the ones checked across seven departments. It's worth repeating here because it's the constraint that shaped everything built that week.

When I say WhatsApp and spreadsheets don't scale in an emergency, I want to be precise. It isn't that people were using the wrong tool. It's that for the first few days, across much of the city, **there was no tool**. Information moved by radio, by paper taped to a wall, and because somebody walked to where you were and told you.

Everything that came after had to survive that.

---

## "Isn't this just another app?"

It's the obvious criticism, and it's reasonable enough to deserve a real answer instead of a defensive one.

There are now more than twenty aid tools for this emergency. Damage maps. Supply-point dashboards. Shelter directories. Missing-person matching. A classifieds board for lost pets. A community rental board. A municipal portal. Several overlap. Some were built by people who didn't know the others existed.

The skeptical reading is that this was ego: everyone wanted to build their own thing instead of contributing to someone else's, and the result is fragmentation dressed up as solidarity.

I've thought about it honestly and I don't think that's what happened, though I'll admit there's a version of the story where it is.

**Fragmentation isn't having many tools. It's having many tools that can't read each other.**

Look at what these things actually do. SismoVision takes photos of cracked walls and gives preliminary structural guidance. Alluda tracks what each supply point is short on, city by city. [Encontrados.co](https://encontrados.co/) lets a rescue worker photograph someone in their care and match them against missing-person reports. SOS Pereira is the city government running a census of affected business owners.

That's four different data models, four different users, four different update cycles and four different failure modes. A wall-crack reporting tool is not a supply-chain tool. A municipal census is not person-to-person aid. Asking one app to do all of it produces something that does none of it well and takes three months to build, and we didn't have three months.

Specialization was the right answer. What was missing wasn't consolidation. It was bridges.

What follows is what I learned building one of those bridges, in the order I ran into it, including the parts that still keep me up.

---

## The timestamp is the product

If I had to keep one design decision that separates a useful emergency tool from a harmful one, it's this: **does it tell the user when the information was last true?**

Everything operational in this emergency had a shelf life measured in hours. A supply point stops taking donations. A shelter fills up. A hospital reopens. A road clears. A building that looked fine in the morning took a magnitude 4.8 aftershock overnight.

The instinct when you're shipping fast is to render the data clean and move on. The right move is uglier: show the timestamp always, even when it embarrasses you. "Updated 6 hours ago" is more useful than a pretty card that implies a freshness it doesn't have. A polished list with no date is worse than an ugly one with a date, because the polished one is more convincing.

[Unidos por Pereira](https://unidosporpereira.com/) and [Pereira Ayuda](https://pereiraayuda.com/) got this right from day one. I noticed it before I copied it, which is its own small lesson.

The corollary is harder: if you can't refresh a dataset, say so, or take it down. A stale directory that looks alive sends someone across the city, in a week with no fuel and restricted traffic, to a closed door.

---

## What you shouldn't do, even when you can

This is the real tension and it doesn't resolve cleanly: ship fast versus do no harm.

The list of what a developer shouldn't do in an emergency turned out far more specific than I expected.

**Don't scrape personal data.** Missing-person listings are public in a specific context and for a specific purpose. Copying them into your own database because "it helps with matching" creates a permanent record nobody consented to.

**Don't publish private phone numbers**, even if someone posted theirs in a WhatsApp group. A group of four hundred is not the public internet.

**Don't promise what you can't sustain.** If your app implies someone will show up, someone has to actually show up.

**Don't invent trust rankings.** No lists of verified organizations, no badges, no ratings of relief agencies. You don't have the authority, and the police are already dealing with [people impersonating relief agencies and public officials](https://www.elcolombiano.com/colombia/terremoto-alerta-por-estafadores-policia-suplantacion-director-sanidad-damnificados-EG39953869).

**Don't put a button through to a channel you haven't verified today.**

The best counterexample in the whole ecosystem is [Encontrados.co](https://encontrados.co/), which I keep coming back to. Rescue workers photograph someone in their care, the system matches them against missing-person reports, and **the photo is deleted after the match**. The most valuable piece of data in the system is also the one that most needs to stop existing. They built the deletion in from the start, in a week, under pressure. That's the bar.

---

## The decision I'm least sure about

Corag documented a **public API with no authentication** during the emergency. Anyone can read the needs database and anyone can write to it. The reasoning was straightforward: friction is the enemy when other teams are trying to integrate at two in the morning, and an API key request process nobody is staffing is the same as having no API.

I think it was the right call for the first few weeks. It's also the one I'd defend worst in a calm room, and I'd rather write down the real trade-off than the brochure version.

**What you gain** is a base anyone can genuinely build on. Bots, dashboards, other apps and aggregators can read and write without asking permission or waiting on anyone.

**What you're exposed to** is spam, data poisoning, and someone flooding the map with fake needs to make a neighborhood look neglected. Nothing structurally prevents it. Every mitigation lives downstream, and downstream mitigations are the ones you build after something has already gone wrong.

**What I'd do differently, in the cold light:** leave reads open and put writes behind something cheap. Not an application form — something automatic, like a per-source token you can issue yourself that gets revoked when a source misbehaves. You keep the zero-friction property and gain traceability. I didn't push for that in week one because week one wasn't the week for it, and honestly I don't know whether that was good judgment or a rationalization.

---

## Idempotency, or the difference between integrating and duplicating

This one I'm sure about, and it's the least glamorous item on the list.

When five different clients can write the same need to the same database, you will end up with that need five times unless the API refuses. [Corag's public API](https://ayuda.corag.app/api/public/openapi.json) is idempotent by design: every write carries a `source` and an `externalId`, and that pair always resolves to the same record.

That's it. That's the whole mechanism. And it's the difference between a shared database and a landfill.

Without it, every integration makes the data worse. With it, an aggregator can resync every ten minutes without fear, and a team that went down for a day can replay everything it missed. If you're building something others will write to, this is the first thing to get right. On day one it costs almost nothing. On day thirty it costs a migration and a deduplication script.

---

## When the client isn't a person

Corag also exposes a [remote MCP server](https://ayuda.corag.app/mcp), with tools along the lines of *list emergencies*, *post a request*, *post an offer*.

If you haven't run into MCP yet, it's a protocol that lets an AI agent discover and call tools. Roughly what an OpenAPI spec does for a developer, except the consumer is a model rather than a person writing integration code.

Why it matters in an emergency has nothing to do with the buzzword. It has to do with the fact that the set of people who could usefully query a needs database is much larger than the set of people who can write an HTTP client. A volunteer coordinator with an agent can ask what's needed in Dosquebradas right now and get a real answer from the live database, without anyone building her a dashboard. A neighborhood WhatsApp bot can post a request without a developer wiring it up.

I'll be honest: this is the piece I'm most likely wrong about on impact. It's the newest and least proven thing on the list. But of everything we shipped, it's what made me think what's changing is the shape of civic software, not just its speed.

---

## Verification by corroboration, with a human closing

The best case of this I saw is [Gravitas](https://mapa.gravitasworld.com/), the platform a design studio in Risaralda rebuilt for the emergency in 42 hours.

Their rule, [as Juan Camilo Garzón described it to El Colombiano](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222): five people reporting the same supply point raises confidence far more than one lonely report that looks odd or unsupported. The AI narrows, an administrator confirms, and only then does it reach the map.

What I want to underline is the direction of the loop. The model isn't the one deciding. The model is the filter that makes human review manageable when 850 reports come in and there are four people.

Anyone building citizen reporting ends up at some version of this, usually after publishing something false. They got there in 42 hours.

---

## Design for a network that isn't there

If your app assumes a live connection, it doesn't work on the day that matters.

What that means concretely: small payloads, aggressive caching, a read-only offline state that's actually useful, no blocking on third-party scripts and — this is the part engineers struggle with — an answer to how this information reaches someone with no signal.

The honest answer for most of these tools, including the ones I worked on, is that it doesn't. It reaches someone who does have signal, who then walks over and tells them. Which is fine, as long as you design knowing that's the last hop, and don't build as if the phone in the shelter were the final destination.

---

## Don't rebuild what already exists

The strongest impulse in the first 48 hours is to build all of it yourself, because integrating with someone else's half-finished project feels slower than starting clean.

It isn't, and the math isn't close. Four teams building four supply maps produce four incomplete datasets and four confused user groups. One team building a map and three teams reading its API produce one dataset that improves every hour.

The proof is [AquíAyuda](https://www.aquiayuda.com/), which centralizes aid information for the whole country by aggregating other people's sources without inventing data of its own. That's the shape of the answer: not one app to rule them all, but a specialized layer that reads the others honestly and adds what none of them could do alone. It only works if the pieces underneath are legible, which is why the two entries in the whole ecosystem that encourage me most are the boring ones: [Pereira Responde](https://pereiraresponde.co/) publishes a documented API, and Corag publishes one with no authentication. You can build on an app with an API. An app without one is a dead end with a nice interface.

Two things came out of that conversation between teams. One is [corag.app/ecosystem](https://corag.app/ecosystem/), the directory where I've put most of my hours: six categories, each entry describing what the tool says about itself, linking to it, and noting whether we could confirm a public API. The other is [Cabuya](https://cabuya.org/), an open protocol so applications publish and read the same data without needing anyone's approval.

Two things about the directory I insisted on, and would insist on again.

**Listing is not endorsing.** The page says so explicitly. In an emergency where [the police keep warning about fake donation campaigns](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/), the last thing anyone needs is a self-appointed trust badge. Describing a tool is not vouching for it.

**"No confirmed API" means we couldn't confirm one, not that none exists.** Most of these teams are exhausted and shipping. Absence of documentation is not absence of capability, and writing it the other way would be a cheap shot at people doing the same work I am.

And here's what nobody has measured yet: how many supply-point entries are out of date right now, in any of these tools, including the ones I help maintain. Nobody has audited the overlap to see how many reports are duplicated across four maps because the same neighbor posted them in four places. I also don't know which of them will still be running in three months. An honest directory should say what it can't see, and none of them sees those three things.

---

## What AI actually did, and what it didn't

What everyone wants to talk about is that whole applications got built in hours. That happened. Gravitas was rebuilt in 42 hours by a studio that had been working on rural tourism. There are more than twenty tools that didn't exist three weeks ago. Part of that speed is unambiguously new.

Here's what I'd put next to it.

Nobody can prove any of this saved a life. Not Corag, not any of the others. The missing-person count [moved by hundreds of cases](https://www.eltiempo.com/colombia/otras-ciudades/balance-oficial-de-la-ungrd-tras-terremoto-de-magnitud-7-4-en-colombia-273-fallecidos-3-824-heridos-y-377-desaparecidos-3578196) in a few days, and I would love to claim a slice of that. I can't. The cross-referencing that produced that figure happened across hospitals, shelters, official registries, family networks and, somewhere in the mix, software. Untangling the contribution isn't possible, and pretending otherwise would be exactly the behavior this series argues against.

What AI clearly did do was shorten the distance between someone thinking of a tool and the tool existing. That's real and it's enormous. What it didn't do was decide what to build, decide what's true, or answer for a wrong answer. Those three stayed entirely with us, and this week made me think they'll stay longer than the current conversation assumes.

---

## Resources

- [corag.app/ecosystem — the directory of aid tools](https://corag.app/ecosystem/)
- [Cabuya — open protocol so aid apps can read each other](https://cabuya.org/)
- [Corag developer documentation](https://corag.app/developers)
- [Corag public OpenAPI specification](https://ayuda.corag.app/api/public/openapi.json)
- [Corag MCP server](https://ayuda.corag.app/mcp)
- [Pereira Responde API documentation](https://pereiraresponde.co/api/docs)
- [AquíAyuda — national supply-point aggregator](https://www.aquiayuda.com/)
- [Encontrados.co — report matching that deletes the photo after the match](https://encontrados.co/)
- [El Colombiano — how Gravitas verifies citizen reports](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222)
- [MinTIC communications contingency plan](https://laopinion.co/colombia/mintic-activa-plan-de-contingencia-para-garantizar-las-comunicaciones-tras-terremoto)
- [El País — nearly half the mobile antennas out of service](https://www.elpais.com.co/colombia/terremoto-en-colombia-casi-la-mitad-de-las-antenas-moviles-estan-fuera-de-servicio-estos-son-los-departamentos-mas-afectados-1143.html)
- [DPL News — telcos, government and platforms activate emergency measures](https://dplnews.com/terremoto-en-colombia-activan-medidas-emergencia/)
- [Colombian National Police — how to avoid donation scams](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/)

---

The uncomfortable summary is that the hard parts of this were never technical. Shipping was the easy part. Deciding what deserved to exist, what deserved to be deleted, and what we had no right to claim: that's where all the real work was.

Let's keep building. Carefully.
