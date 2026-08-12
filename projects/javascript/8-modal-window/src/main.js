// Main state object
const state = {
  modalOpen: false,
};

// Interface components
const UI = {
  modalWindow: null,
  modalWindowContent: null,
  modalCloseBtn: null,
  openModalBtns: null,
};

let modalTimeId = null;

// Function to clear timeout
function cancelModalTimer() {
  if (modalTimeId) {
    clearTimeout(modalTimeId);
    modalTimeId = null;
  }
}

// Function to toggle on appearing animation when modal pops up
function toggleAppearingAnimation() {
  const modalContent = UI.modalWindowContent;
  const modal = UI.modalWindow;

  modalContent.classList.remove('modal-move-out');
  modal.classList.remove('modal-opacity-out');

  // force reflow
  void modalContent.offsetWidth;
  void modal.offsetWidth;

  modalContent.classList.add('modal-move-in');
  modal.classList.add('modal-opacity-in');
}

// Function to toggle on disappearing animation when modal is closing
function toggleDisappearingAnimation() {
  const modalContent = UI.modalWindowContent;
  const modal = UI.modalWindow;

  modalContent.classList.remove('modal-move-in');
  modal.classList.remove('modal-opacity-in');

  // force reflow
  void modalContent.offsetWidth;
  void modal.offsetWidth;

  modalContent.classList.add('modal-move-out');
  modal.classList.add('modal-opacity-out');
}

// Function to open modal window
function openModal() {
  // Show modal window
  UI.modalWindow.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');

  // Add appearing animation
  toggleAppearingAnimation();
}

// Function to close modal window
function closeModal() {
  // Toggle disappearing animation
  toggleDisappearingAnimation();

  // Wait for animation to end
  UI.modalWindow.addEventListener(
    'animationend',
    () => {
      // Hide modal window
      UI.modalWindow.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    },
    { once: true },
  );
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
  // If modal didn't open itself
  // and user opened it
  // then clear timeout
  cancelModalTimer();

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

// Open modal as time goes on
function openModalInTime(seconds) {
  modalTimeId = setTimeout(() => {
    state.modalOpen = true;
    render();
  }, seconds * 1000);
}

// Main initializer
function init() {
  UI.modalWindow = document.querySelector('#modal');
  UI.modalWindowContent = UI.modalWindow.querySelector('article');
  UI.modalCloseBtn = document.querySelector('[data-modal-close]');
  UI.openModalBtns = document.querySelectorAll('[data-modal-open]');

  UI.modalCloseBtn.addEventListener('click', closeBtnHandler);

  UI.openModalBtns.forEach((btn) =>
    btn.addEventListener('click', openModalHandler),
  );

  window.addEventListener('keydown', windowKeydownHandler);

  UI.modalWindow.addEventListener('click', modalWindowHandler);

  // Open modal in 10 seconds
  openModalInTime(10);
}

init();
