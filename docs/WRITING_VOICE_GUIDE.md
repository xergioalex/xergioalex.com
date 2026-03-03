# Writing Voice Guide

## 1. Purpose

Avoiding AI slop in blog content is critical. An internal audit identified 6 specific patterns that trigger the perception of AI-generated writing, and this document captures the author's authentic voice characteristics and provides a checklist to prevent AI-sloppy content going forward.

## 2. The Author's Voice (Based on Older Posts)

**Source posts:** "How We Got Into Y Combinator" (2024), "Looking for Product Market Fit" (2024)

### Authority
Hard-won, not assumed. "We learned..." not "Studies show..." Authority comes from lived experience, not citations.

### Sentence Rhythm
High variance. Short punchy openers ("We applied. And got rejected.") mixed with longer explanatory sentences. Not every sentence is the same length.

### Tangents and Asides
Strategic em-dash interruptions for mid-thought corrections: "Not to pitch. To listen." Parenthetical asides that show the author thinking out loud.

### Failure Voice
Direct, clinical, not self-pitying. Failure = data. "Most of them went nowhere." "Unit economics never worked." Failure is stated matter-of-factly, not dramatized.

### Roughness
Run-on sentences, thinking-out-loud moments. "Here's what I remember:" — not every transition is smooth. Some sentences trail off into observation rather than landing with a clean conclusion.

### Humor
Dry, self-aware. "We built the tool, but didn't build the audience."

### Specificity
Names products that failed (Bootstrup, Club Kechef, Lanzador, Neurocicla, Moli Market, KidTrix). Cites specific metrics ($1K to $5K to $15K MRR). Uses real project names, dates, and places.

### Signature Phrases
- "The problem:" diagnostic framing
- "Lesson:" after each failure
- "Let's keep building." as closer

### Confidence
Grounded in evidence, admits uncertainty ("I think that answer landed"). Never bluffs past what he knows.

### Things the Voice NEVER Does
- Hides uncertainty
- Exaggerates accomplishments
- Blames others
- Uses marketing language in the body
- Claims false modesty

## 3. AI Slop Patterns to AVOID

| Pattern | Example (BAD) | Example (GOOD) |
|---------|---------------|-----------------|
| Over-polishing | "That simplicity wasn't a limitation — it was the web's greatest feature. The barrier to entry was low. The feedback loop was instant." | "It worked. No bundlers, no transpilers, no configuration ritual before you could render Hello World." |
| Data obsession | 5 subsections of survey citations with tables: State of JS, Rising Stars, Stack Overflow, Aggregate Picture | "The surveys all point the same way: 88% retention. That's rare in JavaScript land." |
| Structural regularity | Every post: Hook > Problem > Solution > Data > Conclusion. Every section: Statement > Explanation > Code > Transition | Vary structure: sometimes code first, sometimes a question, sometimes just a 2-sentence section |
| No failure narratives | "Astro changed everything for me. When I first discovered it, the feeling was immediate" | "I spent hours on a broken config. Nothing rendered. Then I found the docs." |
| Length explosion | 5,000-10,000 word posts covering every angle | 2,500-4,000 words. Cut redundant evidence, merge similar sections |
| AI vocabulary | "genuinely," "comprehensive," "this is where X shines," "radical premise," "beautifully simple" | "actually," "real," "this is where they win," "simple bet," "small" |

## 4. Humanization Patterns to INCLUDE

- At least 1 failure or struggle per post (something that went wrong, took too long, or surprised you)
- At least 2 tangents or asides (em-dash interruptions, parenthetical thoughts)
- Mix of sentence lengths (some 5-word, some 30-word)
- At least 1 moment of uncertainty ("I'm not sure," "looking back," "honestly")
- Personal specifics (names, dates, places, project names, version numbers)
- Rough transitions (not every section needs a smooth bridge)
- At least 1 opinion stated without evidence ("I think," "in my experience")

## 5. No Placeholder Content (MANDATORY)

**Published posts must NEVER contain placeholder text.** Placeholders like `[AUTHOR: ...]`, `[TODO: ...]`, `[TBD]`, `[FIXME]`, or any bracketed instruction to "fill in later" destroy credibility — they are a visible signal that content was not fully reviewed.

- Replace placeholders with real content or remove the section entirely
- Run the grep below before publishing

```bash
grep -rn '\[AUTHOR:\|\[TODO:\|\[TBD\]\|\[FIXME\]' src/content/blog/
```

Expected: zero matches. If any match is found, fix before committing.

## 6. Pre-Publish Checklist

```
[ ] Does the post include at least 1 failure or struggle?
[ ] Is there at least 1 tangent or aside?
[ ] Are there moments of uncertainty or "I think"?
[ ] Is the data-to-opinion ratio balanced? (not stat > stat > stat)
[ ] Does the structure differ from the last 3 posts?
[ ] Is the word count under 5000? (or justified if longer)
[ ] Would the opening paragraph make sense as a text to a friend?
[ ] Read it aloud — does it sound like you talking, or a report?
[ ] Does every section have at least some sentence length variety?
[ ] Is there at least 1 sentence that starts with "Honestly" or "I think"?
```

## 7. AI Vocabulary Blocklist

Words and phrases to search for and replace before publishing:

| Phrase | Replace with |
|--------|-------------|
| "In the ever-evolving world of..." | Cut entirely |
| "The answer is clear:" | Just state the answer |
| "This is where X shines" | "this is where they win" or state the advantage |
| "leveraging" / "harnessing" | "using" |
| "revolutionary" / "game-changer" | Cut or be specific about what changed |
| "genuinely" (as intensifier) | "actually" or "real" or cut |
| "comprehensive" | Use specific count or cut |
| "best-in-class" | "best free option" or be specific |
| "radical premise" | "simple bet" or "obvious idea" |
| "beautifully simple" | "small" or "clean" |
| "worth highlighting" / "worth calling out" | Just state the thing |
| "the key insight" / "the key takeaway" | State the insight directly |
| "One of the key architectural decisions" | Just describe the decision |
| "It's like a law of..." | Cut forced metaphors |
| "X with superpowers" | Describe the actual capabilities |
| "What makes this X remarkable" | Just state the facts |
| "genuine architectural advantage" | "real advantage" |
| Three-part negation ("No X. No Y. No Z.") | Use 2-part, or a single sentence |
| "What excites me most about X isn't just Y. It's what they represent:" | "What I like about this stack isn't the benchmarks. It's the direction." |
| "I am particularly pleased with" | Cut — just show the thing |

### Quick search command

```bash
grep -rn 'genuinely\|comprehensive\|best-in-class\|beautifully\|radical premise\|worth highlighting\|worth calling out\|key insight\|key takeaway\|this is where.*shines\|game-changer\|revolutionary\|leveraging\|harnessing' src/content/blog/en/
```
