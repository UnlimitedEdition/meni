function showPopup(title, ingredients, allergens) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-ingredients').textContent = 'Sastojci: ' + ingredients;
    document.getElementById('popup-allergens').textContent = 'Alergeni: ' + allergens;
    document.getElementById('popup').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closePopup() {
    document.getElementById('popup').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

// Cookie Consent Logic
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');
    const consent = localStorage.getItem('cookie_consent');

    // Function to load Google Analytics script
    function loadGoogleAnalytics() {
        const script = document.getElementById('google-analytics-script');
        if (script) {
            script.innerHTML = `
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=G-SBTBNFZN7E';
                document.head.appendChild(script);

                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-SBTBNFZN7E');
            `;
        }
    }

    // Check consent status
    if (consent === 'accepted') {
        loadGoogleAnalytics();
    } else if (consent === 'rejected') {
        // Do nothing, GA is not loaded
    } else {
        // No consent found, show banner
        if (cookieBanner) {
            cookieBanner.classList.add('show');
        }
    }

    // Event listeners for buttons
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'accepted');
            if (cookieBanner) {
                cookieBanner.classList.remove('show');
            }
            loadGoogleAnalytics(); // Load GA after accepting
        });
    }

    if (rejectButton) {
        rejectButton.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'rejected');
            if (cookieBanner) {
                cookieBanner.classList.remove('show');
            }
            // GA is not loaded
        });
    }
});
