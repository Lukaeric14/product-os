/**
 * Product OS Types
 * Types for sprint tracking, features, and phases
 */

export type PhaseId = 'start' | 'discover' | 'define' | 'develop' | 'deliver' | 'handoff'

export type PhaseStatus = 'completed' | 'current' | 'upcoming'

export interface Phase {
  id: PhaseId
  name: string
  description: string
  command: string
  steps: PhaseStep[]
  exitFile: string // File that indicates this phase is complete
}

export interface PhaseStep {
  number: number
  title: string
  description: string
  deliverable: string
}

export interface Feature {
  id: string
  name: string
  type: 'new' | 'improvement'
  currentPhase: PhaseId
  completedPhases: PhaseId[]
  completedSteps: Record<string, number[]> // e.g., { discover: [1, 2, 3] }
  files: FeatureFiles
  sprintWeek: string // e.g., "2025-W02"
}

export interface FeatureFiles {
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
}

export interface Sprint {
  week: string // e.g., "2025-W02"
  features: Feature[]
}

// Phase definitions with steps
export const PHASES: Phase[] = [
  {
    id: 'start',
    name: 'Start',
    description: 'Initialize feature and capture raw inputs',
    command: '/start',
    exitFile: 'inputs-summary.md',
    steps: [
      { number: 1, title: 'Create Directory', description: 'Set up feature folder', deliverable: 'Directory created' },
      { number: 2, title: 'Feature Type', description: 'New feature or improvement?', deliverable: 'Type documented' },
      { number: 3, title: 'Import Transcript', description: 'Paste Nima call transcript', deliverable: 'raw-input-transcript.md' },
      { number: 4, title: 'Import Slack', description: 'Paste relevant Slack threads', deliverable: 'raw-input-slack.md' },
      { number: 5, title: 'Import Feedback', description: 'Paste customer feedback', deliverable: 'raw-input-feedback.md' },
      { number: 6, title: 'Design Links', description: 'Add Figma or design references', deliverable: 'Links captured' },
      { number: 7, title: 'Summarize', description: 'Review all inputs', deliverable: 'inputs-summary.md' },
    ],
  },
  {
    id: 'discover',
    name: 'Discover',
    description: 'Explore the problem space broadly (diverge)',
    command: '/discover',
    exitFile: 'discover-output.md',
    steps: [
      { number: 1, title: 'Core Desire', description: 'Why are we doing this?', deliverable: 'Documented' },
      { number: 2, title: 'Reasoning Chain', description: 'Does the logic hold?', deliverable: 'Documented' },
      { number: 3, title: 'User Perspective', description: 'How would users react?', deliverable: 'Documented' },
      { number: 4, title: 'Blind Spots', description: 'What are we missing?', deliverable: 'Documented' },
      { number: 5, title: 'Risks', description: 'What could go wrong?', deliverable: 'Documented' },
      { number: 6, title: 'Exit Check', description: 'Ready to converge?', deliverable: 'discover-output.md' },
    ],
  },
  {
    id: 'define',
    name: 'Define',
    description: 'Narrow to one clear problem statement (converge)',
    command: '/define',
    exitFile: 'problem-statement.md',
    steps: [
      { number: 1, title: 'Review Discover', description: 'Load context', deliverable: 'Context loaded' },
      { number: 2, title: 'Synthesize', description: 'Group findings into clusters', deliverable: 'Themes identified' },
      { number: 3, title: 'Narrow Down', description: 'Use gut feel to reduce options', deliverable: 'Options reduced' },
      { number: 4, title: 'Articulate', description: 'Write one-sentence problem', deliverable: 'One sentence' },
      { number: 5, title: 'Defend Check', description: 'Can you defend to Nima?', deliverable: 'problem-statement.md' },
    ],
  },
  {
    id: 'develop',
    name: 'Develop',
    description: 'Explore solutions - UI flows, wireframes, edge cases (diverge)',
    command: '/develop',
    exitFile: 'develop-output.md',
    steps: [
      { number: 1, title: 'Review Problem', description: 'Load problem statement', deliverable: 'Context loaded' },
      { number: 2, title: 'UI Flow Options', description: 'Brainstorm approaches', deliverable: 'Options documented' },
      { number: 3, title: 'Desktop Wireframe', description: 'ASCII wireframe for desktop', deliverable: 'ASCII wireframe' },
      { number: 4, title: 'Mobile Wireframe', description: 'ASCII wireframe for mobile', deliverable: 'ASCII wireframe' },
      { number: 5, title: 'Edge Cases', description: 'Surface all "what ifs"', deliverable: 'Edge cases list' },
      { number: 6, title: 'Codebase Risks', description: 'Analyze keylead/ impact', deliverable: 'Risks documented' },
      { number: 7, title: 'Trade-offs', description: 'Evaluate options', deliverable: 'Trade-off analysis' },
      { number: 8, title: 'Exit Check', description: 'Ready to finalize?', deliverable: 'develop-output.md' },
    ],
  },
  {
    id: 'deliver',
    name: 'Deliver',
    description: 'Generate PRD, QA checklist, Linear tickets, Loom outline (converge)',
    command: '/deliver',
    exitFile: 'prd.md',
    steps: [
      { number: 1, title: 'Review All', description: 'Load all previous outputs', deliverable: 'Context loaded' },
      { number: 2, title: 'Finalize Approach', description: 'Lock in decisions', deliverable: 'Approach locked' },
      { number: 3, title: 'Generate PRD', description: 'Create comprehensive PRD', deliverable: 'prd.md' },
      { number: 4, title: 'Generate QA', description: 'Create QA checklist', deliverable: 'qa.md' },
      { number: 5, title: 'Generate Tickets', description: 'Create Linear tickets', deliverable: 'linear-tickets.md' },
      { number: 6, title: 'Generate Loom', description: 'Create video outline', deliverable: 'loom-outline.md' },
      { number: 7, title: 'Package Check', description: 'Verify all deliverables', deliverable: 'All files ready' },
    ],
  },
  {
    id: 'handoff',
    name: 'Handoff',
    description: 'Copy deliverables to keylead/.pm/ for engineers',
    command: '/handoff',
    exitFile: '', // Special case - check keylead/.pm/
    steps: [
      { number: 1, title: 'Validate', description: 'Check all files exist', deliverable: 'Validation complete' },
      { number: 2, title: 'Confirm Excalidraw', description: 'Wireframes created?', deliverable: 'Confirmed' },
      { number: 3, title: 'Confirm Loom', description: 'Video recorded?', deliverable: 'Confirmed' },
      { number: 4, title: 'Copy to Keylead', description: 'Write to .pm/ folder', deliverable: 'Files copied' },
      { number: 5, title: 'Final Check', description: 'Ready for Monday?', deliverable: 'Handoff complete' },
    ],
  },
]

// Helper to get phase by ID
export function getPhase(id: PhaseId): Phase | undefined {
  return PHASES.find(p => p.id === id)
}

// Helper to get next phase
export function getNextPhase(currentId: PhaseId): Phase | undefined {
  const currentIndex = PHASES.findIndex(p => p.id === currentId)
  if (currentIndex === -1 || currentIndex === PHASES.length - 1) return undefined
  return PHASES[currentIndex + 1]
}

// Helper to determine phase status
export function getPhaseStatus(phaseId: PhaseId, completedPhases: PhaseId[], currentPhase: PhaseId): PhaseStatus {
  if (completedPhases.includes(phaseId)) return 'completed'
  if (phaseId === currentPhase) return 'current'
  return 'upcoming'
}
