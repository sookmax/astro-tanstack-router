import * as z from "zod";
import { DateSchema } from "./common.schema";

// Client-safe: nothing here reaches the seed. Client fetch code and components
// import schemas + types from src/lib/schemas/* only; src/lib/queries/* (which
// read the seed) are server-only.
export const EntrySchema = z.object({
  id: z.number(),
  name: z.string(),
  body: z.string(),
  created_at: DateSchema,
});

export type Entry = z.infer<typeof EntrySchema>;
