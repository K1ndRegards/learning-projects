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

const UI = {
  formCollapseBtns: null,
  collapses: new Map(),
};

function cacheDOM() {
  UI.formCollapseBtns = document.querySelectorAll('.toggle-form-btn');

  UI.formCollapseBtns.forEach((btn) => {
    const targetSelector = btn.dataset.target;

    if (targetSelector && !UI.collapses.has(targetSelector)) {
      UI.collapses.set(targetSelector, new Collapse(targetSelector));
    }
  });
}

export default function initUI() {
  cacheDOM();

  UI.formCollapseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      UI.collapses.get(btn.dataset.target).toggle();
    });
  });
}
