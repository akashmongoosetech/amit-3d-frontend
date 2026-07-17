import { ShoppingCart, Mail, Clock } from "lucide-react";
import type { DashboardActivity } from "@/hooks/useAdminData";

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const statusColors: Record<string, string> = {
  "New Order": "bg-amber-500", Contact: "bg-blue-500", Payment: "bg-emerald-500",
  "Start Project": "bg-purple-500", Complete: "bg-green-500", "On Way": "bg-cyan-500", Delivered: "bg-emerald-600",
  New: "bg-amber-500", Pending: "bg-yellow-500", Talk: "bg-blue-500", Resolved: "bg-emerald-500",
};

interface DashboardActivityTimelineProps {
  activities: DashboardActivity[];
}

export function DashboardActivityTimeline({ activities }: DashboardActivityTimelineProps) {
  if (!activities || activities.length === 0) {
    return <div className="flex items-center justify-center py-12 text-xs text-muted-foreground">No recent activity</div>;
  }

  return (
    <div className="space-y-0">
      {activities.map((activity, idx) => (
        <div key={activity.id} className="relative flex gap-4 pb-5 last:pb-0">
          {idx < activities.length - 1 && (
            <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
          )}
          <div className={`relative mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${statusColors[activity.status] || "bg-muted"}`}>
            {activity.type === "booking" ? <ShoppingCart className="size-3.5 text-white" /> : <Mail className="size-3.5 text-white" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{activity.action}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{activity.detail}</p>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground/60">
              <Clock className="size-3" />
              {timeAgo(activity.time)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
