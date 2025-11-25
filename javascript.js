const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
const animatedElements = document.querySelectorAll('.animate');
const themeToggle = document.getElementById('theme-toggle');
const menuIcon = document.getElementById('menu-icon');
const navBar = document.querySelector('.navbar');
const body = document.body;

// --- TYPING ANIMATION LOGIC ---
const roles = ["Web Developer", "Frontend Developer", "Backend Developer"];
const roleElement = document.getElementById('role-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let deletingSpeed = 75;
let delay = 2000;

function typeWriter() {
    const currentRole = roles[roleIndex];

    // START: Cursor visibility during typing/deleting
    roleElement.classList.add('typing');

    if (isDeleting) {
        // Deleting text
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = deletingSpeed;
    } else {
        // Typing text
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing the current role, start idling/delay
        typingSpeed = delay;
        isDeleting = true;
        // HIDE CURSOR during static display (idling)
        roleElement.classList.remove('typing');

    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to the next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 300; // Small delay before typing the next word
    }

    setTimeout(typeWriter, typingSpeed);
}


// --- Menu Toggle Logic ---
menuIcon.onclick = () => {
    navBar.classList.toggle('active-nav');
    menuIcon.classList.toggle('bx-x'); // Changes icon to 'X'
};

// Close menu when a navigation link is clicked (mobile experience improvement)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navBar.classList.contains('active-nav')) {
            navBar.classList.remove('active-nav');
            menuIcon.classList.remove('bx-x');
        }
    });
});

// --- DARK MODE LOGIC (System Preference + Manual Toggle) ---
const activateDarkMode = (enable) => {
    if (enable) {
        body.classList.add('dark-mode');
        themeToggle.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        themeToggle.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
};

// 1. Initial Theme Check
const storedPreference = localStorage.getItem('darkMode');
const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedPreference === 'enabled') {
    activateDarkMode(true);
} else if (storedPreference === 'disabled') {
    activateDarkMode(false);
} else {
    // If no preference stored, follow system setting
    activateDarkMode(systemPreference);
}


// 2. Toggle listener
themeToggle.addEventListener('click', () => {
    // Toggle the current mode
    activateDarkMode(!body.classList.contains('dark-mode'));
});

// 3. Optional: Listen for system changes (if no manual preference is stored)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only change automatically if the user hasn't set a manual preference
    if (localStorage.getItem('darkMode') === null) {
        activateDarkMode(e.matches);
    }
});

// --- SCROLL ANIMATION LOGIC ---
const scrollHandler = () => {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // 1. Highlight active navigation link
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            // Assuming nav links use href="#id"
            const activeLink = document.querySelector('.navbar a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    // 2. Animate elements on scroll (Show/Hide bi-directionally)
    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();

        // Condition to show: Element top is visible (above 85% of window height) AND
        // the element bottom has not passed completely over the top edge of the window.
        if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
            element.classList.add('show-animate');
        } else {
            // Condition to hide: Element is outside the viewport (above or below)
            element.classList.remove('show-animate');
        }
    });
};


// --- INTERACTIVE MENU LOGIC ---
const menuItems = {
    all: [
        { icon: 'bx-music', title: 'Classical Overture', desc: 'Delicate French Onion Soup. Elegant and timeless. (Mood: Orchestral)', price: '£8.50', genre: 'classical' },
        { icon: 'bx-microphone', title: 'Hip Hop Fusion', desc: 'Spicy Korean BBQ Tacos with a lime kick. Bold and complex. (Mood: Street Style)', price: '£14.99', genre: 'hiphop' },
        { icon: 'bx-volume-full', title: 'Rock Anthem Platter', desc: 'Bourbon-glazed Chili Ribs served with a heavy side of smoked beans. (Mood: Hard & Heavy)', price: '£21.00', genre: 'rock' },
        { icon: 'bx-headphone', title: 'Jazz Riff Dessert', desc: 'Warm Chocolate Lava Cake with cool vanilla bean ice cream. Smooth and improvised. (Mood: Velvet Smooth)', price: '£9.25', genre: 'jazz' },
        { icon: 'bx-git-branch', title: 'R&B Slow Jam', desc: 'Smoked Salmon Risotto with Creamy Dill Sauce. Comforting and soulful.', price: '£18.00', genre: 'rnb' }
    ],
    classical: [
        { icon: 'bx-music', title: 'Classical Overture', desc: 'Delicate French Onion Soup. Elegant and timeless. (Mood: Orchestral)', price: '£8.50' },
        { icon: 'bx-wine', title: 'Vivace Salad', desc: 'Light, crisp greens with raspberry vinaigrette and candied pecans.', price: '£7.00' }
    ],
    hiphop: [
        { icon: 'bx-microphone', title: 'Hip Hop Fusion', desc: 'Spicy Korean BBQ Tacos with a lime kick. Bold and complex. (Mood: Street Style)', price: '£14.99' },
        { icon: 'bx-layer-plus', title: 'Mixtape Fries', desc: 'Loaded fries with three layers of cheese, bacon, and chili.', price: '£11.50' }
    ],
    rock: [
        { icon: 'bx-volume-full', title: 'Rock Anthem Platter', desc: 'Bourbon-glazed Chili Ribs served with a heavy side of smoked beans. (Mood: Hard & Heavy)', price: '£21.00' },
        { icon: 'bx-band-aid', title: 'Power Chord Burger', desc: 'Triple patty burger with aged cheddar and smoky BBQ sauce.', price: '£16.50' }
    ],
    jazz: [
        { icon: 'bx-headphone', title: 'Jazz Riff Dessert', desc: 'Warm Chocolate Lava Cake with cool vanilla bean ice cream. Smooth and improvised. (Mood: Velvet Smooth)', price: '£9.25' },
        { icon: 'bx-coffee', title: 'Blue Note Espresso', desc: 'Rich espresso with a hint of caramel and sea salt.', price: '£4.00' }
    ]
};

const menuContainer = document.getElementById('menu-interactive');
const genreOptions = document.querySelectorAll('.genre-option');

function renderMenu(genre) {
    menuContainer.innerHTML = '';
    const items = menuItems[genre] || menuItems.all;

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item-card';
        card.innerHTML = `
            <i class='bx ${item.icon}' ></i>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
            <span class="price">${item.price}</span>
        `;
        menuContainer.appendChild(card);
    });
}

function handleGenreSelection(event) {
    const option = event.target.closest('.genre-option');
    if (!option) return;

    genreOptions.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');

    const genre = option.getAttribute('data-genre');
    renderMenu(genre);
}

// --- COOKIE CONSENT LOGIC ---
const cookieBanner = document.getElementById('cookie-banner');
const acceptButton = document.getElementById('accept-cookies');
const COOKIE_KEY = 'cookiesAccepted';

function checkCookieConsent() {
    const accepted = localStorage.getItem(COOKIE_KEY);

    if (accepted !== 'true') {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'true');
        cookieBanner.classList.remove('show');
    });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Start the typing animation
    typeWriter();

    // 2. Initial menu render
    renderMenu('all');
    
    // 3. Check for cookie consent
    checkCookieConsent();
    
    // 4. Initial check for elements already in view on page load
    scrollHandler();
});

// Attach listener to the selector wrapper
document.getElementById('genre-selector').addEventListener('click', handleGenreSelection);

// Run on scroll
window.addEventListener('scroll', scrollHandler);
