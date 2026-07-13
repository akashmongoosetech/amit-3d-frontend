import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";

const nav = [
  { to: "/", label: "Home" },
  { to: "/studio", label: "Studio" },
  { to: "/projects", label: "Projects" },
  { to: "/news", label: "News" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
] as const;

const socials = ["Instagram", "LinkedIn", "X / Twitter", "Dribbble"];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="container-site py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="heading-display text-2xl">
              LUMERA<span className="align-super text-[0.55em] text-muted-foreground">™</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A creative studio for founders. We partner with brands to create digital design that
              drives conversion and commands attention.
            </p>
            <form
              className="mt-8 flex max-w-sm items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.trim()) return;
                toast.success("You're on the list. Talk soon.");
                setEmail("");
              }}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full rounded-full border border-input bg-transparent px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
              />
              <button
                type="submit"
                className="btn-pill shrink-0 bg-primary px-5 py-3 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Subscribe
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-3 md:col-start-7">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Navigate</p>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-underline text-sm text-foreground/80 hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Follow</p>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {s}
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <a
              href="mailto:hello@lumera.studio"
              className="link-underline mt-3 inline-block text-sm text-foreground/80"
            >
              hello@lumera.studio
            </a>
          </Reveal>
        </div>
      </div>

      <div className="container-site pb-6">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Lumera Studio. All rights reserved.</p>
          <p>Los Angeles — Worldwide</p>
        </div>
      </div>

      <p
        aria-hidden
        className="heading-display pointer-events-none select-none whitespace-nowrap text-center text-[22vw] leading-none text-foreground/[0.04]"
      >
        LUMERA
      </p>
    </footer>
  );
}
