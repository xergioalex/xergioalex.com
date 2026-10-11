#!/usr/bin/env bash
# The site's own start hook: devcontainer-kit runs it as the container user, from
# /app, at every container start (dck_repo_hook).
set -eu

# Git, gh and ssh keep working exactly as on the host. devcontainer-kit mounts the
# host's SSH agent at /run/dck/ssh-agent.sock (public keys only inside the container;
# signing happens on the host). Herdr points its panes' SSH_AUTH_SOCK at its own
# forwarded-agent link, which dangles ("...sock.unavailable") whenever the client that
# attached did not forward an agent. This idempotent block makes every new shell fall
# back to the mounted host agent in that case, and repairs Herdr's link right away.
DCK_AGENT=/run/dck/ssh-agent.sock
if [ -S "$DCK_AGENT" ]; then
  link="$HOME/.config/herdr/herdr.sock.agent"
  if [ -L "$link" ] && [ ! -S "$link" ]; then ln -sfn "$DCK_AGENT" "$link"; fi
  marker='# dwp-ssh-agent-fallback'
  for rc in "$HOME/.profile" "$HOME/.bashrc"; do
    [ -f "$rc" ] || touch "$rc"
    grep -qF "$marker" "$rc" || cat >> "$rc" <<'RC'

# dwp-ssh-agent-fallback
if [ -S /run/dck/ssh-agent.sock ] && { [ -z "${SSH_AUTH_SOCK:-}" ] || [ ! -S "${SSH_AUTH_SOCK}" ]; }; then
  export SSH_AUTH_SOCK=/run/dck/ssh-agent.sock
fi
RC
  done
fi
