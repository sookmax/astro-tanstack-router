import "@/utils/server-module";
import { seedEntries } from "@/data/entries";
import { EntrySchema } from "../schemas/entry.schema";

// The seed, decoded and newest first. Read at build time by the prerendered
// pages (through query-server.ts) and by the JSON endpoints in src/pages/api.
const entries = EntrySchema.array()
  .parse(seedEntries)
  .toSorted((a, b) => b.created_at.getTime() - a.created_at.getTime());

export async function getEntries() {
  return entries;
}
