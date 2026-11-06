import { Link } from "@tanstack/react-router";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b border-line bg-card">
        <nav className="mx-auto max-w-xl px-4 h-14 flex items-center gap-1">
          <Link to="/" className="mr-auto font-bold text-ink">
            Guestbook
          </Link>
          <a
            href="https://github.com/sookmax/astro-tanstack-router"
            className="rounded-control px-2.5 py-1.5 text-sm text-ink-muted hover:bg-fill hover:text-ink"
          >
            GitHub
          </a>
        </nav>
      </header>
      {children}
    </div>
  );
}
