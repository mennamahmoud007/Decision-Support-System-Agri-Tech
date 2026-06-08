// Mobile navbar toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// Close nav when a link is clicked
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// Smooth scroll helper used by hero cards (onclick)
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// Navbar shrink on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 4px 20px rgba(18,55,42,0.12)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});
