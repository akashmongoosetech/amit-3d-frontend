import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useRef } from "react";

import heroPortrait from "@/assets/hero-portrait.jpg";
import { projects, services, testimonials, stats, articles } from "@/lib/data";
import { Reveal, StaggerText } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { Counter } from "@/components/site/Counter";
import { ProjectCard } from "@/components/site/ProjectCard";
import { NewsCard } from "@/components/site/NewsCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PricingSection } from "@/components/site/PricingSection";
import { CTASection } from "@/components/site/CTASection";
import { FAQ } from "@/components/site/FAQ";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verto3D — Professional 3D Modeling & Visualization Studio" },
      {
        name: "description",
        content:
          "Industry-grade 3D modeling, product visualization, architectural rendering and industrial design services. Photorealistic 3D assets for manufacturing, architecture and e-commerce.",
      },
      { property: "og:title", content: "Verto3D — 3D Modeling & Visualization Studio" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroPortrait },
      { name: "twitter:image", content: heroPortrait },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroPortrait, fetchPriority: "high" },
    ],
  }),
  component: Index,
});

const disciplines = [
  "3D Product Modeling",
  "Architectural Visualization",
  "Industrial Design",
  "CGI Animation",
  "CAD Engineering",
  "Digital Twins",
];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="noise-overlay relative overflow-hidden pt-36 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-accent/10 blur-[140px]"
      />
      <div className="container-site grid items-end gap-12 pb-16 md:grid-cols-12 md:pb-24">
        <motion.div style={{ y: textY }} className="md:col-span-7">
          <Reveal>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {disciplines.slice(0, 4).map((d) => (
                <span key={d}>{d}</span>
              ))}
            </p>
          </Reveal>
          <h1 className="heading-display mt-6 text-5xl sm:text-7xl lg:text-8xl">
            <StaggerText text="Precision 3D modeling" />
            <br />
            <span className="serif-accent text-accent">for every industry</span>
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              From product design to architectural visualization — we create photorealistic 3D
              assets that accelerate development, reduce costs and elevate your brand.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/pricing"
                className="btn-pill bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                View plans
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                to="/projects"
                className="btn-pill border border-border px-7 py-3.5 text-sm hover:border-foreground"
              >
                View work
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-14 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <ArrowDown className="size-4 animate-bounce" /> Scroll
              </span>
              <span className="h-px flex-1 bg-border" />
              <span>
                500+ <span className="opacity-60">projects delivered</span>
              </span>
            </div>
          </Reveal>
        </motion.div>

        <motion.div style={{ y: imageY }} className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem]"
          >
            <img
              // src={heroPortrait}
              src={heroPortrait}
              alt="Photorealistic 3D product render — a precision-modeled component on studio lighting"
              width={896}
              height={1280}
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 768px) 42vw, 100vw"
              className="aspect-[3/4] w-full object-cover"
            />

            <div className="glass-panel absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl px-5 py-4">
              <div>
                <p className="text-sm font-medium">Featured projects</p>
                <p className="text-xs text-muted-foreground">Industrial · Architecture · Product</p>
              </div>
              <Link
                to="/projects"
                aria-label="View our portfolio"
                className="rounded-full bg-primary p-2.5 text-primary-foreground transition-transform duration-300 hover:scale-110"
              >
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="border-y border-border py-5">
        <Marquee slow>
          {disciplines.map((d) => (
            <span
              key={d}
              className="heading-display flex items-center gap-8 whitespace-nowrap text-2xl text-foreground/60"
            >
              {d} <span className="text-accent">⊹</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="container-site py-20 md:py-32">
      <Reveal>
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-accent">⊹</span> Trusted by industry leaders
        </p>
      </Reveal>
      <h2 className="heading-display mt-6 max-w-4xl text-3xl leading-tight md:text-5xl">
        <StaggerText text="We help businesses bring products to market faster with precision 3D assets that engineering and marketing teams both trust." />
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <Reveal className="rounded-3xl border border-border bg-card/50 p-8">
          <p className="heading-display text-5xl text-accent">
            <Counter value={40} suffix="%" />
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Average reduction in product development cycles using our 3D models
          </p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-3xl border border-border bg-card/50 p-8">
          <p className="heading-display text-5xl text-accent">
            <Counter value={98} suffix="%" />
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Client satisfaction rate across 500+ completed projects
          </p>
        </Reveal>
        <Reveal delay={0.2} className="rounded-3xl border border-border bg-card/50 p-8">
          <p className="text-sm italic leading-relaxed text-foreground/90">
            "They didn't just make our product look good — every polygon had a purpose, and the
            models were manufacturing-ready straight out of review."
          </p>
          <p className="mt-4 text-sm font-medium">Taylor Reyes</p>
          <p className="text-xs text-muted-foreground">Director of Product, Contour Works</p>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHeading
        tag="Portfolio"
        title={
          <>
            Featured <span className="serif-accent text-accent">projects</span>
          </>
        }
        description="A selection of our 3D modeling and visualization work across industries."
        action={
          <Link
            to="/projects"
            className="btn-pill border border-border px-6 py-3 text-sm hover:border-foreground"
          >
            More projects <ArrowUpRight className="size-4" />
          </Link>
        }
      />
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="border-y border-border bg-card/30 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="Services"
          title="Comprehensive 3D services for every industry"
          action={
            <Link
              to="/pricing"
              className="btn-pill border border-border px-6 py-3 text-sm hover:border-foreground"
            >
              View plans <ArrowUpRight className="size-4" />
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.1}>
              <div className="group h-full rounded-3xl border border-border bg-card/50 p-8 transition-colors duration-500 hover:border-foreground/30 md:p-10">
                <h3 className="heading-display text-2xl md:text-3xl">{s.title}</h3>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors duration-300 group-hover:border-foreground/20"
                    >
                      <span className="mr-1.5 text-accent">⊹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="Clients"
          title={
            <>
              Real words from <span className="serif-accent text-accent">real partners</span>
            </>
          }
          description="Honest feedback, lasting impact — from the people we've worked with."
        />
      </div>
      <div className="space-y-6">
        {[testimonials.slice(0, 3), testimonials.slice(3)].map((row, r) => (
          <Marquee key={r} slow={r === 1}>
            {row.map((t) => (
              <figure
                key={t.name}
                className="w-[22rem] shrink-0 rounded-3xl border border-border bg-card/50 p-7 sm:w-[26rem]"
              >
                <blockquote>
                  <p className="heading-display text-lg leading-snug">"{t.quote}"</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHeading
        tag="Stats & facts"
        title={
          <>
            Results in <span className="serif-accent text-accent">numbers</span>
          </>
        }
        description="Quality, precision and speed — measured and delivered."
      />
      <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className="bg-background p-8">
            <Reveal delay={i * 0.08}>
              <p className="heading-display text-5xl md:text-6xl">
                <Counter
                  value={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={(s.suffixWord ?? "") + s.suffix}
                />
              </p>
              <h3 className="mt-4 text-base font-medium">{s.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsPreview() {
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHeading
        tag="Latest insights"
        title={
          <>
            Industry insights, <span className="serif-accent text-accent">expert takes</span>
          </>
        }
        description="Thought leadership, trends and technical guides from our team."
        action={
          <Link
            to="/news"
            className="btn-pill border border-border px-6 py-3 text-sm hover:border-foreground"
          >
            More news <ArrowUpRight className="size-4" />
          </Link>
        }
      />
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
        {articles.slice(0, 3).map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.08}>
            <NewsCard article={a} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Index() {
  return (
    <div>
      <Hero />
      <About />
      <FeaturedProjects />
      <Services />
      <section id="pricing" className="container-site py-20 md:py-28">
        <SectionHeading
          center
          tag="Pricing"
          title={
            <>
              Flexible <span className="serif-accent text-accent">plans</span>
            </>
          }
          description="Flexible 3D modeling packages designed to scale with your business — from startups to enterprise."
        />
        <PricingSection />
      </section>
      <Testimonials />
      <Stats />
      <section className="container-site py-20 md:py-28">
        <SectionHeading
          tag="FAQ"
          title={
            <>
              Questions, <span className="serif-accent text-accent">answered</span>
            </>
          }
          description="Quick answers about our 3D modeling services, process and delivery."
        />
        <FAQ />
      </section>
      <NewsPreview />
      <CTASection />
    </div>
  );
}
