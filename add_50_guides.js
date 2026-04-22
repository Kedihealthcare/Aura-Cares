const fs = require('fs');

const challenges = [
    { id: "diabetes", title: "Metabolic Reset", organ: "Endocrine", condition: "Diabetes & Blood Sugar", focus: "Beta-Cell Trophism", pack: "Metabolic Control Pack", color: "#10b981" },
    { id: "hypertension", title: "Arterial Restoration", organ: "Cardiovascular", condition: "Hypertension", focus: "Nitric Oxide Optimization", pack: "Cardio Shield Pack", color: "#ef4444" },
    { id: "arthritis", title: "Joint Matrix Repair", organ: "Skeletal", condition: "Arthritis & Joint Pain", focus: "Cartilage Synthesis", pack: "Mobility Restore Pack", color: "#f59e0b" },
    { id: "prostate", title: "Prostate Health", organ: "Reproductive", condition: "BPH & Prostate Health", focus: "Cellular Hypertrophy Reduction", pack: "Prostate Guard Pack", color: "#3b82f6" },
    { id: "fibroid", title: "Uterine Harmony", organ: "Reproductive", condition: "Fibroids & PCOS", focus: "Hormonal Biomodulation", pack: "Womb Wellness Pack", color: "#d946ef" },
    { id: "kidney", title: "Renal Restoration", organ: "Excretory", condition: "Kidney Function & Stones", focus: "Nephron Matrix Recovery", pack: "Renal Flush Pack", color: "#06b6d4" },
    { id: "asthma", title: "Pulmonary Expansion", organ: "Respiratory", condition: "Asthma & Bronchitis", focus: "Bronchial Dilation", pack: "Breath Easy Pack", color: "#8b5cf6" },
    { id: "ulcer", title: "Gastric Lining Repair", organ: "Digestive", condition: "Peptic Ulcers & Acid Reflux", focus: "Mucosal Wall Regeneration", pack: "Gastric Shield Pack", color: "#eab308" },
    { id: "insomnia", title: "Neural Synchronization", organ: "Neurological", condition: "Insomnia & Chronic Stress", focus: "Circadian Rhythm Reset", pack: "Deep Sleep Pack", color: "#6366f1" },
    { id: "obesity", title: "Lipid Oxidation", organ: "Metabolic", condition: "Obesity & Weight Management", focus: "Thermogenic Activation", pack: "Metabolic Burn Pack", color: "#f97316" },
    { id: "stroke", title: "Neuro-Vascular Recovery", organ: "Neurological", condition: "Stroke Rehabilitation", focus: "Neuroplasticity Enhancement", pack: "Neuro Restore Pack", color: "#14b8a6" },
    { id: "anemia", title: "Hematological Boost", organ: "Circulatory", condition: "Anemia & Fatigue", focus: "Erythrocyte Synthesis", pack: "Vitality Blood Pack", color: "#e11d48" },
    { id: "migraine", title: "Cranial Tension Relief", organ: "Neurological", condition: "Chronic Migraines", focus: "Vascular Stabilization", pack: "Neuro Soothe Pack", color: "#8b5cf6" },
    { id: "thyroid", title: "Thyroid Balance", organ: "Endocrine", condition: "Hypothyroidism & Hashimoto's", focus: "Metabolic Hormone Regulation", pack: "Thyro-Balance Pack", color: "#10b981" },
    { id: "osteoporosis", title: "Bone Density Matrix", organ: "Skeletal", condition: "Osteoporosis", focus: "Calcium Biosynthesis", pack: "Bone Fortify Pack", color: "#f59e0b" },
    { id: "constipation", title: "Intestinal Flow", organ: "Digestive", condition: "Chronic Constipation", focus: "Peristalsis Optimization", pack: "Colon Cleanse Pack", color: "#84cc16" },
    { id: "hemorrhoids", title: "Vascular Integrity", organ: "Circulatory", condition: "Hemorrhoids & Piles", focus: "Venous Wall Strengthening", pack: "Vein Care Pack", color: "#ef4444" },
    { id: "immunity", title: "Immune Sentinel", organ: "Immune", condition: "Immune Deficiency", focus: "Macrophage Activation", pack: "Immunity Shield Pack", color: "#3b82f6" },
    { id: "gout", title: "Uric Acid Clearance", organ: "Metabolic", condition: "Gout & Uric Acid", focus: "Crystal Dissolution", pack: "Uric Flush Pack", color: "#f97316" },
    { id: "sciatica", title: "Nerve Decompression", organ: "Nervous", condition: "Sciatica & Nerve Pain", focus: "Myelin Sheath Repair", pack: "Nerve Ease Pack", color: "#6366f1" },
    { id: "varicose", title: "Venous Flow Protocol", organ: "Circulatory", condition: "Varicose Veins", focus: "Capillary Regeneration", pack: "Circulation Pack", color: "#06b6d4" },
    { id: "glaucoma", title: "Intraocular Pressure", organ: "Ocular", condition: "Glaucoma & Vision", focus: "Retinal Microcirculation", pack: "Vision Clear Pack", color: "#14b8a6" },
    { id: "cataract", title: "Ocular Clarity", organ: "Ocular", condition: "Cataract Prevention", focus: "Protein Denaturation Reversal", pack: "Eye Restore Pack", color: "#0ea5e9" },
    { id: "vertigo", title: "Vestibular Balance", organ: "Neurological", condition: "Vertigo & Dizziness", focus: "Inner Ear Fluid Regulation", pack: "Balance Restore Pack", color: "#8b5cf6" },
    { id: "acne", title: "Dermal Purification", organ: "Integumentary", condition: "Severe Acne", focus: "Sebum Production Balance", pack: "Clear Skin Pack", color: "#ec4899" },
    { id: "uti", title: "Uro-Tract Defense", organ: "Urinary", condition: "Chronic UTI", focus: "Pathogen Expulsion", pack: "Uro-Health Pack", color: "#eab308" },
    { id: "gallstones", title: "Biliary Flow", organ: "Digestive", condition: "Gallstones & Sludge", focus: "Lipid Calculus Breakdown", pack: "Gallbladder Flush Pack", color: "#84cc16" },
    { id: "bronchitis", title: "Respiratory Mucosa", organ: "Respiratory", condition: "Chronic Bronchitis", focus: "Ciliary Clearance", pack: "Lung Clear Pack", color: "#d946ef" },
    { id: "pneumonia", title: "Alveolar Recovery", organ: "Respiratory", condition: "Post-Pneumonia Rehab", focus: "Pulmonary Tissue Repair", pack: "Breath Restore Pack", color: "#06b6d4" },
    { id: "hepatitis", title: "Viral Hepato-Defense", organ: "Hepatic", condition: "Hepatitis Support", focus: "Viral Load Management", pack: "Liver Shield Pack", color: "#10b981" },
    { id: "eczema", title: "Epidermal Barrier", organ: "Integumentary", condition: "Eczema & Dermatitis", focus: "Inflammatory Cytokine Block", pack: "Skin Soothe Pack", color: "#ec4899" },
    { id: "candida", title: "Microbiome Reset", organ: "Systemic", condition: "Candida Overgrowth", focus: "Fungal Cell Wall Disruption", pack: "Flora Balance Pack", color: "#8b5cf6" },
    { id: "dementia", title: "Cognitive Preservation", organ: "Neurological", condition: "Early Dementia", focus: "Synaptic Connectivity", pack: "Mind Sharp Pack", color: "#6366f1" },
    { id: "tinnitus", title: "Auditory Nerve Soothe", organ: "Neurological", condition: "Tinnitus (Ringing Ears)", focus: "Microvascular Auditory Flow", pack: "Ear Calm Pack", color: "#3b82f6" },
    { id: "psoriasis", title: "Autoimmune Skin Defense", organ: "Integumentary", condition: "Psoriasis", focus: "Keratinocyte Hyper-proliferation Arrest", pack: "Derma-Clear Pack", color: "#ef4444" },
    { id: "infertility-m", title: "Spermatogenesis Protocol", organ: "Reproductive", condition: "Male Infertility", focus: "Motility & Morphology Optimization", pack: "Male Fertility Pack", color: "#14b8a6" },
    { id: "infertility-f", title: "Ovarian Matrix Protocol", organ: "Reproductive", condition: "Female Infertility", focus: "Follicular Development", pack: "Female Fertility Pack", color: "#d946ef" },
    { id: "menopause", title: "Endocrine Transition", organ: "Endocrine", condition: "Menopause Syndrome", focus: "Phyto-Estrogen Modulation", pack: "Meno-Soothe Pack", color: "#eab308" },
    { id: "neuropathy", title: "Peripheral Nerve Repair", organ: "Nervous", condition: "Diabetic Neuropathy", focus: "Axonal Regeneration", pack: "Neuro-Ease Pack", color: "#f59e0b" },
    { id: "syphilis", title: "Systemic Purge", organ: "Systemic", condition: "STI / Syphilis Support", focus: "Pathogenic Neutralization", pack: "System Clear Pack", color: "#ef4444" },
    { id: "typhoid", title: "Enteric Fever Recovery", organ: "Systemic", condition: "Typhoid & Malaria Recurrence", focus: "Splenic Filtration Boost", pack: "Fever Defense Pack", color: "#10b981" },
    { id: "staph", title: "Staph Aureus Defense", organ: "Systemic", condition: "Staphylococcus Aureus", focus: "Bacterial Biofilm Eradication", pack: "Staph Clear Pack", color: "#06b6d4" },
    { id: "cholesterol", title: "Lipid Profile Optimizer", organ: "Cardiovascular", condition: "High Cholesterol", focus: "LDL/HDL Rebalancing", pack: "Heart Guard Pack", color: "#f97316" },
    { id: "anxiety", title: "Neuro-Calm Protocol", organ: "Neurological", condition: "Anxiety & Panic", focus: "GABA Receptor Modulation", pack: "Stress Free Pack", color: "#8b5cf6" },
    { id: "hernia", title: "Tissue Integrity Support", organ: "Muscular", condition: "Hernia Support", focus: "Connective Tissue Fortification", pack: "Core Strength Pack", color: "#14b8a6" },
    { id: "endometriosis", title: "Endometrial Clearance", organ: "Reproductive", condition: "Endometriosis", focus: "Pelvic Inflammatory Reduction", pack: "Endo-Relief Pack", color: "#ec4899" },
    { id: "lupus", title: "Autoimmune Harmony", organ: "Immune", condition: "Lupus (SLE)", focus: "Antibody Normalization", pack: "Autoimmune Calm Pack", color: "#3b82f6" },
    { id: "parkinsons", title: "Dopamine Synthesis", organ: "Neurological", condition: "Early Parkinson's Support", focus: "Substantia Nigra Protection", pack: "Neuro-Kinetic Pack", color: "#6366f1" },
    { id: "fatigue", title: "Mitochondrial Energy", organ: "Systemic", condition: "Chronic Fatigue Syndrome", focus: "ATP Production Synthesis", pack: "Energy Matrix Pack", color: "#eab308" },
    { id: "halitosis", title: "Oral Microbiome Reseed", organ: "Digestive", condition: "Chronic Halitosis", focus: "Anaerobic Bacteria Neutralization", pack: "Breath Fresh Pack", color: "#84cc16" }
];

let liverHtml = fs.readFileSync('liver-guide.html', 'utf8');

for (const ch of challenges) {
    let newHtml = liverHtml;

    // Head Replacements
    newHtml = newHtml.replace(/Hepatic Regeneration Protocol/g, ch.title);
    newHtml = newHtml.replace(/Aura Cares Liver Intelligence/g, "Aura Cares " + ch.organ + " Intelligence");
    newHtml = newHtml.replace(/Clinical guide to reversing fatty liver disease, reducing ALT\/AST enzymes, and restoring hepatocyte function/g, 
            "Clinical guide for " + ch.condition + " and accelerating " + ch.focus);
    newHtml = newHtml.replace(/Hepatic Regeneration: The Aura Cares Liver Protocol/g, ch.title + ": The Aura Cares " + ch.organ + " Protocol");

    // Body Replacements
    newHtml = newHtml.replace(/Clinical Protocol: Hepatology/g, "Clinical Protocol: " + ch.organ + " Health");
    newHtml = newHtml.replace(/Hepatic <br> <em class="text-\[#d4a017\] italic">Restoration.<\/em>/g, 
            ch.condition.split(' ')[0] + " <br> <em class='text-[#d4a017] italic'>Restoration.</em>");
    newHtml = newHtml.replace(/The liver is the body(.*?)fracture./g, 
            "Addressing " + ch.condition + " requires a systemic approach. When the " + ch.organ.toLowerCase() + " system faces metabolic stress, " + ch.focus.toLowerCase() + " must be accelerated to restore equilibrium.");

    newHtml = newHtml.replace(/The Hepatic Crisis/g, "The " + ch.organ + " Crisis");
    newHtml = newHtml.replace(/Clinical data suggests that fatty liver disease(.*?)NAFLD(.*?) regeneration./g, 
            "Clinical data suggests that " + ch.condition + " is reaching epidemic proportions. Our protocol focuses heavily on " + ch.focus + " to halt degradation and stimulate robust systemic regeneration.");
    
    newHtml = newHtml.replace(/The liver is a silent workhorse.*?scarring./g, 
            "The " + ch.organ.toLowerCase() + " matrix responds to specific botanical mediators. We target the biological window before damage becomes irreversible.");

    newHtml = newHtml.replace(/The Aura Liver Restore Protocol utilizes a 45-day sequential approach to clearing the hepatic matrix and restoring antioxidant capacity/g, 
            "The Aura " + ch.condition.split(' ')[0] + " Restore Protocol utilizes a targeted, sequential botanical approach to stabilizing the " + ch.organ.toLowerCase() + " matrix and enhancing " + ch.focus);

    newHtml = newHtml.replace(/Hepatology Workshop/g, ch.organ + " Clinic Workshop");
    newHtml = newHtml.replace(/Phase II <em class="text-\[#d4a017\]">Detox<\/em> Seminar/g, ch.title + " <em class='text-[#d4a017]'>Seminar</em>");

    newHtml = newHtml.replace(/Liver Restore Pack/g, ch.pack);
    newHtml = newHtml.replace(/Full Hepatic Restoration Bundle/g, "Full " + ch.organ + " Restoration Bundle");

    newHtml = newHtml.replace(/Enzymatic Balance/g, "Biological Equilibrium");
    newHtml = newHtml.replace(/Clinical data from the Aura Verified Network shows significant improvements in ALT\/AST liver enzymes/g, 
            "Clinical data from the Aura Verified Network shows unprecedented improvements in cases of " + ch.condition);
            
    // Fix sidebar
    newHtml = newHtml.replace(/Hepatology Advisor/g, ch.organ + " Advisor");
    
    const fileName = ch.id + '-guide.html';
    
    fs.writeFileSync(fileName, newHtml);
}

// Generate an index to link them all
let directoryHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Health Challenges Index</title><link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="style.css"></head><body class="bg-slate-50"><div class="max-w-[1600px] mx-auto p-12"><h1 class="text-5xl font-black serif text-[#4d231c] mb-12">Aura Cares Clinical Challenge Library</h1><div class="grid grid-cols-1 md:grid-cols-2 text-white lg:grid-cols-3 xl:grid-cols-4 gap-6">`;
for(let ch of challenges) {
    directoryHtml += `<a href="${ch.id}-guide.html" class="p-8 rounded-3xl" style="background:${ch.color}"><span class="text-[10px] uppercase font-black opacity-70">${ch.organ}</span><h3 class="text-xl font-bold mt-2">${ch.condition}</h3><p class="text-sm mt-4 opacity-80">${ch.title}</p></a>`;
}
directoryHtml += `</div></div></body></html>`;

fs.writeFileSync('challenge-library.html', directoryHtml);
console.log("Successfully generated", challenges.length, "common health challenge guides!");

