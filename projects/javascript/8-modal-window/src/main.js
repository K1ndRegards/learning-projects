// Main state object
const state = {
  modalOpen: false,
};

// Interface components
const UI = {
  modalWindow: null,
  modalCloseBtn: null,
  openModalHeader: null,
  openModalMain: null,
};

// Function to open modal window
function openModal() {
  UI.modalWindow.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

// Function to close modal window
function closeModal() {
  UI.modalWindow.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

// Main render
function render() {
  if (state.modalOpen) openModal();
  else closeModal();
}

// Close button event handler
function closeBtnHandler() {
  state.modalOpen = false;
  render();
}

// Open modal buttons event handler
function openModalHandler() {
  state.modalOpen = true;
  render();
}

// When user presses 'Escape' while modal is active
function windowKeydownHandler(e) {
  if (e.key === 'Escape' && state.modalOpen) {
    // Toggle it off
    state.modalOpen = false;
    render();
  }
}

// When user clicks on overlay to exit the modal window
function modalWindowHandler(e) {
  const closest = e.target.closest('article');

  // If click happened inside the modal window
  if (closest) return;

  state.modalOpen = false;
  render();
}

// Main initializer
function init() {
  UI.modalWindow = document.querySelector('#modal');
  UI.modalCloseBtn = document.querySelector('#close-modal-btn');
  UI.openModalHeader = document.querySelector('#header-open-modal');
  UI.openModalMain = document.querySelector('#main-open-modal');

  UI.modalCloseBtn.addEventListener('click', closeBtnHandler);
  UI.openModalHeader.addEventListener('click', openModalHandler);
  UI.openModalMain.addEventListener('click', openModalHandler);

  window.addEventListener('keydown', windowKeydownHandler);

  UI.modalWindow.addEventListener('click', modalWindowHandler);
}

init();
