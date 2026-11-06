import { RouterClient } from "@tanstack/react-router/ssr/client";
import { useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";
import { RouterContextSchema } from "@/lib/schemas/routerContext.schema";

type Props = {
  rootId: string;
};

// A `client:only` Astro island that renders nothing itself: it hydrates the
// HTML ReactServerEntry prerendered into #rootId with a client router. From
// then on, every <Link> is a client-side navigation.
export function ReactClientEntry({ rootId }: Props) {
  useEffect(() => {
    const rootElem = document.getElementById(rootId);
    if (!rootElem) {
      throw new Error(`root element with id: ${rootId} not found`);
    }

    const context = RouterContextSchema.partial().parse(
      window.__ROUTER_CONTEXT__,
    );

    hydrateRoot(rootElem, <RouterClient router={createRouter(context)} />);
  }, [rootId]);

  return null;
}
