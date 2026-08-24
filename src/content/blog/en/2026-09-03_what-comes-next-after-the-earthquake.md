---
title: 'What Comes Next'
description: 'The rescue phase ends in weeks and reconstruction takes years. How to help now, how not to get scammed, and what actually survives once the cameras leave.'
pubDate: '2026-09-03'
tags: ['tech', 'personal', 'civic-tech', 'colombia']
keywords: ['how to help Colombia earthquake victims', 'avoid donation scams Colombia', 'Colombia earthquake reconstruction cost', 'contribute to civic tech projects', 'long term disaster recovery', 'open data after emergency', 'Pereira reconstruction plan']
series: 'colombia-earthquake-2026'
seriesOrder: 3
draft: true
---

The rescue phase of a disaster lasts about two weeks. Reconstruction lasts years, and almost nobody is watching by month three.

That gap is the thing I want to talk about, because everything in this series was built during the two weeks.

---

## Where the reconstruction actually stands

The government declared national disaster through **Decree 1171 of August 11, 2026**, followed by three days of national mourning and an announced economic emergency to fund rebuilding. Affected families were promised rent subsidies, suspension of utility bills, and a month's extension on tax filings.

What it costs is still unsettled, and I want to show you the spread rather than pick a number:

| Source | Estimate |
|--------|----------|
| Preliminary government estimates (via Portafolio) | $20 billion COP, ~1% of GDP |
| La República | US$6.35 billion, 1% of GDP |
| Oxford Economics | US$990M – US$1.98B, 0.2–0.4% of GDP |
| USGS PAGER model | 34% probability of losses between US$1B and US$10B |

Those numbers disagree by an order of magnitude, and the reason isn't that someone is lying. They measure different things. Some count direct physical damage; some count total economic loss including activity that won't happen; the USGS figures are automated probabilistic models published in the first hours, before any census existed. Anyone quoting one of them as *the* number is telling you more about their argument than about the damage.

Locally: the governor of Risaralda, Juan Diego Patiño Ochoa, said he'd request around **$67 billion COP** from the royalties system, aimed mainly at housing and school infrastructure. Pereira's building census started August 12 and is the thing that will eventually turn all of this from estimate into fact.

Nationally, 81,506 homes damaged and 14,493 destroyed, along with 298 roads, 44 bridges, 59 aqueducts, 241 health centers and 2,612 educational institutions.

Those last two categories are why this isn't over in a year.

---

## If you're a neighbor

Start from the category, not from a link somebody forwarded you. [The directory](https://corag.app/ecosystem/) is organized by what you actually need: shelters and collection points, damage reporting, missing persons, pets, housing, direct aid.

Two specific things worth knowing about that most people haven't heard of:

- **[PereiraVive](https://pereiravive.com/)** is a free community rental board, and it lets you **report price gouging**. If your rent just doubled, that's where it goes on the record.
- **[Encuentra tu mascota](https://encuentratumascota.co/anuncios/se-busca)** exists and works. Fourteen animals were pulled from the rubble in Pereira by official crews alone.

And check the date on anything operational before you act on it. A collection center's needs change in four hours.

---

## If you run an organization or a collection point

Publish what you need, publish what you have too much of, and **publish the time you last updated it**.

The surplus half matters more than people expect. A center drowning in used clothing while three blocks away another one has no water is the most common failure in this whole system, and it's entirely an information problem.

If you can expose your data in any machine-readable form — even a JSON file you regenerate by hand twice a day — aggregators can pull from you instead of transcribing you. That's the difference between being on one map and being on six.

---

## If you're a developer

**Read before you write.** Ask whether the thing exists, then whether you can read it. [Pereira Responde publishes a documented API](https://pereiraresponde.co/api/docs). [Corag's public API](https://corag.app/developers) is unauthenticated and idempotent, with a remote MCP server alongside it. If a tool you want to build on has no public docs, message the team — most will hand you an endpoint, because they're not competing with you.

**Make writes idempotent from day one.** `source` + `externalId`. It costs nothing now and a migration later.

**Timestamp everything.**

**Don't touch personal data you don't need**, and delete the data you do need as soon as the job is done — the way [Encontrados.co](https://encontrados.co/) deletes the photo after the match.

**Submit your tool to the directory** if it isn't there. There's a form, a person reads it, and inclusion isn't automatic. And if you find something in the listing described wrongly — including anything I wrote in this series — say so.

**Don't silence the other pieces.** Nobody in this ecosystem wins by being the only one standing.

---

## Before you donate

The police, through the DIJÍN, have been warning since the first week about a set of specific scams, and they're worth knowing by name:

- **Impersonation of relief organizations**, social leaders and public officials, running fake collection campaigns. El Colombiano documented [someone posing as a health-services director](https://www.elcolombiano.com/colombia/terremoto-alerta-por-estafadores-policia-suplantacion-director-sanidad-damnificados-EG39953869).
- **The trapped-relative call.** Someone phones claiming your family member is trapped or badly hurt, to panic you into sending money immediately.
- **Fraudulent links** over WhatsApp, SMS and social media.

The official recommendation is to validate through channels you can independently verify: the Red Cross, municipal governments, departmental governments, Civil Defense.

I'll add one of my own, since this series has been arguing it for six articles: **prefer whoever shows you evidence of delivery over whoever shows you the most urgent story.** Urgency is easy to fake. A delivery record is harder.

I'm deliberately not publishing account numbers or payment links anywhere in this series. If someone reads this in six months, any channel I listed could have changed hands.

---

## What survives when the cameras leave

Here's the part I actually worry about.

Twenty-plus tools got built in about two weeks. Several were built by two or three people, on evenings, on adrenaline, with no funding and no plan past the emergency. [Gravitas was adapted in 42 hours](https://www.elcolombiano.com/tecnologia/plataforma-ia-organiza-ayudas-voluntarios-recursos-terremoto-colombia-KC39918222) by a studio whose actual business is rural tourism. At some point that studio has to go back to rural tourism.

Reconstruction runs for years. Nothing on this list was built to run for years. That mismatch is not a criticism of anyone — building for the emergency was the correct thing to do — but it's a real problem arriving on a predictable schedule.

I don't think the answer is that all twenty become sustainable products. Most won't, and shouldn't. Some are already redundant. Some solved a problem that only existed in week one.

What I think survives is **the data and the interfaces to it**. A map is a rendering; the underlying dataset of damaged buildings, collection points, shelters and housing is the asset. If the datasets are open, documented and readable, then when a maintainer burns out or a domain lapses, somebody else can pick it up in an afternoon. If they're locked inside a SPA with no API, they die with the project and we start over next time.

So the useful thing to do in month two, in my view, is unglamorous: get the data out from under the interfaces. Document the endpoints. Write down the schema. Hand the historical dataset to somebody institutional — a university, the municipality, whoever will still exist in 2029.

That's the version of this where the next earthquake starts from something instead of nothing. And there will be a next one. Colombia has roughly 2,500 seismic events a month, we can't predict them, and the only variable we control is what we've built and what we've written down.

---

## Resources

- [corag.app/ecosystem — the living directory](https://corag.app/ecosystem/)
- [National Police — how to avoid scams during emergencies](https://www.eluniversal.com.co/sucesos/2026/08/14/terremoto-en-colombia-evite-estafas-en-emergencias-y-desastres-policia-da-estas-recomendaciones/)
- [Portafolio — the initial reconstruction cost estimate](https://www.portafolio.co/economia/reconstruir-a-colombia-tras-el-terremoto-tendria-un-costo-inicial-de-20-billones-segun-estimaciones-preliminares-500175)
- [LA FM — Risaralda seeks royalties funding for housing and schools](https://www.lafm.com.co/actualidad/risaralda-reconstruccion-viviendas-terremoto-colombia-2026-sesenta-y-siete-mil-millones-de-pesos-regalias-408019)
- [Corag developer documentation](https://corag.app/developers)

---

In the first article I wrote that Pereira didn't go quiet for ninety seconds — it went quiet for three days, and what eventually filled that silence was people showing up with whatever they had.

The showing up was never the hard part. Colombians are extremely good at the first two weeks. What we're historically worse at is month seven, when the story has moved on and the family in the shelter is still in the shelter.

Whatever we're going to leave behind from this — the data, the code, the habit of reading each other's work instead of rebuilding it — has to be built now, while everyone still cares.

Let's keep building.
