const BASE_URL = 'https://api.tvmaze.com';

/**
 * Obtiene un listado general de series (paginado).
 * 
 * Endpoint 1: GET /shows
 * 
 */
const fetchShows = async (page = 0) => {
    try {
        const response = await axios.get(`${BASE_URL}/shows`, {
            params: { page }
        });
        return response.data;
    } catch (error) {
        console.error('ERROR al obtener el listado de series:', error);
        throw error;
    }
};

/**
 * Busca series por nombre.
 * 
 * Endpoint 2: GET /search/shows
 * 
 */
const searchShows = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/shows`, {
            params: { q: query }
        });
        return response.data.map(result => result.show);
    } catch (error) {
        console.error('ERROR al buscar series:', error);
        throw error;
    }
};

/**
 * Obtiene el detalle completo de una serie por su ID.
 * 
 * Endpoint 3: GET /shows/{id}
 
*/
const fetchShowById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/shows/${id}`);
        return response.data;
    } catch (error) {
        console.error(`ERROR al obtener el detalle de la serie ${id}:`, error);
        throw error;
    }
};

// [NUEVO]
/**
 * Obtiene los episodios de una serie por su ID.
 * 
 * Endpoint 4: GET /shows/{id}/episodes
 * 
 */
const fetchEpisodesByShowId = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/shows/${id}/episodes`);
        return response.data;
    } catch (error) {
        console.error(`ERROR al obtener episodios de la serie ${id}:`, error);
        throw error;
    }
};