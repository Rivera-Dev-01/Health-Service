"use client";

import Link from "next/link";
import { HeartPulse, CheckCircle2, Users, Stethoscope, Heart, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">{t("about.title")}</h1>
                <p className="text-xl text-muted-foreground">
                    {t("about.subtitle")}
                </p>
            </div>

            <div className="grid gap-8">
                {/* Purpose */}
                <section>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl">
                                <HeartPulse className="mr-3 h-6 w-6 text-primary" />
                                {t("about.mission.title")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-lg leading-relaxed text-muted-foreground">
                            <p className="mb-4">
                                {t("about.mission.p1")}
                            </p>
                            <p>
                                {t("about.mission.p2")}
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Who We Serve Section Header */}
                <section className="text-center mb-6">
                    <div className="inline-flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold">{t("about.serve.title")}</h2>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("about.serve.subtitle")}
                    </p>
                </section>

                {/* Who Is It For */}
                <section className="space-y-4">
                    <Card className="border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Stethoscope className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">{t("about.patients.title")}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4 text-base">
                                {t("about.patients.desc")}
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600 flex-shrink-0" />
                                    <span>{t("about.patients.feature1")}</span>
                                </li>
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600 flex-shrink-0" />
                                    <span>{t("about.patients.feature2")}</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Heart className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">{t("about.caregivers.title")}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4 text-base">
                                {t("about.caregivers.desc")}
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600 flex-shrink-0" />
                                    <span>{t("about.caregivers.feature1")}</span>
                                </li>
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600 flex-shrink-0" />
                                    <span>{t("about.caregivers.feature2")}</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <GraduationCap className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">{t("about.students.title")}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4 text-base">
                                {t("about.students.desc")}
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600 flex-shrink-0" />
                                    <span>{t("about.students.feature1")}</span>
                                </li>
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-600 flex-shrink-0" />
                                    <span>{t("about.students.feature2")}</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Disclaimer */}
                <section>
                    <Card className="border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/30">
                        <CardHeader>
                            <CardTitle className="text-red-700 dark:text-red-400">{t("about.disclaimer.title")}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-red-800/80 dark:text-red-300">
                            <p className="mb-4 font-semibold">
                                {t("about.disclaimer.p1")}
                            </p>
                            <p className="mb-4">
                                {t("about.disclaimer.p2")}
                            </p>
                            <p>
                                {t("about.disclaimer.p3")}
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <div className="text-center mt-8">
                    <Button size="lg" asChild>
                        <Link href="/">{t("about.back")}</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
