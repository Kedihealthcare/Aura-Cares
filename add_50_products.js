const fs = require('fs');

const prefixes = ["Aura", "Vita", "Hepato", "Neuro", "Cardio", "Pulmo", "Osteo", "Derma", "Gastro", "Renal", "Phyto", "Bio", "Immuno", "Glyco", "Lipid", "Endocrin", "Myo", "Hema", "Ocu", "Arthro", "Circu", "Cell", "Longevi", "Vital", "Opti", "Maxi", "Syn", "Pro", "Ultra", "Mega"];
const suffixes = ["Care", "Fort", "Guard", "Plus", "Max", "Boost", "Shield", "Life", "Pro", "Gen", "Flex", "Flow", "Zyme", "Tox", "Sense", "Tone", "Core", "Eze", "Stat", "Min", "Vance", "Clear", "Derm", "Biotics", "Oxi", "Cell", "Nova", "Prime", "Peak", "Vigor"];
const uses = ["Cellular Rejuvenation", "Metabolic Harmony", "Cognitive Enhancement", "Joint Mobility", "Digestive Health", "Cardiovascular Support", "Immune Defense", "Respiratory Function", "Deep Sleep Cycle", "Detoxification", "Hormonal Balance", "Bone Density", "Skin Radiance", "Vision Clarity", "Blood Sugar Regulation", "Liver Restoration", "Kidney Function", "Nerve Repair", "Gut Microbiome", "Energy Vitality", "Stress Adaptation", "Antioxidant Protection", "Muscle Recovery", "Circulation Boost", "Cellular Hydration"];
const clinicalNames = ["Botanical Synthesis", "Phyto-Active Protocol", "Cellular Matrix Compound", "Bio-Enhancement Formula", "Adaptogenic Baseline", "Micronutrient Complex", "Herbal Catalyst", "Enzymatic Pathway Activator"];

function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const appData = JSON.parse(fs.readFileSync('app.json', 'utf8'));

for (let i = 0; i < 50; i++) {
    const p = randomElement(prefixes);
    const s = randomElement(suffixes);
    let name = p + s;
    if (name.length < 6) name += " Pro";

    const use = randomElement(uses);
    const id = name.toLowerCase().replace(/\s/g, "-");

    const newProduct = {
        "id": id,
        "name": name,
        "price": Math.floor(Math.random() * 5 + 2) * 5000,
        "img": "reishi.jfif", // Fallback image existing in repo
        "theme_color": "linear-gradient(135deg, #4d231c, #d4a017)",
        "use": use,
        "clinical_name": randomElement(clinicalNames),
        "keywords": [
            "Aura cares " + name,
            use,
            "Clinical Grade",
            "Natural Supplement",
            "Restoration Protocol"
        ],
        "indications": [
            {
                "icon": "ri-heart-pulse-fill",
                "title": "Primary Action",
                "desc": "Targets root cause of issues related to " + use.toLowerCase() + "."
            },
            {
                "icon": "ri-shield-check-fill",
                "title": "System Support",
                "desc": "Provides bio-active compounds for " + name + " synergy."
            }
        ]
    };

    // Avoid duplicates
    if (!appData.product_catalog.find(prod => prod.id === id)) {
        appData.product_catalog.push(newProduct);
    }
}

fs.writeFileSync('app.json', JSON.stringify(appData, null, 2));
console.log("Successfully added 50 new health protocol pages to app.json!");
