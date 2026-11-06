import type { Meta, StoryObj } from "@storybook/tanstack-react";
import type { Entry } from "@/lib/schemas/entry.schema";
import { EntryCard } from "./EntryCard";

const entry: Entry = {
  id: 1,
  name: "Ada",
  body: "Hello from Storybook! Components here are the same ones the app renders.",
  created_at: new Date("2026-10-26T12:00:00Z"),
};

const meta = {
  title: "Entries/EntryCard",
  decorators: (Story) => (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Story />
      </div>
    </div>
  ),
  component: EntryCard,
  args: {
    entry,
    linkToEntry: true,
  },
} satisfies Meta<typeof EntryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// in a list: the whole card links to the entry
export const Default: Story = {};

// on the entry's own page
export const DetailPage: Story = {
  args: { linkToEntry: false },
};

export const LongBody: Story = {
  args: {
    entry: {
      ...entry,
      body: "A much longer entry that wraps across several lines, to check spacing and wrapping. ".repeat(
        3,
      ),
    },
  },
};

export const LineBreaks: Story = {
  args: {
    entry: { ...entry, body: "First line.\n\nSecond paragraph." },
  },
};
