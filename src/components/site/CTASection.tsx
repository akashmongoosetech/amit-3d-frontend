import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerText } from "./Reveal";

export function CTASection() {
  return (
    <section className="container-site py-20 md:py-32">
      <div className="noise-overlay relative overflow-hidden rounded-[2.5rem] border border-border bg-card px-6 py-20 text-center md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
        />
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Ready when you are
          </p>
        </Reveal>
        <h2 className="heading-display mx-auto mt-5 max-w-3xl text-4xl md:text-6xl">
          <StaggerText text="Let's build something" />{" "}
          <span className="serif-accent text-accent">unforgettable</span>
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Tell us where your brand is going. We'll design the way it gets there.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="btn-pill bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Start a project
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/pricing"
              className="btn-pill border border-border px-7 py-3.5 text-sm hover:border-foreground"
            >
              See pricing
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
