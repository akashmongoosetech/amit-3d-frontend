import { createFileRoute } from "@tanstack/react-router";
import { Search, ShoppingCart, Filter } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/hooks/useAdminData";
import type { Order } from "@/hooks/useAdminData";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders — Verto3D Admin" },
    ],
  }),
  component: OrdersPage,
});

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Completed: "default",
  Processing: "secondary",
  Pending: "outline",
};

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function OrdersPage() {
  const [search, setSearch] = useState("");
  const { data: orders, loading } = useOrders(search);

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track and manage customer orders"
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders…"
            className={inputClass}
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>
        <button className="btn-pill border border-border px-4 py-2.5 text-sm text-muted-foreground hover:border-foreground hover:text-foreground">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">Loading orders...</div>
      ) : orders.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card/30 text-left text-xs uppercase text-muted-foreground">
                <th className="px-5 py-3.5 font-medium">Order</th>
                <th className="px-5 py-3.5 font-medium">Customer</th>
                <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Product</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="hidden px-5 py-3.5 font-medium md:table-cell">Date</th>
                <th className="px-5 py-3.5 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: Order) => (
                <tr key={o._id || o.id} className="border-b border-border last:border-0 hover:bg-card/20">
                  <td className="px-5 py-3.5 text-xs font-medium text-muted-foreground">{o.id}</td>
                  <td className="px-5 py-3.5 font-medium text-foreground">{o.customer}</td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground sm:table-cell">{o.product}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant[o.status] ?? "outline"} className="text-[10px]">
                      {o.status}
                    </Badge>
                  </td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground md:table-cell">{o.date}</td>
                  <td className="px-5 py-3.5 text-right text-sm font-medium">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={ShoppingCart}
          title="No orders found"
          description={search ? "Try a different search term." : "No orders have been placed yet."}
        />
      )}
    </div>
  );
}
