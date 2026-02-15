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

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">About Care Cures</h1>
                <p className="text-xl text-muted-foreground">
                    Empowering you with the knowledge to understand your health better.
                </p>
            </div>

            <div className="grid gap-8">
                {/* Purpose */}
                <section>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl">
                                <HeartPulse className="mr-3 h-6 w-6 text-primary" />
                                Our Mission
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-lg leading-relaxed text-muted-foreground">
                            <p className="mb-4">
                                Care Cures was created with a simple goal: to make medical information accessible, easy to understand, and less intimidating for everyone. We believe that understanding your health is the first step toward better well-being.
                            </p>
                            <p>
                                Our platform aggregates simplified medical data about common diseases, symptoms, and preventive measures, creating a bridge between complex medical terminology and everyday language.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Who Is It For */}
                <section className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">For Patients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Understand what your symptoms might mean, prepare for doctor visits, and learn how to manage conditions effectively.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    Simplified explanations
                                </li>
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    Symptom checklists
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">For Caregivers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Get the information you need to support your loved ones, understand their medications, and recognize warning signs.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    Prevention tips
                                </li>
                                <li className="flex items-center text-sm">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    Emergency guidelines
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Disclaimer */}
                <section>
                    <Card className="border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/30">
                        <CardHeader>
                            <CardTitle className="text-red-700 dark:text-red-400">Medical Disclaimer</CardTitle>
                        </CardHeader>
                        <CardContent className="text-red-800/80 dark:text-red-300">
                            <p className="mb-4 font-semibold">
                                This website is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
                            </p>
                            <p className="mb-4">
                                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
                            </p>
                            <p>
                                If you think you may have a medical emergency, call your doctor or emergency services immediately. Care Cures does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Site.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <div className="text-center mt-8">
                    <Button size="lg" asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
