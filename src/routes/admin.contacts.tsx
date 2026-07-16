import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  MessageSquare,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { useContacts, updateContactStatus } from "@/hooks/useAdminData";
import type { Contact, ContactStatus } from "@/hooks/useAdminData";
import { ContactViewModal } from "@/components/admin/ContactViewModal";

export const Route = createFileRoute("/admin/contacts")({
  head: () => ({
    meta: [{ title: "Contacts — Verto3D Admin" }],
  }),
  component: ContactsPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

const selectClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring [&>option]:bg-black";

const statusStyles: Record<ContactStatus, string> = {
  New: "border-accent/30 bg-accent/5 text-accent",
  Pending: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  Talk: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  Resolved: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
};

const statusOptions: ContactStatus[] = ["New", "Pending", "Talk", "Resolved"];
const filterStatusOptions = ["All", "New", "Pending", "Talk", "Resolved"];

function StatusBadge({ status }: { status: ContactStatus }) {
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
  contact,
  onUpdate,
}: {
  contact: Contact;
  onUpdate: (id: string, status: ContactStatus) => void;
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
        <StatusBadge status={contact.status} />
        <ChevronDown className="size-3 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            className="fixed z-40 w-36 rounded-xl border border-border bg-black p-1.5 shadow-lg"
            style={{ top: pos.top, left: pos.left, transform: "translateX(-50%)" }}
          >
            {statusOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onUpdate(contact._id, s);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-card/50 ${s === contact.status ? "bg-card/30" : ""}`}
              >
                <span
                  className={`size-2 rounded-full ${s === "New" ? "bg-accent" : s === "Pending" ? "bg-yellow-400" : s === "Talk" ? "bg-blue-400" : "bg-emerald-400"}`}
                />
                {s}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ContactsPage() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [localContacts, setLocalContacts] = useState<Contact[] | null>(null);
  const [viewContact, setViewContact] = useState<Contact | null>(null);

  const { data: contacts, pagination, loading, search: fetchContacts } = useContacts();

  useEffect(() => {
    fetchContacts({ page: 1, limit: 10 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const display = localContacts ?? contacts;

  const handleSearch = () => {
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      toast.error("To Date cannot be earlier than From Date");
      return;
    }
    setPage(1);
    setLocalContacts(null);
    fetchContacts({ search, status: filterStatus, fromDate, toDate, page: 1, limit: 10 });
  };

  const handleReset = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setFilterStatus("All");
    setPage(1);
    setExpandedId(null);
    setLocalContacts(null);
    fetchContacts({ page: 1, limit: 10 });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLocalContacts(null);
    fetchContacts({ search, status: filterStatus, fromDate, toDate, page: newPage, limit: 10 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleStatusUpdate = async (id: string, status: ContactStatus) => {
    try {
      const updated = await updateContactStatus(id, status);
      setLocalContacts((prev) => (prev ?? contacts).map((c) => (c._id === id ? updated : c)));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const startRecord = pagination ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const endRecord = pagination
    ? Math.min(pagination.page * pagination.limit, pagination.totalRecords)
    : 0;

  const hasActiveFilters = search || fromDate || toDate || filterStatus !== "All";

  return (
    <div>
      <PageHeader title="Contacts" description="Messages and inquiries from visitors" />

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
            <label className="mb-1.5 block text-xs text-muted-foreground">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="min-w-0 flex-1 basis-full sm:basis-0">
            <label className="mb-1.5 block text-xs text-muted-foreground">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="min-w-0 flex-1 basis-full sm:basis-0">
            <label className="mb-1.5 block text-xs text-muted-foreground">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={selectClass}
            >
              {filterStatusOptions.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Statuses" : s}
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
          Loading contacts...
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
                    Company
                  </th>
                  <th className="hidden whitespace-nowrap px-5 py-3.5 font-medium md:table-cell">
                    Budget
                  </th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Status</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Date</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {display.map((c: Contact) => (
                  <Fragment key={c._id}>
                    <tr
                      className="cursor-pointer border-b border-border last:border-0 hover:bg-card/20"
                      onClick={() => setExpandedId(expandedId === c._id ? null : c._id)}
                    >
                      <td className="whitespace-nowrap px-5 py-3.5 font-medium text-foreground">
                        {c.name}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">
                        {c.email}
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground sm:table-cell">
                        {c.mobile || "-"}
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground sm:table-cell">
                        {c.company || "-"}
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground md:table-cell">
                        {c.budget || "-"}
                      </td>
                      <td
                        className="whitespace-nowrap px-5 py-3.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <StatusDropdown contact={c} onUpdate={handleStatusUpdate} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleDateString("en-IN", {
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
                        <button
                          type="button"
                          onClick={() => setViewContact(c)}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground"
                          title="View details"
                        >
                          <Eye className="size-4" />
                        </button>
                      </td>
                    </tr>
                    {expandedId === c._id && (
                      <tr key={`${c._id}-expanded`}>
                        <td colSpan={8} className="border-b border-border bg-card/10 px-5 py-4">
                          <div className="flex items-start gap-3">
                            <MessageSquare className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {c.message}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
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
                  .filter((n) => n === 1 || n === pagination.totalPages || Math.abs(n - page) <= 1)
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
          icon={Mail}
          title={hasActiveFilters ? "No matching contacts" : "No contacts found"}
          description={
            hasActiveFilters
              ? "No contacts found matching the selected filters."
              : "No contact messages yet."
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

      <ContactViewModal
        contact={viewContact!}
        open={!!viewContact}
        onClose={() => setViewContact(null)}
      />
    </div>
  );
}
