FROM node:24.13.0-bookworm-slim
LABEL maintainer="xergioalex@gmail.com"

RUN apt-get update -y && \
    apt-get install -y less git curl gnupg ca-certificates openssh-client sudo && \
    # Install GitHub CLI
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && \
    chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null && \
    apt-get update && \
    apt-get install -y gh && \
    # Install Claude Code CLI globally
    npm install -g @anthropic-ai/claude-code && \
    # Install Codex CLI globally
    npm install -g @openai/codex && \
    # --- Clean ---
    apt-get clean -y && \
    rm -rf /var/cache/apk/* && \
    rm -rf /var/lib/apt/lists/*

# Add node user to sudoers (node user already exists in official node images with uid 1000)
RUN echo 'node ALL=(root) NOPASSWD:ALL' > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Install Cursor CLI globally (for root)
# The Cursor CLI installer script installs the 'agent' command
RUN curl -fsSL https://cursor.com/install | bash \
    && ln -sf /root/.cursor/bin/agent /usr/local/bin/agent \
    && ln -sf /root/.cursor/bin/agent /usr/local/bin/cursor-agent

# Configure Git to avoid warnings for root (can be overridden by mounted .gitconfig)
RUN git config --global init.defaultBranch main \
    && git config --global pull.rebase false \
    && git config --global safe.directory '*'

# Configure Git for node user as well
USER node
RUN git config --global init.defaultBranch main \
    && git config --global pull.rebase false \
    && git config --global safe.directory '*'
USER root

# Add custom commands for container (both root and node user)
RUN echo 'source /app/docker/custom_commands.sh' >> /root/.bashrc \
    && echo 'source /app/docker/custom_commands.sh' >> /home/node/.bashrc

# Create directories for node user that mirror root's setup
RUN mkdir -p /home/node/.claude_data /home/node/.codex_data /home/node/.cursor_data /home/node/.gh_data /home/node/.ssh \
    && chown -R node:node /home/node

# Install Cursor CLI for node user as well
USER node
RUN curl -fsSL https://cursor.com/install | bash
USER root
# Create symlinks to make cursor agent available system-wide for node user
RUN ln -sf /home/node/.cursor/bin/agent /usr/local/bin/agent 2>/dev/null || true

# Copy and setup entrypoint script
COPY xergioalexcom/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
