import { places } from '../data/places.mjs';

const container = document.querySelector('#discover-cards');

places.forEach((place) => {
    const card = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = place.name;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = place.photo_url;
    img.alt = place.name;
    img.width = 300;
    img.height = 200;
    img.loading = 'lazy';
    figure.appendChild(img);

    const address = document.createElement('address');
    address.textContent = place.address;

    const description = document.createElement('p');
    description.textContent = place.description;

    const button = document.createElement('button');
    button.textContent = 'Learn More';
    button.setAttribute('aria-label', `Learn more about ${place.name}`);

    card.append(title, figure, address, description, button);
    container.appendChild(card);
});


// --- Visit message ---
function getVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    let message;

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffDays = Math.floor((now - Number(lastVisit)) / msPerDay);

        if (diffDays < 1) {
            message = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${diffDays} days ago.`;
        }
    }

    localStorage.setItem('lastVisit', now.toString());
    return message;
}

const visitMessage = document.querySelector('#visit-message');
if (visitMessage) {
    visitMessage.textContent = getVisitMessage();
}