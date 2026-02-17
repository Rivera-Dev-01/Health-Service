"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Heart, Languages, User, Home, Activity, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
} from "@/components/ui/sheet";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();

    const NAV_ITEMS = [
        { name: t("nav.home"), href: "/", icon: Home },
        { name: t("nav.diseases"), href: "/diseases", icon: Activity },
        { name: t("nav.about"), href: "/about", icon: Info },
    ];

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "tl" : "en");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-background via-background to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-6 sm:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2.5 group">
                    <div className="relative flex items-center">
                        <Heart className="h-8 w-8 text-primary fill-primary group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                            <User className="h-2 w-2 text-white" strokeWidth={3} />
                        </div>
                    </div>
                    <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                        Care Cures
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                                    pathname === item.href
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Side: Language Toggle & Mobile Menu */}
                <div className="flex items-center space-x-3">
                    {/* Language Toggle - Modern Switch Style */}
                    <button
                        onClick={toggleLanguage}
                        className="hidden md:flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-muted/60 to-muted/40 hover:from-muted hover:to-muted/60 transition-all duration-300 border border-border/50 shadow-sm hover:shadow-md"
                    >
                        <Languages className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">{language === "en" ? "English" : "Tagalog"}</span>
                    </button>

                    {/* Mobile Language Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="md:hidden gap-2 font-semibold hover:bg-muted/80 rounded-full px-3"
                    >
                        <Languages className="h-4 w-4 text-primary" />
                        <span className="text-xs">{language === "en" ? "EN" : "TL"}</span>
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="px-2 text-base hover:bg-muted/80 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden rounded-full"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0 w-[280px]">
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center space-x-2 px-6 py-4 border-b">
                                    <div className="relative flex items-center">
                                        <Heart className="h-6 w-6 text-primary fill-primary" />
                                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                                            <User className="h-1.5 w-1.5 text-white" strokeWidth={3} />
                                        </div>
                                    </div>
                                    <span className="font-bold text-lg">Care Cures</span>
                                </div>
                                
                                {/* Visually hidden title for accessibility */}
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                
                                {/* Navigation Links */}
                                <nav className="flex-1 px-4 py-6">
                                    <div className="flex flex-col space-y-1">
                                        {NAV_ITEMS.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <SheetClose key={item.href} asChild>
                                                    <Link
                                                        href={item.href}
                                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                                            pathname === item.href
                                                                ? "bg-primary/10 text-primary"
                                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                        }`}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                        {item.name}
                                                    </Link>
                                                </SheetClose>
                                            );
                                        })}
                                    </div>
                                </nav>

                                {/* Footer - Language Toggle */}
                                <div className="border-t px-6 py-4">
                                    <button
                                        onClick={toggleLanguage}
                                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Languages className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">
                                                {language === "en" ? "English" : "Tagalog"}
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {language === "en" ? "EN" : "TL"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
