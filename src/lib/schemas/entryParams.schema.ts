import * as z from "zod";

// The `:id` path param of /entries/:id and /api/entries/:id.json.
export const EntryIdSchema = z.coerce.number().int().positive();
