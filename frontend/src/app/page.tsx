import Link from "next/link";
import { Search, ArrowRight, HeartPulse, Activity, Brain, Wind } from "lucide-react"; // Using available icons
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_DISEASES, CATEGORIES } from "@/lib/mock-data";

// Helper to get icon component (in a real app, this would be more dynamic)
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Heart": return <HeartPulse className="h-6 w-6 text-red-500" />;
    case "Activity": return <Activity className="h-6 w-6 text-blue-500" />;
    case "Zap": return <Brain className="h-6 w-6 text-yellow-500" />; // Zap -> Brain for migraine
    case "Wind": return <Wind className="h-6 w-6 text-gray-500" />;
    default: return <Activity className="h-6 w-6 text-primary" />;
  }
};

export default function Home() {
  const featuredDiseases = MOCK_DISEASES.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/50 to-background py-20 px-4 md:py-32">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            Trusted Medical Knowledge
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Understand Your Health <br className="hidden md:block" />
            <span className="text-primary">Learn About Diseases & Symptoms</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Reliable, easy-to-understand information about common health conditions.
            Empowering you to make informed decisions for yourself and your loved ones.
          </p>

          <div className="relative max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for a disease, symptom, or condition..."
                className="w-full pl-12 h-12 text-lg shadow-sm rounded-full border-primary/20 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span>Popular:</span>
            <Link href="/diseases/type-2-diabetes" className="hover:text-primary underline underline-offset-4">Diabetes</Link>
            <Link href="/diseases/hypertension" className="hover:text-primary underline underline-offset-4">Heart Disease</Link>
            <Link href="/diseases/influenza" className="hover:text-primary underline underline-offset-4">Flu</Link>
          </div>
        </div>
      </section>

      {/* Featured Diseases Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Topics</h2>
              <p className="text-muted-foreground">Common health conditions you should know about.</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/diseases" className="group">
                View all diseases
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDiseases.map((disease) => (
              <Card key={disease.slug} className="group hover:shadow-lg transition-shadow border-muted bg-card">
                <CardHeader>
                  <div className="mb-2 p-2 w-fit rounded-lg bg-accent">
                    {getIcon(disease.icon)}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {disease.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {disease.shortDescription}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/diseases/${disease.slug}`}>
                      Learn More
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/diseases">View all diseases</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-auto py-2 px-6 rounded-full text-base hover:border-primary hover:text-primary bg-background shadow-sm hover:shadow-md transition-all"
                asChild
              >
                <Link href={`/diseases?category=${category}`}>
                  {category}
                </Link>
              </Button>
            ))}
            <Button
              variant="outline"
              className="h-auto py-2 px-6 rounded-full text-base hover:border-primary hover:text-primary bg-background shadow-sm border-dashed"
              asChild
            >
              <Link href="/diseases">
                View All Categories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Stay Informed about Your Health</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our comprehensive database is constantly updated to provide you with the most accurate information.
          </p>
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="/about">
              Read Our Mission
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
