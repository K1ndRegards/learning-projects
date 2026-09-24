const state = {
  currentId: 1,
  numOfCircles: 4,
};

// =====================================================
// ********************* DOM cache *********************
// =====================================================

const UI = {
  incrementBtn: null,
  decrementBtn: null,
  progressLine: null,
  circleContainer: null,
  prevBtn: null,
  nextBtn: null,
};

function cacheDOM() {
  UI.incrementBtn = document.querySelector('#increment-button');
  UI.decrementBtn = document.querySelector('#decrement-button');
  UI.progressLine = document.querySelector('#progress-line');
  UI.circleContainer = document.querySelector('#circle-container');
  UI.prevBtn = document.querySelector('#prev-button');
  UI.nextBtn = document.querySelector('#next-button');
}

// =====================================================
// ********************* Helpers ***********************
// =====================================================

function getCircle(id) {
  return document.querySelector(`[data-circle-id="${id}"]`);
}

function createCircle(id) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.dataset.circleId = id;
  circle.textContent = id;

  return circle;
}
// =====================================================
// ***************** Event Handlers ********************
// =====================================================

function prevBtnHandler() {
  if (state.currentId > 1) {
    state.currentId--;

    render();
  }
}

function nextBtnHandler() {
  if (state.currentId < UI.circleContainer.children.length) {
    state.currentId++;

    render();
  }
}

function circleEventHandler(e) {
  const closest = e.target.closest('.circle');

  if (closest) {
    state.currentId = Number(closest.dataset.circleId);

    render();
  }
}

function incrementBtnHandler() {
  if (state.numOfCircles < 8) {
    state.numOfCircles++;
    state.currentId = Math.min(state.currentId, state.numOfCircles);
    renderCircles();
  }
}

function decrementBtnHandler() {
  if (state.numOfCircles > 2) {
    state.numOfCircles--;
    state.currentId = Math.min(state.currentId, state.numOfCircles);
    renderCircles();
  }
}

function attachEventHandlers() {
  UI.incrementBtn.addEventListener('click', incrementBtnHandler);
  UI.decrementBtn.addEventListener('click', decrementBtnHandler);
  UI.prevBtn.addEventListener('click', prevBtnHandler);
  UI.nextBtn.addEventListener('click', nextBtnHandler);
  UI.circleContainer.addEventListener('click', circleEventHandler);
}

// =====================================================
// ********************* Render ***********************
// =====================================================

function manageButtonState() {
  UI.decrementBtn.disabled = state.numOfCircles === 2;
  UI.incrementBtn.disabled = state.numOfCircles === 8;

  UI.prevBtn.disabled = state.currentId === 1;
  UI.nextBtn.disabled = state.currentId === UI.circleContainer.children.length;
}

function manageCircles() {
  Array.from(UI.circleContainer.children).forEach((c) => {
    c.dataset.circleId > state.currentId
      ? c.classList.remove('active')
      : c.classList.add('active');
  });
}

function manageProgressLine() {
  const numOfDivisions = state.numOfCircles - 1;

  const width = `${((state.currentId - 1) / numOfDivisions) * 100}%`;

  UI.progressLine.style.width = width;
}

function renderCircles() {
  UI.circleContainer.replaceChildren(
    ...Array.from({ length: state.numOfCircles }, (_, i) =>
      createCircle(i + 1),
    ),
  );

  render();
}

function render() {
  manageButtonState();

  manageCircles();

  manageProgressLine();
}

// =====================================================
// *********************** Init ************************
// =====================================================

function init() {
  cacheDOM();
  attachEventHandlers();
  render();
}

window.addEventListener('DOMContentLoaded', init);
