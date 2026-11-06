import type { StorybookConfig } from "@storybook/tanstack-react";

// Storybook runs its own Vite, configured by the root vite.config.ts (Tailwind,
// the `@/*` alias, the router plugin) — not by astro.config.mjs.
const config: StorybookConfig = {
  stories: ["../src/react/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: "@storybook/tanstack-react",
};

export default config;
