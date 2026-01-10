# Product OS Instructions

Product OS is a sprint-based product development workflow tool. See `agents.md` for full documentation.

## Quick Reference

### Key Files
- `agents.md` — Full agent directives
- `product-os-system.md` — System design document
- `projects/projects.json` — List of configured projects
- `projects/[project-id]/CONTEXT.md` — Project-specific context

### Slash Commands
- `/start` — Initialize feature, select project, capture inputs
- `/discover` — Explore problem space (diverge)
- `/define` — Narrow to one problem (converge)
- `/develop` — Explore solutions, wireframes, edge cases (diverge)
- `/deliver` — Generate PRD, QA, tickets, Loom outline (converge)
- `/handoff` — Commit, push, notify team
- `/status` — Check progress across all projects

### Multi-Project Support

Product OS supports multiple projects:
1. `/start` asks which project the feature is for
2. Creates `project.json` in feature folder
3. Other commands read project.json to load project-specific context

### Project Context

When working on a feature, always read:
1. `project.json` from the feature folder (to know which project)
2. `projects/[projectId]/CONTEXT.md` (for project-specific guidelines)

This ensures you use the correct:
- Tech stack and patterns
- Codebase structure
- Git workflow
- Team communication channels
