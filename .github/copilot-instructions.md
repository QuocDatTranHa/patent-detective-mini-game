# GitHub Copilot Instructions

This repository contains a simple local browser-based point-and-click mini game.

Keep the project intentionally simple, portable, and easy to understand.

## Technical Constraints

The game must be fully local and portable.

A user must be able to copy the project folder to another laptop and play the game by opening `index.html` directly in a modern browser.

Use only:

- HTML
- CSS
- vanilla JavaScript
- local assets

The playable game must not require:

- installation
- internet access
- a build step
- a local server
- package managers
- backend services
- databases
- external APIs

Do not add tools, frameworks, dependencies, or config files unless explicitly approved by the user.

## Required Context Before Work

Before planning or changing files, read the relevant project context:

1. `AGENTS.md`
2. `PLAN.md`
3. `HANDOVER.md`
4. `TASKS.md`
5. `ARCHITECTURE.md`
6. `DECISIONS.md`
7. `KNOWN_ISSUES.md`

If the task affects game behavior, UI, interactions, or acceptance criteria, also read:

8. `docs/game-spec.md`

## Workflow Rules

For planning tasks:

- Plan first.
- Do not implement code unless explicitly asked.
- Identify affected files, assumptions, risks, and next steps.

During the first planning run, the agent may update Markdown workflow files if clear rules, decisions, or architecture choices are established.

Keep such updates concise and avoid duplicating `docs/game-spec.md`.

For implementation tasks:

- Follow the current plan.
- Keep changes small, simple, and focused.
- Avoid over-engineering.
- Do not introduce dependencies or infrastructure unless approved.
- Preserve the intended local `index.html` workflow.

After implementation sessions:

- Update `HANDOVER.md`.
- Update `TASKS.md`.
- Update `AGENT_LOG.md`.
- Update `DECISIONS.md` if an architectural decision was made or changed.

## Game Rules

Follow `docs/game-spec.md` as the source of truth for game behavior.

Core constraints:

- exactly 3 main screens: Start Screen, Game Screen, Win Screen
- exactly 10 clickable item hotspots
- one safe/code modal
- one menu modal
- only one modal may be open at a time
- background interactions are blocked while a modal is open
- the correct safe code is `9 1 2 6`
- restart must fully reset the game state

## Completion Rule

Do not mark implementation work as complete without checking the relevant behavior manually in a browser or clearly stating what was not tested.