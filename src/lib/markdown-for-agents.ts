import type { CollectionEntry } from 'astro:content';

const SITE_URL = 'https://xergioalex.com';

/**
 * Site navigation structure shared across all agent markdown outputs.
 * Mirrors the navbar + footer links so AI agents can discover all pages
 * from any entry point — just like a browser user sees global navigation.
 */
interface NavLink {
  label: Record<string, string>;
  path: string;
  external?: boolean;
}

interface NavSection {
  title: Record<string, string>;
  links: NavLink[];
}

const SITE_NAV_SECTIONS: NavSection[] = [
  {
    title: { en: 'Main', es: 'Principal' },
    links: [
      { label: { en: 'Home', es: 'Inicio' }, path: '/' },
      { label: { en: 'Blog', es: 'Blog' }, path: '/blog' },
      {
        label: { en: 'Blog Series', es: 'Series del Blog' },
        path: '/blog/series/',
      },
      { label: { en: 'Contact', es: 'Contacto' }, path: '/contact' },
    ],
  },
  {
    title: { en: 'Work', es: 'Trabajo' },
    links: [
      { label: { en: 'Portfolio', es: 'Portafolio' }, path: '/portfolio' },
      { label: { en: 'DailyBot', es: 'DailyBot' }, path: '/dailybot' },
      { label: { en: 'Tech Talks', es: 'Charlas Tech' }, path: '/tech-talks' },
      { label: { en: 'Trading', es: 'Trading' }, path: '/trading' },
    ],
  },
  {
    title: { en: 'About', es: 'Acerca de' },
    links: [
      { label: { en: 'About Me', es: 'Sobre mí' }, path: '/about' },
      { label: { en: 'CV', es: 'CV' }, path: '/cv' },
      {
        label: { en: 'Entrepreneur', es: 'Emprendedor' },
        path: '/entrepreneur',
      },
      { label: { en: 'Foodie', es: 'Foodie' }, path: '/foodie' },
      { label: { en: 'Hobbies', es: 'Hobbies' }, path: '/hobbies' },
    ],
  },
  {
    title: { en: 'Connect', es: 'Conectar' },
    links: [
      {
        label: { en: 'GitHub', es: 'GitHub' },
        path: 'https://github.com/xergioalex',
        external: true,
      },
      {
        label: { en: 'LinkedIn', es: 'LinkedIn' },
        path: 'https://www.linkedin.com/in/xergioalex/',
        external: true,
      },
      {
        label: { en: 'X/Twitter', es: 'X/Twitter' },
        path: 'https://x.com/XergioAleX',
        external: true,
      },
      {
        label: { en: 'Instagram', es: 'Instagram' },
        path: 'https://www.instagram.com/xergioalex',
        external: true,
      },
    ],
  },
];

/**
 * Generate a site-wide navigation section for agent markdown.
 * Appended to all serialized outputs so AI agents can discover
 * every page from any entry point — mirrors the HTML navbar/footer.
 */
function generateSiteNavigation(lang: string): string {
  const prefix = buildUrlPrefix(lang);
  const heading = lang === 'es' ? 'Navegación del Sitio' : 'Site Navigation';
  const lines: string[] = ['', '---', '', `## ${heading}`, ''];

  for (const section of SITE_NAV_SECTIONS) {
    const sectionTitle = section.title[lang] || section.title.en;
    lines.push(`**${sectionTitle}:**`);
    for (const link of section.links) {
      const label = link.label[lang] || link.label.en;
      const url = link.external ? link.path : `${prefix}${link.path}`;
      lines.push(`- [${label}](${url})`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

interface PostSerializeOptions {
  slug: string;
  lang: string;
}

interface BlogIndexEntry {
  title: string;
  slug: string;
  description: string;
  pubDate: Date;
  tags?: string[];
}

interface BlogIndexOptions {
  lang: string;
  title: string;
  description: string;
}

interface PageSerializeOptions {
  slug: string;
  lang: string;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function buildUrlPrefix(lang: string): string {
  return lang === 'en' ? '' : `/${lang}`;
}

/**
 * One-line hint included in every .md mirror header so agents know how to
 * fetch Markdown for any other URL on the site via content negotiation
 * (see functions/_middleware.ts), without appending `.md` or parsing HTML.
 *
 * The header name and media type stay literal in every language — agents
 * parse those tokens. Only the surrounding prose is localized.
 */
export function buildMarkdownAccessLine(lang: string): string {
  if (lang === 'es') {
    return 'Markdown: envía el header `Accept: text/markdown` en cualquier URL para recibir Markdown en lugar de HTML.';
  }
  return 'Markdown: send header `Accept: text/markdown` on any URL to receive Markdown instead of HTML.';
}

/**
 * Serialize a blog post to agent-friendly Markdown.
 * Returns clean Markdown with metadata header + original body.
 */
export function serializePostToAgentMarkdown(
  post: CollectionEntry<'blog'>,
  options: PostSerializeOptions
): string {
  const { slug, lang } = options;
  const { title, description, pubDate, updatedDate, tags, heroImage } =
    post.data;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/blog/${slug}`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Published: ${formatDate(pubDate)}`);
  if (updatedDate) {
    lines.push(`Updated: ${formatDate(updatedDate)}`);
  }
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(buildMarkdownAccessLine(lang));
  if (tags && tags.length > 0) {
    lines.push(`Tags: ${tags.join(', ')}`);
  }
  if (heroImage) {
    lines.push(`Hero Image: ${SITE_URL}${heroImage}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  if (post.body) {
    lines.push(post.body.trim());
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

/**
 * Serialize a blog index listing to agent-friendly Markdown.
 * Returns a list of posts with links to their .md versions.
 */
export function serializeBlogIndexToMarkdown(
  entries: BlogIndexEntry[],
  options: BlogIndexOptions
): string {
  const { lang, title, description } = options;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/blog`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(buildMarkdownAccessLine(lang));
  lines.push(`Total posts: ${entries.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Posts');
  lines.push('');

  for (const entry of entries) {
    const postMdUrl = `${prefix}/blog/${entry.slug}.md`;
    const date = formatDate(entry.pubDate);
    lines.push(
      `- [${entry.title}](${postMdUrl}) — ${entry.description} (${date})`
    );
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

interface SeriesIndexEntry {
  title: string;
  slug: string;
  description: string;
  seriesOrder: number;
}

interface SeriesIndexOptions {
  slug: string;
  seriesTitle: string;
  seriesDescription: string;
  lang: string;
}

/**
 * Serialize a series index listing to agent-friendly Markdown.
 * Returns an ordered list of chapters with links to their .md versions.
 */
export function serializeSeriesIndexToMarkdown(
  entries: SeriesIndexEntry[],
  options: SeriesIndexOptions
): string {
  const { slug, seriesTitle, seriesDescription, lang } = options;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/blog/series/${slug}`;

  const lines: string[] = [];

  lines.push(`# ${seriesTitle}`);
  lines.push('');
  if (seriesDescription) {
    lines.push(`> ${seriesDescription}`);
    lines.push('');
  }
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(buildMarkdownAccessLine(lang));
  lines.push(`Total chapters: ${entries.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Chapters');
  lines.push('');

  const sorted = [...entries].sort((a, b) => a.seriesOrder - b.seriesOrder);
  for (const entry of sorted) {
    const postMdUrl = `${prefix}/blog/${entry.slug}.md`;
    lines.push(
      `${entry.seriesOrder}. [${entry.title}](${postMdUrl}) — ${entry.description}`
    );
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

interface SeriesListingEntry {
  slug: string;
  title: string;
  description: string;
  postCount: number;
  order: number;
}

interface SeriesListingOptions {
  lang: string;
  title: string;
  description: string;
}

/**
 * Serialize the series landing page (list of all series) to agent-friendly
 * Markdown. Returns an ordered list with links to each series' own .md index.
 */
export function serializeSeriesListingToMarkdown(
  entries: SeriesListingEntry[],
  options: SeriesListingOptions
): string {
  const { lang, title, description } = options;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/blog/series`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(buildMarkdownAccessLine(lang));
  lines.push(`Total series: ${entries.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Series');
  lines.push('');

  const sorted = [...entries].sort((a, b) => a.order - b.order);
  for (const entry of sorted) {
    const seriesMdUrl = `${prefix}/blog/series/${entry.slug}.md`;
    const chapterCount = `${entry.postCount} ${entry.postCount === 1 ? 'chapter' : 'chapters'}`;
    lines.push(
      `- [${entry.title}](${seriesMdUrl}) — ${entry.description} (${chapterCount})`
    );
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

interface SlideDeckSerializeOptions {
  slug: string;
  lang: string;
}

interface SlidesIndexEntry {
  title: string;
  slug: string;
  description: string;
  type: string;
  pubDate: Date;
  eventName?: string;
}

interface SlidesIndexOptions {
  lang: string;
  title: string;
  description: string;
}

/**
 * Serialize a slide deck to agent-friendly Markdown.
 * Metadata keys stay in English across languages so agents parse one format;
 * only section headings and the body follow the deck's language.
 */
export function serializeSlideDeckToMarkdown(
  deck: CollectionEntry<'slides'>,
  options: SlideDeckSerializeOptions
): string {
  const { slug, lang } = options;
  const data = deck.data;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/slides/${slug}`;

  const lines: string[] = [];

  lines.push(`# ${data.title}`);
  lines.push('');
  lines.push(`> ${data.description}`);
  lines.push('');
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(buildMarkdownAccessLine(lang));
  lines.push(`Type: ${data.type}`);
  lines.push(`Published: ${formatDate(data.pubDate)}`);
  if (data.updatedDate) {
    lines.push(`Updated: ${formatDate(data.updatedDate)}`);
  }
  if (data.eventName) {
    let event = `Event: ${data.eventName}`;
    if (data.eventDate) {
      event += ` (${formatDate(data.eventDate)})`;
    }
    if (data.eventUrl) {
      event += ` — ${data.eventUrl}`;
    }
    lines.push(event);
  }
  if (data.relatedPost) {
    lines.push(`Related post: ${SITE_URL}${prefix}/blog/${data.relatedPost}`);
  }
  lines.push('Author: Sergio Alexander Florez Galeano (XergioAleX)');
  lines.push('');
  lines.push('---');
  lines.push('');

  if (data.type === 'external') {
    const heading =
      lang === 'es' ? 'Presentación Externa' : 'External Presentation';
    lines.push(`## ${heading}`);
    lines.push('');
    lines.push(`- **URL:** ${data.externalUrl}`);
    if (data.provider) {
      const providerLabel = lang === 'es' ? 'Proveedor' : 'Provider';
      lines.push(`- **${providerLabel}:** ${data.provider}`);
    }
    lines.push('');
  }

  if (deck.body?.trim()) {
    const heading = lang === 'es' ? 'Contenido' : 'Content';
    lines.push(`## ${heading}`);
    lines.push('');
    lines.push(deck.body.trim());
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

/**
 * Serialize the slides listing to agent-friendly Markdown.
 * Returns a list of decks with links to their .md versions.
 */
export function serializeSlidesIndexToMarkdown(
  entries: SlidesIndexEntry[],
  options: SlidesIndexOptions
): string {
  const { lang, title, description } = options;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/slides`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(buildMarkdownAccessLine(lang));
  lines.push(`Total decks: ${entries.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(`## ${lang === 'es' ? 'Presentaciones' : 'Decks'}`);
  lines.push('');

  for (const entry of entries) {
    const deckMdUrl = `${prefix}/slides/${entry.slug}.md`;
    const parts = [`${entry.type}`, formatDate(entry.pubDate)];
    if (entry.eventName) {
      parts.push(entry.eventName);
    }
    lines.push(
      `- [${entry.title}](${deckMdUrl}) — ${entry.description} (${parts.join(', ')})`
    );
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

/**
 * Serialize a non-blog page to agent-friendly Markdown.
 * Returns clean Markdown with metadata header + page body.
 */
export function serializePageToAgentMarkdown(
  page: CollectionEntry<'pages'>,
  options: PageSerializeOptions
): string {
  const { slug, lang } = options;
  const { title, description } = page.data;
  const prefix = buildUrlPrefix(lang);
  const pagePath = slug === 'index' ? '' : `/${slug}`;
  const canonicalUrl = `${SITE_URL}${prefix}${pagePath}`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(buildMarkdownAccessLine(lang));

  if ('lastUpdated' in page.data && page.data.lastUpdated instanceof Date) {
    lines.push(`Last Updated: ${formatDate(page.data.lastUpdated)}`);
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  if (page.body) {
    lines.push(page.body.trim());
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}
