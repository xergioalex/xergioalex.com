import type { APIRoute, GetStaticPaths } from 'astro';

import { getDeckSlug, getSlideDecks } from '@/lib/slides';

export const getStaticPaths: GetStaticPaths = async () => {
  const decks = await getSlideDecks('en');
  return decks.map((deck) => ({
    params: { slug: getDeckSlug(deck.id) },
    props: { deck },
  }));
};

export const GET: APIRoute = ({ props }) => {
  const { deck } = props;
  let markdown = '';

  markdown += `# ${deck.data.title}\n\n`;
  markdown += `> ${deck.data.description}\n\n`;

  if (deck.data.eventName) {
    markdown += `**Event:** ${deck.data.eventName}`;
    if (deck.data.eventDate) {
      markdown += ` (${deck.data.eventDate.toISOString().split('T')[0]})`;
    }
    markdown += '\n\n';
  }

  if (deck.data.type === 'internal') {
    markdown += deck.body || '';
  } else if (deck.data.type === 'external-link') {
    markdown += `**Type:** External presentation\n`;
    markdown += `**URL:** ${deck.data.externalUrl}\n`;
    if (deck.data.provider) markdown += `**Provider:** ${deck.data.provider}\n`;
    markdown += '\n';
    if (deck.body) markdown += deck.body;
  } else if (deck.data.type === 'external-embed') {
    markdown += `**Type:** Embedded presentation\n`;
    markdown += `**URL:** ${deck.data.externalUrl}\n`;
    markdown += `**Embed URL:** ${deck.data.embedUrl}\n`;
    if (deck.data.provider) markdown += `**Provider:** ${deck.data.provider}\n`;
    markdown += '\n';
    if (deck.body) markdown += deck.body;
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
