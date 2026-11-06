import { cn } from "@/utils/cn";

const defaultCardStyle = cn("rounded-card bg-card shadow-card p-5 sm:p-6");

export function Card({ className, ...rest }: React.ComponentProps<"div">) {
  return <div className={cn(defaultCardStyle, className)} {...rest} />;
}

export function CardButton({
  className,
  ...rest
}: React.ComponentProps<"button">) {
  return <button className={cn(defaultCardStyle, className)} {...rest} />;
}
