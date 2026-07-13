import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  tag,
  title,
  description,
  action,
  center,
}: {
  tag: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-16",
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <Reveal>
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-accent">⊹</span> {tag}
        </p>
        <h2 className="heading-display mt-4 max-w-2xl text-4xl md:text-5xl">{title}</h2>
        {description && (
          <p className={cn("mt-4 max-w-md text-sm leading-relaxed text-muted-foreground")}>
            {description}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={0.15}>{action}</Reveal>}
    </div>
  );
}
