# Agent Library Upgrades

## Overview

This directory contains the **official system for safely upgrading all project dependencies** (npm packages via npm-check-updates) with validation, testing, and rollback capabilities.

The system enables AI agents to:

- **Automatically detect available package updates** using `ncu --format json`
- **Prioritize minor upgrades** over major upgrades
- **Support granular upgrade control** (patch, minor, or major)
- **Update `package.json`** with new versions
- **Execute safe upgrade process** with automatic rollback on failures
- **Generate comprehensive reports** of successful upgrades and failures
- **Handle compatibility issues** with intelligent retry logic

---

## Directory Structure

```text
.agent_commands/agent_library_upgrades/
├─ README.md                          ← you are here
├─ GUIDE.md                           ← comprehensive execution guide
├─ example_prompts/                   ← prompts & examples (⭐ START HERE)
│  ├─ README.md                       ← quick index
│  ├─ UPGRADE_ALL.md                  ← upgrade all packages
│  ├─ UPGRADE_MINOR_ONLY.md           ← upgrade only minor versions
│  └─ UPGRADE_SPECIFIC.md             ← upgrade specific packages
└─ templates/                         ← templates for reports
   └─ UPGRADE_REPORT_TEMPLATE.md      ← template for upgrade reports
```

---

## Quick Start

### Upgrade All Packages (Recommended)

Tell the agent:

> "Upgrade all project dependencies following the system at `.agent_commands/agent_library_upgrades/GUIDE.md`. Prioritize minor upgrades first, ask about major upgrades, and generate a comprehensive report."

### Upgrade Only Minor Versions

Tell the agent:

> "Upgrade only minor and patch versions of all packages following `.agent_commands/agent_library_upgrades/GUIDE.md`. Skip major upgrades."

### Upgrade Only Patch Versions

Tell the agent:

> "Upgrade only patch versions of all packages (safest) following `.agent_commands/agent_library_upgrades/GUIDE.md`."

### Upgrade Specific Packages

Tell the agent:

> "Upgrade the following packages: [package1, package2, ...] following `.agent_commands/agent_library_upgrades/GUIDE.md`."

---

## Upgrade Process

### 1. Discovery Phase

**Commands:**

- `ncu` - Check all available updates (human-readable)
- `ncu --format json` - Check updates in JSON format (machine-readable)
- `ncu --target patch` - Check only patch updates
- `ncu --target minor` - Check only minor updates
- `ncu --target latest` - Check all updates including major

**Output Analysis:**

- Parse package names, current versions, and available versions
- Categorize as **patch** (1.0.0 → 1.0.1), **minor** (1.0.0 → 1.1.0), or **major** (1.0.0 → 2.0.0)
- Example JSON output format:
  ```json
  {
    "package-name": "^2.0.0"
  }
  ```

### 2. Planning Phase

**Prioritization:**

- ✅ **First:** Apply all minor upgrades (patch and minor version bumps)
- ⚠️ **Second:** Ask user about major upgrades (if any)
- 📝 **Document:** Create upgrade plan with package list

### 3. Execution Phase

**Steps:**

1. Update `package.json` with new versions using `ncu -u --target <level>`
   - `ncu -u --target patch` - Upgrade only patch versions
   - `ncu -u --target minor` - Upgrade only minor versions
   - `ncu -u --target latest` - Upgrade all including major versions
   - `ncu -u --filter <package>` - Upgrade specific package(s)
2. Install updated packages: `npm install`
3. Update lock file automatically (npm creates `package-lock.json`)

### 4. Validation Phase

**Success Criteria:**

- ✅ `npm install` completes without errors
- ✅ `package-lock.json` is updated correctly
- ✅ `codecheck` passes (runs setup, fixes, and tests) OR individual checks pass:
  - `npm run test` passes (all tests pass)
  - `npm run eslint:check` passes (no linting errors)
  - `npm run prettier:check` passes (code formatting correct)
- ✅ No peer dependency conflicts

**Failure Handling:**

- ❌ If `npm install` fails:
  1. Identify problematic package(s) from error message
  2. Rollback version in `package.json` using git
  3. Retry `npm install` (max 3 attempts)
  4. If still failing after 3 attempts, generate failure report

### 5. Reporting Phase

**Generate Report:**

- ✅ **Success Report:** List all successfully upgraded packages with version changes
- ❌ **Failure Report:** List packages that failed to upgrade with error details
- 📋 **Summary:** Total packages upgraded, total failures, recommendations

---

## Key Features

### Automatic Rollback

If a package upgrade causes compatibility issues:

1. **Identify** the problematic package from error messages
2. **Revert** the version in `package.json` to previous version
3. **Retry** the upgrade process (excluding the problematic package)
4. **Document** the failure in the report

### Smart Retry Logic

- **Maximum 3 retry attempts** per upgrade session
- **Isolate failures** by rolling back one package at a time
- **Continue with other packages** even if one fails
- **Generate comprehensive report** of all outcomes

### Version Prioritization

- **Minor upgrades first:** Patch and minor version bumps are safer
- **Major upgrades second:** Require user confirmation (breaking changes possible)
- **Dependency awareness:** Consider transitive dependencies when upgrading

---

## File Locations

### Configuration Files

- **`package.json`** - Main dependency file (updated during upgrade)
- **`package-lock.json`** - Lock file (auto-generated by `npm install`)

### Commands

- **`ncu`** - Check for available package updates (alias: `npm-check-updates`)
- **`ncu:check`** (npm script) - Check available updates without making changes
- **`ncu:upgrade`** (npm script) - Upgrade all packages to latest versions
- **`npm install`** - Install packages and update lock file

---

## Best Practices

### When Upgrading

- ✅ **Always backup** `package.json` before starting (git commit)
- ✅ **Upgrade incrementally** - patch first, then minor, then major (with approval)
- ✅ **Test after upgrades** - Run `npm run test`, `npm run eslint:check`, `npm run prettier:check`
- ✅ **Check peer dependencies** - Resolve peer dependency warnings/errors
- ✅ **Commit after success** - Each successful upgrade should be committed
- ✅ **Document failures** - Include error messages and context in reports

### Error Handling

- ❌ **Don't ignore errors** - Always investigate and document failures
- ❌ **Don't skip validation** - Always run tests after upgrades
- ❌ **Don't force incompatible versions** - Rollback if compatibility issues arise
- ❌ **Don't ignore peer dependency warnings** - Resolve them before continuing
- ✅ **Do provide context** - Include error messages and stack traces in reports
- ✅ **Do check breaking changes** - Review CHANGELOG for major version upgrades

---

## Example Workflow

### Step 1: Check Available Upgrades

```bash
ncu
```

**Output:**

```
@aws-sdk/client-dynamodb   ^3.500.0  →  ^3.515.0
typescript                 ^5.3.3    →  ^5.4.0
webpack                    ^5.90.0   →  ^6.0.0
```

### Step 2: Categorize Upgrades

**Patch/Minor Upgrades:**

- `@aws-sdk/client-dynamodb`: 3.500.0 → 3.515.0 (minor)
- `typescript`: 5.3.3 → 5.4.0 (minor)

**Major Upgrades:**

- `webpack`: 5.90.0 → 6.0.0 (major) ⚠️

### Step 3: Update package.json

Update versions for minor upgrades:

```bash
ncu -u --target minor
```

This updates `package.json` automatically with minor versions.

Ask user about `webpack` major upgrade.

### Step 4: Execute Upgrade

```bash
npm install
```

### Step 5: Validate Upgrade

```bash
# Option 1: Comprehensive check (recommended)
codecheck

# Option 2: Individual checks
npm run test
npm run eslint:check
npm run prettier:check
```

### Step 6: Generate Report

**Success Report:**

- ✅ `@aws-sdk/client-dynamodb`: 3.500.0 → 3.515.0
- ✅ `typescript`: 5.3.3 → 5.4.0

**Pending (User Decision):**

- ⚠️ `webpack`: 5.90.0 → 6.0.0 (major upgrade - requires approval)

---

## Integration with Project Standards

This system follows all project standards defined in `CLAUDE.md`:

- ✅ **English only** - All reports, logs, and documentation in English
- ✅ **Type annotations** - Any TypeScript code generated must use explicit types (strict mode)
- ✅ **Documentation** - All changes must be documented
- ✅ **Validation** - Run `codecheck` (or individual checks: `npm run test`, `npm run eslint:check`, `npm run prettier:check`) after upgrades
- ✅ **Git commits** - Commit after each successful upgrade session with conventional commit format

---

## Troubleshooting

### Common Issues

**Issue:** `npm install` fails with peer dependency conflicts

- **Solution:** Use `npm install --legacy-peer-deps` or resolve conflicts manually

**Issue:** Package installation fails with version mismatch

- **Solution:** Check Node.js version compatibility, rollback if needed

**Issue:** Tests fail after upgrade

- **Solution:** Identify which package caused the failure, rollback that package, check for breaking changes

**Issue:** ESLint errors after TypeScript upgrade

- **Solution:** Update ESLint and TypeScript-related plugins together

**Issue:** Multiple packages failing

- **Solution:** Upgrade packages one at a time to isolate issues

---

## Related Documentation

- **[Agent Commands Overview](../README.md)** - Overview of all agent command systems
- **[Development Commands](/home/node/app/docs/DEVELOPMENT_COMMANDS.md)** - Command reference
- **[Repository Standards](/home/node/app/docs/STANDARDS.md)** - Project standards
- **[npm-check-updates Documentation](https://github.com/raineorshine/npm-check-updates)** - Official ncu docs
- **[npm Documentation](https://docs.npmjs.com/)** - Official npm docs

---

## Summary

The Agent Library Upgrades system provides a safe, automated way to upgrade project dependencies with:

- ✅ Automatic discovery of available updates
- ✅ Smart prioritization (minor first, major with approval)
- ✅ Automatic rollback on failures
- ✅ Comprehensive reporting
- ✅ Retry logic with failure isolation

**Getting started:**

- **For practical use:** See `example_prompts/` folder for copy-paste ready prompts
- **For technical details:** See `GUIDE.md` for comprehensive execution guide
