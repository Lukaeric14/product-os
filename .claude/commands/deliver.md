---
description: Generate PRD, QA checklist, Linear tickets, Loom outline (converge)
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /deliver - Solution Space (Converge)

You are helping Luka finalize and generate all handoff materials.

## Prerequisites

- `problem-statement.md` exists
- `develop-output.md` exists
- Luka has created Excalidraw wireframes

Ask: "Have you created the Excalidraw wireframes (desktop, mobile, states)?"

If no, remind them to do that first.

## IMPORTANT: Write Progress to Files

Write each deliverable to its own file as you complete it. This allows the UI to track progress in real-time.

## Your Task

Walk through these steps **one at a time**. Generate each deliverable, get approval, then move on.

### Step 1: Review All

Summarize:
- Problem statement
- Chosen solution approach
- Edge cases decided
- Technical considerations

Confirm ready to generate docs.

**Write to `prd.md`:**
```markdown
# PRD: [Feature Name]

## Review All
[Summary of all previous outputs - confirms context is loaded]
```

### Step 2: Finalize Approach

Ask: "Any final changes before I generate the PRD?"

Lock in the approach.

**Append to `prd.md`:**
```markdown
## Finalize Approach
[Final decisions locked in]
```

### Step 3: Generate PRD

Generate a comprehensive PRD with these sections:

**Append to `prd.md`:**
```markdown
## 1. Summary
[3-4 sentences - TL;DR]

## 2. Why
**Business context:** [why this matters]
**Customer pain:** [what problem users have]
**What happens if we don't build this:** [stakes]

## 3. What
**In scope:** [bullet list]
**Goals:** [measurable outcomes]

## 4. Out of Scope
[explicit boundaries]

## 5. Where
**Product locations:**
- [Location] (NEW): [what's there]
- [Location]: [what changes]

## 6. How
### User Journey
[numbered steps]

### Behavior Specs
[detailed behavior for each component]

### Edge Cases
| Scenario | Behavior |
|----------|----------|
| ... | ... |

### Success Criteria
- [ ] [criteria]

## 7. Links
- Designs: [Excalidraw link]
- Related: [links]
```

Ask for feedback. Iterate if needed.

### Step 4: Generate QA

Generate QA checklist for Ahmer.

**Write to `qa.md`:**
```markdown
# QA Checklist: [Feature Name]

## Generate QA
[Confirmation that QA checklist is being generated]

## 1. Context
**Feature:** [name]
**User types:** [who to test as]

## 2. Test Account Setup
| Account | Credentials | State Required |
|---------|-------------|----------------|
| ... | ... | ... |

## 3. Pre-Test Setup
- [ ] [setup step]

## 4. Test Cases
### [Section]
**TC-1: [Name]**
- Action: [what to do]
- Expected: [exact outcome]

## 5. Edge Cases
[specific weird scenarios]

## 6. Polish Check
- [ ] [visual/UX check]
```

Ask for feedback.

### Step 5: Generate Tickets

Break down into Linear tickets.

**Write to `linear-tickets.md`:**
```markdown
# Linear Tickets: [Feature Name]

## Generate Tickets
[Confirmation that tickets are being generated]

## Ticket 1: [Title]
**Description:** [1-2 sentences]
**Acceptance Criteria:**
- [ ] [criteria]
**Links:** PRD section X
**Images:** [note which Excalidraw to attach]

## Ticket 2: [Title]
...
```

Ask for feedback.

### Step 6: Generate Loom

Generate a 5-minute video outline.

**Write to `loom-outline.md`:**
```markdown
# Loom Outline: [Feature Name]

## Generate Loom
[Confirmation that Loom outline is being generated]

**Total time:** ~5 minutes

## 1. Context (1 min)
**Show:** [what to show]
**Cover:** [what to say]

## 2. What We're Building (1 min)
**Show:** [what]
**Cover:** [what]

## 3. User Flow (1.5 min)
**Show:** Excalidraw wireframes
**Cover:** [walk through]

## 4. Edge Cases (1 min)
**Show:** PRD edge cases
**Cover:** [key decisions]

## 5. QA Focus (30 sec)
**Show:** QA checklist
**Cover:** [priorities]
```

### Step 7: Package Check

Verify all files exist:
- [ ] prd.md
- [ ] qa.md
- [ ] linear-tickets.md
- [ ] loom-outline.md
- [ ] Excalidraw wireframes created (manual)

Confirm: "All deliverables ready. Run `/handoff` to copy to keylead/.pm/"
