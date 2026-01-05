import { CheckIcon, ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PhaseId } from '@/types/sprint'
import { PHASES, getPhaseStatus } from '@/types/sprint'

interface PhaseNavProps {
  completedPhases: PhaseId[]
  currentPhase: PhaseId
  onPhaseClick?: (phaseId: PhaseId) => void
}

export function PhaseNav({ completedPhases, currentPhase, onPhaseClick }: PhaseNavProps) {
  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2">
      {PHASES.map((phase, index) => {
        const status = getPhaseStatus(phase.id, completedPhases, currentPhase)
        const isLast = index === PHASES.length - 1

        return (
          <div key={phase.id} className="flex items-center">
            <button
              onClick={() => onPhaseClick?.(phase.id)}
              disabled={status === 'upcoming'}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors',
                status === 'completed' && 'bg-lime-500/20 text-lime-600 dark:text-lime-400',
                status === 'current' && 'bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900',
                status === 'upcoming' && 'bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500 cursor-not-allowed'
              )}
            >
              {status === 'completed' && (
                <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              <span className="hidden sm:inline">{phase.name}</span>
              <span className="sm:hidden">{phase.name.slice(0, 3)}</span>
            </button>

            {!isLast && (
              <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 mx-1 text-stone-300 dark:text-stone-600" />
            )}
          </div>
        )
      })}
    </nav>
  )
}
