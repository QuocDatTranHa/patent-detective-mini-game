# Architecture

This file documents the current technical architecture of the project.

## Status

Architecture is not finalized yet.

The Copilot Agent should create the implementation plan first, based on `docs/game-spec.md`.

After the implementation plan is approved, update this file to reflect the chosen architecture.

Keep this file concise and avoid duplicating `docs/game-spec.md`.

## Current Direction

The project is a simple, fully local browser-based point-and-click mini game.

The finished game must run by opening `index.html` directly in a modern browser.

## Technical Boundaries

Use only:

* HTML
* CSS
* vanilla JavaScript
* local assets

Do not require:

* installation
* internet access
* build step
* local server
* package manager
* backend
* database
* external API

## Source of Truth

Game behavior, interactions, screens, modals, state requirements, and acceptance criteria belong in:

* `docs/game-spec.md`

## To Be Filled After Planning

After the implementation plan is approved, document only the final chosen approach for:

* file structure
* screen structure
* state management
* modal handling
* asset structure
* reset logic
* manual testing approach

## Rule

Do not treat this file as the implementation plan.

The implementation plan must be created separately and approved before coding starts.
