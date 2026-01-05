import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import { PhaseNav } from '@/components/PhaseNav'
import { PhasePanel } from '@/components/PhasePanel'
import { useFeature } from '@/hooks/useSprints'
import type { PhaseId } from '@/types/sprint'

export function FeatureDetail() {
  const { week, name } = useParams<{ week: string; name: string }>()
  const { feature, loading } = useFeature(week || '', name || '')

  const [selectedPhase, setSelectedPhase] = useState<PhaseId | null>(null)

  if (loading) {
    return (
      <AppLayout showPhaseNav={false} backTo="/" backLabel="Dashboard">
        <div className="text-center py-12 text-stone-500">Loading...</div>
      </AppLayout>
    )
  }

  if (!feature) {
    return (
      <AppLayout showPhaseNav={false} backTo="/" backLabel="Dashboard">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Feature Not Found
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            The feature you're looking for doesn't exist.
          </p>
        </div>
      </AppLayout>
    )
  }

  const displayPhase = selectedPhase || feature.currentPhase
  const isPhaseComplete = feature.completedPhases.includes(displayPhase)

  return (
    <AppLayout showPhaseNav={false} backTo="/" backLabel="Dashboard" title={feature.name}>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-stone-500 dark:text-stone-400 mb-1">
            {feature.sprintWeek}
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            {feature.name}
          </h1>
        </div>

        <div className="py-4 -mx-6 px-6 bg-stone-50 dark:bg-stone-800/30 rounded-lg">
          <PhaseNav
            completedPhases={feature.completedPhases}
            currentPhase={feature.currentPhase}
            onPhaseClick={setSelectedPhase}
          />
        </div>

        <PhasePanel
          phaseId={displayPhase}
          isComplete={isPhaseComplete}
          files={feature.files}
          completedSteps={feature.completedSteps}
        />

        <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
          <h2 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4">
            Files
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(feature.files).map(([fileName, exists]) => (
              <div
                key={fileName}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                  exists
                    ? 'bg-lime-500/10 text-lime-700 dark:text-lime-400'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    exists ? 'bg-lime-500' : 'bg-stone-300 dark:bg-stone-600'
                  }`}
                />
                <span className="font-mono text-xs truncate">{fileName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
