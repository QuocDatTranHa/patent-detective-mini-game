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
- [x] Replace placeholder clue PNGs in `assets/clues/` with final artwork (10 files — see filenames in HOTSPOTS array)
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

- [x] Full manual playthrough: start → game → all 10 hotspots → menu restart → start → game → safe (wrong codes) → correct code → win screen → restart
- [x] Verify hover indicators appear on all 11 clickable elements
- [x] Verify language persists after restart
- [x] Verify double-click does not open two modals
- [x] Resize browser; confirm usability on typical laptop window sizes

#### Documentation

- [x] Update `HANDOVER.md` with what was implemented, what was tested, and what remains
- [x] Update `AGENT_LOG.md` with completed work
- [x] Update `TASKS.md` to mark completed items
- [ ] Update `README.md` — include section on agent workflow showing the prompt sequence: `start-session` → `implement-next-task` → `review-work` → `update-handover`
- [x] Update `ARCHITECTURE.md` to reflect `.svg` → `.png` asset change (done this session)

Manual check: full playthrough in at least one modern browser (Chrome or Firefox) starting from `index.html` with no local server.

---

## Acceptance Checklist

The implementation is not complete until all of these pass:

- [x] Game starts on Start Screen in German
- [x] Playable by opening `index.html` directly — no installation, internet, or build step
- [x] Language toggle on Start Screen works (de ↔ en); flag icon reflects current language
- [x] Language toggle not visible on Game or Win screen
- [x] Game Screen has exactly 10 clickable item hotspots
- [x] Hover indicator appears on hotspot hover; disappears on mouse leave
- [x] Hover indicators disabled while any modal is open
- [x] Item modals open and close correctly; overlay blocks background; overlay click closes any modal (Decision 11)
- [x] Only one modal can be open at a time
- [x] Safe modal: digits cycle 0–9 in both directions
- [x] Safe modal: wrong code shows error for ~1.5 s, keeps modal open, keeps digits
- [x] Safe modal: correct code `9 1 2 6` switches to Win Screen
- [x] Menu modal: overlay click closes it; close button closes it; restart button resets game
- [x] Win Screen restart button resets game
- [x] Restart fully resets state (all modals closed, safe = 0000, error cleared, overlay off, Start screen shown)
- [x] Language is preserved across restart

---

## Phase 9 — Popup text content and UI adjustments ✓

Goal: each popup window (item modals and any other modals with white text areas) displays the correct German and English text; layout is adjusted to fit the text cleanly.

### Task 9a — Bundle Orbitron font locally ✓

Orbitron is the canonical Tron Legacy–style font. It must be included as a local file so the game works offline.

- [x] Download `Orbitron.woff2` from Google Fonts static CDN; saved to `assets/fonts/Orbitron.woff2` (11,800 bytes, variable font covering weight 400–700)
- [x] Add `@font-face` rule to `style.css` (top of file, before reset) — single file covers both regular and bold via `font-weight: 400 700`
- [x] Browser-confirmed: Orbitron renders correctly from local file with no internet required

---

### Task 9b — Add popup content to HOTSPOTS and STRINGS in `script.js` ✓

- [x] Added `startIntro` and `startDisclosure` keys to both `de` and `en` in `STRINGS`
- [x] Added `body: { de, en }` to every HOTSPOT entry (all 11 entries including speech bubble duplicate)
- [x] Updated `title` on all entries to match final copy (Detective, Qthena, Zugangskontrollmodul, Integriertes Energiemodul, Höhenverstellbares Sitzmodul, Labor-Mikroskop, Mobiler Unterbau, 3D-Drucksystem, Digitales Oszilloskop, Plattformkonzept)

---

### Task 9c — HTML: add text overlay elements ✓

- [x] Added `<div id="start-intro" data-text="startIntro"></div>` and `<div id="start-disclosure" data-text="startDisclosure"></div>` inside `#screen-start`
- [x] Added `<div id="modal-item-text"><h2 id="modal-item-title"></h2><p id="modal-item-body"></p></div>` inside `#modal-item`
- [x] `#modal-safe` and `#modal-menu` unchanged — no white text areas

---

### Task 9d — CSS: position and style text overlays

**Orbitron font** (from Task 9a) applied to all new text overlays. Text color dark navy (`#001a33`) on white panels.

**Start screen overlays** (absolute, positioned over the background image):
- Both boxes occupy the right side: roughly `left: 63%, width: 34%`
- Top box (`#start-intro`): `top: 8%, height: 42%`; font-size `12px`; padding `12px 14px`; `white-space: pre-line`; `overflow: hidden`
- Bottom box (`#start-disclosure`): `top: 54%, height: 42%`; font-size `11px`; padding `12px 14px`; `white-space: pre-line`; `overflow: hidden`
- Both: `position: absolute`, `color: #001a33`, `font-family: 'Orbitron', 'Courier New', monospace`, `line-height: 1.6`

**Item modal text panel** (`#modal-item-text`):
- `position: absolute; left: 47%; top: 11%; width: 46%; height: 77%`
- `padding: 5% 4%`; `overflow: hidden`; `box-sizing: border-box`
- Title (`#modal-item-title`): `font-family: 'Orbitron', ...; font-weight: 700; font-size: 1.1em; color: #001a33; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6em`; optionally a subtle neon-blue bottom border
- Body (`#modal-item-body`): `font-family: 'Orbitron', ...; font-weight: 400; font-size: 0.85em; color: #0a1a2e; line-height: 1.65; white-space: pre-line`

- [x] Add all of the above rules to `style.css`

---

### Task 9e — JS: wire text population to `openModal()` and `renderText()`

- [x] In `openModal('item', index)`: after setting `img.src`, also set `document.getElementById('modal-item-title').textContent` and `document.getElementById('modal-item-body').textContent` from the active HOTSPOT's `title[gameState.language]` and `body[gameState.language]`
- [x] In `renderText()`: if `gameState.openModal === 'item'` and `gameState.activeItemIndex !== null`, re-render the modal title and body text so language toggle works even while a popup is open
- [x] Verify `renderText()` already handles `data-text="startIntro"` and `data-text="startDisclosure"` via the existing `querySelectorAll('[data-text]')` loop — no additional JS change needed for start screen

---

### Task 9f — Browser verification

- [x] Open start screen in German — confirm both text boxes display correct text, no overflow
- [x] Toggle to English — confirm both text boxes update correctly
- [x] Open each of the 10 item popups in German — confirm title and body appear in the white panel
- [x] Toggle language while a popup is open — confirm title and body update in real time
- [ ] Resize browser to 1280×720 — confirm no overflow or clipping in any panel

Manual check: open each popup in both languages and confirm text is visible, readable, and correctly translated.

---

## Phase 10 — Polish: start screen titles, clue numbers, font sizing, text box alignment

Portability verified: game works on a second machine by copying the folder and opening `index.html` directly.

Goal: start screen gets headings in both panels; relevant clue modals show a large neon blue code digit; all modal texts grow to better fill the white space; three off-center modals are corrected.

### Task 10a — Start screen: add panel titles

- [x] Add `startTitleIntro` and `startTitleDisclosure` keys to `STRINGS` (de/en)
- [x] Add `<div id="start-title-intro" data-text="startTitleIntro">` and `<div id="start-title-disclosure" data-text="startTitleDisclosure">` to `index.html` (one above each text panel)
- [x] Style both title divs: Orbitron bold, ~2vh, dark navy (`#001a33`), uppercase, absolute-positioned at top of their respective panels
- [x] Shift `#start-disclosure` top from 53% → 60% and reduce height from 34% → 25% to make room for the title; reduce font-size slightly if needed to keep all M items visible

### Task 10b — Clue modals: add large neon code digit

Relevant clues and their safe-code digits:
- Keypad (index 3) → 2
- Energy Module (index 4) → 6
- Chair (index 5) → 1
- Mobile Base Unit (index 7) → 9

Irrelevant clues (filler numbers, none reused from the above):
- Microscope (index 6) → 0
- 3D Printer (index 8) → 4
- Oscilloscope (index 9) → 5
- Whiteboard (index 10) → 3

No digit shown for Detective (indices 0–1) or Qthena (index 2).

- [x] Add `codeDigit` property to each HOTSPOT (null for detective/qthena entries)
- [x] Add `<span id="modal-item-digit" class="hidden">` inside `#modal-item-text`
- [x] Style `#modal-item-digit`: position absolute, bottom-right of the text panel, font-size `clamp(50px, 7vw, 90px)`, Orbitron bold, neon tron blue glow
- [x] In `openModal('item', index)`: set digit text and toggle `.hidden` based on `spot.codeDigit`
- [x] In `closeModal()`: reset digit to hidden

### Task 10c — Modal body font size: increase to fill white space

Determine longest text across all 11 hotspots in both DE and EN; choose a font-size that brings the longest text close to filling the panel height without overflow.

- [x] Increase `#modal-item-body` font-size from `clamp(9px, 1.05vw, 13px)` to `clamp(12px, 1.5vw, 18px)`
- [x] Optionally increase `#modal-item-title` slightly for visual hierarchy

### Task 10d — Per-modal text box alignment

Canvas pixel scan shows the white text panel starts at different `left` percentages in each clue image. The current default (`left: 48%`) overlaps the neon border for some images.

Images needing adjustment (white panel left edge > 48%):
- `r-clue-chair.png` (index 5): white starts at ~51%
- `i-clue-microscope.png` (index 6): white starts at ~51%
- `i-clue-3dprinter.png` (index 8): white starts at ~51%
- `i-clue-whiteboard.png` (index 10): white starts at ~52.6%

- [x] Add optional `textBox: { left, top, width, height }` property to the four affected HOTSPOT entries
- [x] In `openModal('item', index)`: if `spot.textBox` exists, apply as inline styles on `#modal-item-text`; otherwise clear inline styles (CSS default applies)
- [x] In `closeModal()`: clear inline styles on `#modal-item-text`

---

## Phase 11 — Readability fixes and Win Screen text

### Task 11a — Code digit color: darker blue for readability

The large neon code digits in the bottom-right of the white text boxes are currently styled with a bright neon tron-blue glow. On the white background this reduces contrast.

- [x] Choose a darker blue that matches the game screen palette (e.g. a deeper navy/blue matching the neon panels, such as `#0057a8` or `#003f7f`) while keeping the digit visually distinct
- [x] Update `#modal-item-digit` color and text-shadow in `style.css` to the chosen darker blue
- [x] Verify digit is clearly readable against the white panel background in browser

### Task 11b — Win Screen: add text to the right white box

The Win Screen has three white boxes; the rightmost one is currently empty. Add the bilingual closing message.

DE text:
> Gratulation! Du hast einen neuheitsschädigenden Stand der Technik identifiziert.
>
> Die vermeintlich neue Idee lässt sich vollständig durch bekannten Stand der Technik erklären. Keine der zentralen Eigenschaften ist tatsächlich neu.
> Dieses Beispiel zeigt: KI kann komplexe und überzeugende Beschreibungen erzeugen. Doch echte Innovation entsteht erst durch einen eigenen technischen Lösungsansatz – nicht durch die Neuformulierung bereits bekannter Inhalte.

EN text:
> Congratulations! You have identified novelty-destroying prior art.
>
> The seemingly novel idea can be entirely explained by existing prior art. None of the key features are actually new.
> This example demonstrates that AI can produce complex and convincing descriptions. However, true innovation only arises from a genuine technical solution—not from rephrasing what already exists.

- [x] Add `winText` key (de/en) to `STRINGS` in `script.js`
- [x] Add a text overlay element to `#screen-win` in `index.html` positioned over the right white box
- [x] Style the overlay to match item modal text style (Orbitron, dark navy `#001a33`, matching font-size, `white-space: pre-line`, `overflow: hidden`)
- [x] Wire the element via `data-text="winText"` so `renderText()` populates it automatically
- [x] Browser-verify: text visible in both DE and EN on Win Screen; no overflow

### Task 11c — Start screen bottom panel: reduce title gap, increase body font size

The gap between the "The Invention" / "Die Erfindung" title and the body text below it in the bottom start screen panel is too large. The freed space should be used to increase body font size for better readability.

- [x] Inspect current CSS for `#start-title-disclosure` margin/padding and `#start-disclosure` padding-top; reduce the gap between title and body
- [x] Increase `#start-disclosure` body font-size slightly (current: `clamp(9px, 1.1vw, 14px)` or similar) so the text fills the panel better — verify no overflow at typical viewport sizes
- [x] Browser-verify: title and body text both visible, no overflow, better readability at 1366×768 and 1280×720

### Task 11d — Detective modal: paginated text with prev/next arrows

The detective's popup (indices 0 and 1 — body and speech bubble) currently shows one page of text (game description / mission briefing). A second page should contain the AI-assisted invention disclosure. The user navigates between pages using left/right arrows similar to the safe digit arrows.

Pages (in order):
1. **Page 1** — existing game description / objective text (already in HOTSPOT body for index 0)
2. **Page 2** — AI-assisted invention disclosure text (new, bilingual, to be written and added to STRINGS or directly on the HOTSPOT entry)

Requirements:
- Page 1 always shown first when the detective modal opens; page state resets on close
- Left (`<`) and right (`>`) arrow buttons appear in the bottom-right corner of the white text box, styled consistently with the safe digit arrows
- Left arrow is disabled (visually dimmed, not clickable) on page 1; right arrow is disabled on the last page
- Each arrow click replaces the body text with the corresponding page's content; title stays the same
- Font size must keep both pages readable without overflow (adjust if the disclosure text is longer than the mission text)
- The speech-bubble duplicate hotspot (index 1, `linkedTo: 0`) shares the same modal — no separate handling needed
- `closeModal()` resets the detective page index to 0

Implementation notes:
- Add a `pages` array property (array of `{ de, en }` objects) to the detective HOTSPOT entries (index 0 and 1), replacing or extending the single `body` property
- Track `gameState.modalPage` (integer, default 0); reset in `closeModal()` and `openModal()`
- Add `<div id="modal-item-nav">` with `<button id="modal-prev">&#60;</button>` and `<button id="modal-next">&#62;</button>` inside `#modal-item-text` (below body paragraph)
- Show `#modal-item-nav` only when the active hotspot has more than one page; hide it otherwise (so other modals are unaffected)
- Wire arrow buttons to increment/decrement `gameState.modalPage` and re-render body text and arrow states
- [x] Add `pages` array to detective HOTSPOT entries (index 0 and 1) in `script.js`; write invention disclosure copy (DE + EN) as page 2
- [x] Add `gameState.modalPage` to state model; initialize to 0; reset in `openModal()` and `closeModal()`
- [x] Add `#modal-item-nav` with prev/next buttons to `index.html` inside `#modal-item-text`
- [x] Style `#modal-item-nav` in `style.css`: absolute bottom-right of text box, buttons match safe arrow style, disabled state visually dimmed
- [x] In `openModal('item', index)`: show/hide `#modal-item-nav` based on whether the spot has multiple pages; render page 0 body text; set arrow disabled states
- [x] In arrow click handlers: update `gameState.modalPage`, re-render body, update arrow disabled states
- [x] In `closeModal()`: hide `#modal-item-nav`, reset `gameState.modalPage` to 0
- [x] In `renderText()`: if modal is open and active spot has pages, re-render current page body in new language
- [ ] Browser-verify: page 1 shown on open; right arrow advances to page 2; left arrow returns to page 1; arrows dim correctly; other modals show no nav; language toggle works on both pages

---

## Phase 12 — Text polish and win screen calibration

### Task 12a — Start screen: show M4 in bottom disclosure box

The bottom white box on the start screen currently only shows M1–M3. M4 is clipped by the box height or font size.

- [ ] Measure how much space M4 requires at current font-size `1.3vh`; determine whether reducing font-size or increasing `height` on `#start-disclosure` is the right fix
- [ ] Apply the change in `style.css`; ensure M4 is fully visible without overflowing the white box
- [ ] Confirm no overflow at 1366×768 and 1280×720

---

### Task 12b — Win screen: add a visible area marker for the text box

The `#win-text` element is positioned over the right white panel by CSS percentages. Add a faint visible boundary to `#win-text` so the exact text area is easy to see and verify during calibration.

- [ ] Add a subtle border or background tint to `#win-text` in `style.css` (e.g. `border: 1px dashed rgba(0, 87, 168, 0.35)`) so the box boundaries are visible when looking at the win screen
- [ ] Verify the border sits cleanly inside the right white panel of the win screen background image; adjust `left`, `top`, `width`, `height` if needed
- [ ] After final positioning is confirmed, decide whether to keep or remove the border (keep as a low-key marker, or remove for a clean final look)

---

### Task 12c — Win screen: adjust text to fill the available space

The current `#win-text` content is relatively short for the panel height. The text should use the available space better.

- [ ] Review the current text content and CSS (`font-size: clamp(7px, 0.75vw, 10px)`, `line-height: 1.6`, `padding: 1% 1%`) and measure visual fill
- [ ] Increase `font-size` and/or `line-height` so the text occupies more of the white panel without overflowing; aim for the text to reach roughly the bottom third of the panel
- [ ] Verify both DE and EN text fit without clipping; EN text is slightly shorter than DE — ensure the larger size still works for both
- [ ] Browser-verify at 1366×768

---

### Task 12d — Detective modal: per-page titles ("Game Master" / "ERFINDUNGSMELDUNG")

Currently both detective HOTSPOT entries (index 0 and 1) have `title: { de: 'Detective', en: 'Detective' }` used for both pages.

Required titles:
- Page 1: `"Game Master"` (same in DE and EN)
- Page 2: `"ERFINDUNGSMELDUNG"` (DE) / `"INVENTION DISCLOSURE"` (EN)

Implementation:
- [ ] Add a `pageTitles` array property to HOTSPOT entries 0 and 1 in `script.js` (parallel to `pages`):
  ```js
  pageTitles: [
    { de: 'Game Master', en: 'Game Master' },
    { de: 'ERFINDUNGSMELDUNG', en: 'INVENTION DISCLOSURE' }
  ]
  ```
- [ ] In `openModal('item', index)`: if the spot has `pageTitles`, set the title from `pageTitles[0]` instead of `spot.title`
- [ ] In the prev/next click handlers and `updateNavArrows` (or a new `updateModalPage` helper): update `#modal-item-title` from `pageTitles[gameState.modalPage]` on each page change
- [ ] In `renderText()`: when the detective modal is open, re-set the title from `pageTitles[gameState.modalPage]` on language toggle
- [ ] Also update the static `title` property on HOTSPOT entries 0 and 1 to `{ de: 'Game Master', en: 'Game Master' }` as a fallback
- [ ] Browser-verify: page 1 shows "Game Master"; page 2 shows "ERFINDUNGSMELDUNG" / "INVENTION DISCLOSURE"; language toggle updates the page 2 title correctly

---

### Task 12e — Detective modal page 1: double font size for body text

Only the body text on page 1 of the detective modal (the game description under "Game Master") should be displayed at double the current paginated font size. Page 2 (M1–M4) keeps the smaller font.

Current paginated font: `clamp(10px, 1.05vw, 13px)` (applied via `.paginated #modal-item-body`).
Target page-1 font: `clamp(20px, 2.1vw, 26px)` (double).

- [ ] Add a `page-1` class (or `data-page` attribute) to `#modal-item-body` when page 0 is shown; remove it when page 1 is shown
- [ ] Add a CSS rule `.paginated.page1 #modal-item-body` (or equivalent selector) that sets `font-size: clamp(20px, 2.1vw, 26px)` and an appropriate `line-height`
- [ ] Toggle the class in `openModal` (page 0 = initial state) and in the prev/next handlers
- [ ] Verify that page 1 body text is visibly larger and still fits within the modal text box without overflowing; adjust clamp values if needed
- [ ] Verify page 2 font size is unchanged

---

### Task 12f — Remove AI long dashes from all displayed text strings

AI-generated text uses em dashes (—) and en dashes (–) in positions where a comma is more natural. Replace all such dashes with a comma followed by a space, or a plain space, whichever reads better in context.

Identified occurrences in `script.js` (all strings rendered on screen):

| Location | Current | Fix |
|---|---|---|
| `STRINGS.de.startIntro` | `"wirklich neu ist – oder ob"` | `"wirklich neu ist, oder ob"` |
| `STRINGS.en.startIntro` | `"truly new—or already exists"` | `"truly new, or already exists"` |
| `STRINGS.de.winText` | `"Lösungsansatz – nicht durch"` | `"Lösungsansatz, nicht durch"` |
| `STRINGS.en.winText` | `"technical solution—not from"` | `"technical solution, not from"` |
| `HOTSPOTS[0].body.de` | `"Hinweise – deine Aufgabe"` | `"Hinweise, deine Aufgabe"` |
| `HOTSPOTS[0].body.en` | `"clues—your task"` | `"clues, your task"` |
| `HOTSPOTS[0].pages[0].de` | `"Hinweise – deine Aufgabe"` | `"Hinweise, deine Aufgabe"` |
| `HOTSPOTS[0].pages[0].en` | `"clues—your task"` | `"clues, your task"` |
| `HOTSPOTS[1].body.de` | `"Hinweise – deine Aufgabe"` | `"Hinweise, deine Aufgabe"` |
| `HOTSPOTS[1].body.en` | `"clues—your task"` | `"clues, your task"` |
| `HOTSPOTS[1].pages[0].de` | `"Hinweise – deine Aufgabe"` | `"Hinweise, deine Aufgabe"` |
| `HOTSPOTS[1].pages[0].en` | `"clues—your task"` | `"clues, your task"` |

- [ ] Apply all replacements in `script.js` using a single multi-replace operation
- [ ] Verify no remaining em dash (—) or en dash (–) exists in any string visible on screen (check with grep)
- [ ] Browser-verify: start screen intro text, win screen text, and detective page 1 text all read correctly in both languages