import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  slow,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-8",
          slow ? "animate-marquee-slow" : "animate-marquee",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
