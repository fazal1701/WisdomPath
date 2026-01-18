"use client";

import { cn } from "@/lib/utils";
import { mockPractitioners, type Practitioner } from "@/lib/mock-data";
import {
  Users,
  MapPin,
  Star,
  CheckCircle2,
  Video,
  Calendar,
  Search,
  Filter,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CommunityProps {
  className?: string;
}

export function Community({ className }: CommunityProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Elder Wisdom Network</h2>
          <p className="text-muted-foreground">Connect with verified practitioners and community elders.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Community Forum
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            My Appointments
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name, specialty, or tradition..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="practitioners" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="practitioners">Find a Practitioner</TabsTrigger>
          <TabsTrigger value="groups">Community Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="practitioners" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {mockPractitioners.map((practitioner) => (
              <PractitionerCard key={practitioner.id} practitioner={practitioner} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups">
          <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
            <Users className="mx-auto h-12 w-12 opacity-50 mb-4" />
            <h3 className="text-lg font-medium">Community Groups Coming Soon</h3>
            <p>Join circles for chronic pain, gut health, and seasonal living.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PractitionerCard({ practitioner }: { practitioner: Practitioner }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
              {practitioner.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{practitioner.name}</h3>
                {practitioner.verified && (
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{practitioner.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded text-xs font-medium text-accent-foreground">
            <Star className="h-3 w-3 fill-current" />
            {practitioner.rating}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {practitioner.location}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Video className="h-4 w-4" />
            Available for {practitioner.consultationType} consults
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2">
          {practitioner.specialties.map((spec, i) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal">
              {spec}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-auto border-t border-border p-4 bg-muted/30">
        <Button className="w-full">Book Consultation</Button>
      </div>
    </div>
  )
}
