FROM node:22.16.0-bookworm-slim
LABEL maintainer="xergioalex@gmail.com"

RUN apt-get update -y && \
    apt-get install less git -y && \
    # --- Clean ---
    apt-get clean -y && \
    rm -rf /var/cache/apk/* && \
    rm -rf /var/lib/apt/lists/*

# Add custom commands for container
RUN echo 'source /app/docker/custom_commands.sh' >> /root/.bashrc
