"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

export function MvpSection() {
    return (
        <section className="relative overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-primary">MVP Validate</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                Wisdom Path MVP
                            </p>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                Our MVP proves that users want structured, safe guidance. The escalation logic
                                builds trust and creates a clear path to healthcare partnerships.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <Link href="/dashboard">
                                    <Button size="lg" className="rounded-full">
                                        View Live Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <a href="#" className="text-sm font-semibold leading-6 text-foreground">
                                    Read Documentation <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl bg-card border border-border p-2 shadow-2xl">
                            <div className="absolute top-0 right-0 p-4">
                                <Lock className="h-6 w-6 text-muted-foreground/50" />
                            </div>
                            <div className="aspect-[4/3] rounded-xl bg-muted/50 overflow-hidden relative">
                                <img
                                    src="/images/yoga_practice_1768698113268.png"
                                    alt="Dashboard Preview"
                                    className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
