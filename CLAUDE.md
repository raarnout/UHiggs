# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Required reading

Always consult [agent.md](./agent.md) for the full agent instructions, code conventions, and project rules before making changes. It is the source of truth and takes precedence over this file. The notes below summarize the points most likely to trip you up.

## Current state

Scaffolded but pre-first-component. Tooling is wired up and verified: `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm build-storybook` all pass. Present so far: TypeScript (strict) config, ESLint flat config (bans `any`, enforces type imports + react-hooks), bunchee build, Storybook 10 + Tailwind v4 via `@tailwindcss/vite`, changesets, design tokens in [src/styles.css](./src/styles.css), and the `cn()` helper in [src/lib/utils.ts](./src/lib/utils.ts). No UI components exist yet — that's the next work.

Note: `pnpm build` runs `bunchee && cp src/styles.css dist/styles.css`. bunchee emits a cosmetic warning about the `./styles.css` export (it doesn't map standalone CSS exports); the `cp` produces `dist/styles.css` and the build exits 0.

Tailwind v4 has two CSS files by design: [src/styles.css](./src/styles.css) ships only raw token custom properties (host-agnostic), while [.storybook/tailwind.css](./.storybook/tailwind.css) adds `@import "tailwindcss"`, the `dark` custom-variant, and the `@theme inline` token→utility mapping used during local development.

## What this is

`@uhiggs/ui` — a standalone, **distributable** React component library published to npm and consumed by Next.js (App Router) apps. It is developed and documented in Storybook 10 (react-vite, ESM-only). It is **not** an application.

Stack: React 19 + TypeScript (strict), Tailwind v4 with CSS variables, Radix UI primitives (unified `radix-ui` package), cva + `cn()` (clsx + tailwind-merge) for variants. Domain libs: react-hook-form + zod, lucide-react, sonner, cmdk, @tanstack/react-table (+ react-virtual), recharts.

## Commands (pnpm)

- Dev / docs: `pnpm storybook`
- Build library: `pnpm build` (bunchee) · Build docs: `pnpm build-storybook`
- `pnpm typecheck` · `pnpm lint`
- Release: `pnpm changeset` (every change needs a changeset)
- Pull in a shadcn source component: `pnpm dlx shadcn@latest add <name>`

## Distribution rules — why the architecture is the way it is

These constraints exist because this code ships to other people's apps; violating them breaks consumers:

- **Data- and framework-agnostic.** No data fetching inside components, no `next/*` imports. Data, callbacks, and a `LinkComponent` come in via props.
- **Per-file `"use client"`.** Put `"use client"` at the top of every interactive component file; keep presentational components server-safe. The build uses **bunchee** specifically so per-file directives survive — never add a global `"use client"` banner.
- **Tokens only.** Never hardcode colors or radius; use the Tailwind v4 CSS-variable tokens. Dark mode must work.
- **API shape:** named exports only, no `any`, `forwardRef` when wrapping a DOM node, variants via cva.

## Workflow expectations

- Use plan mode for multi-file work and show the plan before writing.
- Scope: one component (or one DataTable sub-step) plus its `<name>.stories.tsx` per session; commit per component.
- Definition of Done per component (see [agent.md](./agent.md) for the full checklist): typed props, tokens + dark mode, a11y verified via the primitive, a story covering all variants/states in light + dark, `pnpm typecheck && pnpm lint && pnpm build` passing (show the output), `"use client"` preserved in `dist`, and a changeset added.
- Show command output as evidence rather than asserting success.
- When context exceeds ~60%, write progress to `PROGRESS.md` and `/clear`.
