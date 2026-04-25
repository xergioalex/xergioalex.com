import { type CollectionEntry, getCollection, getEntry } from 'astro:content';

import { shouldHideDrafts } from './blog';

import type { Language } from './i18n';

/**
 * Get the slug from a slide deck ID (removes language prefix and date prefix).
 * e.g., "en/2026-04-25_demo-revealjs-features" -> "demo-revealjs-features"
 */
export function getDeckSlug(id: string): string {
  const parts = id.split('/');
  const filename = parts[parts.length - 1];
  return filename.replace(/^\d{4}-\d{2}-\d{2}_/, '');
}

/**
 * Get all slide decks for a specific language.
 * Filters out drafts in production, sorts by pubDate descending.
 */
export async function getSlideDecks(
  lang: Language
): Promise<CollectionEntry<'slides'>[]> {
  const allDecks = await getCollection('slides');

  const filtered = allDecks.filter((deck) => {
    if (!deck.id.startsWith(`${lang}/`)) return false;
    if (deck.data.draft && shouldHideDrafts()) return false;
    return true;
  });

  return filtered.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

/**
 * Get a single slide deck by its full collection ID.
 */
export async function getDeckById(
  id: string
): Promise<CollectionEntry<'slides'> | undefined> {
  return getEntry('slides', id);
}

/** Type guard: internal deck (authored Markdown, rendered with Reveal.js). */
export function isInternalDeck(
  deck: CollectionEntry<'slides'>
): deck is CollectionEntry<'slides'> & { data: { type: 'internal' } } {
  return deck.data.type === 'internal';
}

/** Type guard: external-link deck (stub info page with CTA to external URL). */
export function isExternalLinkDeck(
  deck: CollectionEntry<'slides'>
): deck is CollectionEntry<'slides'> & { data: { type: 'external-link' } } {
  return deck.data.type === 'external-link';
}

/** Type guard: external-embed deck (iframe embed from third-party provider). */
export function isExternalEmbedDeck(
  deck: CollectionEntry<'slides'>
): deck is CollectionEntry<'slides'> & { data: { type: 'external-embed' } } {
  return deck.data.type === 'external-embed';
}

/** Map deck type to translation badge key. */
export function getDeckTypeBadgeKey(
  deck: CollectionEntry<'slides'>
): 'internal' | 'externalLink' | 'externalEmbed' {
  switch (deck.data.type) {
    case 'internal':
      return 'internal';
    case 'external-link':
      return 'externalLink';
    case 'external-embed':
      return 'externalEmbed';
  }
}
