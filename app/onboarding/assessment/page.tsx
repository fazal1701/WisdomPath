"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ArrowLeft,
  Shield,
  Lock,
  Heart,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Moon,
  Sun,
  Flame,
  Droplets,
  Wind,
  Leaf,
  TrendingUp, // Import TrendingUp icon
} from "lucide-react";

// Step definitions
const TOTAL_STEPS = 7;

const doshaQuestions = [
  {
    id: "body_frame",
    question: "How would you describe your body frame?",
    options: [
      { value: "vata", label: "Thin and light, hard to gain weight", icon: Wind },
      { value: "pitta", label: "Medium build, muscular", icon: Flame },
      { value: "kapha", label: "Larger frame, gains weight easily", icon: Droplets },
    ],
  },
  {
    id: "skin_type",
    question: "What best describes your skin?",
    options: [
      { value: "vata", label: "Dry, rough, tends to crack", icon: Wind },
      { value: "pitta", label: "Warm, sensitive, prone to rashes", icon: Flame },
      { value: "kapha", label: "Oily, smooth, thick", icon: Droplets },
    ],
  },
  {
    id: "digestion",
    question: "How is your digestion typically?",
    options: [
      { value: "vata", label: "Irregular, prone to bloating/gas", icon: Wind },
      { value: "pitta", label: "Strong, can eat anything, occasional acid", icon: Flame },
      { value: "kapha", label: "Slow but steady, rarely upset", icon: Droplets },
    ],
  },
  {
    id: "sleep",
    question: "What's your sleep pattern like?",
    options: [
      { value: "vata", label: "Light sleeper, wake easily, variable", icon: Wind },
      { value: "pitta", label: "Moderate, 6-7 hours is enough", icon: Flame },
      { value: "kapha", label: "Deep, heavy, love to sleep long", icon: Droplets },
    ],
  },
  {
    id: "stress_response",
    question: "When stressed, you tend to...",
    options: [
      { value: "vata", label: "Feel anxious, worried, scattered", icon: Wind },
      { value: "pitta", label: "Feel irritable, frustrated, angry", icon: Flame },
      { value: "kapha", label: "Withdraw, feel heavy, unmotivated", icon: Droplets },
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Consent
    hipaaConsent: false,
    termsConsent: false,
    dataConsent: false,
    
    // Step 2: Basic Info
    firstName: "",
    email: "",
    birthYear: "",
    biologicalSex: "",
    
    // Step 3: Health Background
    currentMedications: [] as string[],
    medicationInput: "",
    healthConditions: [] as string[],
    conditionInput: "",
    allergies: [] as string[],
    allergyInput: "",
    
    // Step 4: Dosha Assessment
    doshaAnswers: {} as Record<string, string>,
    
    // Step 5: Cultural Background
    culturalBackground: "",
    traditions: [] as string[],
    dietaryPreferences: [] as string[],
    
    // Step 6: Goals
    primaryGoals: [] as string[],
    healthConcerns: "",
    
    // Step 7: Provider
    hasProvider: "",
    providerEmail: "",
    shareWithProvider: false,
  });

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const updateFormData = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addToArray = (key: string, inputKey: string) => {
    const inputValue = formData[inputKey as keyof typeof formData] as string;
    if (inputValue.trim()) {
      const currentArray = formData[key as keyof typeof formData] as string[];
      updateFormData(key, [...currentArray, inputValue.trim()]);
      updateFormData(inputKey, "");
    }
  };

  const removeFromArray = (key: string, index: number) => {
    const currentArray = formData[key as keyof typeof formData] as string[];
    updateFormData(key, currentArray.filter((_, i) => i !== index));
  };

  const calculateDosha = () => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(formData.doshaAnswers).forEach((answer) => {
      if (answer in counts) counts[answer as keyof typeof counts]++;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return { primary: sorted[0][0], secondary: sorted[1][0] };
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.hipaaConsent && formData.termsConsent && formData.dataConsent;
      case 1:
        return formData.firstName && formData.email && formData.birthYear && formData.biologicalSex;
      case 2:
        return true; // Optional step
      case 3:
        return Object.keys(formData.doshaAnswers).length >= 3; // At least 3 answers
      case 4:
        return formData.traditions.length > 0;
      case 5:
        return formData.primaryGoals.length > 0;
      case 6:
        return formData.hasProvider !== "";
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">W</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              WisdomPath
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              <Lock className="h-4 w-4" />
              <span>HIPAA Compliant</span>
            </div>
            <Badge variant="outline">
              Step {step + 1} of {TOTAL_STEPS}
            </Badge>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4">
          <Progress value={progress} className="h-1" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 0: Consent */}
            {step === 0 && (
              <ConsentStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {/* Step 1: Basic Info */}
            {step === 1 && (
              <BasicInfoStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {/* Step 2: Health Background */}
            {step === 2 && (
              <HealthBackgroundStep
                formData={formData}
                updateFormData={updateFormData}
                addToArray={addToArray}
                removeFromArray={removeFromArray}
              />
            )}

            {/* Step 3: Dosha Assessment */}
            {step === 3 && (
              <DoshaAssessmentStep
                formData={formData}
                updateFormData={updateFormData}
                questions={doshaQuestions}
              />
            )}

            {/* Step 4: Cultural Background */}
            {step === 4 && (
              <CulturalBackgroundStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {/* Step 5: Goals */}
            {step === 5 && (
              <GoalsStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {/* Step 6: Provider */}
            {step === 6 && (
              <ProviderStep
                formData={formData}
                updateFormData={updateFormData}
                dosha={calculateDosha()}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            {step === TOTAL_STEPS - 1 ? "Complete Setup" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}

// Step Components
function ConsentStep({
  formData,
  updateFormData,
}: {
  formData: Record<string, unknown>;
  updateFormData: (key: string, value: unknown) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
          <Shield className="h-10 w-10 text-primary" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground">Your Privacy Matters</h1>
        <p className="mt-2 text-muted-foreground">
          Before we begin, please review and accept our privacy practices.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">HIPAA Compliant Data Handling</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your health information is protected under HIPAA regulations. We use
                  industry-standard encryption and never share your data without explicit consent.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="hipaa"
                checked={formData.hipaaConsent as boolean}
                onCheckedChange={(checked) => updateFormData("hipaaConsent", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="hipaa" className="font-medium">
                  HIPAA Authorization
                </Label>
                <p className="text-sm text-muted-foreground">
                  I authorize WisdomPath to collect and process my health information in accordance
                  with HIPAA regulations.{" "}
                  <Link href="/hipaa" className="text-primary underline">
                    Read full notice
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={formData.termsConsent as boolean}
                onCheckedChange={(checked) => updateFormData("termsConsent", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="font-medium">
                  Terms of Service
                </Label>
                <p className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="data"
                checked={formData.dataConsent as boolean}
                onCheckedChange={(checked) => updateFormData("dataConsent", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="data" className="font-medium">
                  Data Processing Consent
                </Label>
                <p className="text-sm text-muted-foreground">
                  I consent to my anonymized data being used to improve health recommendations (you
                  can opt out anytime).
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> WisdomPath provides
                educational guidance only and does not replace professional medical advice. Always
                consult healthcare providers for medical decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BasicInfoStep({
  formData,
  updateFormData,
}: {
  formData: Record<string, unknown>;
  updateFormData: (key: string, value: unknown) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10"
        >
          <Heart className="h-10 w-10 text-accent" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground">Let&apos;s Get to Know You</h1>
        <p className="mt-2 text-muted-foreground">
          Basic information to personalize your experience.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Your first name"
                value={formData.firstName as string}
                onChange={(e) => updateFormData("firstName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email as string}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthYear">Birth Year</Label>
              <Input
                id="birthYear"
                type="number"
                placeholder="1990"
                value={formData.birthYear as string}
                onChange={(e) => updateFormData("birthYear", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Used for age-appropriate recommendations
              </p>
            </div>

            <div className="space-y-2">
              <Label>Biological Sex</Label>
              <RadioGroup
                value={formData.biologicalSex as string}
                onValueChange={(value) => updateFormData("biologicalSex", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="font-normal">
                    Female
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="font-normal">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="font-normal">
                    Other
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">
                Important for dosing and contraindication checks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function HealthBackgroundStep({
  formData,
  updateFormData,
  addToArray,
  removeFromArray,
}: {
  formData: Record<string, unknown>;
  updateFormData: (key: string, value: unknown) => void;
  addToArray: (key: string, inputKey: string) => void;
  removeFromArray: (key: string, index: number) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-safe/10"
        >
          <Shield className="h-10 w-10 text-safe" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground">Health Background</h1>
        <p className="mt-2 text-muted-foreground">
          This helps us check for interactions and contraindications.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          {/* Medications */}
          <div className="space-y-3">
            <Label>Current Medications (Prescription & OTC)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter medication name"
                value={formData.medicationInput as string}
                onChange={(e) => updateFormData("medicationInput", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addToArray("currentMedications", "medicationInput")}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => addToArray("currentMedications", "medicationInput")}
              >
                Add
              </Button>
            </div>
            {(formData.currentMedications as string[]).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(formData.currentMedications as string[]).map((med, i) => (
                  <Badge key={i} variant="secondary" className="gap-1 pr-1">
                    {med}
                    <button
                      type="button"
                      onClick={() => removeFromArray("currentMedications", i)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    >
                      <span className="sr-only">Remove</span>
                      &times;
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Health Conditions */}
          <div className="space-y-3">
            <Label>Health Conditions</Label>
            <div className="flex gap-2">
              <Input
                placeholder="E.g., diabetes, hypertension"
                value={formData.conditionInput as string}
                onChange={(e) => updateFormData("conditionInput", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addToArray("healthConditions", "conditionInput")}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => addToArray("healthConditions", "conditionInput")}
              >
                Add
              </Button>
            </div>
            {(formData.healthConditions as string[]).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(formData.healthConditions as string[]).map((condition, i) => (
                  <Badge key={i} variant="secondary" className="gap-1 pr-1">
                    {condition}
                    <button
                      type="button"
                      onClick={() => removeFromArray("healthConditions", i)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    >
                      &times;
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Allergies */}
          <div className="space-y-3">
            <Label>Known Allergies</Label>
            <div className="flex gap-2">
              <Input
                placeholder="E.g., penicillin, nuts"
                value={formData.allergyInput as string}
                onChange={(e) => updateFormData("allergyInput", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addToArray("allergies", "allergyInput")}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => addToArray("allergies", "allergyInput")}
              >
                Add
              </Button>
            </div>
            {(formData.allergies as string[]).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(formData.allergies as string[]).map((allergy, i) => (
                  <Badge key={i} variant="secondary" className="gap-1 pr-1">
                    {allergy}
                    <button
                      type="button"
                      onClick={() => removeFromArray("allergies", i)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    >
                      &times;
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg bg-primary/5 p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Why we ask:</strong> This information is
              critical for our Safety Command Center to check for herb-drug interactions and
              contraindications in real-time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DoshaAssessmentStep({
  formData,
  updateFormData,
  questions,
}: {
  formData: Record<string, unknown>;
  updateFormData: (key: string, value: unknown) => void;
  questions: typeof doshaQuestions;
}) {
  const answers = formData.doshaAnswers as Record<string, string>;

  const handleAnswer = (questionId: string, value: string) => {
    updateFormData("doshaAnswers", { ...answers, [questionId]: value });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-ayurveda/10"
        >
          <Sparkles className="h-10 w-10 text-ayurveda" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground">Constitutional Assessment</h1>
        <p className="mt-2 text-muted-foreground">
          Discover your Ayurvedic dosha to personalize your journey.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qIndex * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-foreground">{q.question}</h3>
                <RadioGroup
                  value={answers[q.id] || ""}
                  onValueChange={(value) => handleAnswer(q.id, value)}
                  className="space-y-3"
                >
                  {q.options.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                        answers[q.id] === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} />
                      <option.icon className="h-5 w-5 text-muted-foreground" />
                      <Label
                        htmlFor={`${q.id}-${option.value}`}
                        className="flex-1 cursor-pointer font-normal"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CulturalBackgroundStep({
  formData,
  updateFormData,
}: {
  formData: Record<string, unknown>;
  updateFormData: (key: string, value: unknown) => void;
}) {
  const traditions = [
    { id: "ayurveda", label: "Ayurveda", description: "Indian traditional medicine" },
    { id: "tcm", label: "Traditional Chinese Medicine", description: "Chinese healing arts" },
    { id: "unani", label: "Unani Medicine", description: "Greco-Arabic traditions" },
    { id: "western", label: "Western/Integrative", description: "Evidence-based medicine" },
  ];

  const dietary = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "halal", label: "Halal" },
    { id: "kosher", label: "Kosher" },
    { id: "glutenfree", label: "Gluten-Free" },
    { id: "none", label: "No Restrictions" },
  ];

  const toggleTradition = (id: string) => {
    const current = formData.traditions as string[];
    if (current.includes(id)) {
      updateFormData("traditions", current.filter((t) => t !== id));
    } else {
      updateFormData("traditions", [...current, id]);
    }
  };

  const toggleDietary = (id: string) => {
    const current = formData.dietaryPreferences as string[];
    if (current.includes(id)) {
      updateFormData("dietaryPreferences", current.filter((t) => t !== id));
    } else {
      updateFormData("dietaryPreferences", [...current, id]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-unani/10"
        >
          <Leaf className="h-10 w-10 text-unani" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground">Cultural Alignment</h1>
        <p className="mt-2 text-muted-foreground">
          Help us recommend traditions that resonate with your background.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <Label>Which traditions interest you? (Select all that apply)</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {traditions.map((tradition) => (
                <button
                  key={tradition.id}
                  type="button"
                  onClick={() => toggleTradition(tradition.id)}
                  className={`flex flex-col items-start rounded-lg border p-4 text-left transition-colors ${
                    (formData.traditions as string[]).includes(tradition.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-medium text-foreground">{tradition.label}</span>
                    {(formData.traditions as string[]).includes(tradition.id) && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <span className="mt-1 text-sm text-muted-foreground">
                    {tradition.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Dietary Preferences (Select all that apply)</Label>
            <div className="flex flex-wrap gap-2">
              {dietary.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleDietary(item.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    (formData.dietaryPreferences as string[]).includes(item.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GoalsStep({
  formData,
  updateFormData,
}: {
  formData: Record<string, unknown>;
  updateFormData: (key: string, value: unknown) => void;
}) {
  const goals = [
    { id: "stress", label: "Reduce Stress & Anxiety", icon: Moon },
    { id: "sleep", label: "Improve Sleep", icon: Moon },
    { id: "energy", label: "Boost Energy", icon: Sun },
    { id: "digestion", label: "Better Digestion", icon: Flame },
    { id: "pain", label: "Manage Pain", icon: Heart },
    { id: "immunity", label: "Strengthen Immunity", icon: Shield },
    { id: "mental", label: "Mental Clarity", icon: Sparkles },
    { id: "weight", label: "Weight Management", icon: TrendingUp },
  ];

  const toggleGoal = (id: string) => {
    const current = formData.primaryGoals as string[];
    if (current.includes(id)) {
      updateFormData("primaryGoals", current.filter((g) => g !== id));
    } else {
      updateFormData("primaryGoals", [...current, id]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
          <TrendingUp className="h-10 w-10 text-primary" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground">Your Health Goals</h1>
        <p className="mt-2 text-muted-foreground">
          What do you hope to achieve on your wellness journey?
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <Label>Select your primary goals (choose up to 3)</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {goals.map((goal) => {
                const isSelected = (formData.primaryGoals as string[]).includes(goal.id);
                const isDisabled =
                  !isSelected && (formData.primaryGoals as string[]).length >= 3;

                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => !isDisabled && toggleGoal(goal.id)}
                    disabled={isDisabled}
                    className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : isDisabled
                        ? "cursor-not-allowed border-border opacity-50"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <goal.icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={isSelected ? "font-medium text-foreground" : "text-foreground"}>
                      {goal.label}
                    </span>
                    {isSelected && <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProviderStep({
  formData,
  updateFormData,
  dosha,
}: {
  formData: Record<string, unknown>;
  updateFormData: (key: string, value: unknown) => void;
  dosha: { primary: string; secondary: string };
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-safe/10"
        >
          <CheckCircle2 className="h-10 w-10 text-safe" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground">Almost There!</h1>
        <p className="mt-2 text-muted-foreground">
          Connect with your healthcare provider for coordinated care.
        </p>
      </div>

      {/* Dosha Result Preview */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold text-foreground">Your Preliminary Dosha Profile</h3>
          <div className="flex items-center gap-4">
            <Badge className="bg-ayurveda text-white">{dosha.primary} Primary</Badge>
            <Badge variant="outline">{dosha.secondary} Secondary</Badge>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            This is your initial assessment. Your full profile across all traditions will be
            available in your dashboard.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <Label>Do you have a primary healthcare provider?</Label>
            <RadioGroup
              value={formData.hasProvider as string}
              onValueChange={(value) => updateFormData("hasProvider", value)}
              className="space-y-3"
            >
              <div
                className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                  formData.hasProvider === "yes"
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <RadioGroupItem value="yes" id="provider-yes" />
                <Label htmlFor="provider-yes" className="flex-1 cursor-pointer font-normal">
                  Yes, I have a healthcare provider
                </Label>
              </div>
              <div
                className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                  formData.hasProvider === "no"
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <RadioGroupItem value="no" id="provider-no" />
                <Label htmlFor="provider-no" className="flex-1 cursor-pointer font-normal">
                  No, I don&apos;t have one currently
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.hasProvider === "yes" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="providerEmail">Provider&apos;s Email (Optional)</Label>
                <Input
                  id="providerEmail"
                  type="email"
                  placeholder="doctor@healthcare.com"
                  value={formData.providerEmail as string}
                  onChange={(e) => updateFormData("providerEmail", e.target.value)}
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="shareProvider"
                  checked={formData.shareWithProvider as boolean}
                  onCheckedChange={(checked) => updateFormData("shareWithProvider", checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="shareProvider" className="font-medium">
                    Share my wellness journey with my provider
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Your provider will receive summary reports of your interventions and any safety
                    alerts.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Coordinated Care:</strong> Our escalation
              protocols will alert you when to consult a healthcare provider, ensuring you get
              the right care at the right time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
