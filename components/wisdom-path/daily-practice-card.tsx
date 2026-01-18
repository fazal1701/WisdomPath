"use client";

import { cn } from "@/lib/utils";
import type { DailyPractice, MedicineTradition } from "@/lib/mock-data";
import { Play, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const traditionLabels: Record<MedicineTradition, string> = {
  tcm: "TCM",
  ayurveda: "Ayurveda",
  unani: "Unani",
  western: "Western",
};

const traditionColors: Record<MedicineTradition, string> = {
  tcm: "bg-tcm/10 text-tcm border-tcm/20",
  ayurveda: "bg-ayurveda/10 text-ayurveda border-ayurveda/20",
  unani: "bg-unani/10 text-unani border-unani/20",
  western: "bg-western/10 text-western border-western/20",
};

interface DailyPracticeCardProps {
  practice: DailyPractice;
  className?: string;
}

export function DailyPracticeCard({ practice, className }: DailyPracticeCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 via-card to-card p-6",
        className
      )}
    >
      {/* Decorative Element */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" />
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-primary/5" />

      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Today&apos;s Practice
              </span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{practice.name}</h2>
          </div>
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium",
              traditionColors[practice.tradition]
            )}
          >
            {traditionLabels[practice.tradition]}
          </span>
        </div>

        {/* Optional Image */}
        {practice.imageUrl && (
          <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={practice.imageUrl}
              alt={practice.name}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {practice.description}
        </p>

        {/* Constitution Basis */}
        <p className="mb-6 text-xs italic text-muted-foreground/80">
          {practice.constitutionBasis}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button className="gap-2">
            <Play className="h-4 w-4" />
            Begin Practice
          </Button>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{practice.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
