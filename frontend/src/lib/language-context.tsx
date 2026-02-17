"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "tl";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navbar
        "nav.home": "Home",
        "nav.diseases": "Diseases",
        "nav.about": "About",
        "nav.search": "Search...",
        "nav.browse": "Browse Diseases",

        // Homepage
        "home.badge": "Trusted Medical Knowledge",
        "home.title": "Understand Your Health",
        "home.subtitle": "Learn About Diseases & Symptoms",
        "home.description": "Evidence-based information about diseases and symptoms, designed to help you make informed health decisions.",
        "home.browse": "Browse Conditions",
        "home.learn": "Learn More",
        "home.conditions": "20 Conditions",
        "home.verified": "Verified Sources",
        "home.search.title": "Search Health Topics",
        "home.search.placeholder": "e.g., diabetes, headache, fever...",
        "home.search.popular": "POPULAR SEARCHES",
        "home.featured": "FEATURED",
        "home.common": "Common Conditions",
        "home.essential": "Essential health information at your fingertips",
        "home.viewall": "View all",
        "home.browse.category": "Browse by Category",
        "home.stay.informed": "Stay Informed about Your Health",
        "home.database": "Our comprehensive database is constantly updated to provide you with the most accurate information.",
        "home.mission": "Read Our Mission",

        // Diseases page
        "diseases.library": "Medical Library",
        "diseases.title": "Diseases & Conditions",
        "diseases.description": "Browse our comprehensive database of medical conditions with detailed information about symptoms, causes, and treatments.",
        "diseases.search": "Search diseases by name or symptoms...",
        "diseases.filter": "Filter by Category",
        "diseases.all": "All Categories",
        "diseases.found": "conditions found",
        "diseases.clear": "Clear filters",
        "diseases.no.found": "No conditions found",
        "diseases.adjust": "Try adjusting your search or filters",
        "diseases.clear.all": "Clear all filters",
        "diseases.learn": "Learn More",

        // Disease detail
        "disease.reviewed": "Medically Reviewed",
        "disease.share": "Share",
        "disease.what": "What is",
        "disease.causes": "Common Causes",
        "disease.symptoms": "Symptoms to Watch For",
        "disease.prevention": "Prevention Tips",
        "disease.doctor": "When to See a Doctor",
        "disease.related": "Related Conditions",
        "disease.onpage": "On this page",
        "disease.overview": "Overview",
        "disease.disclaimer": "Medical Disclaimer",
        "disease.disclaimer.text": "This information is for educational purposes only. Always consult with a healthcare professional for medical advice.",

        // Categories
        "category.heart": "Heart",
        "category.respiratory": "Respiratory",
        "category.skin": "Skin",
        "category.digestive": "Digestive",
        "category.neurological": "Neurological",
        "category.infectious": "Infectious",
        "category.endocrine": "Endocrine",
        "category.autoimmune": "Autoimmune",

        // Footer
        "footer.description": "Empowering you with reliable health information. Understand symptoms, learn about diseases, and take control of your well-being.",
        "footer.quick": "Quick Links",
        "footer.team": "Project Proponents",
        "footer.disclaimer": "MEDICAL DISCLAIMER: This website is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
        "footer.rights": "All rights reserved.",
    },
    tl: {
        // Navbar
        "nav.home": "Home",
        "nav.diseases": "Mga Sakit",
        "nav.about": "Tungkol",
        "nav.search": "Maghanap...",
        "nav.browse": "Tingnan ang Mga Sakit",

        // Homepage
        "home.badge": "Pinagkakatiwalaang Kaalaman sa Kalusugan",
        "home.title": "Unawain ang Iyong Kalusugan",
        "home.subtitle": "Matuto Tungkol sa Mga Sakit at Sintomas",
        "home.description": "Impormasyon na batay sa ebidensya tungkol sa mga sakit at sintomas, dinisenyo upang tulungan kang gumawa ng matalinong desisyon sa kalusugan.",
        "home.browse": "Tingnan ang Mga Kondisyon",
        "home.learn": "Matuto Pa",
        "home.conditions": "20 Kondisyon",
        "home.verified": "Beripikadong Pinagmulan",
        "home.search.title": "Maghanap ng Paksa sa Kalusugan",
        "home.search.placeholder": "hal., diabetes, sakit ng ulo, lagnat...",
        "home.search.popular": "POPULAR NA PAGHAHANAP",
        "home.featured": "TAMPOK",
        "home.common": "Karaniwang Kondisyon",
        "home.essential": "Mahalagang impormasyon sa kalusugan sa iyong mga daliri",
        "home.viewall": "Tingnan lahat",
        "home.browse.category": "Mag-browse ayon sa Kategorya",
        "home.stay.informed": "Manatiling May Kaalaman sa Iyong Kalusugan",
        "home.database": "Ang aming komprehensibong database ay patuloy na ina-update upang magbigay sa iyo ng pinaka-tumpak na impormasyon.",
        "home.mission": "Basahin ang Aming Misyon",

        // Diseases page
        "diseases.library": "Medikal na Aklatan",
        "diseases.title": "Mga Sakit at Kondisyon",
        "diseases.description": "Mag-browse sa aming komprehensibong database ng mga medikal na kondisyon na may detalyadong impormasyon tungkol sa mga sintomas, sanhi, at paggamot.",
        "diseases.search": "Maghanap ng sakit ayon sa pangalan o sintomas...",
        "diseases.filter": "I-filter ayon sa Kategorya",
        "diseases.all": "Lahat ng Kategorya",
        "diseases.found": "kondisyon na natagpuan",
        "diseases.clear": "I-clear ang mga filter",
        "diseases.no.found": "Walang natagpuang kondisyon",
        "diseases.adjust": "Subukang ayusin ang iyong paghahanap o mga filter",
        "diseases.clear.all": "I-clear ang lahat ng filter",
        "diseases.learn": "Matuto Pa",

        // Disease detail
        "disease.reviewed": "Medikal na Nasuri",
        "disease.share": "Ibahagi",
        "disease.what": "Ano ang",
        "disease.causes": "Karaniwang Sanhi",
        "disease.symptoms": "Mga Sintomas na Dapat Bantayan",
        "disease.prevention": "Mga Tip sa Pag-iwas",
        "disease.doctor": "Kailan Dapat Kumonsulta sa Doktor",
        "disease.related": "Kaugnay na Kondisyon",
        "disease.onpage": "Sa pahinang ito",
        "disease.overview": "Pangkalahatang-ideya",
        "disease.disclaimer": "Medikal na Disclaimer",
        "disease.disclaimer.text": "Ang impormasyong ito ay para lamang sa layuning pang-edukasyon. Palaging kumonsulta sa propesyonal sa kalusugan para sa medikal na payo.",

        // Categories
        "category.heart": "Puso",
        "category.respiratory": "Respiratory",
        "category.skin": "Balat",
        "category.digestive": "Digestive",
        "category.neurological": "Neurological",
        "category.infectious": "Nakakahawa",
        "category.endocrine": "Endocrine",
        "category.autoimmune": "Autoimmune",

        // Footer
        "footer.description": "Binibigyan ka namin ng maaasahang impormasyon sa kalusugan. Unawain ang mga sintomas, matuto tungkol sa mga sakit, at kontrolin ang iyong kalusugan.",
        "footer.quick": "Mabilis na Links",
        "footer.team": "Koponan ng Pag-unlad",
        "footer.disclaimer": "MEDIKAL NA DISCLAIMER: Ang website na ito ay para lamang sa layuning pang-edukasyon at hindi kapalit ng propesyonal na medikal na payo, diagnosis, o paggamot. Palaging humingi ng payo mula sa iyong doktor o iba pang kwalipikadong tagapagbigay ng kalusugan tungkol sa anumang medikal na kondisyon.",
        "footer.rights": "Lahat ng karapatan ay nakalaan.",
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        const saved = localStorage.getItem("language") as Language;
        if (saved && (saved === "en" || saved === "tl")) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
