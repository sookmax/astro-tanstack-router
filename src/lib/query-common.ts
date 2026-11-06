import { QueryClient } from "@tanstack/react-query";

// Shared by the server options (query-server.ts → the seed) and the client
// options (query-client.ts → fetch the static JSON). Both build their keys from
// here, so a cache the server filled is the cache the client reads.
export const queryKeys = {
  // every entry query sits under this prefix
  entries: ["entries"],
  entryList: ["entries", "list"],
  entry: (id: number) => ["entries", "detail", id],
};

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // The data only changes with a new build, so once it's in the cache
        // there's nothing to refetch: a page's prerendered cache, or a JSON
        // file fetched on navigation, stays good for the visit.
        staleTime: "static",
        // Reads are suspense queries, which throw to the router's error
        // boundary on their own; nothing else should.
        throwOnError: false,
      },
    },
  });
}
