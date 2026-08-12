---
applyTo: "[Replace with glob pattern for source files — e.g. **/*.{html,css,js}]"
---

# Project Coding Rules

> **How to use this template:**
> Replace the `applyTo` glob pattern above with the file types this project uses.
> Replace every `[PLACEHOLDER]` section with project-specific coding rules.
> Remove this note after setup is complete.

These rules apply whenever you are editing source files matching the `applyTo` pattern above.

They complement `.github/copilot-instructions.md`. Both files are active at the same time.

---

## Technology

[Replace with: allowed and prohibited technologies for this project's source files.]

Example:
- Vanilla HTML, CSS, JavaScript only
- No frameworks, no build tools, no package managers, no external URLs
- All asset `src` and `href` values must be relative local paths

---

## State Management

[Replace with: rules about where and how application state is managed.]

Example:
- All runtime state lives in the single `state` object. Do not create additional global variables for state.
- All visible UI strings live in the `STRINGS` object. Do not hardcode language-specific text anywhere else.

---

## Components and DOM

[Replace with: rules about how UI components, modals, and DOM structure are managed.]

Example:
- Only one modal may be open at a time. Use `openModal()` and `closeModal()` — do not show or hide modal elements directly.
- Screen visibility must be controlled by a CSS class toggled by JavaScript, not by inline styles.
- There must be exactly [N] screen containers and exactly [N] modal containers.

---

## Assets

[Replace with: rules about how assets are referenced and where they live.]

Example:
- Do not reference any external image URL, CDN, or API in any asset path.
- All images and icons must be local files under `assets/`.

---

## Security

[Replace with: any security rules relevant to this project's source code.]

Example:
- Do not use `eval()` or `innerHTML` to inject executable content.
- Do not use `localStorage`, `sessionStorage`, cookies, or any other persistence mechanism without explicit approval.

---

## General

- Keep changes small and focused on the current phase task.
- If a behavior is unclear, check `docs/spec.md` before guessing.
- If a technical approach is unclear, check `ARCHITECTURE.md` and the Implementation Decisions section of `DECISIONS.md` before inventing a new pattern.
- Do not add comments, docstrings, or type annotations to code you did not change.
