import type { Entry } from "@/lib/schemas/entry.schema";
import { EntryCard } from "./EntryCard";
import { Card } from "./Card";

type Props = {
  entries: Entry[];
  emptyText: string;
};

// Presentational, like EntryCard: the route reads the query and passes the
// entries in, so Storybook can render it with plain args.
export function EntryList({ entries, emptyText }: Props) {
  if (entries.length === 0) {
    return <Card className="text-ink-muted">{emptyText}</Card>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {entries.map((entry) => (
        <li key={entry.id}>
          <EntryCard entry={entry} />
        </li>
      ))}
    </ul>
  );
}
