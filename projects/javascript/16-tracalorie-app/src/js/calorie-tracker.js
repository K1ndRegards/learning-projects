import { Meal, Workout } from './items.js';
import { isValidCalories } from './validators.js';
import CalorieDisplay from './calorie-display.js';

let trackerInstance = null;

export default class CalorieTracker {
  constructor() {
    if (trackerInstance) {
      return trackerInstance;
    }

    this.calorieLimit = 0;
    this.totalCalories = 0;

    this.consumedCalories = 0;
    this.burnedCalories = 0;

    this.meals = [];
    this.workouts = [];

    this.display = new CalorieDisplay();

    trackerInstance = this;
  }

  setCalorieLimit(value) {
    if (!isValidCalories(value)) {
      throw new Error(`Invalid calorie value. Received ${value}`);
    }

    this.calorieLimit = value;
    this.updateCalories();
  }

  updateCalories() {
    this.display.updateCalorieLimit(this.calorieLimit);
    this.display.updateTotalCalories(this.totalCalories);
    this.display.updateConsumedCalories(this.consumedCalories);
    this.display.updateBurnedCalories(this.burnedCalories);
    this.display.updateRemainingCalories(
      this.calorieLimit - this.totalCalories,
    );

    let barPercentValue = Math.floor(
      (this.totalCalories / this.calorieLimit) * 100,
    );

    if (barPercentValue < 0) barPercentValue = 0;
    if (barPercentValue > 100) barPercentValue = 100;

    this.display.updateProgressBar(barPercentValue);
  }

  _findCalorieEntity(id, entityArr) {
    for (let i = 0; i < entityArr.length; i++) {
      if (entityArr[i].id === id) {
        return [i, entityArr[i]];
      }
    }

    return -1;
  }

  addMeal(mealObj) {
    if (!(mealObj instanceof Meal)) {
      throw new Error('Expected an instance of Meal.');
    }

    this.totalCalories += mealObj.calories;
    this.consumedCalories += mealObj.calories;
    this.meals.push(mealObj);
    this.updateCalories();
  }

  removeMeal(id) {
    const searchResult = this._findCalorieEntity(id, this.meals);

    if (searchResult === -1) {
      console.warn('Tried to remove non-existent meal entity.');
      return;
    }
    const [index, mealObj] = searchResult;

    this.totalCalories -= mealObj.calories;
    this.consumedCalories -= mealObj.calories;
    this.meals.splice(index, 1);
    this.updateCalories();
  }

  getMeals() {
    return this.meals;
  }

  addWorkout(workoutObj) {
    if ((!workoutObj) instanceof Workout) {
      throw new Error('Expected an instance of Workout.');
    }

    this.totalCalories -= workoutObj.calories;
    this.burnedCalories += workoutObj.calories;
    this.workouts.push(workoutObj);
    this.updateCalories();
  }

  removeWorkout(id) {
    const searchResult = this._findCalorieEntity(id, this.workouts);

    if (searchResult === -1) {
      console.warn('Tried to remove non-existent workout entity.');
      return;
    }
    const [index, workoutObj] = searchResult;

    this.totalCalories += workoutObj.calories;
    this.burnedCalories -= workoutObj.calories;
    this.workouts.splice(index, 1);
    this.updateCalories();
  }

  getWorkouts() {
    return this.workouts;
  }

  clearAll() {
    this.calorieLimit = 2000;
    this.totalCalories = 0;

    this.consumedCalories = 0;
    this.burnedCalories = 0;

    this.meals = [];
    this.workouts = [];

    this.updateCalories();
  }
}
