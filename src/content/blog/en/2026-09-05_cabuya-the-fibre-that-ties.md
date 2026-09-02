---
title: 'Cabuya: The Fibre That Ties'
description: 'Twenty aid apps that could not read each other, so we built the fibre that ties them: Cabuya, an open protocol for help to flow across systems.'
pubDate: '2026-09-05'
heroImage: '/images/blog/posts/cabuya-the-fibre-that-ties/hero.webp'
heroLayout: 'side-by-side'
tags: ['tech', 'portfolio', 'civic-tech', 'colombia']
keywords: ['Cabuya protocol', 'cabuya.org', 'aid app interoperability', 'open protocol emergency response', 'data standards for disaster response', 'JSON schema humanitarian data', 'agent skill for protocol adoption', 'civic tech Colombia earthquake']
series: 'colombia-earthquake-2026'
seriesOrder: 4
draft: true
---

Take one need. Water, at a collection point in the south of the city. A neighbor posts it where they can — a WhatsApp group, a web form, a pin on a map — and then posts it again somewhere else, because nobody, including the neighbor, knows which map anyone else is looking at. Four maps end up holding the same need. Three hours later the point is full. One map finds out. The other three keep sending people.

That was the state of the art by week two of the earthquake: more than twenty aid apps, four supply maps for the same city, and not one of them able to read another. I wrote earlier in this series that fragmentation isn't having many tools — it's having many tools that can't read each other. What I didn't have then was the answer.

This chapter is about the answer. Its name is Cabuya, and the disclosure comes before anything else: I was in the room. I'm one of the people who created it, so read everything I say about it with that in mind. I'll try to be harder on it than a press release would be — the protocol itself has a rule for that.

---

## Not another app

The obvious move was to build app number twenty-one: the one that unifies them all. It's also the wrong one, and by now the argument is old. A wall-crack reporter is not a supply chain. A municipal census is not person-to-person aid. Forcing all of that into one product produces something that does nothing well and takes three months we didn't have. Specialization was the right answer back in week one, and it still is.

What was missing wasn't consolidation. It was a shared shape — an agreement about what a record looks like, so that any app can read any other app without a custom integration for every pair. A protocol, in the boring sense of the word. Same trick as shipping containers: nobody standardized the ships, they standardized the box, and suddenly every crane and train and truck in the world could move it.

The math is what convinced me. With twenty apps, bilateral integrations are 190 handshakes — one hundred and ninety conversations between exhausted teams, most of them repeated work. One shared schema is one agreement. The ecosystem had already produced the seeds: Corag was publishing an unauthenticated API, Pereira Responde had documented theirs. Two apps reading each other is a favor. Twenty apps publishing the same shape is infrastructure.

---

## Six days

The protocol has a founding record, [ratified on August 16, 2026](https://github.com/Cabuya/cabuya.org/tree/main/docs/context) — six days after the earthquake — by a founder and a working group, in a document set that is public, versioned, and carries zero personal data.

Before any schema existed, there was an analysis phase: someone actually went through the twenty-plus apps, catalogued what each one stored, modeled the entities underneath them, reviewed the prior art, and worked the governance and brand questions. The record keeps its own caveats on display, which tells you the culture: *"The DIVIPOLA codes were never verified"* (DIVIPOLA being the municipality code system we later built on), and — the sentence I think about most — *"Analysis is not adoption."* Appearing in that matrix meant nothing. The protocol would be judged by what teams actually publish, nothing else.

That sentence is the whole discipline. I've watched enough project pages to know how these stories usually get told: launch post, adoption graph, victory. The record refused that from day one.

---

## Four steps and an afternoon

What Cabuya asks of a team is almost embarrassingly small. The [homepage](https://cabuya.org/) puts it in four steps, under a heading I co-signed and still like: *"Four steps, and none of them need us."*

1. **Publish a manifest.** One JSON file at a known path that says who you are, what you publish, and under which licence.
2. **Export a feed.** Your places, in the shared schema. *"A static file at a stable URL is enough — no API required."*
3. **Run the validator.** It fetches what you published and reports what it found, with every finding located and a correction stated.
4. **Open a registry entry.** A pull request. The measurement happens on the protocol's side and is visible to anyone who looks.

For a small application, the whole thing is an afternoon. There is no account to create, no approval to wait on, no key to be issued — *"no permission to request, no partnership to sign."* The quickstart is literally five commands: publish `cabuya.json`, export `places.json`, run `validate <url>`, fix what it reports, open the registry PR.

What joining means is one line, and it's the line that got teams over the fear: **your data stays yours; a copy travels.** Your app keeps its product, its users, its database exactly as they are. What you add is a public copy of your places in the shared format. A trimmed record looks like this:

```json
{
  "name": "Coliseo Municipal",
  "place_kind": "shelter",
  "municipality_text": "Pereira",
  "neighborhood_text": "Centro",
  "lifecycle_status": "active",
  "public_url": "https://example.org/places/coliseo"
}
```

A shelter. In Pereira, Centro. Active right now. And a link back to the app that published it — because that last field is the whole contact model: when someone wants to act on the record, the button takes them to the origin. Contact details never travel in the feed.

---

## The name is a governance decision

<figure>
  <img
    src="/images/blog/posts/cabuya-the-fibre-that-ties/fique-plant.webp"
    alt="A fique plant — an agave relative with long sword-shaped leaves — growing in the Andes."
    width="400"
    height="538"
    loading="lazy"
  />
  <figcaption>The source of it all: fique, the agave relative the fibre comes from. Image: cabuya.org.</figcaption>
</figure>

[Cabuya is the fibre](https://cabuya.org/about/) — and the rope made from it — drawn from the leaves of the fique plant, an agave relative that grows across the Andes and Central America. Colombia is the world's largest grower of it. If you're Colombian, you've seen it: the rough cord holding a bundle, the rope across a rural gate. *"Nobody invented it, licensed it or launched it. It is cheap, ordinary and load-bearing."*

That register is the point. The [about page](https://cabuya.org/about/) says the name was *"a governance decision before it is a design one,"* and I can confirm the working group spent more time on this than on any single field of the schema. A protocol named after a company dies with the company. A protocol named after a committee dies with the committee's funding cycle. A fibre that any farmer can make into rope belongs to nobody, so it can outlive everybody.

<figure>
  <img
    src="/images/blog/posts/cabuya-the-fibre-that-ties/leaf-to-fibre.webp"
    alt="The transformation from fique leaf to golden fibre strands, laid out in stages from left to right."
    width="720"
    height="268"
    loading="lazy"
  />
  <figcaption>From leaf to fibre. The conversion is manual, mechanical, and unowned. Image: cabuya.org.</figcaption>
</figure>

Two more things about the word, because they say a lot about how the project thinks.

The Real Academia Española records an idiom — in the site's English, *"to catch the cabuya"* — meaning to pick up the thread of a matter. In Spanish, *coger la cabuya*. The [about page](https://cabuya.org/about/) draws the consequence better than I can: *"A format whose verb of adoption already exists in the language of the region it starts in has one less thing to teach. Formats spread on what they do not have to explain."*

And the second meaning, the one a branding agency would have buried: in Colombia and Ecuador, *to be in the cabuya* means to be in a jam you can't easily get out of. It's on the page, in plain text — *"we knew about it before choosing the name."* An initiative that discloses its own worst connotation is telling you, before you read a single spec line, how it will handle bad news later.

---

## The thesis

The homepage doesn't call it a slogan or a mission statement. It calls it **the thesis**:

> **We grow together: we don't compete, we feed each other.**
> **«Crecemos juntos: no competimos, nos alimentamos.»**

I want to unpack what that represents, because it's not decoration. This protocol was born in a roundtable of teams that were, in the flattest reading, competitors — same users, same donors, same attention, same week. The thesis is the claim that in an emergency ecosystem the competition is a mirage and the duplication is the enemy; that my app getting stronger because it can read your data is not a loss for you, it's the product. Twenty apps that feed each other beat one app that won — and the [previous chapter](/blog/what-comes-next-after-the-earthquake/) of this series already argued that nobody in this ecosystem wins by being the only one standing.

A motto is cheap, though. Everyone can write one. What makes this one load-bearing is that the protocol's mechanics actually implement it: every record that travels carries the `publisher_id` of the app that published it, so credit is structurally attached, not promised. Aggregators must display where data came from. There is no hub — the registry *"records who exists and what was measured. Never a data path."* And when a citizen acts on a record, the button leads back to the publishing app, because that's where the relationship — and the help — gets resolved. Feeding each other is wired in at the schema level.

<figure>
  <img
    src="/images/blog/posts/cabuya-the-fibre-that-ties/splice-no-centre.webp"
    alt="A rope splice diagram showing two ropes joined by weaving their strands into each other, with no central knot or authority holding them together."
    width="420"
    height="415"
    loading="lazy"
  />
  <figcaption>A splice: strands woven into each other, no knot in the middle. Image: cabuya.org.</figcaption>
</figure>

The [about page](https://cabuya.org/about/) compresses it into the pair of lines I keep quoting to developers: *"Each app is a thread. The protocol is the rope."* Two applications that can read each other *"are not rebuilt, not merged and not subordinated — the connection is the only new thing."*

---

## What it refuses to carry

Every design effort on Cabuya spent most of its energy on what to leave out. The [two facts](https://cabuya.org/) the whole thing rests on: many apps will exist, and that is fine; and the data is sensitive — *"so the shared layer carries places and facts, never people: no names, no phone numbers, no personal contact. That is excluded by design, not by good intentions."*

Read that again as an engineer: not by good intentions. The founding record goes further than the homepage: *"Person-level data never federates — a join prohibition, not a field omission."* A field omission is a missing column. A join prohibition means nothing person-level may ever travel, in any field, under any extension — so that no one, ever, can stitch two feeds back into a database of human beings. Given how this emergency went — with the missing-person count moving by the hundreds and every app tempted to "help with matching" — this was the line that took the most discipline to hold. Encontrados.co deleting the photo after the match was the ethical bar in week one. Cabuya writes that instinct into the schema, where it doesn't depend on anyone's virtue.

Even contact is reduced to a fact: the field is `contact_available`, a boolean. *"Carries the fact, never the value."* The shelter can be reached — true or false. The phone number lives in the publishing app, one hop away, with the person who collected the consent.

And my favorite field in the entire spec, because it's this series in miniature: `last_confirmed_at`. It's required on every record. It may be `null` — null means *never confirmed* — but the key must exist, and omitting it is non-conforming. The validator rejects the record. I spent the second chapter arguing that a tool must always show when its information was last true, even when the timestamp embarrasses it. Here that argument stopped being an opinion and became a schema constraint. That is the strongest form an argument can take.

---

## Measured, never declared

The last design decision worth explaining, because it's the one I'd point to in a calm room: conformance is measured, never declared. There is a public validator anyone can run. The registry shows what it found. Nobody's README saying "Cabuya compatible" counts for anything until the validator says so — and the spec's own versioning refuses a "latest" alias, because *"a normative document that changes under its own address is a document nobody can cite."*

So what does the registry say today, as I write this? Five publishers — Corag, Emergencia Colombia, Pereira Ayuda, Pereira Responde, Reporte.co — and every single one reads *not yet measured*. The registry page states why with a candor I find disarming: it was *"built without a connection to the measurement store."* The publishing is real. The measuring hasn't run. Those are different facts, and the page refuses to blur them.

The five entries are also labelled *Proposed* — most were opened on each team's behalf from public information, and the label stays until the team confirms. The reasoning is on the page: hiding them *"would make the registry look emptier than the network is — and it is labelled because a team that has not answered has not agreed to anything."*

Rule-0 of the founding record is *"no unbacked claims,"* and the rule binds the project itself first. I can't tell you Cabuya is working. I can tell you exactly what state it's in. That distinction is rare enough that I wanted it documented in this series, in public, as the standard I think civic tech should hold itself to.

---

## The skill

One more piece, and it's the one that connects this story to everything else I write about. Cabuya ships an [agent skill](https://cabuya.org/developers/skill) — an installable pack ([GitHub](https://github.com/Cabuya/cabuya-skill)) that teaches a coding agent the schema, the conformance levels, the exclusions, and the validator's check ids, offline. The homepage's justification is a single sentence that could only have been written by people who spent August in this ecosystem: *"The skill exists because most teams in this ecosystem are already working with an agent."*

That was true. The twenty apps were not built by twenty integrated agencies; they were built by small teams pair-programming with models at two in the morning. If the protocol's adoption path goes through a developer, the developer's agent has to know the spec — or it will improvise one. The skill page is blunt about the failure mode: *"An agent that has to fetch a standard will invent one when the fetch fails, and it will invent it confidently."* The fix is almost insultingly simple: vendor the specification inside the pack, with checksums. *"A specification on disk cannot be hallucinated."*

The rules the skill hard-codes are the same ones the protocol refuses to leave to judgment: no person-level data, ever, in any field; contact values link out instead of traveling; no scraping; crawl policies honored in the fetch layer, not in a comment; and never claim conformance the validator has not measured — the pack won't even write the word *certified*.

And one decision is deliberately left to a human. When the skill maps a team's database to the shared schema, it builds the crosswalk, runs the person-level deny-list over every column — and stops. *"That pause is the one mandatory human decision in the whole flow."* Whether a column contains personal data is not something the agent may decide alone. I've written a lot about agent autonomy this year, and I keep coming back to that pause as the pattern: automate the survey, reserve the judgment.

---

## What's real and what isn't

Here is the honest ledger, in the protocol's own vocabulary. As I write: specification 0.1, one entity type (places), five proposed registry entries, zero measured conformances, and a homepage that ends its pitch with *"none of it is achieved yet."* The ambitions are labelled *Ambition, not roadmap*: an emergency network so the next crisis *"starts with infrastructure instead of a spreadsheet"*; a schema that *"outlives the emergency that produced it"*; a regional ecosystem that can fork the whole thing because the spec is CC0 and *"there is nobody to ask."*

I don't know if any of that happens. I helped write the protocol and I honestly don't know — the same way I don't know which of the twenty apps will still be running in month seven, when the story has moved on and the family in the shelter is still in the shelter. What I wrote in the previous chapter is still true: what survives an emergency is the data and the interfaces to it, and everything else is a rendering. Cabuya is my concrete bet on that sentence. Not app number twenty-one — the shape that lets any of them be replaced without the knowledge dying with the app.

Of everything I shipped this month, it's the piece I'd most like to still be maintaining in three years.

Cabuya is the fibre you tie things with. A single thread holds nothing; twisted together, they carry what no one of them could. That started as a branding line and ended as the honest description of what this whole series found: no single app, agency or hero carried this city — ordinary threads, twisted while it mattered.

Let's keep building.

---

## Resources

- [Cabuya — the open aid interoperability protocol](https://cabuya.org/)
- [About the name, the fibre and the idioms](https://cabuya.org/about/)
- [The Cabuya protocol specification v0.1](https://cabuya.org/developers/spec)
- [The JSON schemas the validator enforces](https://cabuya.org/developers/schemas)
- [The publisher registry](https://cabuya.org/registry)
- [The agent skill — install docs](https://cabuya.org/developers/skill) · [cabuya-skill on GitHub](https://github.com/Cabuya/cabuya-skill)
- [The founding record (docs/context)](https://github.com/Cabuya/cabuya.org/tree/main/docs/context)
