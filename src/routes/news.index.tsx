import { createFileRoute } from "@tanstack/react-router";

import { articles } from "@/lib/data";
import { Reveal, StaggerText } from "@/components/site/Reveal";
import { NewsCard } from "@/components/site/NewsCard";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News — Lumera Creative Studio" },
      {
        name: "description",
        content: "Fresh reads and sharp takes — stories, ideas and updates from Lumera Studio.",
      },
      { property: "og:title", content: "News — Lumera Creative Studio" },
      {
        property: "og:description",
        content: "Stories, ideas and updates from our world.",
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
            <span className="text-accent">⊹</span> Latest news
          </p>
        </Reveal>
        <h1 className="heading-display mt-6 max-w-3xl text-5xl md:text-7xl">
          <StaggerText text="Fresh reads," />{" "}
          <span className="serif-accent text-accent">sharp takes</span>
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Stories, ideas and updates from our world.
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
