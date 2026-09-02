import { fetchAPIData } from '../utils/api.js';
import { createElement } from '../utils/dom.js';

const UI = {
  showContainer: null,
};

function cacheDOM() {
  UI.showContainer = document.querySelector('#show-container');
}

function createShowPoster(showData) {
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

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  UI.showContainer.replaceChildren();

  results.forEach((show) => {
    const poster = createShowPoster(show);

    UI.showContainer.appendChild(poster);
  });
}

export default function shows() {
  cacheDOM();
  displayPopularShows();
}
