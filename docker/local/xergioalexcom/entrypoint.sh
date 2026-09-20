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
        # If it's a real file, move it to the persistent volume (only if volume is empty)
        if [ -f "${CLAUDE_JSON}" ]; then
            # Only copy if persistent file doesn't exist (preserve existing data)
            if [ ! -f "${CLAUDE_DATA_DIR}/claude.json" ]; then
                cp "${CLAUDE_JSON}" "${CLAUDE_DATA_DIR}/claude.json"
                echo "  → Copied .claude.json to persistent volume"
            else
                echo "  → Preserving existing .claude.json from persistent volume"
            fi
            rm "${CLAUDE_JSON}"
        fi
        # Ensure target file exists (some apps don't follow symlinks to non-existent files)
        touch "${CLAUDE_DATA_DIR}/claude.json"
        # Create symlink
        ln -sf "${CLAUDE_DATA_DIR}/claude.json" "${CLAUDE_JSON}"
        echo "  → Created symlink for .claude.json"
    fi

    # Handle .claude directory
    if [ ! -L "${CLAUDE_DIR}" ]; then
        # If it's a real directory, move it to the persistent volume
        if [ -d "${CLAUDE_DIR}" ]; then
            # Only copy if persistent directory is empty or doesn't exist
            if [ ! -d "${CLAUDE_DATA_DIR}/claude_dir" ] || [ -z "$(ls -A "${CLAUDE_DATA_DIR}/claude_dir" 2>/dev/null)" ]; then
                cp -r "${CLAUDE_DIR}" "${CLAUDE_DATA_DIR}/claude_dir"
            fi
            rm -rf "${CLAUDE_DIR}"
        else
            mkdir -p "${CLAUDE_DATA_DIR}/claude_dir"
        fi
        # Create symlink
        ln -sf "${CLAUDE_DATA_DIR}/claude_dir" "${CLAUDE_DIR}"
    fi

    # Handle .claude.json.backup file if exists
    if [ -f "${CLAUDE_JSON_BACKUP}" ] && [ ! -L "${CLAUDE_JSON_BACKUP}" ]; then
        if [ ! -f "${CLAUDE_DATA_DIR}/claude.json.backup" ]; then
            cp "${CLAUDE_JSON_BACKUP}" "${CLAUDE_DATA_DIR}/claude.json.backup"
        fi
        rm "${CLAUDE_JSON_BACKUP}"
        ln -sf "${CLAUDE_DATA_DIR}/claude.json.backup" "${CLAUDE_JSON_BACKUP}"
    fi

    # Handle .config/claude-code directory (auth tokens from native installer)
    CLAUDE_CONFIG_DIR="${USER_HOME}/.config/claude-code"
    mkdir -p "${USER_HOME}/.config"
    if [ ! -L "${CLAUDE_CONFIG_DIR}" ]; then
        if [ -d "${CLAUDE_CONFIG_DIR}" ]; then
            # Only seed from image if volume has no existing data
            if [ ! -d "${CLAUDE_DATA_DIR}/config_claude_code" ] || [ -z "$(ls -A "${CLAUDE_DATA_DIR}/config_claude_code" 2>/dev/null)" ]; then
                cp -r "${CLAUDE_CONFIG_DIR}" "${CLAUDE_DATA_DIR}/config_claude_code"
            fi
            rm -rf "${CLAUDE_CONFIG_DIR}"
        else
            mkdir -p "${CLAUDE_DATA_DIR}/config_claude_code"
        fi
        ln -sf "${CLAUDE_DATA_DIR}/config_claude_code" "${CLAUDE_CONFIG_DIR}"
    fi

    echo "Claude CLI persistence setup complete for ${USER_HOME}"
}

# Setup Claude persistence for node user
setup_claude_persistence_for_user "/home/node"
chown -R node:node /home/node/.claude_data /home/node/.claude.json /home/node/.claude /home/node/.config/claude-code 2>/dev/null || true

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
            # Only copy if persistent directory is empty or doesn't exist
            if [ ! -d "${CODEX_DATA_DIR}/codex_dir" ] || [ -z "$(ls -A "${CODEX_DATA_DIR}/codex_dir" 2>/dev/null)" ]; then
                cp -r "${CODEX_DIR}" "${CODEX_DATA_DIR}/codex_dir"
            fi
            rm -rf "${CODEX_DIR}"
        else
            mkdir -p "${CODEX_DATA_DIR}/codex_dir"
        fi
        # Create symlink
        ln -sf "${CODEX_DATA_DIR}/codex_dir" "${CODEX_DIR}"
    fi
}

# Setup Codex persistence for node user
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
            # Only copy if persistent directory is empty or doesn't exist (PRESERVE existing data!)
            if [ ! -d "${CURSOR_DATA_DIR}/cursor_dir" ] || [ -z "$(ls -A "${CURSOR_DATA_DIR}/cursor_dir" 2>/dev/null)" ]; then
                echo "  → First run: copying fresh Cursor CLI to persistent volume"
                cp -r "${CURSOR_DIR}" "${CURSOR_DATA_DIR}/cursor_dir"
            else
                echo "  → Preserving existing Cursor CLI data from persistent volume"
            fi
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
            # Only copy if persistent directory is empty or doesn't exist (PRESERVE existing data!)
            if [ ! -d "${CURSOR_DATA_DIR}/config_cursor" ] || [ -z "$(ls -A "${CURSOR_DATA_DIR}/config_cursor" 2>/dev/null)" ]; then
                echo "  → First run: copying fresh Cursor config to persistent volume"
                cp -r "${CURSOR_CONFIG_DIR}" "${CURSOR_DATA_DIR}/config_cursor"
            else
                echo "  → Preserving existing Cursor config from persistent volume"
            fi
            rm -rf "${CURSOR_CONFIG_DIR}"
        else
            mkdir -p "${CURSOR_DATA_DIR}/config_cursor"
        fi
        ln -sf "${CURSOR_DATA_DIR}/config_cursor" "${CURSOR_CONFIG_DIR}"
    fi
}

# Setup Cursor persistence for node user
setup_cursor_persistence_for_user "/home/node"
chown -R node:node /home/node/.cursor_data /home/node/.cursor /home/node/.config 2>/dev/null || true

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
            # Only copy if persistent directory is empty or doesn't exist
            if [ ! -d "${GH_DATA_DIR}/gh_dir" ] || [ -z "$(ls -A "${GH_DATA_DIR}/gh_dir" 2>/dev/null)" ]; then
                cp -r "${GH_CONFIG_DIR}" "${GH_DATA_DIR}/gh_dir"
            fi
            rm -rf "${GH_CONFIG_DIR}"
        else
            mkdir -p "${GH_DATA_DIR}/gh_dir"
        fi
        # Create symlink
        ln -sf "${GH_DATA_DIR}/gh_dir" "${GH_CONFIG_DIR}"
    fi
}

# Setup GitHub CLI persistence for node user
setup_gh_persistence_for_user "/home/node"
chown -R node:node /home/node/.gh_data /home/node/.config 2>/dev/null || true

# Setup Z.AI Coding Tool Helper persistence (@z_ai/coding-helper → ~/.chelper)
setup_chelper_persistence_for_user() {
    USER_HOME="$1"
    CHELPER_DATA_DIR="${USER_HOME}/.chelper_data"
    CHELPER_DIR="${USER_HOME}/.chelper"

    mkdir -p "${CHELPER_DATA_DIR}"

    if [ ! -L "${CHELPER_DIR}" ]; then
        if [ -d "${CHELPER_DIR}" ]; then
            if [ ! -d "${CHELPER_DATA_DIR}/chelper_dir" ] || [ -z "$(ls -A "${CHELPER_DATA_DIR}/chelper_dir" 2>/dev/null)" ]; then
                cp -r "${CHELPER_DIR}" "${CHELPER_DATA_DIR}/chelper_dir"
            fi
            rm -rf "${CHELPER_DIR}"
        else
            mkdir -p "${CHELPER_DATA_DIR}/chelper_dir"
        fi
        ln -sf "${CHELPER_DATA_DIR}/chelper_dir" "${CHELPER_DIR}"
    fi
}

setup_chelper_persistence_for_user "/home/node"
chown -R node:node /home/node/.chelper_data /home/node/.chelper 2>/dev/null || true

# OpenCode: ~/.config/opencode + ~/.local/share/opencode
setup_opencode_persistence_for_user() {
    USER_HOME="$1"
    OPENCODE_DATA_DIR="${USER_HOME}/.opencode_data"
    OPENCODE_CONFIG_DIR="${USER_HOME}/.config/opencode"
    OPENCODE_SHARE_DIR="${USER_HOME}/.local/share/opencode"

    mkdir -p "${OPENCODE_DATA_DIR}"
    mkdir -p "${USER_HOME}/.config"
    mkdir -p "${USER_HOME}/.local/share"

    if [ ! -L "${OPENCODE_CONFIG_DIR}" ]; then
        if [ -d "${OPENCODE_CONFIG_DIR}" ]; then
            if [ ! -d "${OPENCODE_DATA_DIR}/config_opencode" ] || [ -z "$(ls -A "${OPENCODE_DATA_DIR}/config_opencode" 2>/dev/null)" ]; then
                cp -r "${OPENCODE_CONFIG_DIR}" "${OPENCODE_DATA_DIR}/config_opencode"
            fi
            rm -rf "${OPENCODE_CONFIG_DIR}"
        else
            mkdir -p "${OPENCODE_DATA_DIR}/config_opencode"
        fi
        ln -sf "${OPENCODE_DATA_DIR}/config_opencode" "${OPENCODE_CONFIG_DIR}"
    fi

    if [ ! -L "${OPENCODE_SHARE_DIR}" ]; then
        if [ -d "${OPENCODE_SHARE_DIR}" ]; then
            if [ ! -d "${OPENCODE_DATA_DIR}/share_opencode" ] || [ -z "$(ls -A "${OPENCODE_DATA_DIR}/share_opencode" 2>/dev/null)" ]; then
                cp -r "${OPENCODE_SHARE_DIR}" "${OPENCODE_DATA_DIR}/share_opencode"
            fi
            rm -rf "${OPENCODE_SHARE_DIR}"
        else
            mkdir -p "${OPENCODE_DATA_DIR}/share_opencode"
        fi
        ln -sf "${OPENCODE_DATA_DIR}/share_opencode" "${OPENCODE_SHARE_DIR}"
    fi
}

setup_opencode_persistence_for_user "/home/node"
chown -R node:node /home/node/.opencode_data /home/node/.config/opencode /home/node/.local/share/opencode 2>/dev/null || true

# Persist Pi and Cline sessions/configuration across container rebuilds.
# Both CLIs keep their session history under a user-home directory, so the
# wrappers can continue sessions after the image is recreated.
setup_agent_directory_persistence_for_user() {
    USER_HOME="$1"
    DATA_DIR="$2"
    TARGET_DIR="$3"

    mkdir -p "${DATA_DIR}"
    mkdir -p "$(dirname "${TARGET_DIR}")"
    if [ ! -L "${TARGET_DIR}" ]; then
        if [ -d "${TARGET_DIR}" ]; then
            if [ ! -d "${DATA_DIR}/content" ] || [ -z "$(ls -A "${DATA_DIR}/content" 2>/dev/null)" ]; then
                cp -r "${TARGET_DIR}" "${DATA_DIR}/content"
            fi
            rm -rf "${TARGET_DIR}"
        else
            mkdir -p "${DATA_DIR}/content"
        fi
        ln -sf "${DATA_DIR}/content" "${TARGET_DIR}"
    fi
}

setup_agent_directory_persistence_for_user "/home/node" "/home/node/.pi_data" "/home/node/.pi"
setup_agent_directory_persistence_for_user "/home/node" "/home/node/.cline_data" "/home/node/.cline"
setup_agent_directory_persistence_for_user "/home/node" "/home/node/.herdr_data" "/home/node/.config/herdr"
setup_agent_directory_persistence_for_user "/home/node" "/home/node/.grok_data" "/home/node/.grok"
chown -R node:node /home/node/.pi_data /home/node/.pi /home/node/.cline_data /home/node/.cline 2>/dev/null || true
chown -R node:node /home/node/.herdr_data /home/node/.config/herdr /home/node/.grok_data /home/node/.grok 2>/dev/null || true

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

# Setup SSH keys for node user
setup_ssh_keys_for_user "/home/node"
chown -R node:node /home/node/.ssh 2>/dev/null || true

# Make custom_commands.sh available in every shell herdr/SSH/agents can spawn.
# grokx, claudex, pix, etc. are bash functions, not binaries. Without this:
# - Login shells (SSH, herdr remote) skip ~/.bashrc → commands missing
# - /bin/sh (herdr default when SHELL is unset) cannot see bash functions
#   → `/bin/sh: 1: grokx: not found`
setup_shell_for_custom_commands() {
    USER_HOME="/home/node"
    BASHRC="${USER_HOME}/.bashrc"
    PROFILE="${USER_HOME}/.profile"
    CUSTOM_COMMANDS="/app/docker/custom_commands.sh"
    SOURCE_LINE="source ${CUSTOM_COMMANDS}"

    usermod -s /bin/bash node 2>/dev/null || true

    # Do not create ~/.bash_profile: bash would skip debian ~/.profile, which
    # is what puts ~/.local/bin (herdr) on PATH for SSH login shells.
    if [ ! -f "${PROFILE}" ] || ! grep -qF '.bashrc' "${PROFILE}" 2>/dev/null; then
        printf '%s\n' \
            '# POSIX login shells. Source bashrc only when running bash.' \
            'if [ -n "${BASH_VERSION:-}" ] && [ -f "$HOME/.bashrc" ]; then' \
            '  . "$HOME/.bashrc"' \
            'fi' \
            'if [ -d "$HOME/.local/bin" ]; then' \
            '  PATH="$HOME/.local/bin:$PATH"' \
            'fi' \
            > "${PROFILE}"
    fi

    touch "${BASHRC}"
    if ! grep -q 'custom_commands.sh' "${BASHRC}" 2>/dev/null; then
        printf '\n%s\n' "${SOURCE_LINE}" >> "${BASHRC}"
    fi

    # PREPENDED, above Debian's `case $- in *i*) ;; *) return;; esac` guard.
    # A non-interactive SSH command (`ssh host cmd`, `herdr --machine X cmd`) is
    # neither a login shell nor interactive: it reads no /etc/profile.d and no
    # ~/.profile, and bails out of ~/.bashrc at that guard on line 5. Anything
    # appended to this file is therefore dead code for exactly the case that
    # needs it most. Only PATH and the materialised environment go here --
    # custom_commands.sh stays below the guard, because the /usr/local/bin
    # shims already cover its functions for non-interactive callers.
    if ! grep -q 'container-env-preamble' "${BASHRC}" 2>/dev/null; then
        TMP_BASHRC="$(mktemp)"
        {
            printf '%s\n' \
                '# container-env-preamble (entrypoint.sh) -- must stay ABOVE the' \
                '# non-interactive guard below, or ssh-without-a-tty sees none of it.' \
                'if [ -r "$HOME/.container_env" ]; then' \
                '  . "$HOME/.container_env"' \
                'fi' \
                'for _d in /usr/local/share/pnpm/bin "$HOME/.local/bin" "$HOME/.cursor/bin" "$HOME/.opencode/bin" "$HOME/.grok/bin"; do' \
                '  [ -d "$_d" ] || continue' \
                '  case ":${PATH}:" in' \
                '    *":${_d}:"*) ;;' \
                '    *) PATH="${PATH}:${_d}" ;;' \
                '  esac' \
                'done' \
                'unset _d' \
                'export PATH' \
                ''
            cat "${BASHRC}"
        } > "${TMP_BASHRC}"
        cat "${TMP_BASHRC}" > "${BASHRC}"
        rm -f "${TMP_BASHRC}"
    fi

    chown node:node "${BASHRC}" "${PROFILE}" 2>/dev/null || true

    # NOTE: no 01-agent-cli-path.sh here. The image ships
    # /etc/profile.d/01-container-tool-paths.sh, which APPENDS the tool dirs.
    # The earlier version of this block prepended them, which pushed
    # /home/node/.grok/bin ahead of /usr/local/bin and silently undid
    # 00-container-node-first.sh -- the whole point of which is that the
    # image's own node wins over an IDE-bundled one.

    if [ ! -f /etc/profile.d/99-xergioalex-custom-commands.sh ]; then
        printf '%s\n' \
            '# Login shells (SSH, herdr remote). Dash cannot parse bash functions.' \
            'if [ -n "${BASH_VERSION:-}" ] && [ -f /app/docker/custom_commands.sh ]; then' \
            '  . /app/docker/custom_commands.sh' \
            'fi' \
            > /etc/profile.d/99-xergioalex-custom-commands.sh
        chmod 0644 /etc/profile.d/99-xergioalex-custom-commands.sh
    fi

    # PATH shims: herdr, `ssh host grokx`, and `/bin/sh -c grokx` look up
    # executables, not bash functions. Each shim re-sources custom_commands
    # and invokes the function of the same name. Do not shim names that
    # already exist as real binaries (herdr, claude, grok, pi, ...) or that
    # collide with system tools (test, install, help).
    SHIM="/usr/local/bin/custom-command-shim"
    cat > "${SHIM}" << 'EOF'
#!/bin/bash
# SSH/herdr non-login shells do not inherit Docker ENV PATH. Put agent
# binaries on PATH before resolving grok/claude/pi/etc. from the wrappers.
for dir in \
    /usr/local/share/pnpm/bin \
    /usr/local/share/pnpm \
    /home/node/.local/bin \
    /home/node/.cursor/bin \
    /home/node/.opencode/bin \
    /home/node/.grok/bin \
    /usr/local/bin
do
    case ":${PATH}:" in
        *":${dir}:"*) : ;;
        *) PATH="${dir}:${PATH}" ;;
    esac
done
export PATH

CUSTOM_COMMANDS="${CUSTOM_COMMANDS_FILE:-/app/docker/custom_commands.sh}"
if [ ! -f "${CUSTOM_COMMANDS}" ]; then
    echo "custom_commands.sh not found at ${CUSTOM_COMMANDS}" >&2
    exit 127
fi
# shellcheck disable=SC1090
source "${CUSTOM_COMMANDS}"
cmd="$(basename "$0")"
if ! declare -F "${cmd}" >/dev/null 2>&1; then
    echo "${cmd}: custom command is not defined" >&2
    exit 127
fi
"${cmd}" "$@"
EOF
    chmod 0755 "${SHIM}"

    for cmd in \
        grokx claudex claude-glm claude-xai \
        codexx codex-azure codex-glm codex-xai cursorx \
        opencodex opencode-azure opencode-glm opencode-xai \
        pix pi-xai pi-azure pi-glm \
        clinex cline-xai cline-azure clinex-azure cline-glm clinex-glm \
        check fix codecheck lighthouse check_devcontainer
    do
        ln -sfn "${SHIM}" "/usr/local/bin/${cmd}"
    done

    echo "Custom commands: login profiles + PATH shims ready"
}

setup_shell_for_custom_commands

# Setup SSH daemon for Herdr remote/multi-machine access
# - Build authorized_keys from mounted host public keys
# - Ensure correct permissions on ~/.ssh
# - Generate host keys at runtime if missing (volume scenarios)
# - Validate config and start sshd
# - Patch allow_nested into volume-backed herdr config
setup_ssh_daemon_for_herdr() {
    SSH_DIR="/home/node/.ssh"
    SSH_HOST_DIR="/home/node/.ssh_host"
    HERDR_CONFIG_DIR="/home/node/.config/herdr"

    # Ensure .ssh directory exists with correct mode
    mkdir -p "${SSH_DIR}"
    chmod 700 "${SSH_DIR}"

    # Build authorized_keys from host public keys if present
    if [ -d "${SSH_HOST_DIR}" ]; then
        > "${SSH_DIR}/authorized_keys"
        for pub in "${SSH_HOST_DIR}"/*.pub; do
            if [ -f "$pub" ]; then
                cat "$pub" >> "${SSH_DIR}/authorized_keys"
                echo "" >> "${SSH_DIR}/authorized_keys"
            fi
        done
        if [ -s "${SSH_DIR}/authorized_keys" ]; then
            chmod 600 "${SSH_DIR}/authorized_keys"
            chown node:node "${SSH_DIR}/authorized_keys"
            echo "Herdr SSH: authorized_keys populated from host"
        else
            rm -f "${SSH_DIR}/authorized_keys"
        fi
    fi

    # Host keys live in the ssh_host_keys volume, generated once. Not
    # `ssh-keygen -A` into /etc/ssh: that path is baked into the image layer and
    # is not persisted, so the container would mint a new identity on every
    # recreate and every client that pinned the old key would refuse to connect
    # until someone cleared known_hosts by hand.
    mkdir -p /etc/ssh/host_keys
    chmod 700 /etc/ssh/host_keys
    if [ ! -f /etc/ssh/host_keys/ssh_host_ed25519_key ]; then
        ssh-keygen -q -t ed25519 -N '' -f /etc/ssh/host_keys/ssh_host_ed25519_key
        echo "Herdr SSH: generated a persistent ed25519 host key"
    fi
    if [ ! -f /etc/ssh/host_keys/ssh_host_rsa_key ]; then
        ssh-keygen -q -t rsa -b 4096 -N '' -f /etc/ssh/host_keys/ssh_host_rsa_key
        echo "Herdr SSH: generated a persistent rsa host key"
    fi
    chown root:root /etc/ssh/host_keys/ssh_host_* 2>/dev/null || true
    chmod 600 /etc/ssh/host_keys/ssh_host_ed25519_key /etc/ssh/host_keys/ssh_host_rsa_key 2>/dev/null || true
    chmod 644 /etc/ssh/host_keys/*.pub 2>/dev/null || true

    # Volume-backed herdr config may predate these keys. Match comment-safe
    # assignments only (the default file comments out default_shell).
    mkdir -p "${HERDR_CONFIG_DIR}"
    HERDR_TOML="${HERDR_CONFIG_DIR}/config.toml"
    touch "${HERDR_TOML}"
    if ! grep -qE '^[[:space:]]*allow_nested[[:space:]]*=' "${HERDR_TOML}" 2>/dev/null; then
        printf '\n%s\n' '[experimental]' 'allow_nested = true' >> "${HERDR_TOML}"
    fi
    # Empty default_shell → $SHELL, then /bin/sh. Herdr panes then cannot see
    # bash functions from custom_commands.sh (`/bin/sh: 1: grokx: not found`).
    if ! grep -qE '^[[:space:]]*default_shell[[:space:]]*=' "${HERDR_TOML}" 2>/dev/null; then
        printf '\n[terminal]\ndefault_shell = "/bin/bash"\nshell_mode = "login"\n' >> "${HERDR_TOML}"
    fi
    # New Herdr terminals open in the workspace, not in $HOME. The key is
    # terminal.new_cwd -- `working_directory` looks right and is silently
    # rejected ("unknown config key"), so this was confirmed against the
    # TerminalConfig struct (default_shell / shell_mode / new_cwd) and then
    # validated with `herdr config check`, which is also the only honest way to
    # check this file: an invalid config is not partially applied, it is
    # discarded wholesale and herdr falls back to defaults, so a grep that finds
    # the line proves nothing about whether herdr ever read it.
    if ! grep -qE '^[[:space:]]*new_cwd[[:space:]]*=' "${HERDR_TOML}" 2>/dev/null; then
        if grep -qE '^\[terminal\]' "${HERDR_TOML}" 2>/dev/null; then
            awk '/^\[terminal\]/ { print; print "new_cwd = \"/app\""; next } { print }' \
                "${HERDR_TOML}" > "${HERDR_TOML}.tmp" && mv "${HERDR_TOML}.tmp" "${HERDR_TOML}"
        else
            printf '\n[terminal]\nnew_cwd = "/app"\n' >> "${HERDR_TOML}"
        fi
    fi
    chown -R node:node "${HERDR_CONFIG_DIR}" 2>/dev/null || true

    # Parse it, do not grep it. herdr discards an invalid config.toml entirely
    # and runs on defaults, so a malformed file here would silently undo every
    # setting above while every grep-based check still passed.
    if command -v runuser >/dev/null 2>&1; then
        HERDR_CHECK="$(runuser -u node -- bash -lc 'herdr config check' 2>&1 || true)"
    else
        HERDR_CHECK="$(su node -c 'bash -lc "herdr config check"' 2>&1 || true)"
    fi
    case "${HERDR_CHECK}" in
        *"config: ok"*) echo "Herdr SSH: config.toml validated (new terminals open in /app)" ;;
        *) echo "Herdr SSH: WARNING - config.toml rejected by herdr, it will run on defaults:"
           printf '%s\n' "${HERDR_CHECK}" | head -5 ;;
    esac

    # Validate and start sshd
    if /usr/sbin/sshd -t 2>/dev/null; then
        /usr/sbin/sshd
        echo "Herdr SSH: sshd started on container port 22 (host 22029)"
    else
        echo "Herdr SSH: sshd config validation failed; daemon not started"
    fi
}

# Materialise the container environment for SSH sessions.
#
# sshd starts every session clean: nothing compose passed through `env_file` or
# `environment` survives. `docker exec` DOES inherit it, which is why the same
# command works in the editor terminal and fails in an SSH or Herdr pane with
# "API key is not set" while the key is plainly set in the container. Dump the
# live environment to a file and source it from a profile.d drop-in, which login
# shells read (Herdr's config.toml pins shell_mode = "login").
materialize_environment_for_ssh() {
    ENV_FILE="/home/node/.container_env"

    # Opened 0600 from the first byte, never written-then-chmod'd: this file ends
    # up holding ZAI_CODING_API_KEY, XAI_API_KEY and AZURE_OPENAI_API_KEY, and a
    # window where it is world-readable is a window too many.
    (umask 077 && : > "${ENV_FILE}") || return 0

    # PATH is deliberately excluded: /etc/profile rewrites it and the
    # 00-/01- drop-ins put it back in the right order. Re-exporting Docker's ENV
    # PATH here would race with them. HOME/PWD/SHLVL and friends are per-session
    # facts, not configuration.
    env | while IFS= read -r line; do
        key="${line%%=*}"
        val="${line#*=}"
        case "${key}" in
            PATH|HOME|PWD|OLDPWD|SHLVL|TERM|USER|LOGNAME|HOSTNAME|_) continue ;;
            ""|*[!A-Za-z0-9_]*) continue ;;
        esac
        # Single-quote the value and escape any embedded quote, so a key
        # containing spaces or $ is restored verbatim rather than re-evaluated.
        esc=$(printf '%s' "${val}" | sed "s/'/'\\\\''/g")
        printf "export %s='%s'\n" "${key}" "${esc}"
    done >> "${ENV_FILE}"

    chown node:node "${ENV_FILE}" 2>/dev/null || true
    chmod 600 "${ENV_FILE}" 2>/dev/null || true

    if [ ! -f /etc/profile.d/02-container-env.sh ]; then
        printf '%s\n' \
            '# Restore the compose-injected environment for SSH/Herdr sessions,' \
            '# which sshd does not pass through. Written by entrypoint.sh.' \
            'if [ -r "$HOME/.container_env" ]; then' \
            '  . "$HOME/.container_env"' \
            'fi' \
            > /etc/profile.d/02-container-env.sh
        chmod 0644 /etc/profile.d/02-container-env.sh
    fi

    echo "Herdr SSH: container environment materialised to ~/.container_env (0600)"
}

materialize_environment_for_ssh

# Setup SSH daemon for node user
setup_ssh_daemon_for_herdr

# Setup Node.js specific configurations
setup_nodejs() {
    # Ensure pnpm store and state directories exist with correct ownership.
    # pnpm uses ~/.local/share/pnpm (store + global bin) — npm's ~/.npm is unused.
    mkdir -p /home/node/.local/share/pnpm
    chown -R node:node /home/node/.local/share/pnpm 2>/dev/null || true
}

# Setup Git configuration (simplified - main config is in Dockerfile)
setup_git() {
    # Check if git configuration is mounted from host
    if [ -f "/home/node/.gitconfig" ]; then
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
