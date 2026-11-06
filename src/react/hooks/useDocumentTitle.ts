import { useEffect } from "react";
import { pageTitle } from "@/utils/pageTitle";

// The prerendered <title> is right on a direct hit; after a client navigation
// nothing else would update it.
export function useDocumentTitle(name?: string) {
  useEffect(() => {
    document.title = pageTitle(name);
  }, [name]);
}
