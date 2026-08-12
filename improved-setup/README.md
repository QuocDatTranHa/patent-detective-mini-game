# Improved Project Setup

A reusable template for agent-driven development projects using GitHub Copilot.

This setup incorporates all workflow improvements from the Phase 18 retrospective of the
`patent-detective-mini-game` project. It is documented in `WORKFLOW_REVIEW.md` in the parent repository.

Copy this folder to a new repository root and fill in the `[PLACEHOLDER]` sections to get started.

---

## Folder Structure

```
improved-setup/
├── README.md                                  ← This file
├── AGENTS.md                                  ← Agent rules (mirrors copilot-instructions for non-Copilot agents)
├── AGENT_LOG.md                               ← Append-only archive of completed work (newest at top)
├── ARCHITECTURE.md                            ← Project constraints + implementation decisions (two-section split)
├── CURRENT_PHASE.md                           ← Live 10–20 line status file; replaces full TASKS.md reads at session start
├── DECISIONS.md                               ← Project constraints (once) + implementation decisions (accumulated)
├── HANDOVER.md                                ← Current project snapshot; fully rewritten after every session
├── KNOWN_ISSUES.md                            ← Open bugs and fragile behavior; reviewed every session
├── PLAN.md                                    ← Initial implementation plan; archived after Phase 1 approval
├── TASKS.md                                   ← Full phased checklist; read in full only when planning
├── docs/
│   └── spec.md                                ← Source of truth for product behavior and acceptance criteria
└── .github/
    ├── copilot-instructions.md                ← Primary agent rules; loaded automatically by Copilot
    ├── instructions/
    │   └── project.instructions.md            ← Scoped coding rules for source files
    └── prompts/
        ├── start-session.prompt.md            ← Use at the start of every session
        ├── implement-next-task.prompt.md       ← Use when ready to implement
        ├── update-handover.prompt.md           ← Use after a phase is complete and verified
        ├── review-work.prompt.md               ← Use every 3rd phase or before major UI changes
        ├── create-new-task.prompt.md           ← Use to add tasks without starting implementation
        └── create-implementation-plan.prompt.md ← Use once at project start for initial planning
```

---

## File Purposes

| File | Purpose | Maintained by |
|---|---|---|
| `CURRENT_PHASE.md` | Live status: current phase, session, next task, files affected | `update-handover` (rewritten every session) |
| `HANDOVER.md` | Full snapshot of current project state | `update-handover` (fully rewritten every session) |
| `AGENT_LOG.md` | Archive of completed sessions | `update-handover` (one entry prepended per session) |
| `TASKS.md` | Full phased checklist with all sub-tasks | `update-handover` (check off) + `create-new-task` (add) |
| `ARCHITECTURE.md` | File structure, state model, technical approach | Set during planning; updated only when architecture changes |
| `DECISIONS.md` | Constraints (once) + implementation decisions (accumulated) | Set during planning; updated when new decisions are made |
| `KNOWN_ISSUES.md` | Open bugs and risks | `update-handover` (mandatory review every session) |
| `PLAN.md` | High-level implementation plan | Set during planning; archived after Phase 1 approval |
| `docs/spec.md` | Product behavior, interactions, acceptance criteria | Human-maintained; agents read, do not rewrite |
| `.github/copilot-instructions.md` | Primary agent rules (scope-based reading, workflow rules) | Project setup; updated if workflow rules change |
| `.github/instructions/project.instructions.md` | Scoped coding rules for source files | Project setup |

---

## Workflow Lifecycle

The standard session cycle has four steps:

```
1. start-session            →  Orient: read CURRENT_PHASE.md + HANDOVER.md; produce briefing
2. implement-next-task      →  Implement one phase/session using scope-based file loading; run manual check
3. review-work (every 3rd)  →  Formal review against spec and phase checklist
4. update-handover          →  Check off tasks; update HANDOVER.md, CURRENT_PHASE.md, AGENT_LOG.md
```

### When to use each prompt

| Prompt | When |
|---|---|
| `start-session` | Beginning of every work session, before any implementation |
| `implement-next-task` | After `start-session` confirms the next task |
| `update-handover` | After the phase is verified and the user confirms completion |
| `review-work` | Every 3rd phase; before any phase that ships new UI elements or major behavior |
| `create-new-task` | When the user describes work to add to the backlog |
| `create-implementation-plan` | Once at project start, before any code is written |

---

## Key Improvement: `CURRENT_PHASE.md`

The most important efficiency change in this setup.

**The problem it solves:** `TASKS.md` grows to 1000+ lines as phases accumulate. Every session-start read loaded hundreds of lines of completed, fully-checked-off work. At Phase 12 of the reference project, full `TASKS.md` reads were loading ~700 lines of irrelevant history.

**How it works:** `CURRENT_PHASE.md` is a 10–20 line file always kept current by `update-handover`. It contains exactly what agents need to orient themselves: current phase, current session, next unchecked task, files affected, and last verified status.

**Reading rules:**
- `start-session` reads `CURRENT_PHASE.md` instead of full `TASKS.md`
- `implement-next-task` reads `CURRENT_PHASE.md` first, then only the current phase section of `TASKS.md`
- `TASKS.md` is read in full only by `create-new-task` and `create-implementation-plan`

**Maintenance:** `update-handover` always rewrites `CURRENT_PHASE.md` alongside `HANDOVER.md`. They must stay in sync.

---

## Key Improvement: Scope-Based Reading

**The problem it solves:** Every `implement-next-task` session loaded `ARCHITECTURE.md`, `DECISIONS.md`, and `KNOWN_ISSUES.md` regardless of task type. For CSS-only or text-only sessions, these files were irrelevant — reading them wasted tokens without adding value.

**How it works:** Before loading any files, the agent identifies the task scope from `CURRENT_PHASE.md` and applies the minimum required-reading set:

| Task scope | Required files |
|---|---|
| CSS-only or text/content-only | `HANDOVER.md`, `CURRENT_PHASE.md`, affected source file(s) |
| JS logic changes | Above + `ARCHITECTURE.md` (Implementation Decisions only) |
| New feature / new component / new screen | Above + `DECISIONS.md` (Implementation Decisions only) |
| Any scope | `KNOWN_ISSUES.md` only if a known issue is directly relevant |

---

## Key Improvement: `DECISIONS.md` Two-Section Split

**The problem it solves:** Planning-era constraints ("use only local technologies", "plan before implementation") were re-read in every session alongside implementation decisions. The constraints never changed and were never referenced in implementation sessions — they were pure noise.

**How it works:** `DECISIONS.md` has two sections:

| Section | When to read |
|---|---|
| **Project Constraints** | Once at project start; never re-read in implementation sessions |
| **Implementation Decisions** | When a task touches state model, component config, or file structure |

The `implement-next-task` prompt explicitly instructs agents to read only the Implementation Decisions section.

---

## How Handovers Work

### `HANDOVER.md`

Full-rewrite file. Every session, `update-handover` replaces all content with the current state. Never append. Sections:

- Current Status
- Completed So Far
- Files Changed (Last Session)
- Manual Check Results
- What Was Not Tested
- Known Issues
- Next Recommended Step

### `AGENT_LOG.md`

Append-only archive. Every session, one entry is prepended at the top. The entry is a summary of `HANDOVER.md` — agents do not write original prose here.

**Strict rules:**
- One entry per completed session, prepended at the top
- Title format: `## Phase X — Session Y — [short description]`
- Always write in English
- Only record completed work — never planning notes, never "status: planned"
- Planning notes belong only in `HANDOVER.md` under "Next Recommended Step"

---

## `KNOWN_ISSUES.md` Maintenance

After every `update-handover` run:
- Review every open item
- Remove items that are fully resolved
- Update the status of any item that changed
- **No open item may survive more than 2 phases without a status update**

This rule prevents the accumulation of stale entries that misrepresent actual project health.

---

## `PLAN.md` Lifecycle

`PLAN.md` is a one-shot document:
1. Written during initial planning (via `create-implementation-plan`)
2. Reviewed and approved by the user
3. After approval, the file content is **replaced with a single line**: `Planning approved. Implementation tracked in TASKS.md.`
4. Never updated again — all tracking moves to `TASKS.md`

---

## Review Cadence

Run `review-work` every 3rd phase (phases 3, 6, 9, 12…) or before any phase that introduces a new publicly-visible UI element or major behavior change.

Do not skip the review gate. In the reference project, the review prompt was never explicitly invoked — all reviews happened informally as part of the manual check. This created a risk that spec regressions could accumulate undetected.

---

## Session Sizing Rules

- **Minimum 3 concrete checklist items per session**
- **Maximum ~10 concrete checklist items per session**
- Single-property CSS or text tweaks that directly follow a calibration step belong in the same session as the calibration — do not split them out
- Each session must be focused on one coherent concern (CSS only, JS logic only, content only)
- When in doubt, split rather than bundle

---

## Recommended Operating Procedures

### Starting a new project

1. Copy this folder to the new repository root
2. Fill in all `[PLACEHOLDER]` sections in:
   - `.github/copilot-instructions.md` (project description, technical constraints, project-specific rules)
   - `.github/instructions/project.instructions.md` (source file glob pattern, coding rules)
   - `docs/spec.md` (product behavior, acceptance criteria)
3. Run `create-implementation-plan` to produce the initial plan
4. Review and approve the plan with the user
5. After approval, archive `PLAN.md` (replace content with single line)
6. Begin implementation with `implement-next-task` for Phase 1

### Every session

1. Run `start-session` first — always
2. Confirm the briefing before implementing
3. Run `implement-next-task`
4. Run `review-work` if the review gate is triggered
5. Run `update-handover` after the user confirms the phase is complete

### Never

- Do not skip `update-handover` — the project memory is unreliable without it
- Do not add planning notes to `AGENT_LOG.md`
- Do not append to `HANDOVER.md` — always fully rewrite it
- Do not leave stale entries in `KNOWN_ISSUES.md` across more than 2 phases
- Do not re-read `ARCHITECTURE.md` or `DECISIONS.md` for CSS-only tasks

---

## Source Reference

All improvements in this setup are documented with findings and rationale in:
`WORKFLOW_REVIEW.md` (in the parent repository root)
