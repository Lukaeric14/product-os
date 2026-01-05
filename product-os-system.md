# Product OS — System Design

## Overview

Product OS is a structured workflow system for weekly product development at Keylead. It helps the Head of Product (Luka) prepare comprehensive handoff packages for engineers, reducing mid-week clarifications and ensuring features ship according to vision.

---

## The Problem Being Solved

**Current pain points:**
- Luka spends 20 hrs/week, wants to get to 8-10 hrs
- PRDs lack edge cases and UI specs
- Engineers make autonomous decisions mid-week that cause divergence
- QA lacks context to test effectively
- Features ship differently than envisioned
- Luka is slow to respond, so engineers ship and fix later

**Root causes:**
- Not enough deep thinking upfront (edge cases, UI flows)
- PRDs cover functionality but not UI
- No structured process for comprehensive prep
- Context lives in Luka's head, not in docs

**Failure modes (why Nima isn't impressed on Friday):**
1. Misalignment — didn't build what he asked
2. Edge cases — users find holes
3. Bad UX — didn't follow best practices

---

## The Weekly Cycle

```
FRIDAY
├── Company all-hands, demos
├── Nima gives direction (2-3 commitments)
├── Customer feedback surfaces
└── Luka leaves with raw inputs

SATURDAY/SUNDAY (2-4 hrs)
├── For each commitment, run Double Diamond
├── Output: 2-3 complete handoff packages
└── Everything ready for Monday

MONDAY
├── 12pm: Kickoff call, present to Nima
├── Minor adjustments (10-15% changes typical)
├── 1pm: Engineers pull and go
└── Luka's involvement ends

MON-THU
├── Engineers build autonomously
├── Claude Code answers questions (has PRD + codebase context)
└── Minimal pings to Luka

THU-FRI
├── Engineers deliver Thursday afternoon
├── Ahmer (QA) tests in staging
├── Uses Loom video + QA checklist
├── Back and forth with engineers to fix issues
└── Ready for prod

FRIDAY
├── Demo at all-hands
├── Nima impressed
├── In production, matches vision
└── Cycle repeats
```

---

## The Double Diamond Process

For each commitment (2-3 per week), Luka runs a Double Diamond:

```
┌─────────────────────────────────┬─────────────────────────────────┐
│       PROBLEM SPACE             │       SOLUTION SPACE            │
├─────────────────────────────────┼─────────────────────────────────┤
│                                 │                                 │
│   DISCOVER        DEFINE        │   DEVELOP         DELIVER       │
│   (diverge)      (converge)     │   (diverge)      (converge)     │
│                                 │                                 │
│      ╱╲             │           │      ╱╲              │          │
│     ╱  ╲            │           │     ╱  ╲             │          │
│    ╱    ╲           │           │    ╱    ╲            │          │
│   ╱      ╲          ▼           │   ╱      ╲           ▼          │
│                                 │                                 │
│   Explore      One problem      │   Explore       PRD + full      │
│   broadly      statement        │   solutions     handoff         │
│                                 │                                 │
└─────────────────────────────────┴─────────────────────────────────┘
```

### Phase 1: DISCOVER (Diverge on Problem)

**What happens:**
- Question the core desire — why are we doing this?
- Trace the reasoning chain — does the logic hold?
- User perspective — how would they react?
- Blind spots — what are we missing?
- Risks — what could go wrong?

**Exit signal:** Diminishing returns — you're circling, not discovering new angles.

**Output:** Clusters of problem angles, research, open questions.

---

### Phase 2: DEFINE (Converge on Problem)

**What happens:**
- Narrow down using gut feel
- Synthesize what was discovered
- Make the call on what problem to solve

**Exit signal:** Can articulate the problem in one sentence and defend it to Nima.

**Output:** One clear problem statement.

---

### Phase 3: DEVELOP (Diverge on Solutions)

**What happens:**
- Brainstorm UI flow options
- Explore how to handle edge cases
- Explore how to mitigate risks
- Sketch possible solutions
- Evaluate each: strengths, weaknesses
- Look to combine/mix approaches
- Check against problem space goals

**Note:** For improvements to existing features, inputs include:
- Existing flow (how it works now)
- Complaints (what's broken)
- Points of improvement (where the gaps are)

**Exit signal:** Clear options with trade-offs understood.

**Output:** Possible approaches evaluated.

---

### Phase 4: DELIVER (Converge + Package)

**What happens:**
- Make trade-offs
- Finalize the approach
- Define in plain English what we're building
- Create all handover materials

**Output (the handoff package):**
- PRD (comprehensive, with edge cases)
- UI flows / designs finalized
- Linear tickets created
- Loom walkthrough recorded
- QA checklist ready

---

## Inputs (What Luka Works From)

| Input | Source |
|-------|--------|
| Direction + priorities | Friday call transcript |
| Customer problems | Feedback docs, Nima's notes |
| Clarifications | Slack threads |
| Current system | Keylead codebase |
| Visual direction | Figma designs |
| Product judgment | Luka's head |

---

## Outputs (The Handoff Package)

Each commitment produces:

```
.pm/sprints/2025-W02/feature-name/
├── prd.md              # Comprehensive PRD
├── qa.md               # QA checklist for Ahmer
├── designs/            # UI flows, mockups, state descriptions
├── linear-tickets.md   # Tickets ready to create/paste
└── loom-link.md        # Link to walkthrough video
```

---

## System Architecture

```
product-os/                          # Luka's workspace
├── src/                             # UI (guides the process)
├── templates/                       # PRD, QA, handoff templates
├── sprints/                         # Working files (drafts, inputs)
│   └── 2025-W02/
│       └── feature-a/
│           ├── raw-input.md         # Messy inputs
│           ├── objectives.md        # Refined objectives
│           └── ...                  # Work in progress
│
└── keylead/                         # Codebase (nested)
    ├── client-app/
    ├── content-server/
    └── .pm/                         # Handoff destination
        └── sprints/
            └── 2025-W02/
                └── feature-a/
                    ├── prd.md           # Final PRD
                    ├── qa.md            # QA checklist
                    └── ...              # Ready for engineers
```

**How it works:**
- UI shows progress, guides through Double Diamond phases
- Claude Code (terminal) does the heavy lifting via skills
- Files are source of truth
- Final handoff materials written INTO keylead/.pm/
- Engineers pull keylead, have everything

---

## Key Roles

**Luka (Head of Product)**
- Runs the Double Diamond process on weekends
- Makes convergent decisions (problem definition, solution trade-offs)
- Records Loom walkthroughs
- Presents at Monday kickoff
- Near-zero involvement Mon-Thu

**Engineers (Obaid, Abdi)**
- Pull from keylead/.pm/ on Monday
- Build autonomously using PRD + codebase context
- Use Claude Code for clarifying questions
- Deliver Thursday afternoon

**QA (Ahmer)**
- Works in Luka's name (feedback appears to come from Luka)
- Ramps up via Loom video
- Uses QA checklist to verify functionality
- Trained on Luka's standards for polish/design
- Goes back and forth with engineers Thu-Fri

**Nima (CEO)**
- Provides direction at Friday all-hands
- Reviews plan at Monday kickoff (10-15% changes typical)
- Impressed on Friday when features ship to vision

---

## Engineer Deliverables

Engineers need:
- **PRD** — The comprehensive spec
- **Designs** — UI flows, mockups, states
- **Linear tickets** — Scannable tasks
- **Loom video** — Walkthrough bringing it all together

---

## PRD Structure

| Section | What it covers |
|---------|----------------|
| **1. Summary** | TL;DR — 3-4 sentences, scannable |
| **2. Why** | Context, business reason, customer pain |
| **3. What** | Scope, goals |
| **4. Out of Scope** | Explicit boundaries — what we're NOT doing |
| **5. Where** | Product pointers — where in the product this lives (e.g., "Settings page for user profile") |
| **6. How** | Behavior specs, edge cases, user journey, success criteria |
| **7. Links** | Figma, references, related docs |

---

## QA Checklist Structure

Ahmer needs hyper-specific instructions with exact expected outcomes.

| Section | What it covers |
|---------|----------------|
| **1. Context** | What feature, which user type(s) being tested |
| **2. Test Account Setup** | Credentials needed, what state the account should be in |
| **3. Pre-Test Setup** | Any data or conditions needed before testing |
| **4. Test Cases** | Action → Expected (with exact details, URLs, copy, colors) |
| **5. Edge Cases** | Specific weird scenarios to try |
| **6. Polish Check** | UI quality standards to verify |

**Good test case format:**
- Action: Navigate to `/settings/profile`
- Expected: Page loads with title "Profile Settings"
- Expected: "Save" button is disabled until changes are made
- Expected: Profile photo has circular crop with 120px diameter

---

## Design Deliverables

| Feature Type | Design Deliverable |
|--------------|-------------------|
| New feature | Excalidraw wireframes (Claude proposes ASCII → Luka refines in Excalidraw) |
| Improvement | Annotated screenshots |
| Both | Desktop + mobile required |

**Workflow:**
1. **Develop phase**: Claude proposes ASCII wireframes to react to
2. **Luka**: Recreates/refines in Excalidraw — multiple screens, states, edge cases
3. **Mobile is forced**: Can't skip thinking about mobile layouts
4. **Deliver phase**: Excalidraw files attached to PRD (linked in "Links" section)
5. **PRD stays clean**: References sketches, doesn't contain ASCII bloat

**What Excalidraw should cover:**
- Desktop layout
- Mobile layout
- Key states (empty, loading, error, success)
- Edge case screens

---

## Linear Ticket Structure

**Organization:**
- One project per engineer per week (sometimes 2 if load is low)
- Tickets broken down to achieve project goal

**Each ticket contains:**
| Element | Details |
|---------|---------|
| **Title** | Clear action ("Build credit purchase flow") |
| **Description** | Brief — 1-2 sentences, PRD has the detail |
| **Link to PRD** | For full context |
| **Acceptance criteria** | 3-5 bullets — how to know it's done |
| **Images** | Excalidraw wireframes / annotated screenshots attached directly |

Engineers work from Linear — visuals are right in the ticket, PRD is there for deeper context.

---

## Loom Video Outline

Claude generates an outline — Luka follows it, adds his own words.

**Format (5 min total):**

| Section | Time | Show on Screen | Cover |
|---------|------|----------------|-------|
| **1. Context** | 1 min | Current platform in staging | Why we're building this, what problem it solves |
| **2. What We're Building** | 1 min | PRD summary section | Scope overview, what's in/out |
| **3. User Flow** | 1.5 min | Excalidraw wireframes | Walk through the flow, desktop + mobile |
| **4. Edge Cases** | 1 min | PRD edge cases section | What's already decided, no need to ask |
| **5. QA Focus** | 30 sec | QA checklist | What to test, which accounts, which flows |

The outline tells Luka:
- What section to cover
- What to show on screen
- Key points to hit

---

## Slash Commands

7 commands covering the full workflow. Each command walks through sequential steps — one at a time, not a checklist dump.

| Command | Phase | Purpose |
|---------|-------|---------|
| `/start` | Initialize | Create directory, capture raw inputs |
| `/discover` | Problem - Diverge | Explore problem broadly |
| `/define` | Problem - Converge | Narrow to one problem statement |
| `/develop` | Solution - Diverge | Explore solutions, wireframes, edge cases |
| `/deliver` | Solution - Converge | Generate PRD, QA, Linear tickets, Loom outline |
| `/handoff` | Final | Write everything to keylead/.pm/ |
| `/status` | Utility | Check where you are anytime |

**Full documentation:** See `workflow/` folder for detailed steps per command.

---

## UI Design

**Architecture:** Vite + React, reads files at build time using `import.meta.glob`. Hot-reloads in dev mode, manual refresh button for updates.

**State detection:** File existence determines phase completion (Option A)

| File exists | Phase complete |
|-------------|----------------|
| `inputs-summary.md` | /start |
| `discover-output.md` | /discover |
| `problem-statement.md` | /define |
| `develop-output.md` | /develop |
| `prd.md` + `qa.md` + `linear-tickets.md` + `loom-outline.md` | /deliver |
| Files in `keylead/.pm/` | /handoff |

---

### UI Components

**1. Phase Navigation**
```
[✓] Start → [✓] Discover → [●] Define → [ ] Develop → [ ] Deliver → [ ] Handoff
                              ↑
                          CURRENT
```

**2. Current Phase Panel**
- Phase name and purpose
- Step checklist table (from workflow docs — static, not tracked)
- Slash command to run
- Copy command button
- Exit criteria

**3. Feature Selector**
- List of features for current week
- Status of each
- Switch between features

**4. Refresh Button**
- Reload files to update state after Claude Code writes outputs

---

### Pages

| Route | What it shows |
|-------|---------------|
| `/` | Dashboard — current week's features, overall status |
| `/feature/:name` | Feature detail — phase progress, current phase panel |
| `/feature/:name/:phase` | Phase detail — full checklist, outputs viewer |

---

*Document created during consulting session, January 2025*
