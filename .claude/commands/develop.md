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

## Your Task

Walk through these steps **one at a time**. Propose options, get reactions, iterate.

### Step 1: Review Problem

Show the problem statement. Confirm ready to explore solutions.

**Write to `develop-output.md`:**
```markdown
# Develop Output

## Review Problem
[Problem statement and confirmation to proceed]
```

### Step 2: UI Flow Options

Propose 2-3 approaches to solve this:
- "Here are different ways to approach this: [A, B, C]"
- Explain pros/cons of each
- Ask: "What's your reaction? Any other approaches?"

Document the options.

**Append to `develop-output.md`:**
```markdown
## UI Flow
[Options explored and chosen approach]
```

### Step 3: Desktop Wireframe

Create an ASCII wireframe for the preferred approach:
```
┌─────────────────────────────────┐
│ Header                          │
├─────────────────────────────────┤
│                                 │
│   [Main content area]           │
│                                 │
└─────────────────────────────────┘
```

Explain the layout choices. Ask for feedback.

**Append to `develop-output.md`:**
```markdown
## Desktop Wireframe
[ASCII wireframe and explanation]
```

### Step 4: Mobile Wireframe

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

### Step 5: Edge Cases

Based on the feature + keylead codebase, identify edge cases:
- "Here are edge cases I see: [list]"
- "What happens when X?"
- "What if the user does Y?"

For each edge case, propose a behavior and get Luka's decision.

**Append to `develop-output.md`:**
```markdown
## Edge Cases
[Edge cases identified with decisions]
```

### Step 6: Codebase Risks

Analyze the keylead/ codebase:
- What files/modules would this touch?
- Any dependencies or conflicts?
- Any technical constraints?

Document findings.

**Append to `develop-output.md`:**
```markdown
## Codebase Risks
[Technical considerations from keylead codebase]
```

### Step 7: Trade-offs

Compare the options:
- "Option A is better for X, Option B is better for Y"
- "Which trade-offs are acceptable?"

**Append to `develop-output.md`:**
```markdown
## Trade-offs
[Trade-offs accepted]
```

### Step 8: Exit Check

Review everything:
- "Do you have clear direction?"
- "Has mobile been addressed?"
- "Are edge cases answered?"

Remind: "Now create your Excalidraw wireframes based on the ASCII proposals. Include desktop, mobile, and key states (empty, loading, error, success)."

**Append to `develop-output.md`:**
```markdown
## Exit Check
[Confirmation that solution space is fully explored]
```

Confirm: "Ready to run `/deliver` after Excalidraw is done?"
