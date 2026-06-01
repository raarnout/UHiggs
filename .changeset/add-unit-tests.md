---
"@uhiggs/ui": patch
---

Add a unit test suite (Vitest + @testing-library/react, jsdom) covering every
component — `Button`, `IconButton`, `Input`, `Textarea`, `Label`, the
`ThemeProvider`/`useTheme` pair, and the `cn()` helper. Tests are colocated as
`<name>.test.tsx`, assert behavior/attributes/forwardRef/events (not computed
styles, since jsdom applies no CSS), and are excluded from the published build.
Adds `pnpm test`/`test:watch`/`test:coverage` scripts, and unit tests are now
part of the Definition of Done.
