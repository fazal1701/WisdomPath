"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Shield,
  Bell,
  Lock,
  Heart,
  Sparkles,
  Wind,
  Flame,
  Droplets,
  Edit2,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
} from "lucide-react";
import { mockUser } from "@/lib/mock-data";

const constitutionProfiles = {
  ayurveda: {
    title: "Ayurvedic Profile",
    primaryLabel: "Primary Dosha",
    secondaryLabel: "Secondary Dosha",
    primary: mockUser.constitution.ayurveda.primaryDosha,
    secondary: mockUser.constitution.ayurveda.secondaryDosha,
    icon: Sparkles,
    color: "bg-ayurveda",
    description: "Vata-Pitta types are creative, energetic, and quick-thinking but need grounding practices and regular routines to stay balanced.",
    recommendations: [
      "Warm, grounding foods",
      "Regular sleep schedule",
      "Oil massage (Abhyanga)",
      "Gentle yoga, not excessive exercise",
    ],
  },
  tcm: {
    title: "TCM Profile",
    primaryLabel: "Body Type",
    secondaryLabel: "Element Balance",
    primary: mockUser.constitution.tcm.bodyType,
    secondary: mockUser.constitution.tcm.elementBalance,
    icon: Wind,
    color: "bg-tcm",
    description: "Yin Deficiency with Wood-Water element balance indicates a need for cooling, nourishing practices and liver qi support.",
    recommendations: [
      "Yin-nourishing foods (pears, tofu)",
      "Avoid excessive heat and spicy foods",
      "Tai Chi or Qigong practice",
      "Early bedtime (before 11pm)",
    ],
  },
  unani: {
    title: "Unani Profile",
    primaryLabel: "Temperament",
    secondaryLabel: "Dominant Humor",
    primary: mockUser.constitution.unani.temperament,
    secondary: mockUser.constitution.unani.humor,
    icon: Droplets,
    color: "bg-unani",
    description: "Sanguine temperament with Blood dominant humor suggests warmth, sociability, and need for balancing activities.",
    recommendations: [
      "Moderate diet, avoid excess rich foods",
      "Regular physical activity",
      "Bloodletting (Hijama) seasonally",
      "Cooling herbs like rose water",
    ],
  },
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [medications, setMedications] = useState([
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
  ]);
  const [newMed, setNewMed] = useState({ name: "", dosage: "", frequency: "" });

  const handleAddMedication = () => {
    if (newMed.name) {
      setMedications([...medications, newMed]);
      setNewMed({ name: "", dosage: "", frequency: "" });
    }
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Health Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your wellness data</p>
            </div>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                    {mockUser.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-card bg-safe">
                    <CheckCircle2 className="h-4 w-4 text-safe-foreground" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-foreground">{mockUser.name}</h2>
                    <Badge variant="outline" className="gap-1">
                      <Shield className="h-3 w-3" />
                      Verified Member
                    </Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">Member since December 2024</p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Badge className="bg-ayurveda/10 text-ayurveda">
                      {mockUser.constitution.ayurveda.primaryDosha}-{mockUser.constitution.ayurveda.secondaryDosha}
                    </Badge>
                    <Badge className="bg-tcm/10 text-tcm">
                      {mockUser.constitution.tcm.bodyType}
                    </Badge>
                    <Badge className="bg-unani/10 text-unani">
                      {mockUser.constitution.unani.temperament}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Wisdom Points</p>
                    <p className="text-2xl font-bold text-primary">{mockUser.wisdomPoints.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Flame className="h-4 w-4 text-accent" />
                    <span className="font-medium text-foreground">{mockUser.culturalStreak} day streak</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="constitution" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="constitution" className="gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Constitution</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Health Data</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* Constitution Tab */}
          <TabsContent value="constitution" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {Object.entries(constitutionProfiles).map(([key, profile], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${profile.color}/10`}>
                          <profile.icon className={`h-5 w-5 text-${key}`} />
                        </div>
                        <Badge variant="outline">{key.toUpperCase()}</Badge>
                      </div>
                      <CardTitle className="mt-2">{profile.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">{profile.primaryLabel}</p>
                          <p className="font-semibold text-foreground">{profile.primary}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{profile.secondaryLabel}</p>
                          <p className="font-semibold text-foreground">{profile.secondary}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{profile.description}</p>

                      <div className="space-y-2">
                        <p className="text-xs font-medium text-foreground">Recommendations:</p>
                        <ul className="space-y-1">
                          {profile.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Foundation Scores</CardTitle>
                <CardDescription>Your wellness wheel metrics across five pillars</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-5">
                  {Object.entries(mockUser.foundationScores).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize text-foreground">{key}</span>
                        <span className="text-sm text-muted-foreground">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Data Tab */}
          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-caution" />
                  Current Medications
                </CardTitle>
                <CardDescription>
                  Keep this updated for accurate interaction checking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {medications.map((med, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="grid gap-1">
                      <p className="font-medium text-foreground">{med.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} - {med.frequency}
                      </p>
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMedication(index)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <div className="rounded-lg border border-dashed border-border p-4">
                    <div className="grid gap-4 sm:grid-cols-4">
                      <div className="space-y-2">
                        <Label>Medication Name</Label>
                        <Input
                          placeholder="e.g., Aspirin"
                          value={newMed.name}
                          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Dosage</Label>
                        <Input
                          placeholder="e.g., 100mg"
                          value={newMed.dosage}
                          onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Frequency</Label>
                        <Input
                          placeholder="e.g., Once daily"
                          value={newMed.frequency}
                          onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={handleAddMedication} className="w-full gap-2">
                          <Plus className="h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Health Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Type 2 Diabetes</Badge>
                    <Badge variant="secondary">Hypertension</Badge>
                    <Badge variant="secondary">Lower Back Pain</Badge>
                    {isEditing && (
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <Plus className="h-3 w-3" />
                        Add
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="destructive">Penicillin</Badge>
                    <Badge variant="destructive">Shellfish</Badge>
                    {isEditing && (
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <Plus className="h-3 w-3" />
                        Add
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Sharing Preferences</CardTitle>
                <CardDescription>Control how your health data is used and shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Share with Healthcare Provider</Label>
                    <p className="text-sm text-muted-foreground">
                      Send wellness reports to your doctor
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Anonymized Research Contribution</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve recommendations for everyone
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Community Wisdom Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Share your insights with the community
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Export & Deletion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Export My Data (HIPAA Compliant)
                </Button>
                <Button variant="destructive" className="w-full">
                  Request Account Deletion
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Safety Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Interaction Warnings</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert me about potential herb-drug interactions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Regulatory Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify me about regulatory changes affecting my interventions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Quality Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Warn me about contamination or quality issues
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wellness Reminders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Daily Practice Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Morning and evening practice notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Supplement Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Remind me to take my supplements
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Progress Summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly wellness report
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
