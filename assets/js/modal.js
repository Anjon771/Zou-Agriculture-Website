/* Interactive Modals and Toast Notifications */

export default function modal() {
    const signupModal = document.getElementById('signup-modal');
    const farmModal = document.getElementById('farm-modal');
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');

    // Trigger buttons
    const signupTriggers = document.querySelectorAll('.trigger-signup');
    const farmTriggers = document.querySelectorAll('.trigger-farm-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-backdrop');

    function showToast(msg) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    function openModal(modalEl) {
        if (!modalEl) return;
        modalEl.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalEl) {
        if (!modalEl) return;
        modalEl.classList.remove('active');
        document.body.style.overflow = '';
    }

    function closeAllModals() {
        if (signupModal) signupModal.classList.remove('active');
        if (farmModal) farmModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Signup Triggers
    signupTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(signupModal);
        });
    });

    // Farm Modal Triggers
    farmTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const farmType = btn.getAttribute('data-farm-type') || 'short';
            populateFarmModal(farmType);
            openModal(farmModal);
        });
    });

    // Close buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });

    // Overlay click
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    // Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Handle Signup Form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('modal-name');
            const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Investor';
            closeModal(signupModal);
            showToast(`Welcome to Zou Farm, ${name}! Your investment account reservation has been created.`);
            signupForm.reset();
        });
    }

    // Role switcher inside signup modal
    const roleTabs = document.querySelectorAll('.role-tab-btn');
    const roleHiddenInput = document.getElementById('selected-role');
    roleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            roleTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const role = tab.getAttribute('data-role');
            if (roleHiddenInput) roleHiddenInput.value = role;
        });
    });

    // Populate Farm Modal with dynamic details
    function populateFarmModal(type) {
        const titleEl = document.getElementById('farm-modal-title');
        const descEl = document.getElementById('farm-modal-desc');
        const yieldEl = document.getElementById('farm-modal-yield');
        const termEl = document.getElementById('farm-modal-term');
        const locEl = document.getElementById('farm-modal-location');
        const minEl = document.getElementById('farm-modal-min');
        const progressEl = document.getElementById('farm-modal-progress');
        const progressTextEl = document.getElementById('farm-modal-progress-text');

        if (type === 'long') {
            if (titleEl) titleEl.textContent = 'Highland Regenerative Grain & Olive Co-Op';
            if (descEl) descEl.textContent = 'A 420-acre sustainable multi-crop agricultural trust specializing in heritage durum wheat, heirloom olives, and climate-resilient pulses with guaranteed distributor purchase agreements.';
            if (yieldEl) yieldEl.textContent = '15.4% Projected APY';
            if (termEl) termEl.textContent = '3 - 7 Years (Quarterly Distributions)';
            if (locEl) locEl.textContent = 'Murray Valley, VIC';
            if (minEl) minEl.textContent = '$2,500 AUD';
            if (progressEl) progressEl.style.width = '100%';
            if (progressTextEl) progressTextEl.textContent = '$1,200,000 / $1,200,000 (100% Fully Funded)';
        } else {
            if (titleEl) titleEl.textContent = 'Sunlit Valley Organic Citrus & Avocado Farm';
            if (descEl) descEl.textContent = 'High-yield commercial citrus and Hass avocado plantation utilizing drip micro-irrigation and organic certification. Harvest cycle scheduled for mid-year distribution with full USDA crop reinsurance.';
            if (yieldEl) yieldEl.textContent = '13.2% Projected APY';
            if (termEl) termEl.textContent = '6 - 18 Months (Single Harvest)';
            if (locEl) locEl.textContent = 'Riverina Basin, NSW';
            if (minEl) minEl.textContent = '$500 AUD';
            if (progressEl) progressEl.style.width = '84%';
            if (progressTextEl) progressTextEl.textContent = '$420,000 / $500,000 (84% Funded)';
        }
    }

    // Farm Modal invest button
    const farmInvestBtn = document.getElementById('farm-modal-invest-btn');
    if (farmInvestBtn) {
        farmInvestBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(farmModal);
            openModal(signupModal);
        });
    }

    // Newsletter quick forms
    const newsletterForms = document.querySelectorAll('.quick-newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (input && input.value) {
                showToast(`Thank you! We've sent the Farmland Investor Prospectus to ${input.value}.`);
                input.value = '';
            }
        });
    });
}
