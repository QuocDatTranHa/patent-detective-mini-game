# Tasks

This file tracks concrete project tasks for the Copilot Agent workflow.

## Done

- [x] Create repository
- [x] Create minimal Markdown scaffold
- [x] Add `.github/copilot-instructions.md`
- [x] Add `AGENTS.md`
- [x] Add `PLAN.md`
- [x] Add `TASKS.md`
- [x] Add `HANDOVER.md`
- [x] Add `ARCHITECTURE.md`
- [x] Add `DECISIONS.md`
- [x] Add `KNOWN_ISSUES.md`
- [x] Add `AGENT_LOG.md`
- [x] Add full game specification to `docs/game-spec.md`
- [x] Create step-by-step implementation plan
- [x] Update `ARCHITECTURE.md` with chosen architecture
- [x] Update `DECISIONS.md` with planning decisions
- [x] Update `TASKS.md` with phased implementation checklist
- [x] Update `HANDOVER.md` with plan status

## Current Task

Phase 2 abgeschlossen. Nächste Phase: **Phase 3 — Base layout, modal sizing, hotspot styling**.

---

## Implementation Phases

Each phase should be completed in its own session. Do not start a phase until the previous one passes its manual check.

### Phase 1 — Foundation and file skeleton ✓

Goal: create the minimum portable file structure with placeholder asset slots.

- [x] Create `index.html` with a minimal HTML5 shell (no game content yet)
- [x] Create `style.css` (empty or with CSS reset only)
- [x] Create `script.js` (empty or with `'use strict'` only)
- [x] Create `assets/backgrounds/` folder with three placeholder images (start, game, win)
- [x] Create `assets/clues/` folder with ten placeholder clue images (`clue-01.svg` … `clue-10.svg`)
- [x] Create `assets/ui/` folder with `flag-de.svg`, `flag-en.svg`, `hover-warning.svg`

Manual check: open `index.html` directly in a browser — page loads, no server required, no 404 errors in DevTools.

Note: Placeholder images created as `.svg` instead of `.png` — SVG is portable and works directly in all modern browsers. Filenames can be updated when final PNG assets arrive.

---

### Phase 2 — Static screen and modal markup ✓

Goal: build the full DOM skeleton for all screens, overlay, hotspots, and modals.

- [x] Add `#screen-start` with start button and language toggle button
- [x] Add `#screen-game` with background image, hotspot layer (10 items + safe hotspot), and menu button
- [x] Add `#screen-win` with congratulations text and restart button
- [x] Add `#overlay` (shared, hidden by default)
- [x] Add `#modal-item` (large; contains placeholder image, optional title, close button)
- [x] Add `#modal-safe` (medium; contains 4 digit boxes with up/down arrows, confirm button, close button, error text)
- [x] Add `#modal-menu` (small; contains restart button and close button)
- [x] Verify all text placeholders exist for localization in both languages

Manual check: inspect DOM in DevTools — three screens, one overlay, three modals all present; only Start screen visible initially.

Note: `data-text` attributes mark all localizable strings (keys: `start`, `restart`, `close`, `confirm`, `error`, `win`). `data-index="0"–3"` marks safe digit controls. Item hotspots are injected dynamically by JS (Phase 5) — only `#hotspot-safe` is static.

---

### Phase 3 — Base layout, modal sizing, hotspot styling

Goal: all screens look correct on a typical laptop browser; hotspots and modals are positioned properly.

- [ ] Style screens to fill the full viewport; only one visible at a time
- [ ] Background images fill their screen container
- [ ] Hotspot layer sits on top of the game background image using absolute/percentage positioning
- [ ] Each hotspot has a `cursor: pointer` and is otherwise invisible
- [ ] Hover indicator (warning triangle) appears on hotspot hover and disappears on mouse leave
- [ ] `#modal-item` takes up most of the viewport (large)
- [ ] `#modal-safe` is medium-to-large and centered
- [ ] `#modal-menu` is small and centered
- [ ] Overlay covers the full screen behind the modal
- [ ] Resize browser to several window sizes and confirm layout does not break

Manual check: hover over each hotspot area — warning indicator appears/disappears; modals show at correct sizes when forced visible via DevTools.

---

### Phase 4 — State model, screen flow, localization

Goal: the game starts on the Start screen in German and navigates correctly; language toggle works.

- [ ] Define `gameState` object (`screen`, `language`, `openModal`, `safeDigits`, `safeErrorTimer`, `activeItemIndex`)
- [ ] Define `STRINGS` map for all visible de/en text
- [ ] Implement `renderText()` to apply `STRINGS[gameState.language]` to all visible text nodes
- [ ] Implement `showScreen(name)` to switch between `start`, `game`, `win`
- [ ] Wire Start button → `showScreen('game')`
- [ ] Wire language toggle → flip `gameState.language`, call `renderText()`, update flag image
- [ ] Language toggle only visible on Start screen
- [ ] Call `renderText()` on page load

Manual check: load game in German, toggle to English (all text changes, flag switches), toggle back, click Start and confirm Game screen appears.

---

### Phase 5 — Item hotspot and clue modal system

Goal: all ten hotspots open correct clue modals; single-modal rule enforced; overlay blocks background.

- [ ] Define `HOTSPOTS` array (10 entries with percentage position, clue image path, localized title)
- [ ] Render hotspot elements dynamically from `HOTSPOTS`
- [ ] Implement `openModal('item', index)` — shows `#modal-item`, populates clue image and title, activates overlay
- [ ] Implement `closeModal()` — hides modal, deactivates overlay, clears `gameState.openModal`
- [ ] Wire close button inside `#modal-item` to `closeModal()`
- [ ] Block all hotspot clicks and hover effects while any modal is open
- [ ] Clicking the overlay does NOT close `#modal-item`

Manual check: click each of the ten hotspots; confirm correct clue content, overlay blocks background, close button works, clicking outside does nothing.

---

### Phase 6 — Safe modal and code validation

Goal: safe modal works with cyclic digits; wrong code shows 1.5 s error without clearing digits; correct code opens Win screen.

- [ ] Wire safe hotspot → `openModal('safe')`
- [ ] Render 4 digit boxes from `gameState.safeDigits`
- [ ] Up arrow: increment digit cyclically (9 → 0), update display
- [ ] Down arrow: decrement digit cyclically (0 → 9), update display
- [ ] Confirm button: compare digits against `[9,1,2,6]`
- [ ] Wrong code: show error text, auto-hide after 1500 ms, keep modal open, keep digits
- [ ] If error already visible when confirm pressed again: restart the 1500 ms timer cleanly
- [ ] Correct code: call `showScreen('win')`, close modal
- [ ] Close button: `closeModal()`; overlay click does NOT close safe modal

Manual check: enter wrong code twice in a row; confirm error reappears cleanly. Enter `9 1 2 6` and confirm Win screen appears.

---

### Phase 7 — Menu modal and full reset

Goal: menu modal opens/closes correctly; restart from menu and from Win screen both fully reset game state.

- [ ] Wire menu button → `openModal('menu')`
- [ ] Overlay click closes `#modal-menu` (this is the only modal where overlay-click closes)
- [ ] Close button inside `#modal-menu` calls `closeModal()`
- [ ] Implement `reset()`: close modals, clear overlay, reset `safeDigits` to `[0,0,0,0]`, clear `safeErrorTimer`, set `screen` to `'start'`, call `renderText()` — do NOT reset `language`
- [ ] Wire restart button in `#modal-menu` → `reset()`
- [ ] Wire restart button in `#screen-win` → `reset()`

Manual check: restart from menu mid-game; confirm Start screen, German/English preserved, safe reset to 0000. Restart from Win screen; same checks.

---

### Phase 8 — End-to-end browser verification and documentation update

Goal: full playthrough passes all acceptance criteria; workflow docs updated.

- [ ] Full manual playthrough: start → game → all 10 hotspots → menu restart → start → game → safe (wrong codes) → correct code → win screen → restart
- [ ] Verify hover indicators disappear when any modal is open
- [ ] Verify language persists after restart
- [ ] Verify double-click does not open two modals
- [ ] Resize browser; confirm usability on typical laptop window sizes
- [ ] Update `HANDOVER.md` with what was implemented, what was tested, and what remains
- [ ] Update `AGENT_LOG.md` with completed work
- [ ] Update `TASKS.md` to mark completed items
- [ ] Update `README.md` — include section on agent workflow showing the prompt sequence: `start-session` → `implement-next-task` → `review-work` → `update-handover`

Manual check: full playthrough in at least one modern browser (Chrome or Firefox) starting from `index.html` with no local server.

---

## Acceptance Checklist

The implementation is not complete until all of these pass:

- [ ] Game starts on Start Screen in German
- [ ] Playable by opening `index.html` directly — no installation, internet, or build step
- [ ] Language toggle on Start Screen works (de ↔ en); flag icon reflects current language
- [ ] Language toggle not visible on Game or Win screen
- [ ] Game Screen has exactly 10 clickable item hotspots
- [ ] Hover indicator appears on hotspot hover; disappears on mouse leave
- [ ] Hover indicators disabled while any modal is open
- [ ] Item modals open and close correctly; overlay blocks background; overlay click does NOT close item modal
- [ ] Only one modal can be open at a time
- [ ] Safe modal: digits cycle 0–9 in both directions
- [ ] Safe modal: wrong code shows error for ~1.5 s, keeps modal open, keeps digits
- [ ] Safe modal: correct code `9 1 2 6` switches to Win Screen
- [ ] Menu modal: overlay click closes it; close button closes it; restart button resets game
- [ ] Win Screen restart button resets game
- [ ] Restart fully resets state (all modals closed, safe = 0000, error cleared, overlay off, Start screen shown)
- [ ] Language is preserved across restart