import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button.js";

describe("Button", () => {
  it("renders its children inside a real <button> by default", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.tagName).toBe("BUTTON");
  });

  it("applies the default variant classes (solid / primary / rounded / md)", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass("inline-flex", "rounded-md", "h-9");
    expect(button.className).toContain("[--btn-color:var(--primary)]");
  });

  it("maps variant / size / shape / color props to class substrings", () => {
    const { rerender } = render(
      <Button variant="link">Link</Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("px-0");

    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");

    rerender(<Button shape="pill">Pill</Button>);
    expect(screen.getByRole("button")).toHaveClass("rounded-full");

    rerender(<Button color="secondary">Secondary</Button>);
    expect(screen.getByRole("button").className).toContain(
      "[--btn-color:var(--secondary)]",
    );
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  describe("loading", () => {
    it("disables the button, sets aria-busy, and renders the spinner", () => {
      const { container } = render(<Button loading>Save</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(container.querySelector("svg.animate-spin")).toBeInTheDocument();
    });

    it("keeps the label rendered but hidden in place", () => {
      render(<Button loading>Save</Button>);
      const label = screen.getByText("Save");
      expect(label).toHaveClass("invisible");
    });

    it("suppresses onClick while loading", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Save
        </Button>,
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  it("disables without setting aria-busy when only `disabled` is passed", () => {
    render(<Button disabled>Save</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute("aria-busy");
  });

  it("forwards its ref to the underlying button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveTextContent("Save");
  });

  describe("asChild", () => {
    it("renders the child element instead of a <button>", () => {
      render(
        <Button asChild>
          <a href="/home">Home</a>
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toHaveAttribute("href", "/home");
      // Button styling is merged onto the child.
      expect(link).toHaveClass("inline-flex", "rounded-md");
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("sets aria-busy / data-loading and injects no spinner when loading", () => {
      const { container } = render(
        <Button asChild loading>
          <a href="/home">Home</a>
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toHaveAttribute("aria-busy", "true");
      expect(link).toHaveAttribute("data-loading", "true");
      expect(container.querySelector("svg.animate-spin")).toBeNull();
    });
  });

  it("merges a consumer className alongside the variant classes", () => {
    render(<Button className="custom-class">Save</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class", "inline-flex");
  });

  it("forwards arbitrary native props", () => {
    render(
      <Button type="submit" aria-label="Submit form">
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Submit form" });
    expect(button).toHaveAttribute("type", "submit");
  });
});
