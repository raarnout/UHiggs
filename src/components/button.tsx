"use client";

import { forwardRef, type ComponentProps } from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

/**
 * Button style contract — three orthogonal axes plus size, so every
 * color × variant × shape combination is valid. Tokens only: each `color`
 * sets `--btn-color` / `--btn-on` and the `variant` consumes them, so a single
 * variant definition works for all colors. Never hardcode theme colors or
 * radius. (The `#000`/`transparent` in the hover `color-mix` are neutral
 * shading constants, not theme colors.)
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      color: {
        primary:
          "[--btn-color:var(--primary)] [--btn-on:var(--primary-foreground)]",
        secondary:
          "[--btn-color:var(--secondary)] [--btn-on:var(--secondary-foreground)]",
        success:
          "[--btn-color:var(--success)] [--btn-on:var(--success-foreground)]",
        info: "[--btn-color:var(--info)] [--btn-on:var(--info-foreground)]",
        warning:
          "[--btn-color:var(--warning)] [--btn-on:var(--warning-foreground)]",
        danger:
          "[--btn-color:var(--danger)] [--btn-on:var(--danger-foreground)]",
        light: "[--btn-color:var(--light)] [--btn-on:var(--light-foreground)]",
        dark: "[--btn-color:var(--dark)] [--btn-on:var(--dark-foreground)]",
      },
      shape: {
        rounded: "rounded-md",
        square: "rounded-none",
        pill: "rounded-full",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4 py-2",
        lg: "h-10 px-6",
        icon: "size-9",
      },
      // `variant` is listed last so its classes win the tailwind-merge over
      // `size` (e.g. `link`'s `px-0` overrides the size padding).
      variant: {
        solid:
          "bg-[var(--btn-color)] text-[var(--btn-on)] hover:bg-[color-mix(in_srgb,var(--btn-color),#000_12%)]",
        outline:
          "border border-[var(--btn-color)] text-[var(--btn-color)] hover:bg-[var(--btn-color)] hover:text-[var(--btn-on)]",
        ghost:
          "text-[var(--btn-color)] hover:bg-[color-mix(in_srgb,var(--btn-color),transparent_88%)]",
        link: "px-0 text-[var(--btn-color)] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      color: "primary",
      variant: "solid",
      shape: "rounded",
      size: "md",
    },
  },
);

// TODO: replace with the shared <Spinner> component later this phase.
function ButtonSpinner() {
  return (
    <svg
      className="animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export interface ButtonProps
  // Omit the legacy `color` HTML attribute (typed `string`) so our `color`
  // variant enum wins.
  extends Omit<ComponentProps<"button">, "color">,
    VariantProps<typeof buttonVariants> {
  /**
   * Render the child element instead of a `<button>` (Radix Slot).
   * @default false
   */
  asChild?: boolean;
  /**
   * Disable the button and show a centered spinner. The button keeps the same
   * width as its non-loading state — the label is hidden in place, not removed.
   * @default false
   */
  loading?: boolean;
}

/**
 * Action button. `color`, `variant` (fill style), and `shape` (corner radius)
 * are independent, so any combination is valid; `asChild` lets it adopt a
 * different element (e.g. an anchor) while keeping the styling.
 *
 * Note: with `asChild`, Radix Slot requires a single child, so the loading
 * spinner is not injected — `loading` only sets the disabled/`aria-busy` state.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color,
      variant,
      shape,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot.Root
          ref={ref}
          className={cn(
            buttonVariants({ color, variant, shape, size }),
            className,
          )}
          aria-busy={loading || undefined}
          data-loading={loading || undefined}
          {...props}
        >
          {children}
        </Slot.Root>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ color, variant, shape, size }),
          className,
        )}
        disabled={loading || disabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <span className="absolute inset-0 flex items-center justify-center">
              <ButtonSpinner />
            </span>
            <span className="invisible inline-flex items-center gap-2">
              {children}
            </span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
