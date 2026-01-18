"use client";

import { cn } from "@/lib/utils";
import { mockInterventions } from "@/lib/mock-data";
import {
    ArrowLeft,
    AlertTriangle,
    Beaker,
    Clock,
    BookOpen,
    CheckCircle2,
    TrendingUp,
    FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface InterventionDetailProps {
    className?: string;
    onBack?: () => void;
    interventionId?: string;
}

export function InterventionDetail({ className, onBack, interventionId = "int-02" }: InterventionDetailProps) {
    // Find the intervention or default to Turmeric (int-02) if not found/provided
    const intervention = mockInterventions.find((i) => i.id === interventionId) || mockInterventions[1];

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">{intervention.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="capitalize">{intervention.type}</span>
                        <span>•</span>
                        <Badge variant="outline">Tier {intervention.tier}</Badge>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content: Overview & Evidence */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Overview Card */}
                    <div className="rounded-xl border border-border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold text-foreground">Overview</h2>
                        <p className="mb-6 leading-relaxed text-muted-foreground">
                            {intervention.description} used traditionally for centuries to reduce inflammation and balance the body's internal heat.
                        </p>

                        <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/30 p-4 sm:grid-cols-4">
                            <div>
                                <span className="block text-xs uppercase text-muted-foreground">Dosage</span>
                                <span className="font-semibold text-foreground">500mg</span>
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-muted-foreground">Frequency</span>
                                <span className="font-semibold text-foreground">Daily (AM)</span>
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-muted-foreground">Form</span>
                                <span className="font-semibold text-foreground">Capsule</span>
                            </div>
                            <div>
                                <span className="block text-xs uppercase text-muted-foreground">Adherence</span>
                                <span className="font-semibold text-safe">98%</span>
                            </div>
                        </div>
                    </div>

                    {/* Evidence & Research */}
                    <div className="rounded-xl border border-border bg-card p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-semibold text-foreground">Evidence & Mechanism</h2>
                        </div>

                        <div className="mb-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-2 text-primary">
                                    <FlaskConical className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">Bio-Mechanism</h3>
                                    <p className="text-sm text-muted-foreground">Modulates NF-κB pathway, suppressing pro-inflammatory cytokines.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-ayurveda/10 p-2 text-ayurveda">
                                    <Beaker className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">Traditional View</h3>
                                    <p className="text-sm text-muted-foreground">Reduces excess Pitta (heat) and Ama (toxins) in the joints.</p>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div>
                            <h3 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">Key Studies</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between rounded-lg border border-border p-3 text-sm transition-colors hover:bg-muted/50">
                                    <span className="font-medium text-primary hover:underline cursor-pointer">Systematic Review: Efficacy in Osteoarthritis</span>
                                    <Badge variant="secondary">Level 1 Evidence</Badge>
                                </li>
                                <li className="flex items-center justify-between rounded-lg border border-border p-3 text-sm transition-colors hover:bg-muted/50">
                                    <span className="font-medium text-primary hover:underline cursor-pointer">Bioavailability with Piperine</span>
                                    <Badge variant="secondary">Pharmacokinetics</Badge>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Safety & Stats */}
                <div className="space-y-6">
                    {/* Safety Profile */}
                    <div className="rounded-xl border border-border bg-card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-semibold text-foreground">Safety Profile</h2>
                            <Badge variant="outline" className="border-safe text-safe bg-safe/10">High Safety</Badge>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-lg bg-caution/10 p-3 text-sm text-caution-foreground border border-caution/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span className="font-semibold">Contraindications</span>
                                </div>
                                Gallstones, bile duct obstruction, blood thinners.
                            </div>

                            <div>
                                <span className="mb-2 block text-xs font-semibold text-muted-foreground">Known Interactions</span>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">Warfarin (Moderate)</Badge>
                                    <Badge variant="secondary">Aspirin (Minor)</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* My Progress */}
                    <div className="rounded-xl border border-border bg-card p-6">
                        <h2 className="mb-4 font-semibold text-foreground">My Progress</h2>
                        <div className="mb-4 flex flex-col items-center justify-center p-4">
                            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-muted">
                                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin-slow" style={{ transform: 'rotate(-45deg)' }}></div>
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl font-bold text-foreground">30</span>
                                    <span className="text-xs text-muted-foreground">Days</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Pain Reduction</span>
                                <span className="flex items-center gap-1 font-medium text-safe">
                                    <TrendingUp className="h-3 w-3" />
                                    -40%
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Consistency</span>
                                <span className="font-medium text-foreground">Perfect</span>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full gap-2" variant="outline">
                        <Clock className="h-4 w-4" />
                        View History Log
                    </Button>
                </div>
            </div>
        </div>
    );
}
