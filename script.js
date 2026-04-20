const GA_MEASUREMENT_ID = 'G-SBTBNFZN7E';

function showPopup(title, ingredients, allergens) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-ingredients').textContent = 'Sastojci: ' + ingredients;
    document.getElementById('popup-allergens').textContent = 'Alergeni: ' + allergens;
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    popup.classList.add('active');
    overlay.classList.add('active');
    popup.focus();
}

function closePopup() {
    document.getElementById('popup').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('popup').classList.contains('active')) {
        closePopup();
    }
});

function loadGoogleAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
}

function initThemeSwitcher() {
    const buttons = document.querySelectorAll('.theme-btn');
    if (!buttons.length) return;
    const root = document.documentElement;
    const saved = localStorage.getItem('meni_theme');
    if (saved) root.setAttribute('data-theme', saved);
    const current = root.getAttribute('data-theme') || 'classic';
    buttons.forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.theme === current);
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            root.setAttribute('data-theme', theme);
            localStorage.setItem('meni_theme', theme);
            buttons.forEach(b => b.classList.toggle('is-active', b === btn));
        });
    });
}

function initScrollReveal() {
    const sections = document.querySelectorAll('.menu > section');
    if (!('IntersectionObserver' in window)) {
        sections.forEach(s => s.classList.add('revealed'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    sections.forEach(s => observer.observe(s));
}

function initCatnavActive() {
    const links = document.querySelectorAll('.catnav a');
    if (!links.length) return;
    const nav = document.querySelector('.catnav-inner');
    const map = new Map();
    links.forEach(a => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) map.set(target, a);
    });
    const sections = [...map.keys()];
    if (!sections.length) return;

    let currentActive = null;
    let ticking = false;

    function centerChipInNav(link) {
        if (!nav) return;
        const chipRect = link.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const offset = (chipRect.left - navRect.left) - (navRect.width - chipRect.width) / 2;
        const target = nav.scrollLeft + offset;
        if (Math.abs(target - nav.scrollLeft) < 4) return;
        nav.scrollTo({ left: target, behavior: 'smooth' });
    }

    function update() {
        ticking = false;
        const anchorY = (window.innerHeight * 0.25) + 60;
        let active = sections[0];
        for (const section of sections) {
            if (section.getBoundingClientRect().top - anchorY <= 0) active = section;
        }
        if (active === currentActive) return;
        currentActive = active;
        const link = map.get(active);
        links.forEach(l => l.classList.toggle('active', l === link));
        centerChipInNav(link);
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
}

document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initScrollReveal();
    initCatnavActive();

    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');
    const consent = localStorage.getItem('cookie_consent');

    if (consent === 'accepted') {
        loadGoogleAnalytics();
    } else if (consent !== 'rejected' && cookieBanner) {
        cookieBanner.classList.add('show');
    }

    acceptButton?.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        cookieBanner?.classList.remove('show');
        loadGoogleAnalytics();
    });

    rejectButton?.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'rejected');
        cookieBanner?.classList.remove('show');
    });
});
