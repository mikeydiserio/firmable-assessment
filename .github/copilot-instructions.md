# Firmable Assessment - AI Coding Instructions

## Architecture Overview

This is an **Nx 21.2.3 monorepo** with pnpm workspace management, Lerna for publishing, and Next.js 15 App Router. The workspace follows Nx's standard structure with `apps/` for applications and `packages/` for libraries.

### Workspace Structure & Data Flow

- **Applications**: `apps/firmable-web-ui/` (Next.js app), `apps/firmable-web-ui-e2e/` (Playwright tests)
- **Packages**: `packages/supabase-python/` (arbitrary data processing - not part of main architecture)
- **Entity Display**: Main app renders entity cards with relational data from Supabase
- **Component Pattern**: Each UI component has co-located `.styles.tsx` files using styled-components (not CSS modules)

## Project-Specific Patterns

### Styling Architecture

- **Styled-components**: All components use co-located `.styles.tsx` files (e.g., `SearchBar.styles.tsx`)
- **CSS Variables**: Use `var(--primary-color)`, `var(--light-gray)`, `var(--dark)` for theming
- **Component Structure**: Import as `import * as S from './Component.styles'` and use `<S.ComponentName>`

### Data Types & API Patterns

```typescript
// Core Entity type with related data
interface Entity {
  abn: string
  legal_name: string | null
  entity_types?: { description: string }
  business_names?: BusinessName[]
  dgr_funds?: DgrFund[]
  locations?: { state: string; postcode: string }
}
```

### API Routes & Hooks

- **API Routes**: `/api/entities` for listing, `/api/entities/[abn]` for details
- **Custom Hooks**: Use `useGetEntities()` and `useGetEntity(abn)` in `hooks/` directory
- **Supabase Integration**: Direct REST API calls with environment variables `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_KEY`

## Development Workflows

### Nx Monorepo Commands

```bash
# Install all workspace dependencies (required first step)
pnpm monorepo:install

# Start dev server with Turbopack for affected apps
pnpm dev  # Alias for: nx run-many -t next dev --turbopack

# Run tasks across multiple projects
nx run-many -t test        # Run tests for all projects
nx run-many -t lint        # Lint all projects
nx run-many -t build       # Build all projects

# Run tasks for affected projects only (since last commit)
nx affected -t test
nx affected -t build

# Target specific projects
nx run firmable-web-ui:dev
nx run firmable-web-ui:build
nx run firmable-web-ui-e2e:e2e

# View workspace dependency graph
nx graph
nx graph --affected  # Show only affected projects
```

### Creating New Packages/Libraries

```bash
# Generate new React library
nx g @nx/react:library shared-ui --directory=packages/shared-ui

# Generate new TypeScript library  
nx g @nx/js:library utils --directory=packages/utils

# Generate new Next.js application
nx g @nx/next:application new-app --directory=apps/new-app

# Generate React component within library
nx g @nx/react:component Button --project=shared-ui

# Generate custom hook
nx g @nx/react:hook useApi --project=shared-ui
```

### pnpm Workspace Management

```bash
# Add dependency to specific project
pnpm add react-query --filter=firmable-web-ui
pnpm add -D @types/node --filter=shared-ui

# Add dependency to workspace root
pnpm add -w eslint typescript

# Install dependencies for all projects
pnpm install

# Run scripts from specific package
pnpm --filter=firmable-web-ui run build
pnpm --filter=shared-ui run test

# List all workspace packages
pnpm list --recursive
```

### Lerna Publishing & Versioning

```bash
# Version and publish packages (independent versioning)
lerna version
lerna publish

# Check which packages changed
lerna changed

# Run command in all packages
lerna run test
lerna run build --scope=shared-ui
```

### Nx Project Configuration Patterns

Each project has a `project.json` defining:
```json
{
  "name": "firmable-web-ui",
  "projectType": "application",  // or "library"
  "sourceRoot": "apps/firmable-web-ui/src",
  "tags": ["type:app", "scope:firmable-web-ui"],
  "targets": {
    "dev": { "executor": "@nx/next:dev" },
    "build": { "executor": "@nx/next:build" },
    "lint": { "executor": "@nx/eslint:lint" }
  }
}
```

**Tag System**: Use tags for dependency constraints and project organization:
- `type:app` / `type:lib` - Project type classification
- `scope:shared` / `scope:firmable-web-ui` - Domain boundaries
- Custom tags for feature grouping

### Component Creation Pattern

1. Create `ComponentName.tsx` and `ComponentName.styles.tsx` in same directory
2. Add `index.ts` barrel export: `export { default } from './ComponentName'`
3. Use props interface pattern: `export interface ComponentNameProps`
4. Import styles as: `import * as S from './ComponentName.styles'`

### Package Creation Best Practices

**Library Structure**:
```
packages/shared-ui/
├── src/
│   ├── index.ts          # Main export barrel
│   ├── components/       # Component exports
│   └── utils/           # Utility functions
├── package.json         # Library dependencies
├── project.json         # Nx configuration
└── tsconfig.json        # TypeScript config
```

**Export Pattern**:
```typescript
// packages/shared-ui/src/index.ts
export * from './components'
export * from './utils'

// Usage in apps
import { Button, useApi } from '@workspace/shared-ui'
```

### Supabase Database Schema

When working with entity data, remember the relational structure:

- Primary entity in `entities` table (ABN as key)
- Related tables: `business_names`, `dgr_funds`, `entity_types`, `locations`
- Use joined queries: `*,business_names(*),dgr_funds(*),entity_types(*),locations(*)`

## Integration Points

### Nx Task Dependencies & Caching

- **Target Dependencies**: Build tasks depend on `^build` (dependencies built first)
- **Caching**: Nx caches task outputs in `.nx/cache/` - tasks only re-run when inputs change
- **Affected Commands**: Only run tasks for projects that changed since last commit/deploy
- **Task Parallelization**: Nx runs independent tasks in parallel for faster builds

### Workspace Configuration Files

- `nx.json` - Global Nx configuration, task defaults, caching rules
- `pnpm-workspace.yaml` - pnpm workspace package discovery
- `lerna.json` - Lerna configuration for publishing (npmClient: "pnpm")
- `tsconfig.base.json` - Shared TypeScript configuration across projects

### Library Import Constraints

Configure in `nx.json` or `.eslintrc.json`:
```json
{
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "allow": [],
        "depConstraints": [
          {
            "sourceTag": "type:app",
            "onlyDependOnLibsWithTags": ["type:lib"]
          }
        ]
      }
    ]
  }
}
```

### Environment Configuration

```bash
# Required for Supabase integration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_KEY="your-service-key"
```

### Modal & Search Patterns

- Modals use overlay pattern with `styled-components` (see `CompanyDetailModal`)
- Search components have suggestion dropdowns with debounced API calls
- Entity cards are clickable with `onViewDetails` callback pattern

### Supabase Database Schema

When working with entity data, remember the relational structure:
- Primary entity in `entities` table (ABN as key)
- Related tables: `business_names`, `dgr_funds`, `entity_types`, `locations`  
- Use joined queries: `*,business_names(*),dgr_funds(*),entity_types(*),locations(*)`

## Key Files to Reference

- `nx.json` - Monorepo configuration, task defaults, and caching rules
- `pnpm-workspace.yaml` - Workspace package discovery and management
- `lerna.json` - Publishing configuration with pnpm integration
- `apps/firmable-web-ui/project.json` - Next.js app configuration and targets
- `apps/firmable-web-ui/src/types/types.ts` - Core type definitions
- `apps/firmable-web-ui/src/components/EntityCard/` - Component pattern example
- `.github/instructions/nx.instructions.md` - Nx-specific AI guidance (auto-generated)
