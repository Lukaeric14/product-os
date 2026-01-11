import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon, CalendarIcon } from 'lucide-react'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { Card, CardContent } from '@/components/ui/card'
import { useSprints, useProjects } from '@/hooks/useSprints'
import { getPhaseForMode, getPhasesForMode } from '@/types/sprint'
import { cn } from '@/lib/utils'
import type { Feature } from '@/types/sprint'

function FeatureCard({ feature }: { feature: Feature }) {
  const phases = getPhasesForMode(feature.mode)
  const phase = getPhaseForMode(feature.currentPhase, feature.mode)
  const completed = feature.completedPhases.length
  const total = phases.length

  return (
    <Link to={`/feature/${feature.sprintWeek}/${feature.name}`}>
      <Card className="border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 transition-colors cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                  {feature.name}
                </h3>
                {feature.mode === 'lite' && (
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400">[Lite]</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mt-1">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  {feature.sprintWeek}
                </span>
                <span>•</span>
                <span>{phase?.name} phase</span>
                <span>•</span>
                <span>{completed}/{total}</span>
              </div>
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
  const { sprints, loading: sprintsLoading } = useSprints()
  const { projects, loading: projectsLoading } = useProjects()
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const loading = sprintsLoading || projectsLoading

  // Get all features across all sprints, sorted by recency (newest first)
  const allFeatures = useMemo(() => {
    const features: Feature[] = []
    for (const sprint of sprints) {
      features.push(...sprint.features)
    }
    // Sort by sprint week descending (most recent first)
    return features.sort((a, b) => b.sprintWeek.localeCompare(a.sprintWeek))
  }, [sprints])

  // Set default selected project once projects load
  const effectiveProjectId = selectedProjectId || (projects.length > 0 ? projects[0].id : null)

  // Get features for the effective project
  const displayFeatures = useMemo(() => {
    if (!effectiveProjectId) return allFeatures
    return allFeatures.filter(f => f.projectId === effectiveProjectId)
  }, [allFeatures, effectiveProjectId])

  if (loading) {
    return (
      <AppLayout showPhaseNav={false}>
        <div className="text-center py-12 text-stone-500">Loading...</div>
      </AppLayout>
    )
  }

  const hasFeatures = allFeatures.length > 0

  if (!hasFeatures) {
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
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
            Features
          </h1>
          <p className="text-stone-600 dark:text-stone-400 mt-2">
            Track progress on features across sprints
          </p>
        </div>

        {/* Project Tabs */}
        {projects.length > 0 && (
          <div className="flex gap-1 border-b border-stone-200 dark:border-stone-800">
            {projects.map((project) => {
              const isActive = (selectedProjectId || projects[0].id) === project.id
              const projectFeatureCount = allFeatures.filter(f => f.projectId === project.id).length

              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={cn(
                    'px-4 py-2.5 text-sm font-medium transition-colors relative',
                    isActive
                      ? 'text-stone-900 dark:text-stone-100'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  )}
                >
                  <span>{project.name}</span>
                  <span className={cn(
                    'ml-2 text-xs',
                    isActive ? 'text-stone-500 dark:text-stone-400' : 'text-stone-400 dark:text-stone-500'
                  )}>
                    {projectFeatureCount}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Features List */}
        {displayFeatures.length > 0 ? (
          <div className="space-y-3">
            {displayFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        ) : (
          <EmptyState type="no-features" />
        )}
      </div>
    </AppLayout>
  )
}
