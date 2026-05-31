---
"@uhiggs/ui": patch
---

Standardize Storybook docs pages. Enable autodocs globally and
`react-docgen-typescript` for rich props tables, and establish a fixed Docs-page
layout (intro + `## Usage` → live primary story with controls → props table →
remaining example stories, with shown code always reflecting real component
usage rather than the Storybook render wrapper). Apply the convention to the
`Button` stories. Documented in `agent.md`.
