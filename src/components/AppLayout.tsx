import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layers, ArrowLeft } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'

interface AppLayoutProps {
  children: ReactNode
  /** Optional title shown in the header (for sub-pages) */
  title?: string
  /** Optional back navigation path */
  backTo?: string
  /** Optional back label */
  backLabel?: string
  /** Whether to show the phase nav (default: false) */
  showPhaseNav?: boolean
}

export function AppLayout({
  children,
  title,
  backTo,
  backLabel = 'Back',
}: AppLayoutProps) {
  const navigate = useNavigate()

  // Determine if this is a sub-page (has back navigation)
  const isSubPage = !!backTo

  return (
    <div className="min-h-screen bg-background animate-fade-in flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-200 dark:border-stone-800 bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="px-4 sm:px-6 py-3">
          {isSubPage ? (
            /* Sub-page header with back button */
            <div className="max-w-3xl mx-auto flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backTo)}
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
                {backLabel}
              </Button>
              {title && (
                <>
                  <div className="h-4 w-px bg-stone-200 dark:bg-stone-700" />
                  <h1 className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                    {title}
                  </h1>
                </>
              )}
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
          ) : (
            /* Main page header */
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
              {/* Logo / Brand */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-stone-100 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-stone-100 dark:text-stone-900" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  Product OS
                </span>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 flex justify-center">
        <span className="text-xs text-stone-400 dark:text-stone-500">
          Keylead Product OS
        </span>
      </footer>
    </div>
  )
}
