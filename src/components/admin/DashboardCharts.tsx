import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import type { DashboardCharts as ChartsData } from "@/hooks/useAdminData";

const COLOR: Record<string, string> = {
  "New Order":"#f59e0b", Contact:"#3b82f6", Payment:"#10b981",
  "Start Project":"#8b5cf6", Complete:"#22c55e", "On Way":"#06b6d4", Delivered:"#16a34a",
  "Start Create":"#6b7280", "Model Complete":"#10b981", Dispatched:"#3b82f6", Shipped:"#8b5cf6",
};

const TIP = {
  contentStyle: { background:"rgba(0,0,0,0.85)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", fontSize:"12px", backdropFilter:"blur(8px)" },
  labelStyle: { color:"#fff" },
};

function Card({ title, desc, children, className }: { title:string; desc?:string; children:React.ReactNode; className?:string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 ${className??""}`}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {desc && <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function Empty() {
  return <div className="flex h-[260px] items-center justify-center text-xs text-muted-foreground">No data available</div>;
}

function BookingTrendArea({ data }: { data: ChartsData["dailyTrend30"] }) {
  if (!data?.length) return <Empty />;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient></defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="date" tick={{fontSize:10,fill:"#888"}} tickFormatter={(v)=>v?.slice(5)||""} />
        <YAxis tick={{fontSize:10,fill:"#888"}} allowDecimals={false} />
        <Tooltip {...TIP} />
        <Area type="monotone" dataKey="bookings" stroke="#f59e0b" fill="url(#bg)" strokeWidth={2} dot={false} activeDot={{r:4}} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function PieChartCard({ data, title, desc }: { data: ChartsData["bookingStatusDist"]; title:string; desc?:string }) {
  if (!data?.length) return <Card title={title} desc={desc}><Empty /></Card>;
  return (
    <Card title={title} desc={desc}>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={3}>
            {data.map((e) => <Cell key={e.status} fill={COLOR[e.status]||"#888"} />)}
          </Pie>
          <Tooltip {...TIP} />
          <Legend wrapperStyle={{fontSize:"10px"}} iconSize={8} formatter={(v)=><span style={{color:"#999"}}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

function MonthlyBar({ data }: { data: ChartsData["monthlyBookings"] }) {
  if (!data?.length) return <Empty />;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" tick={{fontSize:10,fill:"#888"}} />
        <YAxis tick={{fontSize:10,fill:"#888"}} allowDecimals={false} />
        <Tooltip {...TIP} />
        <Bar dataKey="count" fill="#f59e0b" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function TopModelsBar({ data }: { data: ChartsData["topModels"] }) {
  if (!data?.length) return <Empty />;
  const rev = [...data].reverse();
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={rev} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis type="number" tick={{fontSize:10,fill:"#888"}} allowDecimals={false} />
        <YAxis dataKey="name" type="category" tick={{fontSize:10,fill:"#888"}} width={90} />
        <Tooltip {...TIP} />
        <Bar dataKey="count" fill="#8b5cf6" radius={[0,4,4,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomerGrowthLine({ data }: { data: ChartsData["customerGrowth"] }) {
  if (!data?.length) return <Empty />;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" tick={{fontSize:10,fill:"#888"}} />
        <YAxis tick={{fontSize:10,fill:"#888"}} allowDecimals={false} />
        <Tooltip {...TIP} />
        <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} dot={{r:3}} activeDot={{r:5}} />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface Props { charts: ChartsData; }

export function DashboardChartsSection({ charts }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Booking Trend" desc="Last 30 days"><BookingTrendArea data={charts.dailyTrend30} /></Card>
        <PieChartCard data={charts.bookingStatusDist} title="Booking Status" desc="Distribution across all statuses" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <PieChartCard data={charts.orderStatusDist} title="Order Fulfillment" desc="Orders by fulfillment stage" />
        <Card title="Monthly Bookings" desc="Bookings per month"><MonthlyBar data={charts.monthlyBookings} /></Card>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Top Models" desc="Most booked 3D models"><TopModelsBar data={charts.topModels} /></Card>
        <Card title="Customer Growth" desc="Unique customers per month"><CustomerGrowthLine data={charts.customerGrowth} /></Card>
      </div>
    </div>
  );
}
