"use client";

import { cn } from "@/lib/utils";
import { tierSystem, mockInterventions, type TierInfo, type Intervention } from "@/lib/mock-data";
import {
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Calendar,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JourneyTrackerProps {
  className?: string;
}

export function JourneyTracker({ className }: JourneyTrackerProps) {
  // Group interventions by tier
  const interventionsByTier = tierSystem.reduce(
    (acc, tier) => {
      acc[tier.level] = mockInterventions.filter((i) => i.tier === tier.level);
      return acc;
    },
    {} as Record<number, Intervention[]>
  );

  return (
    <div className={cn("space-y-6", className)}>
      {/* Journey Overview */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Your Journey</h2>
            <p className="text-sm text-muted-foreground">3-month progress tracking</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            View Timeline
          </Button>
        </div>

        {/* Tier Pyramid */}
        <div className="mb-6 grid gap-2">
          {tierSystem
            .slice()
            .reverse()
            .map((tier) => {
              const interventions = interventionsByTier[tier.level] || [];
              const activeCount = interventions.filter((i) => i.status === "active").length;
              const completedCount = interventions.filter(
                (i) => i.status === "completed" || i.progress >= 100
              ).length;

              return (
                <TierRow
                  key={tier.level}
                  tier={tier}
                  interventions={interventions}
                  activeCount={activeCount}
                  completedCount={completedCount}
                />
              );
            })}
        </div>

        {/* S.A.F.E.R. Analysis */}
        <SaferAnalysis />
      </div>

      {/* Timeline View */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-semibold text-foreground">Progress Timeline</h3>
        <div className="space-y-4">
          <TimelineMonth
            month="Month 1"
            title="Foundation Building"
            items={[
              { text: "Sleep routine established", done: true },
              { text: "Morning walks consistent", done: true },
              { text: "Protein breakfast habit", done: true },
            ]}
          />
          <TimelineMonth
            month="Month 2"
            title="Cultural Integration"
            items={[
              { text: "Yoga practice 5x/week", done: true },
              { text: "Meditation 10min daily", done: true },
              { text: "Back pain improving 40%", done: true, highlight: true },
            ]}
          />
          <TimelineMonth
            month="Month 3"
            title="Optimization"
            items={[
              { text: "Added turmeric protocol", done: false, current: true },
              { text: "Pain levels: 7→4→3", done: false },
              { text: "Goal: Maintain below 3", done: false },
            ]}
          />
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI Recommendations</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-safe" />
            <span className="text-foreground">Continue current plan - showing consistent improvement</span>
          </li>
          <li className="flex items-start gap-3">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-foreground">Add seasonal adjustment: winter warming practices for Vata balance</span>
          </li>
          <li className="flex items-start gap-3">
            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-chart-2" />
            <span className="text-foreground">Consider yoga teacher training for deeper practice integration</span>
          </li>
        </ul>
      </div>

      {/* Escalation Triggers */}
      <div className="rounded-xl border border-caution/20 bg-caution/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-caution" />
          <h3 className="font-semibold text-caution">Escalation Triggers</h3>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">Seek immediate care if:</p>
        <ul className="space-y-2">
          {[
            "Pain suddenly worsens",
            "Numbness in legs",
            "Fever with back pain",
            "Loss of bladder control",
          ].map((trigger, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-caution" />
              {trigger}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TierRow({
  tier,
  interventions,
  activeCount,
  completedCount,
}: {
  tier: TierInfo;
  interventions: Intervention[];
  activeCount: number;
  completedCount: number;
}) {
  const hasInterventions = interventions.length > 0;

  return (
    <div
      className={cn(
        "group cursor-pointer rounded-lg border p-4 transition-all",
        hasInterventions
          ? "border-border bg-muted/50 hover:border-primary/30 hover:bg-muted"
          : "border-dashed border-border/50 bg-transparent"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg text-xl",
              hasInterventions ? "bg-primary/10" : "bg-muted"
            )}
          >
            {tier.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Tier {tier.level}
              </span>
              <span className="font-semibold text-foreground">{tier.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">{tier.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {hasInterventions && (
            <div className="flex items-center gap-3 text-sm">
              {completedCount > 0 && (
                <div className="flex items-center gap-1 text-safe">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{completedCount}</span>
                </div>
              )}
              {activeCount > 0 && (
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp className="h-4 w-4" />
                  <span>{activeCount}</span>
                </div>
              )}
            </div>
          )}
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      {hasInterventions && (
        <div className="mt-3 flex flex-wrap gap-2">
          {interventions.map((intervention) => (
            <Badge
              key={intervention.id}
              variant={intervention.progress >= 100 ? "default" : "secondary"}
              className={cn(
                "gap-1",
                intervention.progress >= 100 && "bg-safe text-safe-foreground"
              )}
            >
              {intervention.progress >= 100 && <CheckCircle2 className="h-3 w-3" />}
              {intervention.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function SaferAnalysis() {
  const criteria = [
    { letter: "S", label: "Safe", status: "pass", detail: "No interactions detected" },
    { letter: "A", label: "Aligned", status: "pass", detail: "Matches Ayurvedic constitution" },
    { letter: "F", label: "Feasible", status: "pass", detail: "Daily practices sustainable" },
    { letter: "E", label: "Evidence", status: "pass", detail: "Moderate research support" },
    { letter: "R", label: "Review", status: "pass", detail: "Weekly check scheduled" },
  ];

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <h4 className="mb-3 text-sm font-semibold text-foreground">S.A.F.E.R. Analysis</h4>
      <div className="flex flex-wrap gap-3">
        {criteria.map((item) => (
          <div key={item.letter} className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-safe/10 text-xs font-bold text-safe">
              {item.letter}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineMonth({
  month,
  title,
  items,
}: {
  month: string;
  title: string;
  items: { text: string; done: boolean; highlight?: boolean; current?: boolean }[];
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {month.split(" ")[1]}
        </div>
        <div className="flex-1 border-l-2 border-dashed border-border" />
      </div>
      <div className="flex-1 pb-4">
        <p className="text-xs font-medium text-muted-foreground">{month}</p>
        <p className="mb-2 font-semibold text-foreground">{title}</p>
        <ul className="space-y-1.5">
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-sm",
                item.done ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.done ? (
                <CheckCircle2 className="h-4 w-4 text-safe" />
              ) : item.current ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-muted" />
              )}
              <span className={item.highlight ? "font-medium text-safe" : ""}>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
