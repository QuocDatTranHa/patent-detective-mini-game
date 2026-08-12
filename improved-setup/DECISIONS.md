# Decisions

Project decisions recorded for future agents.

This file has two sections with different reading rules:

| Section | When to read |
|---|---|
| **Project Constraints** | Once at project start; **never re-read in implementation sessions** |
| **Implementation Decisions** | When a task touches state model, component config, overlay strategy, or file structure |

Agents reading `implement-next-task` should read **only the Implementation Decisions section**.

---

## Project Constraints

> Set at project start. These do not change.
> **Read once. Skip entirely in all implementation sessions.**

### 1. [Constraint title — e.g. "Use only local browser technologies"]

Status: accepted

Decision:
[What was decided — e.g. "The project must use only HTML, CSS, vanilla JavaScript, and local assets."]

Reason:
[Why — e.g. "The finished product must be portable and usable without installation or a network connection."]

Consequences:
- [Impact — e.g. "No framework, build step, package manager, backend, database, or external API"]

---

### 2. [Constraint title — e.g. "Plan before implementation"]

Status: accepted

Decision:
[What was decided]

Reason:
[Why]

Consequences:
- [Impact]

---

### 3. [Constraint title — e.g. "Use docs/spec.md as the source of truth for product behavior"]

Status: accepted

Decision:
[What was decided]

Reason:
[Why]

Consequences:
- [Impact]

---

## Implementation Decisions

> Accumulated during the project as technical choices are made.
> **Read when a task touches state model, component config, overlay strategy, or file structure.**
> Skip during CSS-only or text/content-only sessions.

[No implementation decisions yet. Add entries here as architectural choices are made during development.]

Template for a new entry:

---

### [Decision number] — [Decision title]

Status: accepted

Decision:
[What was decided]

Reason:
[Why]

Consequences:
- [Impact on implementation]
- [Impact on future agents]
