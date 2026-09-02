import home from './pages/home.js';
import shows from './pages/shows.js';
import movieDetails from './pages/movieDetails.js';
import showDetails from './pages/showDetails.js';

const routes = {
  'index.html': home,
  'shows.html': shows,
  'movie-details.html': movieDetails,
  'show-details.html': showDetails,
  // '/search.html': search,
};

function init() {
  const page = window.location.pathname.split('/').pop();
  const route = routes[page];

  if (route) {
    route();
  } else {
    console.warn(`No route found for: ${page}`);
  }
}

window.addEventListener('DOMContentLoaded', init);
