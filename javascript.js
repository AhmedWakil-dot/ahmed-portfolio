// --- COOKIE CONSENT LOGIC ---
const cookieBanner = document.getElementById('cookie-banner');
const acceptButton = document.getElementById('accept-cookies');
const COOKIE_KEY = 'cookiesAccepted';

function checkCookieConsent() {
    // Check if the user has previously accepted cookies
    const accepted = localStorage.getItem(COOKIE_KEY);

    if (accepted !== 'true') {
        // If not accepted, show the banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000); 
    }

    // Listener to hide the banner and store the preference
    acceptButton.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'true');
        cookieBanner.classList.remove('show');
    });
}

// Call the function on load
document.addEventListener('DOMContentLoaded', checkCookieConsent);
