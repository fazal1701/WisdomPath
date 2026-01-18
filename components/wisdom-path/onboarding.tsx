"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
    ArrowRight,
    Check,
    ChevronRight,
    Sparkles,
    Camera,
    Activity,
    Waves,
    Heart,
    Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface OnboardingProps {
    className?: string;
    onComplete?: () => void;
}

export function Onboarding({ className, onComplete }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            if (onComplete) onComplete();
        }
    };

    return (
        <div className={cn("flex flex-col items-center justify-center min-h-[80vh]", className)}>
            <div className="w-full max-w-2xl space-y-8">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Step {step} of {totalSteps}</span>
                        <span>{Math.round((step / totalSteps) * 100)}%</span>
                    </div>
                    <Progress value={(step / totalSteps) * 100} className="h-2" />
                </div>

                {/* Step Content */}
                <div className="min-h-[400px]">
                    {step === 1 && <GoalStep onNext={handleNext} />}
                    {step === 2 && <ConstitutionStep onNext={handleNext} />}
                    {step === 3 && <BiometricsStep onNext={handleNext} />}
                    {step === 4 && <AnalysisStep onNext={handleNext} />}
                </div>
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// STEP 1: GOALS
// ------------------------------------------------------------------
function GoalStep({ onNext }: { onNext: () => void }) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const goals = [
        { id: "pain", label: "Manage Chronic Pain", icon: Activity },
        { id: "stress", label: "Reduce Stress/Anxiety", icon: Brain },
        { id: "sleep", label: "Improve Sleep", icon: Waves },
        { id: "longevity", label: "Longevity & Vitality", icon: Heart },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">What brings you here?</h1>
                <p className="text-muted-foreground">Select all that apply to personalize your path.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal) => (
                    <div
                        key={goal.id}
                        onClick={() => toggle(goal.id)}
                        className={cn(
                            "cursor-pointer rounded-xl border p-6 transition-all hover:border-primary",
                            selected.includes(goal.id)
                                ? "border-primary bg-primary/5 shadow-md"
                                : "border-border bg-card"
                        )}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <goal.icon className={cn("h-6 w-6", selected.includes(goal.id) ? "text-primary" : "text-muted-foreground")} />
                            {selected.includes(goal.id) && <Check className="h-5 w-5 text-primary" />}
                        </div>
                        <h3 className="font-semibold text-foreground">{goal.label}</h3>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    size="lg"
                    onClick={onNext}
                    disabled={selected.length === 0}
                    className="w-full md:w-auto gap-2"
                >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// STEP 2: CONSTITUTION (Mock Quiz)
// ------------------------------------------------------------------
function ConstitutionStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Body & Mind</h1>
                <p className="text-muted-foreground">Help us understand your natural tendencies.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">My temperature tendency is:</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['Always Cold', 'Neutral', 'Always Hot'].map(opt => (
                            <Button key={opt} variant="outline" className="h-12 border-border hover:border-primary hover:bg-primary/5">{opt}</Button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">My energy pattern is:</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['Bursts/Crash', 'Steady/Slow', 'Intense/Focused'].map(opt => (
                            <Button key={opt} variant="outline" className="h-12 border-border hover:border-primary hover:bg-primary/5">{opt}</Button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">My digestion is typically:</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['Irregular/Gas', 'Strong/Fast', 'Slow/Heavy'].map(opt => (
                            <Button key={opt} variant="outline" className="h-12 border-border hover:border-primary hover:bg-primary/5">{opt}</Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button size="lg" onClick={onNext} className="w-full md:w-auto gap-2">
                    Next Step
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

// ------------------------------------------------------------------
// STEP 3: BIOMETRICS (Camera Mock)
// ------------------------------------------------------------------
function BiometricsStep({ onNext }: { onNext: () => void }) {
    const [scanning, setScanning] = useState(false);

    const handleScan = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            onNext();
        }, 3000);
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 text-center">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Wisdom Scan</h1>
                <p className="text-muted-foreground">Use your camera for traditional tongue & face diagnosis.</p>
            </div>

            <div className="relative mx-auto flex h-64 w-64 flex-col items-center justify-center rounded-full border-4 border-dashed border-border bg-muted/20">
                {scanning ? (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2 text-white">
                            <Sparkles className="h-8 w-8 animate-spin text-primary" />
                            <span className="font-semibold">Analyzing Qi flow...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                        <span className="text-sm text-muted-foreground p-4">Position your face in good light</span>
                    </>
                )}
            </div>

            <Button size="lg" onClick={handleScan} className="w-full md:w-64 gap-2" disabled={scanning}>
                {scanning ? "Scanning..." : "Start Scan"}
                {!scanning && <Camera className="h-4 w-4" />}
            </Button>

            <p className="text-xs text-muted-foreground">
                <span className="font-semibold">Privacy Note:</span> Images are processed locally and never stored.
            </p>
        </div>
    )
}

// ------------------------------------------------------------------
// STEP 4: ANALYSIS RESULT
// ------------------------------------------------------------------
function AnalysisStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="animate-in zoom-in-95 duration-700 flex flex-col items-center justify-center space-y-6 text-center py-10">
            <div className="rounded-full bg-primary/10 p-6">
                <Sparkles className="h-12 w-12 text-primary" />
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Analysis Complete</h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    We've identified your unique constitution across Ayurvedic, TCM, and Unani traditions.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                <div className="rounded-lg border border-ayurveda/30 bg-ayurveda/5 p-4">
                    <span className="text-xs uppercase text-muted-foreground">Ayurveda</span>
                    <p className="font-bold text-ayurveda text-lg">Vata-Pitta</p>
                </div>
                <div className="rounded-lg border border-tcm/30 bg-tcm/5 p-4">
                    <span className="text-xs uppercase text-muted-foreground">TCM</span>
                    <p className="font-bold text-tcm text-lg">Yin Deficient</p>
                </div>
                <div className="rounded-lg border border-unani/30 bg-unani/5 p-4">
                    <span className="text-xs uppercase text-muted-foreground">Unani</span>
                    <p className="font-bold text-unani text-lg">Damvi</p>
                </div>
            </div>

            <Button size="lg" onClick={onNext} className="w-full md:w-64 mt-8 animate-pulse">
                Enter Your Path
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}
