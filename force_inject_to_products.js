const fs = require('fs');
const path = require('path');

const templateHtml = fs.readFileSync('product-template.html', 'utf8');

// Extract the exact HTML blocks from product-template.html
const startCommentStr = '<!-- ======= SECTION: COMMENT SYSTEM ======= -->';
const endCommentStr = '<!-- ======= SECTION NINE: PRODUCT CATALOG (NEW) ======= -->';
const blocksToInject = templateHtml.split(startCommentStr)[1].split(endCommentStr)[0];
const fullInjection = startCommentStr + blocksToInject;

const products = [
    'reishi.html', 'gastrifort.html', 'eye-beta.html', 'constilease.html', 'magilim.html',
    'diawell.html', 'gynapharm.html', 'golden-hypha.html', 'lycovite.html', 'cordy-royal-jelly.html',
    'seven-layer-sanitary.html', 'revive.html', 'eve-comfort.html', 'cordy-active.html', 'jointeez.html',
    'ultramega.html', 'calmazine.html', 'haemocare.html', 'multivitamin.html', 'v-ca.html',
    'lirich.html', 'qinghao.html', 'refresh-tea.html', 'colon-tea-cleanser.html', 'massage-machine.html',
    'hydrogen-cup.html', 'aura-soaps.html', 'memorease.html', 'vigor-essential.html', 'vip-massage-chair.html',
    'detox-patch.html', 'grapemin-e.html', 'gumcare.html', 'cello-q10.html', 'cadibetter.html',
    'ginseng-coffee.html', 'golden-six.html', 'hemastat.html', 'gastroshield.html', 'hepatotone.html',
    'gastrocore.html', 'optimin.html', 'endocrinderm.html', 'longevistat.html', 'neurosense.html',
    'auraflow.html', 'megagen.html', 'ocuprime.html', 'optivigor.html', 'biopeak.html',
    'vitastat.html', 'auraflex.html', 'arthroplus.html', 'renalboost.html', 'hepatovance.html',
    'ultrasense.html', 'pulmozyme.html', 'osteosense.html', 'neuroguard.html', 'vitacore.html',
    'neuropeak.html', 'vitaltox.html', 'dermagen.html', 'ultraboost.html', 'hemavigor.html',
    'immunocare.html', 'synpro.html', 'ultravance.html', 'celloxi.html', 'dermavigor.html',
    'auravance.html', 'ocuguard.html', 'myocell.html', 'hepatobiotics.html', 'lipidpeak.html',
    'gastrogen.html', 'neurovance.html', 'neuroflow.html', 'vitaeze.html', 'renalsense.html',
    'myocare.html', 'neuroplus.html', 'biocare.html', 'renalcell.html', 'gastrostat.html'
];

let updatedCount = 0;

for (const p of products) {
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        let changed = false;

        // Ensure comment system and community buzz don't duplicate
        if (!content.includes('id="comments-thread"') && !content.includes('id="community"')) {
            if (content.includes('<!-- ======= SECTION NINE: PRODUCT CATALOG (NEW) ======= -->')) {
                content = content.replace('<!-- ======= SECTION NINE: PRODUCT CATALOG (NEW) ======= -->', fullInjection + '\n        <!-- ======= SECTION NINE: PRODUCT CATALOG (NEW) ======= -->');
                changed = true;
            }
        } else {
            // Already there? Make sure it's the updated one. For safety we just replace the whole section between <!-- ======= SECTION: COMMENT SYSTEM ======= --> and <!-- ======= SECTION NINE: PRODUCT CATALOG (NEW) ======= -->
            if (content.includes(startCommentStr) && content.includes(endCommentStr)) {
                const regex = new RegExp(startCommentStr + '[\\s\\S]*?' + endCommentStr);
                content = content.replace(regex, startCommentStr + blocksToInject + endCommentStr);
                changed = true;
            }
        }

        // Fix the Testimonial Slider Headings in product pages
        const oldTestiStart = `<div class="testi-header">
                <span class="tag">Community Voice</span>
                <h2>Global <em class="highlight">Success Stories</em></h2>
            </div>`;
        const newTestiStart = `<div class="testi-header">
                <span class="tag">Aura Verified Network</span>
                <h2>Community <em class="highlight">Discussions.</em></h2>
            </div>`;
        
        if (content.includes(oldTestiStart)) {
            content = content.replace(oldTestiStart, newTestiStart);
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(p, content);
            updatedCount++;
        }
    }
}

console.log(`Force-injected missing sections to ${updatedCount} legacy product pages!`);
