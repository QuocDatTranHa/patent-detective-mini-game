# Implement Next Task

Implement the next incomplete phase or session from `TASKS.md`.

## Step 0 — Scope Detection (do this before loading any files)

Read `CURRENT_PHASE.md` to identify:
- The task title and description
- Which files will be touched
- The scope type

Then apply the minimum required-reading set for that scope:

| Scope | Files to read |
|---|---|
| CSS-only or text/content-only | `HANDOVER.md`, `CURRENT_PHASE.md`, affected source file(s) |
| JS logic changes | Above + `ARCHITECTURE.md` (Implementation Decisions section only) |
| New feature / new component flag / new modal variant / new screen | Above + `DECISIONS.md` (Implementation Decisions section only) |
| Any scope | Add `KNOWN_ISSUES.md` only if a known issue is directly relevant to this task |

**Never load `ARCHITECTURE.md`, `DECISIONS.md`, or `KNOWN_ISSUES.md` by default for CSS-only or text/content-only sessions.**

## Required Reading (always)

1. `HANDOVER.md` — current status and last known state
2. `CURRENT_PHASE.md` — active phase, session, next task
3. Current phase checklist from `TASKS.md` — **read only the current phase section**, not the full file
4. Affected source file(s) — read relevant sections before editing

## Conditional Reading (by scope, per Step 0)

5. `ARCHITECTURE.md` — **Implementation Decisions section only** (not Project Constraints)
6. `DECISIONS.md` — **Implementation Decisions section only** (not Project Constraints)
7. `KNOWN_ISSUES.md` — only if a known issue is directly relevant to this task

Only read `docs/spec.md` if a specific behavior is unclear from the above files or the phase checklist. It does not need to be re-read every session.

## Implementation Rules

- Implement only the tasks listed in the current phase. Do not jump ahead.
- Follow the Implementation Decisions section of `ARCHITECTURE.md` for all technical choices.
- If a behavior is ambiguous, check `docs/spec.md` before guessing. Note any assumption made.
- Keep the implementation simple and focused. No over-engineering.
- Do not add frameworks, dependencies, build tools, or external resources.
- Do not touch files outside the current phase scope unless strictly necessary.
- Minimum 3 checklist items per session. If the planned work is fewer than 3 items, bundle it with adjacent work before starting.

## After Implementing

Run the manual check listed at the end of the current phase in `TASKS.md`.

State clearly:
- what was implemented
- what the manual check result was
- what was NOT tested
- any assumptions made

## Review Gate

Before updating the handover, check whether a formal review is due:
- Is this the 3rd session since the last `review-work` run? (e.g. phases 3, 6, 9, 12, 15…)
- Does this phase introduce a new publicly-visible UI element or major behavior change?

If either condition is true, run `review-work` before proceeding to `update-handover`.

## Stop Rule

Stop after implementing and reporting the manual check result.

Do not update `HANDOVER.md`, `CURRENT_PHASE.md`, `TASKS.md`, or `AGENT_LOG.md` here — use the `update-handover` prompt for that.

Do not continue to the next phase without user confirmation.
