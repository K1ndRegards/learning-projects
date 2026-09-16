import { fetchAPIData } from '../utils/api.js';
import { createElement } from '../utils/dom.js';

const UI = {
  movieContainer: null,
  swiper: null,
};

function cacheDOM() {
  UI.movieContainer = document.querySelector('#movie-container');
  UI.swiper = document.querySelector('.swiper-wrapper');
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
      href: `./movie-details.html?id=${movieData.id}`,
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

function createSwiperPoster(movieData) {
  const swiperSlide = createElement('div', {
    classes: ['swiper-slide'],
  });

  const link = createElement('a', {
    attrs: {
      href: `movie-details.html?id=${movieData.id}`,
    },
    children: [
      createElement('img', {
        attrs: {
          src: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
          alt: movieData.title,
        },
      }),
    ],
  });

  const rating = createElement('h3', {
    classes: ['p-4', 'text-center', 'text-lg', 'font-bold', 'bg-background'],
    children: [
      createElement('i', { classes: ['fa-solid', 'fa-star', 'text-accent'] }),
      createElement('span', { text: ' ' + movieData.vote_average.toFixed(1) }),
      ' / 10',
    ],
  });

  swiperSlide.appendChild(link);
  swiperSlide.appendChild(rating);

  return swiperSlide;
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
