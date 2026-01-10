# Product OS — System Design

## Overview

Product OS is a structured workflow system for weekly product development. It helps product leads prepare comprehensive handoff packages for engineers, reducing mid-week clarifications and ensuring features ship according to vision.

**Supports multiple projects** — each project has its own context file and sprint folder. Run `/start` to select which project you're working on.

---

## The Problem Being Solved

**Common pain points:**
- Product leads spend too much time on feature prep
- PRDs lack edge cases and UI specs
- Engineers make autonomous decisions mid-week that cause divergence
- QA lacks context to test effectively
- Features ship differently than envisioned

**Root causes:**
- Not enough deep thinking upfront (edge cases, UI flows)
- PRDs cover functionality but not UI
- No structured process for comprehensive prep
- Context lives in product lead's head, not in docs

**Failure modes:**
1. Misalignment — didn't build what was asked
2. Edge cases — users find holes
3. Bad UX — didn't follow best practices

---

## The Weekly Cycle

```
FRIDAY
├── Company all-hands, demos
├── Stakeholder gives direction (2-3 commitments)
├── Customer feedback surfaces
└── Product lead leaves with raw inputs

SATURDAY/SUNDAY (2-4 hrs)
├── For each commitment, run Double Diamond
├── Output: 2-3 complete handoff packages
└── Everything ready for Monday

MONDAY
├── Kickoff call, present to stakeholder
├── Minor adjustments (10-15% changes typical)
├── Engineers pull and go
└── Product lead's involvement ends

MON-THU
├── Engineers build autonomously
├── AI agents answer questions (has PRD + codebase context)
└── Minimal pings to product lead

THU-FRI
├── Engineers deliver Thursday afternoon
├── QA tests in staging
├── Uses Loom video + QA checklist
├── Back and forth with engineers to fix issues
└── Ready for prod

FRIDAY
├── Demo at all-hands
├── Stakeholder impressed
├── In production, matches vision
└── Cycle repeats
```

---

## The Double Diamond Process

For each commitment (2-3 per week), run a Double Diamond:

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

**Exit signal:** Can articulate the problem in one sentence and defend it to stakeholder.

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

## Inputs (What Product Lead Works From)

| Input | Source |
|-------|--------|
| Direction + priorities | Friday call transcript |
| Customer problems | Feedback docs, stakeholder notes |
| Clarifications | Slack threads |
| Current system | Project codebase |
| Visual direction | Figma designs |
| Product judgment | Product lead's expertise |

---

## Outputs (The Handoff Package)

Each commitment produces:

```
[project]/sprints/YYYY-WXX/feature-name/
├── project.json        # Which project this is for
├── prd.md              # Comprehensive PRD (with embedded wireframes)
├── qa.md               # QA checklist
├── linear-tickets.md   # Tickets ready to create/paste
├── loom-outline.md     # Outline for walkthrough video
└── handoff-complete.md # Handoff record with links
```

---

## System Architecture

```
product-os/                          # Workspace
├── src/                             # UI (guides the process)
├── projects/                        # Project configurations
│   ├── projects.json                # List of all projects
│   ├── keylead/
│   │   └── CONTEXT.md               # Keylead-specific context
│   └── nairon-slackapp/
│       ├── CONTEXT.md               # Nairon-specific context
│       └── sprints/                 # Nairon sprint files
│           └── YYYY-WXX/
│               └── feature-name/
│
├── keylead/                         # Keylead codebase (nested)
│   ├── client-app/
│   ├── content-server/
│   └── sprints/                     # Keylead sprint files
│       └── YYYY-WXX/
│           └── feature-name/
│
└── workflow/                        # Workflow documentation
```

**How it works:**
- UI shows progress, guides through Double Diamond phases
- Claude Code (terminal) does the heavy lifting via skills
- Files are source of truth
- Each project has its own CONTEXT.md for project-specific guidelines
- Sprint files stay in the project's repo (engineers pull them with code)

---

## Key Roles

| Role | Responsibilities |
|------|-----------------|
| **Product Lead** | Runs the Double Diamond process, makes convergent decisions, records Loom walkthroughs, presents at kickoff, near-zero involvement Mon-Thu |
| **Engineers** | Pull from sprints/ on Monday, build autonomously using PRD + codebase context, use AI for clarifying questions, deliver Thursday afternoon |
| **QA** | Ramps up via Loom video, uses QA checklist to verify functionality, goes back and forth with engineers Thu-Fri |
| **Stakeholder** | Provides direction at all-hands, reviews plan at kickoff, impressed on Friday when features ship to vision |

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
| **5. Where** | Product pointers — where in the product this lives |
| **6. How** | Behavior specs, edge cases, user journey, success criteria |
| **7. Wireframes** | ASCII wireframes for desktop + mobile |
| **8. Links** | References, related docs |

---

## QA Checklist Structure

QA needs hyper-specific instructions with exact expected outcomes.

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
| New feature | ASCII wireframes in PRD |
| Improvement | Annotated screenshots |
| Both | Desktop + mobile required |

**Workflow:**
1. **Develop phase**: Claude proposes ASCII wireframes to react to
2. **Product lead**: Refines wireframes, covers multiple screens, states, edge cases
3. **Mobile is forced**: Can't skip thinking about mobile layouts
4. **Deliver phase**: Wireframes embedded directly in PRD
5. **PRD stays clean**: ASCII wireframes inline, not external links

**What wireframes should cover:**
- Desktop layout
- Mobile layout
- Key states (empty, loading, error, success)
- Edge case screens

---

## Linear Ticket Structure

**Organization:**
- One project per engineer per week (sometimes 2 if load is low)
- Tickets broken down to achieve project goal (4-5 max)

**Each ticket contains:**
| Element | Details |
|---------|---------|
| **Title** | Clear action ("Build credit purchase flow") |
| **Description** | Brief — 1-2 sentences, PRD has the detail |
| **Link to PRD** | For full context |
| **Acceptance criteria** | 3-5 bullets — how to know it's done |
| **Images** | Reference wireframes in PRD |

---

## Loom Video Outline

Claude generates an outline — product lead follows it, adds their own words.

**Format (5 min total):**

| Section | Time | Show on Screen | Cover |
|---------|------|----------------|-------|
| **1. Context** | 1 min | Current platform in staging | Why we're building this, what problem it solves |
| **2. What We're Building** | 1 min | PRD summary section | Scope overview, what's in/out |
| **3. User Flow** | 1.5 min | PRD wireframes | Walk through the flow, desktop + mobile |
| **4. Edge Cases** | 1 min | PRD edge cases table | What's already decided, no need to ask |
| **5. QA Focus** | 30 sec | QA checklist | What to test, which accounts, which flows |

---

## Slash Commands

7 commands covering the full workflow. Each command walks through sequential steps — one at a time, not a checklist dump.

| Command | Phase | Purpose |
|---------|-------|---------|
| `/start` | Initialize | Select project, create directory, capture raw inputs |
| `/discover` | Problem - Diverge | Explore problem broadly |
| `/define` | Problem - Converge | Narrow to one problem statement |
| `/develop` | Solution - Diverge | Explore solutions, wireframes, edge cases |
| `/deliver` | Solution - Converge | Generate PRD, QA, Linear tickets, Loom outline |
| `/handoff` | Final | Commit, push, notify engineers |
| `/status` | Utility | Check where you are anytime |

**Full documentation:** See `workflow/` folder for detailed steps per command.

---

## UI Design

**Architecture:** Vite + React, reads files at build time using `import.meta.glob`. Hot-reloads in dev mode, manual refresh button for updates.

**State detection:** File existence determines phase completion

| File exists | Phase complete |
|-------------|----------------|
| `project.json` | Feature initialized |
| `inputs-summary.md` | /start |
| `discover-output.md` | /discover |
| `problem-statement.md` | /define |
| `develop-output.md` | /develop |
| `prd.md` + `qa.md` + `linear-tickets.md` + `loom-outline.md` | /deliver |
| `handoff-complete.md` | /handoff |

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

**3. Project/Feature Selector**
- List of projects
- Features for current week per project
- Status of each
- Switch between projects/features

**4. Refresh Button**
- Reload files to update state after Claude Code writes outputs

---

### Pages

| Route | What it shows |
|-------|---------------|
| `/` | Dashboard — all projects, current week's features, overall status |
| `/feature/:name` | Feature detail — phase progress, current phase panel |
| `/feature/:name/:phase` | Phase detail — full checklist, outputs viewer |

---

*Product OS - Sprint-based feature development workflow*
