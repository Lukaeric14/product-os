---
description: Initialize a new feature and capture raw inputs
allowed-tools: Read, Write, Bash, Glob, Grep, Edit, TodoWrite
---

# /start - Initialize Feature

You are helping initialize a new feature for the weekly sprint.

## Progress Tracking

**IMPORTANT:** Use the TodoWrite tool to track progress through this workflow.

At the start, create a todo list with ALL steps:
1. Select Project
2. Select Mode
3. Create Directory
4. Create project.json
5. (For Comprehensive) Feature Type, Import Transcript, Import Slack, Import Feedback, Capture Design Links, Summarize Inputs
6. (For Lite) Quick Summary

**Mark each step as completed IMMEDIATELY after finishing it.** This gives the user visual feedback of their progress. Mark the current step as `in_progress` when you start it.

## Your Task

Walk through these steps **one at a time**. Do not dump a checklist. Complete each step, get confirmation, then move to the next.

### Step 1: Select Project

First, read `projects/projects.json` to get the list of available projects.

Ask: "Which project is this feature for?"

Present the options dynamically from projects.json.

Store the selected project ID for later steps.

### Step 2: Select Mode

Ask: "Is this a comprehensive or lite feature?"

Options:
1. **Comprehensive** — Full 6-phase Double Diamond process (discover, define, develop, deliver)
2. **Lite** — Quick 4-phase workflow for smaller features (problem, solution, handoff)

Explain briefly:
- Comprehensive: Best for complex, multi-stakeholder features that need thorough exploration
- Lite: Best for small, well-understood features where you already know the problem

Store the mode for `project.json` (`"mode": "comprehensive"` or `"mode": "lite"`).

### Step 3: Create Directory

Ask: "What's the name of this feature? (e.g., credits-billing, epic-dashboard)"

Then create the directory structure. Read the project config from `projects/projects.json` to get the `sprintsPath` for the selected project.

Use the current week number (YYYY-WXX format).

Create a `project.json` file in the feature folder (see Step 4 for full schema).

### Step 4: Create project.json

Create the `project.json` file in the feature folder:
```json
{
  "projectId": "[selected-project-id]",
  "projectName": "[selected-project-name]",
  "featureName": "[feature-name]",
  "sprintWeek": "YYYY-WXX",
  "createdAt": "[ISO date]",
  "mode": "comprehensive" | "lite"
}
```

**Note:** `commitTarget` is defined in `projects/projects.json` at the project level, not per-feature.

---

## If Lite Mode

For lite features, skip the detailed input gathering. Instead:

### Step 5 (Lite): Quick Summary

Ask: "Briefly describe the feature — what's the problem and what do you want to build?"

Save the summary directly to `inputs-summary.md`:
```markdown
# Inputs Summary

**Project:** [Project Name]
**Feature:** [Feature Name]
**Mode:** Lite
**Sprint:** YYYY-WXX

## Project Selected
Project: [Project Name] ([project-id])

## Mode Selected
Mode: Lite

## Directory Created
Feature directory created at: [sprintsPath]/YYYY-WXX/[feature-name]/

## Feature Summary
[User's description]

## Notes
- Commit Target: [target]
```

Confirm: "Inputs captured. Ready to run `/problem`?"

**Skip to end — do not continue with comprehensive steps.**

---

## If Comprehensive Mode

Continue with detailed input gathering:

### Step 5: Feature Type

Ask: "Is this a new feature or improvement to existing?"

Document the answer.

### Step 6: Import Transcript

Ask: "Do you have a transcript from the stakeholder call? Paste it here. (or 'skip')"

Save to `raw-input-transcript.md` if provided.

### Step 7: Import Slack Threads

Ask: "Any Slack threads related to this feature? Paste them here. (or 'skip')"

If user pastes a screenshot, read it and transcribe the content.

Save to `raw-input-slack.md` if provided.

### Step 8: Import Customer Feedback

Ask: "Any customer feedback driving this? Paste it here. (or 'skip')"

Save to `raw-input-feedback.md` if provided.

### Step 9: Capture Design Links

Ask: "Any existing Figma links or design references? (or 'skip')"

Note these for later.

### Step 10: Summarize Inputs

Summarize everything captured:
- Project and feature name
- Commit target
- Feature type
- Key points from transcript
- Key points from Slack
- Key points from feedback
- Design references

Save to `inputs-summary.md`

Confirm: "Inputs captured. Ready to run `/discover`?"

## File Structure Created

```
[sprintsPath]/YYYY-WXX/[feature-name]/
├── project.json
├── raw-input-transcript.md (if provided)
├── raw-input-slack.md (if provided)
├── raw-input-feedback.md (if provided)
└── inputs-summary.md
```

## Important

The `project.json` file is critical - other commands will read it to know:
- Which project context to use
- Where to commit handoff files
