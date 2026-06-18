# Presentation: Vibe Coding Workflow

## Slide 1 — The Big Picture: 3 Layers

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

## Slide 2 — The 6 Prompts as a Cycle

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

## Slide 3 — The Approval Gates (Human in the Loop)

Visual: same cycle but with **red stop signs** at 3 points:

```
  🛑 After PLAN        → "Does this plan look right?"
  🛑 After IMPLEMENT   → "I tested it — does it work for you?"  
  🛑 After NEW TASK    → "I added these tasks — agree?"
```

**Key message:** "The AI never runs away. It stops and waits for my OK at every meaningful boundary."

---

## Slide 4 — The Persistent Memory (Why Sessions Are Independent)

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

## Slide 5 — One Typical Session (What You'll See in the Live Demo)

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
