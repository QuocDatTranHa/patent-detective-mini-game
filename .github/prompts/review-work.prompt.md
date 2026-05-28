# Review Work

Review the current implementation against the game specification and the current phase checklist.

## Required Reading

Before reviewing, read:

1. `TASKS.md` — identify the current phase and its manual check requirements
2. `ARCHITECTURE.md` — verify that the implementation matches the agreed technical approach
3. `KNOWN_ISSUES.md` — check if any known issues are relevant

Only read `docs/game-spec.md` if a specific behavior being reviewed is not covered by `ARCHITECTURE.md` or the checklist below. It was already read in `start-session` and does not need to be re-read every time.

Then read the current implementation files:

- `index.html`
- `style.css`
- `script.js`

## What to Check

For the current phase:

- Are all tasks in the current phase checklist satisfied?
- Does the implementation match the manual check description for this phase?

For the overall spec:

- Exactly 3 screens: Start, Game, Win
- Exactly 10 clickable item hotspots
- Only one modal open at a time
- Background interactions blocked while any modal is open
- Overlay-click closes menu modal only; not item or safe modals
- Safe digits cycle 0–9 in both directions
- Correct code `9 1 2 6` → Win screen immediately
- Wrong code → 1.5 s error message, modal stays open, digits preserved
- Restart resets all state except language
- Language toggle only visible on Start screen
- All assets are local; no external URLs

## Output Format

Report in three sections:

### Passes
List what works correctly.

### Failures or Gaps
List what does not work or is missing. Be specific: which file, which behavior, which spec section.

### Recommendations
List concrete fixes. Do not implement them here — just describe what needs to change.

## Stop Rule

Stop after producing the review. Do not implement fixes. Let the user decide the next step.
