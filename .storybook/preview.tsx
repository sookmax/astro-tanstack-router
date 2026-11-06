import type { Preview } from "@storybook/tanstack-react";
import { useEffect } from "react";
import "@/styles/global.css";

// Stories render presentational components only (data in as args), so no
// QueryClient is needed here; the framework itself wraps each story in a
// router, which is what <Link> needs.
const preview: Preview = {
  parameters: {
    layout: "fullscreen",
  },
  // The colour tokens use light-dark(), so flipping `color-scheme` on the root
  // (global.css reads data-theme) is the whole theme switch.
  globalTypes: {
    theme: {
      description: "Colour scheme",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;
      useEffect(() => {
        document.documentElement.dataset.theme = theme;
      }, [theme]);
      return <Story />;
    },
  ],
};

export default preview;
