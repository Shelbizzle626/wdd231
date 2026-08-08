const FAVORITES_KEY = "stabbyRats.favoriteRiders";

export function getFavorites() {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function toggleFavorite(riderId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(riderId);

    if (index === -1) {
        favorites.push(riderId);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
}