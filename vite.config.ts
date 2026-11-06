// Not used by Astro (it builds from astro.config.mjs). This is the plain Vite
// config for Storybook, which runs its own Vite (@storybook/tanstack-react
// picks it up).
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { tsrVitePlugin } from "./tsr.vite.plugin.ts";

export default defineConfig({
  resolve: {
    // `@/*` from tsconfig.json
    tsconfigPaths: true,
  },
  plugins: [
    // must come before @vitejs/plugin-react
    tsrVitePlugin(),
    react(),
    tailwindcss(),
  ],
});
