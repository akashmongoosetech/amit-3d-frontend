import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays, Clock, RefreshCw, ShoppingCart, Users, Mail,
  Box, CheckCircle2, Truck, Hourglass, TrendingUp, Activity,
  Eye, Sparkles, PlusCircle, ListOrdered, Settings, Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { DashboardKpiCard } from "@/components/admin/DashboardKpiCard";
import { DashboardChartsSection } from "@/components/admin/DashboardCharts";
import { DashboardActivityTimeline } from "@/components/admin/DashboardActivityTimeline";
import { DashboardPipeline } from "@/components/admin/DashboardPipeline";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useDashboardData } from "@/hooks/useAdminData";
import type { DashboardData } from "@/hooks/useAdminData";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard \u2014 Verto3D Admin" }],
  }),
  component: DashboardPage,
});

const inputClass = "w-full rounded-xl border border-input bg-black/40 px-3 py-2 text-xs outline-none transition-colors focus:border-ring";

const FILTERS = [
  { label: "Today", value: "today" },
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "1Y", value: "1y" },
  { label: "All", value: "" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function SkeletonCard() { return <div className="h-[118px] animate-pulse rounded-xl bg-card/50" />; }
function SkeletonChart() { return <div className="h-[340px] animate-pulse rounded-xl bg-card/50" />; }

function QuickActionCard({ icon: Icon, label, onClick }: { icon: typeof PlusCircle; label: string; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 text-left text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-accent/5 hover:text-foreground hover:shadow-md"
    >
      <div className="rounded-lg bg-accent/10 p-2 text-accent"><Icon className="size-4" /></div>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function DashboardWelcome({ name }: { name: string }) {
  const [time, setTime] = useState(formatTime());
  useEffect(() => { const id = setInterval(() => setTime(formatTime()), 10000); return () => clearInterval(id); }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/5 via-card to-card p-6 sm:p-8">
      <div className="absolute right-0 top-0 opacity-[0.03]"><Sparkles className="size-40" /></div>
      <div className="relative space-y-1">
        <h1 className="heading-display text-xl sm:text-2xl">
          {getGreeting()}, {name.split(" ")[0]} <span className="serif-accent text-accent">👋</span>
        </h1>
        <p className="text-sm text-muted-foreground">Welcome to your admin dashboard</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><CalendarDays className="size-3.5" />{formatDate()}</div>
          <div className="flex items-center gap-1.5"><Clock className="size-3.5" />{time}</div>
        </div>
      </div>
    </div>
  );
}

function DashboardFilters({ active, onChange, fromDate, toDate, onFromDateChange, onToDateChange }: {
  active: string; onChange: (v: string) => void;
  fromDate: string; toDate: string;
  onFromDateChange: (v: string) => void; onToDateChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map((f) => (
        <button key={f.value} type="button" onClick={() => onChange(f.value)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${active === f.value ? "bg-accent text-accent-foreground shadow-sm" : "bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"}`}
        >{f.label}</button>
      ))}
      <button type="button" onClick={() => onChange("custom")}
        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${active === "custom" ? "bg-accent text-accent-foreground shadow-sm" : "bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"}`}
      >Custom</button>
      {active === "custom" && (
        <div className="flex items-center gap-2">
          <input type="date" value={fromDate} onChange={(e) => onFromDateChange(e.target.value)} className={inputClass} />
          <span className="text-xs text-muted-foreground">\u2014</span>
          <input type="date" value={toDate} onChange={(e) => onToDateChange(e.target.value)} className={inputClass} />
        </div>
      )}
    </div>
  );
}

function RecentOrdersTable({ orders }: { orders: DashboardData["recentOrders"] }) {
  if (!orders?.length) return <div className="flex items-center justify-center py-12 text-xs text-muted-foreground">No orders yet</div>;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2.5 pr-4 font-medium">Customer</th>
              <th className="pb-2.5 pr-4 font-medium">Model</th>
              <th className="pb-2.5 pr-4 font-medium">Order Status</th>
              <th className="pb-2.5 pr-4 font-medium">Date</th>
              <th className="pb-2.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b border-border last:border-0 hover:bg-card/20">
                <td className="py-3 pr-4 font-medium text-foreground">{o.name}</td>
                <td className="py-3 pr-4 text-muted-foreground">{o.modelName || "\u2014"}</td>
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400" />{o.orderStatus}
                  </span>
                </td>
                <td className="py-3 pr-4 text-xs text-muted-foreground">{o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-IN") : "\u2014"}</td>
                <td className="py-3">
                  <button type="button" className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground" title="View order"><Eye className="size-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecentContactsTable({ contacts }: { contacts: DashboardData["recentContacts"] }) {
  if (!contacts?.length) return <div className="flex items-center justify-center py-12 text-xs text-muted-foreground">No contacts yet</div>;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[400px]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2.5 pr-4 font-medium">Name</th>
              <th className="pb-2.5 pr-4 font-medium">Email</th>
              <th className="pb-2.5 pr-4 font-medium">Status</th>
              <th className="pb-2.5 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="border-b border-border last:border-0 hover:bg-card/20">
                <td className="py-3 pr-4 font-medium text-foreground">{c.name}</td>
                <td className="py-3 pr-4 text-muted-foreground">{c.email}</td>
                <td className="py-3 pr-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                    c.status === "New" ? "border-amber-500/30 bg-amber-500/5 text-amber-400" :
                    c.status === "Pending" ? "border-yellow-500/30 bg-yellow-500/5 text-yellow-400" :
                    c.status === "Talk" ? "border-blue-500/30 bg-blue-500/5 text-blue-400" :
                    "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"}`}
                  ><span className="size-1.5 rounded-full currentColor" />{c.status}</span>
                </td>
                <td className="py-3 text-xs text-muted-foreground">{c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-IN") : "\u2014"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4 text-center transition-colors hover:bg-card/60">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="heading-display mt-1 text-xl text-foreground">{value}</p>
      {sub && <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function DashboardPage() {
  const { user } = useAdminAuth();
  const { data, loading, refetch } = useDashboardData();
  const [period, setPeriod] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    const params: Record<string, string> = {};
    if (period) params.period = period;
    if (period === "custom") { if (fromDate) params.fromDate = fromDate; if (toDate) params.toDate = toDate; }
    await refetch(params);
    setRefreshing(false);
  };

  const handleFilterChange = (v: string) => { setPeriod(v); };

  useEffect(() => {
    const params: Record<string, string> = {};
    if (period) params.period = period;
    if (period === "custom") { if (fromDate) params.fromDate = fromDate; if (toDate) params.toDate = toDate; }
    refetch(params);
  }, [period, fromDate, toDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const s = data?.summary;
  const c = data?.charts;
  const ro = data?.recentOrders;
  const rc = data?.recentContacts;
  const a = data?.activities;
  const p = data?.pipeline;

  const name = user ? `${user.firstName} ${user.lastName}` : "Administrator";

  const kpis = s ? [
    { label: "Total Bookings", value: s.totalBookings, icon: ShoppingCart, trend: s.bookingTrend, iconColor: "text-amber-400", iconBg: "bg-amber-500/10" },
    { label: "Total Orders", value: s.totalOrders, icon: ListOrdered, trend: s.orderTrend, iconColor: "text-emerald-400", iconBg: "bg-emerald-500/10" },
    { label: "Active Projects", value: s.activeProjects, icon: Box, iconColor: "text-purple-400", iconBg: "bg-purple-500/10" },
    { label: "Completed", value: s.completedProjects, icon: CheckCircle2, iconColor: "text-green-400", iconBg: "bg-green-500/10" },
    { label: "Delivered", value: s.deliveredModels, icon: Truck, iconColor: "text-cyan-400", iconBg: "bg-cyan-500/10" },
    { label: "Pending Payments", value: s.pendingPayments, icon: Hourglass, iconColor: "text-red-400", iconBg: "bg-red-500/10" },
    { label: "Total Contacts", value: s.totalContacts, icon: Mail, trend: s.contactTrend, iconColor: "text-blue-400", iconBg: "bg-blue-500/10" },
    { label: "New This Week", value: s.newBookings, icon: TrendingUp, iconColor: "text-accent", iconBg: "bg-accent/10" },
  ] : [];

  if (loading && !data) {
    return (
      <div>
        <PageHeader title="Dashboard" description="Overview of your Verto3D admin panel" />
        <div className="mb-6 h-32 animate-pulse rounded-2xl bg-card/50" />
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}</div>
        <div className="grid gap-5 lg:grid-cols-2"><SkeletonChart /><SkeletonChart /></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <PageHeader title="Dashboard" description="Overview of your Verto3D admin panel" />
        <EmptyState icon={Activity} title="No data available" description="Dashboard data will appear here once data is available."
          action={<button type="button" onClick={handleRefresh} className="btn-pill inline-flex items-center gap-2 border border-border px-4 py-2 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"><RefreshCw className="size-3.5" />Retry</button>}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your Verto3D admin panel"
        actions={
          <button type="button" onClick={handleRefresh} disabled={refreshing}
            className="btn-pill inline-flex items-center gap-2 border border-border px-4 py-2 text-xs text-muted-foreground transition-all hover:border-foreground hover:text-foreground disabled:opacity-50"
          ><RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />Refresh</button>
        }
      />

      <div className="space-y-6">
        <DashboardWelcome name={name} />

        <DashboardFilters active={period} onChange={handleFilterChange}
          fromDate={fromDate} toDate={toDate}
          onFromDateChange={setFromDate} onToDateChange={setToDate}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((card) => <DashboardKpiCard key={card.label} {...card} />)}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardChartsSection charts={c!} />
          </div>
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Project Pipeline</h3>
              <DashboardPipeline pipeline={p!} />
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="In Progress" value={p?.inProgress ?? 0} sub="Active items" />
                <StatCard label="Completion" value={`${p?.completionPercentage ?? 0}%`} sub="Pipeline" />
                <StatCard label="New Bookings" value={s?.newBookings ?? 0} sub="This week" />
                <StatCard label="New Contacts" value={s?.newContacts ?? 0} sub="This week" />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Activity className="size-4 text-accent" />Recent Activity
              </h3>
              <DashboardActivityTimeline activities={a!} />
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <QuickActionCard icon={PlusCircle} label="Add Booking" />
                <QuickActionCard icon={Eye} label="View Orders" />
                <QuickActionCard icon={Mail} label="Contacts" />
                <QuickActionCard icon={Settings} label="Settings" />
                <QuickActionCard icon={Download} label="Export" />
                <QuickActionCard icon={RefreshCw} label="Refresh" onClick={handleRefresh} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
              <span className="text-[10px] text-muted-foreground">Last 5</span>
            </div>
            <RecentOrdersTable orders={ro!} />
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Recent Contacts</h3>
              <span className="text-[10px] text-muted-foreground">Last 5</span>
            </div>
            <RecentContactsTable contacts={rc!} />
          </div>
        </div>
      </div>
    </div>
  );
}
