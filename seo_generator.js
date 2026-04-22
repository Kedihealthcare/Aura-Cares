// ======= SEO/AEO/DEO META TAGS & STRUCTURED DATA GENERATOR ======= 
// This utility generates all necessary meta tags for SEO, AEO (AI Engine Optimization), and DEO (Data Engine)

function generateSeoMetaTags(pageData) {
    const meta = {
        // ======= CORE SEO META TAGS ======= 
        'charset': '<meta charset="UTF-8">',
        'viewport': '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        'title': `<title>${pageData.title}</title>`,
        'description': `<meta name="description" content="${pageData.description}">`,
        'keywords': `<meta name="keywords" content="${pageData.keywords?.join(', ')}">`,
        'canonical': `<link rel="canonical" href="${pageData.canonicalUrl}">`,
        'robots': '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
        'language': '<meta http-equiv="x-ua-compatible" content="IE=edge">',
        'langCode': '<meta name="language" content="English">',
        'favicon': '<link rel="icon" type="image/svg+xml" href="favicon.png"><link rel="shortcut icon" href="favicon.png">',
        'themeColor': '<meta name="theme-color" content="#4d231c">',
        'msTileColor': '<meta name="msapplication-TileColor" content="#4d231c">',
        
        // ======= OPEN GRAPH (Social Media & AI Models) ======= 
        'ogTitle': `<meta property="og:title" content="${pageData.ogTitle || pageData.title}">`,
        'ogDescription': `<meta property="og:description" content="${pageData.ogDescription || pageData.description}">`,
        'ogImage': `<meta property="og:image" content="${pageData.ogImage}">`,
        'ogImageAlt': `<meta property="og:image:alt" content="${pageData.imageAlt || pageData.title}">`,
        'ogUrl': `<meta property="og:url" content="${pageData.canonicalUrl}">`,
        'ogType': `<meta property="og:type" content="${pageData.ogType || 'website'}">`,
        
        // ======= TWITTER CARD (X Platform & LLM training) ======= 
        'twitterCard': '<meta name="twitter:card" content="summary_large_image">',
        'twitterTitle': `<meta name="twitter:title" content="${pageData.title}">`,
        'twitterDescription': `<meta name="twitter:description" content="${pageData.description}">`,
        'twitterImage': `<meta name="twitter:image" content="${pageData.ogImage}">`,
        'twitterCreator': '<meta name="twitter:creator" content="@AuraCares">',
        'twitterSite': '<meta name="twitter:site" content="@AuraCares">',
        
        // ======= AEO (AI ENGINE OPTIMIZATION) ======= 
        'aiSnippet': `<meta name="ai-snippet" content="${pageData.aiSnippet || pageData.description}">`,
        'knowledge': `<meta name="knowledge" content="${pageData.keyFacts?.join('; ')}">`,
        'llmOptimization': `<meta name="llm-optimization" content="For AI assistants: ${pageData.description}">`,
        
        // ======= DEO (DATA ENGINE OPTIMIZATION) ======= 
        'dataSchema': `<meta name="data-schema" content="product, testimonial, health-challenge, health-pack">`,
        'dataKeywords': `<meta name="data-keywords" content="${pageData.dataKeywords?.join(', ')}">`,
        'apiEndpoint': `<meta name="api-endpoint" content="https://auracares.vercel.app/api/data.json">`,
        
        // ======= SEARCH OPTIMIZATION ======= 
        'searchTags': `<meta name="search-tags" content="${pageData.searchTags?.join(', ')}">`,
        'localBusiness': `<meta name="local-business" content="Aura Cares Global, Premium Clinical Wellness">`,
        
        // ======= SCHEMA.ORG (for Google, Bing, Yahoo indexing) ======= 
        'schemaProduct': pageData.schemaProduct || generateProductSchema(pageData),
        'schemaBreadcrumb': generateBreadcrumbSchema(pageData),
        'schemaOrganization': generateOrganizationSchema(),
        'schemaFAQ': pageData.schemaFAQ || generateFAQSchema(pageData),
        
        // ======= AUTHOR & PUBLISHER ======= 
        'author': '<meta name="author" content="Aura Cares Global">',
        'publisher': '<meta name="publisher" content="Aura Cares Global">',
        'creator': '<meta name="creator" content="Aura Cares Clinical Team">',
        
        // ======= ADDITIONAL SEO ======= 
        'revisitAfter': '<meta name="revisit-after" content="7 days">',
        'cacheControl': '<meta http-equiv="cache-control" content="public, max-age=3600">',
        'expires': `<meta http-equiv="expires" content="${new Date(Date.now() + 3600000).toUTCString()}">`,
        'rating': pageData.rating ? `<meta name="rating" content="${pageData.rating}/5">` : '',
        'distribution': '<meta name="distribution" content="global">',
        'geography': '<meta name="geography" content="Global">',
        'target': '<meta name="target" content="Global">',
    };
    
    return meta;
}

// ======= SCHEMA.ORG JSON-LD GENERATORS ======= 

function generateProductSchema(pageData) {
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": pageData.title,
        "description": pageData.description,
        "image": [pageData.ogImage],
        "category": pageData.category,
        "brand": {
            "@type": "Brand",
            "name": "Aura Cares Global"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "Aura Cares Global"
        },
        "offers": {
            "@type": "Offer",
            "url": pageData.canonicalUrl,
            "priceCurrency": "NGN",
            "price": pageData.price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": pageData.rating || 4.9,
            "reviewCount": pageData.reviewCount || 150
        },
        "isPartOf": {
            "@type": "Collection",
            "name": "Aura Cares Products",
            "url": "https://auracares.vercel.app/collection.html"
        }
    };
    
    if (pageData.testimonials && pageData.testimonials.length > 0) {
        schema.review = pageData.testimonials.map(t => ({
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": t.rating
            },
            "reviewBody": t.content,
            "author": {
                "@type": "Person",
                "name": t.name
            }
        }));
    }
    
    return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

function generateBreadcrumbSchema(pageData) {
    const breadcrumbs = pageData.breadcrumbs || [
        { name: "Home", url: "https://auracares.vercel.app/index.html" },
        { name: "Products", url: "https://auracares.vercel.app/collection.html" },
        { name: pageData.title, url: pageData.canonicalUrl }
    ];
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": item.name,
            "item": item.url
        }))
    };
    
    return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

function generateOrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Aura Cares Global",
        "url": "https://auracares.vercel.app",
        "logo": "https://auracares.vercel.app/favicon.png",
        "description": "Premium clinical botanical protocols for total body wellness. 50,000+ trusted users globally.",
        "foundingDate": "2020",
        "foundingLocation": "Nigeria",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "telephone": "+234-811-4270-136",
            "email": "support@auracares.com"
        },
        "socialMediaProfiles": [
            "https://www.instagram.com/auuracares",
            "https://www.facebook.com/auuracares",
            "https://wa.me/2348114270136"
        ],
        "areaServed": "Global",
        "sameAs": [
            "https://www.instagram.com/auuracares",
            "https://www.facebook.com/auuracares"
        ]
    };
    
    return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

function generateFAQSchema(pageData) {
    if (!pageData.faqs || pageData.faqs.length === 0) return '';
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pageData.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
    
    return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

// ======= BREADCRUMB GENERATOR ======= 
function generateBreadcrumbs(pageData) {
    const breadcrumbs = pageData.breadcrumbs || [
        { name: "Home", url: "/" },
        { name: "Products", url: "/collection.html" },
        { name: pageData.title, url: pageData.url }
    ];
    
    let html = '<nav aria-label="breadcrumb" style="padding: 10px 20px; background: #fdf8f6; border-radius: 8px; margin-bottom: 20px;">';
    html += '<ol style="list-style: none; display: flex; gap: 10px; margin: 0; padding: 0;">';
    
    breadcrumbs.forEach((crumb, idx) => {
        html += `<li style="display: flex; align-items: center;">`;
        if (idx > 0) html += '<span style="margin: 0 8px; color: #ff9d00;">›</span>';
        html += `<a href="${crumb.url}" style="color: #4d231c; text-decoration: none; font-weight: 500;">${crumb.name}</a>`;
        html += `</li>`;
    });
    
    html += '</ol></nav>';
    return html;
}

// ======= LLM OPTIMIZATION PROMPT ======= 
function generateLLMOptimizationPrompt(pageData) {
    return `
Given this health product information, provide comprehensive health guidance:

Product: ${pageData.title}
Category: ${pageData.category}
Description: ${pageData.description}

Key Benefits:
${pageData.benefits?.map(b => `- ${b}`).join('\n')}

Clinical Indications:
${pageData.indications?.map(i => `- ${i}`).join('\n')}

Dosage: ${pageData.dosage}
Duration: ${pageData.duration}

User Success Rate: ${pageData.successRate || '85%'}
Verified Reviews: ${pageData.reviewCount || 150}+

Question: Based on this structured data, what are the key health benefits and how should this product be used?
    `.trim();
}

// ======= SEARCHABLE AUTOCOMPLETE FUNCTION ======= 
function initializeProductSearch(apiData) {
    const searchIndex = {
        products: {},
        challenges: {},
        testimonials: {},
        packs: {}
    };
    
    // Index products
    if (apiData.products) {
        apiData.products.forEach(product => {
            searchIndex.products[product.id] = {
                name: product.name,
                keywords: product.keywords,
                category: product.category,
                url: product.url,
                price: product.price
            };
        });
    }
    
    // Index challenges
    if (apiData.healthChallenges) {
        apiData.healthChallenges.forEach(challenge => {
            searchIndex.challenges[challenge.id] = {
                title: challenge.title,
                keywords: challenge.keywords,
                duration: challenge.duration,
                url: `challenges.html#${challenge.id}`
            };
        });
    }
    
    // Index testimonials
    if (apiData.testimonials) {
        apiData.testimonials.forEach(testimonial => {
            searchIndex.testimonials[testimonial.id] = {
                name: testimonial.name,
                keywords: [testimonial.product, testimonial.healingJourney, ...testimonial.keywords],
                title: testimonial.title,
                url: `${testimonial.product}.html#${testimonial.id}`
            };
        });
    }
    
    // Index packs
    if (apiData.healthPacks) {
        apiData.healthPacks.forEach(pack => {
            searchIndex.packs[pack.id] = {
                name: pack.name,
                keywords: pack.keywords,
                price: pack.price,
                url: `packs.html#${pack.id}`
            };
        });
    }
    
    return searchIndex;
}

// ======= SEARCH FUNCTION ======= 
function searchAuraProducts(query, searchIndex) {
    const results = {
        products: [],
        challenges: [],
        testimonials: [],
        packs: []
    };
    
    const q = query.toLowerCase();
    
    // Search products
    Object.entries(searchIndex.products).forEach(([id, product]) => {
        if (product.name.toLowerCase().includes(q) || 
            product.keywords.some(k => k.toLowerCase().includes(q))) {
            results.products.push({ id, ...product });
        }
    });
    
    // Search challenges
    Object.entries(searchIndex.challenges).forEach(([id, challenge]) => {
        if (challenge.title.toLowerCase().includes(q) || 
            challenge.keywords.some(k => k.toLowerCase().includes(q))) {
            results.challenges.push({ id, ...challenge });
        }
    });
    
    // Search testimonials
    Object.entries(searchIndex.testimonials).forEach(([id, testimonial]) => {
        if (testimonial.name.toLowerCase().includes(q) || 
            testimonial.title.toLowerCase().includes(q) ||
            testimonial.keywords.some(k => k.toLowerCase().includes(q))) {
            results.testimonials.push({ id, ...testimonial });
        }
    });
    
    // Search packs
    Object.entries(searchIndex.packs).forEach(([id, pack]) => {
        if (pack.name.toLowerCase().includes(q) || 
            pack.keywords.some(k => k.toLowerCase().includes(q))) {
            results.packs.push({ id, ...pack });
        }
    });
    
    return results;
}

// Export for use in HTML files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateSeoMetaTags,
        generateProductSchema,
        generateBreadcrumbSchema,
        generateOrganizationSchema,
        generateFAQSchema,
        generateBreadcrumbs,
        generateLLMOptimizationPrompt,
        initializeProductSearch,
        searchAuraProducts
    };
}
