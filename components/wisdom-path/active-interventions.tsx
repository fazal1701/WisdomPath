"use client";

import { cn } from "@/lib/utils";
import type { Intervention, MedicineTradition, TierLevel } from "@/lib/mock-data";
import { CheckCircle2, AlertCircle, Pause, TrendingUp, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const traditionLabels: Record<MedicineTradition, string> = {
  tcm: "TCM",
  ayurveda: "Ayurveda",
  unani: "Unani",
  western: "Western",
};

const traditionColors: Record<MedicineTradition, string> = {
  tcm: "bg-tcm/10 text-tcm",
  ayurveda: "bg-ayurveda/10 text-ayurveda",
  unani: "bg-unani/10 text-unani",
  western: "bg-western/10 text-western",
};

const tierLabels: Record<TierLevel, string> = {
  0: "Foundation",
  1: "Physiologic",
  2: "Cultural",
  3: "Targeted",
  4: "Medical",
};

interface ActiveInterventionsProps {
  interventions: Intervention[];
  className?: string;
}

export function ActiveInterventions({ interventions, className }: ActiveInterventionsProps) {
  // Group by tier
  const groupedByTier = interventions.reduce(
    (acc, intervention) => {
      const tier = intervention.tier;
      if (!acc[tier]) acc[tier] = [];
      acc[tier].push(intervention);
      return acc;
    },
    {} as Record<TierLevel, Intervention[]>
  );

  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Active Interventions</h3>
        <button type="button" className="flex items-center gap-1 text-xs text-primary hover:underline">
          View All
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedByTier)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([tier, items]) => (
            <div key={tier}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Tier {tier}: {tierLabels[Number(tier) as TierLevel]}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="space-y-2">
                {items.map((intervention) => (
                  <InterventionItem key={intervention.id} intervention={intervention} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function InterventionItem({ intervention }: { intervention: Intervention }) {
  const statusIcon = {
    active:
      intervention.progress >= 100 ? (
        <CheckCircle2 className="h-4 w-4 text-safe" />
      ) : (
        <TrendingUp className="h-4 w-4 text-primary" />
      ),
    completed: <CheckCircle2 className="h-4 w-4 text-safe" />,
    paused: <Pause className="h-4 w-4 text-caution" />,
  };

  return (
    <div className="group cursor-pointer rounded-lg border border-transparent bg-muted/50 p-3 transition-all hover:border-border hover:bg-muted">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Status Icon or Image */}
          <div className="mt-0.5">
            {intervention.imageUrl ? (
              <div className="relative h-10 w-10 overflow-hidden rounded-md border border-border">
                <img src={intervention.imageUrl} alt={intervention.name} className="h-full w-full object-cover" />
                <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5 shadow-sm">
                  {statusIcon[intervention.status]}
                </div>
              </div>
            ) : (
              statusIcon[intervention.status]
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-medium text-foreground">{intervention.name}</h4>
              <Badge
                variant="secondary"
                className={cn("text-xs", traditionColors[intervention.tradition])}
              >
                {traditionLabels[intervention.tradition]}
              </Badge>
            </div>
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
              {intervention.description}
            </p>
            {intervention.safetyLevel === "caution" && intervention.interactions.length > 0 && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-caution">
                <AlertCircle className="h-3 w-3" />
                <span>
                  Monitor: {intervention.interactions.slice(0, 2).join(", ")}
                  {intervention.interactions.length > 2 &&
                    ` +${intervention.interactions.length - 2} more`}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-medium text-foreground">
            {Math.min(intervention.progress, 100)}%
          </span>
          <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                intervention.progress >= 100 ? "bg-safe" : "bg-primary"
              )}
              style={{ width: `${Math.min(intervention.progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
