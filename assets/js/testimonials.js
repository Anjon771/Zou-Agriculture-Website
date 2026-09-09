/* Testimonial Section Slider with Touch & Navigation Controls */

export default function testimonials() {
    const testimonialsSection = document.querySelector('.testimonials__content');
    if (!testimonialsSection) return;

    const testimonialContainer = testimonialsSection.querySelector('.testimonials__list');
    const nextBtn = testimonialsSection.querySelector('.btn__testimonials__next');
    const prevBtn = testimonialsSection.querySelector('.btn__testimonials__prev');
    if (!testimonialContainer || !nextBtn || !prevBtn) return;

    const testimonialsList = testimonialContainer.querySelectorAll('.testimonial');
    if (testimonialsList.length === 0) return;

    let currentIndex = 0;
    const gridGap = 24;

    function getSlideMetrics() {
        const containerWidth = testimonialContainer.parentElement.clientWidth;
        const cardWidth = testimonialsList[0].offsetWidth + gridGap;
        const visibleCards = Math.max(1, Math.floor(containerWidth / cardWidth));
        const maxIndex = Math.max(0, testimonialsList.length - visibleCards);
        return { containerWidth, cardWidth, maxIndex };
    }

    function updateSlider() {
        const { cardWidth, maxIndex } = getSlideMetrics();
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

        const offset = currentIndex * cardWidth;
        testimonialContainer.style.transform = `translateX(-${offset}px)`;
        testimonialContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

        // Update button states
        if (currentIndex <= 0) {
            prevBtn.classList.add('disable');
            prevBtn.setAttribute('disabled', 'true');
        } else {
            prevBtn.classList.remove('disable');
            prevBtn.removeAttribute('disabled');
        }

        if (currentIndex >= maxIndex) {
            nextBtn.classList.add('disable');
            nextBtn.setAttribute('disabled', 'true');
        } else {
            nextBtn.classList.remove('disable');
            nextBtn.removeAttribute('disabled');
        }
    }

    nextBtn.addEventListener('click', () => {
        const { maxIndex } = getSlideMetrics();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            const { maxIndex } = getSlideMetrics();
            if (diff > 0 && currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSlider();
        }, 100);
    });

    // Initialize
    updateSlider();
}
