const IMAGE_PATHS = [
  './images/astronaut.webp',
  './images/black-hole.webp',
  './images/earth.webp',
  './images/galaxy.webp',
  './images/nebula.webp',
];

const UI = {
  cardTemplate: null,
  cardsContainer: null,
};

function cacheDOM() {
  UI.cardTemplate = document.querySelector('#card-panel-template');
  UI.cardsContainer = document.querySelector('#cards-container');
}

function extractFileNameFromPath(path) {
  return path.split('/').pop().split('.')[0];
}

function capitalizeString(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function createCardPanel(imagePath) {
  const clone = UI.cardTemplate.content.cloneNode(true);

  const imageName = extractFileNameFromPath(imagePath);

  const image = clone.querySelector('img');
  image.src = imagePath;
  image.alt = capitalizeString(imageName);

  const heading = clone.querySelector('h3');
  heading.textContent = capitalizeString(imageName);

  return clone;
}

function renderCards() {
  for (let i = 0; i < IMAGE_PATHS.length; i++) {
    const cardPanelClone = createCardPanel(IMAGE_PATHS[i]);
    const cardPanel = cardPanelClone.querySelector('.card-panel');
    if (i === 1) {
      cardPanel.classList.add('active');
    }

    if (i >= 3) {
      cardPanel.classList.add('hidden', 'md:block');
    }

    UI.cardsContainer.appendChild(cardPanel);
  }
}

function cardPanelClickHandler(e) {
  const closest = e.target.closest('.card-panel');

  if (closest) {
    Array.from(UI.cardsContainer.children).forEach((card) => {
      card === closest
        ? card.classList.add('active')
        : card.classList.remove('active');
    });
  }
}

function attachEvents() {
  UI.cardsContainer.addEventListener('click', cardPanelClickHandler);
}

function init() {
  cacheDOM();

  renderCards();

  attachEvents();
}

window.addEventListener('DOMContentLoaded', init);
