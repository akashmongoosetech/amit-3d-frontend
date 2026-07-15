import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Users, Mail, ShoppingCart, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Verto3D Admin" },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { label: "Total Users", value: "1,248", icon: Users, trend: "12%", trendUp: true },
  { label: "Total Contacts", value: "384", icon: Mail, trend: "8%", trendUp: true },
  { label: "Total Orders", value: "156", icon: ShoppingCart, trend: "23%", trendUp: true },
  { label: "Revenue", value: "₹48.2L", icon: DollarSign, trend: "18%", trendUp: true },
];

const recentOrders = [
  { id: "#ORD-001", customer: "AeroForm Manufacturing", product: "CNC Enclosure Model", status: "Completed", amount: "₹4.2L", date: "12 Jul 2026" },
  { id: "#ORD-002", customer: "Sterling Development", product: "Residence Interior", status: "Processing", amount: "₹6.8L", date: "10 Jul 2026" },
  { id: "#ORD-003", customer: "DesignCraft Studio", product: "Product Catalog Set", status: "Completed", amount: "₹1.5L", date: "08 Jul 2026" },
  { id: "#ORD-004", customer: "Urban Concepts", product: "Furniture Collection", status: "Pending", amount: "₹3.2L", date: "06 Jul 2026" },
  { id: "#ORD-005", customer: "GreenBuild Engineers", product: "Structural Model", status: "Processing", amount: "₹5.1L", date: "04 Jul 2026" },
];

const recentActivity = [
  { action: "New user registered", detail: "john.doe@example.com", time: "2 hours ago" },
  { action: "Order completed", detail: "#ORD-001 — CNC Enclosure Model", time: "4 hours ago" },
  { action: "New contact message", detail: "From: Sterling Development", time: "6 hours ago" },
  { action: "Order placed", detail: "#ORD-006 — Retail Display Set", time: "8 hours ago" },
  { action: "Profile updated", detail: "Admin settings changed", time: "12 hours ago" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Completed: "default",
  Processing: "secondary",
  Pending: "outline",
};

function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your Verto3D admin panel" />

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map((item, i) => (
                <li key={i} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Latest Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Latest Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Order</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="hidden px-5 py-3 font-medium sm:table-cell">Product</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3.5 text-xs font-medium text-muted-foreground">{o.id}</td>
                      <td className="px-5 py-3.5 text-sm">{o.customer}</td>
                      <td className="hidden px-5 py-3.5 text-sm text-muted-foreground sm:table-cell">{o.product}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant={statusVariant[o.status] ?? "outline"} className="text-[10px]">
                          {o.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-right text-sm font-medium">{o.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
