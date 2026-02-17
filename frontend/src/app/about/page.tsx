"use client";

import Link from "next/link";
import { HeartPulse, CheckCircle2 } from "lucide-react";
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

                {/* Who Is It For */}
                <section className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">{t("about.patients.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                {t("about.patients.desc")}
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    {t("about.patients.feature1")}
                                </li>
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    {t("about.patients.feature2")}
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">{t("about.caregivers.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                {t("about.caregivers.desc")}
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    {t("about.caregivers.feature1")}
                                </li>
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    {t("about.caregivers.feature2")}
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
