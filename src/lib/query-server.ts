import "@/utils/server-module";
import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "./query-common";
import { getEntries } from "./queries/getEntries";
import { getEntry } from "./queries/getEntry";

// Server twins of query-client.ts: SAME keys, but the queryFn reads the seed
// directly (at build time there's no server to fetch from). The .astro pages
// run these while prerendering, the results are dehydrated into the HTML, and
// the client options' fetch-based queryFn never runs for that page — the cache
// is already filled.

export const getEntryListOptions = queryOptions({
  queryKey: queryKeys.entryList,
  queryFn: () => getEntries(),
});

export const getEntryOptions = (id: number) =>
  queryOptions({
    queryKey: queryKeys.entry(id),
    queryFn: () => getEntry(id),
  });
