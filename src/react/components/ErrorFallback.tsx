import type { ErrorComponentProps } from "@tanstack/react-router";
import { AppError } from "@/utils/error";
import { ErrorView } from "./ErrorView";
import { PageLayout } from "./PageLayout";

// The router's defaultErrorComponent: maps whatever was thrown (a beforeLoad,
// a suspense query) onto ErrorView. 404s come through here too — fetchEntry
// throws EntryNotFoundError — so there's no separate notFoundComponent.
export function ErrorFallback({ error }: ErrorComponentProps) {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  // Only our own AppError strings are shown; a raw error never reaches users.
  const message = error instanceof AppError ? error.message : undefined;

  return (
    <PageLayout>
      <ErrorView statusCode={statusCode} message={message} />
    </PageLayout>
  );
}
