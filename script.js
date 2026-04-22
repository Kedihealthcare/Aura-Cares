const WHATSAPP_NUM = "2348114270136";

function addToCart(prod) {
    const msg = `Hello, I am interested in procuring the Aura Cares ${prod} protocol. Please guide me on the clinical application and dosage.`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ======= BRANDING & SEO =======
function initBranding() {
    const siteName = localStorage.getItem('aura_site_name') || 'Aura Cares';
    const seoTags = localStorage.getItem('aura_seo_tags') || 'healthcare, clinical protocols, herbal medicine, Aura Cares';
    
    // Update Document Title
    if (document.title.includes('Aura Cares')) {
        document.title = document.title.replace('Aura Cares', siteName);
    }
    
    // Update Dynamic Branded Elements
    document.querySelectorAll('.dynamic-site-name').forEach(el => el.innerText = siteName);
    
    // Inject SEO Meta Tags
    let metaTags = document.querySelector('meta[name="keywords"]');
    if (metaTags) {
        metaTags.content = seoTags;
    } else {
        const meta = document.createElement('meta');
        meta.name = "keywords";
        meta.content = seoTags;
        document.head.appendChild(meta);
    }
}

// ======= GSAP & SCROLL =======
gsap.registerPlugin(ScrollTrigger);
window.addEventListener('load', () => { ScrollTrigger.refresh(); });

const WA_NUMBER = "2348114270136";
const WA_GREETING = "Hello! I am inquiring about a healthcare consultation regarding natural solutions. Topic: ";

function addToCart(p) { window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_GREETING + p + " Consultation.")}`, '_blank'); }
function chatWithConsultant(t = "General Inquiry") {
    const p = getPageKeyword().toUpperCase();
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Clinical Specialist Inquiry: " + t + " [" + p + "]")}`, '_blank');
}

// ======= PRODUCT ANIMATIONS =======
// Detect mobile once — used to guard GSAP hero animations
const isMobile = () => window.innerWidth <= 768;

document.addEventListener("DOMContentLoaded", () => {

    if (!isMobile()) {
        // ─── DESKTOP ONLY: Hero kinetic entrance ────────────────────────
        gsap.from("#fanta", { duration: 2.2, y: 400, scale: 0.1, rotation: -120, opacity: 0, ease: "elastic.out(1, 0.7)" });
        gsap.from("#product-bg-1", { duration: 2.5, x: -500, y: 300, rotation: -90, opacity: 0, delay: 0.2, ease: "back.out(1.2)" });
        gsap.from("#product-bg-2", { duration: 2.5, x: 500, y: -300, rotation: 90, opacity: 0, delay: 0.4, ease: "back.out(1.2)" });
        gsap.from("#orange-cut", { duration: 2.2, x: -300, y: -200, rotation: -180, opacity: 0, delay: 0.1, ease: "back.out(1.7)" });
        gsap.from("#orange", { duration: 2.2, x: 300, y: 200, rotation: 180, opacity: 0, delay: 0.2, ease: "back.out(1.7)" });
        gsap.from("#leaf", { duration: 2.5, y: -400, x: 200, rotation: 90, opacity: 0, delay: 0.3, ease: "power4.out" });
        gsap.from("#leaf2", { duration: 2.5, y: 400, x: -200, rotation: -90, opacity: 0, delay: 0.4, ease: "power4.out" });
        gsap.from(".hero-glow", { duration: 3.5, scale: 0, opacity: 0, ease: "expo.out" });

        // ─── DESKTOP ONLY: Organic idle float ───────────────────────────
        gsap.to("#fanta", { y: "-=20", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to("#product-bg-1", { y: "-=40", x: "+=20", rotation: "+=15", duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to("#product-bg-2", { y: "+=35", x: "-=25", rotation: "-=20", duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to("#orange-cut, #orange", { rotation: "+=360", duration: 30, repeat: -1, ease: "none" });
        gsap.to("#leaf, #leaf2", { y: "+=10", rotation: "+=5", duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });

        // ─── DESKTOP ONLY: Master scroll timeline (Hero → About) ─────────
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top bottom",
                end: "top top",
                scrub: 1.5,
            }
        });
        tl.to("#fanta", { top: "150vh", left: "20vw", width: "35vw", rotation: 360 }, "sync")
          .to("#product-bg-1", { top: "140vh", left: "5vw", opacity: 0.8 }, "sync")
          .to("#product-bg-2", { top: "160vh", right: "5vw", opacity: 0.8 }, "sync")
          .to("#orange-cut", { top: "140vh", left: "10vw", rotation: 180 }, "sync")
          .to("#orange", { top: "160vh", right: "5vw", rotation: -90 }, "sync")
          .to("#leaf", { top: "110vh", left: "80vw", rotation: 45 }, "sync")
          .to("#leaf2", { top: "190vh", left: "5vw", rotation: -45 }, "sync");

        // ─── DESKTOP ONLY: Exit timeline ─────────────────────────────────
        let tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "bottom 80%",
                end: "bottom 20%",
                scrub: 1,
            }
        });
        tl2.to("#fanta, #orange, #orange-cut, #leaf, #leaf2, #product-bg-1, #product-bg-2", {
            opacity: 0,
            scale: 0,
            stagger: 0.1,
            ease: "power2.in"
        });

    } else {
        // ─── MOBILE: Simple fade-in for #fanta only ──────────────────────
        const fantaEl = document.getElementById('fanta');
        if (fantaEl) {
            gsap.from(fantaEl, { duration: 1, opacity: 0, y: 30, ease: "power2.out" });
        }
        // Simple fade-in for hero glow
        gsap.from(".hero-glow", { duration: 1.5, opacity: 0, ease: "expo.out" });
    }

    // ─── ALL DEVICES: General scroll reveal (lighter on mobile) ──────────
    gsap.utils.toArray(".ind-card, .card, .sol-card, .cat-card, .faq-row, .botanical-origins").forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" },
            y: isMobile() ? 20 : 50,
            opacity: 0,
            duration: isMobile() ? 0.5 : 1,
            ease: "power2.out"
        });
    });

    // ─── DESKTOP ONLY: Botanical parallax ────────────────────────────────
    if (!isMobile()) {
        gsap.utils.toArray(".botanical-product-img").forEach(img => {
            gsap.to(img, {
                scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1 },
                y: -30, rotation: 5, scale: 1.05
            });
        });
    }

    // ─── MOBILE: Touch-drag for horizontal scrollable strips ─────────────
    if (isMobile()) {
        initTouchDrag('.cat-slider-container .cat-track');
        initTouchDrag('.testi-slider-container .testi-track');
        // Challenge packs strip — enable scroll snap
        document.querySelectorAll('.eight .testi-track[style*="overflow-x"]').forEach(el => {
            el.style.scrollSnapType = 'x mandatory';
            el.style.webkitOverflowScrolling = 'touch';
            el.querySelectorAll('.testi-card-v2').forEach(card => {
                card.style.scrollSnapAlign = 'start';
            });
        });
    }
    
    initBranding();
});

// ─── Touch-drag helper for auto-scroll strips on mobile ──────────────────────
function initTouchDrag(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    let startX, startScroll;
    el.addEventListener('touchstart', e => {
        startX = e.touches[0].pageX;
        startScroll = el.parentElement.scrollLeft;
    }, { passive: true });
    el.addEventListener('touchmove', e => {
        const dx = startX - e.touches[0].pageX;
        el.parentElement.scrollLeft = startScroll + dx;
    }, { passive: true });
}

// =====================================================================
// =====================================================================
//  1. DYNAMIC POOL WITH REAL-WORLD FEEL (100 ITEMS)
// =====================================================================
const TESTI_DATA = [];
const products_list = ["reishi", "gastrifort", "eye-beta", "constilease", "magilim", "diawell", "gynapharm", "golden-hypha", "lycovite", "cordy-royal-jelly", "haemocare", "calmazine", "multivitamin", "v-ca", "lirich", "massage-machine", "hydrogen-cup", "ginseng-coffee", "cello-q10", "cadibetter"];
const LOCS = ["Lagos, NG", "Abuja, FCT", "Accra, GH", "Port Harcourt", "Enugu, NG", "Kumasi, GH", "Kano State", "Ibadan City", "Benin, NG", "Warri, NG"];
const NAMES = ["Adebayo O.", "Chinedu W.", "Fathia M.", "Olawale K.", "Ngozi A.", "Emeka J.", "Aisha B.", "Babatunde S.", "Zainab Y.", "Ibrahim H.", "Tunde R.", "Simi L.", "Amadi V.", "Bolaji P.", "Ogechi F.", "Yusuf D.", "Kehinde Q.", "Taiwo G.", "Ifunanya X.", "Uzor Z."];
const STORIES = [
    "The clinical efficacy is beyond words! My energy levels have peaked since I started the protocol.",
    "I was skeptical at first, but after 2 weeks, the results speak for themselves. Truly natural healing.",
    "Finally found a solution that works without the side effects. Aura Cares has my full trust.",
    "The recovery timeline was much faster than I expected. My doctor was even surprised by the scan results!",
    "Amazing support and even better products. This has drastically improved my quality of life.",
    "I can't believe how much lighter I feel. The detoxification process was smooth and effective.",
    "My vitality has returned. I feel like I'm in my 20s again. Thank you for this life-changing protocol.",
    "Highly recommended for anyone looking for authentic, science-backed natural solutions."
];

for(let i=0; i<250; i++) {
    const p = products_list[i % products_list.length];
    const name = NAMES[i % NAMES.length];
    const loc = LOCS[i % LOCS.length];
    const story = STORIES[i % STORIES.length];
    TESTI_DATA.push({
        id: `buzz_${i}`,
        name: name, loc: loc,
        text: `My clinical experience with the ${p} protocol has been exceptional. ${story}`,
        img: `https://i.pravatar.cc/100?u=aura_user${i}`, tags: [p, "all"],
        likes: Math.floor(Math.random() * 200) + 50,
        loves: Math.floor(Math.random() * 150) + 20
    });
}

// =====================================================================
//  1B. REAL-TIME COMMENT ENGINE
// =====================================================================
let COMMENTS_DATA = JSON.parse(localStorage.getItem('aura_comments') || '[]');

if (COMMENTS_DATA.length === 0) {
    COMMENTS_DATA = [
        { id: 1, name: "Dr. Adebayo", text: "This protocol is clinically sound. We've seen remarkable results in patient adherence.", likes: 12, replies: [], date: "2h ago" },
        { id: 2, name: "Sarah J.", text: "Does this work for chronic cases? I've been struggling for years.", likes: 5, replies: [
            { id: 101, name: "Admin_Aura", text: "Yes Sarah, our protocols are designed for systemic restoration. Please use the consultant bubble for a private assessment.", likes: 8, date: "1h ago" }
        ], date: "1h ago" }
    ];
    localStorage.setItem('aura_comments', JSON.stringify(COMMENTS_DATA));
}

function submitComment() {
    const input = document.getElementById('comment-input');
    const nameInput = document.getElementById('comment-name');
    if (!input.value.trim()) return;

    const isAdmin = sessionStorage.getItem('admin_session') === 'true';
    const adminAlias = localStorage.getItem('aura_admin_alias') || 'Admin Moderator';
    
    const newComment = {
        id: Date.now(),
        name: isAdmin ? adminAlias : (nameInput.value.trim() || "Anonymous Patient"),
        text: input.value.trim(),
        likes: 0,
        replies: [],
        date: "Just now"
    };

    COMMENTS_DATA.unshift(newComment);
    localStorage.setItem('aura_comments', JSON.stringify(COMMENTS_DATA));
    input.value = '';
    initCommentsSection();
}

function likeComment(id) {
    COMMENTS_DATA.forEach(c => {
        if (c.id === id) c.likes++;
        c.replies.forEach(r => { if (r.id === id) r.likes++; });
    });
    localStorage.setItem('aura_comments', JSON.stringify(COMMENTS_DATA));
    initCommentsSection();
}

function toggleReplyForm(id) {
    const form = document.getElementById(`reply-form-${id}`);
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}

function submitReply(parentId) {
    const input = document.getElementById(`reply-input-${parentId}`);
    if (!input.value.trim()) return;

    const replyNameInput = document.getElementById('comment-name');
    const isAdmin = sessionStorage.getItem('admin_session') === 'true';
    const reply = {
        id: Date.now(),
        name: isAdmin ? "Admin Moderator" : (replyNameInput.value.trim() || "Aura Patient"),
        text: input.value.trim(),
        likes: 0,
        date: "Just now"
    };

    COMMENTS_DATA.forEach(c => {
        if (c.id === parentId) c.replies.push(reply);
    });

    localStorage.setItem('aura_comments', JSON.stringify(COMMENTS_DATA));
    initCommentsSection();
}

function initCommentsSection() {
    const container = document.getElementById('comments-thread');
    if (!container) return;
    const isBlog = document.getElementById('social-gallery')?.classList.contains('buzz-grid-blog');
    const blockClass = isBlog ? 'blog-comment-block' : 'comment-block';
    const blockStyle = isBlog ? '' : 'margin-bottom:20px; padding:20px; background:#fff; border-radius:15px; border:1px solid #eee;';

    container.innerHTML = COMMENTS_DATA.map(c => `
        <div class="${blockClass}" style="${blockStyle}">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <strong style="color:#4d231c;">${c.name}</strong>
                <span style="font-size:0.7rem; color:#999;">${c.date}</span>
            </div>
            <p style="font-size:0.9rem; color:#555; margin-bottom:15px;">${c.text}</p>
            <div style="display:flex; gap:15px;">
                <button onclick="likeComment(${c.id})" style="background:none; border:none; color:#ff9d00; font-size:0.8rem; cursor:pointer; font-weight:700;"><i class="ri-thumb-up-line"></i> ${c.likes}</button>
                <button onclick="toggleReplyForm(${c.id})" style="background:none; border:none; color:#666; font-size:0.8rem; cursor:pointer; font-weight:700;"><i class="ri-reply-line"></i> Reply</button>
            </div>
            <div id="reply-form-${c.id}" style="display:none; margin-top:15px; gap:10px;">
                <input id="reply-input-${c.id}" type="text" placeholder="Write a reply..." style="flex:1; padding:10px; border-radius:10px; border:1px solid #eee; font-size:0.8rem;">
                <button onclick="submitReply(${c.id})" style="padding:10px 15px; background:#4d231c; color:#fff; border:none; border-radius:10px; cursor:pointer;"><i class="ri-send-plane-fill"></i></button>
            </div>
            <div class="replies" style="margin-left:30px; margin-top:15px; padding-left:15px; border-left:2px solid #fdf8f6;">
                ${c.replies.map(r => {
                    const isAdminBySession = r.name.toLowerCase().includes('admin');
                    const adminBadgeHtml = isAdminBySession ? `<span style="background:#4d231c; color:#d4a017; font-size:0.6rem; padding:2px 6px; border-radius:4px; font-weight:900; letter-spacing:1px; margin-left:6px;">MODERATOR</span>` : '';
                    return `
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                            <strong style="font-size:0.8rem; color:#4d231c; display:flex; align-items:center;">${r.name}${adminBadgeHtml}</strong>
                            <span style="font-size:0.6rem; color:#999;">${r.date}</span>
                        </div>
                        <p style="font-size:0.8rem; color:#666; font-style: ${isAdminBySession ? 'normal' : 'italic'}">${r.text}</p>
                        <button onclick="likeComment(${r.id})" style="background:none; border:none; color:#ff9d00; font-size:0.75rem; cursor:pointer;"><i class="ri-thumb-up-line"></i> ${r.likes}</button>
                    </div>`;
                }).join('')}
            </div>
        </div>
    `).join('');
}

function getPageKeyword() {
    const name = window.location.pathname.split('/').pop().toLowerCase().replace('.html', '');
    if (!name || name === 'index') return 'reishi';
    
    // Clinical Guide Mappings to Primary Products
    const guides = {
        'liver-guide': 'lirich',
        'kidney-guide': 'golden-six',
        'eye-guide': 'eye-beta',
        'diabetes-guide': 'diawell',
        'hypertension-guide': 'cadibetter',
        'prostate-guide': 'vigor-essential',
        'fibroids-guide': 'gynapharm',
        'arthritis-guide': 'jointeez',
        'fertility-guide': 'gynapharm', // Usually fertility uses Gynapharm/Revive
        'piles-guide': 'constilease'
    };
    
    return guides[name] || name;
}

// =====================================================================
//  2. COMMUNITY BUZZ GRID + PREMIUM PAGINATION
// =====================================================================
let buzzPage = 0;
const BUZZ_PER_PAGE = 12;

function buildPageNumbers(current, total) {
    const pages = [];
    const delta = 2;
    let lastPushed = -1;
    for (let i = 0; i < total; i++) {
        if (i === 0 || i === total - 1 || (i >= current - delta && i <= current + delta)) {
            if (lastPushed !== -1 && i - lastPushed > 1) pages.push('...');
            pages.push(i);
            lastPushed = i;
        }
    }
    return pages.map(p => {
        if (p === '...') return `<span style="padding:0 6px;color:#ccc;font-weight:700;align-self:center;">…</span>`;
        const active = p === current;
        return `<button onclick="changeBuzzPage(${p})" style="width:38px;height:38px;border-radius:50%;border:2px solid ${active ? '#4d231c' : '#eee'};background:${active ? '#4d231c' : '#fff'};color:${active ? '#fff' : '#4d231c'};font-weight:700;font-size:0.85rem;cursor:pointer;transition:0.2s;" ${active ? 'aria-current="page"' : ''}>${p + 1}</button>`;
    }).join('');
}

function initCommunityBuzz() {
    const gallery = document.getElementById('social-gallery');
    const nav = document.getElementById('buzz-pagination');
    if (!gallery) return;

    const isBlog = gallery.classList.contains('buzz-grid-blog');
    const BUZZ_PER_PAGE = isBlog ? 9 : 12;   // 3×3 on blog, 4×3 elsewhere

    const kw = getPageKeyword();
    const filtered = TESTI_DATA.filter(t => t.tags.includes(kw) || t.tags.includes('all'));
    const totalPages = Math.ceil(filtered.length / BUZZ_PER_PAGE);
    const startIdx = buzzPage * BUZZ_PER_PAGE;
    const currentItems = filtered.slice(startIdx, startIdx + BUZZ_PER_PAGE);

    const badge = document.getElementById('buzz-total-count');
    if (badge) badge.innerText = filtered.length;

    gallery.innerHTML = currentItems.map((p, idx) => `
        <div style="background:#fff; padding:25px; border-radius:24px; border:1px solid #f0f0f0; box-shadow:0 10px 30px rgba(0,0,0,0.04); position:relative; overflow:hidden; transition: transform 0.3s ease;">
            <div style="color:#ff9d00; font-size:0.75rem; margin-bottom:10px; display:flex; gap:2px;"><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i></div>
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:15px;">
                <img src="${p.img}" onerror="this.src='https://i.pravatar.cc/100?u=fb${idx}'" style="width:45px; height:45px; border-radius:50%; object-fit:cover; border:2px solid #ff9d00;">
                <div>
                    <div style="display:flex; align-items:center; gap:5px;">
                        <strong style="font-size:0.9rem; color:#4d231c;">${p.name}</strong>
                        <i class="ri-verified-badge-fill" style="color:#1d9bf0; font-size:1rem;"></i>
                    </div>
                    <span style="font-size:0.75rem; color:#999;"><i class="ri-map-pin-line"></i> ${p.loc}</span>
                </div>
            </div>
            <p style="font-size:0.95rem; color:#555; margin-bottom:20px; line-height:1.6; font-style:italic;">"${p.text}"</p>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f9f9f9; padding-top:15px;">
                <div style="display:flex; gap:10px;">
                    <button onclick="buzzEngage(this,${p.loves})" style="padding:6px 14px; border-radius:30px; border:none; background:#fff2f4; color:#f43f5e; font-size:0.8rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px; transition:0.2s;"><i class="ri-heart-pulse-fill"></i> ${p.loves}</button>
                    <button onclick="buzzEngage(this,${p.likes})" style="padding:6px 14px; border-radius:30px; border:none; background:#f0f9ff; color:#0ea5e9; font-size:0.8rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px; transition:0.2s;"><i class="ri-thumb-up-fill"></i> ${p.likes}</button>
                    <button onclick="buzzShare()" style="padding:8px; border-radius:50%; border:none; background:#f0fdf4; color:#10b981; cursor:pointer; display:flex; align-items:center; justify-content:center;"><i class="ri-share-forward-2-fill"></i></button>
                </div>
                <span style="background:#fdf8f6; color:#ff9d00; padding:4px 12px; border-radius:10px; font-size:0.7rem; font-weight:800; text-transform:uppercase;">Verified</span>
            </div>
        </div>`).join('');

    if (nav) {
        initCommentsSection();
        const s = startIdx + 1, e = Math.min(startIdx + BUZZ_PER_PAGE, filtered.length);
        nav.style.cssText = '';
        nav.innerHTML = `
            <div style="text-align:center;margin-top:40px;">
                <p style="font-size:0.85rem;color:#999;margin-bottom:20px;">
                    Showing <strong style="color:#4d231c;">${s}–${e}</strong> of <strong style="color:#4d231c;">${filtered.length}</strong> verified stories
                </p>
                <div style="display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
                    <button onclick="changeBuzzPage(0)" ${buzzPage===0?'disabled':''} style="padding:8px 14px;border-radius:30px;border:1px solid #eee;background:#fff;color:#4d231c;font-weight:700;font-size:0.8rem;cursor:pointer;opacity:${buzzPage===0?0.35:1};transition:0.2s;"><i class="ri-skip-back-fill"></i></button>
                    <button onclick="changeBuzzPage(buzzPage-1)" ${buzzPage===0?'disabled':''} style="padding:8px 18px;border-radius:30px;border:1px solid #eee;background:#fff;color:#4d231c;font-weight:700;font-size:0.85rem;cursor:pointer;opacity:${buzzPage===0?0.35:1};transition:0.2s;"><i class="ri-arrow-left-s-line"></i> Prev</button>
                    <div style="display:flex;gap:6px;align-items:center;">${buildPageNumbers(buzzPage, totalPages)}</div>
                    <button onclick="changeBuzzPage(buzzPage+1)" ${buzzPage>=totalPages-1?'disabled':''} style="padding:8px 18px;border-radius:30px;border:1px solid #eee;background:#fff;color:#4d231c;font-weight:700;font-size:0.85rem;cursor:pointer;opacity:${buzzPage>=totalPages-1?0.35:1};transition:0.2s;">Next <i class="ri-arrow-right-s-line"></i></button>
                    <button onclick="changeBuzzPage(${totalPages-1})" ${buzzPage>=totalPages-1?'disabled':''} style="padding:8px 14px;border-radius:30px;border:1px solid #eee;background:#fff;color:#4d231c;font-weight:700;font-size:0.8rem;cursor:pointer;opacity:${buzzPage>=totalPages-1?0.35:1};transition:0.2s;"><i class="ri-skip-forward-fill"></i></button>
                </div>
                <div style="display:flex;justify-content:center;align-items:center;gap:10px;">
                    <span style="font-size:0.8rem;color:#999;">Go to page:</span>
                    <input type="number" min="1" max="${totalPages}" placeholder="${buzzPage+1}" style="width:58px;padding:7px;border-radius:10px;border:1px solid #eee;text-align:center;font-weight:700;font-size:0.85rem;" onkeydown="if(event.key==='Enter'){var v=parseInt(this.value)-1;if(v>=0&&v<${totalPages})changeBuzzPage(v);}">
                    <span style="font-size:0.8rem;color:#999;">of ${totalPages}</span>
                </div>
            </div>`;
    }
}



function buzzEngage(btn, startVal) {
    const cur = parseInt(btn.innerText.replace(/\D/g,'')) || startVal;
    const icon = btn.innerHTML.match(/<i[^>]+><\/i>/)?.[0] || '';
    btn.innerHTML = icon + ' ' + (cur + 1);
    btn.style.transform = 'scale(1.25)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
}

function buzzShare() {
    if (navigator.share) {
        navigator.share({ title: 'Aura Community Success', url: window.location.href });
    } else {
        navigator.clipboard && navigator.clipboard.writeText(window.location.href);
        alert('Link copied! Share your Aura success story.');
    }
}

function changeBuzzPage(page) {
    const kw = getPageKeyword();
    const total = Math.ceil(TESTI_DATA.filter(t => t.tags.includes(kw)||t.tags.includes('all')).length / BUZZ_PER_PAGE);
    buzzPage = Math.max(0, Math.min(parseInt(page), total - 1));
    initCommunityBuzz();
    const s = document.getElementById('community');
    if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =====================================================================
//  3. TELEHEALTH & PROGRESS
// =====================================================================
// =====================================================================
//  3. TELEHEALTH & PROGRESS TRACKER
// =====================================================================
function openTelehealth() { document.getElementById('telehealth-overlay').style.display = 'flex'; }
function closeTelehealth() { document.getElementById('telehealth-overlay').style.display = 'none'; }
function confirmBooking() { const d = document.getElementById('tele-date').value; chatWithConsultant(`Tele-Health Call: ${d}`); closeTelehealth(); }

let trackerOpen = false;
function toggleTracker() {
    const ui = document.getElementById('progress-tracker-ui');
    if (!ui) return;
    trackerOpen = !trackerOpen;
    ui.classList.toggle('open', trackerOpen);
}

function initProgressTracker() {
    const ui = document.getElementById('progress-tracker-ui'); if (!ui) return;
    const pid = getPageKeyword();
    let logs = JSON.parse(localStorage.getItem(`aura_logs_${pid}`) || '[]');
    const pct = Math.min((logs.length / 28) * 100, 100);
    const fill = document.getElementById('progress-fill');
    const count = document.getElementById('days-count');
    const streakEl = document.getElementById('streak-count');
    if (fill) fill.style.width = `${pct}%`;
    if (count) count.innerText = `${Math.min(logs.length, 28)}/28`;
    // Compute streak (consecutive days ending today)
    if (streakEl) {
        let streak = 0;
        const today = new Date().toLocaleDateString();
        for (let i = logs.length - 1; i >= 0; i--) {
            const d = new Date(logs[i]);
            const expected = new Date();
            expected.setDate(expected.getDate() - (logs.length - 1 - i));
            if (new Date(logs[i]).toLocaleDateString() === expected.toLocaleDateString()) streak++;
            else break;
        }
        streakEl.innerText = streak;
    }
    // Auto-open on first visit to hint user
    const hinted = sessionStorage.getItem('tracker_hinted');
    if (!hinted && logs.length < 28) {
        sessionStorage.setItem('tracker_hinted', '1');
        setTimeout(() => { trackerOpen = true; ui.classList.add('open'); }, 2500);
    }
}

function logTreatment(pid) {
    let logs = JSON.parse(localStorage.getItem(`kedi_logs_${pid}`) || '[]');
    const today = new Date().toLocaleDateString();
    if (logs.includes(today)) {
        const btn = document.getElementById('log-btn');
        if (btn) { btn.innerText = '✓ Already Logged!'; setTimeout(() => { btn.innerHTML = 'Log <i class="ri-check-double-line"></i>'; }, 2000); }
        return;
    }
    if (logs.length < 28) {
        logs.push(today);
        localStorage.setItem(`aura_logs_${pid}`, JSON.stringify(logs));
        initProgressTracker();
        const btn = document.getElementById('log-btn');
        if (btn) { btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)'; btn.innerHTML = '✓ Logged! <i class="ri-check-double-line"></i>'; setTimeout(() => { btn.style.background = 'linear-gradient(135deg,#25d366,#00b894)'; btn.innerHTML = 'Log <i class="ri-check-double-line"></i>'; }, 2000); }
    }
}

function resetTracker(pid) {
    if (!confirm('Reset your 28-day protocol log?')) return;
    localStorage.removeItem(`aura_logs_${pid}`);
    initProgressTracker();
}

// =====================================================================
//  4. QUIZ & TESTIMONIALS
// =====================================================================
function initTestimonialSlider() {
    const track = document.getElementById("testi-track-inner");
    if (!track) return;

    const kw = getPageKeyword();
    // Use up to 20 testimonials for performance, tripled for the infinite loop
    const filtered = TESTI_DATA.filter(t => t.tags.includes(kw) || t.tags.includes("all")).slice(0, 20);
    
    // Triple the data to create a seamless infinite scroll effect
    const tripleData = [...filtered, ...filtered, ...filtered];
    
    track.innerHTML = tripleData.map((t, idx) => `
        <div class="testi-card-premium" style="width:380px; background:#fff; padding:35px; border-radius:28px; flex-shrink:0; box-shadow:0 10px 40px rgba(0,0,0,0.03); border:1px solid rgba(0,0,0,0.05); position:relative; overflow:hidden;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
                <div style="color:#ff9d00; font-size:1rem; display:flex; gap:2px;">
                    <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i>
                </div>
                <span style="background:#fdf8f6; color:#10b981; padding:4px 10px; border-radius:10px; font-size:0.65rem; font-weight:800; text-transform:uppercase; display:flex; align-items:center; gap:4px;"><i class="ri-lock-2-fill"></i> Verified</span>
            </div>
            <p style="font-size:0.95rem; color:#555; font-style:italic; line-height:1.7; margin-bottom:25px;">"${t.text}"</p>
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="${t.img}" onerror="this.src='https://i.pravatar.cc/100?u=fb${idx}'" style="width:45px;height:45px;border-radius:50%;object-fit:cover;border:2px solid #ff9d00;">
                <div>
                    <div style="display:flex; align-items:center; gap:5px;">
                        <strong style="font-size:0.85rem; color:#4d231c;">${t.name}</strong>
                        <i class="ri-verified-badge-fill" style="color:#1d9bf0; font-size:0.9rem;"></i>
                    </div>
                    <span style="font-size:0.65rem; color:#999;">Clinical Success Participant</span>
                </div>
            </div>
        </div>`).join('');
}

let qs = 0; const QSTEPS = [{q:"Main Concern?", o:["Blood Sugar","Blood Pressure","Digestion","Vitality"]},{q:"History?", o:["Recent","Chronic"]}];
function openQuiz() { document.getElementById('quiz-overlay').style.display='flex'; renderQuiz(); }
function closeQuiz() { document.getElementById('quiz-overlay').style.display='none'; qs=0; }
function renderQuiz() {
    const q = QSTEPS[qs]; if(!q) { document.getElementById('quiz-options').innerHTML=`<p>Analysis Complete! Contact a Specialist for your protocol.</p><button class="btn-main" onclick="chatWithConsultant('Quiz Result')">Get Guidance</button>`; return; }
    document.getElementById('quiz-q').innerText=q.q; document.getElementById('quiz-options').innerHTML=q.o.map(o=>`<div class="quiz-option" onclick="qs++;renderQuiz()">${o}</div>`).join('');
}

window.addEventListener("load", () => {
    initTestimonialSlider(); 
    initCommunityBuzz(); 
    initCommentsSection();
    initProgressTracker();
    const fact_el = document.getElementById('trivia-display');
    if(fact_el) fact_el.innerHTML = `<p style="font-weight:600; color:#4d231c;">Natural herbal extracts support multi-system cellular repair.</p>`;
});

// ======= FAQ STRUCTURED DATA (MERGED) =======
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Kedi Reishi and how does it work?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kedi Reishi is a premium Ganoderma Lucidum supplement. It acts as a global biological reset." }
    },
    {
      "@type": "Question",
      "name": "Is Kedi Reishi NAFDAC approved?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, Kedi Reishi is officially registered and approved by NAFDAC in Nigeria." }
    },
    {
        "@type": "Question",
        "name": "What can I use for High Blood Pressure?",
        "acceptedAnswer": { "@type": "Answer", "text": "For hypertension, we recommend Kedi Reishi combined with Golden Six." }
    }
  ]
};
const scriptTag = document.createElement('script');
scriptTag.type = 'application/ld+json';
scriptTag.text = JSON.stringify(faqStructuredData);
document.head.appendChild(scriptTag);



// Professional Scroll Header Toggle (Boutique Feel)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header, nav');
    const promo = document.querySelector('.top-promo-bar');
    if(header) {
        const isScrolled = window.scrollY > 50;
        header.classList.toggle('scrolled', isScrolled);
        
        // Handle transparency vs solid state
        if (isScrolled) {
            header.style.background = "rgba(77, 35, 28, 0.95)";
            header.style.backdropFilter = "blur(20px)";
            header.style.borderBottom = "1px solid rgba(212, 160, 23, 0.2)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.1)";
            header.style.backdropFilter = "blur(12px)";
            header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
        }
    }
    
    // Smooth promo bar transition
    if (promo) {
        promo.style.opacity = window.scrollY > 100 ? '0.8' : '1';
        promo.style.transform = window.scrollY > 100 ? 'translateY(-5px)' : 'translateY(0)';
    }
});

// ======= MOBILE HAMBURGER MENU (Global Handler) =======
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('nav i.ri-menu-fill');
    const cntrNav  = document.querySelector('.cntr-nav');
    if (!menuIcon || !cntrNav) return;

    // Toggle on hamburger icon click
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        cntrNav.classList.toggle('active');
        // Swap icon visually
        menuIcon.classList.toggle('ri-close-line');
        menuIcon.classList.toggle('ri-menu-fill');
    });

    // Close when any nav link is clicked
    cntrNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            cntrNav.classList.remove('active');
            menuIcon.classList.add('ri-menu-fill');
            menuIcon.classList.remove('ri-close-line');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!cntrNav.contains(e.target) && !menuIcon.contains(e.target)) {
            cntrNav.classList.remove('active');
            menuIcon.classList.add('ri-menu-fill');
            menuIcon.classList.remove('ri-close-line');
        }
    });
});
