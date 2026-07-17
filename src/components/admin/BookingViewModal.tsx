import { Download, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Booking, BookingStatus, OrderStatus } from "@/hooks/useAdminData";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const UPLOADS_BASE = API_BASE.replace(/\/api\/?$/, "");

const statusStyles: Record<BookingStatus, string> = {
  "New Order": "border-accent/30 bg-accent/5 text-accent",
  Contact: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  Payment: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  "Start Project": "border-purple-500/30 bg-purple-500/5 text-purple-400",
  Complete: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  "On Way": "border-cyan-500/30 bg-cyan-500/5 text-cyan-400",
  Delivered: "border-green-500/30 bg-green-500/5 text-green-400",
};

const orderStatusStyles: Record<OrderStatus, string> = {
  "Start Create": "border-gray-500/30 bg-gray-500/5 text-gray-400",
  "Model Complete": "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  Dispatched: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  Shipped: "border-purple-500/30 bg-purple-500/5 text-purple-400",
};

interface BookingViewModalProps {
  booking: Booking;
  open: boolean;
  onClose: () => void;
}

export function BookingViewModal({ booking, open, onClose }: BookingViewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  useEffect(() => {
    if (!open) return;
    setImageError(false);
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const imageUrl = booking.referenceImage ? `${UPLOADS_BASE}${booking.referenceImage}` : null;

  const getFileName = (path: string) => {
    const parts = path.split("/");
    return parts[parts.length - 1] || "image";
  };

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
          <h2 className="text-base font-semibold text-foreground">Booking Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 space-y-4 overflow-y-auto px-6 py-5">
          <Field label="Name" value={booking.name} />
          <Field label="Email" value={booking.email} />
          <Field label="Mobile" value={booking.mobile} />
          {booking.modelName && <Field label="Model Name" value={booking.modelName} />}
          <Field label="Model Size" value={booking.modelSize} />
          <Field label="Status" value={booking.status} isStatus />
          {booking.orderStatus && (
            <div>
              <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                Order Status
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${orderStatusStyles[booking.orderStatus as OrderStatus] || ""}`}
              >
                <span className="size-1.5 rounded-full currentColor opacity-70" />
                {booking.orderStatus}
              </span>
            </div>
          )}
          <Field
            label="Submitted"
            value={
              booking.createdAt
                ? new Date(booking.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"
            }
          />

          {imageUrl && !imageError && (
            <div>
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                Reference Image
              </span>
              <div
                className="group relative w-full"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <button
                  type="button"
                  className="block w-full text-left"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={imageUrl}
                    alt="Model reference"
                    className="w-full cursor-pointer rounded-xl border border-border object-cover max-h-48 sm:max-h-64 transition-opacity hover:opacity-90"
                    onError={() => setImageError(true)}
                  />
                </button>
                {hovering && (
                  <div className="absolute right-2 top-2 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="flex size-9 items-center justify-center rounded-lg bg-black/70 text-white opacity-0 transition-opacity duration-200 hover:bg-black/90 group-hover:opacity-100"
                      title="Preview full size"
                    >
                      <Maximize2 className="size-4" />
                    </button>
                    <a
                      href={imageUrl}
                      download={getFileName(booking.referenceImage)}
                      className="flex size-9 items-center justify-center rounded-lg bg-black/70 text-white opacity-0 transition-opacity duration-200 hover:bg-black/90 group-hover:opacity-100"
                      title="Download image"
                    >
                      <Download className="size-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {imageError && booking.referenceImage && (
            <div>
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                Reference Image
              </span>
              <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-black/40 px-4 py-6 text-center">
                <p className="text-sm text-muted-foreground">Image failed to load</p>
                <a
                  href={imageUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill inline-flex items-center gap-2 border border-border px-4 py-2 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
                >
                  <Download className="size-3.5" />
                  Open in new tab
                </a>
              </div>
            </div>
          )}

          <div>
            <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
              Message
            </span>
            <p className="rounded-xl border border-border bg-black/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              {booking.message}
            </p>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === lightboxRef.current) setLightboxOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            <X className="size-5" />
          </button>
          <img
            src={imageUrl!}
            alt="Model reference full size"
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

function Field({ label, value, isStatus }: { label: string; value: string; isStatus?: boolean }) {
  return (
    <div>
      <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {isStatus ? (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
            statusStyles[value as BookingStatus] || ""
          }`}
        >
          <span className="size-1.5 rounded-full currentColor opacity-70" />
          {value}
        </span>
      ) : (
        <span className="text-sm text-foreground">{value}</span>
      )}
    </div>
  );
}
