"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
    Play,
    Pause,
    SkipForward,
    Volume2,
    Maximize2,
    X,
    FastForward,
    Rewind,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { mockUser, todaysPractice } from "@/lib/mock-data";

interface PracticePlayerProps {
    className?: string;
    onClose?: () => void;
}

export function PracticePlayer({ className, onClose }: PracticePlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration] = useState(todaysPractice.duration * 60); // in seconds
    const [currentTime, setCurrentTime] = useState(0);

    // Mock timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && currentTime < duration) {
            interval = setInterval(() => {
                setCurrentTime((prev) => {
                    const next = prev + 1;
                    setProgress((next / duration) * 100);
                    return next;
                });
            }, 1000);
        } else if (currentTime >= duration) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentTime, duration]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const steps = [
        "Centering & Breath Awareness",
        "Gentle Warm-up (Joint freeing)",
        "Sun Salutation (Surya Namaskar)",
        "Warrior Sequences",
        "Cool Down & Shavasana",
    ];

    const currentStepIndex = Math.floor((progress / 100) * steps.length);

    return (
        <div className={cn("flex h-full flex-col bg-background", className)}>
            {/* Player Header */}
            <div className="flex items-center justify-between border-b border-border bg-card p-4">
                <div>
                    <h2 className="font-semibold text-foreground">{todaysPractice.name}</h2>
                    <p className="text-sm text-muted-foreground">{todaysPractice.type} • {todaysPractice.difficulty}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div className="grid flex-1 overflow-hidden lg:grid-cols-3">
                {/* Main Content Area (Video Placeholder) */}
                <div className="relative flex flex-col justify-center bg-black lg:col-span-2">
                    {/* Visualizer / Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <div className="h-64 w-64 animate-pulse rounded-full bg-primary blur-3xl" />
                        <div className="absolute h-48 w-48 animate-pulse rounded-full bg-ayurveda blur-3xl delay-700" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-6 p-8 text-white">
                        {isPlaying ? (
                            <div className="h-24 w-24 animate-bounce rounded-full border-4 border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                                <span className="text-3xl font-light">{formatTime(duration - currentTime)}</span>
                            </div>
                        ) : (
                            <Button
                                size="icon"
                                className="h-20 w-20 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 hover:scale-105 transition-all duration-300"
                                onClick={() => setIsPlaying(true)}
                            >
                                <Play className="h-8 w-8 ml-1 text-white" />
                            </Button>
                        )}
                        <p className="text-lg font-light tracking-wide opacity-80">
                            {steps[Math.min(currentStepIndex, steps.length - 1)]}
                        </p>
                    </div>

                    {/* Controls Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pb-8">
                        <div className="mb-4">
                            <Slider
                                value={[progress]}
                                max={100}
                                step={1}
                                className="cursor-pointer"
                                onValueChange={(val) => {
                                    const newTime = (val[0] / 100) * duration;
                                    setCurrentTime(newTime);
                                    setProgress(val[0]);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                                    <Volume2 className="h-5 w-5" />
                                </Button>
                                <span className="text-sm font-medium tabular-nums opacity-75">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>

                            <div className="flex items-center gap-6">
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                                    <Rewind className="h-5 w-5" />
                                </Button>
                                <Button
                                    size="icon"
                                    className="h-12 w-12 rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-transform"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                >
                                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                                    <FastForward className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                                    <Maximize2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Steps & Instructions */}
                <div className="overflow-y-auto border-l border-border bg-card p-6">
                    <h3 className="mb-4 font-semibold text-foreground">Session Guide</h3>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            {steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex gap-3 rounded-lg p-3 transition-colors",
                                        i === currentStepIndex
                                            ? "bg-primary/10 border border-primary/20"
                                            : i < currentStepIndex
                                                ? "text-muted-foreground"
                                                : "opacity-60"
                                    )}
                                >
                                    <div className={cn(
                                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                                        i < currentStepIndex ? "bg-safe text-safe-foreground" :
                                            i === currentStepIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    )}>
                                        {i < currentStepIndex ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                                    </div>
                                    <div>
                                        <p className={cn("text-sm font-medium", i === currentStepIndex && "text-primary")}>{step}</p>
                                        <p className="text-xs text-muted-foreground">Approx. 5 mins</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-lg bg-muted p-4">
                            <h4 className="mb-2 font-medium text-foreground">Teacher's Note</h4>
                            <p className="text-sm italic text-muted-foreground">
                                "Focus on your breath during the transitions. If you feel any strain in the lower back, modify with knees bent."
                            </p>
                        </div>

                        <div className="rounded-lg bg-ayurveda/10 p-4 border border-ayurveda/20">
                            <h4 className="mb-2 font-medium text-ayurveda">Dosha Benefit</h4>
                            <p className="text-sm text-foreground/80">
                                This sequence is pacifying for <span className="font-semibold">{mockUser.constitution.ayurveda.primaryDosha}</span> by grounding excess air energy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
