import Storage from './storage.js';
import { Meal, Workout } from './calorie-entity.js';
import LimitModal from './limit-modal.js';
import Tracker from './tracker-panel.js';
import { MealPanel, WorkoutPanel } from './item-panels.js';

class App {
  constructor() {
    this._bindEventHandlers();

    this.tracker = new Tracker();

    this.mealPanel = new MealPanel({
      onSubmitCb: this._submitMealCb,
      onRemoveCb: this._removeMealCb,
      onFilterCb: this._filterMealsCb,
    });

    this.workoutPanel = new WorkoutPanel({
      onSubmitCb: this._submitWorkoutCb,
      onRemoveCb: this._removeWorkoutCb,
      onFilterCb: this._filterWorkoutsCb,
    });

    new LimitModal(this._submitDailyLimitCb);

    document
      .querySelector('#reset-button')
      .addEventListener('click', this._resetDay);

    this._loadLocalStorageData();
  }

  _bindEventHandlers() {
    this._submitDailyLimitCb = this._submitDailyLimitCb.bind(this);

    this._submitMealCb = this._submitMealCb.bind(this);
    this._submitWorkoutCb = this._submitWorkoutCb.bind(this);

    this._removeMealCb = this._removeMealCb.bind(this);
    this._removeWorkoutCb = this._removeWorkoutCb.bind(this);

    this._filterMealsCb = this._filterMealsCb.bind(this);
    this._filterWorkoutsCb = this._filterWorkoutsCb.bind(this);

    this._resetDay = this._resetDay.bind(this);
  }

  _loadLocalStorageData() {
    this.tracker.setCalorieLimit(Storage.getDailyLimit());
    Storage.getMeals().forEach((meal) => {
      this.mealPanel.createListItem(meal);
      this.tracker.addMeal(meal);
    });
    Storage.getWorkouts().forEach((workout) => {
      this.workoutPanel.createListItem(workout);
      this.tracker.addWorkout(workout);
    });
  }

  _submitDailyLimitCb(calorieNumber) {
    this.tracker.setCalorieLimit(calorieNumber);
    Storage.saveDailyLimit(calorieNumber);
  }

  _submitMealCb(name, calories) {
    const meal = new Meal(name, calories);

    this.tracker.addMeal(meal);

    this.mealPanel.createListItem(meal);

    Storage.addMeal(meal);
  }

  _submitWorkoutCb(name, calories) {
    const workout = new Workout(name, calories);

    this.tracker.addWorkout(workout);

    this.workoutPanel.createListItem(workout);

    Storage.addWorkout(workout);
  }

  _removeMealCb(id) {
    this.tracker.removeMeal(id);
    Storage.removeMeal(id);
  }

  _removeWorkoutCb(id) {
    this.tracker.removeWorkout(id);
    Storage.removeWorkout(id);
  }

  _filterMealsCb(filterValue) {
    const meals = Storage.getMeals();

    return meals
      .filter((meal) =>
        meal.name.toLowerCase().startsWith(filterValue.toLowerCase()),
      )
      .map((item) => item.id);
  }

  _filterWorkoutsCb(filterValue) {
    const workouts = Storage.getWorkouts();

    return workouts
      .filter((workout) =>
        workout.name.toLowerCase().startsWith(filterValue.toLowerCase()),
      )
      .map((item) => item.id);
  }

  _resetDay() {
    this.tracker.clearAll();
    this.mealPanel.clearAll();
    this.workoutPanel.clearAll();
    Storage.clearAll();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
