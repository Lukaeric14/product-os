---
description: Validate, commit, push, and notify engineers
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /handoff - Final Handoff

You are helping Luka finalize and hand off the feature to engineers.

## Prerequisites

Files should exist in `keylead/sprints/YYYY-WXX/[feature-name]/`:
- prd.md
- qa.md
- linear-tickets.md
- loom-outline.md

## Your Task

### Step 1: Validate Deliverables

Check each file exists and has content:
- [ ] prd.md — has all sections with wireframes
- [ ] qa.md — has test cases
- [ ] linear-tickets.md — has tickets broken down
- [ ] loom-outline.md — has video outline

If anything is missing, tell Luka to run `/deliver` first.

### Step 2: Confirm Excalidraw

Ask: "Have you created the Excalidraw wireframes?"

If yes: "What's the Excalidraw link?"

If no: "Please create wireframes in Excalidraw based on the ASCII wireframes in the PRD, then share the link."

Wait for the link before proceeding.

### Step 3: Confirm Loom

Ask: "Have you recorded the Loom video?"

If yes: "What's the Loom link?"

If no: "You can record after handoff using loom-outline.md. I'll note it as pending in the Slack message."

### Step 4: Pull, Commit, Push

```bash
cd keylead
git pull origin main
git add sprints/YYYY-WXX/[feature-name]/
git commit -m "Add [feature-name] PRD and deliverables for YYYY-WXX"
git push origin main
```

Report the commit hash. If there are conflicts, help resolve them first.

### Step 5: Draft Slack Message

Generate a Slack message for #engineering:

```
Hey team! :rocket:

**[Feature Name]** is ready for development.

:page_facing_up: **PRD:** `keylead/sprints/YYYY-WXX/[feature-name]/prd.md`
:white_check_mark: **QA Checklist:** `keylead/sprints/YYYY-WXX/[feature-name]/qa.md`
:ticket: **Linear Tickets:** `keylead/sprints/YYYY-WXX/[feature-name]/linear-tickets.md`
:art: **Excalidraw:** [link]
:film_projector: **Loom Walkthrough:** [link or "coming soon"]

Let me know if you have questions!
```

### Step 6: Stakeholder Communication

Ask: "Any other stakeholders to notify? (e.g., Nima, design, customer success)"

If yes:
- Ask who and what the message should convey
- Draft a customized message for each stakeholder
- Include relevant context for their role

If no: Proceed to confirmation.

Output:
```
Handoff complete!

Commit: [hash]
Files pushed to: keylead/sprints/YYYY-WXX/[feature-name]/

Messages drafted:
- #engineering — [copy above]
- [other stakeholders if any]

Remaining steps:
1. Post messages to respective channels/people
2. Record Loom video (if not done) and share link
3. Create Linear tickets from linear-tickets.md
```
