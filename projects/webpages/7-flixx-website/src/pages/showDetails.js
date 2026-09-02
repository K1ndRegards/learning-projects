import { fetchAPIData } from '../utils/api.js';
import { createElement } from '../utils/dom.js';

const UI = {
  bgImage: null,
  poster: null,
  title: null,
  rating: null,
  airDate: null,
  description: null,
  genresList: null,
  homepageLink: null,
  episodes: null,
  lastEpisode: null,
  status: null,
  companies: null,
};

function cacheDOM() {
  UI.bgImage = document.querySelector('#bg-image');
  UI.poster = document.querySelector('#poster');
  UI.title = document.querySelector('#title');
  UI.rating = document.querySelector('#rating');
  UI.airDate = document.querySelector('#air-date');
  UI.description = document.querySelector('#description');
  UI.genresList = document.querySelector('#genres-list');
  UI.homepageLink = document.querySelector('#homepage-link');
  UI.episodes = document.querySelector('#episodes');
  UI.lastEpisode = document.querySelector('#last-episode');
  UI.status = document.querySelector('#status');
  UI.companies = document.querySelector('#companies');
}

function fillShowData(showData) {
  if (showData.backdrop_path) {
    UI.bgImage.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${showData.backdrop_path}")`;
  } else {
    UI.bgImage.style.backgroundImage = 'url("./images/showcase-bg.jpg")';
  }

  if (showData.poster_path) {
    UI.poster.src = `https://image.tmdb.org/t/p/w500${showData.poster_path}`;
  }

  UI.title.textContent = showData.name;
  UI.rating.textContent = Number(showData.vote_average).toFixed(1);
  UI.airDate.textContent = showData.last_air_date;
  UI.description.textContent = showData.overview;

  UI.genresList.replaceChildren();
  showData.genres.forEach((genInfo) => {
    const genreItem = createElement('li', { text: genInfo.name });

    UI.genresList.appendChild(genreItem);
  });

  UI.homepageLink.href = showData.homepage;
  UI.episodes.textContent = showData.number_of_episodes;
  UI.lastEpisode.textContent = showData.last_episode_to_air.name;
  UI.status.textContent = showData.status;

  UI.companies.textContent = showData.production_companies
    .map((comp) => comp.name)
    .join(', ');
}

async function getShowData() {
  const params = new URLSearchParams(window.location.search);
  const showId = params.get('id');

  const showData = await fetchAPIData(`tv/${showId}`);

  return showData;
}

async function renderShowData() {
  const showData = await getShowData();

  fillShowData(showData);
}

export default function showDetails() {
  cacheDOM();
  renderShowData();
}
