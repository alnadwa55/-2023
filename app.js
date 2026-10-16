'use strict';
const CFG = Object.assign({academicYear:'2025-2026',seatsAvailable:null,whatsappNumber:'',submitEndpoint:''}, window.SITE_CONFIG||{});

// ── DATA (من الملف الأصلي) ──
const SPECIALIZATIONS = [
    { name: "مساعد خدمات صحية", icon: "fas fa-user-md" },
    { name: "مساعد خدمات بترولية", icon: "fas fa-oil-can" },
    { name: "فني مساحة وخرائط", icon: "fas fa-map-marked-alt" },
    { name: "فني تحاليل طبية", icon: "fas fa-vial" },
    { name: "صحافة وإعلام", icon: "fas fa-newspaper" },
    { name: "علم نفس", icon: "fas fa-brain" },
    { name: "تفصيل وخياطة", icon: "fas fa-tshirt" },
    { name: "إدارة الجودة", icon: "fas fa-award" },
    { name: "التغذية العلاجية", icon: "fas fa-apple-alt" },
    { name: "السلامة والصحة المهنية", icon: "fas fa-hard-hat" },
    { name: "إدارة المشروعات", icon: "fas fa-tasks" },
    { name: "TOT تدريب المدربين", icon: "fas fa-chalkboard-teacher" },
    { name: "نظم إدارة الطاقة", icon: "fas fa-bolt" },
    { name: "تصميم الجرافيك والمونتاج", icon: "fas fa-paint-brush" },
    { name: "المهارات المهنية وسوق العمل", icon: "fas fa-tools" },
    { name: "إدارة الأزمات (عسكري)", icon: "fas fa-exclamation-triangle" },
    { name: "الأمن الوطني (عسكري)", icon: "fas fa-shield-alt" },
    { name: "الأمن السيبراني (عسكري)", icon: "fas fa-lock" },
    { name: "كورس اللغة الإنجليزية المكثف", icon: "fas fa-language" },
    { name: "ضيافة جوية", icon: "fas fa-plane" }
];

const FEATURES = [
    { title: "شهادات معتمدة رسمياً", icon: "fas fa-certificate", desc: "معتمدة من جهات حكومية ورسمية معترف بها" },
    { title: "تدريب عملي ونظري", icon: "fas fa-flask", desc: "تطبيق حقيقي وميداني على أيدي خبراء متخصصين" },
    { title: "تقسيط ميسّر", icon: "fas fa-credit-card", desc: "خطط دفع مرنة تناسب جميع الظروف" },
    { title: "مدربون خبراء معتمدون", icon: "fas fa-chalkboard-teacher", desc: "كوادر تدريسية متميزة بخبرات واسعة" },
    { title: "دعم التوظيف", icon: "fas fa-briefcase", desc: "فرص تدريب وتوظيف لخريجي الأكاديمية" },
    { title: "بيئة تعليمية متطورة", icon: "fas fa-laptop", desc: "أحدث التقنيات والوسائل التعليمية الحديثة" }
];

const MILITARY_PROGRAMS = [
    "إدارة الأزمات", "الأمن الوطني", "الأمن السيبراني",
    "التطور التكنولوجي", "صناعة القرار", "التحليل السياسي",
    "إدارة التفاوض", "الذكاء الاصطناعي",
    "التخطيط الاستراتيجي", "TOT المدربين"
];

const STATS = [
    { num: "5000+", label: "متدرب خرّيج" },
    { num: "25+", label: "خبير معتمد" },
    { num: "20+", label: "تخصص متنوع" },
    { num: "100%", label: "رضا المتدربين" }
];

// ── RENDER ──
function loadFeatures() {
    const c = document.getElementById('featuresContainer');
    if (!c) return;
    c.innerHTML = FEATURES.map(f => `
        <div class="card fade-in">
            <div class="card-icon"><i class="${f.icon}"></i></div>
            <h3>${f.title}</h3>
            <p>${f.desc}</p>
        </div>`).join('');
}

function loadMilitary() {
    const c = document.getElementById('militaryProgramsContainer');
    if (!c) return;
    c.innerHTML = MILITARY_PROGRAMS.map(p => `
        <div class="program-card fade-in">
            <i class="fas fa-graduation-cap"></i>
            <h3>${p}</h3>
        </div>`).join('');
}

function loadStats() {
    const c = document.getElementById('statsGrid');
    if (!c) return;
    c.innerHTML = STATS.map(s => `
        <div class="stat-card fade-in">
            <div class="stat-number">${s.num}</div>
            <div class="stat-label">${s.label}</div>
        </div>`).join('');
}

function loadSpecializations() {
    const container = document.getElementById('specsContainer');
    const select = document.getElementById('specialization');
    if (!container || !select) return;

    container.innerHTML = '';
    select.innerHTML = '<option value="">اختر التخصص المطلوب</option>';

    SPECIALIZATIONS.forEach(spec => {
        const card = document.createElement('div');
        card.className = 'card spec-card fade-in';
        card.dataset.name = spec.name;
        card.innerHTML = `
            <i class="${spec.icon} spec-icon"></i>
            <h3>${spec.name}</h3>
            <button class="btn btn-primary" onclick="selectSpecialization('${spec.name.replace(/'/g, "\\'")}')" style="margin-top:12px; width:100%;">
                <i class="fas fa-check-circle"></i> اختر هذا التخصص
            </button>`;
        container.appendChild(card);

        const opt = document.createElement('option');
        opt.value = spec.name;
        opt.textContent = spec.name;
        select.appendChild(opt);
    });
}

window.filterSpecs = function() {
    const q = document.getElementById('specsSearch').value.trim().toLowerCase();
    document.querySelectorAll('#specsContainer .spec-card').forEach(card => {
        const name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(q) ? '' : 'none';
    });
};

window.selectSpecialization = function(name) {
    const sel = document.getElementById('specialization');
    if (sel) sel.value = name;
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
    showAlert('تم الاختيار', `تخصص "${name}"`, 'success');
};

// ── COPY ──
window.copyToClipboard = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.innerText.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => showAlert('تم النسخ ✓', text, 'success'))
            .catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
};

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); showAlert('تم النسخ ✓', text, 'success'); }
    catch { showAlert('تعذّر النسخ', 'انسخ الرقم يدوياً', 'danger'); }
    document.body.removeChild(ta);
}

// ── MOBILE MENU ──
function setupMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mobileNav');
    const close = document.getElementById('mobileClose');
    const overlay = document.getElementById('mobileNavOverlay');

    function openMenu() { nav.classList.add('active'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { nav.classList.remove('active'); overlay.classList.remove('active'); document.body.style.overflow = ''; }

    if (btn) btn.addEventListener('click', openMenu);
    if (close) close.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', closeMenu));
}

// ── BACK TO TOP ──
function setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 350);
    }, { passive: true });
    btn.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

// ── SCROLL ANIMATIONS ──
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ── ACTIVE NAV ON SCROLL ──
function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 100) current = s.id;
        });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }, { passive: true });
}

// ── ALERT (آمن: textContent) ──
function showAlert(title, msg, type = 'success') {
    document.querySelectorAll('.floating-alert').forEach(el => el.remove());
    const div = document.createElement('div');
    div.className = 'floating-alert ' + type;
    div.setAttribute('role', 'status');
    const icon = document.createElement('i');
    icon.className = 'fas fa-' + (type === 'success' ? 'check-circle' : type === 'danger' ? 'times-circle' : 'exclamation-circle');
    const span = document.createElement('span');
    span.textContent = ` ${title}: ${msg}`;
    div.append(icon, span);
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3800);
}

// ── SEATS (قيمة ثابتة من config.js — لا عدّاد وهمي) ──
function updateSeatUI() {
    const seats = CFG.seatsAvailable;
    const hero = document.getElementById('heroSeats');
    const ann = document.getElementById('seatsAnnouncement');
    if (seats === null || seats === undefined) { if (hero) hero.style.display = 'none'; return; }
    const d = document.getElementById('seatCountDisplay');
    if (d) d.textContent = seats;
    if (!ann) return;
    const mk = (cls, text) => { ann.replaceChildren(); const i = document.createElement('i'); i.className = cls; const s = document.createElement('span'); s.textContent = ' ' + text; ann.append(i, s); };
    if (seats <= 0) { mk('fas fa-times-circle', 'نفدت المقاعد المتاحة'); ann.style.background = 'linear-gradient(90deg,#d63031,#e17055)'; }
    else if (seats <= 15) { mk('fas fa-exclamation-triangle', `تنبيه: متبقي ${seats} مقعد فقط! سجل الآن.`); ann.style.background = 'linear-gradient(90deg,#e17055,#d63031)'; }
    else mk('fas fa-bullhorn', `فتح باب القبول ${CFG.academicYear} - متبقي ${seats} مقعد`);
}

// ── VALIDATION ──
const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const normDigits = v => v.replace(/[٠-٩]/g, d => AR_DIGITS.indexOf(d));
const RULES = {
    fullName: [v => v.length >= 6 && v.split(/\s+/).filter(Boolean).length >= 2, 'nameError', 'أدخل الاسم الرباعي كاملاً (على الأقل كلمتين)'],
    phone: [v => /^01[0125][0-9]{8}$/.test(normDigits(v)), 'phoneError', 'رقم هاتف مصري صحيح مكوّن من 11 رقم'],
    email: [v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'emailError', 'أدخل بريداً إلكترونياً صحيحاً'],
    specialization: [v => !!v, 'specError', 'يرجى اختيار تخصص']
};
function showError(id, msg) { const el = document.getElementById(id); if (!el) return; el.querySelector('span').textContent = msg; el.classList.add('visible'); }
function hideError(id) { const el = document.getElementById(id); if (el) el.classList.remove('visible'); }
function validateField(id) {
    const [test, errId, msg] = RULES[id];
    const ok = test(document.getElementById(id).value.trim());
    ok ? hideError(errId) : showError(errId, msg);
    return ok;
}

// ── REGISTRATION (حقيقي: Google Sheet عند ضبط الرابط + واتساب دائماً) ──
function buildWaLink(r) {
    const text = ['طلب تسجيل جديد - أكاديمية انطلاق', `الاسم: ${r.name}`, `الهاتف: ${r.phone}`, `البريد: ${r.email}`, `التخصص: ${r.specialization}`, r.message ? `ملاحظات: ${r.message}` : ''].filter(Boolean).join('\n');
    return `https://wa.me/${CFG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
async function sendToEndpoint(reg) {
    // text/plain يتفادى preflight مع Google Apps Script؛ no-cors لأن الرد غير قابل للقراءة
    await fetch(CFG.submitEndpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(reg) });
}
function showSuccessModal(reg, sent) {
    const box = document.getElementById('modalDetails');
    box.replaceChildren();
    [['fa-user', 'الاسم', reg.name], ['fa-graduation-cap', 'التخصص', reg.specialization], ['fa-calendar-alt', 'التاريخ', reg.date]].forEach(([ic, l, v]) => {
        const p = document.createElement('p'); const i = document.createElement('i'); i.className = 'fas ' + ic;
        p.append(i, document.createTextNode(` ${l}: ${v}`)); box.appendChild(p);
    });
    document.getElementById('modalWa').href = buildWaLink(reg);
    document.getElementById('successModal').classList.add('active');
}
window.closeModal = () => document.getElementById('successModal').classList.remove('active');
document.addEventListener('click', e => { if (e.target.id === 'successModal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function setupRegistration() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    const btn = document.getElementById('submitBtn');
    const label = btn.innerHTML;
    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (document.getElementById('website').value) return; // honeypot (بوت)
        const ok = Object.keys(RULES).map(validateField).every(Boolean);
        if (!ok) return;
        if (CFG.seatsAvailable !== null && CFG.seatsAvailable <= 0) { showAlert('عذراً', 'لا توجد مقاعد متاحة حالياً', 'danger'); return; }
        const last = +localStorage.getItem('intlaq_last_submit') || 0;
        if (Date.now() - last < 30000) { showAlert('انتظر قليلاً', 'تم إرسال طلب منذ لحظات', 'warning'); return; }

        const reg = {
            name: document.getElementById('fullName').value.trim(),
            phone: normDigits(document.getElementById('phone').value.trim()),
            email: document.getElementById('email').value.trim(),
            specialization: document.getElementById('specialization').value,
            message: document.getElementById('message').value.trim(),
            date: new Date().toLocaleString('ar-EG'),
            timestamp: new Date().toISOString()
        };
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        try {
            if (CFG.submitEndpoint) await sendToEndpoint(reg);
            localStorage.setItem('intlaq_last_submit', String(Date.now()));
            form.reset();
            showSuccessModal(reg);
            if (!CFG.submitEndpoint) window.open(buildWaLink(reg), '_blank', 'noopener');
        } catch {
            showAlert('تعذّر الإرسال', 'سنفتح واتساب لإرسال الطلب مباشرة', 'danger');
            window.open(buildWaLink(reg), '_blank', 'noopener');
        } finally {
            btn.disabled = false; btn.innerHTML = label;
        }
    });
    ['fullName', 'phone', 'email'].forEach(id => document.getElementById(id).addEventListener('input', () => validateField(id)));
    document.getElementById('specialization').addEventListener('change', () => validateField('specialization'));
}

// ── PROGRESS + COUNTERS ──
function setupProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    const f = () => { const m = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${m > 0 ? scrollY / m : 0})`; };
    addEventListener('scroll', f, { passive: true }); f();
}
function setupCounters() {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(es => es.forEach(en => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const m = en.target.textContent.match(/^(\d+)(.*)$/);
        if (!m || reduce) return;
        const end = +m[1], t0 = performance.now(), dur = 1400;
        const tick = t => { const k = Math.min((t - t0) / dur, 1); en.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + m[2]; if (k < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
    }), { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => io.observe(el));
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-year]').forEach(el => el.textContent = CFG.academicYear);
    document.title = document.title.replace(/\d{4}-\d{4}/, CFG.academicYear);
    const y = document.getElementById('yearNow'); if (y) y.textContent = new Date().getFullYear();
    loadFeatures(); loadMilitary(); loadStats(); loadSpecializations();
    setupRegistration(); setupMobileMenu(); setupBackToTop(); setupScrollAnimations(); setupActiveNav(); updateSeatUI(); setupProgress(); setupCounters();
    setTimeout(() => {
        const ld = document.getElementById('loading');
        if (ld) { ld.classList.add('hidden'); setTimeout(() => ld.remove(), 650); }
        document.querySelectorAll('.fade-in').forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('visible'); });
    }, 300);
});
