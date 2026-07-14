import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import studioTeam from "@/assets/studio-team.jpg";
import { process, team, values, stats } from "@/lib/data";
import { Reveal, StaggerText } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Verto3D 3D Modeling & Visualization" },
      {
        name: "description",
        content:
          "Meet the team, values and process behind Verto3D — a professional 3D modeling studio serving manufacturing, architecture and engineering clients.",
      },
      { property: "og:title", content: "Studio — Verto3D 3D Modeling & Visualization" },
      {
        property: "og:description",
        content: "The team, values and process behind Verto3D.",
      },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <div>
      <section className="noise-overlay relative overflow-hidden pt-40 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-[-10%] size-[30rem] rounded-full bg-accent/10 blur-[140px]"
        />
        <div className="container-site pb-16 md:pb-24">
          <Reveal>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-accent">⊹</span> The studio
            </p>
          </Reveal>
          <h1 className="heading-display mt-6 max-w-4xl text-5xl md:text-7xl">
            <StaggerText text="A team of 3D specialists" />{" "}
            <span className="serif-accent text-accent">with industrial experience</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
              Since 2018 we've been delivering precision 3D models, photorealistic visualizations
              and industrial-grade digital assets to clients across manufacturing, architecture,
              automotive and product design.
            </p>
          </Reveal>
        </div>
        <Reveal className="container-site pb-16 md:pb-24">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={studioTeam}
              alt="Verto3D team reviewing a 3D model on screen in a modern studio workspace"
              width={1280}
              height={853}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-accent">⊹</span> Our story
            </p>
            <h2 className="heading-display mt-4 text-4xl md:text-5xl">
              From engineering roots to <span className="serif-accent text-accent">global reach</span>
            </h2>
          </Reveal>
          <Reveal
            delay={0.15}
            className="space-y-5 text-muted-foreground md:col-span-6 md:col-start-7"
          >
            <p className="leading-relaxed">
              Verto3D started with a simple observation: most product development teams waste weeks
              on physical prototypes and reshoots because the 3D assets they need don't exist yet.
              We set out to change that — building a studio where engineering precision meets visual
              excellence.
            </p>
            <p className="leading-relaxed">
              Today we're a distributed team of 3D specialists, CAD engineers and CGI artists
              working across industrial design, architectural visualization and product rendering.
              No account layers, no junior-only workflows. The people who scope the work do the work.
            </p>
            <p className="leading-relaxed">
              We keep our roster focused — partnering with a select number of clients at a time —
              so every project receives the technical attention and creative care it deserves.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-card/30 py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            tag="Values"
            title={
              <>
                What drives <span className="serif-accent text-accent">us</span>
              </>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.1}>
                <div className="h-full rounded-3xl border border-border bg-card/50 p-8">
                  <p className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="heading-display mt-3 text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <SectionHeading
          tag="Team"
          title={
            <>
              The people behind <span className="serif-accent text-accent">the models</span>
            </>
          }
          description="Experienced 3D artists, engineers and project managers. Everyone you meet ships work."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="group rounded-3xl border border-border bg-card/50 p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-foreground/30">
                <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-border bg-secondary">
                  <span className="heading-display text-xl text-accent">{m.initials}</span>
                </div>
                <h3 className="heading-display mt-5 text-xl">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="process" className="border-y border-border bg-card/30 py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            tag="Process"
            title={
              <>
                Clear and <span className="serif-accent text-accent">intentional</span>
              </>
            }
            description="From initial brief to final delivery — every step is planned and executed with precision."
          />
          <div className="space-y-16">
            {process.map((phase) => (
              <div key={phase.phase} className="grid gap-8 md:grid-cols-12">
                <Reveal className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <p className="heading-display text-6xl text-foreground/15">{phase.number}</p>
                    <h3 className="heading-display mt-2 text-3xl">{phase.phase}</h3>
                  </div>
                </Reveal>
                <div className="space-y-6 md:col-span-7 md:col-start-6">
                  {phase.steps.map((step, i) => (
                    <Reveal key={step.title} delay={i * 0.08}>
                      <div className="rounded-3xl border border-border bg-card/50 p-7">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="heading-display text-lg">{step.title}</h4>
                          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                            {step.duration}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {step.text}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="bg-background p-8">
              <Reveal delay={i * 0.08}>
                <p className="heading-display text-5xl">
                  <Counter
                    value={s.value}
                    prefix={s.prefix ?? ""}
                    suffix={(s.suffixWord ?? "") + s.suffix}
                  />
                </p>
                <h3 className="mt-3 text-sm font-medium">{s.label}</h3>
              </Reveal>
            </div>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link
            to="/contact"
            className="btn-pill bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Start a project <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <CTASection />
    </div>
  );
}
