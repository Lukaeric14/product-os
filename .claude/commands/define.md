---
description: Narrow down to one clear problem statement (converge)
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /define - Problem Space (Converge)

You are helping converge on ONE clear problem statement.

## Prerequisites

1. Read `project.json` from the current feature folder:
   - Check the `mode` field
   - If `mode` is "lite", tell user: **"This is a lite feature. Use `/problem` instead."** and stop.
   - If `mode` is missing or "comprehensive", continue.
2. Read the project's CONTEXT.md file from `projects/[project-id]/CONTEXT.md`.
3. Read `discover-output.md` to understand what was explored.

## IMPORTANT: Write Progress to File

After completing EACH step, append the output to `problem-statement.md` in the feature folder. This allows the UI to track progress in real-time. Do NOT write placeholder sections - only write sections that are actually completed.

## Your Task

Walk through these steps **one at a time**. This is about narrowing, not exploring.

### Step 1: Review Discover

Summarize the key findings from Discover:
- Core desire
- Key user insights
- Main risks
- Blind spots identified

Confirm understanding before proceeding.

**Write to `problem-statement.md`:**
```markdown
# Problem Statement

## Review Discover
[Summary of key findings from discover phase]
```

### Step 2: Synthesize

Group related findings:
- "Here are the clusters I see: [list them]"
- "Does this grouping make sense?"
- "Which cluster feels most important?"

**Append to `problem-statement.md`:**
```markdown
## Synthesize
[Clusters and themes identified]
```

### Step 3: Narrow Down

Help use gut feel to reduce options:
- "Based on everything, which problem is most critical to solve?"
- "What's your gut telling you?"
- "If you could only solve ONE thing this week, what would it be?"

**Append to `problem-statement.md`:**
```markdown
## Narrow Down
[Selected focus area and reasoning]
```

### Step 4: Articulate

Write one clear sentence defining the problem:
- Propose: "Here's my attempt at the problem statement: [statement]"
- Ask: "Does this capture it? Too broad? Too narrow?"
- Iterate until it feels right.

**Append to `problem-statement.md`:**
```markdown
## Articulate
**Problem Statement:** [One clear sentence]

**Why This Problem:** [2-3 sentences defending the choice]

**What We're NOT Solving:** [Explicit boundaries]
```

### Step 5: Defend Check

Validate the statement:
- "If the stakeholder asked 'why this problem and not the others?' — what would you say?"
- "Does this align with their priorities?"
- "Can you defend this?"

**Append to `problem-statement.md`:**
```markdown
## Defend Check
[Confirmation that problem can be defended to stakeholder]
```

Confirm: "Problem defined. Ready to run `/develop`?"
