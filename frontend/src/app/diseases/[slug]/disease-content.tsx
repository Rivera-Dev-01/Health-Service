"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Info, AlertTriangle, Activity, ShieldCheck, Stethoscope, CheckCircle2, Share2, ChevronDown, ChevronUp, Languages } from "lucide-react";
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
import { DiseaseWithTranslation, getDisplayText } from "@/lib/diseases";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

interface DiseaseContentProps {
    disease: DiseaseWithTranslation;
    relatedDiseases: DiseaseWithTranslation[];
}

export function DiseaseContent({ disease: initialDisease, relatedDiseases }: DiseaseContentProps) {
    const { language, setLanguage, t } = useLanguage();
    const [disease, setDisease] = useState(initialDisease);
    const [loading, setLoading] = useState(false);
    const [showAllCauses, setShowAllCauses] = useState(false);
    const [showAllSymptoms, setShowAllSymptoms] = useState(false);
    const [showAllPrevention, setShowAllPrevention] = useState(false);

    // Fetch translation on mount if language is not English
    useEffect(() => {
        if (language === 'tl' && !initialDisease.translation) {
            fetchTranslation('tl');
        }
    }, []); // Run once on mount

    // Watch for language changes from navbar
    useEffect(() => {
        // If language changed and we don't have the right translation, fetch it
        const hasTranslation = disease.translation !== undefined;
        const needsTranslation = language === 'tl' && !hasTranslation;
        const needsEnglish = language === 'en' && hasTranslation;
        
        if (needsTranslation) {
            fetchTranslation('tl');
        } else if (needsEnglish) {
            // Reset to English (no translation)
            setDisease(initialDisease);
        }
    }, [language]); // Run when language changes

    const fetchTranslation = async (lang: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/diseases/${disease.slug}?lang=${lang}`);
            if (response.ok) {
                const data = await response.json();
                setDisease(data);
            }
        } catch (error) {
            console.error('Error fetching translation:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get display values (translation or fallback to English)
    const displayName = getDisplayText(disease, 'name') as string;
    const displayShortDesc = getDisplayText(disease, 'short_description') as string;
    const displayOverview = getDisplayText(disease, 'overview') as string;
    const displayCauses = getDisplayText(disease, 'causes') as string[];
    const displaySymptoms = getDisplayText(disease, 'symptoms') as string[];
    const displayPrevention = getDisplayText(disease, 'prevention') as string[];
    const displayWhenToSeeDoctor = getDisplayText(disease, 'when_to_see_doctor') as string;

    const toggleLanguage = async () => {
        const newLang = language === 'en' ? 'tl' : 'en';
        await fetchTranslation(newLang);
        setLanguage(newLang);
    };

    const sections = [
        { id: "overview", label: t("disease.overview"), icon: Info, color: "blue" },
        { id: "causes", label: t("disease.causes"), icon: AlertTriangle, color: "orange" },
        { id: "symptoms", label: t("disease.symptoms"), icon: Activity, color: "red" },
        { id: "prevention", label: t("disease.prevention"), icon: ShieldCheck, color: "green" },
        { id: "doctor", label: t("disease.doctor"), icon: Stethoscope, color: "purple" },
    ];

    const displayedCauses = showAllCauses ? displayCauses : displayCauses.slice(0, 6);
    const displayedSymptoms = showAllSymptoms ? displaySymptoms : displaySymptoms.slice(0, 9);
    const displayedPrevention = showAllPrevention ? displayPrevention : displayPrevention.slice(0, 6);

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
                                    <BreadcrumbLink href="/">{t("nav.home")}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/diseases">{t("nav.diseases")}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{displayName}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge variant="secondary" className="text-sm px-4 py-1.5 font-medium">
                                        {disease.category}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">{t("disease.reviewed")}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{displayName}</h1>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                                    {displayShortDesc}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="gap-2"
                                    onClick={toggleLanguage}
                                    disabled={loading}
                                >
                                    <Languages className="h-4 w-4" />
                                    {loading ? 'Loading...' : language === 'en' ? 'Tagalog' : 'English'}
                                </Button>
                                <Button variant="outline" size="lg" className="gap-2">
                                    <Share2 className="h-4 w-4" />
                                    {t("disease.share")}
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
                                <h2 className="text-3xl font-bold">{t("disease.what")} {displayName}?</h2>
                            </div>
                            <Card className="border-2">
                                <CardContent className="pt-6">
                                    <p className="text-lg leading-relaxed text-foreground/80">
                                        {displayOverview}
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
                                <h2 className="text-3xl font-bold">{t("disease.causes")}</h2>
                            </div>
                            <Card className="border-2">
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {displayedCauses.map((cause, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-orange-50/50 border border-orange-100 hover:border-orange-200 transition-colors">
                                                <div className="mt-0.5 h-5 w-5 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-bold text-orange-600">{idx + 1}</span>
                                                </div>
                                                <p className="text-sm text-foreground/80 leading-relaxed">{cause}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {displayCauses.length > 6 && (
                                        <div className="mt-4 text-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowAllCauses(!showAllCauses)}
                                                className="gap-2"
                                            >
                                                {showAllCauses ? (
                                                    <>Show Less <ChevronUp className="h-4 w-4" /></>
                                                ) : (
                                                    <>Show All {displayCauses.length} Causes <ChevronDown className="h-4 w-4" /></>
                                                )}
                                            </Button>
                                        </div>
                                    )}
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
                                <h2 className="text-3xl font-bold">{t("disease.symptoms")}</h2>
                            </div>
                            <Card className="border-2 border-l-4 border-l-red-500">
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {displayedSymptoms.map((symptom, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50/50 border border-red-100 hover:border-red-200 transition-colors">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                                <span className="text-sm text-foreground/80">{symptom}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {displaySymptoms.length > 9 && (
                                        <div className="mt-4 text-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowAllSymptoms(!showAllSymptoms)}
                                                className="gap-2"
                                            >
                                                {showAllSymptoms ? (
                                                    <>Show Less <ChevronUp className="h-4 w-4" /></>
                                                ) : (
                                                    <>Show All {displaySymptoms.length} Symptoms <ChevronDown className="h-4 w-4" /></>
                                                )}
                                            </Button>
                                        </div>
                                    )}
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
                                <h2 className="text-3xl font-bold">{t("disease.prevention")}</h2>
                            </div>
                            <Card className="border-2 bg-green-50/30">
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {displayedPrevention.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-green-100 hover:border-green-200 transition-colors">
                                                <div className="mt-0.5 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                                </div>
                                                <p className="text-sm text-foreground/80 leading-relaxed">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {displayPrevention.length > 6 && (
                                        <div className="mt-4 text-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowAllPrevention(!showAllPrevention)}
                                                className="gap-2"
                                            >
                                                {showAllPrevention ? (
                                                    <>Show Less <ChevronUp className="h-4 w-4" /></>
                                                ) : (
                                                    <>Show All {displayPrevention.length} Tips <ChevronDown className="h-4 w-4" /></>
                                                )}
                                            </Button>
                                        </div>
                                    )}
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
                                <h2 className="text-3xl font-bold">{t("disease.doctor")}</h2>
                            </div>
                            <Card className="border-2 border-purple-200 bg-purple-50/30">
                                <CardContent className="pt-6">
                                    <p className="text-lg leading-relaxed text-foreground/80">
                                        {displayWhenToSeeDoctor}
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
                                <h3 className="text-2xl font-bold mb-6">{t("disease.related")}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {relatedDiseases.map((related) => (
                                        <Link key={related.slug} href={`/diseases/${related.slug}`}>
                                            <Card className="hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50 transition-all duration-300 h-full border-2">
                                                <CardHeader>
                                                    <CardTitle className="text-lg group-hover:text-primary">{related.name}</CardTitle>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">{related.short_description}</p>
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
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{t("disease.onpage")}</h3>
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
                                        {t("disease.disclaimer")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                    {t("disease.disclaimer.text")}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
