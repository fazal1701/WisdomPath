import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Activity, Leaf, Wind, Users } from 'lucide-react';
import { mockUser } from '@/lib/mock-data';

export function FoundationWheel() {
    const scores = mockUser.foundationScores;

    const categories = [
        { key: 'sleep', label: 'Sleep', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-400', score: scores.sleep },
        { key: 'movement', label: 'Movement', icon: Activity, color: 'text-orange-400', bg: 'bg-orange-400', score: scores.movement },
        { key: 'nutrition', label: 'Nutrition', icon: Leaf, color: 'text-green-400', bg: 'bg-green-400', score: scores.nutrition },
        { key: 'breath', label: 'Breath', icon: Wind, color: 'text-cyan-400', bg: 'bg-cyan-400', score: scores.breath },
        { key: 'community', label: 'Community', icon: Users, color: 'text-rose-400', bg: 'bg-rose-400', score: scores.community },
    ];

    return (
        <div className="relative flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="h-6 w-1 bg-primary rounded-full" />
                Foundation Wheel
            </h3>

            <div className="relative w-64 h-64">
                {/* Central Metric */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center bg-background/80 backdrop-blur-sm p-4 rounded-full border border-border shadow-sm">
                        <span className="text-3xl font-bold block">{Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5)}%</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Balance</span>
                    </div>
                </div>

                {/* Circles */}
                <svg className="w-full h-full transform -rotate-90">
                    {categories.map((cat, index) => {
                        const radius = 40 + (index * 22);
                        const circumference = 2 * Math.PI * radius;
                        const offset = circumference - (cat.score / 100) * circumference;

                        return (
                            <g key={cat.key}>
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r={radius}
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    className="text-muted/10"
                                />
                                <motion.circle
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: offset }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    cx="50%"
                                    cy="50%"
                                    r={radius}
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    className={cat.color.replace('text-', 'text-opacity-80 text-')}
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                {categories.map((cat) => (
                    <div key={cat.key} className="flex items-center gap-2 text-sm">
                        <cat.icon className={`w-4 h-4 ${cat.color}`} />
                        <span className="text-muted-foreground">{cat.label}</span>
                        <span className="ml-auto font-medium">{cat.score}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
