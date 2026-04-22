# Aura Cares Ecosystem: Technical Documentation & Features

This document outlines the architectural blueprint, core features, and the strategic logic (prompts) used to engineer the **Aura Cares** clinical web ecosystem into a standardized, high-performance boutique healthcare platform.

---

## 🚀 Core Platform Features

### 1. Master Build Engine (`build.js`)
*   **Automated Propagation**: A centralized Node.js script that regenerates 100+ product pages instantly from a single `product-template.html`.
*   **Component Synchronization**: Synchronizes global UI elements (Footer, Community Buzz, Health Packs) across all static files using high-precision regex markers.
*   **Data-Driven Architecture**: Uses `app.json` as the "Single Source of Truth" for product pricing, clinical names, and indications.

### 2. Clinical Intelligence Hub (Blog & Guides)
*   **Intelligence Library**: A centralized repository (`blog.html`) for medical research and protocol deep-dives.
*   **50+ Condition Guides**: Specialized protocols (e.g., `liver-guide.html`, `anxiety-guide.html`) featuring condition-specific clinical analysis and recommended "Challenge Packs."
*   **Boutique Typography**: Uses **Playfair Display** (Serif) for authority and **Inter** (Sans) for clinical readability.

### 3. Interactive Patient Tools
*   **28-Day Treatment Tracker**: A client-side persistence engine that allows patients to track their dosage progress with streak-tracking and visual progress bars.
*   **Aura Health Quiz**: A sophisticated diagnostic tool that generates clinical recommendations and directs users to specific treatment bundles.
*   **Aura Assistant Chatbot**: A custom-styled AI interface providing instant guidance on clinical protocols.

### 4. Community & Social Proof
*   **#AuraVerified Success Network**: A dynamic, paginated gallery containing 250+ verified patient success stories.
*   **Clinical Forum**: Integrated discussion blocks on every page allowing patients to contribute experiences and ask questions to clinical moderators.

### 5. Advanced SEO & AEO (AI Engine Optimization)
*   **Metadata Injection**: Automatic generation of `JSON-LD` structured data, OpenGraph tags, and AI-specific metadata (`ai-intelligence`) to maximize visibility in search and LLM discovery.
*   **Technical Governance**: Global synchronization of `robots.txt` and `sitemap.xml` within the site's footer.

### 6. Conversion & Commerce
*   **WhatsApp Checkout**: A high-conversion "Basket to WhatsApp" workflow that sends formatted orders directly to clinical consultants.
*   **Multi-Tier Pricing**: Automated generation of Standard, Ultimate (3x), and Intensive (2x) pricing tiers.

---

## 🧠 Strategic Logic & Prompts

The following logic was applied during the construction and stabilization phases to ensure a "Premium Boutique" result:

### A. Architectural Stabilization
> *"Eliminate all hardcoded content duplication. Transition the entire ecosystem to a master-build architecture where UI components like the footer and community sections are synced from a single source to prevent maintenance drift."*

### B. Visual Identity (Boutique Aesthetic)
> *"Avoid generic web colors. Use a curated palette of Aura Gold (#d4a017) and Deep Clinic Brown (#4d231c) with glassmorphism (backdrop-blur) and smooth GSAP animations. Ensure the site feels 'Alive' through micro-interactions and hovering effects."*

### C. Clinical Authority
> *"Rebrand the ecosystem from 'Kedi' to 'Aura Cares' focusing on Medical Intelligence. Use clinical terminology (e.g., 'Hepatocyte Regeneration' instead of 'Liver Repair') to establish high-fidelity authority and trust."*

### D. Mobile Performance
> *"Implement a 'Mobile Patch' CSS block to handle complex section stacking and floating product images on small screens, ensuring the boutique experience is preserved for 90% of the mobile-first user base."*

---

## 🛠️ Technical Stack
*   **Structure**: Semantic HTML5 / Standardized Templates
*   **Logic**: JavaScript (Node.js Build Script / Browser Scripts)
*   **Aesthetics**: Vanilla CSS3 / Tailwind CSS (Tailored Utility Layer)
*   **Motion**: GSAP (GreenSock Animation Platform)
*   **Icons**: Remix Icon Library
*   **Discovery**: JSON-LD / robots.txt / sitemap.xml

---
> [!TIP]
> **Maintenance Protocol**: Always run `node build.js` after modifying `app.json` or `product-template.html` to ensure the changes propagate to all 200+ pages.
