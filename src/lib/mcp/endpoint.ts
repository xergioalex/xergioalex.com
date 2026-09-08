/**
 * HTTP envelope of the XergioAleX.com MCP server (Streamable HTTP transport).
 *
 * Framework-agnostic: give it a `Request` and a way to read site assets, get
 * a `Response`. `functions/mcp.ts` routes `/mcp` here, and the Pages
 * middleware routes `/.well-known/mcp` to the same handler, so both URLs are
 * literally the same server.
 */

import { handleMcpMessage, INVALID_REQUEST, PARSE_ERROR } from './server';
import type { AssetFetcher } from './tools';

const BASE_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Expose-Headers': 'MCP-Protocol-Version, Mcp-Session-Id',
  'Cache-Control': 'no-store',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(`${JSON.stringify(body)}\n`, {
    status,
    headers: {
      ...BASE_HEADERS,
      'Content-Type': 'application/json',
    },
  });
}

/** 202 for notifications, 4xx/5xx for protocol failures — no body otherwise. */
function emptyResponse(
  status: number,
  extraHeaders?: Record<string, string>
): Response {
  return new Response(null, {
    status,
    headers: { ...BASE_HEADERS, ...extraHeaders },
  });
}

export function handleMcpCorsPreflight(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      ...BASE_HEADERS,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Authorization, Last-Event-ID',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * Handle one HTTP request to the MCP endpoint (`/mcp`, `/.well-known/mcp`).
 */
export async function handleMcpHttpRequest(
  request: Request,
  fetchAsset: AssetFetcher
): Promise<Response> {
  const method = request.method.toUpperCase();

  if (method === 'OPTIONS') return handleMcpCorsPreflight();

  // Streamable HTTP: this server answers with plain JSON responses only. It
  // offers no server-initiated stream (GET) and tracks no sessions (DELETE),
  // so both are answered with 405 as the specification allows.
  if (method === 'GET' || method === 'HEAD') {
    return emptyResponse(405, {
      Allow: 'POST, OPTIONS',
    });
  }
  if (method === 'DELETE') {
    return emptyResponse(405, { Allow: 'POST, OPTIONS' });
  }
  if (method !== 'POST') {
    return emptyResponse(405, { Allow: 'POST, OPTIONS' });
  }

  // Accept negotiation: the answer is application/json. Clients that refuse
  // JSON (and offer no wildcard) cannot be served.
  const accept = request.headers.get('accept') ?? '';
  const acceptsJson =
    accept === '' ||
    accept.includes('application/json') ||
    accept.includes('*/*') ||
    accept.includes('application/*');
  if (!acceptsJson) {
    return emptyResponse(406, { Allow: 'POST, OPTIONS' });
  }

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return jsonResponse(
      {
        jsonrpc: '2.0',
        id: null,
        error: {
          code: INVALID_REQUEST,
          message: 'Content-Type must be application/json.',
        },
      },
      400
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: PARSE_ERROR, message: 'Invalid JSON.' },
      },
      400
    );
  }

  // JSON-RPC batching was removed from MCP in protocol revision 2025-06-18.
  if (Array.isArray(payload)) {
    return jsonResponse(
      {
        jsonrpc: '2.0',
        id: null,
        error: {
          code: INVALID_REQUEST,
          message: 'Batched messages are not supported.',
        },
      },
      400
    );
  }

  const response = await handleMcpMessage(payload, fetchAsset);
  if (response === null) {
    // A notification — acknowledge it without a body.
    return emptyResponse(202);
  }

  return jsonResponse(response);
}
