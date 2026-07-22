# Presentation: Vibe Coding Workflow

## Slide 1 — Game Specification: Concept

- Browser-based patent escape-room game
- Player role: **Patent Detective**
- Intellectual Property and prior-art context
- Futuristic office, laboratory and workshop setting
- Hidden-object and puzzle-based gameplay
- Technical clues and invention features
- Final objective: derive and enter the safe code **9126**

**Talking point:** "The player is a Patent Detective in a futuristic lab, hunting technical clues to crack the safe code 9126."

---

## Slide 2 — Game Specification: Functionality

- Three main screens: **Start, Game and Win**
- Interactive objects and clickable hotspots
- Pop-up windows for clues and information
- Navigation between different clue contents
- Safe code input and validation
- German and English language selection
- Replay and game-reset functionality

**Note:** Image assets and game texts were created before the Vibe Coding phase and are not included in the measured coding effort.

---

## Slide 3 — Preparation for GitHub Copilot

(Layout: two columns. LEFT column = "What I prepare" as a short list, each item tagged with who creates it — either "I create" or "agent creates". RIGHT column = the project folder structure with a short comment next to each file/group explaining what it does. Docs can be aggregated into groups, e.g. context & memory, on the right side.)

**LEFT — What I prepare**

- Game Spec (central reference) — *I create*
- Copilot instructions (rules & constraints) — *I create*
- Structured docs = context & memory — *agent creates*
- 6 prompts (one goal each) — *I create*

**RIGHT — Project structure**

```
patent-detective-mini-game/
├── .github/
│   ├── copilot-instructions.md   ← global rules the agent always follows
│   ├── instructions/
│   │   └── project.instructions.md ← coding rules (scoped to .html/.css/.js)
│   └── prompts/                  ← the 6 reusable session prompts
├── docs/
│   └── game-spec.md              ← source of truth for game behavior
│
├── PLAN.md                       ← overall strategy           ┐
├── TASKS.md                      ← task checklist / progress  │
├── HANDOVER.md                   ← current status + next step │
├── ARCHITECTURE.md               ← technical structure        │ CONTEXT & MEMORY
├── DECISIONS.md                  ← why choices were made      │ (agent-maintained)
├── KNOWN_ISSUES.md               ← risks & fragile areas      │
└── AGENT_LOG.md                  ← work history               ┘
```

**Talking point:** "I bring the game spec, the rules, and the prompts. The agent maintains the context and memory files. Left side is the ingredients, right side is where they live."

---

## Slide 4 — Six Structured Copilot Prompts

- Six prompts derived from the Game Specification
- Separation of the project into manageable implementation steps
- One clearly defined objective per prompt
- Defined components and affected files
- Functional and technical requirements
- Acceptance criteria for each implementation step
- Step-by-step execution instead of one large prompt

**Key message:** "One giant prompt fails. Six focused prompts — each with a single goal and clear acceptance criteria — succeed."

---

## Slide 5 — The Big Picture: 3 Layers

Show the project as **3 concentric layers**:

```
┌─────────────────────────────────────────────────────┐
│                   GUARDRAILS                        │
│   copilot-instructions.md · project.instructions.md │
│  ┌───────────────────────────────────────────────┐  │
│  │            PERSISTENT MEMORY                  │  │
│  │  HANDOVER · TASKS · PLAN · ARCHITECTURE       │  │
│  │  DECISIONS · KNOWN_ISSUES · AGENT_LOG         │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │          6 PROMPT FILES                 │  │  │
│  │  │  (the buttons I press to drive work)    │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Talking point:** "The outer ring is rules the AI always follows. The middle ring is project memory that survives across sessions. The inner ring is the 6 prompts I use to interact — like buttons on a remote control."

---

## Slide 6 — The 6 Prompts as a Cycle

Visual: a **circular workflow diagram** with numbered steps and arrows. Color-code by type (blue = planning, green = implementation, orange = verification, grey = bookkeeping).

```
        ┌──────────────────┐
        │  1. START SESSION│  ← "Where are we?"
        │   (read-only)    │
        └────────┬─────────┘
                 │
    ┌────────────▼────────────┐
    │ 2. IMPLEMENT NEXT TASK  │  ← "Do the next thing"
    │   (writes code)         │
    └────────────┬────────────┘
                 │
      ┌──────────▼──────────┐
      │   3. REVIEW WORK    │  ← "Did it work?"
      │   (read-only)       │
      └──────────┬──────────┘
                 │
      ┌──────────▼──────────┐
      │ 4. UPDATE HANDOVER  │  ← "Write it down"
      │   (writes docs)     │
      └──────────┬──────────┘
                 │
                 └──────► back to 1 (next session)


  USED ONCE AT START:                USED AD-HOC:
  ┌──────────────────────┐     ┌──────────────────────┐
  │ CREATE IMPL. PLAN    │     │  CREATE NEW TASK     │
  │ (before any coding)  │     │ (user adds new work) │
  └──────────────────────┘     └──────────────────────┘
```

**Talking points per step:**

| # | Prompt | What it does | Reads | Writes |
|---|--------|-------------|-------|--------|
| 1 | `start-session` | Orients the agent — "here's where we left off" | 5 workflow files | Nothing |
| 2 | `implement-next-task` | Picks up the next unchecked phase from TASKS.md and codes it | Workflow files + code | `index.html`, `style.css`, `script.js` |
| 3 | `review-work` | Checks implementation against spec, reports pass/fail | TASKS.md + code + spec | Nothing (just reports) |
| 4 | `update-handover` | Checks off tasks, updates HANDOVER.md, logs to AGENT_LOG | 4 workflow files | TASKS.md, HANDOVER.md, AGENT_LOG.md |
| — | `create-implementation-plan` | Creates the full plan + task list (run once before coding) | All 10 files | PLAN.md, TASKS.md, ARCHITECTURE.md |
| — | `create-new-task` | Adds user-requested work to TASKS.md mid-project | 5 workflow files | TASKS.md, AGENT_LOG.md |

---

## Slide 7 — The Approval Gates (Human in the Loop)

Visual: same cycle but with **red stop signs** at 3 points:

```
  🛑 After PLAN        → "Does this plan look right?"
  🛑 After IMPLEMENT   → "I tested it — does it work for you?"  
  🛑 After NEW TASK    → "I added these tasks — agree?"
```

**Key message:** "The AI never runs away. It stops and waits for my OK at every meaningful boundary."

---

## Slide 8 — The Persistent Memory (Why Sessions Are Independent)

Visual: show **2 separate chat sessions** (Session A, Session B) both pointing at the same 7 markdown files:

```
  Session A (yesterday)          Session B (today)
       │                              │
       ▼                              ▼
  ┌─────────────────────────────────────────┐
  │           7 Markdown Files              │
  │                                         │
  │  HANDOVER.md   ← "current status"       │
  │  TASKS.md      ← "what's done/left"     │
  │  AGENT_LOG.md  ← "work history"         │
  │  DECISIONS.md  ← "why we chose X"       │
  │  ARCHITECTURE.md ← "how it's built"     │
  │  PLAN.md       ← "overall strategy"     │
  │  KNOWN_ISSUES.md ← "watch out for..."   │
  └─────────────────────────────────────────┘
```

**Key message:** "Chat history is ephemeral. The real project state lives in files. Any agent — or a different person — can pick up exactly where the last session left off."

---

## Slide 9 — One Typical Session (What You'll See in the Live Demo)

A simple **timeline strip**:

```
  ┌───────────┐    ┌───────────────┐    ┌─────────┐    ┌──────────┐
  │  START    │ →  │  IMPLEMENT    │ →  │ REVIEW  │ →  │ HANDOVER │
  │  SESSION  │    │  NEXT TASK    │    │  WORK   │    │  UPDATE  │
  │           │    │               │    │         │    │          │
  │ "Phase 5  │    │ codes the     │    │ checks  │    │ checks   │
  │  is next" │    │ safe modal    │    │ vs spec │    │ off tasks│
  └───────────┘    └───────────────┘    └─────────┘    └──────────┘
```

**Key message:** "This is the loop I'll now show you live."

---

## Summary Slide — What Makes This Workflow Work

- **6 prompts** = the remote control (each prompt has one job)
- **7 markdown files** = persistent memory (survives across sessions)
- **2 instruction files** = guardrails (rules the AI always follows)
- **1 game spec** = source of truth (never duplicated)
- **3 approval gates** = human stays in control
- **Pattern:** read context → do one thing → verify → document → stop
