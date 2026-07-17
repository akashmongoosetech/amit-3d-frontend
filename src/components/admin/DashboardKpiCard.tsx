import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DashboardKpiCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  iconColor?: string;
  iconBg?: string;
}

function animateValue(start: number, end: number, duration: number, onTick: (v: number) => void) {
  const startTime = performance.now();
  const tick = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    onTick(current);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function DashboardKpiCard({
  label, value, icon: Icon, trend, iconColor = "text-accent", iconBg = "bg-accent/10",
}: DashboardKpiCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      animateValue(0, value, 1200, setDisplayValue);
      hasAnimated.current = true;
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  const formatted = displayValue.toLocaleString("en-IN");

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="heading-display text-2xl tracking-tight text-foreground">
            {formatted}
          </p>
        </div>
        <div className={`rounded-full ${iconBg} p-2.5 ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="size-[18px]" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          {trend > 0 ? (
            <TrendingUp className="size-3.5 text-emerald-400" />
          ) : trend < 0 ? (
            <TrendingDown className="size-3.5 text-red-400" />
          ) : (
            <Minus className="size-3.5 text-muted-foreground" />
          )}
          <span className={`text-xs font-medium ${trend > 0 ? "text-emerald-400" : trend < 0 ? "text-red-400" : "text-muted-foreground"}`}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
          <span className="text-xs text-muted-foreground">vs prev period</span>
        </div>
      )}
    </div>
  );
}
