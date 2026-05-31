---
"@uhiggs/ui": minor
---

Add the `Input` component: a tokens-only, data-agnostic text field that renders a
real `<input>` and forwards all standard props (`value`/`defaultValue`,
`onChange`, `type`, `placeholder`, `name`, `aria-invalid`), so it drops straight
into react-hook-form or any controlled form. It adds a three-value `size`
(`sm`/`md`/`lg` → `h-8`/`h-9`/`h-10`) whose heights match Button, a native
`disabled` state, and an `aria-invalid` error state that styles the border and
focus ring with the destructive token — driven by the attribute itself so the
look never diverges from the screen-reader semantics. `forwardRef` onto the DOM
node; exports `Input`, `inputVariants`, and `InputProps`.
