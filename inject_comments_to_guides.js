const fs = require('fs');

const commentSystemHtml = `
        <!-- ======= SECTION: COMMENT SYSTEM ======= -->
        <section class="comment-system" style="padding: 10vh 8vw; background: #fdf8f6;">
            <div style="max-w: 1000px; margin: 0 auto;">
                <div class="comment-header" style="margin-bottom: 40px; text-align: center;">
                    <span class="tag" style="background: #fff; color: #d4a017; padding: 6px 15px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">Clinical Forum</span>
                    <h2 style="font-size: clamp(1.8rem, 3vw, 3rem); font-family: 'Playfair Display', serif; color: #4d231c; margin-top: 15px; font-weight: 900;">Discussion & <em style="color: #d4a017; font-style: italic;">Replies</em></h2>
                    <p style="color: #666; margin-top: 10px;">Join the discussion on these clinical protocols. Share your recovery journey or ask our clinical moderators.</p>
                </div>

                <div class="comment-form-container" style="background: #fff; padding: 30px; border-radius: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 50px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                        <input type="text" id="comment-name" placeholder="Your Name" style="padding: 12px 20px; border-radius: 15px; border: 1px solid #eee; outline: none; font-weight: 600;">
                        <div style="display: flex; align-items: center; gap: 10px; color: #10b981; font-size: 0.8rem; font-weight: 700;">
                            <i class="ri-verified-badge-fill"></i> Verified Patient Account
                        </div>
                    </div>
                    <textarea id="comment-input" placeholder="Share your experience or ask a question..." style="width: 100%; height: 120px; padding: 20px; border-radius: 15px; border: 1px solid #eee; outline: none; margin-bottom: 20px; resize: none; font-family: inherit;"></textarea>
                    <button onclick="submitComment()" style="background: #4d231c; color: #fff; border: none; padding: 15px 35px; border-radius: 50px; cursor: pointer; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; transition: 0.3s; display: flex; align-items: center; gap: 10px;">
                        Post Contribution <i class="ri-send-plane-fill"></i>
                    </button>
                </div>

                <div id="comments-thread" class="comments-list">
                    <!-- Dynamic Comments Injected Here by script.js -->
                </div>
            </div>
        </section>
`;

const files = fs.readdirSync('./').filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('-guide.html')) {
        let content = fs.readFileSync(file, 'utf8');

        // Check if comment system already exists
        if (!content.includes('id="comments-thread"')) {
            // Find the perfect spot: right before the 
            // "<!-- ======= RESTORED VERIFIED SUCCESS STORIES ======= -->"
            const searchStr = '<!-- ======= RESTORED VERIFIED SUCCESS STORIES ======= -->';
            if (content.includes(searchStr)) {
                content = content.replace(searchStr, commentSystemHtml + '\n        ' + searchStr);
                fs.writeFileSync(file, content);
                updatedCount++;
            }
        }
    }
}

console.log(`Successfully added missing Comment System Forum to ${updatedCount} health guide pages!`);
