// One title format for both sides: the .astro pages put it in <title> at build
// time, and useDocumentTitle keeps it in sync on client navigation (Astro owns
// <head>, so the router can't render it there).
export function pageTitle(name?: string) {
  return name ? `${name} · Guestbook` : "Guestbook";
}
