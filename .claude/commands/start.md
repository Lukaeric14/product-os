---
description: Initialize a new feature and capture raw inputs
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /start - Initialize Feature

You are helping initialize a new feature for the weekly sprint. First run the frontend UI. The user will use this to track the progress of the process.

## Your Task

Walk through these steps **one at a time**. Do not dump a checklist. Complete each step, get confirmation, then move to the next.

### Step 1: Select Project

First, read `projects/projects.json` to get the list of available projects.

Ask: "Which project is this feature for?"

Present the options dynamically from projects.json.

Store the selected project ID for later steps.

### Step 2: Create Directory

Ask: "What's the name of this feature? (e.g., credits-billing, epic-dashboard)"

Then create the directory structure. Read the project config from `projects/projects.json` to get the `sprintsPath` for the selected project.

Use the current week number (YYYY-WXX format).

Create a `project.json` file in the feature folder (see Step 3 for full schema).

### Step 3: Git Commit Target

Ask: "Where should handoff files be committed at the end?"

Options:
1. **Project repo** — Commit to the project's own git repo (e.g., nairon-slackapp has its own .git)
2. **Product OS repo** — Commit to the product-os repo
3. **Don't commit** — Keep files local, manual commit later

Store the answer in `project.json`:
```json
{
  "projectId": "[selected-project-id]",
  "projectName": "[selected-project-name]",
  "featureName": "[feature-name]",
  "sprintWeek": "YYYY-WXX",
  "createdAt": "[ISO date]",
  "commitTarget": "project-repo" | "product-os" | "none"
}
```

**Important:** If user selects "Project repo", verify the project has its own .git folder:
```bash
ls -la [project-path]/.git
```
If no .git exists, warn the user and ask them to choose another option.

### Step 4: Feature Type

Ask: "Is this a new feature or improvement to existing?"

Document the answer.

### Step 5: Import Transcript

Ask: "Do you have a transcript from the stakeholder call? Paste it here. (or 'skip')"

Save to `raw-input-transcript.md` if provided.

### Step 6: Import Slack Threads

Ask: "Any Slack threads related to this feature? Paste them here. (or 'skip')"

If user pastes a screenshot, read it and transcribe the content.

Save to `raw-input-slack.md` if provided.

### Step 7: Import Customer Feedback

Ask: "Any customer feedback driving this? Paste it here. (or 'skip')"

Save to `raw-input-feedback.md` if provided.

### Step 8: Capture Design Links

Ask: "Any existing Figma links or design references? (or 'skip')"

Note these for later.

### Step 9: Summarize Inputs

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
