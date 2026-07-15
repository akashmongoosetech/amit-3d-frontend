import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/site/Magnetic";

const links = [
  { to: "/", label: "Home" },
  { to: "/studio", label: "Studio" },
  { to: "/projects", label: "Projects" },
  { to: "/news", label: "News" },
  { to: "/book-model", label: "Book 3D Model" },
  { to: "/products", label: "Products" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="container-site">
          <nav
            className={cn(
              "flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
              scrolled ? "glass-panel shadow-lg shadow-background/40" : "border border-transparent",
            )}
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="heading-display text-lg tracking-tight"
              aria-label="Verto3D home"
            >
              VERTO<span className="align-super text-[0.55em] text-muted-foreground">3D</span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Magnetic strength={0.35}>
                <Link
                  to="/contact"
                  className="btn-pill bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
                >
                  Get a quote
                  <ArrowUpRight className="size-4" />
                </Link>
              </Magnetic>
            </div>

            <button
              className="rounded-full p-2 text-foreground transition-colors hover:bg-secondary md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="container-site mt-2 md:hidden"
            >
              <div className="glass-panel flex flex-col gap-1 rounded-3xl p-4">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      className="block rounded-2xl px-4 py-3 text-lg text-muted-foreground transition-colors data-[status=active]:bg-secondary data-[status=active]:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  to="/contact"
                  className="btn-pill mt-2 justify-center bg-primary px-5 py-3 text-primary-foreground"
                >
                  Get a quote
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
