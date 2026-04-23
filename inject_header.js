const fs = require('fs');
const path = require('path');

const newHeader = `        <!-- ======= MODERN HEADER ======= -->
        <header class="fixed top-0 left-0 w-full z-[1000] bg-white/10 backdrop-blur-xl border-b border-white/10">
            <div class="max-w-[1600px] mx-auto px-6 py-5 flex justify-between items-center">
                <a href="index.html" class="serif text-3xl font-black text-white italic tracking-tighter dynamic-site-name">Aura Cares</a>
                <nav class="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                    <a href="index.html" class="hover:text-white transition-colors">Clinic Hub</a>
                    <a href="collection.html" class="hover:text-[#d4a017] transition-colors">Ecosystem</a>
                    <a href="blog.html" class="hover:text-[#d4a017] transition-colors">Intelligence</a>
                    <a href="quiz.html" class="hover:text-[#d4a017] transition-colors">Assessment</a>
                    <a href="franchise.html" class="hover:text-[#d4a017] transition-colors">Partnership</a>
                </nav>
                <div class="flex items-center gap-4 sm:gap-6">
                    <div id="cart-trigger" onclick="toggleCart()" class="relative cursor-pointer text-white">
                        <i class="ri-shopping-bag-line text-2xl"></i>
                        <span id="cart-count" class="absolute -top-1 -right-1 bg-[#d4a017] text-[#4d231c] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </div>
                    <button class="hidden sm:block bg-[#d4a017] text-[#4d231c] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all" onclick="window.open('https://wa.me/2348114270136')">Consultation</button>
                    <!-- Mobile Menu Button -->
                    <button class="lg:hidden text-white text-2xl flex items-center justify-center" onclick="toggleMobileMenu()">
                        <i class="ri-menu-4-line"></i>
                    </button>
                </div>
            </div>
        </header>

        <!-- ======= MOBILE MENU OVERLAY ======= -->
        <div id="mobile-menu" class="fixed inset-0 z-[2000] bg-[#4d231c] translate-x-full transition-transform duration-500 flex flex-col pt-24 px-8 pb-10">
            <button class="absolute top-6 right-6 text-white text-4xl" onclick="toggleMobileMenu()">
                <i class="ri-close-line"></i>
            </button>
            <div class="text-[#d4a017] font-black text-2xl italic serif mb-12">Aura Cares</div>
            <nav class="flex flex-col gap-6 text-white font-black uppercase tracking-widest text-sm flex-grow">
                <a href="index.html" class="hover:text-[#d4a017] border-b border-white/10 pb-4 transition-colors">Clinic Hub (Home)</a>
                <a href="collection.html" class="hover:text-[#d4a017] border-b border-white/10 pb-4 transition-colors">Products & Ecosystem</a>
                <a href="blog.html" class="hover:text-[#d4a017] border-b border-white/10 pb-4 transition-colors">Blogs & Intelligence</a>
                <a href="quiz.html" class="hover:text-[#d4a017] border-b border-white/10 pb-4 transition-colors">Health Assessment</a>
                <a href="franchise.html" class="hover:text-[#d4a017] border-b border-white/10 pb-4 transition-colors">Partnership</a>
            </nav>
            <button class="mt-8 bg-[#d4a017] text-[#4d231c] py-4 rounded-xl font-black uppercase tracking-widest w-full shadow-2xl hover:bg-white transition-colors" onclick="window.open('https://wa.me/2348114270136')">
                <i class="ri-whatsapp-line text-lg align-middle mr-2"></i> Start Consultation
            </button>
        </div>

        <script>
            function toggleMobileMenu() {
                const menu = document.getElementById('mobile-menu');
                if(menu) menu.classList.toggle('translate-x-full');
            }
        </script>`;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove any existing overlay to prevent duplicates
    const overlayRegex = /<!-- ======= MOBILE MENU OVERLAY ======= -->[\s\S]*?<\/script>/i;
    content = content.replace(overlayRegex, '');

    // Replace old header
    const headerRegex = /<!-- ======= MODERN HEADER ======= -->[\s\S]*?<\/header>/i;
    const headerRegexAlt = /<header class="fixed top-0 left-0[\s\S]*?<\/header>/i;
    
    if (headerRegex.test(content)) {
        content = content.replace(headerRegex, newHeader);
    } else if (headerRegexAlt.test(content)) {
        content = content.replace(headerRegexAlt, newHeader);
    } else if (file === 'product-template.html') {
        // Fallback for product template if header varies
        const fallbackRegex = /<header[\s\S]*?<\/header>/i;
        content = content.replace(fallbackRegex, newHeader);
    }

    fs.writeFileSync(file, content);
    console.log(`Updated header in ${file}`);
});
