# Architecture

This file documents the technical architecture of the project.

## Status

Implementation plan created. Pending user approval before coding starts.

## Technical Boundaries

Use only:

* HTML
* CSS
* vanilla JavaScript
* local assets

Do not require:

* installation
* internet access
* build step
* local server
* package manager
* backend
* database
* external API

## Source of Truth

Game behavior, interactions, screens, modals, state requirements, and acceptance criteria belong in:

* `docs/game-spec.md`

---

## File Structure

```
index.html          ← single HTML file; all screens and modals live here
style.css           ← all layout, modal sizing, hotspot layer, hover indicators
script.js           ← state, screen flow, localization, modal control, reset
assets/
  backgrounds/      ← start-screen.png, game-screen.png, win-screen.png
  clues/            ← one PNG per item hotspot (see HOTSPOTS array in script.js)
                       safe-background.png (background for Tresor-Modal)
  ui/               ← flag-de.svg, flag-en.svg, hover-warning.svg, menu-background.png
```

No build step required. All paths are relative. Files are portable.

---

## Screen Structure

Three main screens, all present in the DOM simultaneously; only the active one is visible.

| ID             | Description                        |
|----------------|------------------------------------|
| `#screen-start` | Start screen with language toggle |
| `#screen-game`  | Game screen with hotspot layer     |
| `#screen-win`   | Win screen with restart button     |

One shared `#overlay` sits above the game canvas and blocks interactions when any modal is open.

---

## Modal Types

Three modals, all present in the DOM; only one may be visible at any time.

| ID              | Size              | Overlay-click closes? |
|-----------------|-------------------|-----------------------|
| `#modal-item`   | Large             | Yes                   |
| `#modal-safe`   | Medium-to-large   | Yes                   |
| `#modal-menu`   | Small             | Yes                   |

Overlay click calls `closeModal()` unconditionally (Decision 11 — overrides original spec).

A single `openModal(id)` / `closeModal()` pair manages state and overlay visibility.

---

## State Object

A single `gameState` object in `script.js` tracks all runtime state:

```js
const gameState = {
  screen: 'start',       // 'start' | 'game' | 'win'
  language: 'de',        // 'de' | 'en'
  openModal: null,       // null | 'item' | 'safe' | 'menu'
  safeDigits: [0,0,0,0], // current digit values
  safeErrorTimer: null,  // reference to active setTimeout or null
  activeItemIndex: null  // 0–9; which clue modal is shown
};
```

No localStorage or session persistence. Language survives restart only because `reset()` explicitly preserves `gameState.language`.

---

## Hotspot Configuration

All ten item hotspots and the safe hotspot are defined in a single array in `script.js`:

```js
const HOTSPOTS = [
  { id: 'item-1', top: '30%', left: '15%', clue: 'assets/clues/clue-01.png', title: { de: '…', en: '…' } },
  // …nine more entries
];
```

Positions are percentage-based relative to the game scene container so they scale with the browser window size.

---

## Localization

All visible strings live in a `STRINGS` map keyed by language code:

```js
const STRINGS = {
  de: { start: 'Start', restart: 'Spiel neustarten', close: 'Schließen', confirm: 'Bestätigen', error: 'Der Code ist nicht korrekt.', win: 'Glückwunsch!' },
  en: { start: 'Start', restart: 'Restart game',     close: 'Close',      confirm: 'Confirm',     error: 'The code is incorrect.',   win: 'Congratulations!' }
};
```

A `renderText()` helper updates all visible text nodes from `gameState.language`.

---

## Reset Logic

One shared `reset()` function:

1. Close and hide all modals
2. Clear overlay
3. Reset `safeDigits` to `[0,0,0,0]`
4. Clear any running `safeErrorTimer`
5. Switch screen to `'start'`
6. Call `renderText()` (language is intentionally NOT reset)

Called from both the menu modal restart button and the Win screen restart button.

---

## Manual Testing Approach

See `KNOWN_ISSUES.md` and the acceptance checklist in `TASKS.md`.

Minimum verification before marking any phase complete:

* open `index.html` directly in a modern browser (no server)
* test each listed behavior for the phase
* do not mark a phase complete without a live browser check
