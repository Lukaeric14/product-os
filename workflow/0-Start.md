# /start

**Phase:** Initialization
**Purpose:** Set up a new feature/commitment and capture all raw inputs

---

## When to Use

Run this at the beginning of each new feature or commitment during your weekend prep.

---

## Sequential Steps

### Step 1: Create Directory

**What happens:**
- Create directory structure: `sprints/YYYY-WXX/feature-name/`
- Set up empty files for outputs

**Claude asks:**
- "What's the name of this feature/commitment?"
- "Is this a new feature or improvement to existing?"

**Deliverable:** Directory structure created

---

### Step 2: Import Transcript

**What happens:**
- Capture Friday call transcript or meeting notes

**Claude asks:**
- "Do you have a transcript from the Nima call? Paste it here or provide the link."

**Deliverable:** `raw-input-transcript.md`

---

### Step 3: Import Slack Threads

**What happens:**
- Capture relevant Slack discussions

**Claude asks:**
- "Any Slack threads related to this feature? Paste them here."

**Deliverable:** `raw-input-slack.md`

---

### Step 4: Import Customer Feedback

**What happens:**
- Capture customer complaints, requests, feedback

**Claude asks:**
- "Any customer feedback driving this? Paste it here."

**Deliverable:** `raw-input-feedback.md`

---

### Step 5: Capture Design Links

**What happens:**
- Capture any existing Figma files or design references

**Claude asks:**
- "Any existing Figma links or design references?"

**Deliverable:** Links captured in `inputs-summary.md`

---

### Step 6: Summarize Inputs

**What happens:**
- Claude summarizes all raw inputs
- Confirms understanding before proceeding

**Claude outputs:**
- Summary of what was captured
- Key themes identified
- Questions or gaps flagged

**Deliverable:** `inputs-summary.md`

---

## Exit Criteria

- Directory created
- All available raw inputs captured
- Summary confirmed
- Ready to run `/discover`

---

## Files Created

```
sprints/YYYY-WXX/feature-name/
├── raw-input-transcript.md
├── raw-input-slack.md
├── raw-input-feedback.md
└── inputs-summary.md
```
