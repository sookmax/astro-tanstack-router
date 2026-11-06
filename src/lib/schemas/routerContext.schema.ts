import * as z from "zod";
import type { DehydratedState, QueryClient } from "@tanstack/react-query";
import { getQueryClient } from "../query-common";

// The router context. `queryClient` is live and never crosses the wire;
// `dehydratedQueryState` is the prerendered cache, the only field serialized
// into the page (ReactServerEntry.astro).
export const RouterContextSchema = z.object({
  queryClient: z.custom<QueryClient>(),
  dehydratedQueryState: z.custom<DehydratedState>().nullable(),
});

export type RouterContext = z.infer<typeof RouterContextSchema>;

export function getInitialRouterContext(): RouterContext {
  return {
    queryClient: getQueryClient(),
    dehydratedQueryState: null,
  };
}
