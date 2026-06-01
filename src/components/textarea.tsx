"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type ComponentProps,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

/**
 * Textarea style contract. Tokens only: border/placeholder/ring all reference
 * the design tokens so it inherits the host surface and works in dark mode.
 * Focus matches Input — a Bootstrap-style 4px glow at 25% opacity hugging the
 * border plus a matching border, both colored by `--input-ring` (defaults to
 * `--primary`), so a brand override drives both fields uniformly. The error
 * state is driven by the native `aria-invalid` attribute (no extra prop) and
 * swaps the glow/border to `--destructive`. Shares Input's contract; adds
 * textarea-specific padding and a sensible minimum height.
 */
const textareaVariants = cva(
  "flex w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-sm min-h-16 shadow-xs transition-[color,box-shadow,border-color] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[var(--input-ring)] focus-visible:ring-4 focus-visible:ring-[color-mix(in_oklab,var(--input-ring)_25%,transparent)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/25",
);

export interface TextareaProps
  extends ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {
  /**
   * Grow the textarea to fit its content as the user types, removing the manual
   * resize handle and scrollbar. Uses `scrollHeight`, so it works in every
   * browser.
   * @default false
   */
  autoResize?: boolean;
}

/**
 * Multi-line text input. Data-agnostic: `value`/`defaultValue`, `onChange`,
 * `rows`, `placeholder`, `disabled`, `name`, and `aria-invalid` all flow through
 * as standard `<textarea>` props. Pair it with a `<label htmlFor>` for
 * accessible labeling, and set `aria-invalid` to show the error state. With
 * `autoResize`, the field grows to fit its content.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, onChange, value, ...props }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);
    // Expose the inner DOM node through the forwarded ref so consumers keep a
    // real handle while we read `scrollHeight` internally for auto-resize.
    useImperativeHandle(ref, () => innerRef.current!, []);

    const resize = useCallback(() => {
      const el = innerRef.current;
      if (!el || !autoResize) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize]);

    // Resize on mount and whenever the (controlled) value or the toggle changes.
    useEffect(() => {
      resize();
    }, [resize, value]);

    return (
      <textarea
        ref={innerRef}
        value={value}
        onChange={(event) => {
          resize();
          onChange?.(event);
        }}
        className={cn(
          textareaVariants(),
          autoResize && "resize-none overflow-hidden",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { textareaVariants };
