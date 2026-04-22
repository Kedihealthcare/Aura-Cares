const fs = require('fs');

const directoryPath = './';
const files = fs.readdirSync(directoryPath);

const testimonialsHtml = `
        <!-- ======= RESTORED VERIFIED SUCCESS STORIES ======= -->
        <section class="five" id="testimonials" style="padding: 10vh 0; background: transparent; overflow:hidden;">
            <div class="text-center mb-10">
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4a017]">Patient Reports</span>
                <h2 class="serif text-4xl text-[#4d231c] mt-2">Verified <em class="text-[#d4a017] italic">Success Stories.</em></h2>
            </div>
            <div class="testi-slider-container">
                <div class="testi-track" id="testi-track-inner" style="display:flex; gap:2vw; padding-bottom:20px;">
                    <!-- JS will dynamically inject the verified slider here -->
                </div>
            </div>
        </section>
        
        `;

let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('-guide.html')) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if we already injected it
        if (!content.includes('id="testi-track-inner"')) {
            // Find the Community Section Injection and inject just before it
            if (content.includes('<!-- Community Section Injection -->')) {
                content = content.replace('<!-- Community Section Injection -->', testimonialsHtml + '<!-- Community Section Injection -->');
                fs.writeFileSync(file, content);
                updatedCount++;
            }
        }
    }
}

console.log(`Successfully restored Verified Success Stories in ${updatedCount} missing guide pages!`);
