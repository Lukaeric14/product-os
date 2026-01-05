---
description: Explore solutions - UI flows, wireframes, edge cases (diverge)
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /develop - Solution Space (Diverge)

You are helping Luka explore solutions for the defined problem. This is DIVERGE - explore options before finalizing.

## Prerequisites

Read `problem-statement.md` to understand what we're solving.
Read the keylead/ codebase for relevant context.

## IMPORTANT: Write Progress to File

After completing EACH step, append the output to `develop-output.md` in the feature folder. This allows the UI to track progress in real-time. Do NOT write placeholder sections - only write sections that are actually completed.

## Communication Style

- **Always be clear about what response you need** — end with a specific question
- **Ask questions before proposing** — don't dump options without understanding preferences first
- **One question at a time or small batches** — don't overwhelm with 10 questions at once

## Your Task

Walk through these steps **one at a time**.

### Step 1: Review Problem

Show the problem statement. Confirm ready to explore solutions.

**Write to `develop-output.md`:**
```markdown
# Develop Output

## Review Problem
[Problem statement and confirmation to proceed]
```

### Step 2: Brainstorm Flows

**DO NOT propose UI options yet.** First, brainstorm ALL possible user flows related to this feature.

Ask Luka questions to understand:
- What flows need to exist?
- What already exists in the codebase?
- Where do these flows live in the product?

Present a comprehensive list of flows, then ask:
- "Which of these flows are in scope for this sprint?"
- "What would you add or cut?"

Get confirmation before proceeding.

**Append to `develop-output.md`:**
```markdown
## Flows
[All flows identified, marked as in-scope or out-of-scope]
```

### Step 3: UI Flow Questions

**Still don't propose options.** Ask targeted questions about the in-scope flows:

- Page structure preferences (single page vs tabs, etc.)
- Component preferences (modal vs inline, etc.)
- Interaction patterns
- Any existing patterns to follow

Ask 3-5 questions at a time. Get answers before proceeding.

### Step 4: Design Decisions

Summarize all decisions made from the Q&A. Confirm with Luka before moving to wireframes.

**Append to `develop-output.md`:**
```markdown
## UI Flow
[Design decisions documented]
```

### Step 5: Desktop Wireframe

NOW propose ASCII wireframes based on the decisions:

```
┌─────────────────────────────────┐
│ Header                          │
├─────────────────────────────────┤
│                                 │
│   [Main content area]           │
│                                 │
└─────────────────────────────────┘
```

Ask: "Does this layout work? Anything to change?"

**Append to `develop-output.md`:**
```markdown
## Desktop Wireframe
[ASCII wireframe and explanation]
```

### Step 6: Mobile Wireframe

**MOBILE IS NOT OPTIONAL.**

Create an ASCII wireframe for mobile:
- How does the layout adapt?
- What gets hidden/collapsed?
- Is it touch-friendly?

Ask: "Does this work for mobile users?"

**Append to `develop-output.md`:**
```markdown
## Mobile Wireframe
[ASCII wireframe for mobile]
```

### Step 7: Edge Cases

Based on the feature + keylead codebase, identify edge cases.

For each edge case:
- State the scenario
- Propose a behavior
- Ask: "Is this right?"

Get explicit decisions for each.

**Append to `develop-output.md`:**
```markdown
## Edge Cases
[Edge cases identified with decisions]
```

### Step 8: Codebase Risks

Analyze the keylead/ codebase:
- What files/modules would this touch?
- Any dependencies or conflicts?
- Any technical constraints?

Add "Engineering Investigation Notes" for things engineers should check.

**Append to `develop-output.md`:**
```markdown
## Codebase Risks
[Technical considerations + investigation notes for engineers]
```

### Step 9: Trade-offs

List the trade-offs made and confirm they're acceptable.

**Append to `develop-output.md`:**
```markdown
## Trade-offs
[Trade-offs accepted]
```

### Step 10: Exit Check

Review everything:
- "Do you have clear direction?"
- "Has mobile been addressed?"
- "Are edge cases answered?"

**Append to `develop-output.md`:**
```markdown
## Exit Check
[Confirmation that solution space is fully explored]
```

Confirm: "Ready to run `/deliver`?"
