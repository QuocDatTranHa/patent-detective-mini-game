# Update Handover

Update the project documentation after a phase has been implemented and verified.

## When to Use This

Use this prompt after:

- A phase from `TASKS.md` has been fully implemented
- The manual check for that phase has been run
- The user has confirmed the phase is complete

Do not use this prompt mid-phase or before the manual check.

## Required Reading

Before updating, read:

1. `HANDOVER.md` — current state; you will update this
2. `TASKS.md` — current phase; you will check off completed items
3. `AGENT_LOG.md` — you will add a new log entry
4. `DECISIONS.md` — check if any new decisions were made during implementation that should be recorded

## What to Update

### `TASKS.md`

- Check off all completed tasks in the finished phase
- If the entire phase is done, mark the phase as complete
- Do not check off items that were not actually implemented or tested

### `HANDOVER.md`

Replace the current content with:

- **Current Status**: which phase just finished; what was implemented
- **Completed So Far**: brief cumulative list
- **Files Changed**: which files were created or modified
- **Manual Check Result**: what was tested and what the result was
- **What Was Not Tested**: be honest about untested behavior
- **Known Issues**: anything fragile or incomplete
- **Next Recommended Step**: which phase is next and what the first task is

### `AGENT_LOG.md`

Add a new entry at the top with:

- Phase completed
- Files changed
- Summary of what was implemented
- Manual check result
- What was not tested

### `DECISIONS.md` (only if needed)

If a new technical decision was made during implementation that is not yet recorded, add a concise entry.

Do not add decisions that were already captured during planning.

## Rules

- Keep all updates concise.
- Do not add dates, timestamps, or "Last Updated" lines to any file.
- Do not duplicate content from `docs/game-spec.md`.
- Do not fabricate test results — only report what was actually verified.

## Stop Rule

Stop after updating the documentation. Do not start the next phase.
