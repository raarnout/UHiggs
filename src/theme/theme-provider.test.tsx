import { describe, it, expect, vi, afterEach } from "vitest";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "./theme-provider.js";

// jsdom does not implement matchMedia; install a controllable stub so the
// `system` theme can resolve to dark or light on demand.
function stubMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches,
      media: "(prefers-color-scheme: dark)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
}

// A consumer that surfaces the context and lets a test drive setTheme.
function ThemeReadout() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("light")}>Light</button>
    </div>
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useTheme", () => {
  it("throws when used outside a ThemeProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within a <ThemeProvider>.",
    );
    spy.mockRestore();
  });
});

describe("ThemeProvider", () => {
  it("applies the dark class and color-scheme to the target element", () => {
    const target = document.createElement("div");
    render(
      <ThemeProvider defaultTheme="dark" target={target}>
        <ThemeReadout />
      </ThemeProvider>,
    );
    expect(target.classList.contains("dark")).toBe(true);
    expect(target.style.colorScheme).toBe("dark");
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
  });

  it("toggles the class and color-scheme when setTheme is called", async () => {
    const user = userEvent.setup();
    const target = document.createElement("div");
    render(
      <ThemeProvider defaultTheme="dark" target={target}>
        <ThemeReadout />
      </ThemeProvider>,
    );
    expect(target.classList.contains("dark")).toBe(true);

    await user.click(screen.getByRole("button", { name: "Light" }));
    expect(target.classList.contains("dark")).toBe(false);
    expect(target.style.colorScheme).toBe("light");
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("resolves `system` to dark when the OS prefers dark", () => {
    stubMatchMedia(true);
    const target = document.createElement("div");
    render(
      <ThemeProvider defaultTheme="system" target={target}>
        <ThemeReadout />
      </ThemeProvider>,
    );
    // `theme` stays `system`; `resolvedTheme` is concrete.
    expect(screen.getByTestId("theme")).toHaveTextContent("system");
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(target.classList.contains("dark")).toBe(true);
  });

  it("resolves `system` to light when the OS prefers light", () => {
    stubMatchMedia(false);
    const target = document.createElement("div");
    render(
      <ThemeProvider defaultTheme="system" target={target}>
        <ThemeReadout />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");
    expect(target.classList.contains("dark")).toBe(false);
  });

  it("honors a custom darkClass", () => {
    const target = document.createElement("div");
    render(
      <ThemeProvider defaultTheme="dark" target={target} darkClass="night">
        <ThemeReadout />
      </ThemeProvider>,
    );
    expect(target.classList.contains("night")).toBe(true);
    expect(target.classList.contains("dark")).toBe(false);
  });

  it("toggles an explicit lightClass in light mode", () => {
    const target = document.createElement("div");
    render(
      <ThemeProvider defaultTheme="light" target={target} lightClass="light-mode">
        <ThemeReadout />
      </ThemeProvider>,
    );
    expect(target.classList.contains("light-mode")).toBe(true);
    expect(target.classList.contains("dark")).toBe(false);
  });
});
