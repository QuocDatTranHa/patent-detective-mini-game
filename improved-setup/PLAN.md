# Project Plan

> **Lifecycle of this file:**
> While planning is in progress, this file contains the full implementation plan.
> After the user approves the plan, **replace the entire content of this file with a single line:**
>
>     Planning approved. Implementation tracked in TASKS.md.
>
> Never update `PLAN.md` after it has been archived. All tracking moves to `TASKS.md`.
> This file is only required by `create-implementation-plan`, which is a one-shot prompt.

---

## Project Goal

[Replace with: one paragraph describing what this project builds, who uses it, and why it exists.]

## Current Phase

Pre-implementation planning.

No implementation should start until the specification has been reviewed and a step-by-step implementation plan has been created and approved by the user.

## Source of Truth

| Content type | File |
|---|---|
| Product behavior, interactions, acceptance criteria | `docs/spec.md` |
| Agent workflow and project rules | `.github/copilot-instructions.md`, `AGENTS.md` |
| Live project status | `CURRENT_PHASE.md`, `HANDOVER.md` |
| Full task checklist | `TASKS.md` |
| Completed work archive | `AGENT_LOG.md` |
| Architecture and decisions | `ARCHITECTURE.md`, `DECISIONS.md` |

## Planning Workflow

Before implementation starts, the agent should:

1. Read `.github/copilot-instructions.md`
2. Read `AGENTS.md`
3. Read `PLAN.md` (this file)
4. Read `CURRENT_PHASE.md`
5. Read `HANDOVER.md`
6. Read `TASKS.md`
7. Read `ARCHITECTURE.md`
8. Read `DECISIONS.md`
9. Read `KNOWN_ISSUES.md`
10. Read `docs/spec.md`
11. Create a step-by-step implementation plan
12. Identify the final file and folder structure
13. Identify risks, assumptions, and edge cases
14. Wait for user approval before writing any implementation files
