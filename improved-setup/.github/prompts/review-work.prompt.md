# Review Work

Review the current implementation against the product specification and the current phase checklist.

## When to Use

Run this prompt:

- **Every 3rd phase** if not already run (e.g. after phases 3, 6, 9, 12, 15…)
- **Before marking a phase complete** that introduces a new publicly-visible UI element or major behavior change
- **When the user explicitly requests a review**

Do not skip this prompt when the review gate is triggered in `implement-next-task`.

## Required Reading

Before reviewing, read:

1. `TASKS.md` — identify the current phase and its manual check requirements
2. `ARCHITECTURE.md` — verify the implementation matches the agreed technical approach (Implementation Decisions section)
3. `KNOWN_ISSUES.md` — check if any known issues are relevant to what is being reviewed

Then read the current implementation files:

- [List source files relevant to this project — e.g. `index.html`, `style.css`, `script.js`]

Only read `docs/spec.md` if a specific behavior being reviewed is not covered by `ARCHITECTURE.md` or the phase checklist.

## What to Check

### Current phase

- Are all tasks in the current phase checklist satisfied?
- Does the implementation match the manual check description for this phase?

### Overall spec compliance

[Replace this section with the core acceptance criteria for this project. Example:]

- Exactly [N] screens: [list them]
- Exactly [N] interactive components of type [X]
- Only one modal open at a time
- Background interactions blocked while any modal is open
- Restart fully resets all state except [preserved fields]
- All assets are local; no external URLs

### Code quality

- Are all technical rules from `.github/instructions/project.instructions.md` being followed?
- Is the state model being used correctly (no state stored outside the state object)?
- Are there any obvious security issues (inline event handler injections, eval, external URLs)?

## Output Format

Report in three sections:

### Passes
List what works correctly and matches the spec.

### Failures or Gaps
List what does not work or is missing. Be specific: which file, which behavior, which spec requirement.

### Recommendations
List concrete fixes for each failure or gap. Do not implement them here — describe what needs to change.

## Stop Rule

Stop after producing the review report. Do not implement fixes. Wait for the user to decide the next step.
