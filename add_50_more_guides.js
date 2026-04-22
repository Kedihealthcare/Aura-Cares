const fs = require('fs');

const challenges = [
    { id: "appendicitis-recovery", title: "Gut Mucosa Recovery", organ: "Digestive", condition: "Appendicitis Post-Care", focus: "Inflammation Reduction", pack: "Gut Guardian Pack", color: "#84cc16" },
    { id: "arrhythmia", title: "Cardiac Rhythm", organ: "Cardiovascular", condition: "Arrhythmia Support", focus: "Electrolyte Stabilization", pack: "Rhythm Restore Pack", color: "#ef4444" },
    { id: "gerd", title: "Acid Reflux Protocol", organ: "Digestive", condition: "GERD & Acid Reflux", focus: "Esophageal Lining Regeneration", pack: "Gastric Soothe Pack", color: "#eab308" },
    { id: "ibs", title: "Bowel Harmony", organ: "Digestive", condition: "Irritable Bowel Syndrome", focus: "Intestinal Microflora Balance", pack: "IBS Relief Pack", color: "#10b981" },
    { id: "crohns", title: "Intestinal Calm", organ: "Digestive", condition: "Crohn's Support", focus: "Autoimmune Inflammatory Block", pack: "Bowel Health Pack", color: "#d946ef" },
    { id: "colitis", title: "Colon Barrier Defense", organ: "Digestive", condition: "Ulcerative Colitis", focus: "Mucosal Wall Synthesis", pack: "Colon Guardian Pack", color: "#06b6d4" },
    { id: "hpylori", title: "H. Pylori Eradication", organ: "Digestive", condition: "H. Pylori Recovery", focus: "Bacterial Load Neutralization", pack: "Gastric Flush Pack", color: "#eab308" },
    { id: "leaky-gut", title: "Intestinal Permeability", organ: "Digestive", condition: "Leaky Gut", focus: "Tight Junction Repair", pack: "Gut Matrix Pack", color: "#10b981" },
    { id: "dvt-support", title: "Clot Dissolution", organ: "Cardiovascular", condition: "DVT Post-Care", focus: "Fibrinolytic Activity", pack: "Vascular Clear Pack", color: "#ef4444" },
    { id: "kidney-cysts", title: "Renal Structural Polish", organ: "Renal", condition: "Kidney Cysts", focus: "Cellular Fluid Regulation", pack: "Renal Integrity Pack", color: "#3b82f6" },
    { id: "incontinence", title: "Bladder Control", organ: "Urinary", condition: "Urinary Incontinence", focus: "Sphincter Muscle Tone", pack: "Bladder Fortify Pack", color: "#0ea5e9" },
    { id: "interstitial-cystitis", title: "Bladder Mucosa Repair", organ: "Urinary", condition: "Interstitial Cystitis", focus: "Epithelial Wall Restoration", pack: "Uro-Calm Pack", color: "#14b8a6" },
    { id: "pid", title: "Pelvic Clearing", organ: "Reproductive", condition: "Pelvic Inflammatory Disease", focus: "Deep Tissue Detoxification", pack: "Pelvic Flush Pack", color: "#ec4899" },
    { id: "vaginitis", title: "Vaginal Microbiome", organ: "Reproductive", condition: "Vaginitis", focus: "Flora Homeostasis", pack: "Feminine Balance Pack", color: "#d946ef" },
    { id: "erectile-dysfunction", title: "Vascular Engorgement", organ: "Reproductive", condition: "Erectile Dysfunction", focus: "Cavernosal Blood Flow", pack: "Male Vigor Pack", color: "#ef4444" },
    { id: "low-testosterone", title: "Androgen Synthesis", organ: "Endocrine", condition: "Low Testosterone", focus: "Leydig Cell Stimulation", pack: "Testa-Boost Pack", color: "#f97316" },
    { id: "premature-ejaculation", title: "Neural Climax Control", organ: "Neurological", condition: "Premature Ejaculation", focus: "Serotonergic Pathway Delay", pack: "Stamina Plus Pack", color: "#6366f1" },
    { id: "osteoarthritis", title: "Articular Cartilage", organ: "Skeletal", condition: "Osteoarthritis", focus: "Synovial Fluid Replenishment", pack: "Joint Lubrication Pack", color: "#f59e0b" },
    { id: "plantar-fasciitis", title: "Fascial Tissue Healing", organ: "Muscular", condition: "Plantar Fasciitis", focus: "Ligament Tensile Strength", pack: "Fascia Repair Pack", color: "#8b5cf6" },
    { id: "carpal-tunnel", title: "Median Nerve Gliding", organ: "Nervous", condition: "Carpal Tunnel", focus: "Wrist Inflammation Reduction", pack: "Nerve Glide Pack", color: "#14b8a6" },
    { id: "muscle-cramps", title: "Myo-Relaxation", organ: "Muscular", condition: "Muscle Cramps", focus: "Calcium/Magnesium Channel Open", pack: "Myo-Ease Pack", color: "#10b981" },
    { id: "fibromyalgia", title: "Systemic Pain Modulator", organ: "Neurological", condition: "Fibromyalgia", focus: "Pain Receptor Desensitization", pack: "Fibro-Soothe Pack", color: "#6366f1" },
    { id: "back-pain", title: "Vertebral Column Support", organ: "Skeletal", condition: "Chronic Back Pain", focus: "Spinal Disc Hydration", pack: "Spine Fortify Pack", color: "#f59e0b" },
    { id: "bone-fractures", title: "Osteoblast Accel", organ: "Skeletal", condition: "Fracture Recovery", focus: "Callus Formation Speed", pack: "Bone Knit Pack", color: "#eab308" },
    { id: "rickets", title: "Mineralization Protocol", organ: "Skeletal", condition: "Osteomalacia", focus: "Vitamin D Synthesis", pack: "Mineral Matrix Pack", color: "#f97316" },
    { id: "morning-sickness", title: "Gestational Calm", organ: "Digestive", condition: "Morning Sickness", focus: "Gastric Nerve Soothe", pack: "Maternal Ease Pack", color: "#d946ef" },
    { id: "breast-cysts", title: "Lymphatic Breast Drain", organ: "Lymphatic", condition: "Breast Cysts", focus: "Fluid Encapsulation Target", pack: "Lymph Flow Pack", color: "#ec4899" },
    { id: "cervical-dysplasia", title: "Cervical Cell Defense", organ: "Reproductive", condition: "Cervical Dysplasia", focus: "Cellular Mutation Arrest", pack: "Cervical Health Pack", color: "#ef4444" },
    { id: "adrenal-fatigue", title: "Cortisol Balance", organ: "Endocrine", condition: "Adrenal Fatigue", focus: "HPA Axis Restoration", pack: "Adrenal Restore Pack", color: "#f59e0b" },
    { id: "insulin-resistance", title: "Receptor Sensitization", organ: "Endocrine", condition: "Pre-Diabetes", focus: "Insulin Affinity Enhancement", pack: "Glucose Balance Pack", color: "#10b981" },
    { id: "hypoglycemia", title: "Glycemic Stability", organ: "Metabolic", condition: "Hypoglycemia", focus: "Hepatic Glycogen Release", pack: "Stable Sugar Pack", color: "#84cc16" },
    { id: "pcos", title: "Ovarian Cyst Dispersal", organ: "Reproductive", condition: "PCOS Recovery", focus: "Androgen/Estrogen Ratio Fix", pack: "Ova-Balance Pack", color: "#d946ef" },
    { id: "hyperthyroidism", title: "Thyroid Pacifier", organ: "Endocrine", condition: "Hyperthyroidism", focus: "Thyroxine Overproduction Block", pack: "Thyro-Calm Pack", color: "#14b8a6" },
    { id: "sleep-apnea", title: "Airway Tension", organ: "Respiratory", condition: "Sleep Apnea", focus: "Oropharyngeal Muscle Tone", pack: "Airway Clear Pack", color: "#0ea5e9" },
    { id: "macular-degeneration", title: "Retinal Regeneration", organ: "Ocular", condition: "Macular Degeneration", focus: "Photoreceptor Cell Rescue", pack: "Macular Guard Pack", color: "#f97316" },
    { id: "dry-eye", title: "Lacrimal Gland Boost", organ: "Ocular", condition: "Dry Eye Syndrome", focus: "Tear Film Stabilization", pack: "Aqua-Vision Pack", color: "#3b82f6" },
    { id: "hay-fever", title: "Histamine Block", organ: "Immune", condition: "Allergic Rhinitis", focus: "Mast Cell Stabilization", pack: "Allergy Defense Pack", color: "#eab308" },
    { id: "sinusitis", title: "Sinus Cavity Drain", organ: "Respiratory", condition: "Sinusitis", focus: "Mucociliary Escalator", pack: "Sinus Clear Pack", color: "#8b5cf6" },
    { id: "alopecia", title: "Follicular Revival", organ: "Integumentary", condition: "Hair Loss", focus: "Dermal Papilla Stimulation", pack: "Hair Restore Pack", color: "#ec4899" },
    { id: "vitiligo", title: "Melanocyte Protection", organ: "Integumentary", condition: "Vitiligo Early Support", focus: "Pigment Auto-Immune Shield", pack: "Melanin Matrix Pack", color: "#ef4444" },
    { id: "rosacea", title: "Vascular Dermal Calm", organ: "Integumentary", condition: "Rosacea", focus: "Connective Tissue Microvessels", pack: "Redness Relief Pack", color: "#10b981" },
    { id: "shingles", title: "Viral Nerve Dormancy", organ: "Neurological", condition: "Shingles Post-Care", focus: "Varicella Zoster Suppression", pack: "Nerve Shield Pack", color: "#6366f1" },
    { id: "food-allergy", title: "Intestinal Tolerance", organ: "Immune", condition: "Food Sensitivities", focus: "Gut Immunology Modulator", pack: "Toleragen Pack", color: "#14b8a6" },
    { id: "anorexia", title: "Appetite Restoration", organ: "Metabolic", condition: "Anorexia Recovery", focus: "Ghrelin Signaling Activation", pack: "Nourish Plus Pack", color: "#f97316" },
    { id: "cellulite", title: "Adipose Matrix Firm", organ: "Integumentary", condition: "Cellulite Reduction", focus: "Subcutaneous Fat Remodeling", pack: "Derma-Firm Pack", color: "#eab308" },
    { id: "hives", title: "Acute Histamine Clear", organ: "Immune", condition: "Urticaria (Hives)", focus: "Systemic Inflammatory Quell", pack: "Hive Relief Pack", color: "#ec4899" },
    { id: "gingivitis", title: "Periodontal Guard", organ: "Oral", condition: "Gingivitis", focus: "Gum Tissue Vascularization", pack: "Gingiva Defense Pack", color: "#84cc16" },
    { id: "scurvy", title: "Collagen Synthesis", organ: "Systemic", condition: "Vitamin C Deficit", focus: "Ascorbic Acid Integration", pack: "Vitality C Pack", color: "#ef4444" },
    { id: "herpes", title: "HSV Suppression", organ: "Immune", condition: "Herpes Dormancy", focus: "Viral Envelope Disruption", pack: "Cellular Shield Pack", color: "#06b6d4" },
    { id: "burns", title: "Epithelial Repair", organ: "Integumentary", condition: "Burn Healing", focus: "Fibroblast Acceleration", pack: "Tissue Restore Pack", color: "#d946ef" }
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
            ch.condition.split(' ')[0].split('-')[0] + " <br> <em class='text-[#d4a017] italic'>Restoration.</em>");
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

// Ensure the new ones get added to the library index if we update the library script.
// But for now we just log them out.
console.log("Successfully generated", challenges.length, "MORE NEW health challenge guides!");

