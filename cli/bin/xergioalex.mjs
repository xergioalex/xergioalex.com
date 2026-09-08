#!/usr/bin/env node
/**
 * `xergioalex` — the official CLI for xergioalex.com.
 *
 * A dependency-free reader over the site's public JSON API: posts, series,
 * tag timelines, slide decks and the API index. Node ≥ 18 (global fetch).
 *
 * Publish with `npm publish` from cli/ (package name: xergioalex).
 */

import {
  CLI_VERSION,
  USAGE,
  apiUrl,
  formatDeckLine,
  formatPostLine,
  formatSeriesLine,
  matchesQuery,
  normalizeLang,
  normalizeLimit,
  postUrl,
  preparePosts,
} from '../src/core.mjs';

const args = process.argv.slice(2);

function fail(message) {
  process.stderr.write(`xergioalex: ${message}\n\n${USAGE}\n`);
  process.exit(1);
}

function readOption(name) {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return undefined;
  const value = args[index + 1];
  if (value === undefined || value.startsWith('--')) return 'true';
  args.splice(index, 2);
  return value;
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    let hint = '';
    try {
      const problem = await response.json();
      hint = problem?.error?.hint ? `\n${problem.error.hint}` : '';
    } catch {
      // Non-JSON error body — the status line is enough.
    }
    fail(`GET ${url} failed: ${response.status} ${response.statusText}${hint}`);
  }
  return response.json();
}

function print(items) {
  for (const item of items) console.log(item);
}

async function run() {
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    console.log(USAGE);
    return;
  }
  if (args[0] === '--version' || args[0] === '-v') {
    console.log(CLI_VERSION);
    return;
  }

  const asJson = args.includes('--json');
  const command = args[0];
  const positional = args.slice(1).filter((a) => !a.startsWith('--'));

  let lang;
  let limit;
  try {
    lang = normalizeLang(readOption('lang'));
    limit = normalizeLimit(readOption('limit'));
  } catch (error) {
    fail(error.message);
  }

  switch (command) {
    case 'posts': {
      const url =
        lang === 'all'
          ? apiUrl({ kind: 'posts-all' })
          : apiUrl({ kind: 'posts' }, { lang });
      const posts = await getJson(url);
      const prepared = preparePosts(posts, { limit });
      if (asJson) {
        console.log(JSON.stringify(prepared, null, 2));
      } else {
        console.log(`${prepared.length} post(s) (${lang})\n`);
        print(prepared.map(formatPostLine));
      }
      return;
    }

    case 'search': {
      const query = positional[0];
      if (!query) fail('search needs a query: xergioalex search "<query>"');
      const posts = await getJson(apiUrl({ kind: 'search' }, { lang }));
      const matched = posts.filter((post) => matchesQuery(post, query));
      const prepared = preparePosts(matched, { limit });
      if (asJson) {
        console.log(JSON.stringify(prepared, null, 2));
      } else {
        console.log(`${prepared.length} match(es) for "${query}" (${lang})\n`);
        print(prepared.map(formatPostLine));
      }
      return;
    }

    case 'post': {
      const slug = positional[0];
      if (!slug) fail('post needs a slug: xergioalex post <slug>');
      const posts = await getJson(apiUrl({ kind: 'search' }, { lang }));
      const post = posts.find((entry) => entry.slug === slug);
      if (!post) {
        fail(`No post "${slug}" in ${lang}. Try: xergioalex search <query>`);
      }
      const result = { ...post, url: postUrl(post.slug, lang) };
      console.log(asJson ? JSON.stringify(result, null, 2) : [
        result.title,
        result.pubDate,
        result.description,
        result.url,
      ].join('\n'));
      return;
    }

    case 'series': {
      const slug = positional[0];
      const data = await getJson(apiUrl({ kind: 'series', slug }, { lang }));
      if (asJson) {
        console.log(JSON.stringify(data, null, 2));
      } else if (slug) {
        console.log(`${data.series} — ${data.total} chapter(s) (${lang})\n`);
        print(
          data.posts.map((post) => `${post.pubDate?.slice(0, 10)}  ${post.title}\n           ${postUrl(post.slug, lang)}`)
        );
      } else {
        console.log(`${data.total} series (${lang})\n`);
        print(data.series.map(formatSeriesLine));
      }
      return;
    }

    case 'tag': {
      const tag = positional[0];
      if (!tag) fail('tag needs a name: xergioalex tag <name>');
      const data = await getJson(apiUrl({ kind: 'tag', tag }, { lang }));
      if (asJson) {
        console.log(JSON.stringify(data, null, 2));
      } else {
        console.log(`${data.total} post(s) tagged "${data.tag}" (${lang})\n`);
        print(preparePosts(data.posts, { limit }).map(formatPostLine));
      }
      return;
    }

    case 'talks': {
      const data = await getJson(apiUrl({ kind: 'talks' }, { lang }));
      if (asJson) {
        console.log(JSON.stringify(data, null, 2));
      } else {
        console.log(`${data.total} slide deck(s) (${lang})\n`);
        print(
          (limit ? data.decks.slice(0, limit) : data.decks).map(formatDeckLine)
        );
      }
      return;
    }

    case 'api': {
      const data = await getJson(apiUrl({ kind: 'api' }));
      if (asJson) {
        console.log(JSON.stringify(data, null, 2));
      } else {
        console.log(`${data.name} v${data.version} — ${data.total} endpoints\n`);
        print(
          data.endpoints.flatMap((endpoint) => [
            `${endpoint.operationId}  ${endpoint.pathTemplate}`,
          ])
        );
        console.log(`\nOpenAPI: https://xergioalex.com/openapi.json`);
      }
      return;
    }

    default:
      fail(`unknown command "${command}"`);
  }
}

run().catch((error) => {
  fail(error?.message ?? String(error));
});
