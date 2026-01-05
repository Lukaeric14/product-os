import { FolderPlusIcon, PlayIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface EmptyStateProps {
  type: 'no-sprints' | 'no-features'
}

export function EmptyState({ type }: EmptyStateProps) {
  if (type === 'no-sprints') {
    return (
      <Card className="border-stone-200 dark:border-stone-700 shadow-sm border-dashed">
        <CardContent className="py-12">
          <div className="flex flex-col items-center text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
              <FolderPlusIcon className="w-8 h-8 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
              No sprints yet
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              Start your first feature by running the start command in Claude Code.
            </p>
            <div className="bg-stone-100 dark:bg-stone-800 rounded-lg px-4 py-3 w-full">
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">
                Run in Claude Code:
              </p>
              <div className="flex items-center gap-2">
                <PlayIcon className="w-4 h-4 text-stone-500" />
                <code className="font-mono text-sm text-stone-700 dark:text-stone-300">
                  /product-os/start feature-name
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-stone-200 dark:border-stone-700 shadow-sm border-dashed">
      <CardContent className="py-12">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
            <FolderPlusIcon className="w-8 h-8 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            No features this week
          </h3>
          <p className="text-stone-600 dark:text-stone-400 mb-6">
            Start a new feature by running the start command.
          </p>
          <div className="bg-stone-100 dark:bg-stone-800 rounded-lg px-4 py-3 w-full">
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">
              Run in Claude Code:
            </p>
            <div className="flex items-center gap-2">
              <PlayIcon className="w-4 h-4 text-stone-500" />
              <code className="font-mono text-sm text-stone-700 dark:text-stone-300">
                /product-os/start feature-name
              </code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
