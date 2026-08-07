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
  image: document.querySelector('#image'),
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
  UI.image.src = state.data[state.current].image;

  UI.image.classList.remove('fade-in-image');
  // Forced reflow so that animation restarts at fast tab switching
  void UI.image.offsetWidth;
  UI.image.classList.add('fade-in-image');
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

// Save current tab to local storage
function saveToStorage() {
  localStorage.setItem('current', state.current);
}

// Load current tab from local storage
function loadFromStorage() {
  const current = localStorage.getItem('current');
  if (!current) return;

  state.current = current;
}

loadFromStorage();
render();

UI.tabsList.addEventListener('click', function (e) {
  if (e.target && e.target.closest('.list-item')) {
    // If users clicks at current tab
    // ignore it so that the animations don't start again.
    if (state.current === e.target.dataset.tab) return;

    state.current = e.target.dataset.tab;
    saveToStorage();
    render();
  }
});
