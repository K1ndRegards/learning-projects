import { searchAPIData } from '../utils/api.js';
import { createMoviePoster, createShowPoster } from '../components/poster.js';

const state = {
  searchType: null,
  searchTerm: null,
  page: 1,
  totalPages: 0,
  totalResults: 0,
  results: [],
};

const UI = {
  posterContainer: null,
  searchHeading: null,
  pages: null,
  prevBtn: null,
  nextBtn: null,
  form: null,
  movieRadioBtn: null,
  showRadioBtn: null,
  searchInput: null,
  alertWindow: null,
};

let alertTimeoutId = null;

function cacheDOM() {
  UI.posterContainer = document.querySelector('#poster-container');
  UI.searchHeading = document.querySelector('#search-heading');
  UI.pages = document.querySelector('#pages');
  UI.prevBtn = document.querySelector('#previous-page');
  UI.nextBtn = document.querySelector('#next-page');
  UI.form = document.querySelector('#search-form');
  UI.movieRadioBtn = document.querySelector('#movie');
  UI.showRadioBtn = document.querySelector('#tv');
  UI.searchInput = document.querySelector('#search-term');
  UI.alertWindow = document.querySelector('#alert-window');
}

async function getSearchResults() {
  const URLParams = new URLSearchParams(window.location.search);

  state.searchType = URLParams.get('search-type');
  state.searchTerm = URLParams.get('search-term');

  const data = await searchAPIData(
    state.searchType,
    state.searchTerm,
    state.page,
  );

  state.results = data.results;
  state.totalPages = data.total_pages;
  state.totalResults = data.total_results;

  return data;
}

function fillPosterContainer() {
  if (state.searchType === 'movie') {
    UI.posterContainer.replaceChildren(
      ...state.results.map((r) => createMoviePoster(r)),
    );
  } else if (state.searchType === 'tv') {
    UI.posterContainer.replaceChildren(
      ...state.results.map((r) => createShowPoster(r)),
    );
  }
}

function fillPageDataFields() {
  if (state.results.length > 0) {
    UI.searchHeading.textContent = `${state.results.length} of ${state.totalResults} results for ${state.searchTerm}`;
  } else {
    UI.searchHeading.textContent = 'No results';
  }

  UI.pages.textContent = `Page ${state.page} of ${state.totalPages}`;
}

function manageButtonState() {
  UI.prevBtn.disabled = state.page === 1;
  UI.nextBtn.disabled = state.page === state.totalPages;
}

function checkRadioButtons() {
  if (state.searchType === 'movie') {
    UI.movieRadioBtn.checked = true;
    UI.showRadioBtn.checked = false;
  } else if (state.searchType === 'tv') {
    UI.movieRadioBtn.checked = false;
    UI.showRadioBtn.checked = true;
  }
}

function showAlertMessage(message) {
  if (alertTimeoutId) {
    UI.alertWindow.classList.remove('shake');
    clearTimeout(alertTimeoutId);
    alertTimeoutId = null;
  }

  UI.alertWindow.querySelector('p').textContent = message;
  UI.alertWindow.classList.remove('hidden');
  UI.alertWindow.classList.add('shake');
  UI.alertWindow.addEventListener('animationend', () => {
    UI.alertWindow.classList.remove('shake');
  });

  alertTimeoutId = setTimeout(() => {
    UI.alertWindow.classList.add('fade-out');
    UI.alertWindow.addEventListener(
      'animationend',
      () => {
        UI.alertWindow.classList.add('hidden');
        UI.alertWindow.classList.remove('fade-out');
      },
      { once: true },
    );
    clearTimeout(alertTimeoutId);
    alertTimeoutId = null;
  }, 3000);
}

function render() {
  fillPosterContainer();
  fillPageDataFields();
  manageButtonState();
  checkRadioButtons();

  if (state.searchTerm === '') {
    showAlertMessage('Enter correct term!');
  }

  if (state.searchTerm !== '' && state.results.length === 0) {
    showAlertMessage('No results found, try something else.');
  }

  // Scroll to top
  UI.searchHeading.scrollIntoView({ behavior: 'smooth' });
}

function init() {
  cacheDOM();

  UI.prevBtn.addEventListener('click', async () => {
    if (state.page > 1) {
      state.page--;
      await getSearchResults();
      render();
    }
  });

  UI.nextBtn.addEventListener('click', async () => {
    if (state.page < state.totalPages) {
      state.page++;
      await getSearchResults();
      render();
    }
  });

  UI.form.addEventListener('submit', function (e) {
    if (UI.searchInput.value === '') {
      e.preventDefault();
      showAlertMessage('Enter correct term!');
    }
  });
}

export default async function search() {
  init();
  await getSearchResults();
  render();
}
