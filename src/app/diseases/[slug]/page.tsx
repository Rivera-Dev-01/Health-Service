import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Share2, Info, AlertTriangle, Activity, ShieldCheck, Stethoscope } from "lucide-react";
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

// Helper to fetch data
const getDisease = (slug: string): Disease | undefined => {
    return MOCK_DISEASES.find((d) => d.slug === slug);
};

const getRelatedDiseases = (slugs: string[]): Disease[] => {
    return MOCK_DISEASES.filter((d) => slugs.includes(d.slug));
};

export async function generateStaticParams() {
    return MOCK_DISEASES.map((disease) => ({
        slug: disease.slug,
    }));
}

export default async function DiseaseDetailPage({ params }: { params: { slug: string } }) {
    // In a real app we would await params if needed in updated Next.js, 
    // but for now synchronous access or awaiting it is standard in App Router
    const { slug } = await params;
    const disease = getDisease(slug);

    if (!disease) {
        notFound();
    }

    const relatedDiseases = getRelatedDiseases(disease.relatedSlugs);

    const sections = [
        { id: "overview", label: "Overview", icon: Info },
        { id: "causes", label: "Causes", icon: AlertTriangle },
        { id: "symptoms", label: "Symptoms", icon: Activity },
        { id: "prevention", label: "Prevention", icon: ShieldCheck },
        { id: "doctor", label: "When to See a Doctor", icon: Stethoscope },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <div className="mb-6">
                <Breadcrumb>
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
            </div>

            {/* Header */}
            <div className="mb-8 border-b pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="secondary" className="text-sm px-3 py-1">
                                {disease.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Last updated: Feb 2026</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">{disease.name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hidden sm:flex">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    {disease.shortDescription}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-12">

                    {/* Overview */}
                    <section id="overview" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3 dark:bg-blue-900/30">
                                <Info className="h-6 w-6" />
                            </div>
                            What is {disease.name}?
                        </h2>
                        <Card>
                            <CardContent className="pt-6 text-lg leading-relaxed text-muted-foreground">
                                {disease.overview}
                            </CardContent>
                        </Card>
                    </section>

                    {/* Causes */}
                    <section id="causes" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <div className="p-2 rounded-lg bg-orange-100 text-orange-600 mr-3 dark:bg-orange-900/30">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            Common Causes
                        </h2>
                        <Card>
                            <CardContent className="pt-6">
                                <ul className="list-disc pl-6 space-y-2 text-lg text-muted-foreground">
                                    {disease.causes.map((cause, idx) => (
                                        <li key={idx}>{cause}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Symptoms */}
                    <section id="symptoms" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <div className="p-2 rounded-lg bg-red-100 text-red-600 mr-3 dark:bg-red-900/30">
                                <Activity className="h-6 w-6" />
                            </div>
                            Symptoms
                        </h2>
                        <Card className="border-l-4 border-l-red-500">
                            <CardContent className="pt-6">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {disease.symptoms.map((symptom, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-red-400 flex-shrink-0" />
                                            <span className="text-lg text-muted-foreground">{symptom}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Prevention */}
                    <section id="prevention" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <div className="p-2 rounded-lg bg-green-100 text-green-600 mr-3 dark:bg-green-900/30">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            How to Prevent It
                        </h2>
                        <Card className="bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-900/20">
                            <CardContent className="pt-6">
                                <ul className="space-y-3">
                                    {disease.prevention.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-lg text-foreground/80">
                                            <ShieldCheck className="h-5 w-5 mr-3 text-green-600" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </section>

                    {/* When to See Doctor */}
                    <section id="doctor" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <div className="p-2 rounded-lg bg-purple-100 text-purple-600 mr-3 dark:bg-purple-900/30">
                                <Stethoscope className="h-6 w-6" />
                            </div>
                            When to See a Doctor
                        </h2>
                        <Card>
                            <CardContent className="pt-6 text-lg leading-relaxed text-muted-foreground">
                                {disease.whenToSeeDoctor}
                            </CardContent>
                        </Card>
                    </section>

                    <Separator className="my-8" />

                    {/* Related Diseases */}
                    <section>
                        <h3 className="text-xl font-bold mb-6">Related Conditions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {relatedDiseases.map((related) => (
                                <Link key={related.slug} href={`/diseases/${related.slug}`}>
                                    <Card className="hover:bg-accent/50 transition-colors h-full">
                                        <CardHeader>
                                            <CardTitle className="text-lg">{related.name}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Navigation (Desktop) */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-24 space-y-4">
                        <div className="bg-card border rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold mb-3 px-2">On this page</h3>
                            <nav className="flex flex-col space-y-1">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="flex items-center px-2 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                                    >
                                        <section.icon className="h-4 w-4 mr-2" />
                                        {section.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-base text-primary">Need Professional Help?</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                This information is for educational purposes. If you are experiencing severe symptoms, please contact a medical professional immediately.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
