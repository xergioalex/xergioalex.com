import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import BlogCard from '@/components/blog/BlogCard.svelte';
import { toCardEntries, toCardEntry, toTimelineEntry } from '@/lib/blog';

import { publishedEnglishPost } from '../../fixtures/posts';

vi.mock('astro:content', () => ({
  getCollection: async (name: string) =>
    name === 'tags'
      ? [
          { id: 'tech', data: { name: 'tech', tier: 'primary' } },
          { id: 'ai', data: { name: 'ai', tier: 'secondary' } },
          {
            id: 'mcp',
            data: { name: 'mcp', tier: 'subtopic', parent: 'ai' },
          },
        ]
      : [],
}));

/** A series-enriched post carrying a body, like getBlogPosts returns. */
const postWithBody = {
  ...publishedEnglishPost,
  body: 'BODY-MARKER'.repeat(5000),
  data: {
    ...publishedEnglishPost.data,
    tags: ['tech', 'ai', 'mcp'],
    series: 'trading-journey',
  },
  seriesCurrent: 1,
  seriesTotal: 3,
  seriesTitle: 'Trading Journey',
} as never as Parameters<typeof toCardEntry>[0];

// ─── toCardEntry ────────────────────────────────────────

describe('toCardEntry', () => {
  it('returns a flat, serializable entry with tier-grouped tags', async () => {
    const entry = await toCardEntry(postWithBody);

    expect(entry.slug).toBe('my-awesome-post');
    expect(entry.lang).toBe('en');
    expect(entry.title).toBe('My Awesome Post');
    expect(entry.description).toBe('A published English blog post for testing');
    expect(entry.pubDate).toBe('2024-03-15T00:00:00.000Z');
    expect(entry.heroImage).toBe('/images/blog/posts/my-awesome-post/hero.jpg');
    expect(entry.tags).toEqual(['tech']);
    expect(entry.topics).toEqual(['ai']);
    expect(entry.subtopics).toEqual(['mcp']);
    expect(entry.series).toBe('trading-journey');
    expect(entry.seriesCurrent).toBe(1);
    expect(entry.seriesTotal).toBe(3);
    expect(entry.seriesTitle).toBe('Trading Journey');
  });

  it('never carries the post body into the serialized payload', async () => {
    const entry = await toCardEntry(postWithBody);
    const serialized = JSON.stringify(entry);

    expect(serialized).not.toContain('BODY-MARKER');
    expect(serialized.length).toBeLessThan(1500);
  });

  it('flags scheduled and draft posts', async () => {
    const scheduled = await toCardEntry({
      id: 'en/2099-12-25_future-post',
      data: {
        title: 'Future',
        description: 'Scheduled',
        pubDate: new Date('2099-12-25'),
        tags: [],
      },
    } as never);
    const draft = await toCardEntry({
      id: 'en/2024-01-01_wip',
      data: {
        title: 'WIP',
        description: 'Draft',
        pubDate: new Date('2024-01-01'),
        tags: [],
        draft: true,
      },
    } as never);

    expect(scheduled.isScheduled).toBe(true);
    expect(scheduled.isDraft).toBe(false);
    expect(draft.isDraft).toBe(true);
  });

  it('maps arrays with toCardEntries', async () => {
    const entries = await toCardEntries([postWithBody, postWithBody]);
    expect(entries).toHaveLength(2);
    expect(entries[0].slug).toBe('my-awesome-post');
  });
});

// ─── toTimelineEntry ────────────────────────────────────

describe('toTimelineEntry', () => {
  it('keeps the { id, data } shape the timeline islands expect', () => {
    const entry = toTimelineEntry(postWithBody);

    expect(entry.id).toBe('en/2024-03-15_my-awesome-post');
    expect(entry.data.title).toBe('My Awesome Post');
    expect(entry.data.pubDate).toEqual(new Date('2024-03-15'));
    expect(entry.data.tags).toEqual(['tech', 'ai', 'mcp']);
    expect(entry.data.series).toBe('trading-journey');
  });

  it('never carries the post body into the serialized payload', () => {
    const serialized = JSON.stringify(toTimelineEntry(postWithBody));
    expect(serialized).not.toContain('BODY-MARKER');
  });
});

// ─── BlogCard renders CardEntry identically ─────────────

describe('BlogCard with a CardEntry', () => {
  it('renders the same title and link as with a CollectionEntry', async () => {
    const entry = await toCardEntry(postWithBody);

    render(BlogCard, { props: { post: entry as never, lang: 'en' } });

    expect(screen.getByText('My Awesome Post')).toBeDefined();
    const link = screen.getByLabelText('My Awesome Post');
    expect(link?.getAttribute('href')).toBe('/blog/my-awesome-post/');
  });

  it('renders the series chapter badge from the flat series fields', async () => {
    const entry = await toCardEntry(postWithBody);

    render(BlogCard, { props: { post: entry as never, lang: 'en' } });

    expect(screen.getByText('1/3')).toBeDefined();
  });
});
