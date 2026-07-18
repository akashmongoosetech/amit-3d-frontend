import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { ArrowUpRight, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { api, ApiClientError } from "@/lib/api";

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: Record<string, string>) => ({
    token: search.token || "",
  }),
  head: () => ({
    meta: [
      { title: "Reset Password — Verto3D Admin" },
      { name: "description", content: "Set a new password for your Verto3D admin account." },
    ],
  }),
  component: ResetPasswordPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring sm:px-5 sm:py-3.5";

function ResetPasswordPage() {
  const { token } = useSearch({ from: "/reset-password" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/auth/reset-password", { verifyToken: token, password, confirmPassword });
      setDone(true);
      toast.success("Password reset successfully");
    } catch (err) {
      toast.error(err instanceof ApiClientError ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4 py-20 sm:px-6 sm:py-24 md:py-32">
        <Reveal className="w-full max-w-sm text-center">
          <p className="text-sm text-muted-foreground">Invalid reset link. No token provided.</p>
          <Link to="/admin-login" className="mt-4 inline-flex items-center gap-2 text-xs text-accent underline underline-offset-4">
            Back to Login
          </Link>
        </Reveal>
      </div>
    );
  }

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
            <h1 className="heading-display text-3xl sm:text-4xl">
              {done ? (
                <span className="text-accent">Password Reset</span>
              ) : (
                <>
                  <span className="text-accent">New</span> Password
                </>
              )}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {done ? "Your password has been changed successfully." : "Enter your new password below."}
            </p>
          </div>

          {done ? (
            <div className="text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-accent/20">
                <CheckCircle className="size-8 text-accent" />
              </div>
              <Link
                to="/admin-login"
                className="btn-pill inline-flex items-center gap-2 border border-border px-6 py-3 text-sm hover:border-foreground"
              >
                <ArrowLeft className="size-4" />
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  New Password <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 characters"
                    className={inputClass}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  Confirm Password <span className="text-accent">*</span>
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Re-enter new password"
                  className={inputClass}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-pill w-full justify-center bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
              >
                {submitting ? "Resetting…" : "Reset Password"}
                <ArrowUpRight className="size-4" />
              </button>

              <p className="text-center">
                <Link
                  to="/admin-login"
                  className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Back to Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
