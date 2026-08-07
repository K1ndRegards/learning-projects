// Global state
const state = {
  current: 'astronaut',
  data: {
    astronaut: {
      image: './images/astronaut.jpg',
      index: 0,
    },
    earth: {
      image: './images/earth.jpg',
      index: 1,
    },
    galaxy: {
      image: './images/galaxy.jpg',
      index: 2,
    },
    'black-hole': {
      image: './images/black-hole.jpg',
      index: 3,
    },
    nebula: {
      image: './images/nebula.jpg',
      index: 4,
    },
  },
};

// UI elements
const UI = {
  images: document.querySelector('#images'),
  tabsList: document.querySelector('#tabs-list'),
  descriptions: document.querySelector('#descriptions'),
};

// Function to remove highlight class from every tab
// and set it to current topic tab
function setCurrentTab() {
  Array.from(UI.tabsList.children).forEach((tab) =>
    tab.classList.remove('highlight'),
  );

  UI.tabsList
    .querySelector(`li[data-tab="${state.current}"]`)
    .classList.add('highlight');
}

// Function to change image
function setCurrentImage() {
  // Hide all images
  Array.from(UI.images.children).forEach((img) => img.classList.add('hidden'));

  UI.images
    .querySelector(`img[data-image-name="${state.current}"]`)
    .classList.remove('hidden');
}

// Function to change description to current topics one
function setDescription() {
  Array.from(UI.descriptions.children).forEach((descr) =>
    descr.classList.add('hidden'),
  );

  UI.descriptions
    .querySelector(`p[data-description=${state.current}]`)
    .classList.remove('hidden');
}

// Main render function
function render() {
  setCurrentTab();
  setCurrentImage();
  setDescription();
}

UI.tabsList.addEventListener('click', function (e) {
  if (e.target && e.target.closest('.list-item')) {
    state.current = e.target.dataset.tab;
    render();
  }
});
