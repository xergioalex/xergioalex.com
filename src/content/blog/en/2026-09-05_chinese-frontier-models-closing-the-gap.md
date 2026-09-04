---
title: "The Frontier Is a Free Download: China's Open-Weight Wave"
description: "China's labs matched the frontier on agentic work and made it a free download. What the 'near Mythos' claim gets right, what it misses, and what it costs."
pubDate: "2026-09-05"
heroImage: "/images/blog/posts/chinese-frontier-models-closing-the-gap/hero.webp"
heroLayout: "banner"
tags: ["tech", "ai-agents", "personal"]
keywords: ["Kimi K3 open weights", "Chinese AI models vs Claude", "GLM-5.3 benchmarks", "DeepSeek V4 pricing", "open weight frontier models 2026", "China AI models Mythos gap", "Terminal-Bench Chinese models", "AI export controls open weights"]
series: "the-agi-race"
seriesOrder: 3
---

For eighteen days in June, you could not rent the most guarded AI model in the West. You could download a near-match for free.

That sentence took me three weeks to actually believe. I lived through the first half of it in real time — [the export-control suspension](/blog/claude-fable-5-mythos-unleashed/), the model switched off worldwide, the whole drama of the filtered frontier pulling its own plug. The second half I had to go looking for, because nobody wrote headlines about it. While Fable 5 sat dark, the Chinese labs were shipping frontier-adjacent models as downloadable weights, to anyone, in any country, for the cost of a hard drive. No vetting. No coalition. No phone call from the Commerce Department.

By July, Simon Willison — the developer whose model write-ups I've trusted longer than any benchmark site — had seen enough to say it out loud: *"Something that has become undeniable this month is that the best available open weight models now come from the Chinese AI labs."* When Willison calls something undeniable, it's not a hot take. It's a man who tests these things for a living conceding the ground moved under him.

I want to be honest about where I started, because this chapter is partly a correction — mine. I assumed "Chinese models are near Mythos level" was benchmark-season exaggeration, the kind of claim that melts on contact with an independent test. Then I read the tables. The claim turned out to be partly true, partly false, and the line between the two halves is the most interesting thing in the entire race. So let me draw the line carefully.

---

## Six Launches, Four Months, Zero Press Conferences

The density of the wave is the story before any benchmark is. [DeepSeek V4](https://simonwillison.net/2026/Apr/24/deepseek-v4/) landed in April — a 1.6-trillion-parameter mixture-of-experts with MIT-licensed weights, while Mythos was still a rumor. GLM-5.2 followed in late June, ten days after the suspension. In mid-July, Moonshot — the lab behind the Kimi models — [released Kimi K3](https://simonwillison.net/2026/Jul/27/kimi-k3/): 2.8 trillion parameters, a one-million-token context, and full open weights on Hugging Face by July 27. Alibaba answered with Qwen3.8-Max in early August. DeepSeek shipped its Pro tier to general availability on August 13. And on August 14, Z.ai — a lab most Western readers had never heard of — released GLM-5.3, which is where this story gets complicated.

Six frontier-adjacent releases in under four months, from five labs, while the American frontier managed one public launch and one government suspension. Willison tracked the arc all year: in April he called DeepSeek V4 "almost on the frontier, a fraction of the price." By late July, the "almost" was gone.

And the world noticed quietly. Chinese models passed American models in Hugging Face downloads this spring — [41% of all downloads](https://www.csis.org/analysis/what-know-about-chinese-ai-models) over the prior year, per CSIS, the Washington security think tank. That number is not developers being curious. That is the world's builders routing, one dependency at a time, around an American frontier that keeps locking its own doors.

---

## The Claim, Taken Apart

"Near Mythos level" is doing a lot of work in one phrase, and the honest answer depends entirely on which capability you measure. The best evidence comes from an unexpected place: [Z.ai's own GLM-5.3 announcement](https://z.ai/blog/glm-5.3), which publishes a comparison table including Mythos 5, Fable 5, and GPT-5.6 Sol — a Chinese lab voluntarily bench-marking itself against the American models it's chasing, footnotes and all. You don't do that if you're hiding something. You do it if you think you're close.

**On the work, it's a tie — and I keep having to retype that sentence in disbelief.** Terminal-Bench 2.1 is real terminal tasks, the bread and butter of agentic coding, and the spread across five labs is less than one point: GLM-5.3 at 88.2, Kimi K3 at 88.3, Fable 5 at 88.0, GPT-5.6 Sol at 88.8. On SWE-Marathon, a long-horizon coding test, Kimi K3 doesn't close with the Americans — it beats them, 48.1 to Fable 5's 33.1. On GDPval-AA v2, an economic-work benchmark run independently by Artificial Analysis, GLM-5.3 tops the entire field at 1769.

Translation: for the work most of us actually delegate to these models — write the code, run the terminal, finish the task — the question "are they close?" is answered. The frontier isn't coming. It's here, and some of it has a download button.

**On one narrow capability, the crossover already happened.** CyberGym measures finding security vulnerabilities — the discipline that made Mythos terrifying. GLM-5.3 scored 84.5, above Mythos 5's 83.8 and GPT-5.6 Sol's 83.6. On that benchmark, a Chinese model is the best in the world at discovering security flaws.

**And on the capability that started this whole saga, the gap is real.** Finding a vulnerability and weaponizing it are different jobs. On ExploitBench — chaining a flaw into a working exploit, the exact test that got Mythos classified as a weapon in April — GLM-5.3 scores 54.4 against roughly 78 for Mythos 5. On ExploitGym's longer runs, it's 105 out of 130 points where Mythos takes 181. And here is the sentence that earned more of my respect than any benchmark in this chapter: Z.ai says this, about itself, in its own launch post. *"Capability is growing fastest exactly where we are furthest behind."* A lab admitting in print that the scariest capability is the one it hasn't reached — I've never seen an American launch say anything like it.

The independent measurements back the honest read. NIST's testing arm assessed DeepSeek V4 Pro in May as ["eight months behind"](https://www.csis.org/analysis/what-know-about-chinese-ai-models) the leading US models. Contamination is a live issue — DeepSeek's April preview scored 8% on a contamination-free coding benchmark against far higher self-reported numbers, and Qwen3.8-Max's frontier claims got labeled ["benchmaxxed"](https://www.reddit.com/r/singularity/comments/1ve0hp7/qwen_38_max_benchmarks/) by the community, with independent runs placing it near GLM-5.2, not the frontier.

So the scoreboard reads: matched on the work, months not years behind overall, still clearly behind on the deep exploitation chains that define "Mythos-class" in the first place. Anyone telling you China has fully caught up — or that it's hopelessly behind — is selling you a narrative. The truth is more interesting than either, and it's sitting in a launch post from Beijing.

---

## Glasswing, with Chinese Characteristics

Here's the part that rewired how I think about this race. I expected the Chinese story to be the opposite of the American one — open chaos versus controlled harnesses. It's not the opposite. It's the same play, run by a different team.

GLM-5.3's cyber capability developed faster than Z.ai expected during post-training, and the company's response [read like Anthropic's playbook](https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride): a staged rollout — security partners first, then the API, then weights — plus a request classifier and chain-of-thought monitoring. Suspiciously familiar, if you've read [my piece on harnesses](/blog/the-harness-layer/). The whole industry watched what happened to Mythos and quietly adopted the template.

Z.ai even ran its own Glasswing. Working with Chinese security teams, GLM-5.2 and 5.3 identified [2,436 vulnerabilities across 269 projects](https://z.ai/blog/glm-5.3) — 107 of them critical, the oldest dating back to 1981 — and published the findings in a public Security Disclosure Ledger. Lab-reported, to be clear; I found no independent audit. But the shape is unmistakable: find the holes, disclose responsibly, patch the world. Project Glasswing with Chinese characteristics.

The difference is what happens *after* the harness. Nathan Lambert, the analyst behind Interconnects, put it with characteristic bluntness: once open weights ship, "this type of safety barely matters." Anyone can take the model, strip the classifier, run it raw. The harness governs the doorway. For Fable, the doorway is the only way in. For GLM and Kimi, the weights eventually walk out the door — and then the harness is a suggestion.

---

## What Eighteen Days Bought

Now back to the sentence this chapter opened with, because the arithmetic of it is brutal.

Washington switched off the *filtered*, classifier-wrapped, safeguarded model over a jailbreak report — and did it so broadly that even defenders lost access. During those eighteen days, models scoring within a point of the American frontier on agentic work, and within reach on vulnerability discovery, were free downloads in every country on Earth. An FT op-ed called the suspension ["a gift to China"](https://www.ft.com/content/d286851f-dcf6-4284-93cc-99063e169c11) — the argument is paywalled, but CSIS makes the same case in the open: the June directive was the first time export controls were applied to *model access* rather than chips, and the perceived unreliability "will push users toward Chinese open weights." The allies noticed. Canada, the UK, the EU, Australia, and India all issued warnings about depending on American AI.

One more datapoint that deserves to be famous and isn't: Epoch AI measured [a 3.5x spike in disclosed CVEs](https://epoch.ai/data-insights/cve-severity-spike) — real, filed, public vulnerabilities — in the period after the April Mythos and Glasswing announcements. Whichever side of this race you root for, the capability is no longer a demo. It's in the vulnerability databases.

---

## What This Means at the Keyboard

Enough geopolitics. This is a blog for people who ship software, so let's talk about your invoice.

DeepSeek V4 Flash costs $0.14 per million input tokens and $0.28 per million output. Fable 5 costs $10 and $50. That is not a discount; that's a different universe — roughly seventy times cheaper on input for a model Willison called nearly frontier-class back in April. Kimi K3 sits at $3/$15. GLM-5.3-Flash claims Opus-4.8-class coding at about 5% of the cost, and it runs on a 128 GB Mac Studio on your desk. Your frontier-model bill stopped being a fact this year. It's a choice now.

The switching cost is comically low. A developer on Hacker News described moving Claude Code to Kimi K3: ["it took like 30 seconds."](https://news.ycombinator.com/item?id=48981703) The harnesses we spent two years building — the context engineering, the skills, the guard rails — turn out to be model-agnostic. The harness is the moat now. The model is a config file.

The caveats are real, but they're not the ones the headlines sell. Censorship varies by *vendor*, not nationality: in a 168-question study, Kimi K2.5 [answered 98.8%](https://www.ellamind.com/blog/llm-censorship-bias-china) of sensitive-topic queries — a rate matching GPT and Claude — while DeepSeek failed 81% of them. "Chinese models are censored" is about as precise as "American models are safe." The model matters more than the flag. And the distillation accusations — OpenAI and Anthropic alleging Chinese labs extracted training data through 24,000 fraudulent accounts — are a reminder that underneath the benchmark tables, this is also an industrial-espionage story.

So where does the race actually stand, from the keyboard? Three doors, one frontier. Hosted and guarded — Fable, with its classifiers and its government entanglements. Hosted and scaled — OpenAI, whose answer was landing as I wrote this. Or downloadable — Kimi, GLM, DeepSeek: capability you can own, with everything owning it implies. Capability stopped being the differentiator this summer. Governance is what's left.

The frontier is a free download now. The moat moved — and for the first time in this series, I'm not sure anyone knows where it moved to.

Let's keep building. Eyes open.

---

## Resources

- [Z.ai GLM-5.3 announcement](https://z.ai/blog/glm-5.3) — the lab-run benchmark table comparing GLM-5.3, Kimi K3, Mythos 5, Fable 5 and GPT-5.6 Sol, plus the public vulnerability disclosure program
- [Simon Willison on Kimi K3](https://simonwillison.net/2026/Jul/27/kimi-k3/) — independent hands-on assessment of the 2.8T open-weight release
- [Simon Willison on DeepSeek V4](https://simonwillison.net/2026/Apr/24/deepseek-v4/) — "almost on the frontier, a fraction of the price," with verified pricing
- [Kimi K3 model card](https://huggingface.co/moonshotai/Kimi-K3) — specs, evals, and the custom license (model services above $20M revenue need a separate agreement)
- [CSIS: What to know about Chinese AI models](https://www.csis.org/analysis/what-know-about-chinese-ai-models) — the 41% download share, NIST's "eight months behind" assessment, and the export-control analysis
- [Interconnects: How Chinese labs keep stride](https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride) — Nathan Lambert on GLM-5.3's staged release and what open weights do to safety
- [Epoch AI: CVE severity spike](https://epoch.ai/data-insights/cve-severity-spike) — the 3.5x rise in disclosed vulnerabilities after the Mythos announcement
- [ellamind: LLM censorship study](https://www.ellamind.com/blog/llm-censorship-bias-china) — censorship varies by vendor: Kimi's 98.8% answer rate vs DeepSeek's 81% failure rate
