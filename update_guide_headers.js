const fs = require('fs');

const files = fs.readdirSync('./').filter(f => f.endsWith('-guide.html'));

let updatedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. the Slider Header
    const oldSliderSpan = `<span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4a017]">Patient Reports</span>`;
    const oldSliderH2 = `<h2 class="serif text-4xl text-[#4d231c] mt-2">Verified <em class="text-[#d4a017] italic">Success Stories.</em></h2>`;
    const newSliderSpan = `<span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4a017]">Aura Verified Network</span>`;
    const newSliderH2 = `<h2 class="serif text-4xl text-[#4d231c] mt-2">Community <em class="text-[#d4a017] italic">Discussions.</em></h2>`;

    if (content.includes(oldSliderSpan) && content.includes(oldSliderH2)) {
        content = content.replace(oldSliderSpan, newSliderSpan);
        content = content.replace(oldSliderH2, newSliderH2);
        changed = true;
    }

    // 2. The Bottom Grid Header
    const oldGridSpan = `<span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4a017]">Community Pulse</span>`;
    const oldGridH2 = `<h2 class="serif text-4xl md:text-5xl text-[#4d231c] mt-4">Community <em class="text-[#d4a017] italic">Discussions.</em></h2>`;
    
    // Fallback if it hasn't been changed yet
    const oldGridSpanAlt = `<span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4a017]">Aura Verified Network</span>`;
    
    const newGridSpan = `<span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4a017]">#KediVerified</span>`;
    const newGridH2 = `<h2 class="serif text-4xl md:text-5xl text-[#4d231c] mt-4">Community <em class="text-[#d4a017] italic">Buzz</em></h2>\n                    <p class="text-slate-500 text-lg mt-4 font-bold">250+ verified patient stories & counting</p>`;

    if (content.includes(oldGridSpan) && content.includes(oldGridH2)) {
        content = content.replace(oldGridSpan, newGridSpan);
        content = content.replace(oldGridH2, newGridH2);
        changed = true;
    } else if (content.includes(oldGridSpanAlt) && content.includes(oldGridH2)) {
        content = content.replace(oldGridSpanAlt, newGridSpan);
        content = content.replace(oldGridH2, newGridH2);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        updatedCount++;
    }
}

console.log(`Successfully updated Community headings on ${updatedCount} health guide pages!`);
