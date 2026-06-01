# Create New Task

Analyse the task description(s) provided by the user in this message and add them to the project task tracking system. The input may describe a single task or multiple tasks — handle both cases.

The user's task description(s) are the text that follows the slash command invocation. Treat that text as the raw input to plan from.

Do not implement any code. Do not modify `index.html`, `style.css`, or `script.js`.

## Required Reading

Before doing anything, read:

1. `HANDOVER.md` — current project status and active phase
2. `TASKS.md` — existing phases and tasks; you will add to this file
3. `ARCHITECTURE.md` — technical constraints and file structure
4. `DECISIONS.md` — accepted decisions; do not reopen them
5. `KNOWN_ISSUES.md` — anything the new tasks might affect

Only read `docs/game-spec.md` if the new tasks relate to game behavior that is not already documented in the files above.

## Goal

Convert the user's raw task descriptions into a structured, implementation-ready task block and add it to `TASKS.md`.

## Step 1 — Understand the new task(s)

Parse the user input into a list of distinct tasks. If only one task is described, treat it as a list of one. For each task:

- Identify what needs to change (file, behavior, content, layout, etc.)
- Identify which existing files are affected
- Flag any ambiguity or assumption that needs recording
- Flag any conflict with an accepted decision in `DECISIONS.md`

If any task is too vague to plan concretely, state the assumption you are making and continue. Do not ask the user for clarification unless the task is entirely uninterpretable.

## Step 2 — Decide: new phase or extend existing?

Check the last open phase in `TASKS.md`:

- If the new tasks are closely related to that phase's goal, append them to that phase as a new named session or sub-group.
- If the new tasks are clearly a separate concern, create a new numbered phase (e.g. **Phase 13**).

State your decision and reason briefly before writing the task block.

## Step 3 — Split into agent-sized chunks

If there is only one small task, a single chunk is fine. If a single task is large enough to risk overloading one session — for example, it touches many files, requires significant JS logic changes and CSS changes together, or involves writing substantial new content — split it into sequential parts that each deliver a working intermediate state (e.g. "Task 13a — HTML structure", "Task 13b — CSS styling", "Task 13c — JS wiring"). For larger or multiple tasks, group them into chunks. Each chunk must be:

- Completable in a single agent session without overloading the context
- Focused on one coherent concern (e.g. "CSS only", "JS logic only", "content/text only")
- Named as a session label (e.g. `Session 13-A`, `Session 13-B`) or as numbered sub-tasks (e.g. `Task 13a`, `Task 13b`)

Use qualitative judgment for chunk size: a chunk should feel like a reasonable unit of work — not a single-line fix, and not a full phase rewrite. When in doubt, split rather than bundle.

Each chunk must list:

- A goal sentence
- The concrete sub-tasks as a checklist (use `- [ ]`)
- The files it will touch
- A manual check or browser verification step at the end

## Step 4 — Write the task block

Write the full task block in the style and format of existing phases in `TASKS.md`.

Follow the existing formatting exactly:

- Phase or session heading with `###`
- Goal sentence in plain prose
- Sub-tasks as `- [ ]` checklist items
- Manual check at the end of each chunk
- Leave no sub-task underspecified — each item must be actionable by an agent reading it cold

## Step 5 — Update project files

Update only what is necessary:

### `TASKS.md`
Add the new phase or session block in the correct position (after the last existing phase or appended to the open phase). Do not modify any existing checked or unchecked items.

### `AGENT_LOG.md`
Add a brief entry noting that new tasks were planned and added.

### `KNOWN_ISSUES.md`
If any new task reveals a risk or fragile area not already listed, add a concise entry.

### `DECISIONS.md`
If the planning process established a new technical constraint or approach, add a concise entry.

Do not update `HANDOVER.md` — that file is updated after implementation, not after planning.

## Stop Rule

Stop after updating the project files. Produce a short summary of:

- How many tasks were added
- Which phase or session they were added to
- Any assumptions made
- Any conflicts or risks flagged

Do not start implementing the new tasks. Wait for the user to confirm before any code changes.
