"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, HeartPulse, Activity, Brain, Wind, Search } from "lucide-react";
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
import { MOCK_DISEASES, CATEGORIES } from "@/lib/mock-data";
import { motion } from "framer-motion";

// Helper to get icon component
const getIcon = (iconName: string) => {
    switch (iconName) {
        case "Heart": return <HeartPulse className="h-5 w-5 text-red-500" />;
        case "Activity": return <Activity className="h-5 w-5 text-blue-500" />;
        case "Zap": return <Brain className="h-5 w-5 text-yellow-500" />;
        case "Wind": return <Wind className="h-5 w-5 text-gray-500" />;
        default: return <Activity className="h-5 w-5 text-primary" />;
    }
};

function DiseaseListContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";
    const initialSearch = searchParams.get("search") || "";

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [sortOrder, setSortOrder] = useState("az");

    const filteredDiseases = useMemo(() => {
        return MOCK_DISEASES.filter((disease) => {
            const matchesCategory = selectedCategory === "All" || disease.category === selectedCategory;
            const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                disease.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        }).sort((a, b) => {
            if (sortOrder === "az") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name); // za
            }
        });
    }, [selectedCategory, searchQuery, sortOrder]);

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
                            <span className="text-sm font-bold text-primary uppercase tracking-wider">Medical Library</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Diseases & Conditions</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Browse our comprehensive database of medical conditions with detailed information about symptoms, causes, and treatments.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
                {/* Search and Sort Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search diseases by name or symptoms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 border-2"
                        />
                    </div>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-full md:w-[200px] h-12 border-2">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="az">Name (A-Z)</SelectItem>
                            <SelectItem value="za">Name (Z-A)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Filters & Results */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-4">
                            <h3 className="font-bold text-lg mb-4">Filter by Category</h3>
                            <div className="space-y-1">
                                <Button
                                    variant={selectedCategory === "All" ? "default" : "ghost"}
                                    className="w-full justify-start font-medium"
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    All Categories
                                    <span className="ml-auto text-xs opacity-60">{MOCK_DISEASES.length}</span>
                                </Button>
                                {CATEGORIES.map((category) => {
                                    const count = MOCK_DISEASES.filter(d => d.category === category).length;
                                    return (
                                        <Button
                                            key={category}
                                            variant={selectedCategory === category ? "default" : "ghost"}
                                            className="w-full justify-start font-medium"
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {category}
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
                                <span className="font-semibold text-foreground">{filteredDiseases.length}</span> conditions found
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
                                    Clear filters
                                </Button>
                            )}
                        </div>

                        {filteredDiseases.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredDiseases.map((disease, index) => (
                                    <motion.div
                                        key={disease.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Link href={`/diseases/${disease.slug}`} className="block h-full">
                                            <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-primary/20 relative overflow-hidden cursor-pointer flex flex-col">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                                                <CardHeader className="relative pb-4">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                                            {getIcon(disease.icon)}
                                                        </div>
                                                        <Badge variant="secondary" className="font-medium">{disease.category}</Badge>
                                                    </div>
                                                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors mb-2">
                                                        {disease.name}
                                                    </CardTitle>
                                                    <CardDescription className="text-base leading-relaxed">
                                                        {disease.shortDescription}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="relative space-y-3 flex-1">
                                                    {disease.symptoms.length > 0 && (
                                                        <div>
                                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Common Symptoms</p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {disease.symptoms.slice(0, 3).map((symptom, idx) => (
                                                                    <Badge key={idx} variant="outline" className="text-xs font-normal">
                                                                        {symptom}
                                                                    </Badge>
                                                                ))}
                                                                {disease.symptoms.length > 3 && (
                                                                    <Badge variant="outline" className="text-xs font-normal">
                                                                        +{disease.symptoms.length - 3} more
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </CardContent>
                                                <CardFooter className="relative pt-4 mt-auto">
                                                    <div className="w-full flex items-center justify-between text-sm font-medium group-hover:text-primary transition-colors">
                                                        <span>Learn More</span>
                                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/10">
                                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">No conditions found</h3>
                                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                                <Button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("All");
                                    }}
                                >
                                    Clear all filters
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
