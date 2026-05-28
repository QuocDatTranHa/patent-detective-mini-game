# Tasks

This file tracks concrete project tasks for the Copilot Agent workflow.

## Done

- [x] Create repository
- [x] Create minimal Markdown scaffold
- [x] Add `.github/copilot-instructions.md`
- [x] Add `AGENTS.md`
- [x] Add `PLAN.md`
- [x] Add `TASKS.md`
- [x] Add `HANDOVER.md`
- [x] Add `ARCHITECTURE.md`
- [x] Add `DECISIONS.md`
- [x] Add `KNOWN_ISSUES.md`
- [x] Add `AGENT_LOG.md`
- [x] Add full game specification to `docs/game-spec.md`

## Current Task

- [ ] Ask the VS Code Copilot Agent to create a step-by-step implementation plan

## Copilot Planning Tasks

- [ ] Ask the VS Code Copilot Agent to read all project context files
- [ ] Ask the agent to analyze `docs/game-spec.md`
- [ ] Ask the agent to create a step-by-step implementation plan
- [ ] Ask the agent to identify the final file structure
- [ ] Ask the agent to identify assumptions, risks, and edge cases
- [ ] Allow the agent to update Markdown workflow files if clear rules, decisions, or architecture choices are established
- [ ] Review the implementation plan manually
- [ ] Approve or adjust the implementation plan

## Implementation Tasks

Do not start these tasks until the implementation plan has been reviewed and approved.

- [ ] Create final game file structure
- [ ] Create `index.html`
- [ ] Create `style.css`
- [ ] Create `script.js`
- [ ] Create local asset folders
- [ ] Implement Start Screen
- [ ] Implement Game Screen
- [ ] Implement Win Screen
- [ ] Implement game state management
- [ ] Implement 10 item hotspots
- [ ] Implement item clue modals
- [ ] Implement safe/code modal
- [ ] Implement menu modal
- [ ] Implement restart/reset logic
- [ ] Add or prepare placeholder assets
- [ ] Manually test the game in a modern browser
- [ ] Update documentation and handover files

## Acceptance Checklist

The implementation is not complete until these points work:

- [ ] The game starts on the Start Screen
- [ ] The game can be started by opening `index.html` directly in a browser
- [ ] No installation is required
- [ ] No internet access is required
- [ ] No build step is required
- [ ] The Game Screen has exactly 10 clickable item hotspots
- [ ] Item hover indicators work
- [ ] Item clue modals open and close correctly
- [ ] Only one modal can be open at a time
- [ ] Background interactions are blocked while a modal is open
- [ ] The safe modal has 4 digits with up/down controls
- [ ] The correct code `9 1 2 6` opens the Win Screen
- [ ] A wrong code shows a temporary error message
- [ ] The menu modal can restart the game
- [ ] The Win Screen can restart the game
- [ ] Restart fully resets the game state

## Current Next Step

Run the first VS Code Copilot Agent planning task.

The agent should plan only and must not implement before the user approves the plan.