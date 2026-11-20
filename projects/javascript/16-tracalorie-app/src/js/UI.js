// Element smooth collapsing class
class Collapse {
  constructor(targetSelector) {
    this.element = document.querySelector(targetSelector);

    // Flag so that multiple clicks didn't break the animation
    this.isTransitioning = false;
  }

  // Main toggler
  toggle() {
    if (this.element.classList.contains('is-open')) {
      this.hide();
    } else {
      this.show();
    }
  }

  // Smooth transitioning from 0px to element height
  show() {
    // Return if element is already open or animation is ongoing
    if (this.isTransitioning || this.element.classList.contains('is-open'))
      return;

    // Starting animation
    this.isTransitioning = true;

    // Removing base collapse style, which hides the element by default
    this.element.classList.remove('collapse-wrapper');
    // Setting collapsing class which indicates ongoing transition and also sets basic collapsing styles
    this.element.classList.add('collapsing');

    // Setting starting height to 0px
    this.element.style.height = '0px';

    // Right after setting starting height forcing browser to recalculate styles right away
    this.element.offsetHeight;

    // Computing real element height and setting it
    this.element.style.height = `${this.element.scrollHeight}px`;

    // Waiting for transition to end
    this.element.addEventListener(
      'transitionend',
      () => {
        // Setting flag to false because animation ended
        this.isTransitioning = false;

        // Removing temporal collapsing class
        this.element.classList.remove('collapsing');
        // Returning base collapse-wrapper class and also adding is-open state
        this.element.classList.add('collapse-wrapper', 'is-open');
        // Resetting inline-height, so that the block can automatically adapt to the content in the future
        this.element.style.height = '';
      },
      { once: true },
    );
  }

  // Smooth transition from content height to 0px
  hide() {
    // Return if animation is ongoing or element isn't even open
    if (this.isTransitioning || !this.element.classList.contains('is-open'))
      return;

    // Setting transitioning flag, animation is ongoing
    this.isTransitioning = true;

    // Setting exact current element height in px
    this.element.style.height = `${this.element.getBoundingClientRect().height}px`;

    // Forcing browser to recalculate styles right away
    this.element.offsetHeight;

    // Changing element mode to ongoing collapsing
    this.element.classList.add('collapsing');
    // Removing static state and open state classes
    this.element.classList.remove('collapse-wrapper', 'is-open');

    // Setting target height - 0px
    this.element.style.height = '0px';

    // Waiting for animation to end
    this.element.addEventListener(
      'transitionend',
      () => {
        // Setting flag to false because animation ended
        this.isTransitioning = false;

        // Removing collapsing class
        this.element.classList.remove('collapsing');
        // Return static closed state class
        this.element.classList.add('collapse-wrapper');
        // Clearing inline height style
        this.element.style.height = '';
      },
      { once: true },
    );
  }
}

class Modal {
  constructor(targetSelector) {
    // the whole modal itself
    this.element = document.querySelector(targetSelector);

    this.modalContent = this.element.querySelector('.modal-content');

    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.bindEvents();
  }

  bindEvents() {
    this.element.querySelectorAll('.close-modal').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });

    this.element.addEventListener('click', this.handleBackdropClick);
  }

  handleBackdropClick(e) {
    if (e.target === this.element) {
      this.close();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  // Open modal window
  open() {
    if (!this.element) return;

    this.element.classList.remove('hidden');
    this.element.classList.add('flex');
    document.body.classList.add('overflow-hidden');

    document.addEventListener('keydown', this.handleKeyDown);

    this.toggleAppearingAnimation();
  }

  // Close modal window
  close() {
    if (!this.element) return;

    // toggle disappearing animation
    this.toggleDisappearingAnimation();

    // Wait for animation to end
    this.element.addEventListener(
      'animationend',
      () => {
        this.element.classList.add('hidden');
        this.element.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');

        document.removeEventListener('keydown', this.handleKeyDown);
      },
      { once: true },
    );
  }

  toggleAppearingAnimation() {
    this.modalContent.classList.remove('modal-move-out');
    this.element.classList.remove('modal-opacity-out');

    // force reflow
    void this.modalContent.offsetWidth;
    void this.element.offsetWidth;

    this.modalContent.classList.add('modal-move-in');
    this.element.classList.add('modal-opacity-in');
  }

  toggleDisappearingAnimation() {
    this.modalContent.classList.remove('modal-move-in');
    this.element.classList.remove('modal-opacity-in');

    // force reflow
    void this.modalContent.offsetWidth;
    void this.element.offsetWidth;

    this.modalContent.classList.add('modal-move-out');
    this.element.classList.add('modal-opacity-out');
  }
}

// All necessary UI elements
const UI = {
  formCollapseBtns: null,
  collapses: new Map(),
  openModalBtns: null,
  modals: new Map(),
};

// Fetch all necessary DOM elements
function cacheDOM() {
  UI.formCollapseBtns = document.querySelectorAll('.toggle-form-btn');
  UI.openModalBtns = document.querySelectorAll('.open-modal');
}

// Setup interactive elements
function setupElements() {
  // Setup collapse elements
  UI.formCollapseBtns.forEach((btn) => {
    const targetSelector = btn.dataset.target;

    if (targetSelector && !UI.collapses.has(targetSelector)) {
      UI.collapses.set(targetSelector, new Collapse(targetSelector));
    }
  });

  // Setup modal windows
  UI.openModalBtns.forEach((btn) => {
    const targetSelector = btn.dataset.target;

    if (targetSelector && !UI.modals.has(targetSelector)) {
      UI.modals.set(targetSelector, new Modal(targetSelector));
    }
  });
}

function attachEventHandlers() {
  UI.formCollapseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      UI.collapses.get(btn.dataset.target).toggle();
    });
  });

  UI.openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      UI.modals.get(btn.dataset.target).open();
    });
  });
}

export default function initUI() {
  cacheDOM();

  setupElements();

  attachEventHandlers();
}
