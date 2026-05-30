# Known Issues

This file tracks known bugs, risks, fragile behavior, and testing notes.

Keep entries concise.

## Current Status

Phase 8 in progress. Core implementation is complete and browser-verified for basic flow. The following items remain open.

## Open Items

### 1. Clue images are placeholder PNGs

All 10 files in `assets/clues/` are auto-generated dark placeholders.
Full playthrough cannot be evaluated until final artwork is in place.
**Next step:** replace each file with final image — filenames must match exactly:
`game-instructor.png`, `easter-egg.png`, `r-clue-keypad.png`, `r-clue-energy.png`,
`r-clue-chair.png`, `i-clue-microscope.png`, `r-clue-wheel.png`, `i-clue-3dprinter.png`,
`i-clue-measure.png`, `i-clue-whiteboard.png`.

### 2. Full playthrough not yet run

No end-to-end test has been completed with the final background images.
Hotspot positions were measured via browser click logger but have not been
confirmed by clicking all 11 elements and verifying correct modal opens.

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
