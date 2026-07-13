import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { projects } from "@/lib/data";
import { Reveal, StaggerText } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CTASection } from "@/components/site/CTASection";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Lumera Creative Studio" },
      {
        name: "description",
        content:
          "Selected brand identity, campaign, packaging and product design work from Lumera Studio.",
      },
      { property: "og:title", content: "Projects — Lumera Creative Studio" },
      {
        property: "og:description",
        content: "Selected work across brand identity, campaigns, packaging and product design.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <section className="container-site pt-40 md:pt-48">
        <Reveal>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-accent">⊹</span> Selected work
          </p>
        </Reveal>
        <h1 className="heading-display mt-6 max-w-3xl text-5xl md:text-7xl">
          <StaggerText text="Work that earns" />{" "}
          <span className="serif-accent text-accent">attention</span>
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            The story behind the story — told in images that capture how it all came together.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm transition-all duration-300",
                  active === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
