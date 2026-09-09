/* How It Works Interactive Stepper */

export default function works() {
    const worksSection = document.querySelector('.works__content');
    if (!worksSection) return;

    const progressbar = worksSection.querySelector('.form_progressbar');
    if (!progressbar) return;

    const progressbarSteps = progressbar.querySelectorAll('.progressbar__step');
    const stepContents = worksSection.querySelectorAll('.works__step__content');
    const firstStep = worksSection.querySelector('.first_step');

    function setActiveStep(stepNumber) {
        const stepIndex = parseInt(stepNumber, 10) - 1;
        if (stepIndex < 0 || stepIndex >= progressbarSteps.length) return;

        progressbarSteps.forEach((step, idx) => {
            if (idx <= stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
            if (idx === stepIndex) {
                step.classList.add('current');
            } else {
                step.classList.remove('current');
            }
        });

        stepContents.forEach((content, idx) => {
            if (idx === stepIndex) {
                content.classList.add('active-content');
            } else {
                content.classList.remove('active-content');
            }
        });

        if (firstStep) {
            firstStep.style.marginLeft = `-${stepIndex * 100}%`;
        }
    }

    progressbar.addEventListener('click', (event) => {
        const stepTarget = event.target.closest('.progressbar__step');
        if (stepTarget) {
            const dataStep = stepTarget.getAttribute('data-step');
            if (dataStep) {
                setActiveStep(dataStep);
            }
        }
    });

    // Initialize first step as active
    setActiveStep(1);
}
