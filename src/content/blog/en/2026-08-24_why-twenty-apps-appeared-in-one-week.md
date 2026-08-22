---
title: 'Why Twenty Apps Appeared in One Week'
description: 'Days after the earthquake there were more than twenty citizen-built aid apps. The problem was never too many tools. It was the absence of bridges between them.'
pubDate: '2026-08-24'
tags: ['tech', 'civic-tech', 'colombia', 'personal']
keywords: ['civic tech disaster response', 'aid apps Colombia earthquake', 'why so many emergency apps', 'data freshness emergency information', 'aggregating disaster data', 'WhatsApp coordination emergency', 'open data earthquake response']
series: 'colombia-earthquake-2026'
seriesOrder: 3
draft: true
---

The first night, the information problem looked like this.

A WhatsApp group with 400 people. Someone posts that a collection center on Avenida 30 de Agosto needs water. Forty people forward it. Two hours later that center is full and has stopped receiving anything, but the message is now in nine other groups and it will keep circulating for two more days. Somewhere in the same feed there's a voice note claiming a bridge is about to fail. Nobody knows who recorded it. Everybody forwards it.

Meanwhile a woman is trying to find out whether the shelter closest to her mother is still taking people, and the most recent thing she can find is a screenshot of a list that has no date on it.

That's not a failure of goodwill. There was no shortage of goodwill. It's a failure of infrastructure, and the infrastructure that failed wasn't only digital.

---

## The number that reframes everything

According to MinTIC, **more than 3,400 mobile base stations went out of service**. Across seven departments, 46.1% of the stations they reviewed were down.

Almost half the cell network in the affected region, gone, at the exact moment several million people needed to coordinate.

The ministry's response is worth reading as engineering: it temporarily opened radio spectrum, made interconnection between operators mandatory — so your call could exit through whichever network was still standing, regardless of who you paid — and made emergency-line calls free for users with no balance. The ANE and MinTIC also started evaluating a band for direct-to-device satellite connectivity, so compatible phones could talk to a satellite without any terrestrial network at all. [Starlink offered free service until September 12](https://www.semana.com/tecnologia/articulo/starlink-anuncia-internet-satelital-gratis-a-colombia-tras-el-devastador-terremoto-asi-puede-recibirlo/202612/) and shipped hardware to response agencies.

So when I say WhatsApp and spreadsheets don't scale in an emergency, I want to be precise about what I mean. It isn't that people were using the wrong tool. It's that for the first days, in a lot of the city, there *was* no tool. Information moved by radio, by paper taped to a wall, and by someone walking over to tell you.

Everything built in that first week had to survive that.

---

## "Isn't this just another app?"

This is the criticism, and it's fair enough that it deserves a real answer instead of a defensive one.

More than twenty aid tools now exist for this emergency. Damage maps. Collection-center dashboards. Shelter directories. Missing-person matching. A lost-pet classifieds board. A community rental board. A municipal portal. Several of them overlap. Some were built by people who didn't know the others existed.

The skeptical read is: this is ego. Everybody wanted to build their own thing instead of contributing to somebody else's, and the result is fragmentation dressed up as solidarity.

I've thought about it honestly and I don't think that's what happened, though I'll admit there's a version of the story where it is.

Here's what I actually think fragmentation means.

Fragmentation is not *many tools*. Fragmentation is **many tools that can't read each other**.

Consider what these things actually do:

- SismoVision takes photos of cracks in walls and gives preliminary structural guidance.
- Alluda tracks which collection centers are short on what, by city.
- Encontrados.co lets a rescue worker photograph someone in their care and match them against missing-person reports.
- SOS Pereira is the mayor's office running a census of affected businesses.

Those are four different data models, four different users, four different update cycles, and four different failure modes. A crack-reporting tool is not a supply-chain tool. A municipal census is not person-to-person aid. Asking one app to do all of it produces something that does none of it well and takes three months to build — and we didn't have three months.

Specialization was the correct response. What was missing wasn't consolidation. It was **bridges**.

---

## Freshness is the whole product

If I had to name the single design decision that separates a useful emergency tool from a harmful one, it's this: does it tell you *when* the information was last true?

A collection center's needs change in four hours. A shelter fills up. A hospital reopens. A road clears. In that environment, a polished list with no timestamp is worse than an ugly one with a timestamp, because the polished one is more convincing.

Some of the tools here got this right immediately. [Unidos por Pereira](https://unidosporpereira.com/) shows the last-update time on each section. [Pereira Ayuda](https://pereiraayuda.com/) dates its directory of shelters, donation points and open hospitals in Pereira and Dosquebradas.

That's not a small nicety. In a week where the official death toll was published four different ways on the same afternoon by four different entities — all of them honest, all of them cutting off at different hours — the timestamp *is* the trust mechanism.

---

## The aggregator that doesn't invent anything

If you want proof that the network effect works without anybody having to die, look at [AquíAyuda](https://www.aquiayuda.com/).

It centralizes earthquake aid information for the whole country: collection centers by municipality with what they need and what they already have, person-to-person help, everything sortable by proximity. And it does that by **aggregating other people's sources** — Ayudas Pereira, Corag, Pereira Responde, Pereira Unida — without inventing data of its own.

That's the shape of the answer. Not one app to rule them all. A specialized layer that reads the others honestly and adds the thing none of them could do alone: a national view.

It only works if the pieces underneath are readable. Which is why, of everything on this list, the two entries I find most encouraging are boring ones: [Pereira Responde](https://pereiraresponde.co/) publishes a documented public API, and Corag publishes an unauthenticated public API plus a remote MCP server. Not because APIs are exciting, but because an app with an API can be built on. An app without one is a dead end with a nice interface.

---

## The map of the network

A few days ago the people behind several of these tools sat down together. Not to merge — to stop stepping on each other. That conversation is the reason [corag.app/ecosystem](https://corag.app/ecosystem/) exists, and it's the thing I've been putting most of my own hours into.

It's a directory. Six categories: direct aid, damage reports, collection and logistics, pets, missing persons, and the municipal channel. Each entry describes what the tool says about itself, links to it, and notes whether we could confirm a public API. Inclusion is by form, reviewed by a person.

Two things about it that I insisted on, and that I'd insist on again:

**Listing is not endorsement.** The page says so explicitly. In an emergency where [the police have been warning about fake donation campaigns and people impersonating relief organizations](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/), the last thing anyone needs is a self-appointed trust badge. Describing a tool is not vouching for it, and pretending otherwise would make the directory part of the problem.

**"No API confirmed" means we couldn't confirm one, not that there isn't one.** Most of these teams are exhausted and shipping. Absence of documentation is not absence of capability, and writing it the other way would be a cheap shot at people doing the same work I'm doing.

The line at the top of the page is the one I'd keep if I had to throw out everything else: **No competimos. Nos alimentamos.** We don't compete. We feed each other.

---

## One more thing, and then I'll leave it

Something worth noticing without making it the point of the article: while the civic side was busy figuring out how to interoperate, the national response went through a public debate about the opposite — Colombia [initially restricted international rescue teams](https://es.wikipedia.org/wiki/Terremoto_de_Colombia_de_2026), from Mexico, China, El Salvador and UN OCHA, on the argument that domestic capability was sufficient. Ecuador's 47-person team was accepted; Mexican brigades came independently.

I don't have standing to judge that decision and I'm not going to try. I just find it hard to ignore that "should we let others help with this" was the live question at both ends of the response, and that the two ends answered it differently.

---

## Resources

- [corag.app/ecosystem — the directory of aid apps](https://corag.app/ecosystem/)
- [AquíAyuda — national aggregator of collection centers](https://www.aquiayuda.com/)
- [Pereira Responde — damage map with public API](https://pereiraresponde.co/)
- [DPL News — telcos, government and platforms activate emergency measures](https://dplnews.com/terremoto-en-colombia-activan-medidas-emergencia/)
- [El País — nearly half of mobile antennas out of service](https://www.elpais.com.co/colombia/terremoto-en-colombia-casi-la-mitad-de-las-antenas-moviles-estan-fuera-de-servicio-estos-son-los-departamentos-mas-afectados-1143.html)

---

Twenty tools is not the problem. Twenty tools that can't read each other is the problem, and it's a solvable one — it's the only part of this whole catastrophe that's fully in our hands.

Let's keep building.
