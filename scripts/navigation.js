const navbutton = document.querySelector('#ham-btn');
const navBar = document.querySelector('nav');

// Toggle the show class off and on
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('open');
    navBar.classList.toggle('open');
}); 
