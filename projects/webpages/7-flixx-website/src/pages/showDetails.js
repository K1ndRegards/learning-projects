import { fetchAPIData } from '../utils/api.js';
import {
  applyBackdrop,
  applyPoster,
  renderGenres,
  renderCompanies,
  getIdFromURL,
} from '../utils/helpers.js';

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
  applyBackdrop(UI.bgImage, showData.backdrop_path);
  applyPoster(UI.poster, showData.poster_path);

  UI.title.textContent = showData.name;
  UI.rating.textContent = Number(showData.vote_average).toFixed(1);
  UI.airDate.textContent = showData.last_air_date;
  UI.description.textContent = showData.overview;

  renderGenres(UI.genresList, showData.genres);

  UI.homepageLink.href = showData.homepage;
  UI.episodes.textContent = showData.number_of_episodes;
  UI.lastEpisode.textContent = showData.last_episode_to_air.name;
  UI.status.textContent = showData.status;

  renderCompanies(UI.companies, showData.production_companies);
}

async function getShowData() {
  const showData = await fetchAPIData(`tv/${getIdFromURL()}`);

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
