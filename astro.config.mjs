// @ts-check
// bare package specifiers resolve via package.json exports, so only relative imports need explicit extensions under Node ESM.
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { tsrVitePlugin } from "./tsr.vite.plugin";

// https://astro.build/config
export default defineConfig({
  // Every page and JSON endpoint is prerendered at build time; there's no
  // server at runtime. `dist/` is plain files for any static host.
  output: "static",

  // TanStack Router's paths have no trailing slash (`/entries/1`); match them
  // so a direct hit and a client navigation land on the same URL.
  trailingSlash: "never",

  vite: {
    plugins: [tsrVitePlugin(), tailwindcss()],
  },

  integrations: [react()],
});
