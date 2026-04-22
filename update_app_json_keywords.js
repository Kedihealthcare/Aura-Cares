const fs = require('fs');

const appJsonPath = 'c:/Users/user/Desktop/product landing page/Animated-Fanta-Website/Animated-Fanta-Website/Animated Fanta Website/app.json';
const appData = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

const productKeywords = {
    'reishi': ['Kedi Reishi', 'Ganoderma Lucidum', 'Immune System Booster', 'Blood Pressure Regulator', 'Stress Relief', 'King of Herbs', 'Longevity Supplement', 'Natural Adaptogen', 'Detoxification', 'Antioxidant'],
    'gastrifort': ['Kedi Gastrifort', 'Stomach Ulcer Remedy', 'Acid Reflux Treatment', 'Bloating Relief', 'Digestive Health', 'Gastric Repair', 'Royal Jelly', 'Herbal Ulcer Cure', 'Gut Shield', 'Dyspepsia Relief'],
    'eye-beta': ['Kedi Eye Beta', 'Glaucoma Treatment', 'Vision Support', 'Ocular Carotenoids', 'Cataract Prevention', 'Night Vision Improvement', 'Blue Light Protection', 'Eye Strain Relief', 'Lutein Supplement', 'Retinal Health'],
    'constilease': ['Kedi Constilease', 'Constipation Relief', 'Pile Treatment', 'Digestive Cleanser', 'Radix Astragali', 'Bowel Movement', 'Toxin Flush', 'Acne Control', 'Weight Loss Support', 'Natural Laxative'],
    'magilim': ['Kedi Magilim', 'Weight Loss Supplement', 'Sugar Level Control', 'Konjac Glucomannan', 'Appetite Suppressant', 'Fat Burner', 'Cholesterol Management', 'Fiber Supplement', 'Satiety', 'Metabolic Boost'],
    'diawell': ['Kedi Diawell', 'Diabetes Treatment', 'Blood Sugar Regulator', 'Momordica Charantia', 'Pancreas Health', 'Insulin Sensitivity', 'Diabetic Neuropathy Relief', 'Glucose Buffer', 'Metabolic Solution', 'Natural Diabetes Care'],
    'gynapharm': ['Kedi Gynapharm', 'Uterine Health', 'Fibroid Shrinking', 'Pelvic Inflammatory Disease', 'UTI Remedy', 'Infection Treatment', 'Vaginitis Care', 'Hormonal Balance', 'Female Vitality', 'Botanical Reproductive Guard'],
    'golden-hypha': ['Kedi Golden Hypha', 'Immune System Support', 'Tumor Prevention', 'Flammulina Velutipes', 'Hepatitis Remedy', 'Cancer Support Supplement', 'Organ Detox', 'Advanced Biological Shield', 'White Blood Cell Boost', 'Polysaccharide Supplement'],
    'lycovite': ['Kedi Lycovite', 'Prostate Health', 'Vitality Supplement', 'Lycopersicon Esculentum', 'Lycopene', 'Male Health', 'Antioxidant Protection', 'Cardiac Care', 'Urine Flow Support', 'PSA Level Management'],
    'cordy-royal-jelly': ['Kedi Cordy Royal Jelly', 'Nervous System Health', 'Memory Boost', 'Cordyceps', 'Royal Jelly', 'Anti-Aging', 'Fatigue Relief', 'Hormonal Balance', 'Energy Vitality', 'Cellular Rejuvenation'],
    'seven-layer-sanitary': ['Kedi 7 Layer Sanitary', 'Sanitary Pads', 'Anion Technology', 'Menstrual Cramp Relief', 'Odor Control', 'Antibacterial Pads', 'Magnetic Energy', 'Hygienic Menstrual Care', 'High Absorption', 'Female Wellness'],
    'revive': ['Kedi Revive', 'Male Intimacy', 'Stamina Boost', 'Radix Ginseng', 'Sexual Performance', 'Blood Flow Enhancer', 'Kidney Vitality', 'Male Energy', 'Testosterone Support', 'Natural Virility'],
    'eve-comfort': ['Kedi Eve Comfort', 'Hormonal Balance', 'PCOS Treatment', 'Angelica Sinensis', 'Menstrual Cycle Regulation', 'Cramp Relief', 'Uterine Warmth', 'Fertility Support', 'Moon Cycle Harmony', 'Dysmenorrhea Relief'],
    'cordy-active': ['Kedi Cordy Active', 'Stamina Supplement', 'Respiratory Health', 'Cordyceps Sinensis', 'Asthma Relief', 'Lung Support', 'Physical Endurance', 'Immune Modulation', 'Chronic Fatigue Recovery', 'Oxygenation Boost'],
    'jointeez': ['Kedi Jointeez', 'Arthritis Relief', 'Bone Pain Treatment', 'Joint Lubrication', 'Synovial Fluid', 'Cartilage Repair', 'Rheumatism Cure', 'Back Pain Relief', 'Mobility Support', 'Arthro-Botanical Complex'],
    'ultramega': ['Kedi Ultramega', 'Omega-3 Fish Oil', 'Heart Health', 'Brain Function', 'Vision Support', 'Cholesterol Balance', 'Joint Lubrication', 'Cardiovascular Shield', 'DHA EPA Supplement', 'Vascular Clearing'],
    'calmazine': ['Kedi Calmazine', 'Calcium Magnesium Zinc', 'Bone Density', 'Sleep Aid', 'Skeletal Health', 'Testosterone Boost', 'Immune Support', 'Electrolyte Balance', 'Heart Rhythm', 'Teeth Strengthening'],
    'haemocare': ['Kedi Haemocare', 'Blood Builder', 'Anemia Treatment', 'Iron Supplement', 'Red Blood Cell Boost', 'Post-Natal Recovery', 'Oxygen Level Increase', 'Oxygen Energy', 'Organic Iron', 'Vitality Boost'],
    'multivitamin': ['Mina Multivitamin', 'Daily Vitality', 'Organic Vitamin Complex', 'Nutritional Insurance', 'Immune System Coverage', 'Metabolic Boost', 'Energy Support', 'Skin Health', 'B-Complex', 'Wellness Bridge'],
    'v-ca': ['Kedi V-Ca', 'Vitamin C Calcium', 'Immune Power', 'Skin Collagen', 'Effervescent Vitamin C', 'Wound Healing', 'Antioxidant Boost', 'Bone Structure', 'Cold Prevention', 'Scurvy Remedy'],
    'lirich': ['Kedi Lirich', 'Glucose Optimizer', 'Insulin Sensitivity', 'Sugar Control', 'Pancreas Regeneration', 'Diabetes Management', 'Metabolic Harmony', 'Blood Viscosity Support', 'Thirst Relief', 'Diabetic Care'],
    'qinghao': ['Kedi Qinghao', 'Malaria Treatment', 'Artemisinin Complex', 'Fever Relief', 'Parasite Clearance', 'Plasmodium Killer', 'Blood Purification', 'Natural Anti-Malarial', 'Rapid Infection Recovery', 'Tropical Medicine'],
    'refresh-tea': ['Kedi Refresh Tea', 'Liver Detox', 'Vision Support', 'Herbal Cleanser', 'Digestive Tea', 'Optical Health', 'Skin Clarity', 'Bile Duct Detox', 'Camellia Sinensis', 'Soothing Wellness'],
    'colon-tea-cleanser': ['Kedi Colon Tea', 'Detox Tea', 'Constipation Relief', 'Flat Tummy Tea', 'Bowel Cleanser', 'Digestive Health', 'Metabolic Burn', 'Waste Flush', 'Toxin Removal', 'Natural Laxative Tea'],
    'massage-machine': ['Kedi BCM', 'Blood Circulation Machine', 'Magnetic Bio-Vibrator', 'Vascular Cleansing', 'Neuropathy Relief', 'Post-Stroke Recovery', 'Aerobic Exercise Equivalent', 'Reflexology', 'Lymphatic Drainage', 'Wellness Technology'],
    'hydrogen-cup': ['Kedi Hydrogen Cup', 'Antioxidant Water', 'Molecular Electrolysis', 'Hydration Technology', 'Anti-Aging Water', 'Cellular Health', 'Alkaline Water', 'H2 Infused', 'Lactic Acid Flush', 'Premium Wellness Device'],
    'kedi-soaps': ['Kedi Soaps', 'Dermatology Series', 'Acne Treatment', 'Fungal Remedy', 'Skin Tone Restoration', 'Antibacterial Soap', 'Ringworm Remedy', 'Eczema Cure', 'Herbal Cleansing', 'Botanical Skincare'],
    'memorease': ['Kedi Memorease', 'Memory Support', 'Tinnitus Relief', 'Ginkgo Biloba', 'Cognitive Focus', 'Brain Oxygenation', 'Headache Relief', 'Alzheimer Prevention', 'Mental Clarity', 'Neural Protection'],
    'vigor-essential': ['Kedi Vigor Essential', 'Prostate Health', 'Male Vitality', 'BPH Prevention', 'Urinary Flow Support', 'DHT Blocker', 'Prostate Shrinking', 'Male Aging Support', 'Urinary Health', 'Botanical Prostate Guard'],
    'vip-massage-chair': ['Kedi VIP Massage Chair', 'Shiatsu Experience', 'Zero-Gravity Relaxation', 'Stress Recovery', 'Luxury Health', 'Posture Correction', 'Athletic Recovery', 'Robotic Massage', 'Total Wellness', 'Premium Home Spa'],
    'detox-patch': ['Kedi Detox Foot Patch', 'Lymphatic Detox', 'Toxin Extraction', 'Reflexology Bamboo Pad', 'Sleep Improvement', 'Water Weight Loss', 'Body Cleansing', 'Energy Boost', 'Night Detox', 'Metabolic Waste Removal'],
    'grapemin-e': ['Kedi Grapemin-E', 'Anti-Aging', 'Skin Glow', 'Grape Seed Extract', 'Vitamin E', 'Antioxidant Matrix', 'Cellular age reversal', 'Collagen Protection', 'Hyper-pigmentation Remedy', 'Wrinkle Reduction'],
    'gumcare': ['Kedi Gumcare', 'Herbal Toothpaste', 'Bleeding Gums Cure', 'Cavity Protection', 'Fluoride-Free', 'Oral Hygiene', 'Fresh Breath', 'Tartar Removal', 'Enamel Shield', 'Natural Dental Guard'],
    'cello-q10': ['Kedi Cello Q10', 'Co-Enzyme Q10', 'Heart Power', 'Cellular ATP', 'Mitochondria Support', 'Cardiovascular Health', 'Blood Pressure Balance', 'Antioxidant Protection', 'Heart Muscle Strength', 'Energy Boost'],
    'cadibetter': ['Kedi Cadibetter', 'Cardiac Support', 'Heart Muscle Health', 'Vascular Tone', 'Arrhythmia Relief', 'Circulatory Protocol', 'Oxygen Delivery', 'Cardiac Recovery', 'Heart Rhythm Stability', 'Clinical Heart Supplement'],
    'ginseng-coffee': ['Kedi Ginseng Coffee', 'Panax Ginseng', 'Energy Boost', 'Cognitive Focus', 'Mental Clarity', 'Adaptogen Coffee', 'Libido Support', 'Metabolic Boost', 'Stress Relief', 'Natural Stamina'],
    'golden-six': ['Kedi Golden Six', 'Female Vitality', 'Hormonal Balance', 'Kidney Yin', 'Back Pain Relief', 'Menopause Support', 'Vertigo Treatment', 'Six-Herb Formula', 'Dizziness Relief', 'Natural Yin Nourishment']
};

appData.product_catalog = appData.product_catalog.map(p => {
    return {
        ...p,
        keywords: productKeywords[p.id] || [p.name, 'Kedi Healthcare', 'Natural Supplement', 'Wellness']
    };
});

fs.writeFileSync(appJsonPath, JSON.stringify(appData, null, 2));
console.log('Successfully updated app.json with product keywords.');
