"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/** Theme the consumer can request. `system` follows the OS preference. */
export type Theme = "light" | "dark" | "system";

/** The concrete theme actually applied to the DOM (never `system`). */
export type ResolvedTheme = "light" | "dark";

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme before any user choice. Defaults to `system`. */
  defaultTheme?: Theme;
  /**
   * Element the theme class is written to. Defaults to the document root.
   * Pass an element to scope theming to a subtree (e.g. Storybook stories).
   */
  target?: HTMLElement | null;
  /** Class toggled for dark mode. Defaults to `dark`. */
  darkClass?: string;
  /** Class toggled for light mode. Omitted by default (light is the base). */
  lightClass?: string;
}

export interface ThemeContextValue {
  /** The requested theme, including `system`. */
  theme: Theme;
  /** The theme currently applied to the DOM. */
  resolvedTheme: ResolvedTheme;
  /** Request a new theme. */
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DARK_QUERY = "(prefers-color-scheme: dark)";

function subscribeSystemTheme(onChange: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSystemThemeSnapshot(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/**
 * Framework-agnostic theme provider. No `next/*` or external theme deps — it
 * just toggles a class on a target element and exposes the current theme via
 * context. Safe to drop into any React 19 host (Next App Router, Vite, etc.).
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  target,
  darkClass = "dark",
  lightClass,
}: ThemeProviderProps): ReactNode {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Subscribe to the OS preference without synchronous setState in an effect.
  const systemTheme = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemThemeSnapshot,
    () => "light" as const,
  );

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  // Apply the resolved theme to the target element via method calls only
  // (no direct property mutation of the prop-derived element).
  useEffect(() => {
    if (typeof document === "undefined") return;
    const element = target ?? document.documentElement;
    const isDark = resolvedTheme === "dark";
    element.classList.toggle(darkClass, isDark);
    if (lightClass) element.classList.toggle(lightClass, !isDark);
    element.style.setProperty("color-scheme", resolvedTheme);
  }, [resolvedTheme, target, darkClass, lightClass]);

  const setThemeStable = useCallback((next: Theme) => setTheme(next), []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme: setThemeStable }),
    [theme, resolvedTheme, setThemeStable],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

/** Read and update the active theme. Throws outside a `ThemeProvider`. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return context;
}
