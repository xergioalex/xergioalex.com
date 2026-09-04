---
title: "China's Open-Weight Wave: Matched on the Work, Months Behind on the Weapon"
description: "Chinese labs now ship open-weight models that tie Mythos-class agents on coding work at a fraction of the price. The gap that remains tells the story."
pubDate: "2026-09-05"
heroImage: "/images/blog/posts/chinese-frontier-models-closing-the-gap/hero.webp"
heroLayout: "banner"
tags: ["tech", "ai-agents", "personal"]
keywords: ["Kimi K3 open weights", "Chinese AI models vs Claude", "GLM-5.3 benchmarks", "DeepSeek V4 pricing", "open weight frontier models 2026", "China AI models Mythos gap", "Terminal-Bench Chinese models", "AI export controls open weights"]
series: "the-agi-race"
seriesOrder: 3
---

*"Something that has become undeniable this month is that the best available open weight models now come from the Chinese AI labs."* When [Simon Willison](https://simonwillison.net/2026/Jul/27/kimi-k3/) — the developer whose independent model write-ups I've trusted longer than any benchmark site — writes a sentence like that, it's not hype. It's a man who tests these things for a living telling you the ground moved.

I spent the summer watching the American side of this story. The model too dangerous to release, then released, then [pulled off the market by its own government in three days](/blog/claude-fable-5-mythos-unleashed/). Suspensions, export controls, safety classifiers, a $100 million defensive coalition. While all of that was happening, a quieter story was unfolding on the other side of the race — one with no cliffhangers and no government directives. Just weights. Downloadable, nearly frontier-class, priced like a mistake.

This chapter is about that story. And I'll confess where I started: I assumed "Chinese models are near Mythos level" was the usual benchmark-season exaggeration. Then I read the tables. The claim is partly true, partly false, and the line between the two parts is the most interesting thing in the entire race.

---

## The Wave Nobody Hyped

Start with the timeline, because the density of it is the story:

| Date | Model | Lab | What shipped |
|------|-------|-----|--------------|
| April 24 | DeepSeek-V4 Preview | DeepSeek | Pro version at 1.6T parameters, MIT license, weights on Hugging Face |
| June 22 | GLM-5.2 | Z.ai (Zhipu) | Coding-focused, open weights |
| Mid-July | **Kimi K3** | Moonshot AI | 2.8T parameters, 1M-token context, weights public by July 27 |
| August 3 | Qwen3.8-Max | Alibaba | 2.4T parameters — closed, API-only |
| August 13 | DeepSeek V4-Pro GA | DeepSeek | General availability of the Pro tier |
| August 14 | **GLM-5.3** | Z.ai | Post-training gains only, weights staged two weeks later |

Six frontier-adjacent releases in four months, from five labs, while the American frontier managed one public launch and one government suspension. Willison [tracked the arc all year](https://simonwillison.net/2026/Apr/24/deepseek-v4/): in April, DeepSeek V4 was "almost on the frontier, a fraction of the price." By late July, after Kimi K3's weights landed, his verdict had hardened into the sentence at the top of this post.

The adoption number that stopped me: Chinese models passed American models in Hugging Face downloads this spring — [41% of all downloads](https://www.csis.org/analysis/what-know-about-chinese-ai-models) over the prior year, per CSIS, the Washington-based security think tank. That's not developers being curious. That's the world's builders quietly routing around an American frontier that keeps locking its own doors.

---

## What "Near Mythos" Actually Means

Here's where I have to be careful, because "near Mythos level" is doing a lot of work in that sentence, and the honest answer depends on which capability you measure.

The most useful single table comes from an unexpected place: [Z.ai's own GLM-5.3 announcement](https://z.ai/blog/glm-5.3), which publishes a comparison including Mythos 5, Fable 5, GPT-5.6 Sol, and Opus 4.8 — a Chinese lab voluntarily benchmarking against the American models it's chasing, footnotes and all. Three tiers fall out of it.

**Tier one: the work is a tie.** On Terminal-Bench 2.1 — real terminal tasks, the bread-and-butter of agentic coding — the spread across five labs is less than one point: GLM-5.3 at 88.2, Kimi K3 at 88.3, Fable 5 at 88.0, GPT-5.6 Sol at 88.8. On SWE-Marathon, a long-horizon coding test, Kimi K3 doesn't just tie the Americans — it beats them, 48.1 to Fable 5's 33.1. And on GDPval-AA v2, an economic-work benchmark run independently by Artificial Analysis, GLM-5.3 tops the entire table at 1769, ahead of Fable 5 and GPT-5.6 Sol.

Translation: for the work most of us actually delegate to these models — writing code, running terminals, completing tasks — the Chinese frontier isn't coming. It's here.

**Tier two: one real crossover.** On CyberGym, which measures finding vulnerabilities, GLM-5.3 scored 84.5 — above Mythos 5's 83.8 and Sol's 83.6. A Chinese model is now the best in the world at *discovering* security flaws, at least on that benchmark, in that harness.

**Tier three: the weapon gap.** But finding a vulnerability and weaponizing it are different jobs. On ExploitBench — chaining a flaw into a working exploit — GLM-5.3 scores 54.4 against roughly 78 for Mythos 5. On ExploitGym's longer runs, 105/130 against Mythos's 181/247. This is the exact capability that got Mythos classified as a weapon in April. And Z.ai, to its credit, says so in its own announcement: *"Capability is growing fastest exactly where we are furthest behind."*

That's the sentence I respect most in this entire chapter. A lab admitting, in print, that the scariest capability is the one it hasn't reached.

The independent measurements agree with the honest read. NIST's testing arm [assessed DeepSeek V4 Pro](https://www.csis.org/analysis/what-know-about-chinese-ai-models) as "eight months behind" leading US models in May. Contamination is a live issue too — DeepSeek's April preview scored 8% on a contamination-free coding benchmark versus its much higher self-reported numbers, and Qwen3.8-Max's frontier claims got labeled ["benchmaxxed"](https://www.reddit.com/r/singularity/comments/1ve0hp7/qwen_38_max_benchmarks/) by the community, with independent runs placing it near GLM-5.2, not the frontier.

So: matched on the work. Months, not years, behind overall. And still clearly behind on the deep exploitation chains that define "Mythos-class" in the first place. Anyone telling you China has fully caught up — or that it's hopelessly behind — is selling you a narrative.

---

## China Ran the Same Play

Here's the part that surprised me. I expected the Chinese story to be a contrast with the American one — open chaos versus controlled harnesses. It's not a contrast. It's a rhyme.

GLM-5.3's cyber capability developed faster than Z.ai expected during post-training, and the company's response [read like Anthropic's playbook](https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride): a staged rollout — security partners first, then the API, then weights — plus a request classifier and chain-of-thought monitoring. Suspiciously familiar, if you've read [my chapter on harnesses](/blog/the-harness-layer/). The whole industry watched what happened to Mythos and quietly adopted the template.

Z.ai even ran its own Glasswing. Working with Chinese security teams, GLM-5.2 and 5.3 identified [2,436 vulnerabilities across 269 projects](https://z.ai/blog/glm-5.3) — 107 of them critical, the oldest dating to 1981 — and published the findings in a public Security Disclosure Ledger. Lab-reported, to be clear; I found no independent audit. But the shape is unmistakable: find the holes, disclose them responsibly, patch the world. That's Project Glasswing with Chinese characteristics.

The difference is what happens after the harness. Nathan Lambert, the analyst behind Interconnects, put it bluntly: once open weights ship, "this type of safety barely matters" — anyone can take the model, strip the classifier, and run it. The harness governs the doorway, not the weights. For Fable, the doorway is the only way in. For GLM and Kimi, the weights walk out the door eventually, and then the harness is a suggestion.

---

## Eighteen Days

Now the irony, and I want to be precise about it because it's load-bearing.

On June 12, the US government forced Anthropic to switch off Fable 5 and Mythos 5 — the *filtered*, classifier-wrapped versions — for every user on Earth, because a jailbreak report raised the possibility of foreign access to Mythos-level cyber capability. For eighteen days, the most guarded frontier model in the West was unavailable to anyone. During those exact eighteen days, models scoring within a point of the American frontier on agentic work — and within reach on vulnerability discovery — were free downloads on Hugging Face, available in any country, to anyone, no vetting.

An FT op-ed called the suspension ["a gift to China"](https://www.ft.com/content/d286851f-dcf6-4284-93cc-99063e169c11) — paywalled, so I know the argument only secondhand, but the CSIS analysis makes the same case in the open: the June episode was the first time export controls were applied to *model access* rather than chips, and the perceived unreliability "will push users toward Chinese open weights." The June directive also spooked the allies — Canada, the UK, the EU, Australia and India all issued warnings about depending on American AI.

And one more datapoint that deserves to be famous: Epoch AI measured [a 3.5x spike in disclosed CVEs](https://epoch.ai/data-insights/cve-severity-spike) — real, published security vulnerabilities — in the period after the April Mythos and Glasswing announcement. The capability isn't a demo. It's in the vulnerability databases.

---

## What This Means for Those of Us Building

Let's get concrete, because this is a blog written for people who ship software.

The price table is its own argument. DeepSeek V4 Flash costs $0.14 per million input tokens and $0.28 per million output. Fable 5 costs $10 and $50. That's not a discount — that's a different universe, roughly 70x on the input side, for a model that Willison called "almost on the frontier" back in April. Kimi K3 sits at $3/$15, and GLM-5.3-Flash claims Opus-4.8-class coding at about 5% of the cost, runnable on a 128 GB Mac Studio. Your frontier-model bill is now a choice, not a fact.

The switching cost is near zero, too. On Hacker News, a developer described moving Claude Code to Kimi K3: ["it took like 30 seconds"](https://news.ycombinator.com/item?id=48981703). The agent harnesses we've spent two years building turn out to be model-agnostic. The harness is the moat; the model is a config file.

The caveats are real, though, and they're not the ones the headlines sell. Censorship varies by *vendor*, not by nationality — in one 168-question study, Kimi K2.5 [answered 98.8%](https://www.ellamind.com/blog/llm-censorship-bias-china) of sensitive-topic queries, a rate matching GPT and Claude, while DeepSeek failed 81% of them. "Chinese models are censored" is about as precise as "American models are safe." Which model matters more than which country.

And the distillation accusations — OpenAI and Anthropic alleging that Chinese labs extracted training data through 24,000 fraudulent accounts — are a reminder that this race has an industrial-espionage layer the benchmark tables don't show.

So where does that leave the race? I think it leaves it here: for the first time, the frontier is a choice with three doors. Hosted and guarded (Fable, with its classifiers and its government entanglements). Hosted and scaled (OpenAI — a story for a later chapter in this series). Or downloadable (Kimi, GLM, DeepSeek — capability you can own, with everything owning it implies). Capability stopped being the differentiator this year. Governance is what's left.

Willison said it best, and it's worth ending where we started: the best open-weight models now come from the Chinese labs. The best guarded ones come from America. The most interesting question of the next few years isn't which model wins — it's which door the world's builders walk through.

Let's keep building. Eyes open.

---

## Resources

- [Z.ai GLM-5.3 announcement](https://z.ai/blog/glm-5.3) — the lab-run benchmark table comparing GLM-5.3, Kimi K3, Mythos 5, Fable 5 and GPT-5.6 Sol, plus the vulnerability disclosure program
- [Simon Willison on Kimi K3](https://simonwillison.net/2026/Jul/27/kimi-k3/) — independent hands-on assessment of the 2.8T open-weight release
- [Simon Willison on DeepSeek V4](https://simonwillison.net/2026/Apr/24/deepseek-v4/) — "almost on the frontier, a fraction of the price," with verified pricing
- [Kimi K3 model card](https://huggingface.co/moonshotai/Kimi-K3) — specs, evals, and the custom license (>$20M-revenue model services need a separate agreement)
- [CSIS: What to know about Chinese AI models](https://www.csis.org/analysis/what-know-about-chinese-ai-models) — the 41% download share, NIST's "eight months behind" assessment, and the export-control analysis
- [Interconnects: How Chinese labs keep stride](https://www.interconnects.ai/p/glm-53-how-chinese-labs-keep-stride) — Nathan Lambert's analysis of GLM-5.3's staged release and what open weights do to safety
- [Epoch AI: CVE severity spike](https://epoch.ai/data-insights/cve-severity-spike) — the 3.5x rise in disclosed vulnerabilities after the Mythos announcement
- [ellamind: LLM censorship study](https://www.ellamind.com/blog/llm-censorship-bias-china) — censorship varies by vendor: Kimi 98.8% answer rate vs DeepSeek's 81% failure rate
