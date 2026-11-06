import "@/utils/server-module";
import { getEntries } from "./getEntries";

export async function getEntry(id: number) {
  const entries = await getEntries();
  return entries.find((entry) => entry.id === id) ?? null;
}
