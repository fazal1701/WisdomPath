"use client";

import { cn } from "@/lib/utils";
import type { WisdomInsight, MedicineTradition } from "@/lib/mock-data";
import {
  Lightbulb,
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const typeConfig = {
  personal: {
    icon: Lightbulb,
    label: "Personal Insight",
    color: "text-chart-1",
  },
  community: {
    icon: Users,
    label: "Community",
    color: "text-chart-2",
  },
  research: {
    icon: BookOpen,
    label: "Research",
    color: "text-chart-3",
  },
  seasonal: {
    icon: Calendar,
    label: "Seasonal",
    color: "text-chart-4",
  },
};

const traditionLabels: Record<MedicineTradition, string> = {
  tcm: "TCM",
  ayurveda: "Ayurveda",
  unani: "Unani",
  western: "Western",
};

interface WisdomFeedProps {
  insights: WisdomInsight[];
  className?: string;
}

export function WisdomFeed({ insights, className }: WisdomFeedProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Wisdom Feed</h3>
        </div>
        <button type="button" className="flex items-center gap-1 text-xs text-primary hover:underline">
          View All
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => {
          const config = typeConfig[insight.type];
          const Icon = config.icon;

          return (
            <div
              key={insight.id}
              className="group cursor-pointer rounded-lg border border-transparent bg-muted/50 p-4 transition-all hover:border-border hover:bg-muted"
            >
              <div className="mb-2 flex items-center gap-2">
                <Icon className={cn("h-4 w-4", config.color)} />
                <span className="text-xs font-medium text-muted-foreground">{config.label}</span>
                {insight.tradition && (
                  <Badge variant="secondary" className="text-xs">
                    {traditionLabels[insight.tradition]}
                  </Badge>
                )}
                {insight.verified && (
                  <CheckCircle2 className="h-3 w-3 text-safe" />
                )}
              </div>

              {insight.imageUrl && (
                <div className="mb-3 h-32 w-full overflow-hidden rounded-md">
                  <img
                    src={insight.imageUrl}
                    alt={insight.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <h4 className="mb-1 text-sm font-medium text-foreground">{insight.title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{insight.content}</p>
              <p className="mt-2 text-xs text-muted-foreground/70">— {insight.source}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
