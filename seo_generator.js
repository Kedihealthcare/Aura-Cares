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
        
        // ======= GEO TARGETING (Nigeria & Global) ======= 
        'geoRegion': '<meta name="geo.region" content="NG-OG">',
        'geoPlacename': '<meta name="geo.placename" content="Sango Ota">',
        'geoPosition': '<meta name="geo.position" content="6.7077;3.2351">',
        'icbm': '<meta name="ICBM" content="6.7077, 3.2351">',
        
        // ======= OPEN GRAPH (Social Media & AI Models) ======= 
        'ogSiteName': `<meta property="og:site_name" content="Aura Cares Global">`,
        'ogTitle': `<meta property="og:title" content="${pageData.ogTitle || pageData.title}">`,
        'ogDescription': `<meta property="og:description" content="${pageData.ogDescription || pageData.description}">`,
        'ogImage': `<meta property="og:image" itemprop="image" content="${pageData.ogImage}">`,
        'ogImageSecure': `<meta property="og:image:secure_url" content="${pageData.ogImage}">`,
        'ogImageWidth': `<meta property="og:image:width" content="1200">`,
        'ogImageHeight': `<meta property="og:image:height" content="630">`,
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
        "image": [
            "https://instagram.flos3-1.fna.fbcdn.net/v/t51.82787-19/671736926_17902724529419798_3424773438433236831_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby42OTcuYzIifQ&_nc_ht=instagram.flos3-1.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2gFMrt2yFYZZcB5GZ3a9MR0BNrt9A3FeSz3eWLSIUNGkijH5EHooOmsLiWQcJzYL0L0&_nc_ohc=b-Oh03eIKa4Q7kNvwErLApF&_nc_gid=3TvCcebznh10_JrleMiEUQ&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af0Rs_iRk3Cv6xXFoFRTmEH6ilrmoGugRuhhXoS1k38owQ&oe=69EF0C21&_nc_sid=7a9f4b",
            "https://scontent.flos3-1.fna.fbcdn.net/v/t39.30808-1/679565633_122203545728788287_7448019525489621091_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeHAkn9aRhuJwPyQ6iMjHu5zC5ADpYg6Ri0LkAOliDpGLexSTicfMEww6Q5l8QbiQTbrqYT9zK6acEO2JxZIau44&_nc_ohc=a7_4KvI5GNAQ7kNvwENqMcM&_nc_oc=Adp8tLwaWKMMX1SrGOOfCIdgaegy2jpbyXtGSjHvD6facF81eoZeo2ICOmLkSGYA2EQ&_nc_zt=24&_nc_ht=scontent.flos3-1.fna&_nc_gid=Q-lMqfKPJo_2nPLafp4ing&_nc_ss=7b2a8&oh=00_Af0ozJoxH3BTmC2WSw1JF7nV7TIkime166dZMLyhKO1Cig&oe=69EF0ECE",
            "https://i.pinimg.com/280x280_RS/d9/95/ef/d995ef35464c864c1e268489c1a25f06.jpg",
            "https://yt3.googleusercontent.com/PZWmmkJPqxEGeCGpqESy_EIr6oYpGbxnnvil5vETV-Bzs0AHDbXiqDNhAFlOPxJhNaY9ysDvoA=s160-c-k-c0x00ffffff-no-rj"
        ],
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
            "https://web.facebook.com/AuraCares4u/",
            "https://www.instagram.com/auracares4u/",
            "https://www.pinterest.com/AuraCares4U/?actingBusinessId=1015984134595813771",
            "https://www.youtube.com/@AuraCares1",
            "https://wa.me/2348114270136"
        ],
        "areaServed": "Global",
        "sameAs": [
            "https://www.instagram.com/auuracares",
            "https://web.facebook.com/AuraCares4u/",
            "https://www.instagram.com/auracares4u/",
            "https://www.pinterest.com/AuraCares4U/?actingBusinessId=1015984134595813771",
            "https://www.youtube.com/@AuraCares1"
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
