# /deliver

**Phase:** Solution Space — Converge
**Purpose:** Finalize approach and generate all handoff materials

---

## When to Use

Run after `/develop` when you've explored solutions and created Excalidraw wireframes.

---

## Prerequisites

Before running `/deliver`, ensure:
- [ ] `/develop` completed
- [ ] Excalidraw wireframes created (desktop + mobile + states)
- [ ] You've made trade-off decisions

---

## Sequential Steps

### Step 1: Review All Previous Outputs

**What happens:**
- Load everything from previous phases
- Confirm context before finalizing

**Claude does:**
- Summarizes: problem statement, solution approach, edge cases
- Confirms Excalidraw wireframes exist

**Deliverable:** Context loaded

---

### Step 2: Finalize Approach

**What happens:**
- Lock in the solution
- Make final trade-off decisions

**Claude asks:**
- "Based on Develop, the approach is: [summary]. Confirm?"
- "Any final changes before generating docs?"

**Deliverable:** Approach locked

---

### Step 3: Generate PRD

**What happens:**
- Generate comprehensive PRD following template

**PRD Sections:**
1. Summary — TL;DR
2. Why — Context, business reason, customer pain
3. Why — Context, business reason, customer pain
4. What — Scope, goals
5. Out of Scope — Explicit boundaries
6. Where — Product pointers
7. How — Behavior, edge cases, user journey, success criteria
8. Links — Figma, Excalidraw, references

**Claude outputs:**
- Full PRD in markdown

**Deliverable:** `prd.md`

---

### Step 4: Generate QA Checklist

**What happens:**
- Generate QA checklist for Ahmer
- Hyper-specific with exact expected outcomes

**QA Sections:**
1. Context — Feature, user types
2. Test Account Setup — Credentials, account state
3. Pre-Test Setup — Data, conditions needed
4. Test Cases — Action → Expected (with details)
5. Edge Cases — Specific weird scenarios
6. Polish Check — UI quality standards

**Claude outputs:**
- Full QA checklist in markdown

**Deliverable:** `qa.md`

---

### Step 5: Generate Linear Tickets

**What happens:**
- Break down feature into tickets
- Each ticket has: title, brief description, acceptance criteria, links

**Claude outputs:**
- List of tickets in markdown
- Each ticket ready to copy to Linear
- Images/wireframes referenced

**Deliverable:** `linear-tickets.md`

---

### Step 6: Generate Loom Outline

**What happens:**
- Generate 5-minute video outline
- What to show, what to say, key points

**Outline Sections:**
1. Context (1 min) — Why, what problem
2. What We're Building (1 min) — Scope
3. User Flow (1.5 min) — Walk through wireframes
4. Edge Cases (1 min) — What's decided
5. QA Focus (30 sec) — What to test

**Claude outputs:**
- Loom outline in markdown

**Deliverable:** `loom-outline.md`

---

### Step 7: Package Complete Check

**What happens:**
- Verify all deliverables exist
- Confirm ready for handoff

**Claude checks:**
- [ ] prd.md exists
- [ ] qa.md exists
- [ ] linear-tickets.md exists
- [ ] loom-outline.md exists
- [ ] Excalidraw wireframes exist

**Deliverable:** All deliverables confirmed

---

## After This Phase

**You manually:**
1. Record Loom video following outline
2. Create Linear tickets from `linear-tickets.md`
3. Attach images to Linear tickets

---

## Exit Criteria

- PRD complete
- QA checklist complete
- Linear tickets ready
- Loom outline ready
- Ready to run `/handoff`

---

## Files Created

```
sprints/YYYY-WXX/feature-name/
├── prd.md
├── qa.md
├── linear-tickets.md
└── loom-outline.md
```

**You create manually:**
- Loom video recording
- Linear tickets (copy from markdown)
