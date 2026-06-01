# Patent Detective Mini Game

A local browser-based point-and-click mini game. Open `index.html` directly in any modern browser — no installation, server, or build step required.

## How to Play

1. Open `index.html` in Chrome or Firefox.
2. Click **Start** on the start screen.
3. Explore the lab by clicking on highlighted objects to read clue descriptions.
4. Find the safe and enter the correct code to win.

## Agent Workflow

This project uses a prompt-driven agent workflow. Each session follows this sequence:

| Step | Prompt | Purpose |
|------|--------|---------|
| 1 | `start-session` | Orient the agent: read project state, produce a session briefing, wait for confirmation |
| 2 | `implement-next-task` | Implement the next unchecked phase from `TASKS.md`, run the manual check, report results |
| 3 | `review-work` | Review what was built, validate against the game spec, identify issues |
| 4 | `update-handover` | Update `HANDOVER.md`, `TASKS.md`, and `AGENT_LOG.md` to reflect completed work |

Prompts are stored in `.github/prompts/`. Project state is tracked in the Markdown files at the repository root (`HANDOVER.md`, `TASKS.md`, `DECISIONS.md`, `KNOWN_ISSUES.md`, `AGENT_LOG.md`).

Before any implementation, the agent reads `HANDOVER.md` and `TASKS.md` to find the current phase and next unchecked task. After implementation, the agent updates the workflow files so the next session can pick up exactly where this one left off.
