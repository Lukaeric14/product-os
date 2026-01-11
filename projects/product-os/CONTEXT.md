# Product OS Context

## Overview
Product OS is a sprint-based product development workflow tool that guides product leads through the Double Diamond process to create comprehensive handoff packages for engineers.

## Tech Stack
- **Frontend:** Vite + React + React Router
- **Styling:** Tailwind CSS
- **Backend:** Vite middleware (filesystem scanning)
- **CLI:** Claude Code slash commands

## Repository Structure
```
product-os/
├── src/
│   ├── components/     # React components (PhasePanel, PhaseNav, etc.)
│   ├── pages/          # Dashboard, FeatureDetail
│   ├── hooks/          # useSprints, useProjects
│   └── types/          # TypeScript types (sprint.ts)
├── projects/           # Project configurations
├── sprints/            # Product OS's own sprints
├── agents.md           # Full process documentation
└── CLAUDE.md           # Claude Code instructions
```

## Key Files
- `src/types/sprint.ts` — Phase and step definitions
- `src/hooks/useSprints.ts` — Completion detection logic
- `src/components/PhasePanel.tsx` — Step rendering
- `vite.config.ts` — Backend API endpoints

## Development
```bash
npm run dev    # Start dev server at localhost:5173
npm run build  # Production build
```

## Git Workflow
- Main branch: `main`
- Commits go directly to product-os repo
- No external repo to push to
