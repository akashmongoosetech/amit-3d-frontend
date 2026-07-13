import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/site/Tilt";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className={cn("group block", className)}
    >
      <Tilt
        className={cn(
          "relative overflow-hidden rounded-3xl bg-card shadow-lg shadow-transparent transition-shadow duration-500 group-hover:shadow-accent/10",
          project.tall ? "aspect-[3/4]" : "aspect-[4/3]",
        )}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          width={1200}
          height={project.tall ? 1600 : 900}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="glass-panel pointer-events-none absolute right-4 top-4 rounded-full px-3 py-1 text-xs text-foreground opacity-0 transition-all duration-500 group-hover:opacity-100">
          {project.category}
        </span>
      </Tilt>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="heading-display text-xl transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.blurb}</p>
        </div>
        <span className="mt-1 rounded-full border border-border p-2 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-foreground group-hover:text-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
