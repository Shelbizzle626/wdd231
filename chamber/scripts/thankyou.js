// Mobile nav toggle now lives in scripts/nav.js (shared across all pages)

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