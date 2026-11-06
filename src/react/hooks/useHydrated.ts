import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false during SSR and the hydration render, true after — without a
// setState-in-effect re-render: React uses the server snapshot while
// hydrating, then the client one.
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
