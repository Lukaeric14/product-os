---
description: Validate, commit, push, and notify engineers
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /handoff - Final Handoff

You are helping finalize and hand off the feature to engineers.

## Prerequisites

1. Read `project.json` from the current feature folder to identify which project this is for.
2. Read the project's CONTEXT.md file from `projects/[project-id]/CONTEXT.md` for git workflow details.

Files should exist in the feature folder:
- prd.md (with embedded ASCII wireframes)
- qa.md
- linear-tickets.md
- loom-outline.md

## Your Task

### Step 1: Validate Deliverables

Check each file exists and has content:
- [ ] prd.md — has all sections with wireframes embedded
- [ ] qa.md — has test cases
- [ ] linear-tickets.md — has 4-5 tickets
- [ ] loom-outline.md — has video outline

If anything is missing, tell user to run `/deliver` first.

### Step 2: Confirm Loom

Ask: "Have you recorded the Loom video?"

If no: "You can record after handoff using loom-outline.md. I'll add a placeholder link."

### Step 3: Commit and Push

Read `project.json` to get the project details, then use the appropriate git commands.

The feature folder path pattern will be:
- For Keylead: `keylead/sprints/YYYY-WXX/[feature-name]/`
- For other projects: `projects/[project-id]/sprints/YYYY-WXX/[feature-name]/`

```bash
cd [project-path]
git pull origin main
git add sprints/YYYY-WXX/[feature-name]/
git commit -m "Add [feature-name] sprint YYYY-WXX handoff"
git push origin main
```

Report the commit hash. If there are conflicts, help resolve them first.

### Step 4: Draft Slack Message

Ask: "Is this for a shared channel or a private chat with one engineer?"

**For private chat (casual tone):**
```
hey! [feature-name] spec is ready for this week

tldr: [one line description]

files are in [project-path]/sprints/YYYY-WXX/[feature-name]/
- prd.md has the full spec + wireframes
- linear-tickets.md has X tickets broken down

loom: [link or "will record and share"]

lmk if anything's unclear
```

**For shared channel (slightly more structured but still casual):**
```
[feature-name] is ready for YYYY-WXX

what we're building: [one line]

files: [project-path]/sprints/YYYY-WXX/[feature-name]/
- prd.md — full spec + wireframes
- qa.md — qa checklist
- linear-tickets.md — X tickets

loom: [link or "coming soon"]

questions? lmk
```

Print the message so user can copy/paste.

### Step 5: Other Stakeholders

Ask: "Any other stakeholders to notify? (e.g., CEO, QA)"

If yes: Draft a brief, casual message for each.

If no: Proceed.

### Step 6: Create Handoff Record

**Write to `handoff-complete.md` in the feature folder:**
```markdown
# Handoff Complete

**Project:** [Project Name]
**Feature:** [Feature Name]
**Sprint:** YYYY-WXX
**Date:** [Today's date]

## Links
- **Loom:** [link or "pending"]
- **Commit:** [hash]

## Slack Message
```
[Copy of the drafted message]
```

## Other Stakeholder Messages
[Any additional messages drafted, or "None"]

## Remaining Manual Steps
- [ ] Post Slack message
- [ ] Record Loom video (if pending)
- [ ] Create Linear tickets from linear-tickets.md
```

### Final Output

```
Handoff complete!

Commit: [hash]
Files: [project-path]/sprints/YYYY-WXX/[feature-name]/

Remaining:
1. Post the Slack message above
2. Record Loom (if not done)
3. Create Linear tickets
```
