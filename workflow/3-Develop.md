# /develop

**Phase:** Solution Space — Diverge
**Purpose:** Explore solutions broadly — UI flows, wireframes, edge cases

---

## When to Use

Run after `/define` when you have a clear problem statement and want to explore solutions.

---

## Sequential Steps

### Step 1: Review Problem Statement

**What happens:**
- Load problem statement from Define phase
- Confirm context before exploring solutions

**Claude does:**
- Shows problem statement
- Confirms ready to explore solutions

**Deliverable:** Context loaded

---

### Step 2: Brainstorm UI Flow Options

**What happens:**
- Explore different approaches to the solution
- Consider multiple ways to solve the problem

**Claude asks:**
- "Here are 2-3 approaches to solve this: [A, B, C]"
- "What's your reaction? Any other approaches?"

**Deliverable:** UI flow options documented

---

### Step 3: Propose Desktop Wireframe

**What happens:**
- Claude proposes ASCII wireframe for desktop
- You react and refine

**Claude outputs:**
- ASCII wireframe for desktop layout
- Explanation of layout choices

**Deliverable:** ASCII desktop wireframe

**Note:** After this step, you'll recreate/refine in Excalidraw

---

### Step 4: Propose Mobile Wireframe

**What happens:**
- Claude proposes ASCII wireframe for mobile
- Forces mobile thinking

**Claude outputs:**
- ASCII wireframe for mobile layout
- How it differs from desktop

**Deliverable:** ASCII mobile wireframe

**Note:** Mobile is NOT optional — you must address it

---

### Step 5: Surface Edge Cases

**What happens:**
- Identify all the "what if" scenarios
- Based on requirements + codebase context

**Claude asks:**
- "Here are edge cases I see: [list]"
- "What happens when X?"
- "What if the user does Y?"

**Deliverable:** Edge cases list with answers

---

### Step 6: Identify Risks from Codebase

**What happens:**
- Analyze Keylead codebase for relevant context
- Identify technical risks or constraints

**Claude does:**
- Reviews relevant files in keylead/
- Flags potential issues or dependencies

**Deliverable:** Risks documented

---

### Step 7: Evaluate Trade-offs

**What happens:**
- Compare solution options
- Weigh pros and cons

**Claude asks:**
- "Option A is better for X, Option B is better for Y"
- "Which trade-offs are acceptable?"

**Deliverable:** Trade-off analysis

---

### Step 8: Exit Check

**What happens:**
- Review everything explored
- Confirm ready to finalize

**Claude asks:**
- "Do you have clear options to choose from?"
- "Has mobile been addressed?"
- "Are edge cases surfaced?"

**Deliverable:** `develop-output.md`

---

## After This Phase

**You manually:**
1. Create Excalidraw wireframes based on ASCII proposals
2. Include: desktop, mobile, key states (empty, loading, error, success)
3. Add annotations with your details

---

## Exit Criteria

- UI flow options explored
- Desktop + mobile wireframes proposed
- Edge cases identified and answered
- Risks surfaced
- Ready to run `/deliver`

---

## Files Created

```
sprints/YYYY-WXX/feature-name/
└── develop-output.md
```

**You create manually:**
- Excalidraw wireframes (desktop + mobile + states)
