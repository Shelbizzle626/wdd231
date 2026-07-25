// Mobile nav toggle
// NOTE: index.html doesn't currently load a script that wires up #menu-toggle.
// If a shared nav script (e.g. scripts/nav.js) is added later, this block can move there.
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

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