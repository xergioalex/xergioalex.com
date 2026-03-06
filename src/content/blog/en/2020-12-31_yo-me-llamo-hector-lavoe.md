---
title: "Yo Me Llamo Héctor Lavoe: Building a Personal Website for a Salsa Artist"
description: "The story of building a multimedia-rich personal website for a 'Yo Me Llamo' contestant who interprets Héctor Lavoe — embedded audio player, photo gallery, and the challenge of making a static site feel alive."
pubDate: "2020-12-31"
heroImage: "/images/blog/posts/yo-me-llamo-hector-lavoe/hero.png"
heroLayout: "banner"
tags: ["portfolio", "web-development", "personal", "design"]
---

Some projects come from client briefs. Some from side project energy. And some come from a friend asking: "Hey, could you build a website for my husband?"

That's how this one started.

---

## The backstory

Yuli was one of those friends from university you actually connect with — the kind of person you stay in touch with long after graduation. Her husband is a musician. Not just any musician — he's an impersonator of **Héctor Lavoe**, the legendary Puerto Rican salsa singer, and he competed on *Yo Me Llamo*.

For anyone outside Colombia: [Yo Me Llamo](https://www.caracoltv.com/yo-me-llamo) is a hugely popular TV show where contestants impersonate famous artists. Think of it as a talent show where the goal isn't to be yourself — it's to *become* someone else. The singing, the style, the stage presence. The audience and judges evaluate how close you get to the real thing.

Getting on that show is a big deal. And once you're on it, having a professional online presence matters. So Yuli reached out, and I said yes without thinking twice.

---

## What the site needed

This wasn't a typical portfolio or landing page. The requirements were driven by the content itself — an artist's career is inherently multimedia:

- **Music playback** — He needed visitors to actually *listen* to his performances. Not links to Spotify or YouTube. An embedded player, right there on the page.
- **Photo gallery** — Performance shots, event photos, behind-the-scenes images from the show. Organized and browsable.
- **Video section** — Concert recordings and TV appearances.
- **Biography** — A detailed career section covering decades of musical work across Colombia, from the Borinquen orchestra to national tours.
- **Contact** — A form for booking inquiries, plus social media links.

The challenge wasn't any single feature. It was making all of them coexist in a site that felt polished and cohesive — not like five different things duct-taped together.

---

## The audio player problem

The music section was the most interesting technical challenge. I needed a player that would work reliably across browsers, handle multiple tracks, and look good enough to match the site's visual identity.

I went with **[jPlayer](http://jplayer.org/)** — a jQuery-based HTML5 audio and video library. At the time, jPlayer was one of the better options for embedding custom audio players without pulling in a massive framework. It gave me control over the UI, supported playlists, and handled the cross-browser inconsistencies that made audio on the web such a headache back then.

Getting it to work was one thing. Making it *feel* integrated was another. The player sits in the header area of the site — always visible, always accessible. You land on the page and his music is right there. That was intentional. For an artist, the music should be the first thing people experience, not something buried three clicks deep.

Honestly, the hardest part was the styling. jPlayer gives you a functional player, but the default look is... generic. I spent more time tweaking the CSS for that player than I'd like to admit.

---

## Building the site

The stack was straightforward for the era: **HTML, CSS, JavaScript, LESS, and a bit of PHP** for the contact form. No framework. No build system. Just files, a preprocessor for styles, and the kind of frontend work where you open `index.html` in a browser and hit refresh.

The site has six main sections:

- **Home** — A full-width hero with the "Yo Me Llamo" branding, the artist performing on stage. Dark background, bold typography. The audio player integrated right into the header.
- **Trayectoria** (Career) — His musical journey from university to national tours. This section is long — the man has decades of experience across multiple orchestras and musical groups.
- **Videos** — Performance recordings and concert footage.
- **Galería** (Gallery) — Photo collections organized by event, with clickable thumbnails.
- **Música** (Music) — The jPlayer section with his tracks.
- **Contacto** (Contact) — Booking form, email, phone, social links.

LESS made the styling manageable. I could break things into modules — one file for the gallery, one for the player, one for the layout — and compile everything into a single CSS file. Without it, the stylesheet would have been a mess.

---

## Design decisions

The visual identity had to communicate two things: salsa and professionalism. This isn't a hobby musician — this is someone who performs on national television.

I went with a **dark color scheme** — mostly blacks and deep grays — with **gold/yellow accents** that reference the warmth of salsa music and Latin culture. The typography is bold and uppercase in the headers, more readable in the body. The hero section uses high-contrast photography — the artist on stage, microphone in hand, with the "Yo Me Llamo" logo visible.

One thing I struggled with was the gallery. Photo galleries sound simple until you actually build one. Thumbnail sizing, aspect ratios, loading performance, mobile behavior — each one is a small decision that compounds. I ended up with a grid of thumbnails that expand on click, organized by event type. Not groundbreaking, but functional and clean.

---

## What I learned

Building for a non-technical client — especially one in the arts — taught me things that pure engineering projects don't.

**Content drives everything.** I couldn't decide the layout until I knew what content existed. How many photos? How long is the biography? How many tracks? The answers to those questions shaped the architecture. Not the other way around.

**Audio on the web is harder than it looks.** Between browser inconsistencies, autoplay policies, and mobile limitations, getting a reliable audio experience was more work than building the rest of the site combined. I think audio is still one of the more neglected areas of web development.

**Personal projects carry weight.** This wasn't a big-budget client. There was no design team, no project manager, no Jira board. Just me, the content Yuli and her husband provided, and a lot of back-and-forth about what looked right. But I'm glad I did it. Building something for someone you care about has a different energy than building for a company.

---

## Where it stands today

The site is no longer actively maintained — the artist's career has moved on, and so has the web. But I kept it alive at [yomellamohectorlavoe.xergioalex.com](https://yomellamohectorlavoe.xergioalex.com/) as a subdomain of my personal site. It's a snapshot of a moment in time — both for the artist's career and for my own skills at that point.

Looking at it now, I see all the things I'd do differently. The responsive behavior could be better. The gallery could use lazy loading. The PHP contact form is a relic. But I also see something that works, that tells a story, and that served its purpose when it mattered.

Not every project needs to be cutting-edge. Sometimes it just needs to be right for the person you're building it for.

Let's keep building.

---

## Resources

- [Yo Me Llamo Héctor Lavoe — Live site](https://yomellamohectorlavoe.xergioalex.com/) — The website as it stands today
- [GitHub repository](https://github.com/xergioalex/yomellamohectorlavoe) — Source code
- [jPlayer](http://jplayer.org/) — The HTML5 audio/video library used for the music player
- [Yo Me Llamo — Caracol TV](https://www.caracoltv.com/yo-me-llamo) — The Colombian talent show
