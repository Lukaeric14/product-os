# Develop Output: Lite Mode

## Review Problem

**Problem:** Product OS's 6-phase process is too heavy for small features, causing users to skip the tool entirely and implement chaotically — even though they still need structured thinking to achieve their goals.

**Target solution:** 4-command lite mode with mode selection, combined phases, UI support for both modes, and Claude Code prompt handoff.

Confirmed ready to explore solutions.

## Flows

**All flows in scope:**

| # | Flow | Type | Description |
|---|------|------|-------------|
| 1 | `/start` mode selection | CLI | Add question: comprehensive vs lite |
| 2 | `/problem` command | CLI | NEW — combines discover + define |
| 3 | `/solution` command | CLI | NEW — combines develop + deliver |
| 4 | `/handoff` modification | CLI | Draft Claude Code prompt instead of Slack |
| 5 | Dashboard mode badge | UI | Show "Lite" or "Full" on feature cards |
| 6 | Feature Detail by mode | UI | Render different phases/steps based on mode |
| 7 | Phase Nav by mode | UI | Show 4 phases for lite, 6 for comprehensive |
| 8 | Phase Panel by mode | UI | Show correct steps for each mode's phases |
| 9 | `project.json` mode | Data | Store mode selection |
| 10 | `sprint.ts` lite phases | Data | Define lite mode phases and steps |
| 11 | Backend API mode info | Data | Return mode to UI |
| 12 | Lite completion logic | Data | Handle lite mode's different exit files |

## UI Flow

**Design decisions from Q&A:**

| Decision | Answer |
|----------|--------|
| Mode selection timing | First question at `/start` |
| Mode wording | "Comprehensive" vs "Lite" |
| Lite phase names | Start → Problem → Solution → Handoff |
| Dashboard badge | Small text `[Lite]` next to feature name |
| Phase Nav appearance | Same horizontal dots/labels, just 4 instead of 6 |
| Visual distinction | Consistent experience, no different colors/styling |
| Output files | `/problem` → `problem-output.md`, `/solution` → `solution-output.md` + `prd.md` |
| Comprehensive mode | No changes — keep all 6 phases and steps as-is |

## Desktop Wireframe

**Dashboard with Lite Mode Badge:**

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

**Feature Detail - Lite Mode (4 phases):**

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

## Mobile Wireframe

**Dashboard - Mobile:**

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

**Feature Detail - Mobile (Lite Mode):**

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

- Phase names abbreviated in nav (Sta/Pro/Sol/Han)
- Steps shown as single column, no deliverable column
- Touch-friendly tap targets

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Old features without `mode` field | Default to "comprehensive" (backward compatible) |
| User runs `/discover` on lite feature | Error: "Use `/problem` instead" (simple check, don't bloat command context) |
| User runs `/problem` on comprehensive feature | Error: "Use `/discover` instead" (simple check) |
| Mode not selected at `/start` | Default to comprehensive if skipped |

## Codebase Risks

**Files to modify:**

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

**New files:**

| File | Purpose |
|------|---------|
| `.claude/commands/problem.md` | New `/problem` command (discover + define) |
| `.claude/commands/solution.md` | New `/solution` command (develop + deliver) |

**Technical considerations:**
- Phase completion logic needs to handle both phase sets
- Exit file detection differs: `problem-output.md` vs `discover-output.md`
- No database changes — all file-based

## Trade-offs

| Trade-off | Decision |
|-----------|----------|
| Two mode codepaths — more maintenance | Accepted — necessary for right-sized process |
| No mode switching mid-feature | Accepted — keeps it simple, user knows upfront |
| Comprehensive mode unchanged | Accepted — scope control, can optimize later |
| New commands add surface area | Accepted — worth it for 2 fewer commands in lite flow |

## Exit Check

Solution space fully explored:
- Clear direction on 4-command lite mode
- Desktop and mobile wireframes defined
- Edge cases decided (default to comprehensive)
- Codebase impact understood (9 modified, 2 new files)

Ready to generate deliverables.
