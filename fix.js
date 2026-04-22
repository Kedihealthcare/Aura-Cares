const fs = require('fs');

const files = fs.readdirSync('.');

// 1. Fix app.json
let appData = fs.readFileSync('app.json', 'utf8');
appData = appData.replace(/Assets\//g, '');
fs.writeFileSync('app.json', appData);

// 2. Fix all HTML files
files.filter(f => f.endsWith('.html')).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove Assets/ prefix unconditionally
    content = content.replace(/Assets\//g, '');
    
    // Fix the specific user typo if present
    content = content.replace(/AssReishi\.png/g, 'Reishi.png');
    
    // Fix the 'Inventory Solution Ecosystem' text in index.html exactly
    if (file === 'index.html') {
        const brokenHeader = `<span class="tag">Global Inventory</span>
                <h2>The Medical <em class="highlight">Ecosystem</em></h2>`;
        const fixedHeader = `<span class="tag">Complete Inventory</span>
                <h2>Solution <em class="highlight">Ecosystem</em></h2>`;
        content = content.replace(brokenHeader, fixedHeader);
    }
    
    fs.writeFileSync(file, content);
});

// 3. Rebuild the ecosystem so that the catalog injection (cat-track) is also clean
console.log('Fixed Assets references and restored header text');
