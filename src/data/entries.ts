// The guestbook's only data source: a seed baked in at build time. Read on the
// server only (src/lib/queries/*) — by the prerendered pages and the static
// JSON endpoints in src/pages/api. The browser gets entries from those JSON
// files, so this module never reaches the client bundle.
//
// `created_at` is an ISO string, as it would be in JSON; EntrySchema decodes it
// into a Date on both sides.
export const seedEntries = [
  {
    id: 1,
    name: "Ada",
    body: "First! Every page here was prerendered by Astro at build time — view source and the HTML is all there.",
    created_at: "2026-10-01T09:12:00Z",
  },
  {
    id: 2,
    name: "Grace",
    body: "Click an entry and watch the network tab: no full page load, just one small JSON file.",
    created_at: "2026-10-03T14:40:00Z",
  },
  {
    id: 3,
    name: "Linus",
    body: "Hit refresh on an entry page and you get Astro's static HTML again; the router hydrates on top of it.",
    created_at: "2026-10-07T18:05:00Z",
  },
  {
    id: 4,
    name: "Margaret",
    body: "No server, no database, no auth. Just files on a CDN that behave like an app.",
    created_at: "2026-10-12T07:30:00Z",
  },
  {
    id: 5,
    name: "Alan",
    body: "Hover a card and the router preloads its entry before you even click.",
    created_at: "2026-10-18T21:47:00Z",
  },
  {
    id: 6,
    name: "Barbara",
    body: "A longer entry, to see how the cards wrap.\n\nIt keeps its line breaks, too: the body renders with whitespace-pre-wrap on both the list and the detail page.",
    created_at: "2026-10-24T11:15:00Z",
  },
  {
    id: 7,
    name: "Dennis",
    body: "Back button, forward button, all client-side. 👋",
    created_at: "2026-10-30T16:20:00Z",
  },
];
