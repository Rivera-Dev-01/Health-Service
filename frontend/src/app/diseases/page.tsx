"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, HeartPulse, Activity, Brain, Wind, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getAllDiseases, getDisplayText } from "@/lib/diseases";
import type { DiseaseWithTranslation } from "@/lib/diseases";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

// Helper to get icon component
const getIcon = (iconName: string) => {
    switch (iconName) {
        case "Heart": return <HeartPulse className="h-5 w-5 text-red-500" />;
        case "Activity": return <Activity className="h-5 w-5 text-blue-500" />;
        case "Brain": return <Brain className="h-5 w-5 text-yellow-500" />;
        case "Wind": return <Wind className="h-5 w-5 text-gray-500" />;
        case "HeartPulse": return <HeartPulse className="h-5 w-5 text-red-500" />;
        case "Droplet": return <Activity className="h-5 w-5 text-blue-400" />;
        case "AlertCircle": return <Activity className="h-5 w-5 text-orange-500" />;
        case "Shield": return <Activity className="h-5 w-5 text-green-500" />;
        case "Bug": return <Activity className="h-5 w-5 text-red-400" />;
        case "Thermometer": return <Activity className="h-5 w-5 text-red-300" />;
        case "AlertTriangle": return <Activity className="h-5 w-5 text-yellow-600" />;
        default: return <Activity className="h-5 w-5 text-primary" />;
    }
};

function DiseaseListContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";
    const initialSearch = searchParams.get("search") || "";
    const { language, t } = useLanguage();

    const [diseases, setDiseases] = useState<DiseaseWithTranslation[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [sortOrder, setSortOrder] = useState("az");

    // Helper function to translate category names
    const translateCategory = (category: string) => {
        const key = `category.${category.toLowerCase().replace(/[^a-z]/g, '')}`;
        const translated = t(key);
        // If translation key doesn't exist, return original
        return translated === key ? category : translated;
    };

    // Fetch diseases from Supabase
    useEffect(() => {
        async function fetchDiseases() {
            setLoading(true);
            const data = await getAllDiseases(language);
            setDiseases(data);
            setLoading(false);
        }
        fetchDiseases();
    }, [language]); // Re-fetch when language changes

    // Get unique categories from diseases
    const categories = useMemo(() => {
        const cats = Array.from(new Set(diseases.map(d => d.category))).sort();
        return cats;
    }, [diseases]);

    const filteredDiseases = useMemo(() => {
        return diseases.filter((disease) => {
            const displayName = getDisplayText(disease, 'name') as string;
            const displayShortDesc = getDisplayText(disease, 'short_description') as string;
            
            const matchesCategory = selectedCategory === "All" || disease.category === selectedCategory;
            const matchesSearch = displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                displayShortDesc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        }).sort((a, b) => {
            const nameA = getDisplayText(a, 'name') as string;
            const nameB = getDisplayText(b, 'name') as string;
            
            if (sortOrder === "az") {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });
    }, [diseases, selectedCategory, searchQuery, sortOrder]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading diseases...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <section className="bg-muted/30 border-b border-border py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-block mb-3">
                            <span className="text-sm font-bold text-primary uppercase tracking-wider">{t("diseases.library")}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t("diseases.title")}</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Browse our comprehensive database of medical conditions with detailed information about symptoms, causes, and treatments.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
                {/* Search and Sort Bar */}
                <div className="flex flex-col gap-3 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder={t("diseases.search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-11 text-base"
                        />
                    </div>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="az">Name (A-Z)</SelectItem>
                            <SelectItem value="za">Name (Z-A)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Mobile Category Filter - Horizontal Scroll */}
                <div className="lg:hidden mb-6">
                    <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wider">{t("diseases.filter")}</h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        <Button
                            variant={selectedCategory === "All" ? "default" : "outline"}
                            size="sm"
                            className="shrink-0 rounded-full"
                            onClick={() => setSelectedCategory("All")}
                        >
                            {t("diseases.all")}
                            <span className="ml-1.5 text-xs opacity-70">({diseases.length})</span>
                        </Button>
                        {categories.map((category) => {
                            const count = diseases.filter(d => d.category === category).length;
                            return (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    size="sm"
                                    className="shrink-0 rounded-full"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {translateCategory(category)}
                                    <span className="ml-1.5 text-xs opacity-70">({count})</span>
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/* Filters & Results */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-20">
                            <h3 className="font-bold text-lg mb-4">{t("diseases.filter")}</h3>
                            <div className="space-y-1">
                                <Button
                                    variant={selectedCategory === "All" ? "default" : "ghost"}
                                    className="w-full justify-start font-medium"
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    {t("diseases.all")}
                                    <span className="ml-auto text-xs opacity-60">{diseases.length}</span>
                                </Button>
                                {categories.map((category) => {
                                    const count = diseases.filter(d => d.category === category).length;
                                    return (
                                        <Button
                                            key={category}
                                            variant={selectedCategory === category ? "default" : "ghost"}
                                            className="w-full justify-start font-medium"
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {translateCategory(category)}
                                            <span className="ml-auto text-xs opacity-60">{count}</span>
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">{filteredDiseases.length}</span> {t("diseases.found")}
                            </p>
                            {(searchQuery || selectedCategory !== "All") && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("All");
                                    }}
                                >
                                    {t("diseases.clear")}
                                </Button>
                            )}
                        </div>

                        {filteredDiseases.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredDiseases.map((disease, index) => {
                                    const displayName = getDisplayText(disease, 'name') as string;
                                    const displayShortDesc = getDisplayText(disease, 'short_description') as string;
                                    const displaySymptoms = getDisplayText(disease, 'symptoms') as string[];
                                    
                                    return (
                                    <motion.div
                                        key={disease.disease_id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Link href={`/diseases/${disease.slug}`} className="block h-full">
                                            <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/30 relative overflow-hidden cursor-pointer flex flex-col">
                                                {/* Animated background blob */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                                                
                                                <CardHeader className="relative pb-4">
                                                    <div className="flex justify-between items-start mb-4">
                                                        {/* Left: Icon */}
                                                        <div className="p-3 rounded-xl bg-primary/10 border-2 border-primary/20">
                                                            {getIcon(disease.icon)}
                                                        </div>
                                                        {/* Right: Reviewed Badge */}
                                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
                                                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                                            <span className="text-xs font-semibold text-green-700">{t("diseases.reviewed")}</span>
                                                        </div>
                                                    </div>
                                                    {/* Category Badge - Full width placement */}
                                                    <div className="mb-3">
                                                        <Badge variant="secondary" className="text-xs font-medium">{translateCategory(disease.category)}</Badge>
                                                    </div>
                                                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors mb-2">
                                                        {displayName}
                                                    </CardTitle>
                                                    <CardDescription className="text-base leading-relaxed">
                                                        {displayShortDesc}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="relative space-y-3 flex-1">
                                                    {displaySymptoms.length > 0 && (
                                                        <div>
                                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Common Symptoms</p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {displaySymptoms.slice(0, 3).map((symptom, idx) => (
                                                                    <Badge key={idx} variant="outline" className="text-xs font-normal">
                                                                        {symptom}
                                                                    </Badge>
                                                                ))}
                                                                {displaySymptoms.length > 3 && (
                                                                    <Badge variant="outline" className="text-xs font-normal">
                                                                        +{displaySymptoms.length - 3} more
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </CardContent>
                                                <CardFooter className="relative pt-4 mt-auto">
                                                    <div className="w-full flex items-center justify-between text-sm font-medium group-hover:text-primary transition-colors">
                                                        <span>{t("diseases.learn")}</span>
                                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                )})}
                            </div>
                        ) : (
                            <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/10">
                                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{t("diseases.no.found")}</h3>
                                <p className="text-muted-foreground mb-4">{t("diseases.adjust")}</p>
                                <Button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("All");
                                    }}
                                >
                                    {t("diseases.clear.all")}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DiseaseListPage() {
    return (
        <Suspense fallback={<div className="container py-12 text-center">Loading...</div>}>
            <DiseaseListContent />
        </Suspense>
    );
}
