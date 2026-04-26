// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
    // https://github.com/withastro/astro/issues/15857
    optimizeDeps: {
      exclude: ["astro/runtime/client/dev-toolbar/entrypoint.js"],
    },
  },
  integrations: [react()],
});
