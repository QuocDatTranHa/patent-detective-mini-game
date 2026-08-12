# GitHub Copilot Instructions

> **How to use this template:**
> Replace every `[PLACEHOLDER]` block with project-specific content.
> Remove the `> **How to use this template:**` note after setup is complete.

This repository contains [PROJECT NAME — replace with a one-sentence project description].

Keep the project intentionally simple and easy to understand.

---

## Technical Constraints

[Replace with: the technical constraints for this project.]

Example for a local browser-based project:

- Use only HTML, CSS, vanilla JavaScript, and local assets
- No frameworks, build tools, package managers, or external APIs
- All asset paths must be relative and local
- Must run by opening `index.html` directly in a browser — no server required

Do not add tools, frameworks, dependencies, or config files unless explicitly approved by the user.

---

## Required Context Before Work

Use **scope-based reading**. Identify the task type before loading files.

**Always read first (every session):**

1. `CURRENT_PHASE.md` — active phase, session, next task, files affected
2. `HANDOVER.md` — current project state and next recommended step

**Apply scope-based reading after that:**

| Task scope | Additional files to read |
|---|---|
| CSS-only or text/content-only | Affected source file(s) only |
| JS logic changes | + `ARCHITECTURE.md` (Implementation Decisions section only) |
| New feature / new component / new screen | + `ARCHITECTURE.md` + `DECISIONS.md` (Implementation Decisions sections only) |
| Any scope | + `KNOWN_ISSUES.md` only if a known issue is directly relevant to the task |

**Read `TASKS.md` in full only when:**
- Creating or planning new tasks (`create-new-task`, `create-implementation-plan`)
- A session briefing requires the full current-phase checklist

**Read `docs/spec.md` only when:**
- A specific behavior is unclear from `ARCHITECTURE.md`, `DECISIONS.md`, or the phase checklist

**Never read** `ARCHITECTURE.md`, `DECISIONS.md`, or `KNOWN_ISSUES.md` by default for CSS-only or text/content-only tasks.

---

## Workflow Rules

**For planning tasks:**
- Plan first. Do not implement code unless explicitly asked.
- Identify affected files, assumptions, risks, and next steps.
- Wait for user approval before starting implementation.

**For implementation tasks:**
- Follow the current plan.
- Keep changes small, simple, and focused on the current phase.
- Avoid over-engineering.
- Do not introduce dependencies or infrastructure unless approved.
- Minimum 3 checklist items per session; maximum ~10.

**Review gate:**
Run `review-work` every 3rd phase (e.g. phases 3, 6, 9, 12…) or before any phase that introduces a new publicly-visible UI element or major behavior change.

**After implementation sessions, update in this order:**
1. `HANDOVER.md` — full rewrite
2. `CURRENT_PHASE.md` — rewrite with new phase/session/next task
3. `TASKS.md` — check off completed items
4. `AGENT_LOG.md` — prepend one entry (completed work only; no planning notes)
5. `KNOWN_ISSUES.md` — review every open item; remove resolved items
6. `DECISIONS.md` — only if an architectural decision was made this session

Do not add dates, timestamps, or "Last Updated" lines to any file.

---

## Project-Specific Rules

[Replace with: rules specific to this project's source code and file conventions.]

Follow `docs/spec.md` as the source of truth for product behavior.

---

## Completion Rule

Do not mark implementation work as complete without checking the relevant behavior manually or clearly stating what was not tested.
