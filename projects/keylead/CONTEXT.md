# Keylead Project Context

## Overview

**Keylead** is a content scheduling and publishing SaaS platform for real estate professionals. It helps agents automate their Instagram content by generating and scheduling property-focused posts.

## Tech Stack

- **Frontend:** Next.js 14 (client-app/)
- **Backend:** Express.js (content-server/)
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI, FAL AI for image generation
- **Hosting:** Vercel (frontend), Railway (API)

## Repository Structure

```
keylead/                      # Monorepo root
├── client-app/               # Client-facing SaaS app (Next.js)
│   ├── app/                  # Next.js app router
│   ├── app/internal-tool/    # Internal admin features
│   └── lib/                  # Shared utilities
├── content-server/           # Backend API (Express)
│   ├── src/                  # TypeScript source
│   └── dist/                 # Compiled output
└── sprints/                  # Sprint handoff files
    └── YYYY-WXX/
        └── [feature-name]/
```

## Sprint Location

Sprints are stored at: `keylead/sprints/YYYY-WXX/[feature-name]/`

When committing handoff files:
```bash
cd keylead
git add sprints/YYYY-WXX/[feature-name]/
git commit -m "Add [feature-name] sprint YYYY-WXX handoff"
git push origin main
```

## Team

| Role | Description |
|------|-------------|
| Product Lead | Runs Double Diamond process, makes product decisions |
| Stakeholder | CEO/decision maker, provides direction on Fridays |
| Engineers | Build features Mon-Thu using PRD + codebase context |
| QA | Tests in staging using QA checklist, works Thu-Fri |

## UX Principles

Keylead follows a "Invest Before You Ask" philosophy:

1. **Zero Configuration by Default** - Pre-select everything, user verifies not configures
2. **Maximum 2-3 Things Per Screen** - Split complex forms into multi-step wizards
3. **Friction at the End** - Ask for Instagram connection/payment AFTER they've built something
4. **Show AI Doing Work** - Animate loading states ("Writing caption...", "Finding best time...")
5. **Mobile-First** - Design for mobile first, then adapt for desktop

## Development Guidelines

### Quality Checks (REQUIRED)
```bash
# After any code changes:
cd client-app && npx tsc --noEmit
# or for backend:
cd content-server && npx tsc --noEmit && npm run build:server
```

### Package Installation
```bash
# Frontend packages
cd client-app && npm install <package>

# Backend packages
cd content-server && npm install <package>
```

### Common Ports
- client-app: 3001
- content-server: 4000

## Key Files for Context

When exploring solutions in /develop, read:
- `client-app/` - Main application code
- `content-server/` - API and content generation
- `client-app/app/internal-tool/` - Admin features
