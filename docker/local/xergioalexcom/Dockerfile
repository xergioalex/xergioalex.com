FROM node:24.21.0-trixie-slim
LABEL maintainer="xergioalex@gmail.com"

# Debian's default CDN (deb.debian.org) resolves to an edge that serves some
# networks at ~55 KB/s, which turns the Chromium install below into a 50-minute
# step; cdn-aws serves the identical archives at 12-18 MB/s. Both the main and
# the debian-security URIs are rewritten — chromium ships from security, and a
# mirror that only carries main leaves the two largest packages on the slow
# path. Override per build when a different mirror is closer:
#   docker compose build --build-arg APT_MIRROR=deb.debian.org
ARG APT_MIRROR=cdn-aws.deb.debian.org
RUN sed -i "s|deb.debian.org|${APT_MIRROR}|g" /etc/apt/sources.list.d/debian.sources

# System packages (apt requires root)
RUN apt-get update -y && \
    apt-get install -y less git curl gnupg ca-certificates openssh-server sudo nano \
    # Chromium for Lighthouse CI local audits
    chromium && \
    # Install GitHub CLI (binary is system-wide; per-user config lives in ~/.config/gh)
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && \
    chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null && \
    apt-get update && \
    apt-get install -y gh && \
    # --- Clean ---
    apt-get clean -y && \
    rm -rf /var/cache/apk/* && \
    rm -rf /var/lib/apt/lists/*

# SSH setup for Herdr remote/multi-machine access.
#
# Host keys are deliberately NOT generated here. `ssh-keygen -A` in a Dockerfile
# writes the host PRIVATE key into an image layer, and mints a fresh identity on
# every rebuild — so every client that pinned the old key refuses to connect
# until someone clears known_hosts by hand. Generating them at entrypoint into
# /etc/ssh is worse: that path is not persisted, so the identity changes on
# every recreate. They are created once, at first start, into the
# ssh_host_keys volume (see entrypoint.sh), and sshd is pointed at them by the
# HostKey lines below.
RUN mkdir -p /var/run/sshd /etc/ssh/host_keys && \
    chmod 700 /etc/ssh/host_keys && \
    printf '%s\n' \
      'PasswordAuthentication no' \
      'PubkeyAuthentication yes' \
      'PermitRootLogin no' \
      'UsePAM yes' \
      'AllowTcpForwarding yes' \
      'AllowStreamLocalForwarding yes' \
      '# Persisted across rebuilds and recreates by the ssh_host_keys volume.' \
      'HostKey /etc/ssh/host_keys/ssh_host_ed25519_key' \
      'HostKey /etc/ssh/host_keys/ssh_host_rsa_key' \
      > /etc/ssh/sshd_config.d/herdr.conf

# Herdr, SSH, and agent subprocesses spawn $SHELL (falling back to /bin/sh).
# custom_commands.sh is bash, so leave SHELL as bash or grokx/claudex vanish.
ENV SHELL=/bin/bash

# Default terminal editor inside container (used by Git for merge/commit messages)
ENV EDITOR=nano
ENV VISUAL=nano
ENV GIT_EDITOR=nano

# Chromium path for Lighthouse CI (chrome-launcher)
ENV CHROME_PATH=/usr/bin/chromium
ENV CHROMIUM_FLAGS="--no-sandbox"

# Add node user to sudoers (node user already exists in official node images with uid 1000)
RUN echo 'node ALL=(root) NOPASSWD:ALL' > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Ensure the container's image-installed Node (/usr/local/bin) precedes any
# IDE-bundled Node that gets prepended to PATH at shell startup — Cursor Server
# (~/.cursor-server/bin/<commit>/node), VS Code Server, etc. Without this,
# `node`/`npx`/`pnpm` in agent shells resolves to the IDE's bundled binary
# (often an older LTS), even though `FROM node:24-...` installs the right one.
# Login shells source /etc/profile.d/*; this is the most universal anchor.
# NOTE: This only helps LOGIN shells (interactive terminals, agent CLIs that
# spawn via `bash -l`). It does NOT affect MCP servers launched by Cursor via
# child_process.spawn — those need absolute paths in .cursor/mcp.json (e.g.
# `"command": "/usr/local/bin/npx"`) to bypass the IDE's manipulated PATH.
RUN printf '%s\n' \
    '# Container-installed Node must win over IDE-bundled Node (Cursor Server, etc.).' \
    '# This drop-in is idempotent and safe for any POSIX-ish shell.' \
    'if [ -x /usr/local/bin/node ]; then' \
    '  case ":${PATH}:" in' \
    '    ":/usr/local/bin:"*) : ;;  # already at the front' \
    '    *) PATH="/usr/local/bin:${PATH}" ;;' \
    '  esac' \
    '  export PATH' \
    'fi' \
    > /etc/profile.d/00-container-node-first.sh \
    && chmod 0644 /etc/profile.d/00-container-node-first.sh

# Enable corepack so pnpm is provisioned from the version pinned in
# package.json's "packageManager" field. Avoid `npm install -g pnpm` —
# it defeats the pin.
RUN corepack enable

# pnpm global install location. pnpm writes binaries to ${PNPM_HOME}/bin,
# so that subdirectory must be on PATH for `corepack pnpm add -g <pkg>` to succeed.
ENV PNPM_HOME=/usr/local/share/pnpm
RUN mkdir -p "${PNPM_HOME}/bin" \
    && chown -R node:node "${PNPM_HOME}"

# Make node user's CLI install dirs available on PATH (pnpm globals, Claude, Cursor, OpenCode, Grok)
ENV PATH=${PNPM_HOME}/bin:${PNPM_HOME}:/home/node/.local/bin:/home/node/.cursor/bin:/home/node/.opencode/bin:/home/node/.grok/bin:$PATH
ENV CLINE_DATA_DIR=/home/node/.cline/data

# Redirect any `npm` invocation to pnpm — this repo uses pnpm exclusively,
# so running npm would corrupt node_modules and pnpm-lock.yaml. Replace the
# real npm symlink at /usr/local/bin/npm (always in PATH, regardless of how
# the shell is launched — interactive, Remote SSH, exec, scripts).
RUN rm -f /usr/local/bin/npm && \
    printf '#!/bin/bash\necho "[npm→pnpm] Redirecting \"npm $*\" to pnpm (this repo uses pnpm)." >&2\nexec corepack pnpm "$@"\n' \
    > /usr/local/bin/npm \
    && chmod +x /usr/local/bin/npm

# Source custom commands for every bash the node user can hit:
# - Interactive terminals read ~/.bashrc
# - Login shells (SSH, herdr remote) read Debian's ~/.profile (which sources
#   ~/.bashrc) plus /etc/profile.d. Do NOT write ~/.bash_profile — that would
#   shadow Debian's ~/.profile and drop ~/.local/bin, where herdr itself lives.
# PATH shims for grokx/etc. are installed at container start (see entrypoint).
RUN usermod -s /bin/bash node && \
    echo 'source /app/docker/custom_commands.sh' >> /home/node/.bashrc && \
    printf '%s\n' \
      '# Login shells (SSH, herdr remote). Dash cannot parse bash functions.' \
      'if [ -n "${BASH_VERSION:-}" ] && [ -f /app/docker/custom_commands.sh ]; then' \
      '  . /app/docker/custom_commands.sh' \
      'fi' \
      > /etc/profile.d/99-xergioalex-custom-commands.sh && \
    chmod 0644 /etc/profile.d/99-xergioalex-custom-commands.sh && \
    chown node:node /home/node/.bashrc

# Pre-create persistent data dirs so the named volumes inherit node ownership on first mount
RUN mkdir -p /home/node/.claude_data /home/node/.codex_data /home/node/.cursor_data /home/node/.gh_data \
    /home/node/.chelper_data /home/node/.opencode_data /home/node/.pi_data /home/node/.cline_data /home/node/.herdr_data /home/node/.grok_data /home/node/.ssh \
    && chown -R node:node /home/node

# Install AI CLIs and configure git as node user
USER node

# Install Claude Code CLI (native installer, npm method is deprecated).
# Remove fresh install artifacts so the persistent volume isn't overwritten on rebuild.
RUN curl -fsSL https://claude.ai/install.sh | bash \
    && rm -rf /home/node/.claude /home/node/.claude.json

# Install Cursor CLI (provides the 'agent' command in ~/.cursor/bin)
RUN curl -fsSL https://cursor.com/install | bash

# Install OpenCode with its official installer.
RUN curl -fsSL https://opencode.ai/install | bash -s -- --no-modify-path \
    && opencode --version

# Install Codex, Cline, Pi, and Z.AI Coding Tool Helper globally via pnpm.
# Pi needs --ignore-scripts per upstream docs.
RUN corepack pnpm add -g @openai/codex cline @z_ai/coding-helper \
    && corepack pnpm add -g --ignore-scripts @earendil-works/pi-coding-agent

# Install the official xAI Grok CLI and Herdr terminal runtime.
#
# Herdr's installer caps its binary download at `--max-time 120`, with no
# environment variable to override it. When GitHub serves this network at
# ~50 KB/s the 24 MB binary needs about eight minutes, so all four of the
# installer's retries die at two and the build fails outright — not slowly,
# permanently. The sed lifts only that one cap (the manifest fetch keeps its
# own 20s timeout) and leaves the SHA-256 verification and install logic
# untouched. If upstream ever rewords that line the sed becomes a no-op and
# the original timeout returns, which fails loudly here rather than silently.
RUN curl -fsSL https://x.ai/cli/install.sh | bash \
    && curl -fsSL https://herdr.dev/install.sh | sed 's/--max-time 120/--max-time 1800/' | bash \
    && pi --version \
    && cline --version \
    && herdr --version

# Configure Git for node user (can be overridden by mounted .gitconfig)
RUN git config --global init.defaultBranch main \
    && git config --global pull.rebase false \
    && git config --global safe.directory '*'

USER root

# Restore the tool directories that a LOGIN shell loses.
#
# Debian's /etc/profile overwrites PATH wholesale for non-root users
# (PATH="/usr/local/bin:/usr/bin:/bin:..."), discarding the ENV PATH set above.
# `docker exec` keeps that ENV and sees every CLI; a login shell -- the editor
# terminal, `dev.sh shell`, anything spawned as `bash -l` -- silently loses
# opencode, grok, and all four pnpm globals (codex, cline, pi, chelper), while
# node and claude keep working, which is what makes the breakage so confusing.
#
# profile.d is sourced AFTER that overwrite, so this repairs it. The tool dirs
# are APPENDED, never prepended: 00-container-node-first.sh has already put
# /usr/local/bin at the front so the image's own node wins over an IDE-bundled
# one, and prepending here would undo exactly that.
#
# Deliberately a separate, later layer rather than an edit to the earlier
# drop-in: touching that RUN would invalidate every layer after it, including
# the OpenCode and Herdr downloads that take ~30 minutes on a slow link.
RUN printf '%s\n' \
    '# Re-add the tool dirs that Debian'"'"'s /etc/profile drops from PATH,' \
    '# and the vars sshd does not inherit. Appended, never prepended, so' \
    '# /usr/local/bin (set by 00-container-node-first.sh) stays first.' \
    'export SHELL="${SHELL:-/bin/bash}"' \
    'export PNPM_HOME="${PNPM_HOME:-/usr/local/share/pnpm}"' \
    'for _d in /usr/local/share/pnpm/bin "$HOME/.local/bin" "$HOME/.cursor/bin" "$HOME/.opencode/bin" "$HOME/.grok/bin"; do' \
    '  [ -d "$_d" ] || continue' \
    '  case ":${PATH}:" in' \
    '    *":${_d}:"*) ;;' \
    '    *) PATH="${PATH}:${_d}" ;;' \
    '  esac' \
    'done' \
    'unset _d' \
    'export PATH' \
    > /etc/profile.d/01-container-tool-paths.sh \
    && chmod 0644 /etc/profile.d/01-container-tool-paths.sh

# Copy and setup entrypoint script
COPY xergioalexcom/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
