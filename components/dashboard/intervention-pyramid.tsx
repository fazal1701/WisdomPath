import React from 'react';
import { ArrowUpRight, CheckCircle2, PauseCircle } from 'lucide-react';
import { mockInterventions, TierLevel } from '@/lib/mock-data';

export function InterventionPyramid() {
    const tiers = [4, 3, 2, 1, 0].map(level => ({
        level: level as TierLevel,
        label: getTierLabel(level),
        interventions: mockInterventions.filter(i => i.tier === level)
    }));

    function getTierLabel(level: number) {
        switch (level) {
            case 0: return 'Foundation';
            case 1: return 'Physiologic';
            case 2: return 'Cultural';
            case 3: return 'Targeted';
            case 4: return 'Medical';
            default: return '';
        }
    }

    function getTierColor(level: number) {
        switch (level) {
            case 4: return 'border-red-500/20 bg-red-500/5';
            case 3: return 'border-orange-500/20 bg-orange-500/5';
            case 2: return 'border-yellow-500/20 bg-yellow-500/5';
            case 1: return 'border-green-500/20 bg-green-500/5';
            case 0: return 'border-blue-500/20 bg-blue-500/5';
            default: return 'border-border bg-card';
        }
    }

    return (
        <div className="flex flex-col gap-4 p-6 bg-card border border-border rounded-xl shadow-sm h-full">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <div className="h-6 w-1 bg-accent rounded-full" />
                Active Interventions
            </h3>

            <div className="flex flex-col gap-3">
                {tiers.map((tier) => (
                    <div key={tier.level} className={`rounded-lg border p-3 ${getTierColor(tier.level)}`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                                Tier {tier.level}: {tier.label}
                            </span>
                            <span className="text-xs bg-background/50 px-2 py-0.5 rounded-full border border-border/10">
                                {tier.interventions.length} active
                            </span>
                        </div>

                        {tier.interventions.length === 0 ? (
                            <div className="text-xs text-muted-foreground italic pl-2">None active</div>
                        ) : (
                            <div className="space-y-2">
                                {tier.interventions.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between bg-background/60 p-2 rounded border border-border/50">
                                        <div className="flex items-center gap-2">
                                            {item.status === 'active' ? (
                                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                            ) : (
                                                <PauseCircle className="w-3 h-3 text-yellow-500" />
                                            )}
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            {item.progress}%
                                            <ArrowUpRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
