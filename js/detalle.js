/**
 * Lógica exclusiva de la página detalle.html
 */
const loadShowDetail = async () => {
    // Leemos el parámetro "id" de la URL, ej: detalle.html?id=169
    const params = new URLSearchParams(window.location.search);
    const showId = params.get('id');

    const detailSection = document.getElementById('detail-section');

    if (!showId) {
        detailSection.innerHTML = '<p class="status-message">No se especificó ninguna serie. Regresa al inicio.</p>';
        return;
    }

    try {
        // Dos peticiones en paralelo con Promise.all, ambas a endpoints distintos
        const [show, episodes] = await Promise.all([
            fetchShowById(showId),
            fetchEpisodesByShowId(showId)
        ]);

        renderShowDetail(show, episodes);
    } catch (error) {
        detailSection.innerHTML = '<p class="status-message">No se pudo cargar la información de esta serie.</p>';
    }
};

document.addEventListener('DOMContentLoaded', loadShowDetail);