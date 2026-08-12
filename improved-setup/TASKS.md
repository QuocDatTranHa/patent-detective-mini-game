# Tasks

Complete phased checklist for the Copilot Agent workflow.

> **Reading rule:** This file is read in full only when planning tasks (`create-new-task`, `create-implementation-plan`) or reviewing the complete checklist. For session-start orientation, read `CURRENT_PHASE.md` instead.
>
> No `## Current Task` field. Live status lives in `CURRENT_PHASE.md`.

---

## Done

- [ ] Create repository
- [ ] Create minimal Markdown scaffold
- [ ] Add `.github/copilot-instructions.md`
- [ ] Add `AGENTS.md`
- [ ] Add `TASKS.md`
- [ ] Add `HANDOVER.md`
- [ ] Add `CURRENT_PHASE.md`
- [ ] Add `ARCHITECTURE.md`
- [ ] Add `DECISIONS.md`
- [ ] Add `KNOWN_ISSUES.md`
- [ ] Add `AGENT_LOG.md`
- [ ] Add `PLAN.md`
- [ ] Add full project specification to `docs/spec.md`
- [ ] Create step-by-step implementation plan (`create-implementation-plan`)
- [ ] Update `ARCHITECTURE.md` with chosen architecture
- [ ] Update `DECISIONS.md` with planning-phase constraints and decisions
- [ ] Update `TASKS.md` with phased implementation checklist
- [ ] Update `HANDOVER.md` with plan status
- [ ] Update `CURRENT_PHASE.md` with Phase 1 details
- [ ] Archive `PLAN.md` after user approves the implementation plan

---

## Implementation Phases

Each phase is completed in one or more sessions.
Do not start a phase until the previous one passes its manual check.
**Minimum 3 concrete checklist items per session; maximum ~10.**
Single-property adjustments that directly follow a calibration step belong in the same session as the calibration.

---

### Phase 1 — [Phase name] ✓ / [in progress]

Goal: [one sentence describing what this phase delivers]

Files touched: [comma-separated list]

- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

Manual check: [describe what to verify in browser or terminal after this phase is complete]

---

### Phase 2 — [Phase name]

Goal: [one sentence]

Files touched: [comma-separated list]

- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

Manual check: [describe verification steps]

---

[Add further phases here. Completed phases are never deleted — they serve as a permanent record.]
