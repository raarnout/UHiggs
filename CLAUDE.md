# CLAUDE.md

## Source of truth

All project instructions, code conventions, and rules live in **[AGENTS.md](./AGENTS.md)** —
read it before making changes. AGENTS.md is authoritative and **wins on any conflict** with
this file. The cheat-sheet below is only a quick reminder of the points most likely to trip
you up; it is not a substitute for AGENTS.md.

## Critical rules (cheat-sheet)

- **Tokens only.** Never hardcode colors or radius; use the Tailwind v4 CSS-variable tokens. Dark mode must work.
- **Per-file `"use client"`** at the top of every interactive component; keep presentational ones server-safe. Never add a global banner — bunchee preserves the per-file directives.
- **Framework- & data-agnostic.** No `next/*` imports, no data fetching inside components. Data, callbacks, and a `LinkComponent` come in via props.
- **API shape:** named exports only, no `any`, `forwardRef` when wrapping a DOM node, variants via cva.
- **Every change needs a changeset** (`pnpm changeset`).
- **Plan mode for multi-file work**; show the plan before writing.
- **Storybook:** autodocs is global; build each component's Docs page from its `*.stories.tsx` (no per-component MDX); shown code must be real usage **with imports**. Full layout in AGENTS.md → "Storybook story conventions".
- **Definition of Done** per component (typed props, tokens + dark mode, a11y, story, `pnpm typecheck && pnpm lint && pnpm build && pnpm build-storybook` green, `"use client"` in `dist`, changeset): see AGENTS.md.
