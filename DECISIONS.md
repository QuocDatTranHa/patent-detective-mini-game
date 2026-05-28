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

## Pending Decisions

These should be decided during or after the implementation plan:

* final file structure
* asset folder structure
* exact hotspot configuration format
* exact state management structure
* manual testing workflow

## Update Rule

When a new decision is made, add a short entry with:

* decision
* reason
* consequences

Do not add long explanations unless needed.
