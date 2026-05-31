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
- [ ] `<name>.stories.tsx` covering all variants/states, with controls, following the Storybook story conventions below
- [ ] `pnpm typecheck && pnpm lint && pnpm build` pass — show output
- [ ] `pnpm build-storybook` passes (the autodocs page compiles)
- [ ] "use client" preserved in dist for this component (grep dist when relevant)
- [ ] A changeset added

## Storybook story conventions (every component)

Autodocs is enabled globally (`tags: ["autodocs"]` in `.storybook/preview.tsx`), so each
component automatically gets a **Docs page as its first story**. Do NOT add per-component
`.mdx`. Build the docs purely from the `*.stories.tsx` file so the layout stays identical
across the library. The Docs page must read top-to-bottom as:

1. **Title (h1) + intro + Usage** — set via `meta.parameters.docs.description.component`
   (markdown). Start with a one-paragraph description, then a `## Usage` heading and a
   ```tsx fenced block showing the real import (`import { X } from "@uhiggs/ui"`) and a
   minimal usage example. (Markdown code fences here are static, not live.)
2. **Live primary story + controls** — the first export is `Default`, **args-only (no
   `render`)** so Storybook emits clean usage JSX in "Show code" and the Controls table
   drives it live.
3. **Props table** — auto-generated. `.storybook/main.ts` uses `react-docgen-typescript`
   with a `propFilter` that hides inherited DOM props. Document each prop with a TSDoc
   comment + `@default` tag on the props interface; for cva-derived props (variant/size)
   and surfaced DOM props (children/disabled), add an `argTypes` entry with `description`,
   `control`, options, and `table.defaultValue`.
4. **Remaining stories** — every other story below, in sensible order, **without controls**.
   Each gets a short explanation via a TSDoc comment above the export (becomes the story
   description) and notes any prop specifics.

**Shown code = real, complete, copy-pasteable project code — never the Storybook wrapper.**
For every example story set `parameters.docs.source.code` to a full snippet that **includes
the imports** a consumer needs (`import { Button } from "@uhiggs/ui"` plus any icon/dep
imports) followed by the JSX. Never show bare JSX fragments without imports. The only
exception is the primary `Default` story, which stays dynamic (no `render`, no
`source.code`) so it reflects the live Controls; its import is already shown in the page
`## Usage` block above. Light/dark is covered by the toolbar theme toggle (no per-story dark
duplicate needed).

## Workflow

- Plan mode for multi-file work; show the plan before writing.
- One component (or one DataTable sub-step) + its story per session. Commit per component.
- Show evidence (command output), don't assert success.
- When context > ~60%, write progress to PROGRESS.md and /clear.

## Commands

- Dev: `pnpm storybook` · Build lib: `pnpm build` · Build SB: `pnpm build-storybook`
- Typecheck: `pnpm typecheck` · Lint: `pnpm lint` · Release: `pnpm changeset`
- Add shadcn source: `pnpm dlx shadcn@latest add <name>`
