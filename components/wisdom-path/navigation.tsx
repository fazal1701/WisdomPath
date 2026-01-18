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
  const [showNotifications, setShowNotifications] = useState(false);
  // Sweet and simple mock auth state
  const [isLoggedIn, setIsLoggedIn] = useState(!!userName);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const notifications = [
    { id: 1, title: "New Safety Alert", message: "High pollen count in your area today.", time: "2m ago", unread: true },
    { id: 2, title: "Daily Practice", message: "Time for your evening wind-down.", time: "1h ago", unread: false },
  ];

  return (
    <>
      {/* Mobile Menu Button - Always visible now */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
          className="bg-background/80 backdrop-blur-sm shadow-sm"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-left duration-300">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                W
              </div>
              <span className="font-semibold text-lg">WisdomPath</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
                </Button>
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border bg-popover text-popover-foreground shadow-lg z-50 animate-in zoom-in-95">
                    <div className="p-4 space-y-3">
                      <h4 className="font-semibold text-sm">Notifications</h4>
                      {notifications.map(n => (
                        <div key={n.id} className="flex flex-col gap-1 p-2 hover:bg-muted rounded-md cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{n.title}</span>
                            <span className="text-[10px] text-muted-foreground">{n.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{n.message}</p>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setShowNotifications(false)}>
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  onTabChange('profile');
                  setMobileMenuOpen(false);
                }}
              >
                <Settings className="h-5 w-5" />
              </Button>

              {/* Auth Buttons / User Profile */}
              {isLoggedIn ? (
                <Avatar className="h-8 w-8 cursor-pointer" onClick={() => { onTabChange('profile'); setMobileMenuOpen(false); }}>
                  <AvatarImage src="/images/user_profile.jpg" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleLogin}>Log In</Button>
                  <Button size="sm" onClick={handleLogin}>Sign Up</Button>
                </div>
              )}

              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="mb-6 space-y-2">
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
                    .map(result => (
                      <div
                        key={result.id}
                        className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                        onClick={() => {
                          onTabChange('explorer');
                          onSelectContent?.(result.id, 'condition');
                          setSearchQuery('');
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
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Avatar className="h-10 w-10">
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
                      ? "bg-primary/10 text-primary" // Default active style
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    // Apply specific colors only to icon, or keep logic simple. The icon component has the color.
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive" className="h-5 w-5 rounded-full px-0 flex items-center justify-center">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-8 border-t border-border pt-4">
              <button
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  setIsLoggedIn(false);
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
