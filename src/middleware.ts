/**
 * Astro middleware to serve custom 404 page for unknown routes.
 * Rewrites requests for non-existent paths to /404 so the custom 404 page is displayed
 * instead of the browser's "invalid response" error in dev mode.
 */
import { defineMiddleware } from 'astro:middleware';

const KNOWN_ROOT_PATHS = new Set([
  '',
  'about',
  'blog',
  'contact',
  'cv',
  'dailybot',
  'entrepreneur',
  'foodie',
  'hobbies',
  'maker',
  'portfolio',
  'tech-talks',
  'trading',
  'api',
  'es',
  'internal',
  '404',
  'favicon.ico',
  'favicon.svg',
  'sitemap-index.xml',
  'rss.xml',
]);

const KNOWN_ES_PATHS = new Set([
  'about',
  'blog',
  'contact',
  'cv',
  'dailybot',
  'entrepreneur',
  'foodie',
  'hobbies',
  'maker',
  'portfolio',
  'tech-talks',
  'trading',
  'rss.xml',
]);

export const onRequest = defineMiddleware((context, next) => {
  const pathname = context.url.pathname;

  // Skip Vite/Astro internal paths (HMR, assets, etc.)
  if (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/__vite') ||
    pathname.startsWith('/@') ||
    pathname.includes('.')
  ) {
    return next();
  }

  const segments = pathname
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter(Boolean);

  // Single-segment paths at root (e.g. /sdfsd) that don't match known routes
  if (segments.length === 1 && !KNOWN_ROOT_PATHS.has(segments[0])) {
    return context.rewrite(new URL('/404', context.url));
  }

  // /es/xxx when xxx is not a known Spanish route
  if (
    segments.length === 2 &&
    segments[0] === 'es' &&
    !KNOWN_ES_PATHS.has(segments[1])
  ) {
    return context.rewrite(new URL('/404', context.url));
  }

  return next();
});
