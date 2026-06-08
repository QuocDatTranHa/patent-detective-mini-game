# Known Issues

This file tracks known bugs, risks, fragile behavior, and testing notes.

Keep entries concise.

## Current Status

Phase 9 not started. Core game mechanics are complete and browser-verified via full end-to-end playthrough. The following items remain open.

## Open Items

### 1. White text areas in popup windows have no content

Each item modal (and possibly safe/menu modals) has a white area intended for explanatory text.
No German or English text has been written or wired up yet.
**Next step:** write copy for each popup, add to `STRINGS` in `script.js`, wire to `renderText()`.
UI layout adjustments will likely be needed after text is in place.

### 2. Full playthrough not yet confirmed with DevTools console open

No JS error check has been run. May reveal silent errors not visible in normal play.
**Next step:** open `index.html` in Chrome, press F12, check Console tab for red errors.

## Known Risks

### Portability

The game must work after copying the folder to another laptop and opening `index.html` directly.
Avoid anything that requires installation, internet access, a local server, or build files.
All asset paths must remain relative.

### Modal interaction

Only one modal may be open at a time.
Background interactions must be blocked while any modal is open.
Overlay click closes any open modal (Decision 11).

### Reset logic

Restart must fully reset all state except language.
`reset()` covers: `safeDigits`, `safeErrorTimer`, `openModal`, `activeItemIndex`, `screen`.
Language is intentionally preserved.
* restart from win screen
* modal blocking behavior

## Update Rule

When a bug or fragile behavior is found, add:

* issue
* affected behavior
* current status
* possible fix or next step

Remove or update issues once they are resolved.

## Phase 13 Risks

### Game screen hotspot count deviation

The original game-spec and acceptance checklist require "exactly 10 clickable item hotspots" on the game screen. Phase 14 adds an 11th item hotspot (Patent Archive monitor). This is a user-approved deviation from the spec.

### Start screen modal interaction

When a modal is opened from the start screen, the overlay blocks the start screen including the Start button. This is correct and intentional behavior. However, `reset()` must still close any open modal regardless of which screen triggered it — verify this in browser after 13-B.

### Invention-Disclosure textBox calibration

The `textBox` property on the start screen HOTSPOTS entry defaults to game-screen defaults (`left: 48%`). The actual white panel position in the Invention-Disclosure image may differ. Pixel-level calibration may be needed after 13-B is implemented.
**Next step:** Verify in browser after 13-B; adjust `textBox` if text overlaps the neon border.
