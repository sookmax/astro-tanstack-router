import { Link } from "@tanstack/react-router";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";
import type { Entry } from "@/lib/schemas/entry.schema";
import { Card } from "./Card";

type Props = {
  entry: Entry;
  /** make the whole card open the entry's page (lists do; the detail page doesn't) */
  linkToEntry?: boolean;
};

// Presentational: data in, nothing out — renderable in Storybook with plain
// args.
//
// The whole card is clickable via a "stretched link": a real <Link> around the
// body text whose ::after covers the card. Keyboard focus, middle-click/new
// tab, hover preloading and the accessible name (the body) all come from the
// link.
export function EntryCard({ entry, linkToEntry = true }: Props) {
  const date = formatDate(entry.created_at);

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-3",
        // the link's focus ring, drawn on the whole card
        linkToEntry &&
          "transition-shadow hover:ring-1 hover:ring-line has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent",
      )}
      data-testid="entry"
    >
      <p className="whitespace-pre-wrap wrap-break-word text-ink">
        {linkToEntry ? (
          <Link
            to="/entries/$id"
            params={{ id: entry.id }}
            className="outline-none after:absolute after:inset-0 after:rounded-card"
          >
            {entry.body}
          </Link>
        ) : (
          entry.body
        )}
      </p>

      <div className="flex items-center gap-2 text-sm text-ink-muted">
        <span className="font-medium text-ink">{entry.name}</span>
        <span aria-hidden>·</span>
        <time dateTime={entry.created_at.toISOString()}>{date}</time>
      </div>
    </Card>
  );
}
