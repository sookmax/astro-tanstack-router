import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchEntryListOptions } from "@/lib/query-client";
import { PageLayout } from "../components/PageLayout";
import { EntryList } from "../components/EntryList";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context: { queryClient } }) => {
    // Direct hit: index.astro already ran the SERVER twin of these options
    // (same key) at build time and the cache came down with the HTML, so this
    // resolves from it without a request. Client navigation: a plain query()
    // fetches /api/entries.json when the cache is missing, and the router
    // shows the pending overlay meanwhile.
    await queryClient.query(fetchEntryListOptions);
  },
  component: Home,
});

function Home() {
  const { data: entries } = useSuspenseQuery(fetchEntryListOptions);
  useDocumentTitle();

  return (
    <PageLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Guestbook</h1>
        <p className="text-sm text-ink-muted">
          Prerendered by Astro, navigated by TanStack Router. Open an entry — no
          full page load.
        </p>
      </div>
      <EntryList entries={entries} emptyText="No entries yet." />
    </PageLayout>
  );
}
