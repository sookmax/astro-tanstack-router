import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchEntryOptions } from "@/lib/query-client";
import { EntryIdSchema } from "@/lib/schemas/entryParams.schema";
import { EntryNotFoundError } from "@/utils/error";
import { PageLayout } from "../../components/PageLayout";
import { EntryCard } from "../../components/EntryCard";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Route = createFileRoute("/entries/$id")({
  params: {
    // /entries/abc → not a number → the router's not-found handling
    parse: ({ id }) => ({ id: EntryIdSchema.parse(id) }),
    stringify: ({ id }) => ({ id: String(id) }),
  },
  beforeLoad: async ({ context: { queryClient }, params: { id } }) => {
    // Direct hit: entries/[id].astro filled this key at build time. Client
    // navigation (or a hover preload): fetches /api/entries/<id>.json once;
    // the "static" staleTime keeps it for the rest of the visit.
    const entry = await queryClient.query(fetchEntryOptions(id));

    // A missing entry usually never gets here — fetchEntry throws the static
    // host's 404 as EntryNotFoundError first, which ErrorFallback renders. This
    // narrows the type and covers a cached `null` from the server twin.
    if (!entry) throw EntryNotFoundError;
  },
  component: EntryPage,
});

function EntryPage() {
  const { id } = Route.useParams();
  const { data: entry } = useSuspenseQuery(fetchEntryOptions(id));
  useDocumentTitle(entry?.name ?? "Entry");

  return (
    <PageLayout>
      <Link to="/" className="self-start text-sm text-ink-muted hover:text-ink">
        ← All entries
      </Link>
      <EntryCard entry={entry} linkToEntry={false} />
    </PageLayout>
  );
}
