/* Farm Investment Return Calculator */

export default function calculator() {
    const slider = document.getElementById('calc-amount');
    const amountDisplay = document.getElementById('calc-amount-display');
    const totalReturnDisplay = document.getElementById('calc-total-return');
    const annualReturnDisplay = document.getElementById('calc-annual-return');
    const acresDisplay = document.getElementById('calc-acres');
    const carbonDisplay = document.getElementById('calc-carbon');
    const presetButtons = document.querySelectorAll('.calc-preset-btn');
    const termButtons = document.querySelectorAll('.calc-term-btn');

    if (!slider || !amountDisplay) return;

    let currentTerm = 2; // Default 2 years
    const baseRate = 0.138; // 13.8% avg annualized APY

    function updateCalculations() {
        const amount = parseInt(slider.value, 10);
        amountDisplay.textContent = '$' + amount.toLocaleString();

        // Calculate compound/projected return: Amount * (1 + rate)^years
        const totalValue = Math.round(amount * Math.pow(1 + baseRate, currentTerm));
        const profit = totalValue - amount;
        const annualPayout = Math.round(profit / currentTerm);

        // Impact metrics: ~1 acre per $4,000 invested; ~0.8 tons CO2 per $1,000
        const acres = (amount / 3500).toFixed(1);
        const carbon = (amount * 0.00085 * currentTerm).toFixed(1);

        if (totalReturnDisplay) {
            totalReturnDisplay.textContent = '$' + totalValue.toLocaleString();
        }
        if (annualReturnDisplay) {
            annualReturnDisplay.textContent = '+$' + annualPayout.toLocaleString() + '/yr';
        }
        if (acresDisplay) {
            acresDisplay.textContent = acres + ' Acres';
        }
        if (carbonDisplay) {
            carbonDisplay.textContent = carbon + ' t CO₂';
        }

        // Update slider fill track
        const min = parseInt(slider.min, 10) || 1000;
        const max = parseInt(slider.max, 10) || 100000;
        const percentage = ((amount - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #15803d 0%, #22c55e ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;

        // Update active preset button if match
        presetButtons.forEach(btn => {
            const val = parseInt(btn.getAttribute('data-value'), 10);
            if (val === amount) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    slider.addEventListener('input', updateCalculations);

    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-value');
            if (val) {
                slider.value = val;
                updateCalculations();
            }
        });
    });

    termButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            termButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTerm = parseInt(btn.getAttribute('data-term'), 10) || 2;
            updateCalculations();
        });
    });

    // Initial calculation run
    updateCalculations();
}
