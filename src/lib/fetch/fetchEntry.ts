import { AppError, EntryNotFoundError } from "@/utils/error";
import { EntrySchema } from "../schemas/entry.schema";
import { apiPaths } from "../apiPaths";

export async function fetchEntry(id: number) {
  const res = await fetch(apiPaths.entry(id));
  // No JSON file is generated for an unknown id, so the static host answers
  // with its 404 page — not a message worth showing.
  if (res.status === 404) throw EntryNotFoundError;
  if (!res.ok) throw await AppError.fromResponse(res);
  return EntrySchema.parse(await res.json());
}
