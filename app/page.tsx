"use client";

import { HeroSection } from "@/components/landing/hero-section";
import { InnovationSection } from "@/components/landing/innovation-section";
import { MvpSection } from "@/components/landing/mvp-section";
import { Navigation } from "@/components/wisdom-path/navigation";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground overflow-x-hidden">
      <Navigation
        activeTab=""
        onTabChange={() => { }}
        userName={null}
        variant="landing"
      />
      <main>
        <HeroSection />
        <InnovationSection />
        <MvpSection />
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground bg-muted/30 border-t border-border">
        <p>&copy; {new Date().getFullYear()} Wisdom Path. All rights reserved.</p>
      </footer>
    </div>
  );
}
