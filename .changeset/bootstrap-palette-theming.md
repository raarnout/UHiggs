---
"@uhiggs/ui": minor
---

Theming foundation: align the full palette to **Bootstrap 5.3** and codify the branding
contract. Neutral surfaces (background/foreground/card/popover/muted/accent/border/input/ring)
are recolored to the Bootstrap gray scale in light **and** dark mode (intents were already
Bootstrap). Expand the tier-1 token API — the public branding surface — with `--font-mono`,
a chart/data palette (`--chart-1..5`), sidebar tokens (`--sidebar*`, brand-bound slots chain
to `--primary`/`--ring`), and a Bootstrap-ordered z-index scale (`--z-dropdown` … `--z-toast`).
Textarea focus now uses the same brand-driven `--input-ring` glow as Input, so a single brand
override drives both fields uniformly. AGENTS.md gains a "Theming & branding" section: the
source-separation rule (colors from Bootstrap 5.3, behavior/a11y from the existing
shadcn/Radix sources), the 3-tier token model, the tokenization policy, and the consumer
branding workflow. All additive — existing component APIs are unchanged.
