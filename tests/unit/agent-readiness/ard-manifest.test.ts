import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

/**
 * Structural guards for the ARD capability manifest served at
 * /.well-known/ai-catalog.json.
 *
 * Spec: https://agenticresourcediscovery.org/ (ARD v0.9 draft)
 * Data model: https://github.com/Agent-Card/ai-catalog
 *
 * A malformed manifest does not break the build — it silently degrades agent
 * discovery and drops the isitagentready.com score. These tests pin the
 * invariants that scanners and registries check.
 */

// Vitest runs from the repo root; import.meta.url is virtualised by Vite (/@fs/...).
const ROOT = process.cwd();
const SITE_DOMAIN = 'xergioalex.com';
const MANIFEST_PATH = '/.well-known/ai-catalog.json';

const read = (relativePath: string): string =>
  readFileSync(resolve(ROOT, relativePath), 'utf8');

interface CatalogEntry {
  identifier: string;
  displayName?: string;
  type?: string;
  url?: string;
  data?: unknown;
  representativeQueries?: string[];
}

interface Catalog {
  specVersion?: string;
  host?: { displayName?: string; identifier?: string };
  entries?: CatalogEntry[];
}

const manifest: Catalog = JSON.parse(read(`public${MANIFEST_PATH}`));
const entries = manifest.entries ?? [];

describe('ARD capability manifest', () => {
  it('declares a non-empty specVersion', () => {
    expect(typeof manifest.specVersion).toBe('string');
    expect(manifest.specVersion).not.toBe('');
  });

  it('declares a host with a displayName and a stable identifier', () => {
    expect(manifest.host?.displayName).toBeTruthy();
    expect(manifest.host?.identifier).toBe(`did:web:${SITE_DOMAIN}`);
  });

  it('has a non-empty entries array', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('gives every entry an identifier, displayName and media type', () => {
    for (const entry of entries) {
      expect(entry.identifier, 'identifier').toBeTruthy();
      expect(
        entry.displayName,
        `displayName of ${entry.identifier}`
      ).toBeTruthy();
      expect(entry.type, `type of ${entry.identifier}`).toMatch(
        /^[a-z]+\/\S+$/
      );
    }
  });

  // ARD spec §3.4 — strict value-or-reference.
  it('gives every entry exactly one of url or data', () => {
    for (const entry of entries) {
      const provided = [entry.url, entry.data].filter(
        (value) => value !== undefined
      );
      expect(provided, `content of ${entry.identifier}`).toHaveLength(1);
    }
  });

  it('anchors every identifier to the site domain in urn:air form', () => {
    for (const entry of entries) {
      expect(entry.identifier).toMatch(
        new RegExp(`^urn:air:${SITE_DOMAIN.replace('.', '\\.')}:[^:]+:[^:]+$`)
      );
    }
  });

  it('keeps identifiers unique', () => {
    const identifiers = entries.map((entry) => entry.identifier);
    expect(new Set(identifiers).size).toBe(identifiers.length);
  });

  // Registries build semantic embeddings from these; the spec asks for 2-5.
  it('gives every entry 2-5 representative queries', () => {
    for (const entry of entries) {
      const queries = entry.representativeQueries ?? [];
      expect(
        queries.length,
        `representativeQueries of ${entry.identifier}`
      ).toBeGreaterThanOrEqual(2);
      expect(
        queries.length,
        `representativeQueries of ${entry.identifier}`
      ).toBeLessThanOrEqual(5);
      for (const query of queries) {
        expect(query.trim()).not.toBe('');
      }
    }
  });

  it('points every url entry at an absolute https URL on the site', () => {
    for (const entry of entries) {
      if (!entry.url) continue;
      expect(entry.url).toMatch(new RegExp(`^https://${SITE_DOMAIN}/`));
    }
  });
});

describe('ARD manifest discovery channels', () => {
  it('advertises the manifest via an Agentmap directive in robots.txt', () => {
    expect(read('public/robots.txt')).toContain(
      `Agentmap: https://${SITE_DOMAIN}${MANIFEST_PATH}`
    );
  });

  it('advertises the manifest via <link rel="ai-catalog"> in the page head', () => {
    expect(read('src/components/BaseHead.astro')).toContain(
      `<link rel="ai-catalog" href="${MANIFEST_PATH}"`
    );
  });

  it('serves the manifest as JSON with permissive CORS', () => {
    const headers = read('public/_headers');
    const block = headers.slice(headers.indexOf(MANIFEST_PATH));
    expect(block).toContain('Content-Type: application/json');
    expect(block).toContain('Access-Control-Allow-Origin: *');
  });
});
