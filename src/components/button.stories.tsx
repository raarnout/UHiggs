import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus } from "lucide-react";

import { Button } from "./button.js";

const COLORS = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "dark",
] as const;

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: [
          "The `Button` component is a clickable element that triggers an action. Its look is",
          "driven by three independent props — `color`, `variant` (fill style), and `shape`",
          "(corner radius) — so every combination is valid. It also supports a `size`, an",
          "`asChild` escape hatch, and a `loading` state. All standard `<button>` attributes",
          "such as `onClick`, `type`, and `aria-label` are forwarded.",
          "",
          "## Usage",
          "",
          "```tsx",
          'import { Button } from "@uhiggs/ui";',
          "",
          '<Button color="primary" variant="solid" shape="rounded" onClick={handleSave}>',
          "  Save changes",
          "</Button>",
          "```",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button content (text or `ReactNode`).",
      table: { type: { summary: "ReactNode" } },
    },
    color: {
      control: "select",
      options: [...COLORS],
      description: "Color intent. Pairs with a readable foreground automatically.",
      table: { defaultValue: { summary: "primary" } },
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "link"],
      description: "Fill style. `link` renders as an inline text link.",
      table: { defaultValue: { summary: "solid" } },
    },
    shape: {
      control: "select",
      options: ["rounded", "square", "pill"],
      description: "Corner radius. No visible effect on `variant=\"link\"`.",
      table: { defaultValue: { summary: "rounded" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
      description:
        "Overall size of the button. `icon` is square for icon-only triggers.",
      table: { defaultValue: { summary: "md" } },
    },
    loading: {
      control: "boolean",
      description:
        "Disables the button and shows a centered spinner. Width is preserved.",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables the button and blocks interaction.",
      table: { defaultValue: { summary: "false" } },
    },
    asChild: {
      control: false,
      description:
        "Render the child element instead of a `<button>` (Radix Slot). Requires a single child.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    children: "Button",
    color: "primary",
    variant: "solid",
    shape: "rounded",
    size: "md",
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default button. Use the controls above to explore the props live. */
export const Default: Story = {};

/**
 * The `color` prop sets the color intent. Each color pairs with a foreground
 * chosen for contrast, and stays the same hue in light and dark mode. Shown
 * here with the default `solid` variant.
 */
export const AllColors: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="info">Info</Button>
<Button color="warning">Warning</Button>
<Button color="danger">Danger</Button>
<Button color="light">Light</Button>
<Button color="dark">Dark</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {COLORS.map((color) => (
        <Button key={color} color={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

/**
 * The `variant` prop sets the fill style and is independent of `color`. `solid`
 * fills the button, `outline` shows a colored border, `ghost` is transparent
 * until hover, and `link` renders as an inline underline-on-hover text link.
 */
export const AllVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button color="primary" variant="solid">Solid</Button>
<Button color="primary" variant="outline">Outline</Button>
<Button color="primary" variant="ghost">Ghost</Button>
<Button color="primary" variant="link">Link</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/**
 * The `shape` prop only controls the corner radius, so it combines freely with
 * any color and variant (e.g. an outline pill). It has no visible effect on the
 * `link` variant.
 */
export const AllShapes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button shape="rounded">Rounded</Button>
<Button shape="square">Square</Button>
<Button shape="pill">Pill</Button>
<Button variant="outline" shape="pill">Outline pill</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button shape="rounded">Rounded</Button>
      <Button shape="square">Square</Button>
      <Button shape="pill">Pill</Button>
      <Button variant="outline" shape="pill">
        Outline pill
      </Button>
    </div>
  ),
};

/**
 * The `size` prop controls height and padding. Use `icon` for square,
 * icon-only buttons and always pass an `aria-label` so the action is named.
 */
export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Add">
  <Plus />
</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
};

/**
 * `children` accepts any `ReactNode`, so an icon can sit before or after the
 * label. The button uses flex layout with a gap, so spacing is consistent and
 * icons inherit the text color and scale via the built-in `[&_svg]` rules.
 */
export const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button>
  Continue
  <ArrowRight />
</Button>`,
      },
    },
  },
  render: () => (
    <Button>
      Continue
      <ArrowRight />
    </Button>
  ),
};

/**
 * When `loading` is `true` the button is disabled and shows a centered spinner.
 * The label is hidden in place, so the button keeps the exact same width as its
 * resting state — no layout shift. `aria-busy` is set for assistive tech.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button loading>Save changes</Button>
<Button loading variant="outline">Save changes</Button>
<Button loading color="danger">Delete</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Save changes</Button>
      <Button loading variant="outline">
        Save changes
      </Button>
      <Button loading color="danger">
        Delete
      </Button>
    </div>
  ),
};

/** A disabled button is non-interactive and dimmed via the `disabled` prop. */
export const Disabled: Story = {
  args: { disabled: true },
};

/**
 * With `asChild`, the Button renders its child element (here an `<a>`) while
 * keeping the button styling — useful for links that look like buttons. Radix
 * Slot requires exactly one child, so the loading spinner is not injected.
 */
export const AsChildLink: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button variant="link" asChild>
  <a href="https://example.com">Visit example.com</a>
</Button>`,
      },
    },
  },
  render: () => (
    <Button variant="link" asChild>
      <a href="https://example.com">Visit example.com</a>
    </Button>
  ),
};
