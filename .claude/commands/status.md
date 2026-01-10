---
description: Check progress on current feature
allowed-tools: Read, Glob, Bash
---

# /status - Check Progress

Show the current status of all features across all projects.

## Your Task

### Step 1: Find All Projects

Read `projects/projects.json` to get the list of configured projects.

### Step 2: Find Current Sprints

For each project, look in their `sprints/` folder for the current week's folder (YYYY-WXX format).

Sprint locations:
- Keylead: `keylead/sprints/`
- Other projects: `projects/[project-id]/sprints/`

### Step 3: List Features

For each feature folder, check which files exist:

| File | Indicates |
|------|-----------|
| project.json | Feature initialized |
| inputs-summary.md | /start complete |
| discover-output.md | /discover complete |
| problem-statement.md | /define complete |
| develop-output.md | /develop complete |
| prd.md | /deliver in progress |
| qa.md + linear-tickets.md + loom-outline.md | /deliver complete |
| handoff-complete.md | /handoff complete |

### Step 4: Display Status

Format the output like this:

```
SPRINT: 2025-W02

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: Keylead
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FEATURE: credits-billing
────────────────────────
[✓] /start      — Inputs captured
[✓] /discover   — Problem explored
[✓] /define     — Problem defined
[●] /develop    — IN PROGRESS
[ ] /deliver    — Not started
[ ] /handoff    — Not started

Files:
├── project.json           ✓
├── inputs-summary.md      ✓
├── discover-output.md     ✓
├── problem-statement.md   ✓
├── develop-output.md      (missing)
├── prd.md                 -
├── qa.md                  -
├── linear-tickets.md      -
└── loom-outline.md        -

Next: Run /develop to explore solutions


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT: Nairon Slack App
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

(No features in current sprint)

Next: Run /start to initialize a new feature
```

### Step 5: Suggest Next Action

Based on what's complete, suggest the next command to run.
