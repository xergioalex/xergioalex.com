---
title: 'The Day Pereira Went Quiet'
description: 'On August 10, 2026, a magnitude 7.4 earthquake hit western Colombia. Pereira, my city, was one of the hardest hit. What happened, with every figure sourced.'
pubDate: '2026-08-17'
tags: ['personal', 'colombia', 'tech']
keywords: ['2026 Colombia earthquake', 'Pereira earthquake August 2026', 'San José del Palmar Chocó earthquake', 'Colombia earthquake death toll', 'Pereira buildings collapsed', 'how long did the Colombia earthquake last', 'UNGRD earthquake balance']
series: 'colombia-earthquake-2026'
seriesOrder: 1
draft: true
---

Monday, August 10, 2026. 7:34 in the morning.

The [Servicio Geológico Colombiano](https://www2.sgc.gov.co/Noticias/Paginas/SGC-actualiza-la-informacion-sobre-el-sismo-ocurrido-en-San-Jose-del-Palmar-Choco.aspx) says the shaking lasted somewhere between ninety seconds and two minutes. I haven't met anyone in Pereira who remembers it as under five.

I live here. And a week later I still don't have a clean way to describe what the city looks like, so I'm going to borrow the only sentence that has felt accurate to me: a lot of Pereira feels destroyed, or unrecognizable, and a lot of people need help. That's not a statistic. It's what it feels like to walk around, and I'm going to keep those two things separate for this entire series — what I feel and what I can prove.

This is the first of six articles about the earthquake and about what a few hundred developers did in the days after it. I want to start with the part that isn't about software at all.

---

## What actually happened

The epicenter was near **San José del Palmar**, in Chocó, about 20 km from the town. Magnitude **7.4**. Depth **103 km** according to the SGC — the USGS puts it slightly deeper, at 110 km. In the first hours you saw 82 km and 96 km circulating. Those were early estimates that got revised, which is worth remembering, because it's the first small example of a pattern that shaped everything else that week.

The depth is the whole story of why this one felt different.

This wasn't a shallow fault rupturing under a city. Off the Pacific coast, the Nazca plate slides underneath the South American plate — subduction, the same process that built the Andes. This earthquake happened *inside* that descending slab, more than a hundred kilometers down. The USGS classifies it as strike-slip faulting within the plate rather than a rupture along the plate boundary.

Which means: the energy came from far below and spread out over an enormous area instead of concentrating in one valley. Over **12,000 people from 900 population centers** reported feeling it, according to the SGC. It was felt in Panama. It was felt in Venezuela. And it went on and on, because — in the SGC's words — when the magnitude is that high, the energy released can't fully dissipate before it reaches the surface.

It's the strongest earthquake recorded in Colombia this century.

Then the aftershocks started. Eighteen by noon on the first day. [More than 130 by six in the morning on August 12](https://www.infobae.com/colombia/2026/08/12/tras-el-terremoto-de-74-en-colombia-ya-son-130-las-replicas-confirmo-el-servicio-geologico-colombiano/), ranging from 0.6 to 4.8, clustered around San José del Palmar and Sipí. On the 13th it shook hard again in Chocó in the middle of the night.

The aftershocks are the reason people stopped sleeping indoors. They're also the reason that every piece of information about whether a building was safe had a shelf life measured in hours.

---

## The numbers, and why they keep moving

I want to be careful here, because this is where a lot of writing about disasters quietly goes wrong.

Between August 10 and August 15, the official figures changed every day and sometimes several times a day. Different entities — the UNGRD, Asocapitales, individual mayors' offices, governors — published different consolidated counts at the same moment. Not because anyone was lying. Because each one cut off at a different hour, and for the first days there was no single national consolidation.

Here's the shape of it:

| Cut-off | Deaths | Injured | Missing |
|---------|--------|---------|---------|
| Aug 10 (preliminary, Asocapitales) | 132 | 570 | — |
| Aug 12 (UNGRD) | 239 | 3,755 | 287 |
| Aug 13 (UNGRD) | 281 | 3,971 | 379 |
| **Aug 15, 6:30 p.m. (UNGRD)** | **289** | **3,937** | **143** |

Fifteen departments. Four hundred fifty municipalities.

Look at the last column. Missing persons went from 379 down to 143 in two days.

That drop is not a correction of somebody's mistake. It's several hundred people being found — reunited with family, located in a shelter, identified. It is, in the most literal sense, the result of human beings cross-referencing lists. I'll come back to that in this series, because some of that cross-referencing happened in software that didn't exist the week before.

By department, at the August 13 cut: Valle del Cauca 125, **Risaralda 94**, Chocó 14, Caldas 6, Quindío 3, Antioquia 1. According to Asocapitales, capital cities accounted for roughly 75% of the dead. This was an urban disaster.

---

## Pereira

[El Tiempo called it the hardest-hit city](https://www.eltiempo.com/justicia/investigacion/pereira-la-ciudad-mas-golpeada-por-el-terremoto-al-menos-67-victimas-mortales-3577462), and the building count is why.

The city government's early report: **66 buildings in total collapse, 26 in partial collapse**, plus hundreds of damaged homes. Later reporting put the number above 80. Two hundred forty-three people rescued. Two hundred seventy-nine moved to clinics and hospitals. Fourteen animals pulled out.

The Invico building on Avenida Circunvalar is the one everyone has seen. Its twelfth floor is simply gone. Three people were trapped in it and [couldn't be recovered](https://www.pulzo.com/nacion/terremoto-pereira-danos-edificio-invico-rescatados-balance-oficial-PP5272271), because there was no passage left between floors.

Around 267 rescue workers were operating at once, local crews plus USAR teams sent from Bogotá, Envigado, Yopal and Medellín. Bogotá alone sent a hundred people. And alongside them, thousands of neighbors. In Los Álamos and Lorena, more than two hundred people gathered at two points and dug.

Shelters opened at Parque El Vergel, Parque El Oso, Coliseo Mayor, Parque Olaya, Plaza de Ferias and Estadio Mora Mora. [Two of them hit capacity within days](https://www.semana.com/nacion/pereira/articulo/terremoto-en-pereira-dos-albergues-ya-estan-al-limite-y-estos-son-los-puntos-disponibles/202651/).

Mayor Mauricio Salazar declared public calamity and economic emergency, imposed a curfew from six in the evening to five in the morning after reports of looting, and then banned private vehicle circulation entirely from midnight on the 12th until eight in the evening on the 17th. The building census started on the 12th.

The displaced-family count is the figure that moved most. It began at "2,000, and we'll probably get to 4,000." It later reached **41,600 families, around 140,000 people affected**. Those aren't contradictory numbers — the first was people in shelters, the second is people whose homes were damaged. But if you see them quoted side by side without that distinction, they look like chaos, and they aren't.

---

## Three days without anything

Most of the city lost water, power and internet at the same time, and stayed that way for about three days. Some sectors are still without, or intermittent, as I write this.

Nationally, [Andesco reported 93% of electrical service restored](https://www.lafm.com.co/economia/terremoto-colombia-reestablecimiento-servicio-electrico-terremoto-407808) within days, and Pereira went from 75% to around 90%. Some sectors stayed dark on purpose, for safety, not for lack of capacity. Water came back progressively while crews inspected damaged distribution networks. Gas stayed off in several areas while leaks were controlled.

The telecom failure is the one I keep thinking about as an engineer. According to MinTIC, **more than 3,400 mobile base stations went out of service** — 46.1% of the stations reviewed across seven departments. Nearly half the cell network in the affected region, gone.

The ministry opened spectrum temporarily, made interconnection between operators mandatory so a call could exit through whichever network was still alive, and made emergency-line calls free for users with no balance. [Starlink offered free service until September 12](https://www.semana.com/tecnologia/articulo/starlink-anuncia-internet-satelital-gratis-a-colombia-tras-el-devastador-terremoto-asi-puede-recibirlo/202612/) and shipped equipment for response agencies. Antennas went up here.

I mention all of this now because I'm going to spend later articles talking about apps, and I don't want to do that dishonestly. For the first days, a large part of the city had no way to load one.

---

## Everybody helped from wherever they were standing

This is the part I did not expect, and it's the reason I'm writing at all.

The collaboration that came out of this has been something else. Doctors did medicine. Restaurants cooked. People with trucks moved things. People with a spare room offered it. Students sorted donations in warehouses for entire days. Rescue workers went on far past the point where anyone would have called it reasonable — El Colombiano ran an interview with one of them under the headline *"Estoy donde me toque, lo más importante es ayudar"* ("I'll be wherever I'm needed, the important thing is to help"), and La Patria ran another one titled *"Estamos cansados pero satisfechos de ayudar"* ("We're exhausted but glad to be helping"). Those are their words, not mine.

Everybody contributed from what they knew how to do.

I don't know how to get anyone out of a collapsed building. I've never been more aware of that than in the last week. What I know how to do is build software.

So that's what a lot of us did. Within days there were damage maps, supply-center dashboards, missing-person matching tools, shelter directories, even a classifieds board for lost pets. Some were built in hours. One of them, [Gravitas, was rebuilt for the emergency in 42 hours](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222) by a design studio that until that week was working on rural tourism.

I helped build the landing page for [Corag](https://corag.app/), where a team is working on connecting people who need something with people who can give it. And I started doing the thing that turns out to be my actual contribution: writing down who else is out there, so the pieces can find each other. That list lives at [corag.app/ecosystem](https://corag.app/ecosystem/).

There are more than twenty of these tools now. A few days ago the people behind several of them sat down together to figure out how to stop duplicating each other. That conversation is what the rest of this series is about.

---

## A note on the numbers in this series

Every figure in these articles carries a named source and a cut-off date. I'm doing that for a boring reason and an important one.

The boring reason is that these numbers are still moving. Anything I write today will be wrong by some margin next month, and a number without a date is a number that quietly lies as it ages.

The important one is that this whole series argues that trustworthy information matters — that timestamps and evidence are the difference between help arriving and help evaporating. I can't make that argument in an article that plays loose with its own facts.

So: no invented percentages. No "half the city was destroyed." I feel like half the city was destroyed. That's a feeling, it's in the third paragraph of this post, and it's labeled as one.

---

## Resources

- [Servicio Geológico Colombiano — official update on the San José del Palmar earthquake](https://www2.sgc.gov.co/Noticias/Paginas/SGC-actualiza-la-informacion-sobre-el-sismo-ocurrido-en-San-Jose-del-Palmar-Choco.aspx)
- [Chequeado — twelve questions and answers to understand what happened](https://chequeado.com/el-explicador/terremoto-en-colombia-10-preguntas-y-respuestas-para-entender-que-paso/)
- [El Tiempo — official UNGRD balance](https://www.eltiempo.com/colombia/otras-ciudades/balance-oficial-de-la-ungrd-tras-terremoto-de-magnitud-7-4-en-colombia-273-fallecidos-3-824-heridos-y-377-desaparecidos-3578196)
- [corag.app/ecosystem — directory of the aid apps built after the earthquake](https://corag.app/ecosystem/)

---

Pereira didn't go quiet for ninety seconds. It went quiet for three days — no power, no water, no signal, and a lot of people standing in the street because going back inside felt like a bet.

What filled that silence, eventually, was people showing up with whatever they had.

Let's keep building.
