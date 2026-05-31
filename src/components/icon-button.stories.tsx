import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Check, Plus, Search, Star, Trash2 } from "lucide-react";

import { IconButton } from "./icon-button.js";

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
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component: [
          "The `IconButton` is an icon-only button built on `Button`. It fixes a square",
          "footprint and **requires an `aria-label`** — since there is no visible text, the",
          "label is the only accessible name screen readers can announce, so it is enforced at",
          "the type level. It inherits Button's `color`, `variant`, `shape`, `loading`, and",
          "`asChild` props and adds its own `size` (`sm`/`md`/`lg`) that squares up to the",
          "matching Button height.",
          "",
          "## Usage",
          "",
          "```tsx",
          'import { IconButton } from "@uhiggs/ui";',
          'import { Plus } from "lucide-react";',
          "",
          '<IconButton aria-label="Add item" onClick={handleAdd}>',
          "  <Plus />",
          "</IconButton>",
          "```",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: "The icon to render (a single `ReactNode`, e.g. a lucide-react icon).",
      table: { type: { summary: "ReactNode" } },
    },
    "aria-label": {
      control: "text",
      description: "Required accessible name announced by screen readers.",
      table: { type: { summary: "string" } },
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
      options: ["sm", "md", "lg"],
      description:
        "Square footprint, matching the equivalent Button height (h-8/h-9/h-10).",
      table: { defaultValue: { summary: "md" } },
    },
    loading: {
      control: "boolean",
      description: "Disables the button and shows a centered spinner.",
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
    children: <Plus />,
    "aria-label": "Add",
    color: "primary",
    variant: "solid",
    shape: "rounded",
    size: "md",
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default icon button. Use the controls above to explore the props live. */
export const Default: Story = {};

/**
 * The `size` prop sets a square footprint that matches the equivalent Button
 * height, so an IconButton aligns with text buttons of the same size.
 */
export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { IconButton } from "@uhiggs/ui";
import { Plus } from "lucide-react";

<IconButton size="sm" aria-label="Add">
  <Plus />
</IconButton>
<IconButton size="md" aria-label="Add">
  <Plus />
</IconButton>
<IconButton size="lg" aria-label="Add">
  <Plus />
</IconButton>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton size="sm" aria-label="Add">
        <Plus />
      </IconButton>
      <IconButton size="md" aria-label="Add">
        <Plus />
      </IconButton>
      <IconButton size="lg" aria-label="Add">
        <Plus />
      </IconButton>
    </div>
  ),
};

/**
 * The `color` prop sets the color intent, inherited from Button. Each color
 * pairs with a foreground chosen for contrast and stays the same hue in light
 * and dark mode. Shown here with the default `solid` variant.
 */
export const AllColors: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { IconButton } from "@uhiggs/ui";
import { Star } from "lucide-react";

<IconButton color="primary" aria-label="Favorite"><Star /></IconButton>
<IconButton color="secondary" aria-label="Favorite"><Star /></IconButton>
<IconButton color="success" aria-label="Favorite"><Star /></IconButton>
<IconButton color="info" aria-label="Favorite"><Star /></IconButton>
<IconButton color="warning" aria-label="Favorite"><Star /></IconButton>
<IconButton color="danger" aria-label="Favorite"><Star /></IconButton>
<IconButton color="light" aria-label="Favorite"><Star /></IconButton>
<IconButton color="dark" aria-label="Favorite"><Star /></IconButton>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {COLORS.map((color) => (
        <IconButton key={color} color={color} aria-label={`Favorite (${color})`}>
          <Star />
        </IconButton>
      ))}
    </div>
  ),
};

/**
 * The `variant` prop sets the fill style and is independent of `color`. `solid`
 * fills the button, `outline` shows a colored border, `ghost` is transparent
 * until hover, and `link` renders as an inline text link.
 */
export const AllVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { IconButton } from "@uhiggs/ui";
import { Bell } from "lucide-react";

<IconButton variant="solid" aria-label="Notifications"><Bell /></IconButton>
<IconButton variant="outline" aria-label="Notifications"><Bell /></IconButton>
<IconButton variant="ghost" aria-label="Notifications"><Bell /></IconButton>
<IconButton variant="link" aria-label="Notifications"><Bell /></IconButton>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton variant="solid" aria-label="Notifications">
        <Bell />
      </IconButton>
      <IconButton variant="outline" aria-label="Notifications">
        <Bell />
      </IconButton>
      <IconButton variant="ghost" aria-label="Notifications">
        <Bell />
      </IconButton>
      <IconButton variant="link" aria-label="Notifications">
        <Bell />
      </IconButton>
    </div>
  ),
};

/**
 * The `shape` prop only controls the corner radius, so it combines freely with
 * any color and variant. It has no visible effect on the `link` variant.
 */
export const AllShapes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { IconButton } from "@uhiggs/ui";
import { Search } from "lucide-react";

<IconButton shape="rounded" aria-label="Search"><Search /></IconButton>
<IconButton shape="square" aria-label="Search"><Search /></IconButton>
<IconButton shape="pill" aria-label="Search"><Search /></IconButton>
<IconButton shape="pill" variant="outline" aria-label="Search"><Search /></IconButton>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton shape="rounded" aria-label="Search">
        <Search />
      </IconButton>
      <IconButton shape="square" aria-label="Search">
        <Search />
      </IconButton>
      <IconButton shape="pill" aria-label="Search">
        <Search />
      </IconButton>
      <IconButton shape="pill" variant="outline" aria-label="Search">
        <Search />
      </IconButton>
    </div>
  ),
};

/**
 * When `loading` is `true` the button is disabled and shows a centered spinner
 * in place of the icon. The square footprint is preserved, so there is no layout
 * shift. `aria-busy` is set for assistive tech.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { IconButton } from "@uhiggs/ui";
import { Check } from "lucide-react";

<IconButton loading aria-label="Saving"><Check /></IconButton>
<IconButton loading variant="outline" aria-label="Saving"><Check /></IconButton>
<IconButton loading color="danger" aria-label="Deleting"><Check /></IconButton>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton loading aria-label="Saving">
        <Check />
      </IconButton>
      <IconButton loading variant="outline" aria-label="Saving">
        <Check />
      </IconButton>
      <IconButton loading color="danger" aria-label="Deleting">
        <Check />
      </IconButton>
    </div>
  ),
};

/** A disabled icon button is non-interactive and dimmed via the `disabled` prop. */
export const Disabled: Story = {
  args: { disabled: true, children: <Trash2 />, "aria-label": "Delete" },
  parameters: {
    docs: {
      source: {
        code: `import { IconButton } from "@uhiggs/ui";
import { Trash2 } from "lucide-react";

<IconButton disabled aria-label="Delete">
  <Trash2 />
</IconButton>`,
      },
    },
  },
};
