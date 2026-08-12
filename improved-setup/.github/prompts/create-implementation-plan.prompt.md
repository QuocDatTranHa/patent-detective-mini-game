# Create Implementation Plan

Create a step-by-step implementation plan for this project.

Do not implement anything yet.

Do not create or modify implementation files such as source code or asset files.

Do not add frameworks, dependencies, package managers, build tools, backend code, databases, external APIs, or config files.

## Required Context

Before creating the plan, read:

1. `.github/copilot-instructions.md`
2. `AGENTS.md`
3. `PLAN.md`
4. `CURRENT_PHASE.md`
5. `HANDOVER.md`
6. `TASKS.md`
7. `ARCHITECTURE.md`
8. `DECISIONS.md`
9. `KNOWN_ISSUES.md`
10. `AGENT_LOG.md`
11. `docs/spec.md`

Use `docs/spec.md` as the source of truth for product behavior, interactions, acceptance criteria, and edge cases.

## Goal

Create a clear, phased implementation plan that a coding agent can execute session by session.

## Planning Requirements

The plan must include:

1. A short summary of the product goal
2. The proposed final file and folder structure
3. The recommended implementation phases
4. The files affected in each phase
5. Important assumptions
6. Risks and edge cases
7. Manual verification steps for each phase
8. Open questions, if any
9. The recommended first implementation task

## Session Sizing Rules

- Minimum 3 concrete checklist items per session
- Maximum ~10 concrete checklist items per session
- Each session must be focused on one coherent concern (CSS only, JS logic only, content only)
- Single-property adjustments that directly follow a calibration measurement belong in the same session as the measurement — do not split them out
- When in doubt, split rather than bundle

## Output Format

Present the plan as a series of numbered phases. Each phase should include:

- Phase number and name
- Goal (one sentence)
- Files touched
- Checklist of concrete tasks (`- [ ]`)
- Manual check step at the end

Keep the plan practical, small, and implementation-oriented.

## Approval Gate

After presenting the plan, wait for the user to approve it before taking any action.

Once the user approves:
1. Update `ARCHITECTURE.md` with the chosen architecture
2. Update `DECISIONS.md` with planning-phase constraints and any decisions made
3. Add phased implementation checklist to `TASKS.md`
4. Update `HANDOVER.md` with plan status
5. Update `CURRENT_PHASE.md` with Phase 1 details
6. Archive `PLAN.md` by replacing its content with: `Planning approved. Implementation tracked in TASKS.md.`

## Stop Rule

Stop after presenting the plan. Do not write any implementation files. Wait for user approval.
