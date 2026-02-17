"use client";

import Link from "next/link";
import { Heart, User } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
    const { t } = useLanguage();
    
    return (
        <footer className="border-t bg-muted/30">
            <div className="container px-4 py-8 mx-auto md:py-12 sm:px-8 max-w-6xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 justify-items-start md:justify-items-center items-start">
                    {/* Brand Section */}
                    <div className="md:text-left">
                        <Link href="/" className="flex items-center space-x-2 mb-4 h-8">
                            <div className="relative flex items-center">
                                <Heart className="h-6 w-6 text-primary fill-primary" />
                                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full flex items-center justify-center">
                                    <User className="h-1.5 w-1.5 text-white" strokeWidth={3} />
                                </div>
                            </div>
                            <span className="font-bold text-xl">Care Cures</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            {t("footer.description")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:text-left">
                        <h3 className="font-semibold mb-4 text-base h-8 leading-8">{t("footer.quick")}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t("nav.home")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/diseases" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t("nav.diseases")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t("nav.about")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Team Members */}
                    <div className="md:text-left">
                        <h3 className="font-semibold mb-4 text-base h-8 leading-8">{t("footer.team")}</h3>
                        
                        {/* 👇 CHANGE THIS from space-y-3.5 to space-y-2 👇 */}
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Anthony Andrei Joya</li>
                            <li>Ashley Mae Paguio</li>
                            <li>Chesca De Veyra</li>
                            <li>Katrina Fundano</li>
                            <li>Keanna Mie</li>
                            <li>Trixie Carpio</li>
                            <li>Sandy Formanes</li>
                        </ul>
                    </div>
                </div>

                {/* Disclaimer Section */}
<div className="mt-10 border-t pt-8">
                    <div className="rounded-lg bg-red-50 p-6 border border-red-200/50">
                        <h4 className="font-bold text-rose-500 mb-3 text-base">Medical Disclaimer</h4>
                        <p className="text-sm text-rose-400 leading-relaxed">
                            {t("footer.disclaimer")}
                        </p>
                    </div>
                    
                    {/* Copyright */}
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Care Cures. {t("footer.rights")}
                    </div>
                </div>
            </div>
        </footer>
    );
}
