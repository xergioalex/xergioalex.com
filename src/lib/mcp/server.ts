/**
 * JSON-RPC layer of the XergioAleX.com MCP server.
 *
 * Implements the MCP protocol (2025-06-18) over the Streamable HTTP
 * transport: single JSON-RPC messages POSTed as `application/json`, answers
 * as plain `application/json` responses. The server is deliberately
 * stateless — no sessions, no server-initiated streams — which the
 * specification allows: `GET` and `DELETE` on the endpoint are answered with
 * 405, and no `Mcp-Session-Id` is ever issued.
 *
 * The HTTP envelope (status codes, Accept negotiation, CORS) lives in
 * `functions/mcp.ts`; this module is the pure, testable core.
 */

import { type AssetFetcher, executeMcpTool, MCP_TOOLS } from './tools';

export const MCP_PROTOCOL_VERSION = '2025-06-18';
/** Protocol revisions this server can speak; the newest is the default. */
export const SUPPORTED_PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26'];

export const MCP_SERVER_INFO = {
  name: 'xergioalex-site',
  title: 'XergioAleX.com',
  version: '1.0.0',
} as const;

export const MCP_INSTRUCTIONS =
  'Read-only access to xergioalex.com, the personal site and technical blog of Sergio Florez (XergioAleX). Search posts, walk series, browse tags and slide decks. The site is bilingual: pass lang "en" (default) or "es". Everything is public — no authentication, no writes.';

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

export interface JsonRpcErrorShape {
  code: number;
  message: string;
  data?: unknown;
}

export type JsonRpcResponse =
  | { jsonrpc: '2.0'; id: string | number | null; result: unknown }
  | { jsonrpc: '2.0'; id: string | number | null; error: JsonRpcErrorShape };

// JSON-RPC 2.0 error codes used by MCP.
export const PARSE_ERROR = -32700;
export const INVALID_REQUEST = -32600;
export const METHOD_NOT_FOUND = -32601;
export const INVALID_PARAMS = -32602;
export const INTERNAL_ERROR = -32603;

function errorResponse(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown
): JsonRpcResponse {
  return {
    jsonrpc: '2.0',
    id,
    error: { code, message, ...(data !== undefined ? { data } : {}) },
  };
}

function resultResponse(
  id: string | number | null,
  result: unknown
): JsonRpcResponse {
  return { jsonrpc: '2.0', id, result };
}

export function isJsonRpcRequest(value: unknown): value is JsonRpcRequest {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    candidate.jsonrpc === '2.0' &&
    typeof candidate.method === 'string' &&
    candidate.method.length > 0
  );
}

/**
 * Handle one JSON-RPC message.
 *
 * Returns a response object for requests, or `null` for notifications
 * (messages without an `id`), which the HTTP layer acknowledges with 202.
 */
export async function handleMcpMessage(
  message: unknown,
  fetchAsset: AssetFetcher
): Promise<JsonRpcResponse | null> {
  if (!isJsonRpcRequest(message)) {
    return errorResponse(
      null,
      INVALID_REQUEST,
      'Not a valid JSON-RPC 2.0 request.'
    );
  }

  const { method, params } = message;
  const id = message.id ?? null;

  // A message without an id is a notification: never answer it.
  if (id === null) {
    return null;
  }

  try {
    switch (method) {
      case 'initialize': {
        const requested = String(
          (params as Record<string, unknown> | undefined)?.protocolVersion ?? ''
        );
        const protocolVersion = SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
          ? requested
          : MCP_PROTOCOL_VERSION;
        return resultResponse(id, {
          protocolVersion,
          capabilities: {
            tools: { listChanged: false },
          },
          serverInfo: MCP_SERVER_INFO,
          instructions: MCP_INSTRUCTIONS,
        });
      }

      case 'ping':
        return resultResponse(id, {});

      case 'tools/list':
        return resultResponse(id, { tools: MCP_TOOLS });

      case 'tools/call': {
        const call = params as {
          name?: string;
          arguments?: Record<string, unknown>;
        };
        const name = call?.name;
        if (typeof name !== 'string' || name.length === 0) {
          return errorResponse(
            id,
            INVALID_PARAMS,
            'params.name must be a tool name.'
          );
        }
        // An unknown tool is a protocol error (invalid params), not a tool
        // execution failure.
        if (!MCP_TOOLS.some((tool) => tool.name === name)) {
          return errorResponse(id, INVALID_PARAMS, `Unknown tool: ${name}`);
        }
        try {
          const toolResult = await executeMcpTool(
            name,
            call.arguments ?? {},
            fetchAsset
          );
          return resultResponse(id, {
            content: [{ type: 'text', text: toolResult.text }],
            structuredContent: toolResult.structuredContent,
            isError: false,
          });
        } catch (toolError) {
          // A failing tool is a result (isError), not a protocol error.
          const messageText =
            toolError instanceof Error ? toolError.message : String(toolError);
          return resultResponse(id, {
            content: [{ type: 'text', text: messageText }],
            isError: true,
          });
        }
      }

      case 'resources/list':
      case 'prompts/list':
        // This server exposes tools only.
        return resultResponse(
          id,
          method === 'resources/list' ? { resources: [] } : { prompts: [] }
        );

      default:
        return errorResponse(id, METHOD_NOT_FOUND, `Unknown method: ${method}`);
    }
  } catch (error) {
    const messageText = error instanceof Error ? error.message : String(error);
    return errorResponse(id, INTERNAL_ERROR, messageText);
  }
}
