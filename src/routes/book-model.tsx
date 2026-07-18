import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Plus, Upload } from "lucide-react";
import { useState, useRef, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Reveal, StaggerText } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTASection } from "@/components/site/CTASection";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { api, ApiClientError } from "@/lib/api";
import { bookingBenefits, bookingProcess, bookingFaqs, modelSizes } from "@/lib/data";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const bookingSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  mobile: z.string().min(7, "Mobile number is required"),
  modelSize: z.string().min(1, "Please select a model size"),
  message: z
    .string()
    .min(10, "Please describe your requirements (min 10 characters)")
    .max(2000, "Message must be under 2000 characters"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export const Route = createFileRoute("/book-model")({
  head: () => ({
    meta: [
      {
        title: "Book a 3D Model — Verto3D Custom Modeling Service",
      },
      {
        name: "description",
        content:
          "Request custom high-quality 3D models for products, architecture, industrial parts, gaming assets, prototypes and more. Get a free quote within one business day.",
      },
      {
        property: "og:title",
        content: "Book a 3D Model — Verto3D Custom Modeling Service",
      },
      {
        property: "og:description",
        content:
          "Request custom 3D models for any industry. Photorealistic rendering, CAD modeling and manufacturing-ready assets delivered on time.",
      },
    ],
  }),
  component: BookModelPage,
});

const inputClass =
  "w-full rounded-2xl border border-input bg-black px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function BookModelPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      modelSize: "",
      message: "",
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setFileName(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError("Only JPG, JPEG, PNG and WEBP files are accepted");
      setFileName(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be under 10 MB");
      setFileName(null);
      return;
    }
    setFileName(file.name);
  };

  const onSubmit = async (values: BookingFormValues) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("modelSize", values.modelSize);
      formData.append("message", values.message);
      if (fileInputRef.current?.files?.[0]) {
        formData.append("referenceImage", fileInputRef.current.files[0]);
      }
      await api.postFormData<{ id: string }>("/book-model", formData);
      setSuccess(true);
      form.reset();
      setFileName(null);
      setCharCount(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success(
        "Booking request submitted successfully! We'll be in touch within one business day.",
      );
    } catch (err) {
      toast.error(
        err instanceof ApiClientError ? err.message : "Submission failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="pt-40 md:pt-48">
        <section className="container-site pb-20 md:pb-32">
          <Reveal>
            <div className="mx-auto max-w-lg rounded-[2.5rem] border border-border bg-card p-12 text-center">
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/20">
                <Check className="size-8 text-accent" />
              </span>
              <h1 className="heading-display mt-6 text-3xl md:text-4xl">
                Booking Request Submitted Successfully
              </h1>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Thank you for your request! Our team will review your project details and contact
                you within one business day with a quote and timeline.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/"
                  className="btn-pill border border-border px-7 py-3.5 text-sm hover:border-foreground"
                >
                  Return Home
                </Link>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn-pill bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Book Another Model
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="noise-overlay relative overflow-hidden pt-40 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] size-[30rem] rounded-full bg-accent/10 blur-[140px]"
        />
        <div className="container-site pb-16 md:pb-24">
          <Reveal>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-accent">⊹</span> 3D Modeling Service
            </p>
          </Reveal>
          <h1 className="heading-display mt-6 max-w-3xl text-5xl md:text-7xl">
            <StaggerText text="Book Your Custom" />{" "}
            <span className="serif-accent text-accent">3D Model</span>
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
              Request custom high-quality 3D models for products, architecture, industrial parts,
              gaming assets, prototypes, visualization and manufacturing. Tell us what you need —
              we'll build it.
            </p>
            <button
              onClick={() =>
                document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-pill mt-9 bg-primary px-7 py-3.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Start Your Project
              <ArrowUpRight className="size-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="container-site border-t border-border py-20 md:py-28">
        <SectionHeading
          tag="Book Your Model"
          title={
            <>
              Tell us about your <span className="serif-accent text-accent">project</span>
            </>
          }
          description="Fill out the form and we'll get back to you with a quote within one business day."
        />
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          Full Name <span className="text-accent">*</span>
                        </FormLabel>
                        <FormControl>
                          <input {...field} placeholder="Your name" className={inputClass} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          Email Address <span className="text-accent">*</span>
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="email"
                            placeholder="you@company.com"
                            className={inputClass}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
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
                            placeholder="+1 (555) 123-4567"
                            className={inputClass}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="modelSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">
                          Size of Model <span className="text-accent">*</span>
                        </FormLabel>
                        <FormControl>
                          <select {...field} className={inputClass} defaultValue="">
                            <option value="" disabled>
                              Select size
                            </option>
                            {modelSizes.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Upload Model Picture
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload model picture"
                    className={cn(
                      inputClass,
                      "flex cursor-pointer items-center gap-3 py-3 hover:border-foreground/30",
                    )}
                  >
                    <Upload className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate text-sm">
                      {fileName || "JPG, JPEG, PNG or WEBP — max 10 MB"}
                    </span>
                    {fileName && <span className="shrink-0 text-xs text-accent">Selected</span>}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {fileError && (
                    <p className="mt-1.5 text-[0.8rem] font-medium text-destructive">{fileError}</p>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Message <span className="text-accent">*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={5}
                          placeholder="Describe your requirements — purpose, reference details, materials, deadline and any additional notes…"
                          className={inputClass}
                          maxLength={2000}
                          onChange={(e) => {
                            field.onChange(e);
                            setCharCount(e.target.value.length);
                          }}
                        />
                      </FormControl>
                      <div className="flex items-center justify-between">
                        <FormMessage />
                        <span
                          className={cn(
                            "text-xs text-muted-foreground",
                            charCount > 1800 && "text-destructive",
                          )}
                        >
                          {charCount}/2000
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-pill w-full justify-center bg-primary px-7 py-4 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? "Submitting…" : "Book My 3D Model"}
                  <ArrowUpRight className="size-4" />
                </button>
              </form>
            </Form>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <div className="rounded-3xl border border-border bg-card/50 p-7">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                What happens next?
              </p>
              <div className="mt-5 space-y-4">
                {[
                  "We review your requirements",
                  "We provide a fixed-price quote",
                  "You approve the timeline",
                  "We build your 3D model",
                  "You receive the final files",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[11px] font-medium text-accent">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-3xl border border-border bg-card/50 p-7">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Most projects receive a quote within one business day. Expedited timelines are
                available.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-border bg-card/30 py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            tag="Why Verto3D"
            title={
              <>
                Premium quality, <span className="serif-accent text-accent">reliable delivery</span>
              </>
            }
            description="Every model we deliver is production-ready, dimensionally accurate and built by experienced 3D professionals."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bookingBenefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-3xl border border-border bg-card/50 p-8 transition-colors duration-500 hover:border-foreground/30">
                  <h3 className="heading-display text-lg md:text-xl">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            tag="How It Works"
            title={
              <>
                From brief to <span className="serif-accent text-accent">delivery</span>
              </>
            }
            description="A transparent, predictable workflow — you're involved at every stage."
          />
          <div className="space-y-16">
            {bookingProcess.map((phase) => (
              <div key={phase.phase} className="grid gap-8 md:grid-cols-12">
                <Reveal className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <p className="heading-display text-6xl text-foreground/15">{phase.number}</p>
                    <h3 className="heading-display mt-2 text-3xl">{phase.phase}</h3>
                  </div>
                </Reveal>
                <div className="space-y-6 md:col-span-7 md:col-start-6">
                  {phase.steps.map((step, i) => (
                    <Reveal key={step.title} delay={i * 0.08}>
                      <div className="rounded-3xl border border-border bg-card/50 p-7">
                        <h4 className="heading-display text-lg">{step.title}</h4>
                        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                          {step.duration}
                        </span>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {step.text}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-card/30 py-20 md:py-28">
        <div className="container-site">
          <SectionHeading
            tag="FAQ"
            title={
              <>
                Questions, <span className="serif-accent text-accent">answered</span>
              </>
            }
            description="Everything you need to know before booking your 3D model."
          />
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {bookingFaqs.map((f, i) => {
        const open = openIndex === i;
        return (
          <div key={f.q}>
            <button
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              <span className="flex items-baseline gap-4">
                <span className="text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="heading-display text-lg md:text-xl">{f.q}</span>
              </span>
              <Plus
                className={cn(
                  "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                  open && "rotate-45 text-foreground",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 pl-9 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
