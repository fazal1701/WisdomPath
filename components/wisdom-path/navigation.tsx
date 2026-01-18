"use client";

import React from "react"

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Compass,
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  LogOut,
  User,
  ClipboardList,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5 text-blue-500" /> },
  { id: "explorer", label: "Wisdom Explorer", icon: <Compass className="h-5 w-5 text-emerald-500" /> },
  { id: "journey", label: "Journey Tracker", icon: <TrendingUp className="h-5 w-5 text-violet-500" /> },
  { id: "safety", label: "Safety Center", icon: <Shield className="h-5 w-5 text-rose-500" />, badge: 2 },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5 text-indigo-500" /> },
  { id: "community", label: "Community", icon: <Users className="h-5 w-5 text-amber-500" /> },
  { id: "profile", label: "Profile", icon: <Settings className="h-5 w-5 text-slate-500" /> },
  { id: "onboarding", label: "Assessment (Demo)", icon: <ClipboardList className="h-5 w-5 text-cyan-500" /> },
];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSelectContent?: (id: string, type: 'condition' | 'practitioner') => void;
  userName?: string | null;
  variant?: 'landing' | 'app';
}

import { mockConditions, mockPractitioners } from "@/lib/mock-data";

export function Navigation({ activeTab, onTabChange, onSelectContent, userName }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">W</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              WisdomPath
            </span>
          </div>

          {/* Desktop Navigation - HIDDEN per user request for unified hamburger menu */}
          <nav className="hidden">
            {navItems.map((item) => (
              // ... hidden
              null
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {/* ... */}

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden text-muted-foreground md:flex"
              onClick={() => onTabChange('profile')}
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* User */}
            {userName && (
              <div
                className="ml-2 hidden items-center gap-3 border-l border-border pl-4 md:flex cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onTabChange('profile')}
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Good Morning</p>
                  <p className="text-xs text-muted-foreground">{userName}</p>
                </div>
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/images/user_profile.jpg" alt={userName} className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary">{userName.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            )}

            {!userName && (
              <div className="ml-2 hidden items-center gap-3 border-l border-border pl-4 md:flex">
                <Button variant="outline" size="sm">Log In</Button>
                <Button size="sm">Sign Up</Button>
              </div>
            )}

            {/* Mobile Menu Button - ALWAYS VISIBLE */}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Shown when open (removed lg:hidden) */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card p-4">
            <div className="mb-4 space-y-2">
              <Input
                placeholder="Search conditions, herbs..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <div className="rounded-lg border border-border bg-background p-2">
                  {mockConditions
                    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .slice(0, 3)
                    .map(result => <div
                      key={result.id}
                      className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        onTabChange('explorer');
                        onSelectContent?.(result.id, 'condition');
                        setSearchQuery(''); // Clear search
                        setMobileMenuOpen(false);
                      }}
                    >
                      <div className="h-10 w-10 overflow-hidden rounded-md bg-muted">
                        {result.approaches[0]?.treatments[0]?.imageUrl && (
                          <img
                            src={result.approaches[0].treatments[0].imageUrl}
                            alt={result.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{result.name}</p>
                        <p className="text-xs text-muted-foreground truncate">Condition • {result.approaches.length} Approaches</p>
                      </div>
                    </div>
                    ))}
                  }
                  {mockPractitioners
                    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tradition.toLowerCase().includes(searchQuery.toLowerCase()))
                    .slice(0, 2)
                    .map(practitioner => (
                      <div
                        key={practitioner.id}
                        className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                        onClick={() => {
                          onTabChange('community');
                          onSelectContent?.(practitioner.id, 'practitioner');
                          setSearchQuery('');
                          setSearchOpen(false);
                        }}
                      >   <Avatar className="h-10 w-10">
                          <AvatarImage src={practitioner.imageUrl} alt={practitioner.name} className="object-cover" />
                          <AvatarFallback className="bg-primary/10 text-primary">{practitioner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{practitioner.name}</p>
                          <p className="text-xs text-muted-foreground truncate">Practitioner • {practitioner.tradition}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    activeTab === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive" className="rounded-full">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
