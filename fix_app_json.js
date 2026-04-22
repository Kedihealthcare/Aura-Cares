const fs = require('fs');
const data = JSON.parse(fs.readFileSync('app.json', 'utf8'));

data.product_catalog.forEach(product => {
    // Fix ID: lowercase, remove spaces, handle 'Aura cares' prefix
    if (product.id.includes('Aura cares')) {
        product.id = product.id.replace(/Aura cares/g, 'aura').toLowerCase().replace(/\s+/g, '-');
    }
});

// Also fix website structure base_url if needed
if (data.website_structure.base_url.includes(' ')) {
    data.website_structure.base_url = data.website_structure.base_url.replace(/ /g, '');
}

fs.writeFileSync('app.json', JSON.stringify(data, null, 2));
console.log('app.json IDs and URLs cleaned.');
