import { ArrowDown } from "lucide-react";
import type { DashboardPipeline as PipelineData } from "@/hooks/useAdminData";

const stageColors: Record<string, string> = {
  "New Order": "bg-amber-500", Contact: "bg-blue-500", Payment: "bg-emerald-500",
  "Start Project": "bg-purple-500", Complete: "bg-green-500", "On Way": "bg-cyan-500", Delivered: "bg-emerald-600",
};

interface DashboardPipelineProps {
  pipeline: PipelineData;
}

export function DashboardPipeline({ pipeline }: DashboardPipelineProps) {
  if (!pipeline || !pipeline.stages || pipeline.stages.length === 0) {
    return <div className="flex items-center justify-center py-12 text-xs text-muted-foreground">No pipeline data</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{pipeline.totalInPipeline}</span> total in pipeline
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-emerald-400">{pipeline.completionPercentage}%</span> complete
        </div>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-600 transition-all duration-700"
          style={{ width: `${Math.min(pipeline.completionPercentage, 100)}%` }}
        />
      </div>

      <div className="space-y-2">
        {pipeline.stages.map((stage, idx) => (
          <div key={stage.name}>
            <div className="flex items-center gap-3">
              <div className={`size-2.5 shrink-0 rounded-full ${stageColors[stage.name] || "bg-muted"}`} />
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm text-foreground">{stage.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{stage.count}</span>
                  <span className="text-[10px] text-muted-foreground">{stage.percentage}%</span>
                </div>
              </div>
            </div>
            {idx < pipeline.stages.length - 1 && (
              <div className="ml-[5px] pl-[1.5px] pt-0.5">
                <ArrowDown className="size-2.5 text-muted-foreground/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
