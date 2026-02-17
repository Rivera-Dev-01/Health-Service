import Link from "next/link";
import { notFound } from "next/navigation";
import { getDiseaseBySlug, getRelatedDiseases } from "@/lib/diseases";
import { DiseaseContent } from "./disease-content";

export default async function DiseaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const disease = await getDiseaseBySlug(slug);

    if (!disease) {
        notFound();
    }

    const relatedDiseases = await getRelatedDiseases(disease.related_slugs);

    return <DiseaseContent disease={disease} relatedDiseases={relatedDiseases} />;
}
