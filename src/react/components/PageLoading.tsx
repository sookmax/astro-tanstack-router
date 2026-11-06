import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { Spinner } from "./Spinner";

type Props = React.ComponentProps<"output">;

// Two jobs: the SSR hydration overlay (rendered by ReactServerEntry with the
// ssrLoadingIndicator id) and the router's defaultPendingComponent on client
// navigation. In the browser it portals to <body>, so it covers the page
// instead of collapsing the route's slot. An <output> is a live status region
// (implicit role="status"), so screen readers hear "Loading".
export function PageLoading({ className, ...rest }: Props) {
  const overlay = (
    <output
      aria-label="Loading"
      className={cn("fixed inset-0 z-50 bg-black/20", className)}
      {...rest}
    >
      <Spinner className="size-9 absolute top-1/2 left-1/2 -translate-1/2" />
    </output>
  );

  return import.meta.env.SSR ? overlay : createPortal(overlay, document.body);
}
