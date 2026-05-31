# Project: Distributable admin UI library (@uhiggs/ui)

## What this is

- A standalone React component library published to npm, consumed in Next.js (App Router) apps.
- Developed & documented in Storybook 10 (react-vite, ESM-only). NOT an app.

## Stack & non-negotiables

- React 19 + TypeScript strict. No `any`. Named exports only.
- Tailwind v4 + CSS variables. NEVER hardcode colors/radius — use tokens.
- Primitives: Radix UI (unified `radix-ui`). Forms: react-hook-form + zod. Icons: lucide-react.
  Toasts: sonner. Command/⌘K: cmdk. Tables: @tanstack/react-table (+ @tanstack/react-virtual). Charts: recharts.
- Variants: cva + cn() (clsx + tailwind-merge).

## Library design rules (critical for distribution)

- DATA-AGNOSTIC and FRAMEWORK-AGNOSTIC: no fetching inside, no `next/*`. Data/callbacks/LinkComponent via props.
- "use client" at the top of every interactive component file; keep presentational ones server-safe.
- Build with bunchee so per-file "use client" survives. NEVER add a global banner.

## Definition of Done (per component)

- [ ] Typed props, no `any`, forwardRef where it wraps a DOM node
- [ ] Tokens only; dark mode works; variants via cva
- [ ] Keyboard + screen-reader behavior verified (via the primitive)
- [ ] `<name>.stories.tsx` covering all variants/states, light + dark, with controls
- [ ] `pnpm typecheck && pnpm lint && pnpm build` pass — show output
- [ ] "use client" preserved in dist for this component (grep dist when relevant)
- [ ] A changeset added

## Workflow

- Plan mode for multi-file work; show the plan before writing.
- One component (or one DataTable sub-step) + its story per session. Commit per component.
- Show evidence (command output), don't assert success.
- When context > ~60%, write progress to PROGRESS.md and /clear.

## Commands

- Dev: `pnpm storybook` · Build lib: `pnpm build` · Build SB: `pnpm build-storybook`
- Typecheck: `pnpm typecheck` · Lint: `pnpm lint` · Release: `pnpm changeset`
- Add shadcn source: `pnpm dlx shadcn@latest add <name>`
