import { Link } from 'react-router-dom'
import { CalendarIcon, ChevronRightIcon, RocketIcon } from 'lucide-react'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { Card, CardContent } from '@/components/ui/card'
import { useSprints, getCurrentWeek } from '@/hooks/useSprints'
import { getPhase, PHASES } from '@/types/sprint'
import type { Feature } from '@/types/sprint'

function FeatureCard({ feature }: { feature: Feature }) {
  const phase = getPhase(feature.currentPhase)
  const completed = feature.completedPhases.length
  const total = PHASES.length

  return (
    <Link to={`/feature/${feature.sprintWeek}/${feature.name}`}>
      <Card className="border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 transition-colors cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                {feature.name}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                {phase?.name} phase • {completed}/{total} complete
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < completed
                        ? 'bg-lime-500'
                        : 'bg-stone-200 dark:bg-stone-700'
                    }`}
                  />
                ))}
              </div>
              <ChevronRightIcon className="w-5 h-5 text-stone-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function Dashboard() {
  const { sprints, loading } = useSprints()
  const currentWeek = getCurrentWeek()

  const hasSprints = sprints.length > 0
  const currentSprint = sprints.find(s => s.week === currentWeek) || sprints[0]

  if (loading) {
    return (
      <AppLayout showPhaseNav={false}>
        <div className="text-center py-12 text-stone-500">Loading...</div>
      </AppLayout>
    )
  }

  if (!hasSprints) {
    return (
      <AppLayout showPhaseNav={false}>
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              Product OS
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mt-2">
              Your weekly product development workflow
            </p>
          </div>
          <EmptyState type="no-sprints" />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout showPhaseNav={false}>
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-sm mb-2">
            <CalendarIcon className="w-4 h-4" />
            <span>{currentSprint?.week || currentWeek}</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            This Week's Features
          </h1>
          <p className="text-stone-600 dark:text-stone-400 mt-2">
            Track progress on features in the current sprint
          </p>
        </div>

        {currentSprint && currentSprint.features.length > 0 ? (
          <div className="space-y-3">
            {currentSprint.features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        ) : (
          <EmptyState type="no-features" />
        )}

        {sprints.length > 1 && (
          <div className="pt-8 border-t border-stone-200 dark:border-stone-800">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
              Past Sprints
            </h2>
            <div className="space-y-2">
              {sprints.slice(1).map((sprint) => (
                <div
                  key={sprint.week}
                  className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <RocketIcon className="w-4 h-4 text-stone-400" />
                    <span className="font-medium text-stone-700 dark:text-stone-300">
                      {sprint.week}
                    </span>
                  </div>
                  <span className="text-sm text-stone-500 dark:text-stone-400">
                    {sprint.features.length} feature{sprint.features.length !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
