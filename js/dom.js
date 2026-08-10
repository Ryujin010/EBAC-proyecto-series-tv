const showsGrid = document.getElementById('shows-grid');

const createShowCard = (show) => {
    const card = document.createElement('article');
    card.classList.add('show-card');
    card.dataset.showId = show.id; 

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('show-card__image-container');

    const image = document.createElement('img');
    image.classList.add('show-card__image');
    image.src = show.image ? show.image.medium : 'assets/img/placeholder.png';
    image.alt = `Póster de ${show.name}`;
    image.loading = 'lazy';

    imageContainer.appendChild(image);

    const info = document.createElement('div');
    info.classList.add('show-card__info');

    const name = document.createElement('h3');
    name.classList.add('show-card__name');
    name.textContent = show.name;

    const genresDiv = document.createElement('div');
    genresDiv.classList.add('show-card__genres');

    show.genres.forEach(genre => {
        const genreSpan = document.createElement('span');
        genreSpan.classList.add('show-card__genre');
        genreSpan.textContent = genre;
        genresDiv.appendChild(genreSpan);
    });

    info.appendChild(name);
    info.appendChild(genresDiv);

    card.appendChild(imageContainer);
    card.appendChild(info);

    return card;
};

const renderShows = (shows) => {
    showsGrid.innerHTML = '';

    if (shows.length === 0) {
        renderMessage('No se encontraron series con ese nombre.');
        return;
    }

    for (const show of shows) {
        const card = createShowCard(show);
        showsGrid.appendChild(card);
    }
};

const renderMessage = (text) => {
    showsGrid.innerHTML = '';
    const message = document.createElement('p');
    message.classList.add('status-message');
    message.textContent = text;
    showsGrid.appendChild(message);
};

/**
 * Renderiza la vista de detalle completa de una serie dentro de #detail-section
 */
const renderShowDetail = (show, episodes) => {
    const detailSection = document.getElementById('detail-section');
    detailSection.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.classList.add('show-detail');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('show-detail__image-container');
    const image = document.createElement('img');
    image.classList.add('show-detail__image');
    image.src = show.image ? show.image.original : 'assets/img/placeholder.png';
    image.alt = `Póster de ${show.name}`;
    imageContainer.appendChild(image);

    const info = document.createElement('div');
    info.classList.add('show-detail__info');

    const title = document.createElement('h2');
    title.classList.add('show-detail__title');
    title.textContent = show.name;

    const summary = document.createElement('p');
    summary.classList.add('show-detail__summary');
    // El summary de TVmaze viene con etiquetas <p> HTML incluidas
    summary.innerHTML = show.summary || 'Sin descripción disponible.';

    const meta = document.createElement('p');
    meta.classList.add('show-detail__meta');
    // Uso de template literal + ternario para manejar datos que pueden venir null
    meta.textContent = `${show.status} · ${show.premiered ? show.premiered.slice(0, 4) : 'N/A'} · ${episodes.length} episodios`;

    info.appendChild(title);
    info.appendChild(meta);
    info.appendChild(summary);

    wrapper.appendChild(imageContainer);
    wrapper.appendChild(info);

    detailSection.appendChild(wrapper);
};