"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 md:px-8">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -left-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute -right-[10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]" />
            </div>

            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">


                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl md:text-8xl"
                >
                    Wellness Without
                    <span className="block text-primary">Safety Creates Risk</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
                >
                    Most wellness tools optimize for engagement — not patient safety.
                    Wisdom Path unifies fragmented advice, monitors herb-drug interactions,
                    and escalates care when it matters most.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-10 flex flex-wrap justify-center gap-4"
                >
                    <Link href="/onboarding/assessment">
                        <Button size="lg" className="h-12 rounded-full px-8 text-base shadow-lg shadow-primary/25">
                            Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="#innovation">
                        <Button size="lg" variant="outline" className="h-12 rounded-full px-8 text-base">
                            Learn How It Works
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute bottom-0 left-0 right-0 -z-20 h-[400px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </section>
    );
}
