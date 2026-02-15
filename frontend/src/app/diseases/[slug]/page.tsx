import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Share2, Info, AlertTriangle, Activity, ShieldCheck, Stethoscope, CheckCircle2 } from "lucide-react";
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
import { MOCK_DISEASES, Disease } from "@/lib/mock-data";
import { DiseaseContent } from "./disease-content";

const getDisease = (slug: string): Disease | undefined => {
    return MOCK_DISEASES.find((d) => d.slug === slug);
};

const getRelatedDiseases = (slugs: string[]): Disease[] => {
    return MOCK_DISEASES.filter((d) => slugs.includes(d.slug));
};

export default async function DiseaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const disease = getDisease(slug);

    if (!disease) {
        notFound();
    }

    const relatedDiseases = getRelatedDiseases(disease.relatedSlugs);

    return <DiseaseContent disease={disease} relatedDiseases={relatedDiseases} />;
}
