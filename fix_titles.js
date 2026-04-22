const fs = require('fs');

const files = fs.readdirSync('./').filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    // Only target the guide pages or any page that has both conflicting sections
    // Or just strictly replace the specific Aura Verified Network section
    let content = fs.readFileSync(file, 'utf8');

    const targetH2 = `<h2 class="serif text-4xl md:text-5xl text-[#4d231c] mt-4">Verified <em class="text-[#d4a017] italic">Success Stories.</em></h2>`;
    const newH2 = `<h2 class="serif text-4xl md:text-5xl text-[#4d231c] mt-4">Community <em class="text-[#d4a017] italic">Discussions.</em></h2>`;
    
    // In product pages we have "Aura Verified Network"
    const targetSp = `<span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4a017]">Aura Verified Network</span>`;
    const newSp = `<span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4a017]">Community Pulse</span>`;

    let changed = false;

    // We only want to replace it in the Community grid section so we don't accidentally rename the slider section,
    // but the slider section has slightly different classes: 
    // Slider: <h2 class="serif text-4xl text-[#4d231c] mt-2">Verified <em class="text-[#d4a017] italic">Success Stories.</em></h2>
    // Community: <h2 class="serif text-4xl md:text-5xl text-[#4d231c] mt-4">Verified <em class="text-[#d4a017] italic">Success Stories.</em></h2>

    if (content.includes(targetH2) && content.includes(targetSp)) {
        content = content.replace(targetH2, newH2);
        content = content.replace(targetSp, newSp);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        updatedCount++;
    }
}

console.log(`Successfully fixed Verified Network title conflict in ${updatedCount} HTML pages!`);
