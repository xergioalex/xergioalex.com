---
description: Upgrade project dependencies (npm packages via ncu)
---

# Library Upgrade Command

You are a library upgrade assistant that safely upgrades npm project dependencies following the system at `.agent_commands/agent_library_upgrades/GUIDE.md`.

## Your Task

Guide the user through upgrading project dependencies with validation, testing, and automatic rollback.

**🚨 CRITICAL BEHAVIOR - READ THIS FIRST:**
- When `/lib-upgrade` is called WITHOUT parameters, you MUST:
  1. Run discovery (`npx npm-check-updates`) - READ ONLY, NO CHANGES
  2. Show the report with categorized upgrades - DISPLAY ONLY
  3. Present the interactive menu - DISPLAY ONLY
  4. **STOP and WAIT for user input** - DO NOT proceed until user selects an option
  5. **DO NOT execute any `ncu -u` commands** until user explicitly confirms
  6. **DO NOT modify package.json** until user explicitly confirms
  7. **DO NOT run `npm install`** until user explicitly confirms

- **NEVER proceed with upgrades without explicit user confirmation**
- **NEVER run `ncu -u` or modify files without user approval**
- Always show what will be upgraded before asking for permission
- The ONLY commands you should run without user input are:
  - `npx npm-check-updates` (read-only, to show available upgrades)
  - `git status` (to check repository state)

## Parameter Support

**This command accepts optional parameters for faster execution:**

- `/lib-upgrade all` - Upgrade all packages (minor first, then ask about major)
- `/lib-upgrade minor` - Upgrade only minor and patch versions
- `/lib-upgrade patch` - Upgrade only patch versions (safest)
- `/lib-upgrade specific {package1} {package2}...` - Upgrade specific packages
- `/lib-upgrade check` - Just show what upgrades are available (no changes)

**If parameters are provided:**
- Parse the first parameter:
  - If "all" → Set upgrade type to "all", skip to Step 2 (Discovery Phase)
  - If "minor" → Set upgrade type to "minor", skip to Step 2
  - If "specific" → Set upgrade type to "specific", parse remaining parameters as package names, skip to Step 2
  - If "check" → Set upgrade type to "check", skip to Step 2
- Skip the interactive menu (Step 1)

**If no parameters are provided:**
- Continue with interactive workflow (Step 1)

## Workflow

### Step 0: Check for Parameters

**If command was called with parameters:**
- Extract upgrade type from first parameter
- If "specific": Extract package names from remaining parameters
- Validate upgrade type is one of: "all", "minor", "patch", "specific", "check"
- If invalid, show error and proceed to Step 1 (show menu)
- If valid, skip to Step 1.5 (Discovery Phase) with upgrade type pre-selected

**If no parameters provided:**
- Continue to Step 1 (automatic discovery and interactive menu)

### Step 1: Automatic Discovery & Interactive Menu

**🚨 CRITICAL: This step runs automatically when no parameters are provided. You MUST wait for user input before proceeding.**

**⚠️ IMPORTANT: In this step, you ONLY run READ-ONLY commands. DO NOT execute any upgrade commands (`ncu -u`, `npm install`, etc.)**

1. **First, run discovery automatically (READ-ONLY, NO CHANGES):**
   ```bash
   npx npm-check-updates
   ```
   **This command only shows available upgrades. It does NOT modify any files.**

2. **Parse and categorize output:**
   - Extract package names, current versions, and available versions
   - Categorize as:
     - **Patch upgrades:** Patch (1.0.0 → 1.0.1) version bumps
     - **Minor upgrades:** Minor (1.0.0 → 1.1.0) version bumps
     - **Major upgrades:** Major (1.0.0 → 2.0.0) version bumps

3. **Show comprehensive report:**
   ```
   📦 Package Update Report
   ═══════════════════════════════════════════════════════════

   Patch upgrades (safest - bug fixes only):
   • package1: 1.0.0 → 1.0.5
   • package2: 2.3.1 → 2.3.2
   Total: 2 patch upgrades

   Minor upgrades (safe - new features, backward compatible):
   • package3: 1.2.0 → 1.3.0
   • package4: 2.1.0 → 2.2.0
   • package5: 3.0.1 → 3.1.0
   Total: 3 minor upgrades

   Major upgrades (⚠️  may have breaking changes):
   • webpack: 5.90.0 → 6.0.0
   • typescript: 5.3.3 → 6.0.0
   Total: 2 major upgrades

   ═══════════════════════════════════════════════════════════
   ```

4. **Present interactive menu and WAIT for user response:**
   ```
   What would you like to do?

   1. Upgrade patch versions only (safest)
       → Apply 2 patch upgrades

   ─────────────────────────────────────────────────────────────

   2. Upgrade patch + minor versions (recommended)
       → Apply 2 patch + 3 minor upgrades

   ─────────────────────────────────────────────────────────────

   3. Upgrade all (minor first, then ask about major)
       → Apply patch + minor first, then review major upgrades

   ─────────────────────────────────────────────────────────────

   4. Select specific packages
       → Choose which packages to upgrade individually

   ─────────────────────────────────────────────────────────────

   5. Cancel (no changes)

   Enter option (1-5):
   ```

   **⚠️ STOP HERE - DO NOT PROCEED UNTIL USER PROVIDES INPUT**

5. **ONLY AFTER user provides input, proceed based on user selection:**
   - **Option 1 (Patch only):** Skip to Step 2 (Planning Phase) with patch upgrades only
   - **Option 2 (Patch + Minor):** Skip to Step 2 with patch + minor upgrades
   - **Option 3 (All):** Skip to Step 2 with patch + minor, then Step 2.5 (Major Upgrades Review)
   - **Option 4 (Specific):** Go to Step 1.9 (Select Specific Packages)
   - **Option 5 (Cancel):** Exit with message "Upgrade cancelled by user"

### Step 1.5: Discovery Phase (When Parameters Provided)

**Only runs if parameters were provided (e.g., `/lib-upgrade minor`)**

1. **Run discovery command:**
   ```bash
   npx npm-check-updates
   ```

2. **Parse and show report** (same format as Step 1)

3. **Show what will be upgraded based on parameter:**
   ```
   Based on your selection: [parameter]
   
   Will upgrade:
   - [List packages that match the parameter criteria]
   
   Proceeding to planning phase...
   ```

4. **Then proceed to Step 2 (Planning Phase) based on the parameter provided**

### Step 1.9: Select Specific Packages

**When user selects option 4 (Select specific packages):**

1. **Show numbered list of all available upgrades:**
   ```
   Select packages to upgrade (enter numbers separated by commas):

   Patch upgrades:
   1. package1: 1.0.0 → 1.0.5
   2. package2: 2.3.1 → 2.3.2

   Minor upgrades:
   3. package3: 1.2.0 → 1.3.0
   4. package4: 2.1.0 → 2.2.0
   5. package5: 3.0.1 → 3.1.0

   Major upgrades:
   6. webpack: 5.90.0 → 6.0.0 ⚠️
   7. typescript: 5.3.3 → 6.0.0 ⚠️

   Examples:
   - "1,2,3" - Upgrade packages 1, 2, and 3
   - "all-minor" - All patch and minor upgrades
   - "1-5" - Packages 1 through 5
   - "cancel" - Go back to main menu

   Enter selection:
   ```

2. **Parse user input:**
   - Handle individual numbers: "1,2,3"
   - Handle ranges: "1-5"
   - Handle shortcuts: "all-minor", "all-patch"
   - Handle "cancel": Return to Step 1

3. **Confirm selection:**
   ```
   You selected:
   • package1: 1.0.0 → 1.0.5
   • package2: 2.3.1 → 2.3.2
   • package3: 1.2.0 → 1.3.0

   Proceed with these upgrades?
   1. Yes, proceed
   2. No, let me reselect

   Enter option (1, 2, "yes", or "no"):
   ```

4. **If confirmed, proceed to Step 2 (Planning Phase)**

### Step 2: Planning Phase

**Based on user selection from Step 1 or parameters:**

1. **Create detailed upgrade plan:**
   ```
   📋 Upgrade Plan
   ═══════════════════════════════════════════════════════════

   Packages to upgrade:
   ✓ package1: 1.0.0 → 1.0.5 (patch)
   ✓ package2: 2.3.1 → 2.3.2 (patch)
   ✓ package3: 1.2.0 → 1.3.0 (minor)
   ✓ package4: 2.1.0 → 2.2.0 (minor)

   Total: 2 patch + 2 minor upgrades
   Estimated time: ~2-3 minutes

   ═══════════════════════════════════════════════════════════
   ```

2. **Ask for confirmation and WAIT for user response:**
   ```
   Proceed with these upgrades?

   1. Yes, proceed with upgrades
   2. No, cancel and return to main menu

   Enter option (1, 2, "yes", or "no"):
   ```

   **⚠️ STOP HERE - DO NOT PROCEED UNTIL USER PROVIDES INPUT**

3. **ONLY AFTER user provides input:**
   - **If user selects 1 or "yes":** Proceed to Step 3 (Backup Phase)
   - **If user selects 2 or "no":** Return to Step 1 (show menu again) with message "Upgrade cancelled by user"

### Step 2.5: Major Upgrades Review (Only if "All" was selected)

**This step runs AFTER patch + minor upgrades are complete and only if major upgrades exist:**

1. **Show major upgrades report:**
   ```
   🔴 Major Upgrades Available (Breaking Changes Possible)
   ═══════════════════════════════════════════════════════════

   The following packages have major version updates available:

   1. webpack: 5.90.0 → 6.0.0
      Risk: High - May require webpack config changes

   2. typescript: 5.3.3 → 6.0.0
      Risk: High - May require code changes

   ═══════════════════════════════════════════════════════════
   ```

2. **Ask what to do:**
   ```
   What would you like to do with major upgrades?

   1. Apply all major upgrades (2 packages)
      → Upgrade all at once

   ─────────────────────────────────────────────────────────────

   2. Choose individually
      → Review and select which major upgrades to apply

   ─────────────────────────────────────────────────────────────

   3. Skip all major upgrades
      → Keep current versions

   Enter option (1-3):
   ```

3. **Based on selection:**
   - **Option 1:** Add all major upgrades to plan, proceed to Step 3
   - **Option 2:** Go to Step 2.6 (Individual Major Review)
   - **Option 3:** Skip major upgrades, go to Step 8 (Reporting)

### Step 2.6: Individual Major Upgrades Review

**When user selects "Choose individually" for major upgrades:**

**For each major upgrade:**
```
Package: webpack
Current version: 5.90.0
New version: 6.0.0
Type: Major upgrade ⚠️

Apply this upgrade?

1. Yes, upgrade this package
2. No, skip this package
3. Show breaking changes info (if available)

Enter option (1-3):
```

**Collect all "yes" responses and proceed to Step 3**

### Step 3: Backup Phase

**Before making changes:**

1. **Check git status:**
   ```bash
   git status
   ```

2. **Ensure clean working directory:**
   - If uncommitted changes exist, ask:
   ```
   You have uncommitted changes. Commit them first?

   1. Yes, commit changes first
   2. No, proceed anyway (with caution)

   Enter option (1, 2, "yes", or "no"):
   ```
   - If user selects 1 or "yes": Suggest using `/commit` or wait for user
   - If user selects 2 or "no": Proceed with caution (warn user)

3. **Create backup commit (optional but recommended):**
   - Suggest and WAIT for user response:
   ```
   Create a backup commit of current package.json?

   1. Yes, create backup commit
   2. No, skip backup

   Enter option (1, 2, "yes", or "no"):
   ```
   
   **⚠️ STOP HERE - DO NOT PROCEED UNTIL USER PROVIDES INPUT**
   
   - **ONLY AFTER user provides input:**
     - If user selects 1 or "yes": Commit current state before upgrades
     - If user selects 2 or "no": Skip backup and proceed to Step 4

### Step 4: Execution Phase

**⚠️ CRITICAL: This step ONLY runs AFTER user has explicitly confirmed in Step 2. NEVER execute this step without user confirmation.**

**This step is reached ONLY when:**
- User selected an option in Step 1 (interactive menu)
- User confirmed the upgrade plan in Step 2
- User completed Step 3 (backup phase)

**For upgrade plan:**

1. **Update `package.json` using ncu:**
   - For minor upgrades: `npx npm-check-updates -u --target minor`
   - For patch upgrades: `npx npm-check-updates -u --target patch`
   - For specific packages: `npx npm-check-updates -u --filter "package1 package2"`
   - Show the changes: `package: old_version → new_version`

2. **Install updated packages:**
   ```bash
   npm install
   ```
   This will:
   - Install new package versions
   - Update `package-lock.json` automatically
   - Resolve dependencies

3. **Monitor for errors:**
   - If success: Continue to validation
   - If failure: Go to Failure Handling (Step 6)

### Step 5: Failure Handling

**If `npm install` fails:**

1. **Identify problematic package:**
   - Parse error messages
   - Identify which package caused the failure
   - Check for peer dependency conflicts

2. **Rollback:**
   - Use git to restore `package.json`: `git checkout package.json`
   - Or manually revert version in `package.json` to previous version
   - Document in failure report

3. **Retry logic:**
   - Maximum 3 retry attempts per upgrade session
   - After rollback, retry with `--legacy-peer-deps` if peer dependency issue
   - If still failing after 3 attempts:
     - Mark package as failed
     - Document error details
     - Continue with other packages

4. **Report failure:**
   ```
   ✗ Package upgrade failed: package_name
   - Attempted: old_version → new_version
   - Error: [error message]
   - Action: Rolled back to old_version
   - Status: Skipped (will retry later)
   ```

### Step 6: Validation Phase

**After all upgrades complete:**

1. **Run validation:**
   ```bash
   # Option 1: Comprehensive check (recommended)
   codecheck

   # Option 2: Individual checks
   npm run test              # Run all tests
   npm run eslint:check      # Check linting
   npm run prettier:check    # Check code formatting
   ```

2. **Check results:**
   - If all validation passes: Continue to reporting
   - If validation fails:
     - Identify which upgrade caused the issue
     - Rollback problematic package(s)
     - Re-run validation
     - Document in report

### Step 7: Reporting Phase

**Generate comprehensive report:**

```
═══════════════════════════════════════════════════════════
📦 Library Upgrade Report
═══════════════════════════════════════════════════════════

Upgrade session: {timestamp}
Total time: {duration}

✅ Successfully upgraded ({X} packages):

Patch upgrades:
• package1: 1.0.0 → 1.0.5
• package2: 2.3.1 → 2.3.2

Minor upgrades:
• package3: 1.2.0 → 1.3.0
• package4: 2.1.0 → 2.2.0

Major upgrades:
• webpack: 5.90.0 → 6.0.0

─────────────────────────────────────────────────────────────

❌ Failed upgrades ({Y} packages):
• typescript: 5.3.3 → 6.0.0
  Error: Peer dependency conflict with @typescript-eslint
  Action: Rolled back to 5.3.3
  Recommendation: Upgrade @typescript-eslint first

─────────────────────────────────────────────────────────────

⚠️ Skipped ({Z} packages):
• package5: 3.0.0 → 4.0.0 (major - user skipped)

─────────────────────────────────────────────────────────────

🧪 Validation Results:
✓ npm install: Success
✓ Tests: All 127 tests passed
✓ ESLint: No errors
✓ Prettier: Formatted correctly

─────────────────────────────────────────────────────────────

📊 Summary:
• Total packages checked: {N}
• Successfully upgraded: {X} ({X1} patch, {X2} minor, {X3} major)
• Failed: {Y}
• Skipped: {Z}
• Overall status: ✅ Success

─────────────────────────────────────────────────────────────

💡 Recommendations:
{recommendations based on failures or patterns}

═══════════════════════════════════════════════════════════
```

**Ask user:**
```
Would you like to commit these changes?

1. Yes, commit changes
2. No, I'll commit later

Enter option (1, 2, "yes", or "no"):
```

**If user selects 1 or "yes":**
- Stage `package.json` and `package-lock.json`
- Suggest commit message: `chore(deps): upgrade {N} packages`
- Use `/commit` or create commit directly

**If user selects 2 or "no":**
- Remind user to commit later
- Changes are ready in working directory

## Important Notes

- **🚨 CRITICAL: Always wait for user input** - Never proceed with upgrades without explicit user confirmation
- **🚨 NEVER execute `ncu -u` or modify package.json** until user explicitly confirms in Step 2
- **🚨 When called without parameters:** Only show report and menu, then STOP and WAIT for user selection
- **Show report first:** Always run discovery (`npx npm-check-updates` - read-only) and show the report before asking what to upgrade
- **No automatic execution:** The command `/lib-upgrade` without parameters is READ-ONLY. It only shows options, it does NOT make changes
- **Follow guide:** Always reference `.agent_commands/agent_library_upgrades/GUIDE.md`
- **Patch/Minor first:** Always upgrade patch and minor versions before major
- **User approval for major:** Always ask before applying major upgrades
- **Automatic rollback:** Rollback on failures automatically
- **Validation required:** Always run `codecheck` (or individual checks: `npm run test`, `npm run eslint:check`, `npm run prettier:check`) after upgrades
- **Commit after success:** Recommend committing successful upgrades

## Error Handling

**If `ncu` command not found:**
- Check npm-check-updates installation
- Suggest: `npm install -g npm-check-updates`
- Report error and ask user to install

**If `package.json` is invalid:**
- Report syntax error
- Ask user to fix before continuing

**If multiple packages fail:**
- Upgrade packages one at a time to isolate issues
- Document each failure
- Continue with remaining packages

**If validation fails after upgrades:**
- Identify problematic package(s)
- Rollback and retry
- Document in report
