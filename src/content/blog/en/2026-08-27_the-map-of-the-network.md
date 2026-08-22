---
title: 'The Map of the Network'
description: 'A tour of the twenty citizen-built tools responding to the Colombia earthquake, category by category. A description of what exists, not a ranking.'
pubDate: '2026-08-27'
tags: ['tech', 'civic-tech', 'colombia', 'web-development']
keywords: ['aid apps directory Colombia earthquake', 'Pereira Responde API', 'Gravitas map Colombia', 'Encontrados.co missing persons', 'AquíAyuda collection centers', 'civic tech tools disaster', 'open source emergency platforms']
series: 'colombia-earthquake-2026'
seriesOrder: 4
draft: true
---

Before anything else, the framing, because it changes how you should read every paragraph below.

**This is a description, not a ranking.** Every summary here comes from what each tool says about itself on its own public site. I have not audited anybody's code, uptime, data quality or governance. Nobody is being certified. Nobody is being recommended over anybody else.

**Listing is not endorsement.** [The directory this article is based on](https://corag.app/ecosystem/) says so on the page itself, and I want it repeated here, because the police have been [warning about fake donation campaigns and people impersonating relief organizations](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/) since the first week. A self-appointed trust badge would make this worse, not better.

**"No public API confirmed" means exactly that.** It means I couldn't find documentation. Most of these teams are running on no sleep. Absence of docs is not absence of capability.

**No personal data appears here.** Some of these tools handle missing-person reports. I describe the tool. I never describe a case.

With that out of the way.

---

## Direct aid and matching

Tools where a person publishes a need or an offer and the system tries to connect them.

**[Corag Ayuda Directa](https://ayuda.corag.app)** — live map of requests and available people. You publish a need or an offer with consented contact details, and deliveries get tracked with public evidence. It documents an unauthenticated public API and a remote MCP server. This is the one I've been contributing to, which is why I'm going to spend the next article picking apart its technical decisions rather than praising them here.

**[Pereira Unida](https://pereiraunida.com/)** — citizen aid coordination for Pereira and Dosquebradas: food, tools, medicine, volunteering, family networks, collection points.

**[SOS Terremoto](https://conectando-ayudas-colombia.com/)** — a shared board for posting and picking up aid requests.

**[Help Them Directly](https://helpthemdirectly.org/en/)** — a voluntary directory connecting donors with families raising funds for themselves. Its main campaign is the 2026 Venezuela earthquake, with a Colombia form alongside it. Important detail, stated by the site itself: **it does not handle money.** Families run their own channels.

---

## Damage and reports

The largest category, which makes sense — after an earthquake, the first question everybody has is *is this building safe*.

**[Pereira Responde](https://pereiraresponde.co/)** — a citizen map of infrastructure damage in Pereira: buildings, roads, support points. Up to three photos per report, plus shortcuts to nearby collection and shelter points. It publishes a **documented public API** at `/api/docs`, which puts it in a very small club.

**[SismoVision](https://sismovision.com/)** — citizen reports of structural damage, specifically cracks, with preliminary guidance. The site is explicit that this does not replace a professional inspection, and that framing matters: the gap between "a tool told me my wall is probably fine" and "an engineer certified my building" is where people get hurt.

**[Mapa del terremoto](https://www.mapadelterremoto.com/)** — an open map of damage from the August 10 earthquake: damage points, shelters and collection sites across several cities.

**[Reporte CO](https://co.crafter.run/)** — an open, privacy-by-design platform mapping damage, trapped or injured people, shelters and service outages.

**[Terremoto Colombia](https://terremotocolombia.co/)** — reports, damage map, and links out to official sources. It describes itself as a free, open-source citizen platform for connecting reports, resources and response teams, and as an independent, non-partisan initiative.

**[Gravitas](https://mapa.gravitasworld.com/)** — real-time citizen mapping of buildings, collection centers and logistics. More on this one below.

---

## Collection and logistics

Where the physical stuff is, what it needs, and how to move it.

**[AquíAyuda](https://www.aquiayuda.com/)** — a national hub: collection centers by municipality showing what's short and what's covered, person-to-person help, sortable by proximity. It **aggregates other sources** (Ayudas Pereira, Corag, Pereira Responde, Pereira Unida) without inventing data.

**[Acopio / Ayudas Pereira](https://alluda.online/)** — collection centers by city, with visibility into shortages and surpluses, plus registration for volunteers and transporters.

**[Unidos por Pereira](https://unidosporpereira.com/)** — shelters, collection, meals, aid and pets, organized by theme, each with a last-updated time.

**[Pereira Ayuda](https://pereiraayuda.com/)** — a dated directory of shelters, donation points and open hospitals in Pereira and Dosquebradas.

**[ayuda.red](https://ayuda.red/)** — map of aid infrastructure plus a missing-persons registry, donation channels and official guides.

**[Mapa de Ayuda — Gogó](https://soygogo.com/pereira-ayuda)** — aid points across Pereira.

**[PereiraVive](https://pereiravive.com/)** — and this one deserves more attention than it's getting.

It's a free community rental board for Pereira and nearby municipalities. You can search for housing, publish a listing, photograph a "se arrienda" sign you spotted on the street and post it — and **report price gouging**. No account required.

Think about what that last feature means. Somewhere between forty thousand and one hundred forty thousand people in this city suddenly need somewhere to live, all in the same week. That is the textbook setup for rents doubling overnight. Somebody looked at that and built a way for neighbors to flag it publicly. It's the most quietly furious piece of software on this whole list and it took me three passes through the directory to notice it.

The site is clear that it's a community board, not a real estate agency: verify the property in person, don't prepay.

---

## Pets

**[Encuentra tu mascota](https://encuentratumascota.co/anuncios/se-busca)** — "missing" classifieds to reunite pets with their families.

I've seen people online treat this category as frivolous. It isn't. Fourteen animals were pulled out of the rubble in Pereira by official rescue crews. For a family that lost their house, the dog is not a footnote.

---

## Missing persons

The most delicate category by a long distance, and the one where design decisions have the highest cost.

**[Encontrados.co](https://encontrados.co/)** — built for rescue workers. You photograph someone who is in your care, the system matches it against missing-person reports, and **the photo is deleted after the match**. Families can also file reports. It was built with volunteers from Ni500 / Torrenegra.

That deletion is the entire design. The most valuable data in this system is also the data that most needs to not exist a minute longer than necessary — photographs of injured, disoriented or unconscious people, taken without their consent because consent wasn't possible. Building the delete step in from the start, in a week, under this pressure, is the single best engineering decision I've seen come out of this emergency.

**[SOS Pereira 2026](https://sospereira.com/)** — the mayor's office citizen portal: missing-person reports, building damage reporting, a census of affected businesses, public listings, and operator access.

This one is the city government's. Not Corag's, not a volunteer project. I'm saying that plainly because directories blur origins, and confusing a municipal channel with a citizen tool does a disservice to both.

---

## The one with the best documented method

Of everything here, [Gravitas](https://mapa.gravitasworld.com/) is the case I'd point a working engineer at, partly because [El Colombiano documented it](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222) so I'm not relying on my own read.

Juan Camilo Garzón is a designer and anthropologist from Risaralda. His studio, Senza Create, had spent four years working on rural tourism. After the earthquake they rebuilt the platform for emergency use in **42 hours**.

What it pulls together: citizen reports, satellite and georeferenced data from Copernicus, social media, official WhatsApp groups, and government and municipal reports. At the time of that article it had taken in roughly 250 citizen reports and 850 internal ones.

The part worth stealing is how they decide what's true. Garzón's own words:

> *"Si cinco personas reportan el mismo centro de acopio, eso nos ayuda a determinar que la información es verídica, más que un solo reporte que puede parecer inusual o no tener respaldo."*
> ("If five people report the same collection center, that helps us determine the information is truthful, more than a single report that might look unusual or lack support.")

Corroboration threshold plus AI plus an administrator reviewing before anything hits the map. Not "the AI decides." AI narrowing the field, a human closing it. Anyone who has built a citizen-reporting system eventually reinvents some version of this, usually after getting burned. They got there in under two days.

---

## What's missing from this map

An honest directory should say what it can't see.

I don't know which of these tools will still be running in three months. I don't know their data-retention policies beyond what they publish. I don't know how many of the collection-center entries are stale right now, in any of them, including the ones I work on. Nobody has audited the overlap to see how many reports are duplicated across four maps because the same neighbor filed in four places.

And I don't know — nobody knows — whether any of this changed an outcome for a single person. I'd like to believe it did. I can't demonstrate it, and this is not a series where I get to claim things I can't demonstrate.

If you run one of these and I've described it wrong, [the directory has a form](https://corag.app/ecosystem/), and a person reads every submission.

---

## Resources

- [corag.app/ecosystem — the living directory](https://corag.app/ecosystem/)
- [El Colombiano — the AI platform organizing aid, volunteers and resources](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222)
- [Corag developer docs](https://corag.app/developers)
- [Pereira Responde API docs](https://pereiraresponde.co/api/docs)
- [National Police recommendations on avoiding donation scams](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/)

---

Twenty tools, six categories, one shared assumption: that somebody else's piece is worth reading instead of rebuilding.

That assumption is younger than the emergency. Let's see if it outlives it.

Let's keep building.
