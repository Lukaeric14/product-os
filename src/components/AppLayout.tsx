import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layers, ArrowLeft, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Category } from '@/types/sprint'

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
  /** Available categories for filtering */
  categories?: Category[]
  /** Currently selected category ID */
  selectedCategory?: string | null
  /** Callback when category changes */
  onCategoryChange?: (categoryId: string | null) => void
}

export function AppLayout({
  children,
  title,
  backTo,
  backLabel = 'Back',
  categories,
  selectedCategory,
  onCategoryChange,
}: AppLayoutProps) {
  const navigate = useNavigate()

  // Determine if this is a sub-page (has back navigation)
  const isSubPage = !!backTo

  // Find the selected category name
  const selectedCategoryName = categories?.find(c => c.id === selectedCategory)?.name || 'All Projects'

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

              {/* Category Dropdown + Theme Toggle */}
              <div className="flex items-center gap-2">
                {categories && categories.length > 0 && onCategoryChange && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        {selectedCategoryName}
                        <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {categories.map((category) => (
                        <DropdownMenuItem
                          key={category.id}
                          onClick={() => onCategoryChange(category.id)}
                          className={selectedCategory === category.id ? 'bg-stone-100 dark:bg-stone-800' : ''}
                        >
                          {category.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <ThemeToggle />
              </div>
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
