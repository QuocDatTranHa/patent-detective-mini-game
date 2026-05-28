# Create Implementation Plan

Create a step-by-step implementation plan for this project.

Do not implement the game yet.

Do not create or modify implementation files such as:

* `index.html`
* `style.css`
* `script.js`
* `assets/`

Do not add frameworks, dependencies, package managers, build tools, backend code, databases, external APIs, or config files.

## Required Context

Before creating the plan, read:

1. `.github/copilot-instructions.md`
2. `AGENTS.md`
3. `PLAN.md`
4. `HANDOVER.md`
5. `TASKS.md`
6. `ARCHITECTURE.md`
7. `DECISIONS.md`
8. `KNOWN_ISSUES.md`
9. `AGENT_LOG.md`
10. `docs/game-spec.md`

Use `docs/game-spec.md` as the source of truth for game behavior, interactions, acceptance criteria, and edge cases.

## Goal

Create a clear implementation plan for a simple, fully local browser-based point-and-click mini game.

The finished game must be playable by copying the project folder to another laptop and opening `index.html` directly in a modern browser.

The implementation must use only:

* HTML
* CSS
* vanilla JavaScript
* local assets

## Planning Requirements

Your plan must include:

1. A short summary of the game goal
2. The proposed final file and folder structure
3. The recommended implementation phases
4. The files affected in each phase
5. Important assumptions
6. Risks and edge cases
7. Manual browser testing steps
8. Open questions, if any
9. The recommended first implementation task

Keep the plan practical, small, and implementation-oriented.

Avoid over-engineering.

Avoid duplicating the full content of `docs/game-spec.md`.

## Markdown Workflow File Updates

During this first planning run, you may update existing Markdown workflow files if the plan establishes clear rules, decisions, or architecture choices.

Allowed Markdown updates include:

* `PLAN.md`
* `TASKS.md`
* `HANDOVER.md`
* `ARCHITECTURE.md`
* `DECISIONS.md`
* `KNOWN_ISSUES.md`
* `AGENT_LOG.md`

Keep these updates concise.

Do not copy the full game specification into other files.

If you are unsure whether a Markdown update is necessary, propose the update instead of applying it.

## Output Format

Return the result in this structure:

## Implementation Plan Summary

Briefly summarize the intended implementation.

## Proposed Final File Structure

Show the recommended final structure.

## Implementation Phases

List the phases in order.

For each phase, include:

* goal
* affected files
* expected result
* manual check

## Risks and Edge Cases

List the most important risks from `docs/game-spec.md`.

## Markdown Updates

State which Markdown files you updated or recommend updating.

## Next Recommended Step

State the first implementation task that should be done after the user approves this plan.

## Stop Rule

Stop after creating the implementation plan.

Do not implement the game before the user has reviewed and approved the plan.
