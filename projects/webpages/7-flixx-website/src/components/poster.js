import { createElement } from '../utils/dom.js';

export function createMoviePoster(movieData) {
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

export function createShowPoster(showData) {
  const poster = createElement('figure', {
    classes: 'poster-card',
  });

  let imgPath;
  if (showData.poster_path) {
    imgPath = `https://image.tmdb.org/t/p/w500${showData.poster_path}`;
  } else {
    imgPath = './images/no-image.jpg';
  }

  const img = createElement('a', {
    attrs: {
      href: `./show-details.html?id=${showData.id}`,
    },
    children: [
      createElement('img', {
        classes: 'poster-card__image',
        attrs: {
          src: imgPath,
          alt: showData.name,
        },
      }),
    ],
  });

  const caption = createElement('figcaption', {
    classes: 'poster-card__caption',
  });
  const title = createElement('h3', {
    classes: 'poster-card__title',
    text: showData.name,
  });
  const release = createElement('p', {
    classes: 'poster-card__release',
    children: [
      'Air date: ',
      createElement('span', { text: showData.first_air_date }),
    ],
  });

  caption.appendChild(title);
  caption.appendChild(release);

  poster.appendChild(img);
  poster.appendChild(caption);

  return poster;
}

export function createSwiperPoster(movieData) {
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
