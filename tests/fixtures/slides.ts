/**
 * Mock slide deck data for testing.
 * Shapes match CollectionEntry<'slides'> from Astro content collections.
 */

interface MockInternalSlideData {
  type: 'internal';
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  tags?: string[];
  draft?: boolean;
  eventName?: string;
  eventDate?: Date;
  eventUrl?: string;
  relatedPost?: string;
  theme?: 'dark' | 'light';
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  syntaxHighlight?: boolean;
  math?: boolean;
}

interface MockExternalLinkSlideData {
  type: 'external-link';
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  tags?: string[];
  draft?: boolean;
  eventName?: string;
  eventDate?: Date;
  eventUrl?: string;
  relatedPost?: string;
  externalUrl: string;
  provider?: string;
}

interface MockExternalEmbedSlideData {
  type: 'external-embed';
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  tags?: string[];
  draft?: boolean;
  eventName?: string;
  eventDate?: Date;
  eventUrl?: string;
  relatedPost?: string;
  externalUrl: string;
  embedUrl: string;
  provider?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

type MockSlideData =
  | MockInternalSlideData
  | MockExternalLinkSlideData
  | MockExternalEmbedSlideData;

interface MockSlideDeck {
  id: string;
  data: MockSlideData;
  body?: string;
}

// ─── Internal Decks ─────────────────────────────────────

export const internalEnglishDeck: MockSlideDeck = {
  id: 'en/2026-04-25_demo-revealjs-features',
  data: {
    type: 'internal',
    title: 'Reveal.js Features Demo',
    description:
      'A comprehensive showcase of Reveal.js presentation features including fragments, auto-animate, code highlights, media, and layouts.',
    pubDate: new Date('2026-04-25'),
    heroImage: '/images/slides/demo-revealjs-features/hero.webp',
    tags: ['tech', 'talks'],
    theme: 'dark',
    transition: 'slide',
    syntaxHighlight: true,
    math: true,
    eventName: 'XergioAleX.com Demo',
    eventDate: new Date('2026-04-25'),
  },
  body: '---\n# Slide 1\nHello World\n---\n# Slide 2\nGoodbye',
};

export const internalSpanishDeck: MockSlideDeck = {
  id: 'es/2026-04-25_demo-revealjs-features',
  data: {
    type: 'internal',
    title: 'Demo de características de Reveal.js',
    description:
      'Una demostración completa de las características de Reveal.js incluyendo fragmentos, auto-animación, resaltado de código y más.',
    pubDate: new Date('2026-04-25'),
    heroImage: '/images/slides/demo-revealjs-features/hero.webp',
    tags: ['tech', 'talks'],
    theme: 'dark',
    transition: 'slide',
    syntaxHighlight: true,
    math: true,
    eventName: 'XergioAleX.com Demo',
    eventDate: new Date('2026-04-25'),
  },
  body: '---\n# Diapositiva 1\nHola Mundo\n---\n# Diapositiva 2\nAdiós',
};

// ─── External Link Decks ────────────────────────────────

export const externalLinkEnglishDeck: MockSlideDeck = {
  id: 'en/2026-03-15_cloud-architecture-patterns',
  data: {
    type: 'external-link',
    title: 'Cloud Architecture Patterns',
    description:
      'An overview of modern cloud architecture patterns for scalable distributed systems presented at Pereira Tech Talks 2025.',
    pubDate: new Date('2026-03-15'),
    tags: ['tech', 'talks'],
    externalUrl: 'https://docs.google.com/presentation/d/example',
    provider: 'google-slides',
    eventName: 'Pereira Tech Talks 2025',
    eventDate: new Date('2025-11-15'),
    eventUrl: 'https://pereiratechtalks.org/',
  },
};

export const externalLinkSpanishDeck: MockSlideDeck = {
  id: 'es/2026-03-15_cloud-architecture-patterns',
  data: {
    type: 'external-link',
    title: 'Patrones de arquitectura en la nube',
    description:
      'Una visión general de los patrones de arquitectura en la nube para sistemas distribuidos escalables, presentada en Pereira Tech Talks.',
    pubDate: new Date('2026-03-15'),
    tags: ['tech', 'talks'],
    externalUrl: 'https://docs.google.com/presentation/d/example',
    provider: 'google-slides',
    eventName: 'Pereira Tech Talks 2025',
    eventDate: new Date('2025-11-15'),
    eventUrl: 'https://pereiratechtalks.org/',
  },
};

// ─── External Embed Decks ───────────────────────────────

export const externalEmbedEnglishDeck: MockSlideDeck = {
  id: 'en/2026-02-10_devops-best-practices',
  data: {
    type: 'external-embed',
    title: 'DevOps Best Practices',
    description:
      'A deep dive into DevOps best practices for continuous integration and deployment pipelines in modern cloud environments.',
    pubDate: new Date('2026-02-10'),
    tags: ['tech', 'talks'],
    externalUrl: 'https://speakerdeck.com/xergioalex/devops-best-practices',
    embedUrl: 'https://speakerdeck.com/player/xergioalex/devops-best-practices',
    provider: 'speakerdeck',
    aspectRatio: '16:9',
    eventName: 'DevConf 2026',
    eventDate: new Date('2026-02-10'),
  },
};

export const externalEmbedSpanishDeck: MockSlideDeck = {
  id: 'es/2026-02-10_devops-best-practices',
  data: {
    type: 'external-embed',
    title: 'Mejores prácticas de DevOps',
    description:
      'Una inmersión profunda en las mejores prácticas de DevOps para integración continua y despliegue en entornos modernos de nube.',
    pubDate: new Date('2026-02-10'),
    tags: ['tech', 'talks'],
    externalUrl: 'https://speakerdeck.com/xergioalex/devops-best-practices',
    embedUrl: 'https://speakerdeck.com/player/xergioalex/devops-best-practices',
    provider: 'speakerdeck',
    aspectRatio: '16:9',
    eventName: 'DevConf 2026',
    eventDate: new Date('2026-02-10'),
  },
};

// ─── Draft Decks ────────────────────────────────────────

export const draftInternalDeck: MockSlideDeck = {
  id: 'en/2026-05-01_upcoming-talk',
  data: {
    type: 'internal',
    title: 'Upcoming Talk Preview',
    description:
      'A preview of an upcoming presentation that is still being prepared and should not be visible in production builds.',
    pubDate: new Date('2026-05-01'),
    draft: true,
    theme: 'dark',
    transition: 'slide',
    syntaxHighlight: true,
    math: false,
  },
  body: '---\n# WIP\n---\n# Coming soon',
};

// ─── All decks (for mock getCollection) ─────────────────

export const allMockDecks: MockSlideDeck[] = [
  internalEnglishDeck,
  internalSpanishDeck,
  externalLinkEnglishDeck,
  externalLinkSpanishDeck,
  externalEmbedEnglishDeck,
  externalEmbedSpanishDeck,
  draftInternalDeck,
];
