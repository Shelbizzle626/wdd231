// main.js — Stabby Rats Racing
// ES Module: loads rider data, renders cards, and handles the rider detail modal.
import { getFavorites, toggleFavorite } from "./favorites.js";
const FAVORITES_KEY = "stabbyRats.favoriteRiders";


/* ---------- Mobile nav toggle ---------- */

function wireNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // close menu when a link is tapped
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

document.addEventListener("DOMContentLoaded", wireNavToggle);

/* ---------- Rendering ---------- */

function renderRiderCard(rider, favorites) {
  const isFavorite = favorites.includes(rider.id);

  return `
    <article class="rider" data-rider-id="${rider.id}">
      <div class="rider-photo">
        <img src="${rider.photo}" alt="${rider.name} portrait" width="400" height="500" loading="lazy">
      </div>
      <div class="rider-body">
        <h3>${rider.name}</h3>
        <p class="rider-disc">${rider.discipline}</p>
        <button class="rider-more" data-rider-id="${rider.id}">More about ${rider.name}</button>
        <button class="rider-fav" data-rider-id="${rider.id}" aria-pressed="${isFavorite}">
          ${isFavorite ? '<span class="star">★</span> Favorited' : '<span class="star">☆</span> Favorite'}
        </button>
      </div>
    </article>
  `;
}

function renderRoster(riders) {
  const rosterEl = document.querySelector(".roster");
  if (!rosterEl) return;

  const favorites = getFavorites();

  // Array method: .map() turns each rider object into an HTML string,
  // then they are joined into one block to insert into the DOM.
  rosterEl.innerHTML = riders.map(rider => renderRiderCard(rider, favorites)).join("");
}

/* ---------- Modal ---------- */

function openRiderModal(rider) {
  const dialog = document.querySelector("#rider-dialog");
  if (!dialog) return;

  const photoEl = dialog.querySelector("#rider-dialog-photo");

  dialog.querySelector("#rider-dialog-name").textContent = rider.name;
  dialog.querySelector("#rider-dialog-disc").textContent = rider.discipline;
  dialog.querySelector("#rider-dialog-bio").textContent = rider.bio;
  photoEl.src = rider.photo;
  photoEl.alt = `${rider.name} portrait`;
  photoEl.style.objectPosition = rider.photoPosition || "center";

  dialog.showModal();
}

/* ---------- Event wiring ---------- */

function wireRosterEvents(riders) {
  const rosterEl = document.querySelector(".roster");
  if (!rosterEl) return;

  rosterEl.addEventListener("click", (event) => {
    const moreBtn = event.target.closest(".rider-more");
    const favBtn = event.target.closest(".rider-fav");

    if (moreBtn) {
      const rider = riders.find(r => r.id === moreBtn.dataset.riderId);
      if (rider) openRiderModal(rider);
    }

    if (favBtn) {
      const favorites = toggleFavorite(favBtn.dataset.riderId);
      const isFavorite = favorites.includes(favBtn.dataset.riderId);
      favBtn.setAttribute("aria-pressed", String(isFavorite));
      favBtn.textContent = isFavorite ? "★ Favorited" : "☆ Favorite";
    }
  });

  const dialog = document.querySelector("#rider-dialog");
  const closeBtn = dialog?.querySelector("#rider-dialog-close");
  closeBtn?.addEventListener("click", () => dialog.close());
}

/* ---------- Init ---------- */

async function loadRiders() {
  try {
    const response = await fetch("data/riders.json");

    if (!response.ok) {
      throw new Error(`Failed to load riders.json: ${response.status}`);
    }

    const riders = await response.json();

    renderRoster(riders);
    wireRosterEvents(riders);
  } catch (error) {
    console.error("Could not load rider data:", error);
    const rosterEl = document.querySelector(".roster");
    if (rosterEl) {
      rosterEl.innerHTML = "<p>Sorry, we couldn't load the roster right now.</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", loadRiders);
