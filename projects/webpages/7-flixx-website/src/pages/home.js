import { fetchAPIData } from '../utils/api.js';
import { createSwiperPoster, createMoviePoster } from '../components/poster.js';

const UI = {
  movieContainer: null,
  swiper: null,
};

function cacheDOM() {
  UI.movieContainer = document.querySelector('#movie-container');
  UI.swiper = document.querySelector('.swiper-wrapper');
}

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  UI.movieContainer.replaceChildren();

  results.forEach((movie) => {
    const moviePoster = createMoviePoster(movie);

    UI.movieContainer.appendChild(moviePoster);
  });
}

function initSwiper() {
  new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

async function displaySwiper() {
  const { results } = await fetchAPIData('movie/now_playing');

  UI.swiper.replaceChildren(
    ...results.map((movie) => createSwiperPoster(movie)),
  );

  initSwiper();
}

export default function home() {
  cacheDOM();
  displayPopularMovies();
  displaySwiper();
}
