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

Present the options:
1. **Keylead** - Content scheduling SaaS for real estate agents
2. **Nairon Slack App** - AI task tracking and product intelligence Slack bot

Store the selected project ID for later steps.

### Step 2: Create Directory

Ask: "What's the name of this feature? (e.g., credits-billing, epic-dashboard)"

Then create the directory structure based on the selected project:

**For Keylead:**
```
keylead/sprints/YYYY-WXX/[feature-name]/
```

**For Nairon Slack App:**
```
projects/nairon-slackapp/sprints/YYYY-WXX/[feature-name]/
```

Use the current week number.

Create a `project.json` file in the feature folder to track which project this is:
```json
{
  "projectId": "[selected-project-id]",
  "projectName": "[selected-project-name]",
  "featureName": "[feature-name]",
  "sprintWeek": "YYYY-WXX",
  "createdAt": "[ISO date]"
}
```

### Step 3: Feature Type

Ask: "Is this a new feature or improvement to existing?"

Document the answer.

### Step 4: Import Transcript

Ask: "Do you have a transcript from the stakeholder call? Paste it here."

Save to `raw-input-transcript.md`

### Step 5: Import Slack Threads

Ask: "Any Slack threads related to this feature? Paste them here. (or 'skip')"

Save to `raw-input-slack.md` if provided.

### Step 6: Import Customer Feedback

Ask: "Any customer feedback driving this? Paste it here. (or 'skip')"

Save to `raw-input-feedback.md` if provided.

### Step 7: Capture Design Links

Ask: "Any existing Figma links or design references? (or 'skip')"

Note these for later.

### Step 8: Summarize Inputs

Summarize everything captured:
- Project and feature name
- Feature type
- Key points from transcript
- Key points from Slack
- Key points from feedback
- Design references

Save to `inputs-summary.md`

Confirm: "Inputs captured. Ready to run `/discover`?"

## File Structure Created

**For Keylead:**
```
keylead/sprints/YYYY-WXX/[feature-name]/
├── project.json
├── raw-input-transcript.md
├── raw-input-slack.md (if provided)
├── raw-input-feedback.md (if provided)
└── inputs-summary.md
```

**For Nairon Slack App:**
```
projects/nairon-slackapp/sprints/YYYY-WXX/[feature-name]/
├── project.json
├── raw-input-transcript.md
├── raw-input-slack.md (if provided)
├── raw-input-feedback.md (if provided)
└── inputs-summary.md
```

## Important

The `project.json` file is critical - other commands will read it to know which project context to use.
