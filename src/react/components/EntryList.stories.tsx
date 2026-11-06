import type { Meta, StoryObj } from "@storybook/tanstack-react";
import type { Entry } from "@/lib/schemas/entry.schema";
import { EntryList } from "./EntryList";

const entries: Entry[] = [
  {
    id: 3,
    name: "Linus",
    body: "Hit refresh on an entry page and you get Astro's static HTML again.",
    created_at: new Date("2026-10-07T18:05:00Z"),
  },
  {
    id: 2,
    name: "Grace",
    body: "Click an entry: no full page load, just one small JSON file.",
    created_at: new Date("2026-10-03T14:40:00Z"),
  },
  {
    id: 1,
    name: "Ada",
    body: "First!",
    created_at: new Date("2026-10-01T09:12:00Z"),
  },
];

const meta = {
  title: "Entries/EntryList",
  decorators: (Story) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl flex flex-col gap-4">
        <Story />
      </div>
    </div>
  ),
  component: EntryList,
  args: {
    entries,
    emptyText: "No entries yet.",
  },
} satisfies Meta<typeof EntryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { entries: [] },
};
