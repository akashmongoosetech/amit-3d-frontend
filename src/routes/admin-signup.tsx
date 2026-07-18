import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowUpRight, Eye, EyeOff, Upload, X } from "lucide-react";
import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";

import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/context/AdminAuthContext";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const Route = createFileRoute("/admin-signup")({
  head: () => ({
    meta: [
      { title: "Admin Registration — Verto3D" },
      {
        name: "description",
        content: "Register a new administrator account for Verto3D.",
      },
    ],
  }),
  component: AdminSignupPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring sm:px-5 sm:py-3.5";

function AdminSignupPage() {
  const { isAuthenticated, signup } = useAdminAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, router]);

  const handleProfileFile = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setProfilePreview(null);
      setProfileFile(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setProfileError("Only JPG, JPEG, PNG and WEBP files are accepted");
      setProfilePreview(null);
      setProfileFile(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setProfileError("File size must be under 5 MB");
      setProfilePreview(null);
      setProfileFile(null);
      return;
    }
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const removeProfile = () => {
    setProfilePreview(null);
    setProfileFile(null);
    setProfileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signup({
        firstName,
        lastName,
        email,
        mobile,
        username,
        password,
        confirmPassword,
        profileImage: profileFile ? undefined : undefined,
        profileImageFile: profileFile || undefined,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobile("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      removeProfile();
      toast.success("Administrator account created successfully.");
      router.navigate({ to: "/admin/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
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

      <Reveal className="w-full max-w-lg">
        <div className="rounded-2xl border border-border bg-card/30 p-6 backdrop-blur-md sm:rounded-3xl sm:p-10">
          <div className="mb-8 text-center">
            <p className="mb-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-accent">⊹</span> Verto3D
            </p>
            <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Register <span className="serif-accent text-accent">Administrator</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your admin account to manage Verto3D
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
            {/* Profile Picture */}
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">Profile Picture</label>
              {profilePreview ? (
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    width={120}
                    height={120}
                    className="size-20 rounded-xl border border-border object-cover sm:size-24"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-pill border border-border px-4 py-1.5 text-xs hover:border-foreground"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={removeProfile}
                      className="btn-pill border border-border px-4 py-1.5 text-xs hover:border-foreground"
                      aria-label="Remove image"
                    >
                      <X className="mr-1 inline size-3" />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload profile picture"
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-black/20 px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-black/30",
                  )}
                >
                  <Upload className="size-4 shrink-0" />
                  <span>JPG, JPEG, PNG or WEBP — max 5 MB</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={handleProfileFile}
              />
              {profileError && (
                <p className="mt-1.5 text-[0.8rem] font-medium text-destructive">{profileError}</p>
              )}
            </div>

            {/* First Name + Last Name */}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  First Name <span className="text-accent">*</span>
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  Last Name <span className="text-accent">*</span>
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email + Mobile */}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="admin@verto3d.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  Mobile Number <span className="text-accent">*</span>
                </label>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">
                Username <span className="text-accent">*</span>
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">
                Password <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">
                Confirm Password <span className="text-accent">*</span>
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Re-enter your password"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-pill w-full justify-center bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
            >
              {submitting ? "Creating account…" : "Create Account"}
              <ArrowUpRight className="size-4" />
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  );
}
