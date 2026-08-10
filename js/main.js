const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const loadInitialShows = async () => {
    renderMessage('Cargando series . . .');

    try {
        const shows = await fetchShows(0);
        renderShows(shows.slice(0, 40));
    } catch (error) {
        renderMessage('Ocurrió un ERROR al cargar las series. Intenta recargar la página.');
    }
};

const handleSearch = async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        loadInitialShows();
        return;
    }

    renderMessage(`Buscando "${query}" . . .`);

    try {
        const shows = await searchShows(query);
        renderShows(shows);
    } catch (error) {
        renderMessage('Ocurrió un ERROR al buscar. Intenta de nuevo.');
    }
};

/**
 * Delegación de eventos: un solo listener en el grid detecta clics
 * en cualquier tarjeta (incluso las agregadas dinámicamente).
 */
const handleGridClick = (event) => {
    const card = event.target.closest('.show-card');
    if (!card) return; // el clic no fue sobre una tarjeta

    const showId = card.dataset.showId;
    window.location.href = `detalle.html?id=${showId}`;
};

document.addEventListener('DOMContentLoaded', loadInitialShows);
searchForm.addEventListener('submit', handleSearch);
showsGrid.addEventListener('click', handleGridClick); 