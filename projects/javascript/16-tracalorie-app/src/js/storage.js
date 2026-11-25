import {
  isValidId,
  isValidCalories,
  isPlainObject,
  isPlainCalorieEntity,
} from './validators.js';

const APP_STORAGE_KEY = 'tracalorieApp';

const CALORIE_LIMIT_STORAGE_KEY = 'calorieLimit';
const MEALS_STORAGE_KEY = 'meals';
const WORKOUTS_STORAGE_KEY = 'workouts';

export default class Storage {
  static _saveDefaultData() {
    const defaultData = {
      [CALORIE_LIMIT_STORAGE_KEY]: 2000,
      [MEALS_STORAGE_KEY]: [],
      [WORKOUTS_STORAGE_KEY]: [],
    };

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(defaultData));

    return defaultData;
  }

  static _isDataValid(data) {
    if (!isPlainObject(data)) return false;

    if (
      !Object.hasOwn(data, CALORIE_LIMIT_STORAGE_KEY) ||
      !isValidCalories(data[CALORIE_LIMIT_STORAGE_KEY])
    ) {
      return false;
    }

    if (
      !Object.hasOwn(data, MEALS_STORAGE_KEY) ||
      data[MEALS_STORAGE_KEY].some((item) => !isPlainCalorieEntity(item))
    ) {
      return false;
    }

    if (
      !Object.hasOwn(data, WORKOUTS_STORAGE_KEY) ||
      data[WORKOUTS_STORAGE_KEY].some((item) => !isPlainCalorieEntity(item))
    ) {
      return false;
    }

    return true;
  }

  static _loadStorageData() {
    const data = localStorage.getItem(APP_STORAGE_KEY);

    if (data === null) {
      console.log('Setting default application data.');
      return this._saveDefaultData();
    }

    let parsed;

    try {
      parsed = JSON.parse(data);

      if (!this._isDataValid(parsed)) {
        throw new Error(
          `Invalid local storage data structure or values: ${parsed}`,
        );
      }
    } catch (err) {
      console.warn(
        'An error occurred while loading data from localStorage.\n',
        err,
      );
      console.warn('Setting default application data.');
      parsed = this._saveDefaultData();
    }

    return parsed;
  }

  static saveCalorieLimit(calorieLimit) {
    if (!isValidCalories(calorieLimit)) {
      throw new Error(`Invalid calorie limit value. Received ${calorieLimit}`);
    }

    const data = this._loadStorageData();

    data[CALORIE_LIMIT_STORAGE_KEY] = calorieLimit;

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  }

  static getCalorieLimit() {
    const data = this._loadStorageData();

    return data[CALORIE_LIMIT_STORAGE_KEY];
  }

  static _saveCalorieEntity(entity, storageKey) {
    const data = this._loadStorageData();

    data[storageKey].push(entity);

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  }

  static _removeCalorieEntity(entityId, storageKey) {
    const data = this._loadStorageData();

    data[storageKey] = data[storageKey].filter(
      (calorieItem) => calorieItem.id !== entityId,
    );

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
  }

  static _getUniqueId(storageKey) {
    const data = this._loadStorageData();

    const occupiedIds = new Set(
      data[storageKey].map((mealItem) => mealItem.id),
    );

    let i = 1;
    while (occupiedIds.has(i)) {
      i++;
    }
    return i;
  }

  static saveMeal(mealObj) {
    if (!isPlainCalorieEntity(mealObj)) {
      throw new Error(`Invalid meal object. Received ${mealObj}`);
    }

    this._saveCalorieEntity(mealObj, MEALS_STORAGE_KEY);
  }

  static removeMeal(id) {
    if (!isValidId(id)) {
      throw new Error(`Invalid meal id value. Received ${id}`);
    }

    this._removeCalorieEntity(id, MEALS_STORAGE_KEY);
  }

  static getMeals() {
    const data = this._loadStorageData();

    return data[MEALS_STORAGE_KEY];
  }

  static getNewMealId() {
    return this._getUniqueId(MEALS_STORAGE_KEY);
  }

  static saveWorkout(workoutObj) {
    if (!isPlainCalorieEntity(workoutObj)) {
      throw new Error(`Invalid workout object. Received ${workoutObj}`);
    }

    this._saveCalorieEntity(workoutObj, WORKOUTS_STORAGE_KEY);
  }

  static removeWorkout(id) {
    if (!isValidId(id)) {
      throw new Error(`Invalid workout id value. Received ${id}`);
    }

    this._removeCalorieEntity(id, WORKOUTS_STORAGE_KEY);
  }

  static getWorkouts() {
    const data = this._loadStorageData();

    return data[WORKOUTS_STORAGE_KEY];
  }

  static getNewWorkoutId() {
    return this._getUniqueId(WORKOUTS_STORAGE_KEY);
  }

  static clearAll() {
    this._saveDefaultData();
  }
}
