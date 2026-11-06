import type { APIRoute, GetStaticPaths } from "astro";
import { getEntries } from "@/lib/queries/getEntries";

// One dist/api/entries/<id>.json per seed entry — what fetchEntry() reads on
// client navigation. Unknown ids get no file, so the static host answers 404.
export const getStaticPaths = (async () => {
  const entries = await getEntries();
  return entries.map((entry) => ({
    params: { id: String(entry.id) },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<
  Awaited<ReturnType<typeof getStaticPaths>>[number]["props"]
> = ({ props }) => {
  return Response.json(props.entry);
};
