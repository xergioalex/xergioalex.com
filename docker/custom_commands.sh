#!/bin/bash

function print.success {
	GREEN="\033[0;32m"
  RESET="\033[0m"
  echo -e "${GREEN}$1${RESET}"
}

function print.error {
	RED="\033[0;31m"
  RESET="\033[0m"
  echo -e "${RED}$1${RESET}"
}

function check() {
  print.success "Running astro checks..."
	npm run astro:check
	if [ $? != 0 ]; then
    echo ''
		print.error "⚠️ Astro checks failed, skipping astro checks..."
		return 1
	fi

	print.success "Running biome checks..."
	npm run biome:check
}

function fix() {
  print.success "Running astro checks..."
	npm run astro:check
	if [ $? != 0 ]; then
    echo ''
		print.error "⚠️ Astro checks failed, skipping astro checks..."
		return 1
	fi

	print.success "Running biome checks && apply automatic fixes..."
	npm run biome:fix
}

function test() {
  print.success "Running tests..."
	npm run test
}

function codecheck() {
	fix
	if [ $? != 0 ]; then
    echo ''
		print.error "⚠️ Biome checks failed..."
		return 1
	fi
  test
}

function install() {
  print.success "Running npm install..."
	npm install
}

# Codex with full permissions (bypass approvals and sandbox)
function codexx() {
	print.success "Starting Codex with full permissions..."
	codex --dangerously-bypass-approvals-and-sandbox "$@"
}

# Claude Code with full permissions (skip all permission prompts)
function claudex() {
	print.success "Starting Claude Code with full permissions..."
	# Works when running as dev-user (non-root) which is the default in devcontainer
	claude --dangerously-skip-permissions "$@"
}

# Cursor CLI agent (interactive mode)
function cursorx() {
	print.success "Starting Cursor CLI agent with full permissions..."
	# Cursor CLI uses 'agent' command with --force to bypass all approval prompts
	agent --force "$@"
}

# Check if running inside Docker container
function check_devcontainer() {
	if [[ -f /.dockerenv ]] || [[ -n "${REMOTE_CONTAINERS:-}" ]] || [[ -n "${CODESPACES:-}" ]]; then
		print.success "✅ Running inside Docker container"
		echo ""
		echo "All development commands are available:"
		echo "  • check, fix, test, codecheck, install"
		return 0
	else
		print.error "❌ NOT running inside Docker container"
		echo ""
		echo "⚠️  WARNING: This project requires a Docker container environment."
		echo "   Commands like 'check', 'fix', 'test', etc."
		echo "   only work inside the Docker container."
		echo ""
		echo "   To work with this project:"
		echo "   1. Start Docker services: cd docker/local && bash docker.sh up"
		echo "   2. Access the container: bash docker.sh bash xergioalexcom"
		echo "   3. Or use VS Code Dev Containers if configured"
		return 1
	fi
}

# ================================
# Git-aware Bash Prompt
# ================================

# Function to get current git branch
function git_branch() {
    local branch
    if branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null); then
        if [[ "$branch" == "HEAD" ]]; then
            branch='detached*'
        fi
        echo "$branch"
    fi
}

# Function to get git status indicators
function git_status_indicator() {
    local git_status
    git_status=$(git status --porcelain 2>/dev/null)

    if [[ -n "$git_status" ]]; then
        echo "*"  # Asterisk for uncommitted changes
    fi
}

# Custom PS1 prompt with colors and git info
function set_bash_prompt() {
    local exit_code=$?

    # Color codes
    local yellow="\[\033[0;33m\]"
    local red="\[\033[0;31m\]"
    local green="\[\033[0;32m\]"
    local white="\[\033[0;37m\]"
    local reset="\[\033[0m\]"

    # Get git branch and status
    local git_info=""
    if git rev-parse --git-dir > /dev/null 2>&1; then
        local branch
        branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

        if [[ "$branch" == "HEAD" ]]; then
            branch='detached*'
        fi

        # Check if there are uncommitted changes
        if [[ -n $(git status --porcelain 2>/dev/null) ]]; then
            git_info=" ${red}(${branch}*)${reset}"
        else
            git_info=" ${green}(${branch})${reset}"
        fi
    fi

    # Build the prompt - simple format: path (git) $
    PS1="${yellow}\w${reset}${git_info}${white} \$ ${reset}"
}

# Set the custom prompt
PROMPT_COMMAND=set_bash_prompt

# ================================
# Useful Git Aliases
# ================================

alias gs='git status'
alias ga='git add .'
alias gc='git commit -am'
alias gp='git push -u origin HEAD'
alias gl='git log --oneline --graph --decorate --all -20'
alias gd='git diff'
alias gb='git for-each-ref --sort=-committerdate refs/heads/ --format="%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(color:green)%(committerdate:relative)%(color:reset) - %(color:blue)%(authorname)%(color:reset)"'
alias gbd='git branch -D'
alias gco='git checkout'
alias gcob='git checkout -b'
alias gpl='git pull origin HEAD'
alias grc='git rm -r --cached .'
alias help='show_welcome'

# Welcome message
function show_welcome() {
    echo ""
    print.success "🚀 xergioalex.com Development Container"
    echo ""

    # Check container status
    check_devcontainer
    echo ""

    echo "Useful commands:"
    echo "  • check_devcontainer  - Check if running inside Docker container (CRITICAL)"
    echo "  • help                 - Show this message"
    echo "  • check                - Run astro and biome checks"
    echo "  • fix                  - Run checks and apply automatic fixes"
    echo "  • test                 - Run tests"
    echo "  • codecheck            - Run all checks (fix + test)"
    echo "  • install              - Run npm install"
    echo ""
    echo "AI Assistant commands:"
    echo "  • claude            - Claude Code CLI"
    echo "  • codex             - Codex CLI"
    echo "  • agent             - Cursor CLI agent (or cursorx alias)"
    echo "  • codexx             - Codex with full permissions (bypass approvals and sandbox)"
    echo "  • claudex            - Claude Code with full permissions (skip all permission prompts)"
    echo "  • cursorx            - Cursor CLI agent (interactive mode)"
    echo ""
    echo "Git shortcuts:"
    echo "  • gs   - git status"
    echo "  • ga   - git add ."
    echo "  • gc   - git commit"
    echo "  • gp   - git push -u origin HEAD"
    echo "  • gpl  - git pull origin HEAD"
    echo "  • gl   - git log (pretty)"
    echo "  • gd   - git diff"
    echo "  • gb   - git branch"
    echo "  • gbd  - git branch -D"
    echo "  • gco  - git checkout"
    echo "  • gcob - git checkout -b"
    echo "  • grc  - git rm -r --cached . (reset cache, useful after updating .gitignore)"
    echo ""
}

# Show welcome message only for interactive shells
if [[ $- == *i* ]]; then
    show_welcome
fi
