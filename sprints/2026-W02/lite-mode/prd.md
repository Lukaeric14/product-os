# PRD: Lite Mode

## 1. Summary

Add a "lite mode" workflow to Product OS for smaller features that don't need the full 6-phase Double Diamond process. Users select mode at `/start`, then lite mode uses 4 commands (`/start` → `/problem` → `/solution` → `/handoff`) with combined phases and fewer steps. The UI adapts to show 4 phases instead of 6, with a `[Lite]` badge to indicate mode.

## 2. Why

**Business context:** Product OS is designed for complex, multi-stakeholder features. But not every feature needs 6 phases — small bugs, quick improvements, or well-understood features don't benefit from extensive exploration.

**Customer pain:**
- Full process feels heavy for simple tasks
- Users skip Product OS entirely for small features
- Without any process, implementation is chaotic — users forget steps and don't achieve goals
- Users still need structured thinking, just less of it

**What happens if we don't build this:**
- Product OS only used for complex features
- Lost value capture for simpler work
- Tool feels rigid ("all or nothing")

## 3. What

**In scope:**
- Mode selection at `/start` (Comprehensive vs Lite)
- New `/problem` command (combines discover + define)
- New `/solution` command (combines develop + deliver)
- Modified `/handoff` (drafts Claude Code prompt instead of Slack)
- UI support for both modes (4 or 6 phases)
- `[Lite]` badge on dashboard and feature detail
- Backward compatibility (old features default to comprehensive)

**Goals:**
- Reduce time-to-implementation for small features by 50%
- Product OS usable for ALL feature sizes
- Same quality thinking, less ceremony

## 4. Out of Scope

- Changing comprehensive mode (keep all 6 phases as-is)
- Mode switching mid-feature
- Auto-detecting which mode to use
- Skip support for individual steps within a mode

## 5. Where

**Product locations:**

- **/start** (MODIFIED): Add mode selection as first question
  - "Is this a comprehensive or lite feature?"
  - Store `mode` in `project.json`

- **/problem** (NEW): Combined discover + define
  - Core desire, reasoning chain, blind spots, risks
  - One-sentence problem statement
  - Output: `problem-output.md`

- **/solution** (NEW): Combined develop + deliver
  - Solution approach, UI flows, wireframes, edge cases, trade-offs
  - Generate PRD
  - Output: `solution-output.md` + `prd.md`

- **/handoff** (MODIFIED):
  - Draft Claude Code prompt instead of Slack message
  - Prompt tells Claude to pull latest, learn codebase, study handover docs

- **Dashboard** (MODIFIED):
  - Show `[Lite]` badge next to feature name
  - Progress dots: 4 for lite, 6 for comprehensive

- **Feature Detail** (MODIFIED):
  - Phase nav shows 4 phases for lite mode
  - Phase panel shows correct steps for each mode

## 6. How

### User Journey: Lite Mode

1. User runs `/start`
2. System asks: "Comprehensive or Lite?"
3. User selects "Lite"
4. System creates directory with `project.json` containing `"mode": "lite"`
5. System continues with abbreviated start questions
6. User runs `/problem`
7. System walks through combined discover+define steps
8. System generates `problem-output.md`
9. User runs `/solution`
10. System walks through combined develop+deliver steps
11. System generates `solution-output.md` + `prd.md`
12. User runs `/handoff`
13. System drafts Claude Code implementation prompt
14. User commits and starts implementation

### Behavior Specs

**Mode Selection (`/start`):**
- First question after greeting
- Two options: "Comprehensive" and "Lite"
- If skipped/unanswered: default to comprehensive
- Stored in `project.json` as `"mode": "comprehensive"` or `"mode": "lite"`

**Lite Phases:**

| Phase | Command | Steps | Exit File |
|-------|---------|-------|-----------|
| Start | `/start` | Project, name, mode, quick summary | `inputs-summary.md` |
| Problem | `/problem` | Core desire, reasoning, blind spots, risks, one-sentence problem | `problem-output.md` |
| Solution | `/solution` | Approach, UI flows, wireframes, edge cases, trade-offs, PRD | `prd.md` |
| Handoff | `/handoff` | Validate, commit, Claude Code prompt | `handoff-complete.md` |

**Command Mode Checking:**
- Each command reads `mode` from `project.json`
- If wrong command for mode, show simple error:
  - Lite feature + `/discover` → "This is a lite feature. Use `/problem` instead."
  - Comprehensive feature + `/problem` → "This is a comprehensive feature. Use `/discover` instead."
- Keep error check minimal — don't bloat command context

**UI Mode Detection:**
- Backend reads `project.json` for each feature
- Returns `mode` field in API response
- If `mode` field missing → default to "comprehensive"
- Frontend uses mode to select correct phase set

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| Old features without `mode` field | Default to "comprehensive" (backward compatible) |
| User runs `/discover` on lite feature | Error: "Use `/problem` instead" |
| User runs `/problem` on comprehensive feature | Error: "Use `/discover` instead" |
| Mode not selected at `/start` | Default to comprehensive |

### Success Criteria

- [ ] Mode selection works at `/start`
- [ ] `/problem` command creates `problem-output.md`
- [ ] `/solution` command creates `solution-output.md` + `prd.md`
- [ ] `/handoff` drafts Claude Code prompt
- [ ] Dashboard shows `[Lite]` badge for lite features
- [ ] Feature detail shows 4 phases for lite features
- [ ] Old features without mode still work (default comprehensive)
- [ ] Wrong command for mode shows helpful error

## 7. Wireframes

### Dashboard with Lite Mode Badge (Desktop)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Product OS                                           Week 2026-W02 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Features                                                           │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  lite-mode [Lite]                              ●●●○  3/4      │  │
│  │  Product OS                                                   │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  major-refactor                                ●●●●●●  6/6    │  │
│  │  Nairon Slack App                                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Feature Detail - Lite Mode (Desktop)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Back                                lite-mode [Lite]   2026-W02  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│     Start        Problem        Solution        Handoff             │
│       ✓            ✓              ●               ○                 │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Solution                                              /solution    │
│  Explore solutions, create wireframes, generate PRD                 │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  ✓  1. Solution Approach      solution-output.md            │    │
│  │  ✓  2. UI Flow Options        Documented                    │    │
│  │  ✓  3. Desktop Wireframe      ASCII wireframe               │    │
│  │  ○  4. Mobile Wireframe       ASCII wireframe               │    │
│  │  ○  5. Edge Cases             Edge cases list               │    │
│  │  ○  6. Trade-offs             Trade-off analysis            │    │
│  │  ○  7. Generate PRD           prd.md                        │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                     │
│  Next: Handoff                                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Dashboard (Mobile)

```
┌─────────────────────────┐
│  Product OS    2026-W02 │
├─────────────────────────┤
│                         │
│  lite-mode [Lite]       │
│  Product OS             │
│  ●●●○  3/4              │
│                         │
├─────────────────────────┤
│                         │
│  major-refactor         │
│  Nairon Slack App       │
│  ●●●●●●  6/6            │
│                         │
└─────────────────────────┘
```

### Feature Detail - Lite Mode (Mobile)

```
┌─────────────────────────┐
│  ← lite-mode [Lite]     │
├─────────────────────────┤
│                         │
│  Sta  Pro  Sol  Han     │
│   ✓    ✓    ●    ○      │
│                         │
├─────────────────────────┤
│                         │
│  Solution    /solution  │
│                         │
│  ✓ Solution Approach    │
│  ✓ UI Flow Options      │
│  ✓ Desktop Wireframe    │
│  ○ Mobile Wireframe     │
│  ○ Edge Cases           │
│  ○ Trade-offs           │
│  ○ Generate PRD         │
│                         │
│  Next: Handoff          │
│                         │
└─────────────────────────┘
```

## 8. Implementation Notes

### Files to Modify

| File | Changes |
|------|---------|
| `src/types/sprint.ts` | Add `LITE_PHASES` array, add `mode` to Feature type |
| `src/hooks/useSprints.ts` | Read mode from project.json, use correct phase set |
| `src/components/PhaseNav.tsx` | Render 4 or 6 phases based on mode |
| `src/components/PhasePanel.tsx` | Show correct steps for mode's phase |
| `src/pages/Dashboard.tsx` | Show `[Lite]` badge on feature cards |
| `src/pages/FeatureDetail.tsx` | Pass mode to child components |
| `vite.config.ts` | Backend: return mode in API response, handle lite exit files |
| `.claude/commands/start.md` | Add mode selection question |
| `.claude/commands/handoff.md` | Change Slack draft to Claude Code prompt |

### New Files

| File | Purpose |
|------|---------|
| `.claude/commands/problem.md` | New `/problem` command (discover + define) |
| `.claude/commands/solution.md` | New `/solution` command (develop + deliver) |

## 9. Links

- **Problem Statement:** `problem-statement.md`
- **Discover Output:** `discover-output.md`
- **Develop Output:** `develop-output.md`
