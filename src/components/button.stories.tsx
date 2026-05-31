import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus } from "lucide-react";

import { Button } from "./button.js";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
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
    },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    asChild: { control: false },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Continue
        <ArrowRight />
      </>
    ),
  },
};

export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>Save changes</Button>
      <Button {...args} variant="secondary">
        Save changes
      </Button>
      <Button {...args} variant="outline">
        Save changes
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AsChildLink: Story = {
  args: { variant: "link" },
  render: (args) => (
    <Button {...args} asChild>
      <a href="https://example.com">Visit example.com</a>
    </Button>
  ),
};

/** Light and dark rendered side by side for visual review. */
export const LightAndDark: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <div className="bg-background text-foreground rounded-lg p-6">
        <Button {...args}>Light</Button>
      </div>
      <div className="dark bg-background text-foreground rounded-lg p-6">
        <Button {...args}>Dark</Button>
      </div>
    </div>
  ),
};
