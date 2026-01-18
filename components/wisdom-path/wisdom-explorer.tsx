"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Condition, MedicineTradition, MedicineApproach } from "@/lib/mock-data";
import { mockConditions } from "@/lib/mock-data";
import {
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Flower2,
  Sprout,
  FlaskConical,
  Activity,
  LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const traditionConfig: Record<
  MedicineTradition,
  { name: string; icon: any; color: string; bgColor: string }
> = {
  tcm: {
    name: "Traditional Chinese Medicine",
    icon: Flower2,
    color: "text-tcm",
    bgColor: "bg-tcm/10 border-tcm/20",
  },
  ayurveda: {
    name: "Ayurveda",
    icon: Sprout,
    color: "text-ayurveda",
    bgColor: "bg-ayurveda/10 border-ayurveda/20",
  },
  unani: {
    name: "Unani Medicine",
    icon: FlaskConical,
    color: "text-unani",
    bgColor: "bg-unani/10 border-unani/20",
  },
  western: {
    name: "Western Medicine",
    icon: Activity,
    color: "text-western",
    bgColor: "bg-western/10 border-western/20",
  },
};

const safetyConfig = {
  safe: { icon: CheckCircle2, color: "text-safe", label: "Generally Safe" },
  caution: { icon: AlertTriangle, color: "text-caution", label: "Use Caution" },
  risk: { icon: AlertCircle, color: "text-destructive", label: "Monitor Closely" },
};

interface WisdomExplorerProps {
  className?: string;
  initialSelectedId?: string | null;
}

export function WisdomExplorer({ className, initialSelectedId }: WisdomExplorerProps) {
  // Use React.useEffect to sync state if initialSelectedId changes
  const initialCondition = initialSelectedId
    ? mockConditions.find(c => c.id === initialSelectedId)
    : null;

  const [searchQuery, setSearchQuery] = useState(initialCondition?.name || "Lower Back Pain");
  const [selectedTraditions, setSelectedTraditions] = useState<MedicineTradition[]>([
    "tcm",
    "ayurveda",
    "unani",
    "western",
  ]);
  const [expandedApproach, setExpandedApproach] = useState<string | null>(null);

  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);
  const [selectedSafety, setSelectedSafety] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced search and filter logic
  const condition = mockConditions.find((c) => {
    const q = searchQuery.toLowerCase();
    if (!q) return false;
    if (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) return true;
    return c.approaches.some(
      (a) =>
        a.diagnosis.toLowerCase().includes(q) ||
        a.treatments.some((t) => t.name.toLowerCase().includes(q))
    );
  });

  const displayCondition = condition || (searchQuery ? null : mockConditions[0]);

  const filteredApproaches = displayCondition
    ? displayCondition.approaches.filter((a) => {
      const matchTradition = selectedTraditions.includes(a.tradition);
      const matchEvidence = selectedEvidence.length === 0 || selectedEvidence.includes(a.evidenceType) || selectedEvidence.some(e => a.evidenceType.includes(e));
      // Check if any treatment in the approach matches the safety filter
      const matchSafety = selectedSafety.length === 0 || a.treatments.some(t => selectedSafety.includes(t.safetyLevel));

      return matchTradition && matchEvidence && matchSafety;
    })
    : [];

  const toggleTradition = (tradition: MedicineTradition) => {
    if (selectedTraditions.includes(tradition)) {
      setSelectedTraditions(selectedTraditions.filter((t) => t !== tradition));
    } else {
      setSelectedTraditions([...selectedTraditions, tradition]);
    }
  };

  const toggleFilter = (list: string[], setList: (l: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter(item => item !== value) : [...list, value]);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search & Filters */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conditions (e.g., anxiety, back pain, digestion)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className={`gap-2 ${showFilters ? 'bg-secondary' : 'bg-transparent'}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Extended Filters Panel */}
        {showFilters && (
          <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border animate-in slide-in-from-top-2">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Evidence Level</span>
                <div className="flex flex-wrap gap-2">
                  {['Systematic Review', 'Clinical Trial', 'Traditional', 'Historical'].map(level => (
                    <Badge
                      key={level}
                      variant={selectedEvidence.includes(level) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/20"
                      onClick={() => toggleFilter(selectedEvidence, setSelectedEvidence, level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Safety Profile</span>
                <div className="flex flex-wrap gap-2">
                  {['safe', 'caution', 'risk'].map(level => {
                    const config = safetyConfig[level as keyof typeof safetyConfig];
                    const Icon = config.icon;
                    return (
                      <Badge
                        key={level}
                        variant={selectedSafety.includes(level) ? "default" : "outline"}
                        className={`cursor-pointer gap-1 ${selectedSafety.includes(level) ? config.color.replace('text-', 'bg-') + ' text-white border-transparent' : ''}`}
                        onClick={() => toggleFilter(selectedSafety, setSelectedSafety, level)}
                      >
                        <Icon className="w-3 h-3" />
                        {config.label}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tradition Toggles */}
        <div className="flex flex-wrap gap-2">
          <span className="mr-2 flex items-center text-sm text-muted-foreground">Systems:</span>
          {(Object.keys(traditionConfig) as MedicineTradition[]).map((tradition) => {
            const config = traditionConfig[tradition];
            const isSelected = selectedTraditions.includes(tradition);
            return (
              <button
                type="button"
                key={tradition}
                onClick={() => toggleTradition(tradition)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all",
                  isSelected
                    ? config.bgColor
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                <span><config.icon className="h-4 w-4" /></span>
                <span className={isSelected ? config.color : ""}>
                  {tradition === "tcm" ? "TCM" : config.name.split(" ")[0]}
                </span>
                {isSelected && <CheckCircle2 className="h-3 w-3" />}
              </button>
            );
          })}
        </div>
      </div>

      {!displayCondition ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground">No conditions found</h3>
          <p>Try adjusting your search for "{searchQuery}"</p>
        </div>
      ) : (
        <>
          {/* Condition Header */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              {displayCondition.name}
            </h2>
            <p className="text-muted-foreground">{displayCondition.description}</p>
          </div>

          {/* Multi-Tradition Approaches */}
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredApproaches.map((approach) => (
              <ApproachCard
                key={approach.tradition}
                approach={approach}
                expanded={expandedApproach === approach.tradition}
                onToggle={() =>
                  setExpandedApproach(
                    expandedApproach === approach.tradition
                      ? null
                      : approach.tradition
                  )
                }
              />
            ))}
          </div>

          {/* AI Synthesis */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">AI Synthesis</h3>
            </div>
            <p className="mb-4 leading-relaxed text-foreground">
              {displayCondition.aiSynthesis}
            </p>
            <div className="rounded-lg border border-caution/20 bg-caution/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-caution" />
                <span className="font-medium text-caution">
                  Seek Immediate Care If:
                </span>
              </div>
              <ul className="space-y-1">
                {displayCondition.escalationTriggers.map((trigger, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-caution" />
                    {trigger}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ApproachCard({
  approach,
  expanded,
  onToggle,
}: {
  approach: MedicineApproach;
  expanded: boolean;
  onToggle: () => void;
}) {
  const config = traditionConfig[approach.tradition];

  return (
    <div className={cn("rounded-xl border bg-card", config.bgColor)}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl"><config.icon className="h-6 w-6" /></span>
          <div>
            <h3 className={cn("font-semibold", config.color)}>{config.name}</h3>
            <p className="text-sm text-muted-foreground">{approach.diagnosis}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <EvidenceBadge level={approach.evidenceLevel} type={approach.evidenceType} />
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border/50 p-4">
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground">Approach:</p>
            <p className="text-foreground">{approach.approach}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Treatments:</p>
            {approach.treatments.map((treatment, index) => {
              const safetyInfo = safetyConfig[treatment.safetyLevel];
              const SafetyIcon = safetyInfo.icon;

              return (
                <div
                  key={index}
                  className="rounded-lg border border-border/50 bg-background/50 overflow-hidden"
                >
                  {treatment.imageUrl && (
                    <div className="h-32 w-full">
                      <img
                        src={treatment.imageUrl}
                        alt={treatment.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {treatment.type}
                        </Badge>
                        <span className="font-medium text-foreground">{treatment.name}</span>
                      </div>
                      <div className={cn("flex items-center gap-1", safetyInfo.color)}>
                        <SafetyIcon className="h-4 w-4" />
                        <span className="text-xs">{safetyInfo.label}</span>
                      </div>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">{treatment.description}</p>
                    <p className="text-xs italic text-muted-foreground/80">
                      Safety: {treatment.safetyNote}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <button type="button" className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline">
            Learn more about {config.name}
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

function EvidenceBadge({ level, type }: { level: number; type: string }) {
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i < level ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      <span className="mt-0.5 text-xs text-muted-foreground">{type}</span>
    </div>
  );
}
