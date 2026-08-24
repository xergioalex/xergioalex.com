import { describe, expect, it } from 'vitest';

import {
  apiAssetFallbacks,
  buildApiErrorBody,
  buildNotFoundMarkdown,
  errorCodeForStatus,
  languageForPath,
  prefersHtml,
  wantsJson,
  wantsMarkdown,
} from '@/lib/agent-errors';

/**
 * These helpers back the Cloudflare Pages Function that turns Cloudflare's
 * HTML 404 into something an agent can parse. The Function itself cannot run
 * under Vitest (it needs the Workers runtime and the ASSETS binding), so the
 * decision logic lives here and is tested directly.
 */

describe('errorCodeForStatus', () => {
  it('maps each status this site can return to a stable code', () => {
    expect(errorCodeForStatus(404)).toBe('resource_not_found');
    expect(errorCodeForStatus(405)).toBe('method_not_allowed');
    expect(errorCodeForStatus(410)).toBe('gone');
    expect(errorCodeForStatus(500)).toBe('internal_error');
    expect(errorCodeForStatus(503)).toBe('internal_error');
  });

  it('treats any other 4xx as a missing resource', () => {
    expect(errorCodeForStatus(403)).toBe('resource_not_found');
  });
});

describe('buildApiErrorBody', () => {
  const body = buildApiErrorBody({
    status: 404,
    pathname: '/api/series/fr/index.json',
  });

  it('carries the RFC 9457 problem-details members', () => {
    expect(body.type).toMatch(/^https:\/\/xergioalex\.com\/developers#errors$/);
    expect(body.title).toBe('Not Found');
    expect(body.status).toBe(404);
    expect(body.detail).toContain('/api/series/fr/index.json');
    expect(body.instance).toBe('/api/series/fr/index.json');
  });

  it('carries an agent-oriented error object with a recovery hint', () => {
    expect(body.error.code).toBe('resource_not_found');
    expect(body.error.message).toBe(body.detail);
    expect(body.error.hint).toContain('https://xergioalex.com/api/index.json');
    expect(body.error.documentation_url).toBe(
      'https://xergioalex.com/developers'
    );
  });

  it('tells a client using the wrong verb to retry with GET', () => {
    const methodError = buildApiErrorBody({
      status: 405,
      pathname: '/api/posts.json',
    });
    expect(methodError.error.code).toBe('method_not_allowed');
    expect(methodError.error.hint).toContain('GET');
  });

  it('accepts explicit overrides', () => {
    const custom = buildApiErrorBody({
      status: 500,
      pathname: '/api/posts.json',
      message: 'Upstream index unavailable.',
      hint: 'Retry in 30 seconds.',
    });
    expect(custom.detail).toBe('Upstream index unavailable.');
    expect(custom.error.message).toBe('Upstream index unavailable.');
    expect(custom.error.hint).toBe('Retry in 30 seconds.');
  });

  it('sends a page 404 to the sitemap, not to the endpoint index', () => {
    const pageError = buildApiErrorBody({
      status: 404,
      pathname: '/nope',
      scope: 'site',
    });
    expect(pageError.detail).toBe('No page exists at /nope.');
    expect(pageError.error.hint).toContain(
      'https://xergioalex.com/sitemap-index.xml'
    );
    expect(pageError.error.hint).not.toContain('/api/index.json');
  });

  it('is JSON-serializable without loss', () => {
    expect(JSON.parse(JSON.stringify(body))).toEqual(body);
  });
});

describe('apiAssetFallbacks', () => {
  it('resolves a directory-style collection path to its index file', () => {
    expect(apiAssetFallbacks('/api/series/en')).toEqual([
      '/api/series/en/index.json',
      '/api/series/en.json',
    ]);
  });

  it('ignores the trailing slash', () => {
    expect(apiAssetFallbacks('/api/series/en/')).toEqual([
      '/api/series/en/index.json',
      '/api/series/en.json',
    ]);
  });

  it('sends a bare /api to the API index', () => {
    expect(apiAssetFallbacks('/api')).toEqual(['/api/index.json']);
    expect(apiAssetFallbacks('/api/')).toEqual(['/api/index.json']);
  });

  it('does not retry a path that already names a file', () => {
    expect(apiAssetFallbacks('/api/posts.json')).toEqual([]);
  });
});

describe('content negotiation', () => {
  it('detects a JSON client', () => {
    expect(wantsJson('application/json')).toBe(true);
    expect(wantsJson('application/problem+json, */*')).toBe(true);
    expect(wantsJson('text/html,application/xhtml+xml')).toBe(false);
  });

  it('detects a Markdown client', () => {
    expect(wantsMarkdown('text/markdown')).toBe(true);
    expect(wantsMarkdown('text/markdown; charset=utf-8, text/plain')).toBe(
      true
    );
    expect(wantsMarkdown('*/*')).toBe(false);
  });

  it('treats only Accept headers listing text/html as browser navigations', () => {
    expect(
      prefersHtml(
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8'
      )
    ).toBe(true);
    // curl, most SDKs and most agents
    expect(prefersHtml('*/*')).toBe(false);
    expect(prefersHtml('')).toBe(false);
    expect(prefersHtml('application/json')).toBe(false);
  });
});

describe('languageForPath', () => {
  it('answers in the language that was browsed', () => {
    expect(languageForPath('/es/blog/nope')).toBe('es');
    expect(languageForPath('/es')).toBe('es');
    expect(languageForPath('/blog/nope')).toBe('en');
    // Not a language prefix — a slug that merely starts with "es".
    expect(languageForPath('/essays')).toBe('en');
  });
});

describe('buildNotFoundMarkdown', () => {
  const english = buildNotFoundMarkdown('/no-such-page');

  it('opens with a heading and names the missing path', () => {
    expect(english.startsWith('# 404')).toBe(true);
    expect(english).toContain('`/no-such-page`');
  });

  it('points at the recovery links an agent needs', () => {
    for (const url of [
      'https://xergioalex.com/blog/',
      'https://xergioalex.com/developers',
      'https://xergioalex.com/llms.txt',
      'https://xergioalex.com/sitemap-index.xml',
      'https://xergioalex.com/api/index.json',
      'https://xergioalex.com/openapi.json',
    ]) {
      expect(english).toContain(url);
    }
  });

  it('is real Markdown — every recovery entry is a link', () => {
    const bullets = english.split('\n').filter((line) => line.startsWith('- '));
    expect(bullets.length).toBeGreaterThanOrEqual(8);
    for (const bullet of bullets) {
      expect(bullet).toMatch(/\[[^\]]+\]\(https:\/\/[^)]+\)/);
    }
  });

  it('stays short enough to be cheap for an agent to read', () => {
    expect(english.length).toBeLessThan(1500);
  });

  it('answers Spanish paths in Spanish, with the /es prefix on site links', () => {
    const spanish = buildNotFoundMarkdown('/es/no-existe');
    expect(spanish).toContain('# 404 — Página no encontrada');
    expect(spanish).toContain('https://xergioalex.com/es/blog/');
    expect(spanish).toContain('https://xergioalex.com/es/developers/');
  });
});
