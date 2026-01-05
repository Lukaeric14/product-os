# /handoff

**Phase:** Final Step
**Purpose:** Write all deliverables to keylead/.pm/ for engineers to pull

---

## When to Use

Run after `/deliver` when all deliverables are complete and ready for engineers.

---

## Prerequisites

Before running `/handoff`, ensure:
- [ ] `/deliver` completed
- [ ] All files generated (prd.md, qa.md, linear-tickets.md, loom-outline.md)
- [ ] Excalidraw wireframes created
- [ ] Loom video recorded
- [ ] Linear tickets created (or ready to create)

---

## Sequential Steps

### Step 1: Validate Deliverables

**What happens:**
- Check all required files exist
- Flag any missing items

**Claude checks:**
- [ ] prd.md exists and is complete
- [ ] qa.md exists and is complete
- [ ] linear-tickets.md exists
- [ ] loom-outline.md exists
- [ ] Excalidraw files exist

**Deliverable:** Validation complete

---

### Step 2: Copy to Keylead

**What happens:**
- Copy all deliverables to `keylead/.pm/sprints/YYYY-WXX/feature-name/`
- This is where engineers will pull from

**Claude does:**
- Creates directory in keylead/.pm/ if needed
- Copies all relevant files
- Confirms files are in place

**Deliverable:** Files in keylead/.pm/

---

### Step 3: Final Confirmation

**What happens:**
- Confirm handoff is complete
- Ready for Monday kickoff

**Claude outputs:**
- Summary of what was handed off
- Reminder of manual steps (Loom upload, Linear tickets)
- "Ready for Monday"

**Deliverable:** Handoff complete

---

## What Gets Copied

```
keylead/.pm/sprints/YYYY-WXX/feature-name/
├── prd.md
├── qa.md
├── linear-tickets.md
├── loom-outline.md
└── designs/
    └── (Excalidraw files or links)
```

---

## Manual Steps Reminder

After `/handoff`:
1. Upload Loom video, add link to PRD
2. Create Linear tickets from markdown (attach images)
3. Commit and push keylead/ changes
4. Ready for Monday kickoff

---

## Exit Criteria

- All files in keylead/.pm/
- Engineers can pull and have everything
- Ready for Monday 12pm kickoff
