---
applyTo: "**/*.{html,css,js}"
---

# Project Coding Rules

These rules apply whenever you are editing `index.html`, `style.css`, or `script.js`.

They complement `.github/copilot-instructions.md`. Both files are active at the same time.

## Technology

- Vanilla HTML, CSS, JavaScript only.
- No frameworks, no build tools, no package managers, no external URLs.
- All asset `src` and `href` values must be relative local paths (e.g. `assets/ui/flag-de.svg`).

## JavaScript

- All runtime state lives in the single `gameState` object. Do not create additional global variables for state.
- All visible UI strings live in the `STRINGS` object. Do not hardcode German or English text anywhere else.
- All item hotspot data lives in the `HOTSPOTS` array. Do not duplicate hotspot logic outside this array.
- Only one modal may be open at a time. Use `openModal()` and `closeModal()` — do not show or hide modal elements directly.
- `reset()` must reset every field in `gameState` except `gameState.language`. Do not add extra reset logic elsewhere.
- Do not use `localStorage`, `sessionStorage`, cookies, or any other persistence mechanism.
- Do not use `eval()` or `innerHTML` to inject executable content.

## CSS

- Hotspot positions (`top`, `left`) must use percentage values, not fixed pixels.
- Screen visibility must be controlled by a class (e.g. `hidden`) toggled by JavaScript, not by inline styles scattered across the code.
- The overlay must be a single shared element that sits above the game background and below the modal.

## HTML

- There must be exactly three screen containers: `#screen-start`, `#screen-game`, `#screen-win`.
- There must be exactly one overlay element: `#overlay`.
- There must be exactly three modal containers: `#modal-item`, `#modal-safe`, `#modal-menu`.
- Do not add extra modal containers or screen containers without updating `ARCHITECTURE.md` and getting user approval.

## Assets

- Placeholder assets are acceptable until final images exist.
- Do not reference any external image URL, CDN, or API in any asset path.
- Flag icons and the hover indicator must be local files in `assets/ui/`.

## General

- Keep changes small and focused on the current phase task.
- If a behavior is unclear, check `docs/game-spec.md` before guessing.
- If a technical approach is unclear, check `ARCHITECTURE.md` and `DECISIONS.md` before inventing a new pattern.
