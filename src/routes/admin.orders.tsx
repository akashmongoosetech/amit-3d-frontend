import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  RotateCcw,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { BookingViewModal } from "@/components/admin/BookingViewModal";
import { useOrdersData, updateOrderOrderStatus } from "@/hooks/useAdminData";
import type { Booking, BookingStatus, OrderItem, OrderStatus } from "@/hooks/useAdminData";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [{ title: "Orders — Verto3D Admin" }],
  }),
  component: OrdersPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

const statusStyles: Record<BookingStatus, string> = {
  "New Order": "border-accent/30 bg-accent/5 text-accent",
  Contact: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  Payment: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  "Start Project": "border-purple-500/30 bg-purple-500/5 text-purple-400",
  Complete: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  "On Way": "border-cyan-500/30 bg-cyan-500/5 text-cyan-400",
  Delivered: "border-green-500/30 bg-green-500/5 text-green-400",
};

const orderStatusColors: Record<OrderStatus, string> = {
  "Start Create": "border-gray-500/30 bg-gray-500/5 text-gray-400",
  "Model Complete": "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  Dispatched: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  Shipped: "border-purple-500/30 bg-purple-500/5 text-purple-400",
};

const colorMap: Record<string, string> = {
  "Start Create": "bg-gray-400",
  "Model Complete": "bg-emerald-400",
  Dispatched: "bg-blue-400",
  Shipped: "bg-purple-400",
};

const allOrderStatuses: OrderStatus[] = ["Start Create", "Model Complete", "Dispatched", "Shipped"];

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${orderStatusColors[status]}`}
    >
      <span className="size-1.5 rounded-full currentColor opacity-70" />
      {status}
    </span>
  );
}

function OrderStatusDropdown({
  order,
  onUpdate,
}: {
  order: OrderItem;
  onUpdate: (id: string, status: OrderStatus) => void;
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
        <OrderStatusBadge status={order.orderStatus} />
        <ChevronDown className="size-3 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            className="fixed z-40 w-44 rounded-xl border border-border bg-black p-1.5 shadow-lg"
            style={{ top: pos.top, left: pos.left, transform: "translateX(-50%)" }}
          >
            {allOrderStatuses.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onUpdate(order._id, s);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-card/50 ${s === order.orderStatus ? "bg-card/30" : ""}`}
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

function OrdersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [localOrders, setLocalOrders] = useState<OrderItem[] | null>(null);
  const [viewOrder, setViewOrder] = useState<OrderItem | null>(null);

  const { data: orders, pagination, loading, search: fetchOrders } = useOrdersData();

  useEffect(() => {
    fetchOrders({ page: 1, limit: 10 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const display = localOrders ?? orders;

  const handleSearch = () => {
    setPage(1);
    setLocalOrders(null);
    fetchOrders({ search, page: 1, limit: 10 });
  };

  const handleReset = () => {
    setSearch("");
    setPage(1);
    setLocalOrders(null);
    fetchOrders({ page: 1, limit: 10 });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLocalOrders(null);
    fetchOrders({ search, page: newPage, limit: 10 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleOrderStatusUpdate = async (id: string, orderStatus: OrderStatus) => {
    try {
      const updated = await updateOrderOrderStatus(id, orderStatus);
      setLocalOrders((prev) =>
        (prev ?? orders).map((o) =>
          o._id === id ? { ...o, orderStatus: updated.orderStatus } : o,
        ),
      );
      toast.success(`Order status updated to ${orderStatus}`);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  const startRecord = pagination ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const endRecord = pagination
    ? Math.min(pagination.page * pagination.limit, pagination.totalRecords)
    : 0;

  const hasActiveFilters = !!search;

  return (
    <div>
      <PageHeader title="Orders" description="Track and manage customer orders" />

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
                placeholder="Search by Name, Email, Mobile or Model"
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
          Loading orders...
        </div>
      ) : display.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-160">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/30 text-left text-xs uppercase text-muted-foreground">
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Order ID</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Customer</th>
                  <th className="hidden whitespace-nowrap px-5 py-3.5 font-medium sm:table-cell">
                    Email
                  </th>
                  <th className="hidden whitespace-nowrap px-5 py-3.5 font-medium sm:table-cell">
                    Mobile
                  </th>
                  <th className="hidden whitespace-nowrap px-5 py-3.5 font-medium md:table-cell">
                    Model Name
                  </th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Booking Status</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Order Status</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Date</th>
                  <th className="whitespace-nowrap px-5 py-3.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {display.map((o: OrderItem) => (
                  <tr key={o._id} className="cursor-pointer border-b border-border last:border-0 hover:bg-card/20" onClick={() => setViewOrder(o)}>
                    <td className="whitespace-nowrap px-5 py-3.5 text-xs font-medium text-muted-foreground">
                      {o._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 font-medium text-foreground">
                      {o.name}
                    </td>
                    <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground sm:table-cell">
                      {o.email}
                    </td>
                    <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground sm:table-cell">
                      {o.mobile}
                    </td>
                    <td className="hidden whitespace-nowrap px-5 py-3.5 text-muted-foreground md:table-cell">
                      {o.modelName || "-"}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[o.status]}`}
                      >
                        <span className="size-1.5 rounded-full currentColor opacity-70" />
                        {o.status}
                      </span>
                    </td>
                    <td
                      className="whitespace-nowrap px-5 py-3.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <OrderStatusDropdown order={o} onUpdate={handleOrderStatusUpdate} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">
                      {o.createdAt
                        ? new Date(o.createdAt).toLocaleDateString("en-IN", {
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
                        onClick={() => setViewOrder(o)}
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground"
                        title="View details"
                      >
                        <Eye className="size-4" />
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
          icon={ShoppingCart}
          title={hasActiveFilters ? "No matching orders" : "No orders yet"}
          description={
            hasActiveFilters
              ? "No orders found matching the search term."
              : "Orders will appear here once a booking reaches Payment status."
          }
          action={
            hasActiveFilters ? (
              <button
                type="button"
                onClick={handleReset}
                className="btn-pill inline-flex items-center gap-2 border border-border px-4 py-2 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" />
                Reset Search
              </button>
            ) : undefined
          }
        />
      )}

      <BookingViewModal
        booking={viewOrder as unknown as Booking}
        open={!!viewOrder}
        onClose={() => setViewOrder(null)}
      />
    </div>
  );
}
