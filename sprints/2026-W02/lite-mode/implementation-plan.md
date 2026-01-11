# Implementation Plan: Lite Mode

## Overview

Add a "lite mode" workflow to Product OS for smaller features. Users select mode at `/start`, then lite mode uses 4 commands (`/start` → `/problem` → `/solution` → `/handoff`) with combined phases.

**Phases:**
- Comprehensive: Start → Discover → Define → Develop → Deliver → Handoff (6 phases)
- Lite: Start → Problem → Solution → Handoff (4 phases)

---

## Phase 1: Type System & Data Model

### 1.1 Modify `src/types/sprint.ts`

**Add new types:**
```typescript
export type FeatureMode = 'comprehensive' | 'lite'
export type LitePhaseId = 'start' | 'problem' | 'solution' | 'handoff'
```

**Add mode to Feature interface:**
```typescript
export interface Feature {
  // ... existing fields
  mode: FeatureMode  // NEW
}
```

**Add LITE_PHASES constant:**
```typescript
export const LITE_PHASES: Phase[] = [
  {
    id: 'start',
    name: 'Start',
    description: 'Initialize feature and capture raw inputs',
    command: '/start',
    exitFile: 'inputs-summary.md',
    steps: [
      { number: 1, title: 'Select Project', description: 'Choose project', deliverable: 'project.json' },
      { number: 2, title: 'Select Mode', description: 'Comprehensive or Lite?', deliverable: 'Mode stored' },
      { number: 3, title: 'Feature Name', description: 'Create feature directory', deliverable: 'Directory created' },
      { number: 4, title: 'Quick Summary', description: 'Describe the feature briefly', deliverable: 'inputs-summary.md' },
    ],
  },
  {
    id: 'problem',
    name: 'Problem',
    description: 'Define the problem (discover + define combined)',
    command: '/problem',
    exitFile: 'problem-output.md',
    steps: [
      { number: 1, title: 'Core Desire', description: 'Why are we doing this?', deliverable: 'Documented' },
      { number: 2, title: 'Reasoning Chain', description: 'Does the logic hold?', deliverable: 'Documented' },
      { number: 3, title: 'Blind Spots', description: 'What are we missing?', deliverable: 'Documented' },
      { number: 4, title: 'Risks', description: 'What could go wrong?', deliverable: 'Documented' },
      { number: 5, title: 'Problem Statement', description: 'One-sentence problem', deliverable: 'problem-output.md' },
    ],
  },
  {
    id: 'solution',
    name: 'Solution',
    description: 'Design the solution and generate PRD',
    command: '/solution',
    exitFile: 'prd.md',
    steps: [
      { number: 1, title: 'Solution Approach', description: 'How will we solve it?', deliverable: 'solution-output.md' },
      { number: 2, title: 'UI Flow Options', description: 'Brainstorm approaches', deliverable: 'Documented' },
      { number: 3, title: 'Desktop Wireframe', description: 'ASCII wireframe', deliverable: 'ASCII wireframe' },
      { number: 4, title: 'Mobile Wireframe', description: 'ASCII wireframe', deliverable: 'ASCII wireframe' },
      { number: 5, title: 'Edge Cases', description: 'Surface all "what ifs"', deliverable: 'Edge cases list' },
      { number: 6, title: 'Trade-offs', description: 'Evaluate options', deliverable: 'Trade-off analysis' },
      { number: 7, title: 'Generate PRD', description: 'Create PRD', deliverable: 'prd.md' },
    ],
  },
  {
    id: 'handoff',
    name: 'Handoff',
    description: 'Validate, commit, and hand off',
    command: '/handoff',
    exitFile: 'handoff-complete.md',
    steps: [
      { number: 1, title: 'Validate PRD', description: 'Check file exists', deliverable: 'Validated' },
      { number: 2, title: 'Commit & Push', description: 'Git operations', deliverable: 'Pushed' },
      { number: 3, title: 'Claude Code Prompt', description: 'Generate implementation prompt', deliverable: 'handoff-complete.md' },
    ],
  },
]
```

**Add helper functions:**
```typescript
export function getPhasesForMode(mode: FeatureMode): Phase[] {
  return mode === 'lite' ? LITE_PHASES : PHASES
}

export function getPhaseForMode(id: string, mode: FeatureMode): Phase | undefined {
  const phases = getPhasesForMode(mode)
  return phases.find(p => p.id === id)
}
```

---

## Phase 2: Backend API

### 2.1 Modify `vite.config.ts`

**Update getFeatureProject to also read mode:**
```typescript
function getFeatureProject(featureDir: string): { projectId: string; projectName: string; mode: FeatureMode } | null {
  const projectJsonPath = path.join(featureDir, 'project.json')
  if (fs.existsSync(projectJsonPath)) {
    try {
      const content = fs.readFileSync(projectJsonPath, 'utf-8')
      const data = JSON.parse(content)
      return {
        projectId: data.projectId || 'unknown',
        projectName: data.projectName || 'Unknown',
        mode: data.mode || 'comprehensive'  // Default to comprehensive for backward compat
      }
    } catch {
      return null
    }
  }
  return null
}
```

**Add LITE_PHASE_STEP_MARKERS:**
```typescript
const LITE_PHASE_STEP_MARKERS: Record<string, { file: string; markers: string[] }> = {
  problem: {
    file: 'problem-output.md',
    markers: ['Core Desire', 'Reasoning Chain', 'Blind Spots', 'Risks', 'Problem Statement']
  },
  solution: {
    file: 'solution-output.md',
    markers: ['Solution Approach', 'UI Flow', 'Desktop Wireframe', 'Mobile Wireframe', 'Edge Cases', 'Trade-offs', 'Generate PRD']
  }
}
```

**Update getCompletedSteps to handle both modes:**
```typescript
function getCompletedSteps(featureDir: string, mode: FeatureMode): Record<string, number[]> {
  const markers = mode === 'lite' ? LITE_PHASE_STEP_MARKERS : PHASE_STEP_MARKERS
  // ... rest of logic using markers
}
```

**Add mode to API response:**
```typescript
return {
  id: `${project.id}/${week}/${name}`,
  name,
  sprintWeek: week,
  projectId: featureProject?.projectId || project.id,
  projectName: featureProject?.projectName || project.name,
  mode: featureProject?.mode || 'comprehensive',  // NEW
  files: fileMap,
  completedSteps,
}
```

---

## Phase 3: Frontend - Hooks

### 3.1 Modify `src/hooks/useSprints.ts`

**Update ApiFeature type:**
```typescript
interface ApiFeature {
  id: string
  name: string
  sprintWeek: string
  projectId?: string
  projectName?: string
  mode?: FeatureMode  // NEW
  files: FeatureFiles
  completedSteps?: Record<string, number[]>
}
```

**Update determineCurrentPhase to accept mode:**
```typescript
function determineCurrentPhase(files: FeatureFiles, mode: FeatureMode = 'comprehensive'): PhaseId | LitePhaseId {
  if (mode === 'lite') {
    if (files['handoff-complete.md']) return 'handoff'
    if (files['prd.md']) return 'handoff'
    if (files['solution-output.md']) return 'solution'
    if (files['problem-output.md']) return 'solution'
    if (files['inputs-summary.md']) return 'problem'
    return 'start'
  }
  // ... existing comprehensive logic
}
```

**Update determineCompletedPhases to accept mode:**
```typescript
function determineCompletedPhases(files: FeatureFiles, mode: FeatureMode = 'comprehensive'): (PhaseId | LitePhaseId)[] {
  if (mode === 'lite') {
    const completed: LitePhaseId[] = []
    if (files['inputs-summary.md']) completed.push('start')
    if (files['problem-output.md']) completed.push('problem')
    if (files['prd.md']) completed.push('solution')
    if (files['handoff-complete.md']) completed.push('handoff')
    return completed
  }
  // ... existing comprehensive logic
}
```

**Update transformSprints:**
```typescript
features: sprint.features.map((f: ApiFeature) => ({
  id: f.id,
  name: f.name,
  type: 'new' as const,
  sprintWeek: f.sprintWeek,
  projectId: f.projectId || 'unknown',
  projectName: f.projectName || 'Unknown',
  mode: f.mode || 'comprehensive',  // NEW
  files: f.files,
  currentPhase: determineCurrentPhase(f.files, f.mode),
  completedPhases: determineCompletedPhases(f.files, f.mode),
  completedSteps: f.completedSteps || {},
}))
```

---

## Phase 4: Frontend - UI Components

### 4.1 Modify `src/components/PhaseNav.tsx`

**Update props to accept mode:**
```typescript
interface PhaseNavProps {
  completedPhases: (PhaseId | LitePhaseId)[]
  currentPhase: PhaseId | LitePhaseId
  viewingPhase?: PhaseId | LitePhaseId
  onPhaseClick?: (phaseId: PhaseId | LitePhaseId) => void
  mode?: FeatureMode  // NEW
}
```

**Use correct phases based on mode:**
```typescript
export function PhaseNav({ completedPhases, currentPhase, viewingPhase, onPhaseClick, mode = 'comprehensive' }: PhaseNavProps) {
  const phases = getPhasesForMode(mode)

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2">
      {phases.map((phase, index) => {
        // ... existing logic, but using dynamic phases array
      })}
    </nav>
  )
}
```

### 4.2 Modify `src/components/PhasePanel.tsx`

**Update props:**
```typescript
interface PhasePanelProps {
  phaseId: PhaseId | LitePhaseId
  isComplete: boolean
  files?: FeatureFiles
  completedSteps?: Record<string, number[]>
  mode?: FeatureMode  // NEW
}
```

**Use correct phase lookup:**
```typescript
export function PhasePanel({ phaseId, isComplete, files = {}, completedSteps = {}, mode = 'comprehensive' }: PhasePanelProps) {
  const phase = getPhaseForMode(phaseId, mode)
  const phases = getPhasesForMode(mode)
  const currentIndex = phases.findIndex(p => p.id === phaseId)
  const nextPhase = currentIndex < phases.length - 1 ? phases[currentIndex + 1] : undefined
  // ...
}
```

**Update contentMarkerPhases for lite mode:**
```typescript
const contentMarkerPhases = mode === 'lite'
  ? ['problem', 'solution']
  : ['discover', 'define', 'develop']
```

### 4.3 Modify `src/pages/Dashboard.tsx`

**Add [Lite] badge to FeatureCard:**
```typescript
function FeatureCard({ feature }: { feature: Feature }) {
  const phases = getPhasesForMode(feature.mode)
  const phase = getPhaseForMode(feature.currentPhase, feature.mode)
  const completed = feature.completedPhases.length
  const total = phases.length

  return (
    <Link to={`/feature/${feature.sprintWeek}/${feature.name}`}>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                {feature.name}
                {feature.mode === 'lite' && (
                  <span className="ml-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                    [Lite]
                  </span>
                )}
              </h3>
              {/* ... */}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < completed ? 'bg-lime-500' : 'bg-stone-200 dark:bg-stone-700'
                    }`}
                  />
                ))}
              </div>
              {/* ... */}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### 4.4 Modify `src/pages/FeatureDetail.tsx`

**Pass mode to child components:**
```typescript
export function FeatureDetail() {
  // ... existing logic

  const phases = getPhasesForMode(feature.mode)

  // Update isPhaseActuallyComplete to use mode
  const isPhaseActuallyComplete = (phaseId: PhaseId | LitePhaseId): boolean => {
    const phaseData = getPhaseForMode(phaseId, feature.mode)
    // ... rest using mode-aware logic
  }

  return (
    <AppLayout showPhaseNav={false} backTo="/" backLabel="Dashboard" title={feature.name}>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-stone-500 dark:text-stone-400 mb-1">
            {feature.sprintWeek}
            {feature.mode === 'lite' && (
              <span className="ml-2 font-medium">[Lite]</span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            {feature.name}
          </h1>
        </div>

        <PhaseNav
          completedPhases={actualCompletedPhases}
          currentPhase={actualCurrentPhase}
          viewingPhase={displayPhase}
          onPhaseClick={setSelectedPhase}
          mode={feature.mode}  // NEW
        />

        <PhasePanel
          phaseId={displayPhase}
          isComplete={isPhaseComplete}
          files={feature.files}
          completedSteps={feature.completedSteps}
          mode={feature.mode}  // NEW
        />
        {/* ... */}
      </div>
    </AppLayout>
  )
}
```

---

## Phase 5: CLI Commands

### 5.1 Modify `.claude/commands/start.md`

**Add mode selection after Step 1 (Select Project):**
```markdown
### Step 2: Select Mode

Ask: "Is this a comprehensive or lite feature?"

Options:
1. **Comprehensive** — Full 6-phase Double Diamond (discover, define, develop, deliver)
2. **Lite** — Quick 4-phase workflow (problem, solution, handoff)

Explain briefly:
- Comprehensive: Best for complex, multi-stakeholder features
- Lite: Best for small, well-understood features

Store the answer for `project.json`.
```

**Update project.json schema:**
```json
{
  "projectId": "[selected-project-id]",
  "projectName": "[selected-project-name]",
  "featureName": "[feature-name]",
  "sprintWeek": "YYYY-WXX",
  "createdAt": "[ISO date]",
  "mode": "comprehensive" | "lite",
  "commitTarget": "project-repo" | "product-os" | "none"
}
```

**Simplify lite mode steps (skip raw input imports):**
```markdown
### If Lite Mode:
Skip steps 4-7 (raw inputs). Instead:
- Ask for a brief feature description
- Save directly to `inputs-summary.md`
- Confirm: "Ready to run `/problem`?"
```

### 5.2 Create `.claude/commands/problem.md` (NEW)

```markdown
---
description: Define the problem (discover + define combined)
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /problem - Problem Definition (Lite Mode)

You are helping define the problem for a lite-mode feature. This combines discover + define into a single phase.

## Prerequisites

1. Read `project.json` to verify this is a lite feature
   - If mode is NOT "lite", tell user: "This is a comprehensive feature. Use `/discover` instead."
2. Read `inputs-summary.md` for context

## IMPORTANT: Write Progress to File

After completing EACH step, append to `problem-output.md`.

## Your Task

Walk through these steps **one at a time**. Keep it focused - this is lite mode.

### Step 1: Core Desire

Ask: "Why are we building this? What's the underlying need?"

**Append to `problem-output.md`:**
```markdown
## Core Desire
[answer]
```

### Step 2: Reasoning Chain

Ask: "Does the proposed solution make sense? What assumptions are we making?"

**Append to `problem-output.md`:**
```markdown
## Reasoning Chain
[findings]
```

### Step 3: Blind Spots

Ask: "What might we be missing? Who else is affected?"

**Append to `problem-output.md`:**
```markdown
## Blind Spots
[blind spots]
```

### Step 4: Risks

Ask: "What could go wrong? What are the risks?"

**Append to `problem-output.md`:**
```markdown
## Risks
[risks]
```

### Step 5: Problem Statement

Synthesize everything into one clear sentence.

**Append to `problem-output.md`:**
```markdown
## Problem Statement

**[One sentence problem statement]**

### Supporting Context
[Brief summary of core desire, key risks, and blind spots]
```

Confirm: "Problem defined. Ready to run `/solution`?"
```

### 5.3 Create `.claude/commands/solution.md` (NEW)

```markdown
---
description: Design solution and generate PRD (develop + deliver combined)
allowed-tools: Read, Write, Bash, Glob, Grep, Edit
---

# /solution - Solution Design (Lite Mode)

You are helping design the solution for a lite-mode feature. This combines develop + deliver into a single phase.

## Prerequisites

1. Read `project.json` to verify this is a lite feature
   - If mode is NOT "lite", tell user: "This is a comprehensive feature. Use `/develop` instead."
2. Read `problem-output.md` for the problem statement
3. Read the project's CONTEXT.md for project-specific context

## IMPORTANT: Write Progress to Files

Write progress to `solution-output.md` as you go. Generate `prd.md` at the end.

## Your Task

### Step 1: Solution Approach

Ask: "How should we solve this problem? What's your preferred approach?"

**Write to `solution-output.md`:**
```markdown
## Solution Approach
[approach description]
```

### Step 2: UI Flow Options

Ask: "What are the key user flows? Walk me through them."

**Append to `solution-output.md`:**
```markdown
## UI Flow
[flows documented]
```

### Step 3: Desktop Wireframe

Create an ASCII wireframe for desktop.

**Append to `solution-output.md`:**
```markdown
## Desktop Wireframe
```
[ASCII wireframe]
```
```

### Step 4: Mobile Wireframe

Create an ASCII wireframe for mobile (or note if not applicable).

**Append to `solution-output.md`:**
```markdown
## Mobile Wireframe
```
[ASCII wireframe or "Not applicable"]
```
```

### Step 5: Edge Cases

Ask: "What edge cases should we handle?"

**Append to `solution-output.md`:**
```markdown
## Edge Cases
| Scenario | Behavior |
|----------|----------|
| ... | ... |
```

### Step 6: Trade-offs

Document key trade-offs and decisions.

**Append to `solution-output.md`:**
```markdown
## Trade-offs
| Trade-off | Decision |
|-----------|----------|
| ... | ... |
```

### Step 7: Generate PRD

Generate a focused PRD. Include wireframes from solution-output.md.

**Write to `prd.md`:**
```markdown
# PRD: [Feature Name]

## 1. Summary
[3-4 sentences]

## 2. Why
[Business context, customer pain, stakes]

## 3. What
**In scope:** [bullet list]
**Goals:** [outcomes]

## 4. Out of Scope
[boundaries]

## 5. Where
[Product locations affected]

## 6. How
### User Journey
[numbered steps]

### Edge Cases
[table from solution-output.md]

### Success Criteria
- [ ] [criteria]

## 7. Wireframes
[Embed from solution-output.md]

## 8. Links
- **Problem:** `problem-output.md`
- **Solution:** `solution-output.md`
```

Confirm: "Solution complete. Ready to run `/handoff`?"
```

### 5.4 Modify `.claude/commands/handoff.md`

**Add mode check at start:**
```markdown
## Prerequisites

1. Read `project.json` from the current feature folder:
   - `mode` — comprehensive or lite (defaults to comprehensive)
   - `commitTarget` — where to commit files
   - `projectId` — which project
```

**Update Step 1 based on mode:**
```markdown
### Step 1: Validate Deliverables

**If lite mode:**
- prd.md (required)

**If comprehensive mode:**
- prd.md (required)
- qa.md (optional)
- linear-tickets.md (optional)
- loom-outline.md (optional)
```

**Update Step 4 (Handoff Target) for lite mode:**
```markdown
### Step 4: Handoff Target

**If lite mode, default to Claude Code:**

Generate implementation prompt:
```
Pull latest from main and read the sprint handoff docs in `sprints/YYYY-WXX/[feature-name]/`.

Read all the files there (prd.md, solution-output.md, problem-output.md) to understand what we're building.

Then investigate the current codebase to understand what exists today.

Based on the PRD requirements and codebase analysis, create a detailed implementation plan.
```

**If comprehensive mode, ask user** (existing behavior):
- Claude Code
- Engineer (draft Slack)
- Myself
```

### 5.5 Add mode checks to existing commands

**In `/discover`, `/define`, `/develop`, `/deliver`:**

Add at the top of Prerequisites:
```markdown
First, read `project.json` and check the `mode` field:
- If mode is "lite", tell user: "This is a lite feature. Use `/problem` (or `/solution`) instead."
- If mode is missing or "comprehensive", continue.
```

---

## Phase 6: FeatureFiles Type Update

### 6.1 Modify `src/types/sprint.ts`

**Add new lite mode files:**
```typescript
export interface FeatureFiles {
  // Existing
  'project.json'?: boolean
  'inputs-summary.md'?: boolean
  'raw-input-transcript.md'?: boolean
  'raw-input-slack.md'?: boolean
  'raw-input-feedback.md'?: boolean
  'discover-output.md'?: boolean
  'problem-statement.md'?: boolean
  'develop-output.md'?: boolean
  'prd.md'?: boolean
  'qa.md'?: boolean
  'linear-tickets.md'?: boolean
  'loom-outline.md'?: boolean
  'handoff-complete.md'?: boolean
  // NEW - Lite mode
  'problem-output.md'?: boolean
  'solution-output.md'?: boolean
}
```

---

## Summary: Files to Change

| File | Action | Changes |
|------|--------|---------|
| `src/types/sprint.ts` | MODIFY | Add FeatureMode, LITE_PHASES, helpers, update FeatureFiles |
| `src/hooks/useSprints.ts` | MODIFY | Handle mode in phase detection, pass mode through |
| `src/components/PhaseNav.tsx` | MODIFY | Accept mode prop, render correct phases |
| `src/components/PhasePanel.tsx` | MODIFY | Accept mode prop, use correct phase lookup |
| `src/pages/Dashboard.tsx` | MODIFY | Show [Lite] badge, use dynamic phase count |
| `src/pages/FeatureDetail.tsx` | MODIFY | Pass mode to children, [Lite] in header |
| `vite.config.ts` | MODIFY | Read mode from project.json, return in API, handle lite step markers |
| `.claude/commands/start.md` | MODIFY | Add mode selection question |
| `.claude/commands/handoff.md` | MODIFY | Add mode-aware validation and Claude Code prompt |
| `.claude/commands/discover.md` | MODIFY | Add mode check at top |
| `.claude/commands/define.md` | MODIFY | Add mode check at top |
| `.claude/commands/develop.md` | MODIFY | Add mode check at top |
| `.claude/commands/deliver.md` | MODIFY | Add mode check at top |
| `.claude/commands/problem.md` | CREATE | New lite-mode command |
| `.claude/commands/solution.md` | CREATE | New lite-mode command |

---

## Implementation Order

1. **Phase 1: Types** — Update sprint.ts with new types and LITE_PHASES
2. **Phase 2: Backend** — Update vite.config.ts to read/return mode
3. **Phase 3: Hooks** — Update useSprints.ts to handle mode
4. **Phase 4: UI** — Update PhaseNav, PhasePanel, Dashboard, FeatureDetail
5. **Phase 5: Commands** — Update start.md, handoff.md, add problem.md, solution.md
6. **Phase 6: Mode guards** — Add mode checks to discover/define/develop/deliver

---

## Testing Checklist

- [ ] Create new lite feature with `/start` → mode selection works
- [ ] `/problem` command creates problem-output.md
- [ ] `/solution` command creates solution-output.md + prd.md
- [ ] `/handoff` generates Claude Code prompt
- [ ] Dashboard shows [Lite] badge
- [ ] Dashboard shows 4 progress dots for lite features
- [ ] Feature detail shows 4 phases for lite features
- [ ] Old features without mode field still work (default comprehensive)
- [ ] Running `/discover` on lite feature shows helpful error
- [ ] Running `/problem` on comprehensive feature shows helpful error
