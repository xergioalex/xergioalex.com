# Draft: PLAN_improve_ai_docs

## Objective

Achieve 100% AI interoperability by completing all missing documentation following the pattern of README.md files in important folders, docs/ subfolders for detailed documentation, and features/ for specific flow documentation. This will enable any AI agent to fully understand and work autonomously with the entire codebase.

## Context

**Repository:** XergioAleX.com - Astro personal website
**Tech Stack:** Astro 5.16.15, Svelte 5.48.0, TypeScript 5.9.3, Tailwind CSS 4.1.18, Biome 2.3.11

**Current Documentation Analysis:**

### What Exists (✅):
- Root: AGENTS.md, CLAUDE.md, README.md
- docs/ folder: 14 documentation files (complete)
- .claude/: README.md, skills_agents_catalog.md, 9 skills, 4 agents, 15 commands
- .agent_commands/: README.md, 3 subsystems with guides

### What's Missing (❌):
1. **src/ folder** - No README.md explaining structure
2. **src/components/** - No README.md
3. **src/components/blog/** - No README.md for blog components
4. **src/components/home/** - No README.md for home page sections
5. **src/components/layout/** - No README.md for layout components
6. **src/lib/** - No README.md for utility functions
7. **src/pages/** - No README.md for routing structure
8. **src/layouts/** - No README.md
9. **src/content/** - No README.md for Content Collections
10. **src/styles/** - No README.md
11. **public/** - No README.md for static assets
12. **docs/features/** - Folder doesn't exist (should document: blog search, dark mode, i18n, pagination, RSS)
13. **Skills catalog** - References ESLint instead of Biome
14. **Example plans** - Still Lambda-focused, need Astro examples

**Documentation Pattern to Follow:**
```
folder/
├── README.md           # Overview, structure, quick start
└── docs/               # (if complex enough)
    ├── README.md       # Docs index
    ├── architecture.md # Technical details
    └── features/       # Feature-specific docs
        └── feature.md
```

## Tasks

1. Create src/README.md - Main source structure overview
2. Create src/components/README.md - Components overview with list of all components
3. Create src/components/blog/README.md - Blog components documentation
4. Create src/components/home/README.md - Home page sections documentation
5. Create src/components/layout/README.md - Layout components (Header, MobileMenu)
6. Create src/lib/README.md - Utility functions and types
7. Create src/pages/README.md - Routing structure and page patterns
8. Create src/layouts/README.md - Layout system documentation
9. Create src/content/README.md - Content Collections documentation
10. Create src/styles/README.md - Styling guide with Tailwind
11. Create public/README.md - Static assets structure
12. Create docs/features/ folder with feature documentation
13. Update .claude/docs/skills_agents_catalog.md - Fix ESLint references
14. Create Astro-specific example plan in .agent_commands
15. Final validation and cross-reference check

## Guidelines

- All documentation in English
- Follow existing documentation patterns (see docs/DOCUMENTATION_GUIDE.md)
- Include practical examples
- Reference related documentation
- Make each README self-contained but linked
- Run `npm run biome:check` after changes
- Commit after each logical group of files
