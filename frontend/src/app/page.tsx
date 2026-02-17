"use client";

import Link from "next/link";
import { Search, ArrowRight, HeartPulse, Activity, Brain, Wind } from "lucide-react";
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
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Heart": return <HeartPulse className="h-6 w-6 text-red-500" />;
    case "Activity": return <Activity className="h-6 w-6 text-blue-500" />;
    case "Zap": return <Brain className="h-6 w-6 text-yellow-500" />;
    case "Wind": return <Wind className="h-6 w-6 text-gray-500" />;
    default: return <Activity className="h-6 w-6 text-primary" />;
  }
};

export default function Home() {
  const featuredDiseases = MOCK_DISEASES.slice(0, 4);
  const { t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/diseases?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Split Layout */}
      <section className="relative py-20 px-4 md:py-32 overflow-hidden bg-background">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="medical-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* Heartbeat line */}
                <path d="M0,50 L20,50 L25,30 L30,70 L35,50 L100,50" stroke="currentColor" strokeWidth="1" fill="none" />
                {/* Plus signs */}
                <path d="M60,20 L60,30 M55,25 L65,25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M80,70 L80,80 M75,75 L85,75" stroke="currentColor" strokeWidth="1.5" />
                {/* Circles */}
                <circle cx="15" cy="80" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="90" cy="30" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-pattern)" />
          </svg>
        </div>

        {/* Gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-primary">{t("home.badge")}</span>
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-black mb-6 text-foreground leading-[1.05]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t("home.title")}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t("home.subtitle")}</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -rotate-1" />
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("home.description")}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link href="/diseases">
                  <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl">
                    {t("home.browse")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="rounded-full">
                    {t("home.learn")}
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{t("home.conditions")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{t("home.verified")}</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative p-8 rounded-3xl border-2 border-primary/10 bg-card shadow-2xl">
                <div className="absolute -top-3 -right-3 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <h3 className="text-xl font-bold mb-4">{t("home.search.title")}</h3>
                <form onSubmit={handleSearch} className="relative mb-4">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t("home.search.placeholder")}
                    className="w-full pl-12 h-14 text-base border-2 focus-visible:ring-2 focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium mb-2">{t("home.search.popular")}</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/diseases/diabetes-mellitus">
                      <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        Diabetes
                      </Badge>
                    </Link>
                    <Link href="/diseases/hypertension">
                      <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        Hypertension
                      </Badge>
                    </Link>
                    <Link href="/diseases/influenza">
                      <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        Flu
                      </Badge>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Diseases Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block mb-3"
              >
                <span className="text-sm font-bold text-primary uppercase tracking-wider">{t("home.featured")}</span>
              </motion.div>
              <motion.h2
                className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {t("home.common")}
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t("home.essential")}
              </motion.p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex group">
              <Link href="/diseases">
                {t("home.viewall")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDiseases.map((disease, index) => (
              <motion.div
                key={disease.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/diseases/${disease.slug}`} className="block h-full">
                  <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card h-full flex flex-col relative overflow-hidden">
                    {/* Animated background blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                    
                    <CardHeader className="pb-4 relative">
                      <div className="flex items-start justify-between mb-3">
                        <motion.div 
                          className="p-3 rounded-xl bg-primary/10 border border-primary/20"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {getIcon(disease.icon)}
                        </motion.div>
                      </div>
                      <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                        {disease.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4 relative">
                      <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                        {disease.shortDescription}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="pt-0 relative">
                      <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        <span>{t("diseases.learn")}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/diseases">{t("home.viewall")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("home.browse.category")}
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-3 md:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="h-auto py-3 px-6 rounded-full text-base hover:border-primary hover:text-primary hover:bg-primary/5 bg-background shadow-sm hover:shadow-md transition-all font-medium"
                  asChild
                >
                  <Link href={`/diseases?category=${category}`}>
                    {category}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <motion.div
          className="container mx-auto px-4 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.stay.informed")}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t("home.database")}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow" asChild>
              <Link href="/about">
                {t("home.mission")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
