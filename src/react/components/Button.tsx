import { cn } from "@/utils/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const buttonVariants = {
  primary: cn(base, "bg-accent text-accent-ink hover:opacity-90"),
  secondary: cn(base, "bg-fill text-ink hover:bg-fill-strong"),
  ghost: cn(base, "text-ink-muted hover:bg-fill hover:text-ink"),
};

type Props = React.ComponentProps<"button"> & {
  variant?: keyof typeof buttonVariants;
};

export function Button({
  variant = "secondary",
  type = "button",
  className,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={cn(buttonVariants[variant], className)}
      {...rest}
    />
  );
}
