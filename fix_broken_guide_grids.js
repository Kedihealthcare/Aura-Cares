const fs = require('fs');

const files = fs.readdirSync('./').filter(f => f.endsWith('-guide.html'));

let updatedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Fix the broken missing CSS grid class layout
    const oldGrid = `<div id="social-gallery" class="buzz-grid-blog"></div>`;
    const newGrid = `<div id="social-gallery" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px;"></div>`;
    
    if (content.includes(oldGrid)) {
        content = content.replace(oldGrid, newGrid);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        updatedCount++;
    }
}

console.log(`Successfully fixed the broken grid layout in ${updatedCount} health guide pages!`);
