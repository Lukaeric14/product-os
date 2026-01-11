# Solution Output

## Solution Approach

Add a "lite mode" workflow to Product OS:
- 4 phases instead of 6: Start → Problem → Solution → Handoff
- Mode selection at `/start`
- New `/problem` command (combines discover + define)
- New `/solution` command (combines develop + deliver)
- UI adapts to show 4 phases for lite features

## UI Flow

1. User runs `/start`
2. System asks: "Comprehensive or Lite?"
3. User selects "Lite"
4. System creates directory with `"mode": "lite"` in project.json
5. User runs `/problem` to define the problem
6. User runs `/solution` to design solution and generate PRD
7. User runs `/handoff` to commit and get Claude Code prompt

## Desktop Wireframe

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
│  Design the solution and generate PRD                               │
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
└─────────────────────────────────────────────────────────────────────┘
```

## Mobile Wireframe

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
└─────────────────────────┘
```

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Old features without `mode` field | Default to "comprehensive" (backward compatible) |
| User runs `/discover` on lite feature | Error: "Use `/problem` instead" |
| User runs `/problem` on comprehensive feature | Error: "Use `/discover` instead" |
| Mode not selected at `/start` | Default to comprehensive |

## Trade-offs

| Trade-off | Decision |
|-----------|----------|
| Two mode codepaths — more maintenance | Accepted — necessary for right-sized process |
| No mode switching mid-feature | Accepted — keeps it simple, user knows upfront |
| Comprehensive mode unchanged | Accepted — scope control, can optimize later |
