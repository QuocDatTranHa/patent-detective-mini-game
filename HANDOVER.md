# Handover

This file gives the next coding agent the current project status and recommended next step.

## Current Status

**Phase 7 abgeschlossen + user-confirmed overlay behaviour change — 2026-05-29**

- Menu modal, item modals, and safe modal all close when clicking the overlay (user confirmed working)
- This overrides the original spec; recorded as Decision 11 in `DECISIONS.md`

Bereit für Phase 8 — End-to-end browser verification and docs update.

**Asset reminder:** final background images and clue images must be in place before Phase 8 starts. Hotspot positions in `script.js` and `#hotspot-safe` in `style.css` will also need updating to match the real background.

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

## Files Changed (letzte Session — 2026-05-29)

- `script.js` — overlay click handler now calls `closeModal()` unconditionally (all modals close on overlay click)
- `DECISIONS.md` — Decision 11 added (overlay closes all modals)

## Manual Check Result

User confirmed in browser:
- All modals (clue, safe, menu) close when clicking the overlay
- Safe modal arrows, confirm, and close buttons work as intended
- Wrong code shows error with stable modal height
- Menu button and menu modal buttons work

Not explicitly confirmed:
- Restart flow (mid-game and from Win screen): Start screen appears, language preserved, safe resets to `0 0 0 0`

## What Was Not Tested

- Full restart flow (mid-game and from Win screen) not explicitly verified
- No full end-to-end playthrough performed
- Hotspot positions are still placeholders — do not match any real background art
- Clue images are placeholder SVGs
- File has not been tested after copying to a different machine

## Known Issues

- `ARCHITECTURE.md` nennt `.png` für Background- und Clue-Platzhalter; erstellt wurden `.svg`-Dateien. Funktioniert korrekt. In Phase 8 anpassen.
- All hotspot positions (`HOTSPOTS` array in `script.js`, `#hotspot-safe` in `style.css`) are placeholders and must be updated when final background art is available.
- Full restart flow not browser-verified yet.

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

**Phase 8 — End-to-end browser verification and docs update**

**Before starting Phase 8:** replace all placeholder assets with final images and update hotspot positions.

Phase 8 tasks:
- Full manual playthrough: start → game → hotspots → menu restart → safe (wrong + correct) → win → restart
- Verify language persists after restart
- Verify double-click does not open two modals
- Update `README.md` with agent workflow prompt sequence
- Update `ARCHITECTURE.md` to reflect `.svg` placeholder naming

## Last Updated

2026-05-29 (Phase 7 complete)

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

## Last Updated

2026-05-28 — Phase 2 abgeschlossen; Phase 3 bereit