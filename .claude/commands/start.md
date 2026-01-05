---
description: Initialize a new feature and capture raw inputs
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /start - Initialize Feature

You are helping Luka initialize a new feature for the weekly sprint. First run the frontend UI. The user will use this to track the progress of the process.

## Your Task

Walk through these steps **one at a time**. Do not dump a checklist. Complete each step, get confirmation, then move to the next.

### Step 1: Create Directory in Keylead Repo

Ask: "What's the name of this feature? (e.g., credits-billing, super-admin-portal)"

Then create the directory structure:
```
sprints/YYYY-WXX/[feature-name]/
```

Use the current week number.

### Step 2: Feature Type

Ask: "Is this a new feature or improvement to existing?"

Document the answer.

### Step 3: Import Transcript

Ask: "Do you have a transcript from the Nima call? Paste it here."

Save to `raw-input-transcript.md`

### Step 4: Import Slack Threads

Ask: "Any Slack threads related to this feature? Paste them here. (or 'skip')"

Save to `raw-input-slack.md` if provided.

### Step 5: Import Customer Feedback

Ask: "Any customer feedback driving this? Paste it here. (or 'skip')"

Save to `raw-input-feedback.md` if provided.

### Step 6: Capture Design Links

Ask: "Any existing Figma links or design references? (or 'skip')"

Note these for later.

### Step 7: Summarize Inputs

Summarize everything captured:
- Feature name and type
- Key points from transcript
- Key points from Slack
- Key points from feedback
- Design references

Save to `inputs-summary.md`

Confirm: "Inputs captured. Ready to run `/discover`?"

## File Structure Created

```
sprints/YYYY-WXX/[feature-name]/
├── raw-input-transcript.md
├── raw-input-slack.md (if provided)
├── raw-input-feedback.md (if provided)
└── inputs-summary.md
```
