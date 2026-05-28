# Agent Rules

This repository uses Markdown files as persistent project memory for coding agents.

Follow `.github/copilot-instructions.md` as the primary project instruction file.

## Start of Every Session

Before planning or changing files, read the relevant project context:

1. `.github/copilot-instructions.md`
2. `PLAN.md`
3. `HANDOVER.md`
4. `TASKS.md`
5. `ARCHITECTURE.md`
6. `DECISIONS.md`
7. `KNOWN_ISSUES.md`

If the task concerns game behavior, UI, interactions, or acceptance criteria, also read:

8. `docs/game-spec.md`

Do not rely only on chat history. Important project state belongs in the Markdown files.

## Planning Mode

When asked to plan:

- do not implement code
- do not create final implementation files unless explicitly asked
- produce a clear step-by-step plan
- identify affected files
- identify assumptions, risks, and open questions
- wait for user approval before implementation

During the first planning run, agents may update existing Markdown workflow files if the plan establishes clear rules, decisions, or architecture choices.

Keep updates concise and avoid duplicating `docs/game-spec.md`.

## Implementation Mode

When asked to implement:

- follow the current plan
- make small, focused, reviewable changes
- avoid over-engineering
- preserve the local `index.html` workflow
- do not add tools, frameworks, dependencies, or config files unless explicitly approved by the user

## Task Management

Use:

- `PLAN.md` for the overall project plan
- `TASKS.md` for concrete checkable tasks
- `HANDOVER.md` for current status and next steps
- `ARCHITECTURE.md` for structure and technical overview
- `DECISIONS.md` for architectural decisions
- `KNOWN_ISSUES.md` for known bugs, risks, and fragile behavior
- `AGENT_LOG.md` for completed work history

## End of Implementation Session

After implementation work, update:

1. `HANDOVER.md`
2. `TASKS.md`
3. `AGENT_LOG.md`

Also update `DECISIONS.md` if an architectural decision was made or changed.

The handover should include:

- what changed
- files changed
- checks performed
- what was not tested
- remaining issues
- next recommended step