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
      { title: "Portfolio — Verto3D 3D Modeling & Visualization" },
      {
        name: "description",
        content:
          "Explore our portfolio of 3D modeling, product visualization, architectural rendering and industrial design projects across manufacturing, architecture and product design.",
      },
      { property: "og:title", content: "Portfolio — Verto3D 3D Modeling & Visualization" },
      {
        property: "og:description",
        content: "3D modeling, product visualization and architectural rendering portfolio from Verto3D.",
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
            <span className="text-accent">⊹</span> Our portfolio
          </p>
        </Reveal>
          <h1 className="heading-display mt-6 max-w-3xl text-5xl md:text-7xl">
            <StaggerText text="3D models that" />{" "}
            <span className="serif-accent text-accent">speak for themselves</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              A showcase of our 3D modeling, visualization and rendering work across industries — from precision industrial components to photorealistic architectural interiors.
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
