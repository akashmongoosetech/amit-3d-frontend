import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Plus, Star } from "lucide-react";
import { useState } from "react";

import { Reveal, StaggerText } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTASection } from "@/components/site/CTASection";
import { cn } from "@/lib/utils";
import {
  featuredProducts,
  trendingProducts,
  whyChooseUs,
  materials,
  customerProjects,
  productsFaqs,
  process,
} from "@/lib/data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      {
        title: "3D Models & Products — Verto3D Premium 3D Modeling Services",
      },
      {
        name: "description",
        content:
          "Explore premium custom 3D models for architecture, products, industrial parts, prototypes and more. Browse categories, materials and customer projects.",
      },
      {
        property: "og:title",
        content: "3D Models & Products — Verto3D",
      },
      {
        property: "og:description",
        content:
          "Browse our catalog of premium 3D models across 19 categories. All models available for custom order.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div>
      <Hero />
      <FeaturedModels />
      <TrendingModels />
      <WhyChooseUs />
      <MaterialsSection />
      <GallerySection />
      <CustomerShowcase />
      <ProcessSection />
      <FaqSection />
      <CTASection />
    </div>
  );
}

/* ─── Hero ─── */

function Hero() {
  return (
    <section className="noise-overlay relative overflow-hidden pt-40 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-accent/10 blur-[140px]"
      />
      <div className="container-site pb-16 md:pb-24">
        <Reveal>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-accent">⊹</span> Premium 3D Models
          </p>
        </Reveal>
        <h1 className="heading-display mt-6 max-w-4xl text-5xl md:text-7xl">
          <StaggerText text="Explore premium custom" />{" "}
          <span className="serif-accent text-accent">3D models</span>
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
            High-quality 3D models for architecture, products, industrial parts, prototypes, gifts
            and more. Every model is built to your exact specifications by experienced 3D
            professionals.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/book-model"
              className="btn-pill bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Order Now
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="btn-pill border border-border px-7 py-3.5 text-sm hover:border-foreground"
            >
              Request a Quote
            </Link>
          </div>
        </Reveal>
      </div>
      <Reveal className="container-site pb-16 md:pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "https://picsum.photos/seed/hero-1/800/500",
            "https://picsum.photos/seed/hero-2/800/500",
            "https://picsum.photos/seed/hero-3/800/500",
          ].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={cn("overflow-hidden rounded-2xl", i === 1 && "sm:mt-12")}
            >
              <img
                src={src}
                alt=""
                width={800}
                height={500}
                className="aspect-[16/10] w-full object-cover"
                loading={i > 0 ? "lazy" : "eager"}
              />
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Featured Models ─── */

function FeaturedModels() {
  return (
    <section className="border-y border-border bg-card/30 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="Featured Models"
          title={
            <>
              Premium <span className="serif-accent text-accent">featured models</span>
            </>
          }
          description="Our most popular 3D models — production-ready and fully customizable."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <div className="group h-full overflow-hidden rounded-3xl border border-border bg-card/50 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-xl hover:shadow-black/10">
                <div className="overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    width={800}
                    height={900}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {p.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-accent">
                      <Star className="size-3 fill-accent" /> {p.rating}
                    </span>
                  </div>
                  <h3 className="heading-display mt-3 text-xl">{p.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Size:</span> {p.size}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Material:</span> {p.material}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Production:</span>{" "}
                      {p.productionTime}
                    </p>
                  </div>
                  <p className="mt-4 heading-display text-accent">
                    ${p.startingPrice.toLocaleString()}+
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      to="/book-model"
                      className="btn-pill bg-primary px-5 py-2.5 text-xs text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      Request Quote
                    </Link>
                    <button
                      onClick={() =>
                        document
                          .getElementById("booking-form")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="btn-pill border border-border px-5 py-2.5 text-xs hover:border-foreground"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Trending Models ─── */

function TrendingModels() {
  const [quickView, setQuickView] = useState<string | null>(null);

  return (
    <section className="border-y border-border bg-card/30 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="Trending"
          title={
            <>
              Trending <span className="serif-accent text-accent">right now</span>
            </>
          }
          description="The most popular 3D models being ordered this month."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingProducts.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <div
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/50 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-xl"
                onMouseEnter={() => setQuickView(p.id)}
                onMouseLeave={() => setQuickView(null)}
              >
                <div className="relative overflow-hidden">
                  {p.badge && (
                    <span
                      className={cn(
                        "absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider",
                        p.badge === "popular" && "bg-accent text-accent-foreground",
                        p.badge === "featured" && "bg-foreground text-background",
                        p.badge === "best-seller" && "bg-green-600 text-white",
                      )}
                    >
                      {p.badge}
                    </span>
                  )}
                  <img
                    src={p.image}
                    alt={p.name}
                    width={600}
                    height={700}
                    className="aspect-[6/7] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm transition-opacity duration-300",
                      quickView === p.id ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <span className="btn-pill border border-foreground/30 bg-background/80 px-5 py-2.5 text-xs backdrop-blur-sm hover:bg-foreground hover:text-background">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs text-muted-foreground">{p.category}</span>
                  <h3 className="heading-display mt-1 text-lg">{p.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>{p.material}</span>
                    <span>{p.size}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─── */

function WhyChooseUs() {
  return (
    <section className="border-y border-border bg-card/30 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="Why Choose Us"
          title={
            <>
              Built with <span className="serif-accent text-accent">precision</span>
            </>
          }
          description="Every model is crafted with care by experienced 3D professionals."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {whyChooseUs.map((item, i) => (
            <Reveal key={item.title} delay={(i % 5) * 0.06}>
              <div className="h-full rounded-3xl border border-border bg-card/50 p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg">
                <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-accent/20">
                  <Check className="size-5 text-accent" />
                </span>
                <h3 className="heading-display mt-4 text-base">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Materials Section ─── */

function MaterialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="Materials"
          title={
            <>
              Wide range of <span className="serif-accent text-accent">materials</span>
            </>
          }
          description="From engineering-grade thermoplastics to premium metal finishes — we support every material."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 0.08}>
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/50 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg">
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="heading-display text-lg">{m.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                  <p className="mt-3 text-xs text-accent">Best for: {m.bestFor}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery ─── */

const galleryImages = [
  "https://picsum.photos/seed/gallery-1/800/1000",
  "https://picsum.photos/seed/gallery-2/800/700",
  "https://picsum.photos/seed/gallery-3/800/900",
  "https://picsum.photos/seed/gallery-4/800/600",
  "https://picsum.photos/seed/gallery-5/800/1100",
  "https://picsum.photos/seed/gallery-6/800/800",
  "https://picsum.photos/seed/gallery-7/800/650",
  "https://picsum.photos/seed/gallery-8/800/950",
];

function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="border-y border-border bg-card/30 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="Gallery"
          title={
            <>
              Our <span className="serif-accent text-accent">work</span> in focus
            </>
          }
          description="A curated selection of our finest 3D models and renders."
        />
        <div className="columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
          {galleryImages.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 0.06}>
              <button
                onClick={() => setLightbox(src)}
                className="group relative block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Open image in lightbox"
              >
                <img
                  src={src}
                  alt=""
                  width={800}
                  height={i % 2 === 0 ? 1000 : 700}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/20" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt=""
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 rounded-full bg-foreground/10 p-3 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20"
              aria-label="Close lightbox"
            >
              <Plus className="size-5 rotate-45" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Customer Showcase ─── */

function CustomerShowcase() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="Customer Showcase"
          title={
            <>
              Real projects, <span className="serif-accent text-accent">real results</span>
            </>
          }
          description="Completed customer projects that speak for themselves."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {customerProjects.map((cp, i) => (
            <Reveal key={cp.id} delay={i * 0.1}>
              <div className="rounded-3xl border border-border bg-card/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg">
                <div className="grid grid-cols-2 gap-2">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={cp.beforeImage}
                      alt="Before"
                      width={300}
                      height={200}
                      className="aspect-[3/2] w-full object-cover"
                      loading="lazy"
                    />
                    <p className="mt-1 text-center text-[11px] text-muted-foreground">Before</p>
                  </div>
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={cp.afterImage}
                      alt="After"
                      width={300}
                      height={200}
                      className="aspect-[3/2] w-full object-cover"
                      loading="lazy"
                    />
                    <p className="mt-1 text-center text-[11px] text-accent">After</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {cp.industry}
                    </span>
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: cp.rating }).map((_, j) => (
                        <Star key={j} className="size-3 fill-accent text-accent" />
                      ))}
                    </span>
                  </div>
                  <h3 className="heading-display mt-3 text-lg">{cp.customerName}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{cp.projectType}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{cp.review}&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process Timeline ─── */

function ProcessSection() {
  return (
    <section className="border-y border-border bg-card/30 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="How It Works"
          title={
            <>
              From concept to <span className="serif-accent text-accent">delivery</span>
            </>
          }
          description="Our proven process for delivering production-ready 3D models."
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
  );
}

/* ─── FAQ ─── */

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          tag="FAQ"
          title={
            <>
              Questions, <span className="serif-accent text-accent">answered</span>
            </>
          }
          description="Everything you need to know about ordering 3D models."
        />
        <div className="divide-y divide-border border-y border-border">
          {productsFaqs.map((f, i) => {
            const open = openIndex === i;
            return (
              <div key={f.q}>
                <button
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="heading-display text-lg md:text-xl">{f.q}</span>
                  </span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      open && "rotate-45 text-foreground",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pl-9 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
