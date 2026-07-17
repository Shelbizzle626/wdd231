const spotlightContainer = document.querySelector('.spotlight-cards');

async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data.companies);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displaySpotlights(companies) {
    // Only gold (3) or silver (2) members qualify
    const eligible = companies.filter(company => company.membership === 2 || company.membership === 3);

    // Shuffle the eligible array
    const shuffled = eligible.sort(() => Math.random() - 0.5);

    // Randomly choose 2 or 3 cards to display
    const numToShow = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffled.slice(0, numToShow);

    const membershipLabels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

    const html = selected.map(company => `
        <div class="spotlight-card">
            <img src="images/${company.image}" alt="${company.name} logo">
            <h3>${company.name}</h3>
            <p class="membership-level">${membershipLabels[company.membership]} Member</p>
            <p>${company.address}</p>
            <p>${company.phone}</p>
            <a href="${company.url}" target="_blank" rel="noopener">Visit Website</a>
        </div>
    `).join('');

    spotlightContainer.innerHTML = html;
}

getSpotlights();