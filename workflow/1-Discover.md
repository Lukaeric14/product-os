# /discover

**Phase:** Problem Space — Diverge
**Purpose:** Explore the problem broadly before narrowing down

---

## When to Use

Run after `/start` when you have raw inputs captured and want to explore the problem space.

---

## Sequential Steps

### Step 1: Question Core Desire

**What happens:**
- Dig into WHY this feature is being requested
- Understand the underlying need, not just the surface ask

**Claude asks:**
- "Why does Nima want this?"
- "What's the business driver?"
- "What happens if we don't build this?"

**Deliverable:** Core desire documented

---

### Step 2: Trace Reasoning Chain

**What happens:**
- Validate the logic from problem to proposed solution
- Make sure the reasoning holds

**Claude asks:**
- "The ask is X. Is X actually the right solution to the underlying problem?"
- "What assumptions are we making?"

**Deliverable:** Reasoning chain documented

---

### Step 3: User Perspective

**What happens:**
- Consider how users will react to this
- Understand their context and pain

**Claude asks:**
- "How would users react to this?"
- "What's their current workaround?"
- "What would delight them vs. just satisfy them?"

**Deliverable:** User perspective documented

---

### Step 4: Blind Spots

**What happens:**
- Surface what might be missing
- Consider angles not yet explored

**Claude asks:**
- "What are we not thinking about?"
- "Who else is affected by this?"
- "What related problems exist?"

**Deliverable:** Blind spots documented

---

### Step 5: Risks

**What happens:**
- Identify what could go wrong
- Consider negative outcomes

**Claude asks:**
- "What could go wrong with this direction?"
- "What are the risks of building this?"
- "What are the risks of NOT building this?"

**Deliverable:** Risks documented

---

### Step 6: Exit Check

**What happens:**
- Review everything explored
- Check if ready to converge or need more exploration

**Claude asks:**
- "Are we seeing diminishing returns? Or is there more to explore?"
- "Do you feel you understand the problem space?"

**Deliverable:** `discover-output.md` (summary of all steps)

---

## Exit Criteria

- Problem explored from multiple angles
- No major blind spots remaining
- Diminishing returns on new ideas
- Ready to run `/define`

---

## Files Created

```
sprints/YYYY-WXX/feature-name/
└── discover-output.md
```
