import { defineConfig } from 'vite'
import type { ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Project configuration interface
interface ProjectConfig {
  id: string
  name: string
  description: string
  path: string
  sprintsPath: string
  contextFile: string
}

// Step markers to look for in each phase's output file
const PHASE_STEP_MARKERS: Record<string, { file: string; markers: string[] }> = {
  discover: {
    file: 'discover-output.md',
    markers: ['Core Desire', 'Reasoning Chain', 'User Perspective', 'Blind Spots', 'Risks', 'Exit Check']
  },
  define: {
    file: 'problem-statement.md',
    markers: ['Review Discover', 'Synthesize', 'Narrow Down', 'Articulate', 'Defend Check']
  },
  develop: {
    file: 'develop-output.md',
    markers: ['Review Problem', 'UI Flow', 'Desktop Wireframe', 'Mobile Wireframe', 'Edge Cases', 'Codebase Risks', 'Trade-offs', 'Exit Check']
  },
  deliver: {
    file: 'prd.md',
    markers: ['Review All', 'Finalize Approach', 'Generate PRD', 'Generate QA', 'Generate Tickets', 'Generate Loom', 'Package Check']
  }
}

// Check which steps are completed by looking for markers in file content
function getCompletedSteps(featureDir: string): Record<string, number[]> {
  const completedSteps: Record<string, number[]> = {}

  for (const [phase, config] of Object.entries(PHASE_STEP_MARKERS)) {
    const filePath = path.join(featureDir, config.file)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const completed: number[] = []

      config.markers.forEach((marker, index) => {
        // Find the heading for this marker
        const headingRegex = new RegExp(`^##\\s*${marker}`, 'mi')
        const headingMatch = content.match(headingRegex)

        if (headingMatch && headingMatch.index !== undefined) {
          // Find where this section starts (after the heading line)
          const sectionStart = headingMatch.index + headingMatch[0].length

          // Find where next ## section starts (or end of file)
          const afterHeading = content.slice(sectionStart)
          const nextSectionMatch = afterHeading.match(/^##\s/m)

          let sectionContent: string
          if (nextSectionMatch && nextSectionMatch.index !== undefined) {
            sectionContent = afterHeading.slice(0, nextSectionMatch.index)
          } else {
            sectionContent = afterHeading
          }

          // Check if section has real content (not just placeholder or empty)
          const trimmedContent = sectionContent.trim()
          const hasRealContent =
            trimmedContent.length > 50 && // More than just whitespace
            !sectionContent.includes('*(To be explored)*') &&
            !sectionContent.includes('(To be documented)') &&
            !sectionContent.includes('[placeholder]')

          if (hasRealContent) {
            completed.push(index + 1) // 1-indexed step numbers
          }
        }
      })

      if (completed.length > 0) {
        completedSteps[phase] = completed
      }
    }
  }

  return completedSteps
}

// Read project.json from feature folder to get project info
function getFeatureProject(featureDir: string): { projectId: string; projectName: string } | null {
  const projectJsonPath = path.join(featureDir, 'project.json')
  if (fs.existsSync(projectJsonPath)) {
    try {
      const content = fs.readFileSync(projectJsonPath, 'utf-8')
      const data = JSON.parse(content)
      return {
        projectId: data.projectId || 'unknown',
        projectName: data.projectName || 'Unknown'
      }
    } catch {
      return null
    }
  }
  return null
}

// Load projects configuration
function loadProjectsConfig(): ProjectConfig[] {
  const projectsJsonPath = path.resolve(__dirname, 'projects/projects.json')
  if (fs.existsSync(projectsJsonPath)) {
    try {
      const content = fs.readFileSync(projectsJsonPath, 'utf-8')
      const data = JSON.parse(content)
      return data.projects || []
    } catch {
      return []
    }
  }
  return []
}

interface SprintData {
  week: string
  features: FeatureData[]
}

interface FeatureData {
  id: string
  name: string
  sprintWeek: string
  projectId: string
  projectName: string
  files: Record<string, boolean>
  completedSteps: Record<string, number[]>
}

// Plugin to serve sprint data from filesystem at runtime
function sprintApiPlugin() {
  return {
    name: 'sprint-api',
    configureServer(server: ViteDevServer) {
      // Serve projects list
      server.middlewares.use('/__api/projects', (_req: IncomingMessage, res: ServerResponse) => {
        const projects = loadProjectsConfig()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(projects))
      })

      // Serve sprints data from all projects
      server.middlewares.use('/__api/sprints', (_req: IncomingMessage, res: ServerResponse) => {
        const projects = loadProjectsConfig()
        const allSprints: SprintData[] = []

        for (const project of projects) {
          const sprintsDir = path.resolve(__dirname, project.sprintsPath)

          if (!fs.existsSync(sprintsDir)) {
            continue
          }

          // Read sprint weeks
          const weeks = fs.readdirSync(sprintsDir).filter(f =>
            fs.statSync(path.join(sprintsDir, f)).isDirectory() && /^\d{4}-W\d{2}$/.test(f)
          )

          for (const week of weeks) {
            const weekDir = path.join(sprintsDir, week)
            const featureDirs = fs.readdirSync(weekDir).filter(f =>
              fs.statSync(path.join(weekDir, f)).isDirectory()
            )

            const features = featureDirs.map(name => {
              const featureDir = path.join(weekDir, name)
              const files = fs.readdirSync(featureDir).filter(f => f.endsWith('.md') || f.endsWith('.json'))
              const fileMap: Record<string, boolean> = {}
              files.forEach(f => fileMap[f] = true)

              // Get completed steps from file content
              const completedSteps = getCompletedSteps(featureDir)

              // Get project info from project.json in feature folder
              const featureProject = getFeatureProject(featureDir)

              return {
                id: `${project.id}/${week}/${name}`,
                name,
                sprintWeek: week,
                projectId: featureProject?.projectId || project.id,
                projectName: featureProject?.projectName || project.name,
                files: fileMap,
                completedSteps,
              }
            })

            // Find existing sprint for this week or create new
            let sprint = allSprints.find(s => s.week === week)
            if (!sprint) {
              sprint = { week, features: [] }
              allSprints.push(sprint)
            }
            sprint.features.push(...features)
          }
        }

        // Sort newest first
        allSprints.sort((a, b) => b.week.localeCompare(a.week))

        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(allSprints))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sprintApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
