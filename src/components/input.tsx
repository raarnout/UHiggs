"use client";

import { forwardRef, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

/**
 * Input style contract. Tokens only: border/placeholder/ring all reference the
 * design tokens so it inherits the host surface and works in dark mode. Focus
 * uses a Bootstrap-style glow — a soft 4px ring at 25% opacity that hugs the
 * border (no offset) plus a matching border, both colored by the dedicated
 * `--input-ring` token (defaults to `--primary`, so a host can recolor input
 * focus without touching the button/primary color). The error state is driven
 * by the native `aria-invalid` attribute (no extra prop) and swaps the
 * glow/border to `--destructive`, so the look always matches the semantics for
 * assistive tech. `size` heights match Button so an Input and a Button line up
 * on the same form row.
 */
const inputVariants = cva(
  "flex w-full min-w-0 rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow,border-color] placeholder:text-muted-foreground file:border-0 file:bg-transparent file:font-medium file:text-foreground focus-visible:outline-none focus-visible:border-[var(--input-ring)] focus-visible:ring-4 focus-visible:ring-[color-mix(in_oklab,var(--input-ring)_25%,transparent)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-sm file:text-sm",
        md: "h-9 px-3 text-sm file:text-sm",
        lg: "h-10 px-4 text-base file:text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface InputProps
  // Omit the native `size` HTML attribute (typed `number`) so our `size`
  // variant enum wins.
  extends Omit<ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

/**
 * Text input. Data-agnostic: `value`/`defaultValue`, `onChange`, `type`,
 * `placeholder`, `disabled`, `name`, and `aria-invalid` all flow through as
 * standard `<input>` props. Pair it with a `<label htmlFor>` for accessible
 * labeling, and set `aria-invalid` to show the error state.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export { inputVariants };
