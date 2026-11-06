import { tanstackRouter } from "@tanstack/router-plugin/vite";

export const tsrVitePlugin = () =>
  tanstackRouter({
    target: "react",
    autoCodeSplitting: true,
    // Code-split route components for the BROWSER only. On the server, a split
    // component is a lazy import that the plugin's dev HMR code keeps in
    // `import.meta.hot.data` across re-evaluations — and Vite's SSR module
    // runner has `import.meta.hot` too, so the server kept rendering the old
    // component after every edit (→ hydration mismatch). The server renders
    // everything up front anyway; it gains nothing from lazy chunks.
    plugin: { vite: { environmentName: "client" } },
    routesDirectory: "./src/react/routes",
    generatedRouteTree: "./src/react/routeTree.gen.ts",
  });
