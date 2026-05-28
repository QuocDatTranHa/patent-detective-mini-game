# Project Plan

## Project Goal

Build a simple, fully local browser-based point-and-click mini game.

The finished game must be portable: a user should be able to copy the project folder to another laptop and play the game by opening `index.html` directly in a modern browser.

## Current Phase

Pre-implementation planning.

The repository contains the Markdown workflow files needed for a GitHub Copilot Agent workflow.

The detailed game specification is available in:

- `docs/game-spec.md`

No game implementation should start until the specification has been reviewed and an implementation plan has been created and approved.

## Source of Truth

Game behavior and acceptance criteria belong in:

- `docs/game-spec.md`

Agent workflow and project rules belong in:

- `.github/copilot-instructions.md`
- `AGENTS.md`

Project state and progress belong in:

- `HANDOVER.md`
- `TASKS.md`
- `AGENT_LOG.md`

Architecture and project decisions belong in:

- `ARCHITECTURE.md`
- `DECISIONS.md`

## Planning Workflow

Before implementation starts, the Copilot Agent should:

1. Read `.github/copilot-instructions.md`
2. Read `AGENTS.md`
3. Read this `PLAN.md`
4. Read `HANDOVER.md`
5. Read `TASKS.md`
6. Read `ARCHITECTURE.md`
7. Read `DECISIONS.md`
8. Read `KNOWN_ISSUES.md`
9. Read `docs/game-spec.md`
10. Create a step-by-step implementation plan
11. Identify the final file structure
12. Identify risks, assumptions, and edge cases
13. Wait for user approval before implementing

During the first planning run, the agent may update existing Markdown workflow files if clear rules, decisions, or architecture choices are established.

Keep such updates concise and avoid duplicating `docs/game-spec.md`.

## Planned Milestones

1. [x] Review all workflow files
2. [x] Review the full game specification
3. [x] Create the implementation plan
4. [ ] Review and approve the implementation plan
5. [ ] **Phase 1** — Create final file and folder structure (index.html, style.css, script.js, assets/)
6. [ ] **Phase 2** — Build static screen and modal markup
7. [ ] **Phase 3** — Add base layout, modal sizing, hotspot styling
8. [ ] **Phase 4** — Implement state model, screen flow, localization
9. [ ] **Phase 5** — Implement item hotspot and clue modal system
10. [ ] **Phase 6** — Implement safe modal and code validation
11. [ ] **Phase 7** — Implement menu modal and full reset
12. [ ] **Phase 8** — End-to-end browser verification and documentation update

See `TASKS.md` for the detailed per-phase checklists and manual test steps.

## Next Recommended Step

The project must remain simple, local, and portable.

Do not add:

- frameworks
- dependencies
- package managers
- build steps
- local servers
- backend services
- databases
- external APIs

Only add them if the user explicitly changes the project direction.

## Next Recommended Step

Ask the VS Code Copilot Agent to create a step-by-step implementation plan based on the existing project context and `docs/game-spec.md`.

Do not implement before the user has reviewed and approved the plan.