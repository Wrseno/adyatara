# AGENTS.md - Adyatara

## Project Overview

Adyatara is an interactive Indonesian folklore storytelling platform built with Next.js 16 (App Router), React 19, TypeScript, Prisma (PostgreSQL), NextAuth v5, Tailwind CSS v4, and shadcn/ui.

## Build / Lint / Test Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint (ESLint with next/core-web-vitals + typescript)
npm run lint

# Database
npx prisma generate          # Generate Prisma client
npx prisma migrate dev       # Run migrations in dev
npx prisma db seed           # Seed the database (tsx prisma/seed.ts)
npx prisma studio            # Open Prisma Studio

# Docker (PostgreSQL + pgAdmin)
docker compose up -d         # Start services
docker compose down          # Stop services
```

**No testing framework is currently configured.** If tests are added, check `package.json` for the test script and use:
- Vitest: `npx vitest run path/to/test.test.ts`
- Jest: `npx jest path/to/test.test.ts`

## Project Structure

```
src/
  actions/        # Server actions ("use server")
  app/            # Next.js App Router pages and API routes
    api/          # Route handlers (REST endpoints)
    auth/         # Auth pages
    dashboard/    # Dashboard pages
    game/         # Game pages
  components/
    auth/         # Auth-related components
    dashboard/    # Dashboard components
    providers/    # Context providers (session, theme, query)
    shared/       # Shared UI (navbar, footer, etc.)
    ui/           # shadcn/ui primitives (button, card, dialog, etc.)
  generated/      # Prisma generated client (gitignored)
  hooks/          # Custom React hooks (use-app-store, use-mounted)
  lib/            # Utilities, configs, business logic
    validations/  # Zod schemas for form/API validation
  types/          # TypeScript type definitions
prisma/
  schema.prisma   # Database schema
  seed.ts         # Database seed script
```

## Code Style Guidelines

### Imports

- Use `@/*` path alias for all internal imports (maps to `./src/*`)
- Group imports: (1) React/Next, (2) third-party, (3) internal
- Import types with `import type { ... }` syntax
- Use named exports; avoid default exports for components

```ts
import { db } from "@/lib/db";
import { z } from "zod";
import type { ApiResponse, UserProfile } from "@/types";
```

### TypeScript

- Strict mode is enabled (`"strict": true` in tsconfig)
- Prefer `interface` for object shapes, `type` for unions/intersections
- Use `z.infer<typeof Schema>` to derive types from Zod schemas
- Avoid `any`; use `// eslint-disable-next-line @typescript-eslint/no-explicit-any` only when unavoidable

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `Navbar.tsx`, `ThemeToggle.tsx` |
| Hooks | camelCase with `use` prefix | `use-app-store.ts`, `use-mounted.ts` |
| Server actions | camelCase, in `actions/` | `register`, `updateProfile` |
| API routes | `route.ts` in kebab-case dirs | `app/api/stories/[id]/route.ts` |
| Zod schemas | camelCase with `Schema` suffix or descriptive | `profileSchema`, `RegisterSchema` |
| Types/Interfaces | PascalCase | `UserProfile`, `ApiResponse<T>` |
| Files | kebab-case for non-components | `game-engine.ts`, `auth.config.ts` |
| Prisma models | PascalCase | `User`, `GameSession`, `UserKnowledge` |

### Components & Client/Server Boundary

- Server Components are the default (no directive needed)
- Add `"use client"` only when using hooks, event handlers, or browser APIs
- Add `"use server"` at the top of server action files
- Use the `cn()` utility from `@/lib/utils` for conditional Tailwind classes

### Validation

- Use Zod for all input validation (forms, API routes, server actions)
- Define schemas in `src/lib/validations/` or inline in server actions
- Use `schema.safeParse(values)` and return early on failure

```ts
const validated = profileSchema.safeParse(values);
if (!validated.success) {
  return { success: false, error: validated.error.issues[0]?.message ?? "Validation failed" };
}
```

### Error Handling

- Server actions return `{ success: boolean, data?: T, error?: string }` pattern
- Wrap server action logic in try/catch; log errors with `console.error`
- Throw `Error` with descriptive messages in library/engine code (`game-engine.ts`)
- API routes should return proper HTTP status codes

### Styling

- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- shadcn/ui (base-nova style) for UI primitives in `src/components/ui/`
- Use `cn()` from `@/lib/utils` for className merging (clsx + tailwind-merge)
- Design tokens via CSS variables defined in `globals.css`

### State Management

- **Zustand** for global client state (`use-app-store.ts`)
- **React Query** (`@tanstack/react-query`) for server state / data fetching
- **React Hook Form** + `@hookform/resolvers` (Zod) for forms

### Database (Prisma)

- PostgreSQL via Docker Compose or Supabase
- Prisma client generated to `src/generated/prisma/` (gitignored)
- Use `@prisma/adapter-pg` for connection pooling
- Global Prisma instance singleton pattern in `src/lib/db.ts`
- Run `npx prisma generate` after schema changes

### Authentication

- NextAuth v5 (beta) with Prisma adapter
- JWT session strategy
- Credentials provider with bcrypt password hashing
- Extend `Session` and `User` types via module augmentation in `src/lib/auth.ts`

## Key Conventions

- Prefer server components; minimize client component boundaries
- Use server actions for mutations over API routes when possible
- Keep validation schemas reusable and co-located or in `validations/`
- Never commit `.env` files; use `.env.example` as reference
- Prisma migrations in `prisma/migrations/`; run `npx prisma migrate dev` to create new ones

## Design System

### Color Palette
- Background: `#0A0705`, `#0D0A08`
- Accent: `#E8724A`, `#D96B4A`, `#E86B52`
- Text: `#F5F0EB` (primary), `#9A8A7A` (secondary)
- Borders: `#2E2318`, `#1A1410`

### Card Styling (Fitur Utama style)
- Background: `bg-[#0D0907]` dengan `border-transparent`
- Corner brackets: `w-3 h-3 border-l border-t border-gray-800`
- Hover effect: `group-hover:border-[#D96B4A]/60`
- Icon box: `border border-gray-800/80` dengan corner accents

### Form Styling (Auth pages style)
- Input: `rounded-none`, `py-6`, `bg-[#0D0907]`, `border border-gray-800`
- Corner brackets pada input field
- Label: `text-[10px]`, `tracking-[0.2em]`, `uppercase`, `font-medium`
- Button: `bg-[#E86B52]`, `rounded-none`, `tracking-[0.2em]`, uppercase
- Placeholder: `text-gray-600`

### Typography
- Serif font: untuk heading dan angka besar
- Uppercase: label, button, section title (dengan `tracking-[0.2em]`)
- Light weight: deskripsi dan secondary text

## Next.js Documentation

Next.js 16 docs are available locally in `.next-docs/`. Always search docs before making Next.js-specific changes:
```bash
npx @next/codemod agents-md --output AGENTS.md   # Refresh docs index if missing
```
