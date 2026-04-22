const HEALTH_DB = {
    metabolic: { title: "Metabolic & Glucose Recovery", guide: "Metabolic restoration requires consistent glycemic buffering. Avoid heavy carbohydrates after 6pm and ensure high hydration." },
    cardio: { title: "Cardiovascular & Circulatory System", guide: "Cardiovascular health is tied to blood viscosity. The protocol focuses on widening coronary arteries and stabilizing rhythm." },
    immune: { title: "Immune System & Cellular Shield", guide: "Immune modulation requires high-polysaccharide extracts. Trigger macrophage activity for robust defense." },
    repro: { title: "Reproductive & Hormonal Health", guide: "Hormonal balance is restored by purifying the tract and warming the kidneys. 60-90 day cycles recommended." },
    digestive: { title: "Digestive & Gastrointestinal Balance", guide: "Digestive recovery starts with the stomach mucosa. Provide a herbal shield for gastric repair." },
    musculo: { title: "Musculoskeletal & Joint Support", guide: "Joint health requires synovial fluid regeneration. Focus on anti-inflammatory relief and mineral support." },
    neurological: { title: "Nervous & Brain Function", guide: "Brain health is sustained by cerebral oxygenation. Improve synaptic connectivity and calm the nervous system." },
    respiratory: { title: "Respiratory & Lung Health", guide: "Focus on lung capacity and oxygen absorption. Clear bronchial pathways of toxins and inflammation." },
    renal: { title: "Renal & Kidney Function", guide: "Kidney health is restored by tonifying vital energy.Premier protocol for urinary and back strength." },
    dermal: { title: "Dermal & Skin Recovery", guide: "Skin health reflects internal purity. Purify the blood and treat externally with medicated extracts." },
    vision: { title: "Vision & Ocular Health", guide: "Ocular health requires specific carotenoids and blue light protection. Improve micro-circulation to the retina." },
    fitness: { title: "Physical Fitness & Stamina", guide: "Optimize physical endurance through cellular energy (ATP) production and rapid muscle recovery." },
    liver: { title: "Liver & Detoxification Protocol", guide: "Liver recovery focuses on enzyme production and toxin filtering. Essential for metabolic and skin health." },
    fertility: { title: "Fertility & Reproductive Vitality", guide: "Holistic reproductive support for both male and female vitality. Focuses on hormonal balance and internal tract purification." },
    cold: { title: "Cold, Flu & Respiratory Recovery", guide: "Recovery requires warming the lungs and clearing viral toxins. Focus on high-polysaccharide immune support and rest." },
    headache: { title: "Neurological & Migraine Relief", guide: "Headache patterns often relate to cerebral oxygenation. Stabilize neural firing and manage stress triggers." },
    muscle: { title: "Muscle Recovery & Vitality", guide: "Restoring muscle strength requires mineral rebalancing and anti-inflammatory relief. Focus on ATP production." },
    appetite: { title: "Digestive & Appetite Restoration", guide: "Restore gut flora and stomach mucosa. Proper enzyme production is key to regaining a healthy appetite." },
    dental: { title: "Oral & Dental Integrity", guide: "Oral health reflects internal alkalinity. Neutralize bacteria and support gum tissue regeneration." },
    thyroid: { title: "Endocrine & Thyroid Balance", guide: "Thyroid function depends on hormonal stabilization and vital energy tonification. Avoid processed salts." },
    emotional: { title: "Emotional & Anxiety Management", guide: "Calming the nervous system is priority. Focus on neurotransmitter support and adaptogenic herbs." },
    infection: { title: "Anti-Viral & Infection Shield", guide: "A broad-spectrum immune response is needed. Purify the blood and trigger natural T-cell activity." },
    sugar: { title: "Metabolic & Sugar Craving Control", guide: "Sugar cravings indicate glycemic instability. Buffer blood sugar levels and improve insulin sensitivity." },
    women: { title: "Women's Wellness & Hormonal Flow", guide: "Support the reproductive system through regular purification and hormonal modulation." },
    sleep: { title: "Sleep Architecture & Insomnia Relief", guide: "Restore the circadian rhythm by calming the brain and relaxing skeletal muscles before rest." },
    anemia: { title: "Blood Health & Hematopoietic Support", guide: "Stimulate blood production and improve iron absorption. Essential for energy and oxygen transport." },
    prostate: { title: "Prostate & Urinary Health (Men)", guide: "Focus on reducing inflammation and improving urine flow. Vital for long-term male vitality." },
    bone: { title: "Bone Density & Skeletal Strength", guide: "Skeletal health requires calcium-mineral synergy and collagen support. Essential for mobility." },
    hormonal: { title: "Hormonal Balance & Endocrine Flow", guide: "Stabilize the entire endocrine system. Focus on adaptogens that modulate hormonal output naturally." }
};

const SYMPTOM_DB = {
    "ulcer": "gastrifort", "gastritis": "gastrifort", "reflux": "gastrifort", "constipation": "constilease", "pile": "constilease", "sugar": "diawell", "diabet": "diawell", "weight": "magilim", "cholesterol": "magilim", "pressure": "reishi", "bp": "reishi", "vision": "eye-beta", "eyes": "eye-beta", "period": "gynapharm", "menses": "gynapharm", "pid": "gynapharm", "infection": "reishi", "immune": "golden-hypha", "fibroid": "golden-hypha", "prostate": "lycovite", "stamina": "revive", "erection": "revive", "energy": "cordy-active", "fatigue": "cordy-active", "asthma": "cordy-active", "arthritis": "jointeez", "joint": "jointeez", "heart": "ultramega", "bone": "calmazine", "blood": "haemocare", "anemia": "haemocare", "skin": "grapemin-e", "acne": "kedi-soaps", "liver": "lirich", "jaundice": "lirich", "malaria": "qinghao", "fever": "qinghao", "headache": "memorease", "memory": "cordy-royal-jelly", "brain": "cordy-royal-jelly", "sperm": "vigor-essential", "relaxation": "vip-massage-chair", "detox": "detox-patch"
};

const DOSAGE_GUIDE = {
    "reishi": "3 capsules twice daily.", "gastrifort": "3 capsules twice daily after meals.", "diawell": "3 capsules twice daily before meals.", "magilim": "3 capsules three times daily.", "gynapharm": "4 capsules three times daily.", "golden-hypha": "4 capsules twice daily.", "lycovite": "2 capsules twice daily.", "jointeez": "4 capsules twice daily.", "constilease": "2 capsules twice daily.", "revive": "1 capsule daily.", "cordy-active": "4 capsules twice daily.", "ultramega": "1 softgel daily.", "calmazine": "1 tablet daily.", "haemocare": "2 capsules twice daily.", "memorease": "2 capsules twice daily.", "cordy-royal-jelly": "3 capsules twice daily.", "vigor-essential": "2 capsules twice daily.", "golden-six": "1 pill twice daily.", "refresh-tea": "1 tea bag daily.", "colon-tea-cleanser": "1 tea bag at night.", "lirich": "2 capsules twice daily."
};

const CORE_PROTOCOLS = {
    metabolic: ["diawell", "lirich", "magilim", "reishi"],
    cardio: ["reishi", "cadibetter", "ultramega", "cordy-active"],
    immune: ["golden-hypha", "reishi", "cordy-active", "v-ca"],
    repro: ["gynapharm", "golden-hypha", "eve-comfort", "reishi"],
    digestive: ["gastrifort", "constilease", "colon-tea-cleanser", "reishi"],
    musculo: ["jointeez", "calmazine", "reishi", "ultramega"],
    neurological: ["memorease", "cordy-royal-jelly", "reishi", "ginseng-coffee"],
    respiratory: ["cordy-active", "refresh-tea", "reishi", "v-ca"],
    renal: ["golden-six", "lycovite", "reishi", "cordy-active"],
    liver: ["lirich", "reishi", "colon-tea-cleanser", "refresh-tea"],
    fertility: ["vigor-essential", "revive", "reishi", "cordy-royal-jelly"],
    weight: ["magilim", "diawell", "reishi", "colon-tea-cleanser"],
    ulcer: ["gastrifort", "reishi", "colon-tea-cleanser", "v-ca"],
    ed: ["revive", "vigor-essential", "reishi", "cordy-royal-jelly"],
    stress: ["memorease", "reishi", "cordy-royal-jelly", "ginseng-coffee"],
    dermal: ["kedi-soaps", "grapemin-e", "reishi", "v-ca"],
    cold: ["cordy-active", "reishi", "v-ca", "refresh-tea"],
    headache: ["memorease", "reishi", "cordy-royal-jelly", "ginseng-coffee"],
    muscle: ["jointeez", "calmazine", "reishi", "ultramega"],
    appetite: ["gastrifort", "lirich", "reishi", "colon-tea-cleanser"],
    dental: ["gumcare", "reishi", "v-ca", "ultramega"],
    thyroid: ["golden-six", "reishi", "cordy-active", "lycovite"],
    fitness: ["cordy-active", "revive", "reishi", "v-ca"],
    emotional: ["memorease", "reishi", "cordy-royal-jelly", "ginseng-coffee"],
    infection: ["golden-hypha", "reishi", "cordy-active", "v-ca"],
    sugar: ["diawell", "magilim", "lirich", "reishi"],
    women: ["gynapharm", "golden-six", "eve-comfort", "reishi"],
    sleep: ["calmazine", "reishi", "cordy-royal-jelly", "refresh-tea"],
    anemia: ["haemocare", "reishi", "v-ca", "cordy-active"],
    prostate: ["lycovite", "reishi", "vigor-essential", "cordy-active"],
    bone: ["calmazine", "jointeez", "reishi", "ultramega"],
    hormonal: ["eve-comfort", "golden-six", "reishi", "gynapharm"]
};

const QUIZ_DATA = {
    metabolic: {
        intro: "Let me ask you a few quick questions to understand your risk for diabetes.",
        questions: [
            { q: "How often do you feel unusually thirsty or notice frequent urination?", o: ["Never", "Sometimes", "Often", "Very often"] },
            { q: "Do you often feel tired even after resting?", o: ["No", "Occasionally", "Frequently", "Always"] },
            { q: "How would you describe your sugar intake?", o: ["Very low", "Moderate", "High", "Very high"] },
            { q: "Do you engage in regular physical activity?", o: ["Daily", "A few times a week", "Rarely", "Never"] },
            { q: "Has anyone in your family been diagnosed with diabetes?", o: ["No", "Not sure", "Yes", "Multiple members"] },
            { q: "Have you noticed slow healing of wounds?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you experience blurred vision at times?", o: ["Never", "Occasionally", "Frequently", "Very often"] },
            { q: "How often do you check your blood sugar level?", o: ["Regularly", "Occasionally", "Rarely", "Never"] },
            { q: "Do you maintain a balanced diet?", o: ["Always", "Sometimes", "Rarely", "Never"] },
            { q: "Would you be open to lifestyle changes to improve your health?", o: ["Yes, absolutely", "Maybe", "Not really", "No"] }
        ]
    },
    cardio: {
        intro: "Let’s quickly assess your blood pressure and heart risk.",
        questions: [
            { q: "Do you often experience headaches or dizziness?", o: ["Never", "Sometimes", "Often", "Very often"] },
            { q: "How often do you consume salty foods?", o: ["Rarely", "Occasionally", "Frequently", "Daily"] },
            { q: "Do you feel stressed most of the time?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you check your blood pressure regularly?", o: ["Yes", "Occasionally", "Rarely", "Never"] },
            { q: "Do you smoke or consume alcohol frequently?", o: ["No", "Occasionally", "Frequently", "Daily"] },
            { q: "How active is your lifestyle?", o: ["Very active", "Moderately active", "Slightly active", "Not active"] },
            { q: "Do you have a family history of hypertension?", o: ["No", "Not sure", "Yes", "Multiple cases"] },
            { q: "Do you feel chest discomfort or irregular heartbeat?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "How would you describe your diet?", o: ["Healthy", "Average", "Unhealthy", "Very unhealthy"] },
            { q: "Are you willing to reduce salt and improve lifestyle?", o: ["Yes", "Maybe", "Not really", "No"] }
        ]
    },
    musculo: {
        intro: "I’d like to check your joint health and skeletal integrity.",
        questions: [
            { q: "Do you experience joint pain?", o: ["Never", "Occasionally", "Frequently", "Constantly"] },
            { q: "Do your joints feel stiff, especially in the morning?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you find it difficult to move or bend joints?", o: ["No", "Slightly", "Moderately", "Severely"] },
            { q: "How active are you physically?", o: ["Very active", "Active", "Slightly active", "Not active"] },
            { q: "Do you maintain a healthy weight?", o: ["Yes", "Slightly overweight", "Overweight", "Obese"] },
            { q: "Do you hear cracking sounds in your joints?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Does weather affect your joint pain?", o: ["No", "Slightly", "Yes", "Strongly"] },
            { q: "Do you consume anti-inflammatory foods (fruits, vegetables)?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Have you had joint injuries before?", o: ["No", "Minor", "Yes", "Multiple"] },
            { q: "Would you consider lifestyle changes to protect your joints?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    weight: {
        intro: "Let’s evaluate your weight and metabolic lifestyle habits.",
        questions: [
            { q: "How often do you eat high-calorie foods?", o: ["Rarely", "Sometimes", "Often", "Very often"] },
            { q: "Do you exercise regularly?", o: ["Daily", "Few times a week", "Rarely", "Never"] },
            { q: "Do you eat late at night?", o: ["Never", "Occasionally", "Often", "Always"] },
            { q: "How would you describe your portion sizes?", o: ["Small", "Moderate", "Large", "Very large"] },
            { q: "Do you drink sugary beverages?", o: ["Never", "Occasionally", "Frequently", "Daily"] },
            { q: "How active is your daily routine?", o: ["Very active", "Active", "Slightly active", "Sedentary"] },
            { q: "Do you feel tired after little activity?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Have you tried losing weight before?", o: ["Yes, successfully", "Yes, partially", "Tried but failed", "Never tried"] },
            { q: "Do you track your diet or calories?", o: ["Always", "Sometimes", "Rarely", "Never"] },
            { q: "Are you ready to adopt a healthier lifestyle?", o: ["Yes", "Maybe", "Not sure", "No"] }
        ]
    },
    ulcer: {
        intro: "I’d like to check if your symptoms may be related to stomach ulcers.",
        questions: [
            { q: "Do you feel a burning pain in your stomach?", o: ["Never", "Occasionally", "Often", "Very often"] },
            { q: "Does the pain get worse when your stomach is empty?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you frequently take painkillers (like NSAIDs)?", o: ["No", "Occasionally", "Often", "Very often"] },
            { q: "Do you experience bloating or burping?", o: ["Never", "Occasionally", "Frequently", "Always"] },
            { q: "Do you consume spicy or acidic foods often?", o: ["Rarely", "Sometimes", "Often", "Daily"] },
            { q: "Have you experienced nausea or vomiting?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you smoke or drink alcohol?", o: ["No", "Occasionally", "Frequently", "Daily"] },
            { q: "Have you noticed weight loss without trying?", o: ["No", "Slightly", "Yes", "Significant"] },
            { q: "Do you feel discomfort after eating?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Would you be willing to adjust your diet for better stomach health?", o: ["Yes", "Maybe", "Not really", "No"] }
        ]
    },
    ed: {
        intro: "Let’s assess your sexual health and possible underlying factors.",
        questions: [
            { q: "Do you have difficulty achieving or maintaining an erection?", o: ["Never", "Occasionally", "Frequently", "Always"] },
            { q: "Do you experience reduced sexual desire?", o: ["No", "Slightly", "Yes", "Strongly reduced"] },
            { q: "Do you feel stressed or anxious often?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you smoke or consume alcohol regularly?", o: ["No", "Occasionally", "Frequently", "Daily"] },
            { q: "Do you have any chronic health conditions (e.g., diabetes)?", o: ["No", "Not sure", "Yes", "Multiple conditions"] },
            { q: "How active is your lifestyle?", o: ["Very active", "Active", "Slightly active", "Sedentary"] },
            { q: "Do you experience fatigue frequently?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you get enough sleep?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Have you noticed reduced performance over time?", o: ["No", "Slightly", "Yes", "Significant decline"] },
            { q: "Are you open to improving your lifestyle and seeking help?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    immune: {
        intro: "Let’s evaluate your immune system strength.",
        questions: [
            { q: "How often do you fall sick?", o: ["Rarely", "Occasionally", "Frequently", "Very often"] },
            { q: "Do you feel tired most of the time?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you get enough sleep?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "How is your diet?", o: ["Very healthy", "Balanced", "Poor", "Very poor"] },
            { q: "Do you consume fruits and vegetables daily?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you experience slow recovery from illness?", o: ["No", "Slightly", "Yes", "Very slow"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Are you often stressed?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you take supplements?", o: ["Regularly", "Occasionally", "Rarely", "Never"] },
            { q: "Are you willing to improve your immunity naturally?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    fertility: {
        intro: "Let’s assess factors that may affect reproductive fertility.",
        questions: [
            { q: "How long have you been trying to conceive?", o: ["Not trying", "Less than 6 months", "6–12 months", "Over 1 year"] },
            { q: "Do you have irregular cycles (for women)?", o: ["No", "Slightly", "Yes", "Very irregular"] },
            { q: "Do you experience high stress levels?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you smoke or drink alcohol?", o: ["No", "Occasionally", "Frequently", "Daily"] },
            { q: "Do you maintain a healthy weight?", o: ["Yes", "Slightly off", "Over/underweight", "Obese/underweight"] },
            { q: "Do you have any known medical conditions?", o: ["No", "Not sure", "Yes", "Multiple"] },
            { q: "How active is your lifestyle?", o: ["Very active", "Active", "Low activity", "Sedentary"] },
            { q: "Do you eat a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Have you had previous reproductive issues?", o: ["No", "Minor", "Yes", "Multiple issues"] },
            { q: "Are you willing to seek medical guidance?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    neurological: {
        intro: "Let’s check your memory and cognitive health.",
        questions: [
            { q: "Do you forget things easily?", o: ["Never", "Occasionally", "Frequently", "Very often"] },
            { q: "Do you have difficulty concentrating?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel mentally fatigued?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "How well do you sleep?", o: ["Very well", "Okay", "Poorly", "Very poorly"] },
            { q: "Do you engage in mentally stimulating activities?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Do you experience frequent headaches?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel stressed often?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Are you open to improving your brain health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    respiratory: {
        intro: "I want to understand your lung and breathing health.",
        questions: [
            { q: "Do you experience shortness of breath?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have persistent cough?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you smoke or are exposed to smoke?", o: ["No", "Occasionally", "Frequently", "Daily"] },
            { q: "Do you feel chest tightness?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you get tired quickly during physical activity?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you live in a polluted environment?", o: ["No", "Slightly", "Yes", "Highly polluted"] },
            { q: "Do you experience wheezing?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have allergies?", o: ["No", "Mild", "Moderate", "Severe"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Are you willing to improve your respiratory health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    dermal: {
        intro: "Let’s evaluate your skin condition and possible concerns.",
        questions: [
            { q: "Do you experience frequent skin breakouts?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have dry or irritated skin?", o: ["No", "Occasionally", "Frequently", "Always"] },
            { q: "Do you expose your skin to harsh sunlight often?", o: ["No", "Sometimes", "Often", "Daily"] },
            { q: "Do you drink enough water?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you use skincare products regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you experience itching or rashes?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have uneven skin tone or dark spots?", o: ["No", "Slightly", "Yes", "Severe"] },
            { q: "Do you eat a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you get enough sleep?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Are you willing to improve your skincare routine?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    stress: {
        intro: "Let’s assess your stress and emotional well-being.",
        questions: [
            { q: "Do you feel stressed most of the time?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you feel anxious or worried frequently?", o: ["No", "Occasionally", "Often", "Always"] },
            { q: "Do you have trouble sleeping?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you feel overwhelmed easily?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you take time to relax?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Do you experience mood swings?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel motivated daily?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you engage in social activities?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Are you open to improving your mental health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    cold: {
        intro: "Let’s check if your symptoms may be related to a cold or flu.",
        questions: [
            { q: "Do you have a runny or blocked nose?", o: ["No", "Slight", "Yes", "Severe"] },
            { q: "Do you have a sore throat?", o: ["No", "Mild", "Moderate", "Severe"] },
            { q: "Do you have a fever?", o: ["No", "Slight", "Yes", "High"] },
            { q: "Do you feel body aches?", o: ["No", "Mild", "Moderate", "Severe"] },
            { q: "Do you feel tired or weak?", o: ["No", "Slight", "Moderate", "Severe"] },
            { q: "Do you have a cough?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have headaches?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Have your symptoms lasted more than 3 days?", o: ["No", "Not sure", "Yes", "Over a week"] },
            { q: "Exposed to cold weather or sick people?", o: ["No", "Not sure", "Yes", "Frequently"] },
            { q: "Are you willing to rest and recover properly?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    headache: {
        intro: "I’d like to understand your headache patterns.",
        questions: [
            { q: "How often do you experience headaches?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Is the pain severe or throbbing?", o: ["No", "Mild", "Moderate", "Severe"] },
            { q: "Do you feel sensitivity to light or sound?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel nausea during headaches?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel stress before headaches occur?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you skip meals often?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you spend long hours on screens?", o: ["No", "Sometimes", "Often", "Daily"] },
            { q: "Do you sleep poorly?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you use painkillers frequently?", o: ["No", "Occasionally", "Often", "Very often"] },
            { q: "Are you willing to manage triggers?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    muscle: {
        intro: "Let’s assess your muscle strength and body condition.",
        questions: [
            { q: "Do you experience muscle pain?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel weak during daily activities?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you stretch before physical activity?", o: ["Always", "Sometimes", "Rarely", "Never"] },
            { q: "Do you feel pain after minor activity?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you consume enough protein?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you stay hydrated?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you feel stiffness in your body?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you get enough rest?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Are you willing to improve physical health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    appetite: {
        intro: "Let’s understand your eating habits and appetite.",
        questions: [
            { q: "Do you experience loss of appetite?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you overeat frequently?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you skip meals?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel guilty after eating?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you eat due to stress or emotions?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Maintain a regular eating schedule?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you crave unhealthy foods?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel tired after eating?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Have you had sudden weight changes?", o: ["No", "Slight", "Yes", "Significant"] },
            { q: "Willing to improve eating habits?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    dental: {
        intro: "Let me assess your oral and dental health.",
        questions: [
            { q: "Do you experience tooth pain?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do your gums bleed when brushing?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have bad breath frequently?", o: ["No", "Occasionally", "Often", "Always"] },
            { q: "How often do you brush your teeth?", o: ["Twice daily", "Once daily", "Occasionally", "Rarely"] },
            { q: "Consume sugary foods/drinks often?", o: ["No", "Occasionally", "Often", "Daily"] },
            { q: "Do you visit a dentist regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Sensitive to hot or cold foods?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you smoke?", o: ["No", "Occasionally", "Frequently", "Daily"] },
            { q: "Notice swelling or redness in gums?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Willing to improve oral hygiene?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    thyroid: {
        intro: "I’d like to evaluate your thyroid function.",
        questions: [
            { q: "Unexplained weight changes?", o: ["No", "Slight", "Yes", "Significant"] },
            { q: "Do you feel tired most of the time?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you feel unusually cold or hot?", o: ["No", "Slight", "Yes", "Extreme"] },
            { q: "Do you experience hair thinning?", o: ["No", "Slight", "Yes", "Severe"] },
            { q: "Do you have mood changes?", o: ["No", "Slight", "Yes", "Severe"] },
            { q: "Do you have difficulty sleeping?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have swelling in the neck area?", o: ["No", "Slight", "Yes", "Noticeable"] },
            { q: "Is your heart rate irregular?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you maintain a healthy diet?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Willing to check thyroid health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    emotional: {
        intro: "Let’s understand your emotional and anxiety levels.",
        questions: [
            { q: "Do you feel nervous or anxious often?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you overthink situations?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Rapid heartbeat without activity?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have difficulty relaxing?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel restless or on edge?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Trouble sleeping due to worry?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you avoid situations due to fear?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel overwhelmed easily?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Engage in relaxation activities?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Willing to improve mental well-being?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    infection: {
        intro: "I’d like to check if your body may be fighting an infection.",
        questions: [
            { q: "Do you have a fever?", o: ["No", "Slight", "Yes", "High fever"] },
            { q: "Body aches or weakness?", o: ["No", "Slight", "Moderate", "Severe"] },
            { q: "Sore throat or cough?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Chills or sweating?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Tired without doing much?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Exposed to sick people recently?", o: ["No", "Not sure", "Yes", "Multiple"] },
            { q: "Loss of appetite?", o: ["No", "Slight", "Yes", "Severe"] },
            { q: "Do you have headaches?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Digestive issues with these symptoms?", o: ["No", "Slight", "Yes", "Severe"] },
            { q: "Willing to rest and support recovery?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    sugar: {
        intro: "Let’s understand your sugar cravings and metabolism.",
        questions: [
            { q: "Do you crave sugary foods often?", o: ["Never", "Occasionally", "Frequently", "Very often"] },
            { q: "Do you feel energy crashes during the day?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you eat sweets daily?", o: ["No", "Occasionally", "Often", "Multiple times"] },
            { q: "Hungry shortly after eating?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you skip meals?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you gain weight easily?", o: ["No", "Slightly", "Yes", "Very easily"] },
            { q: "Do you feel tired after eating sugar?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you drink sugary beverages?", o: ["Never", "Occasionally", "Often", "Daily"] },
            { q: "Are you willing to reduce sugar intake?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    women: {
        intro: "I’d like to assess your reproductive and hormonal health.",
        questions: [
            { q: "Are your menstrual cycles regular?", o: ["Yes", "Slightly", "Irregular", "Very irregular"] },
            { q: "Do you experience severe cramps?", o: ["No", "Mild", "Moderate", "Severe"] },
            { q: "Unusual discharge or discomfort?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Fatigue during your cycle?", o: ["No", "Slight", "Moderate", "Severe"] },
            { q: "Mood swings related to cycle?", o: ["No", "Mild", "Moderate", "Severe"] },
            { q: "Maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you experience hormonal acne?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "History of reproductive issues?", o: ["No", "Not sure", "Yes", "Multiple"] },
            { q: "Willing to improve health naturally?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    sleep: {
        intro: "I’d like to understand your sleep pattern and quality.",
        questions: [
            { q: "How many hours do you sleep daily?", o: ["7–9 hours", "5–6 hours", "3–4 hours", "Less than 3"] },
            { q: "Difficulty falling asleep?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Wake up frequently at night?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Refreshed after sleeping?", o: ["Always", "Sometimes", "Rarely", "Never"] },
            { q: "Phone/screen before bed?", o: ["Never", "Occasionally", "Often", "Always"] },
            { q: "Caffeine late in the day?", o: ["Never", "Occasionally", "Often", "Daily"] },
            { q: "Do you feel tired during the day?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Consistent sleep schedule?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Heavy snoring or breathing issues?", o: ["No", "Not sure", "Yes", "Often"] },
            { q: "Willing to improve sleep habits?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    anemia: {
        intro: "Let’s check for signs related to low blood levels.",
        questions: [
            { q: "Feel weak or fatigued often?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you experience dizziness?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Look pale (skin, lips, nails)?", o: ["No", "Slightly", "Yes", "Very pale"] },
            { q: "Experience shortness of breath?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Consume iron-rich foods?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Do you have frequent headaches?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have cold hands or feet?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Experienced heavy blood loss?", o: ["No", "Slight", "Yes", "Severe"] },
            { q: "Heart racing sometimes?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Willing to improve nutrition?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    prostate: {
        intro: "Let’s assess your prostate health.",
        questions: [
            { q: "Urinate frequently, especially at night?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Difficulty starting urination?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Incomplete bladder emptying?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Experience weak urine flow?", o: ["No", "Slight", "Yes", "Severe"] },
            { q: "Discomfort in pelvic area?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Family history of prostate issues?", o: ["No", "Not sure", "Yes", "Multiple"] },
            { q: "Consume a healthy diet?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Are you above 40 years?", o: ["No", "Close", "Yes", "Over 60"] },
            { q: "Willing to monitor prostate health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    bone: {
        intro: "I’d like to evaluate your bone strength and risk factors.",
        questions: [
            { q: "Experience bone or back pain?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Consume calcium-rich foods?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Get enough sunlight (Vitamin D)?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Have you had fractures before?", o: ["No", "Minor", "Yes", "Multiple"] },
            { q: "Consume alcohol or smoke?", o: ["No", "Occasionally", "Frequently", "Daily"] },
            { q: "Feel weak or fatigued often?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Family history of bone issues?", o: ["No", "Not sure", "Yes", "Multiple"] },
            { q: "Willing to improve bone health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    hormonal: {
        intro: "Let’s evaluate your hormonal balance.",
        questions: [
            { q: "Unexplained weight changes?", o: ["No", "Slight", "Yes", "Significant"] },
            { q: "Do you feel fatigued most of the time?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you have mood swings?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have sleep problems?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Skin issues (acne, dryness)?", o: ["No", "Slight", "Yes", "Severe"] },
            { q: "Do you feel stressed frequently?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Irregular body patterns (cycle, energy)?", o: ["No", "Slight", "Yes", "Very irregular"] },
            { q: "Willing to improve hormonal health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    fitness: {
        intro: "Let’s assess your physical activity level.",
        questions: [
            { q: "How often do you exercise?", o: ["Daily", "Few times a week", "Rarely", "Never"] },
            { q: "Do you sit for long hours daily?", o: ["No", "Sometimes", "Often", "Always"] },
            { q: "Do you feel tired after light activity?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you engage in strength or cardio exercises?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Do you stretch or warm up before activity?", o: ["Always", "Sometimes", "Rarely", "Never"] },
            { q: "Do you experience muscle pain frequently?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you maintain a healthy weight?", o: ["Yes", "Slightly off", "No", "Significantly off"] },
            { q: "Do you stay hydrated during the day?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you have a fitness goal?", o: ["Yes", "Maybe", "No", "Not interested"] },
            { q: "Are you willing to improve your fitness level?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    renal: {
        intro: "Let’s evaluate how well your kidneys may be functioning.",
        questions: [
            { q: "Do you experience swelling in your legs or face?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you urinate more or less than usual?", o: ["Normal", "Slight change", "Noticeable change", "Extreme change"] },
            { q: "Do you feel persistent fatigue?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you experience lower back pain?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you drink enough water daily?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you have high blood pressure?", o: ["No", "Not sure", "Yes", "Severe"] },
            { q: "Do you notice foamy or dark urine?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you take medications frequently?", o: ["No", "Occasionally", "Often", "Very often"] },
            { q: "Do you have a history of kidney issues?", o: ["No", "Not sure", "Yes", "Chronic"] },
            { q: "Are you willing to protect your kidney health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    liver: {
        intro: "Let’s evaluate your liver function and lifestyle.",
        questions: [
            { q: "Do you feel tired frequently?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you consume alcohol?", o: ["No", "Occasionally", "Frequently", "Daily"] },
            { q: "Do you experience abdominal discomfort?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have yellowing of eyes or skin?", o: ["No", "Slight", "Yes", "Severe"] },
            { q: "Do you eat fatty or processed foods often?", o: ["No", "Sometimes", "Often", "Daily"] },
            { q: "Do you take medications frequently?", o: ["No", "Occasionally", "Often", "Very often"] },
            { q: "Do you feel nausea?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you maintain a balanced diet?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you exercise regularly?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Are you willing to improve your liver health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    digestive: {
        intro: "Let’s assess your digestive system and gut health.",
        questions: [
            { q: "Do you experience frequent bloating?", o: ["Never", "Occasionally", "Often", "Very often"] },
            { q: "Do you have constipation or irregular bowel movements?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you feel discomfort after eating?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you consume processed or junk food regularly?", o: ["No", "Occasionally", "Often", "Daily"] },
            { q: "Do you drink enough water daily?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you experience acid reflux or heartburn?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you eat late at night?", o: ["Never", "Occasionally", "Often", "Always"] },
            { q: "Do you feel full quickly when eating?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you include fiber in your diet (fruits, vegetables)?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Are you willing to improve your digestive health?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    },
    vision: {
        intro: "Let’s check your vision and eye health.",
        questions: [
            { q: "Do you experience blurred vision?", o: ["Never", "Occasionally", "Often", "Very often"] },
            { q: "Do your eyes feel dry or irritated?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you spend long hours on screens?", o: ["No", "Sometimes", "Often", "Daily"] },
            { q: "Do you experience headaches after screen use?", o: ["Never", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have difficulty seeing at night?", o: ["No", "Slightly", "Yes", "Severe difficulty"] },
            { q: "Do you wear protective eyewear in sunlight?", o: ["Yes", "Sometimes", "Rarely", "Never"] },
            { q: "Do you eat foods rich in vitamins (like carrots, greens)?", o: ["Regularly", "Sometimes", "Rarely", "Never"] },
            { q: "Do you rub your eyes frequently?", o: ["No", "Rarely", "Sometimes", "Often"] },
            { q: "Do you have a family history of eye problems?", o: ["No", "Not sure", "Yes", "Multiple cases"] },
            { q: "Are you willing to improve your eye care habits?", o: ["Yes", "Maybe", "No", "Not interested"] }
        ]
    }
};

let PRODUCT_INFO = {};
let CHALLENGE_DB = {};
let currentStep = 0;
let quizScore = 0;
let selections = { category: '', symptoms: '' };

const chatWindow = document.getElementById('chat-window');
const quickReplies = document.getElementById('quick-replies');
const textInputBox = document.getElementById('text-input-box');
const userTextInput = document.getElementById('user-text-input');

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch('app.json');
        const data = await res.json();
        data.product_catalog.forEach(p => PRODUCT_INFO[p.id] = p);
        CHALLENGE_DB = data.clinical_knowledge_base || {};
    } catch (e) { console.error("Could not load app.json", e); }

    startBot();
});

function startBot() {
    addBotMessage("Hello! I am your Auura Clinical Assistant. I'll help analyze your biological markers to recommend a recovery protocol.");
    setTimeout(() => askCategory(), 1000);
}

function askCategory() {
    addBotMessage("Please select your health focus area below:");
    
    // Rebuild footer with just the buttons grid — no search bar
    const inputArea = document.getElementById('chat-input-area');
    inputArea.innerHTML = `
        <div id="quick-replies" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; max-height: 260px; overflow-y: auto; padding: 12px; background: #fafafa; border-radius: 12px;">
        </div>
    `;

    const allCategories = [
        { label: "Diabetes & Sugar", val: "metabolic" },
        { label: "Hypertension & Heart", val: "cardio" },
        { label: "Immune & Infections", val: "immune" },
        { label: "Reproductive (General)", val: "repro" },
        { label: "Digestive & Bloating", val: "digestive" },
        { label: "Ulcers & Gastric", val: "ulcer" },
        { label: "Arthritis & Joints", val: "musculo" },
        { label: "Memory & Focus", val: "neurological" },
        { label: "Fertility (M/F)", val: "fertility" },
        { label: "Weight & Obesity", val: "weight" },
        { label: "Sexual Vitality (ED)", val: "ed" },
        { label: "Stress & Anxiety", val: "stress" },
        { label: "Skin & Dermal", val: "dermal" },
        { label: "Cold & Flu", val: "cold" },
        { label: "Headache & Migraine", val: "headache" },
        { label: "Muscle & Weakness", val: "muscle" },
        { label: "Appetite & Eating", val: "appetite" },
        { label: "Oral & Dental", val: "dental" },
        { label: "Thyroid Health", val: "thyroid" },
        { label: "Fitness & Activity", val: "fitness" },
        { label: "Emotional Health", val: "emotional" },
        { label: "General Infection", val: "infection" },
        { label: "Kidney Health", val: "renal" },
        { label: "Sugar Cravings", val: "sugar" },
        { label: "Women's Wellness", val: "women" },
        { label: "Sleep & Insomnia", val: "sleep" },
        { label: "Anemia & Blood", val: "anemia" },
        { label: "Prostate (Men)", val: "prostate" },
        { label: "Liver Health", val: "liver" },
        { label: "Bone Health", val: "bone" },
        { label: "Eye & Vision", val: "vision" },
        { label: "Hormonal Balance", val: "hormonal" }
    ];

    renderOptions(allCategories, true);
}

function addBotMessage(text) {
    const container = document.createElement('div');
    container.className = "bot-msg-container";
    container.innerHTML = `
        <div class="doctor-avatar" style="width: 35px; height: 35px; font-size: 1.1rem; background: #fdf8f6; border: none; color: #d4a017; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <i class="ri-robot-2-line"></i>
        </div>
        <div style="background: #fdfdfd; color: #4d231c; padding: 15px 20px; border-radius: 0 20px 20px 20px; max-width: 85%; font-weight: 500; font-size: 0.95rem; box-shadow: 0 4px 12px rgba(0,0,0,0.03); border: 1px solid #f0f0f0; line-height: 1.5;">
            ${text}
        </div>
    `;
    chatWindow.appendChild(container);
    gsap.from(container, { opacity: 0, x: -20, duration: 0.4 });
    scrollToBottom();
}

function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.style = "align-self: flex-end; background: #4d231c; color: #ffffff; padding: 12px 20px; border-radius: 20px 20px 0 20px; max-width: 80%; font-weight: 500; font-size: 0.95rem; box-shadow: 0 4px 15px rgba(77, 35, 28, 0.1); line-height: 1.5;";
    msg.innerText = text;
    chatWindow.appendChild(msg);
    scrollToBottom();
}

function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function askQuestion() {
    const data = QUIZ_DATA[selections.category];
    if (!data) return;

    if (currentStep === 0) {
        addBotMessage("<b>Doctor:</b> " + data.intro);
        setTimeout(() => {
            currentStep = 1;
            askQuestion();
        }, 1200);
        return;
    }

    if (currentStep > 10) {
        addBotMessage("Analysis Complete. I am calculating your clinical risk score...");
        updateProgress(100);
        setTimeout(finishAssessment, 2000);
        return;
    }

    const qObj = data.questions[currentStep - 1];
    addBotMessage(`<b>${currentStep}.</b> ` + qObj.q);
    renderOptions(qObj.o.map((o, idx) => ({ label: o, val: idx })));
    updateProgress((currentStep / 11) * 100);
}

function renderOptions(options, isCategory = false) {
    const quickRepliesNode = document.getElementById('quick-replies');
    if (!quickRepliesNode) return;
    
    quickRepliesNode.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "option-card";
        btn.innerText = opt.label;
        btn.onclick = () => {
            if (isCategory) handleCategory(opt.val, opt.label);
            else handleSelection(opt.val, opt.label);
        };
        quickRepliesNode.appendChild(btn);
    });
}

function handleCategory(val, label) {
    addUserMessage(label);
    selections.category = val;
    currentStep = 0;
    setTimeout(askQuestion, 800);
}

function handleSelection(val, label) {
    addUserMessage(label);
    quizScore += parseInt(val);
    currentStep++;
    setTimeout(askQuestion, 800);
}

function handleTextMessage() {
    const text = userTextInput.value.trim();
    if (!text) return;
    addUserMessage(text);
    selections.symptoms = text;
    userTextInput.value = '';
    textInputBox.style.display = 'none';
    
    setTimeout(() => {
        addBotMessage("Analyzing your biological data against our clinical database... Please wait.");
        setTimeout(finishAssessment, 2000);
    }, 800);
}

function updateProgress(forcePct = null) {
    const pct = forcePct !== null ? forcePct : (currentStep / 10) * 100;
    gsap.to("#progress-bar", { width: pct + '%', duration: 0.5 });
    document.getElementById('progress-text').innerText = Math.round(pct) + '%';
}

function finishAssessment() {
    addBotMessage("Analysis Complete. I have prepared your System Recovery Protocol below.");
    
    const resultsTemplate = document.getElementById('results-template').cloneNode(true);
    resultsTemplate.style.display = 'block';
    resultsTemplate.id = '';
    
    chatWindow.appendChild(resultsTemplate);
    renderResults();
    scrollToBottom();
}

function renderResults() {
    const recommendedSet = new Set();
    const riskLevel = quizScore < 10 ? "LOW" : (quizScore < 20 ? "MODERATE" : "HIGH");
    
    // 1. Initialize with Core Protocol (Upsell 3-4 products minimum)
    const core = CORE_PROTOCOLS[selections.category] || ["reishi", "cordy-active", "v-ca"];
    core.forEach(p => recommendedSet.add(p));

    const products = Array.from(recommendedSet).slice(0, 5); // Cap at 5 for premium feel
    const container = document.getElementById('recommended-products');
    
    container.innerHTML = products.map(pid => {
        const info = PRODUCT_INFO[pid] || { name: pid.toUpperCase(), img: 'Reishi.png', use: "Clinical Support" };
        const dosage = DOSAGE_GUIDE[pid] || "Consult specialist.";
        return `
            <div class="p-item" style="background:#fff; padding:15px; border-radius:15px; border:1px solid #eee; text-align:center;">
                <img src="${info.img || 'Reishi.png'}" style="height:60px; margin-bottom:10px;">
                <h4 style="font-size:0.9rem;">${info.name}</h4>
                <div style="font-size:0.7rem; color:#25d366; font-weight:800; margin-top:5px;">${dosage}</div>
            </div>
        `;
    }).join('');

    const catData = HEALTH_DB[selections.category] || { guide: "Maintain high hydration and rest." };
    const guideText = `<b>CLINICAL RISK LEVEL: ${riskLevel} (${quizScore}/30)</b><br><br>${catData.guide}`;
    document.getElementById('recovery-guide-text').innerHTML = guideText;
}

function generateReportContent() {
    let report = `AUURACARES CLINICAL REPORT\n==========================\n`;
    report += `Category: ${selections.category}\nRisk Score: ${quizScore}/30\n\n`;
    report += `PROTOCOL:\n${HEALTH_DB[selections.category]?.guide || 'General wellness'}\n`;
    return report;
}

function downloadReport() {
    const blob = new Blob([generateReportContent()], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Auura_Report.txt`;
    a.click();
}

function sendToConsultant() {
    window.open(`https://wa.me/2348114270136?text=${encodeURIComponent("Auura Report Ready: " + generateReportContent())}`, '_blank');
}
