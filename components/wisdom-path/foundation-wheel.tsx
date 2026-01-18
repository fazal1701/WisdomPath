"use client";

import { cn } from "@/lib/utils";
import { Moon, Footprints, Utensils, Wind, Users } from "lucide-react";

interface FoundationScores {
  sleep: number;
  movement: number;
  nutrition: number;
  breath: number;
  community: number;
}

interface FoundationWheelProps {
  scores: FoundationScores;
  className?: string;
}

const foundations = [
  { key: "sleep", label: "Sleep", icon: Moon, color: "text-chart-1" },
  { key: "movement", label: "Movement", icon: Footprints, color: "text-chart-2" },
  { key: "nutrition", label: "Nutrition", icon: Utensils, color: "text-chart-3" },
  { key: "breath", label: "Breath", icon: Wind, color: "text-chart-4" },
  { key: "community", label: "Community", icon: Users, color: "text-chart-5" },
] as const;

export function FoundationWheel({ scores, className }: FoundationWheelProps) {
  const averageScore = Math.round(
    Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length
  );

  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Foundation Wheel</h3>
        <span className="text-xs text-muted-foreground">Daily Score</span>
      </div>

      {/* Circular Progress Display */}
      <div className="relative mx-auto mb-6 h-40 w-40">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${averageScore * 2.64} 264`}
            className="text-primary transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{averageScore}</span>
          <span className="text-xs text-muted-foreground">Overall</span>
        </div>
      </div>

      {/* Individual Metrics */}
      <div className="space-y-3">
        {foundations.map(({ key, label, icon: Icon, color }) => {
          const score = scores[key];
          return (
            <div key={key} className="group">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-4 w-4", color)} />
                  <span className="text-sm text-foreground">{label}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{score}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    score >= 75 ? "bg-safe" : score >= 50 ? "bg-caution" : "bg-destructive"
                  )}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
