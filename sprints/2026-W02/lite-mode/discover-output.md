# Discover Output: Lite Mode

## Core Desire

**Why this feature?**
- Save time — get to final outcome quicker so implementation can start
- Smaller features don't require as much thinking or documentation

**Underlying need:**
- Both "faster" AND "right-sized" for the task at hand
- Not just speed — appropriateness of process depth to task complexity

**What happens without it:**
- Product OS doesn't get used for small features
- Tool only used for complex features with multiple stakeholders
- Lost usage = lost value capture for simpler work

**Core insight:** The goal isn't just a "lite" version — it's matching process depth to task complexity. One-size-fits-all doesn't work.

## Reasoning Chain

**Original assumption (from draft PRD):**
> Skip discover/define phases entirely → go straight to develop→deliver

**Validated reasoning:**
- User DOES want problem exploration — just condensed
- The issue isn't "too many phases" but "phases that could be combined"
- Want to combine discover+define into one "problem" phase
- Want to combine develop+deliver into one "solution" phase
- Fewer steps within each phase — only the essential ones
- Start and handoff should also be shorter

**Corrected solution direction:**
- Lite mode = 4 commands instead of 6: `/start` → `/problem` → `/solution` → `/handoff`
- Each phase has fewer, more essential steps
- User chooses mode at `/start` ("quick feature or complex feature?")
- They know instantly which type it is — no ambiguity

**Key insight:** It's not about skipping problem exploration. It's about combining phases and trimming steps to match task complexity.

## User Perspective

**Current workaround (without lite mode):**
- Go straight to implementation
- Results: chaotic, forget steps, don't achieve what's needed
- Pain: still need structure, just less of it

**What would delight (not just satisfy):**
- Faster process that delivers exactly the deliverables needed for the task
- Not just "faster" — right-sized outputs

**Steps analysis for small feature (e.g., "caching system"):**

User feedback on redundancy analysis:
- Start: Add mode selection (comprehensive vs lite)
- Discover: Analysis was correct
- Define: Correct, but MERGE with discover into single `/problem` command
- Develop: KEEP UI flows and wireframes (even for lite)
- Deliver: MERGE with develop into single `/solution` command
- Remove all "exit check" and "review all" steps — just ask at end of trade-offs
- Handoff: Replace "draft Slack" with "draft Claude Code prompt"

**Lite Mode Structure:**
```
/start (with mode selection)
    ↓
/problem (discover + define merged)
    ↓
/solution (develop + deliver merged)
    ↓
/handoff (with Claude Code prompt)
```

**Claude Code prompt concept for handoff:**
Instead of drafting a Slack message to engineers, draft a prompt for Claude Code:
- Pull latest code
- Learn the codebase
- Study handover docs (PRD, etc.)
- Draft implementation plan

This fits the "solo product person + engineer" use case — you're handing off to AI, not a team.

## Blind Spots

**1. Mode switching mid-process?**
- Q: What if a feature starts lite but becomes complex?
- A: Not supporting. Pick mode at start, stick with it.
- Implication: Mode selection at `/start` needs to be clear so users choose correctly

**2. UI needs to support both views**
- Currently tracks 6 phases
- Lite mode has 4 different phases with different steps
- UI must show correct phases/steps based on mode
- `project.json` will store mode, UI reads it and renders accordingly

**3. Skip support still relevant**
- Original pain: "UI checkboxes don't update for skipped items"
- Hoping lite mode implementation fixes this organically
- But still slightly a problem — may need explicit skip tracking
- Consider: `skippedSteps` in project.json for edge cases

**4. Other potential blind spots:**
- Naming: Are `/problem` and `/solution` clear enough? Or too generic?
- Migration: What about existing features in progress? (Probably: just use for new features)
- Documentation: agents.md will need significant updates for both modes

## Risks

**Risks of building this:**

1. **Complexity creep** — Two modes means twice the maintenance
   - Two sets of phase definitions in `sprint.ts`
   - Two UI views in components
   - Two sets of skill files
   - Risk level: Medium — manageable with clean architecture

2. ~~Users pick wrong mode~~ — Not a concern (user knows instantly which type)

**Risks of NOT building this:**

1. **Product OS unused for small features** — Already happening today
   - Lost value capture
   - Tool becomes "only for big features"

2. **Users create workarounds** — Go straight to implementation
   - Results are chaotic
   - Forget steps, don't achieve goals
   - The structure is still needed, just less of it

3. **Tool feels rigid** — "All or nothing" perception
   - Reduces adoption
   - Doesn't match reality of varied feature sizes

## Exit Check

Problem space fully explored. Key themes:

1. **Core problem:** Full 6-phase process is overkill for small/solo features
2. **Real need:** Combined phases + fewer steps (not skipping problem exploration)
3. **Solution direction:** 4-command lite mode with mode selection at start
4. **Main risk:** Complexity of maintaining two modes
5. **Main benefit:** Product OS becomes usable for all feature sizes

Ready to converge on problem statement.
