import { createFileRoute } from "@tanstack/react-router";
import { Search, ShoppingCart, Filter } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders — Verto3D Admin" },
    ],
  }),
  component: OrdersPage,
});

const sampleOrders = [
  { id: "#ORD-001", customer: "AeroForm Manufacturing", product: "CNC Enclosure Model", status: "Completed" as const, amount: "₹4.2L", date: "12 Jul 2026" },
  { id: "#ORD-002", customer: "Sterling Development", product: "Residence Interior", status: "Processing" as const, amount: "₹6.8L", date: "10 Jul 2026" },
  { id: "#ORD-003", customer: "DesignCraft Studio", product: "Product Catalog Set", status: "Completed" as const, amount: "₹1.5L", date: "08 Jul 2026" },
  { id: "#ORD-004", customer: "Urban Concepts", product: "Furniture Collection", status: "Pending" as const, amount: "₹3.2L", date: "06 Jul 2026" },
  { id: "#ORD-005", customer: "GreenBuild Engineers", product: "Structural Model", status: "Processing" as const, amount: "₹5.1L", date: "04 Jul 2026" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Completed: "default",
  Processing: "secondary",
  Pending: "outline",
};

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function OrdersPage() {
  const [search, setSearch] = useState("");

  const filtered = sampleOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()),
  );

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

      {filtered.length > 0 ? (
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
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-card/20">
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
