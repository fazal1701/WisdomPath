"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Activity, Brain } from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "AI-Guided Wisdom",
        description: "Cross-tradition intelligence ensuring personalized care (TCM, Ayurveda, Western).",
    },
    {
        icon: ShieldCheck,
        title: "Safety Guardrails",
        description: "Built-in herb-drug interaction checks and contraindication monitoring.",
    },
    {
        icon: Activity,
        title: "Auto-Escalation",
        description: "Automatic alerts and escalation paths when risk thresholds are reached.",
    },
];

export function InnovationSection() {
    return (
        <section id="innovation" className="relative py-24 sm:py-32 bg-muted/30">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Safety-First, Guided Wellness
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Wisdom Path respects holistic medicine without compromising safety.
                        We provide a structured path from guidance to monitoring, and finally to necessary escalation.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative flex flex-col items-center text-center rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                                </div>
                                <dt className="text-xl font-semibold leading-7 text-foreground">
                                    {feature.title}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
