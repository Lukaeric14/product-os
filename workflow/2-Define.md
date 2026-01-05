# /define

**Phase:** Problem Space — Converge
**Purpose:** Narrow down to one clear problem statement you can defend

---

## When to Use

Run after `/discover` when you've explored the problem space and are ready to converge.

---

## Sequential Steps

### Step 1: Review Discover Output

**What happens:**
- Load and review everything from Discover phase
- Refresh context

**Claude does:**
- Summarizes key findings from `/discover`
- Highlights themes and clusters

**Deliverable:** Context loaded

---

### Step 2: Synthesize Clusters

**What happens:**
- Group related findings
- Identify key themes

**Claude asks:**
- "Here are the clusters I see: [X, Y, Z]. Does this grouping make sense?"
- "Which cluster feels most important?"

**Deliverable:** Themes identified

---

### Step 3: Narrow Down

**What happens:**
- Use gut feel to reduce options
- Make the call on what problem to solve

**Claude asks:**
- "Based on everything, which problem is most critical to solve?"
- "What's your gut telling you?"

**Deliverable:** Problem focus selected

---

### Step 4: Articulate Problem Statement

**What happens:**
- Write one clear sentence defining the problem
- Make it specific enough to act on

**Claude asks:**
- "Can you state the problem in one sentence?"
- "Here's my attempt: [statement]. Does this capture it?"

**Deliverable:** One problem statement

---

### Step 5: Defend Check

**What happens:**
- Validate you can defend this to Nima
- Ensure it aligns with business goals

**Claude asks:**
- "If Nima asked 'why this problem and not the others?' — what would you say?"
- "Does this align with his priorities?"

**Deliverable:** `problem-statement.md`

---

## Exit Criteria

- One clear problem statement
- Can articulate in one sentence
- Can defend to Nima
- Ready to run `/develop`

---

## Files Created

```
sprints/YYYY-WXX/feature-name/
└── problem-statement.md
```
