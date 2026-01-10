# /handoff

**Phase:** Final Step
**Purpose:** Commit, push, and notify engineers

---

## When to Use

Run after `/deliver` when all deliverables are complete and ready for engineers.

---

## Prerequisites

Before running `/handoff`, ensure:
- [ ] `/deliver` completed
- [ ] All files generated (prd.md, qa.md, linear-tickets.md, loom-outline.md)
- [ ] ASCII wireframes embedded in PRD
- [ ] Linear tickets ready to create

---

## Sequential Steps

### Step 1: Validate Deliverables

**What happens:**
- Check all required files exist
- Flag any missing items

**Claude checks:**
- [ ] prd.md exists with wireframes
- [ ] qa.md exists
- [ ] linear-tickets.md exists
- [ ] loom-outline.md exists

**Deliverable:** Validation complete

---

### Step 2: Confirm Loom

**What happens:**
- Ask if Loom video is recorded
- Get link or note as pending

**Deliverable:** Link captured (or pending)

---

### Step 3: Commit and Push

**What happens:**
- Pull latest from keylead
- Add and commit feature files
- Push to main

**Claude does:**
```bash
cd keylead
git pull origin main
git add sprints/YYYY-WXX/[feature-name]/
git commit -m "Add [feature-name] sprint YYYY-WXX handoff"
git push origin main
```

**Deliverable:** Commit pushed

---

### Step 4: Draft Slack Message

**What happens:**
- Draft message for engineers
- Include file locations and Loom link

**Deliverable:** Message ready to copy/paste

---

### Step 5: Other Stakeholders

**What happens:**
- Ask if anyone else needs to be notified
- Draft additional messages if needed

**Deliverable:** All messages drafted

---

### Step 6: Create Handoff Record

**What happens:**
- Write handoff-complete.md with all links and messages
- Mark handoff as complete

**Deliverable:** `handoff-complete.md`

---

## File Structure

```
keylead/sprints/YYYY-WXX/[feature-name]/
├── prd.md
├── qa.md
├── linear-tickets.md
├── loom-outline.md
└── handoff-complete.md
```

---

## Manual Steps After Handoff

1. Post Slack message
2. Record Loom video (if pending), share link
3. Create Linear tickets from linear-tickets.md
4. Ready for Monday kickoff

---

## Exit Criteria

- All files committed and pushed
- Slack message drafted
- Engineers can pull and have everything
- Ready for Monday 12pm kickoff
