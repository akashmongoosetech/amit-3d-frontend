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
      { title: "Lumera — Creative Studio for Founders" },
      {
        name: "description",
        content:
          "Brand identity, product design and digital experiences that drive conversion for founders. Selected work, pricing, and studio news from Lumera.",
      },
      { property: "og:title", content: "Lumera — Creative Studio for Founders" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroPortrait },
      { name: "twitter:image", content: heroPortrait },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroPortrait, fetchpriority: "high" },
    ],
  }),
  component: Index,
});

const disciplines = [
  "Product design",
  "Content strategy",
  "Brand identity",
  "Front-end development",
  "Art direction",
  "Motion design",
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
            <StaggerText text="Creative studio" />
            <br />
            <span className="serif-accent text-accent">for founders</span>
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              We partner with brands to create digital design that drives conversion and commands
              attention.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/pricing"
                className="btn-pill bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                See pricing
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
                95+ <span className="opacity-60">clients worldwide</span>
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
              src={heroPortrait}
              alt="Editorial portrait from a Lumera brand campaign"
              width={896}
              height={1280}
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 768px) 42vw, 100vw"
              className="aspect-[3/4] w-full object-cover"
            />

            <div className="glass-panel absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl px-5 py-4">
              <div>
                <p className="text-sm font-medium">Selected work</p>
                <p className="text-xs text-muted-foreground">2018 — 2026</p>
              </div>
              <Link
                to="/projects"
                aria-label="View selected work"
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
        <StaggerText text="We help brands grow with strategic design that's thoughtful, visually bold, and built to make an impression." />
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <Reveal className="rounded-3xl border border-border bg-card/50 p-8">
          <p className="heading-display text-5xl text-accent">
            <Counter value={40} suffix="%" />
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Average increase in conversions across our client projects
          </p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-3xl border border-border bg-card/50 p-8">
          <p className="heading-display text-5xl text-accent">
            <Counter value={12} prefix="₹" suffix="M" />
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Raised by the brands we've partnered with
          </p>
        </Reveal>
        <Reveal delay={0.2} className="rounded-3xl border border-border bg-card/50 p-8">
          <p className="text-sm italic leading-relaxed text-foreground/90">
            "Thoughtful digital experiences, strong brand identities, and opportunities that drive
            real results."
          </p>
          <p className="mt-4 text-sm font-medium">Akash Raikwar</p>
          <p className="text-xs text-muted-foreground">CEO, Fieldnote</p>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHeading
        tag="Latest projects"
        title={
          <>
            Latest <span className="serif-accent text-accent">projects</span>
          </>
        }
        description="This is the story behind the story — told in images that capture how it all came together."
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
          title="Built to help founders grow smarter and move faster"
          action={
            <Link
              to="/pricing"
              className="btn-pill border border-border px-6 py-3 text-sm hover:border-foreground"
            >
              See pricing <ArrowUpRight className="size-4" />
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
            Proof in <span className="serif-accent text-accent">numbers</span>
          </>
        }
        description="Because good design should perform."
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
        tag="Latest news"
        title={
          <>
            Fresh reads, <span className="serif-accent text-accent">sharp takes</span>
          </>
        }
        description="Stories, ideas and updates from our world."
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
          description="Tailored plans designed to scale with you — whether you're starting out or growing fast."
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
          description="Quick answers about working with us and our approach."
        />
        <FAQ />
      </section>
      <NewsPreview />
      <CTASection />
    </div>
  );
}
