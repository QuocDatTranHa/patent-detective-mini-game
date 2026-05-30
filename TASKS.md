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

- [x] Style screens to fill the full viewport; only one visible at a time
- [x] Background images fill their screen container
- [x] Hotspot layer sits on top of the game background image using absolute/percentage positioning
- [x] Each hotspot has a `cursor: pointer` and is otherwise invisible
- [x] Hover indicator (warning triangle) appears on hotspot hover and disappears on mouse leave
- [x] `#modal-item` takes up most of the viewport (large)
- [x] `#modal-safe` is medium-to-large and centered
- [x] `#modal-menu` is small and centered
- [x] Overlay covers the full screen behind the modal
- [x] Resize browser to several window sizes and confirm layout does not break

Manual check: hover over each hotspot area — warning indicator appears/disappears; modals show at correct sizes when forced visible via DevTools.

---

### Phase 4 — State model, screen flow, localization

Goal: the game starts on the Start screen in German and navigates correctly; language toggle works.

- [x] Define `gameState` object (`screen`, `language`, `openModal`, `safeDigits`, `safeErrorTimer`, `activeItemIndex`)
- [x] Define `STRINGS` map for all visible de/en text
- [x] Implement `renderText()` to apply `STRINGS[gameState.language]` to all visible text nodes
- [x] Implement `showScreen(name)` to switch between `start`, `game`, `win`
- [x] Wire Start button → `showScreen('game')`
- [x] Wire language toggle → flip `gameState.language`, call `renderText()`, update flag image
- [x] Language toggle only visible on Start screen
- [x] Call `renderText()` on page load

Manual check: load game in German, toggle to English (all text changes, flag switches), toggle back, click Start and confirm Game screen appears.

---

### Phase 5 — Item hotspot and clue modal system

Goal: all ten hotspots open correct clue modals; single-modal rule enforced; overlay blocks background.

- [x] Define `HOTSPOTS` array (10 entries with percentage position, clue image path, localized title)
- [x] Render hotspot elements dynamically from `HOTSPOTS`
- [x] Implement `openModal('item', index)` — shows `#modal-item`, populates clue image and title, activates overlay
- [x] Implement `closeModal()` — hides modal, deactivates overlay, clears `gameState.openModal`
- [x] Wire close button inside `#modal-item` to `closeModal()`
- [x] Block all hotspot clicks and hover effects while any modal is open
- [x] Clicking the overlay closes `#modal-item` (Decision 11 — overrides original spec)

Manual check: click each of the ten hotspots; confirm correct clue content, overlay blocks background, close button works, clicking outside does nothing.

---

### Phase 6 — Safe modal and code validation

Goal: safe modal works with cyclic digits; wrong code shows 1.5 s error without clearing digits; correct code opens Win screen.

- [x] Wire safe hotspot → `openModal('safe')`
- [x] Render 4 digit boxes from `gameState.safeDigits`
- [x] Up arrow: increment digit cyclically (9 → 0), update display
- [x] Down arrow: decrement digit cyclically (0 → 9), update display
- [x] Confirm button: compare digits against `[9,1,2,6]`
- [x] Wrong code: show error text, auto-hide after 1500 ms, keep modal open, keep digits
- [x] If error already visible when confirm pressed again: restart the 1500 ms timer cleanly
- [x] Correct code: call `showScreen('win')`, close modal
- [x] Close button: `closeModal()`; overlay click also closes safe modal (Decision 11)

Manual check: enter wrong code twice in a row; confirm error reappears cleanly. Enter `9 1 2 6` and confirm Win screen appears.

---

### Phase 7 — Menu modal and full reset

Goal: menu modal opens/closes correctly; restart from menu and from Win screen both fully reset game state.

- [x] Wire menu button → `openModal('menu')`
- [x] Overlay click closes `#modal-menu` (this is the only modal where overlay-click closes)
- [x] Close button inside `#modal-menu` calls `closeModal()`
- [x] Implement `reset()`: close modals, clear overlay, reset `safeDigits` to `[0,0,0,0]`, clear `safeErrorTimer`, set `screen` to `'start'`, call `renderText()` — do NOT reset `language`
- [x] Wire restart button in `#modal-menu` → `reset()`
- [x] Wire restart button in `#screen-win` → `reset()`

Manual check: restart from menu mid-game; confirm Start screen, German/English preserved, safe reset to 0000. Restart from Win screen; same checks.

---

### Phase 8 — End-to-end browser verification and documentation update

Goal: full playthrough passes all acceptance criteria; workflow docs updated.

#### BUG FIXES — do these first as a unit before any other Phase 8 work

These regressions appeared after the background PNGs were swapped in. Both must be fixed and confirmed in browser before continuing.

- [x] Fix: clicking the Start button shows the correct cursor but does not navigate to the game screen
- [x] Fix: clicking the language flag button does nothing — flag stays on German flag, does not switch to UK flag
- [x] Browser-confirm fix: Start button click transitions to game screen
- [x] Browser-confirm fix: flag toggles de → en and en → de on repeated clicks
- [ ] Check browser DevTools console on page load for JS errors that may block event listener registration
- [x] Decide on HOTSPOTS count: currently 11 entries (detective split into body + bubble); spec requires 10 item hotspots — either merge into one larger hitbox or document the split as an accepted deviation

#### Asset setup (do this BEFORE running the playthrough)

- [x] Replace `assets/backgrounds/start-placeholder.svg` with final start screen PNG
- [x] Replace `assets/backgrounds/game-placeholder.svg` with final game screen PNG
- [x] Replace `assets/backgrounds/win-placeholder.svg` with final win screen PNG
- [ ] Replace placeholder clue PNGs in `assets/clues/` with final artwork (10 files — see filenames in HOTSPOTS array)
- [x] Update background `src` paths in `index.html` (3 occurrences) to match actual filenames and extension
- [x] Update `clue` paths in `HOTSPOTS` array in `script.js` to match actual filenames and extension

#### Hotspot and hitbox tuning (do after assets are in place)

The 11 neon-pink clickable elements in the game image are:
1. Detective figure + speech bubble (full body — needs wider/taller hitbox than default 60×60)
2. Computer/desk (monitor with Q — easter egg)
3. WiFi panel (wall, upper-left area)
4. Radio device (workbench)
5. Empty chair (center floor)
6. Microscope
7. Tool trolley
8. 3D printer
9. Oscilloscope (upper right)
10. Whiteboard / schematic (far right)
11. Safe + speech bubble (full box — needs wider/taller hitbox; handled via `#hotspot-safe`)

Hotspot positions are currently estimated in `script.js` (HOTSPOTS array) and `style.css` (#hotspot-safe). Verify each in browser and adjust `top`/`left` percentages. For detective and safe, also set explicit `width`/`height` on the hotspot element.

- [x] Verify all 10 item hotspot positions match neon-pink elements on real background (measured via browser click logger)
- [x] Verify `#hotspot-safe` position matches the safe element
- [x] Increase hitbox size for detective figure — percentage-based w/h in HOTSPOTS; bubble as separate no-indicator hotspot with linkedTo
- [x] Increase hitbox size for safe — percentage-based w/h in CSS; safe bubble as separate hotspot
- [x] Verify Start button transparent overlay aligns with drawn Start button (adjusted to `top: 78%, left: 44%, width: 26%`)
- [x] Verify Win screen restart button transparent overlay aligns with drawn restart icon (confirmed via browser click logger; set to `top: 85%, left: 50%, width: 29.4%, height: 8.3%`)

#### Playthrough verification

- [ ] Full manual playthrough: start → game → all 10 hotspots → menu restart → start → game → safe (wrong codes) → correct code → win screen → restart
- [ ] Verify hover indicators appear on all 11 clickable elements
- [ ] Verify language persists after restart
- [ ] Verify double-click does not open two modals
- [ ] Resize browser; confirm usability on typical laptop window sizes

#### Documentation

- [ ] Update `HANDOVER.md` with what was implemented, what was tested, and what remains
- [ ] Update `AGENT_LOG.md` with completed work
- [ ] Update `TASKS.md` to mark completed items
- [ ] Update `README.md` — include section on agent workflow showing the prompt sequence: `start-session` → `implement-next-task` → `review-work` → `update-handover`
- [ ] Update `ARCHITECTURE.md` to reflect `.svg` → `.png` asset change (done this session)

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
- [ ] Item modals open and close correctly; overlay blocks background; overlay click closes any modal (Decision 11)
- [ ] Only one modal can be open at a time
- [ ] Safe modal: digits cycle 0–9 in both directions
- [ ] Safe modal: wrong code shows error for ~1.5 s, keeps modal open, keeps digits
- [ ] Safe modal: correct code `9 1 2 6` switches to Win Screen
- [ ] Menu modal: overlay click closes it; close button closes it; restart button resets game
- [ ] Win Screen restart button resets game
- [ ] Restart fully resets state (all modals closed, safe = 0000, error cleared, overlay off, Start screen shown)
- [ ] Language is preserved across restart