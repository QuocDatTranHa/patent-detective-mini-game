# Decisions

This file records project decisions that future agents should not rediscover or change without reason.

Keep entries concise.

## Accepted Decisions

### 1. Use only local browser technologies

Status: accepted

Decision:
The game must use only HTML, CSS, vanilla JavaScript, and local assets.

Reason:
The finished game must be portable and playable by opening `index.html` directly in a modern browser.

Consequences:

* no framework
* no build step
* no package manager
* no backend
* no database
* no external API

### 2. Plan before implementation

Status: accepted

Decision:
The Copilot Agent must create an implementation plan before coding starts.

Reason:
The game specification is detailed and should be converted into a clear step-by-step plan first.

Consequences:

* no implementation before plan review
* the user must approve the plan before coding
* the agent may update project memory files after planning if clear rules or architecture decisions are established

### 3. Use `docs/game-spec.md` as game behavior source of truth

Status: accepted

Decision:
Game behavior, interactions, acceptance criteria, and edge cases are defined in `docs/game-spec.md`.

Reason:
Avoid duplicating the full game specification across multiple files.

Consequences:

* architecture and planning files should summarize only the chosen approach
* do not copy the full specification into other Markdown files
* if behavior conflicts appear, `docs/game-spec.md` wins unless the user explicitly changes it

### 13. Start-screen HOTSPOTS entries use `startScreen: true` flag

Status: accepted

Decision:
HOTSPOT entries that belong to the start screen (not the game screen) carry a `startScreen: true` property. `renderHotspots()` skips them. A separate `renderStartHotspots()` function handles click wiring for these entries.

Reason:
The `HOTSPOTS` array is the single source of truth for all item hotspot data (project instruction rule). Start-screen hotspots have the same data shape, so they belong in the same array. The flag keeps the game-screen renderer from injecting them into `#hotspot-layer`.

Consequences:
- `renderHotspots()` must check `if (spot.startScreen || spot.winScreen) return;` at the top of its forEach callback
- `renderStartHotspots()` must be called once on init alongside `renderHotspots()`
- Start-screen hotspot DOM elements are placed directly inside `#screen-start` in `index.html`, not in `#hotspot-layer`

### 14. Win-screen HOTSPOTS entries use `winScreen: true` flag

Status: accepted

Decision:
HOTSPOT entries that belong to the win screen carry a `winScreen: true` property. `renderHotspots()` skips them. A separate `renderWinHotspots()` function handles click wiring, mirroring the `renderStartHotspots()` pattern.

Reason:
Same rationale as Decision 13: the HOTSPOTS array is the single source of truth; the flag prevents game-screen injection without duplicating the data structure.

Consequences:
- `renderHotspots()` skip condition extended to `if (spot.startScreen || spot.winScreen) return;`
- `renderWinHotspots()` must be called once on init
- Win-screen hotspot DOM elements are placed directly inside `#screen-win` in `index.html`, not in `#hotspot-layer`

### 15. `hideText: true` flag suppresses the text panel in `#modal-item`

Status: accepted

Decision:
HOTSPOT entries that should open a full-width image modal (no text panel) carry `hideText: true`. `openModal()` hides `#modal-item-text` and expands `#modal-item-image` to fill the modal; `closeModal()` clears those inline styles.

Reason:
The patent document popup needs a full-width layout without a text panel. Adding a fourth modal container is prohibited by the project instructions (exactly three modal containers). The `hideText` flag reuses the existing `#modal-item` with minimal new logic.

Consequences:
- `openModal('item', index)` must check `spot.hideText` and apply inline styles
- `closeModal()` must clear those inline styles unconditionally

---



Status: accepted (planning phase)

Decision:
The game is implemented as three files: `index.html`, `style.css`, `script.js`, plus a shallow `assets/` folder.

Reason:
Simplest portable structure. No build step, no module bundler, no extra complexity. Sufficient for the game scope.

Consequences:

* all screens and modals live in one HTML file
* all state and interaction logic lives in one JS file
* if the files grow large in a later session, splitting can be reconsidered — but only with user approval

### 5. Percentage-based hotspot positioning

Status: accepted (planning phase)

Decision:
All hotspot positions (top, left) are expressed as percentages of the game scene container, not fixed pixels.

Reason:
Hotspots must stay aligned to the background image across different browser window sizes on different laptops.

Consequences:

* hotspot coordinates must be re-verified whenever the background image proportions change
* final coordinates should only be locked in after the placeholder background dimensions are chosen

### 6. Centralized state object (`gameState`)

Status: accepted (planning phase)

Decision:
All runtime state lives in a single `gameState` object. No `localStorage`, no global variables scattered through the file.

Reason:
Makes reset logic trivial: one function resets the object and re-renders from it. Easier to debug and verify.

Consequences:

* `reset()` must explicitly list every field it resets
* language is the only field `reset()` must NOT reset

### 7. Centralized string map for localization

Status: accepted (planning phase)

Decision:
All visible UI strings are stored in a `STRINGS` object keyed by `'de'` / `'en'`. A `renderText()` helper applies them.

Reason:
Avoids scattering German/English conditionals throughout the code. Makes language-switch and future text changes easy.

Consequences:

* every user-visible string must be added to `STRINGS` — not hardcoded in HTML or event handlers

### 8. Local SVG assets for flag icons and hover indicator

Status: accepted (planning phase)

Decision:
Use small local SVG files (`flag-de.svg`, `flag-en.svg`, `hover-warning.svg`) in `assets/ui/`.

Reason:
SVG is portable, resolution-independent, and requires no internet access. Inline SVG is also acceptable as a fallback.

Consequences:

* no CDN or external image URLs for UI icons
* if SVG files are replaced by final brand assets later, the `src` attribute paths stay the same

### 9. Hotspot data defined in a single config array

Status: accepted (planning phase)

Decision:
All ten item hotspots are described in a `HOTSPOTS` array in `script.js`. Each entry has position, clue image path, and localized title.

Reason:
Avoids repeating hotspot logic ten times. New items can be added or repositioned without touching modal or event handler code.

Consequences:

* hotspot rendering and event binding must loop over `HOTSPOTS`
* adding a hotspot later means only adding one entry to the array

## Pending Decisions

These should be confirmed during implementation:

* exact hotspot percentage coordinates (depends on placeholder background dimensions)
* exact placeholder image sizes and aspect ratios
* whether clue modals show a title line or image-only (spec says "optional title")

### 10. Hotspot top/left coordinates refer to the center of the hit area

Status: accepted (Phase 5)

### 11. Overlay click closes all modals (spec override)

Status: accepted (user decision)

Decision:
Clicking the overlay closes any open modal, not just the menu modal.

Reason:
User explicitly requested this during browser testing. Simpler and more intuitive UX.

Consequences:

* the overlay click handler calls `closeModal()` unconditionally
* `docs/game-spec.md` originally restricted overlay-close to `#modal-menu` only — that rule no longer applies
* future review prompts should not flag this as a spec violation

Decision:
The `top` and `left` percentage values in `HOTSPOTS` (and on `#hotspot-safe`) describe the **center** of the hotspot hit area, achieved via `transform: translate(-50%, -50%)` on `.hotspot`.

Reason:
Percentage coordinates that map to a center point are more intuitive for placing hotspots on the background image than top-left corner offsets.

Consequences:

* all hotspot positions must be defined as the center of the desired hit area
* `transform` must not be overridden on individual hotspots unless centering is intentionally changed

### 12. Language toggle visible on all screens (spec override)

Status: accepted (user decision)

Decision:
The language flag button is visible and functional on all three screens, not just the Start screen.

Reason:
User requested this during implementation. Better UX — player can switch language at any point.

Consequences:

* `#btn-language` is no longer inside `#screen-start`; it lives in a dedicated `#ui-layer` div that matches screen dimensions and is `position: fixed` at `z-index: 102`
* `docs/game-spec.md` section 4 and 5 updated accordingly
* future review prompts should not flag this as a spec violation

### 13. 11 clickable elements on the Game Screen (spec override)

Status: accepted (user decision)

Decision:
The game has 11 clickable elements, not 10. The detective/gamemaster consists of two hitboxes (body + speech bubble) that both open the same modal, counting as one logical element.

The 11 elements are:
1. Detective / Gamemaster (body + bubble hitbox)
2. Q-Monitor (Easter Egg)
3. Security Keypad (relevant clue)
4. Energy Module (relevant clue)
5. Chair (relevant clue)
6. Microscope (irrelevant clue)
7. Tool Wagon (relevant clue)
8. 3D Printer (irrelevant clue)
9. Measuring Device (irrelevant clue)
10. Whiteboard (irrelevant clue)
11. Safe (body + bubble hitbox) — opens Tresor-Modal, not item modal

Reason:
The background image has 11 distinct neon-highlighted interactive objects. The detective and safe each have a speech bubble that acts as an additional click area for the same modal.

Consequences:

* `HOTSPOTS` array has 11 entries; entries with `linkedTo` share a modal with their paired entry
* `docs/game-spec.md` sections 6 and 7 updated accordingly
* future review prompts should not flag the 11-entry count as a spec violation

### 14. Modal image fills full window; no title bar or padding

Status: accepted (user decision)

Decision:
All item modals (`#modal-item`, `#modal-safe`, `#modal-menu`) have no padding. The background image fills the entire rounded window. The item title line is hidden.

Reason:
User requested image-first presentation. Text title was redundant given the clue images.

Consequences:

* `#modal-item` is `display: block`, `aspect-ratio: 16/9`, `padding: 0`
* `#modal-safe` is `aspect-ratio: 16/9`, `padding: 0`; digit controls are absolutely positioned
* `#modal-menu` is `aspect-ratio: 1/1`, `padding: 0`; restart button is an invisible hitbox
* close button is `position: absolute` top-right on all modals

### 15. Close button is a neon-red Tron-style X; no text label

Status: accepted (user decision)

Decision:
All `.btn-close` buttons show only `✕`, styled with a dark background, red neon border and glow. No language-dependent text.

Reason:
Fits the Tron Legacy visual theme. Icon is universally understood.

Consequences:

* `data-text="close"` removed from all `.btn-close` elements
* `close` key in `STRINGS` remains but is unused in the DOM

### 16. Safe modal uses image background with absolute-positioned hitboxes

Status: accepted (user decision)

Decision:
The Tresor-Modal shows a background image (`safe-background.png`). Up/down arrows, ENTER button, and digit displays are all invisible/absolute-positioned elements overlaid on the drawn image.

Reason:
User provided a custom safe artwork with drawn arrows, digit boxes, and an ENTER button. HTML controls are replaced by transparent hitboxes aligned to the image.

Consequences:

* `assets/clues/safe-background.png` is a required asset
* Arrow and ENTER button positions are percentages relative to the 16:9 modal
* Digit displays use `font-family: 'Courier New'`, `color: #fff`, blue neon `text-shadow`, `font-size: 7cqh`

### 17. Per-hotspot `textBox` inline override for text panel alignment

Status: accepted (Phase 10)

Decision:
HOTSPOT entries may carry an optional `textBox: { left, top, width, height }` property. When present, `openModal('item')` applies these as inline styles on `#modal-item-text`. `closeModal()` clears all four inline styles to restore CSS defaults.

Reason:
Different clue images have their white text panel starting at different left positions. A per-entry override avoids needing separate CSS rules per modal and keeps all layout data in the HOTSPOTS array.

Consequences:

* four HOTSPOT entries currently carry a `textBox` value (chair, microscope, 3D printer, whiteboard)
* entries without `textBox` use the CSS default (`left: 48%` etc.)
* any new clue image with an off-center white panel should be handled by adding `textBox` to its HOTSPOT entry, not by adding a new CSS rule

## Update Rule

When a new decision is made, add a short entry with:

* decision
* reason
* consequences

Do not add long explanations unless needed.
