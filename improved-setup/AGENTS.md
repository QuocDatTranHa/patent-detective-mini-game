# Agent Rules

This repository uses Markdown files as persistent project memory for coding agents.

Follow `.github/copilot-instructions.md` as the primary project instruction file.

## Start of Every Session

Use scope-based reading. Do not load all files by default.

**Always read first (every session):**
1. `CURRENT_PHASE.md` — active phase, session, next task, files affected, last verified status
2. `HANDOVER.md` — full current project state and next recommended step

**Conditional reading — apply based on task scope:**
3. `TASKS.md` — read only the current phase checklist when the full task list is needed for a briefing or implementation
4. `KNOWN_ISSUES.md` — read only if a known issue could block or affect the next step
5. `ARCHITECTURE.md` *(Implementation Decisions section only)* — read for JS logic, state model, component config, or file structure tasks
6. `DECISIONS.md` *(Implementation Decisions section only)* — read for new-feature tasks or tasks that change component structure

**Never read** `ARCHITECTURE.md`, `DECISIONS.md`, or `KNOWN_ISSUES.md` by default for CSS-only or text/content-only tasks.

Do not rely only on chat history. Important project state belongs in the Markdown files.

## Planning Mode

When asked to plan:
- do not implement code
- do not create final implementation files unless explicitly asked
- produce a clear step-by-step plan
- identify affected files, assumptions, risks, and open questions
- wait for user approval before implementation

During the first planning run, agents may update existing Markdown workflow files if the plan establishes clear rules, decisions, or architecture choices.

Keep updates concise and avoid duplicating `docs/spec.md`.

## Implementation Mode

When asked to implement:
- follow the current plan
- make small, focused, reviewable changes
- avoid over-engineering
- do not add tools, frameworks, dependencies, or config files unless explicitly approved by the user

## Review Gate

Run `review-work` every 3rd phase (e.g. phases 3, 6, 9, 12…), or before any phase that introduces a new publicly-visible UI element or major behavior change. Do not skip the review gate.

## Task Management

| File | Purpose |
|---|---|
| `CURRENT_PHASE.md` | Live status: current phase, next task (10–20 lines; fast to read) |
| `PLAN.md` | Initial project plan — archived after Phase 1 approval |
| `TASKS.md` | Complete phased checklist — read in full only when planning |
| `HANDOVER.md` | Current snapshot (rewritten every session) |
| `ARCHITECTURE.md` | Project constraints + technical implementation decisions |
| `DECISIONS.md` | Project constraints (once) + implementation decisions (accumulated) |
| `KNOWN_ISSUES.md` | Open bugs, risks, and fragile behavior |
| `AGENT_LOG.md` | Completed work archive (append-only, newest at top) |

## End of Implementation Session

After implementation work, update in this order:

1. `HANDOVER.md` — full rewrite with current state
2. `CURRENT_PHASE.md` — rewrite with new phase/session/next unchecked task
3. `TASKS.md` — check off completed items; mark phase complete if fully done
4. `AGENT_LOG.md` — prepend one entry (summary of HANDOVER.md; completed work only)
5. `KNOWN_ISSUES.md` — review every open item; remove resolved items
6. `DECISIONS.md` — only if an architectural decision was made or changed this session

### `AGENT_LOG.md` strict rules
- One entry per completed session, prepended at the top
- Title format: `## Phase X — Session Y — [short description]`
- Always write in English
- Only record completed work — never planning notes, never "status: planned"
- Planning notes belong only in `HANDOVER.md` under "Next Recommended Step"
- Summarize from `HANDOVER.md`; do not write original prose

Do not add dates, timestamps, or "Last Updated" lines to any file.
