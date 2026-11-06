import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register the custom theme tokens from global.css, or twMerge can't tell that
// e.g. `rounded-card` and `rounded-lg` conflict.
// https://github.com/dcastil/tailwind-merge/blob/main/docs/configuration.md
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["card", "control"],
      shadow: ["card"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
