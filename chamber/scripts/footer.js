document.querySelector('#year').textContent = new Date().getFullYear();

const lastModified = document.querySelector('#last-modified');
lastModified.textContent = `Last Modification: ${document.lastModified}`;