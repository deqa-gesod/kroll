import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  width?: "narrow" | "default" | "wide" | "full";
};

const widths: Record<NonNullable<ContainerProps["width"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[1440px]",
  full: "max-w-none",
};

export function Container({
  children,
  className,
  width = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto px-6 md:px-10", widths[width], className)}>
      {children}
    </div>
  );
}
