# Update Handover

Update the project documentation after a phase has been implemented and verified.

## When to Use This

Use this prompt after:

- A phase or session from `TASKS.md` has been fully implemented
- The manual check for that phase has been run
- The user has confirmed the phase is complete

Do not use this prompt mid-phase or before the manual check.

## Required Reading

Before updating, read:

1. `HANDOVER.md` — current state; you will fully rewrite this
2. `TASKS.md` — current phase; you will check off completed items
3. `AGENT_LOG.md` — you will prepend one new entry

Conditional:

4. `DECISIONS.md` — read **only** if an architectural choice was made during this session that deviates from or extends an existing decision. Otherwise skip it entirely.

## What to Update

### 1. `TASKS.md`

- Check off all completed tasks in the finished phase
- If the entire phase is done, mark the phase heading as complete (add ✓)
- Do not check off items that were not actually implemented or tested

### 2. `HANDOVER.md`

**Fully rewrite** the file content (replace everything below the header). Include:

- **Current Status**: which phase just finished; what was implemented (1–3 sentences)
- **Completed So Far**: brief cumulative list, one line per phase
- **Files Changed (Last Session)**: which files were created or modified, and what changed
- **Manual Check Results**: what was tested and the result — be specific
- **What Was Not Tested**: be honest; "Nothing remaining" is acceptable if everything was verified
- **Known Issues**: anything fragile or incomplete
- **Next Recommended Step**: which phase/session is next and what the first task is

### 3. `CURRENT_PHASE.md`

Rewrite the file to reflect the new state:

```markdown
# Current Phase

> Maintained by `update-handover` after every session.
> Replaces full `TASKS.md` reads at session start.
> Keep under 20 lines. Never add history here — that belongs in `AGENT_LOG.md`.

---

**Phase:** [number and name]
**Session:** [session label if split; otherwise same as Phase]
**Next unchecked task:** [exact text copied from TASKS.md]
**Files affected:** [comma-separated list]
**Status:** [not started | in progress | complete]
**Last verified:** [brief description of last manual check result]
```

### 4. `AGENT_LOG.md`

Prepend one entry at the very top of the file. Strict rules:

- Title format: `## Phase X — Session Y — [short description]`
- Always write in English
- Only record **completed** work — never planning notes, never "status: planned"
- **Summarize from `HANDOVER.md`** — do not write original prose
- Planning notes belong only in `HANDOVER.md` under "Next Recommended Step", never here

### 5. `KNOWN_ISSUES.md`

After updating `HANDOVER.md`, review every open item in `KNOWN_ISSUES.md`:

- Remove items that are fully resolved
- Update the status of items that changed this session
- **No open item may survive more than 2 phases without a status update**

### 6. `DECISIONS.md` (only if needed)

If a new technical decision was made during implementation that is not yet recorded:

- Add a concise entry under the **Implementation Decisions** section only
- Do not add entries under Project Constraints — those are set at project start
- Do not add decisions that were already captured during planning

## Rules

- Do not add dates, timestamps, or "Last Updated" lines to any file
- Do not check off items that were not implemented or tested
- Do not add planning notes to `AGENT_LOG.md`
- `HANDOVER.md` is always a full rewrite, never an append
- `AGENT_LOG.md` is always an append (prepend), never a full rewrite
