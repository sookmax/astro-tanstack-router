import { AppError } from "@/utils/error";
import { EntrySchema } from "../schemas/entry.schema";
import { apiPaths } from "../apiPaths";

export async function fetchEntries() {
  const res = await fetch(apiPaths.entries);
  if (!res.ok) throw await AppError.fromResponse(res);
  return EntrySchema.array().parse(await res.json());
}
