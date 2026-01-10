# PRD: Lite Mode for Product OS

## 1. Summary

Add a "lite mode" workflow for smaller features that don't need the full Double Diamond process. Skip discover/define phases and go straight to a condensed develop → deliver flow. Also add proper support for skipping deliverables without creating placeholder files.

## 2. Why

**Business context:** Not every feature needs 6 phases. Small bugs, quick improvements, or well-understood features don't benefit from extensive problem exploration.

**User pain:**
- Full process feels heavy for simple tasks
- Skipping steps creates incomplete UI state (checkboxes not checked)
- No way to mark deliverables as "skipped" vs "not done"

**What happens if we don't build this:**
- Users avoid the tool for small features
- Workarounds (placeholder files) feel hacky
- Process feels rigid instead of adaptive

## 3. What

**In scope:**
- New `/lite` command that combines discover+define+develop into one phase
- Skip support: properly mark steps as skipped (not just missing)
- Deliverable selection: choose which outputs you need at /start
- UI updates to show skipped vs incomplete vs complete states

**Goals:**
- Reduce time for simple features by 50%
- No more placeholder file workarounds
- Same quality output, less ceremony

## 4. Out of Scope

- Changing the full process (keep it for complex features)
- Auto-detecting which mode to use
- Mobile support

## 5. Where

**Product locations:**

- **/start** (MODIFIED): Add question "Is this a quick feature or complex feature?"
  - Quick → lite mode
  - Complex → full mode

- **/lite** (NEW): Single command combining problem + solution exploration
  - Asks abbreviated questions
  - Generates `lite-output.md` instead of separate discover/define/develop files

- **/deliver** (MODIFIED):
  - Ask "Which deliverables do you need?" at start
  - Mark unselected as "skipped" not "incomplete"

- **UI** (MODIFIED):
  - New step state: skipped (gray with "Skipped" label)
  - Phase can be complete even with skipped steps
  - Show mode badge: "Lite" or "Full"

## 6. How

### User Journey: Lite Mode

1. User runs `/start`
2. System asks: "Quick feature or complex feature?"
3. User selects "Quick"
4. System creates directory with `project.json` containing `"mode": "lite"`
5. User runs `/lite`
6. System asks condensed questions:
   - "What's the problem in one sentence?"
   - "What's the solution approach?"
   - "Any edge cases to handle?"
   - "Any technical risks?"
7. System generates `lite-output.md`
8. User runs `/deliver`
9. System asks: "Which deliverables? (PRD, QA, Tickets, Loom)"
10. User selects only PRD
11. System generates PRD, marks others as skipped
12. User runs `/handoff`

### Deliverable Selection

At `/deliver` start:
```
Which deliverables do you need?

[ ] PRD (recommended)
[ ] QA Checklist
[ ] Linear Tickets
[ ] Loom Outline

Select all that apply, then press Enter.
```

### Skip Tracking

In `project.json`:
```json
{
  "mode": "lite",
  "skippedDeliverables": ["qa.md", "linear-tickets.md", "loom-outline.md"]
}
```

UI reads this and shows skipped state instead of incomplete.

### Phase Completion Logic

Current:
```
deliver complete = prd.md AND qa.md AND linear-tickets.md AND loom-outline.md
```

New:
```
deliver complete = all selected deliverables exist
                   OR all non-skipped deliverables exist
```

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| User changes mind, wants full mode | Run `/discover` — converts to full mode |
| Lite mode but wants QA later | Can run `/deliver` again, select QA |
| Skip all deliverables | Error: "At least PRD is required" |

## 7. Wireframes

### Phase Nav with Mode Badge

```
┌─────────────────────────────────────────────────────┐
│  [Lite]  Sta → Lit → Del → Han                      │
│           ✓    ✓     ●                              │
└─────────────────────────────────────────────────────┘
```

### Step States

```
┌─────────────────────────────────────────────────────┐
│  ✓  Generate PRD         prd.md                     │  ← Complete (green)
├─────────────────────────────────────────────────────┤
│  ○  Generate QA          Skipped                    │  ← Skipped (gray)
├─────────────────────────────────────────────────────┤
│  4  Generate Tickets     linear-tickets.md          │  ← Incomplete (default)
└─────────────────────────────────────────────────────┘
```

### Deliverable Selection UI

```
┌─────────────────────────────────────────────────────┐
│  Which deliverables do you need?                    │
│                                                     │
│  [✓] PRD                 Required for handoff       │
│  [ ] QA Checklist        Test cases for QA team     │
│  [ ] Linear Tickets      Pre-written tickets        │
│  [ ] Loom Outline        Video script               │
│                                                     │
│                              [Continue]             │
└─────────────────────────────────────────────────────┘
```

## 8. Implementation Notes

### Files to Modify

- `src/types/sprint.ts` — Add lite phase, skip states
- `src/pages/FeatureDetail.tsx` — Handle lite mode, skipped steps
- `src/components/PhasePanel.tsx` — Render skipped state
- `src/hooks/useSprints.ts` — Read mode and skipped from project.json
- Skill files for `/start`, `/deliver`, `/lite`

### New Files

- `/lite` skill definition
- `lite-output.md` template

## 9. Links

- **Problem Statement:** Retro feedback from major-refactor sprint
- **Related:** agents.md (full process documentation)
