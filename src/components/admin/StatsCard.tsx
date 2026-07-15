import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ label, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="heading-display mt-1.5 text-2xl">{value}</p>
        </div>
        <div className="rounded-full bg-accent/10 p-2.5 text-accent">
          <Icon className="size-[18px]" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1 text-xs">
          {trendUp ? (
            <TrendingUp className="size-3.5 text-green-500" />
          ) : (
            <TrendingDown className="size-3.5 text-red-500" />
          )}
          <span className={cn(trendUp ? "text-green-500" : "text-red-500")}>
            {trend}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}
