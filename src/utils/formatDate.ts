// Rendered on the server AND re-rendered during hydration, so the output must
// not depend on where it runs: a fixed locale and time zone. (A viewer-local
// time would differ between the server's zone and the browser's → a
// hydration mismatch.)
const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function formatDate(date: Date) {
  return `${formatter.format(date)} UTC`;
}
