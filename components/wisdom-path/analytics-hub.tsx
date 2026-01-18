"use client";

import React from "react"

import { cn } from "@/lib/utils";
import { mockAnalytics, type MedicineTradition } from "@/lib/mock-data";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  Activity,
  Brain,
  Heart,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const traditionColors: Record<MedicineTradition, string> = {
  tcm: "#8B4513",
  ayurveda: "#B8860B",
  unani: "#2F7F8F",
  western: "#4169E1",
};

interface AnalyticsHubProps {
  className?: string;
}

export function AnalyticsHub({ className }: AnalyticsHubProps) {
  const { foundationTrend, interventionEffectiveness, symptomTracking, safetyPrevention } =
    mockAnalytics;

  // Calculate trends
  const foundationChange =
    foundationTrend[foundationTrend.length - 1].score - foundationTrend[0].score;
  const painChange =
    symptomTracking[symptomTracking.length - 1].painLevel - symptomTracking[0].painLevel;
  const energyChange =
    symptomTracking[symptomTracking.length - 1].energy - symptomTracking[0].energy;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Wisdom Analytics Hub</h1>
            <p className="text-sm text-muted-foreground">
              Deep insights into your health patterns with cultural context
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Foundation Score"
          value={foundationTrend[foundationTrend.length - 1].score}
          unit="%"
          change={foundationChange}
          icon={Activity}
        />
        <StatCard
          title="Pain Level"
          value={symptomTracking[symptomTracking.length - 1].painLevel}
          unit="/10"
          change={painChange}
          invertTrend
          icon={Heart}
        />
        <StatCard
          title="Energy Level"
          value={symptomTracking[symptomTracking.length - 1].energy}
          unit="/10"
          change={energyChange}
          icon={Brain}
        />
        <StatCard
          title="Safety Rate"
          value={safetyPrevention.rate}
          unit="%"
          subtitle={`${safetyPrevention.prevented}/${safetyPrevention.total} prevented`}
          icon={Shield}
        />
      </div>

      {/* Foundation Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Foundation Mastery Tracking</CardTitle>
          <CardDescription>
            Overall foundation score trend over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              score: {
                label: "Foundation Score",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={foundationTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { weekday: "short" })}
                  className="text-xs"
                />
                <YAxis domain={[60, 100]} className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-score)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-score)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Symptom Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Symptom Progress</CardTitle>
          <CardDescription>Pain, energy, and mood tracking over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              painLevel: {
                label: "Pain",
                color: "hsl(var(--destructive))",
              },
              energy: {
                label: "Energy",
                color: "hsl(var(--safe))",
              },
              mood: {
                label: "Mood",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={symptomTracking}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { weekday: "short" })}
                  className="text-xs"
                />
                <YAxis domain={[0, 10]} className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="painLevel"
                  stroke="var(--color-painLevel)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="var(--color-energy)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="var(--color-mood)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <span className="text-sm text-muted-foreground">Pain (lower is better)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-safe" />
              <span className="text-sm text-muted-foreground">Energy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Mood</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intervention Effectiveness */}
      <Card>
        <CardHeader>
          <CardTitle>Intervention Effectiveness</CardTitle>
          <CardDescription>
            Improvement percentage by intervention and tradition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              improvement: {
                label: "Improvement %",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={interventionEffectiveness}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" domain={[0, 100]} className="text-xs" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  className="text-xs"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border bg-card p-2 shadow-md">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {data.improvement}% improvement
                          </p>
                          <p className="text-xs capitalize text-muted-foreground">
                            Tradition: {data.tradition}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="improvement"
                  radius={[0, 4, 4, 0]}
                  fill="hsl(var(--primary))"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Cultural Practice Analysis */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cultural Practice Impact</CardTitle>
            <CardDescription>
              Correlation between traditional practices and outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { practice: "Morning Yoga", correlation: 85, tradition: "ayurveda" as MedicineTradition },
                { practice: "Pranayama", correlation: 72, tradition: "ayurveda" as MedicineTradition },
                { practice: "Tai Chi", correlation: 78, tradition: "tcm" as MedicineTradition },
                { practice: "Meditation", correlation: 65, tradition: "ayurveda" as MedicineTradition },
              ].map((item) => (
                <div key={item.practice}>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: traditionColors[item.tradition] }}
                      />
                      <span className="text-sm font-medium">{item.practice}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.correlation}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.correlation}%`,
                        backgroundColor: traditionColors[item.tradition],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety Intelligence</CardTitle>
            <CardDescription>Interaction prevention and risk monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center justify-center">
              <div className="relative h-32 w-32">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-muted"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${safetyPrevention.rate * 2.51} 251`}
                    className="text-safe"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">
                    {safetyPrevention.rate.toFixed(1)}%
                  </span>
                  <span className="text-xs text-muted-foreground">Prevention Rate</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-safe/10 p-3">
                <span className="text-sm text-foreground">Interactions Prevented</span>
                <span className="font-semibold text-safe">{safetyPrevention.prevented}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="text-sm text-foreground">Total Checks</span>
                <span className="font-semibold text-foreground">{safetyPrevention.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  unit,
  change,
  subtitle,
  invertTrend = false,
  icon: Icon,
}: {
  title: string;
  value: number;
  unit: string;
  change?: number;
  subtitle?: string;
  invertTrend?: boolean;
  icon: React.ElementType;
}) {
  const isPositive = change !== undefined ? (invertTrend ? change < 0 : change > 0) : null;
  const TrendIcon =
    change === undefined
      ? Minus
      : change === 0
        ? Minus
        : change > 0
          ? TrendingUp
          : TrendingDown;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        {change !== undefined ? (
          <div
            className={cn(
              "flex items-center gap-1 text-sm",
              isPositive ? "text-safe" : change === 0 ? "text-muted-foreground" : "text-destructive"
            )}
          >
            <TrendIcon className="h-4 w-4" />
            <span>{Math.abs(change)}</span>
          </div>
        ) : subtitle ? (
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
}
