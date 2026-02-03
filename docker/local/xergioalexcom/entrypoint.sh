#!/bin/bash

# Setup Claude CLI persistence with symlinks for a given user
# This ensures Claude config persists across container rebuilds
setup_claude_persistence_for_user() {
    USER_HOME="$1"
    CLAUDE_DATA_DIR="${USER_HOME}/.claude_data"
    CLAUDE_JSON="${USER_HOME}/.claude.json"
    CLAUDE_DIR="${USER_HOME}/.claude"
    CLAUDE_JSON_BACKUP="${USER_HOME}/.claude.json.backup"

    # Ensure the persistent data directory exists
    mkdir -p "${CLAUDE_DATA_DIR}"

    # Handle .claude.json file
    if [ ! -L "${CLAUDE_JSON}" ]; then
        # If it's a real file, move it to the persistent volume
        if [ -f "${CLAUDE_JSON}" ]; then
            cp "${CLAUDE_JSON}" "${CLAUDE_DATA_DIR}/claude.json"
            rm "${CLAUDE_JSON}"
        fi
        # Create symlink
        ln -sf "${CLAUDE_DATA_DIR}/claude.json" "${CLAUDE_JSON}"
    fi

    # Handle .claude directory
    if [ ! -L "${CLAUDE_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${CLAUDE_DIR}" ]; then
            cp -r "${CLAUDE_DIR}" "${CLAUDE_DATA_DIR}/claude_dir"
            rm -rf "${CLAUDE_DIR}"
        else
            mkdir -p "${CLAUDE_DATA_DIR}/claude_dir"
        fi
        # Create symlink
        ln -sf "${CLAUDE_DATA_DIR}/claude_dir" "${CLAUDE_DIR}"
    fi

    # Handle .claude.json.backup file if exists
    if [ -f "${CLAUDE_JSON_BACKUP}" ] && [ ! -L "${CLAUDE_JSON_BACKUP}" ]; then
        cp "${CLAUDE_JSON_BACKUP}" "${CLAUDE_DATA_DIR}/claude.json.backup"
        rm "${CLAUDE_JSON_BACKUP}"
        ln -sf "${CLAUDE_DATA_DIR}/claude.json.backup" "${CLAUDE_JSON_BACKUP}"
    fi
}

# Setup Claude persistence for both root and node user
setup_claude_persistence_for_user "/root"
setup_claude_persistence_for_user "/home/node"
chown -R node:node /home/node/.claude_data /home/node/.claude.json /home/node/.claude 2>/dev/null || true

# Setup Codex CLI persistence with symlinks for a given user
# This ensures OpenAI Codex config persists across container rebuilds
setup_codex_persistence_for_user() {
    USER_HOME="$1"
    CODEX_DATA_DIR="${USER_HOME}/.codex_data"
    CODEX_DIR="${USER_HOME}/.codex"

    # Ensure the persistent data directory exists
    mkdir -p "${CODEX_DATA_DIR}"

    # Handle .codex directory
    if [ ! -L "${CODEX_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${CODEX_DIR}" ]; then
            cp -r "${CODEX_DIR}" "${CODEX_DATA_DIR}/codex_dir"
            rm -rf "${CODEX_DIR}"
        else
            mkdir -p "${CODEX_DATA_DIR}/codex_dir"
        fi
        # Create symlink
        ln -sf "${CODEX_DATA_DIR}/codex_dir" "${CODEX_DIR}"
    fi
}

# Setup Codex persistence for both root and node user
setup_codex_persistence_for_user "/root"
setup_codex_persistence_for_user "/home/node"
chown -R node:node /home/node/.codex_data /home/node/.codex 2>/dev/null || true

# Setup Cursor CLI persistence with symlinks for a given user
# This ensures Cursor CLI config persists across container rebuilds
# Cursor stores data in two locations:
#   - ~/.cursor (CLI config, chats, projects)
#   - ~/.config/cursor (auth tokens - accessToken, refreshToken)
setup_cursor_persistence_for_user() {
    USER_HOME="$1"
    CURSOR_DATA_DIR="${USER_HOME}/.cursor_data"
    CURSOR_DIR="${USER_HOME}/.cursor"
    CURSOR_CONFIG_DIR="${USER_HOME}/.config/cursor"

    # Ensure the persistent data directory exists
    mkdir -p "${CURSOR_DATA_DIR}"

    # Handle .cursor directory (CLI config, chats, projects)
    if [ ! -L "${CURSOR_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${CURSOR_DIR}" ]; then
            cp -r "${CURSOR_DIR}" "${CURSOR_DATA_DIR}/cursor_dir"
            rm -rf "${CURSOR_DIR}"
        else
            mkdir -p "${CURSOR_DATA_DIR}/cursor_dir"
        fi
        # Create symlink
        ln -sf "${CURSOR_DATA_DIR}/cursor_dir" "${CURSOR_DIR}"
    fi

    # Handle .config/cursor directory (auth tokens)
    mkdir -p "${USER_HOME}/.config"
    if [ ! -L "${CURSOR_CONFIG_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${CURSOR_CONFIG_DIR}" ]; then
            cp -r "${CURSOR_CONFIG_DIR}" "${CURSOR_DATA_DIR}/config_cursor"
            rm -rf "${CURSOR_CONFIG_DIR}"
        else
            mkdir -p "${CURSOR_DATA_DIR}/config_cursor"
        fi
        # Create symlink
        ln -sf "${CURSOR_DATA_DIR}/config_cursor" "${CURSOR_CONFIG_DIR}"
    fi
}

# Setup Cursor persistence for both root and node user
setup_cursor_persistence_for_user "/root"
setup_cursor_persistence_for_user "/home/node"
chown -R node:node /home/node/.cursor_data /home/node/.cursor 2>/dev/null || true

# Setup GitHub CLI persistence with symlinks for a given user
# This ensures gh config persists across container rebuilds
setup_gh_persistence_for_user() {
    USER_HOME="$1"
    GH_DATA_DIR="${USER_HOME}/.gh_data"
    GH_CONFIG_DIR="${USER_HOME}/.config/gh"

    # Ensure the persistent data directory exists
    mkdir -p "${GH_DATA_DIR}"

    # Handle .config/gh directory
    if [ ! -L "${GH_CONFIG_DIR}" ]; then
        # Create parent directory if needed
        mkdir -p "${USER_HOME}/.config"

        # If it's a real directory, move it to the persistent volume
        if [ -d "${GH_CONFIG_DIR}" ]; then
            cp -r "${GH_CONFIG_DIR}" "${GH_DATA_DIR}/gh_dir"
            rm -rf "${GH_CONFIG_DIR}"
        else
            mkdir -p "${GH_DATA_DIR}/gh_dir"
        fi
        # Create symlink
        ln -sf "${GH_DATA_DIR}/gh_dir" "${GH_CONFIG_DIR}"
    fi
}

# Setup GitHub CLI persistence for both root and node user
setup_gh_persistence_for_user "/root"
setup_gh_persistence_for_user "/home/node"
chown -R node:node /home/node/.gh_data /home/node/.config 2>/dev/null || true

# Setup SSH keys from host with correct permissions for a given user
# This allows git operations with GitHub/GitLab
setup_ssh_keys_for_user() {
    USER_HOME="$1"
    SSH_HOST_DIR="${USER_HOME}/.ssh_host"
    SSH_DIR="${USER_HOME}/.ssh"

    # Only setup if host SSH directory is mounted
    if [ -d "${SSH_HOST_DIR}" ]; then
        # Create SSH directory if it doesn't exist
        mkdir -p "${SSH_DIR}"

        # Check if SSH keys already exist in container
        KEYS_EXIST=false
        if [ -f "${SSH_DIR}/id_rsa" ] || [ -f "${SSH_DIR}/id_ed25519" ] || [ -f "${SSH_DIR}/id_ecdsa" ]; then
            KEYS_EXIST=true
        fi

        # Only copy if keys don't exist yet (to avoid overwriting persistent volume)
        if [ "$KEYS_EXIST" = false ]; then
            echo "Setting up SSH keys from host for ${USER_HOME}..."

            # Copy ALL private keys from host (id_rsa, id_ed25519, id_ecdsa, id_rsa_xergioalex, etc.)
            for key_file in "${SSH_HOST_DIR}"/id_*; do
                if [ -f "$key_file" ]; then
                    key_name=$(basename "$key_file")
                    # Skip public keys (*.pub)
                    if [[ "$key_name" != *.pub ]]; then
                        cp "$key_file" "${SSH_DIR}/$key_name"
                        chmod 600 "${SSH_DIR}/$key_name"
                        echo "  ✓ Copied $key_name"
                    fi
                fi
            done

            # Copy public keys
            cp "${SSH_HOST_DIR}"/*.pub "${SSH_DIR}/" 2>/dev/null || true

            # Copy config if exists
            if [ -f "${SSH_HOST_DIR}/config" ]; then
                cp "${SSH_HOST_DIR}/config" "${SSH_DIR}/config"
                chmod 600 "${SSH_DIR}/config"
                echo "  ✓ Copied SSH config"
            fi

            # Copy known_hosts if exists (git can write to it)
            if [ -f "${SSH_HOST_DIR}/known_hosts" ]; then
                cp "${SSH_HOST_DIR}/known_hosts" "${SSH_DIR}/known_hosts"
                echo "  ✓ Copied known_hosts"
            fi

            echo "SSH keys setup completed for ${USER_HOME}"
        fi

        # Always ensure correct permissions (even if keys already existed)
        chmod 700 "${SSH_DIR}" 2>/dev/null || true
        chmod 600 "${SSH_DIR}"/id_* 2>/dev/null || true
        chmod 600 "${SSH_DIR}/config" 2>/dev/null || true
    fi
}

# Setup SSH keys for both root and node user
setup_ssh_keys_for_user "/root"
setup_ssh_keys_for_user "/home/node"
chown -R node:node /home/node/.ssh 2>/dev/null || true

# Setup Node.js specific configurations
setup_nodejs() {
    # Ensure npm cache directory exists and has correct permissions for both users
    mkdir -p /root/.npm
    chmod 755 /root/.npm
    mkdir -p /home/node/.npm
    chown -R node:node /home/node/.npm
}

# Setup Git configuration (simplified - main config is in Dockerfile)
setup_git() {
    # Check if git configuration is mounted from host
    if [ -f "/root/.gitconfig" ]; then
        echo "Git configuration found and mounted from host"
    else
        echo "Using default Git configuration from Dockerfile"
    fi
}

# Main setup function
main() {
    echo "Starting container setup..."

    # Run all setup functions
    setup_nodejs
    setup_git

    echo "Container setup completed"

    # Execute the main command
    exec "$@"
}

# Run main function with all arguments
main "$@"
