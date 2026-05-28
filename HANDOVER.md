# Handover

This file gives the next coding agent the current project status and recommended next step.

## Current Status

**Phase 2 abgeschlossen** — Vollständiger DOM-Skeleton in `index.html`. Bereit für Phase 3.

**Session 2026-05-28 (Prompt-Optimierung)** — `docs/game-spec.md` ist in `implement-next-task.prompt.md` und `review-work.prompt.md` jetzt bedingt (wird nicht mehr bei jedem Aufruf pflichtmäßig gelesen). Keine Implementierungsänderungen.

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