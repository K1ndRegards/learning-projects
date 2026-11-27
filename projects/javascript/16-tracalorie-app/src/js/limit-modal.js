import Validator from './validator.js';

const MAX_CALORIE_LIMIT = 10000;

export default class LimitModal {
  constructor(onSubmitCb) {
    this._onSubmitCb = onSubmitCb;

    this._UI = {
      window: null,
      content: null,
      form: null,
      calorieInput: null,
      openBtn: null,
      saveBtn: null,
      closeBtn: null,
    };

    this._cacheDOM();
    this._bindEvents();
    this._attachEventHandlers();
  }

  _cacheDOM() {
    this._UI.window = document.querySelector('#limit-modal');
    this._UI.content = document.querySelector('#modal-content');
    this._UI.form = document.querySelector('#calorie-limit-form');
    this._UI.calorieInput = document.querySelector('#calorie-limit-input');
    this._UI.openBtn = document.querySelector('#open-limit-modal');
    this._UI.saveBtn = document.querySelector('#save-limit-btn');
    this._UI.closeBtn = document.querySelector('#close-modal-btn');
  }

  _bindEvents() {
    this._onSubmitEventHandler = this._onSubmitEventHandler.bind(this);
    this._handleBackdropClick = this._handleBackdropClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  _attachEventHandlers() {
    this._UI.form.addEventListener('submit', this._onSubmitEventHandler);
    this._UI.openBtn.addEventListener('click', this._openModal);
    this._UI.window.addEventListener('click', this._handleBackdropClick);
    this._UI.closeBtn.addEventListener('click', this._closeModal);
  }

  _openModal() {
    this._UI.window.classList.remove('hidden');
    this._UI.window.classList.add('flex');

    document.body.classList.add('overflow-hidden');

    document.addEventListener('keydown', this._handleKeyDown);

    this._toggleAppearingAnimation();
  }

  _closeModal() {
    const window = this._UI.window;

    this._toggleDisappearingAnimation();

    this._UI.window.addEventListener(
      'animationend',
      () => {
        window.classList.add('hidden');
        window.classList.remove('flex');

        document.body.classList.remove('overflow-hidden');

        document.removeEventListener('keydown', this._handleKeyDown);
      },
      { once: true },
    );
  }

  _handleBackdropClick(e) {
    if (e.target === this._UI.window) {
      this._closeModal();
    }
  }

  _handleKeyDown(e) {
    if (e.key === 'Escape') {
      this._closeModal();
    }
  }

  _onSubmitEventHandler(e) {
    e.preventDefault();

    const calorieNumberInput = this._UI.calorieInput;
    const calorieNumber = Number(calorieNumberInput.value);

    if (
      !Validator.isValidCalories(calorieNumber) ||
      calorieNumber > MAX_CALORIE_LIMIT
    ) {
      alert(
        `Invalid calorie number, please enter number in range from 0 to ${MAX_CALORIE_LIMIT} included.`,
      );

      return;
    }

    calorieNumberInput.value = '';

    this._onSubmitCb(calorieNumber);
    this._closeModal();
  }

  _toggleAppearingAnimation() {
    const window = this._UI.window;
    const content = this._UI.content;

    content.classList.remove('modal-move-out');
    window.classList.remove('modal-opacity-out');

    // force reflow
    void content.offsetWidth;
    void window.offsetWidth;

    content.classList.add('modal-move-in');
    window.classList.add('modal-opacity-in');
  }

  _toggleDisappearingAnimation() {
    const window = this._UI.window;
    const content = this._UI.content;

    content.classList.remove('modal-move-in');
    window.classList.remove('modal-opacity-in');

    // force reflow
    void content.offsetWidth;
    void window.offsetWidth;

    content.classList.add('modal-move-out');
    window.classList.add('modal-opacity-out');
  }
}
