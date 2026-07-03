document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;


// Store the selected elements that we are going to use.
const navbutton = document.querySelector('#ham-btn');

// Toggle the show class off and on
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
}); 

const navBar = document.querySelector('#nav-bar');