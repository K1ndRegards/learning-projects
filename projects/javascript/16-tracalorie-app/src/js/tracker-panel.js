import Validator from './validator.js';
import { Meal, Workout } from './calorie-entity.js';

export default class Tracker {
  constructor() {
    this.calorieLimit = 2000;
    this.totalCalories = 0;
    this.consumedCalories = 0;
    this.burnedCalories = 0;

    this.meals = [];
    this.workouts = [];

    this._UI = {
      calorieLimit: null,
      totalCalories: null,
      consumedCalories: null,
      burnedCalories: null,
      remainingCalories: null,
      fillBar: null,
    };

    this._cacheDOM();
  }

  _cacheDOM() {
    this._UI.calorieLimit = document.querySelector('#stats-limit');
    this._UI.totalCalories = document.querySelector('#stats-total');
    this._UI.consumedCalories = document.querySelector('#stats-consumed');
    this._UI.burnedCalories = document.querySelector('#stats-burned');
    this._UI.remainingCalories = document.querySelector('#stats-remaining');
    this._UI.fillBar = document.querySelector('#progress-fill');
  }

  _updateRemainingCalories() {
    const remainingCalories = this.calorieLimit - this.totalCalories;

    this._UI.remainingCalories.textContent = remainingCalories;

    const statCell = this._UI.remainingCalories.parentElement;
    const isLimitDepleted = remainingCalories <= 0;

    statCell.classList.toggle('bg-danger', isLimitDepleted);
    statCell.classList.toggle('bg-light', !isLimitDepleted);
  }

  _updateFillBar() {
    const fillBar = this._UI.fillBar;

    let percentValue;
    if (this.calorieLimit === 0) {
      percentValue = 100;
    } else {
      percentValue = Math.min(
        Math.floor((this.totalCalories / this.calorieLimit) * 100),
        100,
      );
    }

    fillBar.style.width = `${percentValue}%`;

    const isFilled = percentValue === 100;
    fillBar.classList.toggle('bg-danger', isFilled);
    fillBar.classList.toggle('bg-primary', !isFilled);
  }

  _render() {
    this._UI.calorieLimit.textContent = this.calorieLimit;
    this._UI.totalCalories.textContent = this.totalCalories;
    this._UI.consumedCalories.textContent = this.consumedCalories;
    this._UI.burnedCalories.textContent = this.burnedCalories;

    this._updateRemainingCalories();
    this._updateFillBar();
  }

  setCalorieLimit(value) {
    if (!Validator.isValidCalories(value)) {
      throw new Error(`Got invalid calorie value. Received: ${value}`);
    }

    this.calorieLimit = value;
    this._render();
  }

  addMeal(meal) {
    if ((!meal) instanceof Meal) {
      throw new Error(`Got invalid meal object. Received: ${meal}`);
    }

    this.meals.push(meal);
    this.totalCalories += meal.calories;
    this.consumedCalories += meal.calories;
    this._render();
  }

  removeMeal(id) {
    if (!Validator.isValidId(id)) {
      throw new Error(`Got invalid id value. Received: ${id}`);
    }

    const mealObj = this._removeItem(id, this.meals);
    if (mealObj === -1) {
      console.warn('Tried to remove non-existent meal item.');
      return;
    }

    this.totalCalories -= mealObj.calories;
    this.consumedCalories -= mealObj.calories;
    this._render();
  }

  addWorkout(workout) {
    if ((!workout) instanceof Workout) {
      throw new Error(`Got invalid workout object. Received: ${workout}`);
    }

    this.workouts.push(workout);
    this.totalCalories -= workout.calories;
    this.burnedCalories += workout.calories;
    this._render();
  }

  removeWorkout(id) {
    if (!Validator.isValidId(id)) {
      throw new Error(`Got invalid id value. Received: ${id}`);
    }

    const workoutObj = this._removeItem(id, this.workouts);
    if (workoutObj === -1) {
      console.warn('Tried to remove non-existent workout item.');
      return;
    }

    this.totalCalories += workoutObj.calories;
    this.burnedCalories -= workoutObj.calories;
    this._render();
  }

  _removeItem(id, entityArr) {
    for (let i = 0; i < entityArr.length; i++) {
      if (entityArr[i].id === id) {
        const entityObj = entityArr[i];
        entityArr.splice(i, 1);

        return entityObj;
      }
    }

    return -1;
  }

  clearAll() {
    this.totalCalories = 0;
    this.consumedCalories = 0;
    this.burnedCalories = 0;

    this.meals = [];
    this.workouts = [];

    this._render();
  }
}
