---
type: native
title: 'The Art of Directing Agents'
description: 'Why two people with the same model get different results: directing agents means designing delegable work with specs, skills, a harness and Deep Work Plan.'
pubDate: 2026-10-02
heroImage: '/images/slides/the-art-of-directing-agents/flyer-en.webp'
draft: false
theme: dark
transition: fade
syntaxHighlight: true
math: false
relatedPost: the-art-of-directing-agents
---

<!-- S01 · portada -->

<!-- .slide: class="aod" data-background-image="/images/slides/the-art-of-directing-agents/flyer-en.webp" data-background-size="cover" data-background-position="center" data-background-color="#0f1124" data-aod-id="S01" -->

<p class="aod-sr">The Art of Directing Agents. From writing code to designing work systems for agents. Sergio Florez, CTO at Dailybot.</p>

Note: I let the cover sit in silence for a few seconds and introduce the talk without reading anything: this is not a talk about prompts or models, it is about how we direct work now that executing got cheap. The next slide breaks the expectation right away.

---

<!-- S102 · pereira-tech-talks -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S102" -->

<div class="aod-ptt">
<div class="aod-col"><img class="aod-art aod-logo" src="/images/slides/the-art-of-directing-agents/community/pereira-tech-talks.webp" width="478" height="158" alt="Pereira Tech Talks logo"><p class="aod-link"><a href="https://pereiratechtalks.org">pereiratechtalks.org</a></p></div>
<img class="aod-qr" src="/images/slides/the-art-of-directing-agents/community/qr-pereira-tech-talks.webp" width="797" height="797" alt="Pereira Tech Talks WhatsApp QR code">
</div>

Note: Before getting into it, a hello to the Pereira Tech Talks community. I leave the logo, the QR code and the address on screen for anyone who wants to join.

---

<!-- P02 · 2026 -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P02" -->

<p class="aod-year">2026</p>
<p class="aod-idea">An inflection point in our history.</p>

Note: 2026 is an inflection point in our history. There are years when everything stays the same with small improvements, and years when something splits in two. This is one of the second kind.

---

<!-- P05 · el-trabajo-como-lo-conociamos -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P05" -->

<p class="aod-punch">Our work as we knew it <span class="aod-accent">stopped existing</span>.</p>

Note: Our work, as it was known, stopped existing. I say it slowly. The profession did not disappear; the way of doing it that we learned and taught did.

---

<!-- P19 · charlie-y-la-fabrica-de-chocolate -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P19" -->

<p class="aod-kicker">Charlie and the Chocolate Factory</p>
<div class="aod-panels">
<figure class="aod-panel"><img src="/images/slides/the-art-of-directing-agents/mr-bucket/1-line.webp" width="1000" height="569" alt="Mr. Bucket working the assembly line"><figcaption><b>1 · On the line</b>He works the assembly line</figcaption></figure>
<figure class="aod-panel fragment"><img src="/images/slides/the-art-of-directing-agents/mr-bucket/2-replaced.webp" width="1000" height="556" alt="Mr. Bucket next to the robot arm that replaced him"><figcaption><b>2 · Replaced</b>A machine takes his place</figcaption></figure>
<figure class="aod-panel fragment"><img src="/images/slides/the-art-of-directing-agents/mr-bucket/3-adapted.webp" width="1000" height="563" alt="Mr. Bucket talking next to the robot arm with the person who rehired him"><figcaption><b>3 · He adapted</b>They hire him back to supervise and maintain the machine</figcaption></figure>
</div>

Note: I remembered a scene from Charlie and the Chocolate Factory. First we see Mr. Bucket working the assembly line. Then he gets fired, because a machine takes his place. And in the end he adapts: they hire him back to supervise and maintain the machine that replaced him. That third picture is the one that matters to me in this era.

---

<!-- P06 · una-nueva-era -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P06" -->

<p class="aod-punch aod-punch--xl">We entered a <span class="aod-accent">new era</span>.</p>

Note: We entered a new era. A short pause here: it closes the idea and opens the door to what follows.

---

<!-- P08 · trabajando-con-agentes -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P08" -->

<img class="aod-art aod-art--ml" src="/images/blog/series/working-with-agents/hero-en.webp" width="1536" height="1024" alt="Cover of the Working with Agents series">
<p class="aod-punch aod-punch--s">Working with Agents</p>
<p class="aod-sub">The full series:</p>
<p class="aod-link"><a href="https://xergioalex.com/blog/series/working-with-agents/">xergioalex.com/blog/series/working-with-agents/</a></p>

Note: You can read all of it in my series Working with Agents, where I told, one by one, the stages I went through and how my work changed every day. There are eight published chapters and I walk through only some of them, one per slide.

---

<!-- P09 · capitulo-1 -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="P09" -->

<div class="aod-chapter"><img class="" src="/images/blog/posts/from-programmer-to-orchestrator/hero.webp" width="1536" height="1024" alt=""><div><p class="aod-kicker">Chapter 1 of 8</p><p class="aod-idea">From Programmer to Orchestrator: The Silent Revolution Almost Nobody Sees</p></div></div>

Note: I started at the beginning: when I noticed my job was no longer writing every line but directing. From programmer to orchestrator.

---

<!-- S103 · el-mono-y-la-escopeta -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S103" -->

<img class="aod-art aod-art--xl" src="/images/slides/the-art-of-directing-agents/art/mono-escopeta.webp" width="1672" height="941" alt="A woodworker hands a shotgun to a monkey; then the monkey fires and wrecks the workshop while the woodworker panics">
<p class="aod-idea aod-idea--s">Who is to blame: the monkey, or <span class="aod-accent">whoever handed it the shotgun</span>?</p>

Note: A deliberately exaggerated image, to talk about responsibility. On the left, someone hands a very powerful tool to someone who does not know how to use it; on the right, the result. The question is who is to blame: the monkey, or whoever handed it the shotgun. I ask myself the same thing about agents, and later I will tell you my answer.

---

<!-- P10 · capitulo-2 -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="P10" -->

<div class="aod-chapter"><img class="" src="/images/blog/posts/the-art-of-directing-agents/hero.webp" width="1536" height="1024" alt=""><div><p class="aod-kicker">Chapter 2 of 8</p><p class="aod-idea">The Hidden Job of the AI Era: The Art of Directing Agents</p></div></div>

Note: Then I named what was happening: the hidden work of the AI era, the art of directing agents. This chapter is the seed of the whole talk.

---

<!-- S04 · la-pregunta -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S04" -->

<p class="aod-idea">Why can two people using <span class="aod-accent">the same model</span> and <span class="aod-accent">the same goal</span> get wildly different results?</p>

Note: This is the question of the whole talk: two people, the same model, the same goal, and wildly different results. I leave it alone on screen. Before answering, we remove variables one by one.

---

<!-- S05 · mismo-modelo -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S05" -->

<p class="aod-punch aod-punch--s">Same model.</p>
<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/modelo.webp" width="1536" height="1024" alt="Illustration of a brain on a base connected to text, image, code, charts and data">

Note: I start building the scene with a single element: the model, at the center. One click per idea, no rush.

---

<!-- S06 · mismo-agente -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="S06" -->

<p class="aod-punch aod-punch--s">Same agents.</p>
<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/agente.webp" width="1672" height="941" alt="Illustration of a team of agents collaborating around a flow diagram">

Note: Same agents: the same tool, the same configuration, the same team of agents with their tasks. No technical difference here either to explain what comes next.

---

<!-- S07 · mismo-codebase -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="S07" -->

<p class="aod-punch aod-punch--s">Same codebase.</p>
<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/codebase.webp" width="1748" height="899" alt="Illustration of a code repository with folders and files connected to an editor">

Note: Same codebase: the same repository, the same folder structure and the same starting code for both. No technical variable is left to explain what comes next.

---

<!-- S105 · mismo-objetivo -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="S105" -->

<p class="aod-punch aod-punch--s">Same goal.</p>
<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/objetivo.webp" width="1672" height="941" alt="Illustration of two paths reaching the same target">

Note: And last, the same goal. Both paths aim at the same target: nobody was asked for different things. With the model, the agents, the repository and the goal all the same, the only thing left to look at is how the work was directed.

---

<!-- S08 · resultados-distintos -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="S08" -->

<p class="aod-punch aod-punch--s">Radically different results.</p>
<div class="aod-split aod-split--mid"><div class="aod-terminal"><div class="aod-terminal__bar"><i></i><i></i><i></i></div><div class="aod-terminal__line dim">$ agent run "refactor billing..."</div><div class="aod-terminal__line ok">✓ 58 files changed</div><div class="aod-terminal__line ok">✓ tests passing (212/212)</div><div class="aod-terminal__line ok">✓ no new dependencies</div></div><div class="aod-terminal aod-terminal--noisy"><div class="aod-terminal__bar"><i></i><i></i><i></i></div><div class="aod-terminal__line dim">$ agent run "refactor billing..."</div><div class="aod-terminal__line bad">✗ 41 files changed</div><div class="aod-terminal__line bad">! new BillingManagerFactory</div><div class="aod-terminal__line bad">! duplicated retry service</div><div class="aod-terminal__line bad">✗ tests passing (187/212)</div></div></div>

Note: The hit: everything was equal and the result was not. This is the code each one got. On the left, a large change, fifty-eight files touched, all green; on the right, forty-one files and an abstraction nobody asked for. Notice the prompt too: both typed “refactor billing” and kept going, because each one gave slightly different instructions, not just that phrase. It is not about how much changed, but about how well it was directed.

---

<!-- S09 · que-cambio -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S09" -->

<p class="aod-punch aod-cursor">What changed?</p>

Note: A deliberately long pause. I give everyone a few seconds to form a guess: the model, the prompt, luck. Almost nobody says what the next slide says.

---

<!-- S10 · la-direccion -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S10" -->

<img class="aod-art aod-art--l" src="/images/slides/the-art-of-directing-agents/art/director.webp" width="1536" height="1024" alt="Illustration of a person directing a team of agents around a diagram and a goal">
<p class="aod-idea">The person who <span class="aod-accent">directed</span> the work.</p>

Note: This is the thesis in one sentence. What changed was not the model or the agent: it was who directed the work and how. One point of origin, many agents, and everything depends on what leaves that point.

---

<!-- S101 · mismas-herramientas -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S101" -->

<img class="aod-art aod-art--xl" src="/images/slides/the-art-of-directing-agents/art/carpinteros.webp" width="1672" height="941" alt="Two woodworkers with the same tools and the same job: a crude, wobbly table on the left, a master cabinetmaker’s table on the right">
<p class="aod-idea aod-idea--s">Same tools. Same job. <span class="aod-accent">Different work.</span></p>

Note: A picture so it lands without talking about technology. Two people with the same tools, the same wood and the same commission: build a table. The inexperienced one ends up with something crude; the master cabinetmaker ends up with a piece of craft. Nobody would say the plane was the problem. It is the same with agents, and that is what the rest of the talk is about. With that idea we go back to walking through the chapters.

---

<!-- S106 · dirigir-bien -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S106" -->

<p class="aod-punch aod-punch--s">Directing agents well is <span class="aod-accent">not easy</span>.</p>

Note: With that image on the table, I want to say something that is sometimes overlooked: directing agents, and doing it well, is not easy. From the outside it looks like writing an instruction is enough. It is not, and what follows is why.

---

<!-- S107 · habilidades-blandas -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S107" -->

<p class="aod-idea">It takes skills closer to the soft ones than to the technical ones.</p>
<div class="aod-row "><div class="aod-box aod-box--dim">Technical skills</div><span class="aod-arrow">→</span><div class="aod-box aod-box--hot">Soft skills</div></div>

Note: The technical side still matters, but the weight is shifting. What most separates a good result from a bad one looks more like soft skills than technical ones. I say this from my own experience directing agents every day.

---

<!-- S108 · junior-y-senior -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S108" -->

<p class="aod-idea">The difference between a junior and a senior was never just technical knowledge.</p>
<div class="aod-chain"><span class="aod-node ">Junior</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">Senior</span></div>
<p class="aod-sub">We have always said there is something beyond code.</p>

Note: We have always said it in this industry: what separates a junior developer from a senior one is not only how much technology they know. It is something more. And that something more is exactly what becomes the center of the work now.

---

<!-- S109 · lo-que-hace-falta -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S109" -->

<p class="aod-kicker">What it takes</p>
<div class="aod-grid aod-grid--2 aod-grid--skills"><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 22V3"/><path d="M4 4h13l-2 4 2 4H4"/></svg><span><b>Lead</b>set direction and own the decisions</span></div><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.1-4.6A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/></svg><span><b>Communicate</b>convey an idea clearly</span></div><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg><span><b>Design</b>shape it before building it</span></div><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg><span><b>Plan</b>break down and order the work</span></div></div>
<p class="aod-sub">...and everything that looks like this.</p>

Note: These are the skills I mean: leading, communicating and conveying an idea, designing, planning, and everything that resembles them. They are the ones you use to direct a team of people, and now you use them to direct agents.

---

<!-- S110 · nueva-era -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S110" -->

<img class="aod-art aod-art--l aod-art--framed" src="/images/slides/the-art-of-directing-agents/art/nueva-era.webp" width="1672" height="941" alt="Illustration of a person pointing at a flow diagram in front of a team of agents working toward a goal">
<p class="aod-idea aod-idea--s">That is the set of skills this new era of AI asks for.</p>

Note: That set of skills is what this new era of AI asks for. I do not present it as a fad or as a replacement for the technical side: it is what gets added on top, and what makes the difference today.

---

<!-- S111 · seguir-ordenes -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S111" -->

<p class="aod-idea aod-idea--s">If your job was following orders, an agent does it today: faster and with the best possible architecture.</p>
<div class="aod-chain"><span class="aod-node ">order</span><span class="aod-arrow">→</span><span class="aod-node aod-strike">developer</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">agent</span></div>

Note: This is the uncomfortable part, and I say it without wanting to hit anyone. If you were taught to work only by following orders, agents already do that job: the same as you, faster and with the best possible architecture. It is what I see day to day, not a law.

---

<!-- S112 · dirigir -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S112" -->

<p class="aod-punch aod-punch--s">It is no longer about writing code.</p>
<p class="aod-punch aod-punch--s aod-accent">It is about directing.</p>

Note: To close this block: it is no longer about writing code. It is about directing. From here I go back to walking through the series chapters, to see how my way of working changed.

---

<!-- S113 · ya-son-agi -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S113" -->

<p class="aod-kicker">The first thing to internalize</p>
<p class="aod-punch aod-punch--s">These models <span class="aod-accent">are already AGI</span>.</p>

Note: Before talking about methodology, I want us to internalize something, and I say it as my position: these models are already AGI. I know it sounds strong, so let us first agree on the concept.

---

<!-- S114 · que-es-agi -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S114" -->

<p class="aod-kicker">AGI · Artificial General Intelligence</p>
<p class="aod-idea">An AI able to learn, reason and perform any intellectual or cognitive task at the same level as a human being.</p>

Note: This is the definition: artificial general intelligence is a type of AI able to learn, reason and perform any intellectual or cognitive task at the same level as a human being. For years it was described as hypothetical, something that would arrive someday.

---

<!-- S115 · ya-esta-a-ese-nivel -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S115" -->

<p class="aod-idea">If we start from that concept, AI has been at that level <span class="aod-accent">for quite a while</span>.</p>

Note: And if we start from that concept, AI has been at that level for quite a while. It is my reading of what I see working with agents every day, not a lab result, and I understand some will dispute it. But accept the premise for a moment, because everything else follows from it.

---

<!-- S116 · tratarlos-como-personas -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S116" -->

<p class="aod-idea">If directing is the new skill, we have to treat agents like people.</p>
<div class="aod-row "><span class="aod-node ">a team of people</span><span class="aod-arrow">≈</span><span class="aod-node aod-node--hot">a team of agents</span></div>

Note: So, if we agree on the concept, and directing is the new skill of the AI era, the consequence is clear: we have to treat agents as if they were people. With their limits, but with that same care when asking for things.

---

<!-- S117 · saber-delegar -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S117" -->

<p class="aod-punch aod-punch--s">And knowing how to <span class="aod-accent">delegate</span>.</p>
<p class="aod-sub">Delegating is hard.</p>

Note: And treating someone like a person means knowing how to delegate. Delegating is hard. I know because it was hard for me, and some days it still is.

---

<!-- S118 · el-ego -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S118" -->

<p class="aod-idea">For many developers it hits the ego.</p>
<p class="aod-quote">“If I do not do it myself, it will not turn out right.”</p>

Note: Delegating hits developers’ egos hard. Many times we believe that if we do not do it ourselves it will not turn out right. I include myself: it is a sentence I told myself many times before directing agents.

---

<!-- S119 · sin-ego -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S119" -->

<p class="aod-idea">If we drop the ego, we learn to delegate.</p>
<div class="aod-chain"><span class="aod-node aod-strike">ego</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">learn to delegate</span></div>

Note: But if we drop that ego and learn to delegate, everything changes. It stops mattering who wrote each line and starts mattering whether the result does what it had to do.

---

<!-- S120 · comunicar-y-planear -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S120" -->

<p class="aod-idea">And delegating takes communicating well and planning.</p>
<div class="aod-grid aod-grid--2 aod-grid--skills"><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.1-4.6A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/></svg><span><b>Communicate well</b></span></div><div class="aod-box aod-box--hot aod-box--skill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg><span><b>Plan</b></span></div></div>

Note: Now, delegating well takes two things we already mentioned: communicating well and planning. Nobody delegates successfully what they cannot explain or cannot break down.

---

<!-- S121 · una-metodologia -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S121" -->

<p class="aod-kicker">I realized I needed a methodology</p>
<p class="aod-idea aod-idea--s">To communicate my ideas and turn them into a well-structured plan, adapted to the project’s requirements and architecture.</p>
<div class="aod-chain"><span class="aod-node ">idea</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">structured plan</span><span class="aod-arrow">→</span><span class="aod-node ">requirements + architecture</span></div>

Note: That is when I realized I needed a methodology. One that would let me communicate my ideas and turn them into a well-structured plan, adapted to the project’s requirements and architecture, so I could hand it to an agent the way I would hand it to a person.

---

<!-- S122 · nacio-deep-work-plan -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S122" -->

<p class="aod-punch aod-punch--xs">That is how <span class="aod-accent">Deep Work Plan</span> was born.</p>
<img class="aod-art aod-art--xxl aod-art--framed" src="/images/blog/posts/deep-work-plan/figure-humans-steer-en.webp" width="1600" height="957" alt="Deep Work Plan infographic: humans steer and agents execute, with a captain at the helm pointing the way">

Note: And that is how Deep Work Plan was born. It was my own need before it was a method: a way to communicate and plan so I could really delegate. I will explain it again calmly in a moment, but now you know where it comes from.

---

<!-- P16 · capitulo-8 -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-transition="none" data-aod-id="P16" -->

<div class="aod-chapter"><img class="" src="/images/blog/posts/deep-work-plan/hero-en.webp" width="1600" height="900" alt=""><div><p class="aod-kicker">Chapter 7 of 8</p><p class="aod-idea">Deep Work Plan: Give Your Agent a Plan and a Harness</p></div></div>

Note: Deep Work Plan: a plan and a harness so I can delegate hours of work and come back knowing it followed a verifiable direction.

---

<!-- S123 · dwp-contexto -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S123" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/hero.webp" width="680" height="850" alt="Engraving of a lighthouse on a rocky shore whose beam guides a small vessel"><div><p class="aod-kicker">Deep Work Plan</p><p class="aod-idea">Models matter. Context matters more.</p><p class="aod-body">It turns any repository into a structured environment, with context, guardrails and a durable plan, where any agent executes with precision and finishes long-horizon work.</p></div></div>

Note: I will walk through Deep Work Plan act by act, with the plates from its website, deepworkplan.com. The core idea fits in one sentence: models matter, but context matters more. Like a lighthouse: it does not push the ship, it gives it a steady heading.

---

<!-- S124 · dwp-problema -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S124" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/problem.webp" width="1040" height="1300" alt="Engraved diptych: a ship adrift among rocks and the same ship steady on a course to a harbor"><div><p class="aod-kicker">The problem and the answer</p><p class="aod-idea">An agent shines on short tasks. On long ones, it drifts.</p><p class="aod-body">In a migration or a refactor at scale the context window fills and earlier decisions fade. The answer: a durable plan, atomic tasks and validation gates.</p></div></div>

Note: The problem we already saw: an agent shines on short tasks, but on long missions it drifts. The diptych shows it: on the left the ship adrift among rocks; on the right, the same ship on a plotted course. The answer is spec-driven development: a durable plan, atomic tasks and validation gates.

---

<!-- S125 · dwp-economia-contexto -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S125" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/context.webp" width="1600" height="1000" alt="Engraving of a cabin with a balance scale weighing cargo crates against a strongbox beside a ledger"><div><p class="aod-kicker">The economy of context</p><p class="aod-idea">Context is your agent’s scarcest resource.</p><p class="aod-body">So the harness keeps its own instructions lean and auditable: they load progressively, and each task gets only the context relevant to its work.</p></div></div>

Note: Every token counts, and the scale says so: context is your agent’s scarcest resource. That is why instructions load progressively and each task gets only what it needs. And plans scale: Lite for a bounded fix, Full for work that spans hours.

---

<!-- S126 · dwp-roles -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S126" -->

<div class="aod-act aod-act--flip"><img src="/images/slides/the-art-of-directing-agents/dwp-site/steer.webp" width="1600" height="1000" alt="Engraving of a captain at the helm pointing the way while the crew works the sails"><div><p class="aod-kicker">Division of labor</p><p class="aod-idea">Humans steer. Agents execute.</p><p class="aod-body">You decide what “done” means and where the lines are. The plan carries your intent; the agents do the hours, no babysitting and no correcting every twenty minutes.</p></div></div>
<div class="aod-row "><span class="aod-chip aod-chip--accent">You: intent, acceptance criteria, review</span><span class="aod-chip aod-chip--accent">Agents: execution, task by task</span><span class="aod-chip aod-chip--accent">The plan: the contract between them</span></div>

Note: Here is the division of roles, with the captain at the helm. You decide what done means and where the lines are; the agents do the hours. No babysitting and no correcting every twenty minutes. The plan is the contract between you.

---

<!-- S127 · dwp-bucle -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S127" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/drift.webp" width="1600" height="1000" alt="Engraving of a sailboat safe inside a stone lock with a faint dashed wake trailing away"><div><p class="aod-kicker">The core loop</p><p class="aod-idea">A plan agents can’t drift from.</p><p class="aod-body">Long tasks fill any model’s context and details fall away. A written plan is what the agent returns to, lap after lap.</p></div></div>
<div class="aod-chain"><span class="aod-node ">Plan</span><span class="aod-arrow">→</span><span class="aod-node ">Atomic tasks</span><span class="aod-arrow">→</span><span class="aod-node ">Validation gates</span><span class="aod-arrow">→</span><span class="aod-node ">Completion</span><span class="aod-arrow">→</span><span class="aod-node ">Resumable state</span></div>

Note: The core loop, with the sailboat safe inside the lock: plan, atomic tasks, validation gates, completion and resumable state. Long tasks fill any model’s context; the written plan is what the agent consults again and again, which is why it does not drift in silence.

---

<!-- S128 · dwp-contrato -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S128" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/contract.webp" width="1600" height="1000" alt="Engraving of a hand pressing a wax seal onto a contract with blank check rows"><div><p class="aod-kicker">Acceptance criteria</p><p class="aod-idea">Done is a contract, not a vibe.</p><p class="aod-body">Each task names its acceptance criteria and the checks that must pass. The agent does not get to feel finished: it has to pass, or the task stays open.</p></div></div>
<div class="aod-row "><span class="aod-chip aod-chip--accent">Tests pass</span><span class="aod-chip aod-chip--accent">Types check</span><span class="aod-chip aod-chip--accent">Acceptance criteria met</span><span class="aod-chip aod-chip--accent">Or the task stays open</span></div>

Note: Done is a contract, not a vibe. Each task declares its acceptance criteria and the checks that must pass, and the seal is only stamped when they pass. Otherwise the task stays open, no matter how confident the agent sounds.

---

<!-- S129 · dwp-repo-harness -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S129" -->

<div class="aod-act"><img src="/images/slides/the-art-of-directing-agents/dwp-site/harness.webp" width="1600" height="1000" alt="Engraving of an archive chest with five blank hang-tags tied by string"><div><p class="aod-kicker">The architecture</p><p class="aod-idea">The repository is the harness.</p><p class="aod-body">Context, tools, guardrails and state live in your repository as plain files any agent can read. No lock-in, no external brain: it survives context resets.</p></div></div>
<div class="aod-row "><span class="aod-chip aod-chip--accent">SPEC</span><span class="aod-chip aod-chip--accent">TASKS</span><span class="aod-chip aod-chip--accent">CHECKS</span><span class="aod-chip aod-chip--accent">STATE</span><span class="aod-chip aod-chip--accent">TOOLS</span></div>

Note: The chest with five tags: spec, tasks, checks, state and tools. Everything lives in the repository as plain files any agent can read. There is no external brain to depend on, so the work survives when the context resets.

---

<!-- S130 · desbloqueo -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S130" -->

<p class="aod-kicker">With this methodology installed</p>
<p class="aod-idea">I unlocked the ability to hand an agent <span class="aod-accent">autonomous work</span> for <span class="aod-accent">hours</span>, with the confidence that when I come back to review, it will be done right.</p>
<div class="aod-chain"><span class="aod-node ">delegate</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">hours of autonomous work</span><span class="aod-arrow">→</span><span class="aod-node aod-node--ok">review with confidence</span></div>

Note: This is what Deep Work Plan gave me: with this methodology installed I unlocked the ability to hand an agent autonomous work for hours. And most important, the confidence that when I come back to review, it will be done right. That confidence is what changes how I work.

---

<!-- S131 · cuello-de-botella -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S131" -->

<p class="aod-kicker">And then something happened</p>
<p class="aod-idea">My agents were doing the work really well.</p>

Note: Then I started to notice something. This was working so well and my agents were doing such good work that something had to change. Look at what happened next.

---

<!-- S136 · cuello-de-botella -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S136" -->

<p class="aod-punch aod-punch--xs">I became the <span class="aod-accent">bottleneck</span>.</p>
<img class="aod-art aod-art--xxl" src="/images/slides/the-art-of-directing-agents/art/cuello-de-botella.webp" width="1536" height="1024" alt="Illustration of an overwhelmed person in the center receiving tasks from six agents working at full speed">

Note: And there the slow piece of the system started being me. The agents moved fast, but everything had to go through me: I became the bottleneck of my own agents.

---

<!-- S137 · arquitectura-contenedores -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S137" -->

<p class="aod-kicker aod-kicker--tight">How our container architecture works</p>
<img class="aod-art aod-art--xxl" src="/images/slides/the-art-of-directing-agents/art/repos-docker.webp" width="1672" height="941" alt="Five repositories (backend, web app, bot microservices, dailybot.com and others), each in its own Docker container with an isolated AI agent">
<p class="aod-sr">backend, web app, bot microservices, dailybot.com site and others. One isolated agent per container.</p>

Note: This is how our architecture works. Each repository, the backend, the web app, the bot microservices, dailybot.com and the rest, runs in its own Docker container, and inside each one an isolated agent works. Each agent sees only its own environment, and that is what has worked so well for us.

---

<!-- S132 · puente-entre-agentes -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S132" -->

<p class="aod-punch aod-punch--xs">I was the <span class="aod-accent">bridge</span> between agents in different containers.</p>
<img class="aod-art aod-art--xxl" src="/images/slides/the-art-of-directing-agents/art/puente-agentes.webp" width="1672" height="941" alt="A person in the middle passing messages between an agent in the Web container and another in the API container">

Note: And that was the problem: each agent lived isolated in its own container, so they could not talk to each other. The only communication channel was me. I carried the messages from one side to the other, as the bridge between the web agent and the API agent.

---

<!-- S138 · conoci-herdr -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S138" -->

<p class="aod-punch aod-punch--s">I had that problem until I discovered <span class="aod-accent">Herdr</span>.</p>
<img class="aod-art aod-logo-herdr" src="/images/slides/the-art-of-directing-agents/community/herdr-logo.webp" width="1776" height="433" alt="Herdr logo">

Note: I lived with that ping-pong for quite a while, until I discovered Herdr. Now I will explain what it is and how I use it, because it is what got me out of the middle.

---

<!-- S139 · que-es-herdr -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S139" -->

<p class="aod-kicker">What is Herdr?</p>
<p class="aod-idea aod-idea--xs">A terminal workspace where each agent lives in its own pane.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/herdr-hub.webp" width="1672" height="941" alt="Herdr as an agent orchestration hub: five machines with Docker containers and AI agents sending messages to each other">

Note: Herdr is a workspace in the terminal. The idea is simple: each agent lives in its own pane, and I can see and manage several at once. So far it looks like one more terminal manager; the interesting part is on the next slide.

---

<!-- S149 · control-desde-el-celular -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S149" -->

<p class="aod-idea aod-idea--s">And I can control it <span class="aod-accent">from my phone</span>.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/herdr-celular.webp" width="1672" height="941" alt="A hand holds a phone showing the Herdr dashboard with five machines, their containers and agents, surrounded by the Web, Backend, Bot Services, Dailybot.com and other machines">

Note: And this is what I like most: since everything is connected, I can see and control my machines, containers and agents remotely, even from my phone. I check what is happening, see recent activity and keep supervising without being in front of my computer.

---

<!-- S140 · direccion-del-agente -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S140" -->

<p class="aod-idea aod-idea--s">Every agent has an address: <span class="aod-accent">machine + pane</span>.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/agent-address.webp" width="1774" height="887" alt="Three containers with one agent each; under each one its address: machine and pane (machine A pane w1:p1, machine A pane w2:p1, machine B pane w1:p1)">
<p class="aod-sub">And machines can be containers.</p>

Note: What changes everything: each agent has an address, made of the machine and the pane where it lives. And those machines can be my containers, which already run an SSH service. The names you see are illustrative.

---

<!-- S141 · escribirse-directo -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S141" -->

<p class="aod-idea">One agent can write <span class="aod-accent">directly</span> to another.</p>
<div class="aod-terminal"><div class="aod-terminal__bar"><i></i><i></i><i></i></div><div class="aod-terminal__line dim">$ herdr --machine &lt;machine&gt; agent prompt &lt;pane&gt; "..."</div><div class="aod-terminal__line hot">→ the agent in the other container receives the prompt</div></div>

Note: With one command, an agent sends a prompt to another agent, no matter which container it is in. It is the same prompt I used to copy and paste by hand, but now it travels on its own, agent to agent.

---

<!-- S142 · permiso-de-respuesta -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S142" -->

<p class="aod-idea">Every message carries the permission and the address to <span class="aod-accent">reply</span>.</p>
<div class="aod-chain"><span class="aod-node ">web agent</span><span class="aod-arrow">→</span><span class="aod-node aod-node--hot">question + how to reply</span><span class="aod-arrow">→</span><span class="aod-node ">API agent</span></div>
<p class="aod-sub">The other agent answers on its own, without asking me.</p>

Note: Each message includes the authorization and the exact address to reply to. That way the other agent answers by itself, without stopping to ask me and without waiting for me to act as the messenger.

---

<!-- S144 · contenedores-no-islas -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S144" -->

<p class="aod-idea aod-idea--s">Containers stopped being islands.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/islas-conectadas.webp" width="1774" height="887" alt="Two floating islands, the Web container and the API container, with an agent on each exchanging messages in both directions">
<p class="aod-sub">I am no longer the bridge: I supervise the conversation.</p>

Note: With this, containers stopped being islands. The web agent and the API agent talk to each other directly, and I stopped being the bridge. I stay supervising the conversation, which is the work that is actually mine.

---

<!-- S146 · superviso -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S146" -->

<p class="aod-idea aod-idea--s">The agents talk to each other. <span class="aod-accent">I supervise.</span></p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/supervisando.webp" width="1774" height="887" alt="A smiling person watches from the center while the web agent and the API agent exchange messages between their containers">

Note: And this is how I see myself now: watching, calm, while the two agents pass messages between their containers. Before, I carried every message from one side to the other; today I supervise the conversation and step in only when a decision of mine is really needed.

---

<!-- S145 · n-agentes -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S145" -->

<p class="aod-punch aod-punch--s">I unlocked <span class="aod-accent">N agents</span> talking to each other.</p>
<p class="aod-sub">From messenger to director.</p>

Note: This is what Herdr unlocked: not two agents but N agents, talking to each other without everything going through me. I stopped being the messenger and went back to being the one who directs.

---

<!-- S147 · agente-lider -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S147" -->

<p class="aod-idea aod-idea--s">Now I direct a <span class="aod-accent">lead agent</span> and it orchestrates the rest.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/agente-lider.webp" width="1672" height="941" alt="A person watches calmly while a lead agent, on top of Herdr, coordinates the agents in the Web, API, Bot Services, Dailybot.com and other containers">

Note: And this is the next step. I no longer talk to each agent: I direct a lead agent, and it orchestrates the rest, through Herdr, across all the containers. I stay with what is mine: the intent, the architecture and the review.

---

<!-- S150 · nuevo-problema -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S150" -->

<p class="aod-kicker">And a new problem showed up</p>
<p class="aod-idea aod-idea--xs">With that great setup, I needed to run <span class="aod-accent">several plans in parallel</span>, on completely different jobs.</p>
<img class="aod-art aod-art--hub aod-art--framed" src="/images/slides/the-art-of-directing-agents/art/planes-paralelos.webp" width="1672" height="941" alt="A person in the center oversees six parallel workstations, each with agents coding, analyzing data, designing, managing infrastructure, writing documents and testing quality">

Note: After building this great setup, a new problem showed up. One set of agents was no longer enough: I needed to run several plans in parallel, each on a completely different job.

---

<!-- S151 · clonar-repos -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S151" -->

<p class="aod-idea aod-idea--xs">The first thing I did was <span class="aod-accent">clone the repositories</span>.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/clones-api-puertos.webp" width="1672" height="941" alt="A Herdr orchestration hub on port 8000 connected to five cloned API containers, each with its own agent and its own port (8001 to 8005)">
<p class="aod-sub">Worktrees were not enough: I need the whole environment to run the tests.</p>

Note: The first thing I did was clone the repositories. For my needs worktrees are not enough, because I need the whole environment to run the tests and everything else, not just a copy of the files.

---

<!-- S154 · workspaces -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S154" -->

<p class="aod-kicker">Our solution</p>
<p class="aod-idea aod-idea--xs">Scripts and an <span class="aod-accent">internal CLI</span> to create <span class="aod-accent">workspaces</span>.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/workspaces-cli.webp" width="1672" height="941" alt="A CLI that creates workspaces: each workspace groups API, web and other repository containers, a lead agent with its agents and a task list">
<p class="aod-sr">A workspace is a cloned environment that groups several repositories and brings up its own Docker container. It works like a worktree, but it is a full clone.</p>

Note: So we came up with a system of internal scripts and an internal CLI to create workspaces. A workspace works like a worktree, but it is really a clone too: a cloned environment where I group several repositories and bring up its own Docker container.

---

<!-- S155 · caddy -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S155" -->

<p class="aod-idea aod-idea--xs">A <span class="aod-accent">Caddy</span> load balancer decides which workspace takes the main port.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/caddy-workspaces.webp" width="1672" height="941" alt="localhost:8000 goes through Caddy, a load balancer that routes to the workspace in focus (B); each workspace has its repo and its app on internal port 8080 and its own random port">
<p class="aod-sub">I switch focus and the chosen workspace answers on port 8000 in the browser.</p>

Note: All workspaces use the same port inside Docker, for example 8080 or 8000, but each one also has a random port. An intermediate Caddy load balancer lets me choose which one takes the main port at any moment, and I can switch focus to open it in the browser on my machine. The numbers on the slide are illustrative.

---

<!-- S156 · lider-por-workspace -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S156" -->

<p class="aod-idea aod-idea--xs">In each workspace, a <span class="aod-accent">lead agent</span> with N agents. In parallel, another workspace with another job.</p>
<img class="aod-art aod-art--strip" src="/images/slides/the-art-of-directing-agents/art/roles-distintos.webp" width="953" height="474" alt="Seven faces of the same person, separated by vertical bars">
<p class="aod-sub aod-accent">I gave each workspace a different role.</p>
<p class="aod-sr">workspace 1: lead agent, N agents, feature A. workspace 2: lead agent, N agents, migration B.</p>

Note: So in each workspace I have a lead agent that distributes the work among N agents, and in parallel, in another workspace, I can be working on something totally different. That is the step from directing one plan to directing several plans at once.

---

<!-- S157 · roles-detras-de-caddy -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S157" -->

<p class="aod-idea aod-idea--xs">Each workspace with its own <span class="aod-accent">role</span>, all behind Caddy.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/workspaces-roles.webp" width="1672" height="941" alt="Seven workspaces connected to Caddy, each with its role, internal port 8080 and its external port; Dennis has the focus">

Note: This is how I picture it: each workspace has a different role, with its own personality, its agents and its containers, and all of them sit behind Caddy. I decide which one has the focus at any moment, and meanwhile the others keep working on their own thing.

---

<!-- S158 · n-workspaces -->

<!-- .slide: class="aod aod-airy" data-background-color="#0f1124" data-aod-id="S158" -->

<p class="aod-idea aod-idea--xs"><span class="aod-accent">N workspaces</span> working on parallel tasks.</p>
<img class="aod-art aod-art--hub" src="/images/slides/the-art-of-directing-agents/art/n-workspaces.webp" width="1672" height="941" alt="A smiling person relaxes in a chair while seven workspaces with different roles, behind Caddy, work on parallel tasks">

Note: And the result is this: N workspaces working on parallel tasks, each with its lead agent and its agents, while I supervise calmly. I switch focus between them when I need to look at or review one, and the others keep moving.

---

<!-- S148 · gracias -->

<!-- .slide: class="aod" data-background-color="#0f1124" data-aod-id="S148" -->

<img class="aod-photo aod-photo--red aod-photo--m" src="/images/authors/sergio-florez.webp" width="162" height="165" alt="Sergio Alexander Flórez">
<h2 class="aod-thanks-title">Thank you!</h2>
<p class="aod-thanks-name">Sergio Alexander Flórez Galeano</p>
<div class="aod-thanks">
<p>🌐 <a href="https://xergioalex.com" target="_blank">xergioalex.com</a></p>
<p>🐦 <a href="https://twitter.com/xergioalex" target="_blank">@xergioalex</a></p>
<p>💻 <a href="https://github.com/xergioalex" target="_blank">github.com/xergioalex</a></p>
<p>💼 <a href="https://linkedin.com/in/xergioalex" target="_blank">linkedin.com/in/xergioalex</a></p>
</div>

Note: I close by saying thank you and leaving my contact channels. If anything I shared is useful to you, I would love to hear how it goes when you try it.
