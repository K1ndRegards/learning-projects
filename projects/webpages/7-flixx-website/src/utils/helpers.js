import { createElement } from './dom.js';

export function applyBackdrop(element, path) {
  element.style.backgroundImage = path
    ? `url("https://image.tmdb.org/t/p/original${path}")`
    : 'url("./images/showcase-bg.jpg")';
}

export function applyPoster(element, path) {
  if (path) {
    element.src = `https://image.tmdb.org/t/p/w500${path}`;
  }
}

export function renderGenres(listElement, genres) {
  listElement.replaceChildren(
    ...genres.map((g) => createElement('li', { text: g.name })),
  );
}

export function renderCompanies(element, companies) {
  element.textContent =
    companies.length === 0
      ? 'No data'
      : companies.map((c) => c.name).join(', ');
}

export function getIdFromURL() {
  return new URLSearchParams(window.location.search).get('id');
}
