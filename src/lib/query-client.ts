import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "./query-common";
import { fetchEntries } from "./fetch/fetchEntries";
import { fetchEntry } from "./fetch/fetchEntry";

// Browser twins of query-server.ts: same keys, the queryFn fetches the static
// JSON endpoints. The routes' beforeLoad and components use these; on a direct
// hit they're satisfied by the prerendered cache, on client navigation they
// fetch.
//
// Keep observer-only options (refetchOnWindowFocus, placeholderData, …) out of
// these: they're also passed to queryClient.query() in beforeLoad, which
// doesn't accept them. Add those at the useQuery call site instead.

export const fetchEntryListOptions = queryOptions({
  queryKey: queryKeys.entryList,
  queryFn: () => fetchEntries(),
});

export const fetchEntryOptions = (id: number) =>
  queryOptions({
    queryKey: queryKeys.entry(id),
    queryFn: () => fetchEntry(id),
  });
