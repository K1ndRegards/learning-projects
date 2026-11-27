const APP_STORAGE_KEY = 'tracalorieApp';

const CALORIE_LIMIT_STORAGE_KEY = 'calorieLimitValue';
const MEALS_STORAGE_KEY = 'mealEntities';
const WORKOUTS_STORAGE_KEY = 'workoutEntities';

const DEFAULT_DATA = {
  [CALORIE_LIMIT_STORAGE_KEY]: 2000,
  [MEALS_STORAGE_KEY]: [],
  [WORKOUTS_STORAGE_KEY]: [],
};

export default class Storage {
  static loadLocalStorageData() {
    const rawData = localStorage.getItem(APP_STORAGE_KEY);

    if (rawData === null) {
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(DEFAULT_DATA));

      return DEFAULT_DATA;
    }

    let parsedData;
    try {
      parsedData = JSON.parse(rawData);
    } catch (err) {
      console.warn('Failed to parse data from local storage;');
      console.warn('Overwriting with default data.');

      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(DEFAULT_DATA));

      return DEFAULT_DATA;
    }

    return parsedData;
  }

  static saveDailyLimit(value) {
    const data = this.loadLocalStorageData();

    data[CALORIE_LIMIT_STORAGE_KEY] = value;

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  }

  static getDailyLimit() {
    const data = this.loadLocalStorageData();

    return data[CALORIE_LIMIT_STORAGE_KEY];
  }

  static getMeals() {
    const data = this.loadLocalStorageData();

    return data[MEALS_STORAGE_KEY];
  }

  static addMeal(mealObj) {
    const data = this.loadLocalStorageData();

    data[MEALS_STORAGE_KEY].push(mealObj);

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  }

  static removeMeal(id) {
    const data = this.loadLocalStorageData();

    data[MEALS_STORAGE_KEY] = data[MEALS_STORAGE_KEY].filter(
      (mealItem) => mealItem.id !== id,
    );

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  }

  static getWorkouts() {
    const data = this.loadLocalStorageData();

    return data[WORKOUTS_STORAGE_KEY];
  }

  static addWorkout(workoutObj) {
    const data = this.loadLocalStorageData();

    data[WORKOUTS_STORAGE_KEY].push(workoutObj);

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  }

  static removeWorkout(id) {
    const data = this.loadLocalStorageData();

    data[WORKOUTS_STORAGE_KEY] = data[WORKOUTS_STORAGE_KEY].filter(
      (workoutItem) => workoutItem.id !== id,
    );

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  }

  static _getUniqueId(occupiedIds) {
    let i = 1;
    while (occupiedIds.has(i)) {
      i++;
    }

    return i;
  }

  static getNewMealId() {
    const occupiedIds = new Set(this.getMeals().map((meal) => meal.id));
    return this._getUniqueId(occupiedIds);
  }

  static getNewWorkoutId() {
    const occupiedIds = new Set(this.getWorkouts().map((meal) => meal.id));
    return this._getUniqueId(occupiedIds);
  }

  static clearAll() {
    const data = this.loadLocalStorageData();

    data[MEALS_STORAGE_KEY] = [];
    data[WORKOUTS_STORAGE_KEY] = [];

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  }
}
