# Product OS

A sprint-based product development workflow for Claude Code.

## Overview

Product OS helps product teams work through a structured discovery and design process before handing off to engineering. Each feature goes through six phases:

1. **Start** — Initialize the feature with brief, goals, and type
2. **Discover** — Explore the problem space (diverge)
3. **Define** — Converge on a clear problem statement
4. **Develop** — Explore solution options (diverge)
5. **Deliver** — Generate PRD, QA checklist, tickets, and Loom outline
6. **Handoff** — Package everything for engineering

## Getting Started

```bash
npm install
npm run dev
```

Then use the slash commands in Claude Code:

- `/start` — Begin a new feature
- `/discover` — Run problem space exploration
- `/define` — Narrow to one problem statement
- `/develop` — Explore solution approaches
- `/deliver` — Generate all deliverables
- `/handoff` — Package for engineering
- `/status` — Check current feature status

## Sprint Structure

Features are organized by sprint week:

```
keylead/sprints/
└── 2026-W02/
    └── credits-billing/
        ├── brief.md
        ├── discover-output.md
        ├── problem-statement.md
        ├── develop-output.md
        ├── prd.md
        ├── qa.md
        ├── linear-tickets.md
        └── loom-outline.md
```

## UI Dashboard

The dashboard at `localhost:3000` shows:
- Current sprint and features
- Phase progress with real-time step tracking
- File deliverables status

The UI auto-refreshes every 2 seconds as files are created/edited.
