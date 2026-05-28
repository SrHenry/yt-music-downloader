# AGENTS.md — AI Harness Guidelines

Auto-discovered by: OpenCode, Claude Code, Codex, Cursor, Windsurf, Copilot, Gemini CLI, Augment, Devin, Jules, Goose, and others.

## Session Behavior

### Classify every request before acting

| Category | Examples | Workflow |
|----------|----------|----------|
| **CODE-PRODUCING** | Features, fixes, refactors, deprecations, breaking changes | Strict — follow PR Workflow below |
| **EXPLORATORY** | Questions, debugging, codebase navigation, code review | Loose — respond conversationally, use search/read tools freely |

### CODE-PRODUCING: scope gate

Do **NOT** create branches, worktrees, or write code until all of the following are confirmed:

1. **Worktree required** — all code-producing work must happen in an ephemeral worktree (`/tmp/<repo-name>-<topic>`), **never** in the main repo checkout. The user may explicitly opt out (e.g. "work in the main checkout" or "no worktree") — but you must never assume this; always use a worktree unless told otherwise
2. **Base branch** — `main` for all work (no integration branch in this repo). If the user requests a different base, analyze the case against industry standard practices and question before proceeding
3. **Related issues** — GitHub issue numbers, URLs, or external references (or explicitly "none")
4. **Scope delimited** — what's included, what's excluded, expected behavior for edge cases
5. **User confirms** — restate understanding and get explicit go-ahead before proceeding

If the request is vague or ambiguous: ask targeted questions. Better to over-clarify than to assume. Never start implementation on unclear intent.

### Self-updating knowledge

The AI harness **must** persist newly learned project knowledge into this file (`AGENTS.md`) as it discovers it during sessions.

#### Auto-persist criteria (all three must be true)

1. **Verifiable from source** — the fact can be confirmed by reading code, config, or dependency behavior (not subjective opinion)
2. **Fills a gap** — no existing rule, gotcha, or entry already covers it
3. **No behavior change** — the fact doesn't alter how the agent should act (that's propose-first territory)

If any criterion is uncertain → propose first instead.

#### Section routing table

| Discovery type | Target section |
|----------------|---------------|
| Build/runtime gotcha not covered | Gotchas |
| Directory purpose not documented | Directory Ownership |
| Missing Prohibition (behavior that must never happen) | Prohibitions |
| New command or script not in table | Build & Development Commands or bin/ Scripts |
| Dependency behavioral quirk | Gotchas or Architecture |
| Import/resolution pattern | Code Conventions → Import style |
| Pipeline pattern discovery | Architecture or Directory Ownership |
| yt-dlp/ffmpeg quirk | Gotchas |

#### Dedup rule

Before adding, scan existing content. Amend existing entries rather than adding parallel ones. Keeps the file tight and avoids contradiction.

#### Pending proposals

Unconfirmed proposals that the session ends before confirming **must** be persisted to TASKS.md as:

```markdown
- [ ] AGENTS.md: <proposed change summary>
  - **Blocked**: needs-user-confirmation
  - **Details**: <what to add/change and where>
  - **Files**: AGENTS.md
```

#### Retract mechanism

If an auto-persisted fact is later discovered to be wrong:

```markdown
- ~~ALWAYS use X for Y — reason given~~ — retracted: <why it was wrong>
- ALWAYS use Z for Y — <correct reason>
```

### EXPLORATORY: conversational mode

- No branches, worktrees, or PRs
- Use search, read, and analysis tools freely
- If exploration leads to a code change, re-classify as CODE-PRODUCING and start the scope gate from the top

## Task Management

### Core Protocol

1. Read `TASKS.md` on session start — understand current priorities before acting
2. Claim a task by appending `(@agent-name)` to its checkbox line
3. Remove completed tasks from the file (history lives in git log)
4. Create new tasks as needed during work

### Task Format

```markdown
- [ ] Task title
  - **ID**: stable-kebab-id
  - **Details**: context the agent can't discover on its own
  - **Files**: path/to/file.ts, path/to/other.ts
  - **Acceptance**: testable criterion for "done"
  - **Blocked by**: comma-separated-task-ids  (unblocked when all referenced IDs no longer exist)
  - **Blocked**: free-form reason for external blocks (any non-empty value = blocked)
  - [ ] Sub-task 1
  - [ ] Sub-task 2
```

### Core Metadata Fields (always available)

| Field | Purpose |
|-------|---------|
| `**ID**` | Stable identifier for `**Blocked by**:` references (kebab-case) |
| `**Details**` | Context the agent can't discover on its own |
| `**Files**` | Starting points for the agent to read |
| `**Acceptance**` | Testable criterion for "done" |
| `**Blocked by**` | Task IDs; unblocked when all referenced IDs no longer exist in file |
| `**Blocked**` | Free-form reason for external blocks; any non-empty value marks task as blocked |

### Opt-in Metadata Fields

The agent evaluates fitness before inserting. If a task fits even one criterion, the corresponding field(s) **must** be populated. A task with zero opt-in fields is fine; a task that should have had them is a violation.

| Field | Add when |
|-------|----------|
| `**Plan**` | Task touches 3+ files or involves non-obvious implementation order |
| `**Parent**` | Task was decomposed from another task that still exists in the file |
| `**Research**` + `**Last-enriched**` | Task is blocked and agent has gathered context that would otherwise be lost between sessions |
| `**Estimate**` | Task is non-trivial enough that context-budget planning matters |
| `**Verification**` | "Done" can't be verified by a single test run — e.g. manual steps, specific command sequences |
| `**Risk**` + `**Mitigation**` | Task involves migration, breaking changes, dependency swaps, or touching stable/production-critical code |
| `**Hypothesis**` + `**Success**` + `**Pivot**` + `**Measurement**` + `**Anchor**` | Performance change, architectural refactor, or any change where "did it help?" is genuinely ambiguous |
| `**Touches**` | Multiple tasks or agents may work in parallel on overlapping files |
| `**Surfaced-by**` | Task originates from an automated sweep or audit loop rather than a human request |
| `**Milestone**` | Project has phased roadmap and tasks should be filterable by milestone |

### Writing Good Tasks

- Each task should be independently completable in a single session
- Sub-tasks are for decomposition within a session; separate tasks are for parallel/async work
- `**Blocked by**` creates hard dependencies (task can't start); `**Blocked**` is for external blockers (waiting on human, upstream, etc.)
- Prefer specific `**Acceptance**` criteria over vague descriptions — "output file exists and is valid FLAC" beats "works correctly"

## Prohibitions

- **NEVER** add a build/compile step — `tsconfig.json` has `noEmit: true`; this project runs TS directly via `tsx`
- **NEVER** use `npm install` — always use `yarn`
- **NEVER** use `require()` or CommonJS imports — ESM only
- **NEVER** skip `tsc --noEmit` after code changes — typecheck is mandatory, not optional
- **NEVER** omit `.ts` extension in local imports — `allowImportingTsExtensions` requires it; always use `@/*` path alias
- **NEVER** commit with placeholder author identity — stop and ask the user for correct identity before proceeding
- **NEVER** commit without GPG signing — `commit.gpgsign=true`; use `-S` / `--gpg-sign`
- **NEVER** silently overwrite established AGENTS.md guidelines — always propose first and get confirmation, even when not in doubt
- **NEVER** assume a worktree is optional for code-producing work — always use one unless the user explicitly opts out

## Project Overview

- **Package**: `workflow` (public, delivered by git clone — no npm publish pipeline)
- **Purpose**: Node.js CLI for downloading YouTube music as FLAC via `yt-dlp` + `ffmpeg`, with metadata/thumbnail embedding
- **Runtime**: TypeScript runs directly via `tsx` (`noEmit: true` — see Prohibitions)
- **Module system**: ESM only (`"type": "module"` in package.json)
- **Package manager**: Yarn 1.x (classic) — see Prohibitions

## Build & Development Commands

| Command | Purpose |
|---------|---------|
| `yarn install` | Install dependencies (required after checkout) |
| `npx tsx src/workflow.ts <command>` | Run the CLI |
| `./bin/workflow <command>` | Run the CLI via shell script |
| `npx eslint .` | Lint |
| `npx tsc --noEmit` | Typecheck (mandatory after code changes) |

No test suite — project has no tests.

## Requirements

- System must have `yt-dlp` and `ffmpeg` in PATH
- Node.js 22.x / 24.x / 26.x (see `package.json` engines)
- `.env` is required (gitignored). Copy from `.env.example` on first `yarn install` (postinstall script does this). Required keys: `ROOT_PATH`, `THUMBNAILS_PATH` — both validated at startup via `EnvSchema`

## Architecture

- **Entry:** `src/workflow.ts` — commander CLI with `download` and `clear` subcommands
- **Dual registration:** The `download` action and its options are registered on both the root `workflow` command AND the `download` subcommand (see `src/commands/index.ts` vs `src/commands/download/index.ts`). Changes to one must be mirrored to the other.
- **Autoload:** `src/autoload.ts` scans for all `__autoload.ts` files under `src/` and imports them at startup. Currently only `src/env/__autoload.ts` (loads/validates `.env`). **Do not rename `__autoload.ts` files** — the pattern is regex-matched (`/^__autoload\.[cm]?js$/g`).
- **Pipelines:** Core logic uses `Experimental.pipeline()` from `@srhenry/type-utils` for functional composition. See `src/workflow/pipelines/download/music/` for the main download pipeline (steps: fetchMetadata → fetchThumbnail → fetchMusic → embedThumbnail → finish).
- **Schema validation:** `@srhenry/type-utils` schemas/validators used for env vars, CLI options, and YouTube metadata.
- **Logging:** Uses `debug` npm package with namespaces (`workflow:info`, `workflow:warn`, `workflow:error`). Enable with `DEBUG=workflow:*`.
- **Extra yt-dlp args:** Arguments after `--` on the CLI are forwarded to `yt-dlp` (see `fetchExtraArgs()` which reads `process.argv` after `--`).

## Code Conventions

### Formatting (Prettier)

- 4-space indent (`.prettierrc` + `.editorconfig`)
- No semicolons
- Single quotes

### YAML files (`*.yml`, `*.yaml`)

- 2-space indent — YAML standard (never 4-space)
- Always validate with `yamllint` or equivalent before committing
- No trailing whitespace, no tab characters
- Use `"` only when a value contains `:` or `#`; prefer unquoted strings

### Other indentation-sensitive files

- **JSON** (`*.json`, `*.jsonc`): 2-space indent (standard)
- **TOML** (`*.toml`): 2-space indent (standard)
- **Markdown** (`*.md`): 2-space indent for nested lists; 4-space for code blocks inside markdown
- **Shell scripts** (`*.sh`, `bin/*`): 4-space indent (match `.editorconfig`)
- **Dockerfile**: 2-space indent for RUN continuation lines (`\`)
- **`.editorconfig`** is the source of truth — when in doubt, check it first

### Lint (ESLint flat config)

- `no-unused-vars` and `no-undef` are warnings, not errors
- P42 rule `remove-console-log` is disabled (`p42.toml`) — `console.log` is allowed

### Import style

- Path alias: `@/*` → `src/*` (tsconfig paths). All local imports use this.
- All local imports include `.ts` extension (`allowImportingTsExtensions`)
- ESM only — see Prohibitions

### Commit Style

Conventional Commits with emoji:

```
type: :emoji: description
```

Types: `feat`, `fix`, `refactor`, `style`, `chore`, `hotfix`, `revert`

Emoji reference from existing commits: `✨` (feat), `:bug:` (fix), `♻️` (refactor), `:truck:` (style/rename), `:arrow_up:` (chore/deps), `:lock:` (fix/security), `:construction_worker:` (chore/ci), `:sparkles:` (feat)

### Commit Authoring

Before making any commit, the AI harness **must** clarify the commit author identity:

- **Default author**: The local then global git config of the root worktree (i.e., `git config user.name` / `git config user.email` resolved from the main repo checkout, not the ephemeral worktree) — the AI harness must ask the user to confirm the author identity before the first commit in a session, unless already specified earlier in the conversation
- **Verification step**: Before the first commit, check the resolved `user.name` and `user.email` — if they look like placeholder values (e.g., `Test`, `test@test.com`), stop and ask the user for the correct identity before committing
- **Override**: If the user explicitly requests a different author (e.g., a co-author, bot identity, or different email), use that instead — but never assume an alternate identity without explicit direction
- **GPG signing**: This repo has `commit.gpgsign=true` (see Prohibitions)

### Branch Naming

| Pattern | Use |
|---------|-----|
| `feat/<topic>` | New features |
| `refactor/<topic>` | Refactors |
| `fix/<topic>` | Bug fixes |
| `hotfix/<topic>` | Urgent fixes |

### Branch Roles

- `main` — Default branch. All PRs target this.

## PR Workflow with Git Worktrees

This is the standard workflow for AI harness sessions producing pull requests.

### 1. Gather Context

This is a **blocking gate** — do not proceed to step 2 until all items below are resolved.

- **Base branch**: Always `main`. If the user requests otherwise, analyze against industry standard practices and question before proceeding.
- **Related issues**: Ask the user for GitHub issue numbers, URLs, or any external references. Fetch issue details with `gh issue view <number>` or `gh issue view <url>`.
- **Scope clarification**: Confirm what the PR should accomplish. If the user provides a vague request, ask targeted questions before starting.

### 2. Create Ephemeral Worktree + Branch

**Always fetch the latest remote state before branching** to avoid branching from outdated work. Run from the main repo checkout:

```sh
git fetch origin <base>
```

Then create worktree + branch together — the worktree stays alive for the entire PR lifecycle:

```sh
git worktree add /tmp/Músicas-<topic> -b feat/<topic> origin/<base>
```

Skipping `git fetch` is only acceptable when the user explicitly confirms the local ref is up to date.

Work in the worktree (`/tmp/` prefix — ephemeral, not inside the main repo checkout). **The first step after creating the worktree must be `yarn install`** to set up dependencies and trigger the postinstall script (which copies `.env.example` → `.env` if missing). Do not write code or run builds until `yarn install` completes.

### 3. Implement

- Make changes in the worktree directory
- Run `npx eslint .` and `npx tsc --noEmit` after each logical change step — not just "frequently"
- Commit using Conventional Commits with emoji format

### Upstream issues (`@srhenry/type-utils`)

When genuine problems are found in `@srhenry/type-utils` (bugs, missing types, API gaps, behavioral quirks), the AI harness **must**:

1. Document the problem — minimal reproduction, expected vs actual behavior, affected version
2. Check `CONTRIBUTING.md` in the [type-utils repo](https://github.com/SrHenry/type-utils) for issue/PR guidelines (currently no CONTRIBUTING.md exists — follow general best practices until one is added)
3. File an issue via `gh issue create --repo SrHenry/type-utils` with the documented details
4. Reference the filed issue number in the consuming code's comments or commit message

Do **not** file issues for usage misunderstandings or features that are working as designed — only genuine bugs, type errors, or missing functionality that blocks this project.

### 4. Push & Create Draft PR

All non-urgent work (features, fixes, refactors) must go through a PR before merging. **Create the PR as a draft by default** — this signals work-in-progress and prevents accidental merges before review.

```sh
git push -u origin feat/<topic>
gh pr create --draft --base main --title "type: :emoji: description" --body "..."
```

Only use `--draft=false` (or omit `--draft`) when the user explicitly requests a ready-for-review PR, or when the change is trivially complete at push time. Urgent hotfixes (`hotfix/<topic>`) that skip the PR phase are the only exception — but only when explicitly requested by the user.

### 5. Iterate

- Keep the worktree alive for follow-up commits (rebase, conflict resolution, review feedback)
- After force-pushing a rebase: `git push --force-with-lease origin feat/<topic>`
- After resolving rebase conflicts: `git add <resolved-files> && GIT_EDITOR=true git rebase --continue`

### 6. Post-Merge Cleanup

Once the PR is merged, clean up everything:

```sh
# From the main repo checkout (NOT the worktree):
git worktree remove /tmp/Músicas-<topic>
git fetch --prune
git branch -d feat/<topic>
git push origin --delete feat/<topic>
```

Restore the main repo to its original branch if needed.

## bin/ Scripts

- `bin/workflow` → `npx tsx src/workflow.ts $@`
- `bin/dl-playlist` → raw `yt-dlp` wrapper (bypasses the pipeline entirely)
- `bin/thumbnail` → standalone ffmpeg thumbnail embed
- `bin/cleanup` → deletes `*.flac`, `out/`, `temp/` contents
- `bin/clear-logs` → `npx tsx src/workflow.ts clear logs $@`

## Directory Ownership

- `src/functions/` — thin wrappers calling `yt-dlp`/`ffmpeg` via `execFile`
- `src/shared/` — generic utilities (exec helpers, pipeline operators, schemas)
- `src/shared/pipelines/` — custom functional pipeline library (map, filter, forEach, split, removeFiles, parseValidationResult, etc.)
- `src/commands/` — commander subcommand definitions with per-command schemas/validators
- `src/env/` — dotenv loading + schema validation
- `src/log/` — namespaced debug loggers
- `src/workflow/pipelines/` — domain-specific pipeline compositions (download music pipeline)

## Gotchas

- `bin/dl-playlist` calls `yt-dlp` directly, not the TypeScript pipeline — changes to `src/` won't affect it.
- `src/shared/pipelines/` is a bespoke functional pipeline library, not an npm package — don't try to import from `@srhenry/type-utils` for these.
- Thumbnail cache is keyed by YouTube content ID and stored at `THUMBNAILS_PATH`. Existing thumbnails are reused.
- `runFFmpeg()` catches errors and returns `err.message` as a successful string instead of throwing — callers that expect a throw on failure will miss ffmpeg errors.
- `processDownload()` returns after the first source in non-playlist mode (it does not iterate all sources) — passing multiple URLs without `--playlist` only processes the first one.
- The autoload regex (`/^__autoload\.[cm]?js$/g`) matches `.js`, `.cjs`, `.mjs` but **not** `.ts` — yet the project uses `.ts` autoload files. This works because `tsx` resolves `.ts` to `.js` at runtime, but a new autoload file with a non-standard extension could silently fail to load.
- `src/shared/pipelines/do.ts` was deleted in the 0.8.x migration — `$do`/`$doAsync` are replaced by `.tap()`/`.tapAsync()` instance methods on PipelineBox.
- `src/@types/type-utils.d.ts` was deleted in the 0.8.x migration — type augmentation is no longer needed; `@srhenry/type-utils` exports types directly.

## @srhenry/type-utils API (0.8.x)

### Migration from 0.7.x

| Old API | New API (0.8.x) | Notes |
|---------|-----------------|-------|
| `enpipe(value)` | `callWith(value)` | PipelineBox auto-invokes |
| `enpipe(fn, ...args)` | `apply(fn, ...args)` | PipelineBox auto-invokes |
| `$do(fn)` / `$doAsync(fn)` | `.tap(fn)` / `.tapAsync(fn)` | Instance methods on PipelineBox |
| `.catch(fn)` on PipelineBox | `.depipe().catch(fn)` | PipelineBox no longer has `.catch()` |
| `.then(fn)` on PipelineBox | `.depipe().then(fn)` | PipelineBox no longer has `.then()` |
| `asTypeGuard` + inline rules | `asTypeGuard` + `createInlineRule` + `.use()` on `useSchema()` | Split base guard from inline rules |
| Type augmentation via `type-utils.d.ts` | Not needed | Module types exported directly |

### PipelineBox API reference

- `pipe(value)` / `pipe(Promise.resolve(value))` — wraps value or promise
- `.pipe(fn)` / `.pipeAsync(fn)` — chains sync/async transforms
- `.tap(fn)` / `.tapAsync(fn)` — side-effect without modifying pipeline value
- `.depipe()` — unwraps PipelineBox to its inner Promise/value
- `callWith(value)` — auto-invoked by PipelineBox (replaces `enpipe`)
- `apply(fn, ...args)` — auto-invoked by PipelineBox (replaces `enpipe` with args)
- `pipeline(fn)` — wraps a factory function for PipelineBox composition
- `createInlineRule<TSubject, "name">("name", predicate)` — creates a named rule for `.use()` on `FluentSchema`
- `useSchema(guard)` — wraps a TypeGuard into a FluentSchema for `.use()` chaining
