# Implement Next Task

Implement the next incomplete phase from `TASKS.md`.

## Required Reading

Before writing any code, read:

1. `HANDOVER.md` — current status and last known state
2. `TASKS.md` — find the first phase with unchecked tasks
3. `ARCHITECTURE.md` — file structure, state object, modal strategy, hotspot config
4. `DECISIONS.md` — accepted technical decisions; follow them without reopening them
5. `KNOWN_ISSUES.md` — known fragile behavior to watch out for

Only read `docs/game-spec.md` if a specific behavior is unclear from `ARCHITECTURE.md`, `DECISIONS.md`, or the phase checklist in `TASKS.md`. It was already read in `start-session` and does not need to be re-read every time.

If implementation files already exist (`index.html`, `style.css`, `script.js`), read the relevant sections before editing.

## Implementation Rules

- Implement only the tasks listed in the current phase. Do not jump ahead.
- Follow `ARCHITECTURE.md` for all technical decisions (state model, modal handling, hotspot config format, localization approach).
- If a specific behavior is ambiguous, check the relevant section of `docs/game-spec.md` before guessing. Note any assumption made.
- Keep the implementation simple and focused. No over-engineering.
- Do not add frameworks, dependencies, build tools, or external resources.
- All asset paths must be relative and local.
- Do not touch files outside the current phase scope unless strictly necessary.

## After Implementing

Run the manual check listed at the end of the current phase in `TASKS.md`.

State clearly:
- what was implemented
- what the manual check result was
- what was NOT tested
- any assumptions made

Do not update `HANDOVER.md`, `TASKS.md`, or `AGENT_LOG.md` here — use the `update-handover` prompt for that.

## Stop Rule

Stop after implementing and reporting the manual check result.

Do not continue to the next phase without user confirmation.
