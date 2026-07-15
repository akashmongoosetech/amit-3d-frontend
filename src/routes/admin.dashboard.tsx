import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Users, Mail, ShoppingCart, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { EmptyState } from "@/components/admin/EmptyState";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDashboardData } from "@/hooks/useAdminData";
import type { DashboardStats } from "@/hooks/useAdminData";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Verto3D Admin" },
    ],
  }),
  component: DashboardPage,
});

const iconMap: Record<string, typeof Users> = {
  "Total Users": Users,
  "Total Contacts": Mail,
  "Total Orders": ShoppingCart,
  Revenue: DollarSign,
};

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Completed: "default",
  Processing: "secondary",
  Pending: "outline",
};

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-card/50 ${className ?? ""}`} />;
}

function DashboardPage() {
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <div>
        <PageHeader title="Dashboard" description="Loading..." />
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <PageHeader title="Dashboard" description="Overview of your Verto3D admin panel" />
        <EmptyState
          icon={LayoutDashboard}
          title="No data available"
          description="Dashboard data will appear here once the backend endpoints are connected."
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your Verto3D admin panel" />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((s: DashboardStats) => (
          <StatsCard key={s.label} {...s} icon={iconMap[s.label] || Users} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentActivity.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No recent activity</p>
            ) : (
              <ul className="space-y-4">
                {data.recentActivity.map((item, i) => (
                  <li key={i} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Latest Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {data.recentOrders.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-muted-foreground">No orders yet</p>
            ) : (
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
                    {data.recentOrders.map((o) => (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
