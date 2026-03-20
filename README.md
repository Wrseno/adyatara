# NextBoiler — Next.js Full-Stack Boilerplate

A clean, modular, and production-ready Next.js boilerplate with TypeScript, Prisma, NextAuth, TanStack Query, Zustand, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui + Lucide Icons
- **ORM:** Prisma (PostgreSQL)
- **Auth:** NextAuth.js v5 (Auth.js) with Prisma Adapter
- **Validation:** Zod + React Hook Form
- **State:** TanStack Query (server) & Zustand (client)

## Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd next-js-boilerplate
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — Generate with `openssl rand -base64 32`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — [GitHub OAuth App](https://github.com/settings/developers)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — [Google Cloud Console](https://console.cloud.google.com/)

### 3. Database Setup

#### Option A: Local PostgreSQL (Docker)

```bash
docker compose up -d
```

This starts PostgreSQL on `localhost:5432` and pgAdmin on `localhost:5050`.

#### Option B: Supabase (Production)

1. Create a project at [supabase.com](https://supabase.com)
2. Copy the connection strings:
   - `DATABASE_URL` = Pooled connection string (Transaction mode)
   - `DIRECT_URL` = Direct connection string

### 4. Run Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── actions/          # Server Actions & business logic
├── app/              # Routes, Layouts, Pages
│   ├── api/auth/     # NextAuth API routes
│   ├── auth/signin/  # Sign-in page
│   └── dashboard/    # Protected dashboard
├── components/
│   ├── providers/    # Context providers (Auth, Query, Theme)
│   ├── shared/       # Reusable components (Navbar, Footer, FormInput)
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom React hooks
├── lib/              # Shared configs (Prisma, Auth, Utils, Metadata)
│   └── validations/  # Zod schemas
└── types/            # Shared TypeScript interfaces
```

## Key Patterns

### Server Actions
See `src/actions/profile.ts` for the recommended pattern:
1. Authenticate with `auth()`
2. Validate input with Zod
3. Perform DB operation via Prisma
4. Revalidate paths

### Form Components
Use `<FormInput>` from `src/components/shared/form-input.tsx` — integrates `react-hook-form` with `zod` and shadcn/ui `Form` primitives.

### State Management
- **Server state** → TanStack Query (`useQuery`, `useMutation`)
- **Client state** → Zustand (see `src/hooks/use-app-store.ts`)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npx prisma migrate dev` | Run migrations |
| `npx prisma studio` | Open Prisma Studio |
| `docker compose up -d` | Start local DB |

## License

MIT
