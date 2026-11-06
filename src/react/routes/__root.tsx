import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ssrLoadingIndicator } from "@/utils/ssrLoadingIndicator";
import type { RouterContext } from "@/lib/schemas/routerContext.schema";
import { AppLayout } from "../components/AppLayout";
import { DevTools } from "../components/DevTools";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  // The QueryClient comes from the router context: rebuilt on each side,
  // never serialized (a live QueryClient can't be).
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    ssrLoadingIndicator.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Outlet />
      </AppLayout>
      <DevTools />
    </QueryClientProvider>
  );
}
