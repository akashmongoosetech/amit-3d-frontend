import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

const plans = [
  {
    name: "Starter",
    popular: false,
    description:
      "Perfect for startups and small product lines that need professional 3D assets without a long-term commitment.",
    monthly: 1900,
    yearly: 1600,
    priceNote: { monthly: "Billed monthly", yearly: "Per month, billed yearly" },
    features: [
      "Up to 5 models per month",
      "Standard quality rendering",
      "2 revision rounds per model",
      "72-hour typical turnaround",
    ],
    cta: "Get started",
  },
  {
    name: "Professional",
    popular: true,
    description:
      "For growing teams and regular product launches that need photorealistic quality and faster turnaround on every asset.",
    monthly: 4500,
    yearly: 3800,
    priceNote: { monthly: "Billed monthly", yearly: "Per month, billed yearly" },
    features: [
      "Up to 12 models per month",
      "Photorealistic PBR rendering",
      "3 revision rounds per model",
      "48-hour typical turnaround",
      "Animation-ready models",
      "Dedicated project manager",
    ],
    cta: "Get started",
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      <Reveal className="flex justify-center">
        <div className="glass-panel relative flex items-center rounded-full p-1">
          {(["Monthly", "Yearly"] as const).map((label) => {
            const active = (label === "Yearly") === yearly;
            return (
              <button
                key={label}
                onClick={() => setYearly(label === "Yearly")}
                className={cn(
                  "relative z-10 rounded-full px-6 py-2 text-sm transition-colors duration-300",
                  active ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="pricing-toggle"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {label}
                {label === "Yearly" && <span className="ml-1.5 text-xs opacity-70">−15%</span>}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.1}>
            <div
              className={cn(
                "group relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-1 md:p-10",
                plan.popular
                  ? "border-accent/40 bg-card shadow-[0_20px_60px_-30px] shadow-accent/20"
                  : "border-border bg-card/50",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-8 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  Most popular
                </span>
              )}
              <h3 className="heading-display text-2xl">{plan.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>

              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                What's included
              </p>
              <ul className="mt-4 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <p className="text-sm text-muted-foreground">
                  {yearly ? plan.priceNote.yearly : plan.priceNote.monthly}
                </p>
                <p className="heading-display mt-1 text-4xl">
                  ${(yearly ? plan.yearly : plan.monthly).toLocaleString()}
                  {plan.name === "Monthly retainer" && (
                    <span className="text-lg text-muted-foreground">/mo</span>
                  )}
                </p>
                <Link
                  to="/contact"
                  className={cn(
                    "btn-pill mt-6 w-full justify-center px-6 py-3.5 text-sm",
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                      : "border border-border text-foreground hover:border-foreground",
                  )}
                >
                  {plan.cta}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
