---
description: Copy deliverables to keylead/.pm/ for engineers
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /handoff - Final Handoff

You are helping Luka copy all deliverables to the keylead codebase for engineers to pull.

## Prerequisites

Verify these files exist in the current feature folder:
- prd.md
- qa.md
- linear-tickets.md
- loom-outline.md

## Your Task

### Step 1: Validate Deliverables

Check each file exists and has content:
- [ ] prd.md — has all 7 sections
- [ ] qa.md — has test cases
- [ ] linear-tickets.md — has tickets broken down
- [ ] loom-outline.md — has 5 sections

If anything is missing, tell Luka to run `/deliver` first.

### Step 2: Confirm Excalidraw

Ask: "Have you created the Excalidraw wireframes?"
Ask: "Where will they be stored? (Excalidraw link or local files?)"

### Step 3: Confirm Loom

Ask: "Have you recorded the Loom video?"

If not: "Record it after handoff using the outline. Add the link to the PRD."

### Step 4: Copy to Keylead

Create the directory and copy files:

```
keylead/.pm/sprints/YYYY-WXX/[feature-name]/
├── prd.md
├── qa.md
├── linear-tickets.md
├── loom-outline.md
└── README.md (with links to Excalidraw, Loom)
```

Create a README.md with:
```markdown
# [Feature Name] - Handoff

## Quick Links
- **Loom:** [link - add after recording]
- **Excalidraw:** [link]
- **Linear Project:** [link - add after creating tickets]

## Files
- `prd.md` — Full PRD
- `qa.md` — QA checklist for Ahmer
- `linear-tickets.md` — Tickets to create in Linear

## Status
- [ ] Loom recorded
- [ ] Linear tickets created
- [ ] Ready for Monday kickoff
```

### Step 5: Final Confirmation

Output:
```
✓ Handoff complete!

Files copied to: keylead/.pm/sprints/YYYY-WXX/[feature-name]/

Remaining manual steps:
1. Record Loom video using loom-outline.md
2. Create Linear tickets from linear-tickets.md
3. Attach Excalidraw images to Linear tickets
4. Commit and push keylead/ changes
5. Ready for Monday 12pm kickoff!
```

## Output

```
keylead/.pm/sprints/YYYY-WXX/[feature-name]/
├── prd.md
├── qa.md
├── linear-tickets.md
├── loom-outline.md
└── README.md
```
