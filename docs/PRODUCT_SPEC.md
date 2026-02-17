# Product Specification

## Overview

**XergioAleX.com** is a personal website and blog for Sergio Alexander Florez Galeano (XergioAleX). It serves as a professional portfolio, blog platform, and personal brand presence — with a focus on clear positioning, social proof, and narrative-driven content.

## Brand Positioning

**Primary identity:** CTO & Builder — From Colombia to Y Combinator

Sergio is positioned as a **builder-leader**: someone who creates technology, builds companies, founds communities, and ships products relentlessly. DailyBot (YC S21) is the crown jewel of this builder identity.

**Value proposition:** A Y Combinator-backed CTO who has spent 10+ years building digital products, from AI-powered team platforms to open source tools, while founding tech communities and constantly shipping new projects.

## Vision

Create a modern, fast, and visually appealing personal website that:

- Communicates value within 3 seconds (CTO at DailyBot YC S21, builder of 20+ products)
- Tells a compelling origin story (math tutor → YC CTO)
- Showcases professional experience with specific metrics and achievements
- Provides a platform for sharing knowledge through blog posts
- Supports multiple languages for broader reach
- Delivers excellent performance and user experience
- Is easy to maintain and extend

## Target Audience

1. **Tech professionals** — Looking for inspiration or collaboration
2. **Startup founders/engineers** — Interested in YC-backed technical leadership
3. **Recruiters/press** — Seeking background on the DailyBot CTO
4. **Community members** — From Pereira or LATAM tech ecosystem
5. **Potential collaborators** — Interested in AI, open source, or speaking engagements

## Key Features

### 1. Homepage

**Purpose:** First impression and navigation hub — pass the 3-second test

**Sections (7 total, clear hierarchy):**
- **Hero Section** — Focused identity, value proposition, typewriter with achievement-focused words (CTO at DailyBot YC S21, Builder of 20+ products, Community Founder)
- **About Section** — Origin story narrative (Colombia → MSc → YC CTO) with specific metrics
- **Builder Section** — DailyBot + specific projects (Moltbot, Syntro, SysPrompt), 113+ repos
- **Blog Preview** — Elevated position, recent posts for thought leadership
- **Community Section** — Tech Talks, PereiraJS, Python Pereira — three communities co-founded
- **Beyond Code Section** — Consolidated personal interests (trading, sports, food)
- **Contact Section** — Ways to get in touch

### 2. Blog

**Purpose:** Share knowledge, tutorials, and thoughts

**Features:**
- Content Collections for structured posts
- Tag-based categorization
- Pagination for post listings
- Client-side search functionality
- Individual post pages with MDX support
- RSS feed for subscribers
- Hero images for posts

**Post Types:**
- Technical tutorials
- Personal reflections
- Industry insights
- Project showcases

### 3. About Page

**Purpose:** Detailed personal and professional information

**Content:**
- Extended biography
- Professional philosophy
- Interests and hobbies
- Career journey

### 4. Contact Page

**Purpose:** Enable communication

**Content:**
- Contact information
- Social media links
- Professional profiles (LinkedIn, GitHub)

### 5. Multilingual Support

**Purpose:** Reach broader audience

**Languages:**
- English (default) - `/`
- Spanish - `/es/`

**Implementation:**
- Separate route structure per language
- Language switcher in header
- `lang` prop passed to components

## Design Principles

### Visual Design

1. **Modern and Clean** — Minimalist aesthetic with purpose
2. **Dark Mode Support** — Toggle between light and dark themes
3. **Responsive** — Mobile-first design approach
4. **Consistent** — Unified color palette and typography

### Messaging Principles

1. **Tell a story, don't list activities** — Origin narrative over resume-style bullet points
2. **Lead with achievements** — YC S21 CTO, 20+ products, 3 communities before generic roles
3. **Use specific metrics** — 10+ years, 113+ repos, thousands of teams
4. **Clear CTA hierarchy** — One primary action (blog/projects) over many equal CTAs

### Color Palette & Typography

See **[Brand Guide](BRAND_GUIDE.md)** for the complete 5-color palette (Ninja Navy, Crimson Strike, Shadow Steel, Void Black, Pure White), typography system, logo variants, and detailed usage guidelines.

**Quick reference:**
```css
--color-main: #0f1124;      /* Void Black — dark mode base */
--color-secondary: #e41541; /* Crimson Strike — accent */
```

Additional brand colors: Ninja Navy `#152E45`, Shadow Steel `#637996`

## Technical Requirements

### Performance

- **Static Site Generation** - Pre-rendered HTML
- **Partial Hydration** - JavaScript only where needed
- **Optimized Assets** - Compressed images, purged CSS
- **Fast Load Times** - Target < 3s initial load

### SEO

- **Meta Tags** - Title, description, Open Graph
- **Sitemap** - Auto-generated XML sitemap
- **RSS Feed** - Blog subscription capability
- **Semantic HTML** - Proper heading structure

### Accessibility

- **Keyboard Navigation** - Full keyboard support
- **Screen Readers** - Proper ARIA labels
- **Color Contrast** - WCAG compliant colors
- **Focus States** - Visible focus indicators

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- No IE11 support required

## User Flows

### Primary Flow: Visitor Exploring Site

```
Landing Page
    │
    ├── Read About → About Page
    │
    ├── View Blog → Blog Listing
    │       │
    │       ├── Search Posts
    │       ├── Filter by Tag
    │       └── Read Post → Post Detail
    │
    ├── View Projects → Projects Section
    │
    └── Contact → Contact Page
```

### Blog Discovery Flow

```
Blog Index
    │
    ├── Browse Recent Posts
    │
    ├── Search (client-side)
    │       └── Results → Post
    │
    ├── Filter by Tag
    │       └── Tag Page → Post
    │
    └── Pagination
            └── Next Page → More Posts
```

## Content Strategy

### Blog Categories (Tags)

| Tag | Description |
|-----|-------------|
| `tech` | Technical tutorials and insights |
| `personal` | Personal thoughts and experiences |
| `talks` | Conference talks and presentations |
| `trading` | Trading and finance content |

### Content Schedule

- **Blog Posts**: Regular publishing (aim for consistency)
- **Portfolio Updates**: As projects complete
- **Profile Updates**: Annual review

## Future Enhancements

### Planned Features

1. **Newsletter Integration** — Email subscription for ongoing connection
2. **Hero CTA Button** — Primary CTA above the fold ("See what I build" → /portfolio)
3. **Comments System** — Discussion on posts
4. **Analytics** — Privacy-respecting analytics
5. **More Languages** — Additional translations
6. **Portfolio Gallery** — Enhanced project showcase
7. **Search Enhancement** — Full-text search
8. **Social Proof Visuals** — YC badge, GitHub stats, community member counts

### Technical Improvements

1. **Testing Suite** — Unit and E2E tests (Vitest, Playwright)
2. **CI/CD Pipeline** — Automated deployment
3. **Performance Monitoring** — Core Web Vitals tracking
4. **Image Optimization** — Astro Image component
5. **Custom Section Images** — Dedicated visuals for Builder, Community, Beyond Code

## Success Metrics

### Brand Effectiveness

- **3-second test:** Visitors immediately understand "YC-backed CTO who builds technology that empowers teams"
- **Homepage audit score:** Target 8+/10 on brand clarity, value proposition, and social proof
- **Section hierarchy:** 7 sections with clear visual weight (not 11 equal-weight sections)

### User Engagement

- Page views and unique visitors
- Time on site
- Blog post reads
- Contact form submissions
- Scroll completion rates

### Technical Performance

- Lighthouse scores (target: 90+)
- Core Web Vitals (LCP, FID, CLS)
- Build times
- Bundle sizes

### Content

- Number of blog posts
- Posts per category
- Content freshness

## Constraints

### Technical

- **Static hosting** - Cloudflare Pages (no server-side runtime)
- **Build time** - Keep reasonable for frequent updates
- **Bundle size** - Minimize JavaScript payload

### Content

- **Language** - Code and docs in English
- **Maintenance** - Single developer capacity

## Deployment

### Hosting

- **Platform**: Cloudflare Pages
- **Domain**: xergioalex.com
- **SSL**: Provided by GitHub

### Process

1. Build with `npm run build`
2. Output to `docs/` directory
3. Commit and push to repository
4. Cloudflare Pages serves from `dist/`

## Related Documentation

- [Architecture](ARCHITECTURE.md) — Technical implementation
- [Development Commands](DEVELOPMENT_COMMANDS.md) — Build scripts
- [Standards](STANDARDS.md) — Coding conventions
- [README](../README.md) — Project overview and quick start
