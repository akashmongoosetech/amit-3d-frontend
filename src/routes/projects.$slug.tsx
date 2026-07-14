import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { projects } from "@/lib/data";
import { Reveal, StaggerText } from "@/components/site/Reveal";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — Verto3D" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — Verto3D Portfolio` },
        { name: "description", content: project.blurb },
        { property: "og:title", content: `${project.title} — Verto3D Portfolio` },
        { property: "og:description", content: project.blurb },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetailPage,
});

function ProjectNotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
      <h1 className="heading-display text-4xl">Project not found</h1>
      <Link
        to="/projects"
        className="btn-pill mt-6 border border-border px-6 py-3 text-sm hover:border-foreground"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>
    </div>
  );
}

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <div>
      <section className="container-site pt-40 md:pt-48">
        <Reveal>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All projects
          </Link>
        </Reveal>
        <h1 className="heading-display mt-8 max-w-4xl text-5xl md:text-7xl">
          <StaggerText text={project.title} />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            {project.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 grid gap-6 rounded-3xl border border-border bg-card/50 p-7 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Client</p>
              <p className="mt-2 text-sm">{project.client}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Year</p>
              <p className="mt-2 text-sm">{project.year}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Services</p>
              <p className="mt-2 text-sm">{project.services.join(", ")}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal className="container-site py-12 md:py-16">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src={project.image}
            alt={`${project.title} — 3D model render, ${project.category} project for ${project.client}`}
            className="w-full object-cover"
          />
        </div>
      </Reveal>

      <section className="container-site pb-16 md:pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-accent">⊹</span> The story
            </p>
          </Reveal>
          <div className="space-y-6 md:col-span-7 md:col-start-6">
            {project.body.map((para: string, i: number) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-base leading-relaxed text-foreground/85 md:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <Link to="/projects/$slug" params={{ slug: next.slug }} className="group block">
          <div className="container-site flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-24">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Next project
              </p>
              <h2 className="heading-display mt-3 text-4xl transition-colors duration-300 group-hover:text-accent md:text-6xl">
                {next.title}
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">{next.blurb}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="size-32 overflow-hidden rounded-3xl md:size-44">
                <img
                  src={next.image}
                  alt={`Next project: ${next.title}`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="rounded-full border border-border p-4 transition-all duration-300 group-hover:border-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="size-6" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      <CTASection />
    </div>
  );
}
