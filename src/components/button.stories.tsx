import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus } from "lucide-react";

import { Button } from "./button.js";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: [
          "The `Button` component is a clickable element that triggers an action. It",
          "supports multiple visual styles (`variant`) and sizes (`size`), an `asChild`",
          "escape hatch to render a different element, and a `loading` state. All standard",
          "`<button>` attributes such as `onClick`, `type`, and `aria-label` are forwarded.",
          "",
          "## Usage",
          "",
          "```tsx",
          'import { Button } from "@uhiggs/ui";',
          "",
          "<Button variant=\"default\" size=\"md\" onClick={handleSave}>",
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
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
      description: "Color and visual intent of the button.",
      table: { defaultValue: { summary: "default" } },
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
    variant: "default",
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
 * The `variant` prop sets the color and visual intent of the button. `link`
 * renders as an inline text link; `ghost` and `outline` are low-emphasis.
 */
export const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
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
<Button loading variant="secondary">Save changes</Button>
<Button loading variant="outline">Save changes</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Save changes</Button>
      <Button loading variant="secondary">
        Save changes
      </Button>
      <Button loading variant="outline">
        Save changes
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
