import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { ErrorView } from "./ErrorView";

const meta = {
  title: "Errors/ErrorView",
  decorators: (Story) => (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <Story />
      </div>
    </div>
  ),
  component: ErrorView,
} satisfies Meta<typeof ErrorView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
  args: { statusCode: 404, message: "Entry not found" },
};

export const ServerError: Story = {
  args: { statusCode: 500 },
};
