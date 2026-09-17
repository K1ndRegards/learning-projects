import { fetchAPIData } from '../utils/api.js';
import { createShowPoster } from '../components/poster.js';

const UI = {
  showContainer: null,
};

function cacheDOM() {
  UI.showContainer = document.querySelector('#show-container');
}

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  UI.showContainer.replaceChildren();

  results.forEach((show) => {
    const poster = createShowPoster(show);

    UI.showContainer.appendChild(poster);
  });
}

export default function shows() {
  cacheDOM();
  displayPopularShows();
}
