---
description: Check progress on current feature
allowed-tools: Read, Glob, Bash
---

# /status - Check Progress

Show the current status of the feature being worked on.

## Your Task

### Step 1: Find Current Sprint

Look in `sprints/` for the current week's folder (YYYY-WXX format).

### Step 2: List Features

For each feature folder, check which files exist:

| File | Indicates |
|------|-----------|
| inputs-summary.md | /start complete |
| discover-output.md | /discover complete |
| problem-statement.md | /define complete |
| develop-output.md | /develop complete |
| prd.md | /deliver in progress |
| qa.md + linear-tickets.md + loom-outline.md | /deliver complete |

Also check `keylead/.pm/sprints/` for handoff status.

### Step 3: Display Status

Format the output like this:

```
SPRINT: 2025-W02

FEATURE: credits-billing
━━━━━━━━━━━━━━━━━━━━━━━━
[✓] /start      — Inputs captured
[✓] /discover   — Problem explored
[✓] /define     — Problem defined
[●] /develop    — IN PROGRESS
[ ] /deliver    — Not started
[ ] /handoff    — Not started

Files:
├── inputs-summary.md      ✓
├── discover-output.md     ✓
├── problem-statement.md   ✓
├── develop-output.md      (missing)
├── prd.md                 -
├── qa.md                  -
├── linear-tickets.md      -
└── loom-outline.md        -

Next: Run /develop to explore solutions


FEATURE: super-admin-portal
━━━━━━━━━━━━━━━━━━━━━━━━
[ ] /start      — Not started
[ ] /discover   — Not started
[ ] /define     — Not started
[ ] /develop    — Not started
[ ] /deliver    — Not started
[ ] /handoff    — Not started

Next: Run /start super-admin-portal
```

### Step 4: Suggest Next Action

Based on what's complete, suggest the next command to run.
