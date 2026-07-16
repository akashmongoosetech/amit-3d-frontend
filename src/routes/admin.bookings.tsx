import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { BookingViewModal } from "@/components/admin/BookingViewModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  useBookings,
  updateBookingStatus,
  deleteBooking,
  getBookingStatuses,
} from "@/hooks/useAdminData";
import type { Booking, BookingStatus } from "@/hooks/useAdminData";

export const Route = createFileRoute("/admin/bookings")({
  head: () => ({
    meta: [{ title: "Bookings — Verto3D Admin" }],
  }),
  component: BookingsPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

const selectClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring [&>option]:bg-black";

const statusStyles: Record<BookingStatus, string> = {
  "New Order": "border-accent/30 bg-accent/5 text-accent",
  Contact: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  Payment: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  "Start Project": "border-purple-500/30 bg-purple-500/5 text-purple-400",
  Complete: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  "On Way": "border-cyan-500/30 bg-cyan-500/5 text-cyan-400",
  Delivered: "border-green-500/30 bg-green-500/5 text-green-400",
};

const colorMap: Record<string, string> = {
  "New Order": "bg-accent",
  Contact: "bg-blue-400",
  Payment: "bg-yellow-400",
  "Start Project": "bg-purple-400",
  Complete: "bg-emerald-400",
  "On Way": "bg-cyan-400",
  Delivered: "bg-green-400",
};

const allStatuses: BookingStatus[] = [
  "New Order",
  "Contact",
  "Payment",
  "Start Project",
  "Complete",
  "On Way",
  "Delivered",
];

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}
    >
      <span className="size-1.5 rounded-full currentColor opacity-70" />
      {status}
    </span>
  );
}

function StatusDropdown({
  booking,
  onUpdate,
}: {
  booking: Booking;
  onUpdate: (id: string, status: BookingStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const measure = useCallback(() => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left + r.width / 2 });
    }
  }, []);

  useEffect(() => {
    if (open) {
      measure();
      window.addEventListener("scroll", measure, true);
      return () => window.removeEventListener("scroll", measure, true);
    }
  }, [open, measure]);

  return (
    <div className="relative inline-flex">
      <button
        ref={btnRef}
        type="button"
        onClick={() => {
          setOpen(!open);
          if (!open) measure();
        }}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium transition-colors hover:bg-card/50"
      >
        <StatusBadge status={booking.status} />
        <ChevronDown className="size-3 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            className="fixed z-40 w-44 rounded-xl border border-border bg-black p-1.5 shadow-lg"
            style={{ top: pos.top, left: pos.left, transform: "translateX(-50%)" }}
          >
            {allStatuses.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onUpdate(booking._id, s);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-card/50 ${s === booking.status ? "bg-card/30" : ""}`}
              >
                <span className={`size-2 rounded-full ${colorMap[s] || "bg-muted"}`} />
                {s}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function BookingsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [localBookings, setLocalBookings] = useState<Booking[] | null>(null);
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);

  const { data: bookings, pagination, loading, search: fetchBookings } = useBookings();

  useEffect(() => {
    fetchBookings({ page: 1, limit: 10 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const display = localBookings ?? bookings;

  const handleSearch = () => {
    setPage(1);
    setLocalBookings(null);
    fetchBookings({ search, status: filterStatus, page: 1, limit: 10 });
  };

  const handleReset = () => {
    setSearch("");
    setFilterStatus("All");
    setPage(1);
    setLocalBookings(null);
    fetchBookings({ page: 1, limit: 10 });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLocalBookings(null);
    fetchBookings({ search, status: filterStatus, page: newPage, limit: 10 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleStatusUpdate = async (id: string, status: BookingStatus) => {
    try {
      const updated = await updateBookingStatus(id, status);
      setLocalBookings((prev) => (prev ?? bookings).map((b) => (b._id === id ? updated : b)));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteBooking(deleteTarget._id);
      setLocalBookings((prev) => (prev ?? bookings).filter((b) => b._id !== deleteTarget._id));
      toast.success("Booking deleted successfully");
    } catch {
      toast.error("Failed to delete booking");
    } finally {
      setDeleteTarget(null);
    }
  };

  const startRecord = pagination ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const endRecord = pagination
    ? Math.min(pagination.page * pagination.limit, pagination.totalRecords)
    : 0;

  const hasActiveFilters = search || filterStatus !== "All";

  return (
    <div>
      <PageHeader
        title="3D Model Bookings"
        description="Custom 3D model booking requests from visitors"
      />

      <div className="mb-5 space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-0 flex-2 basis-full sm:basis-0">
            <label className="mb-1.5 block text-xs text-muted-foreground">Search</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by Name or Email"
                className={inputClass}
                style={{ paddingLeft: "2.5rem" }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          <div className="min-w-0 flex-1 basis-full sm:basis-0">
            <label className="mb-1.5 block text-xs text-muted-foreground">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={selectClass}
            >
              <option value="All">All Statuses</option>
              {allStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="btn-pill inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
            >
              <Search className="size-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-pill inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              <RotateCcw className="size-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
          Loading bookings...
        </div>
      ) : display.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-160">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/30 text-left text-xs uppercase text-muted-foreground">
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Name</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Email</th>
                  <th className="hidden whitespace-nowrap px-5 py-3.5 font-medium sm:table-cell">
                    Mobile
                  </th>
                  <th className="hidden whitespace-nowrap px-5 py-3.5 font-medium sm:table-cell">
                    Model Size
                  </th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Status</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Date</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {display.map((b: Booking) => (
                  <tr
                    key={b._id}
                    className="border-b border-border last:border-0 hover:bg-card/20"
                  >
                    <td className="whitespace-nowrap px-5 py-3.5 font-medium text-foreground">
                      {b.name}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">
                      {b.email}
                    </td>
                    <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground sm:table-cell">
                      {b.mobile || "-"}
                    </td>
                    <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground sm:table-cell">
                      {b.modelSize || "-"}
                    </td>
                    <td
                      className="whitespace-nowrap px-5 py-3.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <StatusDropdown booking={b} onUpdate={handleStatusUpdate} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">
                      {b.createdAt
                        ? new Date(b.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td
                      className="whitespace-nowrap px-5 py-3.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setViewBooking(b)}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground"
                          title="View details"
                        >
                          <Eye className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(b)}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                          title="Delete booking"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3.5">
              <span className="text-sm text-muted-foreground">
                Showing {startRecord}–{endRecord} of {pagination.totalRecords}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="btn-pill inline-flex items-center gap-1 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40"
                >
                  <ChevronLeft className="size-3.5" />
                  Prev
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(
                    (n) =>
                      n === 1 ||
                      n === pagination.totalPages ||
                      Math.abs(n - page) <= 1,
                  )
                  .map((n, idx, arr) => (
                    <Fragment key={n}>
                      {idx > 0 && arr[idx - 1] !== n - 1 && (
                        <span className="px-1 text-xs text-muted-foreground">…</span>
                      )}
                      <button
                        type="button"
                        onClick={() => handlePageChange(n)}
                        className={`btn-pill inline-flex size-8 items-center justify-center text-xs ${
                          n === page
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {n}
                      </button>
                    </Fragment>
                  ))}
                <button
                  type="button"
                  disabled={page >= pagination.totalPages}
                  onClick={() => handlePageChange(page + 1)}
                  className="btn-pill inline-flex items-center gap-1 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={CalendarCheck}
          title={hasActiveFilters ? "No matching bookings" : "No bookings yet"}
          description={
            hasActiveFilters
              ? "No bookings found matching the selected filters."
              : "No 3D model booking requests have been submitted yet."
          }
          action={
            hasActiveFilters ? (
              <button
                type="button"
                onClick={handleReset}
                className="btn-pill inline-flex items-center gap-2 border border-border px-4 py-2 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" />
                Reset Filters
              </button>
            ) : undefined
          }
        />
      )}

      <BookingViewModal
        booking={viewBooking!}
        open={!!viewBooking}
        onClose={() => setViewBooking(null)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Booking"
        message={`Are you sure you want to delete the booking from ${deleteTarget?.name ?? "this customer"}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        destructive
      />
    </div>
  );
}
