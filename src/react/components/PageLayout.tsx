import { cn } from "@/utils/cn";

export function PageLayout({
  className,
  ...rest
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-xl grow px-4 py-6 flex flex-col gap-4",
        className,
      )}
      {...rest}
    />
  );
}
