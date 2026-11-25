const CALORIE_LIMIT = 100000;

export default class LimitModal {
  constructor(setLimitCb) {
    this.setLimitCb = setLimitCb;

    this.UI = {
      limitInputField: null,
      limitForm: null,
    };

    this.cacheDOM();
    this.bindEventHandlers();
    this.setupEvents();
  }

  cacheDOM() {
    this.UI.limitInputField = document.querySelector('input#calorie-limit');
    this.UI.limitForm = document.querySelector('form#limit-form');
  }

  bindEventHandlers() {
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onSubmitEventHandler(e) {
    e.preventDefault();

    const calories = Number(this.UI.limitInputField.value);

    if (calories > CALORIE_LIMIT || calories < 0) {
      alert('Invalid calorie limit value.');
      this.UI.limitInputField.value = '';
      return;
    }

    if (calories) this.setLimitCb(calories);
    this.UI.limitInputField.value = '';
  }

  setupEvents() {
    this.UI.limitForm.addEventListener('submit', this.onSubmitEventHandler);
  }
}
