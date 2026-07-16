import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Contact, ContactStatus } from "@/hooks/useAdminData";

const statusStyles: Record<ContactStatus, string> = {
  New: "border-accent/30 bg-accent/5 text-accent",
  Pending: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  Talk: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  Resolved: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
};

interface ContactViewModalProps {
  contact: Contact;
  open: boolean;
  onClose: () => void;
}

export function ContactViewModal({ contact, open, onClose }: ContactViewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="flex w-full max-w-lg flex-col rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh]">
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-base font-semibold text-foreground">Contact Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 space-y-4 overflow-y-auto px-6 py-5">
          <Field label="Name" value={contact.name} />
          <Field label="Email" value={contact.email} />
          <Field label="Mobile" value={contact.mobile || "-"} />
          <Field label="Company" value={contact.company || "-"} />
          <Field label="Budget" value={contact.budget || "-"} />

          <div>
            <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
              Status
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[contact.status]}`}
            >
              <span className="size-1.5 rounded-full currentColor opacity-70" />
              {contact.status}
            </span>
          </div>

          <div>
            <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
              Message
            </span>
            <p className="rounded-xl border border-border bg-black/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              {contact.message}
            </p>
          </div>

          <Field
            label="Submitted"
            value={
              contact.createdAt
                ? new Date(contact.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"
            }
          />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}
