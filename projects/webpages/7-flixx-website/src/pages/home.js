import { fetchAPIData } from '../utils/api.js';
import { createElement } from '../utils/dom.js';

const UI = {
  movieContainer: null,
};

function cacheDOM() {
  UI.movieContainer = document.querySelector('#movie-container');
}

function createMoviePoster(movieData) {
  const poster = createElement('figure', {
    classes: 'poster-card',
  });

  let imgPath;
  if (movieData.poster_path) {
    imgPath = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  } else {
    imgPath = './images/no-image.jpg';
  }

  const img = createElement('a', {
    attrs: {
      href: './movie-details.html',
    },
    children: [
      createElement('img', {
        classes: 'poster-card__image',
        attrs: {
          src: imgPath,
          alt: movieData.title,
        },
      }),
    ],
  });

  const caption = createElement('figcaption', {
    classes: 'poster-card__caption',
  });
  const title = createElement('h3', {
    classes: 'poster-card__title',
    text: movieData.title,
  });
  const release = createElement('p', {
    classes: 'poster-card__release',
    children: [
      'Release: ',
      createElement('span', { text: movieData.release_date }),
    ],
  });

  caption.appendChild(title);
  caption.appendChild(release);

  poster.appendChild(img);
  poster.appendChild(caption);

  return poster;
}

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  UI.movieContainer.replaceChildren();

  results.forEach((movie) => {
    const moviePoster = createMoviePoster(movie);

    UI.movieContainer.appendChild(moviePoster);
  });
}

export default function home() {
  cacheDOM();
  displayPopularMovies();
}
