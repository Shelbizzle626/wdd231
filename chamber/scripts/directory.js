const menuToggle = document.querySelector('#menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

menuToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    const isOpen = primaryNav.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
});

const membershipLabels = {
    1: 'Member',
    2: 'Silver Member',
    3: 'Gold Member'
};

async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data.companies);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(companies) {
    const cardContainer = document.querySelector('#directory-cards');
    cardContainer.innerHTML = '';

    companies.forEach((company) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
  <div class="card-header">
    <h3>${company.name}</h3>
    <span class="badge badge-level-${company.membership}">${membershipLabels[company.membership]}</span>
  </div>
  <div class="card-body">
    <img src="images/${company.image}" alt="${company.name} logo" loading="lazy" width="100" height="100">
    <div class="card-info">
      <p>${company.tagline}</p>
      <p>${company.address}</p>
      <p>${company.phone}</p>
      <a href="${company.url}" target="_blank" rel="noopener">Visit Website</a>
    </div>
  </div>
`;

        cardContainer.appendChild(card);
    });
}

const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const cardContainer = document.querySelector('#directory-cards');

gridBtn.addEventListener('click', () => {
    cardContainer.classList.add('grid-view');
    cardContainer.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    cardContainer.classList.add('list-view');
    cardContainer.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});


getMembers();