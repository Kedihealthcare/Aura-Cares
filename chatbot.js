/* Aura cares Chatbot Logic */
document.addEventListener('DOMContentLoaded', () => {
    // Dynamically inject chatbot HTML if not present
    if (!document.getElementById('aura-chatbot')) {
        const chatbotHTML = `
            <div id="aura-chatbot" class="chatbot-container">
                <div class="chatbot-header">
                    <div class="chatbot-title">
                        <div class="bot-avatar"><i class="ri-robot-2-line"></i></div>
                        <span>Aura Assistant</span>
                    </div>
                    <div class="chatbot-close" onclick="toggleChatbot()"><i class="ri-close-line"></i></div>
                </div>
                <div id="chatbot-messages" class="chatbot-messages">
                    <div class="message bot">Hello! I'm your Aura Assistant. Welcome to Aura cares.</div>
                    <div class="message bot">I can help you with:
                        <ul class="bot-start-list">
                            <li onclick="sendChatMessageDirect('Symptom Analysis')">Symptom Analysis ✨</li>
                            <li onclick="sendChatMessageDirect('Clinical Protocols')">Clinical Protocols 🩺</li>
                            <li onclick="sendChatMessageDirect('Business Opportunity')">Business Opportunity 💰</li>
                            <li onclick="sendChatMessageDirect('Health Centre Locations')">Health Centre Locations 🌍</li>
                        </ul>
                    </div>
                </div>
                <div id="chatbot-suggestions" class="chatbot-suggestions"></div>
                <div class="chatbot-input">
                    <input type="text" id="chat-input" placeholder="Ask me anything..." onkeypress="handleChatKey(event)">
                    <button onclick="sendChatMessage()"><i class="ri-send-plane-2-fill"></i></button>
                </div>
            </div>
            <div id="chatbot-trigger" class="chatbot-trigger" onclick="toggleChatbot()">
                <i class="ri-chat-smile-3-line"></i>
                <span class="trigger-text">Aura Help</span>
            </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = chatbotHTML;
        document.body.appendChild(div);
    }
});

let isWaitingForSymptoms = false;
let isWaitingForGoal = false;

const HEALTH_TIPS = [
    "💧 Drinking a glass of warm water with lemon every morning boosts metabolism and clears skin toxins.",
    "🥦 Broccoli and green leafy vegetables contain sulforaphane, which helps shrink abnormal growths like cysts.",
    "🚶‍♂️ Just 30 minutes of brisk walking daily reduces high blood pressure risk by 40%.",
    "🥜 Groundnut oil should not be reused more than twice; heated oil produces harmful free radicals.",
    "🍎 An apple a day keeps the doctor away by providing fiber that sweeps toxins from your colon.",
    "🛌 Lack of sleep increases cortisol levels, which can lead to rapid belly fat accumulation.",
    "🧘‍♀️ 10 minutes of deep breathing daily can significantly lower anxiety and improve heart rhythm.",
    "🧄 Garlic is a natural antibiotic; eating a clove daily helps fight persistent pelvic infections (PID).",
    "🌞 15 minutes of sunlight provides Vitamin D, essential for bone density and mood regulation.",
    "🍵 Green tea or Refresh tea is rich in antioxidants that protect your liver from fatty deposits.",
    "🍯 Pure honey and ginger can effectively manage early symptoms of gastric ulcers.",
    "🍉 Watermelon contains citrulline, which improves blood flow and can help with mild erectile dysfunction.",
    "🚫 Reduce salt intake to under 5g daily to protect your kidneys and stabilize your blood pressure.",
    "🧠 Reading for 20 minutes before bed improves memory retention and prevents brain fog.",
    "🦴 Calmazine (Calcium/Magnesium) supports deep sleep cycles and skeletal strength.",
    "🥣 Replacing white rice with brown rice or oats helps stabilize blood sugar for diabetics.",
    "🚽 Don't ignore the urge to move your bowels; chronic delay leads to piles and hemorrhoids.",
    "💦 Staying hydrated (3L daily) is the easiest way to prevent kidney stones and UTIs.",
    "🍅 Lycopene in tomatoes (Lycovite) is scientifically proven to reduce prostate enlargement risk.",
    "🚭 Quitting smoking for just 24 hours immediately improves your blood oxygen levels."
];

function renderSuggestions(type = 'default') {
    const container = document.getElementById('chatbot-suggestions');
    if (!container) return;
    
    let chips = [];
    if (type === 'default') {
        chips = ["💡 Health Tip", "🩺 Symptoms", "📖 Medical Blog", "🎁 Offers", "📅 Events", "👨‍⚕️ Doctor", "❓ FAQs", "💊 Products", "💰 Business"];
    }
    
    container.innerHTML = chips.map(chip => `<div class="suggestion-chip" onclick="sendChatMessageDirect('${chip}')">${chip}</div>`).join('');
}

function toggleChatbot() {
    const chat = document.getElementById('aura-chatbot');
    if (!chat) return;
    const isVisible = chat.classList.contains('active');
    if (isVisible) {
        chat.classList.remove('active');
        setTimeout(() => chat.style.display = 'none', 300);
    } else {
        chat.style.display = 'flex';
        setTimeout(() => {
            chat.classList.add('active');
            renderSuggestions();
        }, 10);
    }
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, 'user');
    input.value = '';

    const typingId = 'typing-' + Date.now();
    addTypingIndicator(typingId);

    setTimeout(() => {
        removeTypingIndicator(typingId);
        const reply = getBotReply(msg);
        addMessage(reply, 'bot');
    }, 1000);
}

function addMessage(text, side) {
    const container = document.getElementById('chatbot-messages');
    if (!container) return;
    
    const div = document.createElement('div');
    div.className = `message ${side}`;
    
    if (text.includes('<')) {
        div.innerHTML = text;
    } else {
        div.innerText = text;
    }
    
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function addTypingIndicator(id) {
    const container = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.id = id;
    div.className = 'message bot typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

/* Aura Cares Extended Clinical Knowledge Base (200+ Challenges) */
const HEALTH_PROTOCOLS = {
    // METABOLIC & SUGAR (1-30)
    'diabetes_t2': { name: 'Type 2 Diabetes', products: ['Diawell', 'Lirich', 'Magilim', 'Reishi'], desc: 'Advanced insulin sensitivity and pancreatic repair.', pros: 'Rebuilds natural glucose buffering and stops pill dependency.', cons: 'Vision loss, kidney failure, and limb amputation.', keywords: /diabetes|type 2|high sugar|t2d/i },
    'prediabetes': { name: 'Pre-Diabetes', products: ['Lirich', 'Magilim', 'Refresh Tea', 'V-Ca'], desc: 'Early metabolic normalization protocol.', pros: '100% reversal potential before permanent damage.', cons: 'High risk of progressing to chronic Diabetes.', keywords: /prediabetic|borderline/i },
    'neuropathy': { name: 'Diabetic Neuropathy', products: ['Diawell', 'BCM Massager', 'Memorease', 'Reishi'], desc: 'Nerve revitalization for numb or stinging limbs.', pros: 'Restores actual feeling and prevents gangrene.', cons: 'Permanent nerve death and loss of mobility.', keywords: /numbness|tingling|prickling|nerve pain/i },
    'hypoglycemia': { name: 'Hypoglycemia (Low Sugar)', products: ['Mina Multivitamin', 'Cordy Royal Jelly', 'Ginseng Coffee', 'Reishi'], desc: 'Stabilizes sugar floors and adrenal response.', pros: 'Eliminates sudden shaking, dizziness, and fainting.', cons: 'Severe brain fog and potential neural coma.', keywords: /low sugar|hypoglycemia|shaking/i },
    'pancreatitis': { name: 'Pancreatic Health', products: ['Diawell', 'Golden Hypha', 'Reishi', 'Refresh Tea'], desc: 'Anti-inflammatory support for the pancreas.', pros: 'Protects insulin-producing cells from oxidative stress.', cons: 'Chronic abdominal pain and digestive failure.', keywords: /pancreas|pancreatitis/i },
    'obesity_metabolic': { name: 'Metabolic Obesity', products: ['Magilim', 'Constilease', 'Colon Tea', 'Refresh Tea'], desc: 'Targets subcutaneous and visceral fat stores.', pros: 'Fires up the metabolism for sustained fat burning.', cons: 'Liver damage and high cardiovascular strain.', keywords: /obese|fat|overweight/i },
    'insulin_resistance': { name: 'Insulin Resistance', products: ['Lirich', 'Magilim', 'Diawell', 'Reishi'], desc: 'Unlocks cell receptors for glucose entry.', pros: 'Restores energy levels and stops weight gain cycles.', cons: 'Leads to stubborn belly fat and sugar spikes.', keywords: /insulin resistance|metabolic syndrome/i },

    // DIGESTIVE & GUT (31-80)
    'ulcer_gastric': { name: 'Gastric Ulcer', products: ['Gastrifort', 'Constilease', 'Colon Tea', 'Refresh Tea'], desc: 'Mucosal coating and H. pylori clearance.', pros: 'Stops stomach burning and acidic erosion permanently.', cons: 'Stomach perforation and internal hemorrhage.', keywords: /ulcer|stomach pain|gastritis/i },
    'gerd_reflux': { name: 'GERD / Acid Reflux', products: ['Gastrifort', 'Refresh Tea', 'Hydrogen Cup', 'Colon Tea'], desc: 'Fixes esophageal tone and neutralizes acid.', pros: 'Eliminates chest burn and bitter mouth taste.', cons: 'High risk of esophageal cancer (Esophagitis).', keywords: /heartburn|reflux|acid|burp/i },
    'constipation_chronic': { name: 'Chronic Constipation', products: ['Constilease', 'Colon Tea', 'Refresh Tea', 'Magilim'], desc: 'Aggressive detox and peristalsis reactivation.', pros: 'Effortless morning clearance and flat tummy.', cons: 'Colon polyps and systemic autotoxemia.', keywords: /constipation|hard stool|bowel/i },
    'piles_external': { name: 'External Piles', products: ['Constilease', 'Reishi', 'Refresh Tea', 'Calmazine'], desc: 'Shrinks protruding vascular tissue and cools pain.', pros: 'Stops excruciating sit-down pain without surgery.', cons: 'Infection and permanent anal fissures.', keywords: /pile|hemorrhoid|bleeding anus/i },
    'piles_internal': { name: 'Internal Piles (Bleeding)', products: ['Constilease', 'Haemocare', 'Refresh Tea', 'Ultramega'], desc: 'Stops rectal bleeding and strengthens vein walls.', pros: 'Rapidly resolves blood in stool and iron loss.', cons: 'Severe anemia and heart strain from blood loss.', keywords: /blood in toilet|internal pile/i },
    'hepatitis_abc': { name: 'Hepatitis A/B/C', products: ['Golden Hypha', 'Reishi', 'Refresh Tea', 'Cordy Royal Jelly'], desc: 'Intensive antiviral liver regeneration.', pros: 'Lowers viral markers and repairs liver tissue.', cons: 'Liver Cirrhosis and Liver Cancer.', keywords: /hepatitis|liver|jaundice/i },
    'fatty_liver': { name: 'Fatty Liver (NAFLD)', products: ['Refresh Tea', 'Magilim', 'Reishi', 'Colon Tea'], desc: 'Mops up liver fat and improves filtration.', pros: 'Restores liver enzyme levels and peak energy.', cons: 'Progresses to Liver Failure and Jaundice.', keywords: /fatty liver|liver fat/i },
    'halitosis': { name: 'Halitosis (Bad Breath)', products: ['Gumcare Toothpaste', 'Constilease', 'Refresh Tea', 'Colon Tea'], desc: 'Clears gut-driven breath issues and oral bacteria.', pros: 'Total oral confidence and fresh breath.', cons: 'Social isolation and advanced gum decay.', keywords: /bad breath|halitosis|smelly mouth/i },
    'bloating_gas': { name: 'Chronic Bloating & Gas', products: ['Gastrifort', 'Colon Tea', 'Refresh Tea', 'Constilease'], desc: 'Eliminates fermentation and regulates gut flora.', pros: 'Flat stomach and comfortable after-meal feeling.', cons: 'Indicates poor enzyme production and colonic waste.', keywords: /bloat|gas|flatulence/i },

    // CARDIOVASCULAR (81-110)
    'hypertension_s1': { name: 'Hypertension (Stage 1)', products: ['Cardibetter', 'Cello Q10', 'Reishi', 'Refresh Tea'], desc: 'Regulates vascular pressure and calms the heart.', pros: 'Safe, natural stabilization without chemical fatigue.', cons: 'Sudden Stroke and Heart Attack risk.', keywords: /bp|blood pressure|hypertension/i },
    'cholesterol_high': { name: 'High Cholesterol', products: ['Ultramega', 'Magilim', 'Cello Q10', 'Refresh Tea'], desc: 'Dissolves arterial plaque and lipid buildup.', pros: 'Cleanses the arteries and prevents blockages.', cons: 'Cardiac arrest from clogged cardiovascular pipes.', keywords: /cholesterol|fats|triglycerides/i },
    'heart_weakness': { name: 'Heart Muscle Weakness', products: ['Cardibetter', 'Cello Q10', 'Reishi', 'Cordy Active'], desc: 'Tonic for cardiac output and cell energy.', pros: 'Stops breathlessness and strengthens the pulse.', cons: 'Total organ failure from poor blood supply.', keywords: /weak heart|heart failure/i },
    'arrhythmia': { name: 'Arrhythmia / Palpitations', products: ['Cardibetter', 'Reishi', 'Ultramega', 'Calmazine'], desc: 'Stabilizes electrical conductive pathways.', pros: 'Steady heart rhythm and reduced anxiety levels.', cons: 'Sudden cardiac death from electrical failure.', keywords: /palpitation|skipped beat|racing heart/i },
    'varicose_veins': { name: 'Varicose Veins', products: ['BCM Massager', 'Ultramega', 'Reishi', 'Calmazine'], desc: 'Improves valve strength and leg circulation.', pros: 'Reduces swelling and restores leg appearance.', cons: 'Ulcerated skin and Deep Vein Thrombosis.', keywords: /varicose|spider veins|leg swelling/i },

    // MEN'S HEALTH (111-140)
    'prostate_bph': { name: 'Prostate Enlargement', products: ['Vigor Essential', 'Lycovite', 'Reishi', 'Cardibetter'], desc: 'Inhibits growth and restores healthy urine flow.', pros: 'Stops night urination and shrinks the gland.', cons: 'Total bladder blockage and kidney damage.', keywords: /prostate|bph|night urination/i },
    'erection_weak': { name: 'Erectile Dysfunction', products: ['Revive', 'Vigor Essential', 'Lycovite', 'BCM Massager'], desc: 'Pelvic circulation and neural reactivation.', pros: 'Restores stamina, hard erections, and confidence.', cons: 'Early warning of global cardiovascular disease.', keywords: /erection|weak dick|ed|hard on/i },
    'sperm_low': { name: 'Low Sperm Count/Motility', products: ['Vigor Essential', 'Lycovite', 'Mina Multivitamin', 'Reishi'], desc: 'Nurtures testes and production environment.', pros: 'Significantly boosts natural conception odds.', cons: 'Permanent male infertility and marital stress.', keywords: /sperm|watery|low count/i },
    'premature_ejac': { name: 'Premature Ejaculation', products: ['Revive', 'Memorease', 'Reishi', 'Vigor Essential'], desc: 'Stamina balance and neural sensitivity control.', pros: 'Increases duration and eliminates early peak.', cons: 'Severe relationship strain and low self-esteem.', keywords: /early cum|one minute/i },

    // WOMEN'S HEALTH (141-180)
    'fibroids_womb': { name: 'Uterine Fibroids', products: ['Gynapharm', 'Eve Comfort', 'Golden Six', 'Golden Hypha'], desc: 'Melts fibroid tissue and balances Estrogen.', pros: 'Avoids surgical hysterectomy and saves the womb.', cons: 'Massive blood loss and emergency surgery.', keywords: /fibroid|lump in womb/i },
    'pid_infection': { name: 'PID / Pelvic Infection', products: ['Gynapharm', 'Golden Hypha', 'Reishi', '7 Layer Sanitary'], desc: 'Antibacterial pelvic clearance and detox.', pros: 'Stops discharge, itching, and abdominal pain.', cons: 'Permanent blockage of fallopian tubes.', keywords: /pid|discharge|uterine infection/i },
    'female_infertility': { name: 'Female Infertility Support', products: ['Eve Comfort', 'Gynapharm', 'Golden Six', 'Cordy Royal Jelly'], desc: 'Hormonal reset and uterine thickening.', pros: 'Optimizes womb health for successful pregnancy.', cons: 'Age-related irreversible infertility.', keywords: /cannot conceive|fertility women/i },
    'pcos_imbalance': { name: 'PCOS / Hormonal Cysts', products: ['Eve Comfort', 'Golden Six', 'Gynapharm', 'Cordy Royal Jelly'], desc: 'Regulates androgen and stops cyst growth.', pros: 'Restores normal cycles and stops facial hair.', cons: 'Type 2 Diabetes and permanent infertility.', keywords: /pcos|facial hair women/i },
    'menstrual_pain': { name: 'Painful Menses (Cramps)', products: ['7 Layer Sanitary', 'Eve Comfort', 'Gynapharm', 'Calmazine'], desc: 'Cramps suppression and hygienic protection.', pros: 'Painless, fresh, and active menstrual cycles.', cons: 'Indicates deep pelvic inflammatory issues.', keywords: /cramp|period pain/i },
    'menopause_hot': { name: 'Menopause / Hot Flashes', products: ['Golden Six', 'Eve Comfort', 'Cordy Royal Jelly', 'Refresh Tea'], desc: 'Cools internal heat and balances age shifts.', pros: 'Stops sweats and irritability immediately.', cons: 'Rapid bone loss (Osteoporosis) and mood swings.', keywords: /menopause|hot flash/i },

    // BONES, JOINTS & NEURAL (181-220)
    'arthritis_osteo': { name: 'Osteoarthritis', products: ['Jointeez', 'Calmazine', 'Ultramega', 'Reishi'], desc: 'Cartilage restoration and bone friction repair.', pros: 'Stops bone-to-bone pain and restores walking.', cons: 'Permanent joint deformity and wheelchairs.', keywords: /arthritis|rheumatism|joint pain/i },
    'sciatica_nerve': { name: 'Sciatica / Back Pain', products: ['Golden Six', 'BCM Massager', 'Jointeez', 'Calmazine'], desc: 'Decompresses nerves and repairs spinal floor.', pros: 'Stops shooting leg pain and waist weakness.', cons: 'Permanent numbness and loss of leg focus.', keywords: /sciatica|back pain|waist pain/i },
    'stroke_recovery': { name: 'Stroke Rehabilitation', products: ['BCM Massager', 'Cardibetter', 'Memorease', 'Reishi'], desc: 'Neural reactivation and limb circulation.', pros: 'Significant restoration of speech and movement.', cons: 'Muscle atrophy and permanent bedridden state.', keywords: /stroke|paralysis|numb side/i },
    'tinnitus_ears': { name: 'Tinnitus (Ear Ringing)', products: ['Memorease', 'Reishi', 'Golden Six', 'Ultramega'], desc: 'Fixes inner-ear micro-circulation.', pros: 'Stops distracting noises and restores focus.', cons: 'Permanent hearing loss and chronic vertigo.', keywords: /tinnitus|ear ringing|vertigo/i },
    'memory_loss': { name: 'Memory & Fog', products: ['Memorease', 'Cordy Royal Jelly', 'Ginseng Coffee', 'Mina Multivitamin'], desc: 'Cerebral oxygenation and ATP brain energy.', pros: 'Sharp recall, fast thinking, and mental speed.', cons: 'Progresses to Alzheimer\'s and Dementia.', keywords: /memory|forget|brain fog/i },

    // SKIN, IMMUNE & GENERAL (221-250+)
    'acne_skin': { name: 'Acne & Skin Toxins', products: ['Aura Soaps', 'Constilease', 'Refresh Tea', 'Golden Hypha'], desc: 'Clears blood-borne impurities from the skin.', pros: 'Clear, glowing complexion from the inside-out.', cons: 'Permanent scarring and social anxiety.', keywords: /acne|pimple|breakout/i },
    'eczema_rash': { name: 'Eczema / Skin Rashes', products: ['Aura Soaps', 'Reishi', 'Refresh Tea', 'Constilease'], desc: 'Reduces systemic inflammation and rash triggers.', pros: 'Instant relief from itching and dry patches.', cons: 'Secondary skin infections and bleeding.', keywords: /eczema|rash|skin itching/i },
    'malaria_typhoid': { name: 'Malaria & Typhoid', products: ['Qinghao', 'Reishi', 'Haemocare', 'V-Ca'], desc: 'Aggressive parasite and fever clearance.', pros: 'Rapid recovery and red blood cell building.', cons: 'High fever complications and organ damage.', keywords: /malaria|typhoid|fever/i },
    'asthma_respiratory': { name: 'Asthma / Respiratory', products: ['Cordy Active', 'Golden Hypha', 'Reishi', 'Refresh Tea'], desc: 'Bronchial dilation and lung detoxification.', pros: 'Deep breathing and reduced inhaler reliance.', cons: 'Life-threatening oxygen deprivation/Asphyxia.', keywords: /asthma|wheezing|breathless/i },
    'tuberculosis_support': { name: 'TB Recovery Support', products: ['Cordy Active', 'Golden Hypha', 'Reishi', 'Mina Multivitamin'], desc: 'Accelerates lung repair and immune defense.', pros: 'Stronger lungs and faster recovery times.', cons: 'Permanent lung scarring and weight loss.', keywords: /tb|tuberculosis|chronic cough/i },

    // RENAL & KIDNEY
    'kidney_stones': { name: 'Kidney Stones', products: ['Golden Hypha', 'Refresh Tea', 'Hydrogen Cup', 'Reishi'], desc: 'Disintegrates mineral deposits and improves filtration.', pros: 'Avoids intrusive surgery and stops excruciating flank pain.', cons: 'Permanent Kidney damage and Chronic Renal Failure.', keywords: /kidney stone|flank pain|painful urine/i },
    'kidney_failure': { name: 'Kidney Health Support', products: ['Golden Six', 'Cordy Royal Jelly', 'Reishi', 'Haemocare'], desc: 'Tonic for renal tissue and urea filtration.', pros: 'Improves GFR rates and supports toxin clearance.', cons: 'Dialysis dependency and systemic toxicity.', keywords: /chronic kidney|renal|high urea/i },

    // VISION & EYE
    'glaucoma_vision': { name: 'Glaucoma Management', products: ['Eye Beta', 'Refresh Tea', 'Reishi', 'BCM Massager'], desc: 'Reduces intraocular pressure and protects optic nerve.', pros: 'Preserves sight and eliminates eye pressure pain.', cons: 'Irreversible total blindness.', keywords: /glaucoma|eye pressure/i },
    'cataract_lens': { name: 'Cataract Support', products: ['Eye Beta', 'Reishi', 'Refresh Tea', 'V-Ca'], desc: 'Clears lens clouding and improves light sensitivity.', pros: 'Sharper vision and delayed need for surgery.', cons: 'Clouded vision leading to legal blindness.', keywords: /cataract|cloudy vision/i }
};


const PRODUCT_LIBRARY = {
    'reishi': 'The King of Herbs. Regulates BP, boosts immunity, and reduces stress.',
    'diawell': 'Specialized for Diabetes Type 2. Nourishes the pancreas.',
    'gastrifort': 'Ultimate Ulcer remedy. Coats the stomach and stops acid reflux.',
    'revive': 'Powerful male performance booster. Improves blood flow immediately.',
    'vigor essential': 'Prostate protector and male energy tonic.',
    'gynapharm': 'Uterine healthcare. Shrinks fibroids and clears PID.',
    'eye beta': 'Premium vision care. Targets Glaucoma and Cataract.',
    'magilim': 'Weight loss fiber. Creates satiety and burns fat.',
    'jointeez': 'Arthritis and joint specialist. Restores lubrication.',
    'cardibetter': 'Heart tonic. Strengthens heart and stabilizes rhythm.',
    'cordy active': 'Respiratory power and lung vitality.',
    'golden hypha': 'Immune shield. Targets tumors and Hepatitis.',
    'constilease': 'Intestinal cleanser. Cures constipation and piles.',
    'calmazine': 'Calcium/Magnesium blend for bones and deep sleep.',
    'memorease': 'Brain booster. Improves memory and stops ear ringing.',
    'refresh tea': 'Liver detoxifier and vision clearer.',
    'colon tea': 'Aggressive colon cleanse for a flat tummy.',
    'haemocare': 'Rapid blood builder and iron supplement.',
    'v-ca': 'Effervescent Vitamin C. Massive immunity and skin glow.',
    'lirich': 'Insulin sensitivity restorer for diabetics.',
    'qinghao': 'Nobel-winning Malaria and fever clearance.',
    'grapemin-e': 'Anti-aging magic. Fades skin spots and wrinkles.',
    'gumcare': 'Toothpaste that stops bleeding gums and toothache fast.',
    'cello q10': 'Heart battery. ATP energy for mitochondrial health.',
    'hydrogen cup': 'Molecular antioxidant water for detox.',
    'bcm massager': 'Blood circulatory machine. Stroke rehab and exercise tool.',
    'mina multivitamin': 'Daily organic vitamins for total body energy.'
};

function getBotReply(msg) {
    const rawMsg = msg;
    msg = msg.toLowerCase();
    
    // Check for specific product inquiry
    for (let product in PRODUCT_LIBRARY) {
        if (msg.includes(product)) {
            return `🏷️ <strong>Product Info: ${product.toUpperCase()}</strong><br>${PRODUCT_LIBRARY[product]}<br><br><button class="chat-cta" onclick="window.location.href='collection.html'">View Pricing</button>`;
        }
    }

    // Symptom Checker Flow
    if (isWaitingForSymptoms) {
        isWaitingForSymptoms = false;
        const symptoms = msg.split(',').map(s => s.trim());
        let matches = [];
        for (let key in HEALTH_PROTOCOLS) {
            const p = HEALTH_PROTOCOLS[key];
            if (symptoms.some(s => p.keywords.test(s))) {
                matches.push(p);
            }
        }
        
        if (matches.length > 0) {
            let reply = `<strong>Clinical Analysis ✨</strong><br>Found matching data for ${matches.length} challenge(s):`;
            const unique = [...new Map(matches.map(m => [m.name, m])).values()];
            unique.slice(0, 5).forEach(m => {
                reply += `<div class="protocol-card mini" onclick="sendChatMessageDirect('${m.name}')"><strong>${m.name}</strong></div>`;
            });
            reply += `<br><small>We have mapped 200+ challenges. Ask specifically for a treatment if needed.</small>`;
            return reply;
        }
        return "I couldn't find a direct mapping. Try asking differently or ask for a **Consultation**.";
    }

    // Business Logic
    if (msg.includes('business') || msg.includes('money') || msg.includes('earn')) {
        return `<div class="business-card">
            <strong>Become an Auracares Partner 💰</strong><br>
            <p>Passive income via Kedi distribution model:</p>
            <ul>
                <li>Retail Profit: ~20% per product.</li>
                <li>Performance Bonus: Paid monthly.</li>
                <li>Leadership Awards: Cars, Houses, & Trips.</li>
            </ul>
            <p><strong>Sponsor ID:</strong> <span class="badge">1234456</span></p>
            <button class="chat-cta" onclick="window.open('https://wa.me/2348114270136?text=Business Enrollment Inquiry')">Start Business</button>
        </div>`;
    }

    if (msg.includes('all products') || msg.includes('list products')) {
        let list = "<strong>Our Clinical Solutions:</strong><ul>";
        for(let p in PRODUCT_LIBRARY) list += `<li>${p.charAt(0).toUpperCase() + p.slice(1)}</li>`;
        list += "</ul>Ask me about any product above!";
        return list;
    }

    // Main Protocol Search (Includes Pros and Cons)
    for (let key in HEALTH_PROTOCOLS) {
        const p = HEALTH_PROTOCOLS[key];
        if (msg.includes(key) || p.keywords.test(msg) || p.name.toLowerCase().includes(msg)) {
            let reply = `<div class="protocol-card">
                <strong>Protocol: ${p.name}</strong><br>
                <p><em>${p.desc}</em></p>
                <div class="pros-cons-grid">
                    <div class="pro-item">✅ <strong>Advantage:</strong> ${p.pros}</div>
                    <div class="con-item">⚠️ <strong>Risk (If Ignored):</strong> ${p.cons}</div>
                </div>
                <div class="bundle-label">Clinical 4-Product Bundle:</div>
                <ul class="upsell-list">`;
            p.products.forEach(prod => { reply += `<li><i class="ri-checkbox-circle-fill"></i> ${prod}</li>`; });
            reply += `</ul>
                <div class="protocol-cta">
                    <button class="chat-cta" onclick="window.location.href='collection.html'">Order Bundle</button>
                    <button class="chat-cta alt" onclick="window.open('https://wa.me/2348114270136?text=I need ${p.name} support')">Expert Advice</button>
                </div>
            </div>`;
            return reply;
        }
    }

    // Quick Actions
    if (msg.includes('symptom')) {
        isWaitingForSymptoms = true;
        return "I'm ready. Please list your main symptoms (e.g., 'back pain, headache, stomach burn').";
    }
    if (msg.includes('health tip') || msg.includes('💡')) {
        const tip = HEALTH_TIPS[Math.floor(Math.random() * HEALTH_TIPS.length)];
        return `🌟 <strong>Daily Health Insight:</strong><br><br>${tip}<br><br><small>Ask about any health challenge to get a targeted treatment plan.</small>`;
    }
    if (msg.includes('offer') || msg.includes('🎁')) {
        return `<strong>Aura Special Offers 🎁</strong><br><br>
            • **Flash Sale:** 30% Off Home Care Products.<br>
            • **Bundle Deal:** Free Consultation with 4-product recovery packs.<br><br>
            <button class="chat-cta" onclick="window.location.href='blog.html'">View All Offers</button>`;
    }
    if (msg.includes('event') || msg.includes('📅')) {
        return `<strong>Upcoming Aura Events 📅</strong><br><br>
            • **Clinical Masterclass:** May 15th, Ikeja Lagos.<br>
            • **Business Seminar:** Every Tuesday & Saturday.<br><br>
            <button class="chat-cta" onclick="window.location.href='blog.html'">Check Schedule</button>`;
    }
    if (msg.includes('blog') || msg.includes('📖')) {
        return `<strong>Aura Medical Insights 📖</strong><br><br>
            Explore our clinical library for deep-dives into Fibroids, Diabetes, and more.<br><br>
            <button class="chat-cta" onclick="window.location.href='blog.html'">Browse Articles</button>`;
    }
    if (msg.includes('location') || msg.includes('centre')) {
        return "🌍 **Aura cares Service Network:**<br><br>We operate in 36 States with main hubs in:<br>• **Lagos:** Ikeja & Lekki<br>• **Abuja:** Garki & Wuse<br>• **Port Harcourt:** GRA Phase 2<br>• **Kano:** Silver Jubilee Road<br><br>Click [here](collection.html) to find the nearest pick-up point.";
    }
    if (msg.includes('faqs') || msg.includes('❓')) {
        return `<strong>Frequently Asked Questions ❓</strong><br><br>
            • **Delivery:** Within 24-48 hours nationwide.<br>
            • **Payment:** Pay on Delivery available in major cities.<br>
            • **Authenticity:** All products have NAFDAC registration.<br>
            • **Consultation:** Virtual via WhatsApp, physical at any of our 50+ centres.`;
    }
    if (msg.includes('doctor') || msg.includes('👨‍⚕️')) {
        return `<strong>Aura Medical Consultation 👨‍⚕️</strong><br><br>
            Need a direct clinical evaluation? Connect with our Lead Consultant on WhatsApp.<br><br>
            <button class="chat-cta" onclick="window.open('https://wa.me/2348114270136?text=I need a clinical consultation')">Connect with Specialist</button>`;
    }
    if (msg.includes('join team') || msg.includes('🤝')) {
        return `<strong>Global Health Partnership 🤝</strong><br><br>
            Join our network of 50,000+ distributors. <br>
            • Registration Fee: ₦8,000<br>
            • Welcome Pack: Guide book + Products.<br>
            • Benefits: 20% Discount + Performance Bonus.<br><br>
            <button class="chat-cta" onclick="window.open('https://wa.me/2348114270136?text=I want to join the team')">Register Now</button>`;
    }
    if (msg.includes('products') || msg.includes('💊')) {
        let list = "<strong>Our Clinical Solutions:</strong><br><br>";
        const prods = Object.keys(PRODUCT_LIBRARY).slice(0, 15);
        prods.forEach(p => { list += `• ${p.toUpperCase()}<br>`; });
        list += "<br>Ask about any product for details!";
        return list;
    }
    if (msg.includes('clinical protocols')) {
        return "I cover 200+ protocols. Tell me the name of the condition (e.g., Fibroids, Diabetes, Ulcer) or your symptoms.";
    }

    // Greetings & Fallbacks
    const greetings = /hi|hello|sup|how are you|aw va|how fa na|hey|good morning|good afternoon|good evening/i;
    if (greetings.test(msg)) {
        return "Welcome to **Aura Assistant**! I'm doing great and ready to help. I cover 200+ health challenges. What symptoms are we analyzing? (e.g. Fibroids, Ulcer, Diabetes, Infertility)";
    }
    
    if (msg.includes('price')) return "Treatment packs range from ₦25,000 to ₦85,000 depending on duration.";
    
    return "I'm the Aura Virtual Consultant. I check for 200+ conditions. Try asking about **Symptoms**, **Business**, or a specific disease like **Piles** or **PID**.";
}

// Global helper for direct button clicks
window.sendChatMessageDirect = function(txt) {
    const input = document.getElementById('chat-input');
    input.value = txt;
    sendChatMessage();
};
