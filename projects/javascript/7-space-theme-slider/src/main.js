// Main state object
const state = {
  currentSlideIndex: 0,
};

// User interface elements
const UI = {
  leftArrow: null,
  rightArrow: null,
  slider: null,
  dots: null,
};

// Create dots
function createDot(slideIndex) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.dataset.slideIndex = slideIndex;

  return dot;
}

// Fill dots container with dots
function fillDotsContainer() {
  // Clear dots container in case there is something
  dots.replaceChildren();

  // Iterate through images and create dot for each one
  Array.from(UI.slider.children).forEach((_, index) => {
    const newDot = createDot(index);
    // If current dot is created -> add 'current' class
    if (state.currentSlideIndex === index) {
      newDot.classList.add('current');
    }
    dots.appendChild(newDot);
  });
}

function setCurrentDot() {
  Array.from(UI.dots.children).forEach((dot) => {
    if (Number(dot.dataset.slideIndex) !== state.currentSlideIndex) {
      dot.classList.remove('current');
    } else {
      dot.classList.add('current');
    }
  });
}

function setCurrentImage() {
  Array.from(UI.slider.children).forEach((img, index) => {
    img.style.transform = `translateX(-${100 * state.currentSlideIndex}%)`;
  });
}

// Save current slide to localStorage
function saveToStorage() {
  localStorage.setItem('slide', String(state.currentSlideIndex));
}

// Load current slide from localStorage
function loadFromStorage() {
  const save = localStorage.getItem('slide');

  if (!save) return;

  state.currentSlideIndex = Number(save);
}

// Main render function
function render() {
  setCurrentDot();
  setCurrentImage();
}

// Click on dot
function dotClickHandler(e) {
  const closest = e.target.closest('.dot');

  if (!closest) return;

  state.currentSlideIndex = Number(closest.dataset.slideIndex);

  saveToStorage();
  render();
}

// Click on left arrow
function leftArrowClickHandler() {
  state.currentSlideIndex -= 1;

  if (state.currentSlideIndex < 0)
    state.currentSlideIndex = UI.slider.children.length - 1;

  saveToStorage();
  render();
}

// Click on right arrow
function rightArrowClickHandler() {
  state.currentSlideIndex += 1;

  if (state.currentSlideIndex > UI.slider.children.length - 1)
    state.currentSlideIndex = 0;

  saveToStorage();
  render();
}

// Main initializer
function init() {
  UI.leftArrow = document.querySelector('#left-arrow');
  UI.rightArrow = document.querySelector('#right-arrow');
  UI.slider = document.querySelector('#slider');
  UI.dots = document.querySelector('#dots');

  UI.dots.addEventListener('click', dotClickHandler);

  UI.leftArrow.addEventListener('click', leftArrowClickHandler);

  UI.rightArrow.addEventListener('click', rightArrowClickHandler);

  fillDotsContainer();
  loadFromStorage();
  render();
}

init();
