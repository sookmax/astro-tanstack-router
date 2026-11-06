import { lazy, Suspense, useEffect, useState } from "react";
import { useHydrated } from "../hooks/useHydrated";

// Dev only. `import.meta.env.PROD` is replaced with `true` in the production
// build, so the lazy imports are dead code and the devtools packages never
// reach either bundle (which is why they're devDependencies).
const RouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-router-devtools").then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    );

const QueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-query-devtools").then((m) => ({
        default: m.ReactQueryDevtools,
      })),
    );

export function DevTools() {
  // client-only, so the SSR markup never includes them (no hydration mismatch)
  const isHydrated = useHydrated();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // @ts-expect-error only used in browser devtools console
    window.toggleDevTools = () => {
      setShow((show) => !show);
    };

    return () => {
      // @ts-expect-error only used in browser devtools console
      delete window.toggleDevTools;
    };
  }, []);

  if (!isHydrated || !show) return null;

  return (
    <Suspense fallback={null}>
      <RouterDevtools position="bottom-left" />
      <QueryDevtools buttonPosition="bottom-right" />
    </Suspense>
  );
}
