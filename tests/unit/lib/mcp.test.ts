import { describe, expect, it } from 'vitest';

import {
  handleMcpCorsPreflight,
  handleMcpHttpRequest,
} from '@/lib/mcp/endpoint';
import {
  handleMcpMessage,
  isJsonRpcRequest,
  MCP_PROTOCOL_VERSION,
  MCP_SERVER_INFO,
} from '@/lib/mcp/server';
import { type AssetFetcher, MCP_TOOLS } from '@/lib/mcp/tools';

/**
 * Fake asset store mirroring the prerendered JSON API the tools read.
 * Keys are site-relative paths (e.g. "/api/posts-en.json").
 */
const ASSETS: Record<string, unknown> = {
  '/api/posts-en.json': [
    {
      slug: 'aeo-score-100',
      lang: 'en',
      title: 'What It Takes to Score 100 on isitagentready',
      description: 'A field guide to agent readiness',
      pubDate: '2026-08-20T00:00:00.000Z',
      tags: ['tech', 'aeo'],
    },
    {
      slug: 'trading-journal-2026',
      lang: 'en',
      title: 'Trading Journal 2026',
      description: 'Futures and forex notes',
      pubDate: '2026-01-02T00:00:00.000Z',
      tags: ['trading'],
    },
  ],
  '/api/series/en/index.json': {
    lang: 'en',
    total: 1,
    series: [
      {
        slug: 'trading-journey',
        title: 'Trading Journey',
        postCount: 3,
      },
    ],
  },
  '/api/series/en/trading-journey.json': {
    series: 'trading-journey',
    lang: 'en',
    total: 2,
    posts: [
      { slug: 'futures', title: 'From Futures to Forex' },
      { slug: 'market-profile', title: 'What Is Market Profile' },
    ],
  },
  '/api/timeline/en/tech.json': {
    tag: 'tech',
    lang: 'en',
    total: 1,
    posts: [{ slug: 'aeo-score-100', title: 'What It Takes to Score 100' }],
  },
  '/api/index.json': {
    name: 'XergioAleX.com public API',
    version: '1.0.0',
    endpoints: [{ operationId: 'listPosts' }],
  },
};

const fetchAsset: AssetFetcher = async (path) =>
  path in ASSETS ? ASSETS[path] : null;

const rpc = (
  method: string,
  params?: Record<string, unknown>,
  id: string | number | null = 1
) => ({
  jsonrpc: '2.0' as const,
  id,
  method,
  ...(params ? { params } : {}),
});

// ─── initialize ─────────────────────────────────────────

describe('MCP initialize', () => {
  it('echoes a supported protocol version and declares tools capability', async () => {
    const response = await handleMcpMessage(
      rpc('initialize', {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: { name: 'test-client', version: '1.0' },
      }),
      fetchAsset
    );

    expect(response).toMatchObject({
      jsonrpc: '2.0',
      id: 1,
      result: {
        protocolVersion: '2025-06-18',
        capabilities: { tools: { listChanged: false } },
        serverInfo: MCP_SERVER_INFO,
      },
    });
  });

  it('answers an unsupported protocol version with the newest supported one', async () => {
    const response = await handleMcpMessage(
      rpc('initialize', { protocolVersion: '1999-01-01' }),
      fetchAsset
    );

    expect(
      (response as { result: { protocolVersion: string } }).result
        .protocolVersion
    ).toBe(MCP_PROTOCOL_VERSION);
  });
});

// ─── tools ──────────────────────────────────────────────

describe('MCP tools', () => {
  it('lists every tool with a typed inputSchema', async () => {
    const response = await handleMcpMessage(rpc('tools/list'), fetchAsset);
    const tools = (response as { result: { tools: unknown[] } }).result.tools;

    expect(tools).toHaveLength(MCP_TOOLS.length);
    for (const tool of MCP_TOOLS) {
      expect(tool.inputSchema.type).toBe('object');
      expect(tool.description.length).toBeGreaterThan(20);
    }
  });

  it('search_blog_posts matches title, description and tags', async () => {
    const response = await handleMcpMessage(
      rpc('tools/call', {
        name: 'search_blog_posts',
        arguments: { query: 'agent readiness' },
      }),
      fetchAsset
    );
    const result = (
      response as {
        result: { isError: boolean; structuredContent: { total: number } };
      }
    ).result;

    expect(result.isError).toBe(false);
    expect(result.structuredContent.total).toBe(1);
  });

  it('returns an empty result set when nothing matches', async () => {
    const response = await handleMcpMessage(
      rpc('tools/call', {
        name: 'search_blog_posts',
        arguments: { query: 'zzz-no-match' },
      }),
      fetchAsset
    );
    const result = (
      response as { result: { structuredContent: { total: number } } }
    ).result;
    expect(result.structuredContent.total).toBe(0);
  });

  it('get_series returns the ordered chapters', async () => {
    const response = await handleMcpMessage(
      rpc('tools/call', {
        name: 'get_series',
        arguments: { slug: 'trading-journey' },
      }),
      fetchAsset
    );
    const structured = (
      response as { result: { structuredContent: { total: number } } }
    ).result.structuredContent;
    expect(structured.total).toBe(2);
  });

  it('get_series reports a missing series as an isError result, not a crash', async () => {
    const response = await handleMcpMessage(
      rpc('tools/call', { name: 'get_series', arguments: { slug: 'nope' } }),
      fetchAsset
    );
    expect((response as { result: { isError: boolean } }).result.isError).toBe(
      true
    );
  });

  it('rejects an unknown tool with JSON-RPC invalid params', async () => {
    const response = await handleMcpMessage(
      rpc('tools/call', { name: 'delete_everything', arguments: {} }),
      fetchAsset
    );
    expect((response as { error: { code: number } }).error.code).toBe(-32602);
  });
});

// ─── protocol edge cases ────────────────────────────────

describe('MCP JSON-RPC handling', () => {
  it('never answers a notification (no id)', async () => {
    const response = await handleMcpMessage(
      rpc('notifications/initialized', undefined, null),
      fetchAsset
    );
    expect(response).toBeNull();
  });

  it('answers ping with an empty result', async () => {
    const response = await handleMcpMessage(rpc('ping'), fetchAsset);
    expect((response as { result: object }).result).toEqual({});
  });

  it('rejects unknown methods with -32601', async () => {
    const response = await handleMcpMessage(rpc('resources/read'), fetchAsset);
    expect((response as { error: { code: number } }).error.code).toBe(-32601);
  });

  it('rejects non-JSON-RPC payloads with -32600', async () => {
    expect(isJsonRpcRequest({ hello: 'world' })).toBe(false);
    const response = await handleMcpMessage({ hello: 'world' }, fetchAsset);
    expect((response as { error: { code: number } }).error.code).toBe(-32600);
  });
});

// ─── HTTP envelope (Streamable HTTP transport) ──────────

const ENDPOINT = 'https://xergioalex.com/mcp';

function mcpRequest(
  method: string,
  body?: unknown,
  headers: Record<string, string> = {}
): Request {
  return new Request(ENDPOINT, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
}

describe('MCP HTTP endpoint', () => {
  it('answers initialize with 200 and application/json', async () => {
    const response = await handleMcpHttpRequest(
      mcpRequest('POST', rpc('initialize', { protocolVersion: '2025-06-18' })),
      fetchAsset
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/json');
    const body = (await response.json()) as { result: { serverInfo: unknown } };
    expect(body.result.serverInfo).toEqual(MCP_SERVER_INFO);
  });

  it('acknowledges notifications with 202 and no body', async () => {
    const response = await handleMcpHttpRequest(
      mcpRequest('POST', {
        jsonrpc: '2.0',
        method: 'notifications/initialized',
      }),
      fetchAsset
    );
    expect(response.status).toBe(202);
    expect(await response.text()).toBe('');
  });

  it('rejects GET and DELETE with 405 (stateless, no stream)', async () => {
    for (const method of ['GET', 'DELETE']) {
      const response = await handleMcpHttpRequest(
        mcpRequest(method),
        fetchAsset
      );
      expect(response.status).toBe(405);
      expect(response.headers.get('allow')).toBe('POST, OPTIONS');
    }
  });

  it('answers CORS preflights with 204 and MCP headers allowed', () => {
    const response = handleMcpCorsPreflight();
    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-headers')).toContain(
      'MCP-Protocol-Version'
    );
  });

  it('rejects malformed JSON with 400 and -32700', async () => {
    const response = await handleMcpHttpRequest(
      new Request(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: '{not json',
      }),
      fetchAsset
    );
    expect(response.status).toBe(400);
    const body = (await response.json()) as { error: { code: number } };
    expect(body.error.code).toBe(-32700);
  });

  it('rejects batched messages with 400 (removed in 2025-06-18)', async () => {
    const response = await handleMcpHttpRequest(
      mcpRequest('POST', [rpc('ping'), rpc('ping', undefined, 2)]),
      fetchAsset
    );
    expect(response.status).toBe(400);
  });

  it('rejects non-JSON content types with 400', async () => {
    const response = await handleMcpHttpRequest(
      new Request(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain', Accept: 'application/json' },
        body: 'ping',
      }),
      fetchAsset
    );
    expect(response.status).toBe(400);
  });

  it('returns 406 when the client refuses JSON responses', async () => {
    const response = await handleMcpHttpRequest(
      mcpRequest('POST', rpc('ping'), { Accept: 'text/event-stream' }),
      fetchAsset
    );
    expect(response.status).toBe(406);
  });
});
