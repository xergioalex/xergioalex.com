---
title: "Building sebastianmartinezvanegas.com: The Website I Built for a Talented Colombian Poet"
description: "How I built a portfolio website with Astro and Svelte for Sebastián Martínez Vanegas, a young Colombian poet who won the prestigious Emilio Prados International Poetry Prize."
pubDate: "2025-05-04"
heroImage: "/images/blog/posts/building-sebastian-martinez-website/hero.webp"
heroLayout: "side-by-side"
tags: ["portfolio", "tech", "personal", "web-development", "design"]
keywords: ["poet website Astro Svelte portfolio", "Sebastián Martínez Vanegas website", "building personal website for poet", "Astro portfolio site GitHub Pages", "Colombian poet Emilio Prados prize", "modern author website dark mode", "sebastianmartinezvanegas.com"]
---

In November 2024, my wife told me her cousin Sebastián had just won a major international poetry prize in Spain. Not a local award — an international one, with a cash prize, a book contract, and a press run that would reach readers in three countries. He was 28 years old.

"He still doesn't have a website," she said, almost as an aside.

That was all I needed to hear.

---

## A Poet Worth Knowing

Sebastián Martínez Vanegas was born in Pereira, Colombia in 1996. He studied Literary Studies at the Pontificia Universidad Javeriana in Bogotá — one of the most rigorous literature programs in the country — and has been publishing poetry in serious places for years: Periódico de Poesía (UNAM), Círculo de Poesía, and Poesía (Universidad de Carabobo). In 2021, he won the [Premio de Poesía Joven RNE-Fundación Montemadrid](https://letralia.com/noticias/2024/11/25/sebastian-martinez-vanegas-premio-poesia-emilio-prados-2024/) with *Coordenadas de un plano irrealizable*, published by Pre-Textos — one of Spain's most respected literary houses.

Then in 2023-2024, he was selected as a fellow at the [Fundación Antonio Gala para Jóvenes Creadores](https://www.elespectador.com/el-magazin-cultural/el-colombiano-sebastian-martinez-vanegas-gana-en-espana-el-premio-de-poesia-emilio-prados-noticias-hoy/), a residency in Córdoba that supports the most promising young artists and writers in Spain.

And in November 2024, he won the [XXV Premio Internacional de Poesía Emilio Prados](https://www.malaga.es/cultura/1315/com1_md3_cd-51151/) — one of the most prestigious poetry prizes in the Spanish-speaking world, awarded by the Diputación de Málaga — with *Tener un cuerpo es mala poesía*. The prize came with €6,000, publication by Pre-Textos, and an English translation. Coverage landed in [El Espectador](https://www.elespectador.com/el-magazin-cultural/el-colombiano-sebastian-martinez-vanegas-gana-en-espana-el-premio-de-poesia-emilio-prados-noticias-hoy/), [Noticias Caracol](https://www.noticiascaracol.com/entretenimiento/escritor-colombiano-sebastian-martinez-vanegas-gano-el-premio-de-poesia-emilio-prados-rg10), and [Infobae](https://www.infobae.com/america/agencias/2024/11/22/el-colombiano-sebastian-martinez-vanegas-gana-en-espana-el-premio-de-poesia-emilio-prados/).

He's the kind of writer who gets written about in serious newspapers, who has a real body of work, and whose career is clearly going somewhere. And his digital presence was basically an Instagram account.

---

## Why I Decided to Build It

When my wife told me about her cousin's award, it seemed like a good idea to help him gain better visibility. A poet at that level needs a web presence, and building websites is something I do well.

A writer published by Pre-Textos — one of Spain's most respected publishing houses — deserves more than an Instagram profile. Publishers, festivals, media, readers: they're all going to search his name on Google. They need to find something that represents him well. Not a bio link with three icons.

I met with Sebastián and told him what I wanted to do. But of course, it was his site — it had to reflect his style, not mine. So I went to the [Astro themes gallery](https://astro.build/themes/), looked for templates with a solid foundation and good design, and sent him about ten options I liked.

What surprised me was that my idea of what a poet's website should look like was completely different from Sebastián's vision. I was thinking of something more elaborate, with eye-catching sections and full-featured functionality. Sebastián wanted something very minimalist and simple: nothing flashy, no animations, no fancy sections. He told me how he'd like the look and feel of the site, and it was genuinely interesting to hear. I had already built a lot — dark mode support, multilingual setup for English and Spanish, a blog with detail pages — and we ended up dropping many of those features in favor of simplicity.

If you visit [sebastianmartinezvanegas.com](https://www.sebastianmartinezvanegas.com/) you'll find a clean homepage that explains who Sebastián is, set against a newspaper-like paper texture. In fact, the whole site ended up looking like a newspaper — clean, typographic, no ornaments. You can browse it yourself.

---

## The Stack

Same modern stack I've used for [xergioalex.com](/blog/new-website-xergioalex/) and [sergioykathe.com](/blog/building-wedding-website-sergioykathe/): **Astro + Svelte + TailwindCSS + TypeScript**, with Biome for linting and formatting.

From the templates I showed Sebastián, the one he picked was the [Aria theme](https://github.com/one-aalam/astro-ink) — a clean Astro template that gave me a reasonable foundation for a content-focused site. From there I customized everything: the layout, the color system, the typography, the component structure.

Astro was the right call for this kind of project. Sebastián's site is fundamentally a content site — biography, books, blog posts, a contact form. It doesn't need a heavy framework. Astro builds it all to static HTML, ships almost no JavaScript to the browser, and loads fast on any connection. Perfect for a literary portfolio that needs to be accessible internationally, including in places where connectivity isn't always ideal.

Dark mode, responsive design across all breakpoints, deployed on **GitHub Pages** with CI/CD via GitHub Actions. The repo hit 265 commits and v0.0.31 by May 2025.

---

## What the Site Has

The site is organized around what a reader or literary professional would actually want to know about an author.

**About** is the center of it: a full biography covering Sebastián's academic background, publications, awards, and residencies. This is the section that does the most work — it's what a literary journalist, a festival programmer, or a prize committee will read first.

**Books** has each of his published works with cover images, descriptions, publisher information, and links to Pre-Textos where you can actually buy them. When *Tener un cuerpo es mala poesía* came out, this section was ready.

**Blog Posts** is space for Sebastián's own writing — essays, notes, whatever he wants to publish directly. A poet who also writes prose deserves somewhere to put it that isn't a social platform.

**Contact** is simple: a form that works. For someone whose profile is growing, having a direct line that doesn't go through DMs matters.

Navigation is sticky and adapts on scroll — present but not intrusive. The overall design is minimalist on purpose. Literary sites that try to be visually overwhelming end up competing with the writing. The goal here was to put the work front and center and stay out of the way.

In the footer: "Desarrollado por XergioAleX." My quiet signature.

---

## Building Something for Family

Most of the projects I write about here have a client, a brief, a deadline. This one had none of those things. It had something different: a reason that didn't need explaining.

Sebastián won one of the most important prizes a young Spanish-language poet can win. He has two books published by one of Spain's best literary houses. He has been a fellow at a prestigious residency. He is being covered by major Colombian media. And he needed a website.

I could do that. So I did.

There's something I like about the intersection of technology and literature — the idea that the same tools used to build products and platforms can also be used to give visibility to someone making real art. Not every project needs a business model or a KPI. Sometimes a website is just a way of saying: this person's work matters, and here's somewhere you can find it.

Let's keep building.

---

## Resources

- **Live website:** [sebastianmartinezvanegas.com](https://www.sebastianmartinezvanegas.com/)
- **GitHub repository:** [xergioalex/sebastianmartinezvanegas.com](https://github.com/xergioalex/sebastianmartinezvanegas.com)
- **Book — Tener un cuerpo es mala poesía:** [Pre-Textos](https://pre-textos.com/producto/tener-un-cuerpo-es-mala-poesia/)
- **Award announcement:** [Diputación de Málaga](https://www.malaga.es/cultura/1315/com1_md3_cd-51151/)
- **Press coverage:** [El Espectador](https://www.elespectador.com/el-magazin-cultural/el-colombiano-sebastian-martinez-vanegas-gana-en-espana-el-premio-de-poesia-emilio-prados-noticias-hoy/) · [Noticias Caracol](https://www.noticiascaracol.com/entretenimiento/escritor-colombiano-sebastian-martinez-vanegas-gano-el-premio-de-poesia-emilio-prados-rg10) · [Infobae](https://www.infobae.com/america/agencias/2024/11/22/el-colombiano-sebastian-martinez-vanegas-gana-en-espana-el-premio-de-poesia-emilio-prados/)
