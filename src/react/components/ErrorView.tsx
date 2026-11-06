import { Card } from "./Card";
import { buttonVariants } from "./Button";

type Props = {
  statusCode: number;
  /** an AppError message — our own string, safe to show */
  message?: string;
};

// Pure presentation with no router dependency, so it renders in both error
// sinks: the router's ErrorFallback and the static Astro 404 page. Its
// exit is a plain <a>, which works with or without JS.
export function ErrorView({ statusCode, message }: Props) {
  const notFound = statusCode === 404;

  return (
    <Card className="flex flex-col items-start gap-3">
      <span className="rounded-full bg-fill px-2.5 py-0.5 text-xs font-medium text-ink-muted">
        {statusCode}
      </span>
      <h1 className="text-2xl font-bold">
        {notFound ? "We couldn't find that page." : "Something went wrong."}
      </h1>
      <p className="text-ink-muted">
        {notFound
          ? "The link might be wrong."
          : "That's on our end. Give it a moment and try again."}
      </p>
      {message && (
        <p className="w-full rounded-control bg-fill px-3 py-2 text-sm text-ink-faint">
          {message}
        </p>
      )}
      <a href="/" className={buttonVariants.primary}>
        Back home
      </a>
    </Card>
  );
}
