let displayInstance = null;

export default class CalorieDisplay {
  constructor() {
    if (displayInstance) {
      return displayInstance;
    }

    this.UI = {
      calorieLimitField: null,
      totalCaloriesField: null,
      consumedCaloriesField: null,
      burnedCaloriesField: null,
      remainingCaloriesField: null,
      remainingCaloriesCell: null,
      progressBar: null,
    };

    this._isDOMReady = false;
    this._cacheDOM();

    displayInstance = this;
  }

  _cacheDOM() {
    this.UI.calorieLimitField = document.querySelector('#stats-limit');
    this.UI.totalCaloriesField = document.querySelector('#stats-total');
    this.UI.consumedCaloriesField = document.querySelector('#stats-consumed');
    this.UI.burnedCaloriesField = document.querySelector('#stats-burned');

    this.UI.remainingCaloriesField = document.querySelector('#stats-remaining');
    this.UI.remainingCaloriesCell =
      this.UI.remainingCaloriesField?.parentElement ?? null;

    this.UI.progressBar = document.querySelector('#progress-success');

    this._checkDOM();
  }

  _checkDOM() {
    this._isDOMReady = Object.values(this.UI).every((el) => Boolean(el));
    if (!this._isDOMReady) {
      alert(
        'Error occurred while caching DOM for calorie display. Sorry, application is postponed. Try reloading the page. If the error persists try again later.',
      );
    }
  }

  _ensureDOMReady() {
    if (!this._isDOMReady) {
      console.error('Error occurred while caching DOM. Application postponed.');
      return false;
    }

    return true;
  }

  updateCalorieLimit(value) {
    if (!this._ensureDOMReady()) return;

    this.UI.calorieLimitField.textContent = value;
  }

  updateTotalCalories(value) {
    if (!this._ensureDOMReady()) return;

    this.UI.totalCaloriesField.textContent = value;
  }

  updateConsumedCalories(value) {
    if (!this._ensureDOMReady()) return;

    this.UI.consumedCaloriesField.textContent = value;
  }

  updateBurnedCalories(value) {
    if (!this._ensureDOMReady()) return;

    this.UI.burnedCaloriesField.textContent = value;
  }

  updateProgressBar(percentValue) {
    const progressBar = this.UI.progressBar;

    progressBar.style.width = `${percentValue}%`;

    const isFilled = percentValue >= 100;

    progressBar.classList.toggle('bg-primary', !isFilled);
    progressBar.classList.toggle('bg-danger', isFilled);
  }

  updateRemainingCalories(calorieRemaining) {
    if (!this._ensureDOMReady()) return;

    this.UI.remainingCaloriesField.textContent = calorieRemaining;

    const fieldCell = this.UI.remainingCaloriesCell;

    const isLimitDepleted = calorieRemaining <= 0;

    fieldCell.classList.toggle('bg-light', !isLimitDepleted);
    fieldCell.classList.toggle('bg-danger', isLimitDepleted);
  }
}
