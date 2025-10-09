const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const load = (k, fallback = null) => {
    try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
    catch { return fallback; }
};
const setYear = () => { const el = $('#year'); if (el) el.textContent = new Date().getFullYear(); };

const KIT_ITEMS = [
    { id: 'water', name: 'Water (liters)', perPersonPerDay: 3, category: 'Essentials' },
    { id: 'food', name: 'Non-perishable food (meals)', perPersonPerDay: 3, category: 'Essentials' },
    { id: 'light', name: 'Flashlight', perFamily: 1, category: 'Gear' },
    { id: 'radio', name: 'Battery/hand-crank radio', perFamily: 1, category: 'Gear' },
    { id: 'firstaid', name: 'First aid kit', perFamily: 1, category: 'Health' }
];

const CONTACTS = [
    { name: 'Emergency (Police/Fire/Ambulance)', phone: '911' },
    { name: 'Samoa Meteorology Division', phone: '+685 20855' },
    { name: 'Disaster Management Office', phone: '+685 23750' }
];

const kitItemRow = (label, qty) => `
  <li><label><input type="checkbox"> ${label}: <strong>${qty}</strong></label></li>`;
const contactItem = c => `<li><a href="tel:${c.phone.replace(/\s+/g, '')}">${c.name}</a> — ${c.phone}</li>`;

function initHome() {
}

function initKit() {
    const adults = $('#adults'), children = $('#children'), days = $('#days');
    const out = $('#kit-output');
    const calcBtn = $('#calc-btn'), clearBtn = $('#clear-btn');

    const saved = load('kitSettings', { adults: 2, children: 2, days: 3 });
    adults.value = saved.adults; children.value = saved.children; days.value = saved.days;

    function computeKit() {
        const a = Math.max(0, parseInt(adults.value || '0', 10));
        const c = Math.max(0, parseInt(children.value || '0', 10));
        const d = Math.max(1, parseInt(days.value || '1', 10));
        const people = a + c;

        const list = KIT_ITEMS.map(item => {
            let qty = 0;
            if (item.perPersonPerDay) qty += item.perPersonPerDay * people * d;
            if (item.perFamily) qty = Math.max(qty, item.perFamily);
            return kitItemRow(item.name, Math.ceil(qty));
        }).join('');

        out.innerHTML = `<ul>${list}</ul>
            <p class="muted">Saved for ${people} people × ${d} day(s).</p>`;
        
        save('kitSettings', { adults: a, children: c, days: d });
    }

    calcBtn?.addEventListener('click', computeKit);
    [adults, children, days].forEach(inp => inp?.addEventListener('change', computeKit));
    [adults, children, days].forEach(inp => inp?.addEventListener('input', () => {
        const a = parseInt(adults.value || '0', 10);
        const c = parseInt(children.value || '0', 10);
        const d = parseInt(days.value || '1', 10);
        save('kitSettings', { adults: a, children: c, days: d });
    }));

    clearBtn?.addEventListener('click', () => {
        localStorage.removeItem('kitSettings');
        adults.value = 2; children.value = 2; days.value = 3;
        out.innerHTML = `<p class="muted">Your checklist will appear here after you calculate.</p>`;
    });

    computeKit();
}

function initTips() {
    const quiz = $('#quiz');
    const result = $('#quiz-result');
    quiz?.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = $('#have-water').value;

        if (val === 'yes') {
            result.textContent = 'Great! Keep supplies rotated and sealed.';
        } else if (val === 'no') {
            result.textContent = 'Consider adding water: aim for 3–4 liters per person per day.';
        } else {
            result.textContent = 'Please choose an answer.';
        }
    });

    const form = $('#contact-form');
    const feedback = $('#contact-feedback');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            name: $('#name').value.trim(),
            email: $('#email').value.trim(),
            topic: $('#topic').value,
            message: $('#message').value.trim(),
            preferred: (new FormData(form)).get('preferred') || ''
        };

        if (!data.name || !data.email || !data.topic || !data.message || !data.preferred) {
            feedback.textContent = 'Please complete all required fields.';
            return;
        }
       
        const messages = load('contactMessages', []);
        messages.push({ ...data, ts: Date.now() });
        save('contactMessages', messages);

        feedback.textContent = `Thanks, ${data.name}! We received your message about "${data.topic}".`;
        form.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setYear();
        if (document.getElementById('kit')) initKit();
        if (document.getElementById('tips')) initTips();
});