const fs = require('fs');
const path = require('path');
const seoGenerator = require('./seo_generator');

/**
 * MASTER BUILD SYSTEM v4.0 (Full Standardization)
 * - Load Clinical Master Database (app.json)
 * - Force Regenerate all Product Pages from Template
 * - Populate Indications, Highlights, and Metadata
 * - Synchronize Global UI Components
 */

const APP_DATA = JSON.parse(fs.readFileSync('app.json', 'utf8'));
const CATALOG = APP_DATA.product_catalog;
const TEMPLATE_PATH = 'product-template.html';

function build() {
    console.log('--- AURA CARES MASTER BUILD v4.5 STARTED ---');

    if (!fs.existsSync(TEMPLATE_PATH)) {
        console.error('CRITICAL: product-template.html missing!');
        return;
    }

    const templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    const massiveCatalogHtml = generateCatalogHtml(CATALOG);
    const healthPacksHtml = generateHealthPacksHtml(APP_DATA.clinical_knowledge_base);
    const triviaHtml = generateTriviaHtml(CATALOG);
    const communityHtml = generateCommunityHtml(APP_DATA.social_previews);
    const footerHtml = generateFooterHtml();
    
    // BUILD PRODUCT PAGES
    CATALOG.forEach(product => {
        const filePath = `${product.id}.html`;
        console.log(`Standardizing: ${filePath}`);

        // ALWAYS start from template for 100% standardization
        let content = templateContent;

        // 1. Core Data Substitution
        content = applyProductData(content, product);
        
        // 2. Indications Grid
        const indicationsHtml = generateIndicationsHtml(product.indications || []);
        content = content.replace('{{INDICATIONS_GRID}}', indicationsHtml);

        // 3. Protocol Highlights
        const highlightsHtml = generateHighlightsHtml(product.keywords || product.indications || []);
        content = content.replace('{{PROTOCOL_HIGHLIGHTS}}', highlightsHtml);

        // 4. Global UI & Components Synchronization
        // Catalog
        if (content.includes('{{GLOBAL_CATALOG_SLIDER}}')) {
             content = content.replace('{{GLOBAL_CATALOG_SLIDER}}', massiveCatalogHtml);
        } else if (content.includes('<!-- Data Generator Will Inject the Master Slider Here via build.js -->')) {
             content = content.replace('<!-- Data Generator Will Inject the Master Slider Here via build.js -->', massiveCatalogHtml);
        } else {
             content = applyGlobalUI(content, massiveCatalogHtml);
        }

        // Health Packs
        if (content.includes('<!-- GLOBAL_HEALTHPACKS_INJECT -->')) {
            content = content.replace('<!-- GLOBAL_HEALTHPACKS_INJECT -->', healthPacksHtml);
        }

        // Trivia
        if (content.includes('<!-- GLOBAL_TRIVIA_INJECT -->')) {
            content = content.replace('<!-- GLOBAL_TRIVIA_INJECT -->', triviaHtml);
        }

        // Community
        if (content.includes('<!-- GLOBAL_COMMUNITY_INJECT -->')) {
            content = content.replace('<!-- GLOBAL_COMMUNITY_INJECT -->', communityHtml);
        }

        // Footer
        if (content.includes('<footer class="bg-[#4d231c]')) {
            const footerRegex = /<footer class="bg-\[#4d231c\][\s\S]*?<\/footer>/i;
            content = content.replace(footerRegex, `<footer class="bg-[#4d231c] text-white pt-24 pb-12 border-t border-white/5 mt-24">\n${footerHtml}\n</footer>`);
        }

        // FAQs
        const faqsHtml = generateFaqHtml(product.faqs || []);
        if (content.includes('<!-- FAQ Injection -->')) {
            content = content.replace('<!-- FAQ Injection -->', faqsHtml);
        } else if (content.includes('<div id="faq-list-container"></div>')) {
            content = content.replace('<div id="faq-list-container"></div>', `<div id="faq-list-container">${faqsHtml}</div>`);
        }

        // 5. SEO & Metadata
        const seoData = {
            ...product,
            title: `${product.name} | Aura cares Global Premium Supplement`,
            description: `Experience the power of Aura cares ${product.name}. Clinical grade ${product.clinical_name || 'herbal protocol'} for ${product.use}. NAFDAC Approved.`,
            canonicalUrl: `https://auracares.vercel.app/${product.id}.html`,
            ogImage: `https://auracares.vercel.app/${product.img}`,
            keyFacts: product.keywords ? product.keywords.slice(0, 5) : [product.use],
            dataKeywords: product.keywords ? product.keywords.slice(0, 5) : [product.name],
            searchTags: product.keywords || [product.name, 'Aura cares', 'Natural supplement']
        };

        const seoMetaObj = seoGenerator.generateSeoMetaTags(seoData);
        const seoTags = Object.values(seoMetaObj).join('\n    ');
        
        // Final SEO Injection
        if (content.includes('<!-- SEO_TAGS_INJECTED_HERE -->')) {
            content = content.replace('<!-- SEO_TAGS_INJECTED_HERE -->', seoTags);
        } else {
            content = content.replace(/<head>([\s\S]*?)<\/head>/i, (match, p1) => `<head>\n    ${seoTags}\n    ${p1}</head>`);
        }

        // 6. Final Polish & Variable Cleanup
        content = content.replace(/\[object Object\]/g, '');

        fs.writeFileSync(filePath, content);
    });

    // UPDATE STATIC PAGES (index, collection, quiz)
    ['index.html', 'collection.html', 'quiz.html'].forEach(f => {
        if (fs.existsSync(f)) {
            console.log(`Syncing Master Components: ${f}`);
            let content = fs.readFileSync(f, 'utf8');
            
            // Sync Catalog
            const startMarker = '<!-- GLOBAL_CATALOG_START -->';
            const endMarker = '<!-- GLOBAL_CATALOG_END -->';
            if (content.includes(startMarker) && content.includes(endMarker)) {
                const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'i');
                content = content.replace(regex, `${startMarker}\n${massiveCatalogHtml}\n${endMarker}`);
            }

            // Sync Health Packs
            if (content.includes('<!-- GLOBAL_HEALTHPACKS_INJECT -->')) {
                content = content.replace('<!-- GLOBAL_HEALTHPACKS_INJECT -->', healthPacksHtml);
            }

            // Sync Trivia
            if (content.includes('<!-- GLOBAL_TRIVIA_INJECT -->')) {
                content = content.replace('<!-- GLOBAL_TRIVIA_INJECT -->', triviaHtml);
            }

            // Sync Community
            const commStart = '<!-- GLOBAL_COMMUNITY_START -->';
            const commEnd = '<!-- GLOBAL_COMMUNITY_END -->';
            if (content.includes(commStart) && content.includes(commEnd)) {
                const regex = new RegExp(`${commStart}[\\s\\S]*?${commEnd}`, 'i');
                content = content.replace(regex, `${commStart}\n${communityHtml}\n${commEnd}`);
            }

            // Sync Footer
            if (content.includes('<footer')) {
                const footerRegex = /<footer[\s\S]*?<\/footer>/i;
                content = content.replace(footerRegex, `<footer class="bg-[#4d231c] text-white pt-24 pb-12 border-t border-white/5 mt-24">\n${footerHtml}\n</footer>`);
            }

            content = content.replace(/\[object Object\]/g, '');
            fs.writeFileSync(f, content);
        }
    });

    console.log('--- AURA CARES MASTER BUILD COMPLETE ---');
}

function generateFaqHtml(faqs) {
    if (!faqs || faqs.length === 0) return '';
    return faqs.map(f => `
        <div class="faq-item" style="background:#fff; padding:20px; border-radius:15px; border:1px solid #f0f0f0; margin-bottom:15px;">
            <h4 style="color:#4d231c; margin-bottom:10px; font-size:1rem;"><i class="ri-question-line" style="color:#ff9d00;"></i> ${f.q}</h4>
            <p style="font-size:0.9rem; color:#666; line-height:1.5;">${f.a}</p>
        </div>
    `).join('');
}

function applyProductData(html, p) {
    let res = html;
    const price = p.price || 20000;
    
    const map = {
        '{{PRODUCT_NAME}}': p.name,
        '{{PRODUCT_PRICE}}': price.toLocaleString(),
        '{{PRODUCT_PRICE_2X}}': (price * 1.9).toLocaleString(), // Small discount for 2x
        '{{PRODUCT_PRICE_3X}}': (price * 2.7).toLocaleString(), // Bigger discount for 3x
        '{{PRODUCT_USE}}': p.use,
        '{{CLINICAL_NAME}}': p.clinical_name || 'Botanical Synthesis',
        '{{PRODUCT_IMG}}': p.img,
        '{{THEME_COLOR}}': p.theme_color || 'linear-gradient(135deg, #4d231c, #d4a017)'
    };

    Object.keys(map).forEach(key => {
        const regex = new RegExp(key, 'g');
        res = res.replace(regex, map[key]);
    });

    return res;
}

function generateTestimonialsHtml(testimonials) {
    // If no testimonials for product, use default ones
    const list = (testimonials && testimonials.length > 0) ? testimonials : [
        { n: "John D.", loc: "UK", quote: "Revolutionary energy levels!" },
        { n: "Sarah A.", loc: "UAE", quote: "Best sleep I have had in years." },
        { n: "Chief O.", loc: "NG", quote: "Clinical grade excellence." }
    ];

    const tripleList = [...list, ...list, ...list];

    return tripleList.map((t, idx) => `
        <div class="testi-card-premium" style="width:380px; background:#fff; padding:35px; border-radius:28px; flex-shrink:0; box-shadow:0 10px 40px rgba(0,0,0,0.03); border:1px solid rgba(0,0,0,0.05); position:relative; overflow:hidden;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
                <div style="color:#ff9d00; font-size:1rem; display:flex; gap:2px;">
                    <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i>
                </div>
                <span style="background:#fdf8f6; color:#10b981; padding:4px 10px; border-radius:10px; font-size:0.65rem; font-weight:800; text-transform:uppercase; display:flex; align-items:center; gap:4px;"><i class="ri-lock-2-fill"></i> Verified</span>
            </div>
            <p style="font-size:0.95rem; color:#555; font-style:italic; line-height:1.7; margin-bottom:25px;">"${t.quote || t.text}"</p>
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="https://i.pravatar.cc/100?u=fb${idx}" onerror="this.src='reishi.jfif'" style="width:45px;height:45px;border-radius:50%;object-fit:cover;border:2px solid #ff9d00;">
                <div>
                    <div style="display:flex; align-items:center; gap:5px;">
                        <strong style="font-size:0.85rem; color:#4d231c;">${t.n || t.name}</strong>
                        <i class="ri-verified-badge-fill" style="color:#1d9bf0; font-size:0.9rem;"></i>
                    </div>
                    <span style="font-size:0.65rem; color:#999;">Clinical Success Participant</span>
                </div>
            </div>
        </div>`).join('');
}

function generateIndicationsHtml(indications) {
    return indications.map(ind => `
        <div class="ind-card">
            <i class="${ind.icon}"></i>
            <h3>${ind.title}</h3>
            <p>${ind.desc}</p>
        </div>
    `).join('');
}

function generateHighlightsHtml(data) {
    const items = data.slice(0, 15);
    return items.map(item => {
        const text = typeof item === 'string' ? item : item.title;
        return `
        <div style="background:#fff; padding:15px; border-radius:15px; border:1px solid #ff9d0022; display:flex; align-items:center; gap:12px;">
            <div style="width:24px; height:24px; background:#ff9d00; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <i class="ri-check-line" style="color:#fff; font-size:10px;"></i>
            </div>
            <span style="font-size:0.8rem; color:#4d231c; font-weight:600;">${text}</span>
        </div>`;
    }).join('');
}

/**
 * Component Generators
 */

function generateHealthPacksHtml(data) {
    return Object.entries(data).map(([key, pack]) => `
        <div class="testi-card-v2" style="width:300px; flex-shrink:0; background:#fff; padding:25px; border-radius:30px; border:1px solid #ff9d0011; box-shadow:0 15px 35px rgba(0,0,0,0.03);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <span class="tag" style="font-size:0.6rem;">${key.replace('_', ' ').toUpperCase()}</span>
                <span style="color:#25d366; font-size:0.8rem; font-weight:800;"><i class="ri-star-fill"></i> ${pack.rating}</span>
            </div>
            <h3 style="color:#4d231c; margin-bottom:10px; font-size:1.1rem;">${pack.pack}</h3>
            <p style="font-size:0.85rem; color:#666; line-height:1.5;">${pack.desc}</p>
            <button onclick="window.location.href='collection.html'" style="margin-top:15px; width:100%; padding:10px; border-radius:15px; border:1px solid #4d231c; background:transparent; color:#4d231c; font-weight:700; cursor:pointer; font-size:0.75rem;">View Protocol</button>
        </div>
    `).join('');
}

function generateTriviaHtml(catalog) {
    const allTrivia = [];
    catalog.forEach(p => {
        if (p.trivia) p.trivia.forEach(t => allTrivia.push({ text: t, img: p.img }));
    });
    
    // Shuffle and pick 10
    const shuffled = allTrivia.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    return selected.map(t => `
        <div class="testi-card-v2" style="display: flex; align-items: center; gap: 15px; width: 380px; flex-shrink: 0; background: #fdf8f6;">
            <img src="${t.img}" onerror="this.src='reishi.jfif'" alt="Trivia" style="width: 70px; height: 70px; object-fit: cover; border-radius: 50%; border: 2px solid #ff9d00;">
            <p style="margin: 0; font-size: 0.95rem; color: #4d231c; font-weight: 600; line-height:1.4;">${t.text}</p>
        </div>
    `).join('');
}

function generateCommunityHtml(config) {
    return `
        <!-- ======= COMMUNITY SECTION ======= -->
        <section id="community" class="py-24 lg:py-32 bg-slate-50">
            <div class="max-w-[1600px] mx-auto px-4 md:px-8">
                <div class="text-center max-w-3xl mx-auto mb-20">
                    <span class="tag" style="background: #fff; color: #d4a017; padding: 6px 15px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">#AuraVerified</span>
                    <h2 class="serif text-4xl md:text-6xl text-[#4d231c] mt-6 leading-tight">Patient <em class="text-[#d4a017] italic">Success Network</em></h2>
                    <p style="color: #666; margin-top: 10px; font-size: 1.1rem; font-weight: 500;">250+ verified patient stories & counting</p>
                </div>
                <div id="social-gallery" class="buzz-grid-blog"></div>
                <div id="buzz-pagination" class="mt-12 flex justify-center"></div>
            </div>
        </section>
    `;
}

function generateFooterHtml() {
    return `
        <div class="max-w-[1600px] mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
                <div class="lg:col-span-6">
                    <h2 class="text-4xl font-black italic serif text-[#d4a017] dynamic-site-name">Aura Cares</h2>
                    <p class="text-slate-500 text-lg max-w-md mt-6">High-fidelity medical intelligence for patients and clinical partners. Natural cellular reconstruction through standardized botanical synthesis.</p>
                    <div class="flex gap-4 mt-10">
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#d4a017] transition-all"><i class="ri-instagram-line"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#d4a017] transition-all"><i class="ri-facebook-line"></i></a>
                        <a href="https://wa.me/2348114270136" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#d4a017] transition-all"><i class="ri-whatsapp-line"></i></a>
                    </div>
                </div>
                <div class="lg:col-span-2">
                    <h4 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">Clinical</h4>
                    <ul class="space-y-4 text-xs font-bold text-slate-500 hover:text-[#d4a017]">
                        <li><a href="collection.html">Protocol Tracker</a></li>
                        <li><a href="quiz.html">Assessment</a></li>
                    </ul>
                </div>
                <div class="lg:col-span-2">
                    <h4 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">Ecosystem</h4>
                    <ul class="space-y-4 text-xs font-bold text-slate-500 hover:text-[#d4a017]">
                        <li><a href="index.html">Clinic Hub</a></li>
                        <li><a href="franchise.html">Partnership</a></li>
                    </ul>
                </div>
                <div class="lg:col-span-2">
                    <h4 class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">Governance</h4>
                    <ul class="space-y-4 text-xs font-bold text-slate-500 hover:text-[#d4a017]">
                        <li><a href="robots.txt">Discovery Protocol</a></li>
                        <li><a href="sitemap.xml">Clinical Index</a></li>
                        <li><a href="blog.html">Intelligence</a></li>
                        <li><a href="app.json">Master Hub</a></li>
                        <li><a href="admin.html">Admin Gate</a></li>
                    </ul>
                </div>
            </div>
            <div class="text-center pt-8 border-t border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                &copy; 2026 Aura Cares Global Healthcare â€¢ All Rights Reserved
            </div>
        </div>
    `;
}

function applyGlobalUI(html, catalogHtml) {
    let result = html;
    // Massive cleanup of any existing catalog structure to prevent duplication
    const catalogContainerRegex = /<div class="cat-slider-container">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i;
    const catalogSectionRegex = /<section class="nine" id="catalog">[\s\S]*?<\/section>/i;

    const newCatalogSection = `<section class="nine" id="catalog">
            <div class="cat-header" style="text-align:center; margin-bottom:40px;">
                <span class="tag">Inventory</span>
                <h2>Solution <em class="highlight">Ecosystem</em></h2>
            </div>
            <div class="cat-slider-container">
                <div class="cat-track">
                    ${catalogHtml}
                </div>
            </div>
        </section>`;

    if (catalogSectionRegex.test(result)) {
        result = result.replace(catalogSectionRegex, newCatalogSection);
    } else if (catalogContainerRegex.test(result)) {
        result = result.replace(catalogContainerRegex, newCatalogSection);
    }
    
    return result;
}

function generateCatalogHtml(catalog) {
    return catalog.map(p => `
        <div class="cat-card" style="cursor:pointer;" onclick="window.location.href='${p.id}.html'">
            <div class="cat-img-box"><img src="${p.img}" alt="${p.name}"></div>
            <div class="cat-info">
                <h3>${p.name}</h3>
                <button class="cat-btn" onclick="event.stopPropagation(); addToCart('${p.name}')" style="background:#25d366; color:#fff; border:none; padding:10px 20px; border-radius:30px; cursor:pointer; font-weight:700; width:100%;">Consult Specialist</button>
            </div>
        </div>`).join('');
}

// Execute
try {
    build();
} catch (err) {
    console.error('Build Failed:', err);
}
