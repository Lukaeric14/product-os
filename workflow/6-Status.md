# /status

**Purpose:** Check where you are in the process at any time

---

## When to Use

Run anytime to see:
- Current feature you're working on
- Which phase you're in
- What's been completed
- What's next

---

## What It Shows

### Current Feature

```
Feature: credits-and-billing
Week: 2025-W02
Type: New feature
```

### Phase Progress

```
[x] /start      — Inputs captured
[x] /discover   — Problem explored
[x] /define     — Problem statement defined
[ ] /develop    — IN PROGRESS (Step 4: Mobile wireframe)
[ ] /deliver    — Not started
[ ] /handoff    — Not started
```

### Files Created

```
sprints/2025-W02/credits-and-billing/
├── raw-input-transcript.md    ✓
├── raw-input-slack.md         ✓
├── inputs-summary.md          ✓
├── discover-output.md         ✓
├── problem-statement.md       ✓
├── develop-output.md          (in progress)
├── prd.md                     -
├── qa.md                      -
├── linear-tickets.md          -
└── loom-outline.md            -
```

### What's Next

```
Next step: Complete mobile wireframe in /develop
Then: Edge cases, risks, trade-offs
After /develop: Create Excalidraw manually, then run /deliver
```

---

## Multiple Features

If working on multiple commitments:

```
FEATURE 1: credits-and-billing
Status: /develop (Step 4)

FEATURE 2: super-admin-portal
Status: /start (not started)

FEATURE 3: content-expansion
Status: /start (not started)
```

---

## Usage

Just run `/status` anytime. No parameters needed.
