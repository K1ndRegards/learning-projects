import { fetchAPIData } from '../utils/api.js';
import { createElement } from '../utils/dom.js';

const UI = {
  bgImage: null,
  poster: null,
  title: null,
  rating: null,
  releaseDate: null,
  description: null,
  genresList: null,
  homepageLink: null,
  budget: null,
  revenue: null,
  runtime: null,
  status: null,
  companies: null,
};

function cacheDOM() {
  UI.bgImage = document.querySelector('#bg-image');
  UI.poster = document.querySelector('#poster');
  UI.title = document.querySelector('#title');
  UI.rating = document.querySelector('#rating');
  UI.releaseDate = document.querySelector('#release-date');
  UI.description = document.querySelector('#description');
  UI.genresList = document.querySelector('#genres-list');
  UI.homepageLink = document.querySelector('#homepage-link');
  UI.budget = document.querySelector('#budget');
  UI.revenue = document.querySelector('#revenue');
  UI.runtime = document.querySelector('#runtime');
  UI.status = document.querySelector('#status');
  UI.companies = document.querySelector('#companies');
}

function fillMovieData(movieData) {
  if (movieData.backdrop_path) {
    UI.bgImage.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${movieData.backdrop_path}")`;
  } else {
    UI.bgImage.style.backgroundImage = 'url("./images/showcase-bg.jpg")';
  }

  if (movieData.poster_path) {
    UI.poster.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  }

  UI.title.textContent = movieData.title;
  UI.rating.textContent = Number(movieData.vote_average).toFixed(1);
  UI.releaseDate.textContent = movieData.release_date;
  UI.description.textContent = movieData.overview;

  UI.genresList.replaceChildren();
  movieData.genres.forEach((genInfo) => {
    const genreItem = createElement('li', { text: genInfo.name });

    UI.genresList.appendChild(genreItem);
  });

  UI.homepageLink.href = movieData.homepage;
  UI.budget.textContent = movieData.budget.toLocaleString('en-US');
  UI.revenue.textContent = movieData.revenue.toLocaleString('en-US');
  UI.runtime.textContent = movieData.runtime;
  UI.status.textContent = movieData.status;

  UI.companies.textContent = movieData.production_companies
    .map((comp) => comp.name)
    .join(', ');
}

async function getMovieData() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id');

  const movieData = await fetchAPIData(`movie/${movieId}`);

  return movieData;
}

async function renderMovieData() {
  const movieData = await getMovieData();

  fillMovieData(movieData);
}

export default function movieDetails() {
  cacheDOM();
  renderMovieData();
}
