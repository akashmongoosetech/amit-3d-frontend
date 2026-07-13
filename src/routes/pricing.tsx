import { createFileRoute } from "@tanstack/react-router";

import { Reveal, StaggerText } from "@/components/site/Reveal";
import { PricingSection } from "@/components/site/PricingSection";
import { FAQ } from "@/components/site/FAQ";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Lumera Creative Studio" },
      {
        name: "description",
        content:
          "Flexible design plans — monthly retainers and one-off projects designed to scale with your brand.",
      },
      { property: "og:title", content: "Pricing — Lumera Creative Studio" },
      {
        property: "og:description",
        content: "Monthly retainers and one-off projects designed to scale with you.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div>
      <section className="container-site pt-40 text-center md:pt-48">
        <Reveal>
          <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-accent">⊹</span> Pricing
          </p>
        </Reveal>
        <h1 className="heading-display mx-auto mt-6 max-w-3xl text-5xl md:text-7xl">
          <StaggerText text="Flexible" /> <span className="serif-accent text-accent">plans</span>
        </h1>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Tailored, flexible plans designed to scale with you — whether you're just starting out
            or growing fast.
          </p>
        </Reveal>
      </section>

      <section className="container-site py-16 md:py-24">
        <PricingSection />
      </section>

      <section className="container-site pb-16 md:pb-24">
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

      <CTASection />
    </div>
  );
}
