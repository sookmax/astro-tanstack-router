// The URLs of the JSON files src/pages/api/* generate at build time. The fetch
// wrappers build their requests from here, so the two can't drift.
export const apiPaths = {
  entries: "/api/entries.json",
  entry: (id: number) => `/api/entries/${id}.json`,
};
