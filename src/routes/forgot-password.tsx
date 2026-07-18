import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowUpRight, KeyRound, ChevronLeft } from "lucide-react";
import { useState, useRef, type FormEvent, type KeyboardEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { api, ApiClientError } from "@/lib/api";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — Verto3D Admin" },
      { name: "description", content: "Reset your Verto3D admin account password." },
    ],
  }),
  component: ForgotPasswordPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring sm:px-5 sm:py-3.5";

const otpClass =
  "w-full rounded-xl border border-input bg-black/40 text-center text-lg font-bold outline-none transition-colors focus:border-ring";

function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"identity" | "otp" | "done">("identity");
  const [submitting, setSubmitting] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post<{ email: string }>("/auth/send-otp", { identifier });
      setMaskedEmail(res.email);
      setStep("otp");
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err instanceof ApiClientError ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d$/.test(value) && value !== "") return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post<{ verifyToken: string }>("/auth/verify-otp", { email: identifier, otp: code });
      router.navigate({ to: "/reset-password", search: { token: res.verifyToken } });
    } catch (err) {
      toast.error(err instanceof ApiClientError ? err.message : "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
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
            <h1 className="heading-display text-3xl sm:text-4xl">
              {step === "identity" && <><span className="text-accent">Reset</span> Password</>}
              {step === "otp" && <><span className="text-accent">Verify</span> OTP</>}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {step === "identity" && "Enter your email, username or mobile to receive an OTP."}
              {step === "otp" && `Enter the 6-digit OTP sent to ${maskedEmail}`}
            </p>
          </div>

          {step === "identity" && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  Email, Username or Mobile <span className="text-accent">*</span>
                </label>
                <input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@verto3d.com"
                  className={inputClass}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-pill w-full justify-center bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
              >
                {submitting ? "Sending OTP…" : "Send OTP"}
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

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    autoFocus={i === 0}
                    className={`${otpClass} size-11 sm:size-12`}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-pill w-full justify-center bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
                >
                  {submitting ? "Verifying…" : "Verify OTP"}
                  <KeyRound className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setStep("identity")}
                  className="btn-pill w-full justify-center border border-border px-7 py-3 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
