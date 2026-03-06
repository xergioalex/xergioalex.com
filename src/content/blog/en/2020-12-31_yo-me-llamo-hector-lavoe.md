---
title: "Yo Me Llamo Héctor Lavoe: Building a Personal Website for a Salsa Artist"
description: "The story of building a multimedia-rich personal website for a 'Yo Me Llamo' contestant who interprets Héctor Lavoe — embedded audio player, photo gallery, and the challenge of making a static site feel alive."
pubDate: "2020-12-31"
heroImage: "/images/blog/posts/yo-me-llamo-hector-lavoe/hero.png"
heroLayout: "banner"
tags: ["portfolio", "web-development", "personal", "design"]
---

Yuli called me sometime around 2017. We'd been friends since university — the kind of friendship that survives graduation and distance and years of barely talking, and then one day someone calls and it's like no time has passed at all.

"Could you build a website for my husband?"

Her husband is a salsa musician. Specifically, he impersonates **Héctor Lavoe** — the Puerto Rican legend — and he'd been on *Yo Me Llamo*, which for anyone outside Colombia is basically the biggest talent show in the country. Contestants pick a famous artist and become them on stage. The singing, the look, the mannerisms. It's huge here.

I said yes before she finished explaining what she needed.

---

## The ask

What she described was more than I expected. This wasn't a landing page with a bio and a contact form. The guy had decades of career material — photos from performances across the country, video recordings, a full biography that traced his path through multiple orchestras, and most importantly, music. Actual tracks he wanted people to hear right on the site.

So the feature list grew fast: audio player, photo gallery, video section, career biography, contact form, social links. Each one individually? Easy. All of them together in something that doesn't look like a Frankenstein of Bootstrap components? That's where it gets tricky.

---

## The audio player was the real problem

Everything else I'd done before in one form or another. Galleries, layouts, contact forms — standard web work. But embedding a music player that actually worked well? That was new territory for me.

I picked **[jPlayer](http://jplayer.org/)**, a jQuery-based HTML5 audio library. At the time it was one of the few options that let you build a custom UI without importing half the internet. The idea was simple: put the player in the header so the music is the first thing you encounter. You land on the site, you hear salsa. That's the whole point.

Getting jPlayer to play audio was the easy part. Getting it to look like it belonged on the site — that took forever. The default skin is ugly. There's no nice way to say it. I ended up writing custom CSS on top of it, fighting specificity wars with jPlayer's own styles, trying to make the controls match the gold-and-black color scheme of the rest of the site. At one point I was debugging a play button that worked in Chrome but showed up misaligned in Firefox by exactly 3 pixels. Three pixels. I spent an afternoon on three pixels.

And then there's mobile. Back then — and honestly I think it's still partially true — iOS Safari had its own opinions about when audio should autoplay and when it shouldn't. I had to add workarounds for the player to initialize properly on iPhones. The kind of workarounds you find on page 3 of a Stack Overflow thread from 2015.

---

## The rest of the stack

Nothing fancy: **HTML, CSS, JavaScript, LESS, a bit of PHP** for the contact form. No React. No bundler. You edit a file, refresh the browser, see if it worked. That kind of project.

LESS was the best decision I made. The site has six sections — home, trayectoria (his career), videos, gallery, music, and contact — and without a CSS preprocessor the stylesheet would've been unmanageable. I split everything into modules: `_gallery.less`, `_player.less`, `_layout.less`, and so on. Compiled into one file. Clean enough.

The PHP was minimal. Just the contact form sending an email. Looking at it now, the validation is... let's say optimistic. No CSRF tokens, no rate limiting. It worked, nobody abused it, but I wouldn't write it that way today.

---

## Designing for salsa

I knew two things about the visual direction early on: it had to feel like salsa — warm, energetic, alive — and it had to feel professional. This isn't a hobby musician posting SoundCloud links. This is someone who performs on national television.

Dark backgrounds. Gold accents. Bold uppercase typography for headers. High-contrast photography of the artist on stage. The "Yo Me Llamo" logo visible in the hero. It sounds obvious when I describe it, but getting the balance right between "festive" and "serious" took some iteration. Early versions were too dark — like a nightclub flyer. I had to pull back, add more breathing room, let the photos do the talking.

The gallery gave me more trouble than I expected. I remember going back and forth on thumbnail sizes — too small and you can't see anything, too big and the page is enormous on mobile. Aspect ratios were inconsistent because the photos came from different events, different cameras, different years. I ended up cropping everything to the same ratio and hoping nobody would notice the lost edges. Nobody did.

---

## What I'd do differently

I look at this site now and I see the developer I was at that point. The responsive breakpoints are too few — there's basically "desktop" and "phone" with nothing in between. The images aren't lazy loaded, so the gallery page loads everything upfront. The jPlayer integration works but the code is messy — lots of inline event handlers and jQuery callbacks that I'd structure completely differently today.

But it did what it needed to do. Yuli's husband had a place to send people. The music played. The photos looked good. The biography told his story. When someone asked "do you have a website?" he could say yes and hand them a URL that didn't embarrass anyone.

I think that's the part I value most about projects like this. They're not portfolio pieces you build to impress other developers. They're things you build because someone you care about needed help, and you happened to know how to help.

---

## Where it is now

The site isn't maintained anymore. The artist's career moved in other directions, and the web moved too — the stack is showing its age. But I kept it running at [yomellamohectorlavoe.xergioalex.com](https://yomellamohectorlavoe.xergioalex.com/) under my domain. A time capsule.

Looking back, the thing I remember most isn't the code or the design decisions. It's Yuli sending me her husband's photos and tracks over WhatsApp, the back-and-forth about which picture to use for the hero, the "it looks amazing" message when I sent her the first working version. That stuff doesn't show up in a git log, but it's the reason the project existed.

Let's keep building.

---

## Resources

- [Yo Me Llamo Héctor Lavoe — Live site](https://yomellamohectorlavoe.xergioalex.com/) — The website as it stands today
- [GitHub repository](https://github.com/xergioalex/yomellamohectorlavoe) — Source code
- [jPlayer](http://jplayer.org/) — The HTML5 audio/video library used for the music player
- [Yo Me Llamo — Caracol TV](https://www.caracoltv.com/yo-me-llamo) — The Colombian talent show
