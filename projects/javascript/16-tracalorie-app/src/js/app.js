import initInteractiveComponents from './interactivity.js';
import CalorieTracker from './calorie-tracker.js';
import { Meal, Workout } from './items.js';
import Storage from './storage.js';
import { MealPanel, WorkoutPanel, SetLimitModal } from './entity-panels.js';

class App {
  constructor() {
    initInteractiveComponents();

    this.setLimitModal = new SetLimitModal(this.setLimit.bind(this));

    this.mealPanel = new MealPanel({
      onSubmitCb: this.addNewMeal.bind(this),
      onRemoveCb: this.removeMeal.bind(this),
      onFilterInputCb: this.filterMeals.bind(this),
    });
    this.workoutPanel = new WorkoutPanel({
      onSubmitCb: this.addNewWorkout.bind(this),
      onRemoveCb: this.removeWorkout.bind(this),
      onFilterInputCb: this.filterWorkouts.bind(this),
    });

    this.tracker = new CalorieTracker();
    this.loadStorageData();

    document
      .querySelector('button#reset-button')
      .addEventListener('click', this.onReset.bind(this));
  }

  setLimit(value) {
    this.tracker.setCalorieLimit(value);
    Storage.saveCalorieLimit(value);
  }

  addNewMeal(name, calories) {
    const id = Storage.getNewMealId();
    const newMeal = new Meal(id, name, calories);

    Storage.saveMeal(newMeal.toJSON());

    this.tracker.addMeal(newMeal);
    this.mealPanel.createListItem(newMeal);
  }

  removeMeal(id) {
    Storage.removeMeal(id);
    this.tracker.removeMeal(id);
  }

  addNewWorkout(name, calories) {
    const id = Storage.getNewWorkoutId();
    const newWorkout = new Workout(id, name, calories);

    Storage.saveWorkout(newWorkout.toJSON());

    this.tracker.addWorkout(newWorkout);
    this.workoutPanel.createListItem(newWorkout);
  }

  removeWorkout(id) {
    Storage.removeWorkout(id);
    this.tracker.removeWorkout(id);
  }

  filterMeals(filterValue) {
    const meals = this.tracker.getMeals();

    const filteredMeals = meals.filter((meal) => {
      return meal.name.toLowerCase().startsWith(filterValue.toLowerCase());
    });

    return new Set(filteredMeals.map((meal) => meal.id));
  }

  filterWorkouts(filterValue) {
    const workouts = this.tracker.getWorkouts();

    const filteredWorkouts = workouts.filter((workout) => {
      return workout.name.toLowerCase().startsWith(filterValue.toLowerCase());
    });

    return new Set(filteredWorkouts.map((workout) => workout.id));
  }

  _loadMealsFromStorage() {
    const meals = Storage.getMeals();

    meals.forEach((meal) => {
      meal = new Meal(meal.id, meal.name, meal.calories);
      this.tracker.addMeal(meal);
      this.mealPanel.createListItem(meal);
    });
  }

  _loadWorkoutsFromStorage() {
    const workouts = Storage.getWorkouts();

    workouts.forEach((workout) => {
      workout = new Workout(workout.id, workout.name, workout.calories);
      this.tracker.addWorkout(workout);
      this.workoutPanel.createListItem(workout);
    });
  }

  _loadLimit() {
    const currentLimit = Storage.getCalorieLimit();

    this.tracker.setCalorieLimit(currentLimit);
  }

  loadStorageData() {
    this._loadMealsFromStorage();
    this._loadWorkoutsFromStorage();
    this._loadLimit();
  }

  onReset() {
    Storage.clearAll();
    this.tracker.clearAll();
    this.mealPanel.clearAll();
    this.workoutPanel.clearAll();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
});
