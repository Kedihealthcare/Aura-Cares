/**
 * mobile_patch.js
 * Applies per-page mobile optimizations across all HTML files.
 * Run once with: node mobile_patch.js
 * Safe to re-run — checks for the MOBILE_PATCHED marker before editing.
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const MARKER = '<!-- MOBILE_PATCHED -->';

// ─── Shared inline-override block injected into every page ───────────────────
// These target inline-styled elements that CSS selectors cannot reach.
const SHARED_PATCH = `${MARKER}
<style>
/* =====================================================
   PER-PAGE INLINE MOBILE OVERRIDES  (auto-patched)
   Applied on top of style.css mobile block.
   ===================================================== */

/* Fix alert banner top offset to clear 64px mobile nav */
@media (max-width: 768px) {
    /* All product-alert banners */
    .product-alert,
    #primary-alert,
    #alert-collection,
    [id^="primary-alert"],
    div[style*="top: 10vh"],
    div[style*="top:10vh"] {
        top: 64px !important;
    }

    /* Hero h1 font-size override for collection page */
    .one h1[style],
    section.one h1 {
        font-size: clamp(2.8rem, 14vw, 5rem) !important;
        letter-spacing: -2px !important;
    }

    /* Collection hero paragraph */
    .one p[style] {
        font-size: clamp(0.95rem, 3.5vw, 1.2rem) !important;
        max-width: 100% !important;
        padding: 0 5vw !important;
    }

    /* Collection .two alternating product sections — stack on mobile */
    section.two[style] {
        flex-direction: column !important;
        height: auto !important;
        padding: 60px 5vw 50px !important;
        gap: 30px !important;
    }

    /* Collection .two image boxes */
    section.two .lft-two div[style*="aspect-ratio"] {
        max-width: 85vw !important;
        margin: 0 auto !important;
    }

    /* Collection .two right content */
    section.two .rght-two[style] {
        padding-left: 0 !important;
        text-align: center !important;
        align-items: center !important;
    }

    section.two .rght-two h2 {
        font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
        text-align: center !important;
    }

    section.two .rght-two p[style] {
        font-size: 1rem !important;
    }

    section.two .rght-two div[style*="display:flex"] {
        flex-direction: column !important;
        align-items: center !important;
        gap: 12px !important;
    }

    section.two .rght-two .btn-main {
        width: 100% !important;
        max-width: 280px !important;
        text-align: center !important;
    }

    /* Fix inline-width product cards in section.eight on index.html */
    #solutions > div > .sol-card[style*="width:340px"],
    #solutions > div > div[style*="width:340px"] {
        width: 88vw !important;
        max-width: 390px !important;
    }

    /* Fix hero CTA button row wrapping on product pages */
    section.one .hero-content > div {
        flex-direction: column !important;
        align-items: center !important;
        gap: 12px !important;
    }

    /* Floating product images in section one (product pages) */
    #fanta {
        position: relative !important;
        top: auto !important;
        left: auto !important;
        transform: none !important;
        width: 80vw !important;
        max-width: 300px !important;
        margin: 20px auto 0 !important;
        display: block !important;
        filter: drop-shadow(0 20px 40px rgba(0,0,0,0.25)) !important;
    }

    /* Botanical section 2-col to 1-col */
    .botanical-origins > div[style*="grid-template-columns"],
    .botanical-origins > div[style*="repeat"] {
        grid-template-columns: 1fr !important;
    }

    /* Progress tracker left panel — avoid covering content */
    #progress-tracker-ui {
        width: 240px !important;
        left: -245px !important;
    }
    #progress-tracker-ui.open {
        left: 0 !important;
    }

    /* Consultant bubble position */
    #consultant-bubble {
        bottom: 85px !important;
        left: 12px !important;
        font-size: 0.75rem !important;
    }

    /* Section .one min-height prevent content crush */
    section.one {
        min-height: 100svh !important;
        height: auto !important;
        padding-top: 90px !important;
    }
}

/* ---- Extra-small phones ---- */
@media (max-width: 480px) {
    section.one h1,
    section.one h1[style] {
        font-size: clamp(2.4rem, 16vw, 3.5rem) !important;
    }

    section.two[style] {
        padding: 50px 4vw 40px !important;
    }

    .testi-card-v2,
    .testi-card-v2[style] {
        width: 88vw !important;
        padding: 18px !important;
    }

    #progress-tracker-ui {
        width: 220px !important;
        left: -225px !important;
        bottom: 130px !important;
    }
}
</style>`;

// ─── Get list of all HTML files ────────────────────────────────────────────────
const htmlFiles = fs.readdirSync(DIR)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(DIR, f));

let patched = 0, skipped = 0, errors = 0;

htmlFiles.forEach(filePath => {
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Skip already patched files
        if (content.includes(MARKER)) {
            console.log(`  [SKIP]    ${path.basename(filePath)} — already patched`);
            skipped++;
            return;
        }

        // Inject patch block just before </head>
        if (!content.includes('</head>')) {
            console.log(`  [WARN]    ${path.basename(filePath)} — no </head> tag found, skipping`);
            errors++;
            return;
        }

        content = content.replace('</head>', SHARED_PATCH + '\n</head>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  [PATCHED] ${path.basename(filePath)}`);
        patched++;

    } catch (err) {
        console.error(`  [ERROR]   ${path.basename(filePath)} — ${err.message}`);
        errors++;
    }
});

console.log(`\n✅ Done! Patched: ${patched} | Skipped: ${skipped} | Errors: ${errors}`);
console.log(`Total HTML files processed: ${htmlFiles.length}`);
