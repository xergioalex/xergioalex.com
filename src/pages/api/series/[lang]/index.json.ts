import { getCollection } from 'astro:content';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import type { APIRoute, GetStaticPaths } from 'astro';

import { getSeriesTimelineIndex } from '@/lib/blog';

import type { Language } from '@/lib/i18n';

export interface SeriesListingEntry {
  slug: string;
  title: string;
  description: string;
  order: number;
  postCount: number;
  heroImage: string | null;
  firstPostHero: string | null;
  firstPostHeroWebp: boolean;
}

function heroWebpExists(heroImage: string | undefined): boolean {
  if (!heroImage || !/\.(png|jpe?g)$/i.test(heroImage)) return false;
  const publicDir = join(process.cwd(), 'public');
  const webpPath = join(
    publicDir,
    heroImage.replace(/^\//, '').replace(/\.(png|jpe?g)$/i, '.webp')
  );
  return existsSync(webpPath);
}

export const getStaticPaths: GetStaticPaths = async () => {
  return [{ params: { lang: 'en' } }, { params: { lang: 'es' } }];
};

export const GET: APIRoute = async ({ params }) => {
  try {
    const { lang } = params as { lang: Language };
    const allSeries = await getCollection('series');
    const sortedSeries = allSeries.sort((a, b) => a.data.order - b.data.order);

    const seriesEntries: SeriesListingEntry[] = [];

    for (const series of sortedSeries) {
      const posts = await getSeriesTimelineIndex(series.id, lang);
      if (posts.length === 0) continue;

      const firstPostHero = posts[0]?.heroImage || null;

      seriesEntries.push({
        slug: series.id,
        title: series.data.title,
        description: series.data.description || '',
        order: series.data.order,
        postCount: posts.length,
        heroImage: series.data.heroImage || null,
        firstPostHero,
        firstPostHeroWebp: heroWebpExists(firstPostHero ?? undefined),
      });
    }

    return new Response(
      JSON.stringify({
        lang,
        total: seriesEntries.length,
        series: seriesEntries,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        },
      }
    );
  } catch (error) {
    console.error('Series listing index error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
