import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Mail, RotateCcw, Search, Trash2, X } from "lucide-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useSubscribers, deleteSubscriber } from "@/hooks/useAdminData";
import type { Subscriber } from "@/hooks/useAdminData";

export const Route = createFileRoute("/admin/subscribers")({
  head: () => ({
    meta: [{ title: "Subscribers — Verto3D Admin" }],
  }),
  component: SubscribersPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function SubscribersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [localData, setLocalData] = useState<Subscriber[] | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const { data: subscribers, pagination, loading, search: fetchSubscribers } = useSubscribers();

  useEffect(() => {
    fetchSubscribers({ page: 1, limit: 10 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const display = localData ?? subscribers;

  const handleSearch = () => {
    setPage(1);
    setLocalData(null);
    fetchSubscribers({ search, page: 1, limit: 10 });
  };

  const handleReset = () => {
    setSearch("");
    setPage(1);
    setLocalData(null);
    fetchSubscribers({ page: 1, limit: 10 });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLocalData(null);
    fetchSubscribers({ search, page: newPage, limit: 10 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteSubscriber(confirmDeleteId);
      setLocalData((prev) => (prev ?? subscribers).filter((s) => s._id !== confirmDeleteId));
      toast.success("Subscriber removed");
    } catch {
      toast.error("Failed to remove subscriber");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const startRecord = pagination ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const endRecord = pagination
    ? Math.min(pagination.page * pagination.limit, pagination.totalRecords)
    : 0;

  const hasActiveFilters = !!search;

  return (
    <div>
      <PageHeader
        title="Subscribers"
        description="Email newsletter subscribers from the footer"
      />

      <div className="mb-5 space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-0 flex-1 basis-full sm:basis-0">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by email"
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
          Loading subscribers...
        </div>
      ) : display.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-160">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/30 text-left text-xs uppercase text-muted-foreground">
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Email</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Subscribed On</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {display.map((s: Subscriber) => (
                  <tr
                    key={s._id}
                    className="border-b border-border last:border-0 hover:bg-card/20"
                  >
                    <td className="whitespace-nowrap px-5 py-3.5 font-medium text-foreground">
                      {s.email}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">
                      {s.createdAt
                        ? new Date(s.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(s._id)}
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                        title="Remove subscriber"
                      >
                        <Trash2 className="size-4" />
                      </button>
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
          title={hasActiveFilters ? "No matching subscribers" : "No subscribers yet"}
          description={
            hasActiveFilters
              ? "No subscribers found matching your search."
              : "Subscribe emails from the site footer will appear here."
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

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Remove subscriber"
        message={`Are you sure you want to remove ${confirmDeleteId ? subscribers.find((s) => s._id === confirmDeleteId)?.email : "this subscriber"} from the mailing list?`}
        confirmLabel="Remove"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
        destructive
      />
    </div>
  );
}
