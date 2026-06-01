# Handover

This file gives the next coding agent the current project status and recommended next step.

## Current Status

**Phase 11 — COMPLETE**

All four Phase 11 tasks implemented and browser-verified via Playwright:

1. **Task 11a** — `#modal-item-digit` color changed to `#0057a8` with subtle shadow: dark navy blue, clearly readable on white panel backgrounds
2. **Task 11b** — Win screen right panel now shows bilingual closing text via `#win-text` div (positioned `left:61%, top:25%, width:14%, height:51%`), wired via `data-text="winText"` in `STRINGS`
3. **Task 11c** — Start screen bottom panel: `#start-disclosure` `top: 59%`, `height: 29%`, `font-size: 1.3vh`, `padding: 0.5% 1%`; `#start-title-disclosure` `height: 5%`
4. **Task 11d** — Detective modal pagination: two-page nav (`<`/`>` arrows) on HOTSPOT indices 0 and 1; page 1 = mission briefing, page 2 = M1–M4 invention disclosure; `paginated` CSS class on `#modal-item-text` reduces font for M1–M4 content to fit without overflow; nav hidden on all other modals; `closeModal()` resets page to 0

## Completed So Far

- Phase 1: HTML/CSS/JS skeleton, placeholder assets
- Phase 2: DOM markup for all screens and modals
- Phase 3: Responsive layout, hotspot hover indicator, modal sizing
- Phase 4: State model, screen navigation, language toggle
- Phase 5: Item hotspot system, clue modal open/close, overlay
- Phase 6: Safe modal — digit controls, code validation, win screen
- Phase 7: Menu modal — pause/restart flow
- Phase 8: Final asset integration — background images, clue images, Orbitron font
- Phase 9: Text content — bilingual STRINGS, start screen panels, modal title/body overlays
- Phase 10: Visual polish — start screen headings, neon code digits, larger modal font, per-hotspot text box alignment
- Phase 11: Readability fixes — darker digit color, win screen text, start panel spacing, detective pagination

## Files Changed (Phase 11)

- `index.html` — added `<div id="win-text" data-text="winText">` inside `#screen-win`; added `<div id="modal-item-nav">` with `<button id="modal-prev">` and `<button id="modal-next">` inside `#modal-item-text`
- `style.css` — `#modal-item-digit` color `#0057a8`; `#win-text` absolute positioning over right win panel; `#start-disclosure` height/font/padding; `#modal-item-nav`/`#modal-prev`/`#modal-next` button styles; `#modal-item-text.paginated #modal-item-body` smaller font for paginated content
- `script.js` — `winText` (de/en) in `STRINGS`; `pages` array on HOTSPOT indices 0 and 1; `gameState.modalPage`; `updateNavArrows()`; prev/next click handlers; `openModal`/`closeModal`/`renderText` all updated for pagination and `paginated` class

## Manual Check Result (Playwright)

- 11a: Keypad modal digit "2" renders in dark navy `#0057a8` on white — screenshot verified ✓
- 11b: Win screen text fills right panel; all paragraphs visible — screenshot verified ✓
- 11c: Start screen panels closer together, body font larger — screenshot verified ✓
- 11d: Detective modal page 1 (prev disabled, next active), page 2 shows M1–M4 fully (prev active, next disabled), non-paginated modals have no nav — JS-verified and screenshot verified ✓

## What Was Not Tested

- Language toggle (EN) while detective pagination is on page 2
- Win screen text in EN language
- Start screen layout at 1280×720
- Full manual playthrough including safe code entry through to win screen

## Known Issues

- Win screen text positioning calibrated for 1366×768 Playwright viewport (container 1228.8×768). May need minor adjustment at other viewport sizes.
- Start screen disclosure panel (M1–M4 text) still clips at M3/M4 boundary — the `height: 29%` increase in Task 11c partially mitigated this; full M4 visibility would require a smaller font or taller box.

## Next Recommended Step

Phase 12 tasks have been written to `TASKS.md`. Start with **Task 12a** (start screen M4 visibility), then 12b/12c (win screen calibration), then 12d/12e (detective titles and font), then 12f (long dash cleanup). Each task is independently implementable.

---

*Phase 10 file changes and manual check results are recorded in `AGENT_LOG.md`.*
- Layout at 1280×720

## Known Issues

- Playwright screenshot crops the right portion of the game (game container is 16:10; Playwright viewport is narrower). Does not affect in-browser playability.
- Start screen title positions (18% / 54%) were calibrated at 1366×768. May need minor adjustment at other viewport sizes.

## Next Recommended Step

Open `index.html` directly in a real browser at full screen and visually confirm:
1. Both start screen white panels show their headings in dark navy Orbitron
2. Each clue modal shows the correct neon digit in the bottom-right corner
3. Modal body text is noticeably larger and fills the panel better
4. Whiteboard, microscope, and 3D printer text boxes are aligned to the correct white area (not overlapping the neon border)

## What Was Not Tested

- All 10 item modals opened individually in both languages (only 2 modals were tested: Detective and Access Control Module)
- Portability (copy to another machine)
- README.md update (still pending from Phase 8 checklist)

## Known Issues

- Arrow hitbox left positions are slightly offset from digit display positions — user chose not to fix; arrows are working
- README.md agent workflow section not yet added

## Next Recommended Step

1. Open all remaining 8 item modals in both languages and visually confirm title/body text
2. Add README.md agent workflow section (pending from Phase 8)

## Important Constraints

- Open `index.html` directly in browser — no local server, no build step
- `docs/game-spec.md` is source of truth for game behaviour
- Exactly 3 screens, 1 overlay, 3 modals — structure is fixed
- Only one modal may be open at a time
- Correct safe code is `9 1 2 6`
- Restart must not reset language


## Completed So Far

- Repository and full Markdown scaffold created
- Full game spec in `docs/game-spec.md`
- Implementation plan created and user-confirmed
- `ARCHITECTURE.md`, `DECISIONS.md`, `TASKS.md` updated with planning decisions
- **Phase 1:** `index.html`, `style.css`, `script.js` and all placeholder assets created
- **Phase 2:** Full DOM skeleton, `.hidden` CSS rule
- **Phase 3:** CSS layout — screens fill viewport, background images, hotspot layer, hover indicator, overlay, modal sizes
- **Phase 4:** `gameState`, `STRINGS`, `renderText()`, `showScreen()`, start button and language toggle wired
- **Phase 5:** `HOTSPOTS` array (11 entries), `renderHotspots()`, `openModal()`, `closeModal()`, close button wired
- **Phase 6:** Safe modal, digit cycling, confirm logic, error timer
- **Phase 7:** Menu modal, overlay-closes-all (Decision 11), `reset()`, restart buttons
- **Phase 8 (in progress):**
  - All hotspot positions measured and tuned
  - All three modals converted to image-based 16:9 (item, safe) and 1:1 (menu) windows
  - Neon-red Tron X close button on all modals (absolute top-right, no text)
  - Item modal: image fills full rounded window, title removed
  - Safe modal: `safe-background.png` as background; digit displays overlaid as absolute spans (Courier New, neon-blue glow); invisible hitboxes for 4 up arrows, 4 down arrows, ENTER button; error message repositioned to match image
  - Menu modal: `menu-background.png` as background; invisible hitbox over drawn replay icon
  - Win screen: neon-cyan futuristic text ("Neu starten" / "Replay") overlaid on drawn button area
  - Menu button styled with neon-cyan Tron border and glow
  - Language toggle moved to `#ui-layer` (fixed, matches screen dimensions) — now visible on all 3 screens
  - `r-clue-energy.png` filename confirmed correct (no change needed)
  - 11-element decision documented; spec and DECISIONS.md updated
  - `modal-item-title` removed from HTML and JS (unused)
  - `ARCHITECTURE.md` updated with correct asset filenames
  - Decisions 12–16 added to `DECISIONS.md`
  - `docs/game-spec.md` updated: language toggle global, 11-element table

## Files Changed (this session)

- `style.css` — modal item/safe/menu redesigned; close button; safe digit/arrow/confirm/error positions; win button text style; menu button neon; `#ui-layer`; language button
- `index.html` — modal-item: title `<p>` removed; modal-safe: rebuilt with bg image + hitboxes; modal-menu: rebuilt with bg image + hitbox; language button moved to `#ui-layer`; win button `data-text` changed to `replay`
- `script.js` — `replay` key added to STRINGS; `modal-item-title` textContent assignment removed
- `DECISIONS.md` — decisions 12–16 added
- `docs/game-spec.md` — language toggle section updated; clickable elements section updated to 11
- `ARCHITECTURE.md` — asset paths updated; `safe-background.png` and `menu-background.png` documented
- `TASKS.md` — HOTSPOTS count decision marked complete

## Manual Check Result

- Safe modal digit arrows: user confirmed working
- Safe ENTER button: user confirmed working
- Safe error message: repositioned to user-specified coordinates
- Win screen replay text: user confirmed positioned correctly at `top: 85%`
- Language toggle on game and win screens: user confirmed working
- Menu modal replay icon hitbox: confirmed working

## What Was Not Tested

- DevTools console check for JS errors on page load (not yet done)
- Portability (copy to another machine)
- Popup text content (Phase 9 — not yet implemented)

## Known Issues

- Arrow hitbox left positions (`41.5%, 50.7%, 59.7%, 68.9%`) are slightly offset from digit display positions (`42.4%, 51.0%, 59.4%, 67.9%`) — user chose not to fix; arrows are working
- White text areas in popup windows have no content yet — Phase 9 work

## Next Recommended Step

1. Identify each white text area in the popup windows (open each modal in the browser and note what areas need text)
2. Write German and English copy for each area
3. Add entries to `STRINGS` in `script.js` and wire to `renderText()`
4. Adjust modal layout as needed to fit text
4. Update `HANDOVER.md` and `AGENT_LOG.md` after playthrough

## Important Constraints

- Open `index.html` directly in browser — no local server, no build step
- `docs/game-spec.md` is source of truth for game behaviour (with decisions 11–16 as accepted overrides)
- Exactly 3 screens, 1 overlay, 3 modals — structure is fixed
- Only one modal may be open at a time
- Overlay click closes any modal (Decision 11)
- Correct safe code is `9 1 2 6`
- Restart must not reset language

All core game logic is implemented and working. Background images are 16:10 (1586×992). All 11 hotspot positions were measured with a browser click logger and updated to exact coordinates. Clue filenames renamed to match element names. Detective and safe speech bubbles act as silent click zones that trigger the indicator on their linked main element. Detective bubble correctly opens the same modal as the detective body (index 0). JS syntax validated clean.

Two items remain before Phase 8 can be closed:
1. Win screen restart button overlay position needs browser verification
2. Final clue artwork must replace placeholder PNGs

## Completed So Far

- Repository and full Markdown scaffold created
- Full game spec in `docs/game-spec.md`
- Implementation plan created and user-confirmed
- `ARCHITECTURE.md`, `DECISIONS.md`, `TASKS.md` updated with planning decisions
- **Phase 1:** `index.html`, `style.css`, `script.js` and all placeholder assets created
- **Phase 2:** Full DOM skeleton, `.hidden` CSS rule
- **Phase 3:** CSS layout — screens fill viewport, background images, hotspot layer, hover indicator, overlay, modal sizes
- **Phase 4:** `gameState`, `STRINGS`, `renderText()`, `showScreen()`, start button and language toggle wired
- **Phase 5:** `HOTSPOTS` array (10 entries), `renderHotspots()`, `openModal()`, `closeModal()`, close button wired
- **Phase 6:** Safe modal, digit cycling, confirm logic, error timer
- **Phase 7:** Menu modal, overlay-closes-all (Decision 11), `reset()`, restart buttons
- **Phase 8 (substantially complete):**
  - JS syntax error (stray brace) fixed — was preventing all script from loading
  - Background images confirmed as 16:10 (1586×992); CSS container locked to 16:10 ratio using `min()` formula; `object-fit: contain` prevents any cropping; body background set to black
  - All 11 hotspot positions measured via browser click logger and updated in `script.js` and `style.css`
  - All hotspot sizes converted to percentage-based `w`/`h`
  - Detective bubble and safe bubble implemented as `noIndicator` hotspots that trigger the indicator on their linked main element
  - Detective bubble click correctly opens `HOTSPOTS[0]` modal (same as body)
  - Clue filenames renamed to: `game-instructor.png`, `easter-egg.png`, `r-clue-keypad.png`, `r-clue-energy.png`, `r-clue-chair.png`, `i-clue-microscope.png`, `r-clue-wheel.png`, `i-clue-3dprinter.png`, `i-clue-measure.png`, `i-clue-whiteboard.png`
  - Placeholder PNGs created with correct names; old `clue-01.svg`–`clue-10.svg` deleted
  - `KNOWN_ISSUES.md` updated to reflect actual current state
  - `TASKS.md` Phase 8 checkboxes updated

## Files Changed (previous session)

- `script.js` — stray brace removed; HOTSPOTS rebuilt with browser-measured coords and named clue paths; hotspot sizes percentage-based; `noIndicator`/`linkedTo` bubble system; `renderHotspots()` uses `linkedTo` for modal index and wires bubble hover to force-indicator on main element; safe bubble hover wired via IIFE; debug click logger added then removed
- `style.css` — screens changed from `inset:0` to `min()` 16:10 aspect ratio formula; `object-fit` changed from `cover` to `contain`; body `background: #000`; `#hotspot-safe` and `#hotspot-safe-bubble` given percentage sizes and exact positions; `.hotspot-no-indicator::after` and `#hotspot-safe-bubble::after` suppressed; `.force-indicator::after { opacity: 1 }` added; hotspot indicator enlarged to 58 px with neon yellow `drop-shadow`; flag icon given neon cyan `drop-shadow`
- `index.html` — `#hotspot-safe-bubble` div added inside `#hotspot-layer`
- `assets/clues/` — 10 named placeholder PNGs created; 10 old SVG placeholders deleted
- `assets/ui/hover-warning.svg` — redesigned to neon Tron style (yellow fill, white stroke, SVG glow filter)
- `assets/ui/flag-de.svg` — redesigned to Tron neon style (dark bg, neon stripes, cyan frame)
- `assets/ui/flag-en.svg` — redesigned to Tron neon style (dark bg, neon cyan/red cross, cyan frame)
- `KNOWN_ISSUES.md` — fully rewritten to reflect current open items
- `TASKS.md` — Phase 8 checkboxes updated; Phase 5/6 overlay-click items corrected for Decision 11; two new tasks added to bug fix block

## Manual Check Result

- User confirmed: start button navigates to game screen ✓
- User confirmed: language toggle works (de ↔ en) ✓
- User confirmed: 16:10 images display without cropping, black bars on side on 16:9 screen ✓
- Hotspot positions measured from live browser — not yet confirmed by clicking all 11 and verifying correct modal opens

## What Was Not Tested

- Win screen restart button overlay alignment (not yet browser-verified)
- All 11 hotspot click targets (positions measured but not confirmed by clicking each one)
- Full end-to-end playthrough
- Clue modal content (placeholder PNGs only)
- Restart flow reset verification
- Portability (copy to another machine)

## Known Issues

- Win screen restart button overlay at `top: 84%, left: 50%, width: 55%` — not confirmed with final win background
- All clue images are placeholder PNGs — final artwork needed before meaningful playthrough

## Next Recommended Step

1. Open win screen in browser → check if restart button overlay aligns; adjust `style.css` `#btn-restart-win` if needed
2. Drop in final clue PNGs (10 files, exact filenames listed above)
3. Run full end-to-end playthrough and check all acceptance criteria in `TASKS.md`

## Important Constraints

- Open `index.html` directly in browser — no local server, no build step
- `docs/game-spec.md` is source of truth for game behaviour (except Decision 11)
- Exactly 3 screens, 1 overlay, 3 modals — structure is fixed
- Only one modal may be open at a time
- Overlay click closes any modal (Decision 11)
- Correct safe code is `9 1 2 6`
- Restart must not reset language

## Completed So Far

- Repository und vollständiges Markdown-Scaffold erstellt
- Vollständige Spielspezifikation in `docs/game-spec.md`
- Implementierungsplan erstellt und von User bestätigt
- `ARCHITECTURE.md`, `DECISIONS.md`, `TASKS.md` mit Planungsentscheidungen aktualisiert
- **Phase 1:** `index.html`, `style.css`, `script.js` und alle Platzhalter-Assets erstellt
- **Phase 2:** Vollständiger DOM-Skeleton in `index.html`, `.hidden` CSS-Regel
- **Phase 3:** CSS-Layout — Screens füllen Viewport, Hintergrundbilder, Hotspot-Layer, Hover-Indikator, Overlay, Modal-Größen
- **Phase 4:** `gameState`, `STRINGS`, `renderText()`, `showScreen()`, Start-Button und Sprachbutton verdrahtet, `<html lang>` wird synchron gehalten
- **Phase 5:** `HOTSPOTS`-Array (10 Einträge), `renderHotspots()`, `openModal()`, `closeModal()`, Schließen-Button verdrahtet
- **Phase 6:** Safe modal, digit cycling, confirm logic, error timer
- **Phase 7:** Menu modal, overlay-closes-all, `reset()`, restart buttons
- **Phase 8 (in progress):** Final backgrounds swapped in; hotspot positions estimated from real images; hitboxes enlarged for detective and safe; Start/Win button overlays tuned; flag toggle bug fixed

## Files Changed (letzte Session)

- `index.html` — background `src` paths updated to `start-screen.png`, `game-screen.png`, `win-screen.png`
- `script.js` — HOTSPOTS array updated with estimated positions from real game image; optional `w`/`h` fields added for detective hitbox (130×290 px); `renderHotspots()` applies `w`/`h` when present; `renderText()` flag reload fixed (clears src before reassigning to force browser re-render)
- `style.css` — `#hotspot-safe` enlarged to 150×170 px; `#btn-start` position adjusted (top 78%, left 44%, width 26%) and z-index 2 added; `#btn-language` z-index raised to 10; `#flag-icon` enlarged to 64 px

## Manual Check Result

User confirmed in browser:
- Start screen shows correct background image
- Start button overlay cursor is visible (position still being tuned)
- Language flag button is clickable (fix applied for SVG reload bug)

Not yet confirmed:
- All 10 item hotspot positions on game screen
- Safe hotspot position
- Win screen restart button overlay alignment
- Full end-to-end playthrough
- Restart flow

## What Was Not Tested

- Item hotspot positions — browser verification with real game background pending
- Safe hotspot position and enlarged hitbox
- Win screen overlay button alignment
- Clue images (still placeholder SVGs)
- Full restart flow
- Portability (copying to another machine)

## Known Issues

- Clue images still placeholder SVGs — must be replaced before final playthrough
- All 10 item hotspot positions are estimated — expect fine-tuning needed per element after browser testing
- Start button overlay position may still need vertical adjustment (user reported it was off; fix applied, needs re-check)
- Win screen restart button overlay not yet verified with real win background
- `ARCHITECTURE.md` still references `.svg` placeholder naming — update at end of Phase 8
- Full restart flow not browser-verified yet

## Important Constraints

- `index.html` direkt im Browser öffnen — kein lokaler Server, kein Build-Schritt
- `docs/game-spec.md` ist die Quelle der Wahrheit für alle Spielverhalten (mit Ausnahme von Decision 11)
- Genau 3 Screens, 1 Overlay, 3 Modals — Struktur ist fix
- Nur ein Modal darf gleichzeitig offen sein
- Overlay-Klick schließt jedes Modal (Decision 11 — überschreibt ursprüngliche Spec)
- Der korrekte Safe-Code ist `9 1 2 6`

## Key Architecture Decisions

Vollständige Details in `ARCHITECTURE.md` und `DECISIONS.md`.

- Einzelner `gameState`-Object für alle Laufzeit-Zustände
- `STRINGS`-Map + `renderText()` für alle lokalisierten UI-Texte
- `HOTSPOTS`-Array in `script.js` für alle 10 Hotspot-Positionen und Clue-Daten
- Prozent-basierte Hotspot-Positionen, zentriert via `transform: translate(-50%, -50%)`
- `openModal()` / `closeModal()` als einzige erlaubte Modal-Steuerung
- `closeModal()` versteckt alle `.modal`-Elemente generisch (zukunftssicher)
- `reset()` setzt alles zurück außer `gameState.language` (Phase 7)

## Implementation Phases

| Phase | Goal | Status |
|-------|------|--------|
| 1 | Foundation and file skeleton | ✓ done |
| 2 | Static screen and modal markup | ✓ done |
| 3 | Base layout, modal sizing, hotspot styling | ✓ done |
| 4 | State model, screen flow, localization | ✓ done |
| 5 | Item hotspot and clue modal system | ✓ done |
| 6 | Safe modal and code validation | ✓ done |
| 7 | Menu modal and full reset | ✓ done |
| 8 | End-to-end browser verification and docs update | ← next |

## Next Recommended Step

**Phase 8 — Hotspot position tuning, then full playthrough**

1. Open game screen in browser; hover over each neon-pink element and check cursor — report which hotspots need nudging
2. Adjust `top`/`left` in `HOTSPOTS` array (`script.js`) and `#hotspot-safe` (`style.css`) until all 11 align
3. Swap in final clue PNG images and update `clue` paths in `HOTSPOTS` array
4. Verify Start and Win screen button overlay positions
5. Run full end-to-end playthrough
6. Update `README.md` and close out Phase 8 documentation



## Completed So Far

- Repository und vollständiges Markdown-Scaffold erstellt
- Vollständige Spielspezifikation in `docs/game-spec.md`
- Implementierungsplan erstellt und von User bestätigt
- `ARCHITECTURE.md`, `DECISIONS.md`, `TASKS.md` mit Planungsentscheidungen aktualisiert
- **Phase 1:** `index.html`, `style.css`, `script.js` und alle Platzhalter-Assets erstellt
- **Phase 2:** Vollständiger DOM-Skeleton in `index.html`, `.hidden` CSS-Regel
- **Workflow-Optimierung:** `docs/game-spec.md`-Lesepflicht in `implement-next-task` und `review-work` auf bedingt geändert

## Files Changed (letzte Session)

Geändert:

- `.github/prompts/implement-next-task.prompt.md` — `docs/game-spec.md` von Pflichtlektüre auf bedingt umgestellt
- `.github/prompts/review-work.prompt.md` — `docs/game-spec.md` von Pflichtlektüre auf bedingt umgestellt

## Manual Check Result

- Prompt-Dateien nach Änderung gelesen und verifiziert
- Keine Spielfunktionalität betroffen

## What Was Not Tested

- Spielfunktionalität (keine Implementierungsänderungen in dieser Session)
- Phase 3 (CSS-Layout) steht noch aus

## Known Issues

- `ARCHITECTURE.md` nennt `.png` für Background- und Clue-Platzhalter; erstellt wurden `.svg`-Dateien. Funktioniert korrekt. Phase 2 muss `.svg`-Pfade referenzieren. `ARCHITECTURE.md` in Phase 8 anpassen.

## Important Constraints

- `index.html` direkt im Browser öffnen — kein lokaler Server, kein Build-Schritt
- `docs/game-spec.md` ist die Quelle der Wahrheit für alle Spielverhalten
- Genau 3 Screens, 1 Overlay, 3 Modals — Struktur ist fix (siehe `ARCHITECTURE.md`)
- Nur ein Modal darf gleichzeitig offen sein
- Der korrekte Safe-Code ist `9 1 2 6`
- Overlay-Klick schließt nur das Menü-Modal, nicht Item- oder Safe-Modal

## Key Architecture Decisions

Vollständige Details in `ARCHITECTURE.md` und `DECISIONS.md`.

- Einzelner `gameState`-Object für alle Laufzeit-Zustände
- `STRINGS`-Map + `renderText()` für alle lokalisierten UI-Texte
- `HOTSPOTS`-Array in `script.js` für alle 10 Hotspot-Positionen und Clue-Daten
- Prozent-basierte Hotspot-Positionen (skalieren mit Browserfenstergröße)
- `openModal()` / `closeModal()` als einzige erlaubte Modal-Steuerung
- `reset()` setzt alles zurück außer `gameState.language`

## Implementation Phases

| Phase | Goal | Status |
|-------|------|--------|
| 1 | Foundation and file skeleton | ✓ done |
| 2 | Static screen and modal markup | ✓ done |
| 3 | Base layout, modal sizing, hotspot styling | ← next |
| 4 | State model, screen flow, localization | |
| 5 | Item hotspot and clue modal system | |
| 6 | Safe modal and code validation | |
| 7 | Menu modal and full reset | |
| 8 | End-to-end browser verification and docs update | |

## Next Recommended Step

**Phase 3 — Base layout, modal sizing, hotspot styling**

Der Agent soll:

1. `TASKS.md` Phase-3-Checkliste lesen
2. `ARCHITECTURE.md` für Modal-Größen-Tier und Hotspot-Positionierungsregeln lesen
3. `style.css` erweitern: Screens füllen Viewport, Background-Images füllen Container, Hotspot-Layer über dem Bild, Hover-Indikator, Modal-Größen (groß/mittel/klein), Overlay deckt alles ab
4. Manuellen Check durchführen: Hover über Hotspot-Bereiche, Modals über DevTools sichtbar machen und Größen prüfen

