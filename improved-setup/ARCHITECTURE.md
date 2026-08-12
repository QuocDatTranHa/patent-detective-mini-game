# Architecture

Technical architecture of the project.

This file has two sections with different reading rules:

| Section | When to read |
|---|---|
| **Project Constraints** | Once at project start; skip entirely in implementation sessions |
| **Implementation Decisions** | When a task touches state model, component config, modal/overlay strategy, or file structure |

---

## Project Constraints

> Read once at project start. **Never re-read in implementation sessions.**

### Technical Boundaries

Use only:
- [List allowed technologies — e.g. HTML, CSS, vanilla JavaScript, local assets]

Do not require:
- [List prohibited dependencies — e.g. installation, internet access, build step, package manager, backend, database, external API]

### Source of Truth

Product behavior, interactions, acceptance criteria, and edge cases belong in:
- `docs/spec.md`

---

## File Structure

```
[Replace with actual file and folder structure once planned]

Example:
index.html          ← single HTML file; all screens and modals live here
style.css           ← all layout, modal sizing, component layer, hover indicators
script.js           ← state, screen flow, localization, modal control, reset
assets/
  [...]
docs/
  spec.md
```

No build step required. All paths are relative. Files are portable.

---

## Screen / View Structure

[Replace with: description of main screens or views. Include DOM IDs and visibility rules.]

| ID / Name | Description |
|---|---|
| `[id-1]` | [description] |
| `[id-2]` | [description] |
| `[id-3]` | [description] |

[Describe how screen switching works — e.g. CSS class toggled by JS; only active screen is visible]

---

## Component Strategy

[Replace with: description of interactive components — modals, overlays, dialogs — and how they are managed.]

Example:
- All modals present in DOM; only one visible at a time
- Single `openModal(id)` / `closeModal()` pair manages state and overlay visibility
- Overlay blocks background interactions when any modal is open

---

## State Model

[Replace with: the runtime state object shape and field descriptions.]

```js
// Example
const state = {
  screen: 'start',       // 'start' | 'game' | 'win'
  language: 'de',        // 'de' | 'en'
  openModal: null,       // null | 'item' | 'safe' | 'menu'
};
```

---

## Localization

[Replace with: how visible strings are managed. Example: STRINGS map keyed by language code, applied by renderText()]

---

## Implementation Decisions

> **Read when a task touches state model, component config, overlay strategy, or file structure.**
> Skip during CSS-only or text/content-only sessions.

[No implementation decisions yet. Add entries here as technical choices are made during development.]

Template for a new decision entry:

---

### [Decision number] — [Decision title]

Status: accepted

Decision:
[What was decided]

Reason:
[Why this approach was chosen]

Consequences:
- [Impact on implementation]
- [Impact on future agents]
