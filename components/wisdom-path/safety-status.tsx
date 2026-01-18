"use client";

import { cn } from "@/lib/utils";
import type { SafetyAlert, EscalationStatus } from "@/lib/mock-data";
import { Shield, AlertTriangle, CheckCircle2, XCircle, ChevronRight, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SafetyStatusProps {
  status: EscalationStatus;
  riskScore: number;
  alerts: SafetyAlert[];
  className?: string;
}

const statusConfig = {
  green: {
    label: "All Clear",
    icon: CheckCircle2,
    color: "text-safe",
    bgColor: "bg-safe/10",
    borderColor: "border-safe/20",
  },
  yellow: {
    label: "Caution",
    icon: AlertTriangle,
    color: "text-caution",
    bgColor: "bg-caution/10",
    borderColor: "border-caution/20",
  },
  red: {
    label: "Alert",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
  },
};

const severityColors = {
  safe: "bg-safe/10 text-safe border-safe/20",
  caution: "bg-caution/10 text-caution border-caution/20",
  risk: "bg-destructive/10 text-destructive border-destructive/20",
};

export function SafetyStatus({ status, riskScore, alerts, className }: SafetyStatusProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Safety Status</h3>
        </div>
        <button type="button" className="flex items-center gap-1 text-xs text-primary hover:underline">
          Safety Center
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Main Status */}
      <div
        className={cn(
          "mb-4 flex items-center justify-between rounded-lg border p-4",
          config.bgColor,
          config.borderColor
        )}
      >
        <div className="flex items-center gap-3">
          <StatusIcon className={cn("h-6 w-6", config.color)} />
          <div>
            <p className={cn("font-semibold", config.color)}>{config.label}</p>
            <p className="text-xs text-muted-foreground">Current safety assessment</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">{riskScore}/10</p>
          <p className="text-xs text-muted-foreground">Risk Score</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Recent Alerts</p>
        {alerts.slice(0, 3).map((alert) => (
          <div
            key={alert.id}
            className="group cursor-pointer rounded-lg border border-transparent bg-muted/50 p-3 transition-all hover:border-border hover:bg-muted"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 rounded-full border p-1",
                  severityColors[alert.severity]
                )}
              >
                {alert.severity === "safe" ? (
                  <Info className="h-3 w-3" />
                ) : (
                  <AlertTriangle className="h-3 w-3" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                  <Badge
                    variant="outline"
                    className={cn("text-xs capitalize", severityColors[alert.severity])}
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {alert.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
