---
"@uhiggs/ui": minor
---

Add the `Textarea` component: a tokens-only, data-agnostic multi-line field that
renders a real `<textarea>` and forwards all standard props (`value`/`defaultValue`,
`onChange`, `rows`, `placeholder`, `name`, `aria-invalid`), so it drops straight
into react-hook-form or any controlled form. It adds a native `disabled` state, an
`aria-invalid` error state that styles the border and focus ring with the
destructive token — driven by the attribute itself so the look never diverges from
the screen-reader semantics — and an optional `autoResize` prop that grows the
field to fit its content (via `scrollHeight`, so it works in every browser).
`forwardRef` onto the DOM node; exports `Textarea`, `textareaVariants`, and
`TextareaProps`.
