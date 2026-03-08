---
title: "Building kathelopez.com: A Website for My Wife's Psychology Practice"
description: "How I built a simple, no-framework static website to help my wife — an ABA therapist and neuropsychologist — establish her professional online presence. Bootstrap, GitHub Pages, and zero backend."
pubDate: "2020-08-16"
heroImage: "/images/blog/posts/building-kathelopez-website/hero.png"
heroLayout: "banner"
tags: ["portfolio", "tech", "personal", "web-development"]
---

Katherine needed a website.

Not a startup landing page. Not a SaaS product. A simple professional site for a psychologist building her career in Pereira, Colombia. My wife — Astrid Katherine López Vanegas — is an ABA therapist who works with children with neurodevelopmental disorders. She'd been growing her practice through referrals and word-of-mouth, but she didn't have a single place online where a parent could look her up, see her credentials, and reach out.

That's the kind of problem I can solve in a weekend. So I did.

---

## Why She Needed It

ABA therapy — Applied Behavior Analysis — is a specialized field. Most of Katherine's clients come through referrals from other professionals or clinics. But here's the thing: when a parent gets a referral, the first thing they do is Google the name. And if nothing shows up — no website, no professional profile, no way to verify credentials — that referral loses weight.

Katherine had over four years of experience working with children with special needs. She'd worked at Centro APAES, CGI Colombia, and was at Creer IPS Neurorehabilitación Integral. She had certifications in ABA therapy from Fono Genius, a diploma in neuropsychopedagogy, a psychology degree from Universidad Católica de Pereira. Later she'd go on to complete a master's in clinical neuropsychology at Universidad Internacional de Valencia. All of that — and no web presence.

I wanted to fix that. Not as a developer looking for a project, but as someone who wanted to help his wife's career.

---

## The Approach: Why I Chose No Framework

I know what you're thinking. I'm a full-stack developer. I work with Astro, React, serverless architectures, containers, CI/CD pipelines. I could have built this in Next.js. I could have spun up a headless CMS with a custom design system and automated deployments.

I didn't.

Here's why: Katherine's site is a single page. It has an about section, her experience, her services, a contact form, and her credentials. The content changes maybe twice a year — when she finishes a certification or updates her profile photo. There's no blog, no dynamic content, no user accounts. Nothing that justifies a build step, a framework runtime, or a hosting bill.

So I went with the simplest stack that would do the job: **HTML, SCSS, Bootstrap 4, jQuery, and GitHub Pages**. Total hosting cost: zero. Total framework overhead: zero. Time to deploy: push to `master`.

Honestly, the hardest part wasn't the technology. It was resisting the urge to overengineer it. I caught myself, more than once, thinking about adding a CMS "just in case" or setting up a proper build pipeline with Webpack. I had to remind myself: this isn't for me. It's for Kathe. She needs it to work, look professional, and stay up. That's it.

---

## What the Site Does

The site is a single `index.html` with several sections, all on one scrollable page.

### The Hero

At the top, a full-width banner with her name and a rotating text animation — the kind where words cycle through one by one:

*Soy Psicóloga. / Terapeuta. / Terapeuta ABA. / Neuropsicóloga.*

Simple CSS animation. Gives visitors an immediate sense of what she does without reading a paragraph.

### About Me

Her professional bio — who she is, her philosophy, her approach to therapy. The tone is warm and direct: she describes herself as empathetic, organized, and committed to improving her patients' psychological wellbeing. There's a professional photo next to the text.

### Resume

This is the section with the most structure. It uses a tabbed layout — Experience, Education, Certifications, Skills — so visitors can drill into whatever they're looking for without scrolling through everything.

Her experience section lists her positions chronologically: from her early work as a social psychologist at PSICO Salud y Transformación, through her ABA therapy roles at Centro APAES and CGI Colombia, to her current role at Creer IPS. Education covers her psychology degree and later her master's in clinical neuropsychology. Certifications include her ABA courses from Fono Genius and her behavioral modification specialization.

### Services

Focused on ABA therapy with in-home service — *servicio domiciliario*. This is a key differentiator. Katherine goes to the child's home rather than requiring families to travel to a clinic. For parents of children with neurodevelopmental disorders, that matters.

### Contact Form — The Clever Bit

This is probably the most interesting technical decision on the whole site. Katherine needed a way for potential clients to reach her. The obvious solution: a contact form with a backend — maybe a Node.js server, maybe a serverless function, maybe a third-party form service.

I used **Google Forms**.

Here's how it works: I created a Google Form with the fields I needed (name, email, phone, message). Then I reverse-engineered the form submission URL and wired up a custom-styled HTML form that POSTs directly to Google's endpoint. No server. No backend. No API keys. When someone fills out the form on kathelopez.com, the data goes straight to a Google Spreadsheet, and Katherine gets an email notification.

Zero cost. Zero maintenance. It took a few hours to get the JavaScript right — there was some trial and error with the form field IDs and the submission endpoint. But once it worked, it just kept working. Five years later, it's still the same code.

### Hosting: GitHub Pages

The entire site is hosted on **GitHub Pages** with a custom domain — `kathelopez.com`. Free HTTPS, automatic deployments on push, zero configuration beyond a CNAME file. I didn't need Vercel. I didn't need Netlify. I didn't need a VPS. Push to `master` and it's live. For a site that gets updated twice a year, this is the perfect hosting model.

### The Polish

The site uses [AOS](https://michalsnik.github.io/aos/) (Animate on Scroll) for subtle entrance animations. Elements fade in, slide up, and appear as you scroll down the page. It's a small touch, but it makes the site feel more polished than a flat static page. And since AOS is lightweight, it doesn't slow anything down.

Bootstrap's grid handles the responsive layout. The site looks good on desktop and mobile without me writing a single media query by hand. There's also a parallax effect on some sections — a background image that moves at a different speed as you scroll. Purely decorative, but it adds depth.

---

## The Brand

Katherine's visual identity went through an evolution. The initial version used a generic color scheme and no logo. But in February 2021, we redesigned the branding:

- A custom **"AK" monogram** — her initials, Astrid Katherine — with a blue-to-pink gradient that feels professional but not cold
- A primary brand color of **#c82c75** — a vibrant pink/magenta that she picked. Not my first choice, honestly. I would have gone with something more muted. But it's her site, her brand, her personality. And looking at it now, it works.
- **Poppins** from Google Fonts for clean, modern typography
- Consistent visual identity across every section

The logo sits at the top of the page and appears in the SEO card when someone shares the link on social media. That SEO card — the same image I'm using as the hero for this post — has her monogram, her services, and her contact info. Clean, recognizable.

---

## Five Years of Quiet Maintenance

Here's what I think is interesting about this project: the commit history tells the story of a website that grew with a career. Twenty-four commits over five years. Not a lot. But each one marks a real moment.

**August 16, 2020** — Launch day. I pushed the base template, added her name and profile picture, set up the SEO meta tags, configured the custom domain via CNAME, and got the hero banner and about section ready. Seven commits in one day. That's the "get it live" energy.

**September 13, 2020** — Contact form integration. Four commits to get the Google Forms submission working. The trial-and-error I mentioned earlier.

**February 22, 2021** — The big redesign. Removed the old generic assets, added the AK monogram logo, updated the primary color to #c82c75. This is when the site got its real identity.

**September 2022** — SEO refresh. Added Google Analytics GA4, updated the favicon, refreshed the meta tags and keywords. Three commits, all in one day. The "let me tighten this up" sprint.

**July 2025** — The most recent update. Katherine finished her master's in clinical neuropsychology at Universidad Internacional de Valencia, so I updated her education section, refreshed her profile photo, and added new skills. The site grew because she grew.

That's it. No major refactors. No framework migrations. No dependency updates that broke everything. The site does what it needs to do, and it's been doing it for five years without drama.

---

## What I Learned

Building for someone you love is different from building for a client. There's no scope document. There's no sprint planning. There's no "the stakeholder wants to add a feature." There's just: what does she need, and how do I make it good?

And the answer, in this case, was: keep it simple.

I could have used this project as a playground for new tech. I could have tried out a static site generator, set up automated deployments, added a contact form backend with serverless functions. But none of that would have served Katherine better. She doesn't need a CI/CD pipeline. She needs a page that loads fast, looks professional, and has a way for people to contact her.

The right tool for the job isn't always the newest one. Sometimes it's Bootstrap 4, jQuery, and a single HTML file deployed to GitHub Pages for free. And that's fine.

I also learned something about maintenance. When you build something simple, maintenance is simple too. I don't dread updating her site. There's no `npm audit` spitting out 47 vulnerabilities. There's no framework major version with breaking changes. There's no Webpack config to debug. I open `index.html`, change what needs changing, push, and it's done. That simplicity isn't a constraint — it's a feature I chose on purpose.

And maybe the biggest lesson: a developer doesn't need to prove anything with the tech stack. The result is what matters. Katherine's site has helped her connect with families, show her credentials, and present herself professionally. It didn't need React for that. It didn't need a database. It needed to exist, look good, and be easy to find.

Sometimes the most useful thing a developer can build isn't the most technically impressive. It's the thing that actually helps someone.

---

## Resources

- **GitHub repository:** [xergioalex/kathelopez.com](https://github.com/xergioalex/kathelopez.com)
- **Live website:** [kathelopez.com](https://www.kathelopez.com/)

---

Let's keep building.
