# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📖 Documentation Import

**This project uses shared agent instructions stored in `AGENTS.md` as the single source of truth for all AI coding assistants (Cursor AI, Claude Code, OpenAI Codex, Google Gemini, etc.).**

**The complete project documentation is automatically loaded below:**

@AGENTS.md

## 🔄 Documentation Update Policy

**⚠️ IMPORTANT: DO NOT update this file (`CLAUDE.md`) with new instructions or guidelines.**

**All future updates to project documentation, coding standards, and agent instructions MUST be made in `AGENTS.md` only.**

This file (`CLAUDE.md`) serves only as an import wrapper to load `AGENTS.md` into Claude Code's context automatically.

### Why This Structure?

- ✅ **Single source of truth**: `AGENTS.md` contains all project guidelines
- ✅ **Automatic loading**: Claude Code imports `AGENTS.md` via `@` syntax
- ✅ **Multi-agent consistency**: All AI agents read the same `AGENTS.md` file
- ✅ **Easy maintenance**: Update only `AGENTS.md`, never this file
