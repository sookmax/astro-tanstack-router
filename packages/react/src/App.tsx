import ReactDOM from "react-dom/client";
import { RouterClient } from "@tanstack/react-router/ssr/client";
import { useEffect } from "react";
import { createRouter } from "./router";
import { AppContext } from "./AppContext";

export function StartClientApp({
  rootId,
  context,
}: {
  rootId: string;
  context: AppContext;
}) {
  useEffect(() => {
    const tsrRoot = document.getElementById(rootId);
    if (tsrRoot) {
      const router = createRouter();
      if (!location.search) {
        ReactDOM.hydrateRoot(
          tsrRoot,
          <AppContext value={context}>
            <RouterClient router={router} />
          </AppContext>,
        );
      } else {
        // https://react.dev/reference/react-dom/client/createRoot#root-render-caveats
        // "The first time you call root.render, React will clear all the existing HTML content inside the React root before rendering the React component into it."
        // By letting the client side React take over "#tsr-root" div, the hydration error is no longer thrown.
        ReactDOM.createRoot(tsrRoot).render(
          <AppContext value={context}>
            <RouterClient router={router} />
          </AppContext>,
        );
      }
    }
  }, [rootId, context]);

  return null;
}
