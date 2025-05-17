---
title: "“Abre la boca” en Temporales"
description: 'Texto de no ficción (¿o ensayo?, ¿o cuento?) escrito después de haber leído a Clarice Lispector y publicado en la revista Temporales (del MFA en Escrituras Creativas en Español de la NYU). “Solo vine a hacer este experimento por una razón: es porque leí ese cuento, hablo de «El huevo y la gallina», para que sepas; pero lo leí mal. Qué tristeza”.'
category: No ficción
date: 01/10/2020
link: https://wp.nyu.edu/gsas-revistatemporales/abre-la-boca/
---

I have been sharing some interesting tools on [X](https://x.com/0xKaibi) and also synchronizing them to my Telegram Channel. I saw that [Austin mentioned he is preparing to create a website](https://x.com/austinit/status/1817832660758081651) to compile all the shared content. This reminded me of a template I recently came across called [Sepia](https://github.com/Planetable/SiteTemplateSepia), and I thought about converting the Telegram Channel into a microblog.

The difficulty wasn't high; I completed the main functionality over a weekend. During the process, I achieved a browser-side implementation with zero JavaScript and would like to share some interesting technical points:

1. The anti-spoiler mode and the hidden display of the mobile search box were implemented using the CSS ":checked pseudo-class" and the "+ adjacent sibling combinator." [Reference](https://www.tpisoftware.com/tpu/articleDetails/2744)

2. The transition animations utilized CSS View Transitions. [Reference](https://liruifengv.com/posts/zero-js-view-transitions/)

3. The image lightbox used the HTML popover attribute. [Reference](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/popover)

4. The display and hiding of the "back to top" feature were implemented using CSS animation-timeline, exclusive to Chrome version 115 and above. [Reference](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timeline/view)

5. The multi-image masonry layout was achieved using grid layout. [Reference](https://www.smashingmagazine.com/native-css-masonry-layout-css-grid/)

6. The visit statistics were tracked using a 1px transparent image as the logo background, an ancient technique that is now rarely supported by visit statistics software.

7. JavaScript execution on the browser side was prohibited using the Content-Security-Policy's script-src 'none'. [Reference](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)

After completing the project, I open-sourced it, and I was pleasantly surprised by the number of people who liked it; I received over 800 stars in just a week.

If you're interested, you can check it out on GitHub.

<https://github.com/ccbikai/BroadcastChannel>

[![BroadcastChannel repository on GitHub](https://github.html.zone/ccbikai/BroadcastChannel)](https://github.com/ccbikai/BroadcastChannel)
