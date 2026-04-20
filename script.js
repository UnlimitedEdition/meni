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
    if (!links.length || !('IntersectionObserver' in window)) return;
    const map = new Map();
    links.forEach(a => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) map.set(target, a);
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = map.get(entry.target);
            if (!link) return;
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    map.forEach((_, section) => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
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
