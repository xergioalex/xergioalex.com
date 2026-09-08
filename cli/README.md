# xergioalex — the xergioalex.com CLI

Read [xergioalex.com](https://xergioalex.com) — the personal site and technical
blog of Sergio Florez (XergioAleX) — from the terminal. The CLI talks to the
site's public, read-only JSON API: no key, no login, no configuration.

```bash
npm install -g xergioalex
```

## Usage

```bash
xergioalex posts                        # latest English posts
xergioalex posts --lang es --limit 5    # latest 5 Spanish posts
xergioalex search "mcp"                 # search titles, descriptions and tags
xergioalex post aeo-score-100-on-isitagentready
xergioalex series                       # list blog series
xergioalex series trading-journey       # chapters, in reading order
xergioalex tag trading                  # every post carrying a tag
xergioalex talks                        # slide decks timeline
xergioalex api                          # the JSON API index
xergioalex posts --json                 # machine-readable output
```

Every command accepts `--json` for raw JSON and `--lang en|es` (default `en`).

## Why a CLI?

Because agents and scripts should not have to scrape HTML. The same data is
available as a [JSON API](https://xergioalex.com/api/index.json) documented in
[OpenAPI 3.1](https://xergioalex.com/openapi.json) and as an
[MCP server](https://xergioalex.com/mcp) — the CLI is the third door to the
same room, for the terminal-first.

## Development

```bash
node cli/bin/xergioalex.mjs help        # run from the repo, no install
npm test                                # repo tests include cli/src/core tests
```

Requires Node ≥ 18 (global `fetch`). Zero runtime dependencies.
