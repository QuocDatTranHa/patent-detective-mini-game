# Workflow Review

Findings and recommendations from the Phase 18 vibe-coding retrospective.
Covers all 17 implementation phases of this project.

No code changes. Findings are for adoption in the next project.

---

## Part 1 — Required-Reading Audit (from Session 18-A)

### Finding 1-A: Three files are in nearly every prompt but rarely needed

`ARCHITECTURE.md`, `DECISIONS.md`, and `KNOWN_ISSUES.md` appear in 4–5 of the 6 prompts.
In practice they were useful for new-feature sessions (Phases 5–8, 13, 16) but wasted tokens
for CSS-only, text-only, and small JS sessions (Phases 9–12, 14–15, 16-D, 17).

**Recommendation: add a scope-detection preamble to `implement-next-task`**

Insert this block before the required-reading list:

> Before loading any files, read the current task title and "Files touched" line in `TASKS.md`.
> Apply the minimum required-reading set for the scope:
>
> - CSS-only or text/content-only → `HANDOVER.md`, `TASKS.md`, affected source file(s) only
> - JS logic changes → add `ARCHITECTURE.md` (state model, hotspot config format, modal strategy)
> - New feature, new modal variant, new HOTSPOT flag, new screen → add `ARCHITECTURE.md` + `DECISIONS.md`
> - Any scope → add `KNOWN_ISSUES.md` only if a known issue is directly relevant to the task
>
> Never load `ARCHITECTURE.md`, `DECISIONS.md`, or `KNOWN_ISSUES.md` by default for CSS or text sessions.

---

### Finding 1-B: `start-session` reads three files not needed for a briefing

The prompt requires `ARCHITECTURE.md`, `DECISIONS.md`, `KNOWN_ISSUES.md` in addition to
`HANDOVER.md` and `TASKS.md`. A status briefing only needs current state and pending tasks.
`ARCHITECTURE.md` and `DECISIONS.md` are stable reference files, not status files.

**Recommendation: reduce `start-session` required reading to two files**

Required: `HANDOVER.md`, `TASKS.md`
Conditional: `KNOWN_ISSUES.md` — read only when the recommended next step could be blocked by a known bug.

---

### Finding 1-C: `update-handover` reads `DECISIONS.md` but never produced a new entry in 15 sessions

Phases 9–17 (15+ sessions): `DECISIONS.md` was read at every handover; zero new decisions were added.
The last `DECISIONS.md` update was in the Phase 8-era UI overhaul.

**Recommendation: remove `DECISIONS.md` from `update-handover` required reading**

Replace with a conditional note:
> Read `DECISIONS.md` only if you made an architectural choice this session that deviates from
> or extends an existing decision. Otherwise skip it.

---

### Finding 1-D: `KNOWN_ISSUES.md` had stale entries from Phase 8 that survived to Phase 17

"White text areas have no content" (resolved in Phase 9) and the "Current Status: Phase 9 not started"
header (written in Phase 8) were never cleaned up. The file gave the impression of open bugs
that no longer existed.

**Recommendation: add a mandatory maintenance rule to `update-handover`**

> After updating `HANDOVER.md`, review every open item in `KNOWN_ISSUES.md`.
> Mark each item resolved (remove it) or update its status.
> No open item may survive more than 2 phases without a status update.

---

### Finding 1-E: `PLAN.md` diverged from `TASKS.md` after Phase 1 and became noise

`PLAN.md` still reads "Current Phase: Pre-implementation planning" — written during setup,
never updated. It was used once (during planning approval) and is correct for that use.
It is only required by `create-implementation-plan`, which is a one-shot prompt.

**Recommendation: archive `PLAN.md` after Phase 1 planning is approved**

Replace the file body with a single line:
> Planning approved. Implementation tracked in `TASKS.md`.

No prompt change needed — `create-implementation-plan` already only requires it.

---

### Finding 1-F: `review-work.prompt.md` was never explicitly invoked

Zero explicit invocations found in `AGENT_LOG.md`. Reviews happened informally as the
"manual check" block at the end of `implement-next-task` sessions. The standalone review
prompt was effectively ignored throughout the project.

**Recommendation: make `review-work` a mandatory quality gate every 3rd phase**

Add to `implement-next-task` stop rule:
> If this is the 3rd session since the last formal review (phases 6, 9, 12, 15, 18…),
> run `review-work` before updating the handover.

Alternatively: require it before any phase that ships a new publicly-visible UI element.

---

### Finding 1-G: `DECISIONS.md` entries 1–3 are planning-era constraints, not implementation decisions

Decisions 1 (local tech only), 2 (plan before code), 3 (game-spec as source of truth) were
set during project setup. They were read in every implementation session but never referenced.
Decisions 13–15 (hotspot flags, `hideText`) were actively consulted during implementation.

**Recommendation: split `DECISIONS.md` into two sections**

```markdown
## Project Constraints (read once at project start; skip in implementation sessions)
### 1. Use only local browser technologies
### 2. Plan before implementation
### 3. Use docs/game-spec.md as source of truth

## Implementation Decisions (read when task touches modal strategy, hotspot config, or file structure)
### 13. startScreen: true flag
### 14. winScreen: true flag
### 15. hideText: true flag
```

Add a note to `implement-next-task`: "Read only the **Implementation Decisions** section."

---

## Part 2 — Token Waste and Session Boundary Issues (from Session 18-B)

### Finding 2-A: `TASKS.md` grew to 1000+ lines; full reads were expensive from Phase 12 onward

Every `start-session` and `implement-next-task` invocation re-read all completed phases.
Phases 1–11 (700+ lines, fully checked off) were loaded at least 10 times after completion.

**Recommendation: introduce `CURRENT_PHASE.md`**

A small (10–20 line) file always kept current by `update-handover`. Format:

```markdown
# Current Phase

**Phase:** 18 — Vibe coding workflow retrospective
**Session:** 18-C — Write optimization recommendations
**Next unchecked task:** Write WORKFLOW_REVIEW.md
**Files affected:** (new file) WORKFLOW_REVIEW.md
**Status:** In progress
**Last verified:** Phase 17 complete and browser-verified
```

- All `start-session` reads replace `TASKS.md` with `CURRENT_PHASE.md`
- `implement-next-task` reads `CURRENT_PHASE.md` first; reads `TASKS.md` only for the current
  phase's full checklist
- `update-handover` updates `CURRENT_PHASE.md` alongside `HANDOVER.md`
- `TASKS.md` is only read in full when using `create-new-task` or `create-implementation-plan`

---

### Finding 2-B: `## Current Task` field in `TASKS.md` was never maintained past Phase 3

The field reads "Phase 2 abgeschlossen. Nächste Phase: Phase 3" — stale since Phase 4.
It provides false signal and wastes a line at the top of the file agents read.

**Recommendation: remove the `## Current Task` section from `TASKS.md`**

Its purpose is replaced by `CURRENT_PHASE.md` (see Finding 2-A).

---

### Finding 2-C: Session 16-D was a single-property CSS change carved out as a standalone session

One `clamp()` value change. The task existed because it was planned in a separate conversation
before a user-confirmed browser measurement. The per-session overhead (5 files × read + log entry
+ handover update) exceeded the actual work.

**Recommendation: minimum 3 concrete checklist items per session**

> If a planned session has fewer than 3 checklist items, bundle it into the preceding or
> following session at planning time. Single-property CSS adjustments that directly follow
> a calibration measurement belong in the same session as the measurement.

---

### Finding 2-D: `AGENT_LOG.md` accumulated planning notes, orphaned fragments, and naming inconsistencies

Problems found:
- Planning notes ("Status: planned, not yet implemented") were prepended as entries
- Phase 8 has 4 entries with inconsistent titles (not all use phase numbers)
- One orphaned fragment with no heading appears between Phase 15 and Phase 16 entries
- Entries for Phases 2–4 are in German; all others in English

**Recommendation: strict append rules for `AGENT_LOG.md`**

Add to `update-handover`:
> `AGENT_LOG.md` rules:
> - Add exactly one entry per completed session, prepended at the top
> - Title format: `## Phase X — Session Y — [short description]`
> - Always write in English
> - Only record completed work — never planning notes, never "status: planned"
> - Planning notes belong only in `HANDOVER.md` under "Next Recommended Step"

---

### Finding 2-E: `HANDOVER.md` and `AGENT_LOG.md` serve partially overlapping purposes

`HANDOVER.md` (full rewrite): current status, files changed, tested/not tested, next step
`AGENT_LOG.md` (append): history of completed sessions with the same fields

Every `update-handover` session writes substantially the same content to both files.
The only real difference: `HANDOVER.md` is always current; `AGENT_LOG.md` is cumulative history.

**Recommendation: keep both, but make the distinction explicit in `update-handover`**

> `HANDOVER.md` — the **current** snapshot. Rewrite fully every session.
> `AGENT_LOG.md` — the **archive**. Copy the key facts from `HANDOVER.md` as a new top entry.
> Do not write original prose in `AGENT_LOG.md`. Summarize from `HANDOVER.md`.

This prevents the two files drifting in content (different wordings, different "not tested" lists).

---

## Part 3 — Consolidated Prompt Change Proposals

The following shows the proposed revised required-reading lists for each prompt.
Only changes from the current state are shown; other prompt content is unchanged.

### `start-session.prompt.md` — revised required reading

```
Required:
1. CURRENT_PHASE.md (replaces TASKS.md for status only)
2. HANDOVER.md

Conditional:
3. TASKS.md — read only the current phase checklist (not full file)
4. KNOWN_ISSUES.md — read only if a known issue could block the next step
```

Remove from required: `ARCHITECTURE.md`, `DECISIONS.md`, `KNOWN_ISSUES.md` (make last conditional)

---

### `implement-next-task.prompt.md` — revised required reading + scope preamble

```
Step 0 — scope detection (before loading any files):
  Read CURRENT_PHASE.md. Identify: task title, files touched, scope type.
  CSS-only or text/content → skip ARCHITECTURE.md, DECISIONS.md, KNOWN_ISSUES.md
  JS logic changes → add ARCHITECTURE.md (Implementation Decisions section only)
  New feature / new flag / new modal variant → add ARCHITECTURE.md + DECISIONS.md
  Any scope → add KNOWN_ISSUES.md only if a known issue is relevant

Required (always):
1. HANDOVER.md
2. CURRENT_PHASE.md + current phase checklist from TASKS.md
3. Affected source file(s) — read before editing

Conditional (by scope, per Step 0):
4. ARCHITECTURE.md — Implementation Decisions section
5. DECISIONS.md — Implementation Decisions section only
6. KNOWN_ISSUES.md
```

---

### `update-handover.prompt.md` — revised required reading

```
Required:
1. HANDOVER.md — you will rewrite this
2. TASKS.md — current phase only; check off completed items
3. AGENT_LOG.md — you will prepend one entry

Conditional:
4. DECISIONS.md — only if an architectural choice was made this session

After updating HANDOVER.md:
- Update CURRENT_PHASE.md to reflect new phase/session/next task
- Review every open item in KNOWN_ISSUES.md; mark resolved or update status
```

Remove from required: `DECISIONS.md` (make conditional)

---

### `review-work.prompt.md` — add invocation trigger

Add to the prompt header:

```
## When to Use
Run this prompt:
- Before marking a phase complete that introduces a new UI element or modal variant
- Every 3rd phase if not already run (phases 3, 6, 9, 12, 15, 18…)
- When the user explicitly requests a review
```

---

### `create-new-task.prompt.md` — no changes needed

Required reading is correct for task planning. `TASKS.md` full read is appropriate here.

---

### `create-implementation-plan.prompt.md` — no changes needed

One-shot prompt; extensive required reading is appropriate for planning context.

---

## Part 4 — New File: `CURRENT_PHASE.md`

Propose adding this file to every new project at Phase 1 setup.
Template:

```markdown
# Current Phase

**Phase:** [number and name]
**Session:** [session label if split; otherwise same as phase]
**Next unchecked task:** [copy exact task text from TASKS.md]
**Files affected:** [comma-separated]
**Status:** [not started | in progress | complete]
**Last verified:** [brief description of last manual check result]
```

Maintained by `update-handover` after every session.
Read by `start-session` and `implement-next-task` in place of full `TASKS.md`.

---

## Summary: Priority Order for Next Project

| Priority | Change | Effort |
|---|---|---|
| High | Introduce `CURRENT_PHASE.md`; update all prompts to use it | Low (template + prompt edits) |
| High | Add scope-detection preamble to `implement-next-task` | Low (prompt edit only) |
| Medium | Reduce `start-session` required reading to 2 files | Low (prompt edit only) |
| Medium | Remove `DECISIONS.md` from `update-handover`; make conditional | Low (prompt edit only) |
| Medium | Add `KNOWN_ISSUES.md` maintenance rule to `update-handover` | Low (prompt edit only) |
| Medium | Add `review-work` invocation trigger (every 3rd phase) | Low (prompt edit only) |
| Low | Archive `PLAN.md` after Phase 1 approval | Low (file edit at Phase 1) |
| Low | Remove `## Current Task` dead field from `TASKS.md` template | Low |
| Low | Add `AGENT_LOG.md` strict-append rules to `update-handover` | Low (prompt edit only) |
| Low | Split `DECISIONS.md` into Constraints vs. Implementation Decisions | Low (file restructure) |
