// Mobile nav toggle now lives in scripts/nav.js (shared across all pages)

// Hidden timestamp field - set when the form loads
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toString();
}

// Membership benefit modals
document.querySelectorAll('.details-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const modal = document.getElementById(link.dataset.modal);
        if (modal && typeof modal.showModal === 'function') {
            modal.showModal();
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.focus();
            }
        }
    });
});

document.querySelectorAll('.benefits-modal').forEach((modal) => {
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.close());
    }
    // Close when clicking the backdrop
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});