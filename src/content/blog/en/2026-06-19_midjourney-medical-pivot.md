---
title: "Midjourney Wants to Scan Your Whole Body in 60 Seconds"
description: "Midjourney, the AI image company, unveiled a full-body ultrasound scanner and a wellness spa. Is it a pivot or a new division — and does the tech actually work?"
pubDate: "2026-06-19"
heroImage: "/images/blog/posts/midjourney-medical-pivot/hero.webp"
heroLayout: "banner"
tags: ["tech", "ai"]
keywords: ["Midjourney medical scanner", "Midjourney Ultrasonic CT", "Midjourney full body ultrasound", "Midjourney Spa San Francisco", "is Midjourney pivoting to healthcare", "ultrasound tomography whole body", "Midjourney Butterfly Network deal"]
---

You step into a shallow pool of golden light. A ring of sensors sends sound through your body from every angle. About a minute later you step out, and a 3D map of everything inside you — organs, arteries, bone — has been drawn down to a fraction of a millimeter. No needles, no radiation, no waiting.

It sounds like a scene from a movie — the Med-Bay from *Elysium*, half the sick-bays in science fiction. And it would be, except for one detail: the company that announced it, on a stage in San Francisco, is Midjourney. The one you know for turning text prompts into images now wants to turn sound into a map of your body. They call it the Midjourney Scanner, and the method "Ultrasonic CT." And they want to put the first machine inside a spa. (Even the tech press did a double take — Engadget admitted it *"had to check… it wasn't April 1st."*)

So the question that stuck with me wasn't whether it's a joke. It's the one every good science-fiction premise eventually has to answer: is the science real, or does it stay fiction? An AI image company with no hardware history and no medical track record says it's reinventing how we look inside the human body. I went digging — not to dunk on it, not to cheerlead — to work out what was actually announced, what it means for Midjourney as a company, and where the line falls between the movie and the machine.

---

## What they actually announced

The pitch, in Midjourney's own words, is *"something as powerful as MRI, and as casual as a trip to the spa."*

The device is a ring of — they say — *"half a million tiny squares each the size of a fine grain of sand, and each capable of acting as both a tiny speaker and a tiny microphone."* You descend through that ring at about 5 cm per second. The squares fire ultrasonic waves and listen to the echoes millions of times a second, *"producing terabytes of data each second."* Software reconstructs how the waves bend as they cross boundaries between water, fat, muscle, and bone, and turns that into a *"3D map of your body, down to a fraction of a millimeter."*

The headline numbers are big. A scan that *"looks a lot like today's MRIs but at nearly a hundred times the speed."* A goal of **50,000 scanners worldwide by 2031**. A capacity of *"a billion scans a month."* A claim — hedged, but stated — that with enough early imaging *"the world could avoid 30% of all deaths and 50% of all healthcare costs."*

And then the part nobody saw coming: the first one goes in a **spa**. A flagship in San Francisco, opening around the end of 2027, roughly 24–25,000 square feet of *"hot tubs, saunas, cold plunges, and cozy rooms with pools of golden light which softly scan your body."* Open 24/7. As they put it: *"The scans are a side-effect. You barely think of them when going to the spa."*

Here's the first thing worth holding onto, because the marketing blurs it: **the 60 seconds is a goal, not a measurement.** Their own line is *"the goal is for this process to take no more than 60 seconds."* Reporting from the event puts the current prototype at around **20 minutes**, used on roughly **12 people** so far. And founder David Holz said something to The Next Web that the slick demo doesn't: *"We're not even using any AI in this yet, just really cool hardware and software."* The thing that's running today is signal processing, not a model.

<figure>
  <img src="/images/blog/posts/midjourney-medical-pivot/reconstruction-abdomen.webp"
       alt="A wide ultrasonic reconstruction cross-section of a human upper abdomen produced by the Midjourney Scanner, showing soft-tissue structures."
       width="1920"
       height="960"
       loading="lazy" />
  <figcaption>A raw reconstruction slice from the Midjourney Scanner — a cross-section built from sound alone, before any AI labeling. — Source: <a href="https://www.midjourney.com/medical/blogpost">Midjourney</a>.</figcaption>
</figure>

---

## Is this a pivot, or a new division?

This was my first real question, and I suspect it's yours too. The headlines said "pivot." Bloomberg's read was *"AI Startup Midjourney Pivots to Health."* But read what Midjourney actually wrote, and the framing is different. The first line of the announcement isn't "we're changing what we do." It's *"We're a new division of Midjourney."* The post is titled "A New Era of Midjourney," and it reframes the whole company as a *"community-backed research lab… funded by everyday people"* — with a teaser that there are *"even more exciting projects"* still unannounced.

So the honest answer is: **this is an expansion, not a pivot.** Nothing in the announcement retires image generation. There's no "we're winding down the thing that pays the bills." If anything, the image product is the *reason* this is possible — and that's the part I find most interesting.

Midjourney has **no outside investors.** It's been profitable from close to day one, reportedly around $500M in annual revenue with roughly 107 people, and it took zero venture money. That structure is the whole story here. A VC-backed startup can't credibly tell its board "we're going to spend image-generation profits building hardware for a market we've never touched, on a 5-to-10-year horizon, starting with a spa." Midjourney can, because there's no board to convince. The people it has to answer to are its subscribers.

There's also a deeper thread connecting the two divisions, and it's not just "they both have the word image in them." Both are fundamentally about **reconstructing an image from data.** A diffusion model turns noise and a prompt into a coherent picture. A scanner like this turns terabytes of raw acoustic echoes into a coherent picture of your liver. The math isn't the same, but the shape of the problem — heavy compute, an inverse problem, turning a flood of signal into something a human can read — rhymes. I'll come back to why that matters, because it's the strongest argument for "why Midjourney" *and* the strongest argument for what could go wrong.

What they pointedly did **not** clarify: what happens to the image product's roadmap, whether engineers got pulled off it, and how a ~107-person company staffs a hardware-and-healthcare moonshot without slowing the thing that funds it. "New division" is the right label. It's also a label that papers over a lot of execution risk.

---

## The science under the science fiction

If you stop at "image company builds a scanner," it sounds absurd. If you look at *how* modern ultrasound tomography actually works, it gets less absurd — and you can see why a compute-heavy company picked this fight.

Conventional ultrasound — the handheld wand at a clinic — bounces sound off tissue and reads the echoes. What Midjourney is describing is closer to **ultrasound computed tomography**: send sound *through* the body from every angle, measure how each wave changes, and solve backward for what tissue must be in there to produce those measurements. The technique for doing that well is called full-waveform inversion, and it was borrowed from seismology — it's the same family of math geologists use to image what's under the ground from earthquake waves.

Here's the catch that's also the opportunity: full-waveform inversion is brutally expensive. A single high-quality 3D reconstruction can take hours or days on serious hardware. That's exactly the kind of problem a company with a giant GPU fleet and a deep bench in image reconstruction might actually be positioned to attack — and there's published research showing deep learning can accelerate this kind of reconstruction by four to five orders of magnitude. *That* is the real answer to "why Midjourney." Not the spa. The compute.

The hardware isn't vaporware either. The one hard, verifiable fact in this whole story is a partnership: Midjourney signed a co-development deal with **Butterfly Network**, the "ultrasound-on-chip" company, disclosed in an SEC filing back in November 2025 — worth up to **$74 million over five years**, with 40 of Butterfly's chip modules in each prototype machine. Butterfly's own stock jumped on the news. The hardware lead Midjourney hired, Ahmad Abbas, came from Apple's Vision Pro team. There are real engineers and real silicon behind the render.

<figure>
  <img src="/images/blog/posts/midjourney-medical-pivot/reconstruction-thigh.webp"
       alt="A wide ultrasonic reconstruction cross-section of a human thigh produced by the Midjourney Scanner, showing muscle and bone."
       width="1920"
       height="960"
       loading="lazy" />
  <figcaption>A thigh cross-section — soft tissue around bone. The leg, notably, is one of the easier parts of the body for sound to cross. — Source: <a href="https://www.midjourney.com/medical/blogpost">Midjourney</a>.</figcaption>
</figure>

---

## So does it actually work?

This is where the movie runs into the physics — and the physics doesn't read the screenplay. I have to be honest: the gap between the pitch and what sound can actually do is wide, and the people who know this field best are not gentle about it.

Start with the body itself. Sound has two enemies, and the human body is full of both: **air and bone.** At the boundary between soft tissue and air — lungs, bowel gas — roughly 99.9% of an ultrasound wave reflects straight back. It can't get through. Bone reflects a large fraction too, scatters the rest, and badly distorts whatever survives. This is not an engineering bug you fix with more sensors or more compute. It's the physics of sound meeting an air-filled lung. A practicing radiologist on Hacker News put it bluntly: ultrasound *physically cannot* image air-filled lungs or see through cortical bone, and called the "avoid 30% of deaths" claim *"completely divorced from reality."*

This is also why every ultrasound-tomography system that has ever reached the clinic images exactly one thing: **the breast.** Delphinus's SoftVue and QT Imaging's scanner are both FDA-cleared, and both are breast-only — because the breast is soft, has no bone in the way, no air pockets, and dunks neatly into water. The breast was chosen *because* it dodges all of ultrasound's hard limits. Twenty years of prior art converged on breast-only for a reason. The torso, the abdomen, the skull — the places you'd most want a full-body scan to see — are the worst case for sound. The honest one-liner I keep coming back to: the physics says *breast-shaped, not body-shaped.*

Then there's the irony that should make anyone pause. The documented failure mode of generative image models is **hallucination** — confidently producing detail that isn't real. When you reconstruct a medical image from sparse, noisy data using a learned model, the model can invent anatomy: a structure that looks plausible, renders beautifully, and isn't there. An MRI researcher made exactly this point about the demo — AI upscaling from sparse data yields *"spectacularly beautiful"* but unreliable images. The company whose entire expertise is generating convincing images that never existed is now proposing to generate images of your organs. That's either the perfect team for the reconstruction problem or the most dangerous one. Possibly both.

And one framing in the marketing is just misleading. "No radiation" is pitched as an advantage over MRI. But **MRI has never used ionizing radiation.** Ultrasound's real advantages over MRI are cost, speed, no giant magnet, and no claustrophobic tube — not radiation, because there was never any radiation to beat. CT is the one with the radiation. Comparing to MRI on that axis is a sleight of hand.

There's also the question nobody at a launch event wants to dwell on: should healthy people get scanned at all? Whole-body screening of people with no symptoms is something major radiology bodies actively caution against. The American College of Radiology says plainly there's *"no documented evidence that total body screening is cost-efficient or effective in prolonging life."* The reason is statistics, not pessimism: scan enough healthy people and you'll find shadows in roughly 1 in 3, almost all of them harmless — but each one triggers more tests, more biopsies, more anxiety, more cost. Run that at *a billion scans a month* and you're not democratizing health, you're manufacturing fear at industrial scale. The direct-to-consumer scanning company Prenuvo has been living this exact debate for years.

Here's the steelman, because the skeptics don't get the last word automatically. Full-waveform computational tomography really is a different beast from the handheld wand — it can measure tissue properties the old way can't, and a massive simultaneous array plus heavy compute might actually push past some limits people assume are fixed. And even if the grand "replace the MRI" vision never lands, there's a real, unglamorous market sitting right there: **cheap, repeatable body-composition data** — fat, muscle, bone — is something people pay for today via expensive, hard-to-access DEXA scans. A scanner that just does *that* well, at spa prices, has customers. Tellingly, that's the lane Midjourney is actually launching in: not diagnosis, but *"detailed body composition maps,"* with FDA submissions for anything more coming *"over time."* No clearance yet. They know where the line is.

| The pitch | What's true today |
|-----------|-------------------|
| Full-body scan in 60 seconds | A goal; prototype runs ~20 minutes, ~12 people scanned |
| AI reconstructs your insides | "We're not even using any AI in this yet" |
| Superior to MRI | No independent radiologist has assessed resolution; outputs body-composition maps, not diagnoses |
| No radiation, unlike MRI | MRI never had ionizing radiation either |
| Could avoid 30% of deaths | Contradicted by the consensus against whole-body screening of the healthy |
| Images your whole body | Every cleared ultrasound-tomography system is breast-only — by physics |

---

## What it actually represents

Strip away the spa renders and the billion-scans number, and I think Midjourney is making three bets at once.

The first is a **technical bet** that compute can crack a reconstruction problem the field has treated as bounded by physics. That bet is partly right and partly hubris — compute can do a lot, but it can't make sound travel through an air-filled lung.

The second is a **business bet** that a profitable, investor-free company can use its margins to buy its way into a hard adjacent industry on a decade-long timeline. That one is new, and only possible because of how Midjourney is built. Whether it's wise is a different question.

The third is the **framing bet** — and it's the one that makes me most uneasy. Launching a quasi-medical device as a *wellness spa experience*, starting with non-diagnostic "body composition," reads to critics as regulatory arbitrage: get a billion-scan data flywheel spinning in the consumer-wellness lane, then work backward toward clinical claims with the FDA once you have the data and the momentum. It might be the only realistic way to bootstrap a new imaging modality. It's also exactly the path that lets medical-grade decisions get made in a context with spa-grade oversight.

---

## Closing

Honestly? I don't know if this works. I don't think anyone does yet — including Midjourney, whose own language is full of "goals" and "we think it's possible." What I'm fairly sure of is that the easy takes are both wrong. It's not a company losing the plot and abandoning image generation — it's a new division funded by a product that's doing fine. And it's not the death of the MRI — the physics that confined ultrasound to the breast for twenty years didn't disappear because a GPU company showed up.

What's left in the middle is more interesting than either headline. A company with an unusual structure, real money, real hardware partners, and a real compute advantage, walking straight into the hardest version of a problem, making claims its own prototype can't yet back, in a framing designed to sidestep the scrutiny those claims would normally invite. That's worth watching closely — with curiosity for the ambition and a hand on the skepticism.

Science fiction turns into science the boring way — one FDA filing, one peer-reviewed result, one honest prototype at a time. So I'll be watching the submissions, not the spa renders. That's where we find out which of these bets crosses over from the movie, and which stays on screen.

Let's keep building.

---

## Resources

- [Midjourney — "A New Era of Midjourney" (Medical announcement)](https://www.midjourney.com/medical/blogpost) — the primary source for the scanner, the spa, and every direct quote here.
- [Butterfly Network — commentary on the Midjourney Scanner partnership](https://www.butterflynetwork.com/press-releases/midjourney-scanner-ultrasound-chip) — the hardware partner confirming the deal and the 40-module-per-system detail.
- [Engadget — Midjourney's full-body ultrasonic scanner](https://www.engadget.com/2196998/midjourney-full-body-ultrasonic-scanner/) — Mariella Moon's coverage, including the "we had to check it wasn't April 1st" line.
- [The Next Web — the Midjourney Scanner, examined](https://thenextweb.com/news/midjourney-scanner-midjourney-medical-ultrasound) — the sharpest mainstream critique, and the source of Holz's "not even using any AI yet" quote.
- [Hacker News discussion](https://news.ycombinator.com/item?id=48579650) — 800+ comments, with practicing radiologists and imaging researchers on both sides of the physics.
- [American College of Radiology — statement on total-body screening](https://www.acr.org/News-and-Publications/Media-Center/2023/ACR-Statement-on-Screening-Total-Body-MRI) — why whole-body screening of asymptomatic people is cautioned against.
- [Tomography (2024) — review of ultrasound computed tomography](https://pmc.ncbi.nlm.nih.gov/articles/PMC11053617/) — the science of USCT and why clinical systems are breast-only.
