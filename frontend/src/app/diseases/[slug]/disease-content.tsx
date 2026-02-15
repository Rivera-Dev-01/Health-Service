"use client";

import Link from "next/link";
import { Info, AlertTriangle, Activity, ShieldCheck, Stethoscope, CheckCircle2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Disease } from "@/lib/mock-data";
import { motion } from "framer-motion";

interface DiseaseContentProps {
    disease: Disease;
    relatedDiseases: Disease[];
}

export function DiseaseContent({ disease, relatedDiseases }: DiseaseContentProps) {
    const sections = [
        { id: "overview", label: "Overview", icon: Info, color: "blue" },
        { id: "causes", label: "Causes", icon: AlertTriangle, color: "orange" },
        { id: "symptoms", label: "Symptoms", icon: Activity, color: "red" },
        { id: "prevention", label: "Prevention", icon: ShieldCheck, color: "green" },
        { id: "doctor", label: "When to See a Doctor", icon: Stethoscope, color: "purple" },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <section className="bg-muted/30 border-b border-border">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Breadcrumb className="mb-6">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/diseases">Diseases</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{disease.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge variant="secondary" className="text-sm px-4 py-1.5 font-medium">
                                        {disease.category}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">Medically Reviewed</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{disease.name}</h1>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                                    {disease.shortDescription}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="lg" className="gap-2">
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12">

                        {/* Overview */}
                        <motion.section
                            id="overview"
                            className="scroll-mt-24"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20">
                                    <Info className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold">What is {disease.name}?</h2>
                            </div>
                            <Card className="border-2">
                                <CardContent className="pt-6">
                                    <p className="text-lg leading-relaxed text-foreground/80">
                                        {disease.overview}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.section>

                        {/* Causes */}
                        <motion.section
                            id="causes"
                            className="scroll-mt-24"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600 border border-orange-500/20">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold">Common Causes</h2>
                            </div>
                            <Card className="border-2">
                                <CardContent className="pt-6">
                                    <div className="grid gap-4">
                                        {disease.causes.map((cause, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                                                <div className="mt-1 h-6 w-6 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-bold text-orange-600">{idx + 1}</span>
                                                </div>
                                                <p className="text-base text-foreground/80 leading-relaxed">{cause}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.section>

                        {/* Symptoms */}
                        <motion.section
                            id="symptoms"
                            className="scroll-mt-24"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-red-500/10 text-red-600 border border-red-500/20">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold">Symptoms to Watch For</h2>
                            </div>
                            <Card className="border-2 border-l-4 border-l-red-500">
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {disease.symptoms.map((symptom, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50/50 transition-colors">
                                                <div className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                                                <span className="text-base text-foreground/80">{symptom}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.section>

                        {/* Prevention */}
                        <motion.section
                            id="prevention"
                            className="scroll-mt-24"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-green-500/10 text-green-600 border border-green-500/20">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold">Prevention Tips</h2>
                            </div>
                            <Card className="border-2 bg-green-50/30">
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        {disease.prevention.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-white border border-green-100">
                                                <div className="mt-0.5 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                </div>
                                                <p className="text-base text-foreground/80 leading-relaxed">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.section>

                        {/* When to See Doctor */}
                        <motion.section
                            id="doctor"
                            className="scroll-mt-24"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 border border-purple-500/20">
                                    <Stethoscope className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold">When to See a Doctor</h2>
                            </div>
                            <Card className="border-2 border-purple-200 bg-purple-50/30">
                                <CardContent className="pt-6">
                                    <p className="text-lg leading-relaxed text-foreground/80">
                                        {disease.whenToSeeDoctor}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.section>

                        {/* Related Diseases */}
                        {relatedDiseases.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Separator className="my-12" />
                                <h3 className="text-2xl font-bold mb-6">Related Conditions</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {relatedDiseases.map((related) => (
                                        <Link key={related.slug} href={`/diseases/${related.slug}`}>
                                            <Card className="hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50 transition-all duration-300 h-full border-2">
                                                <CardHeader>
                                                    <CardTitle className="text-lg group-hover:text-primary">{related.name}</CardTitle>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">{related.shortDescription}</p>
                                                </CardHeader>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* Sidebar Navigation */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <Card className="border-2">
                                <CardHeader>
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">On this page</h3>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <nav className="flex flex-col space-y-1">
                                        {sections.map((section) => (
                                            <a
                                                key={section.id}
                                                href={`#${section.id}`}
                                                className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors group"
                                            >
                                                <section.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                                                {section.label}
                                            </a>
                                        ))}
                                    </nav>
                                </CardContent>
                            </Card>

                            <Card className="bg-primary/5 border-2 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="text-base text-primary flex items-center gap-2">
                                        <Info className="h-5 w-5" />
                                        Medical Disclaimer
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                    This information is for educational purposes only. Always consult with a healthcare professional for medical advice.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
