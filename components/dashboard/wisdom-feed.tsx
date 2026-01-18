import React from 'react';
import { Sparkles, BookOpen, User, Sun } from 'lucide-react';
import { mockWisdomInsights, WisdomInsight } from '@/lib/mock-data';

export function WisdomFeed() {
    const insights = mockWisdomInsights;

    function getIcon(type: WisdomInsight['type']) {
        switch (type) {
            case 'community': return User;
            case 'research': return BookOpen;
            case 'personal': return Sparkles;
            case 'seasonal': return Sun;
            default: return Sparkles;
        }
    }

    function getTypeColor(type: WisdomInsight['type']) {
        switch (type) {
            case 'community': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'research': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
            case 'personal': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'seasonal': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            default: return 'text-gray-500';
        }
    }

    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Wisdom Feed & Insights
                </h3>
                <button className="text-sm text-primary hover:underline">View All</button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insights.slice(0, 3).map((insight) => {
                    const Icon = getIcon(insight.type);
                    const colorClass = getTypeColor(insight.type);

                    return (
                        <div key={insight.id} className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors bg-background/50">
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${colorClass}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{insight.type}</span>
                                        <span className="text-xs text-muted-foreground">{new Date(insight.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="font-medium text-sm mb-1 line-clamp-1">{insight.title}</h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{insight.content}</p>

                                    <div className="flex items-center gap-2 text-xs opacity-80">
                                        {insight.tradition && (
                                            <span className="capitalize bg-muted px-1.5 py-0.5 rounded">{insight.tradition}</span>
                                        )}
                                        <span className="truncate">via {insight.source}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
