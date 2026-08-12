# Create New Task

Analyse the task description(s) provided by the user in this message and add them to the project task tracking system. The input may describe a single task or multiple tasks — handle both cases.

The user's task description(s) are the text that follows the slash command invocation. Treat that text as the raw input to plan from.

Do not implement any code. Do not modify implementation files.

## Required Reading

Before doing anything, read:

1. `HANDOVER.md` — current project status and active phase
2. `TASKS.md` — existing phases and tasks; you will add to this file
3. `ARCHITECTURE.md` — technical constraints and file structure (Implementation Decisions section)
4. `DECISIONS.md` — accepted decisions; do not reopen them (Implementation Decisions section)
5. `KNOWN_ISSUES.md` — anything the new tasks might affect

Only read `docs/spec.md` if the new tasks relate to product behavior that is not already documented in the files above.

## Goal

Convert the user's raw task descriptions into a structured, implementation-ready task block and add it to `TASKS.md`.

## Step 1 — Understand the new task(s)

Parse the user input into a list of distinct tasks. For each task:

- Identify what needs to change (file, behavior, content, layout, etc.)
- Identify which existing files are affected
- Flag any ambiguity or assumption that needs recording
- Flag any conflict with an accepted decision in `DECISIONS.md`

If any task is too vague to plan concretely, state the assumption you are making and continue. Do not ask the user for clarification unless the task is entirely uninterpretable.

## Step 2 — Decide: new phase or extend existing?

Check the last open phase in `TASKS.md`:

- If the new tasks are closely related to that phase's goal, append them as a new named session or sub-group within that phase.
- If the new tasks are clearly a separate concern, create a new numbered phase.

State your decision and reason briefly before writing the task block.

## Step 3 — Split into agent-sized chunks

If there is only one small task, a single chunk is fine. If a task is large enough to risk overloading one session — it touches many files, requires significant logic changes and style changes together, or involves writing substantial new content — split it into sequential parts that each deliver a working intermediate state (e.g. "Session 3-A — HTML structure", "Session 3-B — CSS styling", "Session 3-C — JS wiring").

**Session sizing rules:**
- Minimum 3 concrete checklist items per session
- Maximum ~10 concrete checklist items per session
- Each session must be focused on one coherent concern (CSS only, JS logic only, content only)
- When in doubt, split rather than bundle

Each chunk must include:

- A goal sentence (one line)
- Files it will touch
- Concrete sub-tasks as a checklist (`- [ ]`)
- A manual check or browser verification step at the end

## Step 4 — Write to `TASKS.md`

Add the new phase or session block to `TASKS.md` in the correct position.

Also update `CURRENT_PHASE.md` if the new task is the immediate next action.

## Stop Rule

Stop after adding the task block to `TASKS.md`. Do not implement any code. Wait for the user to confirm before starting implementation.
