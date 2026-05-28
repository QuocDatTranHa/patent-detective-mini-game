# Known Issues

This file tracks known bugs, risks, fragile behavior, and testing notes.

Keep entries concise.

## Current Status

No game implementation exists yet.

Therefore, there are no confirmed implementation bugs yet.

## Known Risks

### 1. Over-engineering risk

The project must remain a simple local browser game.

Avoid adding frameworks, dependencies, package managers, build steps, servers, or backend logic unless explicitly approved by the user.

### 2. Portability risk

The finished game must work after copying the project folder to another laptop and opening `index.html` directly in a modern browser.

Avoid anything that requires installation, internet access, a local server, or generated build files.

### 3. Specification drift risk

Game behavior must follow `docs/game-spec.md`.

Do not duplicate the full specification across multiple files.

If behavior is unclear, ask the user or document the assumption before implementing.

### 4. Modal interaction risk

The game requires strict modal behavior.

Only one modal may be open at a time, and background interactions must be blocked while a modal is open.

### 5. Reset logic risk

Restart must fully reset the game state.

This must be manually checked after implementation.

## Manual Testing Notes

After implementation, manually test at least:

* opening the game through `index.html`
* start screen to game screen
* all 10 item hotspots
* item hover indicators
* item modals
* safe modal
* wrong code behavior
* correct code `9 1 2 6`
* win screen
* restart from menu
* restart from win screen
* modal blocking behavior

## Update Rule

When a bug or fragile behavior is found, add:

* issue
* affected behavior
* current status
* possible fix or next step

Remove or update issues once they are resolved.
