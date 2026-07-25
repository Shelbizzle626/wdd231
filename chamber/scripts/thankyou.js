// Mobile nav toggle (see note in scripts/join.js re: shared nav script)
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

// Read the required fields back out of the GET query string
const params = new URLSearchParams(window.location.search);

const fieldMap = {
    'out-fname': 'fname',
    'out-lname': 'lname',
    'out-email': 'email',
    'out-phone': 'phone',
    'out-orgname': 'orgname',
    'out-timestamp': 'timestamp',
};

Object.entries(fieldMap).forEach(([elementId, paramName]) => {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = params.get(paramName) || 'Not provided';
    }
});