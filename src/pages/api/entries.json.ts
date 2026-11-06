import type { APIRoute } from "astro";
import { getEntries } from "@/lib/queries/getEntries";

// Generated at build time into dist/api/entries.json — what fetchEntries()
// reads on client navigation. Dates serialize as ISO strings; EntrySchema
// turns them back into Dates.
export const GET: APIRoute = async () => {
  return Response.json(await getEntries());
};
