import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container px-4 py-8 mx-auto md:py-12 sm:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <HeartPulse className="h-6 w-6 text-primary" />
                            <span className="font-bold text-xl">MediSearch</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                            Empowering you with reliable health information. Understand symptoms, learn about diseases, and take control of your well-being.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/diseases" className="text-muted-foreground hover:text-primary transition-colors">
                                    Diseases A-Z
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t pt-8">
                    <div className="rounded-lg bg-red-50 p-4 border border-red-100 dark:bg-red-900/10 dark:border-red-900/20">
                        <p className="text-sm text-red-800 dark:text-red-200 font-medium text-center">
                            MEDICAL DISCLAIMER: This website is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                        </p>
                    </div>
                    <div className="mt-8 text-center text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} MediSearch. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
