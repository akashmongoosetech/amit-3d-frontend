import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowUpRight, Check, Eye, EyeOff, Upload, X } from "lucide-react";
import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Reveal } from "@/components/site/Reveal";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/context/AdminAuthContext";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").regex(/\S/, "Cannot be only spaces"),
    lastName: z.string().min(1, "Last name is required").regex(/\S/, "Cannot be only spaces"),
    email: z.string().email("Invalid email format"),
    mobile: z.string().regex(/^\d{10,15}$/, "Enter a valid mobile number (10–15 digits)"),
    username: z.string().min(1, "Username is required").trim(),
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "One uppercase letter")
      .regex(/[a-z]/, "One lowercase letter")
      .regex(/[0-9]/, "One number")
      .regex(/[^A-Za-z0-9]/, "One special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => !data.password.includes(data.firstName), {
    message: "Password must not contain your first name",
    path: ["password"],
  })
  .refine((data) => !data.password.includes(data.lastName), {
    message: "Password must not contain your last name",
    path: ["password"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

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
  const { isAuthenticated, login } = useAdminAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, router]);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordVal = useWatch({ control: form.control, name: "password" });
  const firstNameVal = useWatch({ control: form.control, name: "firstName" });
  const lastNameVal = useWatch({ control: form.control, name: "lastName" });
  const confirmPasswordVal = useWatch({
    control: form.control,
    name: "confirmPassword",
  });

  const pwRules = [
    { label: "Minimum 8 characters", check: (passwordVal?.length ?? 0) >= 8 },
    { label: "One uppercase letter", check: /[A-Z]/.test(passwordVal ?? "") },
    { label: "One lowercase letter", check: /[a-z]/.test(passwordVal ?? "") },
    { label: "One number", check: /[0-9]/.test(passwordVal ?? "") },
    {
      label: "One special character",
      check: /[^A-Za-z0-9]/.test(passwordVal ?? ""),
    },
    {
      label: "Not same as First Name",
      check:
        !firstNameVal ||
        !passwordVal ||
        !passwordVal.toLowerCase().includes(firstNameVal.toLowerCase()),
    },
    {
      label: "Not same as Last Name",
      check:
        !lastNameVal ||
        !passwordVal ||
        !passwordVal.toLowerCase().includes(lastNameVal.toLowerCase()),
    },
  ];

  const strengthChecks = pwRules.slice(0, 5).filter((r) => r.check).length;
  let strengthLabel = "Weak";
  let strengthColor = "bg-red-500";
  if (strengthChecks >= 4) {
    strengthLabel = "Strong";
    strengthColor = "bg-green-500";
  } else if (strengthChecks >= 3) {
    strengthLabel = "Medium";
    strengthColor = "bg-yellow-500";
  }

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

  const onSubmit = async (data: SignupFormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    await login(data.email, data.password);
    setSubmitting(false);
    form.reset();
    removeProfile();
    toast.success("Administrator account created successfully.");
    router.navigate({ to: "/admin/dashboard" });
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-20 sm:px-6 sm:py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
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
              Register{" "}
              <span className="serif-accent text-accent">Administrator</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your admin account to manage Verto3D
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              {/* Profile Picture */}
              <div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  Profile Picture
                </label>
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
                  <p className="mt-1.5 text-[0.8rem] font-medium text-destructive">
                    {profileError}
                  </p>
                )}
              </div>

              {/* First Name + Last Name */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        First Name <span className="text-accent">*</span>
                      </FormLabel>
                      <FormControl>
                        <input {...field} placeholder="First name" className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Last Name <span className="text-accent">*</span>
                      </FormLabel>
                      <FormControl>
                        <input {...field} placeholder="Last name" className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email + Mobile */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Email <span className="text-accent">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="email"
                          placeholder="admin@verto3d.com"
                          className={inputClass}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Mobile Number <span className="text-accent">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="tel"
                          placeholder="+91 98765 43210"
                          className={inputClass}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">
                      Username <span className="text-accent">*</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Choose a username"
                        className={inputClass}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">
                      Password <span className="text-accent">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <input
                          {...field}
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
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Strength & Rules */}
              {passwordVal && (
                <div className="rounded-xl border border-border bg-black/20 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          strengthColor,
                        )}
                        style={{
                          width: `${(strengthChecks / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      {strengthLabel}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {pwRules.map((rule) => (
                      <li
                        key={rule.label}
                        className={cn(
                          "flex items-center gap-2 text-xs",
                          rule.check ? "text-green-600" : "text-muted-foreground",
                        )}
                      >
                        <Check
                          className={cn(
                            "size-3 shrink-0",
                            rule.check ? "opacity-100" : "opacity-30",
                          )}
                        />
                        {rule.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">
                      Confirm Password <span className="text-accent">*</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="password"
                        placeholder="Re-enter your password"
                        className={inputClass}
                      />
                    </FormControl>
                    {confirmPasswordVal && passwordVal && (
                      <p
                        className={cn(
                          "flex items-center gap-1 text-xs",
                          confirmPasswordVal === passwordVal
                            ? "text-green-600"
                            : "text-destructive",
                        )}
                      >
                        <Check className="size-3" />
                        {confirmPasswordVal === passwordVal
                          ? "Passwords match"
                          : "Passwords do not match"}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={submitting}
                className="btn-pill w-full justify-center bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
              >
                {submitting ? "Creating account…" : "Create Account"}
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </Form>
        </div>
      </Reveal>
    </div>
  );
}
