import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";

import { Reveal } from "@/components/site/Reveal";
import { useAdminAuth } from "@/context/AdminAuthContext";

export const Route = createFileRoute("/admin-login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Verto3D" },
      {
        name: "description",
        content: "Administrator access to Verto3D management panel.",
      },
    ],
  }),
  component: AdminLoginPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring sm:px-5 sm:py-3.5";

function AdminLoginPage() {
  const { isAuthenticated, login } = useAdminAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(identifier, password);
      toast.success("Welcome back, admin.");
      router.navigate({ to: "/admin/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-20 sm:px-6 sm:py-24 md:py-32">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 size-[25rem] rounded-full bg-accent/8 blur-[140px]" />
        <div className="absolute -bottom-40 right-[-10%] size-[30rem] rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <Reveal className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card/30 p-6 backdrop-blur-md sm:rounded-3xl sm:p-10">
          <div className="mb-8 text-center">
            <p className="mb-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-accent">⊹</span> Verto3D
            </p>
            <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              <span className="text-accent">Admin</span> Login
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access the management panel
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">
                Email / Mobile / Username <span className="text-accent">*</span>
              </label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email, mobile number or username"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">
                Password <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-pill w-full justify-center bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign In"}
              <ArrowUpRight className="size-4" />
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  );
}
