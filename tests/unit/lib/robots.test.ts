import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  isStrictRobotsParser,
  stripDirectivesForStrictParsers,
} from '@/lib/robots';

describe('isStrictRobotsParser', () => {
  it('matches Lighthouse-family user agents', () => {
    expect(
      isStrictRobotsParser(
        'Mozilla/5.0 (Linux; Android 11) Chrome/94.0.4606.81 Mobile Chrome-Lighthouse'
      )
    ).toBe(true);
    expect(
      isStrictRobotsParser('Mozilla/5.0 (compatible; PageSpeed Sounds)')
    ).toBe(true);
    expect(isStrictRobotsParser('Lighthouse/1.0')).toBe(true);
  });

  it('does not match browsers, search engines or AI crawlers', () => {
    expect(
      isStrictRobotsParser('Mozilla/5.0 (Windows NT 10.0) Chrome/126')
    ).toBe(false);
    expect(isStrictRobotsParser('Googlebot/2.1')).toBe(false);
    expect(isStrictRobotsParser('GPTBot/1.0')).toBe(false);
    expect(isStrictRobotsParser('')).toBe(false);
  });
});

describe('stripDirectivesForStrictParsers', () => {
  const robots = readFileSync(
    resolve(process.cwd(), 'public', 'robots.txt'),
    'utf8'
  );

  it('removes every non-standard directive from the shipped robots.txt', () => {
    const stripped = stripDirectivesForStrictParsers(robots);
    expect(stripped).not.toMatch(/^Content-Signal:/m);
    expect(stripped).not.toMatch(/^Agentmap:/m);
    // The standard directives survive untouched.
    expect(stripped).toMatch(/^User-agent: \*$/m);
    expect(stripped).toMatch(/^Sitemap: /m);
  });

  it('leaves a robots.txt without non-standard directives unchanged', () => {
    const plain = 'User-agent: *\nAllow: /\n';
    expect(stripDirectivesForStrictParsers(plain)).toBe(plain);
  });

  it('strips only the directive lines, not surrounding comments', () => {
    const stripped = stripDirectivesForStrictParsers(
      '# comment\nAgentmap: https://example.com/cat.json\n\nUser-agent: *\n'
    );
    expect(stripped).toBe('# comment\n\nUser-agent: *\n');
  });
});
