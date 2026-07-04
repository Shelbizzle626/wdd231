
const currentYearSpan = document.getElementById("currentYear");
currentYearSpan.textContent = new Date().getFullYear();

document.getElementById("lastModified").innerHTML =
    "Last Updated: " + document.lastModified;