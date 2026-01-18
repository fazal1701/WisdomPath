"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Sparkles,
  Heart,
  Brain,
  ArrowRight,
  CheckCircle2,
  Globe,
  Users,
  Lock,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";

const traditions = [
  {
    name: "Traditional Chinese Medicine",
    abbrev: "TCM",
    description: "5,000 years of qi cultivation, acupuncture, and herbal wisdom",
    image: "/images/tradition-tcm.jpg",
    color: "bg-tcm",
  },
  {
    name: "Ayurveda",
    abbrev: "Ayurveda",
    description: "Ancient Indian science of life, doshas, and holistic balance",
    image: "/images/tradition-ayurveda.jpg",
    color: "bg-ayurveda",
  },
  {
    name: "Unani Medicine",
    abbrev: "Unani",
    description: "Greco-Arabic healing traditions with humoral theory",
    image: "/images/tradition-unani.jpg",
    color: "bg-unani",
  },
  {
    name: "Western Medicine",
    abbrev: "Western",
    description: "Evidence-based protocols and modern clinical research",
    image: "/images/tradition-western.jpg",
    color: "bg-western",
  },
];

const features = [
  {
    icon: Shield,
    title: "Safety-First Intelligence",
    description: "Real-time interaction checks across all traditions. Never miss a contraindication.",
  },
  {
    icon: Brain,
    title: "AI Cultural Competency",
    description: "Trained on multiple medical systems to provide personalized, culturally-aware guidance.",
  },
  {
    icon: Globe,
    title: "Cross-Tradition Synthesis",
    description: "See how different systems approach your condition and find what aligns with your values.",
  },
  {
    icon: TrendingUp,
    title: "Outcome Tracking",
    description: "Track what works for you with evidence-based metrics and personal insights.",
  },
];

const stats = [
  { value: "5,000+", label: "Years of Combined Wisdom" },
  { value: "80%", label: "Global Traditional Medicine Use" },
  { value: "95%+", label: "Safety Prevention Rate" },
  { value: "4", label: "Medicine Traditions Unified" },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">W</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              WisdomPath
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#traditions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Traditions
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Safety
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="sm" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-16">
        <motion.div style={{ y }} className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-wellness.jpg"
            alt="Holistic wellness"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 text-center lg:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Where Ancient Wisdom Meets Modern Safety
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Health Journey,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Four Traditions
            </span>
            , One Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl"
          >
            Combine the wisdom of Traditional Chinese Medicine, Ayurveda, Unani, and Western
            Medicine with AI-powered safety protocols and personalized guidance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href="/onboarding">
              <Button size="lg" className="gap-2 px-8">
                Start Your Assessment
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="gap-2 px-8 bg-transparent">
                See How It Works
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Safety-First Design</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Practitioner Verified</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1"
          >
            <div className="h-2 w-1 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section id="traditions" className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4">Four Traditions</Badge>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Ancient Wisdom, Modern Integration
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Each tradition offers unique insights. We help you understand how they approach your
              health concerns and find what resonates with your values.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {traditions.map((tradition, index) => (
              <motion.div
                key={tradition.abbrev}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tradition.image || "/placeholder.svg"}
                    alt={tradition.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className={`mb-3 inline-flex rounded-full ${tradition.color} px-3 py-1 text-xs font-medium text-white`}>
                    {tradition.abbrev}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{tradition.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{tradition.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4">Platform Features</Badge>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Intelligent Health Guidance
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Our AI combines cross-tradition knowledge with modern safety protocols to give you
              personalized, culturally-aware recommendations.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-5 rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">Safety Command Center</Badge>
              <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
                Your Safety is Non-Negotiable
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                80% of the world uses traditional medicine, but without proper safety checks. We
                built WisdomPath to change that with real-time interaction monitoring and early
                escalation protocols.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Real-time herb-drug interaction checking",
                  "Global regulatory compliance alerts",
                  "Quality assurance and contamination warnings",
                  "Early escalation to medical care when needed",
                  "Provider communication portal",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/onboarding">
                  <Button size="lg" className="gap-2">
                    Start Safe Today
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image
                  src="/images/safety-shield.jpg"
                  alt="Safety protection"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -left-4 top-8 rounded-xl border border-border bg-card p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-safe/10">
                    <Shield className="h-5 w-5 text-safe" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Safety Score</div>
                    <div className="text-xs text-muted-foreground">95%+ Prevention</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -right-4 bottom-8 rounded-xl border border-border bg-card p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Real-time Alerts</div>
                    <div className="text-xs text-muted-foreground">Instant Protection</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
              Begin Your Wisdom Journey Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-primary-foreground/80">
              Take our free 5-minute assessment to discover your constitutional profile across all
              four traditions and get personalized, safe recommendations.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/onboarding">
                <Button size="lg" variant="secondary" className="gap-2 px-8">
                  Start Free Assessment
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/60">
              No credit card required. HIPAA compliant. Your data stays yours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">W</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground">
                WisdomPath
              </span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/hipaa" className="text-muted-foreground hover:text-foreground transition-colors">
                HIPAA Notice
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>

            <div className="text-sm text-muted-foreground">
              2025 WisdomPath. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
