// Global state
const state = {
  current: 'astronaut',
  data: {
    astronaut: {
      image: './images/astronaut.webp',
      index: 0,
    },
    earth: {
      image: './images/earth.webp',
      index: 1,
    },
    galaxy: {
      image: './images/galaxy.webp',
      index: 2,
    },
    'black-holes': {
      image: './images/black-hole.webp',
      index: 3,
    },
    nebula: {
      image: './images/nebula.webp',
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
  Array.from(UI.images.children).forEach((img) => {
    img.classList.add('hidden');
    // Remove animation class so that it could occur multiple times
    img.classList.remove('fade-in-image');
  });

  const img = UI.images.querySelector(`img[data-image="${state.current}"]`);
  // Show current topic image
  img.classList.remove('hidden');
  // Add animation class
  img.classList.add('fade-in-image');
}

// Function to change description to current topics one
function setDescription() {
  // Hide all descriptions
  Array.from(UI.descriptions.children).forEach((description) => {
    description.classList.add('hidden');
    // Remove animation class so that it could occur multiple times
    description.classList.remove('fade-in-text');
  });

  const description = UI.descriptions.querySelector(
    `div[data-description="${state.current}"]`,
  );

  description.classList.remove('hidden');
  // add animation class
  description.classList.add('fade-in-text');
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
