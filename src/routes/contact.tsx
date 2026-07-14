import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Reveal, StaggerText } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Verto3D 3D Modeling & Visualization" },
      {
        name: "description",
        content: "Start your 3D modeling project with Verto3D. Tell us what you need visualized.",
      },
      { property: "og:title", content: "Contact — Verto3D 3D Modeling & Visualization" },
      {
        property: "og:description",
        content: "Start your 3D project with Verto3D. Get a quote within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

const inputClass =
  "w-full rounded-2xl border border-input bg-transparent px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div>
      <section className="noise-overlay relative overflow-hidden pt-40 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] size-[30rem] rounded-full bg-accent/10 blur-[140px]"
        />
        <div className="container-site pb-16 md:pb-24">
          <Reveal>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-accent">⊹</span> Get in touch
            </p>
          </Reveal>
          <h1 className="heading-display mt-6 max-w-3xl text-5xl md:text-7xl">
            <StaggerText text="Let's build" /> <span className="serif-accent text-accent">something</span>
          </h1>

          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <div className="space-y-6">
                <a
                  href="mailto:hello@verto3d.com"
                  className="group flex items-center gap-4 text-foreground/85 transition-colors hover:text-foreground"
                >
                  <span className="rounded-full border border-border p-3 transition-colors group-hover:border-foreground">
                    <Mail className="size-4" />
                  </span>
                  hello@verto3d.com
                </a>
                <a
                  href="tel:+15236363362"
                  className="group flex items-center gap-4 text-foreground/85 transition-colors hover:text-foreground"
                >
                  <span className="rounded-full border border-border p-3 transition-colors group-hover:border-foreground">
                    <Phone className="size-4" />
                  </span>
                  (424) 123-4567
                </a>
                <p className="flex items-center gap-4 text-foreground/85">
                  <span className="rounded-full border border-border p-3">
                    <MapPin className="size-4" />
                  </span>
                  Remote — Worldwide
                </p>
              </div>
              <div className="mt-10 rounded-3xl border border-border bg-card/50 p-7">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We reply within one business day. Tell us about your project and we'll provide a
                  quote, timeline and portfolio of relevant work.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="md:col-span-7 md:col-start-6">
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setTimeout(() => {
                    setSubmitting(false);
                    (e.target as HTMLFormElement).reset();
                    toast.success("Thanks for reaching out. We'll review your project and be in touch within one business day.");
                  }, 700);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm text-muted-foreground">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    placeholder="Company name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="mb-2 block text-sm text-muted-foreground">
                    Budget
                  </label>
                  <select id="budget" name="budget" className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option>Under $10k</option>
                    <option>$10k – $25k</option>
                    <option>$25k – $50k</option>
                    <option>$50k+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-muted-foreground">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your 3D project — what industry, what type of model, and what you need delivered…"
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-pill w-full justify-center bg-primary px-7 py-4 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? "Sending…" : "Send brief"}
                  <ArrowUpRight className="size-4" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
