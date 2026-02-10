"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, HeartPulse, Activity, Brain, Wind } from "lucide-react";
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
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Diseases & Conditions</h1>
                    <p className="text-muted-foreground">Browse our comprehensive list of medical conditions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="az">Name (A-Z)</SelectItem>
                            <SelectItem value="za">Name (Z-A)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col lg:flex-row gap-6 mb-10">
                <div className="w-full lg:w-1/4">
                    <Input
                        placeholder="Search diseases..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-6"
                    />

                    <div className="space-y-2">
                        <h3 className="font-semibold mb-3">Categories</h3>
                        <div className="flex flex-wrap lg:flex-col gap-2">
                            <Button
                                variant={selectedCategory === "All" ? "default" : "ghost"}
                                className="justify-start w-full lg:w-auto"
                                onClick={() => setSelectedCategory("All")}
                            >
                                All Categories
                            </Button>
                            {CATEGORIES.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "ghost"}
                                    className="justify-start w-full lg:w-auto"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="w-full lg:w-3/4">
                    <div className="mb-4 text-sm text-muted-foreground">
                        Showing {filteredDiseases.length} results
                    </div>

                    {filteredDiseases.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDiseases.map((disease) => (
                                <Card key={disease.slug} className="flex flex-col h-full hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="p-2 rounded-full bg-accent/50">
                                                {getIcon(disease.icon)}
                                            </div>
                                            <Badge variant="outline">{disease.category}</Badge>
                                        </div>
                                        <CardTitle className="text-xl">{disease.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <CardDescription className="line-clamp-3">
                                            {disease.shortDescription}
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter className="mt-auto pt-4">
                                        <Button variant="ghost" className="w-full justify-between group" asChild>
                                            <Link href={`/diseases/${disease.slug}`}>
                                                Learn More
                                                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 border rounded-lg bg-muted/10">
                            <p className="text-lg text-muted-foreground">No diseases found matching your criteria.</p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                }}
                            >
                                Clear filters
                            </Button>
                        </div>
                    )}
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
