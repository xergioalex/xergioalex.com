import type { APIRoute, GetStaticPaths } from 'astro';

import { serializeSlideDeckToMarkdown } from '@/lib/markdown-for-agents';
import { getDeckSlug, getSlideDecks } from '@/lib/slides';

export const getStaticPaths: GetStaticPaths = async () => {
  const decks = await getSlideDecks('en');
  return decks.map((deck) => ({
    params: { slug: getDeckSlug(deck.id) },
    props: { deck },
  }));
};

export const GET: APIRoute = ({ props, params }) => {
  const { deck } = props;

  const markdown = serializeSlideDeckToMarkdown(deck, {
    slug: params.slug as string,
    lang: 'en',
  });

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
