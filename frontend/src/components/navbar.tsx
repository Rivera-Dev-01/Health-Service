"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, HeartPulse, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const { language, setLanguage, t } = useLanguage();

    const NAV_ITEMS = [
        { name: t("nav.home"), href: "/" },
        { name: t("nav.diseases"), href: "/diseases" },
        { name: t("nav.about"), href: "/about" },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/diseases?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "tl" : "en");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
                {/* Logo */}
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <HeartPulse className="h-6 w-6 text-primary" />
                        <span className="hidden font-bold sm:inline-block text-xl text-foreground">
                            Care Cures
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Side: Language Toggle, Search & Mobile Menu */}
                <div className="flex items-center space-x-2">
                    {/* Language Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="gap-2 font-medium"
                    >
                        <Languages className="h-4 w-4" />
                        <span className="hidden sm:inline">{language === "en" ? "EN" : "TL"}</span>
                    </Button>

                    {/* Desktop Search */}
                    <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-sm items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={t("nav.search")}
                                className="w-64 pl-8 rounded-full bg-muted/50 border-transparent focus:bg-background focus:border-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </form>

                    {/* Mobile Search Icon (optional, if main search hidden) */}
                    <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <div className="flex flex-col space-y-4 py-4">
                                <Link href="/" className="flex items-center space-x-2 px-2" onClick={() => { }}>
                                    <HeartPulse className="h-6 w-6 text-primary" />
                                    <span className="font-bold">Care Cures</span>
                                </Link>
                                <div className="flex flex-col space-y-3">
                                    {NAV_ITEMS.map((item) => (
                                        <SheetClose key={item.href} asChild>
                                            <Link
                                                href={item.href}
                                                className={`block px-2 py-1 text-lg ${pathname === item.href
                                                    ? "font-medium text-primary"
                                                    : "text-muted-foreground"
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
