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

        // Trust Section
        "trust.title": "Why Trust Care Cures?",
        "trust.subtitle": "We're committed to providing accurate, reliable health information you can trust",
        "trust.reviewed.title": "Medically Reviewed",
        "trust.reviewed.desc": "All health information is carefully reviewed and verified against trusted medical sources to ensure accuracy and reliability.",
        "trust.accessible.title": "Accessible to All",
        "trust.accessible.desc": "Available in English and Tagalog, making essential health information accessible to diverse communities.",
        "trust.community.title": "Community Focused",
        "trust.community.desc": "Built by a dedicated team committed to empowering communities with knowledge for better health decisions.",
        "trust.stats.conditions": "Health Conditions",
        "trust.stats.languages": "Languages",
        "trust.stats.free": "Free Access",
        "trust.stats.available": "Available",

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
        "diseases.reviewed": "Reviewed",

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
        "category.cardiovascular": "Cardiovascular",
        "category.respiratory": "Respiratory",
        "category.skin": "Skin",
        "category.digestive": "Digestive",
        "category.gastrointestinal": "Gastrointestinal",
        "category.neurological": "Neurological",
        "category.infectious": "Infectious",
        "category.endocrine": "Endocrine",
        "category.autoimmune": "Autoimmune",
        "category.chronic": "Chronic",

        // Footer
        "footer.description": "Empowering you with reliable health information. Understand symptoms, learn about diseases, and take control of your well-being.",
        "footer.quick": "Quick Links",
        "footer.team": "Project Proponents",
        "footer.disclaimer": "MEDICAL DISCLAIMER: This website is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
        "footer.rights": "All rights reserved.",

        // About Page
        "about.title": "About Care Cures",
        "about.subtitle": "Empowering you with the knowledge to understand your health better.",
        "about.mission.title": "Our Mission",
        "about.mission.p1": "Care Cures was created with a simple goal: to make medical information accessible, easy to understand, and less intimidating for everyone. We believe that understanding your health is the first step toward better well-being.",
        "about.mission.p2": "Our platform aggregates simplified medical data about common diseases, symptoms, and preventive measures, creating a bridge between complex medical terminology and everyday language.",
        "about.patients.title": "For Patients",
        "about.patients.desc": "Understand what your symptoms might mean, prepare for doctor visits, and learn how to manage conditions effectively.",
        "about.patients.feature1": "Simplified explanations",
        "about.patients.feature2": "Symptom checklists",
        "about.caregivers.title": "For Caregivers",
        "about.caregivers.desc": "Get the information you need to support your loved ones, understand their medications, and recognize warning signs.",
        "about.caregivers.feature1": "Prevention tips",
        "about.caregivers.feature2": "Emergency guidelines",
        "about.disclaimer.title": "Medical Disclaimer",
        "about.disclaimer.p1": "This website is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.",
        "about.disclaimer.p2": "Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.",
        "about.disclaimer.p3": "If you think you may have a medical emergency, call your doctor or emergency services immediately. Care Cures does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Site.",
        "about.back": "Back to Home",
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

        // Trust Section
        "trust.title": "Bakit Magtiwala sa Care Cures?",
        "trust.subtitle": "Kami ay nakatuon sa pagbibigay ng tumpak at maaasahang impormasyon sa kalusugan na maaari mong pagkatiwalaan",
        "trust.reviewed.title": "Medikal na Nasuri",
        "trust.reviewed.desc": "Ang lahat ng impormasyon sa kalusugan ay maingat na sinusuri at bineripika laban sa pinagkakatiwalaang medikal na pinagmulan upang masiguro ang katumpakan at pagiging maaasahan.",
        "trust.accessible.title": "Accessible sa Lahat",
        "trust.accessible.desc": "Available sa English at Tagalog, ginagawang accessible ang mahalagang impormasyon sa kalusugan sa iba't ibang komunidad.",
        "trust.community.title": "Nakatuon sa Komunidad",
        "trust.community.desc": "Binuo ng isang dedikadong koponan na nakatuon sa pagbibigay-kapangyarihan sa mga komunidad gamit ang kaalaman para sa mas mabuting desisyon sa kalusugan.",
        "trust.stats.conditions": "Kondisyon sa Kalusugan",
        "trust.stats.languages": "Wika",
        "trust.stats.free": "Libreng Access",
        "trust.stats.available": "Available",

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
        "diseases.reviewed": "Sinuri",

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
        "category.cardiovascular": "Cardiovascular",
        "category.respiratory": "Respiratory",
        "category.skin": "Balat",
        "category.digestive": "Digestive",
        "category.gastrointestinal": "Gastrointestinal/Liver",
        "category.neurological": "Neurological",
        "category.infectious": "Nakakahawa",
        "category.endocrine": "Endocrine",
        "category.autoimmune": "Autoimmune",
        "category.chronic": "Pangmatagalan",

        // Footer
        "footer.description": "Binibigyan ka namin ng maaasahang impormasyon sa kalusugan. Unawain ang mga sintomas, matuto tungkol sa mga sakit, at kontrolin ang iyong kalusugan.",
        "footer.quick": "Mabilis na Links",
        "footer.team": "Koponan ng Pag-unlad",
        "footer.disclaimer": "MEDIKAL NA DISCLAIMER: Ang website na ito ay para lamang sa layuning pang-edukasyon at hindi kapalit ng propesyonal na medikal na payo, diagnosis, o paggamot. Palaging humingi ng payo mula sa iyong doktor o iba pang kwalipikadong tagapagbigay ng kalusugan tungkol sa anumang medikal na kondisyon.",
        "footer.rights": "Lahat ng karapatan ay nakalaan.",

        // About Page
        "about.title": "Tungkol sa Care Cures",
        "about.subtitle": "Binibigyan ka namin ng kaalaman upang mas maunawaan ang iyong kalusugan.",
        "about.mission.title": "Ang Aming Misyon",
        "about.mission.p1": "Ang Care Cures ay nilikha na may simpleng layunin: gawing accessible, madaling maintindihan, at hindi nakakakaba ang medikal na impormasyon para sa lahat. Naniniwala kami na ang pag-unawa sa iyong kalusugan ay ang unang hakbang tungo sa mas mabuting kalusugan.",
        "about.mission.p2": "Ang aming platform ay nag-iipon ng pinasimpleng medikal na datos tungkol sa mga karaniwang sakit, sintomas, at mga hakbang sa pag-iwas, na lumilikha ng tulay sa pagitan ng kumplikadong medikal na terminolohiya at pang-araw-araw na wika.",
        "about.patients.title": "Para sa mga Pasyente",
        "about.patients.desc": "Unawain kung ano ang maaaring kahulugan ng iyong mga sintomas, maghanda para sa pagbisita sa doktor, at matuto kung paano epektibong pamahalaan ang mga kondisyon.",
        "about.patients.feature1": "Pinasimpleng paliwanag",
        "about.patients.feature2": "Listahan ng mga sintomas",
        "about.caregivers.title": "Para sa mga Tagapag-alaga",
        "about.caregivers.desc": "Kunin ang impormasyong kailangan mo upang suportahan ang iyong mga mahal sa buhay, unawain ang kanilang mga gamot, at makilala ang mga babala.",
        "about.caregivers.feature1": "Mga tip sa pag-iwas",
        "about.caregivers.feature2": "Mga alituntunin sa emergency",
        "about.disclaimer.title": "Medikal na Disclaimer",
        "about.disclaimer.p1": "Ang website na ito ay para lamang sa layuning pang-edukasyon at hindi kapalit ng propesyonal na medikal na payo, diagnosis, o paggamot.",
        "about.disclaimer.p2": "Palaging humingi ng payo mula sa iyong doktor o iba pang kwalipikadong tagapagbigay ng kalusugan tungkol sa anumang tanong na mayroon ka tungkol sa medikal na kondisyon. Huwag kailanman balewalain ang propesyonal na medikal na payo o magpabaya sa paghahanap nito dahil sa isang bagay na nabasa mo sa website na ito.",
        "about.disclaimer.p3": "Kung sa tingin mo ay mayroon kang medikal na emergency, tumawag sa iyong doktor o emergency services kaagad. Ang Care Cures ay hindi nagrerekomenda o nag-eendorso ng anumang partikular na mga pagsusuri, doktor, produkto, pamamaraan, opinyon, o iba pang impormasyon na maaaring banggitin sa Site.",
        "about.back": "Bumalik sa Home",
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
