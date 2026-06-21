#!/bin/sh
# Wrapper for chrome-devtools-mcp inside the Docker dev container.
# Forces --no-sandbox because Chromium cannot use its sandbox when running
# as the non-root `node` user in the container. Points at the Chromium that
# ships inside the image (/usr/bin/chromium), so the MCP never tries to
# download its own browser.
exec /usr/bin/chromium --no-sandbox "$@"
