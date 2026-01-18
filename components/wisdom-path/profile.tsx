"use client";

import { cn } from "@/lib/utils";
import { mockUser } from "@/lib/mock-data";
import {
    User,
    Settings,
    Shield,
    Award,
    LogOut,
    ChevronRight,
    Bell,
    Globe,
    Database,
    Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ProfileProps {
    className?: string;
}

export function Profile({ className }: ProfileProps) {
    // Mock data for radar chart (Normalizing constitution to 100-scale)
    const constitutionData = [
        { subject: "Vata (Air)", A: 85, fullMark: 100 },
        { subject: "Pitta (Fire)", A: 65, fullMark: 100 },
        { subject: "Kapha (Earth)", A: 40, fullMark: 100 },
        { subject: "Yang (Heat)", A: 20, fullMark: 100 },
        { subject: "Yin (Cool)", A: 80, fullMark: 100 },
        { subject: "Dampness", A: 30, fullMark: 100 },
    ];

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header Profile Card */}
            <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                        <AvatarImage src="/images/user_profile.jpg" alt={mockUser.name} className="object-cover" />
                        <AvatarFallback className="text-xl">
                            {mockUser.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                                Level 12 Seeker
                            </Badge>
                            <span>•</span>
                            <span className="text-sm">Member since 2024</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                        <div className="flex items-center justify-end gap-1 text-xl font-bold text-foreground">
                            <Award className="h-5 w-5 text-ayurveda" />
                            {mockUser.culturalStreak} Days
                        </div>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Constitution & Stats */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Constitution Radar */}
                    <div className="rounded-xl border border-border bg-card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Your Constitution</h2>
                                <p className="text-sm text-muted-foreground">
                                    Multi-tradition energetic analysis
                                </p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 text-primary">
                                Retake Quiz
                            </Button>
                        </div>
                        <div className="h-[300px] w-full">
                            <ChartContainer
                                config={{
                                    constitution: {
                                        label: "Constitution",
                                        color: "hsl(var(--primary))",
                                    },
                                }}
                                className="mx-auto aspect-square max-h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={constitutionData}>
                                        <PolarGrid className="stroke-muted/50" />
                                        <PolarAngleAxis
                                            dataKey="subject"
                                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                                        />
                                        <Radar
                                            name="Constitution"
                                            dataKey="A"
                                            stroke="hsl(var(--primary))"
                                            fill="hsl(var(--primary))"
                                            fillOpacity={0.3}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                            <div className="rounded-lg bg-ayurveda/10 p-3 text-center">
                                <span className="block text-xs font-semibold uppercase text-muted-foreground">Ayurveda</span>
                                <span className="font-bold text-ayurveda">{mockUser.constitution.ayurveda.primaryDosha}</span>
                            </div>
                            <div className="rounded-lg bg-tcm/10 p-3 text-center">
                                <span className="block text-xs font-semibold uppercase text-muted-foreground">TCM</span>
                                <span className="font-bold text-tcm">{mockUser.constitution.tcm.bodyType}</span>
                            </div>
                            <div className="rounded-lg bg-unani/10 p-3 text-center">
                                <span className="block text-xs font-semibold uppercase text-muted-foreground">Unani</span>
                                <span className="font-bold text-unani">{mockUser.constitution.unani.temperament}</span>
                            </div>
                        </div>
                    </div>

                    {/* Privacy & Safety Settings */}
                    <div className="rounded-xl border border-border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold text-foreground">Safety & Privacy</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-safe/10 text-safe">
                                        <Shield className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Doctor Data Sharing</p>
                                        <p className="text-sm text-muted-foreground">Allow verified practitioners to view your timeline</p>
                                    </div>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between py-2 border-t border-border">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Database className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Anonymized Research</p>
                                        <p className="text-sm text-muted-foreground">Contribute data to traditional medicine studies</p>
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between py-2 border-t border-border">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
                                        <Download className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Export Health Data</p>
                                        <p className="text-sm text-muted-foreground">Download your full history (PDF/CSV)</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Export</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: App Settings */}
                <div className="space-y-6">
                    <div className="rounded-xl border border-border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold text-foreground">Preferences</h2>
                        <div className="space-y-1">
                            {[
                                { icon: Globe, label: "Language", value: "English (US)" },
                                { icon: Bell, label: "Notifications", value: "Daily Summary" },
                                { icon: Settings, label: "Appearance", value: "System Theme" },
                            ].map((item, i) => (
                                <Button key={i} variant="ghost" className="w-full justify-between px-2 font-normal">
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-4 w-4 text-muted-foreground" />
                                        <span>{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-xs">{item.value}</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold text-foreground">Wisdom Points</h2>
                        <div className="mb-6 flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-6">
                            <span className="text-4xl font-bold text-primary">{mockUser.wisdomPoints}</span>
                            <span className="text-sm font-medium text-muted-foreground">Total Points Earned</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span>Next Tier: Sage</span>
                                <span className="text-muted-foreground">1500 pts</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div className="h-full w-[80%] bg-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground text-center">Reach 1500 points to unlock exclusive workshops.</p>
                        </div>
                    </div>

                    <Button variant="destructive" className="w-full gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </div>
    );
}
