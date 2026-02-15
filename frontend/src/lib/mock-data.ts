export type Disease = {
    slug: string;
    name: string;
    category: string;
    shortDescription: string;
    description: string;
    icon: string; // Using simplistic string for now, could become a component ref
    overview: string;
    causes: string[];
    symptoms: string[];
    prevention: string[];
    whenToSeeDoctor: string;
    relatedSlugs: string[];
};

export const CATEGORIES = [
    "Heart",
    "Respiratory",
    "Skin",
    "Digestive",
    "Neurological",
    "Infectious",
    "Endocrine",
    "Autoimmune",
];

export const MOCK_DISEASES: Disease[] = [
    {
        slug: "coronary-artery-disease",
        name: "Coronary Artery Disease",
        category: "Heart",
        shortDescription: "A common heart condition involving reduced blood flow to the heart muscle.",
        description: "CAD happens when the arteries that supply blood to heart muscle become hardened and narrowed.",
        icon: "Heart",
        overview: "Coronary artery disease (CAD) creates narrow arteries, limiting blood flow to the heart. It is the most common type of heart disease. It happens when plaque builds up in the wall of the arteries that supply blood to the heart (coronary arteries). Plaque is made up of cholesterol deposits. Plaque buildup causes the inside of the arteries to narrow over time. This process is called atherosclerosis.",
        causes: [
            "High cholesterol levels",
            "High blood pressure",
            "Smoking",
            "Diabetes or insulin resistance",
            "Sedentary lifestyle"
        ],
        symptoms: [
            "Chest pain (angina)",
            "Shortness of breath",
            "Pain in the arm or shoulder",
            "Nausea or lightheadedness"
        ],
        prevention: [
            "Quit smoking",
            "Control blood pressure and cholesterol",
            "Stay physically active",
            "Eat a low-fat, low-salt diet",
            "Manage stress"
        ],
        whenToSeeDoctor: "Seek emergency care immediately if you have crushing chest pain, shortness of breath, or fainting. See a doctor if you have new or changing chest pain (angina).",
        relatedSlugs: ["hypertension", "type-2-diabetes"]
    },
    {
        slug: "influenza",
        name: "Influenza (Flu)",
        category: "Infectious",
        shortDescription: "A viral infection that attacks your respiratory system.",
        description: "The flu is a contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs.",
        icon: "Activity",
        overview: "Influenza (flu) is a viral infection that attacks your respiratory system — your nose, throat and lungs. Influenza is commonly called the flu, but it's not the same as stomach 'flu' viruses that cause diarrhea and vomiting. For most people, the flu resolves on its own. But sometimes, influenza and its complications can be deadly.",
        causes: [
            "Influenza viruses (Types A, B, and C)",
            "Transmitted via droplets when people cough, sneeze or talk",
            "Touching contaminated surfaces"
        ],
        symptoms: [
            "Fever over 100.4 F (38 C)",
            "Aching muscles",
            "Chills and sweats",
            "Headache",
            "Dry, persistent cough",
            "Fatigue and weakness",
            "Nasal congestion"
        ],
        prevention: [
            "Get an annual flu vaccination",
            "Wash hands frequently",
            "Avoid close contact with sick people",
            "Cover mouth and nose when sneezing",
            "Clean and disinfect surfaces"
        ],
        whenToSeeDoctor: "See a doctor if you are at risk of complications (elderly, young children, pregnant women). Emergency signs: difficulty breathing, persistent chest pain, seizures, or severe muscle pain.",
        relatedSlugs: ["common-cold", "pneumonia"]
    },
    {
        slug: "type-2-diabetes",
        name: "Type 2 Diabetes",
        category: "Endocrine",
        shortDescription: "A chronic condition that affects the way your body processes blood sugar (glucose).",
        description: "With type 2 diabetes, your body either doesn't produce enough insulin, or it resists insulin.",
        icon: "Activity",
        overview: "Type 2 diabetes is a chronic condition that affects the way your body processes blood sugar (glucose). With type 2 diabetes, your body either doesn't produce enough insulin, or it resists insulin. Symptoms often develop slowly. In fact, you can have type 2 diabetes for years and not know it.",
        causes: [
            "Insulin resistance",
            "Genetic factors",
            "Being overweight or obese",
            "Inactivity",
            "Age (risk increases as you get older)"
        ],
        symptoms: [
            "Increased thirst",
            "Frequent urination",
            "Increased hunger",
            "Unintended weight loss",
            "Fatigue",
            "Blurred vision",
            "Slow-healing sores"
        ],
        prevention: [
            "Choose healthy foods (lower fat and calories)",
            "Get physically active (at least 30 mins a day)",
            "Lose excess pounds",
            "Avoid long periods of inactivity"
        ],
        whenToSeeDoctor: "See a doctor if you notice any possible diabetes symptoms. Early diagnosis prevents complications.",
        relatedSlugs: ["coronary-artery-disease", "hypertension"]
    },
    {
        slug: "migraine",
        name: "Migraine",
        category: "Neurological",
        shortDescription: "A headache that can cause severe throbbing pain or a pulsing sensation.",
        description: "Migraine is a headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head.",
        icon: "Zap",
        overview: "A migraine is a headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound. Migraine attacks can last for hours to days, and the pain can be so severe that it interferes with your daily activities.",
        causes: [
            "Hormonal changes in women",
            "Stress",
            "Sensory stimuli (bright lights, loud sounds)",
            "Sleep changes",
            "Physical factors",
            "Weather changes",
            "Certain foods and additives"
        ],
        symptoms: [
            "Pain usually on one side of your head",
            "Throbbing or pulsing pain",
            "Sensitivity to light, sound, and sometimes smell",
            "Nausea and vomiting",
            "Visual disturbances (aura)"
        ],
        prevention: [
            "Identify and avoid triggers",
            "Establish a regular sleep schedule",
            "Eat regular meals",
            "Manage stress",
            "Stay hydrated"
        ],
        whenToSeeDoctor: "See a doctor if you have frequent headaches or if your headaches affect your daily life. Seek immediate care for: abrupt severe headache, headache with fever/stiff neck, or headache after head injury.",
        relatedSlugs: ["tension-headache"]
    },
    {
        slug: "eczema",
        name: "Eczema (Atopic Dermatitis)",
        category: "Skin",
        shortDescription: "A condition that makes your skin red and itchy.",
        description: "Eczema is common in children but can occur at any age. It is long lasting (chronic) and tends to flare periodically.",
        icon: "Sun", // Placeholder for skin
        overview: "Atopic dermatitis (eczema) is a condition that makes your skin red and itchy. It's common in children but can occur at any age. Atopic dermatitis is long lasting (chronic) and tends to flare periodically. It may be accompanied by asthma or hay fever.",
        causes: [
            "Gene variation affecting skin barrier function",
            "Immune system dysfunction",
            "Environmental triggers (soaps, detergents)",
            "Stress",
            "Food allergies (in some children)"
        ],
        symptoms: [
            "Dry skin",
            "Itching, which may be severe, especially at night",
            "Red to brownish-gray patches",
            "Small, raised bumps which may leak fluid",
            "Thickened, cracked, scaly skin"
        ],
        prevention: [
            "Moisturize skin at least twice a day",
            "Identify and avoid triggers",
            "Take shorter baths or showers",
            "Use only gentle soaps",
            "Dry yourself carefully"
        ],
        whenToSeeDoctor: "See a doctor if the condition is so uncomfortable it affects sleep, or if you have a skin infection (red streaks, pus, yellow scabs).",
        relatedSlugs: ["asthma", "hay-fever"]
    },
    {
        slug: "gastroesophageal-reflux-disease",
        name: "GERD (Acid Reflux)",
        category: "Digestive",
        shortDescription: "A digestive disease in which stomach acid or bile irritates the food pipe lining.",
        description: "GERD occurs when stomach acid frequently flows back into the tube connecting your mouth and stomach (esophagus).",
        icon: "Activity",
        overview: "Gastroesophageal reflux disease (GERD) happens when stomach acid frequently flows back into the tube connecting your mouth and stomach (esophagus). This backwash (acid reflux) can irritate the lining of your esophagus. Many people experience acid reflux from time to time. GERD is mild acid reflux that occurs at least twice a week, or moderate to severe acid reflux that occurs at least once a week.",
        causes: [
            "Frequent acid reflux",
            "Weak lower esophageal sphincter",
            "Obesity",
            "Bulging of the top of the stomach up into the diaphragm (hiatal hernia)",
            "Pregnancy",
            "Delayed stomach emptying"
        ],
        symptoms: [
            "Burning sensation in your chest (heartburn)",
            "Chest pain",
            "Difficulty swallowing",
            "Regurgitation of food or sour liquid",
            "Sensation of a lump in your throat"
        ],
        prevention: [
            "Maintain a healthy weight",
            "Avoid tight-fitting clothing",
            "Avoid foods and drinks that trigger heartburn",
            "Eat smaller meals",
            "Don't lie down after a meal",
            "Elevate the head of your bed"
        ],
        whenToSeeDoctor: "Seek medical help if you have chest pain, shortness of breath, or jaw/arm pain. See a doctor if you take over-the-counter heartburn medications more than twice a week.",
        relatedSlugs: ["gastritis", "peptic-ulcer"]
    },
    {
        slug: "hypertension",
        name: "Hypertension (High Blood Pressure)",
        category: "Heart",
        shortDescription: "A condition in which the force of the blood against the artery walls is too high.",
        description: "High blood pressure is a common condition where the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems.",
        icon: "Activity",
        overview: "High blood pressure (hypertension) is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease. Blood pressure is determined both by the amount of blood your heart pumps and the amount of resistance to blood flow in your arteries. You can have high blood pressure for years without any symptoms.",
        causes: [
            "Age",
            "Race (more common among African heritage)",
            "Family history",
            "Being overweight or obese",
            "Not being physically active",
            "Using tobacco",
            "Too much salt (sodium) in your diet",
            "Too little potassium in your diet",
            "Drinking too much alcohol",
            "Stress"
        ],
        symptoms: [
            "Most people have no signs or symptoms",
            "Headaches (in severe cases)",
            "Shortness of breath (in severe cases)",
            "Nosebleeds (in severe cases)"
        ],
        prevention: [
            "Eat a healthy diet",
            "Decrease the salt in your diet",
            "Maintain a healthy weight",
            "Increase physical activity",
            "Limit alcohol",
            "Don't smoke"
        ],
        whenToSeeDoctor: "Ask your doctor for a blood pressure reading at least every two years starting at age 18. If you're age 40 or older, or you're 18 to 39 with a high risk of high blood pressure, ask for a blood pressure reading every year.",
        relatedSlugs: ["coronary-artery-disease", "kidney-disease"]
    },
    {
        slug: "asthma",
        name: "Asthma",
        category: "Respiratory",
        shortDescription: "A condition in which your airways narrow and swell and may produce extra mucus.",
        description: "Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult.",
        icon: "Wind",
        overview: "Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out and shortness of breath. For some people, asthma is a minor nuisance. For others, it can be a major problem that interferes with daily activities and may lead to a life-threatening asthma attack.",
        causes: [
            "Combination of environmental and genetic factors",
            "Exposure to various substances that trigger allergies (allergens)",
            "Respiratory infections",
            "Physical activity",
            "Cold air",
            "Air pollutants and irritants"
        ],
        symptoms: [
            "Shortness of breath",
            "Chest tightness or pain",
            "Wheezing when exhaling",
            "Trouble sleeping caused by shortness of breath, coughing or wheezing",
            "Coughing or wheezing attacks that are worsened by a respiratory virus"
        ],
        prevention: [
            "Identify and avoid asthma triggers",
            "Get vaccinated for influenza and pneumonia",
            "Identify and treat attacks early",
            "Take your medication as prescribed",
            "Pay attention to increasing quick-relief inhaler use"
        ],
        whenToSeeDoctor: "See a doctor if you think you have asthma or if your asthma symptoms get worse. Seek emergency treatment for: rapid worsening of shortness of breath or wheezing, no improvement after using a quick-relief inhaler, or shortness of breath when doing minimal physical activity.",
        relatedSlugs: ["eczema", "allergies"]
    }
];
