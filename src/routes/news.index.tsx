import { createFileRoute } from "@tanstack/react-router";

import { articles } from "@/lib/data";
import { Reveal, StaggerText } from "@/components/site/Reveal";
import { NewsCard } from "@/components/site/NewsCard";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "Insights — Verto3D 3D Modeling & Visualization" },
      {
        name: "description",
        content:
          "Industry insights, technical guides and expert takes on 3D modeling, product visualization, architectural rendering and CGI from Verto3D.",
      },
      { property: "og:title", content: "Insights — Verto3D 3D Modeling & Visualization" },
      {
        property: "og:description",
        content: "Thought leadership, trends and technical guides from the Verto3D team.",
      },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [featured, ...rest] = articles;

  return (
    <div>
      <section className="container-site pt-40 md:pt-48">
        <Reveal>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-accent">⊹</span> Latest insights
          </p>
        </Reveal>
        <h1 className="heading-display mt-6 max-w-3xl text-5xl md:text-7xl">
          <StaggerText text="Industry insights," />{" "}
          <span className="serif-accent text-accent">expert takes</span>
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Thought leadership, technical guides and trends from the Verto3D team.
          </p>
        </Reveal>
      </section>

      <section className="container-site py-16 md:py-24">
        <Reveal>
          <NewsCard article={featured} className="[&>div:first-child]:aspect-[2/1]" />
        </Reveal>
        <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.08}>
              <NewsCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
