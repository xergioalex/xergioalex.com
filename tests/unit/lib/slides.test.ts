import { describe, expect, it } from 'vitest';

import {
  getDeckSlug,
  getDeckTypeBadgeKey,
  isExternalEmbedDeck,
  isExternalLinkDeck,
  isInternalDeck,
} from '@/lib/slides';

import {
  draftInternalDeck,
  externalEmbedEnglishDeck,
  externalEmbedSpanishDeck,
  externalLinkEnglishDeck,
  externalLinkSpanishDeck,
  internalEnglishDeck,
  internalSpanishDeck,
} from '../../fixtures/slides';

// ─── getDeckSlug ────────────────────────────────────────

describe('getDeckSlug', () => {
  it('strips language prefix and date prefix from deck ID', () => {
    expect(getDeckSlug('en/2026-04-25_demo-revealjs-features')).toBe(
      'demo-revealjs-features'
    );
  });

  it('strips Spanish language prefix and date prefix', () => {
    expect(getDeckSlug('es/2026-04-25_demo-revealjs-features')).toBe(
      'demo-revealjs-features'
    );
  });

  it('handles deck IDs without date prefix', () => {
    expect(getDeckSlug('en/my-deck')).toBe('my-deck');
  });

  it('handles deck ID without language prefix', () => {
    expect(getDeckSlug('2026-04-25_some-deck')).toBe('some-deck');
  });

  it('returns the full slug for a deck with no prefix at all', () => {
    expect(getDeckSlug('simple-deck')).toBe('simple-deck');
  });

  it('handles deeply nested paths', () => {
    expect(getDeckSlug('en/subfolder/2026-01-01_nested-deck')).toBe(
      'nested-deck'
    );
  });

  it('preserves slug with multiple hyphens', () => {
    expect(getDeckSlug('en/2026-04-25_my-long-deck-slug-here')).toBe(
      'my-long-deck-slug-here'
    );
  });

  it('handles edge case: only date prefix', () => {
    expect(getDeckSlug('en/2026-04-25_')).toBe('');
  });
});

// ─── isInternalDeck ─────────────────────────────────────

describe('isInternalDeck', () => {
  it('returns true for internal deck (EN)', () => {
    expect(isInternalDeck(internalEnglishDeck as never)).toBe(true);
  });

  it('returns true for internal deck (ES)', () => {
    expect(isInternalDeck(internalSpanishDeck as never)).toBe(true);
  });

  it('returns true for draft internal deck', () => {
    expect(isInternalDeck(draftInternalDeck as never)).toBe(true);
  });

  it('returns false for external-link deck', () => {
    expect(isInternalDeck(externalLinkEnglishDeck as never)).toBe(false);
  });

  it('returns false for external-embed deck', () => {
    expect(isInternalDeck(externalEmbedEnglishDeck as never)).toBe(false);
  });
});

// ─── isExternalLinkDeck ─────────────────────────────────

describe('isExternalLinkDeck', () => {
  it('returns true for external-link deck (EN)', () => {
    expect(isExternalLinkDeck(externalLinkEnglishDeck as never)).toBe(true);
  });

  it('returns true for external-link deck (ES)', () => {
    expect(isExternalLinkDeck(externalLinkSpanishDeck as never)).toBe(true);
  });

  it('returns false for internal deck', () => {
    expect(isExternalLinkDeck(internalEnglishDeck as never)).toBe(false);
  });

  it('returns false for external-embed deck', () => {
    expect(isExternalLinkDeck(externalEmbedEnglishDeck as never)).toBe(false);
  });
});

// ─── isExternalEmbedDeck ────────────────────────────────

describe('isExternalEmbedDeck', () => {
  it('returns true for external-embed deck (EN)', () => {
    expect(isExternalEmbedDeck(externalEmbedEnglishDeck as never)).toBe(true);
  });

  it('returns true for external-embed deck (ES)', () => {
    expect(isExternalEmbedDeck(externalEmbedSpanishDeck as never)).toBe(true);
  });

  it('returns false for internal deck', () => {
    expect(isExternalEmbedDeck(internalEnglishDeck as never)).toBe(false);
  });

  it('returns false for external-link deck', () => {
    expect(isExternalEmbedDeck(externalLinkEnglishDeck as never)).toBe(false);
  });
});

// ─── getDeckTypeBadgeKey ────────────────────────────────

describe('getDeckTypeBadgeKey', () => {
  it('returns "internal" for internal deck', () => {
    expect(getDeckTypeBadgeKey(internalEnglishDeck as never)).toBe('internal');
  });

  it('returns "externalLink" for external-link deck', () => {
    expect(getDeckTypeBadgeKey(externalLinkEnglishDeck as never)).toBe(
      'externalLink'
    );
  });

  it('returns "externalEmbed" for external-embed deck', () => {
    expect(getDeckTypeBadgeKey(externalEmbedEnglishDeck as never)).toBe(
      'externalEmbed'
    );
  });

  it('returns correct key for Spanish internal deck', () => {
    expect(getDeckTypeBadgeKey(internalSpanishDeck as never)).toBe('internal');
  });

  it('returns correct key for Spanish external-link deck', () => {
    expect(getDeckTypeBadgeKey(externalLinkSpanishDeck as never)).toBe(
      'externalLink'
    );
  });

  it('returns correct key for Spanish external-embed deck', () => {
    expect(getDeckTypeBadgeKey(externalEmbedSpanishDeck as never)).toBe(
      'externalEmbed'
    );
  });

  it('returns correct key for draft deck', () => {
    expect(getDeckTypeBadgeKey(draftInternalDeck as never)).toBe('internal');
  });
});
