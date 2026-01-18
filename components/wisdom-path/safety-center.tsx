"use client";

import { cn } from "@/lib/utils";
import { mockSafetyAlerts, mockInterventions, medicineDatabase } from "@/lib/mock-data";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Info,
  ExternalLink,
  Search,
  Bell,
  FileText,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SafetyCenterProps {
  className?: string;
}

export function SafetyCenter({ className }: SafetyCenterProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Safety Command Center</h1>
              <p className="text-sm text-muted-foreground">
                Proactive risk management and real-time monitoring
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Bell className="h-4 w-4" />
              Alerts
              <Badge variant="destructive" className="ml-1">3</Badge>
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Phone className="h-4 w-4" />
              Emergency
            </Button>
          </div>
        </div>
      </div>

      {/* Personal Interaction Matrix */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold text-foreground">Personal Interaction Matrix</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Visual grid showing all current interventions and their potential interactions
        </p>
        <InteractionMatrix />
      </div>

      {/* Regulatory Alert Stream */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Regulatory Alert Stream</h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-safe" />
            Live updates
          </div>
        </div>
        <div className="space-y-3">
          {mockSafetyAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>

      {/* Substance Checker */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold text-foreground">Interaction Checker</h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Check interactions (e.g., turmeric + aspirin)"
            className="pl-10"
          />
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <h3 className="mb-3 text-sm font-medium text-foreground">Quick Reference</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {medicineDatabase.slice(0, 4).map((med) => (
              <div
                key={med.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {med.name.split("/")[0].trim()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {med.interactions.length} known interactions
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    med.safetyLevel === "safe"
                      ? "border-safe/20 bg-safe/10 text-safe"
                      : "border-caution/20 bg-caution/10 text-caution"
                  )}
                >
                  {med.safetyLevel}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Protocol Cards */}
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <h2 className="font-semibold text-destructive">Emergency Protocol Cards</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <EmergencyCard
            title="Allergic Reaction"
            signs={["Hives or swelling", "Difficulty breathing", "Rapid heartbeat"]}
            action="Stop all supplements. Seek immediate care if breathing affected."
          />
          <EmergencyCard
            title="Herb-Drug Interaction"
            signs={["Unusual bleeding", "Extreme drowsiness", "Heart palpitations"]}
            action="Stop supplement. Contact healthcare provider immediately."
          />
          <EmergencyCard
            title="Contamination Signs"
            signs={["Sudden nausea/vomiting", "Metallic taste", "Severe headache"]}
            action="Stop supplement. Bring product to ER. Call Poison Control."
          />
        </div>
      </div>

      {/* Provider Communication Hub */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Provider Communication Hub</h2>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Share your complete intervention history and safety profile with healthcare providers
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <h3 className="mb-2 text-sm font-medium text-foreground">
              Traditional Practitioners
            </h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Connect with verified TCM, Ayurveda, and Unani practitioners
            </p>
            <Button variant="secondary" size="sm" className="w-full">
              Find Practitioners
            </Button>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="mb-2 text-sm font-medium text-foreground">Medical Team</h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Send secure reports to your primary care physician
            </p>
            <Button variant="secondary" size="sm" className="w-full">
              Share with Doctor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InteractionMatrix() {
  const activeInterventions = mockInterventions.filter((i) => i.status === "active");

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="p-2 text-left text-xs font-medium text-muted-foreground" />
            {activeInterventions.map((int) => (
              <th
                key={int.id}
                className="p-2 text-center text-xs font-medium text-muted-foreground"
              >
                <div className="max-w-[80px] truncate">{int.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activeInterventions.map((row, rowIndex) => (
            <tr key={row.id}>
              <td className="p-2 text-xs font-medium text-foreground">
                <div className="max-w-[100px] truncate">{row.name}</div>
              </td>
              {activeInterventions.map((col, colIndex) => {
                const hasInteraction =
                  rowIndex !== colIndex &&
                  row.interactions.some((int) =>
                    col.name.toLowerCase().includes(int.toLowerCase().split(" ")[0])
                  );
                const isSelf = rowIndex === colIndex;

                return (
                  <td key={col.id} className="p-2 text-center">
                    <div
                      className={cn(
                        "mx-auto flex h-8 w-8 items-center justify-center rounded",
                        isSelf
                          ? "bg-muted"
                          : hasInteraction
                            ? "bg-caution/20"
                            : "bg-safe/20"
                      )}
                    >
                      {isSelf ? (
                        <span className="text-xs text-muted-foreground">—</span>
                      ) : hasInteraction ? (
                        <AlertTriangle className="h-4 w-4 text-caution" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-safe" />
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center rounded bg-safe/20">
            <CheckCircle2 className="h-3 w-3 text-safe" />
          </div>
          <span>No known interaction</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center rounded bg-caution/20">
            <AlertTriangle className="h-3 w-3 text-caution" />
          </div>
          <span>Potential interaction</span>
        </div>
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: (typeof mockSafetyAlerts)[0] }) {
  const severityConfig = {
    safe: { icon: Info, color: "text-safe", bg: "bg-safe/10", border: "border-safe/20" },
    caution: {
      icon: AlertTriangle,
      color: "text-caution",
      bg: "bg-caution/10",
      border: "border-caution/20",
    },
    risk: {
      icon: AlertCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/20",
    },
  };

  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <div className={cn("rounded-lg border p-4", config.border, config.bg)}>
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", config.color)} />
          <span className="font-medium text-foreground">{alert.title}</span>
        </div>
        <Badge variant="outline" className="text-xs capitalize">
          {alert.type}
        </Badge>
      </div>
      <p className="mb-2 text-sm text-muted-foreground">{alert.description}</p>
      <div className="mb-2 flex flex-wrap gap-1">
        {alert.substances.map((substance, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {substance}
          </Badge>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        <strong>Action:</strong> {alert.recommendation}
      </p>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{alert.source}</span>
        <button type="button" className="flex items-center gap-1 text-primary hover:underline">
          Learn more <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function EmergencyCard({
  title,
  signs,
  action,
}: {
  title: string;
  signs: string[];
  action: string;
}) {
  return (
    <div className="rounded-lg border border-destructive/30 bg-card p-4">
      <h3 className="mb-2 font-semibold text-destructive">{title}</h3>
      <div className="mb-3">
        <p className="mb-1 text-xs font-medium text-muted-foreground">Signs:</p>
        <ul className="space-y-1">
          {signs.map((sign, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <span className="h-1 w-1 rounded-full bg-destructive" />
              {sign}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded bg-destructive/10 p-2">
        <p className="text-xs font-medium text-destructive">{action}</p>
      </div>
    </div>
  );
}
