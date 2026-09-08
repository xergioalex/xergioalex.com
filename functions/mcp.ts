/**
 * Cloudflare Pages Function: the XergioAleX.com MCP server endpoint.
 *
 * Routes `/mcp` to the Streamable HTTP MCP implementation in
 * `src/lib/mcp/`. The server is stateless and read-only: six tools over the
 * site's prerendered JSON API, no sessions, no server-initiated streams.
 * `functions/_middleware.ts` routes `/.well-known/mcp` to the same handler,
 * so both URLs expose the identical server.
 */

import { handleMcpHttpRequest } from '../src/lib/mcp/endpoint';

interface Env {
  ASSETS: { fetch(request: Request | string): Promise<Response> };
}

interface EventContext {
  request: Request;
  env: Env;
}

/** Read a site asset (the prerendered JSON API) relative to the origin. */
function assetFetcher(context: EventContext) {
  const origin = new URL(context.request.url).origin;
  return async (path: string): Promise<unknown | null> => {
    try {
      const asset = await context.env.ASSETS.fetch(
        new Request(new URL(path, origin).toString())
      );
      if (!asset.ok) return null;
      return await asset.json();
    } catch {
      return null;
    }
  };
}

export const onRequest = (context: EventContext): Promise<Response> =>
  handleMcpHttpRequest(context.request, assetFetcher(context));
