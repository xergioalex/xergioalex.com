import type { APIRoute } from 'astro';

import { serializeSlidesIndexToMarkdown } from '@/lib/markdown-for-agents';
import { getDeckSlug, getSlideDecks } from '@/lib/slides';

export const GET: APIRoute = async () => {
  const decks = await getSlideDecks('es');

  const markdown = serializeSlidesIndexToMarkdown(
    decks.map((deck) => ({
      title: deck.data.title,
      slug: getDeckSlug(deck.id),
      description: deck.data.description,
      type: deck.data.type,
      pubDate: deck.data.pubDate,
      eventName: deck.data.eventName,
    })),
    {
      lang: 'es',
      title: 'Diapositivas — Presentaciones',
      description:
        'Una colección de presentaciones de Sergio Alexander — charlas de conferencias, slides de meetups y deep dives técnicos.',
    }
  );

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
