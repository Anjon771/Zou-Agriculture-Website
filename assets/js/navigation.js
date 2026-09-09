/* Navigation Menu and Header Interactions */
export default function navigation() {
    const nav = document.querySelector('.header__nav__content');
    const hamburgerMenu = document.querySelector('.hamburger-menu-wrap');
    const closeIcon = document.querySelector('.nav-close-icon');
    const header = document.querySelector('header');
    const menuLinks = document.querySelectorAll('.menu__link');
    const backdrop = document.querySelector('.nav-backdrop');

    function openNav() {
        if (nav) nav.classList.add('open');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        if (nav) nav.classList.remove('open');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            openNav();
        });
    }

    if (closeIcon) {
        closeIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            closeNav();
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            closeNav();
        });
    }

    // Close nav when clicking any navigation link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            closeNav();
        });
    });

    // Sticky header background transition on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            if (header) header.classList.add('header--scrolled');
        } else {
            if (header) header.classList.remove('header--scrolled');
        }
    });
}
