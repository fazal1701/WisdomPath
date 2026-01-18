"use client";

import { useState } from "react";
import { mockUser, todaysPractice } from "@/lib/mock-data";
import { Navigation } from "@/components/wisdom-path/navigation";
import { WisdomExplorer } from "@/components/wisdom-path/wisdom-explorer";
import { JourneyTracker } from "@/components/wisdom-path/journey-tracker";
import { SafetyCenter } from "@/components/dashboard/safety-center";
import { AnalyticsHub } from "@/components/wisdom-path/analytics-hub";
import { Community } from "@/components/wisdom-path/community";
import { Profile } from "@/components/wisdom-path/profile";
import { PracticePlayer } from "@/components/wisdom-path/practice-player";
import { InterventionDetail } from "@/components/wisdom-path/intervention-detail";
import { Onboarding } from "@/components/wisdom-path/onboarding";
import { FoundationWheel } from "@/components/dashboard/foundation-wheel";
import { InterventionPyramid } from "@/components/dashboard/intervention-pyramid";
import { SafetyStatusWidget } from "@/components/dashboard/safety-status";
import { WisdomFeed } from "@/components/dashboard/wisdom-feed";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Flame, Award } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPractice, setShowPractice] = useState(false);

  // Quick navigation handler from Navigation component
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render the correct screen based on state
  const renderContent = () => {
    // 10. Start Practice Mode (Overlay/Screen)
    if (showPractice) {
      return <PracticePlayer onClose={() => setShowPractice(false)} />;
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Top Bar with Global Search & Stats */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search treatments, conditions, or herbs..."
                  className="pl-10 bg-card rounded-full border-muted-foreground/20"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    {mockUser.culturalStreak} day streak
                  </span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {mockUser.wisdomPoints.toLocaleString()} pts
                  </span>
                </div>
              </div>
            </div>

            {/* Hero: Today's Practice */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 border border-primary/10">
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-background/50 px-3 py-1 text-xs font-medium text-primary mb-4 border border-primary/20 backdrop-blur-sm">
                    <Sparkles className="h-3 w-3" />
                    Today&apos;s Wisdom Practice
                  </div>
                  <h1 className="text-3xl font-serif font-medium mb-2">{todaysPractice.name}</h1>
                  <p className="text-muted-foreground mb-1">{todaysPractice.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-primary">
                    <span className="font-semibold">{todaysPractice.duration} min</span>
                    <span>•</span>
                    <span className="italic">{todaysPractice.constitutionBasis}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPractice(true)}
                  className="shrink-0 flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  Start Practice <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {/* Decorative background circle */}
              <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl opacity-50" />
            </section>

            {/* Core Dashboard Grid - 3 Column Layout */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {/* Column 1: Foundation */}
              <div className="h-full">
                <FoundationWheel />
              </div>

              {/* Column 2: Interventions */}
              <div className="h-full">
                <InterventionPyramid
                  onInterventionClick={() => setActiveTab('intervention-detail')}
                />
              </div>

              {/* Column 3: Safety */}
              <div className="h-full">
                <SafetyStatusWidget
                  onViewSafety={() => setActiveTab('safety')}
                />
              </div>
            </div>

            {/* Bottom Section: Wisdom Feed (Screen 11? Part of dashboard) */}
            <WisdomFeed />
          </div>
        );
      case "explorer":
        return <WisdomExplorer />;
      case "journey":
        return <JourneyTracker />;
      case "safety":
        return <SafetyCenter />;
      case "analytics":
        return <AnalyticsHub />;
      case "community":
        return <Community />;
      case "profile":
        return <Profile />;
      case "intervention-detail": // Can also be accessed via nav for demo
        return <InterventionDetail onBack={() => setActiveTab('dashboard')} />;
      case "onboarding": // Can also be accessed via nav for demo
        return <Onboarding onComplete={() => setActiveTab('dashboard')} />;
      default:
        return <WisdomExplorer />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      {/* Hide Navigation in immersive modes */}
      {!showPractice && activeTab !== 'onboarding' && (
        <Navigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userName={mockUser.name}
        />
      )}

      <main className={!showPractice && activeTab !== 'onboarding' ? "mx-auto max-w-7xl px-4 py-6 lg:px-8" : "h-screen bg-background"}>
        {renderContent()}
      </main>
    </div>
  );
}
